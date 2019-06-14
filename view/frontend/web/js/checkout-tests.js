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
                type: 'paypalCheckout',
                selector: '#payment-method-braintree-paypal',
                needs: ['isPaypalActive'],
                configTest: config,
            });

            api.add({                
                page: 'checkout',
                type: 'paypalCredit',
                selector: '#payment-method-braintree-paypal-credit',
                needs: ['isPaypalActive','isCreditActive'],
                configTest: config,
            });

            api.add({
                page: 'checkout',
                type: 'applePay',
                selector: '#payment-method-braintree-applepay',
                needs: ['isApplePayActive'],
                configTest: config,
            });

            api.add({
                page: 'checkout',
                type: 'googlePay',
                selector: '#payment-method-braintree-googlepay',
                needs: ['isGooglePayActive'],
                configTest: config,
            });

        }
    };
});