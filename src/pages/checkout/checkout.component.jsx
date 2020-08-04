import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';

import './checkout.styles.scss';

const CheckOutPage = ({cartItems, total}) => {
    return (
        <div className='checkout-page'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>
            {
                cartItems.map(cartItem=>
                    (
                       <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
                    )
                )
            }
            <div className='total'>
                <span>TOTAL: ${total}</span>
            </div>
            <div className='test-card-details'>
                <strong>{"Please use the following test credit card for payments".toUpperCase()}</strong><br />
                <strong>Visa Card No:</strong> 4242 4242 4242 4242<br />
                <strong>CVC:</strong> Any 3 digits<br />
                <strong>Exp:</strong> Any Future Date.
            </div>
            <StripeCheckoutButton price={total} />
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
});

export default connect(mapStateToProps)(CheckOutPage);