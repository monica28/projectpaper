var shhv = 1;
var billerIDexclude = 'HUTCAP#HUTCAS#HUTCKO#HUTCCH#HUTCDE#HUTCGU#HUTCHP#HUTCHAR#HUTCJK#HUTCHKER#HUTCKA#HUTCMP#HUTCMU#HUTCHCHAN#HUTCHJPR#BPLMMH#HUTCHROTN#HUTCHLKO#HUTCUPW#HUTCWB#AIRTKA#AIRCHA#AIRTCH#AIRTDE#AIRTGU#AIRTAP#AIRTKO#AIRTMU#AIRTMH#AIRTBH#AIRTTN#AIRTRJ#AIRTELBHO#AIRTELKER#AIRTELLKO#AIRTJK#AIRTHP#AIRTHR#DOCOMOAP#DOCOMOAS#DOCOMOBH#DOCOMOCAL#DOCOMODL#DOCOMOGJ#DOCOMOHP#DOCOMOHR#DOCOMOJK#DOCOMOKL#DOCOMOKT#DOCOMOMH#DOCOMOMP#DOCOMONE#DOCOMOOR#DOCOMOPB#DOCOMORJ#DOCOMOTN#DOCOMOUPE#DOCOMOUPW#DOCOMOWB#TTSLAP#TTSLAS#TTSLBH#TTSLCAL#TTSLDE#TTSLGU#TTSLHP#TTSLHR#TTSLJK#TTSLKL#TTSLKA#TTSLMH#TTSLMP#TTSLNE#TTSLOR#TTSLPB#TTSLRJ#TTSLTN#TTSLUPE#TTSLUPW#TTSLWB#HUTCOR#SPICHA#SPICKA#TTSLVMAP#TTSLVMDL#TTSLVMGJ#TTSLVMKA#TTSLVMMH#TTSLVMRJ#AIRTNE#AIRTORI#AIRTUPW#AIRTAS#AIRTWB#IDEA';









 
var ua = navigator.userAgent;
if( ua.indexOf("Android") >= 0 )
{
var androidversion = parseFloat(ua.slice(ua.indexOf("Android")+8));
if (androidversion < 4)
{
}
else {
//$("html, body").css("overflow","auto");
}
}
var passbookID = "";
if(!localStorage.getItem("csd")){
	passbookID = "";
}
else{
	var temppbkid = booksStore(localStorage.getItem("csd"));
	passbookID = temppbkid;
}
var accSelectedForPassbk = "";
var financlialacnt = "";
var clickhead ="";
var curentacntNOpsbk = "";
var busyInd;
var fldLangId = "eng";
var fldDeviceId = "43";
var fldAppId = "RS";
var fldFCDBSessionId = "";
var fldSessionId = "";
var fldRequestId = "";
var fldjsessionid = "";
var timeout = 600000;
var hdfcModel;
var udid;

var flduseragent = "Android";
var fldRoleId = "NOROLE";
var fldWebServerId = "YG";
var fldAppServerId = "ZZ";
var fldModule = "CH";
var NoResponseError = "We apologize this facility is temporarily unavailable.Please try later.";
var NoDataError = "At this time, we are unable to carry out your request completely";
var serverConnError = "Sorry, Unable to connect server. Please try later.";
var ipadd = '';
var busyAuthChk = 0;
var loggedinuser = false;
var d = '';
var menuUdid = '';
var messauid = '';
var readmsgid = '';
var billpaypage='';
var fundtransferNli='';
var accsumm='';
var fundtransfermsg='';
var debitcrdhome='';
var crditcrd='';
var Mutulfund='';
var viewpaybill='';
var creditcardpay='';
var crditcardstatment='';
var crditcardpayment='';
var myArray = [];
var mymenuFlag = '';
var billoperlists = [];
var billoperlists2 = [];
var Cust_Type='';
var billerlist = '';
var recenttemp = '';
var currentid = "";
var mode ="";
var video_email='';
var video_mobile='';
var Customer_Id_Video = '';
var Customer_fName_Video = '';
var Customer_lName_Video = '';
var billoperlist = '';
var biltyp = '';
var VideoFLG= '';
var cpBanner = '';
var imeinumber="";
var Cpbanner='';
var cpbannerclose="";
var notificationmsg = [];
var custacctype = new Array();
var svt = "";
var svts = '';
var purchesforexrate = '';
var Reloadforexrate ='';
var Inrusdamount="";
var Purchesusdamount="";
var cardnoOrginal = "";
var Cpbannerstatus="";
var changevalstart = "";
var dateformat = "";
var currenttrasdate = '';
var currenttrasdate1 = '';
var typetras = 'Dr';
piechartarray = ko.observableArray([]);
doughnutDataarray  = ko.observableArray([]);
accountListPSBK = ko.observableArray([]);
 var doughnutData = [];
  var doughnutDataLabel = [];
 var expense = [];
 var income = [];
 var m = 0;
 var mpassbookloginchk = '';
 var lineChartData = '';
 var acntno = "";
 var frmdate = "";
 var todate = "";
 var frmdatepbk ="";
 var todatepbk = "";
 var hitFromDate = "";
 var hitToDate = "";
 var lastdatedata = "";
 var frmdatepbkquery = "";
 var todatepbkquery = "";


 var editcategoryname = "";
 var financialID = "";
  var catgraph = "";
  var catgraphname = "";
  var categorychart = "False";
  var currentRDno = "";
  var currentACCno = "";
   var financialID1 = "";
   var GraphID = "";
   var callvalue = 0;
   var udid="";
   var checkout="";
   var hash = "";
   var custidsb = localStorage.getItem("CstmID");
   var tempcustidsms = "";
   var tempsmsname = '';
   var tempsmsmobno = '';
   var tempcurrency = [];
   var logincheck = "False";
   var Authpattern = "False";
   var custnames = "";
   var tesmppbkID = "";
   var querytemp = '';
   var filter='';
   var verUrl= '';
   var cbannerCountForAccount=0;
var cbannerCountForFund=0;
var cbannerCountForBill=0;
var cbannerCountForCC=0;
var cbannerCountForDemat=0;
var cbannerCountForMF=0;
var cbannerCountForOther=0;
var cbannerCountForDC=0;
var cbannerCountForMyMenu=0;

var cbannerForMyMenu="";
var cbannerForAccount="";
var cbannerForFund="";
var cbannerForBill="";
var cbannerForCC="";
var cbannerForDemat="";
var cbannerForMF="";
var cbannerForOther="";
var cbannerForDC="";
var cbannerForMyMenu="";

var cpbannerclose="";
var cpbannerclose1="";
var cpbannerclose2="";
var cpbannerclose3="";
var cpbannerclose4="";
var cpbannerclose5="";
var cpbannerclose6="";
var cpbannerclose7="";
var cpbannerclose8="";
var cpbannerurl="";
var REQUESTID='';	
var Mpintempsmsname = "";
var Mpintempsmsmobno ="";
var Regloginuid01="";
var accPinData = '';
var Anroidids = '';
var cpBanner = 'No banner';
var applicationFormForCredit=0;
var loginPageFlag=0;
var CCStpurl="";

