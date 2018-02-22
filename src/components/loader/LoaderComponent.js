require('normalize.css/normalize.css');
require('styles/App.scss');
import React from 'react';

class LoaderComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="loader"><i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i></div>
            </div>
        );
    }
}

module.exports = LoaderComponent;