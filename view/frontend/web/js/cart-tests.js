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
            if (config.isPaypalActive && config.isPaypalActiveOnCart) {
                hicCore.paymentMethods().add({
                    configTest: config,
                    page: 'cart',
                    type: 'paypal',
                    selector: '.cart-summary .paypal.checkout:not(.paypal-bml)'
                });
            }

            if (config.isApplePayActive) {
                hicCore.paymentMethods().add({
                    configTest: config,
                    page: 'cart',
                    type: 'applePay',
                    selector: '.cart-summary .applepay-minicart'
                });
            }

            if (config.isGooglePayActive) {
                hicCore.paymentMethods().add({
                    configTest: config,
                    page: 'cart',
                    type: 'googlePay',
                    selector: '.cart-summary .googlepay-minicart-logo'
                });
            }
        }

    };
});