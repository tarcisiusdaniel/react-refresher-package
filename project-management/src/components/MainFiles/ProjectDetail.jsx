import { useRef, useEffect } from "react";

function getMonth(month) {
    switch(month) {
        case "01":
            return "Jan";
        case "02":
            return "Feb";
        case "03":
            return "Mar";
        case "04":
            return "Apr";
        case "05":
            return "May";
        case "06":
            return "Jun";
        case "07":
            return "Jul";
        case "08":
            return "Aug";
        case "09":
            return "Sep";
        case "10":
            return "Oct";
        case "11":
            return "Nov";
        case "12":
            return "Dec";
        default:
            return "NaN";
    }
}

export default function ProjectDetail({currProject, handleCloseProject, projects, handleEditProject, handleDeleteProject, cancelCreateProject}) {
    const taskRef = useRef(null);

    // issue
    // when you change from a project to another project directly, the input value is NOT EMPTY

    function formatDate(date) {
        let splitDate = date.split("-");
        const year = splitDate[0];
        const month = getMonth(splitDate[1]);
        const day = Number(splitDate[2]);
        return month + " " + day + ", " + year;
    }

    function handleAddTask() {
        console.log(taskRef.current.value);
        if (taskRef.current.value !== "") {
            let copyTasks = [...projects[currProject].tasks];
            let newCurrProject = {...projects[currProject]};
            newCurrProject.tasks = [...copyTasks, taskRef.current.value];
            handleEditProject(newCurrProject, currProject);
        }
        taskRef.current.value = '';
    }

    function handleDeleteTask(index) {
        let copyTasks = [...projects[currProject].tasks];
        copyTasks.splice(index, 1);
        let newCurrProject = {...projects[currProject]};
        newCurrProject.tasks = [...copyTasks];
        handleEditProject(newCurrProject, currProject);
    }
    
    function deleteProject() {
        cancelCreateProject();
        handleCloseProject();
        handleDeleteProject(currProject);
    }

    return (
        <div className = "w-4/5 h-screen flex flex-col py-32 px-10 items-center">
            <div className = "w-4/5">
                <div className = "flex flex-row justify-between my-1">
                    <h1 className = "text-3xl font-semibold text-neutral-600">{projects[currProject].title}</h1>
                    <button className = "text-red-500" onClick = {deleteProject}>
                        Delete
                    </button>
                </div>
                <span className = "text-neutral-400 my-1">
                    {formatDate(projects[currProject].date)}
                </span>
                <p className = "text-neutral-600 my-3">{projects[currProject].desc}</p>
                <div className = "border border-neutral-300 my-1"/>
                <h1 className = "text-2xl font-semibold my-3">Tasks</h1>
                <div className = "flex flex-row justify-start">
                    <input ref = {taskRef} type = "text" className = "bg-neutral-200 p-1 rounded"/>
                    <button 
                        className = "px-4 py-1" 
                        onClick = {handleAddTask}>Add Task</button>
                </div>
                {
                    projects[currProject].tasks.length === 0 ? 
                        <div className = "my-5">
                            <span>This project does not have any tasks yet.</span>
                        </div>
                        :
                        <div className = "my-5 bg-zinc-100 rounded-lg p-6">
                            {
                                projects[currProject].tasks.map((task, index) => {
                                    return (
                                        <div className = "flex flex-row justify-between m-5" key = {index}>
                                            <span>{task}</span>
                                            <button onClick = {() => handleDeleteTask(index)}>Clear</button>
                                        </div>
                                    );
                                })
                            }
                        </div>
                }
            </div>
        </div>
    )
}