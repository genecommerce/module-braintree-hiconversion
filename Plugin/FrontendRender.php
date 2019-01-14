<?php

namespace Gene\BraintreeHiConversion\Plugin;

use Magento\Framework\ObjectManagerInterface;
use Magento\Framework\View\Page\Config\Renderer;

/**
 * Class HicPlugin
 * Plugin for injecting head content at top of head
 * @package Magento\Braintree\Plugin
 * @author HiConversion <support@hiconversion.com>
 */
class FrontendRender
{
    /**
     * @var \Magento\Framework\View\Element\TemplateFactory
     */
    private $templateFactory;

    /**
     * FrontendRender constructor.
     * @param \Magento\Framework\View\Element\TemplateFactory $templateFactory
     */
    public function __construct(
        \Magento\Framework\View\Element\TemplateFactory $templateFactory
    ) {
        $this->templateFactory = $templateFactory;
    }

    /**
     * @param string $templateName
     * @return string
     **/
    private function getBlockHtml($templateName)
    {
        return $this->templateFactory->create()
            ->setTemplate('Gene_BraintreeHiConversion::head/' . $templateName)
            ->toHtml();
    }

    /**
     * @param Renderer $subject
     * @param string $html
     * @return string
     */
    public function afterRenderHeadContent(Renderer $subject, $html)
    {
        $tagAlways = $this->getBlockHtml('always.phtml');
        $tagPage = $this->getBlockHtml('page.phtml');
        $tagNever = $this->getBlockHtml('never.phtml');
        return $tagAlways . $tagPage . $tagNever . $html;
    }
}