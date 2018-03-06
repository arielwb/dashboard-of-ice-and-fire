require('normalize.css/normalize.css');
require('styles/App.scss');
import React from 'react';
import 'whatwg-fetch';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { NotifyResize } from 'react-notify-resize';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

import LoaderComponent from '../loader/LoaderComponent';

class BarChartComponent extends React.Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            chartHeight: 0,
            data: [],
            mounted: false
        };

    }

    componentDidMount() {
        return (
            this.setState({ data: this.props.data, mounted: true })

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


        let content = <LoaderComponent />;

        const grey = '#F4F4F4';

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
                            <div className="header col-xs-12 text-center">
                                <span className="box-title ">{this.props.title}</span>
                            </div>
                            <div className="header col-xs-12">
                                <ResponsiveContainer height={this.state.chartHeight}>
                                    <BarChart data={this.state.data}>
                                        <CartesianGrid stroke={grey} />
                                        <XAxis dataKey={this.props.xAxisKey} fontSize={10} />
                                        <YAxis fontSize={10} />
                                        <Tooltip labelStyle={{ fontSize: 14 }} itemStyle={{ fontSize: 14 }} />
                                        <Legend />
                                        {
                                            this.props.barKeys.map((bar, index) => {
                                                return (
                                                    <Bar
                                                        dataKey={bar.key}
                                                        stroke={bar.color}
                                                        fill={bar.color}
                                                        fillOpacity={0.3}
                                                        animationEasing='linear'
                                                        key={index} />
                                                )
                                            })
                                        }

                                    </BarChart>
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



module.exports = BarChartComponent;