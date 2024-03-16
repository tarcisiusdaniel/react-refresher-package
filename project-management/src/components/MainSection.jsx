import { useState } from 'react';
import Home from './MainFiles/Home';
import CreateProject from './MainFiles/CreateProject';
import ProjectDetail from './MainFiles/ProjectDetail';

export default function MainSection({
    handleCreateProject, 
    createNewProject, 
    cancelCreateProject, 
    addProject, 
    showProject,
    handleCloseProject,
    projects,
    currProject, // the index of the current shown project
    handleEditProject,
    handleDeleteProject,
}) {
    return (
        <>
            {
                showProject ? 
                    <ProjectDetail 
                        handleCloseProject = {handleCloseProject}
                        currProject = {currProject}
                        // setCurrProject = {setCurrProject}
                        projects = {projects}
                        handleEditProject = {handleEditProject}
                        handleDeleteProject = {handleDeleteProject}
                        cancelCreateProject = {cancelCreateProject}
                    />
                    : 
                    (createNewProject ? 
                        <CreateProject 
                            closeCreateProject = {cancelCreateProject}
                            addProject = {addProject}/> 
                        : 
                        <Home handleCreateProject = {handleCreateProject}/>)
            }
        </>
    )
}