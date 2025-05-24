import './App.css';
import RoutesComponent from './Routes';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';
import Footer from './Footer';

function App() {
  return (
    <>
      <Navbar />
      <div style={{ flex: '1 0 auto' }}>
        <RoutesComponent />
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
