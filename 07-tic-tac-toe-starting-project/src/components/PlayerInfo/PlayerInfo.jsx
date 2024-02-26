import { useState } from "react";

export default function PlayerInfo({name, symbol, isActive, handleChangeName}) {
    const [ isEditing, setIsEditing ] = useState(false);
    const [ currName, setCurrName ] = useState(name);

    function handleEditClick() {
        // !isEditing -> change the value based on the value during scheduling
        // isEditing => !isEditing -> change the value based on the value during executing
        // KEYWORD -> which value is considered? during scheduling or executing
        setIsEditing(isEditing => !isEditing);
        if (isEditing) {
            // console.log(currName);
            handleChangeName(symbol, currName);
        }
    }

    function handleNameChange(event) {
        // console.log(event.target.value);
        setCurrName(event.target.value);
    }

    return (
        <li className = {isActive ? 'active' : ""}>
            <span className = 'player'>
                {!isEditing ? 
                    <span className = 'player-name'>{currName}</span>
                    :
                    <input 
                        type = "text" 
                        required 
                        value = {currName} 
                        onChange = {handleNameChange}
                    />
                }
                <span className = 'player-symbol'>{symbol}</span>
            </span>
            <button onClick = {handleEditClick}>
                {!isEditing ? "Edit" : "Save"}
            </button>
        </li>
    );
}