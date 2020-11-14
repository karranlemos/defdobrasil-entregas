import React from 'react';

import Layout from '../layout/Layout';

import Form from './Form';

export default () => (
    <Layout>
        <div className="container">
            <div className="caixa-pequena">
                <h1>Adicione Entrega</h1>
                <Form/>
            </div>
        </div>
    </Layout>
);