public class DemoControllerExt {
	public DemoControllerExt(ApexPages.StandardControllercontroller) {
		controller.addFields(new List<String>{'accountId'});
Contact contact=(Contact) controller.getRecord();
	}
}