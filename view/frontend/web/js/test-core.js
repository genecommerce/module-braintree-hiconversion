/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
define([
    'jquery',
    'Gene_BraintreeHiConversion/js/payment-method',
    'Gene_BraintreeHiConversion/js/payment-method-config',
    'Gene_BraintreeHiConversion/js/test-flag',
], function ($, paymentMethod, paymentMethodConfig, testFlag) {
    'use strict';

    return {            
        
        paymentMethods: function(){
            var default_obj = {
                add: add,
                payment_methods: [],
                options: paymentMethodConfig.paymentConfig(),
                page: findPage,
                method: findMethod,
                device: findDevice,
                search: search,
                find: find,                
                pdp: findProduct,
                minicart: findMinicart,
                cart: findCart,
                checkout: findCheckout,
                loadPaypal: loadPaypal,
                flag: testFlag.new(),
                tests: {
                    names: {
                        page: [
                            'bt-hic-disable-test-pdp',
                            'bt-hic-disable-test-minicart',
                            'bt-hic-disable-test-cart',
                            'bt-hic-disable-test-checkout',
                        ],
                        type: [
                            'bt-hic-disable-test-paypal',
                            'bt-hic-disable-test-paypalCheckout',
                            'bt-hic-disable-test-paypalCredit',
                            'bt-hic-disable-test-applePay',
                            'bt-hic-disable-test-googlePay',
                        ],
                        device: [
                            'bt-hic-disable-test-desktop',
                            'bt-hic-disable-test-tablet',
                            'bt-hic-disable-test-mobile',
                        ],
                    },
                    enable: enableTests,
                    disable: disableTests,
                    status: findStatus,
                    ignore: ignoreFlags,
                    ignoreName: 'bt-hic-disable-test-ignore-flags',
                }                
            }

            window.braintreeHicApi = (window.braintreeHicApi === undefined) ? default_obj : window.braintreeHicApi;
            var obj = window.braintreeHicApi;
            function add(args){            
                var test_payment = paymentMethod.new(args).init();
                obj.payment_methods.push(test_payment);
            }
            function findDevice(){
                var width = window.matchMedia('screen and (min-width: 768px)').matches;
                var height = window.matchMedia('screen and (min-height: 768px)').matches;
                var orientation = (window.matchMedia('(orientation: landscape)').matches) ? 'landscape' : 'portrait';
                var hover = window.matchMedia('(hover: hover)').matches;
                var noHover = window.matchMedia('(hover: none)').matches;
                var device = null;

                if (height === false || width === false){
                    device = 'mobile';
                }else{
                    device = (noHover) ? 'tablet' : 'desktop';
                }

                return device;
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
            function search(args){
                var matches = [];
                $.each(obj.payment_methods, function(index,button){
                        var match = true;
                        $.each(args, function(match_key, match_value){
                            if (match === false || button[match_key] === undefined || button[match_key] !== match_value){
                                match = false;
                            }
                        })
                        if (match === true){
                            matches.push(button);
                        }
                })
                return matches;
            }
            function find(args){
                var matches = search(args)
                return (matches.length === 1) ? matches[0] : false;
            }
            function disableTests(){
                $.each(obj.tests.names, function(key,names){                    
                    $.each(names, function(i,name){
                        obj.flag.create(name, 'true');
                    })
                })
            }
            function enableTests(){
                $.each(obj.tests.names, function(key,names){
                    $.each(names, function(i,name){
                        obj.flag.destroy(name);
                    })
                })
            }
            function findStatus(){
                var results = {
                    ignoreFlags: obj.flag.read(obj.tests.ignoreName),
                    page: {},
                    type: {},
                    device: {}
                };
                $.each(obj.tests.names, function(key,names){
                    $.each(names, function(i,name){
                        var status = localStorage.getItem(name);
                        results[key][name] = (status === 'true') ? true : false;
                    })
                })
                return results;
            }
            function ignoreFlags(status){                
                return obj.flag.create(obj.tests.ignoreName, status);
            }
            return obj;
        },
    }
});