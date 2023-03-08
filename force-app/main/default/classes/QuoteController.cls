public with sharing class QuoteController {
    public QuoteController() {

    }

    @AuraEnabled(cacheable=true)
    public static QuoteDto getQuote(String quoteId){
        try {
            Quote__c  quote = [SELECT Id, Name, EndDate__c, Start_Date__c, TotalQuotedAmount__c FROM Quote__c Where Id =:quoteId];
            QuoteDto quoteDto = new QuoteDto(quote);
            return quoteDto;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static Boolean updateQuote(Quote__c quoteObj){
        try {
            update quoteObj;
            return true;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}