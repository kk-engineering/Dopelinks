import React, { Component } from 'react';
// import fire from '../config/Fire';
import '../index.css';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Form, FormGroup, HelpBlock, Col, FormControl, Button, Checkbox, ControlLabel } from 'react-bootstrap';
import Header from './Header';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import SpotifyIcon from '../images/spotify.png';
import AppleMusicIcon from '../images/applemusic.png';
import SoundcloudIcon from '../images/soundcloud.png';
import TidalIcon from '../images/tidal.png';
import YoutubeIcon from '../images/youtube.png';
import AmazonIcon from '../images/amazon.png';
import DeezerIcon from '../images/deezer.png';
import ItunesIcon from '../images/itunes.png';
import GooglePlayIcon from '../images/googleplay.png';

import { firebase } from '../firebase';
import * as fire from 'firebase';
import ViewLink from './ViewLink';

class CreateLink extends Component {
    constructor(props) {
        super(props);
        this.state={
            uid: '',
            key: '',
            linkName:'',
            artistName: '',
            trackName: '',
            genre: '' ,
            artwork: '',
            spotify: '',
            soundcloud: '',
            tidal: '',
            youtube: '',
            amazon: '',
            deezer: '',
            itunes: '',
            google: '',
            amazonStore: '',
            share: '',   
        };
        this.submitData = this.submitData.bind(this);
        this.handleChange = this.handleChange.bind(this);

        firebase.auth.onAuthStateChanged(user => user && this.setState({
            uid: user.uid,
        }));
    }
    
    submitData(event) {
        event.preventDefault();
        var newLinkRef = fire.database().ref(`links/${fire.auth().currentUser.uid}`).push();
        newLinkRef.set({
            linkName: this.state.linkName,
            artistName: this.state.artistName,
            trackName: this.state.trackName,
            genre: this.state.genre,
            artwork: this.state.artwork,
            spotify: this.state.spotify,
            soundcloud: this.state.soundcloud,
            tidal: this.state.tidal,
            youtube: this.state.youtube,
            amazon: this.state.amazon,
            deezer: this.state.deezer,
            itunes: this.state.itunes,
            google: this.state.google,
            amazonStore: this.state.amazonStore,
            share: this.state.share,
        }).catch(error => console.log(error));
        this.linkKey = newLinkRef.key;
        this.setState({
            key: this.linkKey
        }); 
        window.open('/ViewLink', '_blank');
    }

    handleChange(evt){
        const target = evt.target
        const name = target.name
        const value = target.value
    
        this.setState({
            [name]: value
        })
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
        return ([
            <Header/>,
            <div className="create-your-link-wrapper">
                <div className="create-your-link-container">
                    <h1 style={{color: 'rgba(0, 238, 255, 0.849)', fontSize: '30px', fontWeight: 'bold'}}>Create your link</h1>
                </div>
            </div>,

            <div className="create-your-link-wrapper">
                <div className="create-your-link-container">
                    <h1 style={{color: 'grey', fontSize: '18px', textAlign: 'center'}}>Please Copy and paste links from the following platforms you want to share:</h1>
                </div>
            </div>,
            <div className="create-link-form">
                <div className="create-link-form-wrapper">
                    <div className="create-link-form-container">
                        <Form horizontal onSubmit={this.submitData}>
                        <br/>
                            <FormGroup controlId="formHorizontalName">
                                <Col componentClass={ControlLabel} sm={2}>
                                Link Name
                                </Col>
                                <Col sm={10}>
                                <FormControl value={this.state.linkName} style={{borderRadius: 40, borderColor: 'light-grey', borderWidth: '2px'}} type="text" onChange={this.handleChange} name="linkName" />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalArtist">
                                <Col componentClass={ControlLabel} sm={2}>
                                Artist Name
                                </Col>
                                <Col sm={10}>
                                <FormControl value={this.state.artistName} style={{borderRadius: 40, borderColor: 'light-grey', borderWidth: '2px'}} type="text" onChange={this.handleChange} name="artistName" />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalTrack">
                                <Col componentClass={ControlLabel} sm={2}>
                                Track Name
                                </Col>
                                <Col sm={10}>
                                <FormControl value={this.state.trackName} style={{borderRadius: 40, borderColor: 'light-grey', borderWidth: '2px'}} onChange={this.handleChange} type="text" name="trackName"/>
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalControlSelect">
                                <Col componentClass={ControlLabel} sm={2}>
                                Genre
                                </Col>
                                <Col sm={10}>
                                <FormControl value={this.state.genre} style={{borderRadius: 40, borderColor: 'light-grey', borderWidth: '2px'}} onChange={this.handleChange} name="genre" componentClass="select" placeholder="Please Select" >
                                    <option value="select">Please Select</option>
                                    <option value="genre1">Genre1</option>
                                    <option value="genre1">Genre2</option>
                                </FormControl>
                                </Col>
                            </FormGroup>
                            <br/>
                            <h1 style={{color: 'rgba(0, 238, 255, 0.849)', fontSize: '26px', textAlign: 'center', fontWeight: 'bold'}}>Listening</h1>
                            <br/>
                            <FormGroup controlId="formHorizontalSpotify">
                                <Col componentClass={ControlLabel} sm={2}>
                                <img width='25px' height='25px' src={SpotifyIcon} />
                                </Col>
                                <Col sm={10}>
                                <FormControl value={this.state.spotify} style={{borderRadius: 10, borderColor: 'green', borderWidth: '2px'}} onChange={this.handleChange} type="text" name="spotify" placeholder="Paste the Link Here" />
                                </Col>
                            </FormGroup>

                            
                            <FormGroup controlId="formHorizontalAppleMusic">
                                <Col componentClass={ControlLabel} sm={2}>
                                <img width='25px' height='25px' src={AppleMusicIcon} />
                                </Col>
                                <Col sm={10}>
                                <FormControl value={this.state.appleMusic} style={{borderRadius: 10, borderColor: 'black', borderWidth: '2px'}} onChange={this.handleChange} type="text" name="applemusic" placeholder="Paste the Link Here" />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalSoundcloud">
                                <Col componentClass={ControlLabel} sm={2}>
                                <img width='25px' height='25px' src={SoundcloudIcon} />
                                </Col>
                                <Col sm={10}>
                                <FormControl value={this.state.soundcloud} style={{borderRadius: 10, borderColor: 'orange', borderWidth: '2px'}} onChange={this.handleChange} type="text" name="soundcloud" placeholder="Paste the Link Here" />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalTidal">
                                <Col componentClass={ControlLabel} sm={2}>
                                <img width='25px' height='25px' src={TidalIcon} />
                                </Col>
                                <Col sm={10}>
                                <FormControl value={this.state.tidal} style={{borderRadius: 10, borderColor: 'black', borderWidth: '2px'}} onChange={this.handleChange} type="text" name="tidal" placeholder="Paste the Link Here" />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalYoutube">
                                <Col componentClass={ControlLabel} sm={2}>
                                <img width='25px' height='25px' src={YoutubeIcon} />
                                </Col>
                                <Col sm={10}>
                                <FormControl value={this.state.youtube} style={{borderRadius: 10, borderColor: 'red', borderWidth: '2px'}} onChange={this.handleChange} type="text" name="youtube" placeholder="Paste the Link Here" />
                                </Col>
                            </FormGroup>


                            <FormGroup controlId="formHorizontalAmazon">
                                <Col componentClass={ControlLabel} sm={2}>
                                <img width='25px' height='25px' src={AmazonIcon} />
                                </Col>
                                <Col sm={10}>
                                <FormControl value={this.state.amazon} style={{borderRadius: 10, borderColor: 'black', borderWidth: '2px'}} onChange={this.handleChange} type="text" name="amazon" placeholder="Paste the Link Here" />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalDeezer">
                                <Col componentClass={ControlLabel} sm={2}>
                                <img width='25px' height='25px' src={DeezerIcon} />
                                </Col>
                                <Col sm={10}>
                                <FormControl value={this.state.deezer} style={{borderRadius: 10, borderColor: 'grey', borderWidth: '2px'}} onChange={this.handleChange} type="text" name="deezer" placeholder="Paste the Link Here" />
                                </Col>
                            </FormGroup>

                            <br/>
                            <h1 style={{color: 'rgba(0, 238, 255, 0.849)', fontSize: '26px', textAlign: 'center', fontWeight: 'bold'}}>Buying</h1>
                            <br/>
                            
                            <FormGroup controlId="formHorizontalItunes">
                                <Col componentClass={ControlLabel} sm={2}>
                                <img width='25px' height='25px' src={ItunesIcon} />
                                </Col>
                                <Col sm={10}>
                                <FormControl value={this.state.itunes} style={{borderRadius: 10, borderColor: 'pink', borderWidth: '2px'}} onChange={this.handleChange} type="text" name="itunes" placeholder="Paste the Link Here" />
                                </Col>
                            </FormGroup>


                            <FormGroup controlId="formHorizontalGooglePlayStore">
                                <Col componentClass={ControlLabel} sm={2}>
                                <img width='25px' height='25px' src={GooglePlayIcon} />
                                </Col>
                                <Col sm={10}>
                                <FormControl value={this.state.google} style={{borderRadius: 10, borderColor: 'black', borderWidth: '2px'}} onChange={this.handleChange} type="text" name="google" placeholder="Paste the Link Here" />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalAmazonStore">
                                <Col componentClass={ControlLabel} sm={2}>
                                <img width='25px' height='25px' src={AmazonIcon} />
                                </Col>
                                <Col sm={10}>
                                <FormControl value={this.state.amazonStore} style={{borderRadius: 10, borderColor: 'black', borderWidth: '2px'}} onChange={this.handleChange} type="text" name="amazonStore" placeholder="Paste the Link Here" />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col smOffset={2} sm={10}>
                                <Checkbox value={this.state.spotify} onChange={this.handleChange} name="share">Share</Checkbox>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col smOffset={2} sm={10}>
                                    <Button type="submit">Generate & create link</Button>
                                </Col>
                            </FormGroup>
                        </Form>;
                    </div>
                </div>
            </div>
        ]);
    }
}
export default CreateLink;