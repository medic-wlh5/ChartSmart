import React, { Component } from 'react';
import Chart from 'chart.js';
import axios from 'axios';
import { connect } from 'react-redux';
import './WhiteBloodCell.css'

let myLineChart;

//--Chart Style Options--//
Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif";
Chart.defaults.global.legend.display = false;
//--Chart Style Options--//

class TSH extends Component {
	constructor(props) {
		super(props);
		this.state = {
            data: [],
            test: 'TSH', 
           
		};
	}
	chartRef = React.createRef();

	componentDidMount() {
		const { id } = this.props
		this.buildChart();
		axios.get(`/api/bloodwork/${id}?test=${this.state.test}`).then(res => {
			this.setState({
				data: res.data
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
		gradientStroke.addColorStop(1, "rgba(248, 94, 94)"); //red
		

		let gradientFill = myChartRef.createLinearGradient(0, 500, 0, 100);
		gradientFill.addColorStop(0, "rgba(248, 94, 94, 0.6)"); //red
		gradientFill.addColorStop(0.5, "rgba(87, 255, 80, 0.6)"); //green
		gradientFill.addColorStop(1, "rgba(248, 94, 94, 0.6)"); //red


        const mappedDataValue= this.state.data.map((dataSet)=>{
            return dataSet.value
        })
        const mappedDataDate=this.state.data.map((dataSet)=>{
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
						label: 'TSH',
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
					},
					{
					
					},
				],
			},
			options: {
				//Customize chart options
				title: {
					display: true,
					text: `${this.props.firstname} ${this.props.lastname}'s TSH`,
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
                        }, 
                        gridLines:{
                            color: "#fff"
                        }
					}],
					xAxes:[{
						gridLines: {
							color: '#fff'
						}
					}]
                },
               

                
			},
		});
		for (let i = 0; i < myLineChart.data.datasets[0].data.length; i++) {
			if (myLineChart.data.datasets[0].data[i] >= .4 && myLineChart.data.datasets[0].data[i] <= 4  ){
				pointBackgroundColors.push("rgba(87, 255, 80)"); //green
			} else {
				pointBackgroundColors.push("rgba(248, 94, 94)"); //red
			}
		}
		myLineChart.update();
        
      
	};

	render() {
        console.log(this.props)
        console.log(this.state)
        
		return (
			<div className='graphContainer'>
				<canvas id='myChart' ref={this.chartRef} height='225' width='600' />
			</div>
		);
	}
}

function mapStateToProps(reduxState) {
	return reduxState;
}

export default connect(mapStateToProps)(TSH);