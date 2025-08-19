import LoginForm from './LoginForm';

const AuthLayout = ({ onLogin }) => {
  const handleLoginSuccess = (loginData) => {
    onLogin(loginData);
    // Don't navigate here, let the parent component handle navigation
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-xl w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800">User Portal</h1>
        </div>

        <LoginForm onLogin={handleLoginSuccess} />
        
      </div>
    </div>
  );
};

export default AuthLayout; 