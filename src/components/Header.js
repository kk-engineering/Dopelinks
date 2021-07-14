import React, { Component } from 'react';
import '../index.css';
import logo from '../dope-links-logo.png';

import { NavLink, Link, Switch, Route } from 'react-router-dom';

class Header extends Component {

    render() {
        return ([
            <div className="navbar">
                <div className="header-wrapper">
                    <div className="header-container">
                    <Link to="/"><img className="header-logo" src={logo} /></Link>
                    </div>
                </div>
            </div>
        ]);
    }
}
export default Header;