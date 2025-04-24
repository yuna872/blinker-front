export const FAULTS = {
  "Front Cover Open": "전면 커버 감지",
  "235.3MHz Receiver Fault": "235 채널 신호",
  "358.5MHz Receiver Fault": "358 채널 신호",
  "User Button Fault": "버튼 장애",
  "Speaker Fault": "스피커 단락/단선",
  "Signal Light Residual Fault": "신호등 전원 오류",
};

export const DEVICE_SETTINGS = [
  "Proximity",
  "Configuration",
  "Priority",
  "Sound",
  "Crossroad",
  "Gender",
];

export const VOLUME_SETTINGS = [
  "Bird Volume",
  "Cricket Volume",
  "Dingdong Volume",
  "Female Volume",
  "Male Volume",
  "Minuet Volume",
  "System Volume",
];

export const SILENT_SETTINGS = [
  "Female Mute 1",
  "Female Mute 2",
  "Male Mute 1",
  "Male Mute 2",
];

export const CMD = {
  HEX: "구분",
  73: "설정변경",
  67: "상태응답",
  61: "SSID수정",
  77: "SSID응답",
  76: "교차로명 수정",
  65: "요류 이벤트 발생",
  72: "정기보고",
  74: "최초부팅",
  62: "버튼 이벤트 발생",
  "6D": "위치 리모컨 이벤트 발생",
  "6E": "신호 리모컨 이벤트 발생",
  "6F": "235 신호 이벤트 발생",
  63: "오류 복구 이벤트",
  70: "GPS 좌표 저장",
  71: "GPS 좌표 송신",
};
