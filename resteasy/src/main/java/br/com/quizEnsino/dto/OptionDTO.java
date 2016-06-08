package br.com.quizEnsino.dto;

import br.com.quizEnsino.model.Option;

public class OptionDTO {
	
    private Integer idOption;
    private String description;
    private String image; 

	public OptionDTO(Option option) {
		setIdOption(option.getIdOption());
		setDescription(option.getDescription());
		setImage(option.getImage());
	}

	public Integer getIdOption() {
		return idOption;
	}

	public void setIdOption(Integer idOption) {
		this.idOption = idOption;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

}
