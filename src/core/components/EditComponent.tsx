import { Box, Icon, IconButton } from '@mui/material'

const EditComponent = ({
    onEdit,
    onDelete
}:{
    onEdit:()=>void;
    onDelete:()=>void;
}) => {
  return (
    <Box>
        <IconButton onClick={onEdit}>
            <Icon sx={{fontSize:"20px"}}>
                edit
            </Icon>
        </IconButton>
        <IconButton onClick={onDelete}>
            <Icon sx={{fontSize:"20px"}}>
                delete
            </Icon>
        </IconButton>
    </Box>
  )
}

export default EditComponent