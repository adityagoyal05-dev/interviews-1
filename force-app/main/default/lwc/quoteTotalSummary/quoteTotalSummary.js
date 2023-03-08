/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement , api } from "lwc";
import adjustQuotePrice from "c/adjustQuotePrice";

export default class QuoteTotalSummary extends LightningElement {
    @api quoteAmount;
    @api recordId;

    async openModal()
    {
        const selectedEvent = await adjustQuotePrice.open({
            recordId  : this.recordId
        });
    }
}
