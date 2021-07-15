import React, { Component } from 'react';
import '../index.css';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Form, FormGroup, HelpBlock, Col, FormControl, Button, Checkbox, ControlLabel } from 'react-bootstrap';
import Header from './Header';
import { Route, withRouter } from 'react-router-dom';

import SpotifyIcon from '../images/spotify.png';
import AppleMusicIcon from '../images/applemusic.png';
import SoundcloudIcon from '../images/soundcloud.png';
import TidalIcon from '../images/tidal.png';
import YoutubeIcon from '../images/youtube.png';
import AmazonIcon from '../images/amazon.png';
import DeezerIcon from '../images/deezer.png';
import ItunesIcon from '../images/itunes.png';
import GooglePlayIcon from '../images/googleplay.png';

import Tidal from 'tidal-api-wrapper';
import YoutubeSearch from 'youtube-api-search';
import searchYoutube from 'youtube-api-search';
import { Consumer } from './AppProvider';

import { firebase } from '../firebase';
import * as fire from 'firebase';
import ViewLink from './ViewLink';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: '',
            data: '',
            linkName: '',
            artistName: '',
            trackName: '',
            genre: '',
            artwork: '',
            spotifyArtwork: '',
            spotify: '',
            appleMusic: '',
            soundcloud: '',
            tidal: '',
            youtube: '',
            youtubeVideo: '',
            youtubeMusic: '',
            amazon: '',
            deezer: '',
            itunes: '',
            google: '',
            amazonStore: '',
            share: '',
            isLoading: false
        }

        firebase.auth.onAuthStateChanged(user => user && this.setState({
            uid: user.uid,
        }));
    }

    onEnterPress(e) {
        if (e.keyCode === 13) {
            this.setState({
                searchText: e.target.value
            })
            this.getSpotifySearch();
        }
    }

    async handleClick(e) {
        const artistName = e.artists[0].name;
        const trackName = e.name;
        await this.getSpotifyLink(artistName, trackName);
        await this.getAppleMusicLink(artistName, trackName);
        await this.getTidalLink(artistName, trackName);
        await this.getYoutubeLink(artistName, trackName);
        await this.getDeezerLink(artistName, trackName);

        var newLinkRef = await fire.database().ref(`links/${fire.auth().currentUser.uid}`).push();
        await newLinkRef.set({
            linkName: `${trackName}`,
            artistName: artistName,
            trackName: trackName,
            genre: '',
            artwork: this.state.spotifyArtwork != '' ? this.state.spotifyArtwork : '',
            spotify: this.state.spotify,
            appleMusic: this.state.appleMusic,
            soundcloud: this.state.soundcloud,
            tidal: this.state.tidal,
            youtube: this.state.youtube,
            youtubeVideo: this.state.youtubeVideo,
            youtubeMusic: this.state.youtubeMusic,
            amazon: this.state.amazon,
            deezer: this.state.deezer,
            itunes: this.state.itunes,
            google: this.state.google,
            amazonStore: this.state.amazonStore,
            share: this.state.share,
            payment: ''
        }).catch(error => console.log(error));
        this.linkKey = newLinkRef.key;
        const url = `/ViewLink?data=${this.linkKey}`;
        await window.open(url, '_blank');
    }

    async getSpotifySearch() {
        var client_id = 'CLIENTID';
        var client_secret = 'CLIENTSECRET';

        const tokenURL = 'https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/api/token';
        var util = require('util');
        const tokenResponse = await fetch(tokenURL, {
            method: "POST",
            headers: {
                'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials'
        });

        const token = await tokenResponse.json();

        const search = this.state.searchText.split(' ').join('%20');
        const apiURL = 'https://api.spotify.com/v1/search?q=' + search + '&offset=0&type=track&market=US';
        const query = apiURL;
        const response = await fetch(query, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token.access_token}`
            },
        });
        const json = await response.json();

        const trackURL = json.tracks.items.length > 0 ? json.tracks.items.map((entry, index) => `${entry.external_urls.spotify}`) : console.log('nothing');
        const trackImg = json.tracks.items.length > 0 ? json.tracks.items.map((entry, index) => entry.album.images[0].url) : console.log('nothing');

        this.setState({
            data: json.tracks,
            accessToken: token.access_token
        });
    }

    async getSpotifyLink(artist, trackName) {
        const apiURL = 'https://api.spotify.com/v1/search?q=' + artist + '%20' + trackName + '&offset=0&limit=1&type=track&market=US';
        const query = apiURL;
        const response = await fetch(query, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${this.state.accessToken}`
            },
        });
        const json = await response.json();

        const trackURL = json.tracks.items.length > 0 ? json.tracks.items.map((entry, index) => `${entry.external_urls.spotify}`) : console.log('nothing');
        const trackImg = json.tracks.items.length > 0 ? json.tracks.items.map((entry, index) => entry.album.images[0].url) : console.log('nothing');

        this.setState({
            spotify: trackURL[0] != null ? trackURL[0] : '',
            spotifyArtwork: trackImg,
        });
    }

    async getAppleMusicLink(artist, trackName) {
        const search = artist + '%20' + trackName;
        const apiURL = 'https://itunes.apple.com/search?&entity=song,album&country=GB&limit=1&term=';
        const query = apiURL + search;
        const response = await fetch(query);
        const json = await response.json();
        if (json.results.length > 0) {
            this.setState({
                appleMusic: json.results[0].trackViewUrl,
            });
        }
    }

    async getTidalLink(artist, trackName) {
        const tidal = new Tidal({
            countryCode: 'US',
            limit: 1000
        });

        const response = await tidal.search(artist + '%20' + trackName, 'tracks', 1);

        const trackUrl = response[0] != null ? response[0].url : '';

        this.setState({
            tidal: trackUrl
        });
    }

    async getYoutubeLink(artist, trackName) {
        const API_KEY = 'YOUTUBEKEY';

        searchYoutube({ key: API_KEY, term: artist + '%20' + trackName }, (data) => {
            this.setState({
                youtube: `https://www.youtube.com/watch?v=${data[0].id.videoId}`,
                youtubeVideo: `https://www.youtube.com/embed/${data[0].id.videoId}`,
                youtubeMusic: `https://music.youtube.com/watch?v=${data[0].id.videoId}`

            });
        });
    }

    async getDeezerLink(artist, trackName) {
        const API_KEY = 'DEEZERKEY';
        const apiURL = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=' + artist + '%20' + trackName;
        const query = apiURL;
        const response = await fetch(query, {
            method: "GET"
        });
        const json = await response.json();

        this.setState({
            deezer: json.data[0] != null ? json.data[0].link : ''
        });

    }
    async getAmazonLink() {
        // TODO
    }

    getResults() {
        const results = this.state.data.items;
        const resultsList = results.length > 0 ? <ul > {results.map((entry, index) => {

            return ([<div>
                <li className="search-links" style={{cursor: 'pointer'}}onClick={() => this.handleClick(entry)}>

                    <img src={entry.album.images[0].url} align="left" width="80px" height="80px"></img>

                    <div className="search-details">
                        <p className="body" style={{ fontSize: '12px', color: 'black' }}>{entry.artists[0].name}</p>
                        <p className="body" style={{ fontSize: '14px', fontWeight: 'bold', color: 'black' }}>{entry.name}</p>
                    </div>
                </li>
            </div>,
            <br />])


        })} </ul> : console.log('nothing');

        return resultsList;
    }

    render() {

        const dataLength = Object.keys(this.state.data).length;
        const welcome = <div className="welcome-msg"><p className="body">Search for a track to share!</p></div>;
        const rendering = dataLength === 0 ? welcome : this.getResults();

        return ([

            <Header />,
            <br />,
            <div className="search-header">
                    <div className="search-header-container">
                        <div>
                            <input className="search-input" type="text" placeholder="Search for a track"
                                onKeyDown={this.onEnterPress.bind(this)} />
                        </div>
                    </div>
            </div>,
            <br />,
            <div className="create-link">
                <div className="create-link-wrapper">
                    <div className="create-link-container">
                        {rendering}
                    </div>
                </div>
            </div>

        ]);
    }

}

const SetLink = () => (
    <Consumer>
        {(state, ...context) => (
            console.log('shhh: ' + context)
        )}
    </Consumer>
)
export default withRouter(Search);