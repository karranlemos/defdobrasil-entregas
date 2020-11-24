import React from 'react';
import './Modal.css';

export default class Modal extends React.Component {
    modalContainerRef = React.createRef();

    render() {
        return (
            <div
                ref={this.modalContainerRef} className="modal-container"
                onClick={e => {
                    if (e.target === this.modalContainerRef.current)
                        this.props.closeModal();
                }}
            >
                <div className="modal-popup">
                    <header className="modal-header">
                        <div className="close" onClick={this.props.closeModal}></div>
                    </header>
                    <div className="modal-body">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}