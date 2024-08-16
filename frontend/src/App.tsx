
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddNote from './components/AddNote';

function App() {

  return (
    <>
      <Router>
          <Header/>
            <main className="min-h-screen my-32 ">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add-note" element={<AddNote />} />
              </Routes>
            </main>
          <Footer/>
      </Router>
      
    </>
  );
}

export default App;
