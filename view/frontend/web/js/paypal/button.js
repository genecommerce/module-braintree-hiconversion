define([
    'jquery',
    'uiComponent',
    'Magento_Braintree/js/paypal/button',
    'Gene_BraintreeHiConversion/js/test-core'
], function (
    $,
    Component,
    Button,
    hicCore
) {
        'use strict';
        return Component.extend({
            initialize: function () {
                this._super();
                var _config = {
                    color: this.config.color,
                    shape: this.config.shape,
                    size: this.config.size,
                    layout: this.config.layout,
                    label: this.config.label,
                    branding: this.config.branding,
                    fundingicons: this.config.fundingicons,
                    disabledFunding: this.config.disabledFunding
                };

                var minicartWrapper = $('#' + this.config.id).closest('#minicart-content-wrapper');
                
                hicCore.interceptPaypalButton(minicartWrapper.length ? 'minicart': 'cart', _config, function (_config) {
                    this.config.color = _config.color;
                    this.config.shape = _config.shape;
                    this.config.size = _config.size;
                    this.config.layout = _config.layout;
                    this.config.disabledFunding = _config.disabledFunding;
                    this.config.label = _config.label;
                    this.config.branding = _config.branding;
                    this.config.fundingicons = _config.fundingicons;
                    new Button(this.config);
                }.bind(this));
            
                return this;
            },
        });
    }
);