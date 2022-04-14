package com.credibanco.assesment.card.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.credibanco.assesment.card.dao.TarjetaDao;
import com.credibanco.assesment.card.model.Tarjeta;
import com.credibanco.assesment.card.service.TarjetaService;

@Service
public class TarjetaServiceImpl implements TarjetaService{

	@Autowired
	private TarjetaDao tarjetaDao;
	
	@Override
	@Transactional(readOnly = true)
	public List<Tarjeta> findAll() {
		return (List<Tarjeta>) tarjetaDao.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public Tarjeta findById(Long id) {
		
		return tarjetaDao.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public Tarjeta save(Tarjeta tarjeta) {
		
		return tarjetaDao.save(tarjeta);
	}

	@Override
	@Transactional
	public void delete(Long id) {
		
		tarjetaDao.deleteById(id);
	}
	
}
