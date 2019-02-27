/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
define([
    'jquery',
], function ($) {
    'use strict';
    return {        
        new: function(){
            var obj = {
                create: create,
                destroy: destroy,
                read: read,
                config: {
                    page: [
                        'pdp',
                        'minicart',
                        'cart',
                        'checkout'
                    ],
                    type: [
                        'paypal',
                        'paypalCheckout',
                        'paypalCredit',
                        'applePay',
                        'googlePay',
                    ],
                    device: [
                        'desktop',
                        'tablet',
                        'mobile',
                    ]
                },  
                statusName: 'bt-hic-disable-all-tests',
            }

            function status(){
                return localStorage.getItem(statusName);
            }

            function match(state, arg, flags){
                var matches = []
                $.each(flags, function(k, v){
                    matches.push((arg[k] === v) ? true : false);
                });
                return (matches.indexOf(false) > -1) ? false : true;
            }
            function matches(state, flags){
                var example = [
                    {device: 'desktop'},
                    {page: 'pdp', type: 'paypal'},
                    {type: 'applePay'},
                ];
            }
            function disabled(flags){
                return match(true, flags);
            }
            function enabled(flags){
                return match(false, flags);
            }
            function create(name, value){
                return localStorage.setItem(name, value);
            }
            function destroy(name){
                return localStorage.removeItem(name);
            }
            function read(name){
                var status = localStorage.getItem(name)
                if (status === 'true'){
                    return true;
                }else if (status === 'false' || status === null){
                    return false;
                }else{
                    return status;
                }
            }
            return obj;
        }    
    }
});