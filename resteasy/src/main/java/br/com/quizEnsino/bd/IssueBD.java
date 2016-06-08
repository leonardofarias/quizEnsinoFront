/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.quizEnsino.bd;

import br.com.quizEnsino.model.Issue;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;

/**
 * 
 * @author MacLeo
 */
public class IssueBD {
    private EntityManager em;
    Issue issue = new Issue();

    public IssueBD() {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("quizEnsinoPU");
        em = emf.createEntityManager();
    }
    
    public void salvar(Issue issue) {
        em.getTransaction().begin();
        em.merge(issue);
        em.getTransaction().commit();
    }

    public void excluir(Issue issue) {
        em.getTransaction().begin();
        em.remove(em.find(Issue.class, issue.getIdIssue()));
        em.getTransaction().commit();
    }
    
    @SuppressWarnings("unchecked")
	public List<Issue> listarTudo(){
        Query query = em.createNamedQuery("Issue.findAll");
        return query.getResultList();
    }

    public Issue get(Integer id) {
    	Query query = em.createNamedQuery("Issue.findByIdIssue");
    	query.setParameter("idIssue",id);
    	return (Issue) query.getSingleResult();
    }
    
}
