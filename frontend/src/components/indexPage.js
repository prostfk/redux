// @flow
import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {LOAD_USERS, SET_USERS, SORT_ASC, SORT_DESC} from "../constants/userActionTypes";
import {Button, Icon, Label, Menu, Table} from 'semantic-ui-react'
import {Link} from "react-router-dom";
import LoadingBar from "./loadingBar";
import CreateUser from "./createUser";
import EditUser from "./editUser";
import { withRouter } from "react-router-dom";

export class IndexPage extends Component {

    state = {
        users: [],
        page: 1
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps !== this.props
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.users !== this.props.users) {
            this.setState({
                users: nextProps.users
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.setState({
            users: this.props.users
        });
    }

    loadUsers = (pageNumber = this.state.page) => {
        fetch(`/api/contacts?page=${pageNumber - 1}`).then(resp=>resp.json()).then(data=>this.props.setUsers(data));

        this.setState({
            users: this.props.users
        });
    };

    componentDidMount() {
        this.__getCurrentPage();

    }

    nextPage = () => {
        this.loadUsers(this.state.page + 1);
        this.setState({
            page: this.state.page + 1
        });
        this.props.history.push(`/?page=${this.state.page+1}`);
    };

    prevPage = () => {
        this.loadUsers(this.state.page - 1);
        this.setState({
            page: this.state.page - 1
        });
        this.props.history.push(`/?page=${this.state.page-1}`);
    };

    render() {
        return (
            <>
                {
                    this.state.users.length > 0 ?
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Id
                                        <Icon name='sort alphabet down' onClick={this.props.sortAsc.bind(this, 'id')}/>
                                        <Icon name='sort alphabet up' onClick={this.props.sortDesc.bind(this, 'id')}/>
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>Name
                                        <Icon name='sort alphabet down'
                                              onClick={this.props.sortAsc.bind(this, 'name')}/>
                                        <Icon name='sort alphabet up'
                                              onClick={this.props.sortDesc.bind(this, 'name')}/>
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>Surname
                                        <Icon name='sort alphabet down'
                                              onClick={this.props.sortAsc.bind(this, 'surname')}/>
                                        <Icon name='sort alphabet up'
                                              onClick={this.props.sortDesc.bind(this, 'surname')}/>
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>Email
                                        <Icon name='sort alphabet down'
                                              onClick={this.props.sortAsc.bind(this, 'username')}/>
                                        <Icon name='sort alphabet up'
                                              onClick={this.props.sortDesc.bind(this, 'username')}/>
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>Edit</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {
                                    this.state.users.map((user, index) => {
                                        return <Table.Row className={'animated fadeIn'} key={index}>
                                            <Table.Cell><Link style={{'text-decoration': 'none'}} to={`/user/${user.id}`}>{user.id}</Link></Table.Cell>
                                            <Table.Cell>{user.name}</Table.Cell>
                                            <Table.Cell>{user.surname}</Table.Cell>
                                            <Table.Cell>{user.email}</Table.Cell>
                                            <Table.Cell><EditUser updateFunc={this.loadUsers} user={this.state.users[index]}/></Table.Cell>
                                        </Table.Row>
                                    })
                                }
                            </Table.Body>
                            <Table.Footer>
                                <Table.Row>
                                    <Table.HeaderCell colSpan='5'>
                                        <Menu floated='right' pagination>

                                            <Menu.Item as='a' icon style={{display: (this.state.page === 1 ? 'none' : '')}}>
                                                <Button onClick={this.prevPage}>
                                                    <Icon name='chevron left'/>
                                                </Button>
                                            </Menu.Item>
                                            <Menu.Item as='a' icon style={{display: (this.state.users.length < 5 ? 'none' : '')}}>
                                                <Button onClick={this.nextPage}>
                                                    <Icon name='chevron right'/>
                                                </Button>
                                            </Menu.Item>
                                        </Menu>
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Footer>
                        </Table> : <LoadingBar header={'One moment'} text={'Loading users'}/>
                }
                <CreateUser usersCount={this.state.users.length} updateFunc={this.loadUsers}/>

            </>
        );
    }

    __getCurrentPage = () => {
        let link = window.location.href.split('?');
        if (link.length > 1){
            let params = link[1].split('=');
            if (params.length > 1){
                this.setState({
                    page: params[1]
                });
                this.loadUsers(params[1]);
            }else {
                this.loadUsers();
            }
        }else{
            this.loadUsers();
        }
    }

}


const mapStateToProps = state => {
    return {
        users: state.userReducer
    };
};

const mapDispatchToProps = dispatch => {
    return ({
        sortDesc: (payload) => {
            dispatch({
                type: SORT_DESC, payload
            })
        },
        sortAsc: (payload) => {
            dispatch({
                type: SORT_ASC, payload
            })
        },
        setUsers: (payload) => {
            dispatch({
                type: SET_USERS, payload
            })
        }
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);