import NoProjImg from '../../assets/no-projects.png';

export default function Home({handleCreateProject}) {
    return (
        <div className = "w-4/5 h-screen text-center flex flex-col justify-center items-center">
            <img src = {NoProjImg} className = "size-16"/>
            <br />
            <h2 className="text-lg font-semibold">
                No Project Selected
            </h2>
            <br />
            <p>Select a project or get started with a new one</p>
            <br />
            <button 
                className = "my-4 text-red-300 bg-stone-900 hover:bg-green-500 hover:text-white p-2 px-4 rounded-md"
                onClick = {handleCreateProject}>Create new project</button>
        </div>
    );
}