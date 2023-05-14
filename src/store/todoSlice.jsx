import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'




axios.defaults.baseURL = 'http://localhost:3000'


/*----------Fetch-Todos-Data----------*/
export const fetchTodoData = createAsyncThunk(
    'todo/fetchTodoData',
    async () => {
        await new Promise(resolve => setTimeout(resolve, 400))
        const response = await axios.get('/todos')
        return response.data
    }
)

/*----------Fetch-Add-Todo----------*/
export const fetchAddTodo = createAsyncThunk(
    'todo/fetchAddTodo',
    async (newTodo) => {
        await new Promise(resolve => setTimeout(resolve, 300))
        const response = await axios.post('/todos', newTodo)
        return response.data
    }
)

/*----------Fetch-Delete-Todo----------*/
export const fetchDeleteTodo = createAsyncThunk(
    'todo/fetchDeleteTodo',
    async (id) => {
        await new Promise(resolve => setTimeout(resolve, 300))
        await axios.delete(`/todos/${id}`)
        return id
    }
)

/*----------Fetch-Update-Completed-Todo----------*/
export const fetchUpdateCompletedTodo = createAsyncThunk(
    'todo/fetchUpdateCompletedTodo',
    async ({ id, completed }) => {
        await new Promise(resolve => setTimeout(resolve, 300))
        const response = await axios.patch(`/todos/${id}`, { completed })
        return response.data
    }
)

/*----------Fetch-Edit-Todo----------*/
export const fetchEditTodo = createAsyncThunk(
    'todo/fetchEditTodo',
    async ({ id, title }) => {
        await new Promise(resolve => setTimeout(resolve, 300))
        const response = await axios.patch(`/todos/${id}`, { title })
        return response.data
    }
)



/*----------Initial-State----------*/
const initialState = {
    todos: [],
    loading: false,
    updating: false
}


const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {

        /*--------Get-Todos--------*/
        builder
            .addCase(fetchTodoData.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchTodoData.fulfilled, (state, { payload }) => {
                state.loading = false
                state.todos = payload
            })


        /*--------Add-Todo--------*/
        builder
            .addCase(fetchAddTodo.pending, (state) => {
                state.updating = true
            })
            .addCase(fetchAddTodo.fulfilled, (state, { payload }) => {
                state.updating = false
                state.todos = [payload, ...state.todos]
            })


        /*--------Delete-Todo--------*/
        builder
            .addCase(fetchDeleteTodo.pending, (state) => {
                state.updating = true
            })
            .addCase(fetchDeleteTodo.fulfilled, (state, { payload }) => {
                state.updating = false
                state.todos = state.todos.filter(todo => todo.id !== payload)
            })


        /*--------Update-Completed-Todo--------*/
        builder
            .addCase(fetchUpdateCompletedTodo.pending, (state) => {
                state.updating = true
            })
            .addCase(fetchUpdateCompletedTodo.fulfilled, (state, { payload }) => {
                state.updating = false 
                state.todos = state.todos.map(todo => {
                    if (todo.id === payload.id) {
                        return {
                            ...todo,
                            completed: payload.completed
                        }
                    }
                    return todo
                })
            })
        

        /*-------Edit-Todo--------*/
        builder
            .addCase(fetchEditTodo.pending, (state) => {
                state.updating = true
            })
            .addCase(fetchEditTodo.fulfilled, (state, { payload }) => {
                state.updating = false
                state.todos = state.todos.map(todo => {
                    if (todo.id === payload.id) {
                        return {
                            ...todo,
                            title: payload.title
                        }
                    }
                    return todo
                })
            })
    }
})

export default todoSlice.reducer