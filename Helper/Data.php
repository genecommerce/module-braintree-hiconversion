<?php

namespace Gene\BraintreeHiConversion\Helper;

use Magento\Framework\App\Helper\AbstractHelper;
use Magento\Store\Model\ScopeInterface;

/**
 * Class Data
 * @package Gene\BraintreeHiConversion\Helper
 * @author HiConversion <support@hiconversion.com>
 */
class Data extends AbstractHelper
{
    const CONFIG_BASE = 'hiconversion/configuration/';
    const KEY_ENABLED = 'enabled';
    const KEY_DISABLED = 'disabled';
    const KEY_TEST_ENABLED = 'test_enabled';
    const KEY_LOCATION_CART = 'cart';
    const KEY_LOCATION_MINICART = 'minicart';
    const KEY_LOCATION_SITEWIDE = 'sitewide';
    const KEY_PAYPAL_BUTTON_COLOR = 'paypal_button_color';
    const KEY_PAYPAL_BUTTON_SHAPE = 'paypal_button_shape';

    const KEY_PAYPAL = 'paypal';
    const KEY_PAYPAL_CREDIT = 'paypal_credit';
    const KEY_APPLE_PAY = 'apple_pay';
    const KEY_GOOGLE_PAY = 'google_pay';

    /**
     * @param $field
     * @return mixed
     */
    public function getConfigValue($field)
    {
        return $this->scopeConfig->getValue(
            self::CONFIG_BASE . $field,
            ScopeInterface::SCOPE_STORE
        );
    }

    /**
     * @param string $location
     * @param string $name
     * @return boolean
     */
    public function isTestEnabled($location, $name)
    {
        return (bool) $this->getConfigValue($location . '_' . $name . '_' . self::KEY_TEST_ENABLED);
    }

    /**
     * @param string $location
     * @param string $name
     * @return boolean
     */
    public function isButtonDisabled($location, $name)
    {
        return (bool) $this->getConfigValue($location . '_' . $name . '_' . self::KEY_DISABLED);
    }

    /**
     * is paypal express test enabled for cart
     *
     * @return boolean
     */
    public function isCartPaypalExpressTestEnabled()
    {
        return $this->isTestEnabled(self::KEY_LOCATION_CART, self::KEY_PAYPAL);
    }

    /**
     * is paypal express disabled for cart
     *
     * @return boolean
     */
    public function isCartPaypalExpressDisabled()
    {
        return $this->isButtonDisabled(self::KEY_LOCATION_CART, self::KEY_PAYPAL);
    }

    /**
     * is paypal credit test enabled for cart
     *
     * @return boolean
     */
    public function isCartPaypalCreditTestEnabled()
    {
        return $this->isTestEnabled(self::KEY_LOCATION_CART, self::KEY_PAYPAL_CREDIT);
    }

    /**
     * is paypal credit disabled for cart
     *
     * @return boolean
     */
    public function isCartPaypalCreditDisabled()
    {
        return $this->isButtonDisabled(self::KEY_LOCATION_CART, self::KEY_PAYPAL_CREDIT);
    }

    /**
     * is applePay test enabled for cart
     *
     * @return boolean
     */
    public function isCartApplePayTestEnabled()
    {
        return $this->isTestEnabled(self::KEY_LOCATION_CART, self::KEY_APPLE_PAY);
    }

    /**
     * is apple pay disabled for cart
     *
     * @return boolean
     */
    public function isCartApplePayDisabled()
    {
        return $this->isButtonDisabled(self::KEY_LOCATION_CART, self::KEY_APPLE_PAY);
    }

    /**
     * is googlePay test enabled for cart
     *
     * @return boolean
     */
    public function isCartGooglePayTestEnabled()
    {
        return $this->isTestEnabled(self::KEY_LOCATION_CART, self::KEY_GOOGLE_PAY);
    }

    /**
     * is google pay disabled for cart
     *
     * @return boolean
     */
    public function isCartGooglePayDisabled()
    {
        return $this->isButtonDisabled(self::KEY_LOCATION_CART, self::KEY_GOOGLE_PAY);
    }

    /**
     * is paypal express test enabled for minicart
     *
     * @return boolean
     */
    public function isMiniCartPaypalExpressTestEnabled()
    {
        return $this->isTestEnabled(self::KEY_LOCATION_MINICART, self::KEY_PAYPAL);
    }

    /**
     * is paypal express disabled for minicart
     *
     * @return boolean
     */
    public function isMiniCartPaypalExpressDisabled()
    {
        return $this->isButtonDisabled(self::KEY_LOCATION_MINICART, self::KEY_PAYPAL);
    }

    /**
     * is paypal credit test enabled for minicart
     *
     * @return boolean
     */
    public function isMiniCartPaypalCreditTestEnabled()
    {
        return $this->isTestEnabled(self::KEY_LOCATION_MINICART, self::KEY_PAYPAL_CREDIT);
    }

    /**
     * is paypal credit disabled for minicart
     *
     * @return boolean
     */
    public function isMiniCartPaypalCreditDisabled()
    {
        return $this->isButtonDisabled(self::KEY_LOCATION_MINICART, self::KEY_PAYPAL_CREDIT);
    }

    /**
     * is applePay test enabled for minicart
     *
     * @return boolean
     */
    public function isMiniCartApplePayTestEnabled()
    {
        return $this->isTestEnabled(self::KEY_LOCATION_MINICART, self::KEY_APPLE_PAY);
    }

    /**
     * is apple pay disabled for minicart
     *
     * @return boolean
     */
    public function isMiniCartApplePayDisabled()
    {
        return $this->isButtonDisabled(self::KEY_LOCATION_MINICART, self::KEY_APPLE_PAY);
    }

    /**
     * is googlePay test enabled for minicart
     * @return boolean
     */
    public function isMiniCartGooglePayTestEnabled()
    {
        return $this->isTestEnabled(self::KEY_LOCATION_MINICART, self::KEY_GOOGLE_PAY);
    }

    /**
     * is google pay disabled for minicart
     *
     * @return boolean
     */
    public function isMiniCartGooglePayDisabled()
    {
        return $this->isButtonDisabled(self::KEY_LOCATION_MINICART, self::KEY_GOOGLE_PAY);
    }

    /**
     * is paypal button shape test enabled
     * @return boolean
     */
    public function isPaypalButtonShapeTestEnabled()
    {
        return $this->isTestEnabled(self::KEY_LOCATION_SITEWIDE, self::KEY_PAYPAL_BUTTON_SHAPE);
    }

    /**
     * is paypal button color test enabled
     * @return boolean
     */
    public function isPaypalButtonColorTestEnabled()
    {
        return $this->isTestEnabled(self::KEY_LOCATION_SITEWIDE, self::KEY_PAYPAL_BUTTON_COLOR);
    }
}
