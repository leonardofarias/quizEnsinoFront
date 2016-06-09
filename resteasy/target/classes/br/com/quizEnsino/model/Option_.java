package br.com.quizEnsino.model;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="Dali", date="2016-05-24T00:15:39.479-0300")
@StaticMetamodel(Option.class)
public class Option_ {
	public static volatile SingularAttribute<Option, Integer> idOption;
	public static volatile SingularAttribute<Option, String> description;
	public static volatile SingularAttribute<Option, String> image;
	public static volatile SingularAttribute<Option, Issue> issue;
}
