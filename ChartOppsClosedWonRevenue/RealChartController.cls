public class RealChartController {
    public List<AggregateResult> getData() {
        return
            [SELECT SUM(Amount) monthlyRevenue, COUNT(Name) numOppsClosedWon,
                  CALENDAR_MONTH(CloseDate) theMonth
             FROM Opportunity
             WHERE stageName = 'Closed Won' AND CALENDAR_YEAR(CloseDate) = 2011
             GROUP BY CALENDAR_MONTH(CloseDate)
             ORDER BY CALENDAR_MONTH(CloseDate)];
    }
}
