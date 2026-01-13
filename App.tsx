
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
import { auth } from './firebase';

const App = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
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

          {/* Authentication Route */}
          <Route path="/login" element={<Login />} />
          <Route
            path="/health-records/detail"
            element={<HealthRecordsDetail />}
          />
          {/* Admin Dashboard Protected Route */}
          <Route
            path="/admin"
            element={user ? <AdminDashboard /> : <Navigate to="/login" replace />}
          />

          {/* News Routes */}
          <Route path="/news/:categoryId" element={<NewsCategory />} />
          <Route path="/news/detail/:id" element={<NewsDetail />} />

          {/* Dashboard Routes */}
          <Route path="/health-records" element={<HealthRecords />} />

          {/* Hanoi Healthcare System Map */}
          <Route path="/hanoi-system" element={<HanoiSystem />} />

          {/* Smart Emergency Operations Center */}
          <Route path="/emergency" element={<EmergencyCenter />} />

          {/* Online Health Consultation */}
          <Route path="/consulting" element={<HealthConsultation />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
