public List<Account> GetAccounts()
{
  return (List<Account>)ssc.GetRecords();
}
