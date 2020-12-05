import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Artist } from './Models/Artist';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table'

interface IArtistsProps {
    artistData: Artist[],
    time: string
};

// Component to show top artists of a particular time period
export default class TopArtists extends React.Component<IArtistsProps, any>  {
    constructor(props) {
        super(props);
        this.state = {};
    };

    render(){
        return (
            <Container className="top-artists">
                <h2 className="artist-title">Top Artists: {this.props.time}</h2>
                <Table striped bordered hover className="artist-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Genre</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.props.artistData.map(artist => 
                        <tr>
                            <td className="artist-col-1">{artist.name}</td>
                            <td className="artist-col-2">{artist.genres.map(genre =><text>/ {genre} /</text>)}</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </Container>

        );
        
    }
}