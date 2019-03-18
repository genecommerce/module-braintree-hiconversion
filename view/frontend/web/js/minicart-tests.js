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

        if (config) {
                

            var api = hicCore.api().page({
                configTest: config,
            });        
                
            api.add({
                type: 'paypal',
                page: 'minicart',
                selector: '#minicart-content-wrapper .checkout.paypal',
                needs: ['isPaypalActive','isPaypalActiveOnCart'],
                configTest: config,
            });

            api.add({
                type: 'applePay',
                page: 'minicart',
                selector: '#minicart-content-wrapper .applepay-minicart',
                needs: ['isApplePayActive'],
                configTest: config,
            });

            api.add({
                type: 'googlePay',
                page: 'minicart',
                selector: '#minicart-content-wrapper .googlepay-minicart-logo',
                needs: ['isGooglePayActive'],
                configTest: config,
            });
        }
    };
});