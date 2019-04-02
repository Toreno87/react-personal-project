//Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';

//Components
import Checkbox from 'theme/assets/Checkbox';
import { Consumer } from 'components/HOC/withProfile';

export default class Footer extends Component {
    render () {
        return (
            <Consumer>
                {(values) => (
                    <footer >
                        <Checkbox
                            inlineBlock
                            checked = { values.toggleTaskCompletedState }
                            className = { Styles.toggleTaskCompletedState }
                            color1 = { values.pallete.dark }
                            color2 = { values.pallete.white }
                        />
                        <span className = { Styles.completeAllTasks } >
                            { `Все задачи выполнены` }
                        </span>
                    </footer>
                )}
            </Consumer>
        );
    }
}
