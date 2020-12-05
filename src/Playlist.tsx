import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Image } from 'react-bootstrap';
import { Link } from "react-router-dom";

// Individual Playlist card including image / text, links to playlist dashboard

interface IPlaylistProps {
    playlistName: string,
    imageUrl: string,
    id: string
};

interface IPlaylistState {};

export default class Playlist extends React.Component<IPlaylistProps, IPlaylistState>  {
    constructor(props) {
        super(props);
        this.state = {};
    };

    render(){
        return (
            <div className="individual-playlist">
                <Link to={`/playlist/${this.props.id}`}>
                    <Image className="playlist-image"
                        alt={this.props.playlistName}
                        src={this.props.imageUrl}/>
                    <h2 className="playlist-name">{this.props.playlistName}</h2>
                </Link>
            </div>

        );
        
    }
}