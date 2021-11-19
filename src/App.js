import { Route, Routes } from 'react-router';
import './App.css';
import Home from './pages/Home';
import QuestionPage from './pages/QuestionPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/question" element={<QuestionPage />} />
      </Routes>
    </>
  );
}

export default App;
