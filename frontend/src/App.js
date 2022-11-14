import logo from './logo.svg';
import './App.css';
import ProblemList from './ProblemList';
import Left from './Left';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Explanation from './Explanation';
import Related from './Related'

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
            <Route path="/hhg" element={<Left />} />
            {/* <Route path="/problems/" element={<ProblemDetail />} /> */}
           
          
          </Routes>
        </div>
        {<Explanation title="asdf" />}
        {<Related/>}
      </div>
    </BrowserRouter>
  );
}

export default App;