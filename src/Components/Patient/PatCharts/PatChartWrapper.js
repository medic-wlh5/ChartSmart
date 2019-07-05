import React, { Component } from 'react';
import WhiteBloodCell from './Bloodwork/WhiteBloodCell';

export default class PatChartWrapper extends Component {
	constructor(props) {
		super(props);
		this.state = {
            whiteMenu: false,
            test: ''
		};
	}
	showWhite = () => {
		this.setState({
			whiteMenu: true,
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
							<option value='whiteBloodCellCount'>White Blood Cell Count</option>
							<option value='vitals'>Vitals</option>
						</select>
					</label>
				</form>
				<div className='chartContainer'>
					<button className='whiteBloodCell' onClick={this.showWhite}>
						White Blood Cell Menu
					</button>
				</div>
				<div>{this.state.whiteMenu ? <WhiteBloodCell /> : null}</div>
			</div>
		);
	}
}
