import ProfileEditSection from './profile/ProfileEditSection';
import PreferenceSettings from './profile/PreferenceSettings';
import RecommendedPaths from './profile/RecommendedPaths';
import AccountActions from './profile/AccountActions';

const Profile: React.FC = () => {
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-6 max-w-5xl mx-auto space-y-6">
      {/* 顶部双列：个人信息 + 学习偏好 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <ProfileEditSection />
        <PreferenceSettings />
      </div>

      {/* 个性化学习路径推荐 */}
      <RecommendedPaths />

      {/* 账号操作 */}
      <AccountActions />
    </div>
  );
};

export default Profile;
