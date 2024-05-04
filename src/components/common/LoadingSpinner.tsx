import { Backdrop, CircularProgress } from "@mui/material";

interface LoadingSpinnerProps {
    isLoading: boolean;
}
const LoadingSpinner = ({isLoading}: LoadingSpinnerProps) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoading}
      // onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingSpinner;
