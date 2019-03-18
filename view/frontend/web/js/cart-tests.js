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
                page: 'cart'
            });        
                
            api.add({
                type: 'paypal',
                page: 'cart',
                selector: '.cart-summary .paypal.checkout:not(.paypal-bml)',
                needs: ['isPaypalActive','isPaypalActiveOnCart'],
                configTest: config,
            });

            api.add({
                type: 'applePay',
                page: 'cart',
                selector: '.cart-summary .applepay-minicart',
                needs: ['isApplePayActive'],
                configTest: config,
            });

            api.add({
                type: 'googlePay',
                page: 'cart',
                selector: '.cart-summary .googlepay-minicart-logo',
                needs: ['isGooglePayActive'],
                configTest: config,
            });

        }

    };
});