import React from 'react';
import './Home.css'; // Reutilizar estilos da Home para a seção

function Contato() {
  return (
    <section id="contato" className="contato-section" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
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
      {/* Adicionar aqui o grid de conteúdo real quando desenvolver esta página */}
    </section>
  );
}

export default Contato; 