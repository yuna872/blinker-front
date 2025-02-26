import {
  FormControlLabelStyle,
  RadioGroupStyle,
} from "@components/Settings/DefaultSettings";
import Title from "@components/Title";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { theme } from "@styles/theme";
import { useFormContext } from "react-hook-form";

export const FormTitle = ({ title }) => {
  return (
    <Typography
      sx={{
        padding: "10px",
        fontSize: "14px",
        fontWeight: 600,
        color: grey[900],
      }}
    >
      {title}
    </Typography>
  );
};

const GeneralSettingsForm = () => {
  const { register } = useFormContext();

  return (
    <Stack sx={{ border: `1px solid ${grey[300]}`, height: "fit-content" }}>
      <FormTitle title="기본 설정" />
      <Stack
        sx={{
          "& .MuiFormGroup-root": {
            "& .MuiFormControlLabel-root": {
              marginLeft: "0",
              paddingY: "5px",
            },
            "&:nth-of-type(odd)": {
              backgroundColor: theme.palette.action.hover,
            },
          },
        }}
      >
        <RadioGroup sx={RadioGroupStyle}>
          <FormControlLabel
            value="여자"
            control={<Radio size="small" />}
            label="여자"
            sx={FormControlLabelStyle}
          />
          <FormControlLabel
            value="남자"
            control={<Radio size="small" />}
            label="남자"
            sx={FormControlLabelStyle}
          />
        </RadioGroup>
        <RadioGroup sx={RadioGroupStyle}>
          <FormControlLabel
            value="새"
            control={<Radio size="small" />}
            label="새"
            sx={FormControlLabelStyle}
          />
          <FormControlLabel
            value="귀뚜라미"
            control={<Radio size="small" />}
            label="귀뚜라미"
            sx={FormControlLabelStyle}
          />
        </RadioGroup>
        <RadioGroup sx={RadioGroupStyle}>
          <FormControlLabel
            value="교차로"
            control={<Radio size="small" />}
            label="교차로"
            sx={FormControlLabelStyle}
          />
          <FormControlLabel
            value="단일로"
            control={<Radio size="small" />}
            label="단일로"
            sx={FormControlLabelStyle}
          />
        </RadioGroup>
        <RadioGroup sx={RadioGroupStyle}>
          <FormControlLabel
            value="동일지주"
            control={<Radio size="small" />}
            label="동일지주"
            sx={FormControlLabelStyle}
          />
          <FormControlLabel
            value="근접지주"
            control={<Radio size="small" />}
            label="근접지주"
            sx={FormControlLabelStyle}
          />
          <FormControlLabel
            value="일반지주"
            control={<Radio size="small" />}
            label="일반지주"
            sx={FormControlLabelStyle}
          />
        </RadioGroup>
        <RadioGroup sx={RadioGroupStyle}>
          <FormControlLabel
            value="설정"
            control={<Radio size="small" />}
            label="설정"
            sx={FormControlLabelStyle}
          />
          <FormControlLabel
            value="미설정"
            control={<Radio size="small" />}
            label="미설정"
            sx={FormControlLabelStyle}
          />
        </RadioGroup>
        <RadioGroup sx={RadioGroupStyle}>
          <FormControlLabel
            value="여자 우선 방송"
            control={<Radio size="small" />}
            label="여자 우선 방송"
            sx={FormControlLabelStyle}
          />
          <FormControlLabel
            value="남자 우선 방송"
            control={<Radio size="small" />}
            label="남자 우선 방송"
            sx={FormControlLabelStyle}
          />
        </RadioGroup>
      </Stack>
    </Stack>
  );
};

export default GeneralSettingsForm;
