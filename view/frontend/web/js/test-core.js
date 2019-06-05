/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
define([
    'jquery',
    'Gene_BraintreeHiConversion/js/payment-method',
    'Gene_BraintreeHiConversion/js/payment-method-config',
], function ($, paymentMethod, paymentMethodConfig) {
    'use strict';

    /* Testing */

    return {
        api: function(){
            var group = null;
            var obj = {
                paymentMethods: {
                    enabled: [],
                    disabled: [],
                    all: [],
                },
                add: add,
                loadPaypal: loadPaypal,                
                page: findPage,
                method: findMethod,
                device: findDevice,
                search: search,
                find: find,
                pdp: findProduct,
                minicart: findMinicart,
                cart: findCart,
                checkout: findCheckout,
                config: null,
                show: show,
                hide: hide,
                postMessage: postMessage,
                backup: backup,
                timing: {
                    btReady: false,
                    hicReady: false,
                    hicLate: false,
                    totalTime: 0,
                },
                test: {
                    config: null
                },
                hicReady: hicReady,
                version: "1.1.0", 
            }

            function show(force){
                $.each(obj.paymentMethods.enabled, function(i,wallet){
                    wallet.elem.show(force);
                });
            }
            function hide(){
                $.each(obj.paymentMethods.enabled, function(i,wallet){
                    wallet.elem.hide();
                });
            }
            function postMessage(args){
                var loc = document.location || window.location;
                var origin = loc.origin || loc.protocol + "//" + loc.host;
                var baseConfig = {
                    group: 'update-bt-ge-hi'
                };
                var config = $.extend({}, baseConfig, args);
                window.postMessage({config}, origin);
            }
            function backup(){
                var time_interval = 250;
                var total_time = 0;
                var time_limit = 15000;
                function waitFor(){
                    total_time = total_time + time_interval;
                    obj.timing.totalTime = total_time;
                    if (obj.timing.hicReady === false && total_time > time_limit){	
                        obj.timing.hicLate = true;	
                        obj.show(true);	
                    }else if (obj.timing.hicReady === false){	
                        setTimeout(function(){	
                            waitFor();	
                        }, time_interval);	
                    }	
                }	
                waitFor();
            }
            function hicReady(){
                return obj.timing.hicReady = (obj.timing.hicLate) ? false : true;
            }                   
            function add(args){
                args.device = findDevice();
                var wallet = paymentMethod.new(args).init();
                (wallet.getEnabled() === true) ? (obj.paymentMethods.enabled.push(wallet)) : (obj.paymentMethods.disabled.push(wallet));
                obj.paymentMethods.all.push(wallet);
                postMessage({
                    name: 'paymentMethodAdded',
                    page: wallet.page,
                    type: wallet.type,
                    enabled: wallet.getEnabled(),
                });
            }
            function loadPaypal(page, type, config, cb){
                var time_interval = 250;
                var total_time = 0;
                function waitForPaypal(){                                                
                    total_time = total_time + time_interval;
                    var wallet = obj.find({page: page, type: type})
                    if (wallet !== false){
                        wallet.addPaypal(config, cb);
                    }else{
                        setTimeout(function(){
                            waitForPaypal();
                        }, time_interval);
                    }
                }
                waitForPaypal();
            }
            function findDevice(){
                var width = window.matchMedia('screen and (min-width: 768px)').matches;
                var height = window.matchMedia('screen and (min-height: 768px)').matches;
                var noHover = window.matchMedia('(hover: none)').matches;
                var device = null;
                if (height === false || width === false){
                    device = 'mobile';
                }else{
                    device = (noHover) ? 'tablet' : 'desktop';
                }
                return device;
            }
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
            function findMethod(type){
                return obj.find({type: type})
            }
            function search(args, narrow){
                var matches = [];
                var wallets = (narrow) ? obj.paymentMethods[narrow] : obj.paymentMethods.enabled;
                $.each(wallets, function(index,button){
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
            function find(args, narrow){
                var matches = search(args, narrow)
                return (matches.length === 1) ? matches[0] : false;
            }

            function load(){
                if (window.braintreeHicApi === undefined){
                    backup();
                    window.braintreeHicApi = obj;
                    return window.braintreeHicApi;
                }else{
                    obj = window.braintreeHicApi;
                    return obj;
                }
            }
            function page(args){   
                load();

                var konfig = $.extend({}, args.configTest);
                obj.isTestingEnabled = konfig.isTestingEnabled;
                delete konfig.isTestingEnabled;
                obj.config = konfig;

                group = args;
                return obj;
            }
            return {
                page: page,
                load: load
            }
        },
    }
});