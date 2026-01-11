
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import NewsCategory from './pages/NewsCategory';
import HealthRecords from './pages/HealthRecords';
import HanoiSystem from './pages/HanoiSystem';
import EmergencyCenter from './pages/EmergencyCenter';
import HealthConsultation from './pages/HealthConsultation';
import Login from './pages/Login';
import CreateNews from './pages/CreateNews';

const App = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Admin & Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/admin/news/new" element={<CreateNews />} />
          
          {/* News Routes */}
          <Route path="/news/:categoryId" element={<NewsCategory />} />
          <Route path="/news/detail/:id" element={<div className="container mx-auto p-10 text-center">Chi tiết tin tức (Demo Placeholder)</div>} />
          
          {/* Dashboard Routes - Requirements FR 10-13 */}
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
