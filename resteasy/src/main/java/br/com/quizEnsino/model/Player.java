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
@Table(name = "player")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Player.findAll", query = "SELECT c FROM Player c"),
    @NamedQuery(name = "Player.findByUser", query = "SELECT c FROM Player c WHERE c.email =:email "
    		+ "and c.password =:password"),
    @NamedQuery(name = "Player.findByNamePlayer", query = "SELECT c FROM Player c WHERE c.namePlayer =:namePlayer"),
    @NamedQuery(name = "Player.findByEmail", query = "SELECT c FROM Player c WHERE c.email =:email")})
public class Player implements Serializable {
    
	private static final long serialVersionUID = 1L;

	@Id
    @Basic(optional = false)
    @Column(name = "email")
    private String email;
    
    @Basic(optional = false)
    @Column(name = "password")
    private String password;
    
    @Basic(optional = false)
    @Column(name = "namePlayer")
    private String namePlayer;
    
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "player")
    private List<StatisticsOnePlayer> statisticsOnePlayerList;
    
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "player")
    private List<StatisticsMultiPlayer> statisticsMultiPlayerList;
    
    public Player(){
        
    }

    /**
     * @return the email
     */
    public String getEmail() {
        return email;
    }

    /**
     * @param email the email to set
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * @return the password
     */
    public String getPassword() {
        return password;
    }

    /**
     * @param password the password to set
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * @return the namePlayer
     */
    public String getNamePlayer() {
        return namePlayer;
    }

    /**
     * @param namePlayer the namePlayer to set
     */
    public void setNamePlayer(String namePlayer) {
        this.namePlayer = namePlayer;
    }

    /**
     * @return the statisticsOnePlayerList
     */
    public List<StatisticsOnePlayer> getStatisticsOnePlayerList() {
        return statisticsOnePlayerList;
    }

    /**
     * @param statisticsOnePlayerList the statisticsOnePlayerList to set
     */
    public void setStatisticsOnePlayerList(List<StatisticsOnePlayer> statisticsOnePlayerList) {
        this.statisticsOnePlayerList = statisticsOnePlayerList;
    }

    /**
     * @return the statisticsMultiPlayerList
     */
    public List<StatisticsMultiPlayer> getStatisticsMultiPlayerList() {
        return statisticsMultiPlayerList;
    }

    /**
     * @param statisticsMultiPlayerList the statisticsMultiPlayerList to set
     */
    public void setStatisticsMultiPlayerList(List<StatisticsMultiPlayer> statisticsMultiPlayerList) {
        this.statisticsMultiPlayerList = statisticsMultiPlayerList;
    }
    
}
