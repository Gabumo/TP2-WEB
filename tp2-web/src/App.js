import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BarreNavigation } from './BarreNavigation.js';
import {PageAccueil} from './pages/PageAccueil.js';
import { PageListeClients } from './pages/PageListeClients.js';
import { PageAjoutClient } from './pages/PageAjoutClient.js';
import { PageModificationClient } from './pages/PageModificationClient.js';
import { PageModificationAjoutAdresse } from './pages/PageModificationAjoutAdresse.js';
import { 
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

function App() {
  return (
    <>
    <BrowserRouter>
    <BarreNavigation />
      <Routes>
        <Route path="/" element={<PageAccueil />} />
        <Route path="/ajout-client" element={<PageAjoutClient />} />
        <Route path="/liste-clients" element={<PageListeClients />} />
        <Route path="/modification/:id" element={<PageModificationClient />} />
        <Route path="/modification/:id/:adresseId" element={<PageModificationAjoutAdresse />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
