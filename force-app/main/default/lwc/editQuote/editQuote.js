/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement, api , wire , track} from "lwc";
import getQuote from '@salesforce/apex/QuoteController.getQuote';
import updateQuote from '@salesforce/apex/QuoteController.updateQuote';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class EditQuote extends LightningElement {
  @api recordId;
  @track quoteData = {};

  startDate;
  endDate;


  @wire(getQuote, {quoteId : '$recordId'})
  getQuoteData(result) {
      if (result.error) {
          this.errorMessage = JSON.stringify(error);
      } else if (result.data !== undefined) {
               this.quoteData = result.data;
               const selectedEvent = new CustomEvent('updated', { detail: this.quoteData.totalQuotedAmount });
               this.dispatchEvent(selectedEvent);
      }
  };  

  handleStartDateChange(event)
  {
    this.startDate = event.target.value;
  }

  handleEndDateChange(event)
  {
    this.endDate = event.target.value;
  }

  saveUpdatedQuote(){
    debugger;
    let quote = {'sObject' : 'Quote__c'};
    quote.Id = this.quoteData.id;
    quote.Start_Date__c = this.startDate;
    quote.EndDate__c = this.endDate ;
    console.log(quote);
    updateQuote({
        quoteObj : quote
    })
        .then(data=>{
          debugger;
            if(data){
                this.showMessage('Record is updated succesfully!', 'Success', 'success', 'dismissable');
            }else{
                this.showMessage('Record is not updated!', 'Error', 'error', 'dismissable');
            }
        }).catch(error=>{
            this.showMessage('System Error: '+JSON.stringify(error.body.message), 'Error', 'error', 'dismissable');
        })

      }
  renderedCallback() {}

  showMessage(toastMessage , toastTitle , toastVariant , toastMode) {
    const event = new ShowToastEvent({
        
        message: toastMessage,
        title: toastTitle ,
        variant: toastVariant ,
        mode: toastMode
    });
    this.dispatchEvent(event);
}
}
