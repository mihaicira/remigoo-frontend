import "./Button.css";

function Button(props) {
    return (
        <button
            className="defaultButton"
            onClick={props.event}>
            {props.text}
        </button>
    );
}

export default Button;
