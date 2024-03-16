import { useRef } from "react";

export default function CreateProject({closeCreateProject, addProject}) {
    const titleRef = useRef();
    const descRef = useRef();
    const dateRef = useRef();

    function handleAddProject(event, title, desc, date) {
        event.preventDefault();
        const newProject = {
            title: title,
            desc: desc,
            date: date,
            tasks: [],
        }
        addProject(newProject);
        closeCreateProject();
    }

    return (
        <div className = "w-4/5 h-screen flex flex-col justify-center items-center">
            <form className = "w-4/5 max-w-lg flex flex-col">
                <div className = "flex flex-row-reverse">
                    <button 
                        className = "my-6 text-white bg-black p-2 px-6 rounded-md" 
                        onClick = {(event) => handleAddProject(event, titleRef.current.value, descRef.current.value, dateRef.current.value)}>
                            Save
                    </button>
                    <button className = "my-6 text-black p-2 px-6 rounded-md" onClick = {closeCreateProject}>Cancel</button>
                </div>
                <div className = "my-2">
                    <label className = "font-semibold">TITLE</label>
                    <input ref = {titleRef} type = "text" className = "my-1 w-full border-2 bg-neutral-200 p-1 border-b-neutral-300 focus:border-b-neutral-600 rounded-sm focus:outline-none"></input>
                </div>
                <div className = "my-2">
                    <label className = "font-semibold">DESCRIPTION</label>
                    <textarea ref = {descRef} className = "my-1 w-full border-2 bg-neutral-200 p-1 border-b-neutral-300 focus:border-b-neutral-600 rounded-sm h-16 focus:outline-none"></textarea>
                </div>
                <div className = "my-2">
                    <label className = "font-semibold">DUE DATE</label>
                    <input ref = {dateRef} type = "date" className = "my-1 w-full border-2 bg-neutral-200 p-1 border-b-neutral-300 focus:border-b-neutral-600 rounded-sm focus:outline-none"></input>
                </div>
                <br />
            </form>
        </div>
    );
}