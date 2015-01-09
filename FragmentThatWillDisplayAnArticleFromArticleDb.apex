<apex:page standardController="Article__c">
	<apex:form>
		<apex:pageBlock mode="detail">
			<apex:pageBlockButtons location="top">
				<apex:commandButton action="{!edit}" value="Edit"/>
			<apex:commandButton action="{!delete}" value="Delete"/>
			</apex:pageBlockButtons>
			<apex:pageBlockSection columns="1" title="Article Information">
				<apex:outputField value="{!Article__c.Name}"/>
				<apex:outputField value="{!Article__c.Author__c}"/>
				<apex:outputField value="{!Article__c.Status__c}"/>
			<apex:outputField value="{!Article__c.Publish_Date__c}"/>
		<apex:outputField value="{!Articel__c.Link_to_Article__c}"/>
			</apex:pageBlockSection>
		</apex:pageBlock>
	</apex:form>
</apex:page>