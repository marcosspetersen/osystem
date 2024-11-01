package com.petersen.osystem.entities;

import com.petersen.osystem.services.exceptions.ResourceNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;

public enum PagamentoStatus {
    PEDENTE(1),
    REALIZADO(2),
    CANCELADO(3),
    PARCIAL(4);

    private int code;
    private PagamentoStatus(int code) {
        this.code = code;
    }
    public int getCode() {
        return code;
    }

    public static PagamentoStatus valueOf(int code) {
        for (PagamentoStatus value : PagamentoStatus.values()) {
            if (value.getCode() == code) {
                return value;
            }
        }
        throw new IllegalArgumentException("Argumento invalido");
    }
}
