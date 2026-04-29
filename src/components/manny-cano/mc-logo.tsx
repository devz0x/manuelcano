'use client';

import Image from 'next/image';

/* ─────────────────────────────────────────────────────────────── */
/*  Full Logo (icon + "MANNY CANÓ" text) — uses the actual JPG    */
/* ─────────────────────────────────────────────────────────────── */

interface MCLogoProps {
  className?: string;
  height?: number;
  /** On dark backgrounds, the logo inverts to white */
  invert?: boolean;
  /** Use icon-only version (just the M mark, no text) */
  iconOnly?: boolean;
}

export function MCLogo({
  className,
  height = 36,
  invert = false,
  iconOnly = false,
}: MCLogoProps) {
  /* The full logo JPG has icon + "MANNY CANÓ" text stacked vertically.
     The icon occupies roughly the top 45% of the image. */
  const iconHeight = Math.round(height);
  const fullHeight = iconOnly ? iconHeight : Math.round(height * 1.8);

  return (
    <div
      className={`relative flex-shrink-0 ${className || ''}`}
      style={{
        width: iconOnly ? iconHeight : Math.round(fullHeight * 0.72),
        height: fullHeight,
      }}
    >
      <Image
        src="/img/brand/logo.jpg"
        alt="Manny Canó"
        fill
        className={`object-contain ${
          invert
            ? '[filter:invert(1)_brightness(1.2)] mix-blend-screen'
            : ''
        }`}
        priority={false}
        sizes={`${fullHeight}px`}
      />
      {/* When iconOnly, clip the bottom portion showing text */}
      {iconOnly && (
        <div
          className="absolute bottom-0 left-0 right-0 bg-inherit"
          style={{ height: '45%' }}
        />
      )}
    </div>
  );
}
