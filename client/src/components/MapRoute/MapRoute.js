import React from 'react';
import './MapRoute.css';

import Modal from '../Modal/Modal';

const GOOGLE_MAPS_API_KEY = 'AIzaSyCvyAUwN0gEzXjFRd1QCa17zquhY1qmXNg';

export default class MapRoute extends React.Component {
    render() {
        if (!this.props.origin || !this.props.destination)
            return this.generateModal(
                <p>Erro: valor de origem e/ou de destino desconhecidos.</p>
            );
        
        const api_url = 
            `https://www.google.com/maps/embed/v1/directions?`+
            `key=${GOOGLE_MAPS_API_KEY}`+
            `&origin=${this.props.origin}`+
            `&destination=${this.props.destination}`
        ;
        
        return this.generateModal(
            <iframe class="modal-map"
                frameborder="0"
                src={api_url}
                allowfullscreen>
            </iframe>
        );
    }

    generateModal(children) {
        return (
            <Modal
                closeModal={this.props.closeModal}
            >
                {children}
            </Modal>
        );
    }
}