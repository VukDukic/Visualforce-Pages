<apex:page standardController="Account" >
	<apex:detail subject="{!Account.Id}"/>
	<apex:dataTable value="{!Account.Contacts}" var="c" rows="2">
		<apex:column value="{!c.FirstName}"/>
		<apex:column value="{!c.LastName}"/>
	</apex:dataTable>
</apex:page>
	

