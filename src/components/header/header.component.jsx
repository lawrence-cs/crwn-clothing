import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from './header.styles';

/* The ReactComponent import name is special and tells Create React App that you want a React component that renders an SVG, rather than its filename.*/
import { ReactComponent as Logo} from '../../assets/crown.svg';
 

const Header = ({currentUser, hidden}) => {
    return (
        <HeaderContainer>
            <LogoContainer to="/">
                <Logo className='logo' />
            </LogoContainer>
            <OptionsContainer>
                <OptionLink to='/shop'>
                    {"Shop".toUpperCase()}
                </OptionLink>
                <OptionLink to='/shop'>
                    {"Contact".toUpperCase()}
                </OptionLink>
                {
                    currentUser ? (
                    //as='div' to make link become a div
                    <OptionLink as='div' onClick={() => auth.signOut()}>
                        {"Sign Out".toUpperCase()}
                    </OptionLink>
                    ) : (
                    <OptionLink to='/signin'>
                        {"Sign In".toUpperCase()}
                    </OptionLink>
                )}
                <CartIcon />
            </OptionsContainer>
            {
                hidden ? null : <CartDropdown /> //CartDropDown is now clickable to show or hide
            }
        </HeaderContainer>
    )
}

//That's some advance destructuring right here
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);