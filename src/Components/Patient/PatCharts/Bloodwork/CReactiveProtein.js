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
		
		gradientStroke.addColorStop(0, "rgba(87, 255, 80)"); //green
		gradientStroke.addColorStop(0.5, "rgba(255, 255, 111)");
		gradientStroke.addColorStop(1, "rgba(248, 94, 94)"); //red
		

		let gradientFill = myChartRef.createLinearGradient(0, 500, 0, 100);

		gradientFill.addColorStop(0, "rgba(87, 255, 80, 0.6)"); //green
		gradientFill.addColorStop(0.5, "rgba(255, 255, 111, 0.6)"); //yellow
		gradientFill.addColorStop(1, "rgba(248, 94, 94, 0.6)"); //red


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
						label: 'C Reactive Protein',
						data: mappedDataValue,
						fill: true,
						backgroundColor: gradientFill,
						borderColor:               'white',
						borderWidth: 2,
						pointBorderColor:          'white',
						pointBackgroundColor:      pointBackgroundColors,
						pointHoverBackgroundColor: pointBackgroundColors,
						pointHoverBorderColor:     pointBackgroundColors,
						pointRadius: 5,
						pointHoverRadius: 8
					}
				],
			},

			//Customize chart options
			options: {
				responsive: true,

				title: {
					display: true,
					text: 'C Reactive Protein',
					fontSize: 25,
					
				},
				legend: {
					// display: true,
					position: 'top',
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
		for (let i = 0; i < myLineChart.data.datasets[0].data.length; i++) {
			if (myLineChart.data.datasets[0].data[i] < 1  ){
				pointBackgroundColors.push("rgba(87, 255, 80)");
			}
			if (myLineChart.data.datasets[0].data[i] >= 1 && myLineChart.data.datasets[0].data[i] <= 3  ){
				pointBackgroundColors.push("rgba(255, 255, 111)");
			} else {
				pointBackgroundColors.push("rgba(248, 94, 94)");
			}
		}
		myLineChart.update();
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