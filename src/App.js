import { Route, Routes } from "react-router-dom";
import Components from "./components/Components";
const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Components />} />
    </Routes>
  )
}

export default App
