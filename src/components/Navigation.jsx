// react
import React from 'react';
import ReactRouter from 'react-router';

class Navigation extends React.Component {
    render() {
        return (
            <div className="navbar navbar-default navbar-fixed-top" role="navigation">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle">
                            <span className="sr-only">Menu</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <ReactRouter.Link to="/" className="navbar-brand">Primal Multiplication</ReactRouter.Link>
                    </div>

                    <div className="collapse navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li><ReactRouter.Link to="/">Home</ReactRouter.Link></li>
                            <li><ReactRouter.Link to="/about">About</ReactRouter.Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Navigation;
