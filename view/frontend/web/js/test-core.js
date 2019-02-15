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
                checkout: findCheckout,
                loadPaypal: loadPaypal,
                tests: {
                    names: [
                        'bt-hic-disable-test-pdp',
                        'bt-hic-disable-test-minicart',
                        'bt-hic-disable-test-cart',
                        'bt-hic-disable-test-checkout'
                    ],
                    enable: enable_tests,
                    disable: disable_tests,
                }
            }

            window.braintreeHicApi = (window.braintreeHicApi === undefined) ? default_obj : window.braintreeHicApi;
            var obj = window.braintreeHicApi;
            function add(args){            
                var test_payment = paymentMethod.new(args).init();
                obj.payment_methods.push(test_payment);
            }
            /* Pages */
            function findProduct(type){
                var matches = obj.find({page: 'pdp', type: type});
                return matches = (matches.length === 1) ? matches[0] : matches;
            }
            function findMinicart(type){
                var matches = obj.find({page: 'minicart', type: type});
                return matches = (matches.length === 1) ? matches[0] : matches;
            }
            function findCart(type){
                var matches = obj.find({page: 'cart', type: type});
                return matches = (matches.length === 1) ? matches[0] : matches;
            }
            function findCheckout(type){
                var matches = obj.find({page: 'checkout', type: type})
                return matches = (matches.length === 1) ? matches[0] : matches;
            }
            function findPage(page){
                var matches = obj.find({page: page});
                return matches = (matches.length === 1) ? matches[0] : matches;
            }
            function findMethod(payment_method){
                var matches = obj.find({type: payment_method})
                return matches = (matches.length === 1) ? matches[0] : matches;
            }        
            function loadPaypal(location, type, config, cb){                                
                var method = obj.find({page: location, type: type});
                if (method.length !== 0){
                    method[0].addPaypal(config, cb)
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
            function disable_tests(){
                $.each(obj.tests.names, function(i,name){
                    localStorage.setItem(name,"true");
                });
            }
            function enable_tests(){
                $.each(obj.tests.names, function(i,name){
                    localStorage.removeItem(name);
                })
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