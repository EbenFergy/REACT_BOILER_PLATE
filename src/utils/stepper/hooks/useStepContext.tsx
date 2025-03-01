import {  useContext } from "react";
import { StepContext } from "../StepContext";


const useStepContext = () => {
  const context = useContext(StepContext);
  if (!context) {
    throw new Error("useStepContext must be used within StepProvider");
  }
  return context;
};

export default useStepContext