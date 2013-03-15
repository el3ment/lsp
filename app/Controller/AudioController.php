<?php

define('SOURCE_DIRECTORY', '/www/static-source');
define('ERROR_IMAGE', '/images/product-image/no-image.png');
define('THUMBNAIL_DIRECTORY', SOURCE_DIRECTORY . '/thumbnails');
define('FULLIMAGE_DIRECTORY', SOURCE_DIRECTORY);
define('AUDIO_DIRECTORY', SOURCE_DIRECTORY . '/audio');
define('REMOTE_DIRECTORY', '/remote');
define('FORCE_RENDER', false); // Set to true if you are trying to debug image resizing operations
								   // Set to false will use saved copies of the thumbnails

Configure::write('debug', 3);
								   
class AudioController extends Controller {
    var $name = "Audio";
    

	function _printColorSquare($color=array(255, 255, 255), $width=32, $height=32){
		
		header("Content-Type: image/png");
		header("Pragma: public");
		header("Cache-Control: public maxage=0");
		header('Expires: ' . gmdate('D, d M Y H:i:s', time() - 10000) . ' GMT');
		header('X-Peak-Memory-Usage: '.(int)(memory_get_peak_usage() / 1000).'k');
		
		$image = imagecreatetruecolor($width, $height);

		// sets background to red
		$colorAlloc = imagecolorallocate($image, $color[0], $color[1], $color[2]);
		imagefill($image, 0, 0, $colorAlloc);
		imagepng($image);
		imagedestroy($image);
			
	}

	function doesExistImage($path){
			
		$testFilepath = AUDIO_DIRECTORY . str_replace('/audio/doesExistImage', '', $_SERVER['REQUEST_URI']);
		
		if(is_file($testFilepath)){
			$this->_printColorSquare(array(0, 255, 0)); // green square
		}else{
			$this->_printColorSquare(array(255, 0, 0)); // red square
		}
		
		die();
	}
    
}
?>