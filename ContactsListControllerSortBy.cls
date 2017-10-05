public class ContactsListController {

    private String sortOrder = 'LastName';
    
    public List<Contact> getContacts() {
    
      List<Contact> results = Database.query(
          'SELECT Id, FirstName, LastName, 
}
