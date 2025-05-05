import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoanCalculator from './components/loanCalculator';
import ErrorPage from './components/errorPage';
import ExchangeRate from './components/exchangeRate';
import About from './components/about';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoanCalculator />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/error" element={<ErrorPage />}/>
        <Route path="/live" element={<ExchangeRate />}/>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
