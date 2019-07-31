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
                    branding: this.config.branding,
                    color: this.config.color,
                    disabledFunding: this.config.disabledFunding,
                    fundingicons: this.config.fundingicons,
                    label: this.config.label,
                    layout: this.config.layout,
                    offerCredit: this.config.offerCredit,
                    shape: this.config.shape,
                    size: this.config.size,
                };
                
                var minicartWrapper = $('#' + this.config.id).closest('#minicart-content-wrapper');
                var page = minicartWrapper.length ? 'minicart' : 'cart';
                var type = (this.config.offerCredit) ? 'paypalCredit' : 'paypal';
                var api = hicCore.api().load();
                api.loadPaypal(page, type, _config, function (_config) {
                    this.config.branding = _config.branding;
                    this.config.color = _config.color;
                    this.config.disabledFunding = _config.disabledFunding;
                    this.config.events = _config.events;
                    this.config.fundingIcons = _config.fundingicons;
                    this.config.label = _config.label;
                    this.config.layout = _config.layout;
                    this.config.offerCredit = _config.offerCredit;
                    this.config.shape = _config.shape;
                    this.config.size = _config.size;
                    this.config.tagline = _config.tagline;
                    new Button(this.config); 
                }.bind(this));
                
                return this;
            },
        });
    }
);