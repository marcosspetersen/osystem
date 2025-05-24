import './styles.css';

function Footer() {
    // O ano dinâmico pode ser mantido ou removido dependendo da preferência.
    // const currentYear = new Date().getFullYear();
    return (
        <footer className="main-footer">
            <p className="footer-text">
                {/* Texto do Chaveiro João */}
                &copy; UNIVESP PI III 2025 OSystem. Todos os direitos reservados.
                {/* Alternativamente, para manter o ano dinâmico:
                &copy; OSystem {currentYear}. Todos os direitos reservados.
                */}
            </p>
            {/* Você pode adicionar mais links ou informações aqui, se necessário */}
            {/* Exemplo:
            <p className="footer-text">
                <Link to="/termos" className="footer-link">Termos de Serviço</Link> | 
                <Link to="/privacidade" className="footer-link">Política de Privacidade</Link>
            </p>
            */}
        </footer>
    );
}

export default Footer;