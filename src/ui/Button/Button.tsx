import { Button as MuiButton } from '@mui/material';
import type { ButtonProps as MuiButtonProps } from '@mui/material';
import clsx from 'clsx';

export interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
}

const Button = ({ variant = 'primary', size = 'medium', isLoading, className, sx, ...props }: ButtonProps) => {
  // Определяем размеры через MUI-стили
  const sizeSx = {
    small: { padding: '6px 12px', fontSize: '0.875rem' },
    medium: { padding: '8px 16px', fontSize: '1rem' },
    large: { padding: '12px 24px', fontSize: '1.125rem' },
  };

  return (
    <MuiButton
      variant={variant === 'outlined' ? 'outlined' : variant === 'text' ? 'text' : 'contained'}
      disabled={isLoading || props.disabled}
      sx={{
        ...sizeSx[size],
        // Если передали `sx` — объединяем
        ...sx,
      }}
      className={clsx(
        'transition-all duration-200 ease-in-out',
        {
          'bg-blue-600 hover:bg-blue-700 text-white': variant === 'primary',
          'bg-gray-200 hover:bg-gray-300 text-gray-800': variant === 'secondary',
          'border border-blue-600 text-blue-600 hover:bg-blue-50': variant === 'outlined',
          'text-blue-600 hover:bg-blue-50': variant === 'text',
          'opacity-75 cursor-not-allowed': isLoading,
        },
        className
      )}
      {...props}
    />
  );
};

export default Button;