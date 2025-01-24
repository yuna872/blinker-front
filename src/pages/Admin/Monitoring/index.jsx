import { Stack } from "@mui/material";
import Title, { TITLE_HEIGHT } from "../../../components/Title";
import UserTable from "../../../components/AdminMonitoring/UserTable";
import SensorInfo from "../../../components/AdminMonitoring/SensorInfo";
import SensorList from "../../../components/AdminMonitoring/SensorList";
import {
  Map,
  MapMarker,
  MarkerClusterer,
  ZoomControl,
} from "react-kakao-maps-sdk";
import { dummySignalLights } from "../../Monitoring/dummy";
import { GNB_HEIGHT } from "../../../layouts/Header";
import greenMarker from "../../../assets/images/marker-green.png";
import yellowMarker from "../../../assets/images/marker-yellow.png";
import redMarker from "../../../assets/images/marker-red.png";

const AdminMonitoring = () => {
  return (
    <Stack sx={{ flexDirection: "row" }}>
      <UserTable />
      <Stack>
        <SensorInfo />
        <SensorList />
      </Stack>
      <Stack sx={{ flex: "1" }}>
        <Title title="지도 보기" />
        <Map
          center={{ lat: 37.2803, lng: 127.0181 }}
          level={6}
          style={{
            width: "100%",
            height: `calc(100vh - ${GNB_HEIGHT + TITLE_HEIGHT}px)`,
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
