package br.com.quizEnsino.model;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="Dali", date="2016-05-24T00:15:39.482-0300")
@StaticMetamodel(StatisticsOnePlayer.class)
public class StatisticsOnePlayer_ {
	public static volatile SingularAttribute<StatisticsOnePlayer, Integer> statisticsOnePlayer;
	public static volatile SingularAttribute<StatisticsOnePlayer, Player> player;
	public static volatile SingularAttribute<StatisticsOnePlayer, Issue> issue;
	public static volatile SingularAttribute<StatisticsOnePlayer, Boolean> correct;
}
