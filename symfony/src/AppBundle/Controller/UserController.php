<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints as Assert;
use AppBundle\Services\Helpers;
use AppBundle\Services\JwtAuth;

use BackendBundle\Entity\User;

class UserController extends Controller{

	public function newAction(Request $request){
		$helpers = $this->get(Helpers::class);

		$json = $request->get("json", null);
		$params = json_decode($json);

		$data = array(
			'status' => 'error',
			'code'	 => 400,
			'msg'	 => 'User not created!'	
		);

		if($json !=null){
			$createdAt = new \Datetime("now");
			$role = 'user';

			$email = (isset($params->email)) ? $params->email : null;
			$name = (isset($params->name)) ? $params->name : null;
			$surname = (isset($params->surname)) ? $params->surname : null;
			$password = (isset($params->password)) ? $params->password : null;

			$emailConstraint = new Assert\Email();
			$emailConstraint->message = "This email is not valid!";
			$validate_email = $this->get("validator")->validate($email, $emailConstraint);

			if($email != null && count($validate_email)==0 && $password != null && $name != null && $surname != null){

				$user = new User();
				$user->setCreatedAt($createdAt);
				$user->setRole($role);
				$user->setEmail($email);
				$user->setName($name);
				$user->setSurname($surname);

				$pwd = hash('sha256',$password);
				$user->setPassword($pwd);

				$em = $this->getDoctrine()->getManager();
				$isset_user = $em->getRepository('BackendBundle:User')->findBy(array(
					"email" => $email
				));

				if(count($isset_user)==0){
					$em->persist($user);
					$em->flush();

					$data = array(
						'status' => 'success',
						'code'	 => 200,
						'msg'	 => 'New user created !!',
						'user' 	 => $user
					);
				}else{
					$data = array(
						'status' => 'error',
						'code'	 => 400,
						'msg'	 => 'User not created, duplicated !!'
					);
				}
			}

		}

		return $helpers->json($data);
		
	}

	public function editAction(Request $request){
		$helpers = $this->get(Helpers::class);
		$jwt_auth = $this->get(JwtAuth::class);

		$token = $request->get("authorization",null);//this variable comes in $POST

		$authCheck = $jwt_auth->checkToken($token);

		if($authCheck){
				//entity manager
				$em = $this->getDoctrine()->getManager();

				//get the user info via token
				$identity = $jwt_auth->checkToken($token, true);

				//get the user object to update
				$user = $em->getRepository('BackendBundle:User')->findOneBy(array(
					'id' => $identity->sub
				));

				$json = $request->get("json", null);
				$params = json_decode($json);

				$data = array(
					'status' => 'error',
					'code'	 => 400,
					'msg'	 => 'User not created!'	
				);

			if($json !=null){
				//$createdAt = new \Datetime("now");
				$role = 'user';

				$email = (isset($params->email)) ? $params->email : null;
				$name = (isset($params->name)) ? $params->name : null;
				$surname = (isset($params->surname)) ? $params->surname : null;
				$password = (isset($params->password)) ? $params->password : null;

				$emailConstraint = new Assert\Email();
				$emailConstraint->message = "This email is not valid!";
				$validate_email = $this->get("validator")->validate($email, $emailConstraint);

				if($email != null && count($validate_email)==0 || $password != null || $name != null || $surname != null){

					//$user->setCreatedAt($createdAt);
					$user->setRole($role);
					$user->setEmail($email);
					$user->setName($name);
					$user->setSurname($surname);

					if($password!=null){
						$pwd=hash('sha256', $password);
						$user->setPassword($pwd);
					} 

					$isset_user = $em->getRepository('BackendBundle:User')->findBy(array(
						"email" => $email
					));

					if(count($isset_user)==0 || $identity->email == $email){
						$em->persist($user);
						$em->flush();

						$data = array(
							'status' => 'success',
							'code'	 => 200,
							'msg'	 => 'New user updated !!',
							'user' 	 => $user
						);
					}else{
						$data = array(
							'status' => 'error',
							'code'	 => 400,
							'msg'	 => 'User not updated, duplicated !!'
						);
					}
				}
			}
		}else{
				$data = array(
					'status' => 'error',
					'code'	 => 400,
					'msg'	 => 'Authorization not valid!'	
				);
		}
		return $helpers->json($data);
		
	}
}