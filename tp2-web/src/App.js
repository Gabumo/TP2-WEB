import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PageListeClients } from './pages/PageListeClients.js';
import { PageAjoutClient } from './pages/PageAjoutClient.js';
import { PageModificationClient } from './pages/PageModificationClient.js';
import { PageModificationAdresse } from './pages/PageModificationAdresse.js';
import { 
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/ajout-client" element={<PageAjoutClient />} />
        <Route path="/liste-clients" element={<PageListeClients />} />
        <Route path="/modification/:id" element={<PageModificationClient />} />
        <Route path="/modification/:id/:adresseId" element={<PageModificationAdresse />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
