import React from 'react';
import {Route} from 'react-router';
import ReactMarkdown from 'react-markdown';
import Chassis from '../../components/Chassis.jsx';
import pageContent from 'raw!./about.md';

class OtherPage extends React.Component {
    render() {
        return (
            <Chassis>
                <ReactMarkdown source={pageContent} />
            </Chassis>
        );
    }
}

const route = React.createElement(Route, {name: 'about', key: 'route_about', handler: OtherPage});

export default route;