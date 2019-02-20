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
                    enable: enableTests,
                    disable: disableTests,
                    states: findStates,
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
                return obj.find({page: 'pdp', type: type});
            }
            function findMinicart(type){
                return obj.find({page: 'minicart', type: type});
            }
            function findCart(type){
                return obj.find({page: 'cart', type: type});
            }
            function findCheckout(type){
                return obj.find({page: 'checkout', type: type})
            }
            function findPage(page){
                return obj.find({page: page});
            }
            function findMethod(payment_method){
                return obj.find({type: payment_method})
            }        
            function loadPaypal(location, type, config, cb){                                
                var method = obj.find({page: location, type: type});
                if (typeof(method === 'object') && method.length === undefined){
                    method.addPaypal(config, cb);
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
                return matches = (matches.length === 1) ? matches[0] : matches;
            }
            function disableTests(){
                $.each(obj.tests.names, function(i,name){
                    localStorage.setItem(name,"true");
                });
            }
            function enableTests(){
                $.each(obj.tests.names, function(i,name){
                    localStorage.removeItem(name);
                })
            }
            function findStates(){
                var result = {};
                $.each(obj.tests.names, function(i,name){
                    result[name] = localStorage.getItem(name)
                })
                return result;
            }
            return obj;
        },

    }
});