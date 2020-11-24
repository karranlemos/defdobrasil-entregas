import React from 'react';
import './TablePages.css';

import Pagination from './Pagination';
import MapRoute from './MapRoute';

const API_ROUTE = '/api/entregas';

export default class TablePages extends React.Component {
    state = {
        firstTime: true,
        currentPage: 0,

        totalPages: 0,
        totalEntries: 0,
        lines: [],

        itemsPerPage: 10,

        modalOpen: false,
        enderecoPartida: null,
        enderecoChegada: null
    };

    componentDidMount() {
        this.getPage();
    }
    
    render() {
        const modal = this.generateModal();
        return (
            <div className="table-general-container">
                <small className="dica">
                    Clique na linha desejada para ver a rota entre os pontos de partida e chegada.
                </small>
                <div className="table-tag-container">
                    <table>
                        <thead>
                            <tr>
                                <th className="col-nome-cliente">Nome</th>
                                <th className="col-data-entrega">Data de Entrega</th>
                                <th className="col-endereco-partida">Ponto de Partida</th>
                                <th className="col-endereco-chegada">Ponto de Chegada</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.buildDataRows()}
                        </tbody>
                    </table>
                </div>

                <Pagination
                    totalPages={this.state.totalPages}
                    currentPage={this.state.currentPage}
                    getPageCallback={this.getPage}
                />
                {modal}
            </div>
        );
    }

    openModal = (enderecoPartida, enderecoChegada) => {
        this.setState({
            modalOpen: true,
            enderecoPartida: enderecoPartida,
            enderecoChegada: enderecoChegada
        });
    };

    closeModal = () => {
        this.setState({
            modalOpen: false,
            enderecoPartida: null,
            enderecoChegada: null
        });
    };

    generateModal = () => {
        if (!this.state.modalOpen)
            return null;
        
        return (
            <MapRoute
                origin={this.state.enderecoPartida}
                destination={this.state.enderecoChegada}
                closeModal={this.closeModal}
            />
        );
    };





    buildDataRows = () => {
        const startLineNumber = (this.state.currentPage-1) * this.state.itemsPerPage;

        return this.state.lines.map((linha, i) => {
            return (
                <tr
                    onClick={() => this.openModal(linha.enderecoPartida, linha.enderecoChegada)}
                    title="Clique para ver a rota entre o ponto de partida e o de destino."
                >
                    <td>
                        {linha.nomeCliente}
                    </td>
                    <td>
                        {this.beautifyDateString(linha.dataEntrega)}
                    </td>
                    <td>
                        {linha.enderecoPartida}
                    </td>
                    <td>
                        {linha.enderecoChegada}
                    </td>
                </tr>
            );
        });
    }



    getPage = (newPage=1) => {
        if (this.state.totalPages <= 0 && !this.state.firstTime) {
            // TODO show error message
            return;
        }
        if (newPage < 1 || newPage > Math.max(this.state.totalPages, 1)) {
            // TODO show error message
            return;
        }

        const request = new XMLHttpRequest();
        request.addEventListener('load', () => {
            if (request.status !== 200) {
                // TODO show error message
                return;
            }

            try {
                var json = JSON.parse(request.responseText);
            }
            catch (err) {
                // TODO show error message
                return;
            }

            if (!this.checkData(json)) {
                // TODO show error message
                return;
            }
            
            this.fillState(json);
        });

        request.open('get', `${API_ROUTE}?page=${newPage}&limit=${this.state.itemsPerPage}`);
        request.send();
    }

    fillState = (json) => {
        this.setState({
            firstTime: false,
            currentPage: json.currentPage,

            totalPages: json.totalPages,
            totalEntries: json.totalEntries,
            lines: json.lines
        });
    }

    checkData = (json) => {
        const jsonKeys = Object.keys(json);

        for (const key of ['totalPages', 'totalEntries', 'currentPage', 'lines']) {
            if (!jsonKeys.includes(key))
                return false;
        }

        if (!Array.isArray(json.lines) || json.lines.length === 0)
            return false;

        return true;
    }

    beautifyDateString = (dateString) => {
        const date = new Date(dateString);
        
        const year = String(date.getFullYear()).padStart(4, '0');
        const month = String(date.getMonth()+1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${day}/${month}/${year}`;
    }
}