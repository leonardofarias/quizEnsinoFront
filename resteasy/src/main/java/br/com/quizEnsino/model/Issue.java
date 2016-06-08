/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.quizEnsino.model;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;


/**
 *
 * @author MacLeo
 */
@Entity
@Table(name = "issue")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Issue.findAll", query = "SELECT c FROM Issue c"),
    @NamedQuery(name = "Issue.findByIdIssue", query = "SELECT c FROM Issue c WHERE c.idIssue =:idIssue"),
    @NamedQuery(name = "Issue.findByArea", query = "SELECT c FROM Issue c WHERE c.area = :area")})
public class Issue implements Serializable {
    
	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_issue")
    private Integer idIssue;
    
    @Basic
    @Column(name = "area", nullable = false, length = 3)
    private String area;
    
    @Basic
    @Column(name = "answer", nullable = false, length = 1)
    private String answer;
    
    @Basic
    @Column(name = "asking", nullable = false, length = 10000)
    private String asking;
    
    @OneToMany(fetch = FetchType.EAGER,mappedBy = "issue")
    private List<Option> optionList;
    
    public Issue(){}

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

	public List<Option> getOptionList() {
		return optionList;
	}

	public void setOptionList(List<Option> optionList) {
		this.optionList = optionList;
	}
    
}
