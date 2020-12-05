import React from 'react';
import Header from './Header';
import { SpotifyAuth, Scopes } from 'react-spotify-auth';

// Landing page: Header plus authorization link
export default class Landing extends React.Component {

    render() {
        return (
            <div className="App">
                <Header title="Spotify Stats & Figures" subtitle="Please authorize your account" />
                <SpotifyAuth
                    redirectUri='http://localhost:3000/callback'
                    clientID=''
                    scopes={
                        [Scopes.userReadPrivate, 
                        Scopes.playlistReadPrivate,
                        Scopes.playlistReadCollaborative,
                        Scopes.userTopRead]} 
                />
            </div>
        )
    }
}