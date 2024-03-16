import MainSection from "./components/MainSection";
import Sidebar from "./components/Sidebar";
import { useState } from "react";

function App() {
  const [createNewProject, setCreateNewProject] = useState(false);
  const [projects, setProjects] = useState([]);
  const [showProject, setShowProject] = useState(false);
  const [currProject, setCurrProject] = useState(-1);

  function handleShowProject(index) {
    setShowProject(true);
    setCurrProject(index);
  }

  function handleEditProject(newProject, index) {
    const newProjects = [...projects];
    newProjects[index] = newProject;
    setProjects(newProjects);
  }

  function handleDeleteProject(index) {
    const newProjects = [...projects];
    newProjects.splice(index, 1);
    setProjects(newProjects);
  }

  function handleCloseProject() {
    setShowProject(false);
    // setCreateNewProject(false); 
  }

  function handleCreateProject() {
    setCreateNewProject(true);
  }

  function cancelCreateProject() {
    setCreateNewProject(false);
  }

  function addProject(newProject) {
    // console.log(newProject.title);
    // console.log(newProject.desc);
    // console.log(newProject.date);
    setProjects((prevProjects) => [
      ...prevProjects, newProject
    ]);
  }

  return (
    <>
      <Sidebar 
        handleCreateProject = {handleCreateProject}
        projects = {projects}
        handleShowProject = {handleShowProject}
        handleCloseProject = {handleCloseProject}
        />
      <MainSection 
        handleCreateProject = {handleCreateProject} 
        cancelCreateProject = {cancelCreateProject}
        createNewProject = {createNewProject}
        addProject = {addProject}
        showProject = {showProject}
        handleCloseProject = {handleCloseProject}
        projects = {projects}
        currProject = {currProject}
        handleEditProject = {handleEditProject}
        handleDeleteProject = {handleDeleteProject}
        /> 
    </>
  );
}

export default App;
