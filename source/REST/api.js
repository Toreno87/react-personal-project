import { MAIN_URL, TOKEN } from './';
import { resolve } from 'q';

export const api = {
    fetchTasks: async () => {
        const responce = await fetch(MAIN_URL, {
            method: 'GET',
            headers: {
                Authorization: TOKEN,
            },
        });

        if (responce.status === 200) {
            const { data } = await responce.json();

            return data;
        }
    },

    createTask: async (message) => {
        const responce = await fetch(MAIN_URL, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization: TOKEN,
            },
            body: JSON.stringify({ message }),
        });

        if (responce.status === 200) {
            const { data } = await responce.json();

            return data;
        }

    },

    updateTask: async (task) => {
        const responce = await fetch(MAIN_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: TOKEN,
            },
            body: JSON.stringify([task]),
        });

        if (responce.status === 200) {
            const { data } = await responce.json();

            return data;
        }
    },

    removeTask: async (id) => {
        await fetch(`${MAIN_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: TOKEN,
            },
        });
    },

    completeAllTasks: async (tasks) => {
        const fetchedTasks = [];

        tasks.map(async (task) => {
            const responce = await api.updateTask(task);

            fetchedTasks.push(responce);
        });

        await Promise.all(fetchedTasks)
            .then()
            .catch((error) => {
                console.log('error', error);
            });
    },
};
