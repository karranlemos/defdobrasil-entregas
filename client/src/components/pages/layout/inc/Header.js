import React from 'react';
import './Header.css';



const itensMenu = {
    '/entregas': 'Entregas',
    '/entrega': 'Efetuar Entrega'
}

export default class Header extends React.Component {
    state = {
        mobileMenuOpen: false
    };

    render() {
        return (
            <header id="header">
                <nav id="nav" className={this.state.mobileMenuOpen ? 'show' : ''}>
                    <div className="container">
                        <a href="/" className="option logo">Entregas Já</a>
                        <div className="mobile-button" onClick={this.alternateMobileMenu}></div>
                        <div className="options">
                            {
                                Object.entries(itensMenu).map(([path, texto]) => {
                                    return (
                                        <a
                                            href={path}
                                            className={`option ${this.isCurrentPage(path) ? 'current-option' : ''}`}
                                        >{texto}</a>
                                    );
                                })
                            }
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
    


    alternateMobileMenu = () => {
        this.setState({
            mobileMenuOpen: !this.state.mobileMenuOpen
        });
    };

    isCurrentPage = (pathString) => {
        pathString = pathString.trim();
        if (pathString.charAt(pathString.length-1) !== '/')
            pathString += '/';
        
        var pathURL= window.location.pathname;
        if (pathURL.charAt(pathURL.length-1) !== '/')
            pathURL += '/';
        
        return (pathString === pathURL);
    };
}

