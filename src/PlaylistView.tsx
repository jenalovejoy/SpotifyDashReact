import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Header from './Header';
import SpotifyWebApi from 'spotify-web-api-js';
import {Track} from "./Models/Track"

export interface IPlaylistProp {
    token: string,
    id: string
}

export interface IPlaylistViewState {
    dataRaw?: AnalyserNode;
    trackData: Track[];

}

const spotifyApi = new SpotifyWebApi();

// Dashboard for individual playlist information

export default class PlaylistView extends React.Component<IPlaylistProp, any> { 
    constructor(props) {
        super(props);
        this.state = { 
            dataRaw: [], // start with large data set
            trackData: [], // trim data set to just track information
            total: 0, // total tracks
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.buildData = this.buildData.bind(this);

    };
    
    componentDidMount(){
        this.buildData();
        
    }

    async buildData(){
        // Connect to spotify
        spotifyApi.setAccessToken(this.props.token);
        spotifyApi.getPlaylistTracks(this.props.id)

        // Get larger dataset 
        .then(
            (playlistData) => {
                console.log("data:", playlistData);
                const d = playlistData;
                this.setState({dataRaw: d.items, total: d.total});
            },
            (err) => {
                console.error(err);
            }
        )

        // Only 100 tracks are returned in each call -> continue calling until all track information saved
        .then(() => {
            let i = 100;
            let count = this.state.total;
            while(i < count){
                spotifyApi.getPlaylistTracks(this.props.id, {offset: i})
                .then(
                    (playlistData) => {
                        console.log("next data:", playlistData);
                        const d = playlistData;
                        const data = this.state.dataRaw;
                        this.setState({dataRaw: data.concat(d.items)});
                    },
                    (err) => {
                        console.error(err);
                    }
                )
                i = i + 100;
            }

            // Trim dataset to only include track information
            let tracks: Track[] = [];
            this.state.dataRaw.map(item => tracks.push(item.track));
            console.log(tracks);
            this.setState({trackData: tracks});
        })  
    }

    render(){
        return (
            <Container id="individual-playlist-dash">
                <Header title="This playlist" subtitle="playlist subtitle"/>
                <Container>
                    {/* Placeholder for now -> will be datavis / information later */}
                    {this.state.trackData.map(item => <p>{item.name}</p>)} 
                </Container>
            </Container>
        );
        
    }
}