var Forgetpin="";
var loginuid="";
var RegDDdst01="";
var setotp='';
var resetotp='';
var fdCallStatus='';
var refreshCallOneDay=0;
var passacntno="";
var Loadmore = true;
var topposition = '';
var selectedaccountRef="";
var financialaccno="";
var passbookdata01="";
var rddocsload = 0;
var idslod = 0;
var newkey='';
var pin1='';
var pin2="";
//console.log( "Load was performed."+jsonObj );
//});
function wlCommonInit(){

	/*
	 * Application is started in offline mode as defined by a connectOnStartup property in initOptions.js file.
	 * In order to begin communicating with Worklight Server you need to either:
	 * 
	 * 1. Change connectOnStartup property in initOptions.js to true. 
	 *    This will make Worklight framework automatically attempt to connect to Worklight Server as a part of application start-up.
	 *    Keep in mind - this may increase application start-up time.
	 *    
	 * 2. Use WL.Client.connect() API once connectivity to a Worklight Server is required. 
	 *    This API needs to be called only once, before any other WL.Client methods that communicate with the Worklight Server.
	 *    Don't forget to specify and implement onSuccess and onFailure callback functions for WL.Client.connect(), e.g:
	 *    
	 *    WL.Client.connect({
	 *    		onSuccess: onConnectSuccess,
	 *    		onFailure: onConnectFailure
	 *    });
	 *     
	 */
	cpbannerclose="";
	cpbannerclose1=""
	busyInd = new WL.BusyIndicator('content', {text : 'Loading...',duration:60.00});
	WL.Device.getNetworkInfo(function (networkInfo) {
		ipadd = networkInfo.ipAddress;
	});
	//WL.Client.addGlobalHeader("X-Forwarded-For",ipadd);
	WL.Client.addGlobalHeader('Cache-Control', 'no-store, no-cache');
	// Common initialization code goes here
	WL.Device.getID({onSuccess : function(o) {
        WL.Logger.log("getID: " + o);
        udid = o.deviceID;
		WL.Client.addGlobalHeader('ServletUd', udid);
    }, onFailure : function(e) {
		WL.Client.addGlobalHeader('ServletUd', "");
        WL.Logger.log("Error getting ID: " + e);
    }});
	
	var App_Version ="4.8";
	var Txn_Version ="1.0";
	WL.Client.addGlobalHeader('App_Version', App_Version);
	WL.Client.addGlobalHeader('Txn_Version', Txn_Version); 
	initDatabase();
    gcmId=hdfc_android.getGCMID(); 
    imeinumber=hdfc_android.getImei();
	 Anroidids=hdfc_android.getADID();
	 if(imeinumber == null || imeinumber == '' || imeinumber == undefined || imeinumber == 'undefined'){
		 imeinumber = Math.floor(Math.random()*900000) + 200+""+Anroidids+""+Math.floor(Math.random()*900000) + 10000;
	 }
    setDeviceTokenForMenu(gcmId);
		setTimeout(function(){
			logincheck = "False";
			Authpattern = "false";
			WL.Client.addGlobalHeader('deflate', "");
			WL.Client.addGlobalHeader('Accepts', '0');
			if(window.navigator.onLine){
					var invocationData = {
							adapter : "mPassbook_API_Adapter",
							procedure : "mPass_Logout",
							parameters : ["logout"],
							compressResponse : true
					};
					
					WL.Client.invokeProcedure(invocationData, {
						onSuccess : pasbooklogout2Success = function(){console.log('');},
						onFailure : AdapterFail13 = function(){console.log('');},	    		
						timeout: timeout
					});
			}
		},7000);
}
var clickedDate = new Date();
	var idleTime = 5;

