import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './Servicos.css';
import { API_URL } from '../api';
import axios from 'axios';

function Servicos() {
  

  const [servico, setServico] = useState({
    nomeCliente: "", dataInicio: "",
    dataTermino: "", descricaoServico: "", valorServico: "", valorPago: "", dataPagamento: ""
  });
  const [servicos, setServicos] = useState([]);
  const [atualizar, setAtualizar] = useState();

  useEffect(() => {
    axios(`${API_URL}/servicos`).then(result => {
      setServicos(result.data.content);
    });
  }, [atualizar]);

  function handleChange(event) {
    setServico({ ...servico, [event.target.name]: event.target.value });
  }

  function limpar() {
    setServico ({
      nomeCliente: "", dataInicio: "", dataTermino: "",
      descricaoServico: "", valorServico: "", valorPago: "", dataPagamento: ""
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (servico.id === undefined) {
      axios.post(`${API_URL}/servicos`, servico)
        .then(result => {
          setAtualizar(result)
        }).catch(() => {
          toast.warning('Erro ao enviar Serviço');
        });
    } else {
      axios.put(`${API_URL}/servicos/${servico.id}`, servico)
        .then(result => {
          setAtualizar(result)
        }).catch(() => {
          toast.warning('Erro ao enviar Serviço');
        });
    }
    limpar();
  }

  function excluir(id) {
    axios.delete(`${API_URL}/servicos/${id}`).then(result => {
      setAtualizar(result)
    });
  }

  function cancelar(id, servico) {
    axios.put(`${API_URL}/servicos/canceled/${id}`, servico).then(result => {
      setAtualizar(result);
    });
  }

  function findByAll() {
    axios(`${API_URL}/servicos`).then(result => {
      setServicos(result.data.content);
    });
  }

  function findByPayment (number) {
    axios.get(`${API_URL}/servicos/payment?status=${number}`).then(result => {
      setServicos(result.data.content);
    });
  }

  return (
    <div className="container">
      <h1>Cadastro de Serviços</h1>
      <form onSubmit={handleSubmit}>
        <div className='col-6'>
          <div>
            <label className='form-label'>Nome do Cliente</label>
            <input
              onChange={handleChange}
              value={servico.nomeCliente}
              name="nomeCliente" type="text"
              className='form-control'
            />
          </div>
          <div>
            <label className='form-label'>Data de Inicio</label>
            <input onChange={handleChange}
              value={servico.dataInicio}
              name="dataInicio"
              type="date"
              className='form-control'
            />
          </div>
          <div>
            <label className='form-label'>Data de Término</label>
            <input
              onChange={handleChange}
              value={servico.dataTermino || ""}
              name="dataTermino" type="date"
              className='form-control'
            />
          </div>
          <div>
            <label className='form-label'>Descrição do Serviço</label>
            <input
              onChange={handleChange}
              value={servico.descricaoServico}
              name="descricaoServico"
              type="text"
              className='form-control'
            />
          </div>
          <div>
            <label className='form-label'>Valor Serviço</label>
            <input
              onChange={handleChange}
              value={servico.valorServico || ""}
              name="valorServico"
              type="number"
              className='form-control'
            />
          </div>
          <div>
            <label className='form-label'>Valor Pago</label>
            <input
              onChange={handleChange}
              value={servico.valorPago || ""}
              name="valorPago"
              type="number"
              className='form-control'
            />
          </div>
          <div>
            <label className='form-label'>Data de Pagamento</label>
            <input
              onChange={handleChange}
              value={servico.dataPagamento || ""}
              name="dataPagamento"
              type="date"
              className='form-control'
            />
          </div>

          <br />
          <input type="submit" className='btn btn-success' value="Cadastrar" />
          &nbsp;&nbsp;
          <button onClick={() => limpar} className="btn btn-secondary" >Limpar</button>
          &nbsp;&nbsp;
        </div>
      </form>
      

      <hr></hr>
      <hr></hr>
      
      <button onClick={() => findByAll()} class="btn btn-primary" >Todos</button>&nbsp;&nbsp;
      <button onClick={() => findByPayment(1)} type="button" class="btn btn-primary" >Pendentes</button>&nbsp;&nbsp;
      <button onClick={() => findByPayment(2)} type="button" class="btn btn-primary" >Realizados</button>&nbsp;&nbsp;
      <button onClick={() => findByPayment(3)} type="button" class="btn btn-primary" >Cancelados</button>&nbsp;&nbsp;
      <button onClick={() => findByPayment(4)} type="button" class="btn btn-primary" >Parciais</button>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Descrição</th>
            <th scope="col">Valor</th>
            <th scope="col">Status</th>
            <th scope="col">Opções</th>
          </tr>
        </thead>
        <tbody>
          {servicos.map(serv => (
            <tr key={serv.id}>
              <td>{serv.nomeCliente}</td>
              <td>{serv.descricaoServico}</td>
              <td>{serv.valorServico}</td>
              <td>{serv.status}</td>
              <td>
                {serv.status !== "CANCELADO" &&
                  <button onClick={() => setServico(serv)} className="btn btn-primary">Alterar</button>
                }
                &nbsp;&nbsp;
                {serv.status !== "CANCELADO" &&
                  <button onClick={() => cancelar(serv.id, serv)} className="btn btn-warning">Cancelar</button>
                }
                &nbsp;&nbsp;
                <button onClick={() => excluir(serv.id)} className="btn btn-danger">Excluir</button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
}

export default Servicos;
