import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import Input from './Input';

const meta = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['outlined', 'filled', 'standard'],
    },
    size: {
      control: { type: 'radio' },
      options: ['small', 'medium'],
    },
    error: {
      control: { type: 'boolean' },
    },
    helperText: {
      control: { type: 'text' },
    },
    label: {
      control: { type: 'text' },
    },
    placeholder: {
      control: { type: 'text' },
    },
    type: {
      control: { type: 'text' },
    },
  },
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    onChange: fn(), // Для отслеживания изменений
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// Основная стори
export const Default: Story = {};

// Стори с ошибкой
export const WithError: Story = {
  args: {
    label: 'Password',
    error: true,
    helperText: 'Password is too short',
    type: 'password',
  },
};

// Стори с разными размерами
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Input {...args} size="small" label="Small Input" />
      <Input {...args} size="medium" label="Medium Input" />
    </div>
  ),
};

// Стори с разными вариантами
export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Input {...args} variant="outlined" label="Outlined" />
      <Input {...args} variant="filled" label="Filled" />
      <Input {...args} variant="standard" label="Standard" />
    </div>
  ),
};

// Стори с типами полей
export const Types: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Input {...args} type="text" label="Text" />
      <Input {...args} type="password" label="Password" />
      <Input {...args} type="email" label="Email" />
      <Input {...args} type="number" label="Number" />
    </div>
  ),
};