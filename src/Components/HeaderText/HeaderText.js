import "./HeaderText.css";

function HeaderText(props) {
    return (
        <h1 className="header-text"> {props.text} </h1>
    );
}

export default HeaderText;