function hdfcExtApp(Para,Para1){

		var tradeFlg = hdfc_android.openApp(Para);
		
		if(tradeFlg == false && Para1 == 'hdfcsec'){
				window.open('https://play.google.com/store/apps/details?id=com.snapwork.hdfcsec&hl=en', '_system');
		}
		if(tradeFlg == false && Para1 == 'hdfcaag'){
				window.open('https://play.google.com/store/apps/details?id=com.hdfcaag&hl=en', '_system');
		}
		if(tradeFlg == false && Para1 == 'hdfcWealth'){
				window.open('https://play.google.com/store/apps/details?id=com.hdfcbank.coese.InvestTrack', '_system');
		}
		if(tradeFlg == false && Para1 == 'hdfcPayzap'){
				window.open('https://play.google.com/store/apps/details?id=com.enstage.wibmo.hdfc&hl=en', '_system');
		}
		if(tradeFlg == false && Para1 == 'hdfcChillr'){
				window.open('https://play.google.com/store/apps/details?id=in.chillr&hl=en', '_system');
		}
		if(tradeFlg == false && Para1 == 'hdfcHindi'){
				window.open('https://play.google.com/store/apps/details?id=com.snapwork.hdfc.hindi&hl=en', '_system');
		}
		if(tradeFlg == false && Para1 == 'hdfcVroom'){
				window.open('https://play.google.com/store/apps/details?id=com.girnarsoft.hdfcconsumer&hl=en', '_system');
		}
}
var onDeviceReady = function() {
	document.addEventListener("backbutton", onBackKeyDown, false); 
	
	//$(document).ready(function(){
		var idleInterval = setInterval(timerIncrement, 60000); // 1 minute
		$(document).bind('click touchstart keyup mousemove', function() {
			clickedDate = new Date();
		});
	//});
	if(window.location.hash!="#login" && window.location.hash!="#loginCustPass" && window.location.hash!="#menu"){

	loadXMLDoc();
	}
};
function setOTP(otp)
{
	setotp=otp.code.replace('.','');

} 
function loadXMLDoc() {
	// alert("loadXMLDoc");
   /* var xmlhttp;
    var urlMainmenu;
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
	

    // alert(xmlhttp);
    xmlhttp.onreadystatechange = function() {
	     // alert("onreadystatechange");
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
		    		   
           if(xmlhttp.status == 200){
		      
		       Cpbanner="Cpbanner";
               console.log("HTML CP Response : "+xmlhttp.responseText);
			   cpBanner = xmlhttp.responseText;
			   // alert("cpBanner"+xmlhttp.status);
                cpBanner = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><title></title></head><body><form name="form1" method="post" action="ba.aspx?security_key=458738aaf8223c4d3121966e20dbff7d&amp;business_id=50082&amp;organization_id=10000&amp;source=MOFR&amp;member_id=50000045" id="form1"><div><input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="/wEPDwULLTE4NzI1Nzk0NTNkZPXX5+0D4eYchIaPDVIlstcVRxSS1foC3DnRc/ic4+Zx" /></div><div id="bannerHtml"><table style="max-width:320px;" align="center" width="320" border="0" cellspacing="0" cellpadding="0" class="width"><style>.width{max-width: 100% !important ; width :100%; height:20% !important;}</style><tr><tr> <td align="left" valign="top" bgcolor="#ace1f9" style="border-left:1px solid #d2d3d5; border-right:1px solid #d2d3d5;border-top:1px solid #d2d3d5;border-bottom:2px solid #183884;max-width:320px;"> <table width="318" border="0" align="center" cellpadding="0" cellspacing="0" class="width"><tr><td align="left" valign="top" style="padding-left:10px; padding-right:10px;border-right:1px solid #d2d3d5;"><table bgcolor="#ace1f9" width="100%" border="0" cellpadding="0" cellspacing="0"><tr><td align="left" valign="top"><table width="100%" border="0">	<tr><td width="96%" align="left" valign="bottom" bgcolor="#ace1f9" style="padding-left:0px; padding-top:4px; padding-bottom:0px;"><font style="font-family:Arial, Helvetica, sans-serif;font-size:13px;color:#000000;line-height:20px;"><strong>World\'s First and Fastest <span style="color:#FF0000;">Two Wheeler Loan!</span></strong><br /><span style="font-size:12px;line-height:14px;"> Dear <strong>XXXXXXX</strong></span><br /><span style="line-height:16px;font-size:12px;">Get your <strong>Pre-approved Loan</strong>* of up to <span style="color:#FF0000;">Rs. XXXXX </span>disbursed to your dealer\'s account instantly.</span><br /><a  onclick="window.open(\'https://cpuatnetweb01.hdfcbank.com/CPI/br.aspx?t=10226.0.50082.10000.262.1&amp;tc=&amp;ctc=XXCP_CUSTOMER_TRACKING_CPXX\',\'_blank\',\'location=no\');" target="_blank" style="outline:none; color:#FFFFFF; background-color:#FF0000; float:left; padding:2px;"><strong>Get started</strong></a><span style="font-size:8px;line-height:9px; float:right; padding-top:16px;">T&C apply. Credit at sole discreation of HDFC Bank </span></font></td>	</tr></table></td></tr><tr><td><table width="100%" border="0"></table></td></tr></table></td></tr> </table> </td></tr></table><br></div></div></form></body></html>'; 
			   
			 // alert(cpBanner);
			      $('#cpCnt').html(cpBanner);
			     if(window.location.hash=="#mymenu"){
				   cbannerForMyMenu=cpBanner;
				   
			
				  }
				  //Accounts
				  if(window.location.hash=="#rrasm01"){
					cbannerForAccount=cpBanner;
						
					 // alert("accounts"+cbannerForAccount);
				  }
				  // Fund transfer
				  if(window.location.hash=="#rrftr01"){
					cbannerForFund=cpBanner;
				  }
				  //Bill pay
				  if(window.location.hash=="#billpayment"){
					cbannerForBill=cpBanner;
				  }
				 
				  //credit card
				  if(window.location.hash=="#rracs01"){
					cbannerForCC=cpBanner;
				  }
				 //Demat 
				  if(window.location.hash=="#Demat"){
					  cbannerForDemat=cpBanner;
				 }
				 //Debit Card
				  if(window.location.hash=="#debithome"){
					cbannerForDC=cpBanner;
				  }
				 //Mutual Funds
				  if(window.location.hash=="#rrwcm01"){
					 cbannerForMF=cpBanner;
					 
				  }
				  //Others
				  if(window.location.hash=="#others"){
					 cbannerForOther=cpBanner;
				  }
			  // alert(cpBanner);
               console.log("HTML CP ON MOBILE "+cpBanner);
           }
           else if(xmlhttp.status == 400) {
		     Cpbanner="";
            //  alert('There was an error 400')
           }
           else {
		    Cpbanner="";
               //alert('something else other than 200 was returned')
           }
        }
    }
   
   // alert("url"+cpbannerurl);
  //My menu  
  if(window.location.hash=="#mymenu"){
	  if(cbannerCountForMyMenu==0){
	  urlMainmenu=cpbannerurl+"MMNU"+"&member_id="+Regloginuid+"&request_type=SINGLE";
	  cbannerCountForMyMenu++;
	  console.log(urlMainmenu);
	  xmlhttp.open("GET", urlMainmenu, true);
	    xmlhttp.timeout = 30000; // Set timeout to 1 seconds (1000 milliseconds)
		xmlhttp.ontimeout = function () { console.log("Timed out!!!");cpBanner = ''; }
		xmlhttp.send(); 
	  //xmlhttp.send();
  }
  }
  //Accounts
  if(window.location.hash=="#rrasm01"){
	  if(cbannerCountForAccount==0){
		 urlMainmenu=cpbannerurl+"MASM"+"&member_id="+Regloginuid+"&request_type=SINGLE";
		 cbannerCountForAccount++;
		  xmlhttp.open("GET", urlMainmenu, true);
		xmlhttp.timeout = 30000; // Set timeout to 1 seconds (1000 milliseconds)
		xmlhttp.ontimeout = function () { console.log("Timed out!!!");cpBanner = ''; }
		xmlhttp.send();
		 
	  }
  }
  // Fund transfer
  if(window.location.hash=="#rrftr01"){
	  if(cbannerCountForFund==0){  
      urlMainmenu=cpbannerurl+"MTPT"+"&member_id="+Regloginuid+"&request_type=SINGLE";
      cbannerCountForFund++;
      //alert(urlMainmenu); 
      xmlhttp.open("GET", urlMainmenu, true);
     xmlhttp.timeout = 30000; // Set timeout to 1 seconds (1000 milliseconds)
		xmlhttp.ontimeout = function () { console.log("Timed out!!!");cpBanner = ''; }
		xmlhttp.send();
	  }
  }
  //Bill pay
  if(window.location.hash=="#billpayment"){
	 if(cbannerCountForBill==0){  
      urlMainmenu=cpbannerurl+"MBLP"+"&member_id="+Regloginuid+"&request_type=SINGLE";
      cbannerCountForBill++;
     // alert(urlMainmenu); 
      xmlhttp.open("GET", urlMainmenu, true);
   xmlhttp.timeout = 30000; // Set timeout to 1 seconds (1000 milliseconds)
		xmlhttp.ontimeout = function () { console.log("Timed out!!!");cpBanner = ''; }
		xmlhttp.send();
	 }
  }
 
  //credit card
  if(window.location.hash=="#rracs01"){
	
	  if(cbannerCountForCC==0){  
       urlMainmenu=cpbannerurl+"MCCU"+"&member_id="+Regloginuid+"&request_type=SINGLE";
       cbannerCountForCC++;
      // alert(urlMainmenu); 
       xmlhttp.open("GET", urlMainmenu, true);
       xmlhttp.timeout = 30000; // Set timeout to 1 seconds (1000 milliseconds)
		xmlhttp.ontimeout = function () { console.log("Timed out!!!");cpBanner = ''; }
		xmlhttp.send();
	 }
  }
 //Demat 
  if(window.location.hash=="#Demat"){
	  if(cbannerCountForDemat==0){  
       urlMainmenu=cpbannerurl+"MDMQ"+"&member_id="+Regloginuid+"&request_type=SINGLE";;
       cbannerCountForDemat++;
      // alert(urlMainmenu); 
       xmlhttp.open("GET", urlMainmenu, true);
       xmlhttp.timeout = 30000; // Set timeout to 1 seconds (1000 milliseconds)
		xmlhttp.ontimeout = function () { console.log("Timed out!!!");cpBanner = ''; }
		xmlhttp.send();
	  }
 }
 //Debit Card
  if(window.location.hash=="#debithome"){
	 
	  if(cbannerCountForDC==0){  
       urlMainmenu=cpbannerurl+"MDCE"+"&member_id="+Regloginuid+"&request_type=SINGLE";;
       cbannerCountForDC++;
      // alert(urlMainmenu); 
       xmlhttp.open("GET", urlMainmenu, true);
      xmlhttp.timeout = 30000; // Set timeout to 1 seconds (1000 milliseconds)
		xmlhttp.ontimeout = function () { console.log("Timed out!!!");cpBanner = ''; }
		xmlhttp.send();
	  }
  }
 //Mutual Funds
  if(window.location.hash=="#rrwcm01"){
	 
	  if(cbannerCountForMF==0){    
       urlMainmenu=cpbannerurl+"MMFI"+"&member_id="+Regloginuid+"&request_type=SINGLE";;
       cbannerCountForMF++;
      // alert(urlMainmenu); 
       xmlhttp.open("GET", urlMainmenu, true);
     xmlhttp.timeout = 30000; // Set timeout to 1 seconds (1000 milliseconds)
		xmlhttp.ontimeout = function () { console.log("Timed out!!!");cpBanner = ''; }
		xmlhttp.send();
	  }
  }
  //Others
  if(window.location.hash=="#others"){
	  if(cbannerCountForOther==0){    
      urlMainmenu=cpbannerurl+"MOFR"+"&member_id="+Regloginuid+"&request_type=SINGLE";;
      cbannerCountForOther++;
     // alert(urlMainmenu); 
      xmlhttp.open("GET", urlMainmenu, true);
	  xmlhttp.timeout = 30000; // Set timeout to 1 seconds (1000 milliseconds)
		xmlhttp.ontimeout = function () { console.log("Timed out!!!");cpBanner = ''; }
		xmlhttp.send();
     
	  }
  }*/
  //Financial Summary
//  if(window.location.hash=="#debithome"){
//    urlMainmenu=cpbannerurl+"MPSM"+"&member_id="+Regloginuid;
//  }
		

}
document.addEventListener("deviceready", onDeviceReady, true);
function onBackKeyDown(e) {
	
	  activepage = window.location.hash;
	  
 if(activepage == "#loginCustPass"){
	      window.location = "#loginmethod";
	      //self.backVisible(false);
	   }
	   else if(MyParentPage == "#backregister"){
		   e.preventDefault();
			      navigator.notification.confirm(
			          "Registration is not complete, are you sure you want to exit?",
			          checkButtonpassbookReg,
			          'Registration',
			          ['No','Yes']);
	   }
	  else  if(activepage == "#login"){
		  //self.backVisible(false);
	      window.location = "#menu";
	      
	   }else  if(activepage == "#loginmethod"){
		  //self.backVisible(false);
	      window.location = "#menu";
	      
	   } 
	   else if(activepage == "#mPB_passbook"){
                  busyInd.show();
                          var model = new mPassbookViewModel();
                       
                       setTimeout(function(){
                               model.linkedacnt();
                               window.location='#financialSummary';
                          busyInd.hide();
                  },2000);
                     
       }
	   
	   else if(activepage == "#financialSummary" && MyParentPage == "#mPB_login" ){
			      e.preventDefault();
			      navigator.notification.confirm(
			          "Logout of mPassbook?",
			          checkButtonpassbook,
			          'Logout',
			          ['Cancel','OK']);
		}
		else if(activepage == "#financialSummaryRD1" ){
			      e.preventDefault();
			      navigator.notification.confirm(
			          "Logout of mPassbook?",
			          checkButtonpassbook,
			          'Logout',
			          ['Cancel','OK']);
		}
        else if(activepage == "#RDstatement"){
		   
				busyInd.show();
				callfinalcialSummary();
			 setTimeout(function(){
				 busyInd.hide();
				 
		   },15000);
				
			
		   
 	     	
        }		
	  else if(activepage != MyParentPage){
	      window.location = MyParentPage;
	   }
	   else if(activepage == MyParentPage && MyParentPage !="#login" && MyParentPage !="#menu"){
			      e.preventDefault();
			      navigator.notification.confirm(
			          "Do you want to Logout?",
			          checkButtonSelection,
			          'Logout',
			          'Cancel,OK');
			      }
			      
		   
	   
	  else if(activepage == '#menu'){
		  e.preventDefault();
		    navigator.notification.confirm("Are you sure you want to exit ?", onConfirm, "HDFC Bank", "Yes,No"); 
	  }

	 /* else if(activepage == '#login'||activepage == '#rrasm01' ||activepage == '#mymenu'){
		  e.preventDefault();
		    navigator.notification.confirm("Are you sure you want to exit ?", onConfirm, "HDFC Bank", "Yes,No"); 
	  } */
	  else{
		  //alert("Else Need to check");
	
	  }
 $('.dw').detach(); $('.dwo').detach();
	}

	function onConfirm(button) {
		if (button == 1){
	        navigator.app.exitApp();
	    }
	}

var callfinalcialSummary = function(){
	   
		$("#contentData").load("Views/mPassbook/financialSummary.html", null, function (response, status, xhr) {
				if (status != "error") {}
					if(localStorage.getItem("tempcurrency") > 1){
						$('.assetChart.row').hide();
					}
					if(piechartarray.length == 0){
						
					}
					logincheck = "True";
					$('.lastUpdt1').html("Last updated at "+localStorage.getItem("FinTime"));
					$('#passbookusername').html(booksStore(localStorage.getItem("Cstnm")));
					$('#passbookcustID').html("Cust ID: "+booksStore(localStorage.getItem("CstmID")));
				ko.applyBindings(self, $(".contents").get(0));                   
			});
		window.location.hash = "#financialSummaryRD1";
	}
$(document).on('touchstart click','.logout .logout',function(e){
    e.stopPropagation();
    window.location = "#logout";
    e.preventDefault();    
});
$(document).on('change','select',function(){
		$(document).find('select').trigger('blur');
});


function checkLogout(iValue){
    if (iValue == 2){
            window.location = "#logout";
        }
}

var keyStr = "ABCDEFGHIJKLMNOP" +
"QRSTUVWXYZabcdef" +
"ghijklmnopqrstuv" +
"wxyz0123456789+/" +
"=";

function decode64(input){
	var output = "";
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;	
	 
	 var base64test = /[^A-Za-z0-9\+\/\=]/g;
     if (base64test.exec(input)) {
        alert("There were invalid base64 characters in the input text.\n" +
              "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
              "Expect errors in decoding.");
     }
     input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

     do {
        enc1 = keyStr.indexOf(input.charAt(i++));
        enc2 = keyStr.indexOf(input.charAt(i++));
        enc3 = keyStr.indexOf(input.charAt(i++));
        enc4 = keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output = output + String.fromCharCode(chr1);

        if (enc3 != 64) {
           output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
           output = output + String.fromCharCode(chr3);
        }

        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";

     } while (i < input.length);
		//document.base64Form.theText.value=unescape(output);
		
     return unescape(output);
}

function encode64(input) {
	 
	input = escape(input);
    var output = "";
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;

    do {
       chr1 = input.charCodeAt(i++);
       chr2 = input.charCodeAt(i++);
       chr3 = input.charCodeAt(i++);

       enc1 = chr1 >> 2;
       enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
       enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
       enc4 = chr3 & 63;

       if (isNaN(chr2)) {
          enc3 = enc4 = 64;
       } else if (isNaN(chr3)) {
          enc4 = 64;
       }

       output = output +
          keyStr.charAt(enc1) +
          keyStr.charAt(enc2) +
          keyStr.charAt(enc3) +
          keyStr.charAt(enc4);
       chr1 = chr2 = chr3 = "";
       enc1 = enc2 = enc3 = enc4 = "";
    } while (i < input.length);
     // document.base64Form.theText.value=output;
    return output;
    
}

Array.prototype.contains = function(v) {
    for(var i = 0; i < this.length; i++) {
        if(this[i] === v) return true;
    }
    return false;
};

Array.prototype.unique = function() {
    var arr = [];
    for(var i = 0; i < this.length; i++) {
        if(!arr.contains(this[i])) {
            arr.push(this[i]);
        }
    }
    return arr; 
}
//encryption function
function booksStore(str) {
    var encoded = "";
    for (i=0; i<str.length;i++) {
        var a = str.charCodeAt(i);
        var b = a ^ 123423;    // bitwise XOR with any number, e.g. 123
        encoded = encoded+String.fromCharCode(b);
    }
    return encoded;
}

function booksStore1(str,str1) {
    var encoded = "";
    for (i=0; i<str.length;i++) {
        var a = str.charCodeAt(i);
        var b = a ^ str1;    // bitwise XOR with any number, e.g. 123
        encoded = encoded+String.fromCharCode(b);
    }
    return encoded;
}


$(document).ready(function(){

	/*$(document).on('touchstart','.header,.footer',function(e){	
		e.preventDefault();
		return false;
	});
	*/
	$(document).on('touchstart ','.back .back',function(e){	
		 //alert(location.pathname); 
		 //e.preventdefault(); //Added this
		 onBackKeyDown(e);
		  return false;
		
		
	});
	

	$(document).on('touchstart','.footer li a',function(e){
		e.stopPropagation();
		e.preventDefault();
		id=$(this).parent().attr('id');
		//alert(id);
		if(id!='r1I'){
			
			   //$('.footer li').removeClass('active'); 
			   $('.menutt').removeClass('active');   
			
			   //alert($(this).parent().attr('id'));
			   
			   //$(id).addClass('active');
			   var currhref = $(this).attr('href');
			   window.location = currhref;
			   $('#'+id+"I").addClass('active');
			   
				setTimeout(function(){
				//alert("footer else");
				$('.footer ul:last-child').css({
					'transform' : 'translateY(100%)',
					'-webkit-transform' : 'translateY(100%)',
					'-ms-transform' : 'translateY(100%)'
				});
				
				checkfooter=0;
			
		},1000);
				}
		else{
			
			if(checkfooter==0){
				e.preventDefault();
				
				$('.footer ul:last-child').css({
					'transform' : 'translateY(-54px)',
					'-webkit-transform' : 'translateY(-54px)',
					'-ms-transform' : 'translateY(-54px)'
				});
				$('.footer').height(109);
				checkfooter=1;
				}
				else{
				e.preventDefault();		
				$('.footer ul:last-child').css({
					'transform' : 'translateY(100%)',
					'-webkit-transform' : 'translateY(100%)',
					'-ms-transform' : 'translateY(100%)'
				});
				$('.footer').height(54);
				checkfooter=0;
				}
			
		}
		
		if(window.location.hash == '#mymenu'){
		             $('.footer').height(109);
		             $("#save").show();
		 }else if(window.location.hash == '#rrper01' || window.location.hash == '#rrper02'){
		             $('.footer').height(109);
		             $("#save").show();
		 }else{
		            $("#save").hide();
		          //$('.footer').height(54);
		 }
		   
		 
	});
	

		
	
});

// var clickedDate = new Date();
// var idleTime = 5;

// $(document).ready(function(){
    // var idleInterval = setInterval(timerIncrement, 60000); // 1 minute
	// $(document).bind('click touchstart keyup mousemove', function() {
        // clickedDate = new Date();
    // });
// });

function timerIncrement() {
    var nowDate = new Date();
    var diffMs = (nowDate - clickedDate); //Milliseconds between now & the last time a user clicked somewhere on the page
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); //Convert ms to minutes
    if (diffMins >= idleTime) {
        //Redirect user to home page etc...
		if(window.location.hash == '#financialSummary' || window.location.hash =='#mPB_passbook' || window.location.hash =='#interactiveStatement' || window.location.hash =='#interactive' || window.location.hash =='#requestStatement' || window.location.hash =='#requestStatement1' || window.location.hash =='#Categories' || window.location.hash =='#mPB_settings' || window.location.hash =='#mPB_passbookGraph' || window.location.hash =='#RDstatement' || window.location.hash =='#financialSummaryTemp1' || window.location.hash =='#financialSummaryTemp' || window.location.hash =='#mPB_RD_Summary' || window.location.hash =='#mPB_FD_Summary' || window.location.hash =='#temppage1' || window.location.hash =='#interactivetemp' || window.location.hash =='#overlay3' || window.location.hash =='#overlay2' || window.location.hash =='#overlay1' || window.location.hash =='#FAQ'){
			logoutcallmpasbook();
		}
    }
}

function logoutcallmpasbook(){
	alert('Your session has been timed out.Please login again');
	busyInd.show();
	setTimeout(function(){
		var model = new mPassbookViewModel();  
		model.pasbooklogout2();
	},100);
}
function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else if (i == key && obj[key] == val) {
            objects.push(obj);
        }
    }
    return objects;
}
/* Decimal Number check while typing */
function extractNumber(obj, decimalPlaces, allowNegative)
{
	var temp = obj.value;
	
	// avoid changing things if already formatted correctly
	var reg0Str = '[0-9]*';
	if (decimalPlaces > 0) {
		reg0Str += '\\.?[0-9]{0,' + decimalPlaces + '}';
	} else if (decimalPlaces < 0) {
		reg0Str += '\\.?[0-9]*';
	}
	reg0Str = allowNegative ? '^-?' + reg0Str : '^' + reg0Str;
	reg0Str = reg0Str + '$';
	var reg0 = new RegExp(reg0Str);
	if (reg0.test(temp)) return true;

	// first replace all non numbers
	var reg1Str = '[^0-9' + (decimalPlaces != 0 ? '.' : '') + (allowNegative ? '-' : '') + ']';
	var reg1 = new RegExp(reg1Str, 'g');
	temp = temp.replace(reg1, '');

	if (allowNegative) {
		// replace extra negative
		var hasNegative = temp.length > 0 && temp.charAt(0) == '-';
		var reg2 = /-/g;
		temp = temp.replace(reg2, '');
		if (hasNegative) temp = '-' + temp;
	}
	
	if (decimalPlaces != 0) {
		var reg3 = /\./g;
		var reg3Array = reg3.exec(temp);
		if (reg3Array != null) {
			// keep only first occurrence of .
			//  and the number of places specified by decimalPlaces or the entire string if decimalPlaces < 0
			var reg3Right = temp.substring(reg3Array.index + reg3Array[0].length);
			reg3Right = reg3Right.replace(reg3, '');
			reg3Right = decimalPlaces > 0 ? reg3Right.substring(0, decimalPlaces) : reg3Right;
			temp = temp.substring(0,reg3Array.index) + '.' + reg3Right;
		}
	}
	
	obj.value = temp;
}
function blockNonNumbers(obj, e, allowDecimal, allowNegative)
{
	var key;
	var isCtrl = false;
	var keychar;
	var reg;
		
	if(window.event) {
		key = e.keyCode;
		isCtrl = window.event.ctrlKey;
	}
	else if(e.which) {
		key = e.which;
		isCtrl = e.ctrlKey;
	}
	
	if (isNaN(key)) return true;
	
	keychar = String.fromCharCode(key);
	
	// check for backspace or delete, or if Ctrl was pressed
	if (key == 8 || isCtrl)
	{
		return true;
	}

	reg = /\d/;
	var isFirstN = allowNegative ? keychar == '-' && obj.value.indexOf('-') == -1 : false;
	var isFirstD = allowDecimal ? keychar == '.' && obj.value.indexOf('.') == -1 : false;
	
	return isFirstN || isFirstD || reg.test(keychar);
}
/* Decimal Number check while typing */


