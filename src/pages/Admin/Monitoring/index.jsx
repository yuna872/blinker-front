import { Stack } from "@mui/material";
import UserTable, {
  USERTABLE_WIDTH,
} from "@components/AdminMonitoring/UserTable";
import {
  Map,
  MapMarker,
  MarkerClusterer,
  ZoomControl,
} from "react-kakao-maps-sdk";
import { GNB_HEIGHT } from "@layouts/Header";
import greenMarker from "@assets/images/marker-green.png";
import yellowMarker from "@assets/images/marker-yellow.png";
import redMarker from "@assets/images/marker-red.png";
import SensorDrawer from "@components/AdminMonitoring/SensorDrawer";
import { dummySignalLights } from "@pages/Monitoring/dummy";
import FailureInfo from "@components/AdminMonitoring/FailureInfo";
import { grey } from "@mui/material/colors";

const AdminMonitoring = () => {
  return (
    <Stack
      sx={{
        flexDirection: "row",
        position: "relative",
        overflow: "hidden",
        height: `calc(100vh - ${GNB_HEIGHT}px)`,
      }}
    >
      <Stack
        sx={{
          zIndex: "3",
          backgroundColor: "white",
        }}
      >
        <UserTable />
        <FailureInfo />
      </Stack>
      <SensorDrawer />
      <Stack
        sx={{
          position: "absolute",
          left: `${USERTABLE_WIDTH}px`,
          width: "100%",
        }}
      >
        <Map
          center={{ lat: 37.2803, lng: 127.0181 }}
          level={6}
          style={{
            width: "100%",
            height: `calc(100vh - ${GNB_HEIGHT}px)`,
          }}
        >
          <ZoomControl />
          <MarkerClusterer averageCenter={true} minLevel={6} gridSize={35}>
            {dummySignalLights.map((marker) => {
              return (
                <MapMarker
                  key={`${marker.latitude}-${marker.longitude}`}
                  position={{
                    lat: marker.latitude,
                    lng: marker.longitude,
                  }}
                  image={{
                    src:
                      marker.status === "정상"
                        ? greenMarker
                        : marker.status === "오류"
                        ? redMarker
                        : yellowMarker,
                    size: {
                      width: 30,
                      height: 30,
                    },
                  }}
                />
              );
            })}
          </MarkerClusterer>
        </Map>
      </Stack>
    </Stack>
  );
};

export default AdminMonitoring;
