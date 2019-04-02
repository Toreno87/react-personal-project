//core
import React, { Component } from 'react';

// Cpmponents
import AddTask from 'components/AddTask';
import Task from 'components/Task';
import { Consumer } from 'components/HOC/withProfile';

export default class Board extends Component {
    render () {
        return (
            <Consumer>
                {(values) => (
                    <section>
                        <AddTask maxLengthInput = { values.maxLengthInput } />
                        <ul>
                            <Task
                                isDisabled = { values.maxLengthInput }
                                maxLengthInput = { values.maxLengthInput }
                                palleteBlue = { values.pallete.blue }
                                palleteWhite = { values.pallete.white }
                                toggleTaskCompletedState = { values.toggleTaskCompletedState }
                            />
                        </ul>
                    </section>
                )}
            </Consumer>
        );
    }
}
