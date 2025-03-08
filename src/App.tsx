import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StoresPage from './pages/StoresPage';
import Layout from './components/Layout';
import SkusPage from './pages/SkusPage';
import PlanningPage from './pages/PlanningPage';
import ChartPage from './pages/Chartpage';

function App() {
  return (
    <Router>
        <Layout>
        <Routes>
          <Route path="/" element={<StoresPage />} />
          <Route path="/stores" element={<StoresPage />} />
          <Route path="/skus" element={<SkusPage />} />
          <Route path="/planning" element={<PlanningPage />} />
          <Route path="/chart" element={<ChartPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App
