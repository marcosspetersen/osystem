import './styles.css';
import Logo from './logo.svg';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="main-navbar">
            
            <Link to="/" className="navbar-logo">
                <img className="navbar-logo" src={Logo} alt="logo pizzaria" />
            </Link>
        
            <Link to="/" className="logo-text" >
                
                <h2 className='nav-title'>
                    OSystem - Sitema de getão de Ordens de serviço
                </h2>
            </Link>
        </nav>
    )
}

export default Navbar;