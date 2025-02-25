import { TextField } from "@components/TextField";
import { Search } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import { setMapPosition } from "@store/mapPosition";
import { useState } from "react";
import { useDispatch } from "react-redux";

const AddressSearchBar = ({setMap, map}) => {
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();

  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmitAddress = () => {
    const geocoder = new kakao.maps.services.Geocoder();

    let callback = (result, status) => {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        dispatch(setMapPosition({ lat: result[0].y, lng: result[0].x }));
      }

      // 마커가 표시될 위치입니다
      var markerPosition = new kakao.maps.LatLng(result[0].y, result[0].x);

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        position: markerPosition,
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(map);
    };

    geocoder.addressSearch(`${address}`, callback);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) handleSubmitAddress();
  };

  return (
    <TextField
      value={address}
      onChange={handleChangeAddress}
      onKeyDown={handleKeyDown}
      fullWidth
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment
              position="start"
              sx={{ cursor: "pointer" }}
              onClick={handleSubmitAddress}
            >
              <Search sx={{ width: "18px", height: "18px" }} />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default AddressSearchBar;
