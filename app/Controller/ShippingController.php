<?php

define('UPS_ACCESSNUMBER', '6CA4A15C30B2A6E0');
define('UPS_USERNAME', 'lonestarperc');
define('UPS_PASSWORD', 'Lsp10611dc10');

class ShippingController extends Controller {
    var $name = "Shipping";
	
	function _CORSHeaders() {

	    // Allow from any origin
	    if (isset($_SERVER['HTTP_ORIGIN'])) {
	        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
	        header('Access-Control-Allow-Credentials: true');
	        header('Access-Control-Max-Age: 86400');    // cache for 1 day
	    }

    // Access-Control headers are received during OPTIONS requests
	    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
	
	        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
	            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         
	
	        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
	            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
	
	        exit(0);
		}
    }
	
	function getUPSTrackingData(){
		
		Configure::write('debug', 2);	
		
		App::import('Vendor', 'UPSTrack');
		
		$trackingNumber = $_REQUEST['trackingNumber'];
		$myRate = new UPSTrack(UPS_ACCESSNUMBER, UPS_USERNAME, UPS_PASSWORD);
		$trackingData = $myRate->getTrack($trackingNumber);
		$returnObject['success'] = false;
		
		if(!isset($trackingData['TRACKRESPONSE']['RESPONSE']['ERROR'])){
			$trackingData = $trackingData['TRACKRESPONSE']['SHIPMENT']['PACKAGE']; // Hide address data
			unset($trackingData['REFERENCENUMBER']); // Hide the sales order number
			$returnObject['success'] = true;
			$returnObject['data'] = $trackingData;
		}
		
		$this->_CORSHeaders();
		echo json_encode($returnObject);
		die();
	}
    
}
?>