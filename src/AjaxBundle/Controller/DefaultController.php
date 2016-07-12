<?php

namespace AjaxBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('AjaxBundle:Default:index.html.twig');
    }
}
