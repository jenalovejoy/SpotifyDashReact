import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react'
import { Jumbotron } from 'react-bootstrap';

interface IHeaderProps {
    title: string,
    subtitle: string
}

// Header Component with Title/Subtitle for each page
export default class Header extends React.Component<IHeaderProps>  {
    constructor(props) {
        super(props);
        this.state = {};
    };


    render(){
        return (
            <Jumbotron className="header">
                <h1>{this.props.title}</h1>
                <h2>{this.props.subtitle}</h2>
            </Jumbotron>
        );
    }
}