import React from 'react';


const REAL_SUBMIT_PATH = '/api/entrega';

export default class Form extends React.Component {
    state = {
        status: 'beginning',
        fields: {}
    };

    render() {
        var messageBox = null;
        switch (this.state.status) {
            case 'sent':
                messageBox = this.createSuccessBox('Mensagem enviada com sucesso!');
                break;
            case 'error':
                messageBox = this.createFailureBox(this.state.errorMessage);
                break;
        }
        
        return (
            <div className="form-container">
                <form action="" method="post" onSubmit={this.onSubmit}>
                    <div className="form-item">
                        <input
                            type="text"
                            name="nomeCliente"
                            placeholder="Nome do cliente"
                            required
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-item">
                        <label>Data de entrega
                            <input
                                type="date"
                                name="dataEntrega"
                                required
                                onChange={this.onChange}
                            />
                        </label>
                    </div>
                    <div className="form-item">
                        <input
                            type="text"
                            name="enderecoPartida"
                            placeholder="Endereço de partida"
                            required
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-item">
                        <input
                            type="text"
                            name="enderecoChegada"
                            placeholder="Endereço de chegada"
                            required
                            onChange={this.onChange}
                        />
                    </div>

                    <button type="submit">Adicionar Entrega</button>
                </form>
                {messageBox}
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
            
            try {
                var json = JSON.parse(request.responseText);
                if (!json.errorMessage)
                    throw 'Usa mensagem do catch';
                var errorMessage = json.errorMessage;
            }
            catch (err) {
                var errorMessage = "Não foi possível adicionar a entrega...";
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

    createSuccessBox = (message) => {
        return this.createMessageBox(message, 'success');
    }

    createFailureBox = (message) => {
        return this.createMessageBox(message, 'failure');
    }

    createMessageBox = (message, type='neutral') => {
        if (!['success', 'failure', 'neutral'].includes(type))
            throw "Parameter type must be 'success', 'failure' or 'neutral'.";
        
        if (type === 'neutral')
            type = '';
        
        return (
            <div className={`message-box ${type}`}>{message}</div>
        );
    }
}