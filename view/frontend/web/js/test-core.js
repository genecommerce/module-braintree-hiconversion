/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
define([
    'jquery',
    'Gene_BraintreeHiConversion/js/payment-method',
    'Gene_BraintreeHiConversion/js/payment-method-config'
], function ($, paymentMethod, paymentMethodConfig) {
    'use strict';

    return {            
        
        paymentMethods: function(){
            var default_obj = {
                add: add,
                payment_methods: [],
                options: paymentMethodConfig.paymentConfig(),
                page: findPage,
                method: findMethod,
                find: find,
                pdp: findProduct,
                minicart: findMinicart,
                cart: findCart,
                loadPaypal: loadPaypal,
            }

            window.braintreeHicApi = (window.braintreeHicApi === undefined ? default_obj : window.braintreeHicApi);
            var obj = window.braintreeHicApi;
            function add(args){            
                var test_payment = paymentMethod.new(args).init();
                obj.payment_methods.push(test_payment);
            }
            /* Pages */
            function findProduct(type){
                var matches = obj.find({page: "product", type: type})
                return matches = (matches.length === 1) ? matches[0] : matches;
            }
            function findMinicart(type){
                var matches = obj.find({page: "minicart", type: type})
                return matches = (matches.length === 1) ? matches[0] : matches;
            }
            function findCart(type){
                var matches = obj.find({page: "cart", type: type})
                return matches = (matches.length === 1) ? matches[0] : matches;
            }        
            function findPage(page){
                var matches = obj.find({page: page})
                return matches = (matches.length === 1) ? matches[0] : matches;
            }
            function findMethod(payment_method){
                var matches = obj.find({type: payment_method})
                return matches = (matches.length === 1) ? matches[0] : matches;
            }        
            function loadPaypal(location, existing_config, cb){                                
                var method = obj.find({page: location, type: "paypal"});
                if (method.length !== 0){
                    method[0].addPaypal(existing_config, cb)
                }
            }            
            function find(args){
                var matches = [];
                $.each(obj.payment_methods, function(index,button){
                        var match = true;
                        $.each(args, function(match_key, match_value){
                            if (button[match_key] === undefined || button[match_key] !== match_value){
                                match = false;
                            }
                        })
                        if (match === true){
                            matches.push(button);
                        }
                })
                return matches;
            }
            return obj;
        },

        addToApi: function (testLocation, testName, obj) {
            window.braintreeHicApi = window.braintreeHicApi || {};
            window.braintreeHicApi[testLocation] = window.braintreeHicApi[testLocation] || {};
            window.braintreeHicApi[testLocation][testName] = obj;
        },

    }
});