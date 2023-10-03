import React from 'react';
import "./styles/App.scss"
import { Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import DashboardForm from './pages/DashboardForm';

//wagmi 
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { sepolia } from 'wagmi/chains';
import UserDashboard from './pages/UserDashboard';
import Prescriptions from './pages/Prescriptions';
import PrescriptionCard from './components/PrescriptionCard';
import Reports from './pages/Reports';
import Pharmacy from './pages/Pharmacy';
import Hospital from './pages/Hospital';

import { sapphire } from "./utils/chainData"
import MarketPlace from './pages/MarketPlace';

const { chains, publicClient } = configureChains(
  [sapphire, sepolia],
  [publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: 'CB',
  projectId: 'cbabb06b3a049fce0e9231318d94998e',
  chains
});
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

export default function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} modalSize="compact" coolMode showRecentTransactions={true}
        theme={lightTheme({
          accentColor: '#ffb9e5',
          accentColorForeground: 'black',
          borderRadius: 'medium',
          fontStack: 'system',
          overlayBlur: 'small',
        })}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/:id" element={<DashboardForm />} />
          <Route path="/dashboard/user" element={<UserDashboard />} />
          <Route path="/dashboard/prescriptions" element={<Prescriptions />} />
          <Route path="/dashboard/prescriptions/:id" element={<PrescriptionCard />} />
          <Route path="/dashboard/reports" element={<Reports />} />
          <Route path="/pharmacy" element={<Pharmacy />} />
          <Route path="/hospital" element={<Hospital />} />
          <Route path="/marketplace" element={<MarketPlace />} />
        </Routes>
      </RainbowKitProvider>
    </WagmiConfig>
  )
};
