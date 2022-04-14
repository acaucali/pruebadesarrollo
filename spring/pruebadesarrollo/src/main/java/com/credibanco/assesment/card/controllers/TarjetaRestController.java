package com.credibanco.assesment.card.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.credibanco.assesment.card.model.Tarjeta;
import com.credibanco.assesment.card.service.TarjetaService;

@CrossOrigin(origins= {"http://localhost:4200","*"})
@RestController
@RequestMapping("/api/pruebadesarrollo/tarjeta")
public class TarjetaRestController {

	@Autowired
	private TarjetaService tarjetaService;
	
	private final Logger log = LoggerFactory.getLogger(TarjetaRestController.class);
	
	//servicio que trae la lista de tarjetas
	@GetMapping("/tarjeta")
	public List<Tarjeta> index (){
		return tarjetaService.findAll();
	}
		
	//servicio que muestra una tarjeta
	@GetMapping("/tarjeta/{id}")
	public ResponseEntity<?> show(@PathVariable Long id) {
		
		Tarjeta tarjetaId=null;
		Map<String, Object> response = new HashMap<>();
		
		try { 
			tarjetaId= tarjetaService.findById(id);
		}catch(DataAccessException e) {
			response.put("mensaje", "Error al realizar la consulta en la base de datos!");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		
		if(tarjetaId == null) {
		  response.put("mensaje", "La tarjeta Id: ".concat(id.toString().concat(" no existe en la base de datos!"))); 	
		  return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Tarjeta>(tarjetaId, HttpStatus.OK); 		
	}
	
	//servicio que crea una tarjeta
	@PostMapping("/tarjeta")
	public ResponseEntity<?> create(@Validated @RequestBody Tarjeta tarjetaN, BindingResult result) {
		
		Tarjeta tarjetaNew= null;
		
		Map<String, Object> response = new HashMap<>();
		
		if(result.hasErrors()) {
			
			List<String> errors= result.getFieldErrors().stream().map(err ->
				"Campo: "+err.getField()+" "+err.getDefaultMessage()
			).collect(Collectors.toList());
			
			response.put("errors", errors);
		    return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}
		
		try { 
			
			tarjetaNew= tarjetaService.save(tarjetaN);

		}catch(DataAccessException e) {
			response.put("mensaje", "Error al realizar el insert en la base de datos!");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("mensaje", "La tarjeta ha sido creada con Exito!");
		response.put("tarjeta", tarjetaNew);
		return new ResponseEntity<Map<String, Object>> (response,HttpStatus.CREATED);
	}
	
	//servicio que actualiza una tarjeta
	@PutMapping("/tarjeta/{id}")
	public ResponseEntity<?>  update(@Validated @RequestBody Tarjeta tarjeta, BindingResult result, @PathVariable Long id) {
		Tarjeta tarjetaActual= tarjetaService.findById(id);
		Tarjeta tarjetaUpdated = null;
		Map<String, Object> response = new HashMap<>();
		
		if(result.hasErrors()) {
			
			List<String> errors= result.getFieldErrors().stream().map(err ->
				"Campo: "+err.getField()+" "+err.getDefaultMessage()
			).collect(Collectors.toList());
			
			response.put("errors", errors);
		    return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}
		
		if(tarjetaActual == null) {
			  response.put("mensaje", "Error, no se pudo editar, la tarjeta ID: ".concat(id.toString().concat(" no existe en la base de datos!"))); 	
			  return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		try{
					
			tarjetaActual.setCedula(tarjeta.getCedula());
			tarjetaActual.setEstado(tarjeta.getEstado());
			tarjetaActual.setNumeroTarjeta(tarjeta.getNumeroTarjeta());
			tarjetaActual.setTelefono(tarjeta.getTelefono());
			tarjetaActual.setTipo(tarjeta.getTipo());
			tarjetaActual.setTitular(tarjeta.getTitular());
																	
			tarjetaUpdated=tarjetaService.save(tarjetaActual);
		
		}catch(DataAccessException e) {
			response.put("mensaje", "Error al actualizar el estatus en la base de datos!");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("mensaje", "La tarjeta ha sido actualizado con Exito!");
		response.put("tarjeta", tarjetaUpdated);
		return new ResponseEntity<Map<String, Object>> (response,HttpStatus.CREATED);
	}
	
	//servicio que elimina la tarjeta
	@DeleteMapping("/tarjeta/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {
		
		Map<String, Object> response = new HashMap<>();
		
		try{
			
			tarjetaService.delete(id);
		}catch(DataAccessException e) {
			response.put("mensaje", "Error al eliminar la tarjeta en la base de datos!");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("mensaje", "La tarjeta ha sido eliminada con Exito!");
		return new ResponseEntity<Map<String, Object>> (response,HttpStatus.OK);
	}
	
}
