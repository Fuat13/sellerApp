import React from "react";

import "./AnaEkranPost.css";

export default class AnaEkranPost extends React.Component{
    constructor(props){
        super(props);

        this.state = {};

        this.props = props;
    }

    render(){
        return (
            <div className="AnaEkranPost" onClick={()=>this.props.onClick(this.props.post)}>
                <div className="AnaEkranPostImg" style={{backgroundImage:"url("+this.props.post.images[0]+")"}}></div>
                <p>{this.props.post.price}</p>
            </div>
        )
    }
}