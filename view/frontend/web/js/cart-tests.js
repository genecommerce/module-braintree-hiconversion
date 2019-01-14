/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
define([
    'jquery',
    'Gene_BraintreeHiConversion/js/test-core'
], function ($, testCore) {
    'use strict';

    return function (config) {

        if (config) {

            window.cart_config = config;
            //testCore.addToApi('config','cart_payment_methods', config);

            testCore.addToApi('cart', 'paypal', testCore.paymentMethod({
                config: config.paypalExpress,
                eligible: "",
                selector: ".cart-summary .paypal.checkout:not(.paypal-bml)",
                label: "cart_paypal"
            }).init());

            testCore.addToApi('cart','paypalCredit', testCore.paymentMethod({
                config: config.paypalCredit,
                eligible: "",
                selector: ".cart-summary .paypal-bml.checkout",
                label: "cart_paypalCredit"
            }).init());

            testCore.addToApi('cart','applePay', testCore.paymentMethod({
                config: config.applePay,
                eligible: "",
                selector: ".cart-summary .applepay-minicart",
                label: "cart_applePay"
            }).init());

            testCore.addToApi('cart','googlePay', testCore.paymentMethod({
                config: config.googlePay,
                eligible: "",
                selector: ".cart-summary .googlepay-minicart-logo",
                label: "googlePay_cart"
            }).init());

        }
    };
});