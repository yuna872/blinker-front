import { DialogContext } from '@components/Dialog/DialogContext';
import React from 'react';

export const useDialog = () => {
  const context = React.useContext(DialogContext);

  if (!context)
    throw new Error('useDialog must be used within a DialogContext.');

  return context;
};
