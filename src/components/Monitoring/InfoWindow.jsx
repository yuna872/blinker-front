import { Stack, Typography } from "@mui/material";
import { useState } from "react";

const InfoWindow = ({ sensor }) => {
  const [memo, setMemo] = useState("");

  const handleChangeMemo = (e) => {
    setMemo(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      console.log(memo);
    }
  };

  return (
    <Stack
      sx={{
        width: "100%",
        "& > p": { fontSize: "11px" },
      }}
    >
      <Typography>해당 기기 번호 (마스터 xX번)</Typography>
      <Stack
        sx={{
          "& > p": { fontSize: "11px" },
        }}
      >
        <Typography>기기 위치: {sensor.address}</Typography>
        <Typography>마지막 작동시간: {"마지막 작동시간"}</Typography>
        <Typography>동작 상태: {sensor.status}</Typography>
      </Stack>
      <Typography sx={{ fontSize: "10px" }}>메모</Typography>
      <input
        type="text"
        id="info-window-memo"
        style={{
          border: "none",
          outline: "none",
          fontSize: "10px",
        }}
        placeholder="간단한 메모 작성"
        value={memo}
        onChange={handleChangeMemo}
        onKeyDown={handleKeyDown}
      />
    </Stack>
  );
};

export default InfoWindow;
