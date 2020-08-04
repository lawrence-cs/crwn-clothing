import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const onToken = token => {
    console.log(token);
    alert('Payment Successful');
}

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HCPl9BujBfV903c6NFgOEqazhM28JevsKlkx0eY8zq8eCTkx83kZ8RgjPXAwRohqneY37LlJh5IXaOxqAj8aTv800XybW0dNB';

    return (
        <StripeCheckout
            label='Pay Now'
            name='Crwn Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amout={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;