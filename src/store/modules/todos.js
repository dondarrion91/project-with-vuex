import axios from "axios";

const state = {
    todos: [],
};

const getters = {
    allTodos: state => state.todos,
};

const actions = {
    async fetchTodos({ commit }) {
        const response = await axios.get(
            "https://jsonplaceholder.typicode.com/todos"
        );

        commit("setTodos", response.data);
    },
    async addTodo({ commit }, title) {
        const response = await axios.post(
            "https://jsonplaceholder.typicode.com/todos",
            { title, completed: false }
        );

        commit("newTodo", response.data);
    },
    async deleteTodo({ commit }, id) {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

        commit("removeTodo", id);
    },
    async filterTodos({ commit }, e) {
        // Get selected numbner
        const limit = parseInt(
            e.target.options[e.target.options.selectedIndex].value
        );

        const response = await axios.get(
            `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
        );

        commit("setTodos", response.data);
    },
    async completeTodo({ commit }, todo) {
        const response = await axios.put(
            "https://jsonplaceholder.typicode.com/todos/" + todo.id,
            {
                completed: !todo.completed,
            }
        );

        commit("completeTodo", response.data);
    },
};

const mutations = {
    setTodos: (state, todos) => (state.todos = todos),
    newTodo: (state, todo) => state.todos.unshift(todo),
    removeTodo: (state, id) =>
        (state.todos = state.todos.filter(todo => todo.id !== id)),
    completeTodo: (state, data) => {
        state.todos = state.todos.map(todo => {
            if (todo.id === data.id) {
                todo.completed = data.completed;
            }

            return todo;
        });
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
