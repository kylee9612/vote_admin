import React, {Component, useEffect} from 'react';
import Chart from 'chart.js/auto';
import './DoughnutChart.css';

let usedColor = new Set();

const generateColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        colors.push(`rgba(${r}, ${g}, ${b}, 0.5)`);
    }
    return colors;
}

const chartColors = generateColors(2000);


const colorGenerator = () => {
    const availableColors = chartColors.filter(color => !usedColor.has(color));
    if (availableColors.length === 0) {
        throw new Error('All chart colors have been used.');
    }
    const randomIndex = Math.floor(Math.random() * availableColors.length);
    const randomColor = availableColors[randomIndex];
    usedColor.add(randomColor);
    return randomColor;
};

class DoughnutChart extends Component {
    chartRef = React.createRef();

    componentDidMount() {
        const { data, id } = this.props;
        const myChartRef = this.chartRef.current.getContext("2d");

        let hoverChartElement = null;

        if (window[`myLineChart${id}`]) {
            window[`myLineChart${id}`].destroy();
        }
        window[`myLineChart${id}`] = new Chart(myChartRef, {
            type: "doughnut",
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                    {
                        label: "투표 수",
                        data: [86, 67, 91, 85, 76, 86, 79],
                        borderColor: "rgba(231, 231, 231, 0.78)",
                        backgroundColor: data.map(() => colorGenerator()),
                        borderWidth: 2,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    doughnutlabel: {
                        labels: [
                            {
                                text: "Dataset 1",
                                font: {
                                    size: "14",
                                },
                            },
                        ],
                    },
                },
                elements: {
                    arc: {
                        borderWidth: 0,
                    },
                },
            },
        });
    }

    render() {
        return (
            <div className={'chart-container'}>
                <canvas ref={this.chartRef} className="line-chart"/>
            </div>);
    }
}

export default DoughnutChart;
