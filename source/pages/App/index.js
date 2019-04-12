// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

//components
import Sheduler from 'components/Scheduler';
import { Provider } from 'components/HOC/withProfile';

const options = {
    isDisabled: true,
    maxLengthInput: 50,
    pallete: {
        blue: '#3B8EF3',
        dark: '#323232',
        white: '#FFF'
    }
};

@hot(module)
export default class App extends Component {
    render () {
        return (
            <Provider value = { options }>
                <Sheduler/>
            </Provider>
        );
    }
}
