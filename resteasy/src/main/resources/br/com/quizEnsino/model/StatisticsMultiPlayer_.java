package br.com.quizEnsino.model;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="Dali", date="2016-05-24T00:15:39.481-0300")
@StaticMetamodel(StatisticsMultiPlayer.class)
public class StatisticsMultiPlayer_ {
	public static volatile SingularAttribute<StatisticsMultiPlayer, Integer> statisticsMultiPlayer;
	public static volatile SingularAttribute<StatisticsMultiPlayer, Player> player;
	public static volatile SingularAttribute<StatisticsMultiPlayer, Challenge> challenge;
	public static volatile SingularAttribute<StatisticsMultiPlayer, Boolean> victory;
}
