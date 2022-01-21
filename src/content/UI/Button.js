const Button = (props)=> {
    return(
        <button className={props.styles} onClick={props.buttonClickHandler}>{props.title}</button>
    );
};

export default Button;