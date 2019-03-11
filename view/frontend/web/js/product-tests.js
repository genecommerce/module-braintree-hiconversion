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
        if (config && config.isPaypalActiveOnPdp) {
            hicCore.paymentMethods().add({
                configTest: config,
                page: 'pdp',
                type: 'paypal',
                selector: '.product-info-main .actions .paypal'
            });
        }
    };
});