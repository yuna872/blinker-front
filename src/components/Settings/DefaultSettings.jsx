import { FormControlLabel, Radio, RadioGroup, Stack } from "@mui/material";
import FormTitle from "../FormTitle";
import { grey } from "@mui/material/colors";

const DefaultSettings = () => {
  const FormControlLabelStyle = {
    "& > .MuiFormControlLabel-label": {
      fontSize: "14px",
    },
  };

  const RadioGroupStyle = {
    flexDirection: "row",
  };

  return (
    <Stack
      sx={{
        borderTop: `1px solid ${grey[300]}`,
      }}
    >
      <FormTitle title="기본 설정" />
      <Stack sx={{ gap: "10px", padding: "0 15px" }}>
        <RadioGroup
          // value={value}
          // onChange={handleChange}
          sx={RadioGroupStyle}
        >
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
        <RadioGroup
          // value={value}
          // onChange={handleChange}
          sx={RadioGroupStyle}
        >
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
        <RadioGroup
          // value={value}
          // onChange={handleChange}
          sx={RadioGroupStyle}
        >
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
        <RadioGroup
          // value={value}
          // onChange={handleChange}
          sx={RadioGroupStyle}
        >
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
        <RadioGroup
          // value={value}
          // onChange={handleChange}
          sx={RadioGroupStyle}
        >
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
        <RadioGroup
          // value={value}
          // onChange={handleChange}
          sx={RadioGroupStyle}
        >
          <FormControlLabel
            value="선"
            control={<Radio size="small" />}
            label="선"
            sx={FormControlLabelStyle}
          />
          <FormControlLabel
            value="후"
            control={<Radio size="small" />}
            label="후"
            sx={FormControlLabelStyle}
          />
        </RadioGroup>
      </Stack>
    </Stack>
  );
};

export default DefaultSettings;
