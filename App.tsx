
import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import NewsCategory from './pages/NewsCategory';
import NewsDetail from './pages/NewsDetail';
import HealthRecords from './pages/HealthRecords';
import HanoiSystem from './pages/HanoiSystem';
import EmergencyCenter from './pages/EmergencyCenter';
import HealthConsultation from './pages/HealthConsultation';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import HealthRecordsDetail from './pages/HealthRecordsDetail';
import WorkSchedule from './pages/WorkSchedule';
import { api } from './api';

const App = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      try {
        const userData = await api.get('/auth/me');
        setSession({ user: userData });
      } catch (error) {
        console.warn("Session verification failed, clearing token.");
        localStorage.removeItem('auth_token');
        setSession(null);
      }
    } else {
      setSession(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    checkAuth();
    
    // Custom event to handle login from within the same window
    const handleAuthChange = () => checkAuth();
    window.addEventListener('auth-change', handleAuthChange);
    window.addEventListener('storage', handleAuthChange);
    
    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, [checkAuth]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">Đang tải hệ thống...</p>
      </div>
    );
  }

  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLoginSuccess={checkAuth} />} />
          <Route path="/health-records/detail" element={<HealthRecordsDetail />} />
          <Route path="/schedule" element={<WorkSchedule />} />
          
          <Route
            path="/admin"
            element={session ? <AdminDashboard /> : <Navigate to="/login" replace />}
          />

          <Route path="/news/:categoryId" element={<NewsCategory />} />
          <Route path="/news/detail/:id" element={<NewsDetail />} />
          <Route path="/health-records" element={<HealthRecords />} />
          <Route path="/hanoi-system" element={<HanoiSystem />} />
          <Route path="/emergency" element={<EmergencyCenter />} />
          <Route path="/consulting" element={<HealthConsultation />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
