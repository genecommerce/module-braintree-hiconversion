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