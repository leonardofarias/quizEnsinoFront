package com.sd.resteasy;

import java.util.HashMap;
import java.util.Map;

/**
 * classe para formatar saida de erros para os servicos
 * @author ccardozo
 *
 */
public class ErrorsResult {
	
	/**
	 * devolve um Map() representando um json erratico
	 * @param success always false
	 * @param code
	 * @param message
	 * @return
	 */
	public static Map<String, Object> errors(boolean success, int code, String message) {
		
		Map<String, Object> ret = new HashMap<String, Object>();
		Map<String, Object> erros = new HashMap<String, Object>();
		
		ret.put("success", success);
		erros.put("code", code);
		erros.put("message", message);
		ret.put("error", erros);
		
		return ret;
		
	}
	
	/**
	 * uma sobrecarga pra quem nao quiser informar treu/false
	 * @param code
	 * @param message
	 * @return
	 */
	public static Map<String, Object> errors(int code, String message) {
		
		Map<String, Object> ret = new HashMap<String, Object>();
		Map<String, Object> erros = new HashMap<String, Object>();
		
		ret.put("success", false); // sempre setado false
		erros.put("code", code);
		erros.put("message", message);
		ret.put("error", erros);
		
		return ret;

		
	}

	/**
	 * uma sobrecarga pra quem nao quiser informar treu/false
	 * @param code
	 * @param message
	 * @return
	 */
	public static Map<String, Object> errors(int code, String message, String stackTrace) {
		
		Map<String, Object> ret = new HashMap<String, Object>();
		Map<String, Object> erros = new HashMap<String, Object>();
		
		ret.put("success", false); // sempre setado false
		erros.put("code", code);
		erros.put("message", message);
		erros.put("stack_trace", stackTrace);
		ret.put("error", erros);
		
		return ret;
	}
}