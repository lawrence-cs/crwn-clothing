import React from 'react';
import { Link } from 'react-router-dom';
import './header.styles.scss';
import { auth } from '../../firebase/firebase.utils';
/* The ReactComponent import name is special and tells Create React App that you want a React component that renders an SVG, rather than its filename.*/
import { ReactComponent as Logo} from '../../assets/crown.svg';

const Header = ({currentUser}) => {
    return (
        <div className='header'>
            <Link className='logo-container' to="/">
                <Logo className='logo' />
            </Link>
            <div className='options'>
                <Link className='option' to='/shop'>
                    {"Shop".toUpperCase()}
                </Link>
                <Link className='option' to='/shop'>
                    {"Contact".toUpperCase()}
                </Link>
                {
                    currentUser ?
                    <div className='option' onClick={() => auth.signOut()}>
                        {"Sign Out".toUpperCase()}
                    </div>
                    :
                    <Link className='option' to='/signin'>
                        {"Sign In".toUpperCase()}
                    </Link>
                }
            </div>
        </div>
    )
}

export default Header;