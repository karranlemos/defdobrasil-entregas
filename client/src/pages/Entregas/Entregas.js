import React from 'react';
import './Entregas.css';

import Layout from '../layout/Layout';

import TablePages from './TablePages/TablePages';

const Entregas = () => (
    <Layout>
        <div id="entregas" className="container">
            <h1>Entregas</h1>
            <TablePages/>
        </div>
    </Layout>
);

export default Entregas;