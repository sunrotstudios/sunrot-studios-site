import { FC, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { clsx } from 'clsx';

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  animationType?: 'fade' | 'slide' | 'reveal' | 'split';
  delay?: number;
  duration?: number;
  staggerDelay?: number;
  triggerOnView?: boolean;
}

const AnimatedHeading: FC<AnimatedHeadingProps> = ({
  text,
  className,
  animationType = 'fade',
  delay = 0,
  duration = 0.8,
  staggerDelay = 0.05,
  triggerOnView = true
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();

  useEffect(() => {
    if (triggerOnView && isInView) {
      controls.start('visible');
    } else if (!triggerOnView) {
      controls.start('visible');
    }
  }, [controls, isInView, triggerOnView]);

  // Split text into individual characters for animation
  const characters = text.split('');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const getCharacterVariants = () => {
    switch (animationType) {
      case 'slide':
        return {
          hidden: { y: 20, opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
            transition: { duration, ease: [0.25, 0.1, 0.25, 1.0] },
          },
        };
      case 'reveal':
        return {
          hidden: { y: '100%' },
          visible: {
            y: 0,
            transition: { duration, ease: [0.25, 0.1, 0.25, 1.0] },
          },
        };
      case 'split':
        return {
          hidden: { scaleY: 0, opacity: 0 },
          visible: {
            scaleY: 1,
            opacity: 1,
            transition: { duration, ease: [0.25, 0.1, 0.25, 1.0] },
          },
        };
      default: // fade
        return {
          hidden: { opacity: 0, scale: 0.95 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { duration, ease: [0.25, 0.1, 0.25, 1.0] },
          },
        };
    }
  };

  const characterVariants = getCharacterVariants();

  return (
    <motion.div
      ref={ref}
      className={clsx('overflow-hidden', className)}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      data-animate
    >
      <div className={animationType === 'reveal' ? 'overflow-hidden' : ''}>
        {characters.map((char, index) => (
          <motion.span
            key={index}
            variants={characterVariants}
            className="inline-block"
            style={{
              transformOrigin: animationType === 'split' ? 'center bottom' : 'center'
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default AnimatedHeading;