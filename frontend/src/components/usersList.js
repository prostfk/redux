import React, {Component} from 'react';
import {Button, Icon, Menu, Table} from 'semantic-ui-react'
import {Link} from "react-router-dom";
import EditUser from "./indexPage";
import CreateUser from "./createUser";
import LoadingBar from "./loadingBar";

export default class UsersList extends Component {

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
                                            <Table.Cell><EditUser user={user}/></Table.Cell>
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

}