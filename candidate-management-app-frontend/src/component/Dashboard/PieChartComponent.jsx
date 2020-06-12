import React, { Component} from 'react';
import CandidateService from '../../service/CandidateService';
import CanvasJSReact from './assets/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var dataPoints =[];

class PieChartComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
		this.getPieChartData = this.getPieChartData.bind(this)
    }

    componentDidMount() {
		this.getPieChartData();
    }

	getPieChartData(){
		var chart = this.chart;
		CandidateService.getPieChartData()
            .then(
                response => {
					console.log(response.data)
				   for (let [key, value] of Object.entries(response.data)) {
					   for (let [k, v] of Object.entries(value)) {
							dataPoints.push({
								y: k,
								label: v
							});
							break;
					   }
				   }
					chart.render();
                }
            )
	}
	
    render() {
		dataPoints = []
		const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light1",
			title:{
				text: "Languages"
			},
			data: [{
				type: "pie",
				indexLabel: "{label}: {y}%",		
				startAngle: -90,
				dataPoints: dataPoints
			}]
		}
		
        console.log('render')
        return (
		<div>
            <div class="card">
              <div class="card-body">
				<div className="container">
					{this.state.message && <div class="alert alert-success">{this.state.message}</div>}
					<div className="container">
						<CanvasJSChart options = {options} 
						onRef={ref => this.chart = ref}
					/>
					</div>
				</div>
            </div>
           </div>
		</div>
        )
    }
}

export default PieChartComponent
