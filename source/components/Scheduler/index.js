// Core
import React, { Component } from 'react';
import FlipMove from 'react-flip-move';

// Instruments
import Styles from './styles.m.css';
import { api } from '../../REST'; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')

// Cpmponents
import Checkbox from 'theme/assets/Checkbox';
import Spinner from 'components/Spinner';
import Task from 'components/Task';

export default class Scheduler extends Component {
    state = {
        tasks: [],
        isTasksFetching: false,
        newTaskMessage: '',
        tasksFilter: '',
        isTasksCompleted: false
    }

    componentDidMount () {
        this._fetchTasksAsync();
    }

    _updateTasksFilter = (event) => {
        const filter = event.target.value;

        this.setState({
            tasksFilter: filter.toLowerCase(),
        });
    }

    _getAllCompleted = (updatedTasks = null) => {
        const tasks = updatedTasks === null ? this.state.tasks : updatedTasks;

        return (
            tasks.every((task) => {

                return task.completed === true;
            })
        );
    }

    _setTasksFetchingState = (state) => {
        this.setState({
            isTasksFetching: state,
        });
    }

    _fetchTasksAsync = async () => {
        this._setTasksFetchingState(true);

        const tasks = await api.fetchTasks();

        this.setState({
            tasks,
            isTasksCompleted: this._getAllCompleted(tasks),
        });

        this._setTasksFetchingState(false);
    }

    _createTaskAsync = async (event) => {
        const { newTaskMessage } = this.state;

        event.preventDefault();

        if (newTaskMessage === '') {
            return null;
        }

        this._setTasksFetchingState(true);

        const task = await api.createTask(newTaskMessage);

        this.setState(({ tasks }) => ({
            tasks: [task, ...tasks],
            newTaskMessage: '',
            isTasksCompleted: false,
        }));

        this._setTasksFetchingState(false);
    }

    _updateTaskAsync = async (task) => {
        this._setTasksFetchingState(true);

        await api.updateTask(task);

        const { tasks } = this.state;

        tasks.forEach((currentTask) => {
            if (currentTask.id === task.id) {
                currentTask.completed = task.completed;
                currentTask.favorite = task.favorite;
                currentTask.message = task.message;
            }
        });

        this.setState({
            tasks,
            isTasksCompleted: this._getAllCompleted(tasks),
        });

        this._setTasksFetchingState(false);
    }

    _removeTaskAsync = async (id) => {
        this._setTasksFetchingState(true);

        const { tasks } = this.state;

        await api.removeTask(id);

        const updatedTasks = tasks.filter((task) => task.id !== id);

        this.setState({
            tasks: updatedTasks,
            isTasksCompleted: this._getAllCompleted(updatedTasks),
        });

        this._setTasksFetchingState(false);
    }

    _completeAllTasksAsync = async () => {
        this._setTasksFetchingState(true);

        const isTasksComplited = this._getAllCompleted();
        const { tasks } = this.state;

        if (isTasksComplited) {
            this._setTasksFetchingState(false);

            return null;
        }

        const notComplitedTask = [];

        tasks.map((task) => {
            if (!task.completed) {
                task.completed = !task.completed;

                notComplitedTask.push(task);
            }
        });

        await api.completeAllTasks(notComplitedTask);

        this.setState({
            tasks,
            isTasksCompleted: true,
        });

        this._setTasksFetchingState(false);
    }

    _updateNewTaskMessage = (event) => {
        this.setState({
            newTaskMessage: event.target.value,
        });
    }

    _submitOnEnter = (event) => {
        const enterKey = event.key === 'Enter';

        if (enterKey) {
            this._createTaskAsync(event);
        }
    }

    _sortTasks = (tasks) => {
        tasks.sort((prevTask, nextTask) => {
            const prevTaskCompleted = new Date(prevTask.created);
            const nextTaskCompleted  = new Date(nextTask.created);

            if (prevTaskCompleted < nextTaskCompleted) {
                return -1;
            }

            if (nextTaskCompleted > prevTaskCompleted) {
                return 1;
            }

            return 0;
        });

        tasks.sort((prevTask, nextTask) => {
            const prevTaskFavorite = prevTask.favorite;
            const nextTaskFavorite  = nextTask.favorite;

            if (prevTaskFavorite > nextTaskFavorite) {
                return -1;
            }

            if (nextTaskFavorite < prevTaskFavorite) {
                return 1;
            }

            return 0;
        });

        tasks.sort((prevTask, nextTask) => {
            const prevTaskCreated = prevTask.completed;
            const nextTaskCreated  = nextTask.completed;

            if (prevTaskCreated < nextTaskCreated) {
                return -1;
            }

            if (nextTaskCreated > prevTaskCreated) {
                return 1;
            }

            return 0;
        });

        return tasks;
    }

    render () {
        const { tasks, isTasksFetching, newTaskMessage, tasksFilter, isTasksCompleted } = this.state;
        const sortedTasks = this._sortTasks(tasks);

        const tasksJSX = sortedTasks.map((task) => {
            const { completed, favorite, id, message } = task;
            const regex = new RegExp(tasksFilter, 'i');

            if (task.message.search(regex) !== -1) {
                return (
                    <Task
                        _removeTaskAsync = { this._removeTaskAsync }
                        _updateTaskAsync = { this._updateTaskAsync }
                        completed = { completed }
                        favorite = { favorite }
                        id = { id }
                        key = { task.id }
                        message = { message }
                    />
                );
            }
        });

        return (
            <section className = { Styles.scheduler }>
                <Spinner isSpinning = { isTasksFetching } />
                <main>
                    <header>
                        <h1>
                            { `Планировщик задач` }
                        </h1>
                        <input
                            placeholder = { `Поиск` }
                            type = 'search'
                            onChange = { this._updateTasksFilter }
                            value = { tasksFilter }
                        />
                    </header>
                    <section>
                        <form onSubmit = { this._createTaskAsync }>
                            <input
                                className = { Styles.createTask }
                                maxLength = { 50 }
                                placeholder = { `Описaние моей новой задачи` }
                                type = 'text'
                                value = { newTaskMessage }
                                onChange = { this._updateNewTaskMessage }
                            />
                            <button>
                                { `Добавить задачу` }
                            </button>
                        </form>
                        <div className = { Styles.overlay }>
                            <ul>
                                <FlipMove
                                    delay = { 0 }
                                    disableAllAnimations = { false }
                                    duration = { 400 }
                                    easing = { "ease-in-out" }
                                    enterAnimation = { "elevator" }
                                    leaveAnimation = { "elevator" }
                                    maintainContainerHeight = { false }
                                    staggerDelayBy = { 0 }
                                    staggerDurationBy = { 0 }
                                    typeName = { "div" }
                                    verticalAlignment = { "top" }>
                                    { tasksJSX }
                                </FlipMove>
                            </ul>
                        </div>
                    </section>
                    <footer >
                        <Checkbox
                            checked = { isTasksCompleted }
                            color1 = { '#363636' }
                            color2 = { '#fff' }
                            height = { 25 }
                            onClick = { this._completeAllTasksAsync }
                            width = { 25 }
                        />
                        <span className = { Styles.completeAllTasks } >
                            { `Все задачи выполнены` }
                        </span>
                    </footer>
                </main>
            </section>
        );
    }
}
