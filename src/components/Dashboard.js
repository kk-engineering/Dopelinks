import React, { Component } from 'react';
import '../index.css';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import Header from './Header';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import CreateLinkButton from '../images/createLinkbutton.png';
import CreateLink from './CreateLink';
import ViewLink from './ViewLink';
import footer from '../images/footer.png';
import { userInfo } from 'os';

import { firebase } from '../firebase';
import * as fire from 'firebase';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uid: '',
            username: 'Test User',
            email: '',
            links: []
        };

        firebase.auth.onAuthStateChanged(user => user && this.setState({
            uid: user.uid,
            email: user.email
        }));
    }

    componentDidMount() {
        const linksRef = fire.database().ref('links/' + fire.auth().currentUser.uid);
        var userLinks = [];
        linksRef.once('value', snap => {
            snap.forEach(function (s) {
                if (s.val().payment != null && s.val().payment.paid == true) {
                    const linkMap = {};
                    var key = s.key;
                    var link = s.val().linkName;

                    linkMap['key'] = key;
                    linkMap['linkName'] = link;
                    userLinks.push(linkMap);
                }
            });

            this.setState({
                links: userLinks
            });
        });
    }

    handleDelete(key) {
        fire.database().ref('links/' + fire.auth().currentUser.uid).child(key).remove();
        window.location.reload();
    }

    render() {

        var renderLinks = this.state.links.map((link) => <div className="dashboard-links">
            <ul className="dashboard-links-wrapper">
                <li className="dashboard-links-container">
                    <Link to={'/PaidLink?data=' + link.key} style={{ textDecoration: 'none' }}><h1 className="body" style={{ color: 'grey', fontSize: '14px' }}>{link.linkName}</h1></Link>
                </li>
                <div className="previous-links" onClick={() => this.handleDelete(link.key)}><Link to='/dashboard' style={{ textDecoration: 'none' }}><p>delete</p></Link></div>
            </ul>
        </div>
        );
        return ([
            <Header />,
            <br />,
            <div className="create-link">
                <div className="create-link-wrapper">
                    <div className="create-link-container">
                        <h1 className="body" style={{ color: 'rgb(97, 228, 240)', fontSize: '30px', fontWeight: 'bold' }}>Account Dashboard</h1>
                    </div>
                </div>

            </div>,
            <br />,
            <br />,
            <div className="create-link">
                <div className="create-link-wrapper">
                    <div className="create-link-container">
                        <h1 style={{ color: 'rgba(0, 238, 255, 0.849)', fontSize: '18px', fontWeight: 'bold' }}></h1>
                    </div>
                </div>
            </div>,
            <div className="create-link">
                <div className="create-link-wrapper">
                    <div className="create-link-container">
                        <h1 className="body" style={{ color: 'grey', fontSize: '14px' }}>{this.state.email}</h1>
                    </div>
                </div>
            </div>,
            <br />,
            <br />,
            <br />,
            <div className="create-link">
                <div className="create-link-wrapper">
                    <div className="create-link-container">
                        <h1 className="body" style={{ color: 'rgb(97, 228, 240)', fontSize: '22px', fontWeight: 'bold' }}>Your Previous Links</h1>
                    </div>
                </div>
            </div>,
            <br />,
            <div>
                {renderLinks}
            </div>,
            <br />,
            <br />,
            <br />,
            <br />,
            <div className="create-link-wrapper">
                <div className="create-link-button">
                    <Link to="/Search"><img width='207px' height='63px' src={CreateLinkButton} /></Link>
                </div>
            </div>,
            <br />,
            <br />,
            <br />,
            <div className="create-link">
                <div className="create-link-wrapper">
                    <div className="create-link-container">
                        <h1 className="body" style={{ color: 'rgb(97, 228, 240)', fontSize: '30px', fontWeight: 'bold' }}>How it works</h1>
                    </div>
                </div>
            </div>,
            <br />,
            <br />,
            <div className="how-it-works">
                <div className="how-it-works-wrapper">
                    <div className="how-it-works-container">

                    </div>
                </div>
            </div>,
            <br />,
            <br />,
            <br />,
            <br />,
            <br />,
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
export default Dashboard;