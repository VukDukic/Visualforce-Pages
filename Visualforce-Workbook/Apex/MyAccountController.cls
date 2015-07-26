public class MyController {
    public List<Account> getMyAccounts() {
        return [SELECT Id, Name, Accountnumber from Account ORDER BY LastModifiedDate DESC LIMIT 10];
        }
}
