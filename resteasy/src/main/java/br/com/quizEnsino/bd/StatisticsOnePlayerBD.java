/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.quizEnsino.bd;

import br.com.quizEnsino.model.Player;
import br.com.quizEnsino.model.StatisticsOnePlayer;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;

/**
 * 
 * @author MacLeo
 */
public class StatisticsOnePlayerBD {
    private EntityManager em;
    StatisticsOnePlayer statisticsOnePlayer = new StatisticsOnePlayer();

    public StatisticsOnePlayerBD() {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("quizEnsinoPU");
        em = emf.createEntityManager();
    }
    
    public void salvar(StatisticsOnePlayer statisticsOnePlayer) {
        em.getTransaction().begin();
        em.merge(statisticsOnePlayer);
        em.getTransaction().commit();
    }

    public void excluir(StatisticsOnePlayer statisticsOnePlayer) {
        em.getTransaction().begin();
        em.remove(em.find(StatisticsOnePlayer.class, statisticsOnePlayer.getIdOnePlayer()));
        em.getTransaction().commit();
    }
    
    @SuppressWarnings("unchecked")
	public List<StatisticsOnePlayer> listarTudo(){
        Query query = em.createNamedQuery("StatisticsOnePlayer.findAll");
        return query.getResultList();
    }
    
	public Integer buscarQtdQuestoes(Player player, Boolean correct){
        Query query = em.createNamedQuery("StatisticsOnePlayer.findAnswersCorrect");
        query.setParameter("player", player);
        query.setParameter("correct", correct);
        return query.getResultList().size();
    }

    public StatisticsOnePlayer get(Integer id) {
    	Query query = em.createNamedQuery("StatisticsOnePlayer.findByIdStatisticsOnePlayer");
    	query.setParameter("id_StatisticsOnePlayer",id);
    	return (StatisticsOnePlayer) query.getSingleResult();
    }
    
}
