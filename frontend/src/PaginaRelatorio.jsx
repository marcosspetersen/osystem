import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import './PaginaRelatorio.css'; // Criaremos este arquivo para estilos específicos
import { toast } from 'react-toastify';

function PaginaRelatorio() {
    const [dados, setDados] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const location = useLocation();
    const API_URL = process.env.REACT_APP_API_URL;

    const [colunas, setColunas] = useState([]);
    const [tituloPagina, setTituloPagina] = useState('');
    const [endpoint, setEndpoint] = useState('');

    useEffect(() => {
        if (location.pathname === '/relatorios/data-pagamento') {
            setTituloPagina('Relatório por Data de Pagamento');
            setColunas([
                { header: 'Nome Cliente', accessor: 'nomeCliente' },
                { header: 'Data Pagamento', accessor: 'dataPagamento', format: data => data ? new Date(data).toLocaleDateString() : '-' },
                { header: 'Valor', accessor: 'valorServico', format: valor => parseFloat(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) },
                { header: 'Valor Pago', accessor: 'valorPago', format: valor => valor ? parseFloat(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '-' },
                { header: 'Tipos', accessor: 'tipoServico' }
            ]);
            setEndpoint(`${API_URL}/servicos/payment?status=2&orderBy=dataPagamento`);
        } else if (location.pathname === '/relatorios/pagamentos-pendentes') {
            setTituloPagina('Relatório de Pagamentos Pendentes');
            setColunas([
                { header: 'Nome Cliente', accessor: 'nomeCliente' },
                { header: 'Data Início', accessor: 'dataInicio', format: data => data ? new Date(data).toLocaleDateString() : '-' },
                { header: 'Data Término', accessor: 'dataTermino', format: data => data ? new Date(data).toLocaleDateString() : '-' },
                { header: 'Valor', accessor: 'valorServico', format: valor => parseFloat(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) },
                { header: 'Tipos', accessor: 'tipoServico' }
            ]);
            setEndpoint(`${API_URL}/servicos/payment?status=1&orderBy=dataInicio`);
        } else if (location.pathname === '/relatorios/pagamento-parcial') {
            setTituloPagina('Relatório Pagamento Parcial');
            setColunas([
                { header: 'Nome Cliente', accessor: 'nomeCliente' },
                { header: 'Data Início', accessor: 'dataInicio', format: data => data ? new Date(data).toLocaleDateString() : '-' },
                { header: 'Data Término', accessor: 'dataTermino', format: data => data ? new Date(data).toLocaleDateString() : '-' },
                { header: 'Valor', accessor: 'valorServico', format: valor => parseFloat(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) },
                { header: 'Valor Pago', accessor: 'valorPago', format: valor => valor ? parseFloat(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '-' },
                { header: 'Tipos', accessor: 'tipoServico' }
            ]);
            setEndpoint(`${API_URL}/servicos/payment?status=4&orderBy=dataInicio`); // Usando orderBy=dataInicio como nos pendentes
        } else if (location.pathname === '/relatorios/servicos-cancelados') {
            setTituloPagina('Relatório Serviços Cancelados');
            setColunas([
                { header: 'Nome Cliente', accessor: 'nomeCliente' },
                { header: 'Descrição', accessor: 'descricaoServico' },
                { header: 'Data Início', accessor: 'dataInicio', format: data => data ? new Date(data).toLocaleDateString() : '-' },
                { header: 'Valor', accessor: 'valorServico', format: valor => parseFloat(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) },
                { header: 'Tipos', accessor: 'tipoServico' }
            ]);
            setEndpoint(`${API_URL}/servicos/payment?status=3&orderBy=dataInicio`);
        }
    }, [location.pathname, API_URL]);

    const carregarDados = useCallback(async (page = 0) => {
        if (!endpoint) return;

        const url = `${endpoint}&size=10&page=${page}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Falha ao buscar dados do relatório');
            }
            const data = await response.json();
            setDados(data.content || []);
            setTotalPages(data.totalPages || 0);
            setCurrentPage(data.number || 0);
        } catch (error) {
            console.error("Erro ao carregar dados do relatório:", error);
            toast.error(`Erro ao carregar relatório: ${error.message}`);
            setDados([]);
            setTotalPages(0);
            setCurrentPage(0);
        }
    }, [endpoint]);

    useEffect(() => {
        if (endpoint) {
            carregarDados(currentPage);
        }
    }, [carregarDados, currentPage, endpoint]);


    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="pagina-relatorio-container">
            <h1>{tituloPagina}</h1>
            {dados.length > 0 ? (
                <>
                    <table>
                        <thead>
                            <tr>
                                {colunas.map(col => <th key={col.accessor}>{col.header}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {dados.map((item, index) => (
                                <tr key={index}>
                                    {colunas.map(col => (
                                        <td key={col.accessor}>
                                            {col.format ? col.format(item[col.accessor]) : item[col.accessor] || '-'}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination-controls">
                        <button onClick={handlePreviousPage} disabled={currentPage === 0}>Anterior</button>
                        <span>{`Página ${currentPage + 1} de ${totalPages}`}</span>
                        <button onClick={handleNextPage} disabled={currentPage >= totalPages - 1}>Próxima</button>
                    </div>
                </>
            ) : (
                <p>Nenhum dado encontrado para este relatório.</p>
            )}
        </div>
    );
}

export default PaginaRelatorio;
