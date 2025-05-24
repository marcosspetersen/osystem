import React from 'react';
import { Link } from 'react-router-dom';

function BotaoTrocaFechaduras() {
  return (
    <Link to="/servicos/tipo/TROCA" className="servico-item" style={{ textDecoration: 'none' }}>
      <i className="fas fa-lock"></i>
      <div className="servico-item-text"><strong>Troca de fechaduras</strong> Atualize sua segurança.</div>
    </Link>
  );
}

export default BotaoTrocaFechaduras; 