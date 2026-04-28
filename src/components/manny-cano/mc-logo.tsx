interface MCLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'white';
}

const sizeMap = {
  sm: { width: 24, height: 24 },
  md: { width: 32, height: 32 },
  lg: { width: 40, height: 40 },
  xl: { width: 56, height: 56 },
};

const colorMap = {
  light: '#F4EFE6',
  dark: '#0A1A2F',
  white: '#FFFFFF',
};

export function MCLogo({ className, size = 'md', variant = 'dark' }: MCLogoProps) {
  const { width, height } = sizeMap[size];
  const color = colorMap[variant];

  return (
    <svg
      viewBox="0 0 100 100"
      width={width}
      height={height}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Geometric angular "M" - Manny Canó logo */}
      <path
        d="M10 85L10 15L35 55L50 30L65 55L90 15L90 85L75 85L75 45L60 65L50 50L40 65L25 45L25 85Z"
        fill={color}
      />
    </svg>
  );
}
