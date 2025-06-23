import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Topics from './component/Topics';
import Questions from './component/Questions';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Topics />} />
        <Route path="/questions/:testName" element={<Questions />} />
      </Routes>
    </Router>
  );
}

export default App
