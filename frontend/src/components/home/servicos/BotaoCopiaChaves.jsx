import React from 'react';
import { Link } from 'react-router-dom';

function BotaoCopiaChaves() {
  return (
    <Link to="/servicos/tipo/COPIA" className="servico-item" style={{ textDecoration: 'none' }}>
      <i className="fas fa-key"></i>
      <div className="servico-item-text"><strong>Cópia de chaves</strong> Rápida e precisa, com garantia de funcionamento.</div>
    </Link>
  );
}

export default BotaoCopiaChaves; 