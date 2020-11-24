import React from 'react';
import './Entrega.css';

import Layout from '../layout/Layout';
import Form from './Form';

const Entrega = () => (
    <Layout>
        <div className="container">
            <div className="caixa-pequena">
                <h1>Nova Entrega</h1>
                <Form/>
            </div>
        </div>
    </Layout>
);

export default Entrega;