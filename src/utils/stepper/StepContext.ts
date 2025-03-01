import { createContext } from "react";
import { StepContextType } from "./types/stepper.types";

export const StepContext = createContext<StepContextType | undefined>(undefined);

