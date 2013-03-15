<?php

class CompressController extends Controller {
	var $name = "Compress";
	var $autoRender = false;
	 
	function js(){
			
		App::import('Vendor', 'JSMin');
		
		$filesArray = explode(",", str_replace("/compress/js/", "", $_SERVER['REQUEST_URI']));
		$fullScript = "";
		foreach($filesArray as $file){
			$fullScript .= file_get_contents('/www/'.$file);
		}
		
		return JSMin::minify($fullScript);
	}
	
	function css(){
		App::import('Vendor', 'CSSTidy', array('file' =>'CSSTidy'.DS.'class.csstidy.php'));
		
		$filesArray = explode(",", str_replace("/compress/css/", "", $_SERVER['REQUEST_URI']));
		$css = "";
		foreach($filesArray as $file){
			$css .= file_get_contents('/www/'.$file);
		}
		
		$cssTidy = new csstidy();
		$cssTidy->parse($css);
		
		return $cssTidy->print->formatted();
	}
		 
}

?>