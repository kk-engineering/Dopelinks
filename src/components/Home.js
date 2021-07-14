import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Grid, Row, Col, Thumbnail } from 'react-bootstrap';

import thumbnail1 from '../images/common-sense.png';
import servicesBanner from '../images/services-banner.png';
import shareBanner from '../images/share-your-music-banner.png';
import processBanner from '../images/process-banner.png';
import footer from '../images/footer.png';
import background from '../images/header.png';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreateLink from './CreateLink';
import Dashboard from './Dashboard';

class Home extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return ([
            <div className="home-header">
            <div className="home-header-wrapper">
            <Link to="/Search"><div style={{backgroundImage: "url(" + background + ")"}} className="home-header-container">
                    <div className="create-link-button">
                        
                    </div>
                </div></Link>
            </div>
            </div>,
            <div className="services-banner">
            <div className="services-banner-wrapper">
                <div className="services-banner-container">
                    <img src={servicesBanner} />
                </div>
            </div>
            </div>,   
            <div className="share-banner">
            <div className="share-banner-wrapper">
                <div className="share-banner-container">
                    <img src={shareBanner} />
                </div>
            </div>
            </div>,
            <div className="process-banner">
            <div className="process-banner-wrapper">
                <div className="process-banner-container">
                    <img src={processBanner} />
                </div>
            </div>
            </div>,
            <div className="links-footer">
            <div className="links-footer-wrapper">
                <div className="links-footer-container">
                    <p style={{fontSize: '18px', color: 'black'}}><Link to="/Home">HOME</Link> | <Link to="/About">ABOUT</Link> | <Link to="/Search">CREATE LINK</Link> | <Link to="/Contact">CONTACT</Link></p>
                </div>
            </div>
            </div>,
            <div className="copyright-footer">
            <div className="copyright-footer-wrapper">
                <div className="copyright-footer-container">
                    <p style={{fontSize: '16px'}}>Copyright 2019 DopeLinks</p>
                </div>
            </div>
            </div>,
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
export default Home;