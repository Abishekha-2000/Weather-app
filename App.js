import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Weatherapp from './pages/Weatherapp';
import Location from './components/Location';
import Temperature from './components/Temperature';
import Middlebar from './components/Middlebar';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
     
      <Route path="/" element={<Weatherapp />} />
      <Route path="/bar" element={<Location />} />
      <Route path="/temp" element={<Temperature/>}  />
      <Route path="/middle" element={<Middlebar/>}/>


    </Routes>
    
    
    
    </BrowserRouter>
    
    
    
    
    </>
  );
}

export default App;
