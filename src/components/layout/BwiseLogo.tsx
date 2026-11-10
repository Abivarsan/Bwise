import React from 'react';

export interface BwiseLogoProps {
  className?: string;
  lightText?: boolean;
  /** 'full' for complete logo with wordmark & tagline, 'emblem' for the stylized B mark */
  variant?: 'full' | 'emblem';
}

/**
 * Authentic original Bwise logo from brand assets (Reference/Bwise_logo_light.jpeg):
 * - Light variant for white/cream surfaces (Navbar, cards) with dark navy lettering & golden orange accents.
 * - Dark variant for dark surfaces (Footer) with high-contrast white lettering & golden orange accents.
 * - Emblem variant for compact avatar or favicon usage.
 */
export const BwiseLogo: React.FC<BwiseLogoProps> = ({
  className = 'h-12',
  lightText = false,
  variant = 'full',
}) => {
  const logoSrc =
    variant === 'emblem'
      ? '/assets/branding/bwise-favicon.png'
      : lightText
      ? '/assets/branding/bwise-logo-dark.png'
      : '/assets/branding/bwise-logo-light.png';

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src={logoSrc}
        alt="Bwise Digital Marketing & Software Solutions"
        className="h-full w-auto object-contain block"
        draggable={false}
      />
    </div>
  );
};
