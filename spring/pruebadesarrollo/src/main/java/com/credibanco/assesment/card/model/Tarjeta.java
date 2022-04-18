package com.credibanco.assesment.card.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="TARJETA")
public class Tarjeta implements Serializable{

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long tarjetaId;
	
	@Column(nullable=true)
	private Long numeroTarjeta; 

	@Column(nullable=true)
	private Integer numeroValidacion; 
	
	@Column(nullable=true)
	private String titular; 
	
	@Column(nullable=true)
	private Long cedula; 
	
	@Column(nullable=true)
	private Byte tipo; 
	
	@Column(nullable=true)
	private Long telefono; 
	
	@Column(nullable=true)
	private Byte estado; 
	
		
	public Long getTarjetaId() {
		return tarjetaId;
	}

	public void setTarjetaId(Long tarjetaId) {
		this.tarjetaId = tarjetaId;
	}

	public Long getNumeroTarjeta() {
		return numeroTarjeta;
	}

	public void setNumeroTarjeta(Long numeroTarjeta) {
		this.numeroTarjeta = numeroTarjeta;
	}

	public String getTitular() {
		return titular;
	}

	public void setTitular(String titular) {
		this.titular = titular;
	}

	public Long getCedula() {
		return cedula;
	}

	public void setCedula(Long cedula) {
		this.cedula = cedula;
	}

	public Byte getTipo() {
		return tipo;
	}

	public void setTipo(Byte tipo) {
		this.tipo = tipo;
	}

	public Long getTelefono() {
		return telefono;
	}

	public void setTelefono(Long telefono) {
		this.telefono = telefono;
	}

	public Byte getEstado() {
		return estado;
	}

	public void setEstado(Byte estado) {
		this.estado = estado;
	}
	
	public Integer getNumeroValidacion() {
		return numeroValidacion;
	}

	public void setNumeroValidacion(Integer numeroValidacion) {
		this.numeroValidacion = numeroValidacion;
	}



	private static final long serialVersionUID = 1L;
}
