
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddNote from './components/AddNote';
import ChatBot from './components/ChatBot';
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
              <div className='fixed bottom-10 right-8 md:right-12'>
                <ChatBot />
              </div>
            </main>
          <Footer/>
      </Router>
      
    </>
  );
}

export default App;
