/* src/main.jsx*/
import { createRoot } from 'react-dom/client'
import './index.css'
import { AppProviders } from './AppProviders.jsx'

createRoot(document.getElementById('root')).render(<AppProviders />)