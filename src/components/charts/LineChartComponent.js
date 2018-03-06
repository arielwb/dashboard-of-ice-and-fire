require('normalize.css/normalize.css');
require('styles/App.scss');
import React from 'react';
import 'whatwg-fetch';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { NotifyResize } from 'react-notify-resize';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label, Text } from 'recharts';

import LoaderComponent from '../loader/LoaderComponent';

class LineChartComponent extends React.Component {

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
        const CustomizedAxisTick = React.createClass({
            render() {
                let width = this.props.width / this.props.visibleTicksCount;
                let angle = 0;
                let extraY = 10;
                if(width < 40){
                    angle = 320;
                    extraY = 15;
                }
                return (<Text width={width} x={this.props.x} y={this.props.y + extraY} verticalAnchor="start" angle={angle} textAnchor="middle" fontSize={10} lineHeight={10}>{this.props.payload.value}</Text>);
            }
        });

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
                                    <AreaChart
                                        data={this.state.data}
                                        margin={{ top: 45, right: 45, left: 45, bottom: 45 }}>
                                        <XAxis dataKey={this.props.xAxisKey} fontSize={10} interval={0} tick={<CustomizedAxisTick />} />
                                        <YAxis fontSize={10} tickCount={6} width={15} />
                                        <CartesianGrid stroke={grey} />
                                        <Tooltip labelStyle={{ fontSize: 14 }} itemStyle={{ fontSize: 14 }} />
                                        {
                                            this.props.areaKeys.map((area, index) => {
                                                return (
                                                    <Area
                                                        type='monotone'
                                                        dot={{ fill: area.color, stroke: 'white', r: 3, fillOpacity: 1 }}
                                                        activeDot={{ r: 5 }}
                                                        dataKey={area.key}
                                                        stroke={area.color}
                                                        fill={area.color}
                                                        fillOpacity={0.3}
                                                        stackId={index}
                                                        animationEasing='linear'
                                                        key={index}
                                                    />
                                                )
                                            })
                                        }

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



module.exports = LineChartComponent;