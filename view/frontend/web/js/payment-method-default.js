/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
define([
    'jquery',
    'Gene_BraintreeHiConversion/js/payment-method-config'
], function ($, paymentMethodConfig) {
    'use strict';

    return {
        paymentConfig: function(){
            var pmc = paymentMethodConfig.paymentConfig();
            var options = {
                paypalVertical: {
                    color: pmc.paypalVertical().style,
                    shape: pmc.paypalVertical().shape,
                    size: pmc.paypalVertical().color,
                    layout: 'vertical',
                    disabledFunding: "",
                },
                paypalHorizontal: {
                    color: pmc.paypalHorizontal().style,
                    shape: pmc.paypalHorizontal().shape,
                    size: pmc.paypalHorizontal().color,
                    layout: 'horizontal',
                    disabledFunding: ""
                },
                paypalCheckout: false,              
                paypalCredit: false,
                paypalPay: false,
                paypalBuyNow: false,    
                applePay: false,
                googlePay: false
            }
            return options
        },        
              
    }
});