import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table'
import { Track } from './Models/Track';


interface ITracksProps {
    trackData: Track[]
    time: string
};

// Component to show top tracks of a particular time period
export default class TopTracks extends React.Component<ITracksProps, any>  {
    constructor(props) {
        super(props);
        this.state = {};
    };

    render(){
        return (
            <Container className="top-tracks">
                <h2>Top Tracks: {this.props.time}</h2>
                <Table striped bordered hover className="tracks-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Artist</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.props.trackData.map(track => 
                        <tr>
                            <td>{track.name}</td>
                            <td>{track.artists.map(artist => <text>/ {artist.name} /</text>)}</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </Container>

        );   
    }
}