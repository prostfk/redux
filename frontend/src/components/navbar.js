import React, {Component} from 'react';
import {Menu} from 'semantic-ui-react'
import {Link} from "react-router-dom";

export default class NavBar extends Component {

    state = {activeItem: 'home'};

    handleItemClick = (e, name) => this.setState({activeItem: name});

    redirect = (url) => {
          this.props.history.push(url);
    };

    render() {
        const {activeItem} = this.state;

        return (
            <Menu secondary>
                {/*<Link to={'/'}>*/}
                    <Menu.Item name='home' active={activeItem === 'home'} onClick={(e, {name})=>{this.handleItemClick(e, name); this.redirect('/')}}/>
                {/*</Link>*/}
                {/*<Link to={'/search'}>*/}
                    <Menu.Item name='search' active={activeItem === 'search'} onClick={(e, {name})=>{this.handleItemClick(e, name); this.redirect('/search')}}/>
                {/*</Link>*/}
            </Menu>
        )
    }

}