import './style/index.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './view/Home';
import Wallet from './view/Wallet';
import SetPassword from './view/SetPassword';
// import ProtectedRoute from './style/component/ProtectedRoute';

function App() {
  return (
    <div id='content' className="App">
        <BrowserRouter> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/set-password" element={<SetPassword />} />
            <Route path="/wallet" element={<Wallet />} />
            {/* <Route path="/wallet" element={<ProtectedRoute userInfo={!!sessionStorage.getItem('userInfo')} />}>
              <Route index element={<Wallet />} />
            </Route> */}
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
