<?php
class SimpleResizer {
 
   var $image;
   var $image_type;
   var $mime_type;
 
   function load($filename) {
	  $filename = $filename;
      $image_info = getimagesize($filename);
      $this->image_type = exif_imagetype($filename);
	  $this->mime_type = image_type_to_mime_type($this->image_type);
		if($this->mime_type == "image/x-png"){
			$this->mime_type = "image/png";
			$this->image_type = IMAGETYPE_PNG;
		}
      if( $this->image_type == IMAGETYPE_JPEG ) {
 
         $this->image = imagecreatefromjpeg($filename);
      } elseif( $this->image_type == IMAGETYPE_GIF ) {
 
         $this->image = imagecreatefromgif($filename);
      } elseif( $this->image_type == IMAGETYPE_PNG ) {
 
         $this->image = imagecreatefrompng($filename);
      }elseif( $this->image_type == IMAGETYPE_BMP ) {
 
         $this->image = imagecreatefromwbmp($filename);
      }
   }
   function save($filename, $compression=75, $permissions=null) {
 	  $image_type = $this->image_type;
	  if(!is_dir(dirname($filename))){
	  	mkdir(dirname($filename));
	  }
      if( $image_type == IMAGETYPE_JPEG ) {
         imagejpeg($this->image,$filename,$compression, IMAGE_QUALITY);
      } elseif( $image_type == IMAGETYPE_GIF ) {
 		
         imagegif($this->image,$filename);
      } elseif( $image_type == IMAGETYPE_PNG ) {
 		
         imagepng($this->image,$filename, (IMAGE_QUALITY-10)/10);
      }
      if( $permissions != null) {
         chmod($filename,$permissions);
      }
   }
   function destroy(){
   		imagedestroy($this->image);
   }
   function output($filename) {
		if(!$this->mime_type){
		  $image_info = getimagesize($filename);
		  $this->image_type = exif_imagetype($filename);
		  $this->mime_type = image_type_to_mime_type($this->image_type);
		}
		if($this->mime_type == "image/x-png"){
			$this->mime_type = "image/png";
		}
		if(time() - filemtime($filename) > 60*60*24*7){ // if file was modified over a week ago, assume
														// the crushing has happened, and extend the cache
			$expires = 77760000; // far future expires
		}else{ 
			$expires = 60*60*24; //24 hrs
		}
 	  header('Content-Type: '.$this->mime_type);
	  header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
	  header("Pragma: public");
	  header("Cache-Control: maxage=".$expires);
	  header('Expires: ' . gmdate('D, d M Y H:i:s', time()+$expires) . ' GMT');
	  
	  if(is_file($filename)){
		readfile($filename);
	  }
   }
   function getWidth() {
 
      return imagesx($this->image);
   }
   function getHeight() {
 
      return imagesy($this->image);
   }
   function resizeToHeight($height) {
 
      $ratio = $height / $this->getHeight();
      $width = $this->getWidth() * $ratio;
      $this->resize($width,$height);
   }
 
   function resizeToWidth($width) {
      $ratio = $width / $this->getWidth();
      $height = $this->getheight() * $ratio;
      $this->resize($width,$height);
   }
 
   function scale($scale) {
      $width = $this->getWidth() * $scale/100;
      $height = $this->getheight() * $scale/100;
      $this->resize($width,$height);
   }
 
	function resize($w, $h)
	{
	   
	   $src_img = $this->image;
	    //$dst_img = imagecreatetruecolor($w, $h);
	    // If distortion stretching is within the range below,
	    // then let image be distorted.
	    $lowend = 0;
	    $highend = 1.25;
		
	    if($src_img)
	    {
	        $dst_img = ImageCreateTrueColor($w, $h);
			imagefill($dst_img, 0, 0, imagecolorallocate($dst_img, 255, 255, 255));
			
	        if($dst_img)
	        {
	            $src_w = imageSX($src_img);
	            $src_h = imageSY($src_img);
	
	            $scaleX = (float)$w / $src_w;
	            $scaleY = (float)$h / $src_h;
	            $scale = min($scaleX, $scaleY, 1);
				
	            $dstW = $w;
	            $dstH = $h;
	            $dstX = $dstY = 0;
	
	            $scaleR = $scaleX / $scaleY;

	            $dstW = (int)($scale * $src_w + 0.5);
	            $dstH = (int)($scale * $src_h + 0.5);
	
	                // Keep pic centered in frame.
	            $dstX = (int)(0.5 * ($w - $dstW));
	            $dstY = (int)(0.5 * ($h - $dstH));
	            
	            imagecopyresampled(
	                $dst_img, $src_img, $dstX, $dstY, 0, 0, 
	                $dstW, $dstH, $src_w, $src_h); 
				$this->image = $dst_img;
	        }
	    }
	}
 
}
?>