<?php
	class SuperSimpleResizer {
		function load($filename){ // what happens when imagecreatefromstring errors out?
			
			$filesizeMb = ceil(filesize($filename) / 1000 / 1000);
			if($filesizeMb > 50){
					ini_set('memory_limit', $filesizeMb + 2 . 'M');
			}

			if (is_file($filename)) { // is_file AND is_image
				$image['source'] = $filename;
				$image['image-type'] = exif_imagetype($filename);
				$image['mime-type'] = image_type_to_mime_type($image['image-type']);
				$image['data'] = @imagecreatefromstring(file_get_contents($filename));
				if($image['data']){
					$image['size']['x'] = imagesx($image['data']);
					$image['size']['y'] = imagesy($image['data']);
					return $image;
				}				
			}
			
			return false; 
		}
		
		function save(&$imageDataArray, $destinationFile){
			$success = false;



			if(!is_dir(dirname($destinationFile))){
				mkdir(dirname($destinationFile));
			}
			
			if(is_file($destinationFile)){
				unlink($destinationFile);
			}

			switch($imageDataArray['image-type']){
				case IMAGETYPE_GIF :
					$success = imagegif($imageDataArray['data'], $destinationFile);
					break;
				case IMAGETYPE_JPEG :
					$success = imagejpeg($imageDataArray['data'], $destinationFile);
					break;
				case IMAGETYPE_BMP :
					$success = imagewbmp($imageDataArray['data'], $destinationFile);
					break;
				case IMAGETYPE_PNG :
					$success = imagepng($imageDataArray['data'], $destinationFile);
					break;
			}
			
			return ($success ? $destinationFile : false);
		}
	
		function resize(&$imageDataArray, $outputWidth, $outputHeight, $zoomPercentage = 0){
				
			$sourceImage = $imageDataArray['data']; 
			if($sourceImage) {
				$outputImage = ImageCreateTrueColor($outputWidth, $outputHeight);
				
				if($imageDataArray['image-type'] === IMAGETYPE_PNG){
					imagefill($outputImage, 0, 0, imagecolorallocatealpha($outputImage, 0, 0, 0, 127));
					imagesavealpha($outputImage, true); 
				}else{
					imagefill($outputImage, 0, 0, imagecolorallocate($outputImage, 255, 255, 255));	
				}

				if($outputImage) {
					$sourceWidth = $imageDataArray['size']['x'];
					$sourceHeight = $imageDataArray['size']['y'];
					
					$scaleX = (float)$outputWidth / $sourceWidth;
					$scaleY = (float)$outputHeight / $sourceHeight;
					$scale = min($scaleX, $scaleY, 1) * ((100 + $zoomPercentage) / 100);
					
					$resizeImageWidth = $outputWidth;
					$resizeImageHeight = $outputHeight;
					$resizeImageX = $resizeImageY = 0;
					
					$resizeImageWidth = (int)($scale * $sourceWidth + 0.5);
					$resizeImageHeight = (int)($scale * $sourceHeight + 0.5);
					
					// Keep pic centered in frame.
					$resizeImageX = (int)(0.5 * ($outputWidth - $resizeImageWidth));
					$resizeImageY = (int)(0.5 * ($outputHeight - $resizeImageHeight));
					
					if($scaleX > 1 && $scaleY > 1){
						CakeLog::write('size', "Code : 111 - Image smaller (".$sourceWidth."x".$sourceHeight.") than requested (".$outputWidth."x".$outputHeight.") [".$_SERVER['REQUEST_URI']."]");
					} 
					imagecopyresampled($outputImage, $sourceImage, $resizeImageX, $resizeImageY, 0, 0, $resizeImageWidth, $resizeImageHeight, $sourceWidth, $sourceHeight); 
					
					$imageDataArray['data'] = $outputImage; // replace thumbnailData with resized data
					return $imageDataArray;
				}
			}
						
			return false;
		}
	}
?>