import React, {Component} from 'react';
import {SET_USERS} from "../constants/userActionTypes";
import connect from "react-redux/es/connect/connect";
import {
    Button,
    Container,
    Form,
    Icon,
    Table} from 'semantic-ui-react'
import {NotificationManager} from "react-notifications";
import {Link} from "react-router-dom";

class SearchPage extends Component {

    state = {
        searchParams: [],
        parameter: 'id',
        value: '',
        users: []
    };

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.users !== this.props.users) {
            this.setState({
                users: nextProps.users
            });
            if (nextProps.users.length > 0) {
                document.getElementById('hidden').style.display = '';
                document.getElementById('params-table').style.display = 'none';

            }
        }
    }

    changeInput = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    addParameter = () => {
        let exists = false;
        this.state.searchParams.forEach((value) => {
            let key = Object.keys(value)[0];
            if (key === this.state.parameter || this.state.parameter.length === 0 || this.state.value.length === 0) {
                console.log(value.parameter, this.state.parameter);
                NotificationManager.warning('Cannot add this param');
                exists = true;
            }
        });
        if (!exists) {
            let obj = {};
            obj[this.state.parameter] = this.state.value;
            this.setState({
                searchParams: [...this.state.searchParams, obj]
            })
        }
    };

    deleteParam = (index) => {
        let array = this.state.searchParams;
        if (index !== -1) {
            array.splice(index, 1)
        }
        this.setState({
            searchParams: array
        })
    };

    searchUsers = () => {
        let formData = new FormData();
        formData.append('info', JSON.stringify(this.state.searchParams));
        console.log(JSON.stringify(this.state.searchParams));
        fetch(`/api/search?info=${JSON.stringify(this.state.searchParams)}`).then(resp=>resp.json())
            .then(data=>this.props.setUsers(data)).catch(err=>NotificationManager.error(err.toString()));
    };

    render() {
        return (
            <Container>
                <div id={'params-table'} className={'animated fadeIn'}>
                    <Form>
                        <Form.Field>
                            <label>Value</label>
                            <input onChange={this.changeInput} value={this.state.value} id={'value'}
                                   placeholder='value'/>
                        </Form.Field>
                        <select value={this.state.parameter} className="ui fluid dropdown" onChange={this.changeInput}
                                id={'parameter'}>
                            <option value="id">id</option>
                            <option value="name">name</option>
                            <option value="surname">surname</option>
                            <option value="email">email</option>
                        </select>
                        <Button type='button' onClick={this.addParameter}>Add field</Button>
                        <Button type='button' style={{display: (this.state.searchParams.length > 0 ? '' : 'none')}}
                                onClick={this.searchUsers}>Search</Button>

                    </Form>
                    {
                        this.state.searchParams.length > 0 ?
                            <Table celled>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Param</Table.HeaderCell>
                                        <Table.HeaderCell>Value</Table.HeaderCell>
                                        <Table.HeaderCell>Remove</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>

                                    {

                                        this.state.searchParams.map((value, index) => {
                                            return <Table.Row key={index}>
                                                <Table.Cell>{Object.keys(value)[0]}</Table.Cell>
                                                <Table.Cell>{value[Object.keys(value)[0]]}</Table.Cell>
                                                <Table.Cell><Icon name={'delete'}
                                                                  onClick={this.deleteParam.bind(this, index)}/></Table.Cell>
                                            </Table.Row>
                                        })

                                    }


                                </Table.Body>
                            </Table> : <div/>

                    }
                    <Button style={{display: 'none'}} onClick={() => {
                        document.getElementById('params-table').style.display = 'none';
                        document.getElementById('hidden').style.display = '';
                    }}>Hide params</Button>
                </div>
                <div id="hidden" style={{display: 'none'}}>
                    <Button onClick={() => {
                        document.getElementById('params-table').style.display = '';
                        document.getElementById('hidden').style.display = 'none';
                    }}>Show params</Button>
                </div>

                <div>
                    {
                        this.state.users.length > 0 ?
                            <div>
                                <Icon name={'close'} onClick={() => {

                                    this.setState({
                                        users: []
                                    });
                                    document.getElementById('hidden').style.display = 'none';
                                    document.getElementById('params-table').style.display = '';
                                }
                                }/>
                                <Table celled>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>Id
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>Name
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>Surname
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>Email
                                            </Table.HeaderCell>
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
                                                </Table.Row>
                                            })
                                        }
                                    </Table.Body>
                                </Table>
                            </div>
                            : <div/>
                    }
                </div>
            </Container>
        );
    }


}

const mapStateToProps = state => {
    return {
        users: state.userReducer
    };
};

const mapDispatchToProps = dispatch => {
    return ({
        setUsers: (payload) => {
            dispatch({
                type: SET_USERS, payload
            })
        }
    });
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);