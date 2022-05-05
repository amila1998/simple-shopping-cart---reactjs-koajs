import './app.css';
import { Header } from './components/header/Header';
import {BrowserRouter as Router, Routes} from 'react-router-dom';
import MainPages from './MainPages';
import { DataProvider } from './GlobalState';

const App = () =>{

  return (
    <div className='body'>
      <DataProvider>
        <Router>
          <header>
            <Header/>
          </header>
          <main>
           
              <MainPages/>
            
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