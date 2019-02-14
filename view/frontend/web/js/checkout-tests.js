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

            hicCore.paymentMethods().add({
                configTest: config,
                page: "checkout",
                type: "paypalCheckout",
                selector: "#payment-method-braintree-paypal"
            });

            hicCore.paymentMethods().add({
                configTest: config,
                page: "checkout",
                type: "paypalCredit",
                selector: "#payment-method-braintree-paypal-credit"
            });

            hicCore.paymentMethods().add({
                configTest: config,
                page: 'checkout',
                type: "applePay",
                selector: "#payment-method-braintree-applepay"
            });

            hicCore.paymentMethods().add({
                configTest: config,
                page: 'checkout',
                type: 'googlePay',
                selector: "#payment-method-braintree-googlepay"
            });

    };
});