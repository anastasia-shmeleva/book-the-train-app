import React from 'react';
import TimeRangeSlider from 'react-time-range-slider';
export default class TimeSlider extends React.Component{
    constructor(props) {
        super(props);
        this.featureRef = React.createRef();
        this.changeStartHandler = this.changeStartHandler.bind(this);
        this.timeChangeHandler = this.timeChangeHandler.bind(this);
        this.changeCompleteHandler = this.changeCompleteHandler.bind(this);
        this.state = {
            value: {
                start: "00:00",
                end: "23:59"
            }
        }
    }
    
    changeStartHandler(time){
        console.log("Start Handler Called", time);
    }
    
    timeChangeHandler(time){
        this.setState({
            value: time
        });
    }
    
    changeCompleteHandler(time){
        console.log("Complete Handler Called", time);
    }
    
    render() {
      return(
        <TimeRangeSlider
          disabled={false}
          format={24}
          maxValue={"23:59"}
          minValue={"00:00"}
          name={"time_range"}
          onChangeStart={this.changeStartHandler}
          onChangeComplete={this.changeCompleteHandler}
          onChange={this.timeChangeHandler}
          step={15}
          value={this.state.value}/>
      );
    }
};