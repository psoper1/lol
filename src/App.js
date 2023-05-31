import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [data, setData] = useState([]);
  const apiChamps = 'http://127.0.0.1:8000/champs/';
  // const imageURL = `${'http://127.0.0.1:8000/'}${champ.image}`;

  useEffect(() => {
    fetch(apiChamps)
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error(error);
      })
  }, []);  

  return (
    <div>
      {/* Use the `data` state in your component */}
      {data.map(item => (
        <div key={item.id}>
          <h2>{item.name}</h2>
          <p>Age: {item.age}</p>
          <img src={item.image} alt='champ-icon'/>
          {/* Render other data properties */}
        </div>
      ))}
    </div>
  );
}

export default App;
