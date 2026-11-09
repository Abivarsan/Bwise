import React from 'react';

interface BwiseLogoProps {
  className?: string;
  lightText?: boolean;
}

/**
 * Custom vector recreation of the exact Bwise logo shown in S1.jpg, S4.jpg, and S5.jpg:
 * Stylized 'B' integrating a golden striped bee body + antennae, paired with geometric 'wise'
 * and the "DIGITAL MARKETING & SOFTWARE SOLUTIONS" micro-tagline.
 */
export const BwiseLogo: React.FC<BwiseLogoProps> = ({ className = 'h-12', lightText = false }) => {
  const mainStroke = lightText ? '#FFFFFF' : '#141413';

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <svg
        viewBox="0 0 245 78"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
        aria-label="Bwise Digital Marketing & Software Solutions"
      >
        {/* Left Golden Bee Abdomen Stripes inside the 'B' */}
        <path
          d="M14 25 C6 33, 6 52, 16 62 C22 67, 29 66, 33 60 L20 24 Z"
          fill="#F59E0B"
        />
        <path
          d="M9 36 L26 42 M8 47 L28 53 M12 57 L26 61"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Small Bee Wing on Top-Left of 'B' */}
        <ellipse
          cx="12"
          cy="22"
          rx="9"
          ry="4.5"
          transform="rotate(-28 12 22)"
          fill="#FBBF24"
          opacity="0.85"
        />

        {/* Bold Stylized 'B' Frame */}
        <path
          d="M20 10 H44 C53 10, 58 15, 58 22 C58 27, 54 31, 48 33 C57 35, 62 41, 62 49 C62 59, 53 65, 40 65 H22"
          stroke={mainStroke}
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M22 10 V24" stroke={mainStroke} strokeWidth="6.5" strokeLinecap="round" />

        {/* Bee Head & Antennae inside upper loop of 'B' */}
        <circle cx="34" cy="24" r="5" fill={mainStroke} />
        <path d="M32 20 L28 15 M36 20 L41 16" stroke={mainStroke} strokeWidth="2" strokeLinecap="round" />

        {/* 'w' */}
        <path
          d="M72 34 L82 60 L93 40 L104 60 L114 34"
          stroke={mainStroke}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 'i' with Golden Dot */}
        <path d="M126 36 V60" stroke={mainStroke} strokeWidth="6" strokeLinecap="round" />
        <circle cx="126" cy="24" r="4" fill="#F59E0B" />

        {/* 's' */}
        <path
          d="M168 35 H145 C139 35, 137 39, 137 42 C137 46, 140 48, 146 48 H162 C168 48, 171 51, 171 55 C171 59, 167 61, 161 61 H137"
          stroke={mainStroke}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 'e' with Golden Accent Bar */}
        <path
          d="M214 48 H184 C184 39, 190 35, 199 35 C208 35, 214 39, 214 46 V48 Z"
          stroke={mainStroke}
          strokeWidth="5.5"
          strokeLinejoin="round"
        />
        <path
          d="M184 48 C184 57, 190 61, 200 61 H215"
          stroke={mainStroke}
          strokeWidth="5.5"
          strokeLinecap="round"
        />
        <rect x="193" y="42" width="15" height="4" rx="2" fill="#F59E0B" />

        {/* Subtitle: DIGITAL MARKETING & SOFTWARE SOLUTIONS */}
        <text
          x="66"
          y="74"
          fill={lightText ? '#D6D3D1' : '#57534E'}
          fontSize="6.3"
          fontWeight="700"
          letterSpacing="0.85"
          fontFamily="Plus Jakarta Sans, Inter, sans-serif"
        >
          DIGITAL MARKETING &amp; SOFTWARE SOLUTIONS
        </text>
      </svg>
    </div>
  );
};
