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
import { RoutePrivee } from './RoutePrivee.js';

import { 
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom';

function App() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <>
    <BrowserRouter>
    <div>
        <ul>
          {isAuthenticated ? (
            <>
              <button onClick={() => logout()}>Se déconnecter</button>
              <li>
                <Link to="/">Page d'accueil</Link>
              </li>
            </>
          ) : (
            <>
              <button onClick={() => loginWithRedirect()}>Se connecter</button>
              <li>
                <Link to="/">Page d'accueil</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    <BarreNavigation />
      <Routes>
        <Route path="/" element={<PageAccueil />} />
        <Route element={<RoutePrivee />}>
        <Route path="/ajout-client" element={<PageAjoutClient />} />
        <Route path="/liste-clients" element={<PageListeClients />} />
        <Route path="/modification/:id" element={<PageModificationClient />} />
        <Route path="/modification/:id/:adresseId" element={<PageModificationAjoutAdresse />} />
        <Route path="/confirmation-suppression/:id" element={<PageConfirmationSuppression />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
