import React from "react";

import Dialog from "./Dialog";
import { DialogContext } from "./DialogContext";

export const DialogProvider = ({ children }) => {
  const [isOpenDialog, setIsOpenDialog] = React.useState(false);
  const [dialogProps, setDialogProps] = React.useState({
    title: "title",
    description: "description",
    variant: "confirm",
    primaryAction: {
      name: "primary",
      onClick: () => {
        console.log("primary action!");
      },
    },
    secondaryAction: {
      name: "secondary",
      onClick: () => {
        console.log("secondary action!");
      },
    },
  });

  const openDialog = ({
    title,
    variant,
    description,
    primaryAction,
    secondaryAction,
  }) => {
    setIsOpenDialog(true);

    const primaryActionFunc = primaryAction.onClick;
    primaryAction.onClick = () => {
      setIsOpenDialog(false);
      primaryActionFunc();
    };

    setDialogProps({
      title,
      variant,
      description,
      primaryAction,
      secondaryAction,
    });
  };

  const closeDialog = () => {
    setIsOpenDialog(false);
  };

  return (
    <DialogContext.Provider value={{ openDialog }}>
      <Dialog open={isOpenDialog} onClose={closeDialog} {...dialogProps} />
      {children}
    </DialogContext.Provider>
  );
};
