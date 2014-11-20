<?php

class CompressController extends Controller {
	var $name = "Compress";
	var $autoRender = false;
	var $time;
	 
	function js(){
		$time = microtime(true);
		App::import('Vendor', 'Uglify/uglify');
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

			$compiler = new UglifyJS();
			$fullScript = $compiler
							->advancedMode()
							->send($fullScript);

			Cache::write(md5($_SERVER['REQUEST_URI']), $fullScript);
			Cache::write(md5($_SERVER['REQUEST_URI'] . '-time'), strtotime('now'));
		}

		//$this->output('text/javascript', $fullScript, Cache::read(md5($_SERVER['REQUEST_URI'] . '-time')));
	}
	
	function css(){
		//App::import('Vendor', 'CSSTidy', array('file' =>'CSSTidy'.DS.'class.csstidy.php'));
		$time = microtime(true);	
		$filesArray = explode(",", str_replace("/compress/css/", "", $_SERVER['REQUEST_URI']));
		$css = false;//Cache::read(md5($_SERVER['REQUEST_URI']));
		if($css === false){
			$css = '';
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
					if(is_file(WWW_ROOT . $file)){
						$css .= file_get_contents(WWW_ROOT . $file);
					}
				}
				
			}
			Cache::write(md5($_SERVER['REQUEST_URI']), $css);
			Cache::write(md5($_SERVER['REQUEST_URI'] . '-time'), strtotime('now'));
		}
		
		// $cssTidy = new csstidy();
		// $cssTidy->parse($css);
		// $cssTidy->print->plain();
		$this->output('text/css', $css, Cache::read(md5($_SERVER['REQUEST_URI'] . '-time')));
	}

	function output($mime, $content, $modified){
		
		if(isset($_SERVER['HTTP_IF_MODIFIED_SINCE']) && strtotime($_SERVER['HTTP_IF_MODIFIED_SINCE']) == $modified){
			header("HTTP/1.1 304 Not Modified");
			header("Status: 304 Not Modified");
			header("Last-Modified: " . gmdate('r', $modified . " GMT"));
			header("X-Execution-Time: " . (microtime(true) - $time)/10000);
			
			exit;
		}else{
			$displayContent = true;
		}

		header("Content-Type: " . $mime);
		$seconds_to_cache = 31556926;
		$ts = gmdate("D, d M Y H:i:s", time() + $seconds_to_cache) . " GMT";
		header("Expires: $ts");
		header("Last-Modified: " . gmdate('r', $modified . " GMT"));
		header("Pragma: public");
		header("Cache-Control: public max-age=$seconds_to_cache");
		header("X-Execution-Time: " . (microtime(true) - $time)/10000);

		if($displayContent){
			echo $content;
		}
		exit;
	}
}
?>