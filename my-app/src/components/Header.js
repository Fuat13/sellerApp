import React from "react";
import "./Header.css";

export default class Header extends React.Component{
    constructor(props){
        super(props);

        this.props = props;

        this.filtre = this.filtre.bind(this);
    }

    filtre(){
        console.log(this.props)
        this.props.filtre()
    }

    render(){
        return(
            <div className="headerDiv">
                {
                    this.props.currentUser === undefined ?(
                    <div onClick={window.LoginSwitch} className="headerElemBack">
                        <p>Login</p>
                    </div>
                    ):
                    <div onClick={()=>window.ChangeScreen(1)} className="headerElemBack">
                        <p>{this.props.currentUser.userName}</p>
                    </div>
                    
                }

                {
                    this.props.currentUser !== undefined && 
                    <div onClick={()=>{this.props.getChats();window.ChangeScreen(7)}} className="headerElemBack">
                        <p>Messages</p>
                    </div>
                }


                <div onClick={window.FilterSwitch} className="headerElemBack">
                    <p>Filtre</p>
                </div>
            </div>
        )
    }
}