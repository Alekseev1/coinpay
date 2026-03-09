// src/pages/RegisterPage.tsx
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import RegisterForm from '../components/RegisterForm';

const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-8">
        <Header title="Sign Up" showBack={true} onBack={() => navigate(-1)} />

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <RegisterForm />
        </div>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;