import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import Header from './components/header/header.component';

import { setCurrentUser } from './redux/user/user.action';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import './App.css';

//Use Class to Access State
class App extends React.Component {
  //To avoid memory leak
  unsubscribeFromAuth = null;

  //This Will Open the Subscription
  componentDidMount(){
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        //Storing userAuth in App State
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()
            });
        });
      }
      setCurrentUser(userAuth);
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

//Thhis Code is to hide Sign In Link when user has logged in
const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
