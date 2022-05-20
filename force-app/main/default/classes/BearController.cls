public with sharing class BearController {
    public BearController() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Bear__c> getAllBears() {
        return [
            SELECT Name
            FROM Bear__c
            ORDER BY createddate ASC
        ];
    }

    @AuraEnabled(cacheable=true)
    public static List<Bear__c> searchBears(String searchTerm) {
        return [
            SELECT Name
            FROM Bear__c
            WHERE Name = :searchTerm
            ORDER BY createddate ASC
        ];
    }
}
