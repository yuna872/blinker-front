import { Check, ErrorOutline } from "@mui/icons-material";
import {
  Button,
  DialogActions,
  DialogTitle,
  Dialog as MuiDialog,
  Stack,
  Typography,
} from "@mui/material";
import { theme } from "@styles/theme";

const Dialog = ({
  open,
  onClose,
  title,
  description,
  primaryAction,
  secondaryAction,
  variant,
}) => {
  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "500px",
            borderRadius: "8px",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          flexDirection: "row",
          padding: "24px",
          gap: "10px",
        }}
      >
        <Stack
          sx={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor:
              variant === "confirm"
                ? theme.palette.primary[50]
                : theme.palette.red[50],
            width: "32px",
            height: "32px",
            borderRadius: "100%",
          }}
        >
          {variant === "confirm" && (
            <Check
              sx={{
                color: theme.palette.primary[600],
                width: "20px",
                height: "20px",
              }}
            />
          )}
          {variant === "alert" && (
            <ErrorOutline
              sx={{
                color: theme.palette.red.main,
                width: "20px",
                height: "20px",
              }}
            />
          )}
        </Stack>
        <Stack sx={{ gap: "10px" }}>
          <Typography
            sx={{
              color: theme.palette.grey[800],
              fontSize: "18px",
              fontWeight: "500",
            }}
          >
            {title}
          </Typography>
          <Typography sx={{ color: theme.palette.grey[600] }}>
            {description}
          </Typography>
        </Stack>
      </DialogTitle>
      <DialogActions
        sx={{
          p: "16px 24px",
          "& > button": {
            height: "38px",
            width: "content-fit",
            padding: "0 16px",
          },
        }}
      >
        <Button
          variant="grey"
          onClick={() => {
            secondaryAction.onClick();
            onClose();
          }}
        >
          {secondaryAction.name}
        </Button>
        <Button
          variant={variant === "confirm" ? "contained" : "red"}
          sx={{}}
          onClick={() => {
            primaryAction.onClick();
            onClose();
          }}
        >
          {primaryAction.name}
        </Button>
      </DialogActions>
    </MuiDialog>
  );
};

export default Dialog;
