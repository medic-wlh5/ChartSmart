import React, { Component } from 'react';
import Chart from 'chart.js';
import axios from 'axios';
import { connect } from 'react-redux';

let myLineChart;

//--Chart Style Options--//
Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif";
Chart.defaults.global.legend.display = false;
//--Chart Style Options--//

class WhiteBloodCell extends Component {
	constructor(props) {
		super(props);
		this.state = {
			test: 'white blood cell count',
			data: []
		};
	}
	chartRef = React.createRef();

	componentDidMount() {
		const { test } = this.state;
		const { id } = this.props.patient;
		this.buildChart();
		axios.get(`/api/bloodwork/${id}?test=${test}`).then(res => {
			this.setState({
				data: res.data,
			});
		});
	}

	componentDidUpdate() {
		this.buildChart();
	}
	

	buildChart = () => {
		const myChartRef = this.chartRef.current.getContext('2d');
		const { data, average, labels } = this.props;

		const mappedDataValue = this.state.data.map(dataSet => {
			return dataSet.value
		})

		const mappedDataDate = this.state.data.map(dataSet => {
			return dataSet.date
		})

		if (typeof myLineChart !== 'undefined') myLineChart.destroy();
		var pointBackgroundColors=[]
		myLineChart = new Chart(myChartRef, {
			type: 'line',
			data: {
				//Bring in data
				labels: mappedDataDate,
				datasets: [
					{
						label: 'White Blood Cell Count',
						data: mappedDataValue,
						fill: false,
						borderColor: '#6610f2',
						pointBackgroundColor: pointBackgroundColors
					}
				],
			},
			options: {
				//Customize chart options
				title: {
					dispaly: true,
					text: 'White Blood Cell Count',
					fontSize: 25,
				},
				legend: {
					position: 'right',
					labels: {
						fontColor: '#000',
					},
				},
				layout: {
					padding: {
						left: 50,
						right: 0,
						bottom: 0,
						top: 0,
					},
				},
				tooltips: {
					enabled: true,
				},
				scales:{
					yAxes:[{
						ticks:{
							beginAtZero: true
						}
					}]
				}
			},
		});

		//3.4-9.6 is a healthy range
		for (let i = 0; i < myLineChart.data.datasets[0].data.length; i++) {
			if (myLineChart.data.datasets[0].data[i] >= 3.4 && myLineChart.data.datasets[0].data[i] <= 9.6 ){
				pointBackgroundColors.push("#ffff00");
			} else {
				pointBackgroundColors.push("#f58368");
			}
		}
		myLineChart.update();
	};

	render() {
		return (
			<div className='graphContainer'>
				<canvas id='myChart' ref={this.chartRef} />
			</div>
		);
	}
}

function mapStateToProps(reduxState) {
	return reduxState;
}

export default connect(mapStateToProps)(WhiteBloodCell);
