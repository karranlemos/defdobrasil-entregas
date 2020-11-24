import React from 'react';

import Header from './inc/Header';
import Footer from './inc/Footer';

export default (props) => (
    <div className="content">
        <Header/>
        <main className="main">
            {props.children}
        </main>
        <Footer/>
    </div>
);