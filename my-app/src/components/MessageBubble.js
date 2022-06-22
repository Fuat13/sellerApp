import React from "react";

import "./MessagesBubble.css";

export default class MessageBubble extends React.Component{
    constructor(props){
        super(props);

        this.props = props
    }

    render(){
        return (
        <div className="MessagesBubble" style={{justifyContent: this.props.isLeft ? "flex-start": "flex-end"}}>
            <div className="MessagesBuubleInside">
                <p>
                    {this.props.messages}
                </p>
            </div>

        </div>
        )
    }
}