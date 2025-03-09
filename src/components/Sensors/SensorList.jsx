import { useGetUserSensorGroups } from "@apis/sensor/useGetUserSensorGroups";
import Title from "@components/Title";
import { Menu, Star } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import { setMapPosition } from "@store/mapPositionSlice";
import { setSelectedSensorState } from "@store/selectedSensorSlice";
import { theme } from "@styles/theme";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";

export const TableHeaderStyle = {
  backgroundColor: grey[50],
  fontWeight: 600,
  whiteSpace: "nowrap",
  flexDirection: "row",
  padding: "16px",
  borderBottom: `1px solid ${grey[200]}`,
  "& > .MuiStack-root": {
    justifyContent: "center",
    marginTop: 0,
    fontSize: "14px",
    paddingLeft: "5px",
  },
};

export const TableRowStyle = {
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  flexDirection: "row",
  padding: "16px",
  alignItems: "center",
  borderBottom: `1px solid ${grey[200]}`,
  backgroundColor: "white",
  "& > .MuiStack-root": {
    marginTop: 0,
    fontSize: "14px",
  },
};

const SensorList = () => {
  const dispatch = useDispatch();
  const selectedSensor = useSelector((state) => state.selectedSensor);
  const selectedUser = useSelector((state) => state.selectedUser);
  const [editMode, setEditMode] = useState(false);
  const [orderList, setOrderList] = useState();
  const [groups, setGroups] = useState([]);

  const { data: sensorGroups } = useGetUserSensorGroups(
    selectedUser?.appUserId
  );

  useEffect(() => {
    if (sensorGroups) {
      setGroups(sensorGroups);
    }
  }, [sensorGroups]);

  const handleClickSensor = (sensor) => {
    if (sensor) {
      dispatch(setSelectedSensorState(sensor));
      dispatch(
        setMapPosition({
          lat: sensor.latitude,
          lng: sensor.longitude,
        })
      );
    }
  };

  const onDragEnd = ({ source, destination }) => {
    if (!destination) return;

    const copiedGroups = JSON.parse(JSON.stringify(sensorGroups));
    const [targetGroup] = copiedGroups.splice(source.index, 1);
    copiedGroups.splice(destination.index, 0, targetGroup);
    setGroups(copiedGroups);

    const newOrderList = copiedGroups.map((item) => item.order);
    setOrderList(newOrderList);
  };

  const handleClickDoneEditing = () => {
    setEditMode(false);
    console.log(orderList);
  };

  return (
    <Stack sx={{ flex: "1", height: "100%", overflow: "hidden" }}>
      <Title title="센서 목록">
        {editMode ? (
          <Stack sx={{ flexDirection: "row" }}>
            <Button onClick={() => setEditMode(false)}>취소</Button>
            <Button onClick={handleClickDoneEditing}>저장</Button>
          </Stack>
        ) : (
          <Button onClick={() => setEditMode(true)}>편집</Button>
        )}
      </Title>
      <Stack
        sx={{
          margin: "10px",
          border: `1px solid ${grey[200]}`,
          overflow: "auto",
          height: "100%",
        }}
      >
        {/* Header */}
        <Stack sx={TableHeaderStyle}>
          <Stack sx={{ width: "40px", maxWidth: "40px" }}>ID</Stack>
          <Stack sx={{ width: "280px", maxWidth: "280px" }}>주소</Stack>
        </Stack>
        {editMode ? (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {/* Body */}
              {(provided) => (
                <Stack
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  sx={{ height: "100%" }}
                >
                  {sensorGroups && (
                    <Stack
                      sx={{
                        backgroundColor: grey[300],
                        height: "100%",
                      }}
                    >
                      {groups?.map((group, index) => {
                        return (
                          <Draggable
                            index={index}
                            draggableId={`draggable-${group.sensorGroupId}`}
                            key={group.sensorGroupId}
                          >
                            {(provided) => (
                              <Stack
                                ref={provided.innerRef} // provided.innerRef 추가
                                {...provided.draggableProps} // provided.draggableProps 추가
                                {...provided.dragHandleProps} // 드래그 핸들 속성 추가
                              >
                                <Stack key={group.sensorGroupId}>
                                  <Stack
                                    sx={{
                                      ...TableRowStyle,
                                      "&:hover": {
                                        backgroundColor: "none",
                                      },
                                    }}
                                  >
                                    <Stack
                                      sx={{ width: "30px", maxWidth: "30px" }}
                                    >
                                      <Menu
                                        sx={{ width: "20px", color: grey[500] }}
                                      />
                                    </Stack>
                                    <Stack
                                      sx={{ width: "210px", maxWidth: "210px" }}
                                    >
                                      {group.sensorGroupId}
                                    </Stack>
                                    <Stack>{`(SSID) ${group.ssid}`}</Stack>
                                  </Stack>
                                  {group.sensors.map((sensor) => {
                                    const selected =
                                      sensor.sensorId ===
                                      selectedSensor?.sensorId;
                                    return (
                                      <Stack
                                        spacing={1}
                                        key={sensor.sensorId}
                                        sx={{
                                          ...TableRowStyle,
                                          marginLeft: "15px",
                                          backgroundColor: selected
                                            ? grey[100]
                                            : "white",
                                          flexDirection: "row",
                                        }}
                                        onClick={() =>
                                          handleClickSensor(sensor)
                                        }
                                      >
                                        <Stack
                                          sx={{
                                            width: "40px",
                                            maxWidth: "40px",
                                          }}
                                        >
                                          {group.order}-
                                          {sensor.groupPositionNumber}
                                        </Stack>
                                        <Stack
                                          sx={{
                                            width: "280px",
                                            maxWidth: "280px",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            gap: "5px",
                                          }}
                                        >
                                          {!sensor.groupPositionNumber && (
                                            <Star
                                              sx={{
                                                width: "15px",
                                                color: grey[700],
                                              }}
                                            />
                                          )}
                                          {sensor.address}
                                        </Stack>
                                      </Stack>
                                    );
                                  })}
                                </Stack>
                              </Stack>
                            )}
                          </Draggable>
                        );
                      })}
                    </Stack>
                  )}
                  {provided.placeholder}
                </Stack>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <Stack
            sx={{
              backgroundColor: grey[300],
            }}
          >
            {sensorGroups?.map((group) => {
              return (
                <Stack key={group.sensorGroupId}>
                  <Stack
                    sx={{
                      ...TableRowStyle,
                      "&:hover": {
                        backgroundColor: "none",
                      },
                    }}
                  >
                    <Stack sx={{ width: "30px", maxWidth: "30px" }}>
                      {group.order}
                    </Stack>
                    <Stack sx={{ width: "210px", maxWidth: "210px" }}>
                      {group.sensorGroupId}
                    </Stack>
                    <Stack>{`(SSID) ${group.ssid}`}</Stack>
                  </Stack>
                  {group.sensors.map((sensor) => {
                    const selected =
                      sensor.sensorId === selectedSensor?.sensorId;
                    return (
                      <Stack
                        spacing={1}
                        key={sensor.sensorId}
                        sx={{
                          ...TableRowStyle,
                          marginLeft: "15px",
                          backgroundColor: selected ? grey[100] : "white",
                          flexDirection: "row",
                        }}
                        onClick={() => handleClickSensor(sensor)}
                      >
                        <Stack sx={{ width: "40px", maxWidth: "40px" }}>
                          {group.order}-{sensor.groupPositionNumber}
                        </Stack>
                        <Stack
                          sx={{
                            width: "280px",
                            maxWidth: "280px",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          {!sensor.groupPositionNumber && (
                            <Star sx={{ width: "15px", color: grey[700] }} />
                          )}
                          {sensor.address}
                        </Stack>
                      </Stack>
                    );
                  })}
                </Stack>
              );
            })}
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default SensorList;
