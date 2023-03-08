/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement , api  , wire , track} from "lwc";
import updateQuote from '@salesforce/apex/QuoteController.updateQuote';
import LightningModal from 'lightning/modal';
import getQuote from '@salesforce/apex/QuoteController.getQuote';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AdjustQuotePrice extends LightningModal {
  @api recordId;
  adjustedAmountLabel = "Adjusted Amount";
  adjustedAmount = 0;
  
  @track quoteData = {};
  @track wiredQuoteData = [];

  @wire(getQuote, {quoteId : '$recordId'})
  getQuoteData(result) {
    this.wiredQuoteData = result;
      if (result.error) {
          console.log(JSON.stringify(error));
      } else if (result.data !== undefined) {
               this.adjustedAmount = result.data.totalQuotedAmount;

      }
  }; 

  handleAdjustedAmountChange(event)
  {
    this.adjustedAmount = event.target.value;
  }

  handleUpdate(){
          let quote ={
            Id : this.recordId,
            TotalQuotedAmount__c : this.adjustedAmount
          }
          updateQuote({quoteObj : quote})
            .then(()=>{
              refreshApex(this.wiredQuoteData);
              this.showMessage('Record is updated succesfully!', 'Success', 'success', 'dismissable');
              this.close('okay');
            })
            .catch((error)=>{
              this.showMessage('System Error: '+JSON.stringify(error.body.message), 'Error', 'error', 'dismissable');

            })
            
        
  }
  

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
