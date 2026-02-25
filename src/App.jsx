import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Page/Signup.jsx";
import Login from "./Page/Login.jsx";
import AddProduct from "./Page/AddProducts.jsx";
import DisplayProduct from "./Page/DisplayProduct.jsx";
import Homepage from "./Page/Homepage.jsx";
import DisplayAllProducts from "./Page/DisplayProducts.jsx";
import Practice from "./Page/Practice.jsx"
function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />}>       
        </Route>
        <Route path="/login" element={<Login />}>      
        </Route>
        <Route path="/addproduct" element={<AddProduct />}></Route>
        <Route path="/displayproduct/:id" element={<DisplayProduct />}></Route>
        <Route path="/homepage" element={<Homepage />}></Route>
        <Route path="/displayallproducts" element={<DisplayAllProducts />}></Route>
        <Route path="/practice" element={<Practice />}></Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App;