"use client";

export default function HeroMolecule() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Outer glow rings */}
      <div className="absolute w-96 h-96 bg-accent-blue/[0.08] rounded-full blur-[80px] animate-pulse-soft" />
      <div className="absolute w-72 h-72 bg-accent-blue/[0.12] rounded-full blur-[50px] animate-pulse-soft" style={{ animationDelay: "2s" }} />

      {/* Rotating molecule */}
      <svg
        className="w-72 h-72 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[420px] animate-spin-slow"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          {/* Glow filter for nodes */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-strong" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer hexagonal ring */}
        <polygon
          points="200,55 325,127 325,273 200,345 75,273 75,127"
          fill="none"
          stroke="#4A90D9"
          strokeWidth="1.5"
          opacity="0.35"
        />
        {/* Inner hexagonal ring */}
        <polygon
          points="200,105 275,155 275,245 200,295 125,245 125,155"
          fill="none"
          stroke="#4A90D9"
          strokeWidth="1"
          opacity="0.2"
        />

        {/* Cross bonds */}
        <line x1="200" y1="55" x2="200" y2="345" stroke="#4A90D9" strokeWidth="0.8" opacity="0.12" />
        <line x1="75" y1="127" x2="325" y2="273" stroke="#4A90D9" strokeWidth="0.8" opacity="0.12" />
        <line x1="325" y1="127" x2="75" y2="273" stroke="#4A90D9" strokeWidth="0.8" opacity="0.12" />

        {/* Radial spokes */}
        <line x1="200" y1="55" x2="200" y2="15" stroke="#4A90D9" strokeWidth="1.2" opacity="0.3" />
        <line x1="325" y1="127" x2="360" y2="107" stroke="#4A90D9" strokeWidth="1.2" opacity="0.3" />
        <line x1="325" y1="273" x2="360" y2="293" stroke="#4A90D9" strokeWidth="1.2" opacity="0.3" />
        <line x1="200" y1="345" x2="200" y2="385" stroke="#4A90D9" strokeWidth="1.2" opacity="0.3" />
        <line x1="75" y1="273" x2="40" y2="293" stroke="#4A90D9" strokeWidth="1.2" opacity="0.3" />
        <line x1="75" y1="127" x2="40" y2="107" stroke="#4A90D9" strokeWidth="1.2" opacity="0.3" />

        {/* Vertex nodes - outer ring - glow halos */}
        <circle cx="200" cy="55" r="12" fill="#4A90D9" opacity="0.2" filter="url(#glow)" />
        <circle cx="325" cy="127" r="12" fill="#4A90D9" opacity="0.18" filter="url(#glow)" />
        <circle cx="325" cy="273" r="12" fill="#4A90D9" opacity="0.15" filter="url(#glow)" />
        <circle cx="200" cy="345" r="12" fill="#4A90D9" opacity="0.18" filter="url(#glow)" />
        <circle cx="75" cy="273" r="12" fill="#4A90D9" opacity="0.15" filter="url(#glow)" />
        <circle cx="75" cy="127" r="12" fill="#4A90D9" opacity="0.2" filter="url(#glow)" />

        {/* Vertex nodes - outer ring - solid */}
        <circle cx="200" cy="55" r="6" fill="#4A90D9" opacity="0.7" />
        <circle cx="325" cy="127" r="6" fill="#4A90D9" opacity="0.6" />
        <circle cx="325" cy="273" r="6" fill="#4A90D9" opacity="0.5" />
        <circle cx="200" cy="345" r="6" fill="#4A90D9" opacity="0.6" />
        <circle cx="75" cy="273" r="6" fill="#4A90D9" opacity="0.5" />
        <circle cx="75" cy="127" r="6" fill="#4A90D9" opacity="0.7" />

        {/* Vertex nodes - bright cores */}
        <circle cx="200" cy="55" r="2.5" fill="#8BB8E8" opacity="0.95" />
        <circle cx="325" cy="127" r="2.5" fill="#8BB8E8" opacity="0.85" />
        <circle cx="325" cy="273" r="2.5" fill="#8BB8E8" opacity="0.75" />
        <circle cx="200" cy="345" r="2.5" fill="#8BB8E8" opacity="0.85" />
        <circle cx="75" cy="273" r="2.5" fill="#8BB8E8" opacity="0.75" />
        <circle cx="75" cy="127" r="2.5" fill="#8BB8E8" opacity="0.95" />

        {/* Outer terminal nodes */}
        <circle cx="200" cy="15" r="5" fill="#4A90D9" opacity="0.6" filter="url(#glow)" />
        <circle cx="360" cy="107" r="5" fill="#4A90D9" opacity="0.5" filter="url(#glow)" />
        <circle cx="360" cy="293" r="5" fill="#4A90D9" opacity="0.45" filter="url(#glow)" />
        <circle cx="200" cy="385" r="5" fill="#4A90D9" opacity="0.5" filter="url(#glow)" />
        <circle cx="40" cy="293" r="5" fill="#4A90D9" opacity="0.45" filter="url(#glow)" />
        <circle cx="40" cy="107" r="5" fill="#4A90D9" opacity="0.6" filter="url(#glow)" />

        {/* Terminal bright cores */}
        <circle cx="200" cy="15" r="2" fill="#8BB8E8" opacity="0.9" />
        <circle cx="360" cy="107" r="2" fill="#8BB8E8" opacity="0.8" />
        <circle cx="360" cy="293" r="2" fill="#8BB8E8" opacity="0.7" />
        <circle cx="200" cy="385" r="2" fill="#8BB8E8" opacity="0.8" />
        <circle cx="40" cy="293" r="2" fill="#8BB8E8" opacity="0.7" />
        <circle cx="40" cy="107" r="2" fill="#8BB8E8" opacity="0.9" />

        {/* Inner ring nodes */}
        <circle cx="200" cy="105" r="4" fill="#4A90D9" opacity="0.4" />
        <circle cx="275" cy="155" r="4" fill="#4A90D9" opacity="0.35" />
        <circle cx="275" cy="245" r="4" fill="#4A90D9" opacity="0.3" />
        <circle cx="200" cy="295" r="4" fill="#4A90D9" opacity="0.35" />
        <circle cx="125" cy="245" r="4" fill="#4A90D9" opacity="0.3" />
        <circle cx="125" cy="155" r="4" fill="#4A90D9" opacity="0.4" />

        {/* Center node - strong glow */}
        <circle cx="200" cy="200" r="20" fill="#4A90D9" opacity="0.1" filter="url(#glow-strong)" />
        <circle cx="200" cy="200" r="10" fill="#4A90D9" opacity="0.35" />
        <circle cx="200" cy="200" r="4" fill="#8BB8E8" opacity="0.9" />
      </svg>

      {/* Floating accent particles (counter-rotating) */}
      <div
        className="absolute w-80 h-80 lg:w-[400px] lg:h-[400px]"
        style={{ animation: "spin-slow 40s linear infinite reverse" }}
      >
        <div className="absolute top-0 left-1/2 w-2 h-2 bg-accent-blue/50 rounded-full shadow-[0_0_6px_rgba(74,144,217,0.6)]" />
        <div className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-accent-blue/40 rounded-full shadow-[0_0_4px_rgba(74,144,217,0.5)]" />
        <div className="absolute top-1/3 left-0 w-1.5 h-1.5 bg-accent-blue/60 rounded-full shadow-[0_0_5px_rgba(74,144,217,0.7)]" />
        <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-accent-blue/30 rounded-full shadow-[0_0_4px_rgba(74,144,217,0.4)]" />
        <div className="absolute top-1/4 right-1/3 w-1 h-1 bg-white/40 rounded-full" />
      </div>
    </div>
  );
}
