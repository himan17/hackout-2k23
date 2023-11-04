import React, { useState } from "react";
import { Navbar } from "../../../components/Navbar/Navbar";
import { BasicInfo } from "./BasicInfo";
import { LinkRepo } from "./LinkRepo";
import { CreateMilestones } from "./CreateMilestones";
import { ReviewProject } from "./ReviewProject";
import { Stepper } from "../../../components/Stepper/Stepper";

const user = JSON.parse(sessionStorage.getItem("cryptoLancerUser"));
export const PostProject = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [projectDetails, setProjectDetails] = useState({
    finished: false,
    assigned: false,
    username: user.username,
    user_avatar: user.avatar,
  });

  const nextTab = () => {
    setActiveTab(activeTab + 1);
  };

  const prevTab = () => {
    setActiveTab(activeTab - 1);
  };

  const updateProjectDetails = (details) => {
    console.log(details);
    setProjectDetails(details);
  };
  const tabs = [
    {
      title: "Project Details",
    },
    {
      title: "Link Repository",
    },
    {
      title: "Create Milestones",
    },
    {
      title: "Project Summary",
    },
  ];
  return (
    <>
      <Navbar
        tabs={[{ title: "Post a new project", path: "/post-a-project" }]}
      />
      <div className="px-10 py-4 h-screen overflow-scroll no-scrollbar">
        <Stepper activeTab={activeTab + 1} tabs={tabs} />
        {activeTab === 0 && (
          <BasicInfo
            nextTab={nextTab}
            prevTab={prevTab}
            updateProjectDetails={updateProjectDetails}
            projectDetails={projectDetails}
          />
        )}
        {activeTab === 1 && (
          <LinkRepo
            nextTab={nextTab}
            prevTab={prevTab}
            updateProjectDetails={updateProjectDetails}
            projectDetails={projectDetails}
          />
        )}
        {activeTab === 2 && (
          <CreateMilestones
            nextTab={nextTab}
            prevTab={prevTab}
            updateProjectDetails={updateProjectDetails}
            projectDetails={projectDetails}
          />
        )}
        {activeTab === 3 && (
          <ReviewProject
            nextTab={nextTab}
            prevTab={prevTab}
            updateProjectDetails={updateProjectDetails}
            projectDetails={projectDetails}
          />
        )}
      </div>
    </>
  );
};