//load script
function loadScript(path){
	var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = path;
    // Use any selector
    $("head").append(s);
}

function checkButtonSelection(iValue){
	  if (iValue == 2){
		  //e.stopPropagation();
		  
		    location.hash = '#logout';
		    //e.preventDefault();    
	      }
	  }
	  
function checkButtonpassbook(iValue){
	if(iValue == 2){
		var model = new mPassbookViewModel();  
		model.pasbooklogout2();
	}
	else{
		return;
	}
}
function checkButtonpassbookReg(iValue){
	if (iValue == 2){
			window.location.hash = '#menu';			
	}
}

$.validator.addMethod('chkvalid', function(value, element, param) {
	if(value=="false"){
		return false;
	}
	else{
		return true;
	}
	}, 'Please Accept Terms & Conditions' );
	
	
	//Get current date

Date.prototype.currDate = function() {         
    
    var yyyy = this.getFullYear().toString();                                    
    var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based         
    var dd  = this.getDate().toString();             
                        
    return (dd[1]?dd:"0"+dd[0])  + '/' + (mm[1]?mm:"0"+mm[0]) + '/' +yyyy;
};  

function getCurrdate(){
d = new Date();
return d.currDate();
}

$(document).on('click','.opurl',function(e){
		    // This will change the URL fragment. The change is reflected
		    // on your browser's address bar as well
	
	e.preventDefault();
    e.stopPropagation();
		    window.location.hash = this.id;
		    
		});

function findItem(arr, key, value) {	
	m=0;
    for (var i = 0; i < arr.length; i++) {
       if (arr[i][key] === value) {    	   
    	   m++;
       }
    }
    return m;
}


function enc(str) {
    var encoded = "";
    for (i=0; i<str.length;i++) {
        var a = str.charCodeAt(i);
        var b = a ^ 123;    // bitwise XOR with any number, e.g. 123
        encoded = encoded+String.fromCharCode(b);
    }
    return encoded;
}
var str = "hello world";
var encoded = enc(str);
//alert(encoded);           // shows encoded string
//alert(enc(encoded));      // shows the original string again

$(document).ready(function () {

$('input[type="number"]').keydown(function (e) {

    var keyCode = e.which; // Capture the event

    //190 is the key code of decimal if you dont want decimals remove this condition keyCode != 190
    if (keyCode != 8 && keyCode != 9 && keyCode != 13 && keyCode != 37 && keyCode != 38 && keyCode != 39 && keyCode != 40 && keyCode != 46 && keyCode != 110 && keyCode != 190) {
        if (keyCode < 48) {
            e.preventDefault();
        } else if (keyCode > 57 && keyCode < 96) {
            e.preventDefault();
        } else if (keyCode > 105) {
            e.preventDefault();
        }
    }
});


});

$.validator.addMethod('chkDescription', function(value, element, param) {
	var re = /^[A-Za-z0-9_ .,]+$/;
    if(re.test(value)){
		return true;
	}
	else{
		return false;
	}
	}, 'Alphabetic, Numeric characters with spaces, comma, and decimal points are allowed for Description.' );
	
$.validator.addMethod('chkDescription01', function(value, element, param) {
	var re = /^[A-Za-z0-9/ .,(){}:?-]+$/;
	//   / - ( ) . , { } ? :    / - ( ) . , { } ? : 
    if(re.test(value)){
		return true;
	}
	else{
		return false;
	}
	}, 'Alphabetic, Numeric characters with the folowing characters (/ .,(){}:?-) are allowed for Description.' );
function Ntcp(result)
{
    var actual = result;
    var key = 100; //Any integer value
    var result = "";
    for(i=0; i<actual.length;i++)
    {
        result += String.fromCharCode(key^actual.charCodeAt(i));
    }
    //alert(result);
  //Decrypt(result);
    return result;
}

function NtcpD(result)
{
    var actual=result;
    var key = 100; //Any integer value
    var result="";    
    for(i=0; i<actual.length; i++)
    {
        result += String.fromCharCode(key^actual.charCodeAt(i));
    }
    return result;
}
function setDeviceTokenForMenu(token){
    arrgcm = token.split("##@@##");
     menuUdid = arrgcm[1];
	 MSGCNT();
               
}
function MSGCNT(){
//alert("Worklight 1  "+window.localStorage["campid"]);
//alert("Worklight 2  "+window.localStorage["messauid"]);
     //busyInd.show();
        if(window.localStorage["campid"] != '' && window.localStorage["campid"] != null && window.localStorage["campid"]!=undefined && window.localStorage["messauid"]!=undefined){
                                   url='http://hdfc.snapworkapps.com/hdfcbankapi/notificationlist.jsp?CustomerId='+NtcpD(window.localStorage["messauid"])+'&readmsgid='+window.localStorage["campid"];
                    }else if(window.localStorage["messauid"]!=undefined){
                                    url='http://hdfc.snapworkapps.com/hdfcbankapi/notificationlist.jsp?CustomerId='+NtcpD(window.localStorage["messauid"])+'&readmsgid=';

                }else {
                        url='http://hdfc.snapworkapps.com/hdfcbankapi/notificationlist.jsp?CustomerId=&readmsgid=';
                }
              //  console.log('Message center url1 oninit  '+url);
            
     $.ajax( {
    				url:url,
    				dataType: 'xml',
    	            success:function(data) {


    	            	$(data).each(function() {
	    	        	        UNREADMSGCOUNT($(this).find('UNREADMSGCOUNT').text());
	    	        	       
                              //  console.log('Unread messaghe count  '+UNREADMSGCOUNT());
if(UNREADMSGCOUNT()>0){

                                        $('.msgCount').show();

                                   }else {
                                   $('.msgCount').hide();
                                   }

	    	        	});
                    }

    	          });
//busyInd.hide();
}
	function callnotification(){
 	    test= hdfc_android.getJsonString();
	    //localStorage.setItem('Notification',test);
		
		var old = localStorage.getItem("Notification");
         if(old === null) old = "";
         localStorage.setItem("Notification", old + test);
		  //console.log("msg    "+ localStorage.getItem("Notification"));
		
		//console.log("himmat   "+test);
		return;
	}
	
