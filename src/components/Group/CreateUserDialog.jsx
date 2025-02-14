import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import TextFieldErrorMessage from "./TextFieldErrorMessage";

const { TextField } = require("@components/TextField");
const { Dialog, Stack, Typography, Button } = require("@mui/material");

const CreateUserDialog = ({ open, handleClose }) => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: "",
      userName: "",
      password: "",
      passwordCheck: "",
      role: "USER",
    },
  });

  const onSubmit = (formData) => {
    console.log(formData);
  };

  return (
    <Dialog open={open}>
      <Stack
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: "300px",
          padding: "20px",
          margin: "auto",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          alignItems: "center",
          gap: "20px",
          backgroundColor: "#fff",
        }}
      >
        <Typography sx={{ fontSize: "24px", fontWeight: 600 }}>
          유저 생성
        </Typography>
        <Stack sx={{ gap: "10px", width: "100%" }}>
          <Stack>
            <Typography>아이디</Typography>
            <TextField
              type="text"
              {...register("id", { required: "아이디를 입력해주세요." })}
              error={errors.id}
            />
            <ErrorMessage
              errors={errors}
              name="id"
              render={({ message }) => (
                <Typography sx={{ fontSize: "11px", color: "#FF3C3C" }}>
                  {message}
                </Typography>
              )}
            />
          </Stack>
          <Stack>
            <Typography>사용자명</Typography>
            <TextField
              type="text"
              {...register("userName", {
                required: "사용자명을 입력해주세요.",
              })}
              error={errors.userName}
            />
            <TextFieldErrorMessage name={"userName"} errors={errors} />
          </Stack>
          <Stack>
            <Typography>비밀번호</Typography>
            <TextField
              type="password"
              {...register("password", {
                required: "비밀번호를 입력해주세요.",
              })}
              error={errors.password}
            />
            <TextFieldErrorMessage name={"password"} errors={errors} />
          </Stack>
          <Stack>
            <Typography>비밀번호 확인</Typography>
            <TextField
              type="password"
              {...register("passwordCheck", {
                validate: (value) =>
                  value === watch("password") ||
                  "비밀번호가 일치하지 않습니다.",
              })}
              error={errors.passwordCheck}
            />
            <TextFieldErrorMessage name={"passwordCheck"} errors={errors} />
          </Stack>
        </Stack>
        <Stack
          sx={{
            flexDirection: "row",
            width: "100%",
            gap:'10px'
          }}
        >
          <Button variant="outlined" onClick={handleClose} fullWidth>
            취소
          </Button>
          <Button variant="contained" type="submit" fullWidth>
            생성
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default CreateUserDialog;
