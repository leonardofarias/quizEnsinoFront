package com.sd.resteasy;


import java.io.IOException;

import javax.annotation.security.PermitAll;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.codehaus.jackson.map.DeserializationConfig;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.jboss.resteasy.annotations.GZIP;

import com.google.gson.Gson;
import com.google.gson.JsonParseException;

import br.com.quizEnsino.bd.IssueBD;
import br.com.quizEnsino.bd.PlayerBD;
import br.com.quizEnsino.bd.StatisticsOnePlayerBD;
import br.com.quizEnsino.model.Issue;
import br.com.quizEnsino.model.Player;
import br.com.quizEnsino.model.StatisticsOnePlayer;

@Path("/statistics-one-player")
public class StatisticsOnePlayerRest {

	@PUT
	@Path("/save")
	@Produces(MediaType.APPLICATION_JSON)
	public Response save(@QueryParam("idIssue") String idIssue,
			@QueryParam("namePlayer") String namePlayer, 
			@QueryParam("checkAnswer") String checkAnswer) {
			ResponseBuilder rb = null;
		
		try {
			
			Integer id = Integer.parseInt(idIssue);
			Boolean check = Boolean.parseBoolean(checkAnswer);
			
			PlayerBD playerBD = new PlayerBD();
			IssueBD issueBD = new IssueBD();
			StatisticsOnePlayerBD staBD = new StatisticsOnePlayerBD();
			
			Player player = playerBD.getByNamePlayer(namePlayer);
			Issue issue = issueBD.get(id);
			
			StatisticsOnePlayer statisticsOnePlayer = new StatisticsOnePlayer();
			statisticsOnePlayer.setPlayer(player);
			statisticsOnePlayer.setIssue(issue);
			statisticsOnePlayer.setCorrect(check);
			staBD.salvar(statisticsOnePlayer);
				
			rb = Response.ok(new Gson().toJson(SuccessResult.success(200, "ok")), MediaType.APPLICATION_JSON);
			
			return rb.build();	
		} catch (Exception e) {
			String msg = "Um erro inesperado aconteceu, sinto muito!";
		    rb = Response.status(500).entity(ErrorsResult.errors(500, msg));
		}
		return rb.build();
	}
	
	/*@GET
    @GZIP
    @PermitAll
    @Path("/get")
    @Produces("application/json")
	public Response get(@QueryParam("email") String email, 
			@QueryParam("password") String password) {
			ResponseBuilder rb = null;
		
		try {
			
			PlayerBD playerBD = new PlayerBD();
			Player player = playerBD.getUser(email, password);
			
			if(player != null){
				PlayerDTO playerResult = new PlayerDTO(player);				
				rb = Response.ok(new Gson().toJson(SuccessResult.success(200, "ok", playerResult)), MediaType.APPLICATION_JSON);
			}else{
				rb = Response.ok(new Gson().toJson(ErrorsResult.errors(500,"Usuário ou senha não encontrado." )), MediaType.APPLICATION_JSON);
			}
			
			return rb.build();	
		} catch (Exception e) {
			String msg = "Um erro inesperado aconteceu, sinto muito!";
		    rb = Response.status(500).entity(ErrorsResult.errors(500, msg));
		}
		return rb.build();
	}*/
	
	private StatisticsOnePlayer validate(String json) throws JsonParseException, JsonMappingException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		mapper.configure(DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		return mapper.readValue(json, StatisticsOnePlayer.class);
	}

}
