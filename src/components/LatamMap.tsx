"use client";

const HIGHLIGHTED_COUNTRIES: Record<string, string> = {
  GT: "Guatemala",
  SV: "El Salvador",
  HN: "Honduras",
  CR: "Costa Rica",
  PA: "Panamá",
  PY: "Paraguay",
  UY: "Uruguay",
  EC: "Ecuador",
  BO: "Bolivia",
};

export default function LatamMap() {
  return (
    <svg
      viewBox="80 50 320 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto max-w-md mx-auto"
      aria-label="Map of Latin America highlighting countries where LAV PHARMA registers products"
    >
      {/* Mexico & Central America region */}
      {/* Mexico (not highlighted) */}
      <path
        d="M95 95 L140 80 L165 85 L175 100 L170 115 L155 125 L140 130 L130 125 L120 115 L100 110 Z"
        fill="#CBD5E1"
        stroke="white"
        strokeWidth="1"
      />
      {/* Belize (not highlighted) */}
      <path
        d="M155 125 L162 122 L164 132 L157 135 Z"
        fill="#CBD5E1"
        stroke="white"
        strokeWidth="0.5"
      />
      {/* Guatemala */}
      <path
        d="M140 130 L155 125 L157 135 L155 142 L145 145 L138 140 Z"
        fill="#4A90D9"
        stroke="white"
        strokeWidth="1"
        opacity="0.9"
      />
      {/* Honduras */}
      <path
        d="M155 125 L162 122 L178 124 L182 130 L175 138 L163 140 L155 142 L157 135 Z"
        fill="#4A90D9"
        stroke="white"
        strokeWidth="1"
        opacity="0.85"
      />
      {/* El Salvador */}
      <path
        d="M145 145 L155 142 L163 140 L160 148 L150 150 Z"
        fill="#4A90D9"
        stroke="white"
        strokeWidth="1"
        opacity="0.9"
      />
      {/* Nicaragua (not highlighted) */}
      <path
        d="M163 140 L175 138 L182 130 L188 140 L185 155 L170 158 L160 148 Z"
        fill="#CBD5E1"
        stroke="white"
        strokeWidth="1"
      />
      {/* Costa Rica */}
      <path
        d="M170 158 L185 155 L188 165 L182 172 L174 168 Z"
        fill="#4A90D9"
        stroke="white"
        strokeWidth="1"
        opacity="0.85"
      />
      {/* Panamá */}
      <path
        d="M182 172 L188 165 L200 162 L210 168 L205 175 L195 178 L185 176 Z"
        fill="#4A90D9"
        stroke="white"
        strokeWidth="1"
        opacity="0.9"
      />

      {/* South America */}
      {/* Colombia (not highlighted) */}
      <path
        d="M195 178 L205 175 L215 172 L230 180 L240 195 L235 215 L220 225 L200 220 L190 205 L185 195 Z"
        fill="#CBD5E1"
        stroke="white"
        strokeWidth="1"
      />
      {/* Venezuela (not highlighted) */}
      <path
        d="M230 180 L260 170 L280 178 L275 195 L255 200 L240 195 Z"
        fill="#CBD5E1"
        stroke="white"
        strokeWidth="1"
      />
      {/* Guyana/Suriname/Fr Guiana (not highlighted) */}
      <path
        d="M280 178 L310 175 L315 190 L300 200 L285 198 L275 195 Z"
        fill="#CBD5E1"
        stroke="white"
        strokeWidth="0.8"
      />
      {/* Ecuador */}
      <path
        d="M190 205 L200 220 L195 235 L180 230 L178 215 Z"
        fill="#4A90D9"
        stroke="white"
        strokeWidth="1"
        opacity="0.85"
      />
      {/* Peru (not highlighted) */}
      <path
        d="M178 215 L180 230 L195 235 L200 220 L220 225 L225 250 L220 280 L200 290 L185 275 L175 250 Z"
        fill="#CBD5E1"
        stroke="white"
        strokeWidth="1"
      />
      {/* Brazil (not highlighted) */}
      <path
        d="M220 225 L235 215 L255 200 L275 195 L300 200 L330 215 L345 240 L350 280 L340 320 L320 350 L290 365 L260 360 L240 340 L230 310 L225 280 L220 280 L225 250 Z"
        fill="#CBD5E1"
        stroke="white"
        strokeWidth="1"
      />
      {/* Bolivia */}
      <path
        d="M225 280 L230 310 L240 320 L235 335 L220 340 L210 325 L200 300 L200 290 L220 280 Z"
        fill="#4A90D9"
        stroke="white"
        strokeWidth="1"
        opacity="0.85"
      />
      {/* Paraguay */}
      <path
        d="M240 320 L260 315 L270 330 L265 345 L250 350 L235 335 Z"
        fill="#4A90D9"
        stroke="white"
        strokeWidth="1"
        opacity="0.9"
      />
      {/* Chile (not highlighted) */}
      <path
        d="M210 325 L220 340 L225 360 L220 390 L215 420 L210 440 L205 435 L208 400 L212 370 L215 345 L200 300 Z"
        fill="#CBD5E1"
        stroke="white"
        strokeWidth="1"
      />
      {/* Uruguay */}
      <path
        d="M270 330 L280 340 L278 355 L265 360 L260 350 L265 345 Z"
        fill="#4A90D9"
        stroke="white"
        strokeWidth="1"
        opacity="0.9"
      />
      {/* Argentina (not highlighted) */}
      <path
        d="M235 335 L250 350 L260 350 L265 360 L278 355 L275 380 L260 405 L245 420 L230 435 L220 440 L215 420 L220 390 L225 360 L220 340 Z"
        fill="#CBD5E1"
        stroke="white"
        strokeWidth="1"
      />

      {/* Country labels for highlighted countries */}
      <circle cx="147" cy="136" r="3" fill="white" opacity="0.9" />
      <circle cx="168" cy="132" r="3" fill="white" opacity="0.9" />
      <circle cx="155" cy="146" r="3" fill="white" opacity="0.9" />
      <circle cx="178" cy="165" r="3" fill="white" opacity="0.9" />
      <circle cx="196" cy="170" r="3" fill="white" opacity="0.9" />
      <circle cx="188" cy="222" r="3" fill="white" opacity="0.9" />
      <circle cx="222" cy="318" r="3" fill="white" opacity="0.9" />
      <circle cx="252" cy="335" r="3" fill="white" opacity="0.9" />
      <circle cx="272" cy="345" r="3" fill="white" opacity="0.9" />

      {/* Pulse effect on a few key nodes */}
      <circle cx="147" cy="136" r="6" fill="#4A90D9" opacity="0.3">
        <animate attributeName="r" values="4;8;4" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0.1;0.3" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="196" cy="170" r="6" fill="#4A90D9" opacity="0.3">
        <animate attributeName="r" values="4;8;4" dur="3s" begin="1s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0.1;0.3" dur="3s" begin="1s" repeatCount="indefinite" />
      </circle>
      <circle cx="252" cy="335" r="6" fill="#4A90D9" opacity="0.3">
        <animate attributeName="r" values="4;8;4" dur="3s" begin="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0.1;0.3" dur="3s" begin="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
