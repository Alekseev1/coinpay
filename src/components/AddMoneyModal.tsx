// src/components/AddMoneyModal.tsx
import { useState } from 'react';
import { useAppStore } from '../store/appStore';
import { toast } from 'react-toastify';
import Modal from '../ui/Modal/Modal';
import Input from '../ui/Input/Input';
import Button from '../ui/Button/Button';

interface AddMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (amount: number) => void;
}

const AddMoneyModal: React.FC<AddMoneyModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [amount, setAmount] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const deposit = useAppStore((state) => state.deposit);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast.error('Enter a valid amount');
      return;
    }

    setIsLoading(true);
    try {
      await deposit(numAmount);
      if (onSuccess) onSuccess(numAmount);
      onClose();
      setAmount('');
    } catch (err) {
      // уже показано в store
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title="Add Money"
      onConfirm={handleSubmit}
    >
      <form onSubmit={handleSubmit}>
        <Input
          label="Amount ($)"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
          required
        />
        <Button type="submit" disabled={isLoading} variant="primary" fullWidth sx={{ mt: 2 }}>
          {isLoading ? 'Adding...' : 'Add'}
        </Button>
      </form>
    </Modal>
  );
};

export default AddMoneyModal;