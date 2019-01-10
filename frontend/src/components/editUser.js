import React, {Component} from 'react';
import {Button, Header, Icon, Modal, Form} from 'semantic-ui-react'
import {NotificationManager} from "react-notifications";

export default class EditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            id: this.props.user.id,
            name: this.props.user.name,
            surname: this.props.user.surname,
            email: this.props.user.email,
            phoneId: this.props.phone.id,
            phoneVisible: !!this.props.phone.id,
            phoneNumber: this.props.phone.number ? this.props.phone.number : '',
            phoneType: this.props.phone.type ? this.props.phone.type : 'mobile'
        };
    }

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        if (nextProps !== this.props) {
            this.setState({
                id: nextProps.user.id,
                name: nextProps.user.name,
                surname: nextProps.user.surname,
                email: nextProps.user.email,
                phoneId: nextProps.phone.id,
                phoneVisible: !!nextProps.phone.id,
                phoneNumber: nextProps.phone.number ? nextProps.phone.number : '',
                phoneType: nextProps.phone.type ? nextProps.phone.type : 'mobile'
            })
        }

    }

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
            formData.append('id', this.state.id);
            formData.append('email', this.state.email);
            formData.append('name', this.state.name);
            formData.append('surname', this.state.surname);
            if (this.state.phoneVisible) {
                console.log(this.props.phoneId);
                if (this.state.phoneId !== null){
                    formData.append('phoneId', this.props.phone.id);
                }
                formData.append('number', this.state.phoneNumber);
                formData.append('type', this.state.phoneType);
            }
            fetch('/api/updateContact', {method: 'put', body: formData}).then(resp => resp.json())
                .then(data => {
                    if (data.error) {
                        NotificationManager.warning(data.error.toString());
                    } else {
                        this.props.updateFunc();
                        this.setState({
                            modalOpen: false,
                        });
                        NotificationManager.success(`User ${this.state.name} was updated!`);
                    }
                }).catch(err => NotificationManager.warning(err.toString()));
        }

    };

    render() {
        return (
            <Modal
                trigger={<Icon name={'edit'} onClick={this.handleOpen}/>}
                open={this.state.modalOpen} onClose={this.handleClose} basic size='small'>
                <Header icon='user' content='Create new user'/>
                <Modal.Content>
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
                                    <select value={this.state.phoneType} className="ui fluid dropdown"
                                            onChange={this.changeInput}
                                            id={'phoneType'}>
                                        <option value="mobile">Mobile</option>
                                        <option value="work">Work</option>
                                    </select>
                                </Form.Group> : <></>

                        }
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='green' onClick={this.saveUser} inverted>
                        <Icon name='checkmark'/> Edit
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
            } else {
                return true;
            }
        } else {
            return true;
        }

    }

}
