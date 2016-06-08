package br.com.quizEnsino.model;

import java.util.List;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="Dali", date="2016-05-24T00:15:39.479-0300")
@StaticMetamodel(Issue.class)
public class Issue_ {
	public static volatile SingularAttribute<Issue, Integer> idIssue;
	public static volatile SingularAttribute<Issue, String> area;
	public static volatile SingularAttribute<Issue, String> answer;
	public static volatile SingularAttribute<Issue, Asking> asking;
	public static volatile ListAttribute<Issue, Option> optionList;
	public static volatile SingularAttribute<Issue, List> statisticsOnePlayerList;
}
