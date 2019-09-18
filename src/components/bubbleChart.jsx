import React, { Component } from 'react';
import Chart from "chart.js";


class BubbleChart extends Component {

	chartRef = React.createRef();

	createChart = (formatted_data) => {
		const myChartRef = this.chartRef.current.getContext("2d");

		let option = {
			type: 'bubble',
			data: {
				datasets: Object.keys(formatted_data).map(i => {
					i = formatted_data[i]
					return {
						label:i.code,
						data:[{
						x:i.total_loss,
						y:i.total_win,
						r:i.own_score
					}],
						backgroundColor:'#'+(Math.random()*0xFFFFFF<<0).toString(16),
					}
				})
			}
		}
		
		new Chart(myChartRef,option);
	}

	shouldComponentUpdate(nextProp) {

		if(this.props.formatted_data != nextProp.formatted_data) {
			this.createChart(nextProp.formatted_data);
		}
		
		return true;
	}

	render() {
		
		return(
			<div>
				<canvas
                    id="myChart"
                    ref={this.chartRef}
                />
			</div>
		);
	}
}

export default BubbleChart;