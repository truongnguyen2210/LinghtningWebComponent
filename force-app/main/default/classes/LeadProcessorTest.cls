@isTest
public with sharing class LeadProcessorTest {

    @isTest
    public static void testBatch() {
        List<Lead> leads = new List<Lead>();
        for (Integer i = 0; i< 200; i++) {
            leads.add(new Lead(LastName = 'Nguyen', Company='Salesforce'));
        }
        insert leads;
        LeadProcessor batch = new LeadProcessor();
        Test.startTest();
        Id idBatch = Database.executeBatch(batch, 200);
        Test.stopTest();
        List<Lead> lstLeadAfterUpdate = [SELECT Id, LeadSource FROM Lead WHERE LeadSource = 'Dreamforce'];
        System.assertEquals(200, lstLeadAfterUpdate.size());
    }
}
