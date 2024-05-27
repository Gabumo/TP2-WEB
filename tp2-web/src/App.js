import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
