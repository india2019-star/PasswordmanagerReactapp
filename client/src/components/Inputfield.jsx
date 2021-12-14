import React from "react";


function InputField(props)
{
    return (<input onChange={props.handlingchange} type ={props.type} name = {props.name} placeholder ={props.placeholder} />);
}

export default InputField;