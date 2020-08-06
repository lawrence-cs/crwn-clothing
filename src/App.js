import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckOutPage from './pages/checkout/checkout.component';
import Header from './components/header/header.component';

import { setCurrentUser } from './redux/user/user.action';
import { selectCurrentUser } from './redux/user/user.selectors';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

// START OF EXPERIMENTAL CODE 002: USE THIS CODE TO CREATE DATA TO FIREBASE WITHOUT TYPING THE WHOLE THING
/*
  import { auth, createUserProfileDocument, addCollectionAndDocuments } from './firebase/firebase.utils';
  import { selectCollectionsForPreview } from './redux/shop/shop.selectors';
*/
  // END OF EXPERIMENTAL CODE 002

import './App.css';

//Use Class to Access State
class App extends React.Component {
  //To avoid memory leak
  unsubscribeFromAuth = null;

  //This Will Open the Subscription
  componentDidMount() {
    const { setCurrentUser } = this.props;

    // START OF EXPERIMENTAL CODE 002: USE THIS CODE TO CREATE DATA TO FIREBASE WITHOUT TYPING THE WHOLE THING
    /* 
      const { setCurrentUser, collectionsArray } = this.props;
    */
    // END OF EXPERIMENTAL CODE 002

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        //Storing userAuth in App State
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()
            });
        }, error => console.log(error));
      }
      setCurrentUser(userAuth);

    // START OF EXPERIMENTAL CODE 002: USE THIS CODE TO CREATE DATA TO FIREBASE WITHOUT TYPING THE WHOLE THING
    /*
      addCollectionAndDocuments('collections', collectionsArray.map(({title, items})=>({title, items})));
    */
    // END OF EXPERIMENTAL CODE 002:
    });
  }

  //This Will Close the Subscription
  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route exact path='/checkout' component={CheckOutPage} />
          <Route exact path='/signin' render={() => 
            this.props.currentUser ? (
              <Redirect to ='/' />
            ) : (
              <SignInAndSignUpPage />
            )}/>
        </Switch>
      </div>
    );
  }
}

//This Code is to hide Sign In Link when user has logged in
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

// START OF EXPERIMENTAL CODE 002: USE THIS CODE TO CREATE DATA TO FIREBASE WITHOUT TYPING THE WHOLE THING
/*
  const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    collectionsArray: selectCollectionsForPreview
  });
*/
// END OF EXPERIMENTAL CODE 002

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
