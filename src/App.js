import './CSS/App.css';
import './CSS/Scrollable.css';
import './CSS/Nav.css';
import './CSS/MoreInfo.css';
import './CSS/LaneIcons.css';
import './CSS/DescSection.css';
import './CSS/PieChart.css';
import './CSS/Table.css';
import './CSS/ScrollArrows.css';
import 'bootstrap/dist/css/bootstrap.css';
import ChampList from './Components/ChampList';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import { useState } from 'react';
import SelectedChamp from './Components/SelectedChamp/SelectedChamp';

function App() {

  const [champ, setChamp] = useState(null);
  const [data, setData] = useState([]);

  return (
    <>
      <Router basename='/'>
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/champ-list' element={<ChampList champ={champ} setChamp={setChamp} data={data} setData={setData} />} />
        <Route path='/selected-champ' element={<SelectedChamp champ={champ} setChamp={setChamp} setData={setData} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;