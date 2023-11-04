import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjectFromFB } from "../../PostProject/services";
import {
  assignProjectOnFb,
  finishMilestoneInFb,
  getParticipantsOfProject,
} from "../services";
import { Navbar } from "../../../../components/Navbar/Navbar";
import { AiFillGithub } from "react-icons/ai";
import { BsChatLeftText } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { MilestoneCard } from "../../../../components/MilestoneCard/MilestoneCard";

export const ManageProject = () => {
  const [project, setProject] = useState({});
  const [update, setUpdate] = useState(0);
  const [list, setList] = useState([]);

  const { projectId } = useParams();
  const tabs = [
    { title: "My Projects", path: "/my-projects" },
    {
      title: "Manange Project",
      path: `/my-projects/manage-project/${projectId}`,
    },
  ];

  const assignProject = async (id, username) => {
    // in participant - mark assigned true
    // in project - mark alloted true
    await toast.promise(assignProjectOnFb(id, projectId, username), {
      loading: `Assigning project to ${username}`,
      success: `Assigned successfully`,
      error: "Some error occured, contact support",
    });
    setUpdate(update + 1);
    // createSmartContract();
  };

  const finishMilestone = async (milestoneId, projectId) => {
    // mark milestone as finished in the db
    await toast.promise(finishMilestoneInFb(milestoneId, projectId), {
      loading: "Updating milestone status",
      success: "Milestone updated",
      error: "Some error occured",
    });
    // finishMilestoneReleaseCryptoInSC()
    setUpdate(update + 1);
  };
  useEffect(() => {
    getProjectFromFB(projectId).then((project) => {
      console.log(project, update);
      setProject(project);
      getParticipantsOfProject(projectId).then((list) => setList(list));
    });
  }, [update, projectId]);

  return (
    <>
      <Navbar tabs={tabs} />
      <div className="md:m-10 m-4">
        {project?.assigned ? (
          <>
            {/* Milestone Section  */}
            <div className="flex flex-row justify-between">
              <p className="font-medium text-2xl inline-block">Milestones</p>
              <div className="inline-block">
                <p className="pb-1 font-medium">
                  CryptoLancer:{" "}
                  <a
                    className="font-medium text-sm text-lime-700 text-center"
                    href={`https://github.com/${project?.assignee}`}
                  >
                    <AiFillGithub className="text-2xl inline-block my-auto mx-1" />
                    {project?.assignee}
                  </a>
                </p>
                <p className="inline-block ml-24 cursor-pointer text-sm text-white rounded-md italic  p-1 px-2 bg-blue-400">
                  Open chat <BsChatLeftText className="inline-block ml-2" />
                </p>
              </div>
            </div>
            <hr className="my-6"></hr>
            <div>
              <ul>
                {project?.milestones.map((milestone, idx) => (
                  <li
                    id={milestone?.milestoneId}
                    className={`m-3 border border-${
                      milestone?.finished ? "lime" : "yellow"
                    }-400 border-l-8 p-4`}
                  >
                    <MilestoneCard
                      milestone={milestone}
                      idx={idx}
                      col={milestone?.finished}
                    />
                    {milestone?.finished ? (
                      <p>
                        Status:{" "}
                        <span className="text-lime-600 font-medium">
                          Completed.{" "}
                        </span>
                      </p>
                    ) : (
                      <>
                        {milestone?.claimed ? (
                          <>
                            <button
                              onClick={() => {
                                finishMilestone(
                                  milestone?.milestoneId,
                                  projectId
                                );
                              }}
                              className="bg-blue-500 text-sm font-bold p-2 text-white rounded-lg"
                            >
                              Accept and Release Reward
                            </button>
                            <p className="text-sm italic py-1 text-gray-500">
                              Cryptolancer has marked the milestone as
                              completed.
                            </p>
                          </>
                        ) : (
                          <>
                            <p>
                              Status:{" "}
                              <span className="text-yellow-600 font-medium">
                                To Be Completed by Cryptolancer.{" "}
                              </span>
                            </p>
                            <p className="text-sm italic">
                              Ask cryptolancer to mark the milestone as
                              completed, if they have finished.
                            </p>
                          </>
                        )}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          // Assign Cryptolancer section
          <div className="">
            <p className="font-medium text-2xl">List of Cryptolancers</p>
            <hr className="my-6"></hr>
            <div>
              <ul className="bg-gray-100 p-2 rounded-md max-w-2xl h-96 overflow-scroll no-scrollbar">
                {list?.map((e) => (
                  <li
                    key={e.id}
                    className="bg-white m-1 my-2 flex flex-row justify-between p-2 rounded-lg"
                  >
                    <a
                      className="font-medium text-sm text-lime-700 text-center"
                      href={`https://github.com/${e?.participant}`}
                    >
                      <AiFillGithub className="text-2xl inline-block my-auto mx-1" />
                      {e?.participant}
                    </a>
                    <button
                      onClick={() => assignProject(e?.id, e?.participant)}
                      className="bg-blue-600 text-sm font-bold hover:bg-blue-400 py-1 px-2 text-white rounded-lg"
                    >
                      Assign
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
