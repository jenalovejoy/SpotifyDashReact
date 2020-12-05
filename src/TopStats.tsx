import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SpotifyWebApi from 'spotify-web-api-js';

import Container from 'react-bootstrap/Container';
import Header from './Header';
import Playlist from './Playlist'
import { time } from 'console';
import TopArtists from './TopArtists';
import TopTracks from './TopTracks';
import TopGenres from './TopGenres';

const spotifyApi = new SpotifyWebApi();

// Shows all top artists / tracks / genres
export default class TopStats extends React.Component<any, any> { 
    constructor(props) {
        super(props);
        this.state = { 
            // Top artist data
            longTermTopArtists: [],
            mediumTermTopArtists: [],
            shortTermTopArtists: [],

            // Top track data
            longTermTopTracks: [],
            mediumTermTopTracks: [],
            shortTermTopTracks: []
        };

        this.componentDidMount = this.componentDidMount.bind(this);
    };
    
    componentDidMount(){
        spotifyApi.setAccessToken(this.props.token);

        // Top artist calls
        spotifyApi.getMyTopArtists({time_range: "long_term"})
        .then(
            (artistData) => {
                console.log(artistData);
                const d = artistData;
                this.setState({longTermTopArtists: d.items});
            },
            (err) => {
                console.error(err);
            }
        )
        spotifyApi.getMyTopArtists({time_range: "medium_term"})
        .then(
            (artistData) => {
                console.log(artistData);
                const d = artistData;
                this.setState({mediumTermTopArtists: d.items});
            },
            (err) => {
                console.error(err);
            }
        )
        spotifyApi.getMyTopArtists({time_range: "short_term"})
        .then(
            (artistData) => {
                console.log(artistData);
                const d = artistData;
                this.setState({shortTermTopArtists: d.items});
            },
            (err) => {
                console.error(err);
            }
        )

        // Top track calls
        spotifyApi.getMyTopTracks({time_range: "long_term"}).then(
            (trackData) => {
                console.log(trackData);
                const d = trackData;
                this.setState({longTermTopTracks: d.items});
            },
            (err) => {
                console.error(err);
            }
        );
        spotifyApi.getMyTopTracks({time_range: "medium_term"}).then(
            (trackData) => {
                console.log(trackData);
                const d = trackData;
                this.setState({mediumTermTopTracks: d.items});
            },
            (err) => {
                console.error(err);
            }
        );
        spotifyApi.getMyTopTracks({time_range: "short_term"}).then(
            (trackData) => {
                console.log(trackData);
                const d = trackData;
                this.setState({shortTermTopTracks: d.items});
            },
            (err) => {
                console.error(err);
            }
        );
    }

    render(){
        return (
            //  // handle image null check
            <Container id="topStats">
                <Header title="Your Top Tracks / Artists" subtitle=""/>
                <div id="top-artists-container">
                    <TopArtists artistData={this.state.longTermTopArtists} time="long-term"/>
                    <TopArtists artistData={this.state.mediumTermTopArtists} time="medium-term"/>
                    <TopArtists artistData={this.state.shortTermTopArtists} time="short-term"/>
                </div>
                <div id="top-tracks-container">
                    <TopTracks trackData={this.state.longTermTopTracks} time="long-term"/>
                    <TopTracks trackData={this.state.mediumTermTopTracks} time="medium-term"/>
                    <TopTracks trackData={this.state.shortTermTopTracks} time="short-term"/>
                </div>
                <div id="top-genres-container">
                    <TopGenres artistData={this.state.longTermTopArtists}/>
                </div>
            </Container>
        );
        
    }
}
