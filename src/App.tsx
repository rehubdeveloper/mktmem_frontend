import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import LandingPage from './components/LandingPage';
import Layout from './components/Layout';
import ServiceSelection from './components/onboarding/ServiceSelection';
import ServiceSurveys from './components/onboarding/ServiceSurveys';
import Overview from './components/dashboard/Overview';
import PresenceMarketing from './components/dashboard/PresenceMarketing';
import SocialConnections from './components/dashboard/SocialConnections';
import QRPlacements from './components/dashboard/QRPlacements';
import ItineraryInclusion from './components/dashboard/ItineraryInclusion';
import Messaging from './components/dashboard/Messaging';
import Billing from './components/dashboard/Billing';
import Registration from './components/onboarding/Registration';
import Login from './components/onboarding/Login';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/onboarding" element={<ServiceSelection />} />
          <Route path="/onboarding/register" element={<Registration />} />
          <Route path="/onboarding/login" element={<Login />} />
          <Route path="/onboarding/surveys" element={<ServiceSurveys />} />
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Overview />} />
            <Route path="presence" element={<PresenceMarketing />} />
            <Route path="social" element={<SocialConnections />} />
            <Route path="qr" element={<QRPlacements />} />
            <Route path="itinerary" element={<ItineraryInclusion />} />
            <Route path="messaging" element={<Messaging />} />
            <Route path="billing" element={<Billing />} />
            <Route path="settings" element={<div className="p-8 text-center text-gray-500">Settings page coming soon...</div>} />
          </Route>
          {/* Catch all route - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;