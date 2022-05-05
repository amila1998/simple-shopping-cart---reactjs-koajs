import './app.css';
import { Header } from './components/header/Header';
import {BrowserRouter as Router,Routes, Route, Navigate} from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';

import { NoItems } from './components/noItems/NoItems';
import { DataProvider } from './GlobalState';
import Products from './components/products/Products';
import Cart from './components/cart/cart';
import DetailProduct from './components/detailProduct/DetailProduct';

const App = () =>{
  const isLogged = false;
  const itemLength=1; 
  return (
    <div className='body'>
      <DataProvider>
      <Router>
    <header>
      <Header/>
    </header>
    <main>
    
    <Routes>
    <Route path="/" element={<Products/>} />
    <Route path="/authentication" element={isLogged ? <Navigate to="/"/> : <AuthLayout/>} />
    <Route path="/cart" element={<Cart/>} />
    <Route path="/detail/:id" element={<DetailProduct/>} />


    </Routes>
   
    
        
    </main>
    <footer>
        Copyright 2022 © IT20089436-SLIIT. All Rights Reserved.
    </footer>
    </Router>
    </DataProvider>
    </div>
  )
}
export default App;