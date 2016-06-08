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
import javax.persistence.Table;

/**
 *
 * @author MacLeo
 */
@Entity
@Table(name = "option")
public class Option implements Serializable {
    
	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_option")
    private Integer idOption;
    
    @Basic(optional = false)
    @Column(name = "description", length = 255)
    private String description;
    
    @Basic(optional = true)
    @Column(name = "image", nullable = true)
    private String image; 
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "issue", nullable = false)
    private Issue issue;
    
    public Option(){
        
    }

    /**
     * @return the idOption
     */
    public Integer getIdOption() {
        return idOption;
    }

    /**
     * @param idOption the idOption to set
     */
    public void setIdOption(Integer idOption) {
        this.idOption = idOption;
    }

    /**
     * @return the description
     */
    public String getDescription() {
        return description;
    }

    /**
     * @param description the description to set
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * @return the image
     */
    public String getImage() {
        return image;
    }

    /**
     * @param image the image to set
     */
    public void setImage(String image) {
        this.image = image;
    }

    /**
     * @return the issue
     */
    public Issue getIssue() {
        return issue;
    }

    /**
     * @param issue the issue to set
     */
    public void setIssue(Issue issue) {
        this.issue = issue;
    }
    
}
