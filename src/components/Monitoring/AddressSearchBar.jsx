import { TextField } from "@components/TextField";
import { Search } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";

const AddressSearchBar = ({
  address,
  handleChangeAddress,
  handleSubmitAddress,
}) => {
  
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
