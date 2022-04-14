package com.credibanco.assesment.card.service;

import java.util.List;

import com.credibanco.assesment.card.model.Transaccion;

public interface TransaccionService {
	
	public List<Transaccion> findAll();	

	
	public Transaccion findById(Long id);

	
	public Transaccion save(Transaccion tarjeta);
	
	
	public void delete(Long id);
	
}
