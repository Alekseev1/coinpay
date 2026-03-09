// src/store/appStore.ts
import { create } from "zustand";
import { toast } from "react-toastify";

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  avatar: string;
  balance: number;
  currency: string;
}

export interface Transaction {
  id: number;
  type: "Income" | "Spending";
  amount: number;
  description: string;
  category: string;
  createdAt: string;
}

interface AppStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  logout: () => void;
  fetchCurrentUser: () => Promise<void>;
  deposit: (amount: number) => Promise<void>;
  transactions: Transaction[];
  setTransactions: (txs: Transaction[]) => void;
  addTransaction: (tx: Transaction) => void;
  fetchTransactions: () => Promise<void>;
  spend: (amount: number) => Promise<void>;
  fetchTransactionsByMonth: (month: string) => Promise<void>;
  updateUser: (updatedUser: Partial<User>) => void;
}

export const useAppStore = create<AppStore>((set, get) => ({
  user: null,
  transactions: [],
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  logout: () => {
    localStorage.removeItem("token"); // Удаляем токен
    set({ user: null }); // Очищаем состояние
  },
  fetchCurrentUser: async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok && data.user) {
        set({ user: data.user });
      } else {
        // Токен недействителен — удаляем
        localStorage.removeItem("token");
      }
    } catch (err) {
      console.error("Failed to fetch user:", err);
      localStorage.removeItem("token");
    }
  },
  deposit: async (amount) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");

    try {
      const res = await fetch("/api/transactions/deposit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Deposit failed");
      }

      // Обновляем пользователя в хранилище
      set({ user: data.user });

      // После успешного ответа
      const newTx = {
        id: Date.now(), // временный ID
        type: "Income" as const,
        amount,
        description: "Deposit via app",
        category: "Deposit",
        createdAt: new Date().toISOString(),
      };
      get().addTransaction(newTx);
    } catch (err: any) {
      toast.error(err.message);
      throw err;
    }
  },
  spend: async (amount) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");

    try {
      const res = await fetch("/api/transactions/spend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Spend failed");
      }

      // Обновляем пользователя в хранилище
      set({ user: data.user });

      // После успешного ответа
      const newTx = {
        id: Date.now(), // временный ID
        type: "Spending" as const,
        amount,
        description: "Spend via app",
        category: "Spend",
        createdAt: new Date().toISOString(),
      };
      get().addTransaction(newTx);
    } catch (err: any) {
      toast.error(err.message);
      throw err;
    }
  },

  setTransactions: (txs) => set({ transactions: txs }),

  addTransaction: (tx) =>
    set((state) => ({
      transactions: [tx, ...state.transactions],
    })),
  fetchTransactions: async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("/api/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok && Array.isArray(data)) {
        const txs = data.map((tx) => ({
          ...tx,
          amount: parseFloat(tx.amount),
        }));
        set({ transactions: txs });
      }
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
    }
  },
  fetchTransactionsByMonth: async (month) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`/api/transactions?month=${month}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok && Array.isArray(data)) {
        const tsx = data.map((tx) => ({
          ...tx,
          amount: parseFloat(tx.amount),
        }));
        set({ transactions: tsx });
      }
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
      toast.error("Failed to load data for selected month");
    }
  },
  updateUser: (updatedUser) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updatedUser } : null,
    })),
}));
