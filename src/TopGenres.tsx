import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Artist } from './Models/Artist';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table'

interface IGenresProps {
    artistData: Artist[]
};


// Component to show top genres, gained from top artist information
export default class TopGenres extends React.Component<IGenresProps, any>  {
    constructor(props) {
        super(props);
        this.state = { 
            topGenres: []
        };

        this.findArtistTopGenresMap = this.findArtistTopGenresMap.bind(this);
        this.pullTopEntries = this.pullTopEntries.bind(this);
    };

    componentDidMount(){
        this.findArtistTopGenresMap();
    }

    // Count frequency of genres across artists
    findArtistTopGenresMap(){
        let genres = new Map();

        this.props.artistData.forEach(artist => {
            artist.genres.forEach(genre => {
                if (genres.has(genre)){
                    const count: number = genres.get(genre);
                    genres.set(genre, count + 1);
                } else {
                    genres.set(genre, 1);
                }
            })
        });

        this.setState({topGenres: this.pullTopEntries(genres, 10)}); 
        console.log(this.state.topGenres);
    }

    // Sort map of genre frequency and return the top n genres
    pullTopEntries(map: Map<string, number>, value: number){
        let sorted: [string, number][] = [...map.entries()].sort((a, b) => b[1] - a[1]);
        
        if (sorted.length <= value){
            return (sorted);

        } else {
            return (sorted.slice(0, value));
        }

    }

    // Display top genres with frequency count
    render(){
        return (
            <Container className="top-genres">
                <h2>Top genres:</h2>
                <Table striped bordered hover className="genre-table">
                <thead>
                    <th>Genre</th>
                    <th>Number</th>
                </thead>
                <tbody>
                {this.state.topGenres.map(([key, value]) => 
                        <tr>
                            <td>{key}</td>
                            <td>{value} artists</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            </Container>

        );
        
    }
}