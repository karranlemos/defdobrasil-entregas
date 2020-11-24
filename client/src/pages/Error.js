import React from 'react';

import Layout from './layout/Layout';


export default (props) => (
    <Layout>
        <h1>Error</h1>
        <p>{props.error}</p>
    </Layout>
);