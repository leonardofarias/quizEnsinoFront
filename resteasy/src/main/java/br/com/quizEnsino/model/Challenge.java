/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.quizEnsino.model;

import java.util.List;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 *
 * @author MacLeo
 */
@Entity
@Table(name = "challenge")
public class Challenge {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_challenge")
    private Integer idChallenge;
    
    @Basic(optional = false)
    @Column(name = "player_one")
    private String playerOne;
    
    @Basic(optional = false)
    @Column(name = "player_two")
    private String playerTwo;
    
    @Basic(optional = false)
    @Column(name = "score_player_one")
    private Integer scorePlayerOne;
    
    @Basic(optional = false)
    @Column(name = "score_player_two")
    private Integer scorePlayerTwo;
    
    @OneToMany(mappedBy = "challenge")
    private List<StatisticsMultiPlayer> statisticsMultiPlayerList;
    
    public Challenge(){
        
    }

    /**
     * @return the idChallenge
     */
    public Integer getIdChallenge() {
        return idChallenge;
    }

    /**
     * @param idChallenge the idChallenge to set
     */
    public void setIdChallenge(Integer idChallenge) {
        this.idChallenge = idChallenge;
    }

    /**
     * @return the playerOne
     */
    public String getPlayerOne() {
        return playerOne;
    }

    /**
     * @param playerOne the playerOne to set
     */
    public void setPlayerOne(String playerOne) {
        this.playerOne = playerOne;
    }

    /**
     * @return the playerTwo
     */
    public String getPlayerTwo() {
        return playerTwo;
    }

    /**
     * @param playerTwo the playerTwo to set
     */
    public void setPlayerTwo(String playerTwo) {
        this.playerTwo = playerTwo;
    }

    /**
     * @return the scorePlayerOne
     */
    public Integer getScorePlayerOne() {
        return scorePlayerOne;
    }

    /**
     * @param scorePlayerOne the scorePlayerOne to set
     */
    public void setScorePlayerOne(Integer scorePlayerOne) {
        this.scorePlayerOne = scorePlayerOne;
    }

    /**
     * @return the scorePlayerTwo
     */
    public Integer getScorePlayerTwo() {
        return scorePlayerTwo;
    }

    /**
     * @param scorePlayerTwo the scorePlayerTwo to set
     */
    public void setScorePlayerTwo(Integer scorePlayerTwo) {
        this.scorePlayerTwo = scorePlayerTwo;
    }
    
}
