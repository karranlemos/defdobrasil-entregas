import React from 'react';

import './TablePages.css';
import loadingImage from './icons/loading.gif';

import Pagination from './Pagination';
import MapRoute from '../../../components/MapRoute/MapRoute';
import MessageBox from '../../../components/MessageBox/MessageBox';

const API_ROUTE = '/api/entregas';

export default class TablePages extends React.Component {
    state = {
        firstTime: true,
        loading: true,
        currentPage: 0,

        totalPages: 0,
        totalEntries: 0,
        lines: [],

        itemsPerPage: 10,

        modalOpen: false,
        enderecoPartida: null,
        enderecoChegada: null,

        messageBox: null,
    };

    componentDidMount() {
        this.getPage();
    }
    
    render() {
        const modal = this.generateModal();
        const messageBox = this.renderMessageBox();
        return (
            <div className="table-general-container">
                {messageBox}
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
                    getPageCallback={this.getPagePagination}
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
        if (this.state.loading)
            return (
                <tr className="not-clickable">
                    <td colspan="4">
                        <img src={loadingImage} alt="carregando..."/>
                    </td>
                </tr>
            );
        if (this.state.lines.length === 0)
            return <tr className="not-clickable"><td colspan="4">Tabela vazia...</td></tr>;

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


    setError = (message) => {
        this.setState({
            loading: false,
            messageBox: {
                message: message,
                type: 'failure'
            }
        })
    }

    unsetError = () => {
        this.setState({
            messageBox: null
        });
    }

    renderMessageBox = () => {
        if (!this.state.messageBox)
            return null;
        if (!this.state.messageBox.type || !this.state.messageBox.message)
            return null;
        if (!['success', 'failure'].includes(this.state.messageBox.type))
            throw "[TablePages.renderMessageBox]: 'this.state.messageBox.type' must be 'success' or 'failure'...";

        const message = this.state.messageBox.message;
        const type = this.state.messageBox.type;

        return <MessageBox type={type} message={message}/>;
    }



    getPagePagination = (newPage) => {
        // A página não é rolada para cima sem o setTimeout.
        setTimeout(
            () => window.scrollTo(0, 0),
            50
        );

        this.getPage(newPage);
    }

    getPage = (newPage=1) => {
        if (this.state.totalPages <= 0 && !this.state.firstTime) {
            this.setError('Erro: não há dados para se carregar.');
            return;
        }
        if (newPage < 1 || newPage > Math.max(this.state.totalPages, 1)) {
            this.setError('Página da tabela não existe.');
            return;
        }

        const request = new XMLHttpRequest();
        request.addEventListener('load', () => {
            if (request.status === 500) {
                this.setError('Não foi possível carregar a página da tabela devido a um erro interno. Tente novamente mais tarde.');
                return;
            }
            if (request.status !== 200) {
                this.setError('Não foi possível carregar página da tabela. Tente novamente mais tarde.')
                return;
            }

            try {
                var json = JSON.parse(request.responseText);
            }
            catch (err) {
                this.setError('Erro de leitura dos dados da tabela. Tente novamente mais tarde.');
                return;
            }

            if (!this.checkData(json)) {
                this.setError('Erro de leutura dos dados da tabela. Tente novamente mais tarde.');
                return;
            }
            
            this.trocarPagina(json);
        });

        request.open('get', `${API_ROUTE}?page=${newPage}&limit=${this.state.itemsPerPage}`);
        request.send();
    }

    trocarPagina = (json) => {
        this.setState({
            firstTime: false,
            loading: false,
            currentPage: json.currentPage,

            totalPages: json.totalPages,
            totalEntries: json.totalEntries,
            lines: json.lines
        });

        this.unsetError();
    }

    checkData = (json) => {
        const jsonKeys = Object.keys(json);

        for (const key of ['totalPages', 'totalEntries', 'currentPage', 'lines']) {
            if (!jsonKeys.includes(key))
                return false;
        }

        if (!Array.isArray(json.lines))
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