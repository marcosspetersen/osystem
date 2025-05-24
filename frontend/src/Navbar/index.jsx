import './styles.css';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as NewKeyIcon } from '../key-svgrepo-com.svg';

function Navbar() {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    const handleScrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        const navbar = document.querySelector('.main-navbar');
        
        if (section && navbar) {
            const navbarHeight = navbar.offsetHeight;
            const sectionTop = section.getBoundingClientRect().top + window.scrollY;
            const scrollToPosition = sectionTop - navbarHeight;
            
            window.scrollTo({
                top: scrollToPosition,
                behavior: 'smooth'
            });
        } else if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="main-navbar">
            <div className="navbar-brand">
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
                    <NewKeyIcon className="navbar-icon custom-key-icon" />
                    <h1 className='navbar-title'>OSystem</h1>
                </Link>
            </div>
        
            <nav className="nav-links-wrapper">
                {isHomePage ? (
                    <a href="#servicos" onClick={(e) => { e.preventDefault(); handleScrollToSection('servicos'); }}>Nossos Serviços</a>
                ) : (
                    <Link to="/#servicos">Nossos Serviços</Link>
                )}
                {isHomePage ? (
                    <a href="#relatorios" onClick={(e) => { e.preventDefault(); handleScrollToSection('relatorios'); }}>Relatórios</a>
                ) : (
                    <Link to="/#relatorios">Relatórios</Link>
                )}
                {isHomePage ? (
                    <a href="#contato" onClick={(e) => { e.preventDefault(); handleScrollToSection('contato'); }}>Contato</a>
                ) : (
                    <Link to="/#contato">Contato</Link>
                )}
            </nav>
        </header>
    );
}

export default Navbar;