package com.petersen.osystem.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name= "servico")
@Data
public class Servico {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String nomeCliente;

    @Temporal(TemporalType.DATE)
    private Date dataInicio;

    @Temporal(TemporalType.DATE)
    private Date dataTermino;

    private String descricaoServico;
    private Double valorServico;
    private Double valorPago;

    @Temporal(TemporalType.DATE)
    private Double dataPagamento;
    private PagamentoStatus status;

    public Servico() {}

    public Servico(Long id, String nomeCliente, Date dataInicio, Date dataTermino, String descricaoServico,
                   Double valorservico, Double valorPago, Double dataPagamento, PagamentoStatus status) {
        this.id = id;
        this.nomeCliente = nomeCliente;
        this.dataInicio = dataInicio;
        this.dataTermino = dataTermino;
        this.descricaoServico = descricaoServico;
        this.valorServico = valorservico;
        this.valorPago = valorPago;
        this.dataPagamento = dataPagamento;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeCliente() {
        return nomeCliente;
    }

    public void setNomeCliente(String nomeCliente) {
        this.nomeCliente = nomeCliente;
    }

    public Date getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(Date dataInicio) {
        this.dataInicio = dataInicio;
    }

    public Date getDataTermino() {
        return dataTermino;
    }

    public void setDataTermino(Date dataTermino) {
        this.dataTermino = dataTermino;
    }

    public String getDescricaoServico() {
        return descricaoServico;
    }

    public void setDescricaoServico(String descricaoServico) {
        this.descricaoServico = descricaoServico;
    }

    public Double getValorServico() {
        return valorServico;
    }

    public void setValorServico(Double valorServico) {
        this.valorServico = valorServico;
    }

    public Double getValorPago() {
        return valorPago;
    }

    public void setValorPago(Double valorPago) {
        this.valorPago = valorPago;
    }

    public Double getDataPagamento() {
        return dataPagamento;
    }

    public void setDataPagamento(Double dataPagamento) {
        this.dataPagamento = dataPagamento;
    }

    public PagamentoStatus getStatus() {
        return status;
    }

    public void setStatus(PagamentoStatus status) {
        this.status = status;
    }
}
