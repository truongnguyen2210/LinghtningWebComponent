@isTest
public with sharing class AccountProcessorTest {
    public AccountProcessorTest() {
    }

    public class calloutMock implements HttpCalloutMock {
        public HttpResponse respond(HttpRequest req) {
            // Create a fake response
            HttpResponse res = new HttpResponse();
            res.setHeader('Content-Type', 'application/json');
            res.setBody('{"status":"success"}');
            res.setStatusCode(200);
            return res;
        }
    }

    @isTest
    public static void TestcountContacts() {
        Test.setMock(HttpCalloutMock.class, new calloutMock());
        List<Account> lstAccount = createListAccount(5);
        insert lstAccount;
        Set<String> setIdAccount = new Set<String>();
        for (Account item : lstAccount) {
            setIdAccount.add(item.Id);
        }
        List<Contact> lstContact = createListContact(setIdAccount, 4);
        insert lstContact;
        Test.startTest();
            AccountProcessor.countContacts(setIdAccount);
        Test.stopTest();
        // runs callout and check results
        List<Account> lstAccountAfterTest = [
            SELECT Id, Number_Of_Contacts__c
            FROM Account
            WHERE Id IN :setIdAccount
        ];
        System.assertEquals(5, lstAccountAfterTest.size());
        for (Account item : lstAccountAfterTest) {
            System.assertEquals(4, item.Number_Of_Contacts__c);
        }
    }

    private static List<Account> createListAccount(Integer total) {
        List<Account> lstAccount = new List<Account>();
        for (Integer i = 0; i < total; i++) {
            Account acc = new Account(Name = 'Nguyen-Test-' + i);
            lstAccount.add(acc);
        }
        return lstAccount;
    }

    private static List<Contact> createListContact(Set<String> setIdAccount, Integer total) {
        List<Contact> lstContact = new List<Contact>();
        for (String item : setIdAccount) {
            for (Integer i = 0; i < total; i++) {
                Contact acc = new Contact(
                    LastName = 'Test',
                    AccountId = item
                );
                lstContact.add(acc);
            }
        }
        return lstContact;
    }
}
