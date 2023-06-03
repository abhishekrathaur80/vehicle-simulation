import React, { useState, useEffect } from "react";
import "./AddVehicles.css";
import Layout from "../../Components/Layout";
import { toast } from "react-toastify";

const AddVehicles = () => {
  const [vehicleName, setVehicleName] = useState("");
  const [speed, setSpeed] = useState("");
  const [positionX, setPositionX] = useState("");
  const [positionY, setPositionY] = useState("");
  const [direction, setDirection] = useState(null);
  const options = ["Towards", "Backwards", "Upwards", "Downward"];
  const [scenarios, setScenario] = useState([]);
  const [selectScenario, setSelectSenario] = useState(null);
  const getData = async () => {
    const response = await fetch("http://localhost:8080/scenarios");
    const jsonData = await response.json();

    setScenario(jsonData);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let regObj = {
      selectScenario,
      vehicleName,
      speed,
      positionX,
      positionY,
      direction,
    };
    fetch("http://localhost:8080/vehicles", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(regObj),
    })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          toast.success("vehicle added");
          setSelectSenario(null);
          setVehicleName("");
          setSpeed("");
          setPositionX("");
          setPositionY("");
          setDirection(null);
        } else {
          toast.error("not added");
        }
      })
      .catch((error) => {
        toast.error("Failed:" + error.message);
      });
  };

  const onOptionChangeHandler = (event) => {
    setDirection(event.target.value);
  };
  const scenarioListHandler = (event) => {
    setSelectSenario(event.target.value);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Layout>
      <div className="container">
        <h4>Vehicle / Add</h4>
        <div>
          <h2>Add Vehicle</h2>
          <form onSubmit={onSubmitHandler}>
            <div className="addScenarioForm">
              <div className="input">
                <label for="name-id">Scenarios List</label>
                <select onChange={scenarioListHandler}>
                  <option>Select Scenario</option>
                  {scenarios.map((option) => {
                    return (
                      <option key={option.id}>{option.scenarioName}</option>
                    );
                  })}
                </select>
              </div>
              <div className="input">
                <label for="name-id">Vehicle Name</label>
                <input
                  id="input-id"
                  type="text"
                  value={vehicleName}
                  className="ScenarioInput"
                  required
                  onChange={(e) => setVehicleName(e.target.value)}
                />
              </div>
              <div className="input">
                <label for="time-id">Speed (second)</label>
                <input
                  id="time-id"
                  type="text"
                  className="ScenarioInput"
                  required
                  value={speed}
                  onChange={(e) => setSpeed(e.target.value)}
                />
              </div>
              <div className="input">
                <label for="position-x">Position X</label>
                <input
                  id="position-x"
                  type="text"
                  className="ScenarioInput"
                  required
                  value={positionX}
                  onChange={(e) => setPositionX(e.target.value)}
                />
              </div>
              <div className="input">
                <label for="position-y">Position Y</label>
                <input
                  id="position-y"
                  type="text"
                  className="ScenarioInput"
                  required
                  value={positionY}
                  onChange={(e) => setPositionY(e.target.value)}
                />
              </div>
              <div className="input">
                <label for="position-y">Direction</label>
                <select onChange={onOptionChangeHandler}>
                  <option>Select Direction</option>
                  {options.map((option, index) => {
                    return <option key={index}>{option}</option>;
                  })}
                </select>
              </div>
            </div>

            <button className="add" type="submit">
              Add
            </button>
            <button className="reset">Reset</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddVehicles;
