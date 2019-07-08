import React, { Component } from 'react';
import WhiteBloodCell from './Bloodwork/WhiteBloodCell';
import TSH from './Bloodwork/TSH';

export default class PatChartWrapper extends Component {
	constructor(props) {
		super(props);
		this.state = {
			whiteMenu: false,
			TSH: false,
			CReactive: false,
            test: ''
		};
	}

	showWhite = () => {
		this.setState({
			whiteMenu: true,
			TSH: false,
			CReactive: false
		});
	};

	showTSH = () => {
		this.setState({
			TSH: true,
			whiteMenu: false,
			CReactive: false
		});
	};

	showCReactive = () => {
		this.setState({
			TSH: false,
			whiteMenu: false,
			CReactive: true
		});
	};

	handleTestTypeChange = e => {
		this.setState({ test: e.target.value });
	};

	render() {
        console.log(this.state);
        
		return (
			<div>
				<form>
					<label>
						Choose test type:
						<select
							value={this.state.test}
							onChange={this.handleTestTypeChange}>
							<option value='' />
							<option value='bloodwork'>Bloodwork</option>
							<option value='vitals'>Vitals</option>
						</select>
					</label>
				</form>
				<div className='chartContainer'>{this.state.test == 'bloodwork' ? 
					<div>
						<button className='whiteBloodCell' onClick={this.showWhite}>
						White Blood Cell Menu
					</button>
					<button className='TSH' onClick={this.showTSH}>
						TSH
					</button>
					<button className='cReactive' onClick={this.showCReactive}>
						C Reactive Protein
					</button>
					</div>  : null}
				</div>
				<div>{this.state.whiteMenu ? <WhiteBloodCell /> : null}</div>
				<div>{this.state.TSH ? <TSH /> : null}</div>
				<div>{this.state.CReactive ? <TSH /> : null}</div>
			</div>
		);
	}
}
