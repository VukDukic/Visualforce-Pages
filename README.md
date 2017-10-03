# Visualforce_Pages
* `<apex:pageBlockTable>` - to display list of records
* `recordSetVar` - sets the name of the variable to be created with the collection of records
* `value` - attribute of `<apex:pageBlockTable>` is set to the variable loaded by the standard list controller, `{! contacts }`
* `{! listViewOptions }` to get a list of list view filters available for an object
* `{! filterId }` to set the list view filter to use for a standard list controller’s results
* `<apex:form>` - To change the list view filter for a standard list controller, you need to submit the new value back to the server. The standard way to perform this submit is using a form created using the <apex:form> component.
* `reRender="contacts_list"` - AJAX - list is updating without reloading the whole page
