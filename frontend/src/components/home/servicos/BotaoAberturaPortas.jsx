import React from 'react';
import { Link } from 'react-router-dom';

function BotaoAberturaPortas() {
  return (
    <Link to="/servicos/tipo/ABERTURA" className="servico-item" style={{ textDecoration: 'none' }}>
      <i className="fas fa-door-open"></i>
      <div className="servico-item-text"><strong>Abertura de portas</strong> Solução rápida sem danificar sua porta.</div>
    </Link>
  );
}

export default BotaoAberturaPortas; 