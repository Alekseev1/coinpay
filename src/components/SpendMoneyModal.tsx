// src/components/SpendMoneyModal.tsx
import { useState } from 'react';
import { useAppStore } from '../store/appStore';
import { toast } from 'react-toastify';
import Modal from '../ui/Modal/Modal';
import Input from '../ui/Input/Input';
import Button from '../ui/Button/Button';

interface SpendMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (amount: number) => void;
}

const SpendMoneyModal: React.FC<SpendMoneyModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [amount, setAmount] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { spend, user } = useAppStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);

    if (isNaN(numAmount) || numAmount <= 0) {
      toast.error('Enter a valid amount');
      return;
    }

    if (user && numAmount > user.balance) {
      toast.error('Insufficient balance');
      return;
    }

    setIsLoading(true);
    try {
      await spend(numAmount);
      if (onSuccess) onSuccess(numAmount);
      onClose();
      setAmount('');
    } catch (err) {
      // Ошибка уже обработана в store (toast.error)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title="Spend Money"
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
        <Button
          type="submit"
          disabled={isLoading}
          variant="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          {isLoading ? 'Spending...' : 'Spend'}
        </Button>
      </form>
    </Modal>
  );
};

export default SpendMoneyModal;