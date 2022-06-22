import React from "react";
import "./ProfileHeader.css";

export default class ProfileHeader extends React.Component{
    constructor(props){
        super(props);

        this.state = {};
    }

    render(){
        return(
            <div className="profileHeader">
                <div className="profileBackArrowDiv" onClick={()=>window.ChangeScreen(0)}>
                    <p>&lArr;</p>
                </div>
                <div className="profileBackArrowDiv" onClick={this.props.logout}>
                    <p>Log Out</p>
                </div>
            </div>
        )
    }
}