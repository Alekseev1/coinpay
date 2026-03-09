import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import Button from './Button'; // ← ваш кастомный компонент

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'], // Автоматически генерирует документацию
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'outlined', 'text'],
    },
    size: {
      control: { type: 'radio' },
      options: ['small', 'medium', 'large'],
    },
    isLoading: {
      control: { type: 'boolean' },
    },
  },
  args: {
    // Use `fn` to spy on the onClick arg
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Loading: Story = {
  args: {
    variant: 'primary',
    isLoading: true,
    children: 'Loading...',
  },
};

export const Sizes: Story = {
  args: {
    // Не передаём size — пусть будет по умолчанию
    variant: 'primary', // или любой другой
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button {...args} size="small">Small</Button>
        <Button {...args} size="medium">Medium</Button>
        <Button {...args} size="large">Large</Button>
      </div>
    </div>
  ),
};