// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';
import { api } from '../../REST'; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')

// Cpmponents
import Header from 'components/Header';
import Footer from 'components/Footer';
import Spinner from 'components/Spinner';
import AddTask from 'components/AddTask';
import Task from 'components/Task';
import { withProfile } from 'components/HOC/withProfile';

//Instruments
import { BaseTaskModel } from 'instruments';
import { delay } from 'q';

@withProfile
export default class Scheduler extends Component {
    state = {
        tasks: [
            {
                id: '1234',
                message: 'some text',
                completed: false,
                favorite: false,
            },
            {
                id: '14',
                message: 'hi!',
                completed: false,
                favorite: false,
            }
        ],
        isTaskFetching: false,
    }

    _setTaskFetchingState = (state) => {
        this.setState({
            isTaskFetching: state,
        });
    }

    _createTask = (message) => {
        this._setTaskFetchingState(true);
        const task = new BaseTaskModel();

        task.message = message;

        this.setState(({ tasks }) => ({
            tasks: [task, ...tasks],
            isTaskFetching: false,
        }));
    }

    _removeTask = (id) => {
        this._setTaskFetchingState(true);
        const tasks = this.state.tasks;

        const newTasks = tasks.filter((task) => task.id !== id);

        this.setState({
            tasks: newTasks,
            isTaskFetching: false,
        });
    }

    _complitedTask = (id) => {
        this._setTaskFetchingState(true);
        const tasks = this.state.tasks;

        const newTasks = tasks.map((task) => {
            if (task.id === id) {
                task.completed = true;
            }

            return task;
        });

        this.setState({
            tasks: newTasks,
            isTaskFetching: false,
        });
    }

    render () {
        const { tasks, isTaskFetching } = this.state;
        const { maxLengthInput } = this.props;

        const tasksJSX = tasks.map((task) => {
            return (
                <Task
                    _complitedTask = { this._complitedTask }
                    _removeTask = { this._removeTask }
                    key = { task.id }
                    { ...task }
                    { ...this.props }
                />
            );
        });

        return (
            <section className = { Styles.scheduler }>
                <main>
                    <Spinner isSpinning = { isTaskFetching } />
                    <Header />
                    <section>
                        <AddTask
                            maxLengthInput = { maxLengthInput }
                            _createTask = { this._createTask }
                        />
                        <ul>
                            { tasksJSX }
                        </ul>
                    </section>
                    <Footer />
                </main>
            </section>
        );
    }
}
