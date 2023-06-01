import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import ChampList from './ChampList';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home';

function App() {

  return (
    <>
      <Router basename='/'>
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/champ-list' element={<ChampList />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;