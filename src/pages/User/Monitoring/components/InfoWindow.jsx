import { getCookies } from "@apis/auth/cookie";
import { useGetSensorDetail } from "@apis/sensor/useGetSensorDetails";
import { usePatchSensorMemo } from "@apis/sensor/usePatchSensorMemo";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { theme } from "@styles/theme";
import { showToast } from "@utils/toast";
import dayjs from "dayjs";
import { useState } from "react";
import { useSelector } from "react-redux";

const InfoWindow = ({
  isDraggable,
  setIsDraggable,
  draggedPosition,
  handleClickOffDraggable,
  handleSaveNewPosition,
}) => {
  const appUserId = getCookies("appUserId");
  const selectedSensor = useSelector((state) => state.selectedSensor);
  const { data: sensor } = useGetSensorDetail(
    selectedSensor.sensorId,
    appUserId // 일반 관리자의 경우 로그인한 유저
  );
  const [memo, setMemo] = useState(sensor?.memo);
  const { mutateAsync: patchSensorMemo } = usePatchSensorMemo(
    selectedSensor.sensorId,
    appUserId
  );

  const handleChangeMemo = (e) => {
    setMemo(e.target.value);
  };

  const handleKeyDown = async (e) => {
    if (e.keyCode === 13) {
      await patchSensorMemo({
        sensorId: selectedSensor.sensorId,
        appUserId,
        memo,
      })
        .then((res) => {
          if (res.code === "DIALOGUE") showToast.error(res.message);
        })
        .catch((err) => {
          showToast.error("다시 시도해주세요.");
        });
    }
  };

  // 신호기 위치 변경 버튼
  const handleClickPosEditBtn = async () => {
    if (isDraggable === undefined || setIsDraggable === undefined) return;
    if (isDraggable) {
      alert("저장하시겠습니까?");
    } else {
      // 위치 편집 모드 on
      setIsDraggable(true);
    }
  };

  // 값이 없을 때 공간을 유지하기 위한 기본 스타일
  const placeholderStyles = {
    minHeight: "150px",
    minWidth: "270px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5",
    borderRadius: "8px",
  };

  if (!selectedSensor.sensorId || !appUserId || !sensor) {
    return (
      <Stack sx={placeholderStyles}>
        <CircularProgress size={15} />
      </Stack>
    );
  }

  return (
    <Stack
      sx={{
        width: "270px",
        "& > p": { fontSize: "11px" },
      }}
    >
      <Stack
        sx={{
          backgroundColor: theme.palette.primary[900],
          padding: "5px",
          flex: "1",
          flexDirection: "row",
          justifyContent: "space-between",
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
      {isDraggable ? (
        <Stack
          sx={{
            width: "100%",
            "& .MuiTypography-root": { fontSize: "12px" },
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography>{draggedPosition?.lat}</Typography>
          <Typography>{draggedPosition?.lng}</Typography>
          <Stack sx={{ flexDirection: "row" }}>
            <Button onClick={handleSaveNewPosition}>저장</Button>
            <Button onClick={handleClickOffDraggable}>취소</Button>
          </Stack>
        </Stack>
      ) : (
        <>
          <Stack
            sx={{
              "& > p": { fontSize: "11px" },
              padding: "5px",
              gap: "2px",
            }}
          >
            <Stack
              sx={{
                flexDirection: "row",
                "& > p": { fontSize: "11px" },
                alignItems: "center",
                gap: "5px",
              }}
            >
              <Typography>기기 위치: {sensor.address}</Typography>
              {isDraggable !== undefined && (
                <button
                  style={{ fontSize: "10px" }}
                  onClick={handleClickPosEditBtn}
                >
                  위치 변경
                </button>
              )}
            </Stack>
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
              resize: "none",
            }}
            rows={3}
            placeholder="간단한 메모 작성"
            value={memo ?? sensor?.memo ?? ""}
            onChange={handleChangeMemo}
            onKeyDown={handleKeyDown}
          />
        </>
      )}
    </Stack>
  );
};

export default InfoWindow;
