import React from 'react';
import { Link } from 'react-router-dom';

function BotaoAtendimento24h() {
  return (
    <Link to="/servicos/tipo/EMERGENCIA" className="servico-item" style={{ textDecoration: 'none' }}>
      <i className="fas fa-clock"></i>
      <div className="servico-item-text"><strong>Atendimento 24h</strong> Para emergencias a qualquer hora.</div>
    </Link>
  );
}

export default BotaoAtendimento24h; 