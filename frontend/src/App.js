import logo from './logo.svg';
import './App.css';
import ProblemList from './ProblemList';

function App() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <div>
        <ProblemList />
      </div>
    </div>
  );
}

export default App;