import React from "react";

import "./Login.css";

export default class Login extends React.Component{
    constructor(props){
        super(props);

        this.props = props;

        this.state = {
            loginHeight: "0%",
            UserName: "",
            Password: "",
        }

        this.LoginSwitch = this.LoginSwitch.bind(this);
        window.LoginSwitch = this.LoginSwitch.bind(this)


    }

    onInputChange(item, value){
        let val = {}
        val[item] = value.target.value
        this.setState(val);
    }

    LoginSwitch(){
        this.setState({loginHeight: this.state.loginHeight === "0%"? "10%": "0%"});
    }

    render(){
        return (
            <div className="Login" style={{height:this.state.loginHeight}}>
                <input type="text" onChange={elem=>this.onInputChange("UserName", elem)}></input>
                <input type="password" autoComplete="on" placeholder="Password" size={30} onChange={elem=>this.onInputChange("Password", elem)}></input>
                <input type="button" onClick={()=>this.props.loginEvent(this.state.UserName,this.state.Password)} value="Login"></input>


            </div>
        );
    }
}