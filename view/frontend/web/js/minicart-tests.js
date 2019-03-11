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
            if (config.isPaypalActiveOnCart) {
                hicCore.paymentMethods().add({
                    configTest: config,
                    page: 'minicart',
                    type: 'paypal',
                    selector: '#minicart-content-wrapper .checkout.paypal'
                });
            }
            if (config.isApplePayActive) {
                hicCore.paymentMethods().add({
                    configTest: config,
                    page: 'minicart',
                    type: 'applePay',
                    selector: '#minicart-content-wrapper .applepay-minicart'
                });
            }
            if (config.isGooglePayActive) {
                hicCore.paymentMethods().add({
                    configTest: config,
                    page: 'minicart',
                    type: 'googlePay',
                    selector: '#minicart-content-wrapper .googlepay-minicart-logo'
                });
            }
        }
    };
});