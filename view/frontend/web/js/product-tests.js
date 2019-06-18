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
            type: 'paypal',
            selector: '.paypalCheckout.pdp',
            needs: ['isPaypalActive','isPaypalActiveOnPdp'],
            configTest: config,
        });

        api.add({
            type: 'paypalCredit',
            page: 'pdp',
            selector: '.paypalCredit.pdp',
            needs: ['isPaypalActive','isPaypalActiveOnCart','isCreditActive'],
            configTest: config,
        });

    };
});