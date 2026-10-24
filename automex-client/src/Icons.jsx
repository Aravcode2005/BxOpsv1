
import React from "react";

const paths = {
  arrow: (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),

  "arrow-up-right": (
    <>
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </>
  ),

  check: <path d="m4 12 5 5L20 6" />,

  "check-circle": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 2.6 2.7L16 9" />
    </>
  ),

  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),

  sparkles: (
    <>
      <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />
      <path d="m19 17 .7 2.3L22 20l-2.3.7L19 23l-.7-2.3L16 20l2.3-.7L19 17Z" />
    </>
  ),

  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),

  message: (
    <>
      <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H7l-4 2v-5.5A7.5 7.5 0 1 1 20 11.5Z" />
      <path d="M8 11h8M8 14h5" />
    </>
  ),

  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M7 3v4M17 3v4M3 10h18" />
      <path d="m9 15 2 2 4-4" />
    </>
  ),

  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
    </>
  ),

  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 21v-2a7.5 7.5 0 0 1 15 0v2" />
    </>
  ),

  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),

  building: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M9 21v-4h6v4M8 8h1m6 0h1M8 12h1m6 0h1" />
    </>
  ),

  pin: (
    <>
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),

  shield: (
    <>
      <path d="m12 2 9 4v6c0 6-4.5 9-9 10-4.5-1-9-4-9-10V6l9-4Z" />
      <path d="m8 12 2.5 2.5L16 9" />
    </>
  ),

  chevron: <path d="m6 9 6 6 6-6" />,

  close: (
    <>
      <path d="M5 5 19 19M19 5 5 19" />
    </>
  ),

  menu: (
    <>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </>
  ),

  bolt: <path d="m13 2-9 12h7l-1 8 10-12h-7l0-8Z" />,

  loop: (
    <>
      <path d="M6 8a7.5 7.5 0 0 1 12.8-2L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M18 16a7.5 7.5 0 0 1-12.8 2L3 16" />
      <path d="M3 21v-5h5" />
    </>
  ),

  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c5 5 5 13 0 18M12 3c-5 5-5 13 0 18" />
    </>
  ),
};

export default function Icon({
  name,
  size = 20,
  strokeWidth = 1.8,
  className = "",
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name] ?? paths.arrow}
    </svg>
  );
}
