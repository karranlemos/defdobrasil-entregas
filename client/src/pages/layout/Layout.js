import React from 'react';

import Header from './inc/Header';
import Footer from './inc/Footer';

const Layout = (props) => (
    <div className="content">
        <Header/>
        <main className="main">
            {props.children}
        </main>
        <Footer/>
    </div>
);

export default Layout;