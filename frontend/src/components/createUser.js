import React, {Component} from 'react';
import {Button, Header, Icon, Modal, Form} from 'semantic-ui-react'
import {NotificationManager} from "react-notifications";

export default class CreateUser extends Component {

    state = {
        modalOpen: false,
        name: '',
        surname: '',
        email: ''
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    handleOpen = () => this.setState({modalOpen: true});

    handleClose = () => this.setState({modalOpen: false});

    saveUser = () => {
        if (this.__validateForm()){
            let formData = new FormData();
            formData.append('email', this.state.email);
            formData.append('name', this.state.name);
            formData.append('surname', this.state.surname);
            fetch('/api/addContact', {method: 'put', body: formData}).then(resp=>resp.json())
                .then(data=>{
                    if (data.error){
                        NotificationManager.warning(data.error.toString());
                    }else{
                        if (this.props.usersCount < 5){
                            this.props.updateFunc();
                        }
                        this.setState({
                            modalOpen: false,
                            name: '',
                            surname: '',
                            email: ''
                        });
                        NotificationManager.success(`User ${this.state.name} was created!`);
                    }
                }).catch(err=>NotificationManager.warning(err.toString()));
        }

    };

    render() {
        return (
            <Modal
                trigger={<Button onClick={this.handleOpen}>Add user</Button>}
                open={this.state.modalOpen} onClose={this.handleClose} basic size='small'>
                <Header icon='user' content='Create new user'/>
                <Modal.Content>
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Input fluid id={'name'} onChange={this.handleChange} value={this.state.name} label='First name' placeholder='First name' />
                            <Form.Input fluid id={'surname'} onChange={this.handleChange} value={this.state.surname} label='Last name' placeholder='Last name' />
                            <Form.Input fluid id={'email'} onChange={this.handleChange} value={this.state.email} label='Email' placeholder='Email' />
                        </Form.Group>
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
       if (name < 2 || name > 15){
           NotificationManager.warning('Name must be between 2 and 15 chars');
           return false;
       }else if (surname < 2 || surname > 20){
           NotificationManager.warning('Surname must be between 2 and 20 chars');
           return false;
       }else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
           NotificationManager.warning('Incorrect email!');
           return false;
       }else{
           return true;
       }

    }

}
