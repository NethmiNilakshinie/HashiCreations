import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './CartContext' // CartContext එක import කළා

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider> {/* මුළු App එකම CartProvider එක ඇතුළේ තියෙන්න ඕනේ */}
      <App />
    </CartProvider>
  </StrictMode>,
)