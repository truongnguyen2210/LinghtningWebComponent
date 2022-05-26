public with sharing class AccountUtility {
    public AccountUtility() {

    }

    public static void viewAnnualRevenue(){
        List<Account> accountsList = [SELECT Id, AnnualRevenue, Name FROM Account];
        for (Account item : accountsList) {
            String acctRev = item.Name + ' : ' + item.AnnualRevenue;
            System.debug(acctRev);
        }
    }
}
