import React, {Component} from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import 'react-notifications/lib/notifications.css';
import Provider from "react-redux/es/components/Provider";
import {createStore} from "redux";
import allReducers from "./reducers/allReducers";
import {BrowserRouter as Router} from 'react-router-dom'
import {Route} from 'react-router';
import IndexPage from "./components/indexPage";
import NavBar from "./components/navbar";
import Notification from './components/notifications'
import SearchPage from "./components/search";
import ContactPage from "./components/contactPage";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <>
                        <Route path={'/*'} component={NavBar}/>
                        <Route path={'/*'} component={Notification}/>
                        <Route exact path={'/'} component={IndexPage}/>
                        <Route exact path={'/search'} component={SearchPage}/>
                        <Route exact path={'/user/:id'} component={ContactPage}/>
                    </>
                </Router>
            </Provider>
        );
    }
}
/* eslint-disable no-underscore-dangle */
const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
/* eslint-enable */
export default App;
