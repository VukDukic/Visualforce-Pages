public class DemoControllerExt {
	public DemoControllerExt(ApexPages.StandardControllercontroller) {
	if(!Test.isRunningTest()) {
		controller.addFields(new List<String>{'accountId'});
	}
Contact contact=(Contact) controller.getRecord();
	}
	}
}