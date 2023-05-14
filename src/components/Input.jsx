import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAddTodo } from "../store/todoSlice"
import { nanoid } from "nanoid"




const Input = () => {
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef(null)
  const dispatch = useDispatch()
  const { todos } = useSelector(state => state)


  const handleInputChange = e => {
    setInputValue(e.target.value)
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(fetchAddTodo({ id: Math.random() + 10 * 15, title: inputValue, completed: false }))
    setInputValue('')
  }


  useEffect(() => {
    inputRef.current.focus()
  }, [todos])
  

  return (
    <section className="w-full flex flex-col justify-center gap-4 pt-6 px-2">
      
      <form className='w-full flex' onSubmit={handleSubmit}>
        <input ref={inputRef} type='text' value={inputValue} onChange={handleInputChange} placeholder='Enter your todo...' className="w-full px-3 py-4 outline-none border-none text-[1.1rem] rounded-sm" />
        <button className="bg-purple-600 px-4 text-white rounded-tr rounded-br transition-colors hover:bg-purple-700">Add</button>
      </form>

    </section>
  )
}

export default Input