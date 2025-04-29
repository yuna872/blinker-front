import { palette } from '@styles/palette';

export const TITLE_HEIGHT = 55;

const Title = ({ title, children }) => {
  return (
    <Stack
      sx={{
        height: `${TITLE_HEIGHT}px`,
        padding: '0 15px',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottom: `1px solid ${palette.grey[100]}`,
        flexShrink: '0',
      }}
    >
      <Typography
        sx={{ fontSize: '16px', fontWeight: 600, color: palette.grey[900] }}
      >
        {title}
      </Typography>
      <Stack
        sx={{ width: '50%', flexDirection: 'row', justifyContent: 'flex-end' }}
      >
        {children}
      </Stack>
    </Stack>
  );
};

export default Title;
