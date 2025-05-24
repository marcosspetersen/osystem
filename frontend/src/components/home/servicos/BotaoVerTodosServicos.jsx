import React from 'react';
import { Link } from 'react-router-dom';

function BotaoVerTodosServicos() {
  return (
    <Link to="/servicos" className="servico-item" style={{ textDecoration: 'none' }}>
      <i className="fas fa-tools"></i>
      <div className="servico-item-text">
        <strong>Ver todos os Serviços</strong>
        <p>Acesse nossa página de serviços para cadastrar e visualizar.</p>
      </div>
    </Link>
  );
}

export default BotaoVerTodosServicos; 