import React from 'react';
import { Link } from 'react-router-dom';

function BotaoChavesCodificadas() {
  return (
    <Link to="/servicos/tipo/CODIFICACAO" className="servico-item" style={{ textDecoration: 'none' }}>
      <i className="fas fa-car"></i>
      <div className="servico-item-text"><strong>Chaves codificadas</strong> Especialistas em cópia e reprogramação.</div>
    </Link>
  );
}

export default BotaoChavesCodificadas; 