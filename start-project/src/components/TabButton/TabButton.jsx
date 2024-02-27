function TabButton(props) {
    function handleClick() {
        console.log("Hello, World!!");
    }

    return (
        <li><button 
        className = {props.className}
        onClick={props.onSelect}>{props.children}</button></li>
    );
}

export default TabButton;