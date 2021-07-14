import React from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom';
import { auth } from '../firebase';
import { Consumer } from './AppProvider';
import { slide as Menu } from 'react-burger-menu';

const Navbar = props => {
    const handleLogout = context => {
        auth.logout();
        context.destroySession();
        props.history.push('/signedOut');
    };

    var styles = {
        bmBurgerButton: {
            position: 'fixed',
            width: '36px',
            height: '30px',
            right: '36px',
            top: '36px'
        },
        bmBurgerBars: {
            background: 'rgb(97, 228, 240)'
        },
        bmBurgerBarsHover: {
            background: '#a90000'
        },
        bmCrossButton: {
            height: '24px',
            width: '24px'
        },
        bmCross: {
            background: '#bdc3c7'
        },
        bmMenu: {
            background: '#373a47',
            padding: '2.5em 1.5em 0',
            fontSize: '1.15em'
        },
        bmItemList: {
            color: '#b8b7ad',
            padding: '0.8em'
        },
        bmOverlay: {
            background: 'rgba(0, 0, 0, 0.3)'
        }
    }

    return (
        <Menu right styles={styles} >

            <Consumer>
                {({ state, ...context }) => (
                    state.currentUser ?
                        <ul id="menu">
                            <li><Link to="/Search" className="body" style={{ color: '#FFF' }}>Create a link</Link></li>
                            <li><Link to="/dashboard" className="body" style={{ color: '#FFF' }}>Dashboard</Link></li>
                            <li><a className="body" style={{ color: '#FFF' }} onClick={() => handleLogout(context)}>Logout</a></li>
                        </ul>
                        :
                        <ul id="menu">
                            <li ><Link to="/" className="body" style={{ color: '#FFF' }}>Home</Link></li>
                            <li><Link to="/login" className="body" style={{ color: '#FFF' }}>Login</Link></li>
                            <li><Link to="/signup" className="body" style={{ color: '#FFF' }}>Create Account</Link></li>
                        </ul>
                )}
            </Consumer>
        </Menu>
    );
};

export default withRouter(Navbar);