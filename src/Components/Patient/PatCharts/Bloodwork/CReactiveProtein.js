import React, { Component } from 'react';
import Chart from 'chart.js';
import axios from 'axios';
import { connect } from 'react-redux';
import './CReactiveProtein.css'

let myLineChart;

//--Chart Style Options--//
Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif";
Chart.defaults.global.legend.display = true;
Chart.defaults.global.defaultFontColor = 'white'
//--Chart Style Options--//

class CReactiveProtein extends Component {
	constructor(props) {
		super(props);
		this.state = {
			test: 'c reactive protein',
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

		let gradientStroke = myChartRef.createLinearGradient(500, 0, 100, 0);
		
		gradientStroke.addColorStop(0, "#F87FF4");
		gradientStroke.addColorStop(0.2, "#94d973");
		gradientStroke.addColorStop(0.5, "#fad874");
		gradientStroke.addColorStop(1, "#F080F4");
		

		let gradientFill = myChartRef.createLinearGradient(500, 0, 100, 0);
		gradientFill.addColorStop(0, "rgba(248, 127, 244, 0.6)");
		gradientFill.addColorStop(1, "rgba(43, 153, 247, 0.6)");

		const mappedDataValue = this.state.data.map(dataSet => {
			return dataSet.value
		})

		const mappedDataDate = this.state.data.map(dataSet => {
			return dataSet.date
		})

		if (typeof myLineChart !== 'undefined') myLineChart.destroy();

		

		myLineChart = new Chart(myChartRef, {
			type: 'line',
			data: {
				//Bring in data
				labels: mappedDataDate,
				datasets: [
					{
						label: 'C Reactive Protein',
						data: mappedDataValue,
						fill: true,
						backgroundColor: gradientFill,
						borderColor:               gradientStroke,
						pointBorderColor:          'white',
						pointBackgroundColor:      gradientStroke,
						pointHoverBackgroundColor: gradientStroke,
						pointHoverBorderColor:     gradientStroke
					}
				],
			},

			//Customize chart options
			options: {
				responsive: true,

				title: {
					dispaly: true,
					text: 'C Reactive Protein',
					fontSize: 25,
					
				},
				legend: {
					position: 'bottom',
					labels: {
						fontColor: '#FFFFFF',
					},
				},
				layout: {
					color: 'white',
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
						},
						gridLines: {
							color: '#fff'
						}
					}],
					xAxes:[{
						gridLines: {
							color: '#fff'
						}
					}]
				}
			},
		});
	};

	render() {
		return (
			<div className='graphContainer'>
				<canvas className='crp_chart' id='myChart' ref={this.chartRef} height='300' width='700' />
			</div>
		);
	}
}

function mapStateToProps(reduxState) {
	return reduxState;
}

export default connect(mapStateToProps)(CReactiveProtein);