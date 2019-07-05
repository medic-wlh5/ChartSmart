import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';


const data = {
	labels: [
		'January'
	],
	datasets: [{
		data: [300, 110, 200, 50, 450],
		backgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56',
		'#56CB43',
		'#34B3TD'
		],
		hoverBackgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		],
		pointBackgroundColor: [
		'#0396FF'
		]
	}]
}

export default class WhiteBloodCell extends Component {
    render() {
        return (
            <div>
                <Line data={data} />
            </div>
        )
    }
}
