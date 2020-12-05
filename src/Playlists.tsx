import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

import Header from './Header';
import Playlist from './Playlist'

const spotifyApi = new SpotifyWebApi();

export interface ITokenProp {
    token: string
}

// Page of all playlist cards, allows user to select one to enter that Playlist's dashboard

export default class Playlists extends React.Component<any, any> { 
    constructor(props) {
        super(props);
        this.state = { 
            userName: "",
            userID: "",
            data: []
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    };
    
    componentDidMount(){
        // Get all playlist data
        spotifyApi.setAccessToken(this.props.token);
        spotifyApi.getUserPlaylists() 
        .then(
            (playlistData) => {
                console.log(playlistData);
                const d = playlistData;
                this.setState({data: d.items});
            },
            (err) => {
                console.error(err);
            }
        )

        // Get user info
        spotifyApi.getMe().then(
            (userData) => {
                console.log(userData);
                const name = userData.display_name;
                const id = userData.id;
                this.setState({
                    userName: name,
                    userID: id
                });
            }, (err) => {
                console.log(err);
            }
        );
    }

    render(){
        if (this.state.data == undefined){
            return null
        }

        let header;

        if (this.state.userName == undefined){
            header = <Header title="Your playlists" subtitle="Select one from below"/>
        } else {
            let t = this.state.userName + "'s Playlists"
            header = <Header title={t} subtitle="Select one from below"/>
        }

        // if name undefined, ignore -> if no name, one option -> if name, other option

        let playlists = this.state.data.map(pl => (<Playlist playlistName={pl.name} imageUrl={pl.images[0].url} id={pl.id}/>))

        return (
            <div id="playlistSelectorPage">
                {header}
                <div id="playlists">
                    {playlists}
                </div>
            </div>
        );
        
    }
}
