const { ErrorMessage } = require("@hookform/error-message");
const { Stack, Typography } = require("@mui/material");
const { Controller } = require("react-hook-form");

const NumberTextField = ({ name, control, required = false }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ? "숫자를 입력하세요." : false,
      }}
      render={({ field, fieldState: { error } }) => (
        <Stack sx={{ width: "100%" }}>
          <input
            type="number"
            {...field}
            style={{
              height: "40px",
              fontFamily: "Pretendard, sans-serif",
              fontSize: "14px",
              fontWeight: 400,
              color: "#000000",
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "4px",
              padding: "0 10px",
              outline: "none",
            }}
          />
          <ErrorMessage
            errors={error}
            name="id"
            render={({ message }) => (
              <Typography sx={{ fontSize: "11px", color: "#FF3C3C" }}>
                {message}
              </Typography>
            )}
          />
        </Stack>
      )}
    />
  );
};
export default NumberTextField;
