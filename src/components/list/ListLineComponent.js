require('normalize.css/normalize.css');
require('styles/App.scss');
import React from 'react';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import LoaderComponent from '../loader/LoaderComponent';

class ListLineComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            subtitle: "",
            text: "",
            mounted: false,
        };
    }

    componentDidMount() {
        let p = this.props;
        return (this.setState(
            {
                title: p.title,
                subtitle: p.subtitle,
                text: p.text,
                mounted: true
            }))
    }

    render() {
        let content = <LoaderComponent />;
        if (this.state.mounted) {

            let s = this.state;

            content = <ReactCSSTransitionGroup
                transitionName="animation"
                transitionAppear={true}
                transitionEnterTimeout={5000}
                transitionAppearTimeout={5000}
                transitionLeaveTimeout={5000}
            >
                {this.renderLine(s.title, s.subtitle, s.text, s.cssClass)}
            </ReactCSSTransitionGroup>
        }

        return (
            content
        );
    }

    renderLine(title, subtitle, message, cssClass) {

        return (
            <div className={'line' }>

                <div className="message">
                    <div className="user-info">
                        <span className="user-name">{title}</span>
                    </div>
                    <div className="user-from">
                        <span className="time">{subtitle}</span>
                    </div>
                    <p className="user-message">
                        {message}
                    </p>
                </div>
            </div>
        );
    }

}

module.exports = ListLineComponent;