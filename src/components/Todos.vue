<template>
    <div>
        <h3>Todos</h3>
        <div class="state-container">
            <span>Double click to mark as complete</span>
            <div><i class="fas fa-rectangle-landscape"></i> = Incomplete</div>
            <div><i class="fas fa-rectangle-landscape"></i> = Complete</div>
        </div>
        <div class="todos">
            <div
                v-for="todo in allTodos"
                :key="todo.id"
                class="todo"
                :class="stateClass(todo.completed)"
                @dblclick="completeTodo(todo)"
            >
                {{ todo.title }}
                <i @click="deleteTodo(todo.id)" class="fas fa-trash-alt"></i>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
    name: "Todos",
    methods: {
        ...mapActions(["fetchTodos", "deleteTodo", "completeTodo"]),
        stateClass(state) {
            if (state) {
                return "completed";
            }

            return "uncompleted";
        },
    },
    computed: mapGetters(["allTodos"]),
    created() {
        this.fetchTodos();
    },
};
</script>

<style scoped>
.todos {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
}

.todo {
    border: 1px solid #ccc;
    background: #41b883;
    padding: 1rem;
    border-radius: 5px;
    text-align: center;
    position: relative;
    cursor: pointer;
}

.fa-trash-alt {
    position: absolute;
    bottom: 10px;
    right: 10px;
    color: #fff;
    cursor: pointer;
}

.state-container {
    display: flex;
    justify-content: space-evenly;
    margin: 30px 10px;
}

.state-container i {
    width: 10px;
    height: 10px;
}

.state-container div:nth-child(3) i,
.completed {
    background: #091f15;
}

.state-container div:nth-child(2) i,
.uncompleted {
    background: #41b883;
}
</style>
