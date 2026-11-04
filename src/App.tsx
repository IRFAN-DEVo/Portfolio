import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import HomePage from '@/pages/HomePage';
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminLayout from '@/pages/admin/AdminLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminProjects from '@/pages/admin/AdminProjects';
import AdminProjectForm from '@/pages/admin/AdminProjectForm';
import AdminMessages from '@/pages/admin/AdminMessages';

export default function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0E0E0E',
            color: '#FFFFFF',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '16px',
            fontSize: '12px',
            fontFamily: "'JetBrains Mono', monospace",
            backdropFilter: 'blur(16px)',
          },
          success: {
            iconTheme: {
              primary: '#ff5c3d',
              secondary: '#000000',
            },
          },
          error: {
            iconTheme: {
              primary: '#ff5c3d',
              secondary: '#000000',
            },
          },
        }}
      />

      <Routes>
        {/* Single-Page Developer Portfolio */}
        <Route path="/" element={<HomePage />} />

        {/* Admin Authentication */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Console */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="projects/new" element={<AdminProjectForm />} />
          <Route path="projects/:id/edit" element={<AdminProjectForm />} />
          <Route path="messages" element={<AdminMessages />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
