import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Profilepictureupdate from './contextshare/Profilepictureupdate.jsx'





createRoot(document.getElementById('root')).render(
  <StrictMode>
    


      <BrowserRouter>
      
<GoogleOAuthProvider clientId="707793928063-lj6gid1t48tsb130hht87ps8kkbgao4h.apps.googleusercontent.com">
  <Profilepictureupdate><App /></Profilepictureupdate>
  
  </GoogleOAuthProvider>

    
    </BrowserRouter>
  
    
    
  </StrictMode>,
)
