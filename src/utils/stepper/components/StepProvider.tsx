import { useState, useRef, useEffect, ReactNode, RefObject } from 'react';
import { StepContext } from '../StepContext';

export const StepProvider = ({ children }: { children: ReactNode }) => {
  const [activeStep, setActiveStep] = useState<string>('');
  const [isManualScroll, setIsManualScroll] = useState(false);
  const stepRefs = useRef<Record<string, RefObject<HTMLDivElement>>>({});

  const registerStep = (id: string, ref: RefObject<HTMLDivElement>) => {
    stepRefs.current[id] = ref;
  };

  // const scrollToStep = (id: string) => {
  //   const ref = stepRefs.current[id];
  //   ref?.current?.scrollIntoView({ behavior: "smooth", block: "start", });
  //   setActiveStep(id);
  // };

  const scrollToStep = (id: string) => {
    setIsManualScroll(true); // Indicate manual scroll
    const ref = stepRefs.current[id];
    if (ref?.current) {
      const topPosition = ref.current.offsetTop - 100; // Subtract sticky header height
      window.scrollTo({ top: topPosition, behavior: 'smooth' });
    }
    setActiveStep(id);

    // Re-enable scroll detection after a delay
    setTimeout(() => setIsManualScroll(false), 800); // Match the smooth scrolling duration
  };

  // Update active step on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!isManualScroll) {
        if (!isManualScroll) {
          let activeSection = null;
          let minDistance = Infinity;

          Object.entries(stepRefs.current).forEach(([key, ref]) => {
            if (ref.current) {
              const rect = ref.current.getBoundingClientRect();

              // Check if the element's top is within the viewport
              if (rect.top >= 0 && rect.top < window.innerHeight) {
                // distance from the top edge of the element to the top of the viewport
                const distanceFromTop = rect.top;

                // if distanceFromTop is less than previous minDistance
                if (distanceFromTop < minDistance) {
                  activeSection = key;
                  minDistance = distanceFromTop;
                }
              }
            }
          });

          if (activeSection) {
            setActiveStep(activeSection);
          }
        }
      }
    };

    if (!isManualScroll) window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isManualScroll]);

  return <StepContext.Provider value={{ registerStep, setActiveStep, activeStep, scrollToStep }}>{children}</StepContext.Provider>;
};
