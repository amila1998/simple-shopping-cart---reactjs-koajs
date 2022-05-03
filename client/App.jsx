import './app.css';
import { Header } from './components/header/Header';
import Register from './components/register/Register';

const App = () =>{
  return (
    <div className='body'>
    <header>
      <Header/>
    </header>
    <main>
        <Register/>
    </main>
    <footer>
        Copyright 2022 © IT20089436-SLIIT. All Rights Reserved.
    </footer>

    </div>
  )
}
export default App;