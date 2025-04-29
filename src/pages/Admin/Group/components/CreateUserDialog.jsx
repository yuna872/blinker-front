import { useForm } from 'react-hook-form';
import { useSignup } from '@apis/auth/useSignup';
import { showToast } from '@utils/toast';
import { useQueryClient } from '@tanstack/react-query';
import { theme } from '@styles/theme';

const { TextField } = require('@components/TextField');
const {
  Dialog,
  Stack,
  Typography,
  Button,
  MenuItem,
} = require('@mui/material');

const CreateUserDialog = ({ open, handleClose }) => {
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      userId: '',
      username: '',
      password: '',
      passwordCheck: '',
      role: 'USER',
    },
  });
  const { mutateAsync: signup } = useSignup();
  const onSubmit = async (formData) => {
    const { passwordCheck, ...signupData } = formData;

    try {
      await signup(signupData).then((data) => {
        if (data.code === 'SUCCESS') {
          showToast.success('유저가 생성되었습니다.');
          handleClose();
          queryClient.invalidateQueries(['auth', 'users']);
          reset();
        }
      });
    } catch (error) {
      showToast.error(error?.response?.data?.message);
    }
  };

  return (
    <Dialog open={open} sx={{}}>
      <Stack
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: '300px',
          padding: '20px',
          margin: 'auto',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          alignItems: 'center',
          gap: '20px',
          backgroundColor: '#fff',
        }}
      >
        <Typography sx={{ fontSize: '24px', fontWeight: 600 }}>
          유저 생성
        </Typography>
        <Stack sx={{ gap: '10px', width: '100%' }}>
          <Stack>
            <Typography>아이디</Typography>
            <TextField
              type='text'
              {...register('userId', { required: '아이디를 입력해주세요.' })}
              error={errors.userId}
            />
            <ErrorMessage
              errors={errors}
              name='userId'
              render={({ message }) => (
                <Typography
                  sx={{ fontSize: '11px', color: theme.palette.error.main }}
                >
                  {message}
                </Typography>
              )}
            />
          </Stack>
          <Stack>
            <Typography>사용자명</Typography>
            <TextField
              type='text'
              {...register('username', {
                required: '사용자명을 입력해주세요.',
              })}
              error={errors.username}
            />
            <TextFieldErrorMessage name={'username'} errors={errors} />
          </Stack>
          <Stack>
            <Typography>비밀번호</Typography>
            <TextField
              type='password'
              {...register('password', {
                required: '비밀번호를 입력해주세요.',
              })}
              error={errors.password}
            />
            <TextFieldErrorMessage name={'password'} errors={errors} />
          </Stack>
          <Stack>
            <Typography>비밀번호 확인</Typography>
            <TextField
              type='password'
              {...register('passwordCheck', {
                validate: (value) =>
                  value === watch('password') ||
                  '비밀번호가 일치하지 않습니다.',
              })}
              error={errors.passwordCheck}
            />
            <TextFieldErrorMessage name={'passwordCheck'} errors={errors} />
          </Stack>
          <Stack>
            <Typography>관리등급</Typography>
            <Select
              name='role'
              value={watch('role')}
              onChange={(e) => setValue('role', e.target.value)}
            >
              <MenuItem value='USER'>USER</MenuItem>
              <MenuItem value='ADMIN'>ADMIN</MenuItem>
            </Select>
          </Stack>
        </Stack>
        <Stack
          sx={{
            flexDirection: 'row',
            width: '100%',
            gap: '10px',
          }}
        >
          <Button variant='outlined' onClick={handleClose} fullWidth>
            취소
          </Button>
          <Button variant='contained' type='submit' fullWidth>
            생성
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default CreateUserDialog;
