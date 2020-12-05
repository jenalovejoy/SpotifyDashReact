import React from 'react';
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams
} from "react-router-dom";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Cookies from 'js-cookie';
import Playlists from './Playlists';
import PlaylistView from './PlaylistView';
import Landing from './Landing';

// Renders individual Playlist view
function RenderPlaylist(token){
    const {id} = useParams();
    return (
        <PlaylistView id={id} token={token.token}/>
    );
}

function App() {
    const token = Cookies.get('spotifyAuthToken')

    return (
        <div className='App'>
            <Router>
            <Switch>
                
                {/* <Route path="/allPlaylists">
                    <Playlists/>
                </Route> */}
                <Route exact path="/playlist/:id">
                    {token ? (
                        <RenderPlaylist token={token}/>
                    ) : (
                        // Display the login page if token unavailable
                        <Landing/>
                    )}
                </Route>
                <Route path="/">
                    {token ? (
                        <Playlists token={token}/>
                        // <TopStats token={token}/> -> Two paths available currently, top info or playlist info
                    ) : (
                        // Display the login page if token unavailable
                        <Landing/>
                    )}
                </Route>
            </Switch>
            </Router>
        </div>
    );
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
export default App;
