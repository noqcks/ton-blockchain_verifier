import { ReactNode, useCallback } from "react";
import { VariantType, useSnackbar } from "notistack";
import { IconButton, styled } from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";

const StyledMessage = styled(Box)({
  "& &": {
    color: "white",
  },
  "& a": {
    color: "white",
  },
});

function useNotification() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const showNotification = useCallback(
    (
      message: ReactNode | string,
      variant: VariantType,
      onClose?: () => void,
      autoHideDuration?: number,
    ) => {
      let key: any | undefined; key = enqueueSnackbar(<StyledMessage>{message}</StyledMessage>, {
        variant,
        autoHideDuration: autoHideDuration || 5000,
        onClose,
        // The 'onClick' option is not supported by notistack's OptionsObject
        action: () => (
          <IconButton>
            <CloseIcon sx={{ color: "#fff", stroke: "#fff", width: 20, height: 20 }} />
          </IconButton>
        ),
      });
    },
    [closeSnackbar, enqueueSnackbar],
  );

  return { showNotification };
}

export default useNotification;
