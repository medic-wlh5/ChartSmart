import React, { Component } from 'react';
import Chart from 'chart.js';
import axios from 'axios';
import { connect } from 'react-redux';


let myLineChart;

//--Chart Style Options--//
Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif";
Chart.defaults.global.legend.display = false;
//--Chart Style Options--//

class RestingHeartRate extends Component {
	constructor(props) {
		super(props);
		this.state = {
            data: [],
            test: 'resting heart rate', 
           
		};
	}
	chartRef = React.createRef();

	componentDidMount() {
		const { id } = this.props.patient;
		this.buildChart();
		axios.get(`/api/vitals/${id}?test=${this.state.test}`).then(res => {
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
		
		gradientStroke.addColorStop(0, "#F87FF4");
		gradientStroke.addColorStop(0.2, "#94d973");
		gradientStroke.addColorStop(0.5, "#fad874");
		gradientStroke.addColorStop(1, "#F080F4");
		

		let gradientFill = myChartRef.createLinearGradient(500, 0, 100, 0);
		gradientFill.addColorStop(0, "rgba(248, 127, 244, 0.6)");
		gradientFill.addColorStop(1, "rgba(43, 153, 247, 0.6)");

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
						label: 'Resting Heart Rate',
						data: mappedDataValue,
						fill: true,
						backgroundColor: gradientFill,
						borderColor:               gradientStroke,
						pointBorderColor:          'white',
						pointBackgroundColor:      gradientStroke,
						pointHoverBackgroundColor: gradientStroke,
						pointHoverBorderColor:     gradientStroke,
					},
					{
					
					},
				],
			},
			options: {
				//Customize chart options
				title: {
					dispaly: true,
					text: 'Resting Heart Rate',
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
        
      
	};

	render() {
        console.log(this.props)
        console.log(this.state)
        
		return (
			<div className='graphContainer'>
				<canvas id='myChart' ref={this.chartRef} height='300' width='700'/>
			</div>
		);
	}
}

function mapStateToProps(reduxState) {
	return reduxState;
}

export default connect(mapStateToProps)(RestingHeartRate);