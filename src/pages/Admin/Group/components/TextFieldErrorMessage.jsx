const { ErrorMessage } = require('@hookform/error-message');
const { Typography } = require('@mui/material');
const { theme } = require('@styles/theme');

const TextFieldErrorMessage = ({ errors = {}, name }) => {
  if (!errors || !name) return null;

  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }) => (
        <Typography sx={{ fontSize: '11px', color: theme.palette.error.main }}>
          {message}
        </Typography>
      )}
    />
  );
};

export default TextFieldErrorMessage;
