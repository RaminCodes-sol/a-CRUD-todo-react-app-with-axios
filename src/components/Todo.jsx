import { BiEditAlt } from "react-icons/bi"
import { HiTrash } from "react-icons/hi"
import { fetchDeleteTodo, fetchEditTodo, fetchUpdateCompletedTodo } from "../store/todoSlice"
import { useRef, useState } from "react"
import { useDispatch } from "react-redux"



const Todo = ({ id, title, completed }) => {
    const [isEditable, setIsEditable] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const inputRef = useRef(null)
    const dispatch = useDispatch()


    /*---------Delete-Todo---------*/
    const deleteTodo = (id) => {
        dispatch(fetchDeleteTodo(id))
    }

    
    /*---------Complete-Todo---------*/
    const completeTodo = (id, completed) => {
        dispatch(fetchUpdateCompletedTodo({ id, completed: !completed }))
    }


    /*---------Edit-Todo---------*/
    const editTodo = (e, id) =>{
        e.preventDefault()
        if (inputValue === '') {
            return
        }
        if (isEditable) {
            dispatch(fetchEditTodo({ id, title: inputValue }))
            setInputValue('')
            setIsEditable(false)
        }
    }


    return (
        <li className="bg-purple-700 rounded text-white mb-2 px-3 py-3 grid">

            {/*----------Title-&-EditInput----------*/}
            <div>
                { 
                    isEditable 
                        ?
                            <form className="flex mb-6 lg:m-0" onSubmit={(e) => editTodo(e, id)}>
                                <input type='text' ref={inputRef} value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="new Text..." className="text-black px-2 py-[.6rem] text-l rounded-tl rounded-bl border-none outline-none" />
                                <button className="bg-[magenta] px-3 rounded-tr rounded-br">Edit</button>
                            </form> 
                        : 
                            <h3 className="mb-5">{title}</h3>
                }
            </div>
            
            {/*----------Action-Buttons----------*/}
            <div className="justify-self-end flex items-center gap-5">
                <input type='checkbox' checked={completed} onChange={() => completeTodo(id, completed)} className="w-[27px] h-[27px] cursor-pointer outline-none border-none"/>
                <button onClick={() =>{ 
                    setIsEditable(prevState => !prevState)
                    setInputValue(title)
                    inputRef.current?.focus()
                }} className="bg-[magenta] text-2xl p-[.1rem] rounded"><BiEditAlt /></button>
                <button onClick={() => deleteTodo(id)} className="bg-red-500 text-2xl p-[.1rem] rounded"><HiTrash /></button>
            </div>

        </li>
    )
}

export default Todo