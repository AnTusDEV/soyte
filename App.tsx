
import React, { useState, useEffect } from 'react';
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
import { supabase } from './supabase';

const App = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lấy session hiện tại
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Lắng nghe thay đổi trạng thái auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
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
