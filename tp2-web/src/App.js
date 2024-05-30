import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth0 } from '@auth0/auth0-react';
import { BarreNavigation } from './BarreNavigation.js';
import {PageAccueil} from './pages/PageAccueil.js';
import { PageListeClients } from './pages/PageListeClients.js';
import { PageAjoutClient } from './pages/PageAjoutClient.js';
import { PageModificationClient } from './pages/PageModificationClient.js';
import { PageModificationAjoutAdresse } from './pages/PageModificationAjoutAdresse.js';
import { PageConfirmationSuppression } from './pages/PageConfirmationSuppression.js';
import { PageSeConnecter } from './pages/PageSeConnecter.js';
import { RoutePrivee } from './RoutePrivee.js';
import { Page404 } from './pages/Page404.js';
import { Container } from 'react-bootstrap';

import { 
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom';

function App() {
  return (
    <>
    <BrowserRouter>
    <BarreNavigation />
      <Container>
        <Routes>
          <Route path="/" element={<PageAccueil />} />
          <Route path="/se-connecter" element={<PageSeConnecter />} />
          <Route element={<RoutePrivee />}>
            <Route path="/ajout-client" element={<PageAjoutClient />} />
            <Route path="/liste-clients" element={<PageListeClients />} />
            <Route path="/modification/:id" element={<PageModificationClient />} />
            <Route path="/modification/:id/:adresseId" element={<PageModificationAjoutAdresse />} />
            <Route path="/confirmation-suppression/:id" element={<PageConfirmationSuppression />} />
          </Route>
          <Route path="*" element={<Page404/>} />
        </Routes>
      </Container>
    </BrowserRouter>
    </>
  );
}

export default App;
