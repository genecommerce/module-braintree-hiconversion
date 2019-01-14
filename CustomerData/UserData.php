<?php

namespace Gene\BraintreeHiConversion\CustomerData;

use Magento\Customer\CustomerData\SectionSourceInterface;

/**
 * Class UserData
 * @package Gene\BraintreeHiConversion\CustomerData
 * @author HiConversion <support@hiconversion.com>
 */
class UserData implements SectionSourceInterface
{
    /**
     * @var \Gene\BraintreeHiConversion\Helper\Data
     */
    private $helper;

    /**
     * UserData constructor.
     * @param \Gene\BraintreeHiConversion\Helper\Data $helper
     */
    public function __construct(
        \Gene\BraintreeHiConversion\Helper\Data $helper
    ) {
        $this->helper = $helper;
    }

    /**
     * {@inheritdoc}
     */
    public function getSectionData()
    {
        $data = [];
        if ($this->helper->isEnabled()) {
            $user = $this->getUserData();
            if (null !== $user) {
                $data = $user;
            }
        } else {
            $data["disabled"] = true;
        }
        return $data;
    }

    /**
     * gets user data from helper
     *
     * @return object
     */
    private function getUserData()
    {
        return $this->helper->getUserData();
    }
}
