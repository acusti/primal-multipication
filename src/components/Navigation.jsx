import React from 'react';
import ReactRouter from 'react-router';
import basePath from '../helpers/base-path.js';
import IconGithub from './assets/IconGithub.jsx';

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navCollapse: 'collapse'
        };
    }

    _toggleCollapse() {
        const navCollapse = this.state.navCollapse ? '' : 'collapse';
        this.setState({ navCollapse });
    }

    render() {
        return (
            <div className="navbar navbar-default navbar-fixed-top" role="navigation">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" onClick={this._toggleCollapse.bind(this)}>
                            <span className="sr-only">Menu</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <ReactRouter.Link to={basePath} className="navbar-brand">Primal Multiplication</ReactRouter.Link>
                    </div>

                    <div className={this.state.navCollapse + ' navbar-collapse'}>
                        <ul className="nav navbar-nav">
                            <li><ReactRouter.Link to={basePath}>Home</ReactRouter.Link></li>
                            <li><ReactRouter.Link to={`${basePath}about`}>About</ReactRouter.Link></li>
                            <li><a href="https://github.com/acusti/primal-multiplication" className="navbar-nav__github-link"><IconGithub /> View Source</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Navigation;
