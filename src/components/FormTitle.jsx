import { palette } from '@styles/palette';

const FormTitle = ({ title }) => {
  return (
    <Stack sx={{ padding: '15px' }}>
      <Typography
        sx={{ fontWeight: 600, fontSize: '14px', color: palette.grey[500] }}
      >
        {title}
      </Typography>
    </Stack>
  );
};

export default FormTitle;
