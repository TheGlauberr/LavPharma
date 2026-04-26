"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";

const HIGHLIGHTED = new Set([
  "320", // Guatemala
  "222", // El Salvador
  "340", // Honduras
  "188", // Costa Rica
  "591", // Panama
  "558", // Nicaragua
  "218", // Ecuador
  "068", // Bolivia
  "600", // Paraguay
  "858", // Uruguay
]);

interface CountryFeature {
  type: "Feature";
  id: string;
  properties: { name: string };
  geometry: GeoJSON.Geometry;
}

export default function LatamMap() {
  const ref = useRef<HTMLDivElement>(null);
  const [countries, setCountries] = useState<CountryFeature[]>([]);
  const [visible, setVisible] = useState(false);

  // Load TopoJSON
  useEffect(() => {
    fetch("/countries-110m.json")
      .then((r) => r.json())
      .then((topo: Topology) => {
        const geo = feature(
          topo,
          topo.objects.countries as GeometryCollection
        );
        setCountries(geo.features as unknown as CountryFeature[]);
      });
  }, []);

  // Scroll-triggered entrance
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const projection = useMemo(
    () =>
      geoMercator()
        .center([-72, -4])
        .scale(420)
        .translate([280, 280]),
    []
  );

  const path = useMemo(() => geoPath().projection(projection), [projection]);

  // Filter to Latin America region
  const latamFeatures = useMemo(() => {
    if (!countries.length) return [];
    return countries.filter((f) => {
      const c = path.centroid(f);
      return c[0] > 20 && c[0] < 520 && c[1] > 10 && c[1] < 560;
    });
  }, [countries, path]);

  return (
    <div
      ref={ref}
      className={`relative bg-navy-darker/60 rounded-2xl p-4 border border-white/5 transition-all duration-1000 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <svg
        viewBox="30 20 500 540"
        className="w-full h-auto max-w-lg mx-auto"
        aria-label="Map of Latin America highlighting countries where LAV PHARMA registers products"
      >
        <defs>
          <filter id="country-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Non-highlighted countries first (back layer) */}
        {latamFeatures
          .filter((f) => !HIGHLIGHTED.has(f.id))
          .map((f) => {
            const d = path(f);
            if (!d) return null;
            return (
              <path
                key={f.id}
                d={d}
                fill="#64748B"
                fillOpacity={0.35}
                stroke="#94A3B8"
                strokeWidth={0.3}
                className="transition-all duration-500"
              />
            );
          })}

        {/* Highlighted countries (front layer with glow) */}
        {latamFeatures
          .filter((f) => HIGHLIGHTED.has(f.id))
          .map((f) => {
            const d = path(f);
            if (!d) return null;
            return (
              <path
                key={f.id}
                d={d}
                fill="#4A90D9"
                fillOpacity={0.85}
                stroke="#BFDBFE"
                strokeWidth={1}
                filter="url(#country-glow)"
                className="transition-all duration-500"
              />
            );
          })}

        {/* Pulse dots on highlighted countries */}
        {latamFeatures
          .filter((f) => HIGHLIGHTED.has(f.id))
          .map((f, i) => {
            const [cx, cy] = path.centroid(f);
            if (!cx || !cy) return null;
            return (
              <g key={`dot-${f.id}`}>
                {/* Pulse ring */}
                <circle cx={cx} cy={cy} r="4" fill="none" stroke="#93C5FD" strokeWidth="1" opacity="0.6">
                  <animate
                    attributeName="r" values="4;12;4"
                    dur={`${3 + (i % 3)}s`}
                    begin={`${i * 0.4}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity" values="0.6;0;0.6"
                    dur={`${3 + (i % 3)}s`}
                    begin={`${i * 0.4}s`}
                    repeatCount="indefinite"
                  />
                </circle>
                {/* Solid dot */}
                <circle cx={cx} cy={cy} r="3" fill="#93C5FD" opacity="0.9" />
                <circle cx={cx} cy={cy} r="1.2" fill="#DBEAFE" opacity="0.95" />
              </g>
            );
          })}
      </svg>
    </div>
  );
}
