import FormTitle from "@components/FormTitle";
import { TextField } from "@components/TextField";
import { Button, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import { useSelector } from "react-redux";

const SSIDSettingsForm = () => {
  const selectedSensor = useSelector((state) => state.selectedSensor);
  const [ssid, setSsid] = useState(selectedSensor?.ssid || "");

  const handleChangeSsid = (e) => {
    setSsid(e.target.value);
  };

  const handleSubmit = () => {
    console.log(ssid);
  };

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
        <TextField fullWidth onChange={handleChangeSsid} value={ssid} />
        <Button variant="outlined" onClick={handleSubmit}>
          저장
        </Button>
      </Stack>
    </Stack>
  );
};

export default SSIDSettingsForm;
