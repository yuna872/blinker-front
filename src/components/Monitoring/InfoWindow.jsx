import { Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
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
      <Typography sx={{ whiteSpace: "nowrap" }}>
        {`${sensor.sensorGroupId} ${
          sensor.groupPositionNumber > 0
            ? `(슬레이브 ${sensor.groupPositionNumber}번)`
            : "(마스터)"
        }`}
      </Typography>
      <Stack
        sx={{
          "& > p": { fontSize: "11px" },
        }}
      >
        <Typography>기기 위치: {sensor.address}</Typography>
        <Typography sx={{ whiteSpace: "nowrap" }}>
          {`최근수정일: ${dayjs(sensor.updatedAt).format(
            "YYYY/MM/DD HH:mm:ss"
          )}`}
        </Typography>
        <Typography>동작 상태: {sensor.status}</Typography>
      </Stack>
      <Typography sx={{ fontSize: "10px" }}>- 메모 -</Typography>
      <textarea
        id="info-window-memo"
        style={{
          border: "none",
          outline: "none",
          fontSize: "10px",
          width: "95%",
        }}
        rows={3}
        placeholder="간단한 메모 작성"
        value={memo}
        onChange={handleChangeMemo}
        onKeyDown={handleKeyDown}
      />
    </Stack>
  );
};

export default InfoWindow;
