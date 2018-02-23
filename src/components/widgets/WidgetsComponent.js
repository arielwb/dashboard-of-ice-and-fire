require('normalize.css/normalize.css');
require('styles/App.scss');
import React from 'react';
import 'whatwg-fetch';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import WidgetsSource from './WidgetsSource';
import LoaderComponent from '../loader/LoaderComponent';

class WidgetsComponent extends React.Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            data: {
                books: {
                    count: 0,
                    label: "Total books",
                    icon: "book",
                },
                characters: {
                    count: 0,
                    label: "Total characters",
                    icon: "users",
                },
                totalPages: {
                    count: 0,
                    label: "Total pages",
                    icon: "file",
                },
                povCharacters: {
                    count: 0,
                    label: "Total POV characters",
                    icon: "address-book",
                }
            },
            mounted: false
        };
    }

    componentDidMount() {
        return (
            this.setState({ data: WidgetsSource.get(this.props.books, this.state.data), mounted: true })
        )
    }

    render() {
        let content = <LoaderComponent />;
        if (this.state.mounted) {

            let inner = []
            Object.entries(this.state.data).forEach(
                ([key, value]) => inner.push(this.renderWidget(value.label, value.count, value.icon, key)))

            content = (
                <ReactCSSTransitionGroup
                    transitionName="animation"
                    transitionAppear={true}
                    transitionEnterTimeout={5000}
                    transitionAppearTimeout={5000}
                    transitionLeaveTimeout={5000} >
                    <div className="widgets-component component">
                        {inner}
                    </div>
                </ReactCSSTransitionGroup>
            );
        }
        return (
            <div>
                {content}
            </div>
        )
    }

    renderWidget(text, value, icon, key) {
        return (
            <div className="col-xs-12 col-md-6 col-lg-3" key={key}>
                <div className="widget box">
                    <div className={icon + ' icon col-xs-12 col-sm-2  col-lg-4'}>
                        <i className={'fa fa-' + icon}></i>
                    </div>
                    <div className="data col-xs-12 col-sm-10  col-lg-8">
                        <div className="count">{value}</div>
                        <div className="legend">{text}</div>
                    </div>
                </div>
            </div>
        );
    }
}


module.exports = WidgetsComponent;