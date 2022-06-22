import React from "react";
import "./Filtre.css";


export default class Filtre extends React.Component {
    constructor(props){
        super(props);

        this.props = props;

        this.state = {
            filterHeight: "0%",
            description:"",
            header:"",
            priceMin:Number.MIN_VALUE,
            priceMax:Number.MAX_VALUE,
        }

        this.FilterSwitch = this.FilterSwitch.bind(this);
        this.applyFilter = this.applyFilter.bind(this);

        window.FilterSwitch = this.FilterSwitch.bind(this);

    }

    onInputChange(item, value, doParse){
        let val = {}
        

        if(value.target.value === ""){
            switch(item){
                case "header":
                case "description":
                    val[item] = ""
                    break;
                case "priceMin":
                    val[item] = Number.MIN_VALUE;
                    break;
                case "priceMax":
                    val[item] = Number.MAX_VALUE;
                    break;
            }
        }
        else
            val[item] = doParse? parseFloat(value.target.value) : value.target.value;

        this.setState(val);
      }

    FilterSwitch(){
        this.setState({filterHeight: this.state.filterHeight === "0%"? "10%": "0%"});
    }

    applyFilter(){
        this.props.applyFilter({
            header:this.state.header,
            description: this.state.description,
            priceMin: this.state.priceMin,
            priceMax: this.state.priceMax
        });
    }

    render(){
        return (
            <div className="Filtre" style={{height:this.state.filterHeight}}>
                <input type="text" autoComplete="on" placeholder="Description Includes" size={30} onChange={elem=>this.onInputChange("description", elem, false)}></input>
                <input type="text" autoComplete="on" placeholder="Header Includes" size={30} onChange={elem=>this.onInputChange("header", elem, false)}></input>
                <input type="number" autoComplete="on" placeholder="Price Min" size={30} onChange={elem=>this.onInputChange("priceMin", elem, true)} min={0.0}></input>
                <input type="number" autoComplete="on" placeholder="Price Max" size={30} onChange={elem=>this.onInputChange("priceMax", elem, true)}></input>
                <input type="button" value="Apply" onClick={this.applyFilter}></input>
            </div>
        );
    }
}