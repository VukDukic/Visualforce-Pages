/*
 * This code is for Internal Salesforce use only, and subject to change without notice.
 * Customers shouldn't reference this file in any web pages.
 */
Sfdc.ns("SfdcApp.ForcecomHomepage");
SfdcApp.ForcecomHomepage={hideDiv:function(a){document.getElementById(a).style.display="none"},goToQuickCreate:function(){document.qcform.submit()},toggleWarning:function(){var a=document.getElementById("warningBlocks"),b=document.getElementById("expandWarning"),c=document.getElementById("collapseWarning"),d=document.getElementById("gotoSystemOverviewText"),e=document.getElementById("gotoSystemOverviewExpandedText");"none"==a.style.display?(a.style.display="block",b.style.display="none",c.style.display=
"block",d.style.display="none",e.style.display="block"):(a.style.display="none",b.style.display="block",c.style.display="none",d.style.display="block",e.style.display="none")},showDismiss:function(a){document.getElementById(a).style.visibility="visible"},hideDismiss:function(a){document.getElementById(a).style.visibility="hidden"},confirmDismiss:function(a){Dialogs.createSimpleDialog(LC.getLabel("forcecom_homepage","dismiss_header"),LC.getLabel("forcecom_homepage",a+"_dismiss_msg"),Dialogs.types.CONFIRM,
function(){hideWarningBlock(a)}).show();return!1},confirmPanelDismiss:function(a,b,c){Dialogs.createSimpleDialog(LC.getLabel("forcecom_homepage","panelDismissConfirmHeader_"+a),LC.getLabel("forcecom_homepage","panelDismissConfirm"),Dialogs.types.CONFIRM,function(){c(a);SfdcApp.ForcecomHomepage.hideDiv(b)}).show();return!1}};

//# sourceMappingURL=/javascript/1420712685000/sfdc/source/ForcecomHomepage.js.map
