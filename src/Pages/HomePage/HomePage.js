import React, { useEffect, useState } from "react";
import "./HomePage.css";
import Layout from "../../Components/Layout";
import Car from "../../Components/Car";

const HomePage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [scenarios, setScenario] = useState([]);
  const [seletedScenario, setSelectedScenario] = useState(null);

  const getVehicle = async () => {
    const response = await fetch("http://localhost:8080/vehicles");
    const data = await response.json();
    setVehicles(data);
  };

  const getScenarios = async () => {
    const response = await fetch("http://localhost:8080/scenarios");
    const data = await response.json();

    setScenario(data);
  };

  useEffect(() => {
    getScenarios();
    getVehicle();
  }, [seletedScenario]);
  const scenarioListHandler = (event) => {
    setSelectedScenario(event.target.value);
  };
  const startSimulation = () => {
    console.log("start car on graph");
  };
  return (
    <Layout>
      <div className="container">
        <p>Scenario</p>
        <select onChange={scenarioListHandler}>
          <option>Select Scenario</option>
          {scenarios.map((option) => (
            <option key={option.id}>{option.scenarioName}</option>
          ))}
        </select>
        <div className="tableBody">
          <div className="vehicleTable">
            <table>
              <thead>
                <tr>
                  <th>Vehicle id</th>
                  <th>Vehicle Name</th>
                  <th>Position X</th>
                  <th>Position Y</th>
                  <th>Speed</th>
                  <th>Direction</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {seletedScenario &&
                  vehicles.map((item, id) => {
                    if (seletedScenario === item.selectScenario) {
                      return (
                        <tr key={item.id}>
                          <th>{item.id}</th>
                          <td>{item.vehicleName}</td>
                          <td>{item.positionX}</td>
                          <td>{item.positionX}</td>
                          <td>{item.speed}</td>
                          <td>{item.direction}</td>

                          <td>
                            <i class="fa-solid fa-pen"></i>
                          </td>
                          <td>
                            <i class="fa-solid fa-trash"></i>
                          </td>
                        </tr>
                      );
                    }
                  })}
              </tbody>
            </table>
            <div className="button">
              <button className="stop">Stop Simulation</button>
              <button className="start" onClick={startSimulation}>
                Start Simulation
              </button>
            </div>

            <div className="graph">
              {seletedScenario &&
                vehicles.map((item, id) => {
                  if (seletedScenario === item.selectScenario) {
                    return (
                      <Car
                        key={item.id}
                        positionX={item.positionX}
                        positionY={item.positionY}
                        speed={item.speed}
                        direction={item.direction}
                        startSimulation={startSimulation}
                      />
                    );
                  }
                })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
