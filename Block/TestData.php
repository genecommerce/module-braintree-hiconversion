<?php

namespace Gene\BraintreeHiConversion\Block;

use Magento\Framework\View\Element\Template;
use Magento\Framework\View\Element\Template\Context;
use Magento\Braintree\Block\ApplePay\Shortcut\Button as ApplePay;
use Magento\Braintree\Block\GooglePay\Shortcut\Button as GooglePay;
use Magento\Braintree\Gateway\Config\PayPal\Config as PaypalConfig;
use Magento\Braintree\Gateway\Config\PayPalCredit\Config as PaypalCreditConfig;

use Gene\BraintreeHiConversion\Helper\Data;

/**
 * Class TestData
 * @package Gene\BraintreeHiConversion\Block
 */
class TestData extends Template
{
    /**
     * @var Data
     */
    private $helper;

    /**
     * @var ApplePay
     */
    private $applePay;

    /**
     * @var GooglePay
     */
    private $googlePay;

    /**
     * @var PaypalConfig
     */
    private $paypalConfig;

    /**
     * @var PaypalCreditConfig
     */
    private $paypalCreditConfig;

    /**
     * @param Context $context
     * @param Data $helper
     * @param ApplePay $applePay
     * @param GooglePay $googlePay
     * @param  PaypalConfig $paypalConfig
     * @param  PaypalCreditConfig $paypalCreditConfig 
     * @param array $data
     */
    public function __construct(
        Context $context,
        Data $helper,
        ApplePay $applePay,
        GooglePay $googlePay,
        PaypalConfig $paypalConfig,
        PaypalCreditConfig $paypalCreditConfig,
        array $data = []
    ) {
        $this->helper = $helper;
        $this->applePay = $applePay;
        $this->googlePay = $googlePay;
        $this->paypalConfig = $paypalConfig;
        $this->paypalCreditConfig = $paypalCreditConfig;

        parent::__construct($context, $data);
    }


    /**
     * is hic enabled
     *
     * @return boolean
     */
    public function isEnabled()
    {
        return $this->helper->isEnabled();
    }


    /**
     * are braintree test enhancements enabled
     *
     * @return boolean
     */
    public function isTestingEnabled()
    {
        return $this->helper->isTestingEnabled();
    }

    /**
     * is ApplePay Active
     *
     * @return boolean
     */
    public function isApplePayActive()
    {
        return (bool) $this->applePay->isActive();
    }

    /**
     * is GooglePay Active
     *
     * @return boolean
     */
    public function isGooglePayActive()
    {
        return (bool) $this->googlePay->isActive();
    }

    /**
     * is Paypal Active
     *
     * @return boolean
     */
    public function isPaypalActive()
    {
        return (bool) $this->paypalConfig->isActive();
    }

    /**
     * is Paypal Active on Cart
     *
     * @return boolean
     */
    public function isPaypalActiveOnCart()
    {
        return (bool) $this->paypalConfig->isDisplayShoppingCart();
    }

    /**
     * is PaypalPdp Active
     *
     * @return boolean
     */
    public function isPaypalActiveOnPdp()
    {
        return (bool) $this->paypalConfig->getProductPageBtnEnabled();
    }

    /**
     * is Credit Active
     *
     * @return boolean
     */
    public function isCreditActive()
    {
        return (bool) $this->paypalCreditConfig->isActive();
    }

    /**
     * get config object
     *
     * @return array
     */
    public function getConfig()
    {
        return [
            'isTestingEnabled' => $this->isTestingEnabled(),
            'isApplePayActive' => $this->isApplePayActive(),
            'isGooglePayActive' => $this->isGooglePayActive(),
            'isPaypalActive' => $this->isPaypalActive(),
            'isPaypalActiveOnCart' => $this->isPaypalActiveOnCart(),
            'isCreditActive' => $this->isCreditActive(),
            'isPaypalActiveOnPdp' => $this->isPaypalActiveOnPdp()
        ];
    }
}
