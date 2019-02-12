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
                page: "minicart",
                type: "paypal",     
                selector: "#minicart-content-wrapper .checkout.paypal"
            });

            hicCore.paymentMethods().add({
                configTest: config,
                page: 'minicart',
                type: "applePay",
                selector: "#minicart-content-wrapper .applepay-minicart"
            });

            hicCore.paymentMethods().add({
                configTest: config,
                page: 'minicart',
                type: "googlePay",
                selector: "#minicart-content-wrapper .googlepay-minicart-logo"
            });
            
    };
});