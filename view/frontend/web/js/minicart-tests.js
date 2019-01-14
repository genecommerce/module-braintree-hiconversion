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

            //testCore.addToApi('config','minicart_payment_methods', config);
            window.minicart_config = config;

            testCore.addToApi('minicart', 'paypal', testCore.paymentMethod({
                config: config.paypalExpress,
                eligible: "",
                selector: "#minicart-content-wrapper .paypal.checkout:not(.paypal-bml)",
            }).init());

            testCore.addToApi('minicart','paypalCredit', testCore.paymentMethod({
                config: config.paypalCredit,
                eligible: "",
                selector: "#minicart-content-wrapper .paypal-bml.checkout",
            }).init());

            testCore.addToApi('minicart','applePay', testCore.paymentMethod({
                config: config.applePay,
                eligible: "",
                selector: "#minicart-content-wrapper .applepay-minicart",
            }).init());

            testCore.addToApi('minicart','googlePay', testCore.paymentMethod({
                config: config.googlePay,
                eligible: "",
                selector: "#minicart-content-wrapper .googlepay-minicart-logo",
            }).init());

        }
    };
});