import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import useStepContext from "../hooks/useStepContext";
import { Box, Typography } from "@mui/material";
import { COLORS } from "../../../core/styles/COLORS";

export const Stepper = ({ steps }: { steps: { id: string; name: string }[] }) => {
  const { activeStep, scrollToStep } = useStepContext();

  return (
    <Box sx={{position:"fixed", display:"flex", flexDirection:"column", alignItems:"center", height:"400px"}}>
      {steps.map((step, index) => 
          <>
            <Box 
              key={step.id} onClick={() => scrollToStep(step.id)}
              sx={{position:"relative", display:"flex", alignItems:"center", cursor:"pointer"}}  
            >
                {step.id === activeStep && <CircleIcon sx={{color:COLORS.MainBlue}}/>}
                {step.id !== activeStep && <CircleOutlinedIcon sx={{color:COLORS.MainBlue}}/>}
                <Typography sx={{position:"absolute", left:"calc(100% + 5px)"}}>
                    {step.name}
                </Typography>
            </Box>
            {index !== steps.length - 1 && 
                <Box sx={{border:`1px dashed ${COLORS.LightBlue}`, width:0, height:"100%"}}/>
            }
          </>
      )}
    </Box>
  );
};

