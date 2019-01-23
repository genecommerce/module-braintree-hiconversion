require(['jquery'], function ($) {
    window.showHicCreateAccountFields = function (ev) {
        ev.preventDefault();
        var wrapper = $(this).closest('fieldset');

        wrapper.find('tr[id*=_link_validate]').hide();
        wrapper.find('tr[id*=_site_id]').hide();
        wrapper.find('.hic-account-info-label').hide();

        wrapper.find('tr[id*=_create_account]').show();
        wrapper.find('.create-hic-account-label').show();
    
    }
});