import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {GoogleOAuthProvider} from '@react-oauth/google';
import App from './App.tsx';
import './index.css';

// The Google OAuth Client ID is a PUBLIC identifier (not a secret like an
// API key) — it's safe and expected to ship in the frontend bundle. Get one
// at https://console.cloud.google.com/apis/credentials and put it in
// VITE_GOOGLE_CLIENT_ID in your .env file. If it's not set, the app still
// works fine — the "Sign in with Google" button just won't be shown.
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
);
