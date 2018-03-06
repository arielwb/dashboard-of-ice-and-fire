require('normalize.css/normalize.css');
require('styles/App.scss');
import React from 'react';

import BooksChartSource from './BooksChartSource';
import LoaderComponent from '../loader/LoaderComponent';
import LineChartComponent from '../charts/LineChartComponent';


class BooksChartComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            mounted: false
        };

    }

    componentDidMount() {
        return (
            BooksChartSource.get()
                .then((data) => {
                    this.setState({ data: data, mounted: true })
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
                { color: blue, key: 'numberOfPages' },
                { color: yellow, key: 'totalChars' },
                { color: green, key: 'totalPovChars' },
            ]
            content = <LineChartComponent
                data={data}
                title="Books data comparison"
                xAxisKey="name"
                areaKeys={area} />
        }
        return (
            <div>
                {content}
            </div>
        );
    }
}

module.exports = BooksChartComponent;