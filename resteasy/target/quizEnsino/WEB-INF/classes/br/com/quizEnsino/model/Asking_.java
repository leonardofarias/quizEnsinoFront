package br.com.quizEnsino.model;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="Dali", date="2016-05-24T00:15:39.319-0300")
@StaticMetamodel(Asking.class)
public class Asking_ {
	public static volatile SingularAttribute<Asking, Integer> idAsking;
	public static volatile SingularAttribute<Asking, String> description;
	public static volatile SingularAttribute<Asking, String> image;
	public static volatile SingularAttribute<Asking, Issue> issue;
}
