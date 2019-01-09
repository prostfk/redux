import React, {Component} from 'react';
import {Input, Menu} from 'semantic-ui-react'
import {Link} from "react-router-dom";

export default class NavBar extends Component {

    state = {activeItem: 'home'};

    handleItemClick = (e, {name}) => this.setState({activeItem: name});

    render() {
        const {activeItem} = this.state;

        return (
            <Menu secondary>
                <Link to={'/'}>
                    <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick}/>
                </Link>
                <Link to={'/search'}>
                    <Menu.Item name='search' active={activeItem === 'search'} onClick={this.handleItemClick}/>
                </Link>
                {/*<Menu.Item*/}
                {/*name='friends'*/}
                {/*active={activeItem === 'friends'}*/}
                {/*onClick={this.handleItemClick}*/}
                {/*/>*/}
                {/*<Menu.Menu position='right'>*/}
                {/*<Menu.Item>*/}
                {/*<Input icon='search' placeholder='Search...' />*/}
                {/*</Menu.Item>*/}
                {/*<Menu.Item*/}
                {/*name='logout'*/}
                {/*active={activeItem === 'logout'}*/}
                {/*onClick={this.handleItemClick}*/}
                {/*/>*/}
                {/*</Menu.Menu>*/}
            </Menu>
        )
    }

}