import React, { useEffect, useRef } from 'react';
import useStepContext from '../hooks/useStepContext';

export const Step = ({ id, children }: { id: string; children: React.ReactNode }) => {
  const { registerStep, setActiveStep } = useStepContext();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) registerStep(id, ref as React.RefObject<HTMLDivElement>);
  }, [id, registerStep]);

  return (
    <div ref={ref} id="active-step" onClick={() => setActiveStep(id)}>
      {children}
    </div>
  );
};
