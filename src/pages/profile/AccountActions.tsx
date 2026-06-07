import { useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut, KeyRound, Trash2, AlertTriangle } from 'lucide-react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/stores/useAuthStore';

const AccountActions: React.FC = () => {
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDeleteAccount = () => {
    logout();
    setShowDeleteModal(false);
    navigate('/login');
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card glass>
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-red-400" />
            账号操作
          </h3>

          <div className="space-y-3 max-w-md">
            {/* 修改密码入口 */}
            <button className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/8 hover:border-white/20 hover:bg-white/[0.06] transition-all text-left group">
              <KeyRound className="w-5 h-5 text-gray-400 group-hover:text-[#FF6B35] transition-colors" />
              <div className="flex-1">
                <p className="text-sm font-medium text-white">修改密码</p>
                <p className="text-xs text-gray-500">更新你的登录密码</p>
              </div>
              <ArrowIcon />
            </button>

            {/* 登出按钮 */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-red-500/8 border border-red-500/20 hover:bg-red-500/15 hover:border-red-500/40 transition-all text-left group"
            >
              <LogOut className="w-5 h-5 text-red-400" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-300">退出登录</p>
                <p className="text-xs text-red-400/60">退出当前账号</p>
              </div>
              <ArrowIcon className="text-red-400/40" />
            </button>

            {/* 删除账号 */}
            <button
              onClick={() => setShowDeleteModal(true)}
              className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-red-500/30 hover:bg-red-500/5 transition-all text-left group"
            >
              <Trash2 className="w-5 h-5 text-gray-500 group-hover:text-red-400 transition-colors" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-300 group-hover:text-red-300 transition-colors">删除账号</p>
                <p className="text-xs text-gray-600">永久删除账号和所有数据</p>
              </div>
              <ArrowIcon className="text-gray-600" />
            </button>
          </div>
        </Card>
      </motion.div>

      {/* 删除账号确认弹窗 */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="确认删除账号"
        size="sm"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
            <AlertTriangle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-300">此操作不可撤销</p>
              <p className="text-xs text-red-400/70 mt-1">
                删除后，你的所有学习进度、成就记录、个人设置等数据将被永久清除且无法恢复。
              </p>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              取消
            </Button>
            <Button
              variant="primary"
              style={{
                background: 'linear-gradient(135deg, #EF4444, #DC2626)',
                boxShadow: '0 0 20px rgba(239,68,68,0.3)',
              }}
              leftIcon={<Trash2 className="w-4 h-4" />}
              onClick={handleDeleteAccount}
            >
              确认删除
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

/** 右箭头图标 */
const ArrowIcon: React.FC<{ className?: string }> = ({ className = 'text-gray-500' }) => (
  <svg className={`w-4 h-4 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

export default AccountActions;
