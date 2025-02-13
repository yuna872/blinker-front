import FormTitle from "@components/FormTitle";
import { TextField } from "@components/TextField";
import { Button, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

const SSIDSettingsForm = () => {
  return (
    <Stack
      sx={{
        borderTop: `1px solid ${grey[300]}`,
      }}
    >
      <FormTitle title="SSID 설정" />
      <Stack
        sx={{
          flexDirection: "row",
          gap: "10px",
          alignItems: "center",
          padding: "0 15px",
        }}
      >
        <Typography sx={{ minWidth: "50px", width: "50px", fontSize: "14px" }}>
          SSID
        </Typography>
        <TextField fullWidth />
        <Button variant="outlined">저장</Button>
      </Stack>
    </Stack>
  );
};

export default SSIDSettingsForm;
