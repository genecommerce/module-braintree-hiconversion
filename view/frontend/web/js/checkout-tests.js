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
            if (config.isPaypalActive) {
                hicCore.paymentMethods().add({
                    configTest: config,
                    page: 'checkout',
                    type: 'paypalCheckout',
                    selector: '#payment-method-braintree-paypal'
                });

                if (config.isCreditActive) {
                    hicCore.paymentMethods().add({
                        configTest: config,
                        page: 'checkout',
                        type: 'paypalCredit',
                        selector: '#payment-method-braintree-paypal-credit'
                    });
                }
            }
           
            if (config.isApplePayActive) {
                hicCore.paymentMethods().add({
                    configTest: config,
                    page: 'checkout',
                    type: 'applePay',
                    selector: '#payment-method-braintree-applepay'
                });
            }
            if (config.isGooglePayActive) {
                hicCore.paymentMethods().add({
                    configTest: config,
                    page: 'checkout',
                    type: 'googlePay',
                    selector: '#payment-method-braintree-googlepay'
                });
            }
        }
    };
});