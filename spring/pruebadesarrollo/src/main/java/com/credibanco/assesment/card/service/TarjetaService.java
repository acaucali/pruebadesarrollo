package com.credibanco.assesment.card.service;

import java.util.List;

import com.credibanco.assesment.card.model.Tarjeta;

public interface TarjetaService {
	
	public List<Tarjeta> findAll();	

	
	public Tarjeta findById(Long id);

	
	public Tarjeta save(Tarjeta tarjeta);
	
	
	public void delete(Long id);
	
}
