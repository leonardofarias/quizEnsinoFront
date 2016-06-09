package br.com.quizEnsino.model;

import java.util.List;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="Dali", date="2016-05-24T00:15:39.480-0300")
@StaticMetamodel(Player.class)
public class Player_ {
	public static volatile SingularAttribute<Player, String> email;
	public static volatile SingularAttribute<Player, String> password;
	public static volatile SingularAttribute<Player, String> namePlayer;
	public static volatile SingularAttribute<Player, List> statisticsOnePlayerList;
	public static volatile SingularAttribute<Player, List> statisticsMultiPlayerList;
}
