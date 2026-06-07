import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import MobileNav from '@/components/layout/MobileNav';
import ProtectedRoute from '@/components/ProtectedRoute';

// Public Pages
import Home from '@/pages/HomePage';
import Login from '@/pages/LoginPage';
import Register from '@/pages/RegisterPage';

// Protected Pages
import Courses from '@/pages/Courses';
import CourseDetail from '@/pages/CourseDetail';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';
import Community from '@/pages/CommunityPage';
import PostDetail from '@/pages/PostDetailPage';

// Learning Module Pages
import LearnPage from '@/pages/LearnPage';
import VocabularyPage from '@/pages/VocabularyPage';
import GrammarPage from '@/pages/GrammarPage';
import SpeakingPage from '@/pages/SpeakingPage';
import ListeningPage from '@/pages/ListeningPage';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Main Layout with Header + Footer + MobileNav */}
        <Route element={
          <>
            <MainLayout />
            <MobileNav />
          </>
        }>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community/post/:id" element={<PostDetail />} />

          {/* Protected Routes */}
          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <Courses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses/:id"
            element={
              <ProtectedRoute>
                <CourseDetail />
              </ProtectedRoute>
            }
          />

          {/* Learning Module - Nested Routes */}
          <Route
            path="/learn/:courseId"
            element={
              <ProtectedRoute>
                <LearnPage />
              </ProtectedRoute>
            }
          >
            <Route path="vocabulary" element={<VocabularyPage />} />
            <Route path="grammar" element={<GrammarPage />} />
            <Route path="speaking" element={<SpeakingPage />} />
            <Route path="listening" element={<ListeningPage />} />
          </Route>

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Auth Pages (No Layout) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
