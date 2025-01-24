import { Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export const TITLE_HEIGHT = 55;

const Title = ({ title }) => {
  return (
    <Stack
      sx={{
        height: `${TITLE_HEIGHT}px`,
        padding: "0 15px",
        alignItems: "center",
        flexDirection: "row",
        borderBottom: `1px solid ${grey[300]}`,
        borderRight: `1px solid ${grey[200]}`,
      }}
    >
      <Typography sx={{ fontSize: "16px", fontWeight: 600, color: grey[900] }}>
        {title}
      </Typography>
    </Stack>
  );
};

export default Title;
