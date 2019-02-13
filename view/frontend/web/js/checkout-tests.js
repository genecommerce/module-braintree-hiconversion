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
                selector: ".cart-summary .paypal.checkout:not(.paypal-bml)"
            });

            hicCore.paymentMethods().add({
                configTest: config,
                page: "checkout",
                type: "paypalCredit",
                selector: ".cart-summary .paypal.checkout:not(.paypal-bml)"
            });

            hicCore.paymentMethods().add({
                configTest: config,
                page: 'checkout',
                type: "applePay",
                selector: ".cart-summary .applepay-minicart"
            });

            hicCore.paymentMethods().add({
                configTest: config,
                page: 'checkout',
                type: 'googlePay',
                selector: ".cart-summary .googlepay-minicart-logo"
            });

    };
});