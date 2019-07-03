// import React, { Component } from 'react';
// import { Line } from 'react-chartjs-2';


// const data = {
// 	labels: [
// 		'January'
// 	],
// 	datasets: [{
// 		data: [300, 110, 200, 50, 450],
// 		backgroundColor: [
// 		'#FF6384',
// 		'#36A2EB',
// 		'#FFCE56',
// 		'#56CB43',
// 		'#34B3TD'
// 		],
// 		hoverBackgroundColor: [
// 		'#FF6384',
// 		'#36A2EB',
// 		'#FFCE56'
// 		],
// 		pointBackgroundColor: [
// 		'#0396FF'
// 		],
//         xAxisID: 'hello x',
    
//         yAxisID: 'goodbye y'
//     }]
    
// }

// export default class WhiteBloodCell extends Component {
//     render() {
//         return (
//             <div>
//                 <Line data={data} />
//             </div>
//         )
//     }
// }


import React, { Component } from 'react'
import Chart from "chart.js";
import classes from "./Line.module.css";
let myLineChart;

//--Chart Style Options--//
Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif"
Chart.defaults.global.legend.display = false;
//--Chart Style Options--//

export default class LineGraph extends Component {
    chartRef = React.createRef();

    componentDidMount() {
        this.buildChart();
    }

    componentDidUpdate() {
        this.buildChart();
    }

    buildChart = () => {
        const myChartRef = this.chartRef.current.getContext("2d");
        const { data, average, labels } = this.props;

        if (typeof myLineChart !== "undefined") myLineChart.destroy();

        myLineChart = new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels: labels,
                datasets: [
                    {
                        label: "Sales",
                        data: data,
                        fill: false,
                        borderColor: "#6610f2"
                    },
                    {
                        label: "National Average",
                        data: average,
                        fill: false,
                        borderColor: "#E0E0E0"
                    }
                ]
            },
            options: {
                //Customize chart options
            }
        });

    }

    render() {

        return (
            <div className={classes.graphContainer}>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}

