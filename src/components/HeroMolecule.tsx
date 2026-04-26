"use client";

export default function HeroMolecule() {
  const navy = "#2a2f3d";
  const blue = "#4A90D9";
  const blueLight = "#7EB3E8";

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Outer glow */}
      <div className="absolute w-96 h-96 bg-accent-blue/[0.06] rounded-full blur-[80px] animate-pulse-soft" />
      <div className="absolute w-72 h-72 bg-accent-blue/[0.09] rounded-full blur-[50px] animate-pulse-soft" style={{ animationDelay: "2s" }} />

      <svg
        className="w-72 h-72 sm:w-80 sm:h-80 lg:w-[400px] lg:h-[400px] animate-spin-slow"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <filter id="mg" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="mgs" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Outer hex */}
        <polygon points="200,55 325,127 325,273 200,345 75,273 75,127"
          fill="none" stroke={navy} strokeWidth="1.8" opacity="0.18" />
        {/* Inner hex */}
        <polygon points="200,105 275,155 275,245 200,295 125,245 125,155"
          fill="none" stroke={blue} strokeWidth="1" opacity="0.14" />

        {/* Cross bonds */}
        <line x1="200" y1="55" x2="200" y2="345" stroke={navy} strokeWidth="0.8" opacity="0.07" />
        <line x1="75" y1="127" x2="325" y2="273" stroke={navy} strokeWidth="0.8" opacity="0.07" />
        <line x1="325" y1="127" x2="75" y2="273" stroke={navy} strokeWidth="0.8" opacity="0.07" />

        {/* Spokes */}
        {[[200,55,200,15],[325,127,360,107],[325,273,360,293],
          [200,345,200,385],[75,273,40,293],[75,127,40,107]].map(([x1,y1,x2,y2],i) => (
          <line key={`s${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={blue} strokeWidth="1.2" opacity="0.22" />
        ))}

        {/* Outer ring nodes */}
        {[[200,55],[325,127],[325,273],[200,345],[75,273],[75,127]].map(([cx,cy],i) => {
          const op = [0.65,0.55,0.45,0.55,0.45,0.65][i];
          return (
            <g key={`o${i}`}>
              <circle cx={cx} cy={cy} r="14" fill={blue} opacity={op * 0.25} filter="url(#mg)" />
              <circle cx={cx} cy={cy} r="6" fill={blue} opacity={op} />
              <circle cx={cx} cy={cy} r="2.5" fill={blueLight} opacity={op + 0.2} />
            </g>
          );
        })}

        {/* Terminal nodes */}
        {[[200,15],[360,107],[360,293],[200,385],[40,293],[40,107]].map(([cx,cy],i) => {
          const op = [0.55,0.45,0.4,0.45,0.4,0.55][i];
          return (
            <g key={`t${i}`}>
              <circle cx={cx} cy={cy} r="5" fill={blue} opacity={op} filter="url(#mg)" />
              <circle cx={cx} cy={cy} r="2" fill={blueLight} opacity={op + 0.2} />
            </g>
          );
        })}

        {/* Inner ring nodes */}
        {[[200,105],[275,155],[275,245],[200,295],[125,245],[125,155]].map(([cx,cy],i) => (
          <circle key={`i${i}`} cx={cx} cy={cy} r="4" fill={navy} opacity={0.28 - i * 0.02} />
        ))}

        {/* Center node */}
        <circle cx="200" cy="200" r="22" fill={blue} opacity="0.08" filter="url(#mgs)" />
        <circle cx="200" cy="200" r="10" fill={blue} opacity="0.3" />
        <circle cx="200" cy="200" r="4" fill={blueLight} opacity="0.85" />
      </svg>

      {/* Counter-rotating particles */}
      <div className="absolute w-80 h-80 lg:w-[380px] lg:h-[380px]"
        style={{ animation: "spin-slow 40s linear infinite reverse" }}>
        <div className="absolute top-0 left-1/2 w-2 h-2 bg-accent-blue/40 rounded-full shadow-[0_0_6px_rgba(74,144,217,0.5)]" />
        <div className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-accent-blue/30 rounded-full shadow-[0_0_4px_rgba(74,144,217,0.4)]" />
        <div className="absolute top-1/3 left-0 w-1.5 h-1.5 bg-accent-blue/50 rounded-full shadow-[0_0_5px_rgba(74,144,217,0.5)]" />
        <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-navy/15 rounded-full" />
      </div>
    </div>
  );
}
