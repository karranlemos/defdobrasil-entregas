import React from 'react';
import './Form.css';

import MessageBox from '../../components/MessageBox/MessageBox';

const REAL_SUBMIT_PATH = '/api/entrega';

export default class Form extends React.Component {
    state = {
        status: 'beginning',
        fields: {}
    };

    render() {
        var messageBox = this.createMessageBox();
        
        return (
            <div className="form-container">
                {messageBox}
                <form action="" method="post" onSubmit={this.onSubmit}>
                    <div className="form-item">
                        <h2>Nome do Cliente</h2>
                        <input
                            type="text"
                            name="nomeCliente"
                            required
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-item">
                        <h2>Data de entrega</h2>
                        <input
                            type="date"
                            name="dataEntrega"
                            required
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-item">
                        <h2>Endereço de partida</h2>
                        <input
                            type="text"
                            name="enderecoPartida"
                            required
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-item">
                        <h2>Endereço de chegada</h2>
                        <input
                            type="text"
                            name="enderecoChegada"
                            required
                            onChange={this.onChange}
                        />
                    </div>

                    <div className="form-item">
                        <button type="submit" className="btn">Efetuar Entrega</button>
                    </div>
                </form>
            </div>
        );
    }



    onChange = (e) => {
        this.setState((prevState, props) => ({
            status: 'changed',
            fields: {
                ...prevState.fields, // Mantém os campos adicionados no sub-objeto
                [e.target.name]: e.target.value
            }
        }));
    };
    
    onSubmit = (e) => {
        e.preventDefault();

        const request = new XMLHttpRequest();
        request.addEventListener('load', () => {
            if (request.status === 201) {
                this.setState({
                    status: 'sent',
                    fields: {}
                });
                
                e.target.reset();

                return;
            }
            
            var errorMessage;
            try {
                var json = JSON.parse(request.responseText);
                if (!json.errorMessage)
                    throw new Error('Usa mensagem do catch');
                errorMessage = json.errorMessage;
            }
            catch (err) {
                errorMessage = "Não foi possível adicionar a entrega...";
            }

            this.setState({
                status: 'error',
                errorMessage: errorMessage
            });
        });
        request.open('post', REAL_SUBMIT_PATH);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.send(this.createPostString());
    };



    createPostString = () => {
        var postString = '';
        for (const [name, value] of Object.entries(this.state.fields))
            postString += `${encodeURIComponent(name)}=${encodeURIComponent(value)}&`;
        return postString;
    };



    createMessageBox = () => {
        var message;
        var type;
        switch (this.state.status) {
            case 'sent':
                message = 'Mensagem enviada com sucesso!';
                type = 'success';
                break;
            case 'error':
                message = this.state.errorMessage;
                type = 'failure';
                break;

            default:
                return null;
        }

        return <MessageBox type={type} message={message}/>;
    }
}