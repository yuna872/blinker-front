import { Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

const FormTitle = ({ title }) => {
  return (
    <Stack sx={{ padding: "15px" }}>
      <Typography sx={{ fontWeight: 600, fontSize: "14px", color: grey[700] }}>
        {title}
      </Typography>
    </Stack>
  );
};

export default FormTitle;
