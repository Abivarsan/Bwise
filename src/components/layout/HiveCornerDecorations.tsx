import React from 'react';

interface HiveCornerDecorationsProps {
  leftClassName?: string;
  rightClassName?: string;
  className?: string;
  opacityClassName?: string;
}

/**
 * Reusable top-left and top-right geometric honeycomb/pentagon corner line art
 * referenced from ServicesPage to maintain visual continuity across all pages.
 */
export const HiveCornerDecorations: React.FC<HiveCornerDecorationsProps> = ({
  leftClassName = 'top-6 2xl:-left-44',
  rightClassName = 'top-10 2xl:-right-52',
  className = 'hidden 2xl:block',
  opacityClassName = 'opacity-15',
}) => {
  return (
    <>
      {/* Decorative Honeycomb/Pentagon Line Art at Top-Left Edge */}
      <div
        className={`${className} absolute ${leftClassName} w-72 h-96 ${opacityClassName} pointer-events-none z-0`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 200 300" fill="none" stroke="#D97706" strokeWidth="1.5">
          <polygon points="60,10 100,32 100,78 60,100 20,78 20,32" />
          <polygon points="140,10 180,32 180,78 140,100 100,78 100,32" />
          <polygon points="100,78 140,100 140,146 100,168 60,146 60,100" />
          <polygon points="20,78 60,100 60,146 20,168 -20,146 -20,100" />
          <polygon points="60,146 100,168 100,214 60,236 20,214 20,168" />
        </svg>
      </div>

      {/* Decorative Honeycomb/Pentagon Line Art at Top-Right Edge */}
      <div
        className={`${className} absolute ${rightClassName} w-80 h-96 ${opacityClassName} pointer-events-none z-0`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 200 300" fill="none" stroke="#D97706" strokeWidth="1.5">
          <polygon points="60,10 100,32 100,78 60,100 20,78 20,32" />
          <polygon points="140,10 180,32 180,78 140,100 100,78 100,32" />
          <polygon points="100,78 140,100 140,146 100,168 60,146 60,100" />
          <polygon points="140,146 180,168 180,214 140,236 100,214 100,168" />
        </svg>
      </div>
    </>
  );
};
