import React from "react";

import "./Chat.css";    

export default class Chat extends React.Component{
    constructor(props){
        super(props);

        this.props = props;
    }

    render(){
        return(
            <div className="Chat" onClick={this.props.onClick}>
                <p>{this.props.chat.user}</p>
                <p>{this.props.chat.messages.length !== 0?this.props.chat.messages[this.props.chat.messages.length-1].message:"NaN"}</p>
            </div>
        )
    }
}