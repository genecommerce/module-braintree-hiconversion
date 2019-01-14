<?php

namespace Gene\BraintreeHiConversion\Block;

use Magento\Framework\View\Element\Template;
use Magento\Framework\View\Element\Template\Context;

use Gene\BraintreeHiConversion\Helper\Data;

/**
 * Class CartTestData
 * @package Gene\BraintreeHiConversion\Block
 */
class CartTestData extends Template
{
    /**
     * @var Data
     */
    private $helper;

    /**
     * @param Context $context
     * @param Data $helper
     * @param array $data
     */
    public function __construct(
        Context $context,
        Data $helper,
        array $data = []
    ) {
        $this->helper = $helper;

        parent::__construct($context, $data);
    }

    /**
     * is paypal express test enabled
     *
     * @return boolean
     */
    public function isPaypalExpressTestEnabled()
    {
        return $this->helper->isCartPaypalExpressTestEnabled();
    }

    /**
     * is paypal express disabled
     *
     * @return boolean
     */
    public function isPaypalExpressDisabled()
    {
        return $this->helper->isCartPaypalExpressDisabled();
    }

    /**
     * is paypal credit test enabled
     *
     * @return boolean
     */
    public function isPaypalCreditTestEnabled()
    {
        return $this->helper->isCartPaypalCreditTestEnabled();
    }

    /**
     * is paypal credit disabled
     *
     * @return boolean
     */
    public function isPaypalCreditDisabled()
    {
        return $this->helper->isCartPaypalCreditDisabled();
    }

    /**
     * is apple pay test enabled
     *
     * @return boolean
     */
    public function isApplePayTestEnabled()
    {
        return $this->helper->isCartApplePayTestEnabled();
    }

    /**
     * is apple pay disabled
     *
     * @return boolean
     */
    public function isApplePayDisabled()
    {
        return $this->helper->isCartApplePayDisabled();
    }

    /**
     * is google pay test enabled
     *
     * @return boolean
     */
    public function isGooglePayTestEnabled()
    {
        return $this->helper->isCartGooglePayTestEnabled();
    }

    /**
     * is google pay disabled
     *
     * @return boolean
     */
    public function isGooglePayDisabled()
    {
        return $this->helper->isCartGooglePayDisabled();
    }

    /**
     * is paypal button color test enabled
     *
     * @return boolean
     */
    public function isPaypalButtonColorTestEnabled()
    {
        return $this->helper->isPaypalButtonColorTestEnabled();
    }

    /**
     * is paypal button shape test enabled
     *
     * @return boolean
     */
    public function isPaypalButtonShapeTestEnabled()
    {
        return $this->helper->isPaypalButtonShapeTestEnabled();
    }
}
