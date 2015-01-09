<?php

class FeedController extends AppController {
    var $name = "Feed";
	var $helpers = array('Text', 'Rss', 'Html');
	var $layout = 'rss/default';
	
	function rss($type){
			
		$logFile = "";
		switch($type){
			case 'broken':
				$logFilename = ROOT . '/app/tmp/logs/resize.log';
				break;
			case 'size':
				$logFilename = ROOT . '/app/tmp/logs/size.log';
				break;
				
		}

		$logFile = file_get_contents($logFilename);
		$logFileArray = explode("\n", $logFile);
		$logFileArray = array_reverse($logFileArray);
		if(is_array($logFileArray)){
			foreach($logFileArray as $logEntry){
				if(strlen($logEntry) > 3){
					$message = explode(" - ", $logEntry);
					$message = $message[1];
					$url = explode("[", $logEntry);
					$url = explode("]", $url[1]);
					$url = $url[0];
					$date = explode("Resize:", $logEntry);
					$date = strtotime($date[0]);
					$logs[] = array('errorMessage' => $message,
							        'url' => $url,
							        'body' => $logEntry,
									'date' => date('D, d M Y H:i:s O', $date));
				}
			}
		}

		file_put_contents($logFilename, ""); // Clear the log file

		$this->set('items', $logs);
	}
    
}
?>