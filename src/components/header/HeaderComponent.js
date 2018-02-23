require('normalize.css/normalize.css');
require('styles/App.scss');
import React from 'react';

class HeaderComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row">
                <nav className="navbar navbar-default">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="collapsed navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-6"
                                aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <ul className="nav navbar-nav">
                                <li className="active">
                                    <a href="https://arielwb.github.io/">
                                        <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>Ariel Borges</a>
                                </li>
                            </ul>
                        </div>
                        <div className="collapse navbar-collapse pull-right" id="bs-example-navbar-collapse-6">
                            <ul className="nav navbar-nav">
                                <li className="active">
                                    <a href="https://github.com/arielwb/dashboard-of-thrones/">Github repo</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <h1 className="page-title col-xs-12 ">A Dashboard of Ice and Fire</h1>
            </div>
        );
    }
}

module.exports = HeaderComponent;