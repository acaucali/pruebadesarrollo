package com.credibanco.assesment.card.service.impl;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.credibanco.assesment.card.dao.TransaccionDao;
import com.credibanco.assesment.card.model.Transaccion;
import com.credibanco.assesment.card.service.TransaccionService;

@Service
public class TransaccionServiceImpl implements TransaccionService{

	@Autowired
	private TransaccionDao transaccionDao;
	
	@Override
	@Transactional(readOnly = true)
	public List<Transaccion> findAll() {
		return (List<Transaccion>) transaccionDao.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public Transaccion findById(Long id) {
		
		return transaccionDao.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public Transaccion save(Transaccion transaccion) {
		
		return transaccionDao.save(transaccion);
	}

	@Override
	@Transactional
	public void delete(Long id) {
		
		transaccionDao.deleteById(id);
	}
	
}
