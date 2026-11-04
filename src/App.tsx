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
            background: '#fffdf9',
            color: '#1e1b18',
            border: '1px solid #e2d8c3',
            borderRadius: '4px',
            fontSize: '13px',
            fontFamily: "'Special Elite', 'Courier Prime', monospace",
            boxShadow: '0 4px 16px rgba(45, 30, 15, 0.12)',
          },
          success: {
            iconTheme: {
              primary: '#5b8266',
              secondary: '#fffdf9',
            },
          },
          error: {
            iconTheme: {
              primary: '#df6b5c',
              secondary: '#fffdf9',
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

