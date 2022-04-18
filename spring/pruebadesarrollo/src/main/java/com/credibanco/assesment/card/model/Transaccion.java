package com.credibanco.assesment.card.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="transaccion")
public class Transaccion implements Serializable{

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long transaccionId;
	
	@Column(nullable=true)
	private Long numeroReferencia; 
	
	@Column(nullable=true)
	private Double totalCompra; 
	
	@Column(nullable=true)
	private String direccionCompra; 
	
	@Column(nullable=true)
	private Byte estado; 
	
		
	public Long getTransaccionId() {
		return transaccionId;
	}

	public void setTransaccionId(Long transaccionId) {
		this.transaccionId = transaccionId;
	}

	public Long getNumeroReferencia() {
		return numeroReferencia;
	}

	public void setNumeroReferencia(Long numeroTarjeta) {
		this.numeroReferencia = numeroTarjeta;
	}

	public Double getTotalCompra() {
		return totalCompra;
	}

	public void setTotalCompra(Double totalCompra) {
		this.totalCompra = totalCompra;
	}

	public String getDireccionCompra() {
		return direccionCompra;
	}

	public void setDireccionCompra(String direccionCompra) {
		this.direccionCompra = direccionCompra;
	}

	public Byte getEstado() {
		return estado;
	}

	public void setEstado(Byte estado) {
		this.estado = estado;
	}


	private static final long serialVersionUID = 1L;
}
