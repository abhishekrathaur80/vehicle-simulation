import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AddSenario from "./Pages/Add Scenario/AddSenario";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllScenarios from "./Pages/AllScenarios/AllScenarios";
import AddVehicles from "./Pages/AddVehicles/AddVehicles";
import HomePage from "./Pages/HomePage/HomePage";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element=<HomePage /> />
          <Route path="/add-scenario" element=<AddSenario /> />
          <Route path="/all-senarios" element=<AllScenarios /> />
          <Route path="/add-vehicles" element=<AddVehicles /> />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
