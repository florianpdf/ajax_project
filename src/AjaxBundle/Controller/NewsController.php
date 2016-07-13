<?php

namespace AjaxBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

use AjaxBundle\Entity\News;
use AjaxBundle\Form\NewsType;

/**
 * News controller.
 *
 */
class NewsController extends Controller
{
    /**
     * Creates a new News entity.
     *
     */
    public function newAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $all_news = $em->getRepository('AjaxBundle:News')->findAll();
        $nb_news = $em->getRepository('AjaxBundle:News')->getNbNews();
        
        $news = new News();
        $form = $this->createForm('AjaxBundle\Form\NewsType', $news);
        $form->handleRequest($request);

        if ($request->isMethod('POST')){
            if ($form->isValid()){
                $news = $form->getData();
                $em->persist($news);
                $em->flush();

                $template = 'AjaxBundle:news:show_news.html.twig';
                $html_result = $this->renderView($template, array(
                    'news' => $news));

                return new JsonResponse(array(
                    'success' => true,
                    'template' => $html_result,
                    'id' => $news->getId()
                ));
            }
        }

//        if ($form->isSubmitted() && $form->isValid()) {
//            $em->persist($news);
//            $em->flush();
//            $news = null;
//
//            return $this->redirectToRoute('ajax_homepage', array(
//                'form' => $form->createView(),
//                'all_news' => $all_news
//            ));
//        }

        return $this->render('AjaxBundle:news:index.html.twig', array(
            'nb_news' => $nb_news,
            'news' => $news,
            'form' => $form->createView(),
            'all_news' => $all_news
        ));
    }

    /**
     * Displays a form to edit an existing News entity.
     *
     */
    public function editAction(Request $request, News $news)
    {
        $editForm = $this->createForm('AjaxBundle\Form\NewsType', $news);
        $editForm->handleRequest($request);

        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($news);
            $em->flush();

            $all_news = $em->getRepository('AjaxBundle:News')->findAll();
            $form = $this->createForm('AjaxBundle\Form\NewsType');

            return $this->redirectToRoute('ajax_homepage', array(
                'form' => $form->createView(),
                'all_news' => $all_news
            ));
        }

        return $this->render('AjaxBundle:news:edit.html.twig', array(
            'news' => $news,
            'edit_form' => $editForm->createView(),
        ));
    }

    /**
     * Remove an existing record and a file.
     *
     */
    public function deleteAction(Request $request, $id) {

        $em = $this->getDoctrine()->getManager();
        $news = $em->getRepository('AjaxBundle:News')->find($id);
        $all_news = $em->getRepository('AjaxBundle:News')->findAll();
        $form = $this->createForm('AjaxBundle\Form\NewsType');

        $em->remove($news);
        $em->flush();

        if ($request->isMethod('POST')) {
            return new JsonResponse(array(
                'success' => true,
                'id' => $id
            ));
        }

        return $this->redirectToRoute('ajax_homepage', array(
            'news' => $news,
            'form' => $form->createView(),
            'all_news' => $all_news
        ));
    }
}
