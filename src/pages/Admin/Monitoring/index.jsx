import { Stack } from "@mui/material";
import Title from "../../../components/Title";
import UserTable from "../../../components/UserTable";

const AdminMonitoring = () => {
  return (
    <Stack sx={{ flexDirection: "row" }}>
      <UserTable />
      <Stack>
        <Title title="센서 목록" />
      </Stack>
      <Stack>
        <Title title="지도 보기" />
      </Stack>
    </Stack>
  );
};

export default AdminMonitoring;
