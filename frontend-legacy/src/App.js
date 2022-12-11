import logo from "./logo.svg";
import "./App.css";
import ProblemList from "./ProblemList";
import Left from "./Left";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Explanation from "./Explanation";
import Related from "./Related";
import Login from "./Login";
import Result from "./Result";

import HHG_problemlist from "./HHG_problemlist";
import HHG_main from "./HHG_main";

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

            <Route path="/HHG_problemlist" element={<HHG_problemlist/>} />
            <Route path="/HHG_main" element={<HHG_main/>} />

            {/* <Route path="/problems/" element={<ProblemDetail />} /> */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
