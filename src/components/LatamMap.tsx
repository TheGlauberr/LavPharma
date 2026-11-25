"use client";

import { useEffect, useState, useMemo } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

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
  const [countries, setCountries] = useState<CountryFeature[]>([]);
  const animated = !usePrefersReducedMotion();

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
      })
      .catch(() => {
        // The map is decorative; the country list next to it carries the content.
        setCountries([]);
      });
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
      className="relative aspect-[500/540] rounded-2xl border border-line bg-surface p-4"
    >
      <svg
        viewBox="30 20 500 540"
        className="h-full w-full"
        role="img"
        aria-label="Map of Latin America highlighting countries where LAV PHARMA registers products"
      >

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
                strokeWidth={0.6}
                className="fill-map-land stroke-surface transition-all duration-500"
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
                strokeWidth={0.8}
                className="fill-accent-blue stroke-surface transition-all duration-500"
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
                {animated ? (
                <circle cx={cx} cy={cy} r="4" fill="none" strokeWidth="1" opacity="0.5" className="stroke-accent-deep">
                  <animate
                    attributeName="r" values="4;12;4"
                    dur={`${3 + (i % 3)}s`}
                    begin={`${i * 0.4}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity" values="0.5;0;0.5"
                    dur={`${3 + (i % 3)}s`}
                    begin={`${i * 0.4}s`}
                    repeatCount="indefinite"
                  />
                </circle>
                ) : null}
                <circle cx={cx} cy={cy} r="3" className="fill-accent-deep" />
                <circle cx={cx} cy={cy} r="1.2" className="fill-surface" />
              </g>
            );
          })}
      </svg>
    </div>
  );
}
