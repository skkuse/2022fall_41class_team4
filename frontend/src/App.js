import logo from './logo.svg';
import './App.css';
import ProblemList from './ProblemList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div>
        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
        <div>
          <Routes>
            <Route path="/" element={<ProblemList />} />
            {/* <Route path="/problems/" element={<ProblemDetail />} /> */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;