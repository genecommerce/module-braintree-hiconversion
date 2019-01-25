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


            testCore.paymentMethods().add({
                page: "cart",
                paymentMethod: "paypalCheckout",
                selector: ".cart-summary .paypal.checkout:not(.paypal-bml)",                
            })
            
            /*
            testCore.paymentMethods().add({
                page: 'cart',
                paymentMethod: 'paypalCredit',
                selector: ".cart-summary .paypal-bml.checkout"
            })
            */

            testCore.paymentMethods().add({
                page: 'cart',
                paymentMethod: 'applePay',
                selector: ".cart-summary .applepay-minicart"
            })

            testCore.paymentMethods().add({
                page: 'cart',
                paymentMethod: 'googlePay',
                selector: ".cart-summary .googlepay-minicart-logo"
            })


    };
});