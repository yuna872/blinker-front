import { useGetSensorDetail } from "@apis/sensor/useGetSensorDetails";
import { usePatchSensorMemo } from "@apis/sensor/usePatchSensorMemo";
import Loading from "@components/Loading";
import { CircularProgress, Stack, Typography } from "@mui/material";
import { theme } from "@styles/theme";
import { showToast } from "@utils/toast";
import dayjs from "dayjs";
import { useState } from "react";
import { useSelector } from "react-redux";

const InfoWindow = ({ sensorId }) => {
  const selectedUser = useSelector((state) => state.selectedUser);
  const { data: sensor } = useGetSensorDetail(sensorId, selectedUser.appUserId);
  const [memo, setMemo] = useState(sensor?.memo);
  const { mutateAsync: patchSensorMemo } = usePatchSensorMemo(
    sensorId,
    selectedUser.appUserId
  );

  const handleChangeMemo = (e) => {
    setMemo(e.target.value);
  };

  const handleKeyDown = async (e) => {
    if (e.keyCode === 13) {
      console.log(memo, selectedUser);
      await patchSensorMemo({
        sensorId,
        appUserId: selectedUser.appUserId,
        memo,
      })
        .then((res) => {})
        .catch(() => {
          showToast.error("다시 시도해주세요.");
        });
    }
  };

  // 값이 없을 때 공간을 유지하기 위한 기본 스타일
  const placeholderStyles = {
    minHeight: "150px", // 최소 높이 지정
    minWidth: "250px", // 최소 높이 지정
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5", // 기본 배경색
    borderRadius: "8px",
  };

  if (!sensorId || !selectedUser || !sensor) {
    return (
      <Stack sx={placeholderStyles}>
        <CircularProgress size={15} />
      </Stack>
    );
  }

  return (
    <Stack
      sx={{
        width: "250px",
        "& > p": { fontSize: "11px" },
      }}
    >
      <Stack
        sx={{
          backgroundColor: theme.palette.primary[900],
          padding: "5px",
          flex: "1",
        }}
      >
        <Typography
          sx={{ whiteSpace: "nowrap", color: "white", fontSize: "11px" }}
        >
          {`${sensor.sensorGroupId} ${
            sensor.groupPositionNumber > 0
              ? `(슬레이브 ${sensor.groupPositionNumber}번)`
              : "(마스터)"
          }`}
        </Typography>
      </Stack>
      <Stack
        sx={{
          "& > p": { fontSize: "11px" },
          padding: "5px",
          gap: "2px",
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
