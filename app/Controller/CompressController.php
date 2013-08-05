<?php

class CompressController extends Controller {
	var $name = "Compress";
	var $autoRender = false;
	 
	function js(){
		App::import('Vendor', 'JSMin');

		$fullScript = Cache::read(md5($_SERVER['REQUEST_URI']));
		if($fullScript === false){
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
			Cache::write(md5($_SERVER['REQUEST_URI']), $fullScript);
		}
		$this->render('text/javascript', $css);
	}
	
	function css(){
		//App::import('Vendor', 'CSSTidy', array('file' =>'CSSTidy'.DS.'class.csstidy.php'));
		
		$filesArray = explode(",", str_replace("/compress/css/", "", $_SERVER['REQUEST_URI']));
		$css = Cache::read(md5($_SERVER['REQUEST_URI']));
		if($css === false){
			foreach($filesArray as $file){
				if(strpos($file, 'scss') > 0){
					if (file_exists(WWW_ROOT . $file)) {
						$sassOptions = array('debug', 'debug_info', 'style', 'property_syntax', 'cache', 'always_update', 'template_location', 'css_location', 'cache_location', 'load_paths', 'line', 'line_numbers');
						$options = array();
						foreach ($sassOptions as $option) {
							$_option = Configure::read("Sass.$option");
							if (!is_null($_option)) {
								$options[$option] = $_option;
								//echo $option . ' - ' . $options[$option];
							}
						} // foreach
						
						App::import('Vendor', 'PHPSass', array('file'=>'phpsass'.DS.'SassParser.php'));
						$parser = new SassParser($options);
						$css .= $parser->toCss(WWW_ROOT . $file);
					}
				}else{
					//echo WWW_ROOT . $file;
					$css .= file_get_contents(WWW_ROOT . $file);
				}
				
			}
			Cache::write(md5($_SERVER['REQUEST_URI']), $css);
		}
		
		// $cssTidy = new csstidy();
		// $cssTidy->parse($css);
		$this->render('text/css', $css);
	}

	render : function($mime, $content){
			if(!FORCE_RENDER && isset($_SERVER['HTTP_IF_MODIFIED_SINCE']) && strtotime($_SERVER['HTTP_IF_MODIFIED_SINCE']) == filemtime($filename) && !$forceDisplay){
				header("HTTP/1.1 304 Not Modified");
				header("Status: 304 Not Modified");
				header("Last-Modified: " . gmdate('r', filemtime($filename)) . " GMT");
				
				return true;
			}
		
		header("Content-Type: text/css");
		$seconds_to_cache = 31556926;
		$ts = gmdate("D, d M Y H:i:s", time() + $seconds_to_cache) . " GMT";
		header("Expires: $ts");
		header("Pragma: cache");
		header("Cache-Control: maxage=$seconds_to_cache");



		echo $css;
		die();
	}
}

?>