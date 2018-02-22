require('normalize.css/normalize.css');
require('styles/App.scss');
import React from 'react';
import 'whatwg-fetch';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { NotifyResize } from 'react-notify-resize';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import ChartSource from './ChartSource';
import LoaderComponent from '../loader/LoaderComponent';

class ChartComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chartHeight: 0,
            data: [],
            mounted: false
        };

    }

    componentDidMount() {
        return (
            ChartSource.get()
                .then((responseJson) => {
                    this.setState({ data: responseJson, mounted: true })
                })
                .catch((error) => {
                    console.error(error);
                })
        )
    }

    resize({ width }) {
        setTimeout(() => {
            let chartHeight = width > 752 ? 250 : 150;
            chartHeight = width > 1184 ? 400 : chartHeight;
            this.setState({ 'chartHeight': chartHeight });
        }, 50)
    }

    render() {
        const blue = '#1EA7F8';
        const grey = '#F4F4F4';
        let content = <LoaderComponent />;
        if (this.state.mounted) {
            content = (
                <ReactCSSTransitionGroup
                    transitionName="animation"
                    transitionAppear={true}
                    transitionEnterTimeout={5000}
                    transitionAppearTimeout={5000}
                    transitionLeaveTimeout={5000} >
                    <div className="chart-component component col-xs-12 " >
                        <NotifyResize onResize={this.resize.bind(this)} notifyOnMount={true} />
                        <div className="box">
                            <div className="header col-xs-12">
                                <span className="box-title">Site Traffic Overview</span>
                            </div>
                            <div className="header col-xs-12">
                                <ResponsiveContainer height={this.state.chartHeight}>
                                    <AreaChart
                                        data={this.state.data}
                                        margin={{ top: 15, right: 15, left: 15, bottom: 15 }}>
                                        <XAxis dataKey="month" fontSize={11} />
                                        <YAxis fontSize={11} tickCount={11} width={15} />
                                        <CartesianGrid stroke={grey} />
                                        <Tooltip labelStyle={{ fontSize: 14 }} itemStyle={{ fontSize: 14 }} />
                                        <Area
                                            type='monotone'
                                            dot={{ fill: blue, stroke: 'white', r: 3, fillOpacity: 1 }}
                                            activeDot={{ r: 5 }}
                                            dataKey='views'
                                            stroke={blue}
                                            fill={blue}
                                            fillOpacity={0.3}
                                            animationEasing='linear' />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </ReactCSSTransitionGroup>
            );
        }
        return (
            <div>
                {content}
            </div>
        );
    }
}

module.exports = ChartComponent;