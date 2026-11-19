import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion';

/**
 * Shared scroll-triggered motion toolkit.
 * - Animates only opacity + transform (GPU-composited, no layout shift).
 * - Each element animates once, then stops observing.
 * - Respects OS "Reduce motion" (via MotionConfig in App.tsx + useReducedMotion).
 */

export const EASE = [0.22, 1, 0.36, 1] as const;

const VIEWPORT = { once: true, amount: 'some' as const, margin: '0px 0px -40px 0px' };

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

/** True for wide screens with a precise pointer (mouse/trackpad). */
const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(() =>
    typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
};

export const useIsDesktopPointer = () => useMediaQuery('(min-width: 768px) and (pointer: fine)');
const useIsSmallScreen = () => useMediaQuery('(max-width: 639px)');

const offsetFor = (direction: Direction, distance: number) => {
  switch (direction) {
    case 'up':
      return { x: 0, y: distance };
    case 'down':
      return { x: 0, y: -distance };
    case 'left':
      return { x: distance, y: 0 };
    case 'right':
      return { x: -distance, y: 0 };
    default:
      return { x: 0, y: 0 };
  }
};

/* -------------------------------------------------------------------------- */
/*  Reveal: fade + directional slide when scrolled into view                  */
/* -------------------------------------------------------------------------- */

interface RevealProps {
  children: React.ReactNode;
  /** Direction the element travels FROM. 'left' slides in from the left side. */
  direction?: Direction;
  delay?: number;
  duration?: number;
  /** Slide distance in px on desktop (halved on small screens). */
  distance?: number;
  /** Subtle starting scale (e.g. 0.98) for banners. */
  scale?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'span';
  id?: string;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.65,
  distance = 24,
  scale,
  className,
  as = 'div',
  id,
}) => {
  const reduce = useReducedMotion();
  const isSmall = useIsSmallScreen();
  const d = isSmall ? Math.round(distance / 2) : distance;
  // 'left' means it enters from the left, so it starts at negative x.
  const resolvedDir: Direction =
    direction === 'left' ? 'right' : direction === 'right' ? 'left' : direction;
  const { x, y } = offsetFor(resolvedDir, d);

  const MotionTag = motion[as] as typeof motion.div;

  if (reduce) {
    return (
      <MotionTag id={id} className={className}>
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      id={id}
      className={className}
      initial={{ opacity: 0, x, y, scale: scale ?? 1 }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={VIEWPORT}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
};

/* -------------------------------------------------------------------------- */
/*  StaggerGroup / StaggerItem: sequential reveal for grids & lists           */
/* -------------------------------------------------------------------------- */

interface StaggerGroupProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: 'div' | 'ul';
}

export const StaggerGroup: React.FC<StaggerGroupProps> = ({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  as = 'div',
}) => {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  const variants: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: reduce ? 0 : delay },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </MotionTag>
  );
};

interface StaggerItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd'> {
  children: React.ReactNode;
  distance?: number;
  as?: 'div' | 'li';
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  distance = 20,
  as = 'div',
  ...rest
}) => {
  const reduce = useReducedMotion();
  const isSmall = useIsSmallScreen();
  const d = isSmall ? Math.round(distance / 2) : distance;
  const MotionTag = motion[as] as typeof motion.div;

  const variants: Variants = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: d },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
      };

  return (
    <MotionTag variants={variants} {...(rest as Record<string, unknown>)}>
      {children}
    </MotionTag>
  );
};

/* -------------------------------------------------------------------------- */
/*  ParallaxImage: gentle scroll-linked vertical drift inside overflow frame  */
/* -------------------------------------------------------------------------- */

interface ParallaxImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Fraction of travel (0.08 = ±8%). */
  strength?: number;
}

const DesktopParallaxImage: React.FC<ParallaxImageProps> = ({
  strength = 0.07,
  className = '',
  style,
  ...imgProps
}) => {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start end', 'end start'],
  });
  const pct = Math.round(strength * 100);
  const y = useTransform(scrollYProgress, [0, 1], [`-${pct}%`, `${pct}%`]);

  // Outer span (tracked) fills the parent frame; inner motion span drifts.
  // The <img> keeps its own classes, so hover zoom effects still work.
  // Parent must be `relative overflow-hidden` (all image frames already are).
  return (
    <span ref={wrapperRef} className="block absolute inset-0 overflow-hidden">
      <motion.span
        className="block w-full h-full"
        style={{ y, scale: 1 + strength * 2, willChange: 'transform' }}
      >
        <img {...imgProps} className={className} style={style} />
      </motion.span>
    </span>
  );
};

export const ParallaxImage: React.FC<ParallaxImageProps> = (props) => {
  const reduce = useReducedMotion();
  const isDesktop = useIsDesktopPointer();

  if (reduce || !isDesktop) {
    const { strength: _strength, ...imgProps } = props;
    return <img {...imgProps} />;
  }

  return <DesktopParallaxImage {...props} />;
};
