public with sharing class CustomAccountListController
{
  public ApexPages.StandardController ssc {get; private set;}

  public CustomAccountListController()
  {
    ssc = new ApexPages.StandardSetController([select Id, Name, Rating, NumberOfEmployees from Account limit 500]);
  }
}    
