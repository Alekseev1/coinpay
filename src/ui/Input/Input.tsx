import { TextField, type TextFieldProps } from '@mui/material';
const Input = (props: TextFieldProps) => {
  return <TextField {...props} variant="outlined" fullWidth />;
};

export default Input;