import './App.css';
import Detail from './components/Detail';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie" element={<Detail />} />
            </Routes>
        </Router>
    );
}

export default App;
