<?php

namespace Gene\BraintreeHiConversion\Plugin\PayPal;

/**
 * Class CartButton
 * Replace the template used by the product button to use the HIC one
 * @package Gene\BraintreeHiConversion\Plugin\PayPal
 */
class ProductButton
{
    const TEMPLATE_PATH = 'Gene_BraintreeHiConversion::paypal/productbutton.phtml';

    /**
     * @var \Hic\Integration\Helper
     */
    protected $helper;

    /**
     * CartButton constructor.
     * @param \Gene\BraintreeHiConversion\Helper\Data $helper
     */
    public function __construct(
        \Gene\BraintreeHiConversion\Helper\Data $helper
    ) {
        $this->helper = $helper;
    }

    /**
     * Modify the template for the PayPal button block only if the config options to "test" are enabled.
     * @param \Magento\Braintree\Block\Paypal\Button $subject
     * @param $result
     * @return string
     */
    public function afterGetTemplate(\Magento\Braintree\Block\Paypal\Button $subject, $result)
    {
        // @todo change setting to check against product
        if ($this->helper->isEnabled()) {
            return self::TEMPLATE_PATH;
        }

        return $result;
    }
}