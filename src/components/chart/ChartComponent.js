require('normalize.css/normalize.css');
require('styles/App.scss');
import React from 'react';
import 'whatwg-fetch';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { NotifyResize } from 'react-notify-resize';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label, Text } from 'recharts';

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
            this.setState({ data: ChartSource.get(this.props.books), mounted: true })
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
        const CustomizedAxisTick = React.createClass({
            render() {
                let width = this.props.width / this.props.visibleTicksCount;
                console.log(this.props)
                return (<Text width={width} x={this.props.x} y={this.props.y + 10} verticalAnchor="start" textAnchor="middle" fontSize={10} lineHeight={14}>{this.props.payload.value}</Text>);
            }
        });
        const blue = '#1EA7F8';
        const green = '#00C49F';
        const yellow = '#FFBB28';
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
                            <div className="header col-xs-12 text-center">
                                <span className="box-title ">Books data comparison</span>
                            </div>
                            <div className="header col-xs-12">
                                <ResponsiveContainer height={this.state.chartHeight}>
                                    <AreaChart
                                        data={this.state.data}
                                        margin={{ top: 45, right: 45, left: 45, bottom: 45 }}>
                                        <XAxis dataKey="name" fontSize={10} interval={0} tick={<CustomizedAxisTick/>} />
                                        <YAxis fontSize={10} tickCount={6} width={15} />
                                        <CartesianGrid stroke={grey} />
                                        <Tooltip labelStyle={{ fontSize: 14 }} itemStyle={{ fontSize: 14 }} />

                                        <Area
                                            type='monotone'
                                            dot={{ fill: blue, stroke: 'white', r: 3, fillOpacity: 1 }}
                                            activeDot={{ r: 5 }}
                                            dataKey='totalPages'
                                            stroke={blue}
                                            fill={blue}
                                            fillOpacity={0.3}
                                            stackId="3"
                                            animationEasing='linear'
                                        />
                                        <Area
                                            type='monotone'
                                            dot={{ fill: green, stroke: 'white', r: 3, fillOpacity: 1 }}
                                            activeDot={{ r: 5 }}
                                            dataKey='povCharacters'
                                            stroke={green}
                                            fill={green}
                                            fillOpacity={0.3}
                                            stackId="1"
                                            animationEasing='linear' />
                                        <Area
                                            type='monotone'
                                            dot={{ fill: yellow, stroke: 'white', r: 3, fillOpacity: 1 }}
                                            activeDot={{ r: 5 }}
                                            dataKey='characters'
                                            stroke={yellow}
                                            fill={yellow}
                                            fillOpacity={0.3}
                                            stackId="2"
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