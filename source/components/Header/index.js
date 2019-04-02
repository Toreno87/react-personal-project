
//Core
import React, { Component } from 'react';

//Components
import Search from 'components/Search';

export default class Header extends Component {
    render () {
        return (
            <header>
                <h1>
                    { `Планировщик` }
                </h1>
                <Search />
            </header>
        );
    }
}
