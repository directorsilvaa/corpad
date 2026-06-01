"use client";

import { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";

type RaysOrigin =
  | "top-center"
  | "top-left"
  | "top-right"
  | "right"
  | "left"
  | "bottom-center"
  | "bottom-right"
  | "bottom-left";

type LightRaysProps = {
  raysOrigin?: RaysOrigin;
  raysColor?: string;
  raysSpeed?: number;
  lightSpread?: number;
  rayLength?: number;
  pulsating?: boolean;
  fadeDistance?: number;
  saturation?: number;
  followMouse?: boolean;
  mouseInfluence?: number;
  noiseAmount?: number;
  distortion?: number;
  className?: string;
};

type WebGLUniforms = {
  iTime: { value: number };
  iResolution: { value: [number, number] };
  rayPos: { value: [number, number] };
  rayDir: { value: [number, number] };
  raysColor: { value: [number, number, number] };
  raysSpeed: { value: number };
  lightSpread: { value: number };
  rayLength: { value: number };
  pulsating: { value: number };
  fadeDistance: { value: number };
  saturation: { value: number };
  mousePos: { value: [number, number] };
  mouseInfluence: { value: number };
  noiseAmount: { value: number };
  distortion: { value: number };
};

const vertexShader = `
attribute vec2 position;
varying vec2 vUv;

void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const fragmentShader = `
precision highp float;

uniform float iTime;
uniform vec2 iResolution;
uniform vec2 rayPos;
uniform vec2 rayDir;
uniform vec3 raysColor;
uniform float raysSpeed;
uniform float lightSpread;
uniform float rayLength;
uniform float pulsating;
uniform float fadeDistance;
uniform float saturation;
uniform vec2 mousePos;
uniform float mouseInfluence;
uniform float noiseAmount;
uniform float distortion;

varying vec2 vUv;

float noise(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord,
                  float seedA, float seedB, float speed) {
  vec2 sourceToCoord = coord - raySource;
  vec2 dirNorm = normalize(sourceToCoord);
  float cosAngle = dot(dirNorm, rayRefDirection);

  float distortedAngle = cosAngle + distortion * sin(iTime * 2.0 + length(sourceToCoord) * 0.01) * 0.2;
  float spreadFactor = pow(max(distortedAngle, 0.0), 1.0 / max(lightSpread, 0.001));
  float distance = length(sourceToCoord);
  float maxDistance = iResolution.x * rayLength;
  float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);
  float fadeFalloff = clamp((iResolution.x * fadeDistance - distance) / (iResolution.x * fadeDistance), 0.5, 1.0);
  float pulse = pulsating > 0.5 ? (0.8 + 0.2 * sin(iTime * speed * 3.0)) : 1.0;

  float baseStrength = clamp(
    (0.45 + 0.15 * sin(distortedAngle * seedA + iTime * speed)) +
    (0.3 + 0.2 * cos(-distortedAngle * seedB + iTime * speed)),
    0.0, 1.0
  );

  return baseStrength * lengthFalloff * fadeFalloff * spreadFactor * pulse;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);

  vec2 finalRayDir = rayDir;
  if (mouseInfluence > 0.0) {
    vec2 mouseScreenPos = mousePos * iResolution.xy;
    vec2 mouseDirection = normalize(mouseScreenPos - rayPos);
    finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence));
  }

  vec4 rays1 = vec4(1.0) * rayStrength(rayPos, finalRayDir, coord, 36.2214, 21.11349, 1.5 * raysSpeed);
  vec4 rays2 = vec4(1.0) * rayStrength(rayPos, finalRayDir, coord, 22.3991, 18.0234, 1.1 * raysSpeed);

  fragColor = rays1 * 0.5 + rays2 * 0.4;

  if (noiseAmount > 0.0) {
    float n = noise(coord * 0.01 + iTime * 0.1);
    fragColor.rgb *= (1.0 - noiseAmount + noiseAmount * n);
  }

  float brightness = 1.0 - (coord.y / iResolution.y);
  fragColor.x *= 0.1 + brightness * 0.8;
  fragColor.y *= 0.3 + brightness * 0.6;
  fragColor.z *= 0.5 + brightness * 0.5;

  if (saturation != 1.0) {
    float gray = dot(fragColor.rgb, vec3(0.299, 0.587, 0.114));
    fragColor.rgb = mix(vec3(gray), fragColor.rgb, saturation);
  }

  fragColor.rgb *= raysColor;
}

void main() {
  vec4 color;
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor = color;
}`;

function hexToRgb(hex: string): [number, number, number] {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  if (!match) {
    return [1, 1, 1];
  }

  return [
    parseInt(match[1], 16) / 255,
    parseInt(match[2], 16) / 255,
    parseInt(match[3], 16) / 255,
  ];
}

function getAnchorAndDir(
  origin: RaysOrigin,
  width: number,
  height: number,
): { anchor: [number, number]; dir: [number, number] } {
  const outside = 0.2;

  switch (origin) {
    case "top-left":
      return { anchor: [0, -outside * height], dir: [0, 1] };
    case "top-right":
      return { anchor: [width, -outside * height], dir: [0, 1] };
    case "left":
      return { anchor: [-outside * width, 0.5 * height], dir: [1, 0] };
    case "right":
      return { anchor: [(1 + outside) * width, 0.5 * height], dir: [-1, 0] };
    case "bottom-left":
      return { anchor: [0, (1 + outside) * height], dir: [0, -1] };
    case "bottom-center":
      return { anchor: [0.5 * width, (1 + outside) * height], dir: [0, -1] };
    case "bottom-right":
      return { anchor: [width, (1 + outside) * height], dir: [0, -1] };
    default:
      return { anchor: [0.5 * width, -outside * height], dir: [0, 1] };
  }
}

export default function LightRays({
  raysOrigin = "top-center",
  raysColor = "#8df0ff",
  raysSpeed = 0.72,
  lightSpread = 0.82,
  rayLength = 1.95,
  pulsating = true,
  fadeDistance = 1.05,
  saturation = 1.05,
  followMouse = true,
  mouseInfluence = 0.08,
  noiseAmount = 0.05,
  distortion = 0.08,
  className = "",
}: LightRaysProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio || 1, 2),
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });
    const gl = renderer.gl;

    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    gl.canvas.className = "light-rays-canvas";
    container.replaceChildren(gl.canvas);

    const uniforms: WebGLUniforms = {
      iTime: { value: 0 },
      iResolution: { value: [1, 1] },
      rayPos: { value: [0, 0] },
      rayDir: { value: [0, 1] },
      raysColor: { value: hexToRgb(raysColor) },
      raysSpeed: { value: raysSpeed },
      lightSpread: { value: lightSpread },
      rayLength: { value: rayLength },
      pulsating: { value: pulsating ? 1 : 0 },
      fadeDistance: { value: fadeDistance },
      saturation: { value: saturation },
      mousePos: { value: [0.5, 0.5] },
      mouseInfluence: { value: mouseInfluence },
      noiseAmount: { value: noiseAmount },
      distortion: { value: distortion },
    };

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms,
    });
    const mesh = new Mesh(gl, { geometry, program });
    const mouse = { x: 0.5, y: 0.5 };
    const smoothMouse = { x: 0.5, y: 0.5 };
    let animationFrame = 0;
    let resizeFrame = 0;
    let mouseFrame = 0;
    let visible = true;

    const updatePlacement = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, container.clientWidth);
      const height = Math.max(1, container.clientHeight);

      renderer.dpr = dpr;
      renderer.setSize(width, height);

      const bufferWidth = width * dpr;
      const bufferHeight = height * dpr;
      const { anchor, dir } = getAnchorAndDir(raysOrigin, bufferWidth, bufferHeight);

      uniforms.iResolution.value = [bufferWidth, bufferHeight];
      uniforms.rayPos.value = anchor;
      uniforms.rayDir.value = dir;
    };

    const queueResize = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(updatePlacement);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!followMouse || mouseFrame) {
        return;
      }

      mouseFrame = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();

        mouse.x = (event.clientX - rect.left) / rect.width;
        mouse.y = (event.clientY - rect.top) / rect.height;
        mouseFrame = 0;
      });
    };

    const render = (time: number) => {
      if (!visible) {
        animationFrame = 0;
        return;
      }

      uniforms.iTime.value = time * 0.001;
      uniforms.raysColor.value = hexToRgb(raysColor);
      uniforms.raysSpeed.value = raysSpeed;
      uniforms.lightSpread.value = lightSpread;
      uniforms.rayLength.value = rayLength;
      uniforms.pulsating.value = pulsating ? 1 : 0;
      uniforms.fadeDistance.value = fadeDistance;
      uniforms.saturation.value = saturation;
      uniforms.mouseInfluence.value = followMouse ? mouseInfluence : 0;
      uniforms.noiseAmount.value = noiseAmount;
      uniforms.distortion.value = distortion;

      if (followMouse && mouseInfluence > 0) {
        const smoothing = 0.92;
        smoothMouse.x = smoothMouse.x * smoothing + mouse.x * (1 - smoothing);
        smoothMouse.y = smoothMouse.y * smoothing + mouse.y * (1 - smoothing);
      }

      uniforms.mousePos.value = [smoothMouse.x, smoothMouse.y];
      renderer.render({ scene: mesh });
      animationFrame = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;

        if (visible && !animationFrame) {
          animationFrame = requestAnimationFrame(render);
        }
      },
      { rootMargin: "80px", threshold: 0.05 },
    );

    updatePlacement();
    observer.observe(container);
    window.addEventListener("resize", queueResize, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    animationFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrame);
      cancelAnimationFrame(resizeFrame);
      cancelAnimationFrame(mouseFrame);
      observer.disconnect();
      window.removeEventListener("resize", queueResize);
      window.removeEventListener("mousemove", handleMouseMove);

      const canvas = gl.canvas;
      const loseContext = gl.getExtension("WEBGL_lose_context");
      loseContext?.loseContext();
      canvas.remove();
    };
  }, [
    distortion,
    fadeDistance,
    followMouse,
    lightSpread,
    mouseInfluence,
    noiseAmount,
    pulsating,
    rayLength,
    raysColor,
    raysOrigin,
    raysSpeed,
    saturation,
  ]);

  return <div aria-hidden="true" className={`light-rays ${className}`} ref={containerRef} />;
}
