require('normalize.css/normalize.css');
require('styles/App.scss');
import React from 'react';

import GenderChartSource from '../genderChart/GenderChartSource';
import LoaderComponent from '../loader/LoaderComponent';
import BarChartComponent from '../charts/BarChartComponent';


class GenderCultureComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            mounted: false
        };

    }

    componentDidMount() {
        return (
            GenderChartSource.get()
                .then((data) => {
                    let chartData = data.male.map((d) => {
                        return {
                            name: d._id,
                            male: d.count
                        }
                    })
                    data.female.forEach(d => {
                        let currentData = chartData.find((cd) => d._id === cd.name)

                        if (currentData) currentData.female = d.count;
                        else chartData.push({ name: d._id, male: 0, female: d.count })
                    });

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
            title="Gender and culture comparison"
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

module.exports = GenderCultureComponent;