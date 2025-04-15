import { createTheme } from "@mui/material/styles";
import { palette } from "./palette";

export const theme = createTheme({
  palette: palette,
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: "#FF3C3C",
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: palette.action.hover,
          },
        },
      },
    },
    MuiTableCell: {
      defaultProps: {},
      styleOverrides: {
        root: { color: palette.grey[900], fontSize: "14px" },
        head: {
          backgroundColor: palette.grey[50],
          fontWeight: "600",
          padding: "14px",
        },
        body: {
          borderBottom: `1px solid ${palette.grey[100]}`,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "5px",
          fontSize: "14px",
        },
      },
      variants: [
        {
          props: { variant: "red" },
          style: {
            backgroundColor: palette.red.main,
            color: palette.common.white,
          },
        },
        {
          props: { variant: "grey" },
          style: {
            backgroundColor: palette.grey[50],
            border: `1px solid ${palette.grey[100]}`,
            color: palette.grey[800],
          },
        },
        {
          props: { size: "xSmall" },
          style: {
            padding: "0 16px",
            height: "38px",
            fontSize: "14px",
            width: "fit-content",
          },
        },
      ],
    },
  },
});
