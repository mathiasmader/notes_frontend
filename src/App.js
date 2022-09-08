import './App.css';
import Header from "./components/Header"
import MainSection from './components/MainSection';

/**
 * Main Container 
 * @returns 
 */
function App() {
  return (
    <div className='min-h-screen'>
      <Header />
      <MainSection />
    </div>
  );
}

export default App;
