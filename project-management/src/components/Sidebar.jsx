
export default function Sidebar({handleCreateProject, projects, handleShowProject, handleCloseProject}) {
    function handleClickProject(index) {
        handleShowProject(index);
    }

    function handleAddProject() {
        handleCreateProject();
        handleCloseProject();
    }

    return (
        // <div className="w-1/5 h-full min-w-56 bg-black h-full rounded-tr-xl">
            <div className="w-1/5 h-full min-w-56 bg-black h-screen relative top-8 left-0 rounded-tr-xl p-8 pt-12 text-white">
                <h2 className="text-lg font-semibold">YOUR PROJECTS</h2>
                <button 
                    className = "my-6 text-green-500 bg-zinc-800 hover:bg-green-500 hover:text-white p-2 px-4 rounded-md"
                    onClick = {handleAddProject}>
                    + Add Project
                </button>
                <ul className="mt-4">
                    {
                        projects.map((project, index) => {
                            return (
                                <li 
                                    className="block py-2 px-2 hover:bg-gray-700 font-light" 
                                    key = {index}
                                    onClick = {() => handleClickProject(index)}>
                                        {project.title}
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        // </div>

    );
}