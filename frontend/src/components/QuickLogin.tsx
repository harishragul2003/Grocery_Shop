import { motion } from 'framer-motion';
import { User, Shield } from 'lucide-react';

const QuickLogin = ({ onLogin }) => {
  const demoUsers = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'user',
      icon: User,
      label: 'Login as User'
    },
    {
      id: '2',
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
      icon: Shield,
      label: 'Login as Admin'
    }
  ];

  const handleQuickLogin = (user) => {
    const { password: _, ...userWithoutPassword } = user;
    const authData = {
      user: userWithoutPassword,
      token: `demo-token-${user.id}-${Date.now()}`
    };
    onLogin(authData);
  };

  return (
    <div className="mt-6">
      <div className="text-center mb-4">
        <span className="text-xs text-slate-500">Quick Login</span>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {demoUsers.map((user) => {
          const Icon = user.icon;
          return (
            <motion.button
              key={user.id}
              onClick={() => handleQuickLogin(user)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 p-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 rounded-lg transition-all text-xs text-slate-300 hover:text-white"
            >
              <Icon size={14} />
              <span>{user.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickLogin;