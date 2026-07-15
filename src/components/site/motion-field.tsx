"use client";

import { animate } from "animejs/animation";
import { stagger } from "animejs/utils";
import { useEffect, useRef } from "react";

const nodes = [
  { left: "8%", top: "18%" },
  { left: "24%", top: "64%" },
  { left: "43%", top: "28%" },
  { left: "63%", top: "72%" },
  { left: "78%", top: "22%" },
  { left: "93%", top: "58%" },
];

export function MotionField() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (
      !root ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const nodeAnimation = animate(root.querySelectorAll(".motion-node"), {
      opacity: [0.16, 0.72],
      scale: [0.72, 1.25],
      duration: 2100,
      delay: stagger(240, { from: "center" }),
      ease: "inOutSine",
      loop: true,
      alternate: true,
    });

    const pathAnimation = animate(root.querySelectorAll(".motion-path"), {
      strokeDashoffset: [-180, 0],
      opacity: [0.08, 0.36],
      duration: 4200,
      delay: stagger(320),
      ease: "linear",
      loop: true,
    });

    return () => {
      nodeAnimation.cancel();
      pathAnimation.cancel();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <svg
        className="absolute inset-0 size-full"
        viewBox="0 0 1200 640"
        preserveAspectRatio="none"
      >
        <title>Decorative animated network signal</title>
        <path
          className="motion-path"
          d="M96 115L288 410L516 180L756 460L936 142L1116 370"
        />
        <path className="motion-path" d="M96 115L516 180L936 142" />
        <path className="motion-path" d="M288 410L756 460L1116 370" />
      </svg>
      {nodes.map((node) => (
        <span
          key={`${node.left}-${node.top}`}
          className="motion-node absolute size-1.5 rounded-full bg-primary shadow-[0_0_22px_var(--primary)]"
          style={node}
        />
      ))}
    </div>
  );
}
