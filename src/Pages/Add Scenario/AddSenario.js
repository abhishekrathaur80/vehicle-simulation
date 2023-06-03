import React, { useEffect, useState } from "react";
import "./AddScenario.css";
import { toast } from "react-toastify";
import Layout from "../../Components/Layout";


const AddSenario = () => {
  const [scenarioName, setSecinarioName] = useState("");
  const [scenarioTime, setSecinarioTime] = useState(0);


  const submitHandler = (e) => {
    e.preventDefault();
    let regObj = { scenarioName, scenarioTime };
    fetch("http://localhost:8080/scenarios", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(regObj),
    })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          toast.success("Scenario added");
          setSecinarioName("");
          setSecinarioTime(0);
        } else {
          toast.error("not added");
        }
      })
      .catch((error) => {
        toast.error("Failed:" + error.message);
      });
  };
  const handleReset = () => {
    setSecinarioName("");
    setSecinarioTime(0);
  };



  useEffect(() => {
    setSecinarioName(localStorage.getItem("name"));
    setSecinarioTime(localStorage.getItem("time"));
  }, []);

  
  return (
    <Layout>
      <div className="container">
        <h4>Scenario / Add</h4>
        <div>
          <h2>Add Scenario</h2>
          <form onSubmit={submitHandler}>
            <div className="addScenarioForm">
              <div className="input">
                <label for="name-id">Scenario Name</label>
                <input
                  id="input-id"
                  type="text"
                  value={scenarioName}
                  placeholder="Name"
                  className="ScenarioInput"
                  required
                  onChange={(e) => setSecinarioName(e.target.value)}
                />
              </div>
              <div className="input">
                <label for="time-id">Scenario Time (second)</label>
                <input
                  id="time-id"
                  type="text"
                  className="ScenarioInput"
                  required
                  value={scenarioTime}
                  onChange={(e) => setSecinarioTime(e.target.value)}
                />
              </div>
            </div>

            <button className="add" type="submit">
              Add
            </button>
            <button className="reset" onClick={handleReset}>
              Reset
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddSenario;
