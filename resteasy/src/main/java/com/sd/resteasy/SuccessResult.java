package com.sd.resteasy;

import java.util.HashMap;
import java.util.Map;

/**
 * classe para formatar saida de erros para os servicos
 *
 * @author ccardozo
 *
 */
public class SuccessResult {

    /**
     * devolve um Map() representando um json erratico
     *
     * @param success
     * @param code
     * @param message
     * @return
     */
    public static Map<String, Object> success(int code, String message) {

	Map<String, Object> ret = new HashMap<String, Object>();
	Map<String, Object> erros = new HashMap<String, Object>();

	ret.put("success", true); // sempre true
	erros.put("code", code);
	erros.put("message", message);
	ret.put("data", erros);

	return ret;

    }

    /**
     * devolve um Map() representando um json erratico
     *
     * @param success
     * @param code
     * @param message
     * @return
     */
    public static Map<String, Object> success(int code, String message, String stackTrace) {

	Map<String, Object> ret = new HashMap<String, Object>();
	Map<String, Object> body = new HashMap<String, Object>();

	ret.put("success", true); // sempre true
	body.put("code", code);
	body.put("message", message);
	body.put("stack_trace", stackTrace);
	ret.put("data", body);

	return ret;
    }

    /**
     * devolve um Map() representando um json erratico
     *
     * @param success
     * @param code
     * @param message
     * @return
     */
    public static Map<String, Object> success(int code, String message, Object data) {

	Map<String, Object> ret = new HashMap<String, Object>();
	Map<String, Object> body = new HashMap<String, Object>();

	ret.put("success", true); // sempre true
	body.put("code", code);
	body.put("message", message);
	body.put("results", data);
	ret.put("data", body);

	return ret;
    }

    public static Map<String, Object> success(int code, String message, Integer id) {

	Map<String, Object> ret = new HashMap<String, Object>();
	Map<String, Object> body = new HashMap<String, Object>();

	ret.put("success", true); // sempre true
	body.put("code", code);
	body.put("message", message);
	body.put("id", id);
	ret.put("data", body);

	return ret;
    }

    public static Map<String, Object> success(int code, Object data) {

	Map<String, Object> ret = new HashMap<String, Object>();
	Map<String, Object> body = new HashMap<String, Object>();

	ret.put("success", true); // sempre true
	body.put("code", code);
	body.put("results", data);
	ret.put("data", body);

	return ret;
    }

}