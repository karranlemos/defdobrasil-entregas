import React from 'react';
import './Error.css';

import Layout from '../layout/Layout';


export default (props) => (
    <Layout>
        <div id="pagina-erro" className="caixa-pequena">
            <h1>Erro</h1>
            <p>{props.error}</p>
        </div>
    </Layout>
);