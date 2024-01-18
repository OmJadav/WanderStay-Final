import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as BrowserRouter, Routes, Route, link } from 'react-router-dom'
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import Profilescreen from './screens/Profilescreen';
import Adminscreen from './screens/Adminscreen';
import Landingscreen from './screens/Landingscreen';
import Footer from './components/Footer';
import HomescreenPage from './pages/HomescreenPage';
import BookingscreenPage from './pages/BookingscreenPage';
import ProfilescreenPage from './pages/ProfilescreenPage';
import AdminscreenPage from './pages/AdminscreenPage';
import Try from './components/Try';
function App() {
  return (
    <div className="App ">
      {/* <Navbar /> */}
      <BrowserRouter>
        <Routes>

          <Route path="/nav" exact Component={Navbar} />
          <Route path="/home" exact Component={HomescreenPage} />
          <Route path="/book/:roomid/:fromdate/:todate" exact Component={BookingscreenPage} />
          <Route path="/register" exact Component={Registerscreen} />
          <Route path="/login" exact Component={Loginscreen} />
          <Route path="/profile" exact Component={ProfilescreenPage} />
          <Route path="/admin" exact Component={AdminscreenPage} />
          <Route path="/" exact Component={Landingscreen} />
          <Route path="/try" exact Component={Try} />
        </Routes>

      </BrowserRouter>
      {/* <Footer /> */}

    </div>
  );
}

export default App;