/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.quizEnsino.model;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author MacLeo
 */
@Entity
@Table(name = "statistics_one_player")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "StatisticsOnePlayer.findAll", query = "SELECT c FROM StatisticsOnePlayer c"),
    @NamedQuery(name = "StatisticsOnePlayer.findAnswersCorrect", query = "SELECT c FROM StatisticsOnePlayer c"
    		+ " where c.player =:player and c.correct =:correct")})
public class StatisticsOnePlayer implements Serializable {
    
	private static final long serialVersionUID = 1L;
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_oneplayer")
    private Integer idOnePlayer;
	
	@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_player", nullable = false)
    private Player player;
    
	@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_issue", nullable = false)
    private Issue issue;

	@Basic(optional = false)
    @Column(name = "correct")
    private Boolean correct;
    
    public StatisticsOnePlayer(){
        
    }   
    
    public Integer getIdOnePlayer() {
		return idOnePlayer;
	}

	public void setIdOnePlayer(Integer idOnePlayer) {
		this.idOnePlayer = idOnePlayer;
	}



	public Player getPlayer() {
		return player;
	}

	public void setPlayer(Player player) {
		this.player = player;
	}

	public Issue getIssue() {
		return issue;
	}

	public void setIssue(Issue issue) {
		this.issue = issue;
	}

	/**
     * @return the correct
     */
    public Boolean getCorrect() {
        return correct;
    }

    /**
     * @param correct the correct to set
     */
    public void setCorrect(Boolean correct) {
        this.correct = correct;
    }
    
}
