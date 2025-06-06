import React from 'react';
import './scss/app.scss'
import './App.css';
import { Routes, Route } from "react-router-dom";
import { Header } from './Components/Header';
import { Home } from './Pages/Home';
import { Cart } from './Pages/Cart';
import { NotFound } from './Pages/NotFound'


export const App: React.FC =()=> {
  const [searchValue, setSearchValue] = React.useState('')
  

  return (
    <div className="App">
      <div className="wrapper">
          <Header searchValue={searchValue } setSearchValue={setSearchValue}/>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home searchValue = {searchValue} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

        </div>
        
      </div>
    </div>
  );
}

// export default App;
