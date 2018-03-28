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
            mounted: false,
            isVertical: this.props.data.length > 10
        };

    }

    componentDidMount() {
        return (
            this.setState({ data: this.props.data, mounted: true })

        )
    }

    resize({ width }) {
        setTimeout(() => {
            let chartHeight = 0;
            console.log(width)
            if(this.state.isVertical){
                chartHeight = width > 752 ?  600 : 300;
                chartHeight = width > 1184 ? 800 : chartHeight;
            }
            else{
                chartHeight = width > 752 ?  300 : 150;
                chartHeight = width > 1184 ?  400 : chartHeight;
            }
            this.setState({ 'chartHeight': chartHeight });
        }, 50)
    }

    render() {

        let content = <LoaderComponent />;

        const grey = '#F4F4F4';

        if (this.state.mounted) {

            let orientation = this.state.isVertical ? "vertical" : "horizontal";

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
                                    <BarChart layout={orientation} data={this.state.data}  >
                                        <CartesianGrid stroke={grey} />
                                        {this.state.isVertical ? <XAxis type="number" fontSize={10}  ></XAxis> : <XAxis dataKey={this.props.xAxisKey} fontSize={10}  ></XAxis>}
                                        {this.state.isVertical ? <YAxis dataKey={this.props.xAxisKey} interval={0}  type="category" fontSize={10}  ></YAxis> : <YAxis fontSize={10} ></YAxis>}


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