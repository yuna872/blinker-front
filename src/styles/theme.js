import { grey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#6002ee",
      200: "#b896e8",
      100: "#d4c0f1",
      50: "#efe5fd",
      contrastText: "#fff",
    },
    secondary: {
      main: "#efe5fd",
      contrastText: "#6002ee",
    },
    action: {
      hover: grey[200],
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: "#FF3C3C", // TextField 테두리 색상 변경
          },
        },
      },
    },
  },
});
