import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StoresPage from './pages/StoresPage';
import Layout from './components/Layout';
import SkusPage from './pages/SkusPage';
import PlanningPage from './pages/PlanningPage';

function App() {
  return (
    <Router>
        <Layout> 
        <Routes>
          <Route path="/" element={<StoresPage />} />
          <Route path="/stores" element={<StoresPage />} />
          <Route path="/skus" element={<SkusPage />} />
          <Route path="/planning" element={<PlanningPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App
