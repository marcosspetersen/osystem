import React from 'react';
import './Home.css'; // Reutilizar estilos da Home para a seção

function Organizacao() {
  return (
    <section id="organizacao" className="organizacao-section" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <h2>Organização do Negócio</h2>
      <div className="organizacao-grid">
        <div className="org-item">
          <i className="fas fa-calendar-alt"></i>
          <div className="org-item-text">Agrupamento por data de entrega</div>
        </div>
        <div className="org-item">
          <i className="fas fa-clipboard-list"></i>
          <div className="org-item-text">Registro escrito de entrada e saída</div>
        </div>
      </div>
      {/* Adicionar aqui o grid de conteúdo real quando desenvolver esta página */}
    </section>
  );
}

export default Organizacao; 