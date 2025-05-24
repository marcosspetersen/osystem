import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './Servicos.css';
import { API_URL } from '../api';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const initialServicoState = {
  nomeCliente: "", dataInicio: "",
  dataTermino: "", descricaoServico: "", valorServico: "", valorPago: "", dataPagamento: "", tipoServico: ""
};

// Lista de tipos de serviço
const tiposDeServicoDisponiveis = [
  { valor: "COPIA", nome: "Cópia de chaves" },
  { valor: "CODIFICACAO", nome: "Chaves codificadas" },
  { valor: "TROCA", nome: "Troca de fechaduras" },
  { valor: "ABERTURA", nome: "Abertura de portas" },
  { valor: "EMERGENCIA", nome: "Atendimento 24h" },
  // Adicione outros tipos conforme necessário
];

function Servicos() {
  const [servico, setServico] = useState(initialServicoState);
  const [servicos, setServicos] = useState([]);
  const [atualizar, setAtualizar] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingServico, setEditingServico] = useState(null);

  // Estados para paginação
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  // Estado para guardar o filtro de status ativo para a paginação
  const [activeStatusFilter, setActiveStatusFilter] = useState(null);

  const { tipoServico } = useParams();

  // Mapeamento de tipoServico para título da página
  const getPageTitle = () => {
    if (!tipoServico) return "Todos os Serviços";
    const titleMap = {
      COPIA: "Cópia de chaves",
      CODIFICACAO: "Chaves codificadas",
      TROCA: "Troca de fechaduras",
      ABERTURA: "Abertura de portas",
      EMERGENCIA: "Atendimento 24h",
    };
    return titleMap[tipoServico.toUpperCase()] || "Serviços"; // Fallback para "Serviços"
  };

  // Definir o titleMap fora para ser acessível no render do corpo da tabela também
  const titleMap = {
    COPIA: "Cópia de chaves",
    CODIFICACAO: "Chaves codificadas",
    TROCA: "Troca de fechaduras",
    ABERTURA: "Abertura de portas",
    EMERGENCIA: "Atendimento 24h",
  };

  // Função para carregar os serviços, agora reutilizável
  const loadServicos = (page = 0, status = activeStatusFilter, tipo = tipoServico) => {
    let url;
    if (status !== null) { // Se há um filtro de status ativo (ou sendo aplicado)
      url = `${API_URL}/servicos/payment?size=10&page=${page}&status=${status}`;
      if (tipo) {
        url += `&tipoServico=${tipo}`;
      }
    } else { // Sem filtro de status (carregamento inicial por tipo ou "Todos")
      url = `${API_URL}/servicos?size=10&page=${page}`;
      if (tipo) {
        url += `&tipoServico=${tipo}`;
      }
    }

    axios.get(url).then(result => {
      setServicos(result.data.content || []);
      setTotalPages(result.data.totalPages || 0);
      setCurrentPage(result.data.number || 0);
    }).catch(error => {
      console.error("Erro ao buscar serviços:", error);
      let backendMessage = 'Erro ao buscar serviços.'; // Default message
      if (error.response && error.response.data) {
        if (error.response.data.erros && error.response.data.erros.length > 0 && error.response.data.erros[0].message) {
          backendMessage = error.response.data.erros[0].message;
        } else if (error.response.data.message) {
          backendMessage = error.response.data.message;
        } else if (error.response.data.error) {
          backendMessage = error.response.data.error;
        }
      }
      toast.error(backendMessage);
      setServicos([]);
      setTotalPages(0);
      setCurrentPage(0);
    });
  };

  useEffect(() => {
    // Quando tipoServico muda, reseta o filtro de status e carrega a primeira página do novo tipo
    setActiveStatusFilter(null); // Reseta o filtro de status
    loadServicos(0, null, tipoServico);
  }, [tipoServico, atualizar]); // 'atualizar' pode ser usado para forçar recarga

  useEffect(() => {
    // Carrega os dados sempre que currentPage ou activeStatusFilter mudar, respeitando o tipoServico
    // Este useEffect secundário reage a mudanças de página ou de filtro de status explícito.
    // A carga inicial e a mudança de tipoServico são tratadas pelo useEffect acima.
    // Evitar chamar se tipoServico acabou de mudar e o useEffect acima já vai rodar.
    if (!tipoServico || activeStatusFilter !== null) { // Condição para evitar dupla chamada na mudança de tipoServico
        loadServicos(currentPage, activeStatusFilter, tipoServico);
    }
  }, [currentPage]); // Dependência principal para paginação
  
  // Este useEffect é para quando o activeStatusFilter muda E NÃO é uma mudança de tipoServico
  // que já reseta e carrega.
   useEffect(() => {
    if (activeStatusFilter !== null) { // Apenas se um filtro de status for explicitamente setado
        loadServicos(0, activeStatusFilter, tipoServico); // Sempre volta para a página 0 ao mudar filtro de status
    }
    // Se activeStatusFilter é null, a carga é gerenciada pelo primeiro useEffect (mudança de tipo) 
    // ou pelo findByAll (que também não seta activeStatusFilter)
  }, [activeStatusFilter]);

  function handleChange(event) {
    setServico({ ...servico, [event.target.name]: event.target.value });
  }

  function limparFormulario() {
    setServico(initialServicoState);
    setEditingServico(null);
  }

  function openModal(servicoParaEditar = null) {
    if (servicoParaEditar) {
      // Garante que o tipoServico seja uma string (valor do select), e não um objeto, se vier assim do backend
      const tipoServicoValor = typeof servicoParaEditar.tipoServico === 'object' && servicoParaEditar.tipoServico !== null 
                              ? servicoParaEditar.tipoServico.valor // Exemplo, ajuste se a estrutura do DTO for diferente
                              : servicoParaEditar.tipoServico;
      setEditingServico(servicoParaEditar);
      setServico({ ...servicoParaEditar, tipoServico: tipoServicoValor || "" });
    } else {
      limparFormulario();
      // Se estiver na rota /servicos (sem tipoServico na URL), o campo tipoServico no formulário começa vazio
      // Se estiver numa rota /servicos/tipo/:tipoServico, o tipo já é pré-definido e não deve ser alterado pelo usuário aqui (ou o select não apareceria)
      // No entanto, a lógica atual é para a rota /servicos, então o campo estará disponível
      setServico(prev => ({ ...prev, tipoServico: tipoServico ? tipoServico.toUpperCase() : "" }));
    }
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    limparFormulario();
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Validação para o campo tipoServico quando na rota /servicos
    if (!tipoServico && !servico.tipoServico) { // Verifica se não há tipo na URL e se nenhum tipo foi selecionado no formulário
        toast.error("O campo 'Tipos' é obrigatório.");
        return;
    }

    const metodo = editingServico ? 'put' : 'post';
    const url = editingServico ? `${API_URL}/servicos/${editingServico.id}` : `${API_URL}/servicos`;

    let dadosParaEnviar = { ...servico }; 

    if (metodo === 'post' && tipoServico) { // Se estiver numa rota de tipo específico (ex: /servicos/tipo/COPIA)
      dadosParaEnviar.tipoServico = tipoServico.toUpperCase(); 
    } else if (!tipoServico && servico.tipoServico) { // Se estiver na rota /servicos e um tipo foi selecionado no modal
      dadosParaEnviar.tipoServico = servico.tipoServico;
    }
    // Se for PUT, o servico.tipoServico já deve conter o valor correto do select ou o valor original

    axios[metodo](url, dadosParaEnviar) 
      .then(() => {
        toast.success(`Serviço ${editingServico ? 'atualizado' : 'cadastrado'} com sucesso!`);
        setAtualizar(prev => prev + 1); 
        closeModal();
      }).catch(error => {
        console.error("Erro ao salvar serviço:", error);
        let backendMessage = 'Erro ao ' + (editingServico ? 'atualizar' : 'cadastrar') + ' Serviço'; // Default message
        if (error.response && error.response.data) {
          if (error.response.data.erros && error.response.data.erros.length > 0 && error.response.data.erros[0].message) {
            backendMessage = error.response.data.erros[0].message;
          } else if (error.response.data.message) {
            backendMessage = error.response.data.message;
          } else if (error.response.data.error) {
            backendMessage = error.response.data.error;
          }
        }
        toast.error(backendMessage);
      });
  }

  function excluir(id) {
    if (window.confirm("Tem certeza que deseja excluir este serviço?")) {
      axios.delete(`${API_URL}/servicos/${id}`).then(() => {
        toast.success('Serviço excluído com sucesso!');
        setAtualizar(prev => prev + 1);
      }).catch(error => {
        console.error("Erro ao excluir serviço:", error);
        let backendMessage = 'Erro ao excluir serviço.'; // Default message
        if (error.response && error.response.data) {
          if (error.response.data.erros && error.response.data.erros.length > 0 && error.response.data.erros[0].message) {
            backendMessage = error.response.data.erros[0].message;
          } else if (error.response.data.message) {
            backendMessage = error.response.data.message;
          } else if (error.response.data.error) {
            backendMessage = error.response.data.error;
          }
        }
        toast.error(backendMessage);
    });
    }
  }

  function cancelarServico(id) {
    if (window.confirm("Tem certeza que deseja cancelar este serviço?")) {
      // A API esperava um corpo na requisição PUT para cancelar, vamos enviar o servico atual ou um objeto vazio
      // Idealmente, a API deveria apenas precisar do ID no path para cancelar.
      // Verifique se a API /servicos/canceled/{id} realmente precisa de um corpo.
      // Se não precisar, pode passar um objeto vazio: {}
      // Vou assumir que precisa de um objeto mínimo ou o próprio serviço.
      const servicoParaCancelar = servicos.find(s => s.id === id) || {};
      axios.put(`${API_URL}/servicos/canceled/${id}`, servicoParaCancelar).then(() => {
        toast.success('Serviço cancelado com sucesso!');
        setAtualizar(prev => prev + 1);
      }).catch(error => {
        console.error("Erro ao cancelar serviço:", error);
        let backendMessage = 'Erro ao cancelar serviço.'; // Default message
        if (error.response && error.response.data) {
          if (error.response.data.erros && error.response.data.erros.length > 0 && error.response.data.erros[0].message) {
            backendMessage = error.response.data.erros[0].message;
          } else if (error.response.data.message) {
            backendMessage = error.response.data.message;
          } else if (error.response.data.error) {
            backendMessage = error.response.data.error;
          }
        }
        toast.error(backendMessage);
    });
    }
  }

  function findByAll() {
    setActiveStatusFilter(null); // Limpa o filtro de status
    setCurrentPage(0); // Volta para a primeira página
    // A carga será feita pelo useEffect que observa tipoServico (se mudar) ou chamando loadServicos diretamente
    loadServicos(0, null, tipoServico); 
  }

  function findByPayment (number) {
    setActiveStatusFilter(number); // Define o filtro de status ativo
    setCurrentPage(0); // Volta para a primeira página ao aplicar novo filtro de status
    // A carga será feita pelo useEffect que observa activeStatusFilter
  }

  return (
    <div className="servicos-container">
      <div className="servicos-header">
        <h1>{getPageTitle()}</h1>
      </div>

      <div className="novo-servico-btn-container">
        <button onClick={() => openModal()} className="btn-novo-servico">Novo Serviço</button>
      </div>

      <div className="filtros" style={{ marginBottom: '20px' }}>
        <button onClick={findByAll} className="btn btn-primary" >Todos</button>
        <button onClick={() => findByPayment(1)} type="button" className="btn btn-primary" >Pendentes</button>
        <button onClick={() => findByPayment(2)} type="button" className="btn btn-primary" >Realizados</button>
        <button onClick={() => findByPayment(3)} type="button" className="btn btn-primary" >Cancelados</button>
        <button onClick={() => findByPayment(4)} type="button" className="btn btn-primary" >Parciais</button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Nome Cliente</th>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Valor Pago</th>
            <th>Status</th>
            {/* Coluna Tipo de Serviço condicional, renomeada para Tipos */}
            {!tipoServico && <th>Tipos</th>}
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {servicos.map(s => (
            <tr key={s.id}>
              <td>{s.nomeCliente}</td>
              <td>{s.descricaoServico}</td>
              <td>{s.valorServico ? parseFloat(s.valorServico).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '-'}</td>
              <td>{s.valorPago ? parseFloat(s.valorPago).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '-'}</td>
              <td>{s.status}</td>
              {/* Célula Tipos condicional - usando s.tipoServico diretamente */}
              {!tipoServico && 
                <td>
                  {s.tipoServico || '-'} {/* Exibe s.tipoServico diretamente ou '-' se for nulo/undefined */}
                </td>
              }
              <td>
                <button onClick={() => openModal(s)} className="btn btn-primary">Alterar</button>
                {s.status !== "CANCELADO" &&
                  <button onClick={() => cancelarServico(s.id)} className="btn btn-warning">Cancelar</button>
                }
                <button onClick={() => excluir(s.id)} className="btn btn-danger">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Controles de Paginação */}
      {totalPages > 0 && (
        <div className="paginacao-container">
          <button 
            onClick={() => setCurrentPage(prev => prev - 1)} 
            disabled={currentPage === 0}
            className="btn btn-secondary"
          >
            Anterior
          </button>
          <span>
            Página {currentPage + 1} de {totalPages}
          </span>
          <button 
            onClick={() => setCurrentPage(prev => prev + 1)} 
            disabled={currentPage >= totalPages - 1}
            className="btn btn-secondary"
          >
            Próxima
          </button>
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingServico ? 'Editar Serviço' : 'Cadastrar Novo Serviço'}</h2>
              <button onClick={closeModal} className="modal-close-btn">&times;</button>
            </div>
      <form onSubmit={handleSubmit}>
              <div className='form-group'>
            <label className='form-label'>Nome do Cliente</label>
            <input
              onChange={handleChange}
              value={servico.nomeCliente}
              name="nomeCliente" type="text"
              className='form-control'
                  required
            />
          </div>
              <div className='form-group'>
                <label className='form-label'>Data de Início</label>
            <input onChange={handleChange}
              value={servico.dataInicio}
              name="dataInicio"
              type="date"
              className='form-control'
                  required
            />
          </div>
              <div className='form-group'>
                <label className='form-label'>Data de Término</label>
                <input
                  onChange={handleChange}
                  value={servico.dataTermino}
                  name="dataTermino"
                  type="date"
                  className='form-control'
                />
              </div>
              <div className='form-group'>
                <label className='form-label'>Valor Serviço (R$)</label>
                <input
                  onChange={handleChange}
                  value={servico.valorServico || ""}
                  name="valorServico"
                  type="number"
                  step="0.01"
                  className='form-control'
                  required
                />
              </div>
              <div className='form-group'>
                <label className='form-label'>Valor Pago (R$)</label>
                <input
                  onChange={handleChange}
                  value={servico.valorPago || ""}
                  name="valorPago"
                  type="number"
                  step="0.01"
                  className='form-control'
                />
              </div>
              <div className='form-group'>
                <label className='form-label'>Data de Pagamento</label>
                <input
                  onChange={handleChange}
                  value={servico.dataPagamento || ""}
                  name="dataPagamento"
                  type="date"
                  className='form-control'
                />
              </div>

              {/* Campo de Seleção para Tipos - Mostrar apenas se não houver tipoServico na URL (rota /servicos) */}
              {!tipoServico && (
                <div className='form-group'>
                  <label className='form-label'>Tipo de Serviço</label>
                  <select name="tipoServico" value={servico.tipoServico} onChange={handleChange} className='form-control' required>
                    <option value="">Selecione um tipo</option>
                    {tiposDeServicoDisponiveis.map(tipo => (
                      <option key={tipo.valor} value={tipo.valor}>{tipo.nome}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className='form-group'>
                <label className='form-label'>Descrição do Serviço</label>
                <textarea
                  onChange={handleChange}
                  value={servico.descricaoServico}
                  name="descricaoServico"
                  className='form-control'
                  required
                ></textarea>
              </div>
              <div className="form-actions">
                <button type="button" onClick={closeModal} className="btn btn-secondary">Cancelar</button>
                <input type="submit" className='btn btn-success' value={editingServico ? 'Salvar Alterações' : 'Cadastrar'} />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Servicos;
