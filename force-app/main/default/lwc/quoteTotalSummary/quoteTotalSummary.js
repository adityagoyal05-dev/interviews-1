/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement , api } from "lwc";

export default class QuoteTotalSummary extends LightningElement {
    @api quoteAmount;

    connectedCallback()
    {
        //console.log('quoteAmount : '+quoteAmount);
    }


    openModal()
    {
        const selectedEvent = new CustomEvent('openModal', { detail: this.quoteAmount });
        this.dispatchEvent(selectedEvent);
    }
}
