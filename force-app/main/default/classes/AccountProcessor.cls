public with sharing class AccountProcessor {

    @future(callout=true)
    public static void countContacts(Set<String> lstAcountId) {
        Map<String, Account> mapAccountUpdate = new Map<String, Account>();
        List<Contact> lstContact = new List<Contact>();
        lstContact = [
            SELECT Id, AccountId
            FROM Contact
            WHERE AccountId IN :lstAcountId
        ];

        for (Contact item : lstContact) {
            Account acc = new Account();
            acc.Id = item.AccountId;
            if(mapAccountUpdate.containsKey(item.AccountId)){
                acc = mapAccountUpdate.get(item.AccountId);
                acc.Number_Of_Contacts__c += 1;
                mapAccountUpdate.put(item.AccountId, acc);
            } else {
                acc.Number_Of_Contacts__c = 1;
                mapAccountUpdate.put(item.AccountId, acc);
            }
        }

        if(!mapAccountUpdate.isEmpty()) {
            update mapAccountUpdate.values();
        }
    }
}
