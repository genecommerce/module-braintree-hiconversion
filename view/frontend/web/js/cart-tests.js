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
                page: 'cart',
                selector: '.paypalCheckout.cart',
                buttonSelector: '.paypalCheckout.cart .paypal-button',
                needs: ['isPaypalActive','isPaypalActiveOnCart'],
                configTest: config,
            });

            api.add({
                type: 'paypalCredit',
                page: 'cart',
                selector: '.paypalCredit.cart',
                buttonSelector: '.paypalCredit.cart .paypal-button',
                needs: ['isPaypalActive','isPaypalActiveOnCart','isCreditActive'],
                configTest: config,
            });

            api.add({
                type: 'applePay',
                page: 'cart',
                selector: '.cart-summary .braintree-applepay-minicart',
                buttonSelector: '.cart-summary .braintree-applepay-minicart .braintree-apple-pay-button',
                needs: ['isApplePayActive'],
                configTest: config,
            });

            api.add({
                type: 'googlePay',
                page: 'cart',
                selector: '.cart-summary .googlepay-minicart-logo',
                buttonSelector: '.cart-summary .googlepay-minicart-logo .braintree-googlepay-button',
                needs: ['isGooglePayActive'],
                configTest: config,
            });

        }

    };
});