public with sharing class DailyLeadProcessor implements Schedulable {
    public void execute(SchedulableContext ctx) {
        List<Lead> leads = [SELECT Id, LeadSource FROM Lead WHERE LeadSource = null LIMIT 200];
        for (Lead item : leads) {
            item.LeadSource = 'Dreamforce';
        }
        update leads;
    }
}
