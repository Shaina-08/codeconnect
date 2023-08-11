
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./Pages/Home"
import EditorPages from "./Pages/EditorPages"

function App() {


  return (
    <>
      <div>
        <Toaster position='bottom-right'
          toastOptions={{
            success: {
              theme: {
                primary: 'black',
              },
            },
          }}

        ></Toaster>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>

          </Route>
          <Route path='/editor/:roomId' element={<EditorPages />}>

          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
