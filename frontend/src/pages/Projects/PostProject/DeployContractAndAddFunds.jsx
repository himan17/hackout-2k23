import React, { useEffect, useState } from "react";
import { getProjectFromFB } from "./services";

export const DeployContractAndAddFunds = (props) => {
  const projectId = props.projectDetails.projectId;
  const [project, setProject] = useState(null);
  useEffect(() => {
    getProjectFromFB(projectId).then((project) => {
      setProject(project);
    });
  }, []);
  
  return (<div>
    <h1>Deploy Contract And Add Funds</h1>
    <p>Project ID: {projectId}</p>
    <p>Project: {project}</p>
    <button className="">Deploy Contract</button>

    <hr />

    <p>Contract Address: </p>
    <p>Contract Balance: </p>

    <hr />

    <button>Add Funds</button>

    <hr />
    
    <p>Contract Address: </p>
    <p>Contract Balance: </p>

    <p className="text-green">Funds added successfully</p>

    <hr />

  </div>);
};
