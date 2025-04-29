import { TextField as MuiTextField, styled } from '@mui/material';

export const TextField = styled(MuiTextField)`
  & .MuiOutlinedInput-root {
    height: 40px;

    fieldset {
      border-color: #e5e7eb;
      border-radius: 4px;
    }
    input {
      font-family: Pretendard;
      font-size: 14px;
      font-weight: 400;
      color: #000000;
      background-color: #fff;
      height: inherit;
      padding: inherit;
      padding-right: 10px;
      padding-left: 10px;
    }
  }
`;
