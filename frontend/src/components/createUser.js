import React, {Component} from 'react';
import {Button, Header, Icon, Modal, Form} from 'semantic-ui-react'
import {NotificationManager} from "react-notifications";

export default class CreateUser extends Component {

    state = {
        modalOpen: false,
        name: '',
        surname: '',
        email: '',
        phoneVisible: false,
        phoneNumber: '',
        phoneType: 'mobile'
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    handleOpen = () => this.setState({modalOpen: true});

    handleClose = () => this.setState({modalOpen: false});

    saveUser = () => {
        if (this.__validateForm()) {
            let formData = new FormData();
            formData.append('email', this.state.email);
            formData.append('name', this.state.name);
            formData.append('surname', this.state.surname);
            if (this.state.phoneVisible) {
                formData.append('number', this.state.phoneNumber);
                formData.append('type', this.state.phoneType);
            }
            fetch('/api/addContact', {method: 'put', body: formData}).then(resp => resp.json())
                .then(data => {
                    if (data.error) {
                        NotificationManager.warning(data.error.toString());
                    } else {
                        if (this.props.usersCount < 5) {
                            this.props.updateFunc();
                        }
                        this.setState({
                            modalOpen: false,
                            name: '',
                            surname: '',
                            email: '',
                            phoneNumber: '',
                            phoneVisible: false,
                            phoneType: 'mobile'
                        });
                        NotificationManager.success(`User ${this.state.name} was created!`);
                    }
                }).catch(err => NotificationManager.warning(err.toString()));
        }

    };

    render() {
        let whiteColor = {color: 'white'};
        return (
            <Modal
                trigger={<Button onClick={this.handleOpen}>Add user</Button>}
                open={this.state.modalOpen} onClose={this.handleClose} basic size='small'>
                <Header icon='user' content='Create new user'/>
                <Modal.Content className={'white-label'}>
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Input fluid id={'name'} onChange={this.handleChange} value={this.state.name}
                                        label='First name' placeholder='First name'/>
                            <Form.Input fluid id={'surname'} onChange={this.handleChange} value={this.state.surname}
                                        label='Last name' placeholder='Last name'/>
                            <Form.Input fluid id={'email'} onChange={this.handleChange} value={this.state.email}
                                        label='Email' placeholder='Email'/>
                        </Form.Group>
                        <Button onClick={() => this.setState({phoneVisible: !this.state.phoneVisible})} inverted>
                            <Icon name='phone'/> Phone ?
                        </Button>


                        {
                            this.state.phoneVisible ?
                                <Form.Group widths='equal' style={{marginTop: '2%'}}>
                                    <Form.Input type={'phone'} fluid id={'phoneNumber'} onChange={this.handleChange}
                                                value={this.state.phoneNumber}
                                                placeholder='Phone number'/>
                                    <select value={this.state.phoneType} className="ui fluid dropdown" onChange={this.changeInput}
                                            id={'phoneType'}>
                                        <option value="mobile">Mobile</option>
                                        <option value="work">Work</option>
                                    </select>
                                </Form.Group> : <></>

                        }

                        {/*<Form.Button>Submit</Form.Button>*/}
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='green' onClick={this.saveUser} inverted>
                        <Icon name='checkmark'/> Add
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }

    __validateForm = () => {
        let name = this.state.name.length;
        let surname = this.state.surname.length;
        let email = this.state.email;
        if (name < 2 || name > 15) {
            NotificationManager.warning('Name must be between 2 and 15 chars');
            return false;
        } else if (surname < 2 || surname > 20) {
            NotificationManager.warning('Surname must be between 2 and 20 chars');
            return false;
        } else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            NotificationManager.warning('Incorrect email!');
            return false;
        } else if (this.state.phoneVisible) {
            if (!/^((\+[1-9])+([0-9]){10,12})$/.test(this.state.phoneNumber)) {
                NotificationManager.warning('Incorrect phone format');
                return false;
            }else {
                return true;
            }
        } else {
            return true;
        }

    }

}
