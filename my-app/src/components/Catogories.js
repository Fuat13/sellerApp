import React from "react";

import "./Catogories.css";

export default class Catogories extends React.Component{
    constructor(props){
        super(props)

        this.props = props;
    }

    render(){
        return (
            <div className="Catogories">
                {
                    this.props.Catogories.map((elem)=>(
                        <div key={elem} className="Catogorie" onClick={()=>this.props.applyCategory(elem)}>
                            <p>{elem}</p>
                        </div>
                    ))
                }
            </div>
        )
    }
}