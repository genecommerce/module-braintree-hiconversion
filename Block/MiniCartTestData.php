<?php

namespace Gene\BraintreeHiConversion\Block;

use Magento\Framework\View\Element\Template;
use Magento\Framework\View\Element\Template\Context;

use Gene\BraintreeHiConversion\Helper\Data;

/**
 * Class MiniCartTestData
 * @package Gene\BraintreeHiConversion\Block
 */
class MiniCartTestData extends Template
{

    /**
     * @var Data
     */
    private $helper;

    /**
     * @param Context $context
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
     * @return Data
     */
    public function getHelper()
    {
        return $this->helper;
    }

    /**
     * is paypal express test enabled
     *
     * @return boolean
     */
    public function isPaypalExpressTestEnabled()
    {
        return $this->helper->isMiniCartPaypalExpressTestEnabled();
    }

    /**
     * is paypal express disabled
     *
     * @return boolean
     */
    public function isPaypalExpressDisabled()
    {
        return $this->helper->isMiniCartPaypalExpressDisabled();
    }

    /**
     * is paypal credit test enabled
     *
     * @return boolean
     */
    public function isPaypalCreditTestEnabled()
    {
        return $this->helper->isMiniCartPaypalCreditTestEnabled();
    }

    /**
     * is paypal credit disabled
     *
     * @return boolean
     */
    public function isPaypalCreditDisabled()
    {
        return $this->helper->isMiniCartPaypalCreditDisabled();
    }

    /**
     * is apple pay test enabled
     *
     * @return boolean
     */
    public function isApplePayTestEnabled()
    {
        return $this->helper->isMiniCartApplePayTestEnabled();
    }

    /**
     * is apple pay disabled
     *
     * @return boolean
     */
    public function isApplePayDisabled()
    {
        return $this->helper->isMiniCartApplePayDisabled();
    }

    /**
     * is google pay test enabled
     *
     * @return boolean
     */
    public function isGooglePayTestEnabled()
    {
        return $this->helper->isMiniCartGooglePayTestEnabled();
    }

    /**
     * is google pay disabled
     *
     * @return boolean
     */
    public function isGooglePayDisabled()
    {
        return $this->helper->isMiniCartGooglePayDisabled();
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
