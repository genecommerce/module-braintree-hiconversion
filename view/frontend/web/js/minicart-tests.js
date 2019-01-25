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

            var selectors = {
                vertical: "[id='minicart-content-wrapper'] .checkout.paypal",
                horiztonal: "",
            }

            testCore.paymentMethods().add({
                page: "minicart",
                paymentMethod: "paypalCheckout",
                //selector: "#mingit icart-content-wrapper .paypal.checkout:not(.paypal-bml)",
                selector: "[id='minicart-content-wrapper'] .checkout.paypal",
            })

            /*
            testCore.paymentMethods().add({
                page: 'minicart',
                paymentMethod: "paypalCredit",
                selector: "#minicart-content-wrapper .paypal-bml.checkout",
            })
            */

            testCore.paymentMethods().add({
                page: 'minicart',
                paymentMethod: "applePay",
                selector: "#minicart-content-wrapper .applepay-minicart",
            })

            testCore.paymentMethods().add({
                page: 'minicart',
                paymentMethod: "googlePay",
                selector: "#minicart-content-wrapper .googlepay-minicart-logo",
            })

    };
});