global with sharing class GoogleChartsController {
     
    /**
      Loads most recent 10 Opportunities
    */
    @RemoteAction   
    global static Opportunity[] loadOpps() {
        return [select Id, Name, ExpectedRevenue, Amount from Opportunity order by CreatedDate DESC limit 10];
    }   
 
}
