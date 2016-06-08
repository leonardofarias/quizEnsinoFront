/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.quizEnsino.bd;

import br.com.quizEnsino.model.Player;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;

/**
 * 
 * @author MacLeo
 */
public class PlayerBD {
	private EntityManager em;
	Player issue = new Player();

	public PlayerBD() {
		EntityManagerFactory emf = Persistence.createEntityManagerFactory("quizEnsinoPU");
		em = emf.createEntityManager();
	}

	public void salvar(Player player) {
		em.getTransaction().begin();
		em.merge(player);
		em.getTransaction().commit();
	}

	public void excluir(Player player) {
		em.getTransaction().begin();
		em.remove(em.find(Player.class, player.getEmail()));
		em.getTransaction().commit();
	}

	@SuppressWarnings("unchecked")
	public List<Player> listarTudo() {
		Query query = em.createNamedQuery("Player.findAll");
		return query.getResultList();
	}

	public Player get(String email) {
		try {
			Query query = em.createNamedQuery("Player.findByEmail");
			query.setParameter("email", email);
			return (Player) query.getSingleResult();
		} catch (Exception e) {
			return null;
		}
	}
	
	public Player getByNamePlayer(String namePlayer) {
		try {
			Query query = em.createNamedQuery("Player.findByNamePlayer");
			query.setParameter("namePlayer", namePlayer);
			return (Player) query.getSingleResult();
		} catch (Exception e) {
			return null;
		}
	}
	
	public Player getUser(String email, String password) {
		try {
			Query query = em.createNamedQuery("Player.findByUser");
			query.setParameter("email", email);
			query.setParameter("password", password);
			return (Player) query.getSingleResult();
		} catch (Exception e) {
			return null;
		}
	}

	public String pesquisarPorId(String value) {
		return issue.getEmail();
	}

}
