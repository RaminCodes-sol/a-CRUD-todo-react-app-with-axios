import Input from "./components/Input"
import Todos from "./components/Todos"





const App = () => {

  return (
    <div id='app'>
      <div className="w-full max-w-[570px] mx-auto">
        <Input />
        <Todos />
      </div>
    </div>
  )
}

export default App
