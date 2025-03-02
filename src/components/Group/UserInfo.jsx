import { usePutUser } from "@apis/auth/usePutUser";
import { TextField } from "@components/TextField";
import Title from "@components/Title";
import { Button, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { setSelectedSensorState } from "@store/selectedSensorSlice";
import { setSelectedUser } from "@store/selectedUserSlice";
import { showToast } from "@utils/toast";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const UserInfo = () => {
  const fieldStyle = {
    flexDirection: "row",
    gap: "10px",
    alignItems: "center",
    padding: "0 15px",
  };

  const labelStyle = {
    minWidth: "70px",
    width: "70px",
    fontSize: "14px",
  };

  const selectedUser = useSelector((state) => state.selectedUser);
  const dispatch = useDispatch();

  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      userId: "",
      username: "",
    },
  });

  useEffect(() => {
    if (selectedUser) {
      reset({
        userId: selectedUser?.userId,
        username: selectedUser?.username,
      });
    }
  }, [selectedUser, reset]);

  const { mutateAsync: putUser } = usePutUser();
  const onSubmit = async (formData) => {
    if (selectedUser) {
      console.log(formData);
      const { appUserId } = selectedUser;
      try {
        await putUser({ appUserId, formData }).then((data) => {
          if (data.code === "SUCCESS") {
            showToast.success("수정 되었습니다.");
            dispatch(setSelectedUser({ appUserId, ...formData }));
          } else if (data.code === "DIALOGUE") {
            showToast.error(data?.message);
          }
        });
      } catch (error) {
        showToast.error(error?.response?.data?.message);
      }
    }
  };

  return (
    <Stack
      sx={{
        borderRight: `1px solid ${grey[200]}`,
      }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Title title="사용자 정보" />
      <Stack sx={{ gap: "10px", padding: "10px" }}>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>ID</Typography>
          <TextField fullWidth {...register("userId")} />
        </Stack>
        <Stack sx={fieldStyle}>
          <Typography sx={labelStyle}>이름</Typography>
          <TextField fullWidth d {...register("username")} />
        </Stack>
      </Stack>
      <Button variant="outlined" sx={{ margin: "15px" }} type="submit">
        저장
      </Button>
    </Stack>
  );
};

export default UserInfo;
