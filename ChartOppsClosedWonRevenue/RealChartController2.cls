public class RealChartController2 {

    public List<OppsClosedData> getData() {

        List<OppsClosedData> theResults = new List<OppsClosedData>();

        Integer wonPos = 0;
        Integer lostPos = 0;
        for (Integer month = 1 ; month <= MONTHS_OF_YEAR.size() ; month++) {
            OppsClosedData closedOpp = null;

            if(wonPos < closedWonResults.size()) {
                Integer wonMonth = Integer.valueOf(closedWonResults[wonPos].get('theMonth'));
                if(month == wonMonth) {
                    closedOpp = new OppsClosedData(monthName(month));
                    closedOpp.numOppsClosedWon =
                        Integer.valueOf(closedWonResults[wonPos].get('numOppsClosedWon'));
                    closedOpp.monthlyRevenue =
                        Double.valueOf(closedWonResults[wonPos].get('monthlyRevenue'));
                    wonPos++;
                }
            }

            if(lostPos < closedLostResults.size()) {
                Integer lostMonth = Integer.valueOf(closedLostResults[lostPos].get('theMonth'));
                if(month == lostMonth) {
                    if(closedOpp == null) {
                        closedOpp = new OppsClosedData(monthName(month));
                    }
                    closedOpp.numOppsClosedLost =
                        Integer.valueOf(closedLostResults[lostPos].get('numOppsClosedLost'));
                    lostPos++;
                }
            }

            if(closedOpp != null) {
                theResults.add(closedOpp);
            }
        }

        return theResults;
    }

    // Properties to factor out the SOQL queries

    // A list with monthly closed won opportunities stats for one calendar year
    public List<AggregateResult> closedWonResults {
        get {
            if(closedWonResults == null) {
                closedWonResults =
                    [SELECT SUM(Amount) monthlyRevenue, COUNT(Name) numOppsClosedWon,
                        CALENDAR_MONTH(CloseDate) theMonth
                     FROM Opportunity
                     WHERE stageName = 'Closed Won' AND CALENDAR_YEAR(CloseDate) = :theYear
                     GROUP BY CALENDAR_MONTH(CloseDate)
                     ORDER BY CALENDAR_MONTH(CloseDate)];
            }
            return closedWonResults;
        }
        private set;
    }

    // A list with monthly closed lost opportunities stats for one calendar year
    public List<AggregateResult> closedLostResults {
        get {
            if(closedLostResults == null) {
                closedLostResults =
                    [SELECT COUNT(Name) numOppsClosedLost, CALENDAR_MONTH(CloseDate) theMonth
                     FROM Opportunity
                     WHERE stageName = 'Closed Lost' AND CALENDAR_YEAR(CloseDate) = :theYear
                     GROUP BY CALENDAR_MONTH(CloseDate)
                     ORDER BY CALENDAR_MONTH(CloseDate)];
            }
            return closedLostResults;
        }
        private set;
    }

    // Get the year for the stats from the URL, if possible
    private Integer theYear {
        get {
            if(theYear == null) {
                theYear = Date.today().year(); // default to this year

                if(ApexPages.currentPage().getParameters().get('y') != null) {
                    Integer paramY;
                    try {
                        paramY = Integer.valueOf(
                            ApexPages.currentPage().getParameters().get('y'));
                        if((1950 <= paramY) && (paramY <= 2050)) { // simple range validation
                            theYear = paramY;
                        }
                    }
                    catch (Exception e) {} // Non-numeric param, just drop it
                }
            }
            return theYear;
        }
        set;
    }
    // Make the year available for a chart label
    public String getMonthsAxisLabel() {
        return(String.valueOf(theYear));
    }

    // Get the English month string
    private final List<String> MONTHS_OF_YEAR = new String[]
        {'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'};

    private String monthName(Integer monthNum) {
        return(MONTHS_OF_YEAR[monthNum - 1]);
    }

    // Wrapper class
    public class OppsClosedData {
        public String theMonth { get; set; }
        public Integer numOppsClosedWon { get; set; }
        public Integer numOppsClosedLost { get; set; }
        public Double monthlyRevenue { get; set; }

        public OppsClosedData(String mon) {
            this(mon, 0, 0, 0);
        }
        public OppsClosedData(String mon, Integer oppW, Integer oppL, Double rev) {
            this.theMonth = mon;
            this.numOppsClosedWon = oppW;
            this.numOppsClosedLost = oppL;
            this.monthlyRevenue = rev;
        }
    }
}
