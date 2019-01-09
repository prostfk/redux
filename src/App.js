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
                    </>
                </Router>
            </Provider>
        );
    }
}

const store = createStore(allReducers);
export default App;
