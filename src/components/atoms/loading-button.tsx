'use client';

import { RotateCw } from 'lucide-react';
import React from 'react';

import { Button, ButtonProps } from '../ui/button';

interface Props extends ButtonProps {
  loading?: boolean;
  children: React.ReactNode;
}

export const LoadingButton = React.forwardRef<HTMLButtonElement, Props>(({ loading, children, ...props }, ref) => {
  return (
    <Button disabled={loading} ref={ref} {...props}>
      {loading ? (
        <span className="flex gap-1 items-center">
          Loading...
          <RotateCw className="mr-2 h-4 w-4 animate-spin" />
        </span>
      ) : (
        children
      )}
    </Button>
  );
});
LoadingButton.displayName = 'LoadingButton';
