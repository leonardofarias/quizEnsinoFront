package br.com.quizEnsino.dto;

import br.com.quizEnsino.model.Player;

public class PlayerDTO {
	
    private String email;
    private String password;
    private String namePlayer;
    
    public PlayerDTO(Player player){
    	setEmail(player.getEmail());
    	setNamePlayer(player.getNamePlayer());
    }

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getNamePlayer() {
		return namePlayer;
	}

	public void setNamePlayer(String namePlayer) {
		this.namePlayer = namePlayer;
	}

}
