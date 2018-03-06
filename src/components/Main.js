require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

import WidgetsComponent from './widgets/WidgetsComponent';
import BooksChartComponent from './booksChart/BooksChartComponent';
import WordsComponent from './words/WordsComponent';
import WeaponsComponent from './weapons/WeaponsComponent';
import HeaderComponent from './header/HeaderComponent';
import GenderChartComponent from './genderChart/GenderChartComponent';
import GenderStatsComponent from './genderStats/GenderStatsComponent';

class AppComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mounted: false
        };
    }

    componentDidMount() {
        return (
            this.setState({ mounted: true })
        )
    }

    render() {
        var content = <div className="loader app"><i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i></div>;
        if (this.state.mounted) {
            const blue = '#1EA7F8';
            const green = '#00C49F';
            const yellow = '#FFBB28';
            let area = [
                { color: green, key: 'female' },
                { color: yellow, key: 'male' },
            ]
            content = (
                <div>
                    <div >
                        <HeaderComponent />
                    </div>
                    <div className="row">
                        <WidgetsComponent books={this.state.data} />
                    </div>
                    <div className="row">
                        <BooksChartComponent />
                    </div>
                    <div className="row">
                        <WordsComponent />
                        <WeaponsComponent />
                    </div>
                    <div className="row">
                        <GenderChartComponent />
                    </div>
                    <div className="row">
                        <GenderStatsComponent />
                    </div>
                </div>
            );
        }

        return (
            <div>{content}</div>
        )
    }
}

AppComponent.defaultProps = {}

module.exports = AppComponent;

