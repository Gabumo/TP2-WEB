import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PageListeClients } from './pages/PageListeClients';
import { PageAjoutClient } from './pages/PageAjoutClient';
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
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
