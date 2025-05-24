package com.petersen.osystem.entities;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name= "tb_servico")
public class Servico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nomeCliente;

    @Temporal(TemporalType.DATE)
    private Date dataInicio;

    @Temporal(TemporalType.DATE)
    private Date dataTermino;
    @Column(columnDefinition = "TEXT")
    private String descricaoServico;
    private Double valorServico;
    private Double valorPago;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_servico")
    private TipoServico tipoServico;

    @Temporal(TemporalType.DATE)
    private Date dataPagamento;
    private Integer status;

    public Servico() {
    }

    public Servico(Long id, String nomeCliente, Date dataInicio, Date dataTermino, String descricaoServico, Double valorServico, Double valorPago, TipoServico tipoServico, Date dataPagamento, Integer status) {
        this.id = id;
        this.nomeCliente = nomeCliente;
        this.dataInicio = dataInicio;
        this.dataTermino = dataTermino;
        this.descricaoServico = descricaoServico;
        this.valorServico = valorServico;
        this.valorPago = valorPago;
        this.tipoServico = tipoServico;
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

    public Date getDataPagamento() {
        return dataPagamento;
    }

    public void setDataPagamento(Date dataPagamento) {
        this.dataPagamento = dataPagamento;
    }

    public PagamentoStatus getStatus() {
        return PagamentoStatus.valueOf(status);
    }

    public TipoServico getTipoServico() {
        return tipoServico;
    }

    public void setTipoServico(TipoServico tipoServico) {
        this.tipoServico = tipoServico;
    }

    public void setStatus(PagamentoStatus status) {
        if(status != null) {
            this.status = status.getCode();
        }
    }
}
