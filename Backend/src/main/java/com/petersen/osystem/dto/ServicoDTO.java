package com.petersen.osystem.dto;

import com.petersen.osystem.entities.PagamentoStatus;
import com.petersen.osystem.entities.Servico;
import com.petersen.osystem.entities.TipoServico;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.*;

import java.util.Date;

public class ServicoDTO {

    private Long id;
    @Size(min = 3, max = 80, message = "Nome precisar ter de 3 a 80 caracteres")
    @NotBlank(message = "Campo requerido")
    private String nomeCliente;
    @NotNull
    @Temporal(TemporalType.DATE)
    private Date dataInicio;
    @Temporal(TemporalType.DATE)
    private Date dataTermino;
    @Size(min = 10, message = "Descrição precisa ter no mínimo 10 caracteres")
    @NotBlank(message = "Campo requerido")
    private String descricaoServico;
    @PositiveOrZero(message = "O preço deve ser positivo")
    private Double valorServico;
    @PositiveOrZero(message = "O preço deve ser positivo")
    private Double valorPago;
    private TipoServico tipoServico;
    @PastOrPresent
    @Temporal(TemporalType.DATE)
    private Date dataPagamento;
    private PagamentoStatus status;

    public  ServicoDTO() {
    }

    public ServicoDTO(Long id, String nomeCliente, Date dataInicio, Date dataTermino, String descricaoServico,
                      Double valorServico, Double valorPago, TipoServico tipoServico, Date dataPagamento, PagamentoStatus status) {
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

    public ServicoDTO(Servico entity) {
        id= entity.getId();
        nomeCliente= entity.getNomeCliente();
        dataInicio= entity.getDataInicio();
        dataTermino= entity.getDataTermino();
        descricaoServico= entity.getDescricaoServico();
        valorServico = entity.getValorServico();
        valorPago = entity.getValorPago();
        tipoServico = entity.getTipoServico();
        dataPagamento= entity.getDataPagamento();
        status = entity.getStatus();
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

    public void setNomeCliente (String nomeCliente) {
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

    public TipoServico getTipoServico() {
        return tipoServico;
    }

    public void setTipoServico(TipoServico tipoServico) {
        this.tipoServico = tipoServico;
    }

    public Date getDataPagamento() {
        return dataPagamento;
    }

    public void setDataPagamento(Date dataPagamento) {
        this.dataPagamento = dataPagamento;
    }

    public PagamentoStatus getStatus() {
        return status;
    }

    public void setStatus(PagamentoStatus status) {
        this.status = status;
    }
}
