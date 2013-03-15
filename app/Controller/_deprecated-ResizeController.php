<?php

define("IMAGE_QUALITY", 80);
define("WWW_DIRECTORY", "/www");
define("ERROR_IMAGE", WWW_DIRECTORY.DS.'static-source'.DS.'images/product-image/no-image.png');

function imageError($errno, $errstr, $errfile, $errline){
		$resizer = new SimpleResizer();	
		$resizer->output(ERROR_IMAGE);
		error_log("PHP Error : <".$_SERVER['REQUEST_URI']."> ". $errstr, 0);
		die();
}

class ResizeController extends Controller {
	var $name = "Resize";
	 
	function output($imagePath){
			ini_set('memory_limit', '256M');
			set_error_handler("imageError");
			App::import('Vendor', 'SimpleResizer');
			$imagePath = urldecode(str_replace("/resize/", "", $_SERVER['REQUEST_URI']));
			$imagePath = str_replace("http:/www.", "http://www.", $imagePath);
			
			$start = strlen($imagePath) - strpos(strrev($imagePath), ".");
			$end = strlen($imagePath);
			$sizePortion = substr($imagePath, $start, $end-$start);
			$requestedSizes = explode("x", $sizePortion);
			if(strpos("---".$imagePath, "http://www.lonestarpercussion.com") > 0 && strpos("---".$imagePath, "http://www.lonestarpercussion.com") < 10){
				if(is_array($requestedSizes) && count($requestedSizes) > 1){
					$requestedSizes = array('width' => $requestedSizes[0], 'height' => $requestedSizes[1]);
					if(is_numeric($requestedSizes['width']) && is_numeric($requestedSizes['height'])){
						$imagePath = str_replace(".".$sizePortion, "", $imagePath);
					}
				}
				$filename = md5($imagePath);
				if(!is_file(WWW_DIRECTORY.DS."static-source/images/site-categories/".$filename)){
					file_put_contents(WWW_DIRECTORY.DS."static-source/images/site-categories/".$filename, file_get_contents($imagePath));
				}
				$imagePath = "images/site-categories/".$filename;
			}

			$imageFile = WWW_DIRECTORY.DS."static-source/".str_replace(".".$sizePortion, "", $imagePath);
			
			$requestedSizes = explode("x", $sizePortion);
			if(is_array($requestedSizes) && count($requestedSizes) > 1){
				$requestedSizes = array('width' => $requestedSizes[0], 'height' => $requestedSizes[1]);
				$thumbnailFilename = WWW_DIRECTORY.DS.'static-source'.DS.'thumbnails'.DS.$imagePath;
				if(is_file($imageFile) && is_numeric($requestedSizes['width']) && is_numeric($requestedSizes['height'])){
	
					if(is_file($thumbnailFilename) && filemtime($thumbnailFilename) > filemtime($imageFile)){
						$resizer = new SimpleResizer();
						$resizer->output($thumbnailFilename);
						die();
					}else{	
						$resizer = new SimpleResizer();
						$resizer->load($imageFile);
						$resizer->resize($requestedSizes['width'], $requestedSizes['height']);
						$resizer->save($thumbnailFilename, IMAGE_QUALITY);
						$resizer->destroy();
						$resizer->output($thumbnailFilename);
						die();
					}
				}else{
					$resizer = new SimpleResizer();	
					$resizer->output(ERROR_IMAGE);
					
					if($_SERVER['REQUEST_URI'] != "/resize/.120x120"){ // if request is not category that dosen't have an image - we can't know what the product is
						error_log("There was an error with file (1): <".$_SERVER['REQUEST_URI'].">", 0);
					}
					die();
					 
				}
			}else{
				if(is_file(WWW_DIRECTORY.DS."static-source/".$imagePath)){
					$resizer = new SimpleResizer();
					$resizer->output(WWW_DIRECTORY.DS."static-source/".$imagePath);
					die();
				}else{
					$resizer = new SimpleResizer();	
					$resizer->output(ERROR_IMAGE);
					error_log("This file does not exist (2) : <".$_SERVER['REQUEST_URI'].">", 0);
					die();
				}
					
			}
				
		$this->autoRender = false;
		die();
	}
	 
}
?>