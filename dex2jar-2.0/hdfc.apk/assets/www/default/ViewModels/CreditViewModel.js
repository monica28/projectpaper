
var CreditViewModel = function () {

    var self = this;
    
    self.SelectVisible = ko.observable(true);   
    self.SelectVisibleFlag = ko.observable(true); 
    self.selAccountcc = ko.observable();
    self.curraccbalval = ko.observable("0.0");
   CrtAccountList1 =  ko.observableArray([]);
    
    this.getCreditSummary = function(){
    	
   
	    	reqParams = {};
	
	    	reqParams["fldDeviceId"] = fldDeviceId;
	    	reqParams["fldWebServerId"] = fldWebServerId;
	    	reqParams["fldAppId"] = fldAppId;
	    	reqParams["fldAppServerId"] = fldAppServerId;
	    	reqParams["fldLangId"] = fldLangId;
	    	reqParams["fldModule"] = fldModule;
	    	reqParams["fldSwitchAppId"] = "";
	    	reqParams["fldModule"] = "CH";
	    	reqParams["fldTxnId"] = "ACS";
	    	reqParams["fldLogoffReq"] = "N";
	    	reqParams["fldAmcId"] = "ALL";
		    reqParams["fldMeapPCIDSSFlag"] = "true";
	    	reqParams["fldRoleId"] = "";
	    	reqParams["fldReportDate"] =getCurrdate();
	    	
	    	reqParams["fldScrnSeqNbr"] = "01";
	    	
	    	reqParams["fldRequestId"] =RegfldRequestId;

	    	fldjsessionid = Regfldjsessionid;
	    	reqParams["fldLoginUserId"] =Regloginuid;
	    	reqParams["fldSessionId"] = Rsessionid;
	    	
	    	
	    	busyInd.show();
	    	var invocationData = {
	    			adapter : "CreditCard",
	        		procedure : "RRACS01",
	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	    	};
	    	
	    	WL.Client.invokeProcedure(invocationData, {
	    		onSuccess : creditSuccess,
	    		onFailure : AdapterFail,	    		
	    		timeout: timeout
	    	});
	    	
	    	if(window.location.hash == '#ccaccountSummary'){
	    		templateId = "ccaccountSummary";
	    	}else{
	    		templateId = "rracs01";
	    	}
	    	
	    	$("#contentData").load("Views/Credit/"+templateId+".html", null, function (response, status, xhr) {
	            if (status != "error") {}
	            ko.applyBindings(self, $(".dynamic-page-content").get(0));     
	    	
	            
	            
	                
	    	});
    	
    };
    
   
       creditSuccess = function(result){
    	
    	invocationResult = result.invocationResult;
    	busyInd.hide();
    	//$("#contentData").load("Views/Credit/rracs01.html", null, function (response, status, xhr) {
           // if (status != "error") {}
          	if(invocationResult.isSuccessful) {
        		if(invocationResult.faml.response){	
        	
        			
        		if(invocationResult.faml.response.rc.returncode == 0){
        			cardcount=invocationResult.faml.response.ccacctlist.ccacctdetails;
        			totAccount=cardcount.length;
        			//alert(totAccount);
        			if(cardcount)
    	    			accSlider(true);
    	    		else
    	    			accSlider(false);
    	    		
        			ccaccountList.removeAll();
        			ccaccountList1.removeAll();
    	    		var idx = 1;
    	    		$(cardcount).each(function(index, obj) {
    	    		
    	    			strid = "item"+idx;
    	    			custnames = "";
    	    			
    	    		
    	    			
    	    			
    	    			if(window.location.hash == '#rrasm01'){
    	    				acctbalance = formatAmt(parseFloat(obj.availcreditlimit));
    	    			}else{
    	    				acctbalance = formatAmt(parseFloat(obj.availcreditlimit));
    	    			}
    	    			//alert(obj.cardno);
			    ccaccountvalue=obj.cardno+"#"+obj.cardaanno;
    	    		    ccaccountList.push({codacctno: obj.cardno, logodesc: obj.logodesc, cardaanno:obj.cardaanno,acctbalance: acctbalance, totalcreditlimit:formatAmt(parseFloat(obj.totalcreditlimit)) , availcreditlimit: formatAmt(parseFloat(obj.availcreditlimit)), availcashlimit: formatAmt(parseFloat(obj.availcashlimit)), strid:strid,cardNo: obj.cardno,ccaccountvalue:ccaccountvalue});
    	    		    idx++;
    	    		});
    	    		
    	    		
    	    		
    	    		if(window.location.hash == '#rrasm01'){
    		    		if(cardcount){
    		    			$("#accExitsMsg").hide();
    		    			//$("#wrapper").css("top","110px");
    		    		}else{
    		    			$("#accExitsMsg").show();
    		    			//$("#wrapper").css("top","96px");
    		    		}
    	    		}else{
    	    			if(cardcount){
    		    			$("#accExitsMsg").hide();		    			
    		    		}else{
    		    			$("#accExitsMsg").show();		    			
    		    		}
    	    		}
    	    		
    	    		if(ccaccountList().length > 0 && window.location.hash == '#rracs01'){
    	    			$('.autoslide-slider3').iosSlider({
    		    			desktopClickDrag: true,
    		    			snapToChildren: true,
    		    			infiniteSlider: false,
    		    			autoSlide: false,
    		    			/*scrollbar: true,
    		    			autoSlideTransTimer: 0,*/
    		    			onSlideComplete: slideComplete,
    		    			navNextSelector: $('.autoslide-slider3 .next'),
    		    			navPrevSelector: $('.autoslide-slider3 .prev')
    		    		});
    	    		}
    	    		
        			}else{
        				errmsg = invocationResult.faml.response.rc.errormessage;
        				//self.error(true); 
        				//self.errormsg = ko.observable("ATM / Debit Card Hotlisting – Failure"+errmsg);
      
        				handleError(invocationResult.faml.response);
        				 window.location =  '#rrasm01';
        			}
        		
        	}else{
				handleErrorNoResponse();
			}
        	}
            
            //ko.applyBindings(self, $(".dynamic-page-content").get(0));
    	//});
          
  
    };

   

/**************Credit Card De-register**********************/
this.callrrcdc01 = function(){
	
	
	reqParams = {};

	reqParams["fldDeviceId"] = fldDeviceId;
	reqParams["fldWebServerId"] = fldWebServerId;
	reqParams["fldAppId"] = fldAppId;
	reqParams["fldAppServerId"] = fldAppServerId;
	reqParams["fldLangId"] = fldLangId;
	reqParams["fldModule"] = fldModule;
	reqParams["fldSwitchAppId"] = "";
	reqParams["fldModule"] = "CH";
	reqParams["fldTxnId"] = "CDC";
	reqParams["fldLogoffReq"] = "N";
	reqParams["fldAmcId"] = "ALL";
	reqParams["fldRoleId"] = "";
	reqParams["fldReportDate"] = getCurrdate();
	reqParams["fldMeapPCIDSSFlag"] = "true";
	reqParams["fldCardNo"] = "";
	reqParams["fldScrnSeqNbr"] = "01";
	
	
	reqParams["fldRequestId"] =RegfldRequestId;

	fldjsessionid = Regfldjsessionid;
	reqParams["fldLoginUserId"] =Regloginuid;
	reqParams["fldSessionId"] = Rsessionid;
	
	busyInd.show();
	var invocationData = {
			adapter : "CreditCard",
    		procedure : "RRCDC01",
    		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	};
	
	WL.Client.invokeProcedure(invocationData, {
		onSuccess : loadrrcdc01,
		onFailure : AdapterFail,	    		
		timeout: timeout
	});
	
	
	if(window.location.hash == '#rrcdc01'){
		templateId = "rrcdc01";
	}else{
		templateId = "rrcdc01";
	}
	
	
	
};

loadrrcdc01 = function(result){

busyInd.hide();
invocationResult = result.invocationResult;
if(invocationResult.isSuccessful) {
	if(invocationResult.faml.response){	
	if(invocationResult.faml.response.rc.returncode == 0){
		
		$("#contentData").load("Views/Credit/"+templateId+".html", null, function (response, status, xhr) {
	        if (status != "error") {}
	        
	        if(window.location.hash == "#rrcdc01"){
				
				cardcount=invocationResult.faml.response.carddtls;
				totAccount=cardcount.length;
			
				if(totAccount > 0)
				{$('#ErrMsg').hide();}
			else{
				$('#ErrMsg').show();
			}
				ccaccountList1.removeAll();
	    	    $(cardcount).each(function(index, obj) {
				
				ccvalue=obj.fldCardNo+"#"+obj.cardaanno;
	    		ccaccountList1.push({ cardNo: obj.fldCardNo,ccvalue:ccvalue});
	    	
	    		});
	    		  
			}
	        
	        ko.applyBindings(self, $(".dynamic-page-content").get(0));     
		
	        
	        
	            
		});
		
		
	}else{
		errmsg = invocationResult.faml.response.rc.errormessage;
		handleError(invocationResult.faml.response);
	}
	}
}
};

self.rrcdc01Submit = function(){
    
	if($("#frmrrcdc01").valid()){
	busyInd.show();        	
	fldLoginUserId = Regloginuid;
	fldFCDBSessionId = RegfldFCDBSessionId;
	fldjsessionid = Regfldjsessionid;
	fldSessionId = Rsessionid;
	
	fldFCDBRequestId = $("#fldFCDBRequestId").val();
	
	fldEntityId = "";    	    	
	

	fldCardNo = $("#fldCardNo").val().split("#")[0];
	fldCardAANNo= $("#fldCardNo").val().split("#")[1];

	reqParams = {};
	
	reqParams["fldDeviceId"] = fldDeviceId;

	reqParams["fldWebServerId"] = fldWebServerId;
	reqParams["fldAppId"] = fldAppId;
	reqParams["fldAppServerId"] = fldAppServerId;
	reqParams["fldLangId"] = fldLangId;
	reqParams["fldModule"] = "CH";
	reqParams["fldTxnId"] = "CDC";
	reqParams["fldMeapPCIDSSFlag"] = "true";
	reqParams["fldScrnSeqNbr"] = "02";
	reqParams["fldCardNo"] = fldCardNo;
	reqParams["fldCardAANNo"] = fldCardAANNo;



	fldjsessionid = Regfldjsessionid;
	reqParams["fldLoginUserId"] =Regloginuid;
	reqParams["fldSessionId"] = Rsessionid;
	
	var invocationData = {
			adapter : "CreditCard",
    		procedure : "RRCDC02",
    		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	};
	
	//WL.Logger.debug(invocationData, '');
	WL.Client.invokeProcedure(invocationData, {
		onSuccess : rrcdc02Response,
		onFailure : AdapterFail,
		timeout: timeout
	});
	}
};   
	rrcdc02Response = function(result){
	    	
	    	busyInd.hide();
	    	invocationResult = result.invocationResult;
	    	if(invocationResult.isSuccessful) {
	    		if(invocationResult.faml.response){	
	    		if(invocationResult.faml.response.rc.returncode == 0){
	    			window.location = "#rrcdc02";
	    			$("#contentData").load("Views/Credit/rrcdc02.html", null, function (response, status, xhr) {
	    	            if (status != "error") {}
	    	            
	    	            $('#fldCardNo').val(invocationResult.faml.response.fldCardNo);
                       $('#fldCardAANNo').val(invocationResult.faml.response.fldCardAANNo);
	    	            $('#DcardNum').html(invocationResult.faml.response.fldCardNo);
	    	            ko.applyBindings(self, $(".dynamic-page-content").get(0));
	    	    	});
	    			
	    				
	    			}else{
	    			errmsg = invocationResult.faml.response.rc.errormessage;
	    			handleError(invocationResult.faml.response);
	    		}
	    		}else{
					handleErrorNoResponse();
				}
	    	}
	    };
	
	    self.rrcdc02Submit = function(){

	    	
	    	if($("#frmrrcdc02").valid()){
	    	busyInd.show();        	
	    	fldLoginUserId = Regloginuid;
	    	fldFCDBSessionId = RegfldFCDBSessionId;
        	fldjsessionid = Regfldjsessionid;
        	fldSessionId = Rsessionid;
	    	
	    	fldCardNo = $("#DcardNum").text();
	    	
	    	
	    	fldEntityId = "";    	    	

	    	reqParams = {};
	    	
	    	reqParams["fldDeviceId"] = fldDeviceId;

	    	reqParams["fldWebServerId"] = fldWebServerId;
	    	reqParams["fldAppId"] = fldAppId;
	    	reqParams["fldAppServerId"] = fldAppServerId;
		reqParams["fldMeapPCIDSSFlag"] = "true";
	    	reqParams["fldLangId"] = fldLangId;
	    	reqParams["fldModule"] = "CH";
	    	reqParams["fldTxnId"] = "CDC";
	    	reqParams["fldScrnSeqNbr"] = "03";
	    	reqParams["fldCardNo"] =fldCardNo;
                reqParams["fldCardAANNo"] =  $('#fldCardAANNo').val();;
	    	

	    	fldjsessionid = Regfldjsessionid;
	    	reqParams["fldLoginUserId"] =Regloginuid;
	    	reqParams["fldSessionId"] = Rsessionid;
	    	
	    	
	    	var invocationData = {
	    			adapter : "CreditCard",
	        		procedure : "RRCDC03",
	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	    	};
	    	
	    	//WL.Logger.debug(invocationData, '');
	    	WL.Client.invokeProcedure(invocationData, {
	    		onSuccess : rrcdc03Response,
	    		onFailure : AdapterFail,
	    		timeout: timeout
	    	});
	    	}
	    };   
	    	rrcdc03Response = function(result){
	    	    	
	    	    	busyInd.hide();
	    	    	invocationResult = result.invocationResult;
	    	    	if(invocationResult.isSuccessful) {
	    	    		if(invocationResult.faml.response){	
	    	    		if(invocationResult.faml.response.rc.returncode == 0){
	    	    			window.location = "#rrcdc03";
	    	    			$("#contentData").load("Views/Credit/rrcdc03.html", null, function (response, status, xhr) {
	    	    	            if (status != "error") {}
	    	    	        	
	    	    	        	
		    	    			

	    	    	            $('#DcardNum').html(invocationResult.faml.response.fldCardNo);
	    	    	            $('#ErrMsgDiv').hide();
	    	    	            ko.applyBindings(self, $(".dynamic-page-content").get(0));
	    	    	    	});
	    	    			
	    	    				
	    	    			}else{
	    	    			errmsg = invocationResult.faml.response.rc.errormessage;
	    	    			$('#FormSuccess').hide();
	    	    			
	    	    			$('#ErrMsgDiv').show();
	    	    			$('#ErrMsg').html(errmsg);
	    	    			handleError(invocationResult.faml.response);
	    	    		}
	    	    		}else{
	    					handleErrorNoResponse();
	    				}
	    	    	}
	    	    };

/**************Credit Card De-register**********************/

	    	    
/**************Credit Card unbilled txn**********************/
	    	    self.ccunBilled = function(accnodet){
	            	
//	                selectedAccount({ accno: accnodet.codacctno, displaytxt: accnodet.displaytxt, acctbalance: accnodet.acctbalance, fldFCDBRequestId: accnodet.fldFCDBRequestId, acctType: accnodet.acctType });
	                
	                busyInd.show();        	
	            	fldLoginUserId = Regloginuid;
	    	    	fldFCDBSessionId = RegfldFCDBSessionId;
	            	fldjsessionid = Regfldjsessionid;
	            	fldSessionId = Rsessionid;
	    	    	
	    	    	fldFCDBRequestId = $("#fldFCDBRequestId").val();
	    	    	
	    	    	fldEntityId = "";    	    	
	    	    	
	    	     	
	    	    	    	    	
	    	    	reqParams = {};
	    	    

	    	    	
	    	    	reqParams["fldDeviceId"] = fldDeviceId;

	    	    	reqParams["fldWebServerId"] = fldWebServerId;
	    	    	reqParams["fldAppId"] = fldAppId;
	    	    	reqParams["fldAppServerId"] = fldAppServerId;
	    	    	reqParams["fldLangId"] = fldLangId;
	    	     	reqParams["fldModule"] = "CH";
	    	    	reqParams["fldTxnId"] = "UNB";
	    	    	reqParams["fldScrnSeqNbr"] = "02";
	    	    	reqParams["fldCardNo"] = accnodet.codacctno;
	    	    	reqParams["fldCodDrCr"] = "B";
	    	    	reqParams["fldInitialSwitch"] = "I";
	    	    	reqParams["fldLastTxnSeqNo"] = "0";
	    	    	reqParams["acctTemp"] = "1";
	    	    	
	    	  

	    	    	fldjsessionid = Regfldjsessionid;
	    	    	reqParams["fldLoginUserId"] =Regloginuid;
	    	    	reqParams["fldSessionId"] = Rsessionid;
	    	    	var invocationData = {
	    	    			adapter : "CreditCard",
	    	        		procedure : "RRUNB02",
	    	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	    	    	};
	    	    	
	    	    	//WL.Logger.debug(invocationData, '');
	    	    	WL.Client.invokeProcedure(invocationData, {
	    	    		onSuccess : rrunb02Response,
	    	    		onFailure : AdapterFail,
	    	    		timeout: timeout
	    	    	});

	    	    };
	          
	            
	    	    self.ccaccountStmtDetails = function(accnodet){
	            	//alert(accnodet.acctbalance);
	                selectedAccount({ accno: accnodet.codacctno, displaytxt: accnodet.displaytxt, acctbalance: accnodet.acctbalance, fldFCDBRequestId: accnodet.fldFCDBRequestId, acctType: accnodet.acctType,cardaanno:accnodet.cardaanno});
	                randomintstr = parseInt(Math.random()*1000000000, 10);
	                checkState=1;
	                //window.location = "#ccunb";
	                
	                self.viewSelectedccAccountStatement();
	            };
	            
	    	    
	            
	            self.viewSelectedccAccountStatement = function(){
	            	
	            	busyInd.show();
	            	var currAccData = selectedAccount();
	            	
	                fldAcctNo = currAccData.accno;  
                    fldCardAANNo = currAccData.cardaanno;  				
	                curraccbalval = currAccData.acctbalance;
	                acctType =  currAccData.acctType;
	            	fldAcctNo_txt = currAccData.displaytxt;
	            	
	            	
	            	reqParams = {};
	    	    	
	            	reqParams["fldDeviceId"] = fldDeviceId;

	    	    	reqParams["fldWebServerId"] = fldWebServerId;
	    	    	reqParams["fldAppId"] = fldAppId;
	    	    	reqParams["fldAppServerId"] = fldAppServerId;
	    	    	reqParams["fldLangId"] = fldLangId;
	    	    	reqParams["fldModule"] = "CH";
	    	    	reqParams["fldTxnId"] = "UNB";
	    	    	reqParams["fldScrnSeqNbr"] = "02";
					reqParams["fldMeapPCIDSSFlag"] = "true";
	    	    	reqParams["fldCardNo"] = fldAcctNo;
					reqParams["fldCardAANNo"] = fldCardAANNo;
	    	    	reqParams["fldCodDrCr"] = "B";
	    	    	reqParams["fldInitialSwitch"] = "I";
	    	    	reqParams["fldLastTxnSeqNo"] = "0";
	    	    	reqParams["acctTemp"] = "1";
	    	    	
	    	   

	    	    	fldjsessionid = Regfldjsessionid;
	    	    	reqParams["fldLoginUserId"] =Regloginuid;
	    	    	reqParams["fldSessionId"] = Rsessionid;
	    	    	
	    	    	if(fldAcctNo != undefined){
	    		    	var invocationData = {
	    		    			adapter : "CreditCard",
	        	        		procedure : "RRUNB02",
	        	        		parameters : [fldjsessionid,reqParams,ipadd],
	        	        		compressResponse : true
	    		    	};
	    		    	//WL.Logger.debug(invocationData, '');
	    		    	
	    		    	WL.Client.invokeProcedure(invocationData, {
	    		    		onSuccess : rrunbhomeResponse,
	    		    		onFailure : AdapterFail,
	    		    	});
	            	}else{
	            		busyInd.hide();		
	            	}
	    	    	
	    	    	self.selAccountcc(fldAcctNo);

	    	    	self.curraccbalval("Rs. "+curraccbalval);
	    	    	//$("#acctType").html(acctType);
	    	    		    	
	            };
	            
	            
	            
	    	    this.callrrunb01 = function(){
	
	    	    	/*
	    	    	reqParams = {};

	    	    	reqParams["fldDeviceId"] = fldDeviceId;
	    	    	reqParams["fldWebServerId"] = fldWebServerId;
	    	    	reqParams["fldAppId"] = fldAppId;
	    	    	reqParams["fldAppServerId"] = fldAppServerId;
	    	    	reqParams["fldLangId"] = fldLangId;
	    	    	reqParams["fldModule"] = fldModule;
	    	    	reqParams["fldSwitchAppId"] = "";
	    	    	reqParams["fldModule"] = "CH";
	    	    	reqParams["fldTxnId"] = "UNB";
	    	    	reqParams["fldLogoffReq"] = "N";
	    	    	reqParams["fldAmcId"] = "ALL";
	    	    	reqParams["fldRoleId"] = "";
	    	    	reqParams["fldReportDate"] = getCurrdate();
	    	    	reqParams["fldCardNo"] = "";
	    	    	reqParams["fldScrnSeqNbr"] = "01";
	    	    	  	fldjsessionid = Regfldjsessionid;
	    	    	reqParams["fldLoginUserId"] =Regloginuid;
	    	    	reqParams["fldSessionId"] = Rsessionid;
	    	    	
	    	    	
	    	    	busyInd.show();
	    	    	var invocationData = {
	    	    			adapter : "CreditCard",
	    	        		procedure : "RRUNB01",
	    	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	    	    	};
	    	    	
	    	    	WL.Client.invokeProcedure(invocationData, {
	    	    		onSuccess : loadrrunb01,
	    	    		onFailure : AdapterFail,	    		
	    	    		timeout: timeout
	    	    	});
	    	    	*/
	    	    	if(window.location.hash == '#rrunb01'){
	    	    		templateId = "rrunb01";
	    	    	}else{
	    	    		templateId = "rrunb01";
	    	    	}
	    	    	
	    	    	$("#contentData").load("Views/Credit/"+templateId+".html", null, function (response, status, xhr) {
	    	            if (status != "error") {}
	    	            ko.applyBindings(self, $(".dynamic-page-content").get(0));     
	    	    	
	    	            
	    	            
	    	                
	    	    	});
	    	   
	    	    };

	    	    loadrrunb01 = function(result){
	    	    
	    	    busyInd.hide();
	    	    invocationResult = result.invocationResult;
	    	    if(invocationResult.isSuccessful) {
	    	    	if(invocationResult.faml.response){	
	    	    	if(invocationResult.faml.response.rc.returncode == 0){
	    	    		
	    	    		if(window.location.hash == "#rrunb01"){
	    	    			
	    	    			cardcount=invocationResult.faml.response.ccacctlist.ccacctdetails;
	    	    			totAccount=cardcount.length;
	    	    		
	    	    			if(totAccount > 0)
	    	    			{$('#ErrMsg').hide();}
	    	    		else{
	    	    			$('#ErrMsg').show();
	    	    		}
	    	    			ccaccountList1.removeAll();
	    	        	    $(cardcount).each(function(index, obj) {
	    	        		ccaccountList1.push({ cardNo: obj.cardno});
	    	        	
	    	        		});
	    	        		  
	    	    		}
	    	    	}else{
	    	    		errmsg = invocationResult.faml.response.rc.errormessage;
	    	    		handleError(invocationResult.faml.response);
	    	    	}
	    	    	}else{
	    				handleErrorNoResponse();
	    			}
	    	    }
	    	    };

	    	    self.rrunb01Submit = function(){
	    	        
	    	    	if($("#frmrrunb01").valid()){
	    	    	busyInd.show();        	
	    	    	fldLoginUserId = Regloginuid;
	    	    	fldFCDBSessionId = RegfldFCDBSessionId;
	            	fldjsessionid = Regfldjsessionid;
	            	fldSessionId = Rsessionid;
	    	    	
	    	    	fldFCDBRequestId = $("#fldFCDBRequestId").val();
	    	    	
	    	    	fldEntityId = "";    	    	
	    	    	
	    	    	var $form = $("#frmrrunb01");
	    	    	rsaDataArray = $form.serializeArray();    	
	    	    	    	    	
	    	    	reqParams = {};
	    	    	for (var i in rsaDataArray) {
	    	    		reqParams[rsaDataArray[i].name] = rsaDataArray[i].value;
	    	    		
	    	    	}
	    	    	

	    	    
	    	    	var fldCardAANNo=$("#fldCardNo").val().split("#")[1];
		            var fldCardNo=$("#fldCardNo").val().split("#")[0];
	    	    	reqParams["fldDeviceId"] = fldDeviceId;

	    	    	reqParams["fldWebServerId"] = fldWebServerId;
	    	    	reqParams["fldAppId"] = fldAppId;
	    	    	reqParams["fldAppServerId"] = fldAppServerId;
		            reqParams["fldMeapPCIDSSFlag"] = "true";
	    	    	reqParams["fldLangId"] = fldLangId;
	    	     	reqParams["fldModule"] = "CH";
	    	    	reqParams["fldTxnId"] = "UNB";
	    	    	reqParams["fldScrnSeqNbr"] = "02";
		         	reqParams["fldCardAANNo"] = fldCardAANNo;
                    reqParams["fldCardNo"] = fldCardNo;
	    	    	fldjsessionid = Regfldjsessionid;
	    	    	reqParams["fldLoginUserId"] =Regloginuid;
	    	    	reqParams["fldSessionId"] = Rsessionid;

	    	    	var invocationData = {
	    	    			adapter : "CreditCard",
	    	        		procedure : "RRUNB02",
	    	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	    	    	};
	    	    	
	    	    	//WL.Logger.debug(invocationData, '');
	    	    	WL.Client.invokeProcedure(invocationData, {
	    	    		onSuccess : rrunb02Response,
	    	    		onFailure : AdapterFail,
	    	    		timeout: timeout
	    	    	});
	    	    	}
	    	    };   
	    	    rrunb02Response = function(result){
	    	    	    	
	    	    	    	 ccaccountList1.removeAll();
	    	    	    	busyInd.hide();
	    	    	    	invocationResult = result.invocationResult;
	    	    	    	if(invocationResult.isSuccessful) {
	    	    	    		if(invocationResult.faml.response){	
	    	    	    		if(invocationResult.faml.response.rc.returncode == 0){
	    	    	    			window.location = "#rrunb02";
	    	    	    			$("#contentData").load("Views/Credit/rrunb02.html", null, function (response, status, xhr) {
	    	    	    	            if (status != "error") {}
	    	    	        			cardcount=invocationResult.faml.response.txndata.response.txndtls;
	    	    	        			
	    	    	        			totalunbilleddb = invocationResult.faml.response.txndata.response.totalunbilleddb;
	    	    	        			if(typeof(invocationResult.faml.response.txndata.response.totalunbilleddb) == 'object'){
	    	    	        				totalunbilleddb = invocationResult.faml.response.txndata.response.totalunbilleddb[0];
	    	    	        			}
	    	    	        			totalunbilledcr = invocationResult.faml.response.txndata.response.totalunbilledcr;
	    	    	        			if(typeof(invocationResult.faml.response.txndata.response.totalunbilledcr) == 'object'){
	    	    	        				totalunbilledcr = invocationResult.faml.response.txndata.response.totalunbilledcr[0];
	    	    	        			}
	    	    	        			
	    	    	    	            $('#Cardnum').html(invocationResult.faml.response.txndata.request.cardno);
	    	    	    	            $('#TotDeb').html(totalunbilleddb);
	    	    	    	            $('#TotCrd').html(totalunbilledcr);
	    	    	    	           
	    	    	    	    		var idx = 1;
	    	    	    	    		$(cardcount).each(function(index, obj) {
	    	    	    	    		
	    	    	    	    			strid = "item"+idx;
	    	    	    	    			custnames = "";
	    	    	    	    			
	    	    	    	    		
	    	    	    	    			
	    	    	    	    			
	    	    	    	    			if(window.location.hash == '#rrasm01'){
	    	    	    	    				acctbalance = formatAmt(parseFloat(obj.txnamount));
	    	    	    	    			}else{
	    	    	    	    				acctbalance = formatAmt(parseFloat(obj.txnamount));
	    	    	    	    			}
	    	    	    	    			//alert(obj.cardno);
	    	    	    	    		    ccaccountList1.push({transdate: obj.transdate, txndesc: obj.txndesc, txnamount: acctbalance, strid:strid,drcrflag: obj.drcrflag });
	    	    	    	    		    idx++;
	    	    	    	    		});
	    	    	    	    		
	    	    	    	    
	    	    	    	            ko.applyBindings(self, $(".dynamic-page-content").get(0));
	    	    	    	    	});
	    	    	    			
	    	    	    				
	    	    	    			}else{
	    	    	    			errmsg = invocationResult.faml.response.rc.errormessage;
	    	    	    			handleError(invocationResult.faml.response);
	    	    	    		}
	    	    	    		}else{
	    	    					handleErrorNoResponse();
	    	    				}
	    	    	    	}
	    	    	    };    	    
	    	    	    
	    	    	    
	    	    	    self.showSelectedccAccount = function(){
	    	    	    	selaccno = self.selAccountcc();
	    	    	    	accdata = ccaccountList();
	    	    	    	
	    	    	    	if(selaccno != '' && selaccno != null && selaccno != undefined){
	    	    	    	$(accdata).each(function(index, accnodet) {
	    	    	    		
	    	    	    		if(accnodet.codacctno == selaccno){
	    	    	    			selectedAccount({ accno: accnodet.codacctno, displaytxt: accnodet.displaytxt, acctbalance: accnodet.acctbalance, fldFCDBRequestId: accnodet.fldFCDBRequestId, acctType: accnodet.acctType,cardaanno:accnodet.cardaanno });
	    	    	    	        //window.location = "#accountStatment/"+;
	    	    	    		}});
	    	    	    			busyInd.show();	    	
	    	    	    	    	
	    	    	            	var currAccData = selectedAccount();
	    	    	                fldAcctNo = currAccData.accno; 
                                    fldCardAANNo = currAccData.cardaanno;									
	    	    	                curraccbalval = currAccData.acctbalance;
	    	    	                acctType = currAccData.acctType;
	    	    	            	fldAcctNo_txt = currAccData.displaytxt;
	    	    	            	
	    	    	            	
	    	    	            	reqParams = {};
	    	    	            	reqParams["fldDeviceId"] = fldDeviceId;
	    	    	    	    	reqParams["fldWebServerId"] = fldWebServerId;
	    	    	    	    	reqParams["fldAppId"] = fldAppId;
	    	    	    	    	reqParams["fldAppServerId"] = fldAppServerId;
	    	    	    	    	reqParams["fldLangId"] = fldLangId;
	    	    	    	    	reqParams["fldModule"] = "CH";
	    	    	    	    	reqParams["fldTxnId"] = "UNB";
	    	    	    	    	reqParams["fldScrnSeqNbr"] = "02";
	    	    	    	    	reqParams["fldCardNo"] = fldAcctNo;
                                    reqParams["fldCardAANNo"] = fldCardAANNo;   
									reqParams["fldCardNo"] = fldAcctNo;
                                    reqParams["fldMeapPCIDSSFlag"] = "true"; 	
	    	    	    	    	reqParams["fldCodDrCr"] = "B";
	    	    	    	    	reqParams["fldInitialSwitch"] = "I";
	    	    	    	    	reqParams["fldLastTxnSeqNo"] = "0";
	    	    	    	    	reqParams["acctTemp"] = "1";
	    	    	    	    	
	    	   

	    	    	    	    	fldjsessionid = Regfldjsessionid;
	    	    	    	    	reqParams["fldLoginUserId"] =Regloginuid;
	    	    	    	    	reqParams["fldSessionId"] = Rsessionid;
	    	    	    	    	
	    	    	    	    	if(fldAcctNo != undefined){
	    	    	    		    	var invocationData = {
	    	    	    		    			adapter : "CreditCard",
	    	    	        	        		procedure : "RRUNB02",
	    	    	        	        		parameters : [fldjsessionid,reqParams,ipadd],
	    	    	        	        		compressResponse : true
	    	    	    		    	};
	    	    	    		    	//WL.Logger.debug(invocationData, '');
	    	    	    		    	
	    	    	    		    	WL.Client.invokeProcedure(invocationData, {
	    	    	    		    		onSuccess : rrunbhomeResponse,
	    	    	    		    		onFailure : AdapterFail,
	    	    	    		    	});
	    	    	            	}else{
	    	    	            		busyInd.hide();		
	    	    	            	}
	    	    	    	    	
	    	    	    	    	self.selAccountcc(fldAcctNo);
	    	    	    	    	self.curraccbalval("Rs. "+curraccbalval);
	    	    	    	}
	    	    	    };
	    	    	    
	    	    	    
	    	    	    rrunbhomeResponse = function(result){
	    	    	    	
	    	    	    	 ccaccountList1.removeAll();
	    	    	    	busyInd.hide();
	    	    	    	invocationResult = result.invocationResult;
	    	    	    	if(invocationResult.isSuccessful) {
	    	    	    		if(invocationResult.faml.response){	
	    	    	    		if(invocationResult.faml.response.rc.returncode == 0){
	    	    	    			if(window.location == "#ccunb"){
cardcount=invocationResult.faml.response.txndata.response.txndtls;
	    	    	        			
	    	    	    	            $('#Cardnum').html(invocationResult.faml.response.txndata.request.cardno);
	    	    	    	            $('#TotDeb').html(invocationResult.faml.response.txndata.response.totalunbilleddb);
	    	    	    	            
	    	    	    	            $('#TotCrd').html(invocationResult.faml.response.txndata.response.totalunbilledcr);
	    	    	    	           
	    	    	    	    		var idx = 1;
	    	    	    	    		
	    	    	    	    		
	    	    	    	    		
	    	    	    	    		//acctbalance = formatAmt(parseFloat(invocationResult.faml.response.txndata.response.availcreditlimit));
	    	    	    		
	    	    	    			//$('#acc').html("Rs. "+acctbalance);
	    	    	    			var idx = 1;
    	    	    	    		$(cardcount).each(function(index, obj) {
    	    	    	    		
    	    	    	    			strid = "item"+idx;
    	    	    	    			custnames = "";
    	    	    	    			
    	    	    	    		
    	    	    	    			if(window.location.hash == '#rrasm01'){
    	    	    	    				acctbalance = formatAmt(parseFloat(obj.txnamount));
    	    	    	    			}else{
    	    	    	    				acctbalance = formatAmt(parseFloat(obj.txnamount));
    	    	    	    			}
    	    	    	    			
    	    	    	    			
    	    	    	    			//alert(obj.cardno);
    	    	    	    		    ccaccountList1.push({transdate: obj.transdate, txndesc: obj.txndesc, txnamount: acctbalance, strid:strid,drcrflag: obj.drcrflag });
    	    	    	    		    idx++;
    	    	    	    		});
	    	    	    			}
	    	    	    			else{
	    	    	    			window.location = "#ccunb";
	    	    	    			$("#contentData").load("Views/Credit/ccunb.html", null, function (response, status, xhr) {
	    	    	    	            if (status != "error") {}
	    	    	        			cardcount=invocationResult.faml.response.txndata.response.txndtls;
	    	    	        			
	    	    	    	            $('#Cardnum').html(invocationResult.faml.response.txndata.request.cardno);
	    	    	    	            $('#TotDeb').html(invocationResult.faml.response.txndata.response.totalunbilleddb);
	    	    	    	            
	    	    	    	            $('#TotCrd').html(invocationResult.faml.response.txndata.response.totalunbilledcr);
	    	    	    	           
	    	    	    	    		var idx = 1;
	    	    	    	    		
	    	    	    	    		
	    	    	    	    		
	    	    	    	    		//acctbalance = formatAmt(parseFloat(invocationResult.faml.response.txndata.response.availcreditlimit));
	    	    	    		
	    	    	    			//$('#acc').html("Rs. "+acctbalance);
	    	    	    			var idx = 1;
    	    	    	    		$(cardcount).each(function(index, obj) {
    	    	    	    		
    	    	    	    			strid = "item"+idx;
    	    	    	    			custnames = "";
    	    	    	    			
    	    	    	    			if(window.location.hash == '#rrasm01'){
    	    	    	    				acctbalance = formatAmt(parseFloat(obj.txnamount));
    	    	    	    			}else{
    	    	    	    				acctbalance = formatAmt(parseFloat(obj.txnamount));
    	    	    	    			}
    	    	    	    			
    	    	    	    			
    	    	    	    			
    	    	    	    			//alert(obj.cardno);
    	    	    	    		    ccaccountList1.push({transdate: obj.transdate, txndesc: obj.txndesc, txnamount: acctbalance, strid:strid,drcrflag: obj.drcrflag });
    	    	    	    		    idx++;
    	    	    	    		});
	    	    	    	    		
	    	    	    	    
	    	    	    	            ko.applyBindings(self, $(".dynamic-page-content").get(0));
	    	    	    	    	});
	    	    	    			}
	    	    	    				
	    	    	    			}else{
	    	    	    			errmsg = invocationResult.faml.response.rc.errormessage;
	    	    	    			handleError(invocationResult.faml.response);
	    	    	    		}
	    	    	    		}else{
	    	    					handleErrorNoResponse();
	    	    				}
	    	    	    	}
	    	    	    };    	    
	    	    	    
	    	    	    
	    	    	    /**************Credit Card unbilled txn**********************/
	    	    	    /**************Credit Card ATM PIN**********************/
	    	    	    this.callrrpcr01 = function(){
	    	    	    	
	    	    	    	/*reqParams = {};

	    	    	    	reqParams["fldDeviceId"] = fldDeviceId;
	    	    	    	reqParams["fldWebServerId"] = fldWebServerId;
	    	    	    	reqParams["fldAppId"] = fldAppId;
	    	    	    	reqParams["fldAppServerId"] = fldAppServerId;
	    	    	    	reqParams["fldLangId"] = fldLangId;
	    	    	    	reqParams["fldModule"] = fldModule;
	    	    	    	reqParams["fldSwitchAppId"] = "";
	    	    	    	reqParams["fldModule"] = "CH";
	    	    	    	reqParams["fldTxnId"] = "PCR";
	    	    	    	reqParams["fldLogoffReq"] ="N";
	    	    	    	reqParams["fldAmcId"] = "ALL";
	    	    	    	reqParams["fldRoleId"] = "";
	    	    	    	reqParams["fldReportDate"] = getCurrdate();
	    	    	    	reqParams["fldCardNo"] = "";
	    	    	    	reqParams["fldScrnSeqNbr"] = "01";
	    	    	    	
	    	    	    	    	fldjsessionid = Regfldjsessionid;
	    	    	    	    	reqParams["fldLoginUserId"] =Regloginuid;
	    	    	    	    	reqParams["fldSessionId"] = Rsessionid;
	    	    	    	    	reqParams["fldRequestId"] = RegfldRequestId;
	    	    	    	busyInd.show();
	    	    	    	var invocationData = {
	    	    	    			adapter : "CreditCard",
	    	    	        		procedure : "RRPCR01",
	    	    	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	    	    	    	};
	    	    	    	
	    	    	    	WL.Client.invokeProcedure(invocationData, {
	    	    	    		onSuccess : loadrrpcr01,
	    	    	    		onFailure : AdapterFail,	    		
	    	    	    		timeout: timeout
	    	    	    	});
	    	    	    	*/
	    	    	    	
	    	    	    	if(window.location.hash == '#rrpcr01'){
	    	    	    		templateId = "rrpcr01";
	    	    	    	}else{
	    	    	    		templateId = "rrpcr01";
	    	    	    	}
	    	    	    	
	    	    	    	$("#contentData").load("Views/Credit/"+templateId+".html", null, function (response, status, xhr) {
	    	    	            if (status != "error") {}
	    	    	            
	    	    	       
	    	    	            
	    	    	            ko.applyBindings(self, $(".dynamic-page-content").get(0));     
	    	    	    	
	    	    	            
	    	    	            
	    	    	                
	    	    	    	});
	    	    	   
	    	    	    };

	    	    	    loadrrpcr01 = function(result){
	    	    	    busyInd.hide();
	    	    	    invocationResult = result.invocationResult;
	    	    	    if(invocationResult.isSuccessful) {
	    	    	    	if(invocationResult.faml.response){	
	    	    	    	if(invocationResult.faml.response.rc.returncode == 0){
	    	    	    		
	    	    	    		if(window.location.hash == "#rrpcr01"){
	    	    	    			
	    	    	    			cardcount=invocationResult.faml.response.ccacctlist.ccacctdetails;
	    	    	    			totAccount=cardcount.length;
	    	    	    		
	    	    	    			if(totAccount > 0)
	    	    	    			{$('#ErrMsg').hide();}
	    	    	    		else{
	    	    	    			$('#ErrMsg').show();
	    	    	    		}
	    	    	    			ccaccountList1.removeAll();
	    	    	        	    $(cardcount).each(function(index, obj) {
	    	    	        		ccaccountList1.push({ cardNo: obj.cardno});
	    	    	        	
	    	    	        		});
	    	    	        		  
	    	    	    		}
	    	    	    	}else{
	    	    	    		errmsg = invocationResult.faml.response.rc.errormessage;
	    	    	    		handleError(invocationResult.faml.response);
	    	    	    	}
	    	    	    	}else{
	    	    				handleErrorNoResponse();
	    	    			}
	    	    	    }
	    	    	    };
	    	    	    self.rrpcr01Submit = function(){
	    	    	        
	    	    	    	if($("#frmrrpcr01").valid()){
	    	    	    	busyInd.show();        	

	    	    	    	fldLoginUserId = Regloginuid;
	    	    	    	fldFCDBSessionId = RegfldFCDBSessionId;
	    	    	    	fldjsessionid = Regfldjsessionid;
	    	    	    	fldSessionId = Rsessionid;	
	    	    	    	fldFCDBRequestId = $("#fldFCDBRequestId").val();
	    	    	    	
	    	    	    	fldEntityId = "";    	    	
	    	    	    	
	    	    	    	var $form = $("#frmrrpcr01");
	    	    	    	rsaDataArray = $form.serializeArray();    	
	    	    	    	    	    	
	    	    	    	reqParams = {};
	    	    	    	for (var i in rsaDataArray) {
	    	    	    		reqParams[rsaDataArray[i].name] = rsaDataArray[i].value;
	    	    	    		
	    	    	    	}
	    	    	    	

	    	    	    
	    	    	    	
	    	    	    	reqParams["fldDeviceId"] = fldDeviceId;

	    	    	    	reqParams["fldWebServerId"] = fldWebServerId;
	    	    	    	reqParams["fldAppId"] = fldAppId;
	    	    	    	reqParams["fldAppServerId"] = fldAppServerId;
	    	    	    	reqParams["fldLangId"] = fldLangId;
	    	    	      	reqParams["fldModule"] = "CH";
	    	    	    	reqParams["fldTxnId"] = "PCR";
	    	    	    	reqParams["fldScrnSeqNbr"] = "02";
				reqParams["fldMeapPCIDSSFlag"] = "true";
				reqParams["selCard"] = $("#selCard").val().split("#")[0];
	    	    	    	reqParams["fldCardNo"] = $("#selCard").val().split("#")[0];
			        reqParams["fldCardAANNo"] =$("#selCard").val().split("#")[1];
	    	    	    	fldjsessionid = Regfldjsessionid;
	    	    	    	reqParams["fldLoginUserId"] =Regloginuid;
	    	    	    	reqParams["fldSessionId"] = Rsessionid;

	    	    	    	var invocationData = {
	    	    	    			adapter : "CreditCard",
	    	    	        		procedure : "RRPCR02",
	    	    	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	    	    	    	};
	    	    	    	
	    	    	    	//WL.Logger.debug(invocationData, '');
	    	    	    	WL.Client.invokeProcedure(invocationData, {
	    	    	    		onSuccess : rrpcr02Response,
	    	    	    		onFailure : AdapterFail,
	    	    	    		timeout: timeout
	    	    	    	});
	    	    	    	}
	    	    	    };
	    	    	    
	    	    	    rrpcr02Response = function(result){
	    	    	    	busyInd.hide();
	    	    	    	invocationResult = result.invocationResult;
	    	    	    	if(invocationResult.isSuccessful) {
	    	    	    		if(invocationResult.faml.response){	
	    	    	    		if(invocationResult.faml.response.rc.returncode == 0){
	    	    	    			window.location = "#rrpcr02";
	    	    	    			$("#contentData").load("Views/Credit/rrpcr02.html", null, function (response, status, xhr) {
	    	    	    	            if (status != "error") {}
	    	    	    	            
                                        $("#fldCardAANNo").val(invocationResult.faml.response.fldCardAANNo)
	    	    	    	            $('#DcardNum').html(invocationResult.faml.response.fldCardNo);
	    	    	    	            $('#fldCardNo').val(invocationResult.faml.response.fldCardNo);
	    	    	    	            //$('#fldRequestId').html(invocationResult.faml.response.mci.requestid);
	    	    	    	            
	    	    	    	            
	    	    	    	            ko.applyBindings(self, $(".dynamic-page-content").get(0));
	    	    	    	    	});
	    	    	    			
	    	    	    				
	    	    	    			}else{
	    	    	    			errmsg = invocationResult.faml.response.rc.errormessage;
	    	    	    			handleError(invocationResult.faml.response);
	    	    	    		}
	    	    	    		}else{
	    	    					handleErrorNoResponse();
	    	    				}
	    	    	    	}
	    	    	    };  
	    	    	    
self.rrpcr02Submit = function(){
	    	    	        
	    	    	    	if($("#frmrrpcr02").valid()){
	    	    	    	busyInd.show();        	

	    	    	     	fldLoginUserId = Regloginuid;
	    	    	    	    	fldFCDBSessionId = RegfldFCDBSessionId;
	    	    	            	fldjsessionid = Regfldjsessionid;
	    	    	            	fldSessionId = Rsessionid;	
	    	    	    	fldFCDBRequestId = $("#fldFCDBRequestId").val();
	    	    	    	
	    	    	    	fldEntityId = "";    	    	
	    	    	    	
	    	    	    	var $form = $("#frmrrpcr02");
	    	    	    	rsaDataArray = $form.serializeArray();    	
	    	    	    	    	    	
	    	    	    	reqParams = {};
	    	    	    	for (var i in rsaDataArray) {
	    	    	    		reqParams[rsaDataArray[i].name] = rsaDataArray[i].value;
	    	    	    		
	    	    	    	}
	    	    	    	

	    	    	    
	    	    	    	
	    	    	    	reqParams["fldDeviceId"] = fldDeviceId;
				reqParams["fldMeapPCIDSSFlag"] = "true";
                       
	    	    	    	reqParams["fldWebServerId"] = fldWebServerId;
	    	    	    	reqParams["fldAppId"] = fldAppId;
	    	    	    	reqParams["fldAppServerId"] = fldAppServerId;
	    	    	    	reqParams["fldLangId"] = fldLangId;
	    	    	      	reqParams["fldModule"] = "CH";
	    	    	    	reqParams["fldTxnId"] = "PCR";
	    	    	    	reqParams["fldScrnSeqNbr"] = "03";
	    	    	    	
	    	    	    	

	    	    	    	fldjsessionid = Regfldjsessionid;
	    	    	    	reqParams["fldLoginUserId"] =Regloginuid;
	    	    	    	reqParams["fldSessionId"] = Rsessionid;

	    	    	    	var invocationData = {
	    	    	    			adapter : "CreditCard",
	    	    	        		procedure : "RRPCR03",
	    	    	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	    	    	    	};
	    	    	    	
	    	    	    	//WL.Logger.debug(invocationData, '');
	    	    	    	WL.Client.invokeProcedure(invocationData, {
	    	    	    		onSuccess : rrpcr03Response,
	    	    	    		onFailure : AdapterFail,
	    	    	    		timeout: timeout
	    	    	    	});
	    	    	    	}
	    	    	    };
	    	    	    
	    	    	    rrpcr03Response = function(result){
	    	    	    	busyInd.hide();
	    	    	    	invocationResult = result.invocationResult;
	    	    	    	if(invocationResult.isSuccessful) {
	    	    	    		if(invocationResult.faml.response){	
	    	    	    		if(invocationResult.faml.response.rc.returncode == 0){
	    	    	    			window.location = "#rrpcr03";
	    	    	    			$("#contentData").load("Views/Credit/rrpcr03.html", null, function (response, status, xhr) {
	    	    	    	            if (status != "error") {}
	    	    	    	            
	    	    	    	            $('#cardNum').html(invocationResult.faml.response.txndata.request.cardno);
	    	    	    	      
	    	    	    	            $('#refNum').html(invocationResult.faml.response.txndata.response.hostrefno);
	    	    	    	            ko.applyBindings(self, $(".dynamic-page-content").get(0));
	    	    	    	    	});
	    	    	    			
	    	    	    				
	    	    	    			}else{
	    	    	    			errmsg = invocationResult.faml.response.rc.errormessage;
	    	    	    			handleError(invocationResult.faml.response);
	    	    	    		}
	    	    	    		}else{
	    	    					handleErrorNoResponse();
	    	    				}
	    	    	    	}
	    	    	    };     
	    	    	    
	    	    	    
	    	    	    
	    	    	    /**************Credit Card ATM PIN**********************/
	    	    	    
	    	    	    /**************Credit Card Account Information**********************/
	    	    	    this.callrraci01 = function(){
	    	    	    	
	    	    	    	/*reqParams = {};

	    	    	    	reqParams["fldDeviceId"] = fldDeviceId;
	    	    	    	reqParams["fldWebServerId"] = fldWebServerId;
	    	    	    	reqParams["fldAppId"] = fldAppId;
	    	    	    	reqParams["fldAppServerId"] = fldAppServerId;
	    	    	    	reqParams["fldLangId"] = fldLangId;
	    	    	    	reqParams["fldModule"] = fldModule;
	    	    	    	reqParams["fldSwitchAppId"] = "";
	    	    	    	reqParams["fldModule"] = "CH";
	    	    	    	reqParams["fldTxnId"] = "ACI";
	    	    	    	reqParams["fldLogoffReq"] = "N";
	    	    	    	reqParams["fldAmcId"] = "ALL";
	    	    	    	reqParams["fldRoleId"] = "";
	    	    	    	reqParams["fldReportDate"] = getCurrdate();
	    	    	    	reqParams["fldCardNo"] = "";
	    	    	    	reqParams["fldScrnSeqNbr"] = "01";
	    	    	    	
	    	    	    	fldjsessionid = Regfldjsessionid;
	    	    	    	reqParams["fldLoginUserId"] =Regloginuid;
	    	    	    	reqParams["fldSessionId"] = Rsessionid;
	    	    	    	reqParams["fldRequestId"] = RegfldRequestId;
	    	    	    	busyInd.show();
	    	    	    	var invocationData = {
	    	    	    			adapter : "CreditCard",
	    	    	        		procedure : "RRACI01",
	    	    	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	    	    	    	};
	    	    	    	
	    	    	    	WL.Client.invokeProcedure(invocationData, {
	    	    	    		onSuccess : loadrraci01,
	    	    	    		onFailure : AdapterFail,	    		
	    	    	    		timeout: timeout
	    	    	    	});
	    	    	    	
	    	    	    	if(window.location.hash == '#rraci01'){
	    	    	    		templateId = "rraci01";
	    	    	    	}else{
	    	    	    		templateId = "rraci01";
	    	    	    	}
	    	    	    	*/
	    	    	    	$("#contentData").load("Views/Credit/rraci01.html", null, function (response, status, xhr) {
	    	    	            if (status != "error") {}
	    	    	            totAccount=accountList.length;
	    	    	            if(totAccount > 0)
    	    	    			{$('#ErrMsg').hide();}
    	    	    		else{
    	    	    			$('#ErrMsg').show();
    	    	    		}
	    	    	            
	    	    	            ko.applyBindings(self, $(".dynamic-page-content").get(0));     
	    	    	    	
	    	    	            
	    	    	            
	    	    	                
	    	    	    	});
	    	    	   
	    	    	    };

	    	    	    loadrraci01 = function(result){
	    	    	    busyInd.hide();
	    	    	    invocationResult = result.invocationResult;
	    	    	    if(invocationResult.isSuccessful) {
	    	    	    	if(invocationResult.faml.response){	
	    	    	    	if(invocationResult.faml.response.rc.returncode == 0){
	    	    	    		
	    	    	    		if(window.location.hash == "#rraci01"){
	    	    	    			
	    	    	    			cardcount=invocationResult.faml.response.ccacctlist.ccacctdetails;
	    	    	    			totAccount=cardcount.length;
	    	    	    		
	    	    	    			if(totAccount > 0)
	    	    	    			{$('#ErrMsg').hide();}
	    	    	    		else{
	    	    	    			$('#ErrMsg').show();
	    	    	    		}
	    	    	    			ccaccountList1.removeAll();
	    	    	        	    $(cardcount).each(function(index, obj) {
	    	    	        		ccaccountList1.push({ cardNo: obj.cardno});
	    	    	        	
	    	    	        		});
	    	    	        		  
	    	    	    		}
	    	    	    	}else{
	    	    	    		errmsg = invocationResult.faml.response.rc.errormessage;
	    	    	    		handleError(invocationResult.faml.response);
	    	    	    	}
	    	    	    	}else{
	    	    				handleErrorNoResponse();
	    	    			}
	    	    	    }
	    	    	    };

	    	    	    self.rraci01Submit  = function(){
	    	    	        
	    	    	    	if($("#frmrraci01").valid()){
	    	    	    	busyInd.show();        	
	    	    	     	fldLoginUserId = Regloginuid;
	    	    	    	fldFCDBSessionId = RegfldFCDBSessionId;
	    	            	fldjsessionid = Regfldjsessionid;
	    	            	fldSessionId = Rsessionid;
	    	    	    	fldFCDBRequestId = $("#fldFCDBRequestId").val();
	    	    	    	
	    	    	    	fldEntityId = "";    	    	
	    	    	    	
	    	    	    	var $form = $("#frmrraci01");
	    	    	    	rsaDataArray = $form.serializeArray();    	
	    	    	    	    	    	
	    	    	    	reqParams = {};
	    	    	    	for (var i in rsaDataArray) {
	    	    	    		reqParams[rsaDataArray[i].name] = rsaDataArray[i].value;
	    	    	    		
	    	    	    	}
	    	    	    	

	    	    	        var fldCardAANNo=$("#fldCardNo").val().split("#")[1];
	    	    	        var fldCardNo=$("#fldCardNo").val().split("#")[0];
	    	    	    	reqParams["fldDeviceId"] = fldDeviceId;
                                reqParams["fldCardNo"] = fldCardNo;
	    	    	    	reqParams["fldWebServerId"] = fldWebServerId;
	    	    	    	reqParams["fldAppId"] = fldAppId;
				reqParams["fldMeapPCIDSSFlag"] = "true";
	    	    	    	reqParams["fldAppServerId"] = fldAppServerId;
	    	    	    	reqParams["fldLangId"] = fldLangId;
	    	    	    	reqParams["fldModule"] = "CH";
	    	    	    	reqParams["fldTxnId"] = "ACI";
	    	    	    	reqParams["fldScrnSeqNbr"] = "02";
	    	    	    	reqParams["fldCardAANNo"] = fldCardAANNo;
	    	    	    	
	    	    	    	fldjsessionid = Regfldjsessionid;
	    	    	    	reqParams["fldLoginUserId"] =Regloginuid;
	    	    	    	reqParams["fldSessionId"] = Rsessionid;
	    	    	    	var invocationData = {
	    	    	    			adapter : "CreditCard",
	    	    	        		procedure : "RRACI02",
	    	    	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	    	    	    	};
	    	    	    	
	    	    	    	//WL.Logger.debug(invocationData, '');
	    	    	    	WL.Client.invokeProcedure(invocationData, {
	    	    	    		onSuccess : rraci02Response,
	    	    	    		onFailure : AdapterFail,
	    	    	    		timeout: timeout
	    	    	    	});
	    	    	    	}
	    	    	    };   
	    	    	    rraci02Response = function(result){
	    	    	    	    	busyInd.hide();
	    	    	    	    	invocationResult = result.invocationResult;
	    	    	    	    	if(invocationResult.isSuccessful) {
	    	    	    	    		if(invocationResult.faml.response){	
	    	    	    	    		if(invocationResult.faml.response.rc.returncode == 0){
	    	    	    	    			window.location = "#rraci02";
	    	    	    	    			$("#contentData").load("Views/Credit/rraci02.html", null, function (response, status, xhr) {
	    	    	    	    	            if (status != "error") {}
	    	    	    	    	            
	    	    	    	    	           
	    	    	    	    	           
	    	    	    	    	            $('#cardNum').html(invocationResult.faml.response.txndata.request.cardno);
	    	    	    	    	            $('#credLim').html(formatAmt(parseFloat(invocationResult.faml.response.txndata.response.totalcreditlimit)));
	    	    	    	    	            $('#avlLim').html(formatAmt(parseFloat(invocationResult.faml.response.txndata.response.availcreditlimit)));
	    	    	    	    	            $('#avlCalim').html(formatAmt(parseFloat(invocationResult.faml.response.txndata.response.availcashlimit)));
	    	    	    	    	            $('#totBillamt').html(formatAmt(parseFloat(invocationResult.faml.response.txndata.response.totalbilledamt)));
	    	    	    	    	            $('#minAmtd').html(formatAmt(parseFloat(invocationResult.faml.response.txndata.response.minamountdue)));
	    	    	    	    	            $('#payDue').html(invocationResult.faml.response.txndata.response.duedate);
	    	    	    	    	            $('#totUnbd').html(formatAmt(parseFloat(invocationResult.faml.response.txndata.response.totalunbilleddb)));
	    	    	    	    	            $('#totUnbc').html(formatAmt(parseFloat(invocationResult.faml.response.txndata.response.totalunbilledcr)));
	    	    	    	    	            $('#totOust').html(formatAmt(parseFloat(invocationResult.faml.response.txndata.response.totaloutstandingauth)));
	    	    	    	    	            $('#rewPobl').html(invocationResult.faml.response.txndata.response.totalltdearned);
	    	    	    	    	            $('#rewPobc').html(invocationResult.faml.response.txndata.response.totalctdearned);
	    	    	    	    	            
	    	    	    	    	            
	    	    	    	    	             
	    	    	    	    	            
	    	    	    	    	               
	    	    	    	    	            
	    	    	    	    	            
	    	    	    	    	            ko.applyBindings(self, $(".dynamic-page-content").get(0));
	    	    	    	    	    	});
	    	    	    	    			
	    	    	    	    				
	    	    	    	    			}else{
	    	    	    	    			errmsg = invocationResult.faml.response.rc.errormessage;
	    	    	    	    			handleError(invocationResult.faml.response);
	    	    	    	    		}
	    	    	    	    		}else{
	    	    	    					handleErrorNoResponse();
	    	    	    				}
	    	    	    	    	}
	    	    	    	    };    	    
	    	    	  
	    	    	    	    /**************Credit Card Account Information**********************/

	    	    	    	    /**************Update Contact Details:**********************/
	    	    	    	    this.callrrupd00 = function(){
	    	    	    	    	
	    	    	    	    	reqParams = {};

	    	    	    	    	reqParams["fldDeviceId"] = fldDeviceId;
	    	    	    	    	reqParams["fldWebServerId"] = fldWebServerId;
	    	    	    	    	reqParams["fldAppId"] = fldAppId;
	    	    	    	    	reqParams["fldAppServerId"] = fldAppServerId;
	    	    	    	    	reqParams["fldLangId"] = fldLangId;
	    	    	    	    	reqParams["fldModule"] = fldModule;
	    	    	    	    	reqParams["fldSwitchAppId"] = "";
	    	    	    	    	reqParams["fldModule"] = "CH";
	    	    	    	    	reqParams["fldTxnId"] = "UPD";
	    	    	    	    	reqParams["fldLogoffReq"] = "N";
	    	    	    	    	reqParams["fldAmcId"] = "ALL";
	    	    	    	    	reqParams["fldRoleId"] = "";
	    	    	    	    	reqParams["fldReportDate"] = getCurrdate();
					reqParams["fldMeapPCIDSSFlag"] = "true";
	    	    	    	    	reqParams["fldCardNo"] = "";
	    	    	    	    	reqParams["fldScrnSeqNbr"] = "01";
	    	    	    	    	
	    	    	    	    	
	    	    	    	    	reqParams["fldRequestId"] =RegfldRequestId;

	    	    	    	    	fldjsessionid = Regfldjsessionid;
	    	    	    	    	reqParams["fldLoginUserId"] =Regloginuid;
	    	    	    	    	reqParams["fldSessionId"] = Rsessionid;
	    	    	    	    	
	    	    	    	    	
	    	    	    	    	busyInd.show();
	    	    	    	    	var invocationData = {
	    	    	    	    			adapter : "CreditCard",
	    	    	    	        		procedure : "RRUPD01",
	    	    	    	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	    	    	    	    	};
	    	    	    	    	
	    	    	    	    	WL.Client.invokeProcedure(invocationData, {
	    	    	    	    		onSuccess : loadrrupd00,
	    	    	    	    		onFailure : AdapterFail,	    		
	    	    	    	    		timeout: timeout
	    	    	    	    	});
	    	    	    	    	
	    	    	    	    
	    	    	    	    	$("#contentData").load("Views/Credit/rrupd00.html", null, function (response, status, xhr) {
	    	    	    	            if (status != "error") {}
	    	    	    	   
	    	    	    	            ko.applyBindings(self, $(".dynamic-page-content").get(0));     
	    	    	    	    	
	    	    	    	            
	    	    	    	            
	    	    	    	                
	    	    	    	    	});
	    	    	    	   
	    	    	    	    };

	    	    	    	    loadrrupd00 = function(result){
	    	    	    	    busyInd.hide();
	    	    	    	    invocationResult = result.invocationResult;
	    	    	    	    ccaccountList1.removeAll();
	    	    	    	    if(invocationResult.isSuccessful) {
	    	    	    	    	if(invocationResult.faml.response){	
	    	    	    	    	if(invocationResult.faml.response.rc.returncode == 0){
	    	    	    	    		
	    	    	    	    		if(window.location.hash == "#rrupd00"){
	    	    	    	    			
	    	    	    	    			cardcount=invocationResult.faml.response.ccacctlist.ccacctdetails;
	    	    	    	    			totAccount=cardcount.length;
	    	    	    	    		
	    	    	    	    			if(totAccount > 0)
	    	    	    	    			{$('#ErrMsg').hide();}
	    	    	    	    		else{
	    	    	    	    			$('#ErrMsg').show();
	    	    	    	    		}
	    	    	    	    			
	    	    	    	        	    $(cardcount).each(function(index, obj) {
	    	    	    	        	    	
	    	    	    	        	    	

	    	    	    	        		ccaccountList1.push({ cardNo: obj.cardno,cardDet:obj.telresi+"###"+obj.teloffice+"###"+obj.telofficextn+"###"+obj.emailresidence+"###"+obj.emailoffice+"###"+obj.mobile+"###"+obj.cardaanno});
	    	    	    	        	
	    	    	    	        		});
	    	    	    	        		  
	    	    	    	    		}
	    	    	    	    	}else{
	    	    	    	    		errmsg = invocationResult.faml.response.rc.errormessage;
	    	    	    	    		handleError(invocationResult.faml.response);
	    	    	    	    	}
	    	    	    	    	}else{
	    	    	    				handleErrorNoResponse();
	    	    	    			}
	    	    	    	    }
	    	    	    	    };
	    	    	    	    self.rrupd00Submit  = function(){
	    	    	    	    	
	    	    	    	    	if($("#frmrrupd00").valid()){
	    	    	    	    		var crd=$("#fldCardNo option:selected").text();
	    	    	    	    		var accDet=$("#fldCardNo").val();
	    	    	    	    		accDetarr=accDet.split("###");
	    	    	    	    		window.location = "#rrupd01";
	    	    	    	    		ccaccountList1.removeAll();
    	    	    	    			$("#contentData").load("Views/Credit/rrupd01.html", null, function (response, status, xhr) {
    	    	    	    	            if (status != "error") {}
    	    	    	    	            
    	    	    	    	      
	    	    	    	        		ccaccountList1.push({ cardNo: crd,fldTelResi:accDetarr[0],fldTelOffice:accDetarr[1],fldExtnOffice:accDetarr[2],fldEmailResi:accDetarr[3],fldEmailOffice:accDetarr[4],fldMobile:accDetarr[5],fldCardAANNo:accDetarr[6]});

	    	    	    	        		
    	    	    	    	            
    	    	    	    	             
    	    	    	    	            
    	    	    	    	               
    	    	    	    	            
    	    	    	    	            
    	    	    	    	            ko.applyBindings(self, $(".dynamic-page-content").get(0));
    	    	    	    	    	});
    	    	    	    		    
	    	    	    	           
	    	    	    	    	}

	    	    	    	    	
	    	    	    	    	
	    	    	    	    	
	    	    	    	    	
	    	    	    	    };
	    	    	    	    
	    	    	    	    self.rrupd01Submit  = function(){
	    	    	    	        
	    	    	    	    	if($("#frmrrupd01").valid()){
	    	    	    	    	busyInd.show();        	
	    	    	    	     	fldLoginUserId = Regloginuid;
	    	    	    	    	fldFCDBSessionId = RegfldFCDBSessionId;
	    	    	            	fldjsessionid = Regfldjsessionid;
	    	    	            	fldSessionId = Rsessionid;	
	    	    	    	    	
	    	    	    	    	
	    	    	    	    	fldEntityId = "";    	    	
	    	    	    	    	
	    	    	    	    	var $form = $("#frmrrupd01");
	    	    	    	    	rsaDataArray = $form.serializeArray();    	
	    	    	    	    	    	    	
	    	    	    	    	reqParams = {};
	    	    	    	    	for (var i in rsaDataArray) {
	    	    	    	    		reqParams[rsaDataArray[i].name] = rsaDataArray[i].value;
	    	    	    	    		
	    	    	    	    	}
	    	    	    	    	

	    	    	    	    
	    	    	    	    	
	    	    	    	    	reqParams["fldDeviceId"] = fldDeviceId;

	    	    	    	    	reqParams["fldWebServerId"] = fldWebServerId;
	    	    	    	    	reqParams["fldAppId"] = fldAppId;
	    	    	    	    	reqParams["fldAppServerId"] = fldAppServerId;
	    	    	    	    	reqParams["fldLangId"] = fldLangId;
	    	    	    	    	reqParams["fldModule"] = "CH";
	    	    	    	    	reqParams["fldTxnId"] = "UPD";
	    	    	    	    	reqParams["fldScrnSeqNbr"] = "02";
	    	    	    	    	reqParams["fldCardNo"] = $("#cardNo").html();
	    	    	    	    	reqParams["selCard"] = $("#cardNo").html();
	    	    	    	    	
	    	    	    	    

	    	    	    	    	fldjsessionid = Regfldjsessionid;
	    	    	    	    	reqParams["fldLoginUserId"] =Regloginuid;
	    	    	    	    	reqParams["fldSessionId"] = Rsessionid;
	    	    	    	    	var invocationData = {
	    	    	    	    			adapter : "CreditCard",
	    	    	    	        		procedure : "RRUPD02",
	    	    	    	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	    	    	    	    	};
	    	    	    	    	
	    	    	    	    	//WL.Logger.debug(invocationData, '');
	    	    	    	    	WL.Client.invokeProcedure(invocationData, {
	    	    	    	    		onSuccess :  rrupd01Response,
	    	    	    	    		onFailure : AdapterFail,
	    	    	    	    		timeout: timeout
	    	    	    	    	});
	    	    	    	    	}
	    	    	    	    };   
	    	    	    	    rrupd01Response = function(result){
	    	    	    	    	    	busyInd.hide();
	    	    	    	    	    	invocationResult = result.invocationResult;
	    	    	    	    	    	if(invocationResult.isSuccessful) {
	    	    	    	    	    		if(invocationResult.faml.response){	
	    	    	    	    	    		if(invocationResult.faml.response.rc.returncode == 0){
	    	    	    	    	    			window.location = "#rrupd02";
	    	    	    	    	    			$("#contentData").load("Views/Credit/rrupd02.html", null, function (response, status, xhr) {
	    	    	    	    	    	            if (status != "error") {}
	    	    	    	    	    	            
	    	    	    	    	    	        	var fldCardNo =invocationResult.faml.response.fldCardNo;
	    	    	    	    	    	        	var fldTelResi=invocationResult.faml.response.fldTelResi ;
	    	    	    	    	    	        	var fldTelOffice =invocationResult.faml.response.fldTelOffice;
	    	    	    	    	    	        	var fldExtnOffice=invocationResult.faml.response.fldExtnOffice ;
	    	    	    	    	    	        	var fldEmailResi=invocationResult.faml.response.fldEmailResi ;
	    	    	    	    	    	        	var fldEmailOffice=invocationResult.faml.response.fldEmailOffice ;
	    	    	    	    	    	        	var fldMobile=invocationResult.faml.response.fldMobile;
							        var fldCardAANNo=invocationResult.faml.response.fldCardAANNo;
	    	    	    	    	    	        	 $('#fldTelResi1').html("-");
	    	    	    	    	    	        	 $('#fldTelOffice1').html("-");
	    	    	    	    	    	        	 $('#fldExtnOffice1').html("-");
	    	    	    	    	    	        	 $('#fldEmailResi1').html("-");
	    	    	    	    	    	        	 $('#fldEmailOffice1').html("-");
	    	    	    	    	    	        	 $('#fldMobile1').html("-");
	    	    	    	    	    	        	
	    	    	    	    	    	        	 $('#fldCardNo1').html(fldCardNo);
	    	    	    	    	    	        	 $('#fldCardNo').val(fldCardNo);
	    	    	    	    	    	        	 $('#fldTelResi').val(fldTelResi);
	    	    	    	    	    	        	 $('#fldTelOffice').val(fldTelOffice);
	    	    	    	    	    	        	 $('#fldExtnOffice').val(fldExtnOffice);
	    	    	    	    	    	        	 $('#fldEmailResi').val(fldEmailResi);
	    	    	    	    	    	        	 $('#fldEmailOffice').val(fldEmailOffice);
	    	    	    	    	    	        	 $('#fldMobile').val(fldMobile);
	    	    	    	    	    	        	 $('#fldCardAANNo').val(fldCardAANNo);
	    	    	    	    	    	        	 
	    	    	    	    	    	           if(fldTelResi!=""){
	    	    	    	    	    	        	   $('#fldTelResi1').html(fldTelResi);
	    	    	    	    	    	           }
	    	    	    	    	    	        
	    	    	    	    	    	           if(fldTelOffice!=""){
	    	    	    	    	    	        	   $('#fldTelOffice1').html(fldTelOffice);
	    	    	    	    	    	           }
	    	    	    	    	    	           
	    	    	    	    	    	           if(fldExtnOffice!=""){
	    	    	    	    	    	        	   $('#fldExtnOffice1').html(fldExtnOffice);
	    	    	    	    	    	           }
	    	    	    	    	    	           
	    	    	    	    	    	           if(fldEmailResi!=""){
	    	    	    	    	    	        	   $('#fldEmailResi1').html(fldEmailResi);
	    	    	    	    	    	           }
	    	    	    	    	    	           
	    	    	    	    	    	           if(fldEmailOffice!=""){
	    	    	    	    	    	        	   $('#fldEmailOffice1').html(fldEmailOffice);
	    	    	    	    	    	           }
	    	    	    	    	    	           
	    	    	    	    	    	           if(fldMobile!=""){
	    	    	    	    	    	        	   $('#fldMobile1').html(fldMobile);
	    	    	    	    	    	           }
	    	    	    	    	    	           
	    	    	    	    	    
	    	    	    	    	    	               
	    	    	    	    	    	            
	    	    	    	    	    	            
	    	    	    	    	    	            ko.applyBindings(self, $(".dynamic-page-content").get(0));
	    	    	    	    	    	    	});
	    	    	    	    	    			
	    	    	    	    	    				
	    	    	    	    	    			}else{
	    	    	    	    	    			errmsg = invocationResult.faml.response.rc.errormessage;
	    	    	    	    	    			handleError(invocationResult.faml.response);
	    	    	    	    	    		}
	    	    	    	    	    		}else{
	    	    	    	    					handleErrorNoResponse();
	    	    	    	    				}
	    	    	    	    	    	}
	    	    	    	    	    };    	    
	    	    	    	  	    
	    	    	    	    
	    	    	    	    	    self.rrupd02Submit  = function(){
	    	    	    	    	        
	    	    	    	    	    	if($("#frmrrupd02").valid()){
	    	    	    	    	    	busyInd.show();        	
	    	    	    	    	     	fldLoginUserId = Regloginuid;
	    	    	    	    	    	fldFCDBSessionId = RegfldFCDBSessionId;
	    	    	    	            	fldjsessionid = Regfldjsessionid;
	    	    	    	            	fldSessionId = Rsessionid;
	    	    	    	    	    	
	    	    	    	    	    	
	    	    	    	    	    	fldEntityId = "";    	    	
	    	    	    	    	    	
	    	    	    	    	    	var $form = $("#frmrrupd02");
	    	    	    	    	    	rsaDataArray = $form.serializeArray();    	
	    	    	    	    	    	    	    	
	    	    	    	    	    	reqParams = {};
	    	    	    	    	    	for (var i in rsaDataArray) {
	    	    	    	    	    		reqParams[rsaDataArray[i].name] = rsaDataArray[i].value;
	    	    	    	    	    		
	    	    	    	    	    	}
	    	    	    	    	    	

	    	    	    	    	    
	    	    	    	    	    	
	    	    	    	    	    	reqParams["fldDeviceId"] = fldDeviceId;

	    	    	    	    	    	reqParams["fldWebServerId"] = fldWebServerId;
	    	    	    	    	    	reqParams["fldAppId"] = fldAppId;
	    	    	    	    	    	reqParams["fldAppServerId"] = fldAppServerId;
	    	    	    	    	    	reqParams["fldLangId"] = fldLangId;
	    	    	    	    	    	reqParams["fldTxnId"] = "UPD";
	    	    	    	    	    	reqParams["fldScrnSeqNbr"] = "03";
	    	    	    	    	  
                                                reqParams["fldMeapPCIDSSFlag"] = "true";
	    	    	    	    	    	fldjsessionid = Regfldjsessionid;
	    	    	    	    	    	reqParams["fldLoginUserId"] =Regloginuid;
	    	    	    	    	    	reqParams["fldSessionId"] = Rsessionid;
	    	    	    	    	    	var invocationData = {
	    	    	    	    	    			adapter : "CreditCard",
	    	    	    	    	        		procedure : "RRUPD03",
	    	    	    	    	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	    	    	    	    	    	};
	    	    	    	    	    	
	    	    	    	    	    	//WL.Logger.debug(invocationData, '');
	    	    	    	    	    	WL.Client.invokeProcedure(invocationData, {
	    	    	    	    	    		onSuccess :  rrupd02Response,
	    	    	    	    	    		onFailure : AdapterFail,
	    	    	    	    	    		timeout: timeout
	    	    	    	    	    	});
	    	    	    	    	    	}
	    	    	    	    	    };   
	    	    	    	    	    
	    	    	    	    	    rrupd02Response = function(result){
	    	    	    	    	    	
	    	    	    	    	    	busyInd.hide();
	    	    	    	    	    	invocationResult = result.invocationResult;
	    	    	    	    	    	if(invocationResult.isSuccessful) {
	    	    	    	    	    		if(invocationResult.faml.response){	
	    	    	    	    	    		if(invocationResult.faml.response.rc.returncode == 0){
	    	    	    	    	    			window.location = "#rrupd03";
	    	    	    	    	    			$("#contentData").load("Views/Credit/rrupd03.html", null, function (response, status, xhr) {
	    	    	    	    	    	            if (status != "error") {}
	    	    	    	    	    	            
	    	    	    	    	    	        	var fldCardNo =invocationResult.faml.response.txndata.request.cardno;
	    	    	    	    	    	        	var fldTelResi=invocationResult.faml.response.txndata.request.telresidence;
	    	    	    	    	    	        	var fldTelOffice =invocationResult.faml.response.txndata.request.teloffice;
	    	    	    	    	    	        	var fldExtnOffice=invocationResult.faml.response.txndata.request.telofficextn;
	    	    	    	    	    	        	var fldEmailResi=invocationResult.faml.response.txndata.request.emailresidence;
	    	    	    	    	    	        	var fldEmailOffice=invocationResult.faml.response.txndata.request.emailoffice;
	    	    	    	    	    	        	var fldMobile=invocationResult.faml.response.txndata.request.mobile;
	    	    	    	    	    	        	 $('#fldCardNo1').html(fldCardNo);
	    	    	    	    	    	        	 $('#fldTelResi1').html("-");
	    	    	    	    	    	        	 $('#fldTelOffice1').html("-");
	    	    	    	    	    	        	 $('#fldExtnOffice1').html("-");
	    	    	    	    	    	        	 $('#fldEmailResi1').html("-");
	    	    	    	    	    	        	 $('#fldEmailOffice1').html("-");
	    	    	    	    	    	        	 $('#fldMobile1').html("-");
	    	    	    	    	    	        	
	    	    	    	    	    	        
	    	    	    	    	    	        
	    	    	    	    	    	        	 
	    	    	    	    	    	           if(fldTelResi!=""){
	    	    	    	    	    	        	   $('#fldTelResi1').html(fldTelResi);
	    	    	    	    	    	           }
	    	    	    	    	    	        
	    	    	    	    	    	           if(fldTelOffice!=""){
	    	    	    	    	    	        	   $('#fldTelOffice1').html(fldTelOffice);
	    	    	    	    	    	           }
	    	    	    	    	    	           
	    	    	    	    	    	           if(fldExtnOffice!=""){
	    	    	    	    	    	        	   $('#fldExtnOffice1').html(fldExtnOffice);
	    	    	    	    	    	           }
	    	    	    	    	    	           
	    	    	    	    	    	           if(fldEmailResi!=""){
	    	    	    	    	    	        	   $('#fldEmailResi1').html(fldEmailResi);
	    	    	    	    	    	           }
	    	    	    	    	    	           
	    	    	    	    	    	           if(fldEmailOffice!=""){
	    	    	    	    	    	        	   $('#fldEmailOffice1').html(fldEmailOffice);
	    	    	    	    	    	           }
	    	    	    	    	    	           
	    	    	    	    	    	           if(fldMobile!=""){
	    	    	    	    	    	        	   $('#fldMobile1').html(fldMobile);
	    	    	    	    	    	           }
	    	    	    	    	    	           
	    	    	    	    	    
	    	    	    	    	    	               
	    	    	    	    	    	            
	    	    	    	    	    	            
	    	    	    	    	    	            ko.applyBindings(self, $(".dynamic-page-content").get(0));
	    	    	    	    	    	    	});
	    	    	    	    	    			
	    	    	    	    	    				
	    	    	    	    	    			}else{
	    	    	    	    	    			errmsg = invocationResult.faml.response.rc.errormessage;
	    	    	    	    	    			handleError(invocationResult.faml.response);
	    	    	    	    	    		}
	    	    	    	    	    		}else{
	    	    	    	    					handleErrorNoResponse();
	    	    	    	    				}
	    	    	    	    	    	}
	    	    	    	    	    };    	    
	    	    	    	  	    
	    	    	    	    
	    	    	    	    
	    	    	    	    	    /**************Update Contact Details:**********************/

	    	    	    	    	    /**************Statement on Email**********************/
	    	    	    	    	 
	    	    	    	    	    	
	    	    	    	    	    	  this.callrrest01 = function(){
	    	  	    	    	    	    	
	    	  	    	    	    	    	reqParams = {};

	    	  	    	    	    	    	reqParams["fldDeviceId"] = fldDeviceId;
	    	  	    	    	    	    	reqParams["fldWebServerId"] = fldWebServerId;
	    	  	    	    	    	    	reqParams["fldAppId"] = fldAppId;
	    	  	    	    	    	    	reqParams["fldAppServerId"] = fldAppServerId;
	    	  	    	    	    	    	reqParams["fldLangId"] = fldLangId;
	    	  	    	    	    	    	reqParams["fldModule"] = fldModule;
	    	  	    	    	    	    	reqParams["fldSwitchAppId"] = "";
	    	  	    	    	    	    	reqParams["fldModule"] = "CH";
	    	  	    	    	    	    	reqParams["fldTxnId"] = "EST";
	    	  	    	    	    	    	reqParams["fldLogoffReq"] = "N";
	    	  	    	    	    	    	reqParams["fldAmcId"] = "ALL";
	    	  	    	    	    	    	reqParams["fldRoleId"] = "";
	    	  	    	    	    	    	reqParams["fldReportDate"] = getCurrdate();
	    	  	    	    	    	    	reqParams["fldCardNo"] = "";
	    	  	    	    	    	    	reqParams["fldScrnSeqNbr"] = "01";
							reqParams["fldMeapPCIDSSFlag"] = "true";
	    	  	    	    	    	    	
	    	  	    	    	    	    	
	    	  	    	    	    	    	reqParams["fldRequestId"] =RegfldRequestId;

	    	  	    	    	  	    	fldjsessionid = Regfldjsessionid;
	    	  	    	    	  	    	reqParams["fldLoginUserId"] =Regloginuid;
	    	  	    	    	  	    	reqParams["fldSessionId"] = Rsessionid;
	    	  	    	    	    	    	
	    	  	    	    	    	    	busyInd.show();
	    	  	    	    	    	    	var invocationData = {
	    	  	    	    	    	    			adapter : "CreditCard",
	    	  	    	    	    	        		procedure : "RREST01",
	    	  	    	    	    	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	    	  	    	    	    	    	};
	    	  	    	    	    	    	
	    	  	    	    	    	    	WL.Client.invokeProcedure(invocationData, {
	    	  	    	    	    	    		onSuccess : loadrrest01,
	    	  	    	    	    	    		onFailure : AdapterFail,	    		
	    	  	    	    	    	    		timeout: timeout
	    	  	    	    	    	    	});
	    	  	    	    	    	    	
	    	  	    	    	    	    
	    	  	    	    	    	    	$("#contentData").load("Views/Credit/rrest01.html", null, function (response, status, xhr) {
	    	  	    	    	    	            if (status != "error") {}
	    	  	    	    	    	   
	    	  	    	    	    	            ko.applyBindings(self, $(".dynamic-page-content").get(0));     
	    	  	    	    	    	    	
	    	  	    	    	    	            
	    	  	    	    	    	            
	    	  	    	    	    	                
	    	  	    	    	    	    	});
	    	  	    	    	    	   
	    	  	    	    	    	    };

	    	  	    	    	    	    loadrrest01 = function(result){
	    	  	    	    	    	    busyInd.hide();
	    	  	    	    	    	    invocationResult = result.invocationResult;
	    	  	    	    	    	    if(invocationResult.isSuccessful) {
	    	  	    	    	    	    	if(invocationResult.faml.response){	
	    	  	    	    	    	    	if(invocationResult.faml.response.rc.returncode == 0){
	    	  	    	    	    	    		
	    	  	    	    	    	    		if(window.location.hash == "#rrest01"){
	    	  	    	    	    	    			
	    	  	    	    	    	    			cardcount=invocationResult.faml.response.ccacctlist.ccacctdetails;
	    	  	    	    	    	    			totAccount=cardcount.length;
	    	  	    	    	    	    		
	    	  	    	    	    	    			if(totAccount > 0)
	    	  	    	    	    	    			{$('#ErrMsg').hide();}
	    	  	    	    	    	    		else{
	    	  	    	    	    	    			$('#ErrMsg').show();
	    	  	    	    	    	    		}
	    	  	    	    	    	    			ccaccountList1.removeAll();
	    	  	    	    	    	        	    $(cardcount).each(function(index, obj) {
	    	  	    	    	    	        	    	
	    	  	    	    	    	        	    	
                                                      
	    	  	    	    	    	        		ccaccountList1.push({ cardNo: obj.cardno,cardDet:obj.cardno+"###"+obj.emailresidence+"###"+obj.emailoffice+"###"+obj.cardaanno});
	    	  	    	    	    	        	
	    	  	    	    	    	        		});
	    	  	    	    	    	        		  
	    	  	    	    	    	    		}
	    	  	    	    	    	    	}else{
	    	  	    	    	    	    		errmsg = invocationResult.faml.response.rc.errormessage;
	    	  	    	    	    	    		handleError(invocationResult.faml.response);
	    	  	    	    	    	    	}
	    	  	    	    	    	    	}else{
	    	  	    	    	    	    		handleErrorNoResponse();
	    	  	    	    	    	    	}
	    	  	    	    	    	    }
	    	  	    	    	    	    };
	    	  	    	    	    	    self.rrest01Submit  = function(){
	    	  	    	    	    	    	
	    	  	    	    	    	    	if($("#frmrrest01").valid()){
	    	  	    	    	    	    		var crd=$("#selCard option:selected").text();
	    	  	    	    	    	    		var accDet=$("#selCard").val();
	    	  	    	    	    	    		var emailFlag=$("#fldEmailFlag").val();
	    	  	    	    	    	    		accDetarr=accDet.split("###");
	    	  	    	    	    	    		var fldEmail="";
	    	  	    	    	    	    		if(emailFlag=="O"){
	    	  	    	    	    	    			fldEmail=accDetarr[2];
	    	  	    	    	    	    		}
	    	  	    	    	    	    		
	    	  	    	    	    	    		if(emailFlag=="R"){
	    	  	    	    	    	    			fldEmail=accDetarr[1];
	    	  	    	    	    	    		}
	    	  	    	    	    	    		var fldCardAANNo=accDetarr[3];
	    	  	    	    	    	    		
	    	  	    	    	    	    		
	    	  	    	    	    	    		reqParams = {};
		    	  	    	    	    	    	reqParams["fldDeviceId"] = fldDeviceId;
		    	  	    	    	    	    	reqParams["fldWebServerId"] = fldWebServerId;
		    	  	    	    	    	    	reqParams["fldAppId"] = fldAppId;
		    	  	    	    	    	    	reqParams["fldAppServerId"] = fldAppServerId;
		    	  	    	    	    	    	reqParams["fldLangId"] = fldLangId;
		    	  	    	    	    	    	reqParams["fldModule"] = fldModule;
		    	  	    	    	    	    	reqParams["fldSwitchAppId"] = "";
		    	  	    	    	    	    	reqParams["fldModule"] = "CH";
		    	  	    	    	    	    	reqParams["fldTxnId"] = "EST";
		    	  	    	    	    	    	reqParams["fldLogoffReq"] = "N";
		    	  	    	    	    	    	reqParams["fldAmcId"] = "ALL";
		    	  	    	    	    	    	reqParams["fldRoleId"] = "";
		    	  	    	    	    	    	reqParams["fldReportDate"] = getCurrdate();
		    	  	    	    	    	    	reqParams["fldCardNo"] = crd;
							        reqParams["fldCardAANNo"] = fldCardAANNo;
		    	  	    	    	    	    	reqParams["fldScrnSeqNbr"] = "02";
							        reqParams["fldMeapPCIDSSFlag"] = "true";
		    	  	    	    	    	    	reqParams["fldEmailFlag"] = emailFlag;
		    	  	    	    	    	    	reqParams["selEmail"] = emailFlag;
		    	  	    	    	    	    	reqParams["fldEmail"] = fldEmail;
													
		    	  	    	    	    	    	
		    	  	    	    	    	    	
		    	  	    	    	    	    	reqParams["fldRequestId"] =RegfldRequestId;

		    	  	    	    	  	    	fldjsessionid = Regfldjsessionid;
		    	  	    	    	  	    	reqParams["fldLoginUserId"] =Regloginuid;
		    	  	    	    	  	    	reqParams["fldSessionId"] = Rsessionid;
		    	  	    	    	    	    	
		    	  	    	    	    	    	busyInd.show();
		    	  	    	    	    	    	var invocationData = {
		    	  	    	    	    	    			adapter : "CreditCard",
		    	  	    	    	    	        		procedure : "RREST02",
		    	  	    	    	    	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
		    	  	    	    	    	    	};
		    	  	    	    	    	    	
		    	  	    	    	    	    	WL.Client.invokeProcedure(invocationData, {
		    	  	    	    	    	    		onSuccess : loadrrest02,
		    	  	    	    	    	    		onFailure : AdapterFail,	    		
		    	  	    	    	    	    		timeout: timeout
		    	  	    	    	    	    	});
		    	  	    	    	    	    	
	    	  	    	    	
	    	  	    	    	    	           
	    	  	    	    	    	    	}

	    	  	    	    	    	    	
	    	  	    	    	    	    	
	    	  	    	    	    	    	
	    	  	    	    	    	    	
	    	  	    	    	    	    };
	    	  	    	    	    	    
	    	  	     	    	    	    loadrrest02 = function(result){
		    	  	    	    	    	    busyInd.hide();
		    	  	    	    	    	    invocationResult = result.invocationResult;
		    	  	    	    	    	    if(invocationResult.isSuccessful) {
		    	  	    	    	    	    	if(invocationResult.faml.response){	
		    	  	    	    	    	    	if(invocationResult.faml.response.rc.returncode == 0){
		    	  	    	    	    	    		
		    	  	    	    	    	    		window.location = "#rrest02";
		    	      	    	    	    			$("#contentData").load("Views/Credit/rrest02.html", null, function (response, status, xhr) {
		    	      	    	    	    	            if (status != "error") {}
		    	  
		    	      	    	    	    	        
		    	      	    	    	    		    
		    	  	    	    	    	    		if(window.location.hash == "#rrest02"){
		    	  	    	    	    	    			
		    	  	    	    	    	    			var fldcardno = invocationResult.faml.response.fldCardNo; 
		    	  	    	    	    	    			var fldemail= invocationResult.faml.response.fldEmail;
		    	  	    	    	    	    			var fldemailflag=invocationResult.faml.response.fldEmailFlag; 
		    	  	    	    	    	    			var fldCardAANNo=invocationResult.faml.response.fldCardAANNo;
		    	  	    	    	    	    			$('#cardNum').html(fldcardno);
		    	  	    	    	    	    			$('#fldemailFlag').val(fldemailflag);
		    	  	    	    	    	    			$('#fldCardAANNo').val(fldCardAANNo);
		    	  	    	    	    	    		 if (fldemailflag == 'O' && fldemail !=''){
				    	  	    	    	    	    		$('#ErrMsg').hide();
				    	  	    	    	    	    		$('#emailType').html("Office email address");
				    	  	    	    	    	    		$('#emailId').html(fldemail);
				    	  	    	    	    	    	}
		    	  	    	    	    	    		 else  if (fldemailflag == 'R' && fldemail !=''){
				    	  	    	    	    	    		$('#ErrMsg').hide();
				    	  	    	    	    	    		$('#emailType').html("Residence email address");
				    	  	    	    	    	    		$('#emailId').html(fldemail);
				    	  	    	    	    	    	}
				    	  	    	    	    	    	else{
				    	  	    	    	    	    		$('#ErrMsg').show();
				    	  	    	    	    	    	}		
		    	  	    	    
		    	  	    	    	    	    	
		    	  	    	    	    	    		
		    	  	    	    	    	    	}
		    	  	    	    	    	    		else{
			    	  	    	    	  	    			accStmtData(invocationResult.faml);    
			    	  	    	    	  	    			window.location = "#rrest02";
			    	  	    	    	      			} 
		    	  	    	    	    	    	    ko.applyBindings(self, $(".dynamic-page-content").get(0));
		    	      	    	    	    	    	});
		    	      	    	    	    			}
		    	  	    	    	    	    		
		    	  	    	    	    	    		else{
		    	  	    	    	    	    		errmsg = invocationResult.faml.response.rc.errormessage;
		    	  	    	    	    	    		handleError(invocationResult.faml.response);
		    	  	    	    	    	    	}
		    	  	    	    	    	    	}else{
		    	  	    	    	    	    		handleErrorNoResponse();
		    	  	    	    	    	    	}
		    	  	    	    	    	    }
		    	  	    	    	    	    };	

		    	  	    	    	    	    
	    	  	    	    	    	    self.rrest02Submit  = function(){
	    	  	    	    	    	        
	    	  	    	    	    	    	if($("#frmrrest02").valid()){
	    	  	    	    	    	    	busyInd.show();        	
	    	  	    	    	    	   	fldLoginUserId = Regloginuid;
	    	  	    	    		    	fldFCDBSessionId = RegfldFCDBSessionId;
	    	  	    	    	        	fldjsessionid = Regfldjsessionid;
	    	  	    	    	        	fldSessionId = Rsessionid;
	    	  	    	    	    	    	fldFCDBRequestId = $("#fldFCDBRequestId").val();
	    	  	    	    	    	    	
	    	  	    	    	    	    	fldEntityId = "";    	    	
	    	  	    	    	    	       	
	    	  	    	    	    	    	    	    	
	    	  	    	    	    	    	reqParams = {};
	    	  	    	    	    	    	
	    	  	    	    	    	    var cardNum=$('#cardNum').html();
	    	  	    	    	    	    var emailFlag=$('#fldemailFlag').val();
	    	  	    	    	    	    var email=$('#emailId').html();
	    	  	    	    	    		
	    	  	    	    	    	    	reqParams["fldDeviceId"] = fldDeviceId;
                                                        reqParams["fldMeapPCIDSSFlag"] = "true";
	    	  	    	    	    	    	reqParams["fldWebServerId"] = fldWebServerId;
	    	  	    	    	    	    	reqParams["fldAppId"] = fldAppId;
	    	  	    	    	    	    	reqParams["fldAppServerId"] = fldAppServerId;
	    	  	    	    	    	    	reqParams["fldLangId"] = fldLangId;
	    	  	    	    	    	      	reqParams["fldModule"] = "CH";
	    	  	    	    	    	    	reqParams["fldTxnId"] = "EST";
	    	  	    	    	    	    	reqParams["fldScrnSeqNbr"] = "03";
							reqParams["fldCardAANNo"] = $('#fldCardAANNo').val();
	    	  	    	    	    	    	
	    	  	    	    	    	    	reqParams["fldCardNo"] =cardNum;
	    	  	    	    	    	    	reqParams["fldEmailFlag"] =emailFlag;
	    	  	    	    	    	    	reqParams["fldEmail"] =email;
	    	  	    	    	    	    	

	    	  	    	    	  	    	fldjsessionid = Regfldjsessionid;
	    	  	    	    	  	    	reqParams["fldLoginUserId"] =Regloginuid;
	    	  	    	    	  	    	reqParams["fldSessionId"] = Rsessionid;

	    	  	    	    	    	    	var invocationData = {
	    	  	    	    	    	    			adapter : "CreditCard",
	    	  	    	    	    	        		procedure : "RREST03",
	    	  	    	    	    	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	    	  	    	    	    	    	};
	    	  	    	    	    	    	
	    	  	    	    	    	    	//WL.Logger.debug(invocationData, '');
	    	  	    	    	    	    	WL.Client.invokeProcedure(invocationData, {
	    	  	    	    	    	    		onSuccess :  rrest02Response,
	    	  	    	    	    	    		onFailure : AdapterFail,
	    	  	    	    	    	    		timeout: timeout
	    	  	    	    	    	    	});
	    	  	    	    	    	    	}
	    	  	    	    	    	    };   
	    	  	    	    	    	  rrest02Response = function(result){
	    	  	    	    	    	    	    	busyInd.hide();
	    	  	    	    	    	    	    	invocationResult = result.invocationResult;
	    	  	    	    	    	    	    	if(invocationResult.isSuccessful) {
	    	  	    	    	    	    	    		if(invocationResult.faml.response){	
	    	  	    	    	    	    	    		if(invocationResult.faml.response.rc.returncode == 0){
	    	  	    	    	    	    	    			window.location = "#rrest03";
	    	  	    	    	    	    	    			$("#contentData").load("Views/Credit/rrest03.html", null, function (response, status, xhr) {
	    	  	    	    	    	    	    	            if (status != "error") {}
	    	  	    	    	    	    	    	            
	    	  	    	    	    	    	    	       var refNum=invocationResult.faml.response.codtxnrefno;
	    	  	    	    	    	    	    	           var cardNum=invocationResult.faml.response.txndata.request.cardno;
	    	  	    	    	    	    	    	           var emailflag=invocationResult.faml.response.txndata.request.emailflag;
	    	  	    	    	    	    	    	           var emailtype="";
	    	  	    	    	    	    	    	           
	    	  	    	    	    	    	    	           if(emailflag=="O"){
	    	  	    	    	    	    	    	        	 emailtype='Office email address';
	    	  	    	    	    	    	    	        	 
	    	  	    	    	    	    	    	           }
	    	  	    	    	    	    	    	           
	    	  	    	    	    	    	    	         if(emailflag=="R"){
	    	  	    	    	    	    	    	        	 emailtype='Residence email address';
	    	  	    	    	    	    	    	        	 
	    	  	    	    	    	    	    	           }
	    	  	    	    	    	    	    	           
	    	  	    	    	    	    	    	            $('#cardNum').html(cardNum);
	    	  	    	    	    	    	    	            $('#refNum').html(refNum);
	    	  	    	    	    	    	    	            $('#emailType').html(emailtype);
	    	  	    	    	    	    	    	           
	    	  	    	    	    	    	    	            
	    	  	    	    	    	    	    	             
	    	  	    	    	    	    	    	            
	    	  	    	    	    	    	    	               
	    	  	    	    	    	    	    	            
	    	  	    	    	    	    	    	            
	    	  	    	    	    	    	    	            ko.applyBindings(self, $(".dynamic-page-content").get(0));
	    	  	    	    	    	    	    	    	});
	    	  	    	    	    	    	    			
	    	  	    	    	    	    	    				
	    	  	    	    	    	    	    			}else{
	    	  	    	    	    	    	    			errmsg = invocationResult.faml.response.rc.errormessage;
	    	  	    	    	    	    	    			handleError(invocationResult.faml.response);
	    	  	    	    	    	    	    		}
	    	  	    	    	    	    	    		}else{
	    	  	    	    	    	    					handleErrorNoResponse();
	    	  	    	    	    	    				}
	    	  	    	    	    	    	    	}
	    	  	    	    	    	    	    };    	    
	    	  	    	    	    	  	    

	    	  	    	    	    	    	    /**************Statement on Email**********************/
	    	  	    	    	    	    	    
	    	  	    	    	    	    	    /**************Autopay Register**********************/
	    	  	    	    	    	    	    
	    	  	    	    	    	    	  this.callrrapr00 = function(){
	  	    	  	    	    	    	    	
	  	    	  	    	    	    	    	reqParams = {};

	  	    	  	    	    	    	    	reqParams["fldDeviceId"] = fldDeviceId;
	  	    	  	    	    	    	    	reqParams["fldWebServerId"] = fldWebServerId;
	  	    	  	    	    	    	    	reqParams["fldAppId"] = fldAppId;
	  	    	  	    	    	    	    	reqParams["fldAppServerId"] = fldAppServerId;
	  	    	  	    	    	    	    	reqParams["fldLangId"] = fldLangId;
	  	    	  	    	    	    	    	reqParams["fldModule"] = fldModule;
	  	    	  	    	    	    	    	reqParams["fldSwitchAppId"] = "";
	  	    	  	    	    	    	    	reqParams["fldModule"] = "CH";
	  	    	  	    	    	    	    	reqParams["fldTxnId"] = "APR";
	  	    	  	    	    	    	    	reqParams["fldLogoffReq"] = "N";
	  	    	  	    	    	    	    	reqParams["fldAmcId"] = "ALL";
	  	    	  	    	    	    	    	reqParams["fldRoleId"] = "";
	  	    	  	    	    	    	    	reqParams["fldReportDate"] = getCurrdate();
								reqParams["fldMeapPCIDSSFlag"] = "true";
	  	    	  	    	    	    	    	reqParams["fldCardNo"] = "";
	  	    	  	    	    	    	    	reqParams["fldScrnSeqNbr"] = "01";
	  	    	  	    	    	    	    	
	  	    	  	    	    	    	    	
	  	    	  	    	    	    	    	
	  	    	  	    	    	    	    reqParams["fldRequestId"] =RegfldRequestId;

	  	    	  	    	    	    	fldjsessionid = Regfldjsessionid;
	  	    	  	    	    	    	reqParams["fldLoginUserId"] =Regloginuid;
	  	    	  	    	    	    	reqParams["fldSessionId"] = Rsessionid;
	  	    	  	    	    	    	    	
	  	    	  	    	    	    	    	busyInd.show();
	  	    	  	    	    	    	    	var invocationData = {
	  	    	  	    	    	    	    			adapter : "CreditCard",
	  	    	  	    	    	    	        		procedure : "RRAPR01",
	  	    	  	    	    	    	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	  	    	  	    	    	    	    	};
	  	    	  	    	    	    	    	
	  	    	  	    	    	    	    	WL.Client.invokeProcedure(invocationData, {
	  	    	  	    	    	    	    		onSuccess : loadrrapr00,
	  	    	  	    	    	    	    		onFailure : AdapterFail,	    		
	  	    	  	    	    	    	    		timeout: timeout
	  	    	  	    	    	    	    	});
	  	    	  	    	    	    	    	
	  	    	  	    	    	    	    
	  	    	  	    	    	    	    	$("#contentData").load("Views/Credit/rrapr00.html", null, function (response, status, xhr) {
	  	    	  	    	    	    	            if (status != "error") {}
	  	    	  	    	    	    	   
	  	    	  	    	    	    	            ko.applyBindings(self, $(".dynamic-page-content").get(0));     
	  	    	  	    	    	    	    	
	  	    	  	    	    	    	            
	  	    	  	    	    	    	            
	  	    	  	    	    	    	                
	  	    	  	    	    	    	    	});
	  	    	  	    	    	    	   
	  	    	  	    	    	    	    };

	  	    	  	    	    	    	    loadrrapr00 = function(result){
	  	    	  	    	    	    	    busyInd.hide();
	  	    	  	    	    	    	    invocationResult = result.invocationResult;
	  	    	  	    	    	    	    if(invocationResult.isSuccessful) {
	  	    	  	    	    	    	    	if(invocationResult.faml.response){	
	  	    	  	    	    	    	    	if(invocationResult.faml.response.rc.returncode == 0){
	  	    	  	    	    	    	    		
	  	    	  	    	    	    	    		if(window.location.hash == "#rrapr00"){
	  	    	  	    	    	    	    			
	  	    	  	    	    	    	    			cardcount=invocationResult.faml.response.ccacctlist.ccacctdetails;
	  	    	  	    	    	    	    			totAccount=cardcount.length;
	  	    	  	    	    	    	    		
	  	    	  	    	    	    	    			if(cardcount)
	  	    	  	    	    	    	    			{$('#ErrMsg').hide();}
	  	    	  	    	    	    	    		else{
	  	    	  	    	    	    	    			$('#ErrMsg').show();
	  	    	  	    	    	    	    		}
	  	    	  	    	    	    	    			ccaccountList1.removeAll();
	  	    	  	    	    	    	    		ccaccountList2.removeAll();
	  	    	  	    	    	    	   
	  	    	  	    	    	    	    			
	  	    	  	    	    	    	        	    $(cardcount).each(function(index, obj) {
	  	    	  	    	    	    	        	    	
	  	    	  	    	    	    	        	    	

	  	    	  	    	    	    	        		ccaccountList1.push({ cardNo: obj.cardno,cardDet:obj.cardno+"###"+obj.autopayacct+"###"+obj.autopaytype+"###"+obj.cardaanno});
	  	    	  	    	    	    	        	
	  	    	  	    	    	    	        		});
	  	    	  	    	    	    	        	var acc=invocationResult.faml.response.acctlist;
	  	    	  	    	    	    	    		var accArr=[];
	  	    	  	    	    	    	      
	  	    	  	    	    	    	   var i=0;
   	  	    	    	    	        	    
	  	    	  	    	    	    	       
   	  	    	    	    	        	    
   	  	    	    	    	        	  if(typeof(invocationResult.faml.response.acctlist.acctno)=='object'){

   	  	    	    	    	        		acc=invocationResult.faml.response.acctlist.acctno;

   	  	    	    	    	        	$(acc).each(function(index, obj) {
  	    	    	    	        	    	 ccaccountList2.push({ accNo: acc[index]});    	  	    	    	    	        	
     	  	    	    	    	        		});
   	  	    		        				}
   	  	    		        				else{

   	  	    		        					$(acc).each(function(index, obj) {
   	  	    		        					ccaccountList2.push({ accNo: obj.acctno});   	  	    										
   	  	    									});
   	  	    		        				} 
   	  	    	    	    	        	    
   	  	    	    	    	        	    
   	  	    	    	    	        	    
   	  	    	    	    	        	    	$("#fldRequestId").val(invocationResult.faml.response.mci.requestid);
   	  	    	    	    	        	    	
	  	    	  	    	    	    	    		}
	  	    	  	    	    	    	    	}else{
	  	    	  	    	    	    	    		errmsg = invocationResult.faml.response.rc.errormessage;
	  	    	  	    	    	    	    	handleError(invocationResult.faml.response);
	  	    	  	    	    	    	    	}
	  	    	  	    	    	    	    	}else{
	  	    	  	    	    	    	    		handleErrorNoResponse();
	  	    	  	    	    	    	    	}
	  	    	  	    	    	    	    }
	  	    	  	    	    	    	    };
	  	    	  	    	    	    	    self.rrapr00Submit  = function(){
	  	    	  	    	    	    	    self.SelectVisibleFlag(true); 
		    	      	    	    	    	 self.SelectVisible(true);
	  	    	  	    	    	    	    	if($("#frmrrapr00").valid()){
	  	    	  	    	    	    	    		
	  	    	  	    	    	    	    	var crd=$("#selCard option:selected").text();
  	    	  	    	    	    	    		var accDet=$("#selCard").val();
  	    	  	    	    	    	    		accDetarr=accDet.split("###");
  	    	  	    	    	    	    		
  	    	  	    	    	    	    		window.location = "#rrapr01";
	  	    	  	    	    	    	    	$("#contentData").load("Views/Credit/rrapr01.html", null, function (response, status, xhr) {
	  	    	  	    	    	    	    	if (status != "error") {}
	  	    	  	    	    	    	    	
	  	    	  	    	    	    	    	$('#cardNum').html(crd);
	  	    	  	    	    	    	    	$("#fldCardNo").val(accDetarr[0]);
	  	    	  	    	    	    	    	
	  	    	  	    	    	    	    	payAcct = accDetarr[1];
	  	    	  	    	    	    	    	payType = accDetarr[2];
							        fldCardAANNo = accDetarr[3];
	  	    	  	    	    	    	    
	  	    	  	    	    	    	    	
	  	    	  	    	    	    	    	if(payAcct != ''){
	  	    	  	    	    	    	    		self.SelectVisible(false);
	  	    	  	    	    	    	    		self.SelectVisibleFlag(false);
	  	    	  	    	    	    	    		
	  	    	  	    	    	    	    		$("#tempflag").val('yes');
	  	    	  	    	    	    	    		
	  	    	  	    	    	    	    		$("#fldCasaAcct").html(payAcct);
	  	    	  	    	    	    	    		$("#fldCasaAcctNo,#fldCasaAcctNo1").val(payAcct);
	  	    	  	    	    	    	    		
	  	    	  	    	    	    	    		$("#fldRegFlag").val('M');
	  	    	  	    	    	    	    		
	  	    	  	    	    	    	    		if(payType == 'T'){
	  	    	  	    	    	    	    			$("#fldPayFlagtext").html("Minimum Amount Due");
	  	    	  	    	    	    	    			$("#fldPayFlag").val('M');
	  	    	  	    	    	    	    			
	  	    	  	    	    	    	    		}
	  	    	  	    	    	    	    		else if(payType == 'M'){
	  	    	  	    	    	    	    			$("#fldPayFlagtext").html("Total Amount Due");
	  	    	  	    	    	    	    			$("#fldPayFlag").val('T');
	  	    	  	    	    	    	    			
	  	    	  	    	    	    	    		}
	  	    	  	    	    	    	    	}
	  	    	  	    	    	    	    	else{
		  	    	  	    	    	    	    	self.SelectVisible(true);
	  	    	  	    	    	    	    		self.SelectVisibleFlag(true);
	  	    	  	    	    	    	    		$("#fldRegFlag").val("Y");
	  	    	  	    	    	    	    		
	  	    	  	    	    	    	    		$("#tempflag").val('no');
	  	    	  	    	    	    	    		
	  	    	  	    	    	    	    	}
	  	    	  	    	    	    	    	
	  	    	  	    	    	    	    ko.applyBindings(self, $(".dynamic-page-content").get(0));
	  	    	  	    	    	    	    
	  	    	  	    	    	    	
	  	    	  	    	    	    	
	  	    	  	    	    	    	    	});
	  	    	  	    	    	    	    	
	  	    	  	    	    	    	    	}
	  	    	  	    	    	    	    	
	  	    	  	    	    	    	    };
	  	    	  	    	    	    	    
	  	    	  	    	    	    self.selectionChangedAcc= function(event) {
	  	    	  	    	    	    		$('#fldCasaAcctNo_txt').val($('#fldCasaAcctNo').val());
	  	    	  	    	    	        
	  	    	  	    	    	    }; 
	  	    	  	    	    		 self.selectionChangedFlag= function(event) {
	  	    	  	    	    	    		$('#fldPayFlag_txt').val($('#fldPayFlag').val());
	  	    	  	    	    	        
	  	    	  	    	    	    }; 
	  	    	  	    	    	    	 
	  	    	  	    	        	    self.rrapr01Submit  = function(){
  	    	  	    	    	    	        
  	    	  	    	    	    	    	if($("#frmrrapr01").valid()){
  	    	  	    	    	    	    	busyInd.show();        	
  	    	  	    	    	    	 	fldLoginUserId = Regloginuid;
  	    	  	    	    	    	fldFCDBSessionId = RegfldFCDBSessionId;
  	    	  	    	            	fldjsessionid = Regfldjsessionid;
  	    	  	    	            	fldSessionId = Rsessionid;
  	    	  	    	    	    	    	
  	    	  	    	    	    	    	fldEntityId = "";    	    	
  	    	  	    	    	    	       		    	
	  	    	  	    	    	    	    var $form = $("#frmrrapr01");
		  	    		    	    	    	rsaDataArray = $form.serializeArray();    	
		  	    		    	    	    	    	    	
		  	    		    	    	    	reqParams = {};
		  	    		    	    	    	for (var i in rsaDataArray) {
		  	    		    	    	    		reqParams[rsaDataArray[i].name] = rsaDataArray[i].value;
		  	    		    	    	    		
		  	    		    	    	    	}
  	    	  	    	    	    	    	
	  	    		    	    	    		tflag = $("#tempflag").val();
  	    	  	    	    	    	   
	  	    		    	    	    		if(tflag == 'yes'){
	  	    		    	    	    			tmpaccno = $("#fldCasaAcctNo1").val();
	  	    		    	    	    			 reqParams["fldCasaAcctNo"] =tmpaccno;
	 	    	  	    	    	    	    	 reqParams["fldAutoAcctNo"] =tmpaccno;
	  	    		    	    	    		}
	  	    		    	    	    		
  	    	  	    	    	    	    
  	    	  	    	    	    	        payFlag=$("#fldPayFlag").val();
  	    	  	    	    	    	    	payFlagN="";	
  	    	  	    	    	   
  	    	  	    	    	    	    	reqParams["fldDeviceId"] = fldDeviceId;
                                                        reqParams["fldMeapPCIDSSFlag"] = "true";
  	    	  	    	    	    	    	reqParams["fldWebServerId"] = fldWebServerId;
  	    	  	    	    	    	    	reqParams["fldAppId"] = fldAppId;
  	    	  	    	    	    	    	reqParams["fldAppServerId"] = fldAppServerId;
  	    	  	    	    	    	    	reqParams["fldLangId"] = fldLangId;
							reqParams["fldCardAANNo"] = fldCardAANNo;
												
  	    	  	    	    	    	    		reqParams["fldModule"] = fldModule;
  	    	  	    	    	    	    	reqParams["fldTxnId"] = "APR";
  	    	  	    	    	    	    	reqParams["fldScrnSeqNbr"] = "02";
  	    	  	    	    	    	    	
  	    	  	    	    	    	    	reqParams["selCard"] =$("#fldCardNo").val();
  	    	  	    	    	    	    


  	    	  	    	    	    	fldjsessionid = Regfldjsessionid;
  	    	  	    	    	    	reqParams["fldLoginUserId"] =Regloginuid;
  	    	  	    	    	    	reqParams["fldSessionId"] = Rsessionid;
  	    	  	    	    	    	
  	    	  	    	    	    	
  	    	  	    	    	    	    	var invocationData = {
  	    	  	    	    	    	    			adapter : "CreditCard",
  	    	  	    	    	    	        		procedure : "RRAPR02",
  	    	  	    	    	    	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
  	    	  	    	    	    	    	};
  	    	  	    	    	    	    	
  	    	  	    	    	    	    	//WL.Logger.debug(invocationData, '');
  	    	  	    	    	    	    	WL.Client.invokeProcedure(invocationData, {
  	    	  	    	    	    	    		onSuccess :  rrapr02Response,
  	    	  	    	    	    	    		onFailure : AdapterFail,
  	    	  	    	    	    	    		timeout: timeout
  	    	  	    	    	    	    	});
  	    	  	    	    	    	    	}
  	    	  	    	    	    	    };   
	  	    	  	    	    	    	    
	  	    	  	    	    	    	    
  	    	  	    	    	    	 self.rrapr02Submit   = function(){
	    	  	    	    	    	        
	    	  	    	    	    	    	if($("#frmrrapr02").valid()){
	    	  	    	    	    	    	busyInd.show();        	
	    	  	    	    	    	   	fldLoginUserId = Regloginuid;
	    	  	    	    		    	fldFCDBSessionId = RegfldFCDBSessionId;
	    	  	    	    	        	fldjsessionid = Regfldjsessionid;
	    	  	    	    	        	fldSessionId = Rsessionid;
	    	  	    	    	    	    	
	    	  	    	    	    	    	
	    	  	    	    	    	    	
	    	  	    	    	    	    	fldEntityId = "";    	    	
	    	  	    	    	    	       	
	    	  	    	    	    	    	var $form = $("#frmrrapr02");
	    	  	    	  	    	    	rsaDataArray = $form.serializeArray();    	
	    	  	    	  	    	    	    	    	
	    	  	    	  	    	    	reqParams = {};
	    	  	    	  	    	    	for (var i in rsaDataArray) {
	    	  	    	  	    	    		reqParams[rsaDataArray[i].name] = rsaDataArray[i].value;
	    	  	    	  	    	    		
	    	  	    	  	    	    	}
	    	  	    	    	    	 
	    	  	    	    	    	    	reqParams["fldCardAANNo"] = fldCardAANNo;
	    	  	    	    	    	    	reqParams["fldDeviceId"] = fldDeviceId;
                                                        reqParams["fldMeapPCIDSSFlag"] = "true";
	    	  	    	    	    	    	reqParams["fldWebServerId"] = fldWebServerId;
	    	  	    	    	    	    	reqParams["fldAppId"] = fldAppId;
	    	  	    	    	    	    	reqParams["fldAppServerId"] = fldAppServerId;
	    	  	    	    	    	    	reqParams["fldLangId"] = fldLangId;
	    	  	    	    	    	    	reqParams["fldModule"] = "CH";
	    	  	    	    	    	    	reqParams["fldTxnId"] = "APR";
	    	  	    	    	    	    	reqParams["fldScrnSeqNbr"] = "03";
	    	  	    	    	    	    	
	    	  	    	    	    	    

	    	  	    	    	  	    	fldjsessionid = Regfldjsessionid;
	    	  	    	    	  	    	reqParams["fldLoginUserId"] =Regloginuid;
	    	  	    	    	  	    	reqParams["fldSessionId"] = Rsessionid;

	    	  	    	    	    	    	var invocationData = {
	    	  	    	    	    	    			adapter : "CreditCard",
	    	  	    	    	    	        		procedure : "RRAPR03",
	    	  	    	    	    	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	    	  	    	    	    	    	};
	    	  	    	    	    	    	
	    	  	    	    	    	    	//WL.Logger.debug(invocationData, '');
	    	  	    	    	    	    	WL.Client.invokeProcedure(invocationData, {
	    	  	    	    	    	    		onSuccess :  rrapr03Response,
	    	  	    	    	    	    		onFailure : AdapterFail,
	    	  	    	    	    	    		timeout: timeout
	    	  	    	    	    	    	});
	    	  	    	    	    	    	}
	    	  	    	    	    	    };   
	  	    	  	    	    	    	    
  	    	  	    	    	    	    
	    	  	    	    	    	  rrapr03Response = function(result){
	  	    	    	    	    	    	busyInd.hide();
	  	    	    	    	    	    	invocationResult = result.invocationResult;
	  	    	    	    	    	    	if(invocationResult.isSuccessful) {
	  	    	    	    	    	    		if(invocationResult.faml.response){	
	  	    	    	    	    	    		if(invocationResult.faml.response.rc.returncode == 0){
	  	    	    	    	    	    			window.location = "#rrapr03";
	  	    	    	    	    	    			$("#contentData").load("Views/Credit/rrapr03.html", null, function (response, status, xhr) {
	  	    	    	    	    	    	            if (status != "error") {}
	  	    	    	    	    	    	            
	  	    	    	    	    	    	          var refNum=invocationResult.faml.response.codtxnrefno;
	  	    	    	    	    	    	           var cardNum=invocationResult.faml.request.fldCardNo;
	  	    	    	    	    	    	           var accNo=invocationResult.faml.request.fldAutoAcctNo;
	  	    	    	    	    	    	       var fldpayflag=invocationResult.faml.request.fldPayFlag;
								var fldCardAANNo=invocationResult.faml.request.fldCardAANNo;
	  	    	    	    	    	    	           var paytype="";
	  	    	    	    	    	    	        
	  	    	    	    	    	    	           if(fldpayflag=="M"){
	  	    	    	    	    	    	        	 paytype='Minimum Amount Due';
	  	    	    	    	    	    	        	$('#payType').html(paytype);
	  	    	    	    	    	    	           }
	  	    	    	    	    	    	           
	  	    	    	    	    	    	         if(fldpayflag=="T"){
	  	    	    	    	    	    	        	paytype='Total Amount Due';
	  	    	    	    	    	    	        	$('#payType').html(paytype); 
	  	    	    	    	    	    	           }
	  	    	    	    	    	    	       
	  	    	    	    	    	    	         $('#codtxnrefno').html(refNum);	  	   
	  	    	    	    	    	    	         $('#fldCardNo').html(cardNum);	  	    	    	    	    	    	            
	  	    	    	    	    	    	         
	  	    	    	    	    	    	         $('#fldAutoAcctNo').html(accNo);
														 
								$('#fldCardAANNo').html(fldCardAANNo);
	  	    	    	    	    	    	         
	  	    	    	    	    	    	            
	  	    	    	    	    	    	            ko.applyBindings(self, $(".dynamic-page-content").get(0));
	  	    	    	    	    	    	    	});
	  	    	    	    	    	    			
	  	    	    	    	    	    				
	  	    	    	    	    	    			}else{
	  	    	    	    	    	    			errmsg = invocationResult.faml.response.rc.errormessage;
	  	    	    	    	    	    			handleError(invocationResult.faml.response);
	  	    	    	    	    	    		}
	  	    	    	    	    	    		}else{
	  	    	    	    	    					handleErrorNoResponse();
	  	    	    	    	    				}
	  	    	    	    	    	    	}
	  	    	    	    	    	    };    	 
	    	    	    	    	      
	  	    	  	     	    	    	   
	  		    	  	    	    	    	    
	  	    	  	    	    	
	  		    	  	    	    	    	rrapr02Response = function(result){
	  	    	  	    	    	    	    	    	busyInd.hide();
	  	    	  	    	    	    	    	    	invocationResult = result.invocationResult;
	  	    	  	    	    	    	    	    	if(invocationResult.isSuccessful) {
	  	    	  	    	    	    	    	    		if(invocationResult.faml.response){	
	  	    	  	    	    	    	    	    		if(invocationResult.faml.response.rc.returncode == 0){
	  	    	  	    	    	    	    	    			window.location = "#rrapr02";
	  	    	  	    	    	    	    	    			$("#contentData").load("Views/Credit/rrapr02.html", null, function (response, status, xhr) {
	  	    	  	    	    	    	    	    	            if (status != "error") {}
	  	    	  	    	    	    	    	    	            
	  	    	  	    	    	    	    	    	      
	  	    	  	    	    	    	    	    	           var cardNum=invocationResult.faml.response.fldCardNo;
	  	    	  	    	    	    	    	    	           var accNo=invocationResult.faml.response.fldCasaAcctNo;
	  	    	  	    	    	    	    	    	       var fldpayflag=invocationResult.faml.request.fldPayFlag;
	  	    	  	    	    	    	    	    	           var paytype="";
	  	    	  	    	    	    	    	    	           
	  	    	  	    	    	    	    	    	           if(fldpayflag=="M"){
	  	    	  	    	    	    	    	    	        	paytype='Minimum Amount Due';
	  	    	  	    	    	    	    	    	        	 
	  	    	  	    	    	    	    	    	           }
	  	    	  	    	    	    	    	    	           
	  	    	  	    	    	    	    	    	         if(fldpayflag=="T"){
	  	    	  	    	    	    	    	    	        	paytype='Total Amount Due';
	  	    	  	    	    	    	    	    	        	 
	  	    	  	    	    	    	    	    	           }
	  	    	  	    	    	    	    	    	           
	  	    	  	    	    	    	    	    	            $('#fldcardno').html(cardNum);
	  	    	  	    	    	    	    	    	            $('#fldcasaacctno').html(accNo);
	  	    	  	    	    	    	    	    	            $('#payType').html(paytype);
	  	    	  	    	    	    	    	    	           
	  	    	  	    	    	    	    	    	        $('#fldCardNo').val(invocationResult.faml.response.fldCardNo);
	  	    	  	    	    	    	    	    	    $('#fldCasaAcctNo').val(invocationResult.faml.response.fldCasaAcctNo);
	  	    	  	    	    	    	    	    	 $('#fldAutoAcctNo').val(invocationResult.faml.response.fldCasaAcctNo);
	  	    	  	    	    	    	    	     $('#fldRegFlag').val(invocationResult.faml.response.fldRegFlag);
	  	    	  	    	    	    	    	   $('#fldPayFlag').val(invocationResult.faml.response.fldPayFlag);
	  	    	  	    	    	    	    	    	       
	  	    	  	    	    	    	    	    $('#fldCardAANNo').html(invocationResult.faml.response.fldCardAANNo);	            
	  	    	  	    	    	    	    	    	               
	  	    	  	    	    	    	    	    	            
	  	    	  	    	    	    	    	    	            
	  	    	  	    	    	    	    	    	            ko.applyBindings(self, $(".dynamic-page-content").get(0));
	  	    	  	    	    	    	    	    	    	});
	  	    	  	    	    	    	    	    			
	  	    	  	    	    	    	    	    				
	  	    	  	    	    	    	    	    			}else{
	  	    	  	    	    	    	    	    			errmsg = invocationResult.faml.response.rc.errormessage;
	  	    	  	    	    	    	    	    		handleError(invocationResult.faml.response);
	  	    	  	    	    	    	    	    		}
	  	    	  	    	    	    	    	    		}else{
	  	    	  	    	    	    	    	    			handleErrorNoResponse();
	  	    	  	    	    	    	    	    		}
	  	    	  	    	    	    	    	    	}
	  	    	  	    	    	    	    	    };    	 
	    	  	    	    	    	    	    
	    	  	    	    	    	    	    
	    	  	    	    	    	    	    /**************Autopay Register**********************/
	  	    	  	    	    	    	    	    
	  	    	  	    	    	    	    	/**************Autopay De-register**********************/
	  	    	  	    	    	    	    	    
	  	    	  	    	    	    	    	    
	  	    	  	    	    	    	    	  this.callrrapd01 = function(){
	  	    	  	    		    	    	    	
	  	    	  	    		    	    	    	
	  	    	  	    		    	    	    	
	  	    	  	    		    	    	    	if(window.location.hash == '#rrapd01'){
	  	    	  	    		    	    	    		templateId = "rrapd01";
	  	    	  	    		    	    	    	}else{
	  	    	  	    		    	    	    		templateId = "rrapd01";
	  	    	  	    		    	    	    	}
	  	    	  	    		    	    	    	
	  	    	  	    		    	    	    	$("#contentData").load("Views/Credit/"+templateId+".html", null, function (response, status, xhr) {
	  	    	  	    		    	    	            if (status != "error") {}
	  	    	  	    		    	    	            
	  	    	  	    		    	    	       
	  	    	  	    		    	    	            
	  	    	  	    		    	    	            ko.applyBindings(self, $(".dynamic-page-content").get(0));     
	  	    	  	    		    	    	    	
	  	    	  	    		    	    	            
	  	    	  	    		    	    	            
	  	    	  	    		    	    	                
	  	    	  	    		    	    	    	});
	  	    	  	    		    	    	   
	  	    	  	    		    	    	    };	    	    
	  	    	  	    	    	    	    	    
	  	    	  	    		    	    	  
	  	    	  	    		    	    	    self.rrapd01Submit    = function(){
	  	    	  	    	    	    	    	
	  	    	  	    	    	    	    	if($("#frmrrapd01").valid()){
	  	    	  	    	    	    	    		
	  	    	  	    	    	    	    		var accDet=$("#fldCardNo").val().split("#")[0];
	  	    	  	    	    	    	    		var fldCardAANNo=$("#fldCardNo").val().split("#")[1];
	  	    	  	    	    	    	    		
	  	    	  	    	    	    	    		
	  	    	  	    	    	    	    		
	  	    	  	    	    	    	    		reqParams = {};
	  		    	  	    	    	    	    	reqParams["fldDeviceId"] = fldDeviceId;
	  		    	  	    	    	    	    	reqParams["fldWebServerId"] = fldWebServerId;
	  		    	  	    	    	    	    	reqParams["fldAppId"] = fldAppId;
	  		    	  	    	    	    	    	reqParams["fldAppServerId"] = fldAppServerId;
	  		    	  	    	    	    	    	reqParams["fldLangId"] = fldLangId;
	  		    	  	    	    	    	    	reqParams["fldModule"] = fldModule;
	  		    	  	    	    	    	    	reqParams["fldSwitchAppId"] = "";
	  		    	  	    	    	    	    	reqParams["fldModule"] = "CH";
	  		    	  	    	    	    	    	reqParams["fldTxnId"] = "APD";
	  		    	  	    	    	    	    	reqParams["fldLogoffReq"] = "N";
	  		    	  	    	    	    	    	reqParams["fldAmcId"] = "ALL";
									reqParams["fldMeapPCIDSSFlag"] = "true";
	  		    	  	    	    	    	    	reqParams["fldRoleId"] = "";
	  		    	  	    	    	    	    	reqParams["fldReportDate"] = getCurrdate();
	  		    	  	    	    	    	    	reqParams["fldCardNo"] = accDet;
									reqParams["fldCardAANNo"] = fldCardAANNo;
	  		    	  	    	    	    	    	reqParams["fldScrnSeqNbr"] = "02";
	  		    	  	    	    	    	    	reqParams["selCard"] = accDet;
	  		    	  	    	    	    	    	reqParams["fldRegFlag"] = "N";
	  		    	  	    	    	    	    	
	  		    	  	    	    	    	    	
	  		    	  	    	    	    	    reqParams["fldRequestId"] =RegfldRequestId;

	  		    	  	    	    	    	fldjsessionid = Regfldjsessionid;
	  		    	  	    	    	    	reqParams["fldLoginUserId"] =Regloginuid;
	  		    	  	    	    	    	reqParams["fldSessionId"] = Rsessionid;
	  		    	  	    	    	    	    	
	  		    	  	    	    	    	    	
	  		    	  	    	    	    	    	busyInd.show();
	  		    	  	    	    	    	    	var invocationData = {
	  		    	  	    	    	    	    			adapter : "CreditCard",
	  		    	  	    	    	    	        		procedure : "RRAPD02",
	  		    	  	    	    	    	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	  		    	  	    	    	    	    	};
	  		    	  	    	    	    	    	
	  		    	  	    	    	    	    	WL.Client.invokeProcedure(invocationData, {
	  		    	  	    	    	    	    		onSuccess : loadrrapd02,
	  		    	  	    	    	    	    		onFailure : AdapterFail,	    		
	  		    	  	    	    	    	    		timeout: timeout
	  		    	  	    	    	    	    	});
	  		    	  	    	    	    	    	
	  	    	  	    	    	
	  	    	  	    	    	    	           
	  	    	  	    	    	    	    	}

	  	    	  	    	    	    	    	
	  	    	  	    	    	    	    	
	  	    	  	    	    	    	    	
	  	    	  	    	    	    	    	
	  	    	  	    	    	    	    };  	    
	  	    	  	    	    	    	    	    
	  	    	  	    	    	    	loadrrapd02 = function(result){
  		    	  	    	    	    	    busyInd.hide();
  		    	  	    	    	    	    invocationResult = result.invocationResult;
  		    	  	    	    	    	    if(invocationResult.isSuccessful) {
  		    	  	    	    	    	    	if(invocationResult.faml.response){	
  		    	  	    	    	    	    	if(invocationResult.faml.response.rc.returncode == 0){
  		    	  	    	    	    	    		
  		    	  	    	    	    	    		window.location = "#rrapd02";
  		    	      	    	    	    			$("#contentData").load("Views/Credit/rrapd02.html", null, function (response, status, xhr) {
  		    	      	    	    	    	            if (status != "error") {}
  		    	  
  		    	      	    	    	    	        
  		    	      	    	    	    		    
  		    	  	    	    	    	    		if(window.location.hash == "#rrapd02"){
  		    	  	    	    	    	    			
  		    	  	    	    	    	    			var fldcardno = invocationResult.faml.response.fldCardNo; 
  		    	  	    	    	    	    			var fldRegFlag= invocationResult.faml.response.fldRegFlag;
  		    	  	    	    	    	    			
  		    	  	    	    	    	    			$('#cardNum').html(fldcardno);
  		    	  	    	    	    	    			$('#fldRegFlag').val(fldRegFlag);
  		    	  	    	    	    	    			$('#fldCardAANNo').val(invocationResult.faml.response.fldCardAANNo);
  		    	  	    	    	    	
  		    	  	    	    
  		    	  	    	    	    	    	
  		    	  	    	    	    	    		
  		    	  	    	    	    	    	}
  		    	  	    	    	    	    		else{
  			    	  	    	    	  	    			accStmtData(invocationResult.faml);    
  			    	  	    	    	  	    			window.location = "#rrapd02";
  			    	  	    	    	      			} 
  		    	  	    	    	    	    	    ko.applyBindings(self, $(".dynamic-page-content").get(0));
  		    	      	    	    	    	    	});
  		    	      	    	    	    			}
  		    	  	    	    	    	    		
  		    	  	    	    	    	    		else{
  		    	  	    	    	    	    		errmsg = invocationResult.faml.response.rc.errormessage;
  		    	  	    	    	    	    	handleError(invocationResult.faml.response);
  		    	  	    	    	    	    	}
  		    	  	    	    	    	    	}else{
	  		    	  	    	    					handleErrorNoResponse();
	  		    	  	    	    				}
  		    	  	    	    	    	    }
  		    	  	    	    	    	    };	

  		    	  	    	    	    	    
  	    	  	    	    	    	    self.rrapd02Submit  = function(){
  	    	  	    	    	    	        
  	    	  	    	    	    	    	if($("#frmrrapd02").valid()){
  	    	  	    	    	    	    	busyInd.show();        	
  	    	  	    	    	    	 	fldLoginUserId = Regloginuid;
  	    	  	    	    	    	fldFCDBSessionId = RegfldFCDBSessionId;
  	    	  	    	            	fldjsessionid = Regfldjsessionid;
  	    	  	    	            	fldSessionId = Rsessionid;	
  	    	  	    	    	    	    	
  	    	  	    	    	    	    	
  	    	  	    	    	    	    	fldEntityId = "";    	    	
  	    	  	    	    	    	       	
  	    	  	    	    	    	    	    	    	
  	    	  	    	    	    	    	reqParams = {};
  	    	  	    	    	    	    	
  	    	  	    	    	    	    var cardNum=$('#cardNum').html();
  	    	  	    	    	    	    var fldRegFlag=$('#fldRegFlag').val();
  	    	  	    	    	    	  
  	    	  	    	    	    	    	
  	    	  	    	    	    	    	reqParams["fldDeviceId"] = fldDeviceId;
                                                        reqParams["fldMeapPCIDSSFlag"] = "true";
  	    	  	    	    	    	    	reqParams["fldWebServerId"] = fldWebServerId;
  	    	  	    	    	    	    	reqParams["fldAppId"] = fldAppId;
  	    	  	    	    	    	    	reqParams["fldAppServerId"] = fldAppServerId;
  	    	  	    	    	    	    	reqParams["fldLangId"] = fldLangId;
  	    	  	    	    	    	    	reqParams["fldModule"] = "CH";
  	    	  	    	    	    	    	reqParams["fldTxnId"] = "APD";
  	    	  	    	    	    	    	reqParams["fldScrnSeqNbr"] = "03";
							reqParams["fldCardAANNo"] = $('#fldCardAANNo').val();
  	    	  	    	    	    	    	reqParams["fldCardNo"] =cardNum;
  	    	  	    	    	    	    	reqParams["fldRegFlag"] =fldRegFlag;
  	    	  	    	    	    	    	

  	    	  	    	    	    	fldjsessionid = Regfldjsessionid;
  	    	  	    	    	    	reqParams["fldLoginUserId"] =Regloginuid;
  	    	  	    	    	    	reqParams["fldSessionId"] = Rsessionid;
  	    	  	    	    	    	    	

  	    	  	    	    	    	    	var invocationData = {
  	    	  	    	    	    	    			adapter : "CreditCard",
  	    	  	    	    	    	        		procedure : "RRAPD03",
  	    	  	    	    	    	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
  	    	  	    	    	    	    	};
  	    	  	    	    	    	    	
  	    	  	    	    	    	    	//WL.Logger.debug(invocationData, '');
  	    	  	    	    	    	    	WL.Client.invokeProcedure(invocationData, {
  	    	  	    	    	    	    		onSuccess :  rrapd03Response,
  	    	  	    	    	    	    		onFailure : AdapterFail,
  	    	  	    	    	    	    		timeout: timeout
  	    	  	    	    	    	    	});
  	    	  	    	    	    	    	}
  	    	  	    	    	    	    };   
  	    	  	    	    	    	rrapd03Response = function(result){
  	    	  	    	    	    	    	    	busyInd.hide();
  	    	  	    	    	    	    	    	invocationResult = result.invocationResult;
  	    	  	    	    	    	    	    	if(invocationResult.isSuccessful) {
  	    	  	    	    	    	    	    		if(invocationResult.faml.response){	
  	    	  	    	    	    	    	    		if(invocationResult.faml.response.rc.returncode == 0){
  	    	  	    	    	    	    	    			window.location = "#rrapd03";
  	    	  	    	    	    	    	    			$("#contentData").load("Views/Credit/rrapd03.html", null, function (response, status, xhr) {
  	    	  	    	    	    	    	    	            if (status != "error") {}
  	    	  	    	    	    	    	    	            
  	    	  	    	    	    	    	    	       var refNum=invocationResult.faml.response.codtxnrefno;
  	    	  	    	    	    	    	    	           var cardNum=invocationResult.faml.response.txndata.request.cardno;
  	    	  	    	    	    	    	    	         
  	    	  	    	    	    	    	    	           
  	    	  	    	    	    	    	    	   
  	    	  	    	    	    	    	    	            $('#cardNum').html(cardNum);
  	    	  	    	    	    	    	    	            $('#refNum').html(refNum);
  	    	  	    	    	    	    	    	            
  	    	  	    	    	    	    	    	           
  	    	  	    	    	    	    	    	            
  	    	  	    	    	    	    	    	             
  	    	  	    	    	    	    	    	            
  	    	  	    	    	    	    	    	               
  	    	  	    	    	    	    	    	            
  	    	  	    	    	    	    	    	            
  	    	  	    	    	    	    	    	            ko.applyBindings(self, $(".dynamic-page-content").get(0));
  	    	  	    	    	    	    	    	    	});
  	    	  	    	    	    	    	    			
  	    	  	    	    	    	    	    				
  	    	  	    	    	    	    	    			}else{
  	    	  	    	    	    	    	    			errmsg = invocationResult.faml.response.rc.errormessage;
  	    	  	    	    	    	    	    		handleError(invocationResult.faml.response);
  	    	  	    	    	    	    	    		}
  	    	  	    	    	    	    	    		}else{
	  	    	  	    	    	    	    				handleErrorNoResponse();
	  	    	  	    	    	    	    			}
  	    	  	    	    	    	    	    	}
  	    	  	    	    	    	    	    };  	    
	  	    	  	    	    	    	    	    
	  	    	  	    	    	    	    	    
	  	    	  	    	    	    	    	    
	  	    	  	    	    	    	    	    
	  	    	  	    	    	    	    	/**************Autopay De-register**********************/    
  	    	  	    	    	    	    	    
  	    	  	    	    	    	    	    
  	  	    	  	    	    	    	    	/**************New Credit card register**********************/   
  	    	  	    	    	    	    	   
	  	    	  	    	    	    	    	  this.callrrcac01 = function(){
	  	    	  	    		    	    	    	
	  	    	  	    		    	    	    	
	  	    	  	    		    	    	    	
	  	    	  	    		    	    	    	if(window.location.hash == '#rrcac01'){
	  	    	  	    		    	    	    		templateId = "rrcac01";
	  	    	  	    		    	    	    	}else{
	  	    	  	    		    	    	    		templateId = "rrcac01";
	  	    	  	    		    	    	    	}
	  	    	  	    		    	    	    	
	  	    	  	    		    	    	    	$("#contentData").load("Views/Credit/"+templateId+".html", null, function (response, status, xhr) {
	  	    	  	    		    	    	            if (status != "error") {}
	  	    	  	    		    	    	            
	  	    	  	    		    	    	       
	  	    	  	    		    	    	            
	  	    	  	    		    	    	            ko.applyBindings(self, $(".dynamic-page-content").get(0));     
	  	    	  	    		    	    	    	
	  	    	  	    		    	    	            
	  	    	  	    		    	    	            
	  	    	  	    		    	    	                
	  	    	  	    		    	    	    	});
	  	    	  	    		    	    	   
	  	    	  	    		    	    	    };	    	    
	  	    	  	    	    	    	    	    
	  	    	  	    		    	    	  
	  	    	  	    		    	    	    self.rrcac01Submit    = function(){
	  	    	  	    	    	    	    	
	  	    	  	    	    	    	    	if($("#frmrrcac01").valid()){
	  	    	  	    	    	    	    		
	  	    	  	    	    	    	    		//var accDet=$("#fldCardNo").val();
	  	    	  	    	    	    	    	$("#cardExpYear_txt").val($("#cardExpYear option:selected").text());
	  	    	  	    	    	    	        $("#cardExpMonth_txt").val($("#cardExpMonth option:selected").text());
	  	    	  	    	    	    	    $("#fldExpiryDate").val($("#cardExpMonth").val()+$("#cardExpYear").val());
	  	    	  	    	    	    	    
	  	    	  	    	    	    	    	var $form = $("#frmrrcac01");
	  	    	  	    		    	    	rsaDataArray = $form.serializeArray();    	
	  	    	  	    		    	    	    	    	
	  	    	  	    		    	    	reqParams = {};
	  	    	  	    		    	    	for (var i in rsaDataArray) {
	  	    	  	    		    	    		reqParams[rsaDataArray[i].name] = rsaDataArray[i].value;
	  	    	  	    		    	    		
	  	    	  	    		    	    	}	    		
	  	    	  	    	    	    	    		
	  	    	  	    	    	    	    		
	  		    	  	    	    	    	    	reqParams["fldDeviceId"] = fldDeviceId;
	  		    	  	    	    	    	    	reqParams["fldWebServerId"] = fldWebServerId;
	  		    	  	    	    	    	    	reqParams["fldAppId"] = fldAppId;
	  		    	  	    	    	    	    	reqParams["fldAppServerId"] = fldAppServerId;
	  		    	  	    	    	    	    	reqParams["fldLangId"] = fldLangId;
	  		    	  	    	    	    	    	reqParams["fldModule"] = fldModule;
	  		    	  	    	    	    	    	reqParams["fldSwitchAppId"] = "";
	  		    	  	    	    	    	    	reqParams["fldModule"] = "CH";
	  		    	  	    	    	    	    	reqParams["fldTxnId"] = "CAC";
	  		    	  	    	    	    	    	reqParams["fldLogoffReq"] = "N";
	  		    	  	    	    	    	    	reqParams["fldAmcId"] = "ALL";
	  		    	  	    	    	    	    	reqParams["fldRoleId"] = "";
	  		    	  	    	    	    	    	reqParams["fldReportDate"] = getCurrdate();
	  		    	  	    	    	    	    	
	  		    	  	    	    	    	    	reqParams["fldScrnSeqNbr"] = "02";
	  		    	  	    	    	    	    
	  		    	  	    	    	    	    	reqParams["fldRegFlag"] = "N";
	  		    	  	    	    	    	    	
	  		    	  	    	    	    	    	
	  		    	  	    	    	    	    reqParams["fldRequestId"] =RegfldRequestId;

	  		    	  	    	    	    	fldjsessionid = Regfldjsessionid;
	  		    	  	    	    	    	reqParams["fldLoginUserId"] =Regloginuid;
	  		    	  	    	    	    	reqParams["fldSessionId"] = Rsessionid;
	  		    	  	    	    	    	    	busyInd.show();
	  		    	  	    	    	    	    	var invocationData = {
	  		    	  	    	    	    	    			adapter : "CreditCard",
	  		    	  	    	    	    	        		procedure : "RRCAC02",
	  		    	  	    	    	    	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	  		    	  	    	    	    	    	};
	  		    	  	    	    	    	    	
	  		    	  	    	    	    	    	WL.Client.invokeProcedure(invocationData, {
	  		    	  	    	    	    	    		onSuccess : loadrrcac02,
	  		    	  	    	    	    	    		onFailure : AdapterFail,	    		
	  		    	  	    	    	    	    		timeout: timeout
	  		    	  	    	    	    	    	});
	  		    	  	    	    	    	    	
	  	    	  	    	    	
	  	    	  	    	    	    	           
	  	    	  	    	    	    	    	}

	  	    	  	    	    	    	    	
	  	    	  	    	    	    	    	
	  	    	  	    	    	    	    	
	  	    	  	    	    	    	    	
	  	    	  	    	    	    	    };  	    
	  	    	  	    	    	    	    	    
	  	    	  	    	    	    	loadrrcac02 = function(result){
		    	  	    	    	    	    busyInd.hide();
		    	  	    	    	    	    invocationResult = result.invocationResult;
		    	  	    	    	    	    if(invocationResult.isSuccessful) {
		    	  	    	    	    	    	if(invocationResult.faml.response){	
		    	  	    	    	    	    	if(invocationResult.faml.response.rc.returncode == 0){
		    	  	    	    	    	    		
		    	  	    	    	    	    		window.location = "#rrcac02";
		    	      	    	    	    			$("#contentData").load("Views/Credit/rrcac02.html", null, function (response, status, xhr) {
		    	      	    	    	    	            if (status != "error") {}
		    	  
		    	      	    	    	    	        
		    	      	    	    	    		    var strMsg;
		    	      	    	    	    		    var strMsg2;
		    	  	    	    	    	    		if(window.location.hash == "#rrcac02"){
		    	  	    	    	    	    			if(invocationResult.faml.response.cardExists=="N"){
																fldCardNo=invocationResult.faml.response.fldCardNo
																var cardno = fldCardNo.substring(0,6)+"XXXXXX"+fldCardNo.substring(12,16);
		    	  	    	    	    	    				strMsg='Your card <b>'+cardno+'</b> is successfully registered.';
		    	  	    	    	    	    				$('#str1').html(strMsg);	
		    	  	    	    	    	    				
		    	  	    	    	    	    				$('#frmrrcac02').hide();
		    	  	    	    	    	    				$('#Succ1').show();
		    	  	    	    	    	    			}
		    	  	    	    	    	    			else if(invocationResult.faml.response.cardExists=="Y"){
		    	  	    	    	    	    				
																
																fldCardNo=invocationResult.faml.response.fldCardNo
																var cardno = fldCardNo.substring(0,6)+"XXXXXX"+fldCardNo.substring(12,16);
																
		    	  	    	    	    	    				strMsg2='Your card '+cardno+' is already registered with user '+invocationResult.faml.response.cardexistsforuser+'. Do you wish to deregister the card with that user and register it with the currently logged in user?';
														    	
															
		    	  	    	    	    	    				$("#fldCardNo").val(invocationResult.faml.response.fldCardNo);
		    	  	    	    	    	    				$("#fldPin").val(invocationResult.faml.response.fldpin);
		    	  	    	    	    	    				$("#fldExpiryDate").val(invocationResult.faml.response.fldexpirydate);
		    	  	    	    	    	    				$("#fldCardUser").val(invocationResult.faml.response.cardexistsforuser);
		    	  	    	    	    	    				$('#str2').html(strMsg2);
		    	  	    	    	    	    				$('#frmrrcac02').show();
		    	  	    	    	    	    				$('#Succ1').hide();
		    	  	    	    	    	    				$('#cardNum').html(invocationResult.faml.response.fldCardNo);
			    	  	    	    	    	    			$('#fldRegFlag').val(invocationResult.faml.response.fldRegFlag);
		    	  	    	    	    	    			}
		    	  	    	    	    	    			
		    	  	    	    	    	    		
		    	  	    	    	    	    			
		    	  	    	    	    	    		
		    	  	    	    	    	    			
		    	  	    	    	    	
		    	  	    	    
		    	  	    	    	    	    	
		    	  	    	    	    	    		
		    	  	    	    	    	    	}
		    	  	    	    	    	    		else{
			    	  	    	    	  	    			accStmtData(invocationResult.faml);    
			    	  	    	    	  	    			window.location = "#rrcac02";
			    	  	    	    	      			} 
		    	  	    	    	    	    	    ko.applyBindings(self, $(".dynamic-page-content").get(0));
		    	      	    	    	    	    	});
		    	      	    	    	    			}
		    	  	    	    	    	    		
		    	  	    	    	    	    		else{
		    	  	    	    	    	    		errmsg = invocationResult.faml.response.rc.errormessage;
		    	  	    	    	    	    	handleError(invocationResult.faml.response);
		    	  	    	    	    	    	}
		    	  	    	    	    	    	}else{
			    	  	    	    	  				handleErrorNoResponse();
			    	  	    	    	  			}
		    	  	    	    	    	    }
		    	  	    	    	    	    };	

		    	  	    	    	    	    
	    	  	    	    	    	    self.rrcac02Submit  = function(){
	    	  	    	    	    	        
	    	  	    	    	    	    	if($("#frmrrcac02").valid()){
	    	  	    	    	    	    		var $form = $("#frmrrcac02");
		  	    	  	    		    	    	rsaDataArray = $form.serializeArray();    	
		  	    	  	    		    	    	    	    	
		  	    	  	    		    	    	reqParams = {};
		  	    	  	    		    	    	for (var i in rsaDataArray) {
		  	    	  	    		    	    		reqParams[rsaDataArray[i].name] = rsaDataArray[i].value;
		  	    	  	    		    	    		
		  	    	  	    		    	    	}	    		
		  	    	  	    	    	    	    		
		  	    	  	    	    	    	    		
		  		    	  	    	    	    	    	reqParams["fldDeviceId"] = fldDeviceId;
		  		    	  	    	    	    	    	reqParams["fldWebServerId"] = fldWebServerId;
		  		    	  	    	    	    	    	reqParams["fldAppId"] = fldAppId;
		  		    	  	    	    	    	    	reqParams["fldAppServerId"] = fldAppServerId;
		  		    	  	    	    	    	    	reqParams["fldLangId"] = fldLangId;
		  		    	  	    	    	    	    	reqParams["fldModule"] = fldModule;
		  		    	  	    	    	    	    	reqParams["fldSwitchAppId"] = "";
		  		    	  	    	    	    	    	reqParams["fldModule"] = "CH";
		  		    	  	    	    	    	    
		  		    	  	    	    	    	    	reqParams["fldLogoffReq"] = "N";
		  		    	  	    	    	    	    	reqParams["fldAmcId"] = "ALL";
		  		    	  	    	    	    	    	reqParams["fldRoleId"] = "";
		  		    	  	    	    	    	  
		  		    	  	    	    	    	    	
		  		    	  	    	    	    	    
		  		    	  	    	    	    	    
		  		    	  	    	    	    	    	reqParams["fldRegFlag"] = "N";
		  		    	  	    	    	    	    	
		  		    	  	    	    	    	    	
		  		    	  	    	    	    	    reqParams["fldRequestId"] =RegfldRequestId;

		  		    	  	    	    	    	fldjsessionid = Regfldjsessionid;
		  		    	  	    	    	    	reqParams["fldLoginUserId"] =Regloginuid;
		  		    	  	    	    	    	reqParams["fldSessionId"] = Rsessionid;
		  		    	  	    	    	    	    	
		  		    	  	    	    	    	    	
		  		    	  	    	    	    	    	busyInd.show();

	    	  	    	    	    	    	var invocationData = {
	    	  	    	    	    	    			adapter : "CreditCard",
	    	  	    	    	    	        		procedure : "RRCAC03",
	    	  	    	    	    	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	    	  	    	    	    	    	};
	    	  	    	    	    	    	
	    	  	    	    	    	    	//WL.Logger.debug(invocationData, '');
	    	  	    	    	    	    	WL.Client.invokeProcedure(invocationData, {
	    	  	    	    	    	    		onSuccess :  rrcac03Response,
	    	  	    	    	    	    		onFailure : AdapterFail,
	    	  	    	    	    	    		timeout: timeout
	    	  	    	    	    	    	});
	    	  	    	    	    	    	}
	    	  	    	    	    	    };   
	    	  	    	    	    	rrcac03Response = function(result){
	    	  	    	    	    	    	    	busyInd.hide();
	    	  	    	    	    	    	    	invocationResult = result.invocationResult;
	    	  	    	    	    	    	    	if(invocationResult.isSuccessful) {
	    	  	    	    	    	    	    		if(invocationResult.faml.response){	
	    	  	    	    	    	    	    		if(invocationResult.faml.response.rc.returncode == 0){
	    	  	    	    	    	    	    			window.location = "#rrcac03";
	    	  	    	    	    	    	    			$("#contentData").load("Views/Credit/rrcac03.html", null, function (response, status, xhr) {
	    	  	    	    	    	    	    	            if (status != "error") {}
	    	  	    	    	    	    	    	            
	    	  	    	    	    	    	    	          if(invocationResult.faml.response.cardexists=="N"){
																    	fldCardNo=invocationResult.faml.response.fldCardNo
																var cardno = fldCardNo.substring(0,6)+"XXXXXX"+fldCardNo.substring(12,16);
	  		    	  	    	    	    	    				var strMsg='Your card '+cardno+' is successfully registered.';
	  		    	  	    	    	    	    				$('#str1').html(strMsg);	
	  		    	  	    	    	    	    			
	  		    	  	    	    	    	    			}
	    	  	    	    	    	    	    	            
	    	  	    	    	    	    	    	               
	    	  	    	    	    	    	    	            
	    	  	    	    	    	    	    	            
	    	  	    	    	    	    	    	            ko.applyBindings(self, $(".dynamic-page-content").get(0));
	    	  	    	    	    	    	    	    	});
	    	  	    	    	    	    	    			
	    	  	    	    	    	    	    				
	    	  	    	    	    	    	    			}else{
	    	  	    	    	    	    	    			errmsg = invocationResult.faml.response.rc.errormessage;
	    	  	    	    	    	    	    			handleError(invocationResult.faml.response);
	    	  	    	    	    	    	    		}
	    	  	    	    	    	    	    		}else{
	    	  	    	    	    	    					handleErrorNoResponse();
	    	  	    	    	    	    				}
	    	  	    	    	    	    	    	}
	    	  	    	    	    	    	    };  	    
	  	    	  	    	    	    	    	    
	  	    	  	    	    	    	    	    
	  	    	  	    	    	    	    
  	    	  	    	    	    	    	    
  	    	  	    	    	    	    	    
  	    	  	    	    	    	    	    
  	    	  	    	    	    	    	    
  	    	  	    	    	    	    	    /**************New Credit card register**********************/   
   
	    	  	    	    	    	    	    
	    	  	    	    	    	    	  /**************Credit card Payment**********************/   
	  	    	  	    	    	    	    	   
	  	    	  	    	    	    	    	  this.callrrccp01 = function(){
	  	    	  	    		    	    	    	
	  	    	  	    		    	    	    	
	  	    	  	    		    	    	    	
	  	    	  	    		    	    	    	if(window.location.hash == '#rrccp01'){
	  	    	  	    		    	    	    		templateId = "rrccp01";
	  	    	  	    		    	    	    	}else{
	  	    	  	    		    	    	    		templateId = "rrccp01";
	  	    	  	    		    	    	    	}
	  	    	  	    		    	    	    	
	  	    	  	    		    	    	    	$("#contentData").load("Views/Credit/"+templateId+".html", null, function (response, status, xhr) {
	  	    	  	    		    	    	            if (status != "error") {}
	  	    	  	    		    	    	            
	  	    	  	    		    	    	       
	  	    	  	    		    	    	            
	  	    	  	    		    	    	            ko.applyBindings(self, $(".dynamic-page-content").get(0));     
	  	    	  	    		    	    	    	
	  	    	  	    		    	    	            
	  	    	  	    		    	    	            
	  	    	  	    		    	    	                
	  	    	  	    		    	    	    	});
	  	    	  	    		    	    	   
	  	    	  	    		    	    	    };	    	    
	  	    	  	    	    	    	    	    
	  	    	  	    		    	    	  
	  	    	  	    		    	    	    self.rrccp01Submit    = function(){
	  	    	  	    	    	    	    	
	  	    	  	    	    	    	    	if($("#frmrrccp01").valid()){
	  	    	  	    	    	    	    		
	  	    	  	    	    	    	    		//var accDet=$("#fldCardNo").val();
	  	    	  	    	    	    	    	$("#fldPmntType_txt").val($("#fldPmntType option:selected").text());
	  	    	  	    	    	    	    	var $form = $("#frmrrccp01");
	  	    	  	    		    	    	rsaDataArray = $form.serializeArray();    	
	  	    	  	    		    	    	    	    	
	  	    	  	    		    	    	reqParams = {};
	  	    	  	    		    	    	for (var i in rsaDataArray) {
	  	    	  	    		    	    		reqParams[rsaDataArray[i].name] = rsaDataArray[i].value;
	  	    	  	    		    	    		
	  	    	  	    		    	    	}	    		
	  	    	  	    	    	    	    		
	  	    	  	    	    	    	    		
	  		    	  	    	    	    	    	reqParams["fldDeviceId"] = fldDeviceId;
	  		    	  	    	    	    	    	reqParams["fldWebServerId"] = fldWebServerId;
	  		    	  	    	    	    	    	reqParams["fldAppId"] = fldAppId;
	  		    	  	    	    	    	    	reqParams["fldAppServerId"] = fldAppServerId;
	  		    	  	    	    	    	    	reqParams["fldLangId"] = fldLangId;
	  		    	  	    	    	    	    	reqParams["fldModule"] = fldModule;
	  		    	  	    	    	    	    	reqParams["fldSwitchAppId"] = "";
	  		    	  	    	    	    	    	reqParams["fldModule"] = "CH";
		  		    	  	    	    	    	    var pymtty = $("#fldPmntType option:selected").val();
		  		    	  	    	    	    	    if(pymtty!='HDFCOTH'){
		  		    	  	    	    	    	    	reqParams["fldMeapPCIDSSFlag"] = "true";
		  		    	  	    	    	    	    }
	  		    	  	    	    	    	    	
	  		    	  	    	    	    	    	reqParams["fldLogoffReq"] = "N";
	  		    	  	    	    	    	    	reqParams["fldAmcId"] = "ALL";
	  		    	  	    	    	    	    	reqParams["fldRoleId"] = "";
	  		    	  	    	    	    	    	reqParams["fldReportDate"] = getCurrdate();
	  		    	  	    	    	    	    	
	  		    	  	    	    	    	    	
	  		    	  	    	    	    	    
	  		    	  	    	    	    	    	reqParams["fldRegFlag"] = "N";
	  		    	  	    	    	    	    	
	  		    	  	    	    	    	    	
	  		    	  	    	    	    	    reqParams["fldRequestId"] =RegfldRequestId;

	  		    	  	    	    	    	fldjsessionid = Regfldjsessionid;
	  		    	  	    	    	    	reqParams["fldLoginUserId"] =Regloginuid;
	  		    	  	    	    	    	reqParams["fldSessionId"] = Rsessionid;
	  		    	  	    	    	    	    	
	  		    	  	    	    	    	    	
	  		    	  	    	    	    	    	busyInd.show();
	  		    	  	    	    	    	    	var invocationData = {
	  		    	  	    	    	    	    			adapter : "CreditCard",
	  		    	  	    	    	    	        		procedure : "RRCCP02",
	  		    	  	    	    	    	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	  		    	  	    	    	    	    	};
	  		    	  	    	    	    	    	//WL.Logger.debug(invocationData, '');
	  		    	  	    	    	    	    	WL.Client.invokeProcedure(invocationData, {
	  		    	  	    	    	    	    		onSuccess : loadrrccp02,
	  		    	  	    	    	    	    		onFailure : AdapterFail,	    		
	  		    	  	    	    	    	    		timeout: timeout
	  		    	  	    	    	    	    	});
	  		    	  	    	    	    	    	
	  	    	  	    	    	
	  	    	  	    	    	    	           
	  	    	  	    	    	    	    	}

	  	    	  	    	    	    	    	
	  	    	  	    	    	    	    	
	  	    	  	    	    	    	    	
	  	    	  	    	    	    	    	
	  	    	  	    	    	    	    };  	    
	  	    	  	    	    	    	    	    
	  	    	  	    	    	    	loadrrccp02 = function(result){
		    	  	    	    	    	    busyInd.hide();
		    	  	    	    	    	    invocationResult = result.invocationResult;
		    	  	    	    	    	    if(invocationResult.isSuccessful) {
		    	  	    	    	    	    	if(invocationResult.faml.response){	
		    	  	    	    	    	    	if(invocationResult.faml.response.rc.returncode == 0){
		    	  	    	    	    	    		if(invocationResult.faml.response.ccacctlist != undefined || invocationResult.faml.response.acctdtls!= undefined){
		    	  	    	    	    	    		
		    	  	    	    	        			
		    	  	    	    	        			if(invocationResult.faml.response.ccacctlist.ccacctdetails!= undefined){
		    	  	    	    	        				cccardcount=invocationResult.faml.response.ccacctlist.ccacctdetails;
		    	  	    	    	        				
			    	  	    	    	        			if(typeof(cccardcount)=="object"){
			    	  	    	    	        				totccAccount=cccardcount.length;
			    	  	    	    	        			}
			    	  	    	    	        			else if(typeof(cccardcount)=="string"){
			    	  	    	    	        				totccAccount=1;
			    	  	    	    	        			}
		    	  	    	    	        				
		    	  	    	    	        				
		    	  	    	    	        			}else{
		    	  	    	    	        				
		    	  	    	    	        				totccAccount=0;
		    	  	    	    	        			}
		    	  	    	    	        			
		    	  	    	    	        			if(invocationResult.faml.response.acctdtls!= undefined){
		    	  	    	    	        				acccardcount=invocationResult.faml.response.acctdtls;
		    	  	    	    	        				
		    	  	    	    	        				if(typeof(acccardcount)=="object"){
		    	  	    	    	        					totaccAccount=acccardcount.length;
			    	  	    	    	        			}
			    	  	    	    	        			else if(typeof(acccardcount)=="string"){
			    	  	    	    	        				totaccAccount=1;
			    	  	    	    	        			}
			    	  	    	    	        			totaccAccount=acccardcount.length;
		    	  	    	    	        				
		    	  	    	    	        			}else{
		    	  	    	    	        				
		    	  	    	    	        				totaccAccount=0;
		    	  	    	    	        			}
		    	  	    	    	        			
		    	  	    	    	        			
		    	  	    	    	        			
		    	  	    	    	    	    		if(invocationResult.faml.response.fldPmntType == 'HDFCREG' && totccAccount==0){
		    	  	    	    	    	    		alert("We are unable to carry out your instruction, currently. Please try later.");
		    	  	    	    	    	    		
		    	  	    	    	    	    		}
		    	  	    	    	    	    		
		    	  	    	    	    	    		else  if(totaccAccount==0 || totccAccount==0){
			    	  	    	    	    	    		alert(" Currently you do not have any active cards or accounts.");
			    	  	    	    	    	    		
		    	  	    	    	    	    		}
		    	  	    	    	    	    		else{
		    	  	    	    	    	    			
		    	  	    	    	    	    		ccaccountList3.removeAll();
		    	  	    	    	    	    		ccaccountList4.removeAll();
		    	  		    	    	        	    $(acccardcount).each(function(index, obj) {
		    	  		    	    	        	    	
		    	  		    	    	        	    	var acctbalance=obj.acctbalance;
		    	  		    	    	        	    	var codacctno=obj.codacctno;
		    	  		    	    	        	    	var codacctstat=obj.codacctstat;
		    	  		    	    	        	    	var nambranch=obj.nambranch;
		    	  		    	    	        	    	var namccyshrt=obj.namccyshrt;
		    	  		    	    	        	    	
		    	  		    	    	        	    	var accDetails=codacctno+"#"+nambranch+"#"+namccyshrt+"#"+acctbalance;
		    	  		    	    	        	    	var accDesc=codacctno+" - "+nambranch;	
		    	  		    	    	        		ccaccountList3.push({ accDetails: accDetails,accDesc: accDesc});
		    	  		    	    	        	
		    	  		    	    	        		});
		    	  		    	    	        	    
		    	  		    	    	        	   $(cccardcount).each(function(index, obj) {
		    	  		    	    	        	    	
		    	  		    	    	        	    	var cardno=obj.cardno;
		    	  		    	    	        	    	var cardtype=obj.cardtype;
		    	  		    	    	        	    	var bin=obj.bin;
		    	  		    	    	        	    	var carddesc=obj.carddesc;
		    	  		    	    	        	    	var benefname=obj.benefname;
		    	  		    	    	        	    	var minamountdue=obj.minamountdue;
		    	  		    	    	        	    	var totalbilledamt=obj.totalbilledamt;
		    	  		    	    	        	        var cardaanno=obj.cardaanno;
															cardnoOrginal = obj.cardno;
		    	  		    	                            var cardDetails=cardno+"#"+cardtype+"#"+bin+"#"+carddesc+"#"+benefname+"#"+minamountdue+"#"+totalbilledamt+"#"+cardaanno;
															if(invocationResult.faml.response.fldPmntType =="HDFCOTH"){
																var cardno = cardno.substring(0,6)+"XXXXXX"+cardno.substring(12,16);
															}
		    	  		    	    	        		ccaccountList4.push({cardDetails: cardDetails,cardno: cardno});
		    	  		    	    	 
		    	  		    	    	        		});
		    	  	    	    	    	   
		    	  	    	    	    	    		
		    	  	    	    	    	    		window.location = "#rrccp02";
		    	      	    	    	    			$("#contentData").load("Views/Credit/rrccp02.html", null, function (response, status, xhr) {
		    	      	    	    	    	            if (status != "error") {}
		    	      	    	    	    	         
		    	      	    	    	    	          
		    	      	    	    	    	        
		    	      	    	    	    	          //'HDFCREG'
		    	      	    	    	    	          
		    	      	    	    	    	          
			    	      	    	    	    	        $("#fldTxnAmt").val(invocationResult.faml.response.ccacctlist.ccacctdetails.totalbilledamt);
			    	      	    	    	    	        $("#fldPmntType").val(invocationResult.faml.request.fldPmntType);
			    	      	    	    	    	      fldFCDBRequestId = invocationResult.faml.response.mci.requestid;
				    	  	    	    	    	    	
		    	  	    	    	    	    	    	$('#fldRequestId').val(fldFCDBRequestId);
		    	      	    	    	    		
		    	  	    	    	    	    	    ko.applyBindings(self, $(".dynamic-page-content").get(0));
														setTad();
														 if(invocationResult.faml.response.fldPmntType =="HDFCOTH"){
		    	  	    	    	    	    	    		$("#othdiv").hide();
		    	  	    	    	    	    	    		$("#othdivnote").hide();
		    	  	    	    	    	    	    		$("#othercard").show();
																 $("#fldTxnAmt").val('');
																 $('#fldTxnAmt').attr('readonly', false);
		    	  	    	    	    	    	    	}
		    	      	    	    	    	    	});
		    	      	    	    	    			}
		    	  	    	    	    	    		}
		    	  	    	    	    	    		else{
		    	  	    	    	    	    			
		    	  	    	    	    	    			alert(" Currently you do not have any active cards or accounts.");
		    	  	    	    	    	    		}
		    	  	    	    	    	    	}
		    	  	    	    	    	    		else{
		    	  	    	    	    	    		errmsg = invocationResult.faml.response.rc.errormessage;
		    	  	    	    	    	    		handleError(invocationResult.faml.response);
		    	  	    	    	    	    	}
		    	  	    	    	    	    	}else{
			    	  	    	    	  				handleErrorNoResponse();
			    	  	    	    	  			}
		    	  	    	    	    	    }
		    	  	    	    	    	    };	

		    	  	    	    	    	    
	    	  	    	    	    	    self.rrccp02Submit  = function(){
	    	  	    	    	    	        
	    	  	    	    	    	    	if($("#frmrrccp02").valid()){
	    	  	    	    	    	    		var crd=$("#fldCardNo option:selected").text();
	    	  	    	    	    	    		var amttext=$("#fldAmtType option:selected").text();
	    	  	    	    	    	    		var fromac=$("#fldFromAcctNo option:selected").text();
	    	  	    	    	    	    		
	    	  	    	    	    	    		pmttype = $("#fldPmntType").val();
	    	  	    	    	    	    		amttype = $("#fldAmtType").val();
	    	  	    	    	    	    		crdno = $("#fldCardNo").val();
	    	  	    	    	    	    		fldcardnostr=crdno.split("#");
   	  	    	    	    	    	    	 	
  	  	    	    	    	    	    	   	var mad=fldcardnostr[5];
  	  	    	    	    	    	    	   	var tad=fldcardnostr[6];
  	  	    	    	    	    	    	   
  	  	    	    	    	    	    	   	errflag = true;
  	  	    	    	    	    	    	   
  	  	    	    	    	    	    	   	if(amttype == "TAD"){
  	  	    	    	    	    	    	   	
  	  	    	    	    	    	    	   		if(parseFloat(tad) < 1){
  	  	    	    	    	    	    	   			alert("Amount should be greater than 1");
  	  	    	    	    	    	    	   			errflag = false;
  	  	    	    	    	    	    	   		} 
  	  	    	    	    	    	    	   	}
  	  	    	    	    	    	    	   	else if(amttype == "MAD"){
  	  	    	    	    	    	    	   	
	  	    	    	    	    	    	   		if(parseFloat(mad) < 1){
	  	    	    	    	    	    	   			alert("Amount should be greater than 1");
	  	    	    	    	    	    	   			errflag = false;
	  	    	    	    	    	    	   		} 
	  	    	    	    	    	    	   	}
  	  	    	    	    	    	    	   	else if(amttype == 'AMT'){
  	  	    	    	    	    	    	   		amt = $("#fldTxnAmt").val();
  	  	    	    	    	    	    	   		
  	  	    	    	    	    	    	   		if($.trim(amt) == ''){
	  	    	    	    	    	    	   			alert("Please enter Amount");
	  	    	    	    	    	    	   			errflag = false;
	  	    	    	    	    	    	   		}
  	  	    	    	    	    	    	   		else if(parseFloat($.trim(amt)) < 1){
  	  	    	    	    	    	    	   			alert("Amount should be greater than 1");
	  	    	    	    	    	    	   			errflag = false;
	  	    	    	    	    	    	   		} 
  	  	    	    	    	    	    	   	}
	    	  	    	    	    	    		
  	  	    	    	    	    	    	if(pmttype == 'HDFCOTH'){
	  	    	    	    	    	    	   		amt = $("#fldTxnAmt").val();
	  	    	    	    	    	    	   		
	  	    	    	    	    	    	   		if($.trim(amt) == ''){
	  	    	    	    	    	    	   			alert("Please enter Amount");
	  	    	    	    	    	    	   			errflag = false;
	  	    	    	    	    	    	   		}
	  	    	    	    	    	    	   		else if(parseFloat($.trim(amt)) < 1){
		  	    	    	    	    	    	   			alert("Amount should be greater than 1");
	  	    	    	    	    	    	   			errflag = false;
	  	    	    	    	    	    	   		} 
	  	    	    	    	    	    	   	}
  	  	    	    	    	    	    	   	
  	  	    	    	    	    	    	   	if(errflag){
	    	  	    	    	    	    		$("#fldCardNo_txt").val(crd);
	    	  	    	    	    	    		$("#fldAmtType_txt").val(amttext);
	    	  	    	    	    	    		$("#fldFromAcctNo_txt").val(fromac);
	    	  	    	    	    	    		var $form = $("#frmrrccp02");
		  	    	  	    		    	    	rsaDataArray = $form.serializeArray();    	
		  	    	  	    		    	    	    	    	
		  	    	  	    		    	    	reqParams = {};
		  	    	  	    		    	    	for (var i in rsaDataArray) {
		  	    	  	    		    	    		reqParams[rsaDataArray[i].name] = rsaDataArray[i].value;
		  	    	  	    		    	    		
		  	    	  	    		    	    	}	    		
		  	    	  	    	    	    	    		
		  	    	  	    	    	    	    		
		  		    	  	    	    	    	    	reqParams["fldDeviceId"] = fldDeviceId;
		  		    	  	    	    	    	    	reqParams["fldWebServerId"] = fldWebServerId;
		  		    	  	    	    	    	    	reqParams["fldAppId"] = fldAppId;
		  		    	  	    	    	    	    	reqParams["fldAppServerId"] = fldAppServerId;
		  		    	  	    	    	    	    	reqParams["fldLangId"] = fldLangId;
		  		    	  	    	    	    	    	reqParams["fldModule"] = fldModule;
		  		    	  	    	    	    	    	reqParams["fldSwitchAppId"] = "";
		  		    	  	    	    	    	    	reqParams["fldModule"] = "CH";
										                    reqParams["fldCardAANNo"] = fldcardnostr[7];
		  		    	  	    	    	    	    	reqParams["fldLogoffReq"] = "N";
		  		    	  	    	    	    	    	reqParams["fldAmcId"] = "ALL";
		  		    	  	    	    	    	    	reqParams["fldRoleId"] = "";
		  		    	  	    	    	    	  
		  		    	  	    	    	    	    	
		  		    	  	    	    	    	    
		  		    	  	    	    	    	    
		  		    	  	    	    	    	    	reqParams["fldRegFlag"] = "N";
		  		    	  	    	    	    	    	
		  		    	  	    	    	    	    	
		  		    	  	    	    	    	    reqParams["fldRequestId"] =RegfldRequestId;

															fldjsessionid = Regfldjsessionid;
														    reqParams["fldMeapPCIDSSFlag"] = "true";
															reqParams["fldLoginUserId"] =Regloginuid;
															reqParams["fldSessionId"] = Rsessionid;
		  		    	  	    	    	    	    	
		  		    	  	    	    	    	    	
		  		    	  	    	    	    	    	busyInd.show();

	    	  	    	    	    	    	var invocationData = {
	    	  	    	    	    	    			adapter : "CreditCard",
	    	  	    	    	    	        		procedure : "RRCCP03",
	    	  	    	    	    	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	    	  	    	    	    	    	};
	    	  	    	    	    	    	
	    	  	    	    	    	    	//WL.Logger.debug(invocationData, '');
	    	  	    	    	    	    	WL.Client.invokeProcedure(invocationData, {
	    	  	    	    	    	    		onSuccess :  rrccp03Response,
	    	  	    	    	    	    		onFailure : AdapterFail,
	    	  	    	    	    	    		timeout: timeout
	    	  	    	    	    	    	});
  	  	    	    	    	    	    	   	}
	    	  	    	    	    	    	}
	    	  	    	    	    	    };
	    	  	    	    	    	    
	    	  	    	    	    	rrccp03Response = function(result){
	    	  	    	    	    	    	    	busyInd.hide();
	    	  	    	    	    	    	    	invocationResult = result.invocationResult;
	    	  	    	    	    	    	    	if(invocationResult.isSuccessful) {
	    	  	    	    	    	    	    		if(invocationResult.faml.response){	
	    	  	    	    	    	    	    		if(invocationResult.faml.response.rc.returncode == 0){
	    	  	    	    	    	    	    			window.location = "#rrccp03";
	    	  	    	    	    	    	    			$("#contentData").load("Views/Credit/rrccp03.html", null, function (response, status, xhr) {
	    	  	    	    	    	    	    	            if (status != "error") {}
	    	  	    	    	    	    	    	            
	    	  	    	    	    	    	    	    
	    	  	    	    	    	    	    	            
	    	  	    	    	    	    	    	       
	    	  	    	    	    	    	    	      var fldfromacctno=invocationResult.faml.response.fldFromAcctNo;
	    	  	    	    	    	    	    	        
	    	  	    	    	    	    	    	      fldfromacctnostr=fldfromacctno.split("#");

	    	  	    	    	    	    	    	      var acctNo=fldfromacctnostr[0];
	    	  	    	    	    	    	    	      var acctBrn=fldfromacctnostr[1];
	    	  	    	    	    	    	    	      var acctCurr=fldfromacctnostr[2];
	    	  	    	    	    	    	    	      var acctBal=fldfromacctnostr[3];
	    	  	    	    	    	    	    	    
	    	  	    	    	    	    	    	    var fldcardno=invocationResult.faml.response.fldCardNo;
    	  	    	    	    	    	    	        
	    	  	    	    	    	    	    	  fldcardnostr=fldcardno.split("#");
	    	  	    	    	    	    	    	 
	    	  	    	    	    	    	    	  var cardNo=fldcardnostr[0];
	    	  	    	    	    	    	    	  var cardType=fldcardnostr[1];
	    	  	    	    	    	    	    	  var cardBin=fldcardnostr[2];
	    	  	    	    	    	    	    	  var cardDesc=fldcardnostr[3];
	    	  	    	    	    	    	    	  var cardBenefName=fldcardnostr[4];
	    	  	    	    	    	    	    	var mad=fldcardnostr[5];
	    	  	    	    	    	    	    	var tad=fldcardnostr[6];
	    	  	    	    	    	    	   
	    	  	    	    	    	    	    	$('#acctNo').html(acctNo);	
	    	  	    	    	    	    	    	
	    	  	    	    	    	    	    	$('#cardNo').html(cardNo);
	    	  	    	    	    	    	    	 $('#cardBenefName').html(cardBenefName);
												
								                       $('#fldCardAANNo').val(invocationResult.faml.response.fldCardAANNo);
	    	  	    	    	    	    	    	if(invocationResult.faml.response.fldPmntType =="HDFCREG"){
	    	  	    	    	    	    	    		$("#cardBenefNameid").hide();
								                            $('#fldScrnSeqNbr').val('03');
	    	  	    	    	    	    	    	}
	    	  	    	    	    	    	    	if(invocationResult.faml.response.fldPmntType =="HDFCOTH"){
	    	  	    	    	    	    	    		
	    	  	    	    	    	    	    		$('#fldtxntadmad').html("Amount");	
		    	  	    	    	    	    	    	$('#fldtxnamtadmad').html(formatAmt(parseFloat(invocationResult.faml.response.fldTxnAmt)));		
		    	  	    	    	    	    	        $('#fldTxnAmt').val(invocationResult.faml.response.fldTxnAmt);
														    $('#fldScrnSeqNbr').val('05');
		    	  	    	    	    	    	       
	    	  	    	    	    	    	    	}else{
		    	  	    	    	    	    	    	if(invocationResult.faml.response.fldAmtType =='TAD'){
		    	  	    	    	    	    	    		$('#fldtxntadmad').html("Last Statement Bal");	
			    	  	    	    	    	    	    	$('#fldtxnamtadmad').html(formatAmt(parseFloat(tad)));	
			    	  	    	    	    	    	    	$('#fldTxnAmt').val(tad);
		    	  	    	    	    	    	    	}else if(invocationResult.faml.response.fldAmtType =='MAD'){
		    	  	    	    	    	    	    		$('#fldtxntadmad').html("Minimum Amount Due");	
			    	  	    	    	    	    	    	$('#fldtxnamtadmad').html(formatAmt(parseFloat(mad)));	
			    	  	    	    	    	    	    	$('#fldTxnAmt').val(mad);
		    	  	    	    	    	    	    	}
		    	  	    	    	    	    	    	else{
		    	  	    	    	    	    	    		$('#fldtxntadmad').html("Amount");	
			    	  	    	    	    	    	    	$('#fldtxnamtadmad').html(formatAmt(parseFloat(invocationResult.faml.response.fldTxnAmt)));		
			    	  	    	    	    	    	       $('#fldTxnAmt').val(invocationResult.faml.response.fldTxnAmt);
		    	  	    	    	    	    	    	}	
	    	  	    	    	    	    	    	
	    	  	    	    	    	    	    	}
	    	  	    	    	    	    	    	
	    	  	    	    	    	    	    	fldFCDBRequestId = invocationResult.faml.response.mci.requestid;
	    	  	    	    	    	    	
	    	  	    	    	    	    	    	$('#fldFCDBRequestId').val(fldFCDBRequestId);
	    	  	    	    	    	    	    	$('#fldRequestId').val(fldFCDBRequestId);
	    	  	    	    	    	    	    	$('#fldTxnType').val(invocationResult.faml.response.fldTxnType);
	    	  	    	    	    	    	    	$('#fldFromAcctNo').val(acctNo);
	    	  	    	    	    	    	    	$('#fldTxnMad').val(mad);
	    	  	    	    	    	    	    	$('#fldTxnTad').val(tad);
	    	  	    	    	    	    	    	$('#fldBalance').val(acctCurr+" "+acctBal);
	    	  	    	    	    	    	    	$('#fldTxnCurr').val(acctCurr);
	    	  	    	    	    	    	    	//alert(acctCurr);
	    	  	    	    	    	    	    	$('#fldBranch').val(acctBrn);
														if(invocationResult.faml.response.fldPmntType =="HDFCOTH"){
															cardnoOrginal1 = cardnoOrginal.substring(0,6)+"XXXXXX"+cardnoOrginal.substring(12,16);
														  //	$('#fldCardNo').val(cardnoOrginal);
															$('#fldCardNo').val(cardNo);
															$('#cardNo').hide();
															$('#cardNoothr').show();
														  //	$('#cardNoothr').html(cardnoOrginal1);
														 $('#cardNoothr').html(invocationResult.faml.request.fldCardNo_txt); 
														}
														else{
															$('#cardNo').show();
															$('#cardNoothr').hide();
														  	$('#fldCardNo').val(cardNo);
														}
	    	  	    	    	    	    	    
	    	  	    	    	    	    	    	$('#fldConsumerNo').val(cardNo);
	    	  	    	    	    	    	    	$('#fldBillCompId').val(cardType);
	    	  	    	    	    	    	    	$('#fldCardBin').val(cardBin);
	    	  	    	    	    	    	   	   
	    	  	    	    	    	    	    	$('#fldCardDesc').val(cardDesc);
	    	  	    	    	    	    	    	$('#fldPmntType').val(invocationResult.faml.response.fldPmntType);
	    	  	    	    	    	    	    	$('#fldAmtType').val(invocationResult.faml.response.fldAmtType);
	    	  	    	    	    	    	    	$('#fldBenefName').val(cardBenefName);
	    	  	    	    	    	    	    	$('#fldAction').val(invocationResult.faml.response.fldAction);
	    	  	    	    	    	    	    	$('#fldAcctBrn').val(acctNo);
	    	  	    	    	    	    	    	$('#fldAcctDetail').val(acctNo);
	    	  	    	    	    	    	    	$('#fldExtSessionId').val(invocationResult.faml.response.fldExtSessionId);
	    	  	    	    	    	    	    	
	    	  	    	    	    	    	   	fldRsaTxnId = "";
    	  	    	    	    	            	fldClientSessionId = "";
    	  	    	    	    	            	fldFcatSessionId = "";
    	  	    	    	    	            	if(invocationResult.faml.response.rsadetails){
    	  	    	    	    	    	        	fldRsaTxnId = invocationResult.faml.response.rsadetails.rsatxnid;
    	  	    	    	    	    	        	fldClientSessionId = invocationResult.faml.response.rsadetails.clientsessionid;
    	  	    	    	    	    	        	fldFcatSessionId = invocationResult.faml.response.rsadetails.fcatsessionid;
    	  	    	    	    	            	}
	    	  	    	    	    	    	    	
	    	  	    	    	    	    	    	$('#fldUserRefNo').val(invocationResult.faml.response.flduserrefno);
	    	  	    	    	    	    	    	$('#fldDateTime').val(invocationResult.faml.response.flddatetime);
	    	  	    	    	    	    	    	$('#fldRsaTxnId').val(fldRsaTxnId);
	    	  	    	    	    	    	    	$('#fldClientSessionId').val(fldClientSessionId);
	    	  	    	    	    	    	    	$('#fldFcatSessionId').val(fldFcatSessionId);
	    	  	    	    	    	    	    	
	    	  	    	    	    	    	    	//$('#fldTxnMad').val(invocationResult.faml.response.fldTxnMad);
	    	  	    	    	    	    	    	//$('#fldTxnTad').val(invocationResult.faml.response.fldTxnTad);
	    	  	    	    	    	    	    			
	    	  	    	    	    	    	    
	    	  	    	    	    	    	    	
	    	  	    	    	    	    	    	
	    	  	    	    	    	    	    	
	    	  	    	    	    	    	    	
	    	  	    	    	    	    	    	            ko.applyBindings(self, $(".dynamic-page-content").get(0));
	    	  	    	    	    	    	    	    	});
	    	  	    	    	    	    	    			
	    	  	    	    	    	    	    				
	    	  	    	    	    	    	    			}else{
	    	  	    	    	    	    	    			errmsg = invocationResult.faml.response.rc.errormessage;
	    	  	    	    	    	    	    			handleError(invocationResult.faml.response);
	    	  	    	    	    	    	    		}
	    	  	    	    	    	    	    		}else{
	    	  	    	    	    	    					handleErrorNoResponse();
	    	  	    	    	    	    				}
	    	  	    	    	    	    	    	}
	    	  	    	    	    	    	    };  	    
	  	    	  	    	    	    	    	    
	  	    	  	    	    	    	    	    
	    	  	    	    	    	    	  self.rrccp03Submit  = function(){
	  	    	  	    	    	    	        
	  	    	  	    	    	    	    	if($("#frmrrccp03").valid()){
	  	    	  	    	    	    	    		var $form = $("#frmrrccp03");
	  		  	    	  	    		    	    	rsaDataArray = $form.serializeArray();    	
	  		  	    	  	    		    	    	    	    	
	  		  	    	  	    		    	    	reqParams = {};
	  		  	    	  	    		    	    	for (var i in rsaDataArray) {
	  		  	    	  	    		    	    		pymtty = $('#fldPmntType').val();
	  		  	    	  	    		    	    		if(pymtty=='HDFCOTH' && rsaDataArray[i].name=='fldCardAANNo'){
	  		  	    	  	    		    	    			
	  		  	    	  	    		    	    		}else{
	  		  	    	  	    		    	    			reqParams[rsaDataArray[i].name] = rsaDataArray[i].value;
	  		  	    	  	    		    	    		}
	  		  	    	  	    		    	    			
	  		  	    	  	    		    	    		
	  		  	    	  	    		    	    		
	  		  	    	  	    		    	    	}	    		
	  		  	    	  	    	    	    	    		
	  		  	    	  	    	    	    	    		
	  		  		    	  	    	    	    	    	reqParams["fldDeviceId"] = fldDeviceId;
	  		  		    	  	    	    	    	    	reqParams["fldWebServerId"] = fldWebServerId;
	  		  		    	  	    	    	    	    	reqParams["fldAppId"] = fldAppId;
	  		  		    	  	    	    	    	    	reqParams["fldAppServerId"] = fldAppServerId;
	  		  		    	  	    	    	    	    	reqParams["fldLangId"] = fldLangId;
	  		  		    	  	    	    	    	    	reqParams["fldModule"] = fldModule;
	  		  		    	  	    	    	    	    	reqParams["fldSwitchAppId"] = "";
	  		  		    	  	    	    	    	    	reqParams["fldModule"] = "CH";
	  		  		    	  	    	    	    	    	
	  		  		    	  	    	    	    	        
	  		  		    	  	    	    	    	    	reqParams["fldLogoffReq"] = "N";
	  		  		    	  	    	    	    	    	reqParams["fldAmcId"] = "ALL";
	  		  		    	  	    	    	    	    	reqParams["fldRoleId"] = "";
	  		  		    	  	    	    	    	  
	  		  		    	  	    	    	    	    	
	  		  		    	  	    	    	    	    
	  		  		    	  	    	    	    	    
	  		  		    	  	    	    	    	    	reqParams["fldRegFlag"] = "N";
	  		  		    	  	    	    	    	    	
	  		  		    	  	    	    	    	  
	  		  		    	  	    	    	    	    	

	  		  		    	  	    		    	fldjsessionid = Regfldjsessionid;
	  		  		    	  	    		    	reqParams["fldLoginUserId"] =Regloginuid;
	  		  		    	  	    		    	reqParams["fldSessionId"] = Rsessionid;
	  		  		    	  	    		  if($('#fldPmntType').val()!='HDFCOTH'){
	    	  	    	    	    	    		reqParams["fldMeapPCIDSSFlag"] = "true";
	    	  	    	    	    	    	  //  delete reqParams["fldCardAANNo"];
	    	  	    	    	    	    	}    	
	  		  		    	  	    	    	    	    	busyInd.show();

	  	    	  	    	    	    	    	var invocationData = {
	  	    	  	    	    	    	    			adapter : "CreditCard",
	  	    	  	    	    	    	        		procedure : "RRCCP04",
	  	    	  	    	    	    	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	  	    	  	    	    	    	    	};
	  	    	  	    	    	    	    	
	  	    	  	    	    	    	    	//WL.Logger.debug(invocationData, '');
	  	    	  	    	    	    	    	WL.Client.invokeProcedure(invocationData, {
	  	    	  	    	    	    	    		onSuccess :  rsaResponse,
	  	    	  	    	    	    	    		onFailure : AdapterFail,
	  	    	  	    	    	    	    		timeout: timeout
	  	    	  	    	    	    	    	});
	  	    	  	    	    	    	    	}
	  	    	  	    	    	    	    };    
this.callrscip01 = function(){
	
	busyInd.show();
	reqParams = {};

	reqParams["fldDeviceId"] = fldDeviceId;
	reqParams["fldWebServerId"] = fldWebServerId;
	reqParams["fldAppId"] = fldAppId;
	reqParams["fldAppServerId"] = fldAppServerId;
	reqParams["fldLangId"] = fldLangId;
	reqParams["fldModule"] = fldModule;
	reqParams["fldSwitchAppId"] = "";
	reqParams["fldTxnId"] = "CIP";
	reqParams["fldLogoffReq"] = "N";
	reqParams["fldRoleId"] = "";
	reqParams["fldTxnType"] = "";
	reqParams["fldOrgTxn"] = "";
	reqParams["fldBenefType"] = "FCNR";
	reqParams["fldScrnSeqNbr"] = "01";
	reqParams["fldRequestId"] =RegfldRequestId;
	fldjsessionid = Regfldjsessionid;
	reqParams["fldLoginUserId"] =Regloginuid;
	reqParams["fldSessionId"] = Rsessionid;	
//fldAppId=RS&fldTxnId=CIP&fldScrnSeqNbr=01&fldSessionId=1582653822RQPOBMJS&fldSwitchAppId=&fldLogoffReq=N&fldRequestId=1582653822RQPOBMJS94415182YCJ&fldOrgTxn=&fldTxnType=&fldModule=CH&fldRoleId=&fldBenefType=FCNR	
	var invocationData = {
			adapter : "CreditCard",
    		procedure : "RSCIP01",
    		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	};
	
	WL.Client.invokeProcedure(invocationData, {
		onSuccess : callrscip01Response,
		onFailure : AdapterFail,	    		
		timeout: timeout
	});
	
	
	
	
};
 
 callrscip01Response = function(result){
	         busyInd.hide();
	    	    	invocationResult = result.invocationResult;
	    	    	if(invocationResult.isSuccessful) {
	    	    		if(invocationResult.faml.response){	
	    	    		if(invocationResult.faml.response.rc.returncode == 0){
								$("#contentData").load("Views/Credit/rscip01.html", null, function (response, status, xhr) {
	    	    	       if (status != "error") {}
	 ko.applyBindings(self, $(".dynamic-page-content").get(0));     			
    });
							
					 cardDetails = invocationResult.faml.response.ccacctlist.ccacctdetails;
					  ConsumerType = invocationResult.faml.response.fldConsumerType;
					  RsaUserStatus = invocationResult.faml.response.fldRsaUserStatus;
	                        count = cardDetails;
	                        cstatus = invocationResult.faml.response.ccacctlist.ccacctdetails.acctstatus;
	                        cust = invocationResult.faml.response.ccacctlist.ccacctdetails.cardtype;
							yearfldExpDate = invocationResult.faml.response.ccacctlist.ccacctdetails.duedate;
							//fldCardAANNo = invocationResult.faml.response.ccacctlist.ccacctdetails.cardaanno;
							fldSysDate = invocationResult.faml.response.systemdate;
							  fldRsaPublicKey=invocationResult.faml.response.fldRsaPublicKey;
				             newkey=hex2a(fldRsaPublicKey);
							CrtAccountList1.removeAll();
					   
	                 	
				   if (RsaUserStatus == 'X'){
							  
					  alert('We regret to inform you that we are not able to proceed with your  request. For Security reasons, the use of this facility requires you to be registered for  Third Party Transfer service also.You can register for Third Party Transfer service by clicking on the Funds Transfer tab, and completing the registration process. You can then use Instant Pin service. Alternatively, you can also use our "Credit Card ATM Pin" service. ')
					  window.location =  '#rracs01';
					
					}	  
				    else if (ConsumerType == 'YZ'){
					  
					  alert('Message- We regret to inform you that we are not able to proceed with your request. For Security reasons, we request   you  to use our  "Credit Card ATM Pin" transaction. ')
					  window.location =  '#rracs01';
					  
				    }
                    else if(count != 0){		  
			           $(cardDetails).each(function(index, obj) { 
						accountValue = obj.cardno+"#"+obj.acctstatus+"#"+obj.cardaanno;
						
                       displaytxt = obj.cardno;	
					   console.log(displaytxt+'>>>>>>>>>'+accountValue);
						   CrtAccountList1.push({cardno: obj.cardno, displaytxt: displaytxt,accountValue:accountValue});
				       });
                    } 					

	    	    
			}
						else{
						handleError(invocationResult.faml.response);
						window.location =  '#rrasm01';
					}
        }
   }
};



                 self.rscip01Submit = function(){ 
				 	if($("#frmrscip01").valid()){
					          fldCardNo= $("#fldCardNo").val().split("#")[0];
							  fldCardAANNo= $("#fldCardNo").val().split("#")[2];
							
							  fldNewPin= $("#fldNewPin").val();
							  fldNewConfirmPin= $("#fldNewConfirmPin").val();
					         // expirydate = ($("#yearfldExpDate").val().substring(2))+""+$("#monthfldExpDate").val();
							  
							   var encrypt = new JSEncrypt();
							 
                              encrypt.setPublicKey(newkey);
                              var fldNewPin = encrypt.encrypt($('#fldNewPin').val());
							
							  pin1=stringToHex(fldNewPin);
						
							  var fldNewConfirmPin = encrypt.encrypt($('#fldNewConfirmPin').val());
							  pin2=stringToHex(fldNewConfirmPin);
							
							  
                            busyInd.show(); 
							reqParams["fldDeviceId"] = fldDeviceId;
							reqParams["fldWebServerId"] = fldWebServerId;
							reqParams["fldAppId"] = fldAppId;
							reqParams["fldAppServerId"] = fldAppServerId;
							reqParams["fldLangId"] = fldLangId;
							reqParams["fldModule"] = fldModule;
							reqParams["fldTxnId"] = "CIP";
							reqParams["fldScrnSeqNbr"] = "02";
							reqParams["fldExpDate"] = "";
							reqParams["fldNewPin"] = pin1;
							reqParams["fldNewConfirmPin"] = pin2;
							reqParams["selCard"] = fldCardNo;
							reqParams["fldCardNo"] = fldCardNo;
							reqParams["monthfldExpDate"] ="";
							reqParams["yearfldExpDate"] =  "";
							reqParams["fldCardAANNo"] = fldCardAANNo;
							reqParams["fldSysDate"] = fldSysDate; 
							fldjsessionid = Regfldjsessionid;
					    	reqParams["fldLoginUserId"] =Regloginuid;
							reqParams["fldLoginCustId"] =Regloginuid;
					    	reqParams["fldSessionId"] = Rsessionid;
					    	reqParams["fldRequestId"] =RegfldRequestId;
										
                        	var invocationData = {
									adapter : "CreditCard",
									procedure : "RSCIP02",
									parameters : [fldjsessionid,reqParams,ipadd],
									compressResponse : true,
							};
							WL.Client.invokeProcedure(invocationData, {
								onSuccess :rscip01SubmitSuccess,
								onFailure : AdapterFail,
								timeout: timeout,
							});
					}
					  };	
					  
	
	rscip01SubmitSuccess = function(result){
			busyInd.hide();
	    	invocationResult = result.invocationResult;
	    	if(invocationResult.isSuccessful) {
	    		if(invocationResult.faml.response){	
	    		if(invocationResult.faml.response.rc.returncode == 0){
				
	    			
					   
					 accStmtData(invocationResult.faml);
							
					window.location = "#rscip02";
	    				
	    			}
					else{
	    			errmsg = invocationResult.faml.response.rc.errormessage;
	    			handleError(invocationResult.faml.response);
	    		}
	    		         }
	    	
	    	}
	    };
		
		
	this.callrscip02 = function(){

        	accstmtdata = accStmtData();
        
        	$("#contentData").load("Views/Credit/rscip02.html", null, function (response, status, xhr) {
	    	            if (status != "error") {}
						$(".fldCardNo").html(invocationResult.faml.response.fldCardNo[0]);
		               $(".fldNewPin").html(invocationResult.faml.response.fldNewPin[0]);
		               $(".fldNewConfirmPin").html(invocationResult.faml.response.fldNewConfirmPin[0]);
					   $("#fldExpDate").val(invocationResult.faml.request.fldExpDate);
				       $("#fldCardNo").val(invocationResult.faml.response.fldCardNo[0]);
		               $("#fldNewPin").val(invocationResult.faml.response.fldNewPin[0]);
		               $("#fldNewConfirmPin").val(invocationResult.faml.response.fldNewConfirmPin[0]);
	    	                   ko.applyBindings(self, $(".dynamic-page-content").get(0));
	    	    	});	  
					   
    };
		
		
 this.rscip02Submit =  function(){
       
							busyInd.show();   
	                
		                     fldCardNo=$("#fldCardNo").val();
						     fldNewPin=$("#fldNewPin").val();
						     fldNewConfirmPin=$("#fldNewConfirmPin").val();
						     fldExpDate= $("#fldExpDate").val();
							 console.log(fldCardNo+"###"+fldNewPin+"###"+fldNewConfirmPin+"##"+fldExpDate);
							reqParams = {};
							reqParams["fldDeviceId"] = fldDeviceId;
							reqParams["fldWebServerId"] = fldWebServerId;
							reqParams["fldAppId"] = fldAppId;
							reqParams["fldAppServerId"] = fldAppServerId;
							reqParams["fldLangId"] = fldLangId;
							reqParams["fldModule"] = fldModule;
							reqParams["fldTxnId"] = "CIP";
							reqParams["fldCardNo"] =fldCardNo;
							reqParams["fldNewPin"] =fldNewPin;				    
					    	reqParams["fldNewConfirmPin"] = fldNewConfirmPin;
					    	reqParams["fldExpDate"] =fldExpDate;
							reqParams["fldCardAANNo"] = fldCardAANNo;
							reqParams["fldScrnSeqNbr"] = "03";
							fldjsessionid = Regfldjsessionid;
					    	reqParams["fldLoginUserId"] =Regloginuid;
							reqParams["fldLoginCustId"] =Regloginuid;				    
					    	reqParams["fldSessionId"] = Rsessionid;
					    	reqParams["fldRequestId"] =RegfldRequestId;
							var invocationData = {
									adapter : "CreditCard",
									procedure : "RSCIP03",
									parameters : [fldjsessionid,reqParams,ipadd],
									compressResponse : true,
							};
							WL.Client.invokeProcedure(invocationData, {
								onSuccess :rsaResponse,
								onFailure : AdapterFail,
								timeout: timeout,
							});
						 }	  
							  
					 
		
		rscip02SubmitSuccess = function(result){
			  	busyInd.hide();
			invocationResult = result.invocationResult;
			if(invocationResult.isSuccessful) {
			if(invocationResult.faml.response){	
			if(invocationResult.faml.response.rc.returncode == 0){
				window.location = "#rscip03";
				$("#contentData").load("Views/Debit/rscip03.html", null, function (response, status, xhr) {
					if (status != "error") {}	
								
				  

										
					ko.applyBindings(self, $(".dynamic-page-content").get(0));
						   
						   
							});
				}
				else
				{
				errmsg = invocationResult.faml.response.rc.errormessage;				
			handleError(invocationResult.faml.response);
									}
								}
							}
						   };
							  
            /**************Credit card Pin Generation**********************/ 
	    	  	    	    	    	    	    
	    	  
	    	  	    	    	    	    	    
	    	  	    	    	    	    	    
	    	  	    	    	    	    	    
	    	  	    	    	    	    	    
	    	  	    	    	    	    	    /**************Credit card Payment**********************/   
	    	  	    	    	    /*************************HASh******************/	    	    
	  	    	  	    	    	    	  this.getCreditSummaryhash = function(){
	  	    	  	    	    	      	
	  	    	  	    	    	    	   
	  	    	  	    	    		    	reqParams = {};
	  	    	  	    	    		
	  	    	  	    	    		    	reqParams["fldDeviceId"] = fldDeviceId;
	  	    	  	    	    		    	reqParams["fldWebServerId"] = fldWebServerId;
	  	    	  	    	    		    	reqParams["fldAppId"] = fldAppId;
	  	    	  	    	    		    	reqParams["fldAppServerId"] = fldAppServerId;
	  	    	  	    	    		    	reqParams["fldLangId"] = fldLangId;
	  	    	  	    	    		    	reqParams["fldModule"] = fldModule;
	  	    	  	    	    		    	reqParams["fldSwitchAppId"] = "";
												reqParams["fldMeapPCIDSSFlag"] = "true";
	  	    	  	    	    		    	reqParams["fldModule"] = "CH";
	  	    	  	    	    		    	reqParams["fldTxnId"] = "ACS";
	  	    	  	    	    		    	reqParams["fldLogoffReq"] = "N";
	  	    	  	    	    		    	reqParams["fldAmcId"] = "ALL";
	  	    	  	    	    		    	reqParams["fldRoleId"] = "";
	  	    	  	    	    		    	reqParams["fldReportDate"] =getCurrdate();
	  	    	  	    	    		    	
	  	    	  	    	    		    	reqParams["fldScrnSeqNbr"] = "01";
	  	    	  	    	    		    	
	  	    	  	    	    		    reqParams["fldRequestId"] =RegfldRequestId;

	  	    	  	    		    	fldjsessionid = Regfldjsessionid;
	  	    	  	    		    	reqParams["fldLoginUserId"] =Regloginuid;
	  	    	  	    		    	reqParams["fldSessionId"] = Rsessionid;
	  	    	  	    	    		    	
	  	    	  	    	    		    	
	  	    	  	    	    		    	busyInd.show();
	  	    	  	    	    		    	var invocationData = {
	  	    	  	    	    		    			adapter : "API_Adapter",
	  	    	  	    	    		        		procedure : "GetAPICall",
	  	    	  	    	    		        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	  	    	  	    	    		    	};
	  	    	  	    	    		    	
	  	    	  	    	    		    	WL.Client.invokeProcedure(invocationData, {
	  	    	  	    	    		    		onSuccess : creditSuccesshash,
	  	    	  	    	    		    		onFailure : AdapterFail,	    		
	  	    	  	    	    		    		timeout: timeout
	  	    	  	    	    		    	});
	  	    	  	    	    		    	
	  	    	  	    	    		    
	  	    	  	    	    		    	
	  	    	  	    	    		    
	  	    	  	    	    	    	
	  	    	  	    	    	    };
	  	    	  	    	    	    
	  	    	  	    	        creditSuccesshash = function(result){
	  	    	  	    	    	
	  	    	  	    	    	invocationResult = result.invocationResult;
	  	    	  	    	    	busyInd.hide();
	  	    	  	    	    	//$("#contentData").load("Views/Credit/rracs01.html", null, function (response, status, xhr) {
	  	    	  	    	           // if (status != "error") {}
	  	    	  	    	          	if(invocationResult.isSuccessful) {
	  	    	  	    	        		if(invocationResult.faml.response){	
	  	    	  	    	        	
	  	    	  	    	        			
	  	    	  	    	        		if(invocationResult.faml.response.rc.returncode == 0){
	  	    	  	    	        			cardcount=invocationResult.faml.response.ccacctlist.ccacctdetails;
	  	    	  	    	        			totAccount=cardcount.length;
	  	    	  	    	        			//alert(totAccount);
	  	    	  	    	        			if(cardcount)
	  	    	  	    	    	    			accSlider(true);
	  	    	  	    	    	    		else
	  	    	  	    	    	    			accSlider(false);
	  	    	  	    	    	    		
	  	    	  	    	        			ccaccountList.removeAll();
	  	    	  	    	        			ccaccountList1.removeAll();
	  	    	  	    	    	    		var idx = 1;
	  	    	  	    	    	    		$(cardcount).each(function(index, obj) {
	  	    	  	    	    	    		
	  	    	  	    	    	    			strid = "item"+idx;
	  	    	  	    	    	    			custnames = "";
	  	    	  	    	    	    			
	  	    	  	    	    	    		
	  	    	  	    	    	    			
	  	    	  	    	    	    			
	  	    	  	    	    	    			if(window.location.hash == '#rrasm01'){
	  	    	  	    	    	    				acctbalance = formatAmt(parseFloat(obj.availcreditlimit));
	  	    	  	    	    	    			}else{
	  	    	  	    	    	    				acctbalance = formatAmt(parseFloat(obj.availcreditlimit));
	  	    	  	    	    	    			}
	  	    	  	    	    	    			//alert(obj.cardno);
													 ccaccountvalue=obj.cardno+"#"+obj.cardaanno;
	  	    	  	    	    	    		    ccaccountList.push({codacctno: obj.cardno, logodesc: obj.logodesc, acctbalance: acctbalance, totalcreditlimit:formatAmt(parseFloat(obj.totalcreditlimit)) , availcreditlimit: formatAmt(parseFloat(obj.availcreditlimit)), availcashlimit: formatAmt(parseFloat(obj.availcashlimit)), strid:strid,cardNo: obj.cardno,ccaccountvalue:ccaccountvalue});
	  	    	  	    	    	    		    idx++;
	  	    	  	    	    	    		});
	  	    	  	    	    	    		
	  	    	  	    	    	    		
	  	    	  	    	    	    		
	  	    	  	    	    	    		if(window.location.hash == '#rrasm01'){
	  	    	  	    	    		    		if(cardcount){
	  	    	  	    	    		    			$("#accExitsMsg").hide();
	  	    	  	    	    		    			//$("#wrapper").css("top","110px");
	  	    	  	    	    		    		}else{
	  	    	  	    	    		    			$("#accExitsMsg").show();
	  	    	  	    	    		    			//$("#wrapper").css("top","96px");
	  	    	  	    	    		    		}
	  	    	  	    	    	    		}else{
	  	    	  	    	    	    			if(cardcount){
	  	    	  	    	    		    			$("#accExitsMsg").hide();		    			
	  	    	  	    	    		    		}else{
	  	    	  	    	    		    			$("#accExitsMsg").show();		    			
	  	    	  	    	    		    		}
	  	    	  	    	    	    		}
	  	    	  	    	    	    		
	  	    	  	    	    	    		if(ccaccountList().length > 0 && window.location.hash == '#rracs01'){
	  	    	  	    	    	    			$('.autoslide-slider3').iosSlider({
	  	    	  	    	    		    			desktopClickDrag: true,
	  	    	  	    	    		    			snapToChildren: true,
	  	    	  	    	    		    			infiniteSlider: false,
	  	    	  	    	    		    			autoSlide: false,
	  	    	  	    	    		    			/*scrollbar: true,
	  	    	  	    	    		    			autoSlideTransTimer: 0,*/
	  	    	  	    	    		    			onSlideComplete: slideComplete,
	  	    	  	    	    		    			navNextSelector: $('.autoslide-slider3 .next'),
	  	    	  	    	    		    			navPrevSelector: $('.autoslide-slider3 .prev')
	  	    	  	    	    		    		});
	  	    	  	    	    	    		}
	  	    	  	    	    	    	window.location = checkhash;
	  	    	  	    	    	  
	  	    	  	    	    	    		
	  	    	  	    	        			}else{
	  	    	  	    	        				errmsg = invocationResult.faml.response.rc.errormessage;
	  	    	  	    	        				//self.error(true); 
	  	    	  	    	        				//self.errormsg = ko.observable("ATM / Debit Card Hotlisting – Failure"+errmsg);
	  	    	  	    	      
	  	    	  	    	        				handleError(invocationResult.faml.response);
	  	    	  	    	        			checkhash="";
	  	    	  	    	        				// window.location =  '#rrasm01';
	  	    	  	    	        			}
	  	    	  	    	        		
	  	    	  	    	        	}
	  	    	  	    	        	}
	  	    	  	    	            
	  	    	  	    	            //ko.applyBindings(self, $(".dynamic-page-content").get(0));
	  	    	  	    	    	//});
	  	    	  	    	          
	  	    	  	    	  
	  	    	  	    	    };
   
	  	    	  	    	    	 /*************************HASh******************/  	    
};



