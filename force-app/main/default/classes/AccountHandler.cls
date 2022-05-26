public with sharing class AccountHandler {
    public AccountHandler() {

    }

    public static void insertAccount(Integer size) {
        List<Account> addAccounts = new List<Account>();
        for (Integer n = 0; n < size; n++) {
            Account acc = new Account(Name = 'Acme Inc ' + n, AccountNumber = 'A000' + n);
            addAccounts.add(acc);
        }
        insert addAccounts;
    }
}
