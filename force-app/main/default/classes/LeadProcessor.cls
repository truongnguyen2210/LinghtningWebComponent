public class LeadProcessor implements Database.Batchable<sObject>, Database.Stateful {

    public Integer totalRecord = 0;
    public Database.QueryLocator start(Database.BatchableContext db) {
        return Database.getQueryLocator([SELECT Id, LeadSource  FROM Lead]);
    }

    public void execute(Database.BatchableContext db, List<Lead> lstLead) {
        for (Lead item: lstLead) {
            item.LeadSource = 'Dreamforce';
        }
        update lstLead;
        totalRecord = lstLead.size();
    }

    public void finish(Database.BatchableContext batchableContext) {
        System.debug('Record Process: ' + totalRecord);
    }
}
