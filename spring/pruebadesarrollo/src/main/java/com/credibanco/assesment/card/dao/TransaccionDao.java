package com.credibanco.assesment.card.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.credibanco.assesment.card.model.Transaccion;

public interface TransaccionDao extends JpaRepository<Transaccion, Long>{

}
