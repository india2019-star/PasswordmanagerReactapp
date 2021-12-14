import React from "react";
import InputField from "./Inputfield";
import Axios from "axios";



function App()
{
    const [totaltext, updatetotaltext] = React.useState({
        titletext: "",
        passwordtext: ""
    });

    const [passwordlist, updatepasswordlist] = React.useState([]);

    React.useEffect(function()
    {
        Axios.get("http://localhost:3001/showpasswords").then(function(response)
        {
            //console.log(response.data);
            updatepasswordlist(response.data);
        });
        
        
    },[]);

    function decryptpassword(encryptedpass)
    {
        Axios.post("http://localhost:3001/decryptpasswords",{password: encryptedpass.password, iv: encryptedpass.iv}).then(function(response)
        {
            updatepasswordlist(passwordlist.map((val) => {
                return encryptedpass.id == val.id? {id: val.id, titlename: response.data, password: val.password, iv: val.iv}: val;
            }));
        });
    }



    function handlechange(event)
    {
        var newtext = event.target.value;
        var name = event.target.name;
        updatetotaltext(function(prevValue)
        {
            if(name === "title")
            {
                return {
                    titletext: newtext,
                    passwordtext: prevValue.passwordtext
                }
            }
            else if(name === "password")
            {
                return {
                    titletext: prevValue.titletext,
                    passwordtext: newtext
                } 
            }
        });
    }

    const handleclick = () => {
        var pass = totaltext.passwordtext;
        var titlet = totaltext.titletext;
        Axios.post("http://localhost:3001/addpassword",{ password: pass, title: titlet});
    };
    return (<div className="App">
            <div className="AddingPassword">
            <InputField handlingchange={handlechange} type="text" name="title" placeholder="Enter title"/> 
            <InputField handlingchange={handlechange} type="password" name="password" placeholder="Enter password"/>
            <button onClick={handleclick}>Add</button>     
            </div>
            <div className="Passwords">
                {passwordlist.map( (val) =>
                {
                    return (<div className="password" onClick={function()
                        {
                            return decryptpassword({password: val.password, iv: val.iv, id: val.id})}
                        }><h1>{val.titlename}</h1></div>);
                    
                })}
            </div>
        </div>
    );
}

export default App;