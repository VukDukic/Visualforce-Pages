# Visualforce - Iteration Components :ok_hand:

* `Getter methods` pull data out of your controller onto your page.
* `Setter methods` submit values from the page back to the controller.
* `sortOrder` - private member variable
* `getContacts()` - public method
* action methods - respond to user activity
* [Salesforce Stack Exchange](https://salesforce.stackexchange.com/questions/91894/visualforce-page-records-not-linking-to-their-detail-pages)
* `<apex:pageBlockTable>` - to display list of records
* `recordSetVar` - sets the name of the variable to be created with the collection of records
* `value` - attribute of `<apex:pageBlockTable>` is set to the variable loaded by the standard list controller, `{! contacts }`
* `{! listViewOptions }` to get a list of list view filters available for an object
* `{! filterId }` to set the list view filter to use for a standard list controller’s results
* `<apex:form>` - To change the list view filter for a standard list controller, you need to submit the new value back to the server. The standard way to perform this submit is using a form created using the <apex:form> component.
* `reRender="contacts_list"` attribute on the `<apex:actionSupport>` component - AJAX - list is updating without reloading the whole page
* `$Resource` - global variable to reference static resources
* `<apex:includeScript>` (for JavaScript files) 
* `<apex:stylesheet>` (for CSS stylesheets) 
* `<apex:image>` (for graphics files)
* `URLFOR()` function can combine a reference to a zipped static resource and a relative path to an item within it to create a URL that can be used with Visualforce components that reference static assets.
