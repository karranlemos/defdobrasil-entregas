import React from 'react';
import './MessageBox.css';

export default class MessageBox extends React.Component {
    render() {
        const type = this.getFinalType();
        const message = this.props.message;

        return (
            <div className={`message-box ${type}`}>{message}</div>
        );
    }

    getFinalType = () => {
        switch (this.props.type) {
            case 'success':
            case 'failure':
                return this.props.type;
            
            case 'neutral':
            case '':
            default:
                return '';
        }
    }
}