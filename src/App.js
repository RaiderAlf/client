//IMPORTS
import './App.css';
import {Routes, Route} from 'react-router-dom'
//COMPONENTS
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import DetailsCard from './components/DetailsCard/DetailsCard';
import CreateDogs from './components/CreateDog/CreateDog';
import About from './components/About/About';


function App() {
  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/home' element={<Home />} />
        <Route path='/detail/:id' element={<DetailsCard />} />
        <Route path='/create' element={<CreateDogs/>} />
        <Route path='/about' element={<About />} />
      </Routes>

    </div>
  );
}

export default App;
