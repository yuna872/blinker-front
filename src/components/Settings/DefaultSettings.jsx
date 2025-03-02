import FormTitle from "@components/FormTitle";
import { FormControlLabel, Radio, RadioGroup, Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Controller, useFormContext } from "react-hook-form";

export const FormControlLabelStyle = {
  "& > .MuiFormControlLabel-label": {
    fontSize: "14px",
  },
};

export const RadioGroupStyle = {
  flexDirection: "row",
};

const DefaultSettings = () => {
  const { register, control } = useFormContext();

  return (
    <Stack
      sx={{
        borderTop: `1px solid ${grey[300]}`,
      }}
    >
      <FormTitle title="기본 설정" />
      <Stack sx={{ gap: "10px", padding: "0 15px" }}>
        <Controller
          name="deviceSettings.Gender"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field} sx={RadioGroupStyle}>
              <FormControlLabel
                value="Female"
                control={<Radio size="small" />}
                label="여자"
                sx={FormControlLabelStyle}
              />
              <FormControlLabel
                value="Male"
                control={<Radio size="small" />}
                label="남자"
                sx={FormControlLabelStyle}
              />
            </RadioGroup>
          )}
        />
        <Controller
          name="deviceSettings.Sound"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field} sx={RadioGroupStyle}>
              <FormControlLabel
                value="Bird"
                control={<Radio size="small" />}
                label="새"
                sx={FormControlLabelStyle}
              />
              <FormControlLabel
                value="Cricket"
                control={<Radio size="small" />}
                label="귀뚜라미"
                sx={FormControlLabelStyle}
              />
            </RadioGroup>
          )}
        ></Controller>
        <Controller
          name="deviceSettings.Crossroad"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field} sx={RadioGroupStyle}>
              <FormControlLabel
                value="Intersection"
                control={<Radio size="small" />}
                label="교차로"
                sx={FormControlLabelStyle}
              />
              <FormControlLabel
                value="Single Road"
                control={<Radio size="small" />}
                label="단일로"
                sx={FormControlLabelStyle}
              />
            </RadioGroup>
          )}
        ></Controller>
        <Controller
          name="deviceSettings.Proximity"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field} sx={RadioGroupStyle}>
              <FormControlLabel
                value="Single Proximity"
                control={<Radio size="small" />}
                label="동일지주"
                sx={FormControlLabelStyle}
              />
              <FormControlLabel
                value="Close Proximity"
                control={<Radio size="small" />}
                label="근접지주"
                sx={FormControlLabelStyle}
              />
              <FormControlLabel
                value="General Proximity"
                control={<Radio size="small" />}
                label="일반지주"
                sx={FormControlLabelStyle}
              />
            </RadioGroup>
          )}
        ></Controller>
        <Controller
          name="deviceSettings.Configuration"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field} sx={RadioGroupStyle}>
              <FormControlLabel
                value="Configured"
                control={<Radio size="small" />}
                label="설정"
                sx={FormControlLabelStyle}
              />
              <FormControlLabel
                value="Not Configured"
                control={<Radio size="small" />}
                label="미설정"
                sx={FormControlLabelStyle}
              />
            </RadioGroup>
          )}
        ></Controller>
        <Controller
          name="deviceSettings.Priority"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field} sx={RadioGroupStyle}>
              <FormControlLabel
                value="Female Priority Broadcast"
                control={<Radio size="small" />}
                label="여자 우선 방송"
                sx={FormControlLabelStyle}
              />
              <FormControlLabel
                value="Male Priority Broadcast"
                control={<Radio size="small" />}
                label="남자 우선 방송"
                sx={FormControlLabelStyle}
              />
            </RadioGroup>
          )}
        ></Controller>
      </Stack>
    </Stack>
  );
};

export default DefaultSettings;
