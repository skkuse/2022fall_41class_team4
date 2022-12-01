import logo from "./logo.svg";
import "./App.css";
import ProblemList from "./ProblemList";
import Left from "./Left";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Explanation from "./Explanation";
import Related from "./Related";
import Login from "./Login";
import Result from "./Result";

function App() {
  return (
    <BrowserRouter>
      <div>
        <div>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <ProblemList />
                  <Explanation title="asdf" />
                  <Result />
                </>
              }
            />

            <Route path="/Problemlist" element={<ProblemList />} />

            <Route path="/login" element={<Login />} />
            {/* <Route path="/problems/" element={<ProblemDetail />} /> */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
