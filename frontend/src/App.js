import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';
import Items from './components/items';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Learning react</h1>
        <Navbar num="3"/>
      </header>
    </div>
  );
}

export default App;
