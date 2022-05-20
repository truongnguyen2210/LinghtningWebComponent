@isTest
public with sharing class DailyLeadProcessorTest {

    public static String CRON_EXP = '0 0 0 ? * * *';

    @isTest static void testSchedule(){
        List<Lead> leadInserts = new List<Lead>();
        for (Integer i = 0; i < 400; i++) {
            if (i < 200) {
                leadInserts.add(new Lead(LastName = 'Nguyen', Company = 'Keizu'));
            } else {
                leadInserts.add(new Lead(LastName = 'Nguyen', Company = 'Keizu', LeadSource = 'orther'));
            }
        }
        insert leadInserts;

        Test.startTest();
        Id jobId = System.Schedule('Process Lead', CRON_EXP, new DailyLeadProcessor());
        Test.stopTest();

        List<Lead> leadAfterTest = [SELECT Id FROM Lead WHERE LeadSource = 'Dreamforce'];
        System.assertEquals(200, leadAfterTest.size());

        List<CronTrigger> cst = [SELECT Id, TimesTriggered, NextFireTime FROM CronTrigger WHERE Id = :jobId];
        System.debug('TimesTriggered' + cst[0].TimesTriggered);
    }
}
