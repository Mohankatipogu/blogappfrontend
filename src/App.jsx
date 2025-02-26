import './App.css';
import { Outlet } from 'react-router-dom';
import "./index.css"
import Footer from './features/crm/footer';
import Navbar from './features/crm/navbar/Navbar';
function App() {

  return (
    <div className={`container`}>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}

export default App;
