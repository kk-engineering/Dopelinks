import React, { Component } from 'react';

import '../index.css';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Form, FormGroup, HelpBlock, Col, FormControl, Button, Checkbox, ControlLabel } from 'react-bootstrap';
import Header from './Header';
import CoverArt from '../images/common-sense.png';
import CreateLinkButton from '../images/createLinkbutton.png';
import CreateLink from './CreateLink';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import footer from '../images/footer.png';
import PaypalButton from '../PaypalButton';

import SpotifyIcon from '../images/spotify.png';
import AppleMusicIcon from '../images/applemusic.png';
import SoundcloudIcon from '../images/soundcloud.png';
import TidalIcon from '../images/tidal.png';
import YoutubeIcon from '../images/youtube.png';
import YoutubeMusicIcon from '../images/youtubemusic.png';
import AmazonIcon from '../images/amazon.png';
import DeezerIcon from '../images/deezer.png';
import ItunesIcon from '../images/itunes.png';
import GooglePlayIcon from '../images/googleplay.png';
import { Consumer } from './AppProvider';
import logo from '../dope-links-logo.png';
import { firebase } from '../firebase';
import * as fire from 'firebase';

const CLIENT = {
    sandbox: 'AXy4dfuHGZ-PhOW6JzgorIFGvte39Qw_OEcaj8zXofBR0y102TrWM9SVV_6bDwOv6YfvfD4Hkob84ci0',
    production: 'xxxXXX',
};

const ENV = process.env.NODE_ENV === 'production'
    ? 'production'
    : 'sandbox';

class PaidLink extends Component {
    constructor(props) {
        super(props);

        this.state = {
            artistName: '',
            trackName: '',
            genre: '',
            artwork: '',
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
            linkKey: '',
        };

    }

    componentDidMount() {
        const urlParams = new URLSearchParams(window.location.search);
        const linkKey = urlParams.get('data'); 
        const linksRef = fire.database().ref(`links/${fire.auth().currentUser.uid}/${linkKey}`);

        linksRef.once('value', snap => {
            let s = snap.val();
            if (s != null) {
                this.setState({
                    artistName: s.artistName != null ? s.artistName : '',
                    trackName: s.trackName != null ? s.trackName : '',
                    genre: s.genre != null ? s.genre : '',
                    artwork: s.artwork != null ? s.artwork : '',
                    spotify: s.spotify != null ? s.spotify : '',
                    appleMusic: s.appleMusic != null ? s.appleMusic : '',
                    soundcloud: s.soundcloud != null ? s.soundcloud : '',
                    tidal: s.tidal != null ? s.tidal : '',
                    youtube: s.youtube != null ? s.youtube : '',
                    youtubeVideo: s.youtubeVideo != null ? s.youtubeVideo : '',
                    youtubeMusic: s.youtubeMusic != null ? s.youtubeMusic : '',
                    amazon: s.amazon != null ? s.amazon : '',
                    deezer: s.deezer != null ? s.deezer : '',
                    itunes: s.itunes != null ? s.itunes : '',
                    amazonStore: s.amazonStore != null ? s.amazonStore : '',
                    linkKey: linkKey
                });
            }
        });
    }

    render() {
        function FieldGroup({ id, label, help, ...props }) {
            return (
                <FormGroup controlId={id}>
                    <ControlLabel>{label}</ControlLabel>
                    <FormControl {...props} />
                    {help && <HelpBlock>{help}</HelpBlock>}
                </FormGroup>
            );
        }

        const videoplaceholder = <div height="150px" width="300px" color="grey"></div>;
        const youtubevid = <iframe src={`${this.state.youtubeVideo}?fs=1&rel=0&border=0&modestbranding=1`} frameborder="0"></iframe>;
        const renderVideo = this.state.youtubeVideo != '' ? youtubevid : videoplaceholder;

        return ([

            <div className="create-link">
                <div className="create-link-wrapper">
                    <div className="create-link-container">
                        <div style={{ lineHeight: '14px' }}>
                            <p className="body" style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>{this.state.genre}</p>
                            <h1 className="body" style={{ fontSize: '50px', fontWeight: 'bold', textAlign: 'center' }}>{this.state.artistName} - {this.state.trackName}</h1>
                        </div>
                    </div>
                </div>
            </div>,
            <br />,
            <br />,
            <br />,
            <div className="view-link-cover-art">
                <div className="view-link-cover-art-wrapper">
                    <div className="view-link-cover-art-container">

                        <img width='300px' height='300px' style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }} src={this.state.artwork} />


                    </div>
                </div>
            </div>,
            <div className="view-link-listen">
                <div className="view-link-listen-wrapper">
                    <div className="view-link-listen-container">
                        <a href={this.state.spotify}><img width='62px' height='62px' src={SpotifyIcon} /></a>
                        <a href={this.state.appleMusic}><img width='62px' height='62px' src={AppleMusicIcon} /></a>
                        <a href={this.state.tidal}><img width='62px' height='62px' src={TidalIcon} /></a>
                        <a href={this.state.youtube}><img width='62px' height='62px' src={YoutubeIcon} /></a>
                        <a href={this.state.youtubeMusic}><img width='60px' height='60px' src={YoutubeMusicIcon} /></a>
                        <img width='62px' height='62px' src={AmazonIcon} />
                        <a href={this.state.deezer}><img width='62px' height='62px' src={DeezerIcon} /></a>
                    </div>
                </div>
            </div>,
            <div className="view-link-video">
                <div className="view-link-video-wrapper">
                    <div className="view-link-video-container">
                    {renderVideo}
                    </div>
                </div>
            </div>,
            <br />,
            <br />,
            <div className="footer">
                <div className="footer-wrapper">
                    <div className="footer-container">
                        <img src={footer} />
                    </div>
                </div>
            </div>
        ]);
    }
}
export default PaidLink;