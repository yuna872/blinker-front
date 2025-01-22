import { Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

const Title = ({ title }) => {
  return (
    <Stack sx={{ padding: "15px 10px", alignItems: "center", flexDirection: "row", borderBottom:`1px solid ${grey[300]}` }}>
      <Typography sx={{ fontSize: "16px", fontWeight: 600, color: grey[900] }}>
        {title}
      </Typography>
    </Stack>
  );
};

export default Title;
