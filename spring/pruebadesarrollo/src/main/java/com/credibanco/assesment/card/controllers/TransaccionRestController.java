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

import com.credibanco.assesment.card.model.Transaccion;
import com.credibanco.assesment.card.service.TransaccionService;

@CrossOrigin(origins= {"http://localhost:4200","*"})
@RestController
@RequestMapping("/api/pruebadesarrollo/transaccion")
public class TransaccionRestController {

	@Autowired
	private TransaccionService transaccionService;
	
	private final Logger log = LoggerFactory.getLogger(TransaccionRestController.class);
	
	//servicio que trae la lista de transacciones
	@GetMapping("/transaccion")
	public List<Transaccion> index (){
		return transaccionService.findAll();
	}
		
	//servicio que muestra una transaccion
	@GetMapping("/transaccion/{id}")
	public ResponseEntity<?> show(@PathVariable Long id) {
		
		Transaccion transaccionId=null;
		Map<String, Object> response = new HashMap<>();
		
		try { 
			transaccionId= transaccionService.findById(id);
		}catch(DataAccessException e) {
			response.put("mensaje", "Error al realizar la consulta en la base de datos!");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		
		if(transaccionId == null) {
		  response.put("mensaje", "La transaccion Id: ".concat(id.toString().concat(" no existe en la base de datos!"))); 	
		  return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Transaccion>(transaccionId, HttpStatus.OK); 		
	}
	
	//servicio que crea una transaccion
	@PostMapping("/transaccion")
	public ResponseEntity<?> create(@Validated @RequestBody Transaccion transaccionN, BindingResult result) {
		
		Transaccion transaccionNew= null;
		
		Map<String, Object> response = new HashMap<>();
		
		if(result.hasErrors()) {
			
			List<String> errors= result.getFieldErrors().stream().map(err ->
				"Campo: "+err.getField()+" "+err.getDefaultMessage()
			).collect(Collectors.toList());
			
			response.put("errors", errors);
		    return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}
		
		try { 
			
			transaccionNew= transaccionService.save(transaccionN);

		}catch(DataAccessException e) {
			response.put("mensaje", "Error al realizar el insert en la base de datos!");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("mensaje", "La transaccion ha sido creada con Exito!");
		response.put("transaccion", transaccionNew);
		return new ResponseEntity<Map<String, Object>> (response,HttpStatus.CREATED);
	}
	
	//servicio que actualiza una transaccion
	@PutMapping("/transaccion/{id}")
	public ResponseEntity<?>  update(@Validated @RequestBody Transaccion transaccion, BindingResult result, @PathVariable Long id) {
		Transaccion transaccionActual= transaccionService.findById(id);
		Transaccion transaccionUpdated = null;
		Map<String, Object> response = new HashMap<>();
		
		if(result.hasErrors()) {
			
			List<String> errors= result.getFieldErrors().stream().map(err ->
				"Campo: "+err.getField()+" "+err.getDefaultMessage()
			).collect(Collectors.toList());
			
			response.put("errors", errors);
		    return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}
		
		if(transaccionActual == null) {
			  response.put("mensaje", "Error, no se pudo editar, la transaccion ID: ".concat(id.toString().concat(" no existe en la base de datos!"))); 	
			  return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		try{
						
			transaccionActual.setDireccionCompra(transaccion.getDireccionCompra());
			transaccionActual.setEstado(transaccion.getEstado());
			transaccionActual.setNumeroReferencia(transaccion.getNumeroReferencia());
			transaccionActual.setTotalCompra(transaccion.getTotalCompra());
																	
			transaccionUpdated=transaccionService.save(transaccionActual);
		
		}catch(DataAccessException e) {
			response.put("mensaje", "Error al actualizar el estatus en la base de datos!");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("mensaje", "La transaccion ha sido actualizado con Exito!");
		response.put("transaccion", transaccionUpdated);
		return new ResponseEntity<Map<String, Object>> (response,HttpStatus.CREATED);
	}
	
	//servicio que elimina la transaccion
	@DeleteMapping("/transaccion/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {
		
		Map<String, Object> response = new HashMap<>();
		
		try{
			
			transaccionService.delete(id);
		}catch(DataAccessException e) {
			response.put("mensaje", "Error al eliminar la transaccion en la base de datos!");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("mensaje", "La transaccion ha sido eliminado con Exito!");
		return new ResponseEntity<Map<String, Object>> (response,HttpStatus.OK);
	}
	
}
