/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
define([
    'jquery',
    'Gene_BraintreeHiConversion/js/test-core'
], function ($, hicCore) {
    'use strict';

    return function (config) {
        
        var api = hicCore.api().page({
            configTest: config,
        });        
        api.add({            
            page: 'pdp',
            type: 'paypalCheckout',
            selector: '.actions .paypalCheckout.pdp',
            buttonSelector: '.actions .paypalCheckout.pdp .paypal-button',
            needs: ['isPaypalActive','isPaypalActiveOnPdp'],
            configTest: config,
        });

        api.add({
            type: 'paypalCredit',
            page: 'pdp',
            selector: '.actions .paypalCredit.pdp',
            buttonSelector: '.actions .paypalCredit.pdp .paypal-button',
            needs: ['isPaypalActive','isPaypalActiveOnCart','isCreditActive'],
            configTest: config,
        });

    };
});