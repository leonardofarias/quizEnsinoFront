package br.com.quizEnsino.dto;

import java.util.ArrayList;
import java.util.List;

import br.com.quizEnsino.model.Issue;
import br.com.quizEnsino.model.Option;;

public class IssueDTO {

	private Integer idIssue;
	private String area;
	private String answer;
	private String asking;
	private List<OptionDTO> optionList = new ArrayList<OptionDTO>();
	
	public IssueDTO(Issue issue){
		setIdIssue(issue.getIdIssue());
		setArea(issue.getArea());
		setAnswer(issue.getAnswer());
		setAsking(issue.getAsking());
		for(Option option : issue.getOptionList()){
			optionList.add(new OptionDTO(option));
		}
	}
	

	public Integer getIdIssue() {
		return idIssue;
	}

	public void setIdIssue(Integer idIssue) {
		this.idIssue = idIssue;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

	public String getAsking() {
		return asking;
	}

	public void setAsking(String asking) {
		this.asking = asking;
	}
	
	public List<OptionDTO> getOptionList() {
		return optionList;
	}
	
	
	public void setOptionList(List<OptionDTO> optionList) {
		this.optionList = optionList;
	}

}
