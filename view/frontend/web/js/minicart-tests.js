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
                selector: '.paypalCheckout.minicart',
                buttonSelector: '.paypalCheckout.minicart .paypal-button',
                needs: ['isPaypalActive','isPaypalActiveOnCart'],
                configTest: config,
            });

            api.add({
                type: 'paypalCredit',
                page: 'minicart',
                selector: '.paypalCredit.minicart',
                buttonSelector: '.paypalCredit.minicart .paypal-button',
                needs: ['isPaypalActive','isPaypalActiveOnCart','isCreditActive'],
                configTest: config,
            });

            api.add({
                type: 'applePay',
                page: 'minicart',
                selector: '#minicart-content-wrapper .braintree-applepay-minicart',
                buttonSelector: '#minicart-content-wrapper .braintree-applepay-minicart .braintree-apple-pay-button',
                needs: ['isApplePayActive'],
                configTest: config,
            });

            api.add({
                type: 'googlePay',
                page: 'minicart',
                selector: '#minicart-content-wrapper .googlepay-minicart-logo',
                buttonSelector: '#minicart-content-wrapper .googlepay-minicart-logo .braintree-googlepay-button',
                needs: ['isGooglePayActive'],
                configTest: config,
            });
        }
    };
});