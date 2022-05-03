import './app.css';
import { Header } from './components/header/Header';
import {BrowserRouter as Router,Routes, Route, Navigate} from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import Items from './components/items/itemView/items';
import { NoItems } from './components/noItems/NoItems';

const App = () =>{
  const isLogged = false;
  const itemLength=0; 
  return (
    <div className='body'>
      <Router>
    <header>
      <Header/>
    </header>
    <main>
    
    <Routes>
    <Route path="/" element={itemLength==0?<NoItems/>:<Items/>} />
    <Route path="/authentication" element={isLogged ? <Navigate to="/"/> : <AuthLayout/>} />



    </Routes>
   
    
        
    </main>
    <footer>
        Copyright 2022 © IT20089436-SLIIT. All Rights Reserved.
    </footer>
    </Router>
    </div>
  )
}
export default App;