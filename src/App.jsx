import './App.css';
import { Outlet } from 'react-router-dom';
import "./index.css"
function App() {

  return (
    <div className={`container`}>
      {/* <Navbar></Navbar> */}
      <Outlet></Outlet>
    </div>
  )
}

export default App;
