import "./App.css";
import "./Left.css";
import ProblemList from "./ProblemList";
import Left from "./Left";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";

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
                  <Login />
                </>
              }
            />

            <Route path="/problemlist" element={<ProblemList />} />
            <Route path="/problems/:no" element={<Left />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
