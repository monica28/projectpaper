function hdfcViewModel(){
	var self = this;
    self.loggedIn = ko.observable(false);
    self.backVisible = ko.observable(false);
    rsacheck = ko.observable(false);
    window.localStorage["loginflag"] = false;
    window.localStorage["loggeduserid"] = '';
    self.loggedinUserId = ko.observable();
    userID = ko.observable();
    userSecureImg = ko.observable();
    secureText = ko.observable();
    rsaEnrollReq = ko.observable();
    MyMenus = ko.observable();
    MmenuList =  ko.observable();
	MmenuList1 =  ko.observableArray([]);
	MmenuList11 = ko.observableArray([]);
	MmenuList2 =  ko.observableArray([]);
	MmenuList3 =  ko.observableArray([]);
	MmenuList4 =  ko.observableArray([]);
	MmenuList5 = ko.observableArray([]);
	MmenuList6 =  ko.observableArray([]);
	MmenuList7 =  ko.observableArray([]);
	MmenuList8 =  ko.observableArray([]);
	MmenuList9 =  ko.observableArray([]);
	MyPerlzdMenus = ko.observable();
    PerLzdmenuList =  ko.observable();
	mpinaccountListDebit = ko.observableArray([]);
    selALLBiller = ko.observable();
    responseData = ko.observable();
    selectedAccount = ko.observableArray([]);
    accountList = ko.observableArray([]);
	
	notificationmsgs=ko.observableArray([]);
	accountListFD = ko.observableArray([]);
	accountListRD = ko.observableArray([]);
	accountListDebit = ko.observableArray([]);
	accountListMpassbook = ko.observableArray([]);
	RDListMpassbook = ko.observableArray([]);
    accountList10 = ko.observableArray([]);
    accSlider = ko.observable(false);
    accountSummList = ko.observableArray([]);
    accSummSlider = ko.observable(false);
    ccaccountList = ko.observableArray([]);
    ccaccountList1 = ko.observableArray([]);
    ccaccountList2 = ko.observableArray([]);
	 ccaccountList3 = ko.observableArray([]);
    ccaccountList4 = ko.observableArray([]);
	CategoryList = ko.observableArray([]);
	CategoryList_expense = ko.observableArray([]);
    self.error = ko.observable();
    self.errormsg = ko.observable();
   mfSlider = ko.observable(false);
  mfaccountList = ko.observableArray([]);
  mfaccountList1 = ko.observableArray([]);  
    accStmtData = ko.observable();
    rdAccountList = ko.observableArray([]);
    dbtAccountList= ko.observableArray([]);
	dbtHotlistAcc= ko.observableArray([]);
	dbtErrText = ko.observable();
    AllCategories = ko.observable();
	demataccountList = ko.observableArray([]);
	SettlementList = ko.observableArray([]);
    self.billaccounts = ko.observableArray([]);
    /* RSA variables */
    self.rsaStmtData = ko.observable();
    self.quesList = ko.observableArray([]);
	
    self.rsaFields = ko.observableArray([]);
    self.rsaJSONdata = ko.observableArray([]);
    self.oobPhoneList = ko.observableArray([]);
    self.fldSelRsaOOBPhone = ko.observable();
    Customer_accNum_Video="";
    self.msgCentreList = ko.observableArray([]);
	Accountblance= new Array();
	BeneMobileNo= new Array();
	ccwaccountno= new Array();
    var conAds = [];
    /* RSA variables */
    UNREADMSGCOUNT = ko.observable();
    self.commonData = function(){
    	$(window).scrollTop(0);
    	
	if(window.location.hash == '#mymenu'){	
    		$('.footer').height(109);
    		$("#save").show();
    	}else{
    		$('.footer').height(54);
    		$("#save").hide();
    	}
    	if(window.location.hash == '#applicationForm'|| window.location.hash == '#existingCustomer' || window.location.hash == '#login' || window.location.hash == '#loginCustPass' || window.location.hash == '#menu' || window.location.hash == '#applyNow' || window.location.hash == '#messageCentre' || window.location.hash == '#offers'||window.location.hash == '#settings'||window.location.hash == '#mPassbook' ||window.location.hash == '#MpinRegister'||window.location.hash == '#setmpin'||window.location.hash == '#loginmethod'||window.location.hash == '#loginmpin' || window.location.hash == '#genVerifyOTP' ||  window.location.hash == '#GenOTPPage'||window.location.hash == '#rrfcp01'||window.location.hash == '#rrfcp03'){
		
		    $('.ad_banner').hide();
    		$(".footer").hide();
    		$(".logout .logout").hide();
    	}else{
    		$(".footer").show();
    		$(".logout .logout").show();
    	}
    	
    	if(window.location.hash == '#menu') $(".h_title").hide();
    	else $(".h_title").show();
    		
    	
    	if(RegloginFlag == 'yes' && window.location.hash != '#login'){
    		$('.footer li').removeClass('active');   
  		   $(MyParentPage+"I").addClass('active');
    		//$(".back .back").show();
   	if( window.location.hash == '#rrasm01' || window.location.hash == '#mymenu' || window.location.hash == '#rrftr01'|| window.location.hash == '#debithome'|| window.location.hash == '#rracs01'|| window.location.hash == '#billpayment'|| window.location.hash == '#Demat'|| window.location.hash == '#others' ||window.location.hash == '#rrwcm01')
    			{	
    			self.backVisible(false);
    		}else{ self.backVisible(true);
			$('.ad_banner').hide();
			}
    	}
    	else{
    		self.backVisible(false);
    		//$(".back .back").hide();
    	}
    
    	if(  window.location.hash == '#existingCustomer'|| window.location.hash == '#applicationForm' || window.location.hash == '#offers'|| window.location.hash == '#applyNow' || window.location.hash == '#login' ||  window.location.hash == '#messageCentre'||window.location.hash == '#settings'||window.location.hash == '#mPassbook' ||window.location.hash == '#loginmethod'||window.location.hash == '#MpinRegister'||window.location.hash == '#loginmpin'||window.location.hash == '#GenOTPPage')
    	{
    	 self.backVisible(true);
    	 $(".back .back").show();
    	}
    };
    
    formatAmt = function(val,tofix) {
	if(typeof(tofix)==='undefined') tofix=2;
    	val = parseFloat(val);
    	return val.toFixed(tofix).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");        
     };
    

	
  
    rsaResponse = function(result){
    	
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    			//if(invocationResult.faml.response.rc.returncode == 0){
	    			self.rsaStmtData(invocationResult.faml);    
	    			randomintstr = $.now();
	    			window.location = "#rsaValidation/"+randomintstr;
    			/*}else{
	     			handleError(invocationResult.faml.response);
	     		}*/
    		}else{
    			handleErrorNoResponse();
    		}
    	}
    };
    
    this.rsaSubmit = function(model, event){
    	
    	authAction = $("#fldRsaAuthAction").val();
    	//alert(authAction);
    	rsaErrorFlag = 1;
    	
    	if(authAction == 'OTP_EMAIL'){
    		
    		if(!document.frmRSA.fldMobile.checked) {
    			alert("Please select a channel");
    			rsaErrorFlag = 0;
    			return false;
    		}else if (document.frmRSA.fldMobile.checked) {
    				document.frmRSA.fldMobile.value="on";
    				document.frmRSA.fldMsgSentMode.value='M';
    				
    	    		document.getElementById('fldRsaAuthAction').value = 'OTPRELAY';
    		}
    		
    		if(document.frmRSA.fldRsaSessionId != null) {
    			if(document.frmRSA.fldRsaSessionId.value !=null) {
    				document.frmRSA.fldRsaSessionId.value = document.frmRSA.fldExtSessionId.value;
    			}
    		}
    		    		
    		
    	}else if(authAction == 'OTPRELAY'){
    		
    		if (document.frmRSA.fldOtpToken.value == '') {
    			alert("Please enter the OTP");
    			rsaErrorFlag = 0;
    			return false;
	    	}else{
	
	    		if(document.frmRSA.fldRsaSessionId != null) {
	    			if(document.frmRSA.fldRsaSessionId.value !=null) {
	    				document.frmRSA.fldRsaSessionId.value = document.frmRSA.fldExtSessionId.value;
	    			}
	    		}	
	    		document.getElementById('fldRsaAuthAction').value = 'OTP';
	    	}
    	}else if(authAction == 'OOBPHONE'){
	    	
    		var objs1 = document.getElementById('fldSelRsaOOBPhone');
	    	document.getElementById('fldSelRsaOOBPhone_txt').value = objs1.options[objs1.selectedIndex].innerHTML;
	    	document.getElementById('fldSelRsaOOBPhone_ix').value = objs1.selectedIndex;
	    	
	    	document.getElementById('fldRsaAuthAction').value = 'OOBPHONE';
	    	objphval = objs1.value;
	    		
	    	if(objphval != '' && objphval != undefined){
	    		arrphoob = objphval.split("#");
	    		
	    		$("#fldOOBPhoneLabel").val(arrphoob[4]);
	    	}
    	}
    	
    	if(rsaErrorFlag){
	    	var $form = $("#frmRSA");
	    	rsaDataArray = $form.serializeArray();    	
	    	fldjsessionid = Rsessionid;
	    	
	    	//rsajsonData.push({name: 'wordlist', value: wordlist});
	    	    	
	    	view = {};
	    	for (var i in rsaDataArray) {
	    	    view[rsaDataArray[i].name] = rsaDataArray[i].value;
	    	  }
	    	 //rsajsonData = JSON.stringify(view);
		   	 //console.log("jsonstring >>::"+JSON.stringify(view));
	   	 	//ipadd = '';
    	    WL.Device.getNetworkInfo(function (networkInfo) {
    	    		ipadd = networkInfo.ipAddress;
    	    		reqParams["fldAppipAddress"] = networkInfo.ipAddress;
    	    	});
	    	if(authAction == 'QUESTION'){
		    	invocationData = {
		    		adapter : "RSAAdapter",
		    		procedure : "GetAPICall",
		    		parameters : [fldjsessionid,view,ipadd],
					compressResponse : true
		    	};
	    	}else{
				//ipadd = '';
    	    	WL.Device.getNetworkInfo(function (networkInfo) {
    	    		ipadd = networkInfo.ipAddress;
    	    		reqParams["fldAppipAddress"] = networkInfo.ipAddress;
    	    	});
	    		invocationData = {
			    		adapter : "API_Adapter",
			    		procedure : "GetAPICall",
			    		parameters : [fldjsessionid,view,ipadd],
						compressResponse : true
			    	};
	    	}
	    	
	    	//WL.Logger.debug(invocationData, '');
	    		busyInd.show();
	    	WL.Client.invokeProcedure(invocationData, {
	    		onSuccess : rsaResponse,
	    		onFailure : AdapterFail,
	    		timeout: timeout
	    	});  
        	
    	}
    	
    };
    
    
    callLocate = function(){
    	WL.NativePage.show('com.snapwork.mapview', function(data){
    		//alert(data);
    		}, {key1 : 'value1'});
    };
    
	
    Sammy(function() {
        this.disable_push_state = true; 
        	
        this.get("#menu",function() {
			$("#mPassbookcss").attr("href","");    
			$('.asideBar').hide();			
        	self.commonData();
            MSGCNT();
		
        	
        	$("#contentData").load("Views/Menu/menu.html", null, function (response, status, xhr) {
                if (status != "error") {}
                ko.applyBindings(self, $(".dynamic-page-content").get(0)); 
				
				if(UNREADMSGCOUNT()>0){

                                        $('.msgCount').show();

                                   }else {
                                   $('.msgCount').hide();
                                   }
               
            });
        	
        });
        this.get("#login",function() {
            loggedinuser = false;
        	MyParentPage="#menu";
        	self.commonData();
        	userSecureImg("");
			secureText("");
			$(".h_title").html("Login");
		    loadViewModel("login");
             $.getJSON("http://hdfcanalytics.snapworkapps.com/sectionclicks.html?deviceid="+menuUdid+"&page=MyAccount&ptype=Android",function(data) {});    
        });        
        this.get("#loginCustPass",function() {
            MyParentPage="#loginmethod";    
        	self.commonData();
            $(".h_title").html("Login");
            loadViewModel("logincustpass");
            
        });
        
        this.get("#logout",function() {
        	cpbannerclose="";
        	self.commonData();
            $(".h_title").html("Login");
            loadViewModel("logout");
        });
		
		//start mpin register
		
		this.get("#loginmethod",function() { 
           MyParentPage="#menu";       	
        	self.commonData();
            $(".h_title").html("Login Method");
            loadViewModel("loginmethod");
            
        });
		this.get("#MpinRegister",function() {        	
        	self.commonData();
            //$(".h_title").html("Step 1: Verify yourself");
            loadViewModel("MpinRegister");
            
        });
		this.get("#setmpin",function() {        	
        	self.commonData();
            $(".h_title").html("Step 4: Set Quick Access PIN");
            loadViewModel("setmpin");
            
        });
		
		this.get("#loginmpin",function() {        	
        	self.commonData();
            $(".h_title").html("Login");
            loadViewModel("loginmpin");
            
        });
		this.get("#genVerifyOTP",function() {        	
        	self.commonData();
            $(".h_title").html("Step 2: Validate One Time Password (OTP)");
            loadViewModel("genVerifyOTP");
            
        });
		this.get("#GenOTPPage",function() { 
          MyParentPage="#menu";           	
        	self.commonData();
            //$(".h_title").html(" Verify OTP");
            loadViewModel("GenOTPPage");
            
        });
		this.get("#rrfcp02",function() { 
            MyParentPage="#others";        	
        	self.commonData();
            $(".h_title").html("Change Quick Access PIN");
            loadViewModel("rrfcp02");
            
        });
		this.get("#rrfcp01",function() {        	
        	self.commonData();
            $(".h_title").html("Force change Quick Access PIN");
            loadViewModel("rrfcp01");
            
        });
		this.get("#rrfcp03",function() {        	
        	self.commonData();
            $(".h_title").html("Set Quick Access PIN");
            loadViewModel("rrfcp03");
            
        });
		
		//end mpin register
        
        /* Start - Account section */
        this.get("#mymenu",function() {        	
        	busyInd.show();
        	MyParentPage="#mymenu";
        	var otherCnt = 0;
        	var accts = 0;
        	var trsnfer = 0;
        	var bills = 0;
        	var cards = 0;
        	var othrs = 0;
        	var demat = 0;
        	var fcatis = 0;
        	var dtcard = 0;
        	var inalert = 0;
        	if(cbannerForMyMenu!=""){
        		$('#cpCnt').html(cbannerForMyMenu);	
        	 }
        	else{
          	  loadXMLDoc();
            }
        	
   		   if(cpBanner!='' && cpbannerclose!='adclose'){
			//   alert("mymenu02");
 	        var menu = $(".menu");	
           if (navigator.onLine && cpBanner!='' && cbannerForMyMenu!='') {
						  $('.ad_banner').show();
 		              	$('#cpCnt').html(cbannerForMyMenu);			
			    } else {
					      $('.ad_banner').hide();
				}				
 				
 			var conveniancecount = $("div[id*='bannerHtml']").length;if(conveniancecount > 1){bannerHeight = $('#bannerHtml').height()+100;}else{bannerHeight = $('#bannerHtml').height()+100;}				
 			menu.animate({top: bannerHeight + 'px'},2000);		
 	        }
	   		//alert("main menu"+cpbannerclose);
		     if( cpbannerclose=="adclose"){		 
				$('.ad_banner').hide();
				var menu = $(".menu");
				menu.animate({top: '96px'},2000);
			 }
            $(".h_title").html("My Menu");               
            mlst = MmenuList();
            
            //
            $.each( mlst, function( key, val ) {
            if(val.token2=='mymenu'){	
    			if(val.token2=='chgaddr' || val.token2=='chgpwd' || val.token2=='mobilereg'){
    				otherCnt += 1;
    			}
				
    			if(val.txnid == 'ASM' || val.txnid == 'SIN' || val.txnid == 'CSS' || val.txnid == 'EMD' || val.txnid == 'EMR' || val.txnid == 'HIQ' || val.txnid == 'FDL' || val.txnid == 'ASR' || val.txnid == 'CBR' || val.txnid == 'SCH' || val.txnid == 'SUS' || val.txnid == 'TXI' || val.txnid == 'CSI' || val.txnid == 'LOA' || val.txnid == 'RDS' || val.txnid == 'FTR' || val.txnid == 'FDR' || val.txnid == 'RDO' || val.txnid == 'FSS' || val.txnid == 'PFC' || val.txnid == 'RFX'){
    				accts += 1;
    			}
    			if(val.txnid == 'TPT' || val.txnid == 'TPN' || val.txnid == 'TPI' || val.txnid == 'TPV' || val.txnid == 'CPQ' || val.txnid == 'VMT' || val.txnid == 'MPE' || val.txnid == 'IFT' || val.txnid == 'VFT' || val.txnid == 'P2A' || val.txnid == 'MMG' || val.txnid == 'MMR' || val.txnid == 'MMC'){
    				trsnfer += 1;
    				}
    			if(val.txnid == 'UCR' || val.txnid == 'BMR' || val.txnid == 'DTH' || val.txnid == 'BMP' || val.txnid == 'BDP' || val.txnid == 'UAB' || val.txnid == 'UVB' || val.txnid == 'UPH' || val.txnid == 'UAP'|| val.txnid == 'UVP'){bills += 1;}
    			if(val.txnid == 'ACS' || val.txnid == 'ACI' || val.txnid == 'CCP' || val.txnid == 'UNB' || val.txnid == 'UPD' || val.txnid == 'CAC' || val.txnid == 'EST' || val.txnid == 'PCR' || val.txnid == 'APR' || val.txnid == 'CDC' || val.txnid == 'APD'){
    				cards += 1;
    				}
    			if(val.txnid == 'DPL' || val.txnid == 'HLD' || val.txnid == 'DPQ' || val.txnid == 'DTS' || val.txnid == 'DMQ' || val.txnid == 'DIQ' || val.txnid == 'DCQ'){demat += 1;}
    			if(val.txnid == 'WCM' || val.txnid == 'IPB' || val.txnid == 'VPR' || val.txnid == 'OBU' || val.txnid == 'ORE' || val.txnid == 'OSW' || val.txnid == 'SIP' || val.txnid == 'SRP' || val.txnid == 'TXA' || val.txnid == 'SWP' || val.txnid == 'STP' || val.txnid == 'OST'){
    				fcatis += 1;
    				}
    			if(val.txnid == 'DCE' || val.txnid == 'DCL'){dtcard += 1;}
    			if(val.txnid == 'ALT' || val.txnid == 'ALM'){
    				inalert += 1;
    			}
    			if(val.txnid == 'CPW' || val.txnid == 'CAD'){
    				otherCnt += 1;
    				
    				}
            }
    			//if(val.token2=='nmymenu')
      		   //MmenuList 
      		  });
            //
			if(billpaypage=="billpayment"){
				setTimeout(function(){
						busyInd.hide();
				}, 2000);
              window.location="#billpayment";				

			}else if(fundtransferNli=="fundtransfer"){
			  setTimeout(function(){
						busyInd.hide();
				}, 2000);
			  window.location="#rrftr01";	
			}
			else if(accsumm=="accsumm"){
			    setTimeout(function(){
						busyInd.hide();
				}, 2000);
			   window.location="#accountSummary";
			}
			else if(fundtransfermsg=="fundtransfermsg"){
		
			  setTimeout(function(){
						busyInd.hide();
				}, 2000);
			   window.location="#rrftr01";
			}
			else if(debitcrdhome=="debitcrdhome"){
			  setTimeout(function(){
						busyInd.hide();
				}, 2000);
			   window.location="#debithome";
			}
			else if(Mutulfund=="Mutulfund"){
			  setTimeout(function(){
						busyInd.hide();
				}, 2000);
			   window.location="#rrwcm01";
			}
			else if(viewpaybill=="viewpaybill"){
		
			  setTimeout(function(){
						busyInd.hide();
				}, 2000);
			   window.location="#billpayment";
			}
			else if(creditcardpay == "creditcardpay"){
			
			  setTimeout(function(){
						busyInd.hide();
				}, 2000);
			   window.location="#rracs01";
			}
			else if(crditcardstatment=="crditcardstatment"){
	
			  setTimeout(function(){
						busyInd.hide();
				}, 2000);
			   window.location="#ccaccountSummary";
			}
			else if(crditcardpayment=="crditcardpayment"){
		
			  setTimeout(function(){
						busyInd.hide();
				}, 2000);
			   window.location="#rracs01";
			}
			
		    else{
	
            $("#contentData").load("Views/Menu/mymenu.html", null, function (response, status, xhr) {
                if (status != "error") {}
                if(invocationResult.faml.response.user){
                                
                            Customer_fName_Video = invocationResult.faml.response.user.firstname;
                                   
            
                            Customer_lName_Video = invocationResult.faml.response.user.lastname;
                
                }
               
                self.commonData();
                //ko.applyBindings(self, $(".dynamic-page-content").get(0));
                var model = new loginViewModel();
                ko.applyBindings(model, $(".dynamic-page-content").get(0)); 
                if(accts!=0){$('#accts').show();}if(trsnfer!=0){$('#trsnfer').show();}if(bills!=0){$('#bills').show();}
                if(cards!=0){$('#cards').show();}if(demat!=0){$('#demat').show();}if(fcatis!=0){$('#fcatis').show();}
                if(dtcard!=0){$('#dtcard').show();}if(inalert!=0){$('#alert').show();}
                if(otherCnt!=0){$('#otrs').show();}
                busyInd.hide();
				mymenuFlag = 0;
            });
			}
           
        });
		//Instaalert
		
		this.get("#rralt01",function() {
		MyParentPage="#others";
        	self.commonData();
        	$(".h_title").html("Manage Alerts - Set");
        	loadViewModel("rralt01");
        });
		this.get("#rralt02",function() {
		
        	self.commonData();
        	$(".h_title").html("Manage Alerts - Set ");
        	loadViewModel("rralt02");
        });
		this.get("#rralt03",function() {
        	self.commonData();
        	$(".h_title").html("Manage Alerts - Set ");
        	loadViewModel("rralt03");
        });
		this.get("#rralt04",function() {
        	self.commonData();
        	$(".h_title").html("Manage Alerts - Set");
        	loadViewModel("rralt04");
        });
		
		this.get("#rralt05",function() {
        	self.commonData();
        	$(".h_title").html("Manage Alerts - Edit/Delete ");
        	loadViewModel("rralt05");
        });
		this.get("#rralm02",function() {
		MyParentPage="#others";
        	self.commonData();
        	$(".h_title").html("Manage Alerts - Edit/Delete ");
        	loadViewModel("rralm02");
        });
		this.get("#rralm03",function() {
        	self.commonData();
        	$(".h_title").html("Manage Alerts - Edit/Delete ");
        	loadViewModel("rralm03");
        });
		this.get("#rralm04",function() {
        	self.commonData();
        	$(".h_title").html("Manage Alerts - Edit/Delete ");
        	loadViewModel("rralm04");
        });
		//End of Insta alert
        this.get("#rrmmg01",function() {  
        MyParentPage="#rrftr01";      	
        	self.commonData();
            $(".h_title").html("Generate MMID");
            loadViewModel("rrmmg01");
        });
        this.get("#rrmmg02",function() {
        	MyParentPage="#rrftr01";
        	self.commonData();
            $(".h_title").html("Generate MMID");
            loadViewModel("rrmmg02");
        });
        this.get("#rrmmg03",function() {
        	MyParentPage="#rrftr01";
        	self.commonData();
            $(".h_title").html("Generate MMID");
            loadViewModel("rrmmg03");
        });
		this.get("#rrmpg01",function() {
        	MyParentPage="#rrasm01";
        	self.commonData();
            $(".h_title").html("Generate MPIN");
            loadViewModel("rrmpg01");
        });
		this.get("#rrmpg02",function() {
        	MyParentPage="#rrasm01";
        	self.commonData();
            $(".h_title").html("Generate MPIN");
            loadViewModel("rrmpg02");
        });
		this.get("#rrmpg03",function() {
        	MyParentPage="#rrasm01";
        	self.commonData();
            $(".h_title").html("Generate MPIN");
            loadViewModel("rrmpg03");
        });
        this.get("#rrmmr01",function() {  
        MyParentPage="#rrftr01";      	
        	self.commonData();
            $(".h_title").html("Retrieve  MMID");
            loadViewModel("rrmmr01");
        });
        this.get("#rrmmr02",function() { 
        	MyParentPage="#rrftr01";
        	self.commonData();
            $(".h_title").html("Retrieve  MMID");
            loadViewModel("rrmmr02");
        });
        this.get("#rrmmr03",function() {
        	MyParentPage="#rrftr01";
        	self.commonData();
            $(".h_title").html("Retrieve  MMID");
            loadViewModel("rrmmr03");
        });
		
         //PurchaseForexCard
		
		this.get("#rrpfc01",function() {
        	MyParentPage="#rrasm01";
        	self.commonData();
            $(".h_title").html("Purchase Forex Card ");
            loadViewModel("rrpfc01");
        });
        
		this.get("#rrpfc02",function() {
        	MyParentPage="#rrasm01";
        	self.commonData();
            $(".h_title").html("Purchase Forex Card ");
            loadViewModel("rrpfc02");
        });
		this.get("#rrpfc03",function() {
        	MyParentPage="#rrasm01";
        	self.commonData();
            $(".h_title").html("Purchase Forex Card ");
            loadViewModel("rrpfc03");
        });
		this.get("#rrpfc04",function() {
        	MyParentPage="#rrasm01";
        	self.commonData();
            $(".h_title").html("Purchase Forex Card ");
            loadViewModel("rrpfc04");
        });
		
		this.get("#rrrfx01",function() {
        	MyParentPage="#rrasm01";
        	self.commonData();
            $(".h_title").html("Reload Forex Card ");
            loadViewModel("rrrfx01");
        });
		this.get("#rrrfx02",function() {
        	MyParentPage="#rrasm01";
        	self.commonData();
            $(".h_title").html("Reload Forex Card ");
            loadViewModel("rrrfx02");
        });
		this.get("#rrrfx03",function() {
        	MyParentPage="#rrasm01";
        	self.commonData();
            $(".h_title").html("Reload Forex Card ");
            loadViewModel("rrrfx03");
        });
         //IMPS fund transfer using MMID
		
		
		this.get("#mfunihold",function() {  
		MyParentPage="#rrwcm01";      	
        	self.commonData();
            $(".h_title").html("Unit Holding Statement");
            
        });
		this.get("#rrsrp01",function() {  
		MyParentPage="#rrwcm01";      	
        	self.commonData();
            $(".h_title").html("SI Order Status / Revocation");
            loadViewModel("rrsrp01");
        });
		this.get("#rrsrp06",function() {        	
        	self.commonData();
            $(".h_title").html("SI Order Status / Revocation");
            loadViewModel("rrsrp06");
        });
		this.get("#rrsrp10",function() {        	
        	self.commonData();
            $(".h_title").html("SI Order Status / Revocation");
            loadViewModel("rrsrp10");
        });
		this.get("#rrtxa01",function() { 
		MyParentPage="#rrwcm01";       	
        	self.commonData();
            $(".h_title").html("Transaction History");
            loadViewModel("rrtxa01");
        });
		this.get("#rrtxa03",function() {        	
        	self.commonData();
            $(".h_title").html("Transaction History");
            loadViewModel("rrtxa03");
        });
		this.get("#rrsip01",function() {
		MyParentPage="#rrwcm01";        	
        	self.commonData();
            $(".h_title").html("Systematic Investment");
            loadViewModel("rrsip01");
        });
		/*this.get("#rrsip02",function() {        	
        	self.commonData();
            $(".h_title").html("Systematic Investment");
            loadViewModel("rrsip02");
        });*/
		this.get("#rrsip04",function() {        	
        	self.commonData();
            $(".h_title").html("Systematic Investment");
            loadViewModel("rrsip04");
        });
		this.get("#rrsip08",function() {        	
        	self.commonData();
            $(".h_title").html("Systematic Investment");
            loadViewModel("rrsip08");
        });
		this.get("#rrswp01",function() {  
		MyParentPage="#rrwcm01";      	
        	self.commonData();
            $(".h_title").html("Systematic Withdrawal");
            loadViewModel("rrswp01");
        });
		this.get("#rrswp04",function() {        	
        	self.commonData();
            $(".h_title").html("Systematic Withdrawal");
            loadViewModel("rrswp04");
        });
		this.get("#rrswp08",function() {        	
        	self.commonData();
            $(".h_title").html("Systematic Withdrawal");
            loadViewModel("rrswp08");
        });
		this.get("#impsFndTrnsList",function() {  
		MyParentPage="#rrftr01";
        	$(".h_title").html("IMPS Fund Transfer");
        	self.commonData();
        	loadViewModel("impsFndTrnsList");
        });
		this.get("#rrift01",function() {  
		MyParentPage="#rrftr01";
			$(".h_title").html("Fund Transfer to Mobile No.");
        	self.commonData();
        	loadViewModel("rrift01");
        });
		
		this.get("#rrift02",function() {  
        	$(".h_title").html("Fund Transfer to Mobile No.");
        	self.commonData();
        	loadViewModel("rrift02");
        });
		this.get("#rrift03",function() {  
			$(".h_title").html("Fund Transfer to Mobile No.");
        	self.commonData();
        	loadViewModel("rrift03");
        });
		//end of IMPS fund transfer
        this.get("#rrasm01",function() {
        	MyParentPage="#rrasm01";
        	self.commonData();
        	//loadXMLDoc();

        	$(".h_title").html("Accounts");
        	loadViewModel("rrasm01");
        });
        this.get("#others",function() {
MyParentPage="#others";
        	self.commonData();
        	$(".h_title").html("Others");
        	loadViewModel("others");
        	//loadXMLDoc();
        	if(cbannerForOther!=""){
        		$('#cpCnt').html(cbannerForOther);	
        	 }
        	else{
          	  loadXMLDoc();
            }
        	if(cpBanner!='' && cpbannerclose8!='adcloseOther'){
	   	        var menu = $(".menu");
                if (navigator.onLine && cpBanner!='' && cbannerForOther!='' ) {
						  $('.ad_banner').show();
	   			          $('#cpCnt').html(cbannerForOther);			
			    } else {
					      $('.ad_banner').hide();
				}					
	   			
	   			var conveniancecount = $("div[id*='bannerHtml']").length;if(conveniancecount > 1){bannerHeight = $('#bannerHtml').height()+100;}else{bannerHeight = $('#bannerHtml').height()+100;}				
	   			menu.animate({top: bannerHeight + 'px'},2000);		
   	       }
  		   
	   		//alert("main menu"+cpbannerclose);
		    if( cpbannerclose8=="adcloseOther"){		 
				$('.ad_banner').hide();
				var menu = $(".menu");
				menu.animate({top: '96px'},2000);
		    }
        });
		this.get("#rrcad01",function() {
		MyParentPage="#others";
        	self.commonData();
        	$(".h_title").html("View Contact Details");
        	loadViewModel("rrcad01");
        });
		this.get("#rrcpw01",function() {
		MyParentPage="#others";
        	self.commonData();
        	$(".h_title").html("Change Password");
        	loadViewModel("rrcpw01");
        });
		
		this.get("#rrcpw02",function() {
        	self.commonData();
        	$(".h_title").html("Change Password");
        	loadViewModel("rrcpw02");
        });
        // Credit Card
        this.get("#rracs01",function() {  
        	MyParentPage="#rracs01";
        	self.commonData();
        	$(".h_title").html("Credit Card ");
        	loadViewModel("rracs01");   
        	//loadXMLDoc();
        	if(cbannerForCC!=""){
        		$('#cpCnt').html(cbannerForCC);	
        	 }
        	else{
          	  loadXMLDoc();
            }
        	if(cpBanner!='' && cpbannerclose4!='adcloseCC' && cbannerForCC!=''){
	   	        var menu = $(".menu");	
                 
                if (navigator.onLine && cpBanner!='') {
					$('.ad_banner').show();
					$('#cpCnt').html(cbannerForCC);				
			    } else {
			    	$('.ad_banner').hide();
			    }				 
	   			var conveniancecount = $("div[id*='bannerHtml']").length;if(conveniancecount > 1){bannerHeight = $('#bannerHtml').height()+100;}else{bannerHeight = $('#bannerHtml').height()+100;}				
	   			menu.animate({top: bannerHeight + 'px'},2000);		
   	        }
        		
	   		//alert("main menu"+cpbannerclose);
		    if( cpbannerclose4=="adcloseCC"){		 
				$('.ad_banner').hide();
				var menu = $(".menu");
				menu.animate({top: '96px'},2000);
		    }
        	 
        	 
        });
        
        this.get("#ccunb",function() {
        		MyParentPage="#rracs01";
        	self.commonData();
        	$(".h_title").html("View Unbilled Transactions");
        	loadViewModel("ccunb");
        	 
        });
        
        
        // Credit Card
		
		//demat 
		this.get("#Demat",function() {
 MyParentPage="#Demat";
        	self.commonData();
        	$(".h_title").html("Demat");
        	loadViewModel("Demat");
        	//loadXMLDoc();
        	if(cbannerForDemat!=""){
        		$('#cpCnt').html(cbannerForDemat);	
        	}
        	else{
          	  loadXMLDoc();
            }
        	if(cpBanner!='' && cpbannerclose5!='adcloseDmt'){
			var menu = $(".menu");
			  if (navigator.onLine && cpBanner!='' && cbannerForOther!='' && cbannerForDemat!='' ) {
						  $('.ad_banner').show();
   			              $('#cpCnt').html(cbannerForDemat);			
			    } else {
					      $('.ad_banner').hide();
				}	
   	        					
   				
   			var conveniancecount = $("div[id*='bannerHtml']").length;if(conveniancecount > 1){bannerHeight = $('#bannerHtml').height()+100;}else{bannerHeight = $('#bannerHtml').height()+100;}				
   			menu.animate({top: bannerHeight + 'px'},2000);		
   	       }
  		 	//alert("main menu"+cpbannerclose);
		    if( cpbannerclose5=="adcloseDmt"){		 
				$('.ad_banner').hide();
				var menu = $(".menu");
				menu.animate({top: '96px'},2000);
		    }
        });
		this.get("#rrdpl01",function() {
		 MyParentPage="#Demat";
        	self.commonData();
        	$(".h_title").html("List of Accounts");
        	loadViewModel("rrdpl01");
        });
		this.get("#rrhld01",function() {
		 MyParentPage="#Demat";
        	self.commonData();
        	$(".h_title").html("Holdings Query ");
        	loadViewModel("rrhld01");
        });
		this.get("#rrhld02",function() {
        	self.commonData();
        	$(".h_title").html("Holdings Query ");
        	loadViewModel("rrhld02");
        });
		this.get("#rrhld02_new",function() {
		 MyParentPage="#Demat";
        	self.commonData();
        	$(".h_title").html("Holdings Query ");
        	//loadViewModel("rrhld02");
        });
		this.get("#rrdpq01",function() {
		 MyParentPage="#Demat";
        	self.commonData();
        	$(".h_title").html("Client Profile");
        	loadViewModel("rrdpq01");
        });
		this.get("#rrdpq02",function() {
        	self.commonData();
        	$(".h_title").html("Client Profile");
        	loadViewModel("rrdpq02");
        });
		this.get("#rrdts01",function() {
		 MyParentPage="#Demat";
        	self.commonData();
        	$(".h_title").html("Transaction Statement ");
        	loadViewModel("rrdts01");
        });
		this.get("#rrdts02",function() {
        	self.commonData();
        	$(".h_title").html("Transaction Statement ");
        	loadViewModel("rrdts02");
        });
		this.get("#rrdiq01",function() {
		 MyParentPage="#Demat";
        	self.commonData();
        	$(".h_title").html("ISIN Search ");
        	loadViewModel("rrdiq01");
        });
		this.get("#rrdiq02",function() {
        	self.commonData();
        	$(".h_title").html("ISIN Search ");
        	loadViewModel("rrdiq02");
        });
		this.get("#rrdcq01",function() {
		 MyParentPage="#Demat";
        	self.commonData();
        	$(".h_title").html("Settlement Calendar Master ");
        	loadViewModel("rrdcq01");
        });
		this.get("#rrdcq02",function() {
        	self.commonData();
        	$(".h_title").html("Settlement Calendar Master ");
        	loadViewModel("rrdcq02");
        });
		this.get("#rrdmq01",function() {
		 MyParentPage="#Demat";
        	self.commonData();
        	$(".h_title").html("Demat Status");
        	loadViewModel("rrdmq01");
        });
		this.get("#rrdmq02",function() {
        	self.commonData();
        	$(".h_title").html("Demat Status");
        	loadViewModel("rrdmq02");
        });
		
		
		//end demat
        this.get("#rraci01",function() {  
        	MyParentPage="#rracs01";
        	self.commonData();
        	$(".h_title").html("Account Information");
        	loadViewModel("rraci01");    
        	 
        });    
    
        this.get("#ccaccountSummary",function() { 
        MyParentPage="#rracs01";       	
        	self.commonData();
        	$(".h_title").html("Account Summary");
        	loadViewModel("ccaccountSummary");        	         
        });
        
        this.get("#rraci01",function() { 
        MyParentPage="#rracs01";       	
        	self.commonData();
        	$(".h_title").html("Account Information");
        	loadViewModel("rraci01");        	         
        });
        
        
        this.get("#rrcdc01",function() {   
        MyParentPage="#rracs01";     	
        	self.commonData();
        	$(".h_title").html("Deregister Card");
        	loadViewModel("rrcdc01");        	         
        });
		
	    this.get("#rscip01",function() {   
          MyParentPage="#rracs01";     	
        	self.commonData();
        	$(".h_title").html("Instant PIN Generation");
        	loadViewModel("rscip01");        	         
        });
		this.get("#rscip02",function() {   
          MyParentPage="#rracs01";     	
        	self.commonData();
        	$(".h_title").html("Instant PIN Generation");
        	loadViewModel("rscip02");        	         
        });
		this.get("#rscip03",function() {   
          MyParentPage="#rracs01";     	
        	self.commonData();
        	$(".h_title").html("Instant PIN Generation");
        	loadViewModel("rscip03");        	         
        });
        
        this.get("#rrunb01",function() {    
        MyParentPage="#rracs01";    	
        	self.commonData();
        	$(".h_title").html("View Unbilled Transactions");
        	loadViewModel("rrunb01");        	         
        });
        
        this.get("#rrpcr01",function() {    
        MyParentPage="#rracs01";    	
        	self.commonData();
        	$(".h_title").html("Credit Card ATM Pin");
        	loadViewModel("rrpcr01");        	         
        });
        
        this.get("#rrest01",function() {   
        MyParentPage="#rracs01";     	
        	self.commonData();
        	$(".h_title").html("Statement on Email");
        	loadViewModel("rrest01");        	         
        });
       
        this.get("#rrupd00",function() { 
        	MyParentPage="#rracs01";
        	self.commonData();
        	$(".h_title").html("Update Contact Details");
        	loadViewModel("rrupd00");        	         
        });
       
  this.get("#rrapr00",function() { 
        	MyParentPage="#rracs01";
        	self.commonData();
        	$(".h_title").html("Autopay Register");
        	loadViewModel("rrapr00");        	         
        });
  
  this.get("#rrapd01",function() { 
  	MyParentPage="#rracs01";
  	self.commonData();
  	$(".h_title").html("Autopay De-register");
  	loadViewModel("rrapd01");        	         
  });
     
  this.get("#rrccp01",function() { 
	  	MyParentPage="#rracs01";
	  	self.commonData();
	  	$(".h_title").html("Credit Card Payment");
	  	loadViewModel("rrccp01");        	         
	  });
	     
  this.get("#rrcac01",function() { 
	  	MyParentPage="#rracs01";
	  	self.commonData();
	  	$(".h_title").html("Register New Card");
	  	loadViewModel("rrcac01");        	         
	  });  
        
//End  Credit Card

//Debit Card

 this.get("#debithome",function() { 
	 MyParentPage="#debithome";
        	self.commonData();
        	$(".h_title").html("Debit Card");
        	$("#contentData").load("Views/Debit/debithome.html", null, function (response, status, xhr) {
                if (status != "error") {}
    				
             
                 ko.applyBindings(self, $(".content").get(0));                   
            });
        	loadViewModel("debithome");    
            debitcrdhome="";		
            //loadXMLDoc();
            if(cbannerForDC!=""){
        		$('#cpCnt').html(cbannerForDC);	
        	}
            else{
          	  loadXMLDoc();
            }
            if(cpBanner!='' && cpbannerclose6!='adcloseDC'){
	  	        var menu = $(".menu");
                 if (navigator.onLine && cpBanner!='' &&cbannerForDC!='') {
						  	$('.ad_banner').show();
	  		         	$('#cpCnt').html(cbannerForDC);			
			    } else {
					      $('.ad_banner').hide();
				}					
	  			
	  			var conveniancecount = $("div[id*='bannerHtml']").length;if(conveniancecount > 1){bannerHeight = $('#bannerHtml').height()+100;}else{bannerHeight = $('#bannerHtml').height()+100;}				
	  			menu.animate({top: bannerHeight + 'px'},2000);		
  	        }
 		   
   	   		//alert("main menu"+cpbannerclose);
   		    if( cpbannerclose6=="adcloseDC"){		 
   				$('.ad_banner').hide();
   				var menu = $(".menu");
   				menu.animate({top: '96px'},2000);
   		    }
        });

        

	/* starts mPassbook */
		this.get("#mPassbook",function() {	
			MyParentPage="#menu";
        	self.commonData();        	
        	loadViewModel("mPassbook");        	         
        });
		this.get("#mPassbookacntstatement",function() {			   	
        	self.commonData();        	
        	loadViewModel("mPassbookacntstatement");        	         
        });
		this.get("#mPassbookFDsum",function() {			   	
        	self.commonData();        	
        	loadViewModel("mPassbookFDsum");        	         
        });
		this.get("#limitbalance",function() {			   	
        	self.commonData();        	
        	loadViewModel("limitbalance");        	         
        });
		this.get("#linkedacnt",function() {			   	
        	self.commonData();        	
        	loadViewModel("linkedacnt");        	         
        });
		this.get("#RDenquiry",function() {		   	
        	self.commonData();        	
        	loadViewModel("RDenquiry");        	         
        });
		this.get("#mPB_register",function() {
			MyParentPage="#backregister";
        	self.commonData();        	
        	loadViewModel("mPB_register");        	         
        });
		this.get("#mPassbook01",function() {
			if((localStorage.getItem("cnpn") != null && localStorage.getItem("cnpn") != '') || (localStorage.getItem("cnpnpatt") != null && localStorage.getItem("cnpnpatt") != ''))
			{
				MyParentPage="#menu";
			}
			else{
				MyParentPage="#mPassbook";
			}
        	self.commonData();        	
        	loadViewModel("mPassbook01");        	         
        });
		this.get("#interactive",function() {
			MyParentPage="#financialSummary";
        	self.commonData();        	
        	loadViewModel("interactive");        	         
        });
		this.get("#overlay1",function() {
			MyParentPage="#interactiveStatement";
        	self.commonData();        	
        	loadViewModel("overlay1");        	         
        });
		this.get("#overlay2",function() {
			MyParentPage="#overlay1";
        	self.commonData();        	
        	loadViewModel("overlay2");        	         
        });
		this.get("#overlay3",function() {
			MyParentPage="#overlay2";
        	self.commonData();        	
        	loadViewModel("overlay3");        	         
        });
		this.get("#financialSummary",function() {
			MyParentPage="#mPB_login";
        	self.commonData();        	
        	loadViewModel("financialSummary");        	         
        });
		this.get("#requestStatement",function() {
			MyParentPage="#financialSummary";
        	self.commonData();        	
        	loadViewModel("requestStatement");        	         
        });
		this.get("#requestStatement1",function() {
			MyParentPage="#financialSummary";
        	self.commonData();        	
        	loadViewModel("requestStatement1");        	         
        });
		this.get("#requestStatement2",function() {
			MyParentPage="#financialSummary";
        	self.commonData();        	
        	loadViewModel("requestStatement2");        	         
        });
		this.get("#mPB_login",function() {	
			MyParentPage="#mPassbook01";
        	self.commonData();        	
        	loadViewModel("mPB_login");        	         
        });
		this.get("#mPB_login_error",function() {
			MyParentPage="#mPassbook";			
        	self.commonData();        	
        	loadViewModel("mPB_login_error");        	         
        });
		this.get("#interactiveStatement",function() {
			MyParentPage="#financialSummary";
        	self.commonData();        	
        	loadViewModel("interactiveStatement");        	         
        });
		this.get("#mPB_passbook",function() {
			//MyParentPage="#financialSummary";
        	self.commonData();        	
        	loadViewModel("mPB_passbook");        	         
        });
		this.get("#contactUs",function() {
			MyParentPage="#mPassbook";	
        	self.commonData();        	
        	loadViewModel("contactUs");        	         
        });
		this.get("#interactivetemp",function() {
			MyParentPage="#financialSummary";
        	self.commonData();        	
        	loadViewModel("interactivetemp");        	         
        });
		this.get("#Categories",function() {	
			MyParentPage="#financialSummary";
        	self.commonData();        	
        	loadViewModel("Categories");        	         
        });
		this.get("#mPB_passbookGraph",function() {
			MyParentPage="#financialSummary";
        	self.commonData();        	
        	loadViewModel("mPB_passbookGraph");        	         
        });
		this.get("#mPB_settings",function() {
			MyParentPage="#financialSummary";
        	self.commonData();        	
        	loadViewModel("mPB_settings");        	         
        });
		this.get("#pasbooklogout",function() {			   	
        	self.commonData();        	
        	loadViewModel("pasbooklogout");        	         
        });
		this.get("#temppage1",function() {			   	
        	self.commonData();
			MyParentPage="#financialSummary";       	         
        });
		this.get("#mPB_FD_Summary",function() {			   	
        	self.commonData();
			MyParentPage="#financialSummary";       	         
        });
		this.get("#mPB_RD_Summary",function() {			   	
        	self.commonData();
			MyParentPage="#financialSummary";       	         
        });
		this.get("#financialSummaryTemp",function() {			   	
        	self.commonData();
			MyParentPage="#financialSummary";       	         
        });
		this.get("#financialSummaryTemp1",function() {			   	
        	self.commonData();
			MyParentPage="#financialSummary";       	         
        });
		this.get("#RDstatement",function(){
            //MyParentPage="#financialSummary";   		
        	self.commonData();
			//loadViewModel("RDstatement");  
        });
		this.get("#FAQ",function(){			   	
        	self.commonData();
			MyParentPage="#financialSummary";
			loadViewModel("FAQ");  
        });
		/* ends mPassbook */

//Debit End
        
        this.get("#accountSummary",function() {  
        MyParentPage="#rrasm01";      	
        	self.commonData();
        	$(".h_title").html("Account Summary");
        	loadViewModel("accountSummary");        	         
        });
        this.get("#fdSummary",function() { 
        MyParentPage="#rrasm01";
        	self.commonData();
            $(".h_title").html("Fixed Deposits Summary");
            loadViewModel("rrloa01");
        	
        });
        
        this.get("#rdSummary",function() { 
        	MyParentPage="#rrasm01";
        	self.commonData();
            $(".h_title").html("Recurring Deposits Summary");
            loadViewModel("rrrds01");
         });
        
        
        this.get("#rrsin01",function() {   
		if(window.navigator.onLine){
					 MyParentPage="#rrasm01";       	
					self.commonData();
					$(".h_title").html("View Account Statement");
					loadViewModel("rrsin01");   
				}
				else{
				navigator.notification.alert("Please check your Network connection in setting");
				}		
                
        });
        
        this.get("#rrsin02",function() {
        	self.commonData();
        	$(".h_title").html("View Account Statement");
            loadViewModel("rrsin02");            
        });
        
        this.get("#accountStatment",function() {
        		MyParentPage="#rrasm01";
        	self.commonData();
        	$(".h_title").html("View Account Statement");
        	loadViewModel("accountStatment");
        	 
        });	
        
        this.get("#rrasr02",function() { 
        		MyParentPage="#rrasm01";
        	self.commonData();
            $(".h_title").html("Request Account Statement");
            loadViewModel("rrasr02");
        });
        
        this.get("#rrasr03",function() {  
        	
        	self.commonData();
            $(".h_title").html("Request Account Statement");
            loadViewModel("rrasr03");
         });
        
        this.get("#rrasr04",function() { 
        	
        	self.commonData();
            $(".h_title").html("Request Account Statement");
            loadViewModel("rrasr04");
            
        });
        
        this.get("#rrcbr02",function() {    
        			MyParentPage="#rrasm01";
        	self.commonData();
            $(".h_title").html("Request Cheque Book");
            loadViewModel("rrcbr02");
            
        });
        
        this.get("#rrcbr03",function() {    
        	
        	self.commonData();
            $(".h_title").html("Request Cheque Book");
            loadViewModel("rrcbr03");
            
        });
        
        this.get("#rrcbr04",function() {     
        	self.commonData();
            $(".h_title").html("Request Cheque Book");
            loadViewModel("rrcbr04");
            
        });
        
        // stop payment of cheque
        this.get("#rrsch01",function() {   
        			MyParentPage="#rrasm01";
        	self.commonData();
            $(".h_title").html("Stop Payment of Cheque");
            loadViewModel("rrsch01");
            
            
        });

        this.get("#rrsch02",function() {        
        	self.commonData();
            $(".h_title").html("Stop Payment of Cheque");
            loadViewModel("rrsch02");
            
        });
        
        this.get("#rrsch03",function() {        	
        	
        	self.commonData();
            $(".h_title").html("Stop Payment of Cheque");
            loadViewModel("rrsch03");
        	
        });
        
     // view cheque status
        this.get("#rrcsi01",function() {    
        	MyParentPage="#rrasm01";
        	self.commonData();
            $(".h_title").html("View Cheque Status");
            loadViewModel("rrcsi01");
            
        });
        
        this.get("#rrcsi02",function() { 
        	
        	self.commonData();
            $(".h_title").html("View Cheque Status");
            loadViewModel("rrcsi02");
        	
        });
        this.get("#rrblp01",function() {
        	MyParentPage="#billpayment";
        	self.commonData();
        	$(".h_title").html("Bill Payment");
        	loadViewModel("rrblp01");
        });
        this.get("#rrblp02",function() {
        	self.commonData();
        	$(".h_title").html("Bill Payment");
        	loadViewModel("rrblp02");
        });
        this.get("#rrblp03",function() {
        	self.commonData();
        	$(".h_title").html("Bill Payment");
        	loadViewModel("rrblp03");
        });
        this.get("#rrblp04",function() {
        	self.commonData();
        	$(".h_title").html("Bill Payment");
        	loadViewModel("rrblp04");
        });
		
		/* biller add*/
		this.get("#rruab01",function() {
		MyParentPage="#billpayment";
        	self.commonData();
        	$(".h_title").html("Biller Addition");
        	loadViewModel("rruab01");
        });
		
		this.get("#rruab02",function() {
		MyParentPage="#billpayment";
        	self.commonData();
        	$(".h_title").html("Biller Addition");
        	loadViewModel("rruab02");
        });
		
		this.get("#rruab03",function() {
		MyParentPage="#billpayment";
        	self.commonData();
        	$(".h_title").html("Biller Addition");
        	loadViewModel("rruab03");
        });
		this.get("#rruab04",function() {
		MyParentPage="#billpayment";
        	self.commonData();
        	$(".h_title").html("Biller Addition");
        	loadViewModel("rruab04");
        });
		this.get("#rruvb01",function() {
		MyParentPage="#billpayment";
        	self.commonData();
        	$(".h_title").html("View/Delete Biller");
        	loadViewModel("rruvb01");
        });
		this.get("#rruvb02",function() {
		MyParentPage="#billpayment";
        	self.commonData();
        	$(".h_title").html("View/Delete Biller");
        	loadViewModel("rruvb02");
        });
		this.get("#rruvb03",function() {
		MyParentPage="#billpayment";
        	self.commonData();
        	$(".h_title").html("Delete Prepaid Recharge Biller");
        	loadViewModel("rruvb03");
        });
		this.get("#rruvb04",function() {
		MyParentPage="#billpayment";
        	self.commonData();
        	$(".h_title").html("Delete Biller");
        	loadViewModel("rruvb04");
        });
		this.get("#rruvb05",function() {
		MyParentPage="#billpayment";
        	self.commonData();
        	$(".h_title").html("Delete Biller");
        	loadViewModel("rruvb05");
        });
		this.get("#rruvb05",function() {
		  MyParentPage="#billpayment";
        	self.commonData();
        	$(".h_title").html("Delete Biller");
        	loadViewModel("rruvb05");
        });
		this.get("#rruph01",function() {
		  MyParentPage="#billpayment";
        	self.commonData();
        	$(".h_title").html("Bill Payment History");
        	loadViewModel("rruph01");
        });
		this.get("#rruph02",function() {
		MyParentPage="#billpayment";
        	self.commonData();
        	$(".h_title").html("Bill Payment History");
        	loadViewModel("rruph03");
        });
		this.get("#rruvp01",function() {
		     MyParentPage="#billpayment";
        	self.commonData();
        	$(".h_title").html("View/Pay Bills");
        	loadViewModel("rruvp01");
        });
		this.get("#rruvp02",function() {
		    MyParentPage="#billpayment";
        	self.commonData();
        	$(".h_title").html("View/Pay Bills");
        	loadViewModel("rruvp02");
        });
		this.get("#rruvp03",function() {
		   MyParentPage="#billpayment";
        	self.commonData();
        	$(".h_title").html("View/Pay Bills");
        	loadViewModel("rruvp02");
        });
		this.get("#rruvp04",function() {
		   MyParentPage="#billpayment";
        	self.commonData();
        	$(".h_title").html("View/Pay Bills");
        	loadViewModel("rruvp04");
        });
		this.get("#rruap01",function(){	
		 MyParentPage="#billpayment";
        	self.commonData();
        	$(".h_title").html("Ad-Hoc Payment");
        	loadViewModel("rruap01");
        });
		this.get("#rruap02",function() {
		MyParentPage="#billpayment";
        	self.commonData();
        	$(".h_title").html("Ad-Hoc Payment");
        	loadViewModel("rruap02");
        });
		this.get("#rruap03",function() {
		 MyParentPage="#billpayment";
        	self.commonData();
        	$(".h_title").html("Ad-Hoc Payment");
        	loadViewModel("rruap03");
        });
		this.get("#rruap04",function() {
		 MyParentPage="#billpayment";
        	self.commonData();
        	$(".h_title").html("Ad-Hoc Payment");
        	loadViewModel("rruap04");
        });
		this.get("#rruap05",function() {
		 MyParentPage="#billpayment";
        	self.commonData();
        	$(".h_title").html("Ad-Hoc Payment");
        	loadViewModel("rruap05");
        });
		
		this.get("#addbill",function() {
		 MyParentPage="#billpayment";
        	self.commonData();
        	$(".h_title").html("Biller Addition");
        	loadViewModel("addbill");
        });
		
		this.get("#addbill2",function() {
		 MyParentPage="#billpayment";
        	self.commonData();
        	$(".h_title").html("Biller Addition");
        	loadViewModel("addbill2");
        });
		
		
	    this.get("#addbill3",function() {
		 MyParentPage="#billpayment";
        	self.commonData();
        	$(".h_title").html("Biller Addition");
        	loadViewModel("addbill3");
        });
		
		/*biller add end*/
		
        /* Start - Account section */
        
        this.get("#rrftr01",function() {  
        	$(".h_title").html("Third Party Transfer");
        	MyParentPage="#rrftr01";
           $('.menutt').attr('id', "rrftr01");
        	self.commonData();
        	//busyInd.show();        	
		    $("#contentData").load("Views/Accounts/rrftr01.html", null, function (response, status, xhr) {
                if (status != "error") {}	 
               
                	busyInd.hide();
                    ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
            });    
              fundtransfermsg="";	
             // loadXMLDoc();
             // alert("banner"+cbannerForFund);
              if(cbannerForFund!=""){
          		$('#cpCnt').html(cbannerForFund);	
             }
              else{
            	  loadXMLDoc();
              }
             
              
              if(cpBanner!='' && cpbannerclose2!='adcloseFund'){
         	        var menu = $(".menu");					
         				
					if (navigator.onLine && cpBanner!='' && cbannerForFund!='') {
						 $('.ad_banner').show();
         			     $('#cpCnt').html(cbannerForFund);       				
					} else {
						$('.ad_banner').hide();
					}
         			var conveniancecount = $("div[id*='bannerHtml']").length;if(conveniancecount > 1){bannerHeight = $('#bannerHtml').height()+100;}else{bannerHeight = $('#bannerHtml').height()+100;}				
         			menu.animate({top: bannerHeight + 'px'},2000);		
         	       }
        		
      	   		
      		     if( cpbannerclose2=="adcloseFund"){	
      		    	//alert("main menu"+cpbannerclose2);
      				$('.ad_banner').hide();
      				var menu = $(".menu");
      				menu.animate({top: '96px'},2000);
      			 }  
        });

        	//Debit Card 
        
        
	        this.get("#rrdcl01",function() { 
	        MyParentPage="#debithome"; 
	        	$(".h_title").html("Debit Card Hotlisting");
	        	self.commonData();
	        	 	
			
	        	
	        	loadViewModel("rrdcl01");
	        });
	        
	        this.get("#rrdce01",function() {  
	        MyParentPage="#debithome";
	        	$(".h_title").html("Debit Card Status");
	        	self.commonData();
	        	 	
		
	        	loadViewModel("rrdce01");
	        });
			   this.get("#rsdpi01",function() {  
	        MyParentPage="#debithome";
	        	$(".h_title").html("Instant Pin Generation");
	        	self.commonData();
		
	        	loadViewModel("rsdpi01");
	        });
        this.get("#rrftr02",function() {  
        	$(".h_title").html("Funds Transfer");
        	self.commonData();
        	loadViewModel("rrftr02");
        });
        
        this.get("#rrftr03",function() {        	
        	self.commonData();
        	$(".h_title").html("Funds Transfer");
        	loadViewModel("rrftr03");            
        });
        
        this.get("#rrftr04",function() {        	
        	self.commonData();
        	$(".h_title").html("Funds Transfer");
        	accstmtdata = accStmtData(); 
		    $("#contentData").load("Views/Accounts/rrftr04.html", null, function (response, status, xhr) {
                if (status != "error") {}              
                ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
            });
            
        });
        
        //emr 
        this.get("#rremr03",function() {  
        			MyParentPage="#rrasm01";
        	self.commonData();
            $(".h_title").html("Email Statement Registration");
            loadViewModel("rremr03");
            
        });
        
        this.get("#rremr04",function() {  
        	
        	self.commonData();
            $(".h_title").html("Email Statement Registration");
            loadViewModel("rremr04");
        });
        
        this.get("#rremr05",function() {  
        	
        	self.commonData();
            $(".h_title").html("Email Statement Registration");
            loadViewModel("rremr05");
         });
        
        //emd
        this.get("#rremd01",function() {
        			MyParentPage="#rrasm01";
        	self.commonData();
            $(".h_title").html("Email Statement Deregistration");
            loadViewModel("rremd01");
         });
        
        this.get("#rremd02",function() {  
        	
        	self.commonData();
            $(".h_title").html("Email Statement Deregistration");
            loadViewModel("rremd02");
         });
        
        this.get("#rremd03",function() {   
        	self.commonData();
            $(".h_title").html("Email Statement Deregistration");
            loadViewModel("rremd03");
        });
        
     // rrfss
        this.get("#rrfss01",function() {  
        		MyParentPage="#rrasm01";
        	self.commonData();
            $(".h_title").html("Fixed Deposit Sweep-in");
            loadViewModel("rrfss01");
         });
        
        this.get("#rrfss02",function() {  
        	self.commonData();
            $(".h_title").html("Fixed Deposit Sweep-in");
            loadViewModel("rrfss02");
        });
        
        this.get("#rrfss03",function() { 
        	self.commonData();
            $(".h_title").html("Fixed Deposit Sweep-in");
            loadViewModel("rrfss03");
        });
        
        // rrcss
        this.get("#rrcss01",function() {
        		MyParentPage="#rrasm01";  
        	self.commonData();
            $(".h_title").html("CASA Sweep-in");
            loadViewModel("rrcss01");
        });
        
        this.get("#rrcss02",function() {    
        	
        	self.commonData();
            $(".h_title").html("CASA Sweep-in");
            loadViewModel("rrcss02");
          });
        
        this.get("#rrcss03",function() {   
        	self.commonData();
            $(".h_title").html("CASA Sweep-in");
            loadViewModel("rrcss03");
        });
        
        // rrsus
        this.get("#rrsus01",function() { 
        		MyParentPage="#rrasm01";
        	self.commonData();
            $(".h_title").html("Super Saver");
            loadViewModel("rrsus01");
        });
        
        this.get("#rrsus02",function() {
        	self.commonData();
            $(".h_title").html("Super Saver");
            loadViewModel("rrsus02");
        	
        	/*
            */
        });
        
        this.get("#rrsus03",function() { 
        	self.commonData();
            $(".h_title").html("Super Saver");
            loadViewModel("rrsus03");
        	
        	/*   */       
        });
        
        // rrtxi
        this.get("#rrtxi01",function() {  
        MyParentPage="#rrasm01";
        	$(".h_title").html("TDS Inquiry");
        	self.commonData();
        	   	
        	loadViewModel("rrtxi01");            
        });
        
        this.get("#rrtxi02",function() {        	
        	self.commonData();
        	$(".h_title").html("TDS Inquiry");
        	loadViewModel("rrtxi02");         
        });
        
        // rrfdl
        this.get("#rrfdl01",function() {  
        		MyParentPage="#rrasm01";
        	$(".h_title").html("Liquidate Fixed Deposit");
        	self.commonData();
        	loadViewModel("rrfdl01");
        });
        
        this.get("#rrfdl02",function() {        	
        	self.commonData();
        	$(".h_title").html("Liquidate Fixed Deposit");
        	
        	loadViewModel("rrfdl02");
        });
        
        this.get("#rrfdl03",function() {        	
        	self.commonData();
        	$(".h_title").html("Liquidate Fixed Deposit");
        	loadViewModel("rrfdl03");       
        });
        this.get("#rrper01",function() {  
        	MyParentPage="#mymenu";      	
        	self.commonData();
            $(".h_title").html("Personalized Menu");
            loadViewModel("rrper01");
        });
		this.get("#rrper02",function() {        	
        	self.commonData();
            $(".h_title").html("Personalized Menu");
            loadViewModel("rrper02");
        });
        // rrhiq
        this.get("#rrhiq01",function() {  
        MyParentPage="#rrasm01"; 
        	self.commonData();
        	$(".h_title").html("Hold Enquiry");
        	loadViewModel("rrhiq01");
            
        });
        
        this.get("#rrhiq02",function() {        	
        	//self.commonData();
        	//$(".h_title").html("Hold Enquiry");
        	//loadViewModel("rrhiq02");
            
        });
        
        // Open RD
        this.get("#rrrdo01",function() {  
        		MyParentPage="#rrasm01";
        	$(".h_title").html("Open Recurring Deposit");
        	self.commonData();
        	loadViewModel("rrrdo01");
        });
        
        this.get("#rrrdo02",function() {  
        	$(".h_title").html("Open Recurring Deposit");
        	self.commonData();
        	loadViewModel("rrrdo02");
        });
        
        this.get("#rrrdo03",function() {  
        	$(".h_title").html("Open Recurring Deposit");
        	self.commonData();
        	loadViewModel("rrrdo03");
        });
        //CHnage for TPD
		this.get("#rrtpi01",function() {  
		MyParentPage="#rrftr01";
        	$(".h_title").html("View List of Beneficiaries");
        	self.commonData();
        	loadViewModel("rrtpi01");
        });	
		this.get("#rrtpn04",function() {  
		MyParentPage="#rrftr01";
        	$(".h_title").html("NEFT Funds Transfer");
        	self.commonData();
        	loadViewModel("rrtpn04");
        });
		this.get("#rrtpn05",function() {  
        	$(".h_title").html("NEFT Funds Transfer");
        	self.commonData();
        	loadViewModel("rrtpn05");
        });
		this.get("#rrmpe01",function() { 
		MyParentPage="#rrftr01";       	
        	self.commonData();
            $(".h_title").html("Special Payments");
            loadViewModel("rrmpe01");
        });
		this.get("#rrmpe02",function() {        	
        	self.commonData();
            $(".h_title").html("Special Payments");
            loadViewModel("rrmpe02");
        });
		this.get("#rrmpe03",function() {        	
        	self.commonData();
            $(".h_title").html("Special Payments");
            loadViewModel("rrmpe03");
        });
		this.get("#rrmpe04",function() {        	
        	self.commonData();
            $(".h_title").html("Special Payments");
            loadViewModel("rrmpe04");
        });
		//End of TPD
        // cancel MMID
        this.get("#rrmmc01",function() {  
        MyParentPage="#rrftr01"; 
        	self.commonData();
        	$(".h_title").html("Cancel MMID");
        	loadViewModel("rrmmc01");            
        });
        this.get("#rrmmc02",function() {
        	MyParentPage="#rrftr01";
        	self.commonData();
        	$(".h_title").html("Cancel MMID");
        	loadViewModel("rrmmc02");            
        });
        this.get("#rrmmc03",function() {
        	MyParentPage="#rrftr01";
        	self.commonData();
        	$(".h_title").html("Cancel MMID");
        	loadViewModel("rrmmc03");            
        });
        
        this.get("#rrfdr01",function() {   
        MyParentPage="#rrasm01";
        	self.commonData();
        	$(".h_title").html("Open Fixed Deposit < 5 Cr");
        	loadViewModel("rrfdr01");            
        });
        
        
        
        
        /* Start - TPT section */
        this.get("#rrtpt03",function() {
        MyParentPage="#rrftr01";  
        	$(".h_title").html("Third Party Transfer");
        	self.commonData();
        	loadViewModel("rrtpt03");        	         
        });
        
        this.get("#rrtpt04",function() {        	
        	self.commonData();
        	$(".h_title").html("Third Party Transfer");
        	loadViewModel("rrtpt04");
        });
		//adhaar card
		
		
		 this.get("#rrvua01",function(){  
              MyParentPage="#rrasm01";		 
        	self.commonData();
        	$(".h_title").html("View/Update Aadhaar Card");
        	loadViewModel("rrvua01");
        });
		
		this.get("#rrvua02",function(){  
           MyParentPage="#rrasm01";      	
        	self.commonData();
        	$(".h_title").html("View/Update Aadhaar Card");
        	loadViewModel("rrvua02");
        });
		
		this.get("#rrvua03",function(){
           MyParentPage="#rrasm01";		
        	self.commonData();
        	$(".h_title").html("View/Update Aadhaar Card");
        	loadViewModel("rrvua03");
        });
		this.get("#rrvua04",function(){  
           MyParentPage="#rrasm01";      	
        	self.commonData();
        	$(".h_title").html("View/Update Aadhaar Card");
        	loadViewModel("rrvua04");
        });
        
        this.get("#rsaValidation/:id",function() {        	
        	self.commonData();
        	//$(".h_title").html("Third Party Transfer");
        	rsastmtdata = self.rsaStmtData();
        	//rsastmtdata = {"response":{"fldrsatxnerrdesc":"","useragent":"","fldrsaqaauthavailable":"Y","rsaquestionlist":{"rsaquestion":[{"questiontext":"What is the date of your spouse's birthday? (E.g. 12,23 etc)","questionid":"48"},{"questiontext":"On which floor is your office? (E.g. 422031, 445085 etc)","questionid":"73"}]},"fldrsaotpavailable":"Y","customerinfo":{"custid":"50000010","mobile":"XXXXXXX27212"},"fldDataId":"WVENCPOFMCYXIYNYXEVDLCVLGKGXL","field":[{"name":"fldRsaTxnId","value":""},{"name":"fldAppServerId","value":"ZZ"},{"name":"fldExtSessionId","value":"225517077AWF"},{"name":"fldDateTime","value":""},{"name":"fldCurr","value":"INR"},{"name":"fldCurr","value":"INR"},{"name":"fldLangId","value":"and"},{"name":"fldBenefType","value":"TPT"},{"name":"fldMultiAcctsDtls","value":"50100000082027~~01601050115924~~test abc~~100"},{"name":"fldAccountMapFlag","value":"N"},{"name":"fldWebServerId","value":"YG"},{"name":"fldAcctBal","value":"-10259419906057.99"},{"name":"fldAcctBal","value":"-10259419906057.99"},{"name":"fldDeviceId","value":"43"},{"name":"fldFromBrn","value":"TALWAN,"},{"name":"fldLoginUserGroupType","value":"N"},{"name":"fldIdChannel","value":"1"},{"name":"fldFromAcctNo","value":"50100000082027  "},{"name":"fldTxnLimitFlag","value":"N"},{"name":"fldRemoteAddress","value":"123.236.29.50"},{"name":"fldLoginUserGroupBaseType","value":"E"},{"name":"fldModule","value":"CH"},{"name":"fldUserRefNo","value":""},{"name":"fldAcctCurr","value":"INR"},{"name":"fldProxyUserFlag","value":"N"},{"name":"fldOrgTxnId","value":"TPT"},{"name":"fldClientSessionId","value":""},{"name":"fldFcatSessionId","value":""}],"fldrsaoobphoneavailable":"N","fldrsatxnstatus":"200","phoneid":"","locationid":"","fldrsatxnerrcode":"","fldrsaauthtxnid":"ehdfc.ehdfc.872014010609245919449212517650","mci":{"remoteaddress":"123.236.29.50","langid":"eng","txnid":"TPT","webserverid":"W5","scrnseqnbr":"03","appid":"RS","appserverid":"ZZ","sessionid":"1461967760GKDFPDPH","requestid":"1461967760GKDFPDPH125452296YJ","deviceid":"43"},"fldrsaauthretry":"0","sessioninfo":{"iduser":"50000010","sessionkey":"","idsession":"WVENCPOFMCYXIYNYXE","usertype":"ENU","datlastaccess":"06-01-2014 12:50:06","datcreation":"06-01-2014 12:49:46","identity":"B001","idproxy":"","refidentity":"B001","idlang":"and","remoteaddr":"172.21.1.46","iddevice":"43","idchanneluser":"50000010"},"css":{"perscss":"imperia","langcss":"RS_eng.css"},"fldrsaauthaction":"QUESTION"},"request":{"fldOrgTxnId":"TPT","fldjsessionid":"6zhqSKZGpRhJZ9R5Lj9jHpdj68kGNRn2Hdk5rQcnWXy9tQgVyjrw!1924740624!1388992868911","fldAppId":"RS","fldRsaTxnId":"","fldFromAcctNo":"50100000082027","fldFcatSessionId":"","fldFCDBSessionId":"1461967760GKDFPDPH","timeZone":"","fldLoginUserId":"50000010","fldCurr":"INR","fldBenefType":"TPT","fldFromBrn":"TALWAN,","fldMultiAcctsDtls":"50100000082027~~01601050115924~~test abc~~100","datetime":"06-01-2014 12:50:10","fldRequestId":"RRTPT05","fldDeviceId":"43","fldSessionId":"WVENCPOFMCYXIYNYXE","fldUserRefNo":"","fldLangId":"and","fldDateTime":"","fldEntityId":"B001","fldClientSessionId":"","fldScrnSeqNbr":"03","fldFCDBRequestId":"1461967760GKDFPDPH125447421SL","fldAcctCurr":"INR","fldTxnId":"TPT","fldAcctBal":"-10259419906057.99"},"header":""};
        	
        	if(rsastmtdata.response.fldRsaAuthAction){
	        	fldrsaauthaction = rsastmtdata.response.fldRsaAuthAction;
	        	
	        	fldrsaauthretry = rsastmtdata.response.fldRsaAuthRetry;
            	if(typeof(rsastmtdata.response.fldRsaAuthRetry)=='object'){
            		fldrsaauthretry = rsastmtdata.response.fldRsaAuthRetry[0];            		
            	};
            	
	        	
	        	//alert("response action >>"+fldrsaauthaction);
				if(fldrsaauthaction == 'QUESTION'){
					
					rsaquestionlist = rsastmtdata.response.rsaquestionlist.rsaquestion;
					
					self.quesList.removeAll();
		    		var qidx = 1;
		    		$(rsaquestionlist).each(function(index, obj) {
		    			anstxtBoxname = "fldAnswer"+qidx;
		    			quesIdtxtBoxname = "fldQuestionId"+qidx;
		    			questxtBoxname = "fldQuestionText"+qidx;
		    			
		    			self.quesList.push({ qidx: qidx, anstxtBoxname: anstxtBoxname, question: obj.questiontext, questionid: obj.questionid, quesIdtxtBoxname: quesIdtxtBoxname, questxtBoxname: questxtBoxname });
		    			qidx++;
		    			
		    		});
					
				}
				else if(fldrsaauthaction == 'OTP_EMAIL'){
					//fldoobphonestatus = rsastmtdata.response.fldoobphonestatus;
					fldrsaqaauthavailable = rsastmtdata.response.fldRsaQAAuthAvailable;
					customerMobile = rsastmtdata.response.customerinfo.mobile;			
					
				}
				else if(fldrsaauthaction == 'OTPRELAY'){
					testotpvalue = rsastmtdata.response.OTPTestValue;
					//alert(testotpvalue);
				}
				else if(fldrsaauthaction == 'OOBPHONE'){
					
					fldrsaqaauthavailable = rsastmtdata.response.fldRsaQAAuthAvailable;
					
					var oobCountryList	= new Array ();
					var oobAreaList		= new Array ();
					var oobPhoneList	= new Array ();
					var oobLabelList	= new Array ();
					var oobExtnList		= new Array ();
					var oob_count		= 0;
					if(rsastmtdata.response.rsaphonelist){
					
					if(rsastmtdata.response.rsaphonelist.length > 0){
						rsaphonelist = rsastmtdata.response.rsaphonelist[0].rsaphone;
						self.oobPhoneList.removeAll();
						$(rsaphonelist).each(function(phind, phobj) {
							oobLabel = phobj.label;
							oobExtn = phobj.phoneextn;
							
							oobval = $.trim(phobj.countrycode)+"#"+phobj.areacode+"#"+phobj.phonenumber+"#"+phobj.phoneextn+"#"+phobj.label;
							
							if (oobLabel.toLowerCase().indexOf("mobile") >= 0){
								oobtxt = $.trim(phobj.countrycode)+" - "+phobj.areacode+phobj.phonenumber;
								self.oobPhoneList.push({ mobiletxt: oobtxt, mobileValue: oobval });
							}
							else if(oobExtn.toLowerCase().indexOf("-") >= 0){
								oobtxt = $.trim(phobj.countrycode)+" - "+phobj.areacode+" - "+phobj.phonenumber;
								self.oobPhoneList.push({ mobiletxt: oobtxt, mobileValue: oobval });
							}else{
								oobtxt = $.trim(phobj.countrycode)+" - "+phobj.areacode+" - "+phobj.phonenumber+" - "+phobj.phoneextn;
								self.oobPhoneList.push({ mobiletxt: oobtxt, mobileValue: oobval });
							}
							
							oobCountryList[oob_count] = $.trim(phobj.countrycode);
							oobAreaList[oob_count]	  = phobj.areacode;
							oobPhoneList[oob_count]   = phobj.phonenumber;
							oobExtnList[oob_count]    = phobj.phoneextn;
							oobLabelList[oob_count]   = phobj.label;
							oob_count++;
							
						});
					}else{
					rsaphonelist = rsastmtdata.response.rsaphonelist.rsaphone;
					self.oobPhoneList.removeAll();
					$(rsaphonelist).each(function(phind, phobj) {
						oobLabel = phobj.label;
						oobExtn = phobj.phoneextn;
						
						oobval = $.trim(phobj.countrycode)+"#"+phobj.areacode+"#"+phobj.phonenumber+"#"+phobj.phoneextn+"#"+phobj.label;
						
						if (oobLabel.toLowerCase().indexOf("mobile") >= 0){
							oobtxt = $.trim(phobj.countrycode)+" - "+phobj.areacode+phobj.phonenumber;
							self.oobPhoneList.push({ mobiletxt: oobtxt, mobileValue: oobval });
						}
						else if(oobExtn.toLowerCase().indexOf("-") >= 0){
							oobtxt = $.trim(phobj.countrycode)+" - "+phobj.areacode+" - "+phobj.phonenumber;
							self.oobPhoneList.push({ mobiletxt: oobtxt, mobileValue: oobval });
						}else{
							oobtxt = $.trim(phobj.countrycode)+" - "+phobj.areacode+" - "+phobj.phonenumber+" - "+phobj.phoneextn;
							self.oobPhoneList.push({ mobiletxt: oobtxt, mobileValue: oobval });
						}
						
						oobCountryList[oob_count] = $.trim(phobj.countrycode);
						oobAreaList[oob_count]	  = phobj.areacode;
						oobPhoneList[oob_count]   = phobj.phonenumber;
						oobExtnList[oob_count]    = phobj.phoneextn;
						oobLabelList[oob_count]   = phobj.label;
						oob_count++;
						
					});
					
					}
					}
					
					/*alert("ff1");
					$("#fldOOBPhoneCountryList").val(oobCountryList);
					alert("ff2");
					$("#fldOOBPhoneAreaList").val(oobAreaList);
					$("#fldOOBPhoneNumberList").val(oobPhoneList);
					$("#fldOOBPhoneExtnList").val(oobExtnList);
					$("#fldOOBPhoneLabelList").val(oobLabelList);*/
				}
				
				// rsa fields
				rsafieldList = rsastmtdata.response.field;
				self.rsaFields.removeAll();    		
	    		$(rsafieldList).each(function(index, obj) {
	    			
	    			if(obj.name != 'fldRequestId' && obj.name != 'fldSessionId' && obj.name != 'fldMobile' && obj.name != 'fldRsaOTPAvailable' && obj.name != 'fldMsgSentMode' && obj.name != 'fldRsaSessionId' && obj.name != 'fldOtpToken'){
	    				self.rsaFields.push({ name: obj.name, value: obj.value });
	    			}
	    		});
	    		
	    		fldFCDBRequestId = rsastmtdata.response.mci.requestid;
	    		
	    		txnid = rsastmtdata.response.mci.txnid;
				var BeneType='';
				if(txnid=="TPA"){
	    		BeneType= rsastmtdata.request.fldBeneType;
				}
	    		if(txnid == 'TPN') { fldRequestId = "RRTPN07"; fldScrnSeqNbr="03"; }
	    		if(txnid == 'TPT') { fldRequestId = "RRTPT06"; fldScrnSeqNbr="03"; }
	    		if(txnid == 'TPR') { fldRequestId = "RRTPR07"; fldScrnSeqNbr="03"; }
	    		if(txnid == 'CCP') { fldRequestId = "RRCCP05"; fldScrnSeqNbr="05"; }
	    		if(txnid == 'VMT') { fldRequestId = "RRVMT04"; fldScrnSeqNbr="03"; }
	    		if(txnid == 'CPQ') { fldRequestId = "RRCPQ05"; fldScrnSeqNbr="04"; }
	    		if(txnid == 'P2A') { fldRequestId = "RRP2A03"; fldScrnSeqNbr="03"; }
	    		if(txnid == 'IFT') { fldRequestId = "RRIFT04"; fldScrnSeqNbr="03"; }
	    		if(txnid == 'RFX') { fldRequestId = "RRRFX04"; fldScrnSeqNbr="04"; }
			if(txnid == 'PFC') { fldRequestId = "RRPFC04"; fldScrnSeqNbr="04"; }
if(txnid=="TPA"){
				if(BeneType=="TPT"){
				if(txnid == 'TPA') { fldRequestId = "RRTPA02"; fldScrnSeqNbr="02"; }
				}
				else if(BeneType=="NEFT"){
				 if(txnid == 'TPA') { fldRequestId = "RRTPA07"; fldScrnSeqNbr="07"; }
				}}
			     if(txnid == 'CIP') { fldRequestId = "RRCIP03"; fldScrnSeqNbr="03"; }
				 if(txnid == 'DPI') { fldRequestId = "RRDPI03"; fldScrnSeqNbr="03"; }
		
	    		fldRsaOTPAvailable = rsastmtdata.response.fldRsaOTPAvailable;
	    		fldRsaSessionId = rsastmtdata.response.fldRsaSessionId;
	    		fldRsaAuthAction = rsastmtdata.response.fldRsaAuthAction;
	    		
	    		fldOOBPhoneToken = rsastmtdata.response.fldoobphonetoken;
	    		fldRsaQAAuthAvailable = rsastmtdata.response.fldRsaQAAuthAvailable;
	    		fldRsaOOBPhoneAvailable = rsastmtdata.response.fldRsaOOBPhoneAvailable;
	    		fldOOBPhoneCountry = rsastmtdata.response.fldoobphonecountry;
	    		fldOOBPhoneArea = rsastmtdata.response.fldoobphonearea;
	    		fldOOBPhoneNumber = rsastmtdata.response.fldoobphonenumber;
	    		fldOOBPhoneExtn = rsastmtdata.response.fldoobphoneextn;
	    		fldOOBPhoneLabel = rsastmtdata.response.fldOOBPhoneLabel;
	    		fldRsaAuthTxnId = rsastmtdata.response.fldRsaAuthTxnId;
	    		fldRsaAuthRetry = rsastmtdata.response.fldRsaAuthRetry;
	    		
	    		tempCountry = ""; tempAreaCode = ""; tempPhoneNo=""; tempPhoneExtn=""; 	tempPhoneLabel="";
	    		
	    		if(rsastmtdata.response.rsaphonelist){
	    		rsaphoneList = rsastmtdata.response.rsaphonelist.rsaphone;
	    		cntph = 0;
				$(rsaphoneList).each(function(index, obj) {
					if(cntph > 0){
						tempCountry += ","+obj.countrycode;
						tempAreaCode += ","+obj.areacode;
						tempPhoneNo += ","+obj.phonenumber;
						tempPhoneExtn += ","+obj.phoneextn;
						tempPhoneLabel += ","+obj.label;
					}else{
						tempCountry += obj.countrycode;
						tempAreaCode += obj.areacode;
						tempPhoneNo += obj.phonenumber;
						tempPhoneExtn += obj.phoneextn;
						tempPhoneLabel += obj.label;
					}
					cntph++;
				});
				
	    		}
	    		
				fldUserRefNo = rsastmtdata.response.flduserrefno;
				fldDateTime = rsastmtdata.response.flddatetime;
				fldOrgTxnId = rsastmtdata.response.fldorgtxnid;
				
				fldFcatSessionId = "";
				fldClientSessionId = "";
				if(rsastmtdata.response.rsadetails){
					fldFcatSessionId = rsastmtdata.response.rsadetails.fcatsessionid;
					fldClientSessionId = rsastmtdata.response.rsadetails.clientsessionid;
				}
				
				fldTxnId = rsastmtdata.request.fldTxnId;
				
				if(rsastmtdata.request.fldAcctNo){
					tmpaccnoval = rsastmtdata.request.fldAcctNo;
					
					arraccno = tmpaccnoval.split("#");
					if(arraccno.length > 0)
						fldAcctNo = arraccno[0];
					else
						fldAcctNo = "";
				}else{
					fldAcctNo = "";
				}
				
				fldSessionId = rsastmtdata.request.fldSessionId;
				fldjsessionid = rsastmtdata.request.fldjsessionid;
				fldLoginUserId = rsastmtdata.request.fldLoginUserId;
				fldSessionId = rsastmtdata.request.fldSessionId;
				fldFCDBSessionId = rsastmtdata.request.fldFCDBSessionId;
				fldIdRequest = rsastmtdata.response.mci.requestid;
				
				fldrsatxnstatus = rsastmtdata.response.fldRsaTxnStatus;
				
				
			    $("#contentData").load("Views/TPT/rsaValidation.html", null, function (response, status, xhr) {
	                if (status != "error") {}
	                
	                if(fldrsaauthretry == '0'){
	                	$(".clsrsaauthentry").show();
	                }
	                
	                if(fldrsatxnstatus == 'ERROR'){
	                	fldrsatxnerrdesc = rsastmtdata.response.fldRsaTxnErrDesc;
	                	$(".clsrsatxnerrdesc").show();
	                	$(".clsrsatxnerrdesc p").html(fldrsatxnerrdesc);
	                }
	                
	                if(fldrsaauthaction == 'QUESTION'){
	                	
	                	$("#rsaQuestion").show();
	                	
		                if(fldrsaauthretry == '0'){
							$("#qaTxt1").show();
							$("#qaTxt2").hide();
						}else{
							$("#qaTxt1").hide();
							$("#qaTxt2").show();
						}
	                }
	                else if(fldrsaauthaction == 'OTP_EMAIL'){
	                	$("#rsaOTPEmail").show();
	                	
	                	if(!rsastmtdata.response.fldoobphonestatus && fldrsaqaauthavailable == 'N'){
	    					$("#otpTxt1").show();
	    					$("#otpTxt2").hide();
	    				}
	    				if(!rsastmtdata.response.fldoobphonestatus && fldrsaqaauthavailable == 'Y'){
	    					$("#otpTxt1").hide();
	    					$("#otpTxt2").show();
	    				}
	    				
	    				if(!customerMobile || customerMobile == ''){
	    					$("#noMobile").show();
	    				}else{
	    					$("#noMobile").hide();
	    				}
	    				
	    				if(customerMobile != ''){
	    					$("#usrMobileNo").html(customerMobile);
	    				}
	                	
	    			}
	                else if(fldrsaauthaction == 'OTPRELAY'){
	                	$("#rsaOTPrelay").show();        	
	    			}
	                else if(fldrsaauthaction == 'OOBPHONE'){
	                	$("#rsaOOBPhone").show();
	                	
	                	if(!rsastmtdata.response.fldoobphonestatus && fldrsaqaauthavailable == 'N'){
	    					$("#oobphTxt1").show();
	    					$("#oobphTxt2").hide();
	    				}
	    				if(!rsastmtdata.response.fldoobphonestatus && fldrsaqaauthavailable == 'Y'){
	    					$("#oobphTxt1").hide();
	    					$("#oobphTxt2").show();
	    				}
	    				
	    				if(self.oobPhoneList().length > 0){
	    					$("#divOOBphlist").show();
	    				}
	                }
	                else if(fldrsaauthaction == 'OOBSTATUS'){
	                	$("#rsaOOBPhoneStatus").show();
	                	
	                	if(rsastmtdata.response.fldOOBPhoneLabel == 'Mobile 1' || rsastmtdata.response.fldOOBPhoneLabel == 'Mobile 2'){
	    					oobphdetdata = rsastmtdata.response.fldOOBPhoneCountry+"-"+rsastmtdata.response.fldOOBPhoneArea+"-"+rsastmtdata.response.fldOOBPhoneNumber;
	    				}else{
	    					oobphdetdata = rsastmtdata.response.fldOOBPhoneCountry+"-"+rsastmtdata.response.fldOOBPhoneArea+"-"+rsastmtdata.response.fldOOBPhoneNumber;
	    					if(rsastmtdata.response.fldOOBPhoneExtn != ''){
	    						oobphdetdata += '('+rsastmtdata.response.fldOOBPhoneExtn+')';
	    					}
	    				}
	                	
	                	$("#oobphdet p").html(oobphdetdata);
	                	
	                	$("#oobphtoken").html(rsastmtdata.response.fldOOBPhoneToken);
	                }
	                
	                $("#fldRequestId").val(fldFCDBRequestId);
	                $("#fldScrnSeqNbr").val(fldScrnSeqNbr);
	                $("#fldRsaOTPAvailable").val(fldRsaOTPAvailable);
	                $("#fldRsaSessionId").val(fldRsaSessionId);
	                $("#fldRsaAuthAction").val(fldRsaAuthAction);
	                $("#fldOOBPhoneToken").val(fldOOBPhoneToken);
	                $("#fldRsaQAAuthAvailable").val(fldRsaQAAuthAvailable);
	                $("#fldRsaOOBPhoneAvailable").val(fldRsaOOBPhoneAvailable);
	                $("#fldOOBPhoneCountry").val(fldOOBPhoneCountry);
	                $("#fldOOBPhoneArea").val(fldOOBPhoneArea);
	                $("#fldOOBPhoneNumber").val(fldOOBPhoneNumber);
	                $("#fldOOBPhoneExtn").val(fldOOBPhoneExtn);
	                $("#fldOOBPhoneLabel").val(fldOOBPhoneLabel);
	                $("#fldRsaAuthTxnId").val(fldRsaAuthTxnId);
	                $("#fldRsaAuthRetry").val(fldRsaAuthRetry);
	                $("#fldOOBPhoneArea").val(fldOOBPhoneArea);
	               
	                $("#fldOOBPhoneCountryList").val(tempCountry);
	                $("#fldOOBPhoneAreaList").val(tempAreaCode);
	                $("#fldOOBPhoneNumberList").val(tempPhoneNo);
	                $("#fldOOBPhoneExtnList").val(tempPhoneExtn);
	                $("#fldOOBPhoneLabelList").val(tempPhoneLabel);
	                $("#fldFCDBRequestId").val(fldFCDBRequestId);
	                $("#fldUserRefNo").val(fldUserRefNo);
	                $("#fldDateTime").val(fldDateTime);
	                $("#fldOrgTxnId").val(fldOrgTxnId);
	                
	                $("#fldFcatSessionId").val(fldFcatSessionId);
	                $("#fldClientSessionId").val(fldClientSessionId);
	                $("#fldTxnId").val(fldTxnId);
	                $("#fldAcctNo").val(fldAcctNo);
	                $("#fldSessionId").val(fldSessionId);
	                $("#fldjsessionid").val(fldjsessionid);
	                $("#fldLoginUserId").val(fldLoginUserId);
	                $("#fldFCDBSessionId").val(fldFCDBSessionId);
	                $("#fldIdRequest").val(fldIdRequest);
	               
	                ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
	            });
        	}else{
        		fldTxnId = rsastmtdata.request.fldTxnId;
        		try{errormessage = rsastmtdata.response.rc.errormessage;}catch(e){}
        		
        		//errormessage = rsastmtdata.response.rc.errormessage;
        		fldrsatxnstatus = rsastmtdata.response.fldRsaTxnStatus;
        		fldRsaAuthResponse = rsastmtdata.response.fldRsaAuthResponse;
        		fldOOBPhoneStatus = rsastmtdata.response.fldOOBPhoneStatus;
        		
        		if(fldTxnId == 'TPT'){
        			acctdetails = rsastmtdata.response.acctdetails;
        			codtxnrefno = "";
        			if(acctdetails){
	        			codtxnrefno = rsastmtdata.response.acctdetails.codtxnrefno;
	        			amttxn = rsastmtdata.response.acctdetails.amttxn;
	        			reply = rsastmtdata.response.acctdetails.reply;
	        			fromacctno = rsastmtdata.response.acctdetails.fromacctno;
	        			brnname = rsastmtdata.response.acctdetails.brnname;
	        			toacctno = rsastmtdata.response.acctdetails.toacctno;
	        			txndesc = rsastmtdata.response.acctdetails.txndesc;
	        			acctcurr = rsastmtdata.response.acctdetails.acctcurr;
        			}
        			
        			$("#contentData").load("Views/TPT/rrtpt05.html", null, function (response, status, xhr) {
    	                if (status != "error") {}
        			
    	                if(acctdetails){    	                	
    	                	$("#tpt05success").show();
    	                }else{    	                	
    	                	$("#tpt05success").hide();
    	                }
    	                
    	                if(codtxnrefno != ''){
    	                	$(".success_msg").show();    	                	
    	                }else{
    	                	$(".success_msg").hide();    	                	
    	                }
    	                
    	                if(errormessage != ''){
    	                	$(".rcErrorMsg").show();
    	                	$(".rcErrorMsg").html(errormessage);
    	                }
    	                
    	                if(fldrsatxnstatus == 'ERROR'){
    	                	fldrsatxnerrdesc = rsastmtdata.response.fldRsaTxnErrDesc;
    	                	$(".rsaTxnStatus").show();
    	                	$(".rsaTxnStatus p").html(fldrsatxnerrdesc);
    	                }
    	                
    	                if(fldRsaAuthResponse == 'FAILURE' || fldOOBPhoneStatus == 'FAILURE'){
    	                	$(".rsaAuthFailure").show();    	                	
    	                }
    	                if(fldOOBPhoneStatus == 'TIMEOUT' || fldOOBPhoneStatus == 'RETRY'){
    	                	$(".rsaOOBErr").show();    	                	
    	                }
    	                
    	                if(acctdetails){
	    	                $("#refno").html(codtxnrefno);
	    	                $("#amount").html(amttxn);
	    	                $("#txnStatus").html(reply);
	    	                $("#fromAccount").html(fromacctno+"-"+brnname);
	    	                $("#toAccount").html(toacctno);
	    	                $("#description").html(txndesc);
	    	                $("#currency").html(acctcurr);
	    	                
	    	                accountList.removeAll();
	    	                accountSummList.removeAll();
    	                }
    	                ko.applyBindings(self, $(".dynamic-page-content").get(0));
        			});  
    	                
        		}else if(fldTxnId == 'VMT'){
        			
        			if(rsastmtdata.response.rc.returncode == 0){
        			//acctdetails = rsastmtdata.response.acctdetails;
        			
        			//if(rsastmtdata.response.acctdetails)
        			codtxnrefno =rsastmtdata.response.codtxnrefno;
        			fldfromacct =rsastmtdata.response.fldFromAcct;
        	     	fldamount = rsastmtdata.response.fldamount;
        	     	fldsendersname = rsastmtdata.response.fldsendersName;
        	     	fldrecieversname = rsastmtdata.response.fldrecieversName;
        	     	fldsenderscomments = rsastmtdata.response.fldsendersComments;
        	     	fldvisabinno = rsastmtdata.response.fldvisaBinNo;
        			
        			$("#contentData").load("Views/TPT/rrvmt03.html", null, function (response, status, xhr) {
    	                if (status != "error") {}
        			
    	                if(codtxnrefno != '' && codtxnrefno != undefined){
    	                	$(".success_msg").show();
    	                	$("#vmt03success").show();
    	                	
    	                	accountList.removeAll();
	    	                accountSummList.removeAll();
    	                }else{
    	                	$(".success_msg").hide();
    	                	$("#vmt03success").hide();
    	                }
    	                
    	                if(errormessage != ''){
    	                	$(".rcErrorMsg").show();
    	                	$(".rcErrorMsg").html(errormessage);
    	                }
    	                
    	                if(fldRsaAuthResponse == 'FAILURE' || fldOOBPhoneStatus == 'FAILURE'){
    	                	$(".rsaAuthFailure").show();    	                	
    	                }
    	                if(fldOOBPhoneStatus == 'TIMEOUT' || fldOOBPhoneStatus == 'RETRY'){
    	                	$(".rsaOOBErr").show();    	                	
    	                }
    	                
    	                if(fldrsatxnstatus == 'ERROR'){
    	                	fldrsatxnerrdesc = rsastmtdata.response.fldRsaTxnErrDesc;
    	                	$(".rsaTxnStatus").show();
    	                	$(".rsaTxnStatus p").html(fldrsatxnerrdesc);
    	                }
    	                
    	                
    	                $(".clstxnrefno").html(codtxnrefno);
    	                $(".clsfrmaccount").html(fldfromacct);
    	                $(".clsamount").html(formatAmt(parseFloat(fldamount)));
    	            	$(".clssendername").html(fldsendersname);
    	            	$(".clsreceivername").html(fldrecieversname);
    	            	$(".clssendercomm").html(fldsenderscomments);
    	            	$(".clsvisacard").html(fldvisabinno);
    	                
    	                ko.applyBindings(self, $(".dynamic-page-content").get(0));
        			});  
    	                
        			}
        			else{
	    	    			errmsg = invocationResult.faml.response.rc.errormessage;
	    	    		handleError(invocationResult.faml.response);
	    	    		}
        		}
        		else if(fldTxnId == 'TPN'){
        			txndetails = rsastmtdata.response.txndetails;
        			referenceno = "";
        			if(txndetails){
        			
        			acctno = rsastmtdata.response.txndetails.acctno;
        			referenceno = rsastmtdata.response.txndetails.referenceno;
        			benefname = rsastmtdata.response.txndetails.benefname;
        			ifsccode = rsastmtdata.response.txndetails.ifsccode;
        			benefacctno = rsastmtdata.response.txndetails.benefacctno;
        			bankdesc = rsastmtdata.response.txndetails.bankdesc;
        			txnamount = rsastmtdata.response.txndetails.txnamount;
        			txndesc = rsastmtdata.response.txndetails.txndesc;
        			commode = rsastmtdata.response.txndetails.commode;
        			comaddress = rsastmtdata.response.txndetails.comaddress;
        			
        			}
        			$("#contentData").load("Views/TPT/rrtpn06.html", null, function (response, status, xhr) {
    	                if (status != "error") {}
        			
    	                if(referenceno != ''){
    	                	$(".success_msg").show();
    	                	$("#tpn06success").show();
    	                	
    	                	accountList.removeAll();
	    	                accountSummList.removeAll();
    	                }else{
    	                	$(".success_msg").hide();
    	                	$("#tpn06success").hide();
    	                }
    	                
    	                if(errormessage != ''){
    	                	$(".rcErrorMsg").show();
    	                	$(".rcErrorMsg").html(errormessage);
    	                }
    	                
    	                if(fldRsaAuthResponse == 'FAILURE' || fldOOBPhoneStatus == 'FAILURE'){
    	                	$(".rsaAuthFailure").show();    	                	
    	                }
    	                if(fldOOBPhoneStatus == 'TIMEOUT' || fldOOBPhoneStatus == 'RETRY'){
    	                	$(".rsaOOBErr").show();    	                	
    	                }
    	                
    	                if(fldrsatxnstatus == 'ERROR'){
    	                	fldrsatxnerrdesc = rsastmtdata.response.fldRsaTxnErrDesc;
    	                	$(".rsaTxnStatus").show();
    	                	$(".rsaTxnStatus p").html(fldrsatxnerrdesc);
    	                }
    	                
    	                if(referenceno != ''){
	    	                $(".clsacctno").html(acctno);
	    	                $(".clsreferenceno").html(referenceno);
	    	                $(".clsbenefname").html(benefname);
	    	                $(".clsifsccode").html(ifsccode);
	    	                $(".clsbenefacctno").html(benefacctno);
	    	                $(".clsbankdesc").html(bankdesc);
	    	                $(".clstxnamount").html(formatAmt(parseFloat(txnamount)));
	    	                $(".clstxndesc").html(txndesc);
    	                   if(commode=='Default'){
                           $(".clscommumode").html('');
                           $(".clscommdet").html('');
                           }else{
			     if(commode == 'EML') strcommode = "Email"; else strcommode = commode;
	    	                $(".clscommumode").html(strcommode);
	    	                
	    	                $(".clscommdet").html(comaddress);
			   }
	    	              
    	                
    	                }
    	                
    	                ko.applyBindings(self, $(".dynamic-page-content").get(0));
        			});  
    	                
        		}
        		else if(fldTxnId == 'P2A'){
        			
        			referenceno = rsastmtdata.response.referenceno;
        			
        			if(referenceno != '' && referenceno != undefined){
	        			
        				fldFromAcctNo = rsastmtdata.response.fromacct;
        	          	fldTxnAmount = rsastmtdata.response.amttxn;
        	          	fldNamBenef = rsastmtdata.response.benename;
        	          	fldBeneAcct = rsastmtdata.response.beneacctno;
        	          	fldIFSCCode = rsastmtdata.response.ifsccode;
        	          	fldBeneAcctType = rsastmtdata.response.benefaccttype;
        	          	fldRmrk = rsastmtdata.response.remark;
        			}
        			
        			$("#contentData").load("Views/TPT/rrp2a03.html", null, function (response, status, xhr) {
    	                if (status != "error") {}
        			
    	                if(referenceno != '' && referenceno != undefined){    	                	
    	                	$("#p2a03success").show();
    	                	
    	                	accountList.removeAll();
	    	                accountSummList.removeAll();
    	                }else{    	                	
    	                	$("#p2a03success").hide();
    	                }
    	                
    	                if(errormessage != ''){
    	                	$(".rcErrorMsg").show();
    	                	$(".rcErrorMsg").html(errormessage);
    	                	$(".success_msg").hide();
    	                }
    	                if(fldRsaAuthResponse == 'FAILURE' || fldOOBPhoneStatus == 'FAILURE'){
    	                	$(".rsaAuthFailure").show();    	                	
    	                }
    	                if(fldOOBPhoneStatus == 'TIMEOUT' || fldOOBPhoneStatus == 'RETRY'){
    	                	$(".rsaOOBErr").show();    	                	
    	                }
    	                
    	                if(fldrsatxnstatus == 'ERROR'){
    	                	fldrsatxnerrdesc = rsastmtdata.response.fldRsaTxnErrDesc;
    	                	$(".rsaTxnStatus").show();
    	                	$(".rsaTxnStatus p").html(fldrsatxnerrdesc);
    	                }
    	                
    	                if(referenceno != '' && referenceno != undefined){
    	                	$(".clsrefno").html(referenceno);
    	                	
	    	                  $(".clsfromacc").html(fldFromAcctNo);
	    	                  $(".clsnamebenef").html(fldNamBenef);
	    	                  $(".clsbenefaccno").html(fldBeneAcct);
	    	              	  $(".clsamttxn,.clsamount").html(formatAmt(parseFloat(fldTxnAmount)));
	    	              	  $(".clsifsc").html(fldIFSCCode);
	    	              	  
	    	              	acctype = fldBeneAcctType;
	    	              	if(acctype == 10)
	                      		stracctype = 'Savings';
	                      	else if(acctype == 11)
	                      		stracctype = 'Current';
	                      	else if(acctype == 12)
	                      		stracctype = 'Overdraft';
	                      	else if(acctype == 13)
	                      		stracctype = 'Cash Credit';
	                      	else if(acctype == 14)
	                      		stracctype = 'Loan Account';
	                      	else if(acctype == 40)
	                      		stracctype = 'NRE';
	                      	else if(acctype == 52)
	                      		stracctype = 'Card Payment';
	                      	else
	                      		stracctype = 'Invalid Account Type';
	    	              	
	    	              	  $(".clsbenefacctype").html(stracctype);
	    	              	  $(".clsremark").html(fldRmrk);
    	                }
    	                ko.applyBindings(self, $(".dynamic-page-content").get(0));
        			});  
    	                
        		}
        		else if(fldTxnId == 'IFT'){
        			
        			referenceno = rsastmtdata.response.referenceno;
        			      
        			if(referenceno != '' && referenceno != undefined){
	        			
        				fldFromAcctNo = rsastmtdata.response.fromacct;
        	          	fldTxnAmount = rsastmtdata.response.amttxn;
        	          	//fldNamBenef = accstmtdata.response.fldNamBenef;
        	          	//fldBeneAcct = accstmtdata.response.fldBeneAcct;
        	            benefmobno = rsastmtdata.response.benefmobno;
        	           	benefmmid = rsastmtdata.response.benefmmid;
        	          	fldRmrk = rsastmtdata.response.remark;
        			}
        			
        			$("#contentData").load("Views/TPT/rrift03.html", null, function (response, status, xhr) {
    	                if (status != "error") {}
        			
    	                if(referenceno != '' && referenceno != undefined){    	                	
    	                	$("#p2a03success").show();
    	                	
    	                	accountList.removeAll();
	    	                accountSummList.removeAll();
    	                }else{    	                	
    	                	$("#p2a03success").hide();
    	                }
    	                
    	                if(errormessage != ''){
    	                	$(".rcErrorMsg").show();
    	                	$(".rcErrorMsg").html(errormessage);
    	                	$(".success_msg").hide();
    	                }
    	                if(fldRsaAuthResponse == 'FAILURE' || fldOOBPhoneStatus == 'FAILURE'){
    	                	$(".rsaAuthFailure").show();    	                	
    	                }
    	                
    	                if(fldOOBPhoneStatus == 'TIMEOUT' || fldOOBPhoneStatus == 'RETRY'){
    	                	$(".rsaOOBErr").show();    	                	
    	                }
    	                
    	                if(fldrsatxnstatus == 'ERROR'){
    	                	fldrsatxnerrdesc = rsastmtdata.response.fldRsaTxnErrDesc;
    	                	$(".rsaTxnStatus").show();
    	                	$(".rsaTxnStatus p").html(fldrsatxnerrdesc);
    	                }
    	                
    	                if(referenceno != '' && referenceno != undefined){
    	                	$("#referenceno").html(referenceno);
    	             
	    	                  $("#benefmmid").html(benefmmid);
	    	                  $("#benefmobno").html(benefmobno);
	    	              	  $(".clsamttxn,#amttxn").html(fldTxnAmount);
	    	              	  $("#fromacct").html(fldFromAcctNo);
	    	              	
	    	              	  $("#remark").html(fldRmrk);
    	                }
    	                ko.applyBindings(self, $(".dynamic-page-content").get(0));
        			}); 
        		}
        		else if(fldTxnId == 'CCP'){
        			
        			codtxnrefno = rsastmtdata.response.codtxnrefno;
        			      
        			if(codtxnrefno != '' && codtxnrefno != undefined){
	        			
        				fromacctno = rsastmtdata.response.fromacctno;
        				billamount = rsastmtdata.response.paymentdtls.billamount;
        				billcurr = rsastmtdata.response.paymentdtls.billcurr;
        				fldamttype = rsastmtdata.request.fldamttype;
						paymenttype=rsastmtdata.request.fldPmntType;
						
						if(paymenttype=="HDFCOTH"){
						  var cardnum = rsastmtdata.response.consumerno;
						  var Cardnumber = cardnum.substring(0,6)+"XXXXXX"+cardnum.substring(12,16);
						  consumerno = Cardnumber;
						}
						else{
						  consumerno = rsastmtdata.response.consumerno;
						}
        				
        				
        				//consumerno = rsastmtdata.response.consumerno;
        				companyname = rsastmtdata.response.paymentdtls.companyname;
        				benefname = rsastmtdata.response.benefname;
        	          
        			}
        			
        			$("#contentData").load("Views/Credit/rrccp04.html", null, function (response, status, xhr) {
    	                if (status != "error") {}
        			
    	                if(codtxnrefno != '' && codtxnrefno != undefined){    	                	
    	                	$("#ccp04success").show();
    	                	$(".success_msg").show();
    	                	accountList.removeAll();
	    	                accountSummList.removeAll();
    	                }else{    	                	
    	                	$("#ccp04success").hide();
    	                	$(".success_msg").hide();
    	                }
    	                
    	                if(errormessage != ''){
    	                	$(".rcErrorMsg").show();
    	                	$(".rcErrorMsg").html(errormessage);    	                	
    	                }
    	                
    	                if(fldRsaAuthResponse == 'FAILURE' || fldOOBPhoneStatus == 'FAILURE'){
    	                	$(".rsaAuthFailure").show();    	                	
    	                }
    	                if(fldOOBPhoneStatus == 'TIMEOUT' || fldOOBPhoneStatus == 'RETRY'){
    	                	$(".rsaOOBErr").show();    	                	
    	                }
    	                
    	                if(fldrsatxnstatus == 'ERROR'){
    	                	fldrsatxnerrdesc = rsastmtdata.response.fldRsaTxnErrDesc;
    	                	$(".rsaTxnStatus").show();
    	                	$(".rsaTxnStatus p").html(fldrsatxnerrdesc);
    	                }
    	                
    	                if(codtxnrefno != '' && codtxnrefno != undefined){
    	                	$(".clsrefno").html(codtxnrefno);
    	                	
    	                	if(fldamttype == 'TAD')
    	                		$(".clsamtlbl").html("Last Statement Bal");
    	                	else if(fldamttype == 'MAD')
    	                		$(".clsamtlbl").html("Minimum Amount Due");
    	                	else
    	                		$(".clsamtlbl").html("Amount");
    	                	
    	                	  $(".clsamount").html(formatAmt(parseFloat(billamount)));
	    	                
    	                	  $(".clsfromacc").html(fromacctno);
	    	                  $(".clscardno").html(consumerno);
	    	                  $(".clscardtype").html(companyname);	    
	    	                  
	    	                  if(benefname != '' && benefname != undefined)
	    	              	  {
	    	                	  $("#divbenef").show();
	    	                	  $(".clsbenefname").html(benefname);
	    	              	  }
	    	              	    	                
	    	               
    	                }
    	                ko.applyBindings(self, $(".dynamic-page-content").get(0));
        			});  
    	                
        		}else if(fldTxnId == 'RFX'){
				
        			referenceno = rsastmtdata.response.codtxnrefno;
					
					if(referenceno != '' && referenceno != undefined){
	        			
        				namcustfull = rsastmtdata.response.namcustfull;
        				fldCurrDesc = rsastmtdata.response.fldCurrDesc;
        				fldforexcardNo = rsastmtdata.request.fldforexcardNo;
        				fldINR = rsastmtdata.request.fldINR;
						fldFromAcctNo= rsastmtdata.request.fldFromAcctNo;
        				fldEqvInrAmt= rsastmtdata.request.fldEqvInrAmt;
						fldEqvUsdAmt= rsastmtdata.request.fldEqvUsdAmt;
						
						fldEqvusdshow = parseFloat(fldEqvUsdAmt).toFixed(2);
        				
        	          
        			}
        			$("#contentData").load("Views/Accounts/rrrfx04.html", null, function (response, status, xhr) {
    	                if (status != "error") {}
						
						
						
    	                if(referenceno != '' && referenceno != undefined){    	                	
    	                	$("#rsrfx04success").show();
    	                	
    	                	accountList.removeAll();
	    	                accountSummList.removeAll();
    	                }else{    	                	
    	                	$("#rsrfx04success").hide();
    	                }
    	                
    	                if(errormessage != ''){
    	                	$(".rcErrorMsg").show();
    	                	$(".rcErrorMsg").html(errormessage);
    	                	$(".success_msg").hide();
    	                }
    	                if(fldRsaAuthResponse == 'FAILURE' || fldOOBPhoneStatus == 'FAILURE'){
    	                	$(".rsaAuthFailure").show();    	                	
    	                }
    	                
    	                if(fldOOBPhoneStatus == 'TIMEOUT' || fldOOBPhoneStatus == 'RETRY'){
    	                	$(".rsaOOBErr").show();    	                	
    	                }
    	                
    	                if(fldrsatxnstatus == 'ERROR'){
    	                	fldrsatxnerrdesc = rsastmtdata.response.fldRsaTxnErrDesc;
    	                	$(".rsaTxnStatus").show();
    	                	$(".rsaTxnStatus p").html(fldrsatxnerrdesc);
    	                }
    	                
    	                if(referenceno != '' && referenceno != undefined){
						   
						      fldINR=Inrusdamount.split("#")[0];
							  fldINR1=Inrusdamount.split("#")[1];
							  fldINR2=Inrusdamount.split("#")[2];
							  fldINR3=Inrusdamount.split("#")[3];
							  fldINR4=Inrusdamount.split("#")[4];
							  fldINR5=Inrusdamount.split("#")[5];
							  fldINR6=Inrusdamount.split("#")[6];
							  fldINR7=Inrusdamount.split("#")[7];
							  fldINR8=Inrusdamount.split("#")[8];
							  fldINR9=Inrusdamount.split("#")[9];
							  
							  fldUSD=Inrusdamount.split("#")[10];
							  fldUSD1=Inrusdamount.split("#")[11];
							  fldUSD2=Inrusdamount.split("#")[12];
							  fldUSD3=Inrusdamount.split("#")[13];
							  fldUSD4=Inrusdamount.split("#")[14];
							  fldUSD5=Inrusdamount.split("#")[15];
							  fldUSD6=Inrusdamount.split("#")[16];
							  fldUSD7=Inrusdamount.split("#")[17];
							  fldUSD8=Inrusdamount.split("#")[18];
							  fldUSD9=Inrusdamount.split("#")[19];
							  
		
							  
    	                	   $("#Refno").html(referenceno);
							   $("#custname").html(namcustfull);
							   $("#cardno").html(fldforexcardNo);
							   $("#accountno").html(fldFromAcctNo);
							   $("#fldEqvUsdAmt").html(fldEqvUsdAmt);
		                       $("#fldEqvInrAmt").html(fldEqvInrAmt);
							   
							   
								 
								 
						  $("#fldCurr").html(rsastmtdata.request.fldCurr);
						  $("#fldForex").html(rsastmtdata.request.fldForex);
						   $("#fldINR").html(fldINR);
						  $("#fldUSD").html(fldUSD);
						  
						  
						  
			    if(rsastmtdata.request.fldForex1!='' && rsastmtdata.request.fldCurr1!=''){
				          $("#fldcurrancy1").show();
						  $("#fldCurr1").html(rsastmtdata.request.fldCurr1);
						  $("#fldForex1").html(rsastmtdata.request.fldForex1);
						  $("#fldINR1").html(fldINR1);
						  $("#fldUSD1").html(fldUSD1);
						  
				 }
				 if(rsastmtdata.request.fldForex2!='' && rsastmtdata.request.fldCurr2!=''){
				          $("#fldcurrancy2").show();
						  $("#fldCurr2").html(rsastmtdata.request.fldCurr2);
						  $("#fldForex2").html(rsastmtdata.request.fldForex2);
						  $("#fldINR2").html(fldINR2);
						  $("#fldUSD2").html(fldUSD2);
						 
						  
				 }
				 if(rsastmtdata.request.fldForex3!='' && rsastmtdata.request.fldCurr3!=''){
				          $("#fldcurrancy3").show();
						  $("#fldCurr3").html(rsastmtdata.request.fldCurr3);
						  $("#fldForex3").html(rsastmtdata.request.fldForex3);
						  $("#fldINR3").html(fldINR3);
						  $("#fldUSD3").html(fldUSD3);
						 
				 }
				 if(rsastmtdata.request.fldForex4!='' && rsastmtdata.request.fldCurr4!=''){
				           $("#fldcurrancy4").show();
						   $("#fldCurr4").html(rsastmtdata.request.fldCurr4);
						   $("#fldForex4").html(rsastmtdata.request.fldForex4);
						   $("#fldINR4").html(fldINR4);
						   $("#fldUSD4").html(fldUSD4);
						
				 }
				 if(rsastmtdata.request.fldForex5!='' && rsastmtdata.request.fldCurr5!=''){
				         $("#fldcurrancy5").show();
						  $("#fldCurr5").html(rsastmtdata.request.fldCurr5);
						  $("#fldForex5").html(rsastmtdata.request.fldForex5);
						   $("#fldINR5").html(fldINR5);
						  $("#fldUSD5").html(fldUSD5);
						 
				 }
				 if(rsastmtdata.request.fldForex6!='' && rsastmtdata.request.fldCurr6!=''){
				         $("#fldcurrancy6").show();
						  $("#fldCurr6").html(rsastmtdata.request.fldCurr6);
						  $("#fldForex6").html(rsastmtdata.request.fldForex6);
						  $("#fldINR6").html(fldINR6);
						  $("#fldUSD6").html(fldUSD6);
					
				 }
				 if(rsastmtdata.request.fldForex7!='' && rsastmtdata.request.fldCurr7!=''){
				         $("#fldcurrancy7").show();
						  $("#fldCurr7").html(rsastmtdata.request.fldCurr7);
						  $("#fldForex7").html(rsastmtdata.request.fldForex7);
						   $("#fldINR7").html(fldINR7);
						  $("#fldUSD7").html(fldUSD7);
						  
				 }
				 if(rsastmtdata.request.fldForex8!='' && rsastmtdata.request.fldCurr8!=''){
				          $("#fldcurrancy8").show();
						  $("#fldCurr8").html(rsastmtdata.request.fldCurr8);
						  $("#fldForex8").html(rsastmtdata.request.fldForex8);
						   $("#fldINR8").html(fldINR8);
						  $("#fldUSD8").html(fldUSD8);
					
				 }
				 if(rsastmtdata.request.fldForex9!='' && rsastmtdata.request.fldCurr9!=''){
				         $("#fldcurrancy9").show();
						 $("#fldCurr9").html(rsastmtdata.request.fldCurr9);
						  $("#fldForex9").html(rsastmtdata.request.fldForex9);
						   $("#fldINR9").html(fldINR9);
						  $("#fldUSD9").html(fldUSD9);
						  
				 }
    	                }
						
        			
    	                ko.applyBindings(self, $(".dynamic-page-content").get(0));
        			});  
    	                
        		}else if(fldTxnId == 'PFC'){
				
        			referenceno = rsastmtdata.response.codtxnrefno;
					
					if(referenceno != '' && referenceno != undefined){
					
					          fldUSD=Purchesusdamount.split("#")[0];
							  fldUSD1=Purchesusdamount.split("#")[1];
							  fldUSD2=Purchesusdamount.split("#")[2];
							  fldUSD3=Purchesusdamount.split("#")[3];
							  fldUSD4=Purchesusdamount.split("#")[4];
							  fldUSD5=Purchesusdamount.split("#")[5];
							  fldUSD6=Purchesusdamount.split("#")[6];
							  fldUSD7=Purchesusdamount.split("#")[7];
							  fldUSD8=Purchesusdamount.split("#")[8];
							  fldUSD9=Purchesusdamount.split("#")[9];
	        			
        				namcustfull = rsastmtdata.response.namcustfull;
        				fldCurrDesc = rsastmtdata.response.fldCurrDesc;
        				fldForex = rsastmtdata.response.fldForex;
        				fldINR = rsastmtdata.response.fldINR;
						fldVariantDesc = rsastmtdata.response.fldVariantDesc;
						fldCurrDesc = rsastmtdata.response.fldCurrDesc;
        				fldEqvInrAmt= rsastmtdata.response.fldEqvInrAmt;
						flddispatchCity=rsastmtdata.response.flddispatchCity;
						fldForex =rsastmtdata.response.fldForex;
						flddispatchAddr1 =rsastmtdata.response.flddispatchAddr1;
						flddispatchAddr2 =rsastmtdata.response.flddispatchAddr2;
						flddispatchAddr3  =rsastmtdata.response.flddispatchAddr3;
						flddispatchState =rsastmtdata.response.flddispatchState;
        	            flddispatchZip=rsastmtdata.response.flddispatchZip;
					    fldEqvUsdAmt=rsastmtdata.response.fldEqvUsdAmt;
						flddispatchCntry=rsastmtdata.response.flddispatchCntry;
						fldFromAcctNo=rsastmtdata.request.fldFromAcctNo;
						fldEqvInrAmt= rsastmtdata.request.fldEqvInrAmt;
						fldEqvUsdAmt= rsastmtdata.request.fldEqvUsdAmt;
					
        			}
        			$("#contentData").load("Views/Accounts/rrpfc05.html", null, function (response, status, xhr) {
    	                if (status != "error") {}
						
						
						
    	                if(referenceno != '' && referenceno != undefined){    	                	
    	                	$("#rrpfcg04sccess").show();
    	                	
    	                	accountList.removeAll();
	    	                accountSummList.removeAll();
    	                }else{    	                	
    	                	$("#rrpfcg04sccess").hide();
    	                }
    	                
    	                if(errormessage != ''){
    	                	$(".rcErrorMsg").show();
    	                	$(".rcErrorMsg").html(errormessage);
    	                	$(".success_msg").hide();
    	                }
    	                if(fldRsaAuthResponse == 'FAILURE' || fldOOBPhoneStatus == 'FAILURE'){
    	                	$(".rsaAuthFailure").show();    	                	
    	                }
    	                
    	                if(fldOOBPhoneStatus == 'TIMEOUT' || fldOOBPhoneStatus == 'RETRY'){
    	                	$(".rsaOOBErr").show();    	                	
    	                }
    	                
    	                if(fldrsatxnstatus == 'ERROR'){
    	                	fldrsatxnerrdesc = rsastmtdata.response.fldRsaTxnErrDesc;
    	                	$(".rsaTxnStatus").show();
    	                	$(".rsaTxnStatus p").html(fldrsatxnerrdesc);
    	                }
    	                
    	                if(referenceno != '' && referenceno != undefined){
    	                	   $("#Refno").html(referenceno);
							   $("#custname").html(namcustfull);
							   $("#address1").html(flddispatchAddr1);
							   $("#fldEqvUsdAmt").html(fldEqvUsdAmt);
		                                           $("#fldEqvInrAmt").html(fldEqvInrAmt);
							   if(flddispatchAddr2!=""){
							    $("#addressline1").show();
							    $("#address2").html(flddispatchAddr2);
							   }
							   else{
							    $("#addressline1").hide();
							   }
							   
							   if(flddispatchAddr2!=""){
							     $("#addressline2").show();
							     $("#address3").html(flddispatchAddr3);
							   }
							   else{
							    $("#addressline2").hide();
							   }
							   $("#city").html(flddispatchCity);
							   $("#state").html(flddispatchState);
							   $("#Country").html(flddispatchCntry);
							   $("#Country").html(flddispatchCntry);
							   $("#pincode").html(flddispatchZip);
							   $("#account").html(fldFromAcctNo);
							   $("#cardvarient").html(fldVariantDesc);
							   $("#account").html(fldFromAcctNo);
							   $("#fldEqvInrAmt").html(fldEqvInrAmt);
						  $("#fldCurr").html(rsastmtdata.request.fldCurr);
						  $("#fldForex").html(rsastmtdata.request.fldForex);
						  $("#fldINR").html(rsastmtdata.request.fldINR);
						  $("#fldUSD").html(fldUSD);
				if(rsastmtdata.request.fldForex1!='' && rsastmtdata.request.fldCurr1!=''){
				          $("#fldcurrancy1").show();
						  $("#fldCurr1").html(rsastmtdata.request.fldCurr1);
						  $("#fldForex1").html(rsastmtdata.request.fldForex1);
						  $("#fldINR1").html(rsastmtdata.request.fldINR1);
						   $("#fldUSD1").html(fldUSD1);
				 }
				 if(rsastmtdata.request.fldForex2!='' && rsastmtdata.request.fldCurr2!=''){
				           $("#fldcurrancy2").show();
						  $("#fldCurr2").html(rsastmtdata.request.fldCurr2);
						   $("#fldForex2").html(rsastmtdata.request.fldForex2);
						  $("#fldINR2").html(rsastmtdata.request.fldINR2);
						   $("#fldUSD2").html(fldUSD2);
						  
				 }
				 if(rsastmtdata.request.fldForex3!='' && rsastmtdata.request.fldCurr3!=''){
				          $("#fldcurrancy3").show();
						  $("#fldCurr3").html(rsastmtdata.request.fldCurr3);
						  $("#fldForex3").html(rsastmtdata.request.fldForex3);
						  $("#fldINR3").html(rsastmtdata.request.fldINR3);
						   $("#fldUSD3").html(fldUSD3);
				 }
				 if(rsastmtdata.request.fldForex4!='' && rsastmtdata.request.fldCurr4!=''){
				           $("#fldcurrancy4").show();
						   $("#fldCurr4").html(rsastmtdata.request.fldCurr4);
						   $("#fldForex4").html(rsastmtdata.request.fldForex4);
						   $("#fldINR4").html(rsastmtdata.request.fldINR4);
						    $("#fldUSD4").html(fldUSD4);
				 }
				 if(rsastmtdata.request.fldForex5!='' && rsastmtdata.request.fldCurr5!=''){
				          $("#fldcurrancy5").show();
						  $("#fldCurr5").html(rsastmtdata.request.fldCurr5);
						  $("#fldForex5").html(rsastmtdata.request.fldForex5);
						  $("#fldINR5").html(rsastmtdata.request.fldINR5);
						  $("#fldUSD5").html(fldUSD5);
				 }
				 if(rsastmtdata.request.fldForex6!='' && rsastmtdata.request.fldCurr6!=''){
				         $("#fldcurrancy6").show();
						  $("#fldCurr6").html(rsastmtdata.request.fldCurr6);
						  $("#fldForex6").html(rsastmtdata.request.fldForex6);
						  $("#fldINR6").html(rsastmtdata.request.fldINR6);
						   $("#fldUSD6").html(fldUSD6);
				 }
				 if(rsastmtdata.request.fldForex7!='' && rsastmtdata.request.fldCurr7!=''){
				         $("#fldcurrancy7").show();
						  $("#fldCurr7").html(rsastmtdata.request.fldCurr7);
						  $("#fldForex7").html(rsastmtdata.request.fldForex7);
						  $("#fldINR7").html(rsastmtdata.request.fldINR7);
						  $("#fldUSD7").html(fldUSD7);
				 }
				 if(rsastmtdata.request.fldForex8!='' && rsastmtdata.request.fldCurr8!=''){
				          $("#fldcurrancy8").show();
						  $("#fldCurr8").html(rsastmtdata.request.fldCurr8);
						  $("#fldForex8").html(rsastmtdata.request.fldForex8);
						  $("#fldINR8").html(rsastmtdata.request.fldINR8);
						  $("#fldUSD8").html(fldUSD8);
				 }
				 if(rsastmtdata.request.fldForex9!='' && rsastmtdata.request.fldCurr9!=''){
				         $("#fldcurrancy9").show();
						 $("#fldCurr9").html(rsastmtdata.request.fldCurr9);
						 $("#fldForex9").html(rsastmtdata.request.fldForex9);
						 $("#fldINR9").html(rsastmtdata.request.fldINR9);
						 $("#fldUSD9").html(fldUSD9);
				 }
			  
							  
    	                }
						
        			
    	                ko.applyBindings(self, $(".dynamic-page-content").get(0));
        			});  
    	                
        		}
				
				
			
				else if(fldTxnId == 'TPA'){
				
        			referenceno = rsastmtdata.response.RefNo;
					returncode=invocationResult.faml.response.rc.returncode;
					 fldBeneType= rsastmtdata.request.fldBeneType;
					 //console.log(fldBeneType);
					// if(referenceno != '' && referenceno != undefined){
	        			
        			
        			// }
					if(fldBeneType=="TPT"){
        			$("#contentData").load("Views/TPT/rrtpa03.html", null, function (response, status, xhr) {
    	                if (status != "error") {}
						
				
						
    	                if(returncode== 0 && returncode != undefined){    	                	
    	                	$("#rrtpa03success").show();
    	                	
    	                }else{    	                	
    	                	$("#rrtpa03success").hide();
    	                }
    	                
    	                if(errormessage != ''){
    	                	$(".rcErrorMsg").show();
    	                	$(".rcErrorMsg").html(errormessage);
    	                	$(".success_msg").hide();
    	                }
    	                if(fldRsaAuthResponse == 'FAILURE' || fldOOBPhoneStatus == 'FAILURE'){
    	                	$(".rsaAuthFailure").show();
                            $("#rrtpa03success").hide();    	                	
    	                }
    	                
    	                if(fldOOBPhoneStatus == 'TIMEOUT' || fldOOBPhoneStatus == 'RETRY'){
    	                	$(".rsaOOBErr").show();    	                	
    	                }
    	                
    	                if(fldrsatxnstatus == 'ERROR'){
    	                	fldrsatxnerrdesc = rsastmtdata.response.fldRsaTxnErrDesc;
    	                	$(".rsaTxnStatus").show();
    	                	$(".rsaTxnStatus p").html(fldrsatxnerrdesc);
    	                }
    	                
    	                if(returncode== 0 && returncode != undefined){
    	                	  // $("#Refno").html(referenceno);
							 $("#fldaccount").html(invocationResult.faml.response.txndetails.benacctno);
							 $("#fldNamBenef").html(invocationResult.faml.response.txndetails.narrative);
						   	 $("#fldEmail").html(invocationResult.faml.response.txndetails.email1);
							
							  
    	                }
						
        			
    	                ko.applyBindings(self, $(".dynamic-page-content").get(0));
        			});  
    	           }else if(fldBeneType=="NEFT"){
				      
					  $("#contentData").load("Views/TPT/rrtpa07.html", null, function (response, status, xhr) {
    	                if (status != "error") {}
						
				
						
    	                if(returncode == 0 && returncode != undefined){    	                	
    	                	$("#rrtpa07success").show();
    	                	
    	                }else{    	                	
    	                	$("#rrtpa07success").hide();
    	                }
    	                
    	                if(errormessage != ''){
    	                	$(".rcErrorMsg").show();
    	                	$(".rcErrorMsg").html(errormessage);
    	                	$(".success_msg").hide();
    	                }
    	                if(fldRsaAuthResponse == 'FAILURE' || fldOOBPhoneStatus == 'FAILURE'){
    	                	$(".rsaAuthFailure").show();
							$("#rrtpa07success").hide();    	                	
    	                }
    	                
    	                if(fldOOBPhoneStatus == 'TIMEOUT' || fldOOBPhoneStatus == 'RETRY'){
    	                	$(".rsaOOBErr").show();    	                	
    	                }
    	                
    	                if(fldrsatxnstatus == 'ERROR'){
    	                	fldrsatxnerrdesc = rsastmtdata.response.fldRsaTxnErrDesc;
    	                	$(".rsaTxnStatus").show();
    	                	$(".rsaTxnStatus p").html(fldrsatxnerrdesc);
    	                }
    	                
    	                if(returncode == 0 && returncode != undefined ){
    	                	  // $("#Refno").html(referenceno);
							 $("#beneconfmsg").html(invocationResult.faml.response.beneconfmsg);
							 if(invocationResult.faml.response.txndetails.benefType =='NEFT'){
                               $("#BeneficiaryType").html('Transfer to other bank / Credit Card Payment (using NEFT / IMPS)');
				             }
							 $("#fldaccountno").html(invocationResult.faml.response.txndetails.benefacctno);
						   	 $("#IFSCcode").html(invocationResult.faml.response.txndetails.ifsccode);
							 $("#benefaccttypedesc").html(invocationResult.faml.response.txndetails.benefaccttypedesc);
							 $("#bankdesc").html(invocationResult.faml.response.txndetails.bankdesc);
							 $("#benefname").html(invocationResult.faml.response.txndetails.benefname);
						     $("#benefemail").html(invocationResult.faml.response.txndetails.benefemail);
							
							  
    	                }
						
        			
    	                ko.applyBindings(self, $(".dynamic-page-content").get(0));
        			});  
				   
                   }
                 				   
        		}
		    	else if(fldTxnId=="CIP"){
				     //alert(fldTxnId+">>>>>>>>>>>>>");
					 //	alert(invocationResult.faml.response.errormessage);
					 returncode=invocationResult.faml.response.rc.returncode;
						msg=invocationResult.faml.response.errormessage;
					  $("#contentData").load("Views/Credit/rscip03.html", null, function (response, status, xhr) {
    	                if (status != "error") {}
    	                if(returncode == 0 && returncode != undefined){  
                         // alert(fldTxnId+">>>>>>>>>>>>>");  	                	
    	                	$("#rscip03success").show();
						    $("#successmsg").html(msg);
    	                	
    	                }else{    	                	
    	                	$("#rscip03success").hide();
    	                }
    	                
    	                if(errormessage != ''){
    	                	$(".rcErrorMsg").show();
    	                	$(".rcErrorMsg").html(errormessage);
    	                
    	                }
    	                if(fldRsaAuthResponse == 'FAILURE' || fldOOBPhoneStatus == 'FAILURE'){
    	                	$(".rsaAuthFailure").show();
							$("#rscip03success").hide();    	                	
    	                }
    	                
    	                if(fldOOBPhoneStatus == 'TIMEOUT' || fldOOBPhoneStatus == 'RETRY'){
    	                	$(".rsaOOBErr").show();    	                	
    	                }
    	                
    	                if(fldrsatxnstatus == 'ERROR'){
    	                	fldrsatxnerrdesc = rsastmtdata.response.fldRsaTxnErrDesc;
    	                	$(".rsaTxnStatus").show();
    	                	$(".rsaTxnStatus p").html(fldrsatxnerrdesc);
    	                }
    	                
    	               
						
        			
    	                ko.applyBindings(self, $(".dynamic-page-content").get(0));
        			});  
				   
               }
			   else if(fldTxnId=="DPI"){
				     //alert(fldTxnId+">>>>>>>>>>>>>"); 
					 
					 
					    //alert(invocationResult.faml.response.errormessage);
						
						 returncode=invocationResult.faml.response.rc.returncode;
					
					
						msg=invocationResult.faml.response.errormessage;
					 
					  $("#contentData").load("Views/Debit/rsdpi03.html", null, function (response, status, xhr) {
    	                if (status != "error") {}
						
				
						
    	                if(returncode == 0  && returncode != undefined){    	                	
    	                	$("#rsdpi03success").show();
							 $("#successmsgo").html(msg);
    	                	
    	                }else{    	                	
    	                	$("#rsdpi03success").hide();
    	                }
    	                try{
							if(errormessage != ''){
								$(".rcErrorMsg").show();
								$(".rcErrorMsg").html(errormessage);
							}
						}catch(e){}
    	                
    	                if(fldRsaAuthResponse == 'FAILURE' || fldOOBPhoneStatus == 'FAILURE'){
    	                	$(".rsaAuthFailure").show();
							$("#rsdpi03success").hide();    	                	
    	                }
    	                
    	                if(fldOOBPhoneStatus == 'TIMEOUT' || fldOOBPhoneStatus == 'RETRY'){
    	                	$(".rsaOOBErr").show();    	                	
    	                }
    	                
    	                if(fldrsatxnstatus == 'ERROR'){
    	                	fldrsatxnerrdesc = rsastmtdata.response.fldRsaTxnErrDesc;
    	                	$(".rsaTxnStatus").show();
    	                	$(".rsaTxnStatus p").html(fldrsatxnerrdesc);
    	                }
    	                
    	                
        			
    	                ko.applyBindings(self, $(".dynamic-page-content").get(0));
        			});  
				   
               }
			   	
        	}
        	busyInd.hide();
        });
        
        // View RTGS Funds Transfer
        this.get("#rrtpv01",function() {  
        MyParentPage="#rrftr01";
        	$(".h_title").html("View RTGS Funds Transfer");
        	self.commonData();
        	loadViewModel("rrtpv01");        	         
        });
        this.get("#rrtpv02",function() {  
        	$(".h_title").html("View RTGS Funds Transfer");
        	self.commonData();
        	loadViewModel("rrtpv02");        	         
        });
        
        
        // Visa Money Transfer
        this.get("#rrvmt01",function() {  
        MyParentPage="#rrftr01";
        	$(".h_title").html("VISA CardPay");
        	self.commonData();
        	loadViewModel("rrvmt01");        	         
        });
        this.get("#rrvmt02",function() {  
        	$(".h_title").html("VISA CardPay");
        	self.commonData();
        	loadViewModel("rrvmt02");        	         
        });
        
        //change question answer
        
        this.get("#rrcpq01",function() { 
        	MyParentPage="#others"; 
        	$(".h_title").html("Change Questions Answers");
        	self.commonData();
        	loadViewModel("rrcpq01");        	         
        });
        
        // view imps fund transfer
        this.get("#rrvft01",function() {  
    MyParentPage="#rrftr01";
        	$(".h_title").html("View IMPS Funds Transfer");
        	self.commonData();
        	loadViewModel("rrvft01");        	         
        });
        this.get("#rrvft02",function() {  
        	$(".h_title").html("View IMPS Funds Transfer");
        	self.commonData();
        	loadViewModel("rrvft02");        	         
        });
        this.get("#rrvft03",function() {  
        	$(".h_title").html("View IMPS Funds Transfer");
        	self.commonData();
        	loadViewModel("rrvft03");        	         
        });
	this.get("#rrtpa01",function() {  
	    MyParentPage="#Addbeni";
        	$(".h_title").html("Add Beneficiary Within Bank");
        	self.commonData();
        	loadViewModel("rrtpa01");        	         
        });
		this.get("#rrtpa02",function() {  
		    MyParentPage="#Addbeni";
        	$(".h_title").html("Add Beneficiary Within Bank");
        	self.commonData();
        	loadViewModel("rrtpa02");        	         
        });
		this.get("#rrtpa04",function() {  
		       MyParentPage="#Addbeni";
        	$(".h_title").html("Add Beneficiary NEFT/IMPS");
        	self.commonData();
        	loadViewModel("rrtpa04");        	         
        });
		
		this.get("#rrtpa06",function() {  
		    MyParentPage="#Addbeni";
        	$(".h_title").html("Add Beneficiary NEFT/IMPS");
        	self.commonData();
        	loadViewModel("rrtpa06");        	         
        });
		
		this.get("#Addbeni",function() {  
		MyParentPage="#rrftr01";
        	$(".h_title").html("Add Beneficiary");
        	self.commonData();
        	loadViewModel("Addbeni");
        });
        /* End - TPT section */
        
        /* Mutual Fund   */
        this.get("#rrash02",function() {        	
        	self.commonData();
            //$(".h_title").html("Mutual Funds");
            loadViewModel("rrash02");
        });
        this.get("#rrwcm01",function() {        	
	MyParentPage="#rrwcm01";
        	self.commonData();
            $(".h_title").html("Mutual Funds ");
            loadViewModel("rrwcm01");
       	   // loadXMLDoc();
            if(cbannerForMF!=""){
          		$('#cpCnt').html(cbannerForMF);	
             }
            else{
          	  loadXMLDoc();
            }
       	    if(cpBanner!='' && cpbannerclose7!='adcloseMF'){
    	        var menu = $(".menu");	
                
                if (navigator.onLine && cpBanner!='' && cbannerForMF!='') {
						$('.ad_banner').show();
    			        $('#cpCnt').html(cbannerForMF);    				
					} else {
						$('.ad_banner').hide();
					}				
    				
    			var conveniancecount = $("div[id*='bannerHtml']").length;if(conveniancecount > 1){bannerHeight = $('#bannerHtml').height()+100;}else{bannerHeight = $('#bannerHtml').height()+100;}				
    			menu.animate({top: bannerHeight + 'px'},2000);		
    	   }
   		  //alert("main menu"+cpbannerclose);
 		    if( cpbannerclose7=="adcloseMF"){		 
 				$('.ad_banner').hide();
 				var menu = $(".menu");
 				menu.animate({top: '96px'},2000);
 		    }
        });
        
        this.get("#mfaccountSummary",function() {     
        MyParentPage="#rrwcm01";   	
        	self.commonData();
            $(".h_title").html("Account Summary ");
            loadViewModel("mfaccountSummary");
        });
        this.get("#rrvpr01",function() {  
        MyParentPage="#rrwcm01";      	
        	self.commonData();
            $(".h_title").html("Unit Holding Statement ");
            loadViewModel("rrvpr01");
        });
       
        this.get("#rrost01",function() {   
        MyParentPage="#rrwcm01";     	
        	self.commonData();
            $(".h_title").html("Order Status ");
            loadViewModel("rrost01");
        });
        
                this.get("#rrobu01",function() {  
                MyParentPage="#rrwcm01";      	
        	self.commonData();
            $(".h_title").html("Purchase ");
            loadViewModel("rrobu01");
        });
                
        this.get("#rrobu02",function() {  
            self.commonData();
            $(".h_title").html("Purchase");           
        });
        this.get("#rrobu03",function() {  
            self.commonData();
            $(".h_title").html("Purchase");           
        });
        this.get("#rrobu04",function() {  
            self.commonData();
            $(".h_title").html("Purchase");           
        });

        this.get("#rrore01",function() {
        MyParentPage="#rrwcm01";        	
        	self.commonData();
            $(".h_title").html("Redeem");
            loadViewModel("rrore01");
        });
        
        this.get("#rrore02",function() {
        	self.commonData();
            $(".h_title").html("Redeem");            
        });
        this.get("#rrore03",function() {
        	self.commonData();
            $(".h_title").html("Redeem");            
        });
        this.get("#rrore04",function() {
        	self.commonData();
            $(".h_title").html("Redeem");            
        });
        
        this.get("#rripb01",function() {   
        MyParentPage="#rrwcm01";     	
        	self.commonData();
            $(".h_title").html("New fund Offer ");
            loadViewModel("rripb01");
        });
        this.get("#rripb02",function() {        	
        	self.commonData();
            $(".h_title").html("New fund Offer ");
            loadViewModel("rripb02");
        });
        this.get("#rripb03",function() {        	
        	self.commonData();
            $(".h_title").html("New fund Offer ");
            loadViewModel("rripb03");
        });
        this.get("#rrosw01",function() {   
        MyParentPage="#rrwcm01";     	
        	self.commonData();
            $(".h_title").html("Switch");
            loadViewModel("rrosw01");
        });
        this.get("#rrosw02",function() {        	
        	self.commonData();
            $(".h_title").html("Switch");
            loadViewModel("rrosw02");
        });
        this.get("#rrosw04",function() {        	
        	self.commonData();
            $(".h_title").html("Switch");
            loadViewModel("rrosw04");
        });
        this.get("#rrosw05",function() {        	
        	self.commonData();
            $(".h_title").html("Switch");
            loadViewModel("rrosw05");
        });
        /* Mutual Fund  */
        this.get("#rrstp01",function() {   
        MyParentPage="#rrwcm01";     	
        	self.commonData();
            $(".h_title").html("Systematic Transfer");
            loadViewModel("rrstp01");
        });
		
		this.get("#rrstp04",function() {        	
        	self.commonData();
            $(".h_title").html("Systematic Transfer");
            loadViewModel("rrstp04");
        });
		this.get("#rrstp08",function() {        	
        	self.commonData();
            $(".h_title").html("Systematic Transfer");
            loadViewModel("rrstp08");
        });
		//Vishal Change for OpenFD
		this.get("#rrfdr02",function() {  
		MyParentPage="#rrasm01";
			self.commonData();
			$(".h_title").html("Open Fixed Deposit < 5 Cr");
			loadViewModel("rrfdr02");    
			 
		});
		this.get("#rrfdr03",function() {  
			self.commonData();
			$(".h_title").html("Open Fixed Deposit < 5 Cr");
			loadViewModel("rrfdr03");    
			 
		});
//for mobile recharge
		this.get("#billpayment",function() {
			   MyParentPage="#billpayment";
	        	self.commonData();
	        	loadViewModel("billpayment");
	        	//loadXMLDoc();
	        	$(".h_title").html("Bill Payment");
	        	//alert("banner"+cpbannerclose3);
	        	 //alert(cbannerForBill);
	        	 if(cbannerForBill!=""){
	        		$('#cpCnt').html(cbannerForBill);	
	        	 }
	        	 else{
	            	  loadXMLDoc();
	              }
	        	
        	    if(cpBanner!='' && cpbannerclose3!='adcloseBill'){
		   	        var menu = $(".menu");	
                     if (navigator.onLine && cpBanner!='' && cbannerForBill!='') {
						 $('.ad_banner').show();
		   			     $('#cpCnt').html(cbannerForBill);       				
					} else {
						$('.ad_banner').hide();
					}					
		   				
		   			var conveniancecount = $("div[id*='bannerHtml']").length;if(conveniancecount > 1){bannerHeight = $('#bannerHtml').height()+100;}else{bannerHeight = $('#bannerHtml').height()+100;}				
		   			menu.animate({top: bannerHeight + 'px'},2000);		
       	       }
      		   //alert("main menu"+cpbannerclose);
    		    if( cpbannerclose3=="adcloseBill"){		 
    				$('.ad_banner').hide();
    				var menu = $(".menu");
    				menu.animate({top: '96px'},2000);
    		    }
	        	
	        });
		this.get("#rrdth01",function() {
			MyParentPage="#billpayment";
	        	self.commonData();
	        	$(".h_title").html("DTH Recharge");
	        	loadViewModel("rrdth01");
	        });
		this.get("#rrpmb01",function() {
			MyParentPage="#billpayment";
	        	self.commonData();
	        	$(".h_title").html("Prepaid Mobile Recharge");
	        	loadViewModel("rrpmb01");
	        });
		this.get("#rrpmb02",function() {
			MyParentPage="#billpayment";
	        	self.commonData();
	        	$(".h_title").html("Prepaid Mobile Recharge");
	        	loadViewModel("rrpmb02");
	        });
	      
	      
	      
	      	this.get("#rrpmb03",function() {
			MyParentPage="#billpayment";
	        	self.commonData();
	        	$(".h_title").html("Prepaid Mobile Recharge");
	        	loadViewModel("rrpmb03");
	        });
		
		this.get("#rrpmb04",function() {
			MyParentPage="#billpayment";
	        	self.commonData();
	        	$(".h_title").html("Prepaid Mobile Recharge");
	        	loadViewModel("rrpmb04");
	        });

		
		this.get("#rrdth02",function() {
			MyParentPage="#billpayment";
	        	self.commonData();
	        	$(".h_title").html("DTH Recharge");
	        	loadViewModel("rrdth02");
	        });
		this.get("#rrdth03",function() {
			MyParentPage="#billpayment";
	        	self.commonData();
	        	$(".h_title").html("DTH Recharge");
	        	loadViewModel("rrdth03");
	        });
		this.get("#rrdth04",function() {
			MyParentPage="#billpayment";
	        	self.commonData();
	        	$(".h_title").html("DTH Recharge");
	        	loadViewModel("rrdth04");
	        });
		this.get("#rdthr01",function() {
			MyParentPage="#billpayment";
	        	self.commonData();
	        	$(".h_title").html("DTH Registration");
	        	loadViewModel("rdthr01");
	        });
		this.get("#rdthr02",function() {
			MyParentPage="#billpayment";
	        	self.commonData();
	        	$(".h_title").html("DTH Registration");
	        	loadViewModel("rdthr02");
	        });
		this.get("#rdthr03",function() {
			MyParentPage="#billpayment";
	        	self.commonData();
	        	$(".h_title").html("DTH Registration");
	        	loadViewModel("rdthr03");
	        });
		
		this.get("#rrmr01",function() {
			MyParentPage="#billpayment";
	        	self.commonData();
	        	$(".h_title").html("Mobile Registration");
	        	loadViewModel("rrmr01");
	        });
		
		this.get("#rrmr02",function() {
			MyParentPage="#billpayment";
	        	self.commonData();
	        	$(".h_title").html("Mobile Registration");
	        	loadViewModel("rrmr02");
	        });
		
		this.get("#rrmr03",function() {
			MyParentPage="#billpayment";
	        	self.commonData();
	        	$(".h_title").html("Mobile Registration");
	        	loadViewModel("rrmr03");
	        });
		this.get("#rrcrs01",function() {
			MyParentPage="#billpayment";
	        	self.commonData();
	        	$(".h_title").html("Check Recharge Status");
	        	loadViewModel("rrcrs01");
	        });
		
		this.get("#rrcrs02",function() {
			MyParentPage="#billpayment";
	        	self.commonData();
	        	$(".h_title").html("Check Recharge Status");
	        	loadViewModel("rrcrs02");
	        });
	        
	        
		

//Vishal Change for OpenFD end
		this.get("#rrp2a01",function() { 
		MyParentPage="#rrftr01";
			$(".h_title").html("IMPS - IFSC Code & A/c No.");
        	self.commonData();
        	loadViewModel("rrp2a01");
        });
		this.get("#rrp2a02",function() {  
        	$(".h_title").html("IMPS - IFSC Code & A/c No.");
        	self.commonData();
        	loadViewModel("rrp2a02");
        });
		
		this.get("#applyNow",function() {  
	     	 	MyParentPage="#menu";
			applicationFormForCredit=0;
        	self.commonData();
            $(".h_title").html("Apply Now");
            loadViewModel("applyNow");
            $.getJSON("http://hdfcanalytics.snapworkapps.com/sectionclicks.html?deviceid="+menuUdid+"&page=ApplyNow&ptype=Android",function(data) {});
            
        });
	this.get("#applicationForm",function() {  
	     	MyParentPage="#applyNow";
        	self.commonData();
            $(".h_title").html("Getting Started");
            loadViewModel("applicationForm");
           
            
        });
		this.get("#existingCustomer",function() {  
		
	        loggedinuser = false;
			applicationFormForCredit=1;
        	MyParentPage="#applicationForm";
        	self.commonData();
        	userSecureImg("");
			secureText("");
			$(".h_title").html("Login");
		    loadViewModel("existingCustomer");
            
            
        });
		this.get("#offers",function(){  
		
		
        	self.commonData();
            $(".h_title").html("Locate Offers");
            loadViewModel("offers");
            $.getJSON("http://hdfcanalytics.snapworkapps.com/sectionclicks.html?deviceid="+menuUdid+"&page=ApplyNow&ptype=Android",function(data) {});
            
        });
		
		this.get("#settings",function(){  
		
		
        	self.commonData();
            $(".h_title").html("Notification Settings");
            loadViewModel("settings");
            $.getJSON("http://hdfcanalytics.snapworkapps.com/sectionclicks.html?deviceid="+menuUdid+"&page=ApplyNow&ptype=Android",function(data) {});
            
        });
		
        this.get("#messageCentre",function() {
		    notificationmsgs.removeAll();
            $.getJSON("http://hdfcanalytics.snapworkapps.com/sectionclicks.html?deviceid="+menuUdid+"&page=MessageCenter&ptype=Android",function(data) {});
        	$(".h_title").html("Message Centre");
        	self.commonData();
        	//New call

			//callnotification();
			try{
			
						
						var json = hdfc_android.getJsonString();
						var obj = JSON.parse(json);
						hdfcnotification=obj.data.message;
						buttontext=obj.data.buttonText;
						template=obj.data.template;
						temp = hdfcnotification+"##"+buttontext+"##"+template+"@";
						
						
						
						if(localStorage.getItem('Notification') == null){
						
							notificationmsg.push(temp);
							//alert("notificationmsg length after "+notificationmsg.length);
							localStorage.setItem('Notification',notificationmsg);
						
											for(i=0 ; i < notificationmsg.length; i++){
												temp = notificationmsg[i];
												temp1 = temp.split('##');
											    msg = temp.split('##')[0];
										        buttonname = temp.split('##')[1];
											
												hash =  temp.split('##')[2];
											
												if(buttonname.indexOf(',')!= -1 || hash.indexOf(',')!= -1){
												 buttonno="two";
												     
												 action1=buttonname.split(",")[0];
												 action2=buttonname.split(",")[1];
												 hash1=hash.split(",")[0];
												 hash2=hash.split(",")[1];
												 
												}
												else{
											
												   buttonno="one";
												   buttonname =  temp.split('##')[1];
												   hash = temp.split('##')[2];
												   action1="";
												   action2="";
												  hash1="";
												 hash2="";
												}
										if(notificationmsgs().length == 10){
												
												notificationmsgs.splice(0,1);
										}
                                        if(msg != 'undefined'){									
				                        notificationmsgs.push({ Msg: msg, btntext:buttonname, 
										HASH:hash,action1:action1,action2:action2,buttonno:buttonno,hash1:hash1,hash2:hash2});	
										}
									}
                               
						}
						//for more notifications
						else
						{ 	
						 notificationmsg = [];
						  notificationmsg.push(localStorage.getItem('Notification'));
						
							notificationmsg = notificationmsg[0].split('@,');
							var test = [];
							for(i=0; i< notificationmsg.length; i++){ temp1 = notificationmsg[i]+"@"; test.push(temp1);}
							
						
							test.push(temp);
							
							localStorage.setItem('Notification',test);
							
										for(i=0 ; i < test.length; i++){
												temp = test[i];
												temp1 = temp.split('##');
											    msg = temp.split('##')[0];
										        buttonname =  temp.split('##')[1];
												hash =  temp.split('##')[2];
											
												if(buttonname.indexOf(',')!= -1||hash.indexOf(',')!= -1){
											
												 buttonno="two";
												 action1=buttonname.split(",")[0];
												 action2=buttonname.split(",")[1];
												 hash1=hash.split(",")[0];
												 hash2=hash.split(",")[1];
												}
												else{
											
												   buttonno="one";
												   buttonname =  temp.split('##')[1];
												   hash = temp.split('##')[2];
											
												   action1="";
												   action2="";
												   hash1="";
												   hash2="";
												}
									    if(notificationmsgs().length == 10){
												
												notificationmsgs.splice(0,1);
										}			
										if(msg != 'undefined'){	
				                        notificationmsgs.push({ Msg: msg, btntext:buttonname, 
										HASH:hash,action1:action1,action2:action2,buttonno:buttonno,hash1:hash1,hash2:hash2});	
										}
											}

							

						}
						
						console.log("Length in my message center2 "+self.msgCentreList().length);
			}
			//from local notifications
			catch(e){
		
			if(localStorage.getItem('Notification')!=null){
			      
				  notificationmsg = [];
				
				  notificationmsg.push(localStorage.getItem('Notification'));
			
					notificationmsg = notificationmsg[0].split('@,');
				
				for(i=0 ; i < notificationmsg.length; i++){
				
												temp = notificationmsg[i];
												
												temp1 = temp.split('##');
											    msg = temp.split('##')[0];
										        buttonname =  temp.split('##')[1];
												hash =  temp.split('##')[2];
												
										
												if(buttonname.indexOf(',')!= -1||hash.indexOf(',')!= -1){
											 
												 buttonno="two";
												 action1=buttonname.split(",")[0];
												 action2=buttonname.split(",")[1];
												 hash1=hash.split(",")[0];
												 hash2=hash.split(",")[1];
												}
												else{
											
												 buttonno="one";
												 buttonname =  temp.split('##')[1];
												 hash = temp.split('##')[2];
												 action1="";
												 action2="";
												 hash1="";
												 hash2="";
												}
										if(notificationmsgs().length == 10){
												
												notificationmsgs.splice(0,1);
										}
										if(msg != 'undefined'){
				                        notificationmsgs.push({ Msg: msg, btntext:buttonname, 
										HASH:hash,action1:action1,action2:action2,buttonno:buttonno,hash1:hash1,hash2:hash2});
                                        }										
										
											}
											
										}
                                      
			
		    }
	
        	$("#contentData").load("Views/Menu/messageCentre.html", null, function (response, status, xhr) {
                if (status != "error") {}

        	//userid = window.localStorage["chkSumd"];
			
			
        	//busyInd.show();
		  
	
			if(notificationmsgs().length > 0){
			    $(".errMSAn").hide();
				$(".calRowWp").show();
			}
			else{
			    $(".errMSAn").show();
				$(".calRowWp").hide();
			}
			ko.applyBindings(self, $(".dynamic-page-content").get(0));  
		    busyInd.hide();
		
                                   //console.log('Inside user id  .....'+userid+"   e    ");
        	//if(window.localStorage["reguserid_"+Ntcp(userid)] != '' && window.localStorage["reguserid_"+Ntcp(userid)] != null && window.localStorage["reguserid_"+Ntcp(userid)] != undefined){
                                   //url='https://hdfc.snapworkapps.com/hdfcbankapi/notificationlist.jsp?CustomerId='+NtcpD(userid)+'&readmsgid='+msgidz
                                   url='http://hdfc.snapworkapps.com/hdfcbankapi/notificationlist.jsp?CustomerId='+NtcpD(messauid)+'&readmsgid=';

            if(window.localStorage["messauid"]!='' && window.localStorage["messauid"]!=undefined){
			 console.log("Length in my message center4 "+self.msgCentreList().length); 
                                 if(window.localStorage["campid"] != '' && window.localStorage["campid"] != null){
                                    url='http://hdfc.snapworkapps.com/hdfcbankapi/notificationlist.jsp?CustomerId='+NtcpD(window.localStorage["messauid"])+'&readmsgid='+window.localStorage["campid"];
                                 }else {
                                    url='http://hdfc.snapworkapps.com/hdfcbankapi/notificationlist.jsp?CustomerId='+NtcpD(window.localStorage["messauid"])+'&readmsgid=';

                                 }
                               //  console.log('Message center url1  '+url);
				$.ajax( {
    				url:url,
    				dataType: 'xml',
    	            success:function(data) {
    	            	//alert((new XMLSerializer()).serializeToString(data));
    	            	self.msgCentreList.removeAll();

    	            	//data = '<Message-center><Record><CAMPAIGN_ID>501</CAMPAIGN_ID><CAMPAIGN_NAME>20140604</CAMPAIGN_NAME><CAMPAIGN_DESC>12:52</CAMPAIGN_DESC><TRACK_DATE>2014-07-04 12:53:17.0</TRACK_DATE><TRACK_DD>04</TRACK_DD><TRACK_MON>JUL</TRACK_MON><TRACK_YYYY>2014</TRACK_YYYY></Record></Message-center>';
                        window.localStorage["campid"] = $(data).find('Message-center TRACKID:first').text();
						try{
								$('Record', data).each(function() {
										campid = $(this).find('CAMPAIGN_ID').text();
										campname = $(this).find('CAMPAIGN_NAME').text();
										campdesc = $(this).find('CAMPAIGN_DESC').text();
										campday = $(this).find('TRACK_DD').text();
										campmonth = $(this).find('TRACK_MON').text();
										//window.localStorage["campid"] =  $(this).find('CAMPAIGN_ID:first').text();
										self.msgCentreList.push({ campid: campid, campname: campname, campdesc: campdesc, campday: campday, campmonth: campmonth });

								});
							   // console.log('Message center read count for fisst time '+window.localStorage["campid"]);
							   console.log("Length in my message center "+self.msgCentreList().length); 
								if(self.msgCentreList().length > 0){
								     console.log("Enter into message list");
									$(".calRowWrap").show();
									$(".errMS").hide();
								
								}else{
									$(".calRowWrap").hide();
									$(".errMS").show();
								}
								
						}catch(e){
						         console.log("Enter into message list");
								 self.msgCentreList.push({}); 
						}
    	            	
                             
		            
    	             }
    	          });
        		 
        	}else{
                busyInd.hide();
				$(".calRowWrap").hide();
				
			    // alert("else    "+localStorage.getItem('Notification'));
			    // if(localStorage.getItem('Notification')!=null){
				    // $(".errMS").hide();
					// ko.applyBindings(self, $(".dynamic-page-content").get(0));  
		           // busyInd.hide();
				// }
				// else{
				    // $(".errMS").show();
					// ko.applyBindings(self, $(".dynamic-page-content").get(0));  
		            // busyInd.hide();
				// }
		
        	}
        	        
            });
			
            busyInd.hide();  
        });
		
    }).run("#menu");
}

//ko.applyBindings(new hdfcViewModel());
hdfcModel = new hdfcViewModel();
ko.applyBindings(hdfcModel); 
$(window).on('hashchange', function() {
 $('body').css('height',100+'%');
	//$('body').css('height','auto');

});