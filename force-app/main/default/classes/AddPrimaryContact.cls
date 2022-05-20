public without sharing class AddPrimaryContact implements Queueable{

    private Contact contact;
    private String state;

    public AddPrimaryContact(Contact ct, String st) {
        this.contact = ct;
        this.state = st;
    }

    public void execute(QueueableContext context) {
        List<Account> accounts = [SELECT Id FROM Account WHERE BillingState = :state LIMIT 200];
        List<Contact> contactUpdates = new List<Contact>();
        for (Account account : accounts) {
            Contact contactClone = Contact.clone();
            contactClone.AccountId = account.Id;
            contactUpdates.add(contactClone);
        }
        insert contactUpdates;
    }
}
