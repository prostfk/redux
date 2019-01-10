import React, {PureComponent} from 'react'
import {Message, Icon} from 'semantic-ui-react'

export default class LoadingBar extends PureComponent {

    render() {
        return (
            <Message icon>
                <Icon name='circle notched' loading/>
                <Message.Content>
                    <Message.Header>{this.props.header}</Message.Header>
                    {this.props.text}
                </Message.Content>
            </Message>
        );
    }

}


