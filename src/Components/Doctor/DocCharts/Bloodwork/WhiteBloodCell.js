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

class WhiteBloodCell extends Component {
	constructor(props) {
		super(props);
		this.state = {
            data: [],
            test: 'white blood cell count', 
           
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
        const mappedDataValue= this.state.data.map((dataSet)=>{
            return dataSet.value
        })
        const mappedDataDate=this.state.data.map((dataSet)=>{
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
						label: 'White Blood Cell Count',
						data: mappedDataValue,
						fill: false,
                        borderColor: '#6610f2',
						backgroundColor: "#FFF"
						
					},
					{
					
					},
				],
			},
			options: {
				//Customize chart options
				title: {
					display: true,
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
                        }, 
                        gridLines:{
                            color: "#fff"
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
				<canvas id='myChart' ref={this.chartRef} />
			</div>
		);
	}
}

function mapStateToProps(reduxState) {
	return reduxState;
}

export default connect(mapStateToProps)(WhiteBloodCell);