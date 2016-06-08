package com.sd.resteasy;


import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import com.google.gson.Gson;

import br.com.quizEnsino.bd.IssueBD;
import br.com.quizEnsino.dto.IssueDTO;
import br.com.quizEnsino.model.Issue;

@Path("/issues")
public class IssueRest {
	

	@GET
	@Path("/get")
	@Produces(MediaType.APPLICATION_JSON)
	public Response get() {
			
		ResponseBuilder rb = null;
		
		try {
			
			IssueBD issueBD = new IssueBD();
			List<Issue> list = issueBD.listarTudo();
			int i = (int) ((int) list.size()*Math.random());
			
			Issue issue = list.get(i);
			
			IssueDTO issueResult = new IssueDTO(issue);
			
			rb = Response.ok(new Gson().toJson(SuccessResult.success(200, "ok", issueResult)), MediaType.APPLICATION_JSON);
			
			return rb.build();	
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return null;
	}

}
