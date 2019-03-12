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
        // active on cart check is only required here as long as the main module is requiring that before injecting pdp button
        if (config && config.isPaypalActive && config.isPaypalActiveOnCart && config.isPaypalActiveOnPdp) {
            hicCore.paymentMethods().add({
                configTest: config,
                page: 'pdp',
                type: 'paypal',
                selector: '.product-info-main .actions .paypal'
            });
        }
    };
});