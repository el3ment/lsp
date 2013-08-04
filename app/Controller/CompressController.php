<?php

class CompressController extends Controller {
	var $name = "Compress";
	var $autoRender = false;
	 
	function js(){
		App::import('Vendor', 'JSMin');
		$filesArray = explode(",", str_replace("/compress/js/", "", $_SERVER['REQUEST_URI']));
		$fullScript = "";
		foreach($filesArray as $file){
			$fullScript .= '/* '. $file .' */' . PHP_EOL;
		}
		foreach($filesArray as $file){
			$fullScript .= '/* '. $file .' */' . PHP_EOL;
			if(is_file(WWW_ROOT . $file)){
				$fullScript .= file_get_contents(WWW_ROOT . $file) . PHP_EOL;
			}
		}
		
		header("Content-Type: text/javascript");

		echo $fullScript;
		die();
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