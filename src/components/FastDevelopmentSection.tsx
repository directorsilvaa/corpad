export default function FastDevelopmentSection() {
  return (
    <section className="fast-dev-section" aria-labelledby="fast-dev-title">
      <div className="fast-dev-copy">
        <span className="section-kicker">Velocidade</span>
        <h2 id="fast-dev-title">Desenvolvimento rapido, sem improviso.</h2>
        <p>
          Reduza semanas de trabalho com solucoes ja estruturadas, validacao
          tecnica e foco no que realmente gera valor para o seu negocio.
        </p>
      </div>

      <article className="fast-dev-card">
        <div className="fast-dev-visual" aria-hidden="true">
          <span className="fast-dev-badge">10x Faster</span>
          <Speedometer />
        </div>
        <div className="fast-dev-card-copy">
          <h3>Desenvolvimento Rapido</h3>
          <p>
            Solucoes prontas para acelerar implementacao, reduzir retrabalho e
            entregar uma base digital mais eficiente.
          </p>
        </div>
      </article>
    </section>
  );
}

function Speedometer() {
  return (
    <svg
      className="fast-dev-speedometer"
      viewBox="0 0 3918 3918"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="fast-dev-speed-mask"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="432"
        y="426"
        width="3047"
        height="1527"
      >
        <path
          d="M3386.24 1952.8C3438.71 1952.8 3481.55 1910.21 3478.29 1857.85C3455.23 1487.78 3298.01 1137.47 3034.29 873.754C2748.11 587.573 2359.96 426.799 1955.24 426.799C1550.52 426.799 1162.38 587.573 876.197 873.754C612.479 1137.47 455.253 1487.78 432.196 1857.85C428.934 1910.21 471.775 1952.8 524.242 1952.8L895.04 1952.8C947.507 1952.8 989.555 1910.16 994.709 1857.95C1016.54 1636.79 1114.23 1428.81 1272.74 1270.3C1453.75 1089.29 1699.25 987.597 1955.24 987.597C2211.23 987.597 2456.73 1089.29 2637.74 1270.3C2796.26 1428.81 2893.94 1636.79 2915.78 1857.95C2920.93 1910.16 2962.98 1952.8 3015.44 1952.8H3386.24Z"
          fill="#C3C0C0"
        />
      </mask>
      <g mask="url(#fast-dev-speed-mask)">
        <path
          d="M3481.25 1952.8C3481.25 1548.08 3320.47 1159.93 3034.29 873.752C2748.11 587.571 2359.97 426.797 1955.25 426.797C1550.53 426.797 1162.38 587.571 876.201 873.752C590.021 1159.93 429.246 1548.08 429.246 1952.8L990.044 1952.8C990.044 1696.81 1091.73 1451.31 1272.75 1270.3C1453.76 1089.29 1699.26 987.595 1955.25 987.595C2211.23 987.595 2456.74 1089.29 2637.75 1270.3C2818.76 1451.31 2920.45 1696.81 2920.45 1952.8L3481.25 1952.8Z"
          fill="#15191b"
        />
        <g className="fast-dev-speed-fill">
          <path
            d="M1081.68 3204.02C1413.52 3435.71 1823.81 3526.08 2222.28 3455.25C2620.76 3384.43 2974.78 3158.21 3206.46 2826.37C3438.15 2494.52 3528.52 2084.23 3457.7 1685.76C3386.87 1287.28 3160.65 933.264 2828.81 701.58L2507.78 1161.4C2717.67 1307.94 2860.75 1531.86 2905.55 1783.9C2950.35 2035.93 2893.19 2295.44 2746.65 2505.34C2600.1 2715.23 2376.19 2858.31 2124.15 2903.11C1872.11 2947.91 1612.6 2890.75 1402.71 2744.21L1081.68 3204.02Z"
            fill="currentColor"
          />
        </g>
      </g>
      <g className="fast-dev-needle">
        <path
          d="M2826.29 689.029L2087.72 1917.75C2061.25 1961.8 2003.1 1974.39 1960.78 1945.23C1918.46 1916.07 1909.51 1857.25 1941.23 1816.82L2826.29 689.029Z"
          fill="#0c0f11"
        />
        <path
          d="M2086.87 1917.24C2060.69 1960.79 2003.19 1973.23 1961.35 1944.4C1919.5 1915.57 1910.65 1857.42 1942.02 1817.44L2817.15 702.301L2086.87 1917.24Z"
          stroke="url(#fast-dev-needle-glow)"
          strokeWidth="2"
        />
      </g>
      <circle cx="2006" cy="1877" r="35" fill="#E7E7E7" />
      <defs>
        <linearGradient
          id="fast-dev-needle-glow"
          x1="2819.23"
          y1="662.299"
          x2="2495.16"
          y2="1336.59"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#000000" />
        </linearGradient>
      </defs>
    </svg>
  );
}
