import React, { Component } from "react";
import WhiteBloodCell from "./Bloodwork/WhiteBloodCell";
import TSH from "./Bloodwork/TSH";
import CReactive from "./Bloodwork/CReactiveProtein";
import RestingHeartRate from "./Vitals/RestingHeartRate";
import Temperature from "./Vitals/Temperature";
import Weight from "./Vitals/Weight";
import PatNav from '../PatNav/PatNav'

export default class PatChartWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      whiteMenu: false,
      TSH: false,
      cReactive: false,
      restingHeartRate: false,
      temperature: false,
      weight: false,
      test: ""
    };
  }

  showWhite = () => {
    this.setState({
      whiteMenu: true,
      TSH: false,
      cReactive: false,
      restingHeartRate: false,
      temperature: false,
      weight: false
    });
  };

  showTSH = () => {
    this.setState({
      TSH: true,
      whiteMenu: false,
      cReactive: false,
      restingHeartRate: false,
      temperature: false,
      weight: false
    });
  };

  showCReactive = () => {
    this.setState({
      TSH: false,
      whiteMenu: false,
      cReactive: true,
      restingHeartRate: false,
      temperature: false,
      weight: false
    });
  };

  showRestingHeartRate = () => {
    this.setState({
      TSH: false,
      whiteMenu: false,
      cReactive: false,
      restingHeartRate: true,
      temperature: false,
      weight: false
    });
  };

  showTemperature = () => {
    this.setState({
      TSH: false,
      whiteMenu: false,
      cReactive: false,
      restingHeartRate: false,
      temperature: true,
      weight: false
    });
  };

  showWeight = () => {
    this.setState({
      TSH: false,
      whiteMenu: false,
      cReactive: false,
      restingHeartRate: false,
      temperature: false,
      weight: true
    });
  };

  handleTestTypeChange = e => {
    this.setState({ test: e.target.value });
  };

  render() {
    console.log(this.state);

    return (
      <div className='page'>
        <PatNav/>
        <form>
          <label>
            Choose test type:
            <select
              value={this.state.test}
              onChange={this.handleTestTypeChange}
            >
              <option value="" />
              <option value="bloodwork">Bloodwork</option>
              <option value="vitals">Vitals</option>
            </select>
          </label>
        </form>
        <div className="chartContainer">
          {this.state.test === "bloodwork" ? (
            <div>
              <button className="whiteBloodCell" onClick={this.showWhite}>
                White Blood Cell Menu
              </button>
              <button className="TSH" onClick={this.showTSH}>
                TSH
              </button>
              <button className="cReactive" onClick={this.showCReactive}>
                C Reactive Protein
              </button>
            </div>
          ) : this.state.test === "vitals" ? (
            <div>
              <button className="restingHeartRate" onClick={this.showRestingHeartRate}>
                Resting Heart Rate
              </button>
              <button className="temperature" onClick={this.showTemperature}>
                Temperature
              </button>
              <button className="weight" onClick={this.showWeight}>
                Weight
              </button>
            </div>
		  ) : null
		}
        </div>
        <div>{this.state.whiteMenu ? <WhiteBloodCell /> : null}</div>
        <div>{this.state.TSH ? <TSH /> : null}</div>
        <div>{this.state.cReactive ? <CReactive /> : null}</div>

        <div>{this.state.restingHeartRate ? <RestingHeartRate /> : null}</div>
        <div>{this.state.temperature ? <Temperature /> : null}</div>
        <div>{this.state.weight ? <Weight /> : null}</div>
      </div>
    );
  }
}
