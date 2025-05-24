import React, { useEffect } from 'react';
import './Home.css'; // Importar o CSS específico da Home
import { Link, useLocation } from 'react-router-dom'; // Para links internos, se necessário e useLocation

function Home() {
  const location = useLocation();

  useEffect(() => {
    const handleScrollToSectionFromHash = () => {
      if (location.hash) {
        const sectionId = location.hash.substring(1); // Remove o '#'
        const section = document.getElementById(sectionId);
        const navbar = document.querySelector('.main-navbar');

        if (section) {
          // Pequeno atraso para garantir que o DOM está pronto, especialmente após um redirecionamento
          setTimeout(() => {
            if (navbar) {
              const navbarHeight = navbar.offsetHeight;
              const sectionTop = section.getBoundingClientRect().top + window.scrollY;
              const scrollToPosition = sectionTop - navbarHeight;
              window.scrollTo({
                top: scrollToPosition,
                behavior: 'smooth'
              });
            } else {
              section.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100); // 100ms de atraso, ajuste se necessário
        }
      }
    };

    handleScrollToSectionFromHash();
    // Adicionamos um listener para o evento popstate caso o usuário use os botões de voltar/avançar do navegador
    // e o hash mude dessa forma.
    window.addEventListener('popstate', handleScrollToSectionFromHash);

    return () => {
      window.removeEventListener('popstate', handleScrollToSectionFromHash);
    };

  }, [location.hash]); // Re-executa se o hash mudar

  return (
    <div className="home-container">
      <section id="servicos" className="servicos-section">
        <h2>Nossos Serviços</h2>
        <div className="servicos-grid">
          {/* Este card pode levar para a página /servicos com o grid completo */}
          <Link to="/servicos" className="servico-item" style={{ textDecoration: 'none' }}>
            <i className="fas fa-tools"></i> {/* Ícone genérico para a categoria */}
            <div className="servico-item-text">
              <strong>Ver todos os Serviços</strong>
              <p>Acesse nossa página de serviços para cadastrar e visualizar.</p>
            </div>
          </Link>
          {/* Outros cards de "serviços" como no Chaveiro João, mas como exemplos visuais */}
          <Link to="/servicos/tipo/COPIA" className="servico-item" style={{ textDecoration: 'none' }}>
            <i className="fas fa-key"></i>
            <div className="servico-item-text"><strong>Cópia de chaves</strong> Rápida e precisa, com garantia de funcionamento.</div>
          </Link>
          <Link to="/servicos/tipo/CODIFICACAO" className="servico-item" style={{ textDecoration: 'none' }}>
            <i className="fas fa-car"></i>
            <div className="servico-item-text"><strong>Chaves codificadas</strong> Especialistas em cópia e reprogramação.</div>
          </Link>
          <Link to="/servicos/tipo/TROCA" className="servico-item" style={{ textDecoration: 'none' }}>
            <i className="fas fa-lock"></i>
            <div className="servico-item-text"><strong>Troca de fechaduras</strong> Atualize sua segurança.</div>
          </Link>
          <Link to="/servicos/tipo/ABERTURA" className="servico-item" style={{ textDecoration: 'none' }}>
            <i className="fas fa-door-open"></i>
            <div className="servico-item-text"><strong>Abertura de portas</strong> Solução rápida sem danificar sua porta.</div>
          </Link>
          <Link to="/servicos/tipo/EMERGENCIA" className="servico-item" style={{ textDecoration: 'none' }}>
            <i className="fas fa-clock"></i>
            <div className="servico-item-text"><strong>Atendimento 24h</strong> Para emergencias a qualquer hora.</div>
          </Link>
        </div>
      </section>

      <section id="relatorios" className="organizacao-section">
        <h2>Relatórios</h2>
        <div className="organizacao-grid">
          <Link to="/relatorios/data-pagamento" className="org-item" style={{ textDecoration: 'none' }}>
            <i className="fas fa-calendar-alt"></i>
            <div className="org-item-text"><strong>Relatorio por Data de pagamento</strong></div>
          </Link>
          <Link to="/relatorios/pagamentos-pendentes" className="org-item" style={{ textDecoration: 'none' }}>
            <i className="fas fa-clipboard-list"></i>
            <div className="org-item-text"><strong>Relatorio pagamento pendentes</strong></div>
          </Link>
          <Link to="/relatorios/pagamento-parcial" className="org-item" style={{ textDecoration: 'none' }}>
            <i className="fas fa-adjust"></i> {/* Ícone sugestão, pode ser alterado */}
            <div className="org-item-text"><strong>Relatorio pagamento parcial</strong></div>
          </Link>
          <Link to="/relatorios/servicos-cancelados" className="org-item" style={{ textDecoration: 'none' }}>
            <i className="fas fa-times-circle"></i> {/* Ícone sugestão, pode ser alterado */}
            <div className="org-item-text"><strong>Relatorio Serviços cancelados</strong></div>
          </Link>
        </div>
      </section>

      <section className="cta">
        <h2>Soluções rápidas e seguras para você!</h2>
        <p>No <strong>OSystem</strong>, você encontra atendimento de qualidade, serviços ágeis e confiança de quem entende do assunto.</p>
        <a href="https://api.whatsapp.com/message/E6Y3FSVDAM5DM1?autoload=1&app_absent=0" target="_blank" rel="noopener noreferrer" className="botao">
          <i className="fab fa-whatsapp"></i> Fale conosco no WhatsApp
        </a>
      </section>

      <section id="contato" className="contato-section">
        <h2>Entre em Contato</h2>
        <p>
          <strong>Endereço:</strong> Av. dos Funcionários publicos, 123 – São Paulo, SP<br />
          <strong>Horário:</strong> Seg–Sex: 08h–18h / Sáb: 08h–13h
        </p>
        <div className="mapa">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3653.7000000000003!2d-46.7876807!3d-23.7318548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce4d9fbbef286f%3A0x3898b86b453a296a!2sAv.%20dos%20Funcion%C3%A1rios%20P%C3%BAblicos%2C%20123%20-%20Ch%C3%A1cara%20da%20Enseada%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2004965-140!5e0!3m2!1spt-BR!2sbr!4v1670000000000!5m2!1spt-BR!2sbr"
            allowFullScreen=""
            loading="lazy"
            title="Localização OSystem"
          ></iframe>
        </div>
      </section>
    </div>
  );
}

export default Home; 