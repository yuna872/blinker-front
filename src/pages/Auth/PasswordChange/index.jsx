import { removeCookies } from "@apis/auth/cookie";
import { useChangePassword } from "@apis/auth/useChangePassword";
import TextFieldErrorMessage from "@components/Group/TextFieldErrorMessage";
import { TextField } from "@components/TextField";
import { showToast } from "@utils/toast";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const { Stack, Typography, Button } = require("@mui/material");

const PasswordChange = () => {
  const navigate = useNavigate();
  const { mutateAsync: changePassword } = useChangePassword();

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm({
    defaultValues: {
      newPassword: "",
      newPasswordCheck: "",
    },
  });

  const onSubmit = async (formData) => {
    try {
      await changePassword(formData.newPassword).then((data) => {
        if (data.code === "SUCCESS") {
          showToast.success(
            "비밀번호가 변경되었습니다. 로그인 페이지로 이동합니다."
          );
          removeCookies("accessToken");
          navigate("/login");
        }
      });
    } catch (error) {
      showToast.error(error?.response?.data?.message);
    }
  };

  return (
    <Stack
      sx={{
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f9f9f9",
      }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack
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
          비밀번호 변경
        </Typography>
        <Stack sx={{ gap: "10px", width: "100%" }}>
          <Stack>
            <Typography>새 비밀번호</Typography>
            <TextField
              type="password"
              {...register("newPassword", {
                required: "새 비밀번호를 입력해주세요.",
              })}
              error={!!errors.newPassword}
            />
            <TextFieldErrorMessage name={"newPassword"} errors={errors} />
          </Stack>
          <Stack>
            <Typography>새 비밀번호 확인</Typography>
            <TextField
              type="password"
              {...register("newPasswordCheck", {
                required: "새 비밀번호 확인을 입력해주세요.",
                validate: (value) =>
                  value === watch("newPassword") ||
                  "비밀번호가 일치하지 않습니다.",
              })}
              error={!!errors.newPasswordCheck}
            />
            <TextFieldErrorMessage name={"newPasswordCheck"} errors={errors} />
          </Stack>
        </Stack>
        <Stack
          sx={{
            flexDirection: "row",
            width: "100%",
            gap: "10px",
          }}
        >
          <Button variant="outlined" fullWidth onClick={() => navigate(-1)}>
            취소
          </Button>
          <Button type="submit" variant="contained" fullWidth>
            비밀번호 변경
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PasswordChange;
