import { RefObject } from "react";

export interface StepContextType  {
    registerStep: (id: string, ref: RefObject<HTMLDivElement>) => void;
    setActiveStep: React.Dispatch<React.SetStateAction<string>>;
    activeStep: string;
    scrollToStep: (id: string) => void;
};