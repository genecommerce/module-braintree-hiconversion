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


            var api = hicCore.api().page({
                configTest: config,
                page: 'checkout'
            });        
                
            api.add({                
                page: 'checkout',
                type: 'paypal',
                selector: '#payment-method-braintree-paypal',
                buttonSelector: '#payment-method-braintree-paypal .paypal-button',
                needs: ['isPaypalActive'],
                configTest: config,
            });

            api.add({                
                page: 'checkout',
                type: 'paypalCredit',
                selector: '#payment-method-braintree-paypal-credit',
                buttonSelector: '#payment-method-braintree-paypal-credit .paypal-button',
                needs: ['isPaypalActive','isCreditActive'],
                configTest: config,
            });

            api.add({
                page: 'checkout',
                type: 'applePay',
                selector: '#payment-method-braintree-applepay',
                buttonSelector: '#payment-method-braintree-applepay .braintree-apple-pay-button',
                needs: ['isApplePayActive'],
                configTest: config,
            });

            api.add({
                page: 'checkout',
                type: 'googlePay',
                selector: '#payment-method-braintree-googlepay',
                buttonSelector: '#payment-method-braintree-googlepay .braintree-googlepay-button',
                needs: ['isGooglePayActive'],
                configTest: config,
            });

        }
    };
});