export default function MolecularBg({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Primary cluster - right side */}
      <circle cx="600" cy="120" r="8" fill="currentColor" opacity="0.3" />
      <circle cx="700" cy="80" r="5" fill="currentColor" opacity="0.25" />
      <circle cx="650" cy="200" r="10" fill="currentColor" opacity="0.28" />
      <circle cx="750" cy="160" r="4" fill="currentColor" opacity="0.2" />
      <circle cx="550" cy="280" r="7" fill="currentColor" opacity="0.25" />
      <circle cx="720" cy="300" r="6" fill="currentColor" opacity="0.2" />
      <circle cx="680" cy="380" r="9" fill="currentColor" opacity="0.25" />
      <circle cx="580" cy="420" r="5" fill="currentColor" opacity="0.18" />
      <circle cx="760" cy="440" r="7" fill="currentColor" opacity="0.22" />

      {/* Secondary cluster - center */}
      <circle cx="400" cy="100" r="6" fill="currentColor" opacity="0.18" />
      <circle cx="350" cy="220" r="5" fill="currentColor" opacity="0.15" />
      <circle cx="450" cy="350" r="8" fill="currentColor" opacity="0.2" />
      <circle cx="300" cy="400" r="4" fill="currentColor" opacity="0.14" />
      <circle cx="500" cy="500" r="6" fill="currentColor" opacity="0.18" />

      {/* Tertiary cluster - left side */}
      <circle cx="100" cy="150" r="4" fill="currentColor" opacity="0.12" />
      <circle cx="180" cy="300" r="6" fill="currentColor" opacity="0.15" />
      <circle cx="80" cy="450" r="5" fill="currentColor" opacity="0.12" />
      <circle cx="200" cy="500" r="3" fill="currentColor" opacity="0.1" />

      {/* Bonds - primary cluster */}
      <line x1="600" y1="120" x2="700" y2="80" stroke="currentColor" strokeWidth="1.5" opacity="0.18" />
      <line x1="600" y1="120" x2="650" y2="200" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
      <line x1="700" y1="80" x2="750" y2="160" stroke="currentColor" strokeWidth="1" opacity="0.15" />
      <line x1="650" y1="200" x2="750" y2="160" stroke="currentColor" strokeWidth="1" opacity="0.15" />
      <line x1="650" y1="200" x2="550" y2="280" stroke="currentColor" strokeWidth="1.5" opacity="0.18" />
      <line x1="650" y1="200" x2="720" y2="300" stroke="currentColor" strokeWidth="1" opacity="0.15" />
      <line x1="720" y1="300" x2="680" y2="380" stroke="currentColor" strokeWidth="1.5" opacity="0.18" />
      <line x1="550" y1="280" x2="680" y2="380" stroke="currentColor" strokeWidth="1" opacity="0.12" />
      <line x1="680" y1="380" x2="580" y2="420" stroke="currentColor" strokeWidth="1" opacity="0.15" />
      <line x1="680" y1="380" x2="760" y2="440" stroke="currentColor" strokeWidth="1" opacity="0.15" />

      {/* Bonds - connecting clusters */}
      <line x1="400" y1="100" x2="600" y2="120" stroke="currentColor" strokeWidth="1" opacity="0.1" />
      <line x1="350" y1="220" x2="550" y2="280" stroke="currentColor" strokeWidth="1" opacity="0.1" />
      <line x1="450" y1="350" x2="680" y2="380" stroke="currentColor" strokeWidth="1" opacity="0.1" />
      <line x1="400" y1="100" x2="350" y2="220" stroke="currentColor" strokeWidth="1" opacity="0.12" />
      <line x1="350" y1="220" x2="450" y2="350" stroke="currentColor" strokeWidth="1" opacity="0.12" />
      <line x1="450" y1="350" x2="300" y2="400" stroke="currentColor" strokeWidth="1" opacity="0.1" />
      <line x1="450" y1="350" x2="500" y2="500" stroke="currentColor" strokeWidth="1" opacity="0.1" />

      {/* Bonds - left side */}
      <line x1="100" y1="150" x2="180" y2="300" stroke="currentColor" strokeWidth="1" opacity="0.08" />
      <line x1="180" y1="300" x2="350" y2="220" stroke="currentColor" strokeWidth="1" opacity="0.08" />
      <line x1="180" y1="300" x2="80" y2="450" stroke="currentColor" strokeWidth="1" opacity="0.08" />
      <line x1="80" y1="450" x2="200" y2="500" stroke="currentColor" strokeWidth="1" opacity="0.08" />

      {/* Hexagonal ring accents */}
      <polygon
        points="670,240 700,225 730,240 730,270 700,285 670,270"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.12"
      />
      <polygon
        points="560,340 580,330 600,340 600,360 580,370 560,360"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.08"
      />
    </svg>
  );
}
