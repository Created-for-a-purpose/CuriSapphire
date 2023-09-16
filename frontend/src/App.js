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

const sapphire = {
  id: 23_295,
  name: 'Oasis Sapphire Testnet',
  network: 'dev',
  iconUrl: 'https://15065ae3c21e0bff07eaf80b713a6ef0.ipfscdn.io/ipfs/bafkreiespupb52akiwrexxg7g72mh7m7h7lum5hmqijmpdh3kmuunzclha/',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Sapphire Test Rose',
    symbol: 'ROSE',
  },
  rpcUrls: {
   public: { http: ['https://testnet.sapphire.oasis.dev/'] },
   default: { http: ['https://testnet.sapphire.oasis.dev/'] }
  },
  blockExplorers: {
    default: {name: 'Sapphire', url: 'https://testnet.explorer.sapphire.oasis.dev'}
  },
}

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
      <RainbowKitProvider chains={chains}  modalSize="compact" coolMode showRecentTransactions={true}
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
      </Routes>
      </RainbowKitProvider>
    </WagmiConfig>
  )
};