function onNotificationClick(mainObject){
       //console.log("hdfcnot  "+mainObject);
	   var tamplets = mainObject;
	
	   
	if(RegloginFlag == 'yes'){
			var tamplets = mainObject;
			Notificationhash=tamplets.data.template;
		
		
		  if(Notificationhash== "rrasm01"){
			
			 window.location.hash="#accountSummary";
			}
			else if(Notificationhash== "rrftr01"){
			  
			   window.location.hash="#rrftr01";
			}
			else if(Notificationhash== "rrwcm01"){
			
			   window.location.hash="#rrwcm01";
			}
			else if(Notificationhash== "debithome"){
			
			   window.location.hash="#debithome";
			}
			else if(Notificationhash== "rruvp01"){
			 
			   window.location.hash="#rruvp01";
			}
			else if(Notificationhash== "billpayment"){
			 window.location.hash="#billpayment";
			}
		    else if(Notificationhash== "rraci01"){
			   window.location.hash="#ccaccountSummary";
			}
		    else if(Notificationhash== "rrccp01"){
			   window.location.hash="#rracs01";
			}
		
	}	
		else{
	
			var tamplets = mainObject;
			Notificationhash=tamplets.data.template;
			
		   	if(Notificationhash== "rrasm01"){
			 accsumm="accsumm";
			 window.location.hash="#login";
			}
			else if(Notificationhash== "rrftr01"){
			   fundtransfermsg="fundtransfermsg";
			   window.location.hash="#login";
			}
			else if(Notificationhash== "rrwcm01"){
			   Mutulfund="Mutulfund";
			   window.location.hash="#login";
			}
			else if(Notificationhash== "debithome"){
			   debitcrdhome="debitcrdhome";
			   window.location.hash="#login";
			}
			else if(Notificationhash== "rruvp01"){
			   viewpaybill="viewpaybill";
			   window.location.hash="#login";
			}
			else if(Notificationhash== "billpayment"){
			 viewpaybill="viewpaybill";
			 window.location.hash="#login";
			}
		    else if(Notificationhash== "rraci01"){
			  crditcardstatment="crditcardstatment"
			  window.location.hash="#login";
			}
			else if(Notificationhash== "rrccp01"){
			   crditcardpayment="crditcardpayment"
			   window.location.hash="#login";
			}
		
		  
		}
		return;
	}
    
	
function setDeviceToken(token){
	//console.log('Inside device token');
	gcmId = token;
	if(gcmId != ''){
	arrgcm = gcmId.split("##@@##");
	if(arrgcm != undefined){
	gcmid = arrgcm[0];
	udid = arrgcm[1];
	}else{
		gcmid = "";
		udid = "";
	}
	}else{
	gcmid = "";
	udid = "";
	}
	//Logic implementation
		    var cars ;
	   
			//console.log('Local storage value '+d);
			if(d!=''){
			    //console.log('Inside None Blank'+mycars);
			    cars = localStorage["mycars"];
			    cars += '##'+Ntcp(Regloginuid);
			    localStorage["mycars"] = cars;
               // console.log('Inside None Blank');
			}else {
		
			  // console.log('Inside Blank');
			   localStorage["mycars"] = Ntcp(Regloginuid);
               d = localStorage["mycars"];
			  
			}
			//console.log('Local storage value2 '+localStorage["mycars"]);
			var arr = localStorage["mycars"];
			arr = arr.split('##');
			//console.log('Lenth of arr '+arr.length)
		
			var uniqueNames = [];
			$.each(arr , function(i, el){
			     if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
			});
			//console.log("Length : "+uniqueNames.length);
    if(uniqueNames.length==1){
      messauid = NtcpD(uniqueNames[0]);
      window.localStorage["messauid"]=uniqueNames[0];

    }
			if(uniqueNames.length==3){
			 // console.log('Inside 3'+NtcpD(uniqueNames[2]));
			   OldCusid = NtcpD(uniqueNames[0]);
			   //console.log('Inside 31')
			   NewRegloginuid = NtcpD(uniqueNames[2]);
			   // console.log('Inside 32')
                messauid = NewRegloginuid;
				localStorage.clear();
				 //console.log('Inside 323')
			//	console.log('window.localStorage["messauid"]  '+uniqueNames[2]);
                window.localStorage["messauid"]=uniqueNames[2];
			   
			   localStorage["mycars"] = '';
			   uniqueNames.length = 0;
			   cars = '';
                url='http://hdfc.snapworkapps.com/hdfcbankapi/updatemapping.jsp?OldCustomerId='+OldCusid+'&app_key=285e19f20beded7d215102b49d5c09a0&device_type='+flduseragent+'&device_id='+gcmid+'&udid='+udid+'&CustomerId='+NewRegloginuid+'&appId='+fldDeviceId;
               // console.log('url for update custid '+url);
			   $.ajax( {  
				    url:url,
					dataType: 'xml',
					success:function(data) {
                      
					regid = "";
					//alert((new XMLSerializer()).serializeToString(data));	
						$('XML', data).each(function() {	    	        	           		
						regid = $(this).find('DeviceRegisterID').text();
						});
						loginuid = window.localStorage["chkSumd"];
						window.localStorage["reguserid_"+loginuid] = regid;
						hdfc_android.setUserRegisterID(regid);
					 }
				  });
			 
			}
	//Login implementation End
	    window.localStorage["chkSumd"] = Ntcp(Regloginuid);
		//if((window.localStorage["reguserid_"+Ntcp(Regloginuid)] == '' || window.localStorage["reguserid_"+Ntcp(Regloginuid)] == null) && gcmid != '' && udid != '' && uniqueNames.length===1){
    if(gcmid != '' && udid != '' && uniqueNames.length==1){
            url='http://hdfc.snapworkapps.com/hdfcbankapi/register.jsp?app_key=285e19f20beded7d215102b49d5c09a0&device_type='+flduseragent+'&device_id='+gcmid+'&udid='+udid+'&CustomerId='+Regloginuid+'&appId='+fldDeviceId;
        messauid = Regloginuid;
           // console.log("Url while register "+url)
			$.ajax( {    
				url:url,
				dataType: 'xml',
				success:function(data) {
				regid = "";
				//alert((new XMLSerializer()).serializeToString(data));	
					$('XML', data).each(function() {	    	        	           		
					regid = $(this).find('DeviceRegisterID').text();
					});
					loginuid = window.localStorage["chkSumd"];
					window.localStorage["reguserid_"+loginuid] = regid;
					
					hdfc_android.setUserRegisterID(regid);
                   
				 }
			  });
		}
}

function setTad(){
						  var carddata = $("#fldCardNo").val();
						var ctype = $("#fldAmtType").val();
						
						if(carddata != '' && carddata != undefined && carddata != null){
						arrcrdata = carddata.split("#")
						maddata=arrcrdata[5];
						taddata=arrcrdata[6];
						
						if(ctype == "TAD"){
						
						$("#fldTxnAmt").val(taddata);
						$('#fldTxnAmt').attr('readonly', true);
							    	}  
						  }
	  }
function callVBLogout() {
  window.location="#logout";
}

function alertDismissed() {
   console.log('testing');
}
function customAlert(msg){
	//alert(msg);
	alert(msg);
	/* navigator.notification.alert(
		    msg,  // message
		    alertDismissed,         // callback
		    'Alert',            // title
		    'Ok'                  // buttonName
		); */
}
 
