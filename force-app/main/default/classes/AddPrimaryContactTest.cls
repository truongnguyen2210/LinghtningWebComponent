@isTest()
public with sharing class AddPrimaryContactTest {

    @isTest static void testQueueable(){
        List<Account> accounts = new List<Account>();
        for (Integer i = 0; i < 100; i++) {
            Account acc = new Account(Name = 'NguyenTest');
            if (i < 50) {
                acc.BillingState = 'NY';
            } else {
                acc.BillingState = 'CA';
            }
            accounts.add(acc);
        }
        insert accounts;
        Contact ct = new Contact(FirstName = 'Simon', LastName = 'Connock');
        insert ct;

        Test.startTest();
        Id jobId = System.enqueueJob(new AddPrimaryContact(ct, 'CA'));
        Test.stopTest();

        List<Contact> contacts = [SELECT Id FROM Contact WHERE Contact.Account.BillingState = 'CA'];
        System.assertEquals(50, contacts.size());
    }
}
