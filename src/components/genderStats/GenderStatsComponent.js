require('normalize.css/normalize.css');
require('styles/App.scss');
import React from 'react';

import GenderStatsSource from './GenderStatsSource';
import LoaderComponent from '../loader/LoaderComponent';
import BarChartComponent from '../charts/BarChartComponent';


class GenderStatsComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            mounted: false
        };

    }

    componentDidMount() {
        return (
            GenderStatsSource.get()
                .then((data) => {
                    console.log(data)
                    // let chartData = data.male.forEach((d, k) => {
                    //     return {
                    //         name: k,
                    //         male: data.male[k],
                    //         female: data.female[k]
                    //     }
                    // })
                    let chartData = [];
                    Object.keys(data.male).forEach((k) => {
                        chartData.push({
                            name: k,
                            male: data.male[k],
                            female: data.female[k]
                        })
                    });

                    // data.female.forEach(d => {
                    //     let currentData = chartData.find((cd) => d._id === cd.name)

                    //     if (currentData) currentData.female = d.count;
                    //     else chartData.push({ name: d._id, male: 0, female: d.count })
                    // });
                    console.log(chartData)

                    this.setState({ data: chartData, mounted: true })
                })
        )
    }

    render() {

        const blue = '#1EA7F8';
        const green = '#00C49F';
        const yellow = '#FFBB28';

        let content = <LoaderComponent />;

        if (this.state.mounted) {

            let data = this.state.data;
            let area = [
                { color: green, key: 'female' },
                { color: yellow, key: 'male' },
            ]
            content = <BarChartComponent
                data={data}
                title="Gender stats comparison"
                xAxisKey="name"
                barKeys={area} />
        }
        return (
            <div>
                {content}
            </div>
        );
    }
}

module.exports = GenderStatsComponent;