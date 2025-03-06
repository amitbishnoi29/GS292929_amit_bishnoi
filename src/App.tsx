import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StoresPage from './pages/StoresPage';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
        <Layout> 
        <Routes>
          <Route path="/" element={<StoresPage />} />
          <Route path="/stores" element={<StoresPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App