function getBStories(interest,enCKey) {
	userid = interest;
	//console.log("User - ID1a "+userid);
	var JsonFormatter = {
	        stringify: function (cipherParams) {
	            // create json object with ciphertext
	            var jsonObj = {
	                ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)
	            };

	            // optionally add iv and salt
	            if (cipherParams.iv) {
	                jsonObj.iv = cipherParams.iv.toString();
	            }
	            if (cipherParams.salt) {
	                jsonObj.s = cipherParams.salt.toString();
	            }

	            // stringify json object
	            return JSON.stringify(jsonObj);
	        },

	        parse: function (jsonStr) {
	            // parse json string
	            var jsonObj = JSON.parse(jsonStr);

	            // extract ciphertext from json object, and create cipher params object
	            var cipherParams = CryptoJS.lib.CipherParams.create({
	                ciphertext: CryptoJS.enc.Base64.parse(jsonObj.ct)
	            });

	            // optionally extract iv and salt
	            if (jsonObj.iv) {
	                cipherParams.iv = CryptoJS.enc.Hex.parse(jsonObj.iv)
	            }
	            if (jsonObj.s) {
	                cipherParams.salt = CryptoJS.enc.Hex.parse(jsonObj.s)
	            }

	            return cipherParams;
	        }
	    };

	    var encrypted = CryptoJS.AES.encrypt(userid, enCKey);
		//var test = { format: JsonFormatter };
		//console.log("User - CT test "+JSON.stringify(encrypted));
		//{"ct":"9ovnrCNi6lROcLq+xo1+Pg==","iv":"a86210d651a9fac8338197c516c04006","s":"2b8178df10677d60"}
		//console.log("User - CT ID3 "+  encrypted.ct);console.log("User - iv ID3 "+encrypted.iv);console.log("User - s ID3 "+encrypted.s);
		//console.log("User - ID3 "+encrypted);
	  //  alert(encrypted); // {"ct":"tZ4MsEnfbcDOwqau68aOrQ==","iv":"8a8c8fd8fe33743d3638737ea4a00698","s":"ba06373c8f57179c"}
		//console.log('String in ecrption for '+enCKey);
	    //var decrypted = CryptoJS.AES.decrypt(encrypted, enCKey, { format: JsonFormatter });
		//console.log("User - ID4 "+encrypted);
	 // var decrypted1 = (decrypted.toString(CryptoJS.enc.Utf8)); // Message
	 // console.log("User - ID5 "+decrypted1);
	//  var  response = { "authenticationRESP" : decrypted1  };
	 // console.log("User - ID6 "+encrypted);
	  return encrypted;
}
  
function randomnum1(){

var alpha = ['A','B','C','D','E']

var rand = alpha[Math.floor(Math.random() * alpha.length)];

return rand;

}

function randomnum2(){

var alpha = ['F','G','H','I','J']

var rand = alpha[Math.floor(Math.random() * alpha.length)];

return rand;

}

function randomnum3(){

var alpha = ['K','L','M','N','O','P']

var rand = alpha[Math.floor(Math.random() * alpha.length)];

return rand;

}
function makeid()
{
	var hash="";
	var rr = Math.random();
	checkout = "tryuetiti6i6u75"+randomnum3()+randomnum1()+rr+"@#$@"+rr;
		WL.Client.addGlobalHeader('deflate', checkout);
	for( var i=0; i < 10; i++ ){

	hash += checkout.charAt(Math.floor(rr * checkout.length));
	rr = (rr+(i*i))/100;
	}

	return hash;
}
function loginPinSet(pinSetFromUser) {
	//alert(pinSetFromUser);
	if(logincheck == "False"){
		localStorage.setItem("csd",tesmppbkID);
		localStorage.setItem('loginerror','');
		localStorage.setItem("logerr","false");
		var tempPin = booksStore(pinSetFromUser);
		localStorage.setItem("cnpnpatt",tempPin);
		localStorage.removeItem("accountListRD");
		localStorage.removeItem("accountListFD");
		localStorage.removeItem("accountListPSBK");
		localStorage.removeItem("CurrencyVal1");
		localStorage.removeItem("CurrencyVal");
		localStorage.removeItem("CurrencyValue");
		accountListPSBK.removeAll(); accountListFD.removeAll(); accountListRD.removeAll();
		localStorage.setItem("Demo","");
		var tempname = "Dear "+booksStore(localStorage.getItem("names"))+", Congratulations! You have successfully registered for mPassbook.";
		alert(tempname);
		setTimeout(function(){
			getsmsNo();
				window.location.hash = '#mPassbook01';
		},1000);
	}
	else{
		localStorage.setItem('logTy',"Pattern");
		alert("Your mPassbook Pattern changed successfully, kindly re-login to access mPassbook");
		var tempPin = booksStore(pinSetFromUser);
		localStorage.setItem("cnpnpatt",tempPin);
		var model = new mPassbookViewModel();  
		model.pasbooklogout2();
	}
	//navigator.notification.confirm(tempname, onNetworkCheck2, "Registration Successful", ['ok']); 
}

function loginPinAuthSuccess(){
	if(Authpattern == "True"){
		$('#authenticate').hide();
		$('#setpinpattern').show();
	}
	else{
		var temppbkid = booksStore(localStorage.getItem("csd"));
		passbookID = temppbkid;
		window.location = "#financialSummary";
		localStorage.setItem("logerrcount","0");
	}
}

function loginPinAuthFailed(){
		localStorage.setItem('loginerror',"true")
		//alert("Your account has been blocked as you have made 5 unsuccessful Login attempts. Please re-register to start using mPassbook again");
		window.location.hash = '#mPB_login_error';
}

function registrationPinCanceled(){
	$('.configurePin').show();
	if(logincheck == "False"){
		navigator.notification.confirm(
			          "Registration is not complete, are you sure you want to exit?",
			          checkButtonpassbookReg,
			          'Registration',
			          ['No','Yes']);
	}
}
function loginPinAuthCanceled(){
	
}
function loginPinAuthForget(){
	window.location.hash = '#mPB_register';
}
function multiReplace(str, match, repl) {
    if (match === repl)
        return str;
    do {
        str = str.replace(match, repl);
    } while(str.indexOf(match) !== -1);
    return str;
}
function booksStore(str) {
    var encoded = "";
    for (i=0; i<str.length;i++) {
        var a = str.charCodeAt(i);
        var b = a ^ 123423;    // bitwise XOR with any number, e.g. 123
        encoded = encoded+String.fromCharCode(b);
    }
    return encoded;
}

function TimeStamp() {
  now = new Date();
  year = "" + now.getFullYear();
  month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
  day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
  hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
  minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
  second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
  return year + "" + month + "" + day + "" + hour + "" + minute + "" + second;
}
function getSks(interest) {
	var d = new Date();
	var n = d.getTime();
	userid = "absolute"+interest;
	return userid;
}

function hex2a(hex) {
    var str = '';
    for (var i = 0; i < hex.length; i += 2) {
        var v = parseInt(hex.substr(i, 2), 16);
        if (v) str += String.fromCharCode(v);
    }
    return str;
}


function stringToHex (tmp) {
    var str = '',
        i = 0,
        tmp_len = tmp.length,
        c;
 
    for (; i < tmp_len; i += 1) {
        c = tmp.charCodeAt(i);
        str += d2h(c);
    }
    return str;
}
function d2h(d) {
    return d.toString(16);
}
/* JavaScript content from js/main.js in folder android */
// This method is invoked after loading the main HTML and successful initialization of the Worklight runtime.
function wlEnvInit(){
    wlCommonInit();
    // Environment initialization code goes here
}
function removeLastComma(strng){        
    var n=strng.lastIndexOf(",");
    var a=strng.substring(0,n) 
    return a;
}
function getAndroidVersion(ua) {
	ua = (ua || navigator.userAgent).toLowerCase(); 
	var match = ua.match(/android\s([0-9\.]*)/);
	return match ? match[1] : false;
};
if(parseFloat(getAndroidVersion()) <= 4.0 ){
	$('body').addClass('lowDevice');	
}else{	
}
$(window).on('hashchange', function() {
	if(window.location.hash == "#interactive" || window.location.hash == "#mPB_passbook"){
		$('body').addClass('preview');
	}else{
		$('body').removeClass('preview');
	}
});