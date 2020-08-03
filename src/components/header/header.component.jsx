import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import './header.styles.scss';
/* The ReactComponent import name is special and tells Create React App that you want a React component that renders an SVG, rather than its filename.*/
import { ReactComponent as Logo} from '../../assets/crown.svg';
 

const Header = ({currentUser, hidden}) => {
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
                    currentUser ? (
                    <div className='option' onClick={() => auth.signOut()}>
                        {"Sign Out".toUpperCase()}
                    </div>
                    ) : (
                    <Link className='option' to='/signin'>
                        {"Sign In".toUpperCase()}
                    </Link>
                )}
                <CartIcon />
            </div>
            {
                hidden ? null : <CartDropdown /> //CartDropDown is now clickable to show or hide
            }
        </div>
    )
}

//That's some advance destructuring right here
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);