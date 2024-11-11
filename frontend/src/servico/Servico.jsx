import React, {useEffect, useState} from 'react';
import './Servico.css';

function Servico() {

    const [servico, setServico] = useState({nomeCliente:'', dataInicio:'', 
        dataTermino:'', descricaoServico:'', valorPago:'', dataPagamento:''});
    const [servicos, setServicos] = useState([]);

    function handleChange(event){ 
        setServico({...servico, [event.target.name]:event.target.value});
    }

    function handleSubmit(event){
        event.preventDefault();
        console.log(servico);
    }

  return (
    <div className="container">
      <h1>Cadastro de Serviços</h1>
      <form onSubmit={handleSubmit}>
        <div className='col-6'>
          <div>
            <label className='form-label'>Nome do Cliente</label>
            <input onChange={handleChange} value={servico.nomeCliente} name="nomeCliente" type="text" className='form-control'/>
          </div>
          <div>
            <label className='form-label'>Data de Inicio</label>
            <input onChange={handleChange} value={servico.dataInicio} name="dataInicio" type="date" className='form-control'/>
          </div>
          <div>
            <label className='form-label'>Data de Término</label>
            <input onChange={handleChange} value={servico.dataTermino} name="dataTermino" type="date" className='form-control'/>
          </div>
          <div>
            <label className='form-label'>Descrição do Serviço</label>
            <input onChange={handleChange} value={servico.descricaoServico} name="descricaoServico" type="text" className='form-control'/>
          </div>
          <div>
            <label className='form-label'>Valor Pago</label>
            <input onChange={handleChange} value={servico.valorPago} name="valorPago" type="number" className='form-control'/>
          </div>
          <div>
            <label className='form-label'>Data de Pagamento</label>
            <input onChange={handleChange} value={servico.dataPagamento} name="dataPagamento" type="date" className='form-control'/>
          </div>

          <br />  
          <input type="submit" className='btn btn-success' value="Cadastrar" />
        </div>
      </form>
    </div>
  );
}

export default Servico;
