import React from 'react';

import Pagination from './Pagination';

const API_ROUTE = '/api/entregas';

export default class TablePages extends React.Component {
    state = {
        firstTime: true,
        currentPage: 0,

        totalPages: 0,
        totalEntries: 0,
        lines: [],

        itemsPerPage: 10,
    };

    componentDidMount() {
        this.getPage();
    }
    
    render() {
        return (
            <div className="table-container">
                <table>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Data de Entrega</th>
                        <th>Ponto de Partida</th>
                        <th>Ponto de Chegada</th>
                    </tr>

                    {this.buildDataRows()}
                </table>

                <Pagination
                    totalPages={this.state.totalPages}
                    currentPage={this.state.currentPage}
                    getPageCallback={this.getPage}
                />
            </div>
        );
    }

    buildDataRows = () => {
        const startLineNumber = (this.state.currentPage-1) * this.state.itemsPerPage;

        return this.state.lines.map((linha, i) => {
            return (
                <tr>
                    <td>
                        {startLineNumber+i+1}
                    </td>
                    <td>
                        {linha.nomeCliente}
                    </td>
                    <td>
                        {linha.dataEntrega}
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
}