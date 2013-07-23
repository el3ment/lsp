<?php

define('SOURCE_DIRECTORY', ROOT . '/static');
define('ERROR_IMAGE', '/images/product-image/no-image.png');
define('THUMBNAIL_DIRECTORY', SOURCE_DIRECTORY . '/thumbnails');
define('FULLIMAGE_DIRECTORY', SOURCE_DIRECTORY);
define('REMOTE_DIRECTORY', '/remote');
define('FORCE_RENDER', false); // Set to true if you are trying to debug image resizing operations
								   // Set to false will use saved copies of the thumbnails

class ThumbnailController extends Controller {
    var $name = "Thumbnail";
     
    function _parsePath($URI){ // Parse URI into array containing sizes[x], sizes[y], isRemote, imagePath
    
		$path = urldecode($URI);
		$path = str_replace("http:/www.", "http://www.", $path); // A tiny common error with NetSuite
		if(strpos($path, "?")){
			$path = preg_replace('/\?[0-9]+/', '', $path);
		}
		$sizeStart = strlen($path) - strpos(strrev($path), ".");
		$sizeEnd = strlen($path);
		$sizePortion = substr($path, $sizeStart, $sizeEnd-$sizeStart);
		$requestedSizes = explode("x", $sizePortion); // Make an array with the sizes
		
		$returnObject['imagePath'] = $path;
		$returnObject['fullImagePath'] = FULLIMAGE_DIRECTORY . $returnObject['imagePath'];
		if(is_array($requestedSizes) && count($requestedSizes) >= 2 && is_numeric($requestedSizes[0]) && is_numeric($requestedSizes[1])){
			// If the sizes are properly formatted, let's add them to the return object
			$returnObject['size']['width'] = $requestedSizes[0];
			$returnObject['size']['height'] = $requestedSizes[1];
			if(isset($requestedSizes[2])){
				$returnObject['size']['zoom'] = $requestedSizes[2];
			}
			
			$returnObject['imagePath'] = substr($path, 0, $sizeStart - 1);
			$returnObject['fullImagePath'] = FULLIMAGE_DIRECTORY . $returnObject['imagePath'];
			$returnObject['thumbnailImagePath'] = THUMBNAIL_DIRECTORY . $returnObject['imagePath'] . '.' . $returnObject['size']['width'] . 'x' . $returnObject['size']['height'] . (isset($returnObject['size']['zoom']) ? 'x' . $returnObject['size']['zoom'] : '');
		}
		
		// If a remote image is requested, only allow lonestarpercussion as a host
		$returnObject['isRemote'] = false;
		$remoteURLParsed = parse_url(substr($returnObject['imagePath'], 1, 1000)); // Remove the starting /
		if(isset($remoteURLParsed['host']) && $remoteURLParsed['host'] === 'www.lonestarpercussion.com'){
				
			$returnObject['isRemote'] = true;
			$returnObject['remotePath'] = substr($returnObject['imagePath'], 1, 1000); // Remove starting /
			
			// Download the image, and parse the local location in as imagePath
			$returnObject['imagePath'] = REMOTE_DIRECTORY . DS . md5($returnObject['remotePath']);	
			$returnObject['fullImagePath'] = FULLIMAGE_DIRECTORY . $returnObject['imagePath'];
			if(!is_file($returnObject['fullImagePath'])){
				$this->_saveFile($this->_getFile($returnObject['remotePath']), $returnObject['fullImagePath']);
			}
			
			if(isset($returnObject['size'])){
				$returnObject['thumbnailImagePath'] = THUMBNAIL_DIRECTORY . $returnObject['imagePath']. '.' . $returnObject['size']['width'] . 'x' . $returnObject['size']['height'] . (isset($returnObject['size']['zoom']) ? 'x' . $returnObject['size']['zoom'] : '');
			}
		}
		
		
		return $returnObject;	
	}
	
	function _saveFile($sourceFile, $destinationPath){ // Save filedata to destinationPath
		if(!file_put_contents($destinationPath, $sourceFile)){
			return false;
		}
		
		return $destinationPath;
	}
	
	function _getFile($filename){ // Return filedata

		echo $filename;
		die();

		$file = file_get_contents($filename);
		
		return $file;
	}
	
	function _handleError($request, $code, $message){
		switch($code){
			case 404:
				header("HTTP/1.1 404 File Not Found");
				header("Status: 404 File Not Found");
				break;
			default:
				header("HTTP/1.1 503 Service Temporarily Unavailable");
				header("Status: 503 Service Temporarily Unavailable");
				header("Retry-After: 120");
		}
		
		header("Connection: Close");
		header("X-Error-Message: " . $message);
		
		// Pretend the user requested an error image
		$request['imagePath'] = ERROR_IMAGE;
		$request['fullImagePath'] = FULLIMAGE_DIRECTORY . $request['imagePath'];
		$request['thumbnailImagePath'] = THUMBNAIL_DIRECTORY . $request['imagePath'];
		$filename = FULLIMAGE_DIRECTORY . $request['imagePath'];
		if(isset($request['size']) && count($request['size']) >= 2){
			$filename = $this->_resize($request);
		}
		$this->log("Code : ".$code." - ".$message." [".$_SERVER['REQUEST_URI']."]", 'resize');
		return $this->_render($filename, true); 
	}

	function _resize($request){ // Resize an image, return saved thumbnail filename

		App::import('Vendor', 'SuperSimpleResizer');
		$resizer = new SuperSimpleResizer();	
		
		// Let's start by assuming the thumbnail exists
		if(!(is_file($request['thumbnailImagePath']) && getimagesize($request['thumbnailImagePath'])) || !is_file($request['thumbnailImagePath']) || (is_file($request['thumbnailImagePath']) && filemtime($request['thumbnailImagePath']) < filemtime($request['fullImagePath'])) || FORCE_RENDER){
			// If we don't already have a thumbnail, FORECE_THUMBNAILS is off, or the thumbnail is older than the full image
			
			if($request['fullImagePath']){ // If downloading a remote image failed, this will be false, otherwise, it will be true
				
				
				
				$imageDataArray = $resizer->load($request['fullImagePath']);
				$thumbnailImageDataArray = ($imageDataArray ? $resizer->resize($imageDataArray, 
																	$request['size']['width'], 
																	$request['size']['height'], 
																	(isset($request['size']['zoom']) ? $request['size']['zoom'] : 0)) : false);
				
				if($thumbnailImageDataArray){ // If load and resize both completed successfully, save and return the filename
					//header("X-File-Was-Resized: True");
					return $resizer->save($thumbnailImageDataArray, $request['thumbnailImagePath']);
				}
			}
			
			return null; // Downloading a remote image failed
		}
		// If the thumbnail exists, skip the resize, and return the filename
		//header("X-File-Was-Resized: False");
		return $request['thumbnailImagePath'];
	}
	
	function _render($filename, $forceDisplay = false){ // Output an image to the client

		if(is_file($filename)){
			// Take advantage of 304 Caching
			//if(!FORCE_RENDER && isset($_SERVER['HTTP_IF_MODIFIED_SINCE']) && strtotime($_SERVER['HTTP_IF_MODIFIED_SINCE']) == filemtime($filename) && !$forceDisplay){
			//	header("HTTP/1.1 304 Not Modified");
			//	header("Status: 304 Not Modified");
			//	header("Last-Modified: " . gmdate('r', filemtime($filename)) . " GMT");
				
			//	return true;
			//}
			
			// If the file was created more than 7 days ago, set far-future expires header
			// but if it was created within a week -- set the expires header for tomorrow,
			// this gives us a week or so of buffer time to fix any errors with images
			
			$expires = (time() - filemtime($filename) > 60*60*24*7) ?  77760000 : 86400;
	        header("Content-Type: " . mime_content_type($filename)); // need to handle mime-type detection
	        header("Last-Modified: " . gmdate('r', filemtime($filename)));
			header("Pragma: public");
			header("Cache-Control: public maxage=" . $expires);
			header('Expires: ' . gmdate('D, d M Y H:i:s', time() + $expires) . ' GMT');
			header('X-Peak-Memory-Usage: '.(int)(memory_get_peak_usage() / 1000).'k');
			
			readfile($filename);
			
			return true; 
		} 

		return false;
	}
	
	function resize($path){

		ini_set('memory_limit', '512M'); // Enough to load a large image into memory
		
		//Configure::write('debug', 2); // Uncomment for debugging
		
		$cleanURI = str_replace('/thumbnail/resize', '', $_SERVER['REQUEST_URI']);
		$cleanURI = str_replace('/resize', '', $cleanURI);
		$request = $this->_parsePath($cleanURI);
		
        $outputImageFilename = $request['fullImagePath']; // Assume it's a full-size image
        
        if(isset($request['size']) && is_array($request['size'])){
        	// If it needs a resize, resize/grab the thumbnail filename
		    $outputImageFilename = $this->_resize($request, true);
        }
		if($outputImageFilename){
			if(!$this->_render($outputImageFilename)){
				$this->_handleError($request, 404, 'Image file ['.$outputImageFilename.'] not found (A)');
			}
		}else{
			if(is_file($request['fullImagePath'])){
				$this->_handleError($request, 503, 'Error resizing image');
			}else{
				$this->_handleError($request, 404, 'Image file not found (B)');
			}
		}
		
		die(); // Without this, cakePHP is returning text/html as a content-type.. I couldn't figure it out
	}
    
}
?>