import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';

import Dashboard from './pages/Dashboard';
import AddProperty from './pages/AddProperty';
import ViewProperties from './pages/ViewProperties';
import RentListings from './pages/Listings/RentListings';
import SaleListings from './pages/Listings/SaleListings';
import ShortletListings from './pages/Listings/ShortletListings';
import LandListings from './pages/Listings/LandListings';
import AddListing from './pages/Listings/AddListing';
import Calendar from './pages/Calendar';
import RenterDashboard from './pages/Dashboard/RenterDashboard';
import PropertyDetails from './pages/Property/PropertyDetails';
import Profile from './pages/Profile';
import ShortletExplorer from './pages/explore/ShortletExplorer';
import VacationExplorer from './pages/explore/VacationExplorer';
import RentStatus from './pages/Property/RentStatus';
import RentExplorer from './pages/explore/RentExplorer';
import SaleExplorer from './pages/explore/SaleExplorer';
import DashboardOwner from './pages/Dashboard/DashboardOwner';
import AgentDashboard from './pages/Dashboard/AgentDashboard';
import InquirerDashboard from './pages/Dashboard/InquirerDashboard';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import BuyerDashboard from './pages/Dashboard/BuyerDashboard'; // Optional
import Tenants from './pages/Property/Tenants';
import TenantDashboard from "./pages/Dashboard/TenantDashboard";
import ExplorePage from './pages/explore/ExplorePage';
import Inbox from './pages/Inbox';
import Maintenance from './pages/Property/Maintenance';
import Documents from './pages/Property/Documents';
import Register from './pages/RegisterPage';
import TermsOfUse from './pages/legal/TermsOfUse';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';

import { Landing, Login } from './pages/AuthPages'; // 👈 Import these
import './styles/index.css';

// Protect private routes
const isAuthenticated = () => localStorage.getItem('auth') === 'true';

function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/explore/rent" element={<RentExplorer />} />
        <Route path="/explore/sale" element={<SaleExplorer />} />
        <Route path="/explore/shortlet" element={<ShortletExplorer />} />
        <Route path="/explore/vacation" element={<VacationExplorer />} />
        <Route path="/properties/:propertyId/details" element={<PropertyDetails />} />
        <Route path="/terms" element={<TermsOfUse />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />

        {/* Private routes (require login) */}
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <MainLayout>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/add-property" element={<AddProperty />} />
                  <Route path="/properties" element={<ViewProperties />} />
                  <Route path="/dashboard/inquirer" element={<InquirerDashboard />} />
                  <Route path="/listings/rent" element={<RentListings />} />
                  <Route path="/listings/sale" element={<SaleListings />} />
                  <Route path="/listings/shortlet" element={<ShortletListings />} />
                  <Route path="/listings/land" element={<LandListings />} />
                  <Route path="/add-listing/:type" element={<AddListing />} />
                  <Route path="/dashboard/renter" element={<RenterDashboard />} />
                  

                  <Route path="/dashboard/tenant" element={<TenantDashboard />} />
                  <Route path="/dashboard/owner" element={<DashboardOwner />} />
                  <Route path="/dashboard/agent" element={<AgentDashboard />} />
                  <Route path="/dashboard/admin" element={<AdminDashboard />} />
                  <Route path="/dashboard/buyer" element={<BuyerDashboard />} /> {/* Optional */}
                  <Route path="/inbox" element={<Inbox />} />
                  <Route path="/properties/:propertyId/rent-status" element={<RentStatus />} />
                  <Route path="/properties/:propertyId/tenants" element={<Tenants />} />
                  <Route path="/properties/:propertyId/maintenance" element={<Maintenance />} />
                  <Route path="/properties/:propertyId/documents" element={<Documents />} />

                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </MainLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  </React.StrictMode>
);
