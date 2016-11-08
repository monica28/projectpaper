  var BillPayViewModel = function () {

        var self = this;
        
        self.curraccbalval = ko.observable();
        self.selAccount = ko.observable();
        self.accountStmtTxns = ko.observableArray([]);
        self.BillerList = ko.observableArray([]);
        self.BillerList1 = ko.observableArray([]);
		self.selBiller = ko.observable();
		self.billaccounts =ko.observableArray([]);
		self.billoperlist1 = ko.observableArray([]);
		self.billoperlist2= ko.observableArray([]);
		self.paymentlists = ko.observableArray([]);
		self.paybillsaccount = ko.observableArray([]);
		self.billerDetails  = ko.observableArray([]);
	    billerId = ko.observable();
		remark = ko.observableArray([]);
		remark2 = ko.observableArray([]);
		remark3 = ko.observableArray([]);
		remark4 = ko.observableArray([]);
		customerid  = ko.observable();
		self.paybillist = ko.observableArray([]);
        //Viahal Change Start
       
   
    /* =============== */
    
    this.rrblp01Page = function(){
    	reqParams = {};
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldTxnId"] = "BLP";
    	reqParams["fldScrnSeqNbr"] = "01";
    	
    	
    	reqParams["fldRequestId"] =RegfldRequestId;

    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
    	//alert(Rsessionid);
    	busyInd.show();
    	var invocationData = {
    			adapter : "API_Adapter",
        		procedure : "GetAPICall",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : rrblp01Success,
    		onFailure : AdapterFail,	    		
    		timeout: timeout
    	});
    };
    rrblp01Success = function(result){
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){
    		if(invocationResult.faml.response.rc.returncode == 0){
			
    			
    			
    			numcustcomp = invocationResult.faml.response.numcustcomp;
				self.BillerList.removeAll();
				self.BillerList1.removeAll();
	    		if(numcustcomp!=0){
	    			custcompinfo = invocationResult.faml.response.custcompnames.custcompinfo;
					var idx = 1;
					$(custcompinfo).each(function(index, obj) {
					//alert(obj.noofbills);
					if (typeof(obj.custAcctBal) != "undefined"){
								custAcctBal = obj.custAcctBal;
						}else {
								custAcctBal = '';
						}
						
						if (typeof(obj.compcurr) != "undefined"){
								compcurr = obj.compcurr;
						}else {
								compcurr = '';
					}
					if (typeof(obj.acctCurr) != "undefined"){
								acctCurr = obj.acctCurr;
						}else {
								acctCurr = '';
					}
					if (typeof(obj.billdetails) != "undefined")
						{
							displayValue = obj.billcompname+"#"+obj.custacctno+"#"+custAcctBal+"#"+obj.billcompacctno+"#"+obj.billcompid+"#"+obj.custbillcode+"#"+obj.flgbillinfoavl+"#"+obj.flgpaytypeallow+"#"+obj.mnemname+"#"+obj.billdetails.billoutstanding+"#"+obj.billdetails.billdate+"#"+obj.billdetails.billno+"#"+obj.billdetails.billpaymentdate+"#"+obj.noofbills+"#"+acctCurr+"#"+compcurr;
						}
						else {
							displayValue = obj.billcompname+"#"+obj.custacctno+"#"+custAcctBal+"#"+obj.billcompacctno+"#"+obj.billcompid+"#"+obj.custbillcode+"#"+obj.flgbillinfoavl+"#"+obj.flgpaytypeallow+"#"+obj.mnemname+"#####"+obj.noofbills+"#"+acctCurr+"#"+compcurr;
						
						}
						displaytxt = $.trim(obj.billcompname)+"-"+obj.mnemname;
					if(obj.noofbills!='0' || obj.flgbillinfoavl=='N'){
							strid = "item"+idx;
							custnames = "";
							self.BillerList.push({ displayvalue1: displayValue, displaytxt: displaytxt, strid:strid, billcompname:obj.billcompname, mnemname:obj.mnemname });
								idx++;
						}
						if(obj.noofbills=='0' && obj.flgbillinfoavl!='N'){
							strid = "item"+idx;
							self.BillerList1.push({ displayvalue1: displayValue, displaytxt: displaytxt, strid:strid, billcompname:obj.billcompname, mnemname:obj.mnemname });
						idx++;
					}
					});
	    		}
	    		    		
	    		
	    		
	    		 $("#contentData").load("Views/BillPay/rrblp01.html", null, function (response, status, xhr) {
	    	            if (status != "error") {}	
	    	            fldRequestId = invocationResult.faml.response.mci.requestid;
	    	          
	    	            $("#fldRequestId").val(fldRequestId);
	    	            
	    	            ko.applyBindings(self, $(".dynamic-page-content").get(0)); 
					if(numcustcomp == 0){
		    			$("#Nobiller").show();
						$("#biller").hide();
						}else{
		    			$("#Nobiller").hide();		    			
						$("#biller").show();
						}						
	    	        });
	    		
    		}else{
    			handleError(invocationResult.faml.response);
    		}
    	}else{
    		handleErrorNoResponse();
    	}
    	}
    	busyInd.hide();
    };
	this.rrblp01Submit = function(){ 
			selBillerValue = self.selBiller();
			selBillerValue = selBillerValue.split('#');
			reqParams = {};
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldTxnId"] = "BLP";
    	reqParams["fldRequestId"] = $("#fldRequestId").val();
    	reqParams["fldScrnSeqNbr"] = "02";
    	
    

    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
		
		//alert(selBillerValue[13]);
		reqParams["fldCompanyName"] = selBillerValue[0];
		reqParams["fldFromAcctNo"] = selBillerValue[1];
		reqParams["fldCustAcctBal"] = selBillerValue[2];
		reqParams["fldToAcctNo"] = selBillerValue[3];
		reqParams["fldBillCompId"] = selBillerValue[4];
		reqParams["fldConsumerNo"] = selBillerValue[5];
		reqParams["fldFlgBillInfoAvl"] = selBillerValue[6];
		reqParams["fldFlgPayTypeAllow"] = selBillerValue[7];
		reqParams["fldCompMnem"] = selBillerValue[8];
		
		reqParams["fldBillAmt"] = selBillerValue[9];
		reqParams["fldBillDate"] = selBillerValue[10];
		reqParams["fldBillNo"] = selBillerValue[11];
		reqParams["fldBillDueDate"] = selBillerValue[12];
		
		reqParams["fldNoOfBills"] = selBillerValue[13];
		reqParams["fldNoOfMnemBills"] = selBillerValue[13];
		reqParams["fldAcctCurr"] = selBillerValue[14];
		reqParams["fldCompCurr"] = selBillerValue[15];
		
		reqParams["fldTxnAmt"] = selBillerValue[9];
		reqParams["fldMstDataHost"] = fldAppId;
		reqParams["fldUserInput"] = 01+"*"+selBillerValue[4]+"*"+selBillerValue[8]+"*"+selBillerValue[9]+"*"+selBillerValue[10]+"*"+selBillerValue[11]+"*"+selBillerValue[12]+"*"+selBillerValue[13]+"*"+selBillerValue[5]+"*"+selBillerValue[6]+"*"+selBillerValue[7];

    	
    	busyInd.show();
    	var invocationData = {
    			adapter : "API_Adapter",
        		procedure : "GetAPICall",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : rrblp01SubmitSuccess,
    		onFailure : AdapterFail,	    		
    		timeout: timeout
    	});
	};
	rrblp01SubmitSuccess = function(result){
			busyInd.hide();
        	invocationResult = result.invocationResult;
        	if(invocationResult.isSuccessful) {
        		if(invocationResult.faml.response){	
        		if(invocationResult.faml.response.rc.returncode == 0){
					//	alert("fds "+invocationResult.faml.request.fldCompanyName);
    	    			selALLBiller(invocationResult.faml);    
    	    			window.location = "#rrblp02";
        		}else{
        			handleError(invocationResult.faml.response);
        		}
        		}else{
					handleErrorNoResponse();
				}
        	}
	}; 
	this.rrblp02Page = function(){
			selBillerValue = selALLBiller();
			
			billOutStanding = selBillerValue.request.fldBillAmt;
			$("#contentData").load("Views/BillPay/rrblp02.html", null, function (response, status, xhr) {
	    	            if (status != "error") {}	
	    	           
	    	            fldRequestId = selBillerValue.response.mci.requestid;		    	          
	    	            $("#fldRequestId").val(fldRequestId);
	    	            
	    	            ko.applyBindings(self, $(".dynamic-page-content").get(0)); 
							if(billOutStanding!=''){
								$('#fldTxnAmt').val(billOutStanding);
								$('#fldTxnAmt').hide();
								$('#billOutStandingDiv').show();
								$('#BilOtstnd').html(billOutStanding);$('#BilOtstndS').html(formatAmt(parseFloat(billOutStanding)));    
			}else {
				$('#fldTxnAmt').show();
				$('#billOutStandingOtherDiv').show();	
			}		$('#fldCompanyName').html(selBillerValue.request.fldCompanyName);
			$('#fldFromAcctNo').html(selBillerValue.request.fldFromAcctNo);
			$('#fldCustAcctBal').html(selBillerValue.request.fldCompCurr+"  "+selBillerValue.request.fldCustAcctBal);  
			//$('#fldCustAcctBalS').html(selBillerValue.request.fldCompCurr+"  "+formatAmt(parseFloat(selBillerValue.request.fldCustAcctBal)));
			if(selBillerValue.request.fldCustAcctBal != 0 && selBillerValue.request.fldCustAcctBal != ''){
					$('#fldCustAcctBalS').html(formatAmt(parseFloat(selBillerValue.request.fldCustAcctBal)));
			}else {
				$('#fldCustAcctBalS').html("0.00");
			}
			$('#fldBillCompId').html(selBillerValue.request.fldBillCompId);
			$('#fldConsumerNo').html(selBillerValue.request.fldConsumerNo);		
	    	        });
			
	};
	this.rrblp02Submit = function(){
			if($('#fldTxnAmt').val() == '' || $('#fldTxnAmt').val() == null){
				alert('Amount cannot be blank');
				return;
			}
			if($('#fldTxnAmt').val() <= 0){
				alert('Amount should be greater than 0.0');
				return;
			}
			selBillerValue =  selALLBiller();
			reqParams = {};
			reqParams["fldDeviceId"] = fldDeviceId;
			reqParams["fldWebServerId"] = fldWebServerId;
			reqParams["fldAppId"] = fldAppId;
			reqParams["fldAppServerId"] = fldAppServerId;
			reqParams["fldLangId"] = fldLangId;
			reqParams["fldTxnId"] = "BLP";
			reqParams["fldRequestId"] = $("#fldRequestId").val();
			
			reqParams["fldScrnSeqNbr"] = "03";
			reqParams["fldFCDBSessionId"] = RegfldFCDBSessionId;
			reqParams["fldFCDBRequestId"] = selBillerValue.response.mci.requestid;
			
	

	    	fldjsessionid = Regfldjsessionid;
	    	reqParams["fldLoginUserId"] =Regloginuid;
	    	reqParams["fldSessionId"] = Rsessionid;
			reqParams["fldCompanyName"] = selBillerValue.request.fldCompanyName;
			reqParams["fldFromAcctNo"] = selBillerValue.request.fldFromAcctNo;
			reqParams["fldCustAcctBal"] = selBillerValue.request.fldCustAcctBal;
			reqParams["fldToAcctNo"] = selBillerValue.request.fldToAcctNo;
			reqParams["fldBillCompId"] = selBillerValue.request.fldBillCompId;
			reqParams["fldConsumerNo"] = selBillerValue.request.fldConsumerNo;
			reqParams["fldFlgBillInfoAvl"] = selBillerValue.request.fldFlgBillInfoAvl;
			reqParams["fldFlgPayTypeAllow"] = selBillerValue.request.fldFlgPayTypeAllow;
			reqParams["fldCompMnem"] = selBillerValue.request.fldCompMnem;
			
			reqParams["fldBillAmt"] = selBillerValue.request.fldBillAmt;
			reqParams["fldBillDate"] = selBillerValue.request.fldBillDate;
			reqParams["fldBillNo"] = selBillerValue.request.fldBillNo;
			reqParams["fldBillDueDate"] = selBillerValue.request.fldBillDueDate;
			
			reqParams["fldNoOfBills"] = selBillerValue.request.fldNoOfBills;
			reqParams["fldNoOfMnemBills"] = selBillerValue.request.fldNoOfMnemBills;
			reqParams["fldAcctCurr"] = selBillerValue.request.fldAcctCurr;
			reqParams["fldCompCurr"] = selBillerValue.request.fldCompCurr;
			reqParams["fldTxnAmt"] = $('#fldTxnAmt').val();
			reqParams["fldMstDataHost"] = fldAppId;
			
			reqParams["fldUserInput"] = 01+"*"+selBillerValue.request.fldBillCompId+"*"+selBillerValue.request.fldCompMnem+"*"+selBillerValue.request.fldBillAmt+"*"+selBillerValue.request.fldBillDate+"*"+selBillerValue.request.fldBillNo+"*"+selBillerValue.request.fldBillDueDate+"*"+selBillerValue.request.fldNoOfMnemBills+"*"+selBillerValue.request.fldConsumerNo+"*"+selBillerValue.request.fldFlgBillInfoAvl+"*"+selBillerValue.request.fldFlgPayTypeAllow;
			
			busyInd.show();
    	var invocationData = {
    			adapter : "API_Adapter",
        		procedure : "GetAPICall",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : rrblp02SubmitSuccess,
    		onFailure : AdapterFail,	    		
    		timeout: timeout
    	});
	};
	rrblp02SubmitSuccess = function(result){
			busyInd.hide();
        	invocationResult = result.invocationResult;
        	if(invocationResult.isSuccessful) {
        		if(invocationResult.faml.response){	
        		if(invocationResult.faml.response.rc.returncode == 0){
    	    			selALLBiller(invocationResult.faml);    
    	    			window.location = "#rrblp03";
        		}else{
        			handleError(invocationResult.faml.response);
        		}
        		}else{
					handleErrorNoResponse();
				}
        	}
	};
	this.rrblp03Page = function(){
			selBillerValue = selALLBiller();
			
			
			
			billOutStanding = selBillerValue.request.fldBillAmt;
			fldCustAcctBal  = selBillerValue.request.fldCustAcctBal;
			
			$("#contentData").load("Views/BillPay/rrblp03.html", null, function (response, status, xhr) {
			
	    	            if (status != "error") {}	
	    	            
	    	            fldRequestId = selBillerValue.response.mci.requestid;		    	          
	    	            $("#fldRequestId").val(fldRequestId);
	    	            
						 ko.applyBindings(self, $(".dynamic-page-content").get(0)); 
						if(fldCustAcctBal!=''){
							$('#fldcustacctbalDiv').show();
							$('#fldcustacctbal').html(fldCustAcctBal);
							$('#fldcustacctbalS').html(formatAmt(parseFloat(fldCustAcctBal)));
						}else {
							$('#fldcustacctbalDivOthr').show();	
						}
						
						$('#fldTxnAmtS').html(formatAmt(parseFloat(selBillerValue.request.fldTxnAmt)));
						$('#fldTxnAmt').html(selBillerValue.request.fldTxnAmt);
						$('#fldCompanyName').html(selBillerValue.request.fldCompanyName);
						$('#fldFromAcctNo').html(selBillerValue.request.fldFromAcctNo);
						//$('#fldCustAcctBal').html(selBillerValue.request.fldCompCurr+"  "+fldCustAcctBal);
						$('#fldCustAcctBal').html(fldCustAcctBal);
						$('#fldBillCompId').html(selBillerValue.request.fldBillCompId);
						$('#fldConsumerNo').html(selBillerValue.request.fldConsumerNo);
				});
			
	};
	this.rrblp03Submit = function(){
			selBillerValue = selALLBiller();
			reqParams = {};
			reqParams["fldDeviceId"] = fldDeviceId;
			reqParams["fldWebServerId"] = fldWebServerId;
			reqParams["fldAppId"] = fldAppId;
			reqParams["fldAppServerId"] = fldAppServerId;
			reqParams["fldLangId"] = fldLangId;
			reqParams["fldTxnId"] = "BLP";
			reqParams["fldRequestId"] = $("#fldRequestId").val();//selBillerValue.response.mci.requestid;
			reqParams["fldScrnSeqNbr"] = "04";
			
			
		

	    	fldjsessionid = Regfldjsessionid;
	    	reqParams["fldLoginUserId"] =Regloginuid;
	    	reqParams["fldSessionId"] = Rsessionid;
			
			reqParams["fldCompanyName"] = selBillerValue.request.fldCompanyName;
			reqParams["fldFromAcctNo"] = selBillerValue.request.fldFromAcctNo;
			reqParams["fldCustAcctBal"] = selBillerValue.request.fldCustAcctBal;
			reqParams["fldToAcctNo"] = selBillerValue.request.fldToAcctNo;
			reqParams["fldBillCompId"] = selBillerValue.request.fldBillCompId;
			reqParams["fldConsumerNo"] = selBillerValue.request.fldConsumerNo;
			reqParams["fldFlgBillInfoAvl"] = selBillerValue.request.fldFlgBillInfoAvl;
			reqParams["fldFlgPayTypeAllow"] = selBillerValue.request.fldFlgPayTypeAllow;
			reqParams["fldCompMnem"] = selBillerValue.request.fldCompMnem;
			
			reqParams["fldBillAmt"] = selBillerValue.request.fldBillAmt;
			reqParams["fldBillDate"] = selBillerValue.request.fldBillDate;
			reqParams["fldBillNo"] = selBillerValue.request.fldBillNo;
			reqParams["fldBillDueDate"] = selBillerValue.request.fldBillDueDate;
			
			reqParams["fldNoOfBills"] = selBillerValue.request.fldNoOfBills;
			reqParams["fldNoOfMnemBills"] = selBillerValue.request.fldNoOfMnemBills;
			
			reqParams["fldAcctCurr"] = selBillerValue.request.fldAcctCurr;
			reqParams["fldCompCurr"] = selBillerValue.request.fldCompCurr;
			reqParams["fldTxnAmt"] = $('#fldTxnAmt').html();
			reqParams["fldMstDataHost"] = fldAppId;
			reqParams["fldUserInput"] = selBillerValue.response.fldUserInput;
			/* reqParams["fldUserInput"] = 01+"*"+selBillerValue.request.fldBillCompId+"*"+selBillerValue.request.fldCompMnem+"*"+selBillerValue.request.fldBillAmt+"*"+selBillerValue.request.fldBillDate+"*"+selBillerValue.request.fldBillNo+"*"+selBillerValue.request.fldBillDueDate+"*"+selBillerValue.request.fldNoOfMnemBills+"*"+selBillerValue.request.fldConsumerNo+"*"+selBillerValue.request.fldFlgBillInfoAvl+"*"+selBillerValue.request.fldFlgPayTypeAllow; */
			
			busyInd.show();
    	var invocationData = {
    			adapter : "API_Adapter",
        		procedure : "GetAPICall",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : rrblp03SubmitSuccess,
    		onFailure : AdapterFail,	    		
    		timeout: timeout
    	});
	};
	rrblp03SubmitSuccess = function(result){
			busyInd.hide();
        	invocationResult = result.invocationResult;
        	if(invocationResult.isSuccessful) {
        		if(invocationResult.faml.response){	
        		if(invocationResult.faml.response.rc.returncode == 0){
    	    			selALLBiller(invocationResult.faml);    
    	    			window.location = "#rrblp04";
        		}else{
        			handleError(invocationResult.faml.response);
        		}
        		}else{
					handleErrorNoResponse();
				}
        	}
	};
	this.rrblp04Page = function(){
			selBillerValue = selALLBiller();
			$("#contentData").load("Views/BillPay/rrblp04.html", null, function (response, status, xhr) {
			
            if (status != "error") {}	
			 ko.applyBindings(self, $(".dynamic-page-content").get(0)); 
			 
						 
			$('#fldCompanyName').html(selBillerValue.request.fldCompanyName);
			$('#fldFromAcctNo').html(selBillerValue.request.fldFromAcctNo);
			$('#fldCustAcctBal').html(selBillerValue.request.fldCustAcctBal);
			$('#fldBillCompId').html(selBillerValue.request.fldBillCompId);
			$('#fldConsumerNo').html(selBillerValue.request.fldConsumerNo);
			$('#refno').html(selBillerValue.response.codtxnrefno);
			$('#balavailable').html(selBillerValue.response.balavailable);
			$('#billamount').html(selBillerValue.response.paymentdtls.billamount);
			
			accountList.removeAll();
			accountSummList.removeAll();
			
			$('#balavailableS').html(formatAmt(parseFloat(selBillerValue.response.balavailable)));
			$('#billamountS').html(formatAmt(parseFloat(selBillerValue.response.paymentdtls.billamount)));
			
			billOutStanding = selBillerValue.request.fldBillAmt;
			fldcustacctbal  = selBillerValue.request.fldcustacctbal;
			});
	};
	
/*call for view/delete*/	
	
	this.rruabPage = function(){
	    //rruab01Success();
		busyInd.show();	
		var invocationData = {
					adapter : "BillListing",
		    		procedure : "GetBiller",
		    		parameters : []
			};
		WL.Client.invokeProcedure(invocationData, {
    		onSuccess : rruabPageSuccess,
    		onFailure : AdapterFail,	    		
    		timeout: timeout
    	});	
	
    }; 
	
	rruabPageSuccess = function(response){
	   if(invocationResult.isSuccessful) {
	      invocationResult = response.invocationResult;
		  billoperlist = invocationResult.result;
           return;	
		}
	};
	
	/*add biller */
	this.rruab01Page = function(){
	    //rruab01Success();
		busyInd.show();	
		var invocationData = {
					adapter : "BillListing",
		    		procedure : "GetBiller",
		    		parameters : []
			};
		WL.Client.invokeProcedure(invocationData, {
    		onSuccess : rruab01Success,
    		onFailure : AdapterFail,	    		
    		timeout: timeout
    	});	
	
    }; 
	
	rruab01Success = function(response){
	
	      invocationResult = response.invocationResult;
		  billoperlist = invocationResult.result;
            self.billoperlist1.removeAll();
			    $("#contentData").load("Views/recharge/rruab01.html", null, function (response, status, xhr){
	    	        if (status != "error") {}
					
					
					
					
					$(billoperlist).each(function(index, obj){
    	    		    displaytxt = obj.SubCategory;
					    value = obj.SubCategory;  
						//console.log(displaytxt+">>>################>>>>>>>>"+value);
					    
					
						if(obj.SubCategory!='' && obj.SubCategory!='PREPAID MOBILE' && obj.SubCategory!='PREPAID DTH' && obj.Type!="BILLER_N" && obj.Type!="PAYEE_N"&& obj.Type!="BOTH_N"){
							
    	    		    	billoperlists2.push({displaytxt:displaytxt,values:value});	   
						 }
    	    	    });
					
					
					$input =  billoperlists2;
					
				    $output = {SubCategory:{}};
				        $input.forEach(function(v,i) { 
					    $output.SubCategory[v.displaytxt] = 1;
				        });

				    $output.SubCategory= Object.keys($output.SubCategory);	
					
                    $($output.SubCategory).each(function(index, obj){
    	    		    displaytxt = obj;
						 value = obj; 
						console.log(displaytxt+">>>>>>>>>>>"+value);
					    
    	    		    self.billoperlist1.push({displaytxt:displaytxt,values:value});	   
						
    	    	    });
					
					
					
					
	               
	    	    ko.applyBindings(self, $(".dynamic-page-content").get(0)); 
										
	        });
			    busyInd.hide();	
	};


   self.rruab01submit = function(){
     if($("#rruab01").valid()){	
	 
	    billernames = ($('#Blist2 option:selected').text());
		billerId($('#Blist2 option:selected').val().split('#')[1]);
		BillerID=($('#Blist2 option:selected').val().split('#')[1]);
	    billertypes = ($('#Blist2 option:selected').val().split('#')[2]);
		Label1 = ($('#Blist2 option:selected').val().split('#')[3]);
		Label2= ($('#Blist2 option:selected').val().split('#')[4]);
		Label3= ($('#Blist2 option:selected').val().split('#')[5]);
		Label4= ($('#Blist2 option:selected').val().split('#')[6]);
		Lable1Min=($('#Blist2 option:selected').val().split('#')[7]);
		Lable1Max=($('#Blist2 option:selected').val().split('#')[8]);
	    Lable2Min=($('#Blist2 option:selected').val().split('#')[9]);
		Lable2Max=($('#Blist2 option:selected').val().split('#')[10]);
		Lable3Min=($('#Blist2 option:selected').val().split('#')[11]);
		Lable3Max=($('#Blist2 option:selected').val().split('#')[12]);
		Lable4Min=($('#Blist2 option:selected').val().split('#')[13]);
		Lable4Max=($('#Blist2 option:selected').val().split('#')[14]);
		RF4_Remarks=($('#Blist2 option:selected').val().split('#')[15]);
		REF1_FIXED=($('#Blist2 option:selected').val().split('#')[16]);
		REF2_FIXED=($('#Blist2 option:selected').val().split('#')[17]);
		REF3_FIXED=($('#Blist2 option:selected').val().split('#')[18]);
		REF4_FIXED=($('#Blist2 option:selected').val().split('#')[19]);
		REF1_TYPE=($('#Blist2 option:selected').val().split('#')[20]);
		REF2_TYPE=($('#Blist2 option:selected').val().split('#')[21]);
		REF3_TYPE=($('#Blist2 option:selected').val().split('#')[22]);
		REF4_TYPE=($('#Blist2 option:selected').val().split('#')[23]);
		REF5_TYPE=($('#Blist2 option:selected').val().split('#')[24]);
		
		Remarks=($('#Blist2 option:selected').val().split('   ')[1]);
		REF2_REMARKS=($('#Blist2 option:selected').val().split('   ')[2]);
		REF3_REMARKS=($('#Blist2 option:selected').val().split('   ')[3]);
		REF4_REMARKS=($('#Blist2 option:selected').val().split('   ')[4]);
		REF5_REMARKS=($('#Blist2 option:selected').val().split('   ')[5]);
		
		
		
			
			
		
		// alert(RF4_Remarks);
	    // alert(REF4_REMARKS);
		
	    Scheme1=Remarks.split('~');
		Scheme2=REF2_REMARKS.split('~');
		Scheme3=REF3_REMARKS.split('~');
		Scheme4=REF4_REMARKS.split('~');
		Scheme5=REF5_REMARKS.split('~');
	    
		
	  
	    for (i = 0; i < Scheme1.length; i++) { 
			             
			             remark.push(Scheme1[i])
	    }
		
		for (i = 0; i < Scheme2.length; i++) { 
			             
			             remark2.push(Scheme2[i])
	    }
		
		for (i = 0; i < Scheme3.length; i++) { 
			            
			             remark3.push(Scheme3[i])
	    }
		for (i = 0; i < Scheme4.length; i++) { 
			           
			             remark4.push(Scheme4[i])
	    }
						
      if(billertypes!="BOTH_OB"){
    	reqParams = {};
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldTxnId"] = "UAB";
		reqParams["fldBillerId"] = billerId();
    	reqParams["fldScrnSeqNbr"] = "02";
    	
    	
    	reqParams["fldRequestId"] =RegfldRequestId;
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
		
    	busyInd.show();
    	var invocationData = {
    			adapter : "BillListing",
        		procedure : "RRUAB02",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : rruab01submitSuccess,
    		onFailure : AdapterFail,	    		
    		timeout: timeout
    	});
	  }
	  else{
		  
		  $("#contentData").load("Views/recharge/addbill.html", null, function (response, status, xhr){
				        
	    	            if (status != "error") {}	
						 
						 

						
						 $("#company").html(billernames);
						 $("#billerId").val(BillerID);
						 $("#company1").val(billernames);
						 $("#custid").val(Regloginuid);
	                          
	    	            ko.applyBindings(self, $(".dynamic-page-content").get(0)); 
										
	    	    });
		  
	    }
		}
    }; 	
	
	rruab01submitSuccess = function(result){
	    invocationResult = result.invocationResult;
		    if(invocationResult.isSuccessful) {
			if(invocationResult.faml.response){	
	        if(invocationResult.faml.response.rc.returncode == 0){
			    
		        billaccount=invocationResult.faml.response.acctdtls;
				    
			
			    $("#contentData").load("Views/recharge/rruab02.html", null, function (response, status, xhr){
				        
	    	            if (status != "error") {}	
						    $('#company').html(billernames);
						         if(billertypes=="PAYEE"){
						  $('#type').html('Payment');
						  }
						  else if(billertypes=="BOTH"){
						  $('#type').html('Presentment & Payment');
						  }
						  else{
						  $('#type').html('Presentment');
						  }
						         biltyp = 	billertypes;
								 
								 
						        if(Label1!=''&& Label1!='NA'){
						            $('#lable1').html(Label1);
								    
						            $('#div1').show();
						        }
						        else{
						        $('#div1').hide();
						        }
						  
						        // if(Label2!=''&& Label2!='NA'){
						        // $('#lable2').html(Label2);
						        // $('#div2').show();
						        // }
						        // else{
						        // $('#div2').hide();
						        // }
								
								
							if(Label2!="" && Label2!='NA'){
								if(Lable2Min!="List"){
								$('#lable2').html(Label2);
								$('#div2').show();
								$('#DIV2').hide();
								}
								else{
								 $('#lable6').html(Label2);
						         $('#div2').hide();
								 $('#DIV2').show();
								}
						       
							   }
							   
							   if(Label3!="" && Label3!='NA'){
								if(Lable3Min!="List"){
								$('#lable3').html(Label3);
								$('#div3').show();
								$('#DIV3').hide();
								}
								else{
								 $('#lable7').html(Label3);
						         $('#div3').hide();
								 $('#DIV3').show();
								}
						       
							   }
						        
								// if(Label3!=''&& Label3!='NA'){
							
						        // $('#lable3').html(Label3);
						        // $('#div3').show();
						        // }
						        // else{
						        // $('#div3').hide();
						        // }
							
							  if(Label4!="" && Label4!='NA'){
								if(Lable4Min!="List"){
								$('#lable4').html(Label4);
								$('#div4').show();
								$('#div5').hide();
								}
								else{
								 $('#lable5').html(Label4);
						         $('#div4').hide();
								 $('#div5').show();
								}
						       
							   }	
								
						
								
								 //alert(temp+"<<<<"+temp2+">>>>"+temp3);
	                          
	    	            ko.applyBindings(self, $(".dynamic-page-content").get(0)); 
										
	    	    });
		    }
            else{
        	handleError(invocationResult.faml.response);
        	}
            }
            }		 
	    busyInd.hide();	
	};
	
	this.rruab02Page = function(){
	     if($("#fromuab02").valid()){
             
	        fldShortName = $('#Bsname').val();
		    fldAccountNo = $('#fldFromAcctNo').val().split('#')[0];
		    fldAuth1 = $('#authenticator1').val();
			fldAuth2 = $('#authenticator2').val();
			fldAuth3 = $('#authenticator3').val();
			fldAuth4 = $('#authenticator4').val();
			fldAuth5 = $('#authenticator5').val();
			fldAuth6 = $('#authenticator6').val();
			fldAuth7 = $('#authenticator7').val();
			fldAuth8 = $('#authenticator8').val();
			
			if(fldAuth1!=""){
			      if(Remarks!='NA' && Remarks!=''){
				
					var filter = new RegExp(Remarks);
								if (!filter.test(fldAuth1)) {
									customAlert(REF1_TYPE);
									return;							
								}
					
				  }
				  // else if(REF1_FIXED!='null' && REF1_FIXED!=''){
				  
						// if(fldAuth1.length < REF1_FIXED){
							// customAlert('Please enter valid  '+$('#lable1').html()+', Should be of  '+REF1_FIXED+' in length ');
							// return;
						 // }
				  // }else {
				 
						// if(fldAuth1.length < Lable1Min || fldAuth1.length > Lable1Max ){
							// customAlert('Please enter valid  '+$('#lable1').html()+', Should be between '+Lable1Min+' and '+Lable1Max);
							// return;
						 // }
				  // }
				 
			}
			if(fldAuth2!=""){
			    if(REF2_REMARKS!='NA' && REF2_REMARKS!=''){
				  
					var filter = new RegExp(REF2_REMARKS);
								if (!filter.test(fldAuth2)) {
									customAlert(REF2_TYPE);
									return;							
								}
					
				  }
				
				  // else if(REF2_FIXED!='null' && REF2_FIXED!=''){
						// if(fldAuth1.length < REF2_FIXED){
							// customAlert('Please enter valid  '+$('#lable2').html()+', Should be of  '+REF2_FIXED+' in length ');
							// return;
						 // }
				  // }else {
					 // if(fldAuth2.length < Lable2Min || fldAuth2.length > Lable2Max ){
						// customAlert('Please enter valid  '+$('#lable2').html()+', Should be between '+Lable2Min+' and '+Lable2Max);
						// return;
					 // }
				 // }
			}
			if(fldAuth3!=""){
			     if(REF3_REMARKS!='NA' && REF3_REMARKS!=''){
				
					var filter = new RegExp(REF3_REMARKS);
								if (!filter.test(fldAuth3)) {
									customAlert(REF3_TYPE);
									return;							
								}
					
				}
				// else if(REF3_FIXED!='null' && REF3_FIXED!=''){
						// if(fldAuth1.length < REF3_FIXED){
							// customAlert('Please enter valid  '+$('#lable3').html()+', Should be of  '+REF3_FIXED+' in length ');
							// return;
						 // }
				  // }else {
					 // if(fldAuth3.length < Lable3Min || fldAuth3.length > Lable3Max ){
						// customAlert('Please enter valid  '+$('#lable3').html()+', Should be between '+Lable3Min+' and '+Lable3Max);
						// return;
					 // }
				 // }
			}
			if(fldAuth4!=""){
			  
			    if(REF4_REMARKS!='NA' && REF4_REMARKS!=''){
			   
				 var str = REF4_REMARKS;
                 var index = str.indexOf("~");
                 if(index == -1){
				
                   var filter = new RegExp(REF4_REMARKS);
								if (!filter.test(fldAuth4)) {
									customAlert(REF4_TYPE);
									return;							
								}
                   }
			
				}
				// else if(REF4_FIXED!='null' && REF4_FIXED!=''){

						// if(fldAuth1.length < REF4_FIXED){
							// customAlert('Please enter valid  '+$('#lable4').html()+', Should be of  '+REF4_FIXED+' in length ');
							// return;
						 // }
				  // }else {
					 // if(fldAuth4.length < Lable4Min || fldAuth4.length > Lable4Max ){
						// customAlert('Please enter valid  '+$('#lable4').html()+', Should be between '+Lable4Min+' and '+Lable4Max);
						// return;
					 // }
				 // }
			}
			
			
			fldlable1= $('#lable1').html();
			fldlable2= $('#lable2').html();
			fldlable3= $('#lable3').html();
			fldlable4= $('#lable4').html();
			fldlable5=$('#lable5').html();
			fldlable6=$('#lable6').html();
			fldlable7=$('#lable7').html();
			fldlable8=$('#lable8').html();
           rruab02PageSuccess();
           		    
		}
	};
	
	rruab02PageSuccess = function(){
			$("#contentData").load("Views/recharge/rruab03.html", null, function (response, status, xhr){
			 $('#fldFromAcctNo').val('');
			  self.billaccounts.removeAll();
		            $(billaccount).each(function(index, obj) {
    	    			displaytxt = obj.codacctno+" - "+obj.nambranch;
    	    			accountValue = obj.codacctno+"#"+obj.namccyshrt+"#"+obj.acctbalance;
    	    		      self.billaccounts.push({ codacctno: obj.codacctno, displaytxt:displaytxt, accountValue: accountValue });
    	            });
			    $('#type2').html(billernames);
				   if(biltyp=="PAYEE"){
					  $('#forpayee').hide();
					  $('#sinotes').hide();
				   }else{
					   $('#forpayee').show();
					   $('#sinotes').show();
					        
				   }
				$(document).ready(function(){
				
				    var rates = document.getElementsByName('radOption');
                    var rate_value;
		   
          
                for(var i = 0; i < rates.length; i++){
                  if(rates[i].checked){
                  rate_value = rates[i].value;
				
                  }
                }
				if(rate_value=="autopay1"){
				   $('#autopay').prop('checked', true); 
				   $('#fldradio').show();
				   $('#fldaccount').show();
				}

				
				
				    $('input[type="radio"]').click(function(){
				
					if($(this).attr("value")=="autopay1"){
					   
						$('#autopay').prop('checked', true); 
						$('#fldradio').show();
						$('#fldaccount').show();
					}
					if($(this).attr("value")=="autopay2"){
					 $('#Yes,#No').prop('checked', false); 
	                 $('#fldAmonts').hide();
					 $('#fldaccount').hide();
					 $('#fldradio').hide(); 
					 $('#fldAmont').val('');
					 $('#fldFromAcctNo').val('');
					
					}
					if($(this).attr("value")=="yes"){
	                  $('#fldAmonts').hide();
					   
					  
					}
					if($(this).attr("value")=="no"){
					  //$('#autopay').prop('checked', false);
					  
					  $('#fldAmonts').show(); 
					
					  $('#fldAmont').val('');
					
					}
				    });
					
					
			    });				   
				    $("#billershort").html(fldShortName);
					$("#billaccnt").html(fldAccountNo);
					$("#authenticator1").html(fldAuth1);
					$("#authenticator2").html(fldAuth2);
					$("#authenticator3").html(fldAuth3);
					$("#authenticator4").html(fldAuth4);
					$("#authenticator5").html(fldAuth5);
					$("#authenticator6").html(fldAuth6);
					$("#authenticator7").html(fldAuth7);
					$("#authenticator8").html(fldAuth8);
					
					
					if(fldlable1!=''){
					$("#fldlable1").html(fldlable1);
					  $("#auth1").show();
					}
					else{
					  $("#auth1").hide();
					}
					if(fldlable2!=''){
					 $("#fldlable2").html(fldlable2);
					 $("#auth2").show();
					}
					else{
					 $("#auth2").hide();
					}
					if(fldlable3!=''){
					 $("#fldlable3").html(fldlable3);
					 $("#auth3").show();
					}
					else{
					 $("#auth3").hide();
					}
					if(fldlable4!=''){
					 $("#fldlable4").html(fldlable4);
					 $("#auth4").show();
					}
					else{
					 $("#auth4").hide();
					}
					if(fldlable5!=''){
					  $("#fldlable5").html(fldlable5);
					  $("#auth5").show();
					}
					else{
					  $("#auth5").hide();
					}
					if(fldlable6!=''){
					  $("#fldlable6").html(fldlable6);
					  $("#auth6").show();
					}
					else{
					  $("#auth6").hide();
					}
					if(fldlable7!=''){
					  $("#fldlable7").html(fldlable7);
					  $("#auth7").show();
					}
					else{
					  $("#auth7").hide();
					}
					if(fldlable8!=''){
					  $("#fldlable8").html(fldlable8);
					  $("#auth8").show();
					}
					else{
					  $("#auth8").hide();
					}
	    	    ko.applyBindings(self, $(".dynamic-page-content").get(0)); 
										
	    	});
		
	};
	
	this.rruab03Page = function(){
	
	
	       $(document).ready(function(){
	       var rates = document.getElementsByName('radOption');
		   var rates1 = document.getElementsByName('radOption1');
           var rate_value;
		   var rate_value1;
          
                for(var i = 0; i < rates.length; i++){
                  if(rates[i].checked){
                  rate_value = rates[i].value;
				  // alert(rate_value);
                  }
                }
				for(var i = 0; i < rates1.length; i++){
                  if(rates1[i].checked){
                  rate_value1 = rates1[i].value;
			
                  }
                }
                  
		if(rate_value1=='yes' ||rate_value1=='no'||rate_value=='autopay2' ){
        	if($("#rruab03").valid()){	
	        billernames1= $('#type2').html();
	        fldShortName1 = $("#billershort").html();
		    fldAccountNo1 = $('#fldFromAcctNo').val().split('#')[0];
		    fldAuthenticor1 =$("#authenticator1").html();
		    fldAuthenticor2 =$("#authenticator2").html();
			fldAuthenticor3 =$("#authenticator3").html();
			fldAuthenticor4=$("#authenticator4").html();
			fldAuthenticor5=$("#authenticator5").html();
			fldAuthenticor6=$("#authenticator6").html();
			fldAuthenticor7=$("#authenticator7").html();
			fldAuthenticor8=$("#authenticator8").html();
			
		    fldlable11= $("#fldlable1").html();
			fldlable22= $("#fldlable2").html();
			fldlable33= $("#fldlable3").html();
			fldlable44= $("#fldlable4").html();
			fldlable55=$("#fldlable5").html();
			fldlable66=$("#fldlable6").html();
			fldlable77=$("#fldlable7").html();
			fldlable88=$("#fldlable8").html();
			if(rate_value=='autopay2'){
		
			radiobutn=$("#fldChekval").val(rate_value);
			}
			else{
			radiobutn=$("#fldChekval").val(rate_value1);
			}
			button=$("#fldChekval").val();
			Amount=$("#fldAmont").val();
			Accountno=$('#fldFromAcctNo').val();
			amount1=$("#amount2").val(Amount);
			radioval1=$("#radioval1").val(rate_value);
			radioval=$("#radioval1").val();
			payamount=$("#amount2").val();
			 if(Amount!='' && Amount==0 && rate_value=="autopay1"){
		    	   alert('Please enter Amount greater than zero.');
		    	   return;
		       }
	        rruab03PageSuccess();
			}
			}
	else{
	   customAlert("Please select atleast one option.");
	}
	  
	   });
	      
		
	};
	
	rruab03PageSuccess = function(){
	
			$("#contentData").load("Views/recharge/rruab04.html", null, function (response, status, xhr){
			      
			        $('#type3').html(billernames1);
				    $("#billershort1").html(fldShortName1);
					$("#billaccnt1").html(fldAccountNo1);
					$("#authenticator1").html(fldAuthenticor1);
					$("#authenticator2").html(fldAuthenticor2);
					$("#authenticator3").html(fldAuthenticor3);
					$("#authenticator4").html(fldAuthenticor4);
					$("#authenticator5").html(fldAuthenticor5);
				    $("#authenticator6").html(fldAuthenticor6);
					$("#authenticator7").html(fldAuthenticor7);
					$("#authenticator8").html(fldAuthenticor8);
					
					if(Amount!=0){
						Amount = formatAmt(Amount,2);
						$("#Amount").html(Amount);
						$("#amount").show();
					
					}else {
					    $("#amount").hide();
						$("#Amount").html(Amount);
						
					}
				
					if(radioval=="autopay1"||radioval=="autopay2"){
					 	$("#sicnfrmnote").show();
					}
					else{ 
					  $("#sicnfrmnote").hide();
					}
					
					if(Accountno!=0){
					
						$("#fldaccount").show();
					}else {
					    $("#fldaccount").hide();
						
					}
					
					$("#checkbutton").html(button);
				
					if(fldlable11!=''){
					$("#fldlable1").html(fldlable11);
					  $("#auth1").show();
					}
					else{
					  $("#auth1").hide();
					}
					if(fldlable22!=''){
					 $("#fldlable2").html(fldlable22);
					 $("#auth2").show();
					}
					else{
					 $("#auth2").hide();
					}
					if(fldlable33!=''){
					 $("#fldlable3").html(fldlable33);
					 $("#auth3").show();
					}
					else{
					 $("#auth3").hide();
					}
					if(fldlable44!=''){
					 $("#fldlable4").html(fldlable44);
					 $("#auth4").show();
					}
					else{
					 $("#auth4").hide();
					}
					if(fldlable55!=''){
					 $("#fldlable5").html(fldlable55);
					 $("#auth5").show();
					}
					else{
					 $("#auth5").hide();
					}
					
					if(fldlable66!=''){
					 $("#fldlable6").html(fldlable66);
					 $("#auth6").show();
					}
					else{
					 $("#auth6").hide();
					}
					
					if(fldlable77!=''){
					 $("#fldlable7").html(fldlable77);
					 $("#auth7").show();
					}
					else{
					 $("#auth7").hide();
					}
					
					if(fldlable88!=''){
					 $("#fldlable8").html(fldlable88);
					 $("#auth8").show();
					}
					else{
					 $("#auth8").hide();
					}
	    	    ko.applyBindings(self, $(".dynamic-page-content").get(0)); 
										
	    	});
		
	};
	
	
	
	
	
	
	
	
	
	
    autopay = function(){
	    COMPANYNAME=$('#type3').html();
	    SHORTNAME=$("#billershort1").html();
	    ACCOUNTNO=$("#billaccnt1").html();
	    REFERENCE1=$("#authenticator1").html();
	    REFERENCE2=$("#authenticator2").html();
		REFERENCE3=$("#authenticator3").html();
		REFERENCE4=$("#authenticator4").html();
		REFERENCE5=$("#authenticator5").html();
		FLDLABLE1=$("#fldlable1").html();
		FLDLABLE2=$("#fldlable2").html();
		FLDLABLE3=$("#fldlable3").html();
		FLDLABLE4=$("#fldlable4").html();
		FLDLABLE5=$("#fldlable5").html();
		FLDLABLE6=$("#fldlable6").html();
		FLDLABLE7=$("#fldlable7").html();
		FLDLABLE8=$("#fldlable8").html();
		AMOUNT=$("#Amount").html();
		PAYAMOUNT=payamount;
	  
		Checkbt= $("#checkbutton").html();
     	

	    if(Checkbt =="no" ||Checkbt =="yes"){
		Auth1=$("#authenticator1").html();
		Auth2=$("#authenticator2").html();
		Auth3=$("#authenticator3").html();
		Auth4=$("#authenticator4").html();
		Auth5=$("#authenticator5").html();
		Auth6=$("#authenticator6").html();
		Auth7=$("#authenticator7").html();
		Auth8=$("#authenticator8").html();
    	reqParams = {};
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
		reqParams["fldShortName"] = $("#billershort1").html();
		reqParams["fldAccountNo"] = $("#billaccnt1").html();
		reqParams["fldTxnId"] = "UAB";
		
		if(AMOUNT!=''){
    	reqParams["fldAutoPayLmtAmt"] = PAYAMOUNT;
		reqParams["fldAutoPayLimitFlg"] = "Y";
		
		}
		else{
		 reqParams["fldAutoPayLmtAmt"] ="";
		 reqParams["fldAutoPayLimitFlg"] = "N";
		}
		if(Auth1){
		reqParams["fldAuthenticator"] = Auth1;
		}
		if(Auth1 && Auth2){
		  reqParams["fldAuthenticator"] = Auth1+'!'+Auth2;
		}
		if(Auth1 && Auth2 && Auth3){
		  reqParams["fldAuthenticator"] = Auth1+'!'+Auth2+'!'+Auth3;
		}
		if(Auth1 && Auth2 && Auth3 && Auth4){
		  reqParams["fldAuthenticator"] = Auth1+'!'+Auth2+'!'+Auth3+'!'+Auth4;
		}
		if(Auth1 && Auth2 && Auth3 && Auth5){
		  reqParams["fldAuthenticator"] = Auth1+'!'+Auth2+'!'+Auth3+'!'+Auth5;
		}
		if(Auth1 && Auth6){
		  reqParams["fldAuthenticator"] = Auth1+'!'+Auth6;
		}
		if(Auth1 && Auth6 && Auth7){
		  reqParams["fldAuthenticator"] = Auth1+'!'+Auth6+'!'+Auth7;
		}
		if(Auth1 && Auth2 && Auth7){
		  reqParams["fldAuthenticator"] = Auth1+'!'+Auth6+'!'+Auth3;
		}
		if(Auth1 && Auth6 && Auth7 && Auth4){
		  reqParams["fldAuthenticator"] = Auth1+'!'+Auth6+'!'+Auth3;
		}
		reqParams["fldAutoPayFlg"] = "Y";
		reqParams["fldBillerId"] =  billerId();
    	reqParams["fldScrnSeqNbr"] = "03";
    	reqParams["fldRequestId"] = RegfldRequestId;
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
		}
	
	  if(Checkbt =="autopay2"){
	    Auth1=$("#authenticator1").html();
		Auth2=$("#authenticator2").html();
		Auth3=$("#authenticator3").html();
		Auth4=$("#authenticator4").html();
		Auth5=$("#authenticator5").html();
		Auth6=$("#authenticator6").html();
		Auth7=$("#authenticator7").html();
		Auth8=$("#authenticator8").html();
		
        reqParams = {};	   
		reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
		reqParams["fldShortName"] = $("#billershort1").html();
		reqParams["fldTxnId"] = "UAB";
		if(Auth1){
		reqParams["fldAuthenticator"] = Auth1;
		}
		if(Auth1 && Auth2){
		reqParams["fldAuthenticator"] = Auth1+'!'+Auth2;
		}
		if(Auth1 && Auth2 && Auth3){
		  reqParams["fldAuthenticator"] = Auth1+'!'+Auth2+'!'+Auth3;
		}
		if(Auth1 && Auth2 && Auth3 && Auth4){
		  reqParams["fldAuthenticator"] = Auth1+'!'+Auth2+'!'+Auth3+'!'+Auth4;
		}
		if(Auth1 && Auth2 && Auth3 && Auth5){
		  reqParams["fldAuthenticator"] = Auth1+'!'+Auth2+'!'+Auth3+'!'+Auth5;
		}
		if(Auth1 && Auth6){
		  reqParams["fldAuthenticator"] = Auth1+'!'+Auth6;
		}
		if(Auth1 && Auth6 && Auth7){
		  reqParams["fldAuthenticator"] = Auth1+'!'+Auth6+'!'+Auth7;
		}
		if(Auth1 && Auth2 && Auth7){
		  reqParams["fldAuthenticator"] = Auth1+'!'+Auth6+'!'+Auth3;
		}
		if(Auth1 && Auth6 && Auth7 && Auth4){
		  reqParams["fldAuthenticator"] = Auth1+'!'+Auth6+'!'+Auth3;
		}
		reqParams["fldBillerId"] =  billerId();
    	reqParams["fldScrnSeqNbr"] = "04";
    	reqParams["fldRequestId"] = RegfldRequestId;
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
		}
    	busyInd.show();
	
    	var invocationData = {
    			adapter : "BillListing",
        		procedure : "RRUAB03",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : autopaySuccess,
    		onFailure : AdapterFail,	    		
    		timeout: timeout
    	});
	
	
    }; 	
	
	autopaySuccess = function(result){
	    invocationResult = result.invocationResult;
	    if(invocationResult.isSuccessful) {
	    if(invocationResult.faml.response){	
	    if(invocationResult.faml.response.rc.returncode == 0){
		fldBillerAccountId=invocationResult.faml.response.response.fldBillerAccountId;
		  $("#contentData").load("Views/recharge/rruab05.html", null, function (response, status, xhr){
		       
	    	            if (status != "error") {}	
	    	            //console.log(biltyp+"  Bill Type");
	    	            if(biltyp=="PAYEE" || Checkbt =="autopay2"){
	  					  	  $('#forpayee').hide();
		  					  $('#sinotes').hide();
		  				   }else{
		  					   $('#forpayee').show();
		  					   $('#sinotes').show();
		  					        
		  				   }
						 $('#type').html(COMPANYNAME);
                         $('#billershorts').html(SHORTNAME);						 
                         $('#authenticator1').html(REFERENCE1);	
                         $('#authenticator2').html(REFERENCE2);
						 $('#authenticator3').html(REFERENCE3);
						 $('#authenticator4').html(REFERENCE4);
						 $('#authenticator5').html(REFERENCE5);
						 if(ACCOUNTNO!=''){
						 $('#billaccnts').html(ACCOUNTNO);
						 $('#fldaccount').show();
                         }
						 else{
						 $('#fldaccount').hide();
						 }
						 
						 $('#refrenceno').html(fldBillerAccountId);
						
                         if(AMOUNT!=''){
                         $('#amounts').html(AMOUNT);
						 $('#amount').show();
                         }
  						 else{
						 $('#amount').hide();
						 }
						 
                         
						if(FLDLABLE1!=''){
					       $("#fldlablefrst").html(FLDLABLE1);
					       $("#REF1").show();
					    }  
					     else{
					      $("#REF1").hide();
					    }
						
					    if(FLDLABLE2!=''){
					     $("#fldlablesecnd").html(FLDLABLE2);
					     $("#REF2").show();
					    }
					    else{
					    $("#REF2").hide();
					    }
						
					   
						if(FLDLABLE3!=''){
						 $("#fldlablethrd").html(FLDLABLE3);
					     $("#REF3").show();
					    }
					    else{
					    $("#REF3").hide();
					    }
						
						
						
						if(FLDLABLE4!=''){
						 $("#fldlableforth").html(FLDLABLE4);
					     $("#REF4").show();
					    }
					    else{
					    $("#REF4").hide();
					    }
						
						if(FLDLABLE5!=''){
						 $("#fldlablefive").html(FLDLABLE5);
					     $("#REF5").show();
					    }
					    else{
					    $("#REF5").hide();
					    }
						
					
	    	            ko.applyBindings(self, $(".dynamic-page-content").get(0)); 
										
	    	        });
		 
		}
        else{
		  
        	handleError(invocationResult.faml.response);
		    window.location = "#billpayment";
        	}	
        }
        }		
	    busyInd.hide();	
			
	};
	/*add biller end */
	
	
	
	
	
	/*view/delete biller*/
	this.rruvb01Page = function(){
	 
	    reqParams = {};
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldTxnId"] = "UVB";
    	reqParams["fldScrnSeqNbr"] = "01";
    	reqParams["fldRequestId"] =RegfldRequestId;
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
    	busyInd.show();
    	var invocationData = {
    			adapter : "BillListing",
        		procedure : "RRUVB01",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : rruvb01PageSuccess,
    		onFailure : AdapterFail,	    		
    		timeout: timeout
    	});
	   
	};
	 
   rruvb01PageSuccess = function(result){
	invocationResult = result.invocationResult;
      if(invocationResult.isSuccessful) {
	  if(invocationResult.faml.response){	
	  if(invocationResult.faml.response.rc.returncode == 0){
			
			$("#contentData").load("Views/recharge/rruvb01.html", null, function (response, status, xhr) {
	    	            if (status != "error") {}	
	    	           statment =invocationResult.faml.response.billerDetails.biller;
					    self.billerDetails.removeAll();
		                $(statment).each(function(index, obj) {
						    e = getObjects(billoperlist, 'BillerID', obj.fldBillerId);
							//console.log('Biller Name  '+obj.fldBillerId+'  Biller Shorname '+obj.fldBillerShortName+'  '+e[0].SubCategory);
    	    			  //  displaytxt = obj.fldBillerId;
						    try {
						    	 if(e[0].SubCategory!='PREPAID MOBILE' && e[0].SubCategory!='PREPAID DTH' ){
									    displaytxt =  e[0].BillerName+" - "+obj.fldBillerShortName;
										BillerValue = obj.fldBillerShortName+"#"+obj.fldAuth1+"#"+obj.fldAuth2+"#"+obj.fldAuth3+"#"+obj.fldBillerAccId+"#"+obj.fldStatus+"#"+obj.fldBillerId+"#"+obj.fldBillerType;
										  self.billerDetails.push({ displaytxt:displaytxt, BillerValue: BillerValue});
										  }
						    }
						    catch(err) {
						        console.log("Error my side "+err.message);
						    }
						 
						});
						  
						
						 
	    	            ko.applyBindings(self, $(".dynamic-page-content").get(0)); 
										
	    	        });
	    }
		else{
        	handleError(invocationResult.faml.response);
			window.location = "#billpayment";
        	}
		}
    }		
		busyInd.hide();
	};
     
	 
	this.rruvb02Page = function(){
	    if($("#rruvb01").valid()){
	      biller = ($('#Billerlist option:selected').text().split('-')[0]);
	      fldBillerShortName = ($('#Billerlist').val().split('#')[0]);
	      fldAuth1 = ($('#Billerlist').val().split('#')[1]);
	      fldAuth2 = ($('#Billerlist').val().split('#')[2]);
	      fldAuth3 = ($('#Billerlist').val().split('#')[3]);
	      fldBillerAccId =($('#Billerlist').val().split('#')[4]);
	      fldStatus = ($('#Billerlist').val().split('#')[5]);
		  fldbillerID = ($('#Billerlist').val().split('#')[6]);
		  rruvb02PageSuccess();
	      
	   }
	}; 
     
   rruvb02PageSuccess = function(result){
	
			$("#contentData").load("Views/recharge/rruvb02.html", null, function (response, status, xhr) {
	    	            if (status != "error") {}	
	    	             $("#Billernme").html(biller);
						 $("#shortname").html(fldBillerShortName);
						 $("#refno1").html(fldAuth1);
						 $("#refno2").html(fldAuth2);
						 $("#status").html(fldStatus);
	    	            ko.applyBindings(self, $(".dynamic-page-content").get(0)); 
										
	    	        });
	};
  
  
  this.rruvb02submit = function(){
	  
	      biller1 =  $("#Billernme").html();
	      fldBillerShortName1 = $("#shortname").html();
	      fldAuth11 =  $("#refno1").html();
	      fldAuth22 = $("#refno2").html();
	      fldStatus1 =  $("#status").html();
		  rruvb02submitSuccess();
	      
	   
	};
   
  rruvb02submitSuccess = function(result){
	
			$("#contentData").load("Views/recharge/rruvbvd04.html", null, function (response, status, xhr) {
	    	            if (status != "error") {}	
	    	             $("#Billernme1").html(biller1);
						 $("#shortname1").html(fldBillerShortName1);
						 $("#refno11").html(fldAuth11);
						 $("#refno22").html(fldAuth22);
						 $("#status1").html(fldStatus1);
	    	            ko.applyBindings(self, $(".dynamic-page-content").get(0)); 
										
	    	        });
	};
	
   DELETEBILL = function(){
  // alert(fldBillerAccId);
        fldBillname=$("#Billernme1").html();
		fldBillerShortName=$("#shortname1").html();
	    fldAuth1=$("#refno11").html();
		fldAuth2=$("#refno22").html();
	    reqParams = {};
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldTxnId"] = "UVB";
    	reqParams["fldScrnSeqNbr"] = "02";
		reqParams["fldBillerId"] = fldBillerAccId;
    	reqParams["fldRequestId"] =RegfldRequestId;
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;

    	busyInd.show();
    	var invocationData = {
    			adapter : "BillListing",
        		procedure : "RRUVB02",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : DELETEBILLSuccess,
    		onFailure : AdapterFail,	    		
    		timeout: timeout
    	});
	   
	};
	
	DELETEBILLSuccess = function(result){
	invocationResult = result.invocationResult;
	  if(invocationResult.isSuccessful) {
	  if(invocationResult.faml.response){	
	  if(invocationResult.faml.response.rc.returncode == 0){
	  fldBillerAccountId=invocationResult.faml.response.response.fldBillerAccountId;
	    $("#contentData").load("Views/recharge/rruvb05.html", null, function (response, status, xhr) {
	    	        if (status != "error") {}	
	    	             $("#fldbiller").html(biller1);
						 $("#fldBillerAccountId").html(fldBillerAccountId);
						 $("#Shortname").html(fldBillerShortName1);
						 $("#fldAuth1").html(fldAuth1);
						 $("#fldAuth2").html(fldAuth2);
	    	         ko.applyBindings(self, $(".dynamic-page-content").get(0)); 
										
	    });
	        }
       else{
			handleError(invocationResult.faml.response);
			window.location = "#billpayment";
		    }
        }
         }		
	  busyInd.hide();
	};
	/*view/delete biller end*/
	
	
	
	
	/*biller payment history*/
	this.rruph01Page = function(){
	
	    reqParams = {};
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldTxnId"] = "UVB";
    	reqParams["fldScrnSeqNbr"] = "01";
    	reqParams["fldRequestId"] =RegfldRequestId;
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
    	busyInd.show();
    	var invocationData = {
    			adapter : "BillListing",
        		procedure : "RRUVB01",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : rruph01PageSuccess,
    		onFailure : AdapterFail,	    		
    		timeout: timeout
    	});

	};
	
	rruph01PageSuccess = function(result){
		invocationResult = result.invocationResult;
      if(invocationResult.isSuccessful) {
	  if(invocationResult.faml.response){	
	  if(invocationResult.faml.response.rc.returncode == 0){
			$("#contentData").load("Views/recharge/rruph01.html", null, function (response, status, xhr) {
	    	            if (status != "error") {}	
	    	           statment =invocationResult.faml.response.billerDetails.biller;
					    self.billerDetails.removeAll();
		                $(statment).each(function(index, obj) {
						    e = getObjects(billoperlist, 'BillerID', obj.fldBillerId);
							//console.log('Biller Name  '+obj.fldBillerId+'  Biller Shorname '+obj.fldBillerShortName+'  '+e[0].SubCategory);
    	    			  //  displaytxt = obj.fldBillerId;
						    try {
						    	 if(e[0].SubCategory!='PREPAID MOBILE' && e[0].SubCategory!='PREPAID DTH' ){
									    displaytxt =  e[0].BillerName+" - "+obj.fldBillerShortName;
										BillerValue = obj.fldBillerShortName+"#"+obj.fldAuth1+"#"+obj.fldAuth2+"#"+obj.fldAuth3+"#"+obj.fldBillerAccId+"#"+obj.fldStatus+"#"+obj.fldBillerId+"#"+obj.fldBillerType;
										  self.billerDetails.push({ displaytxt:displaytxt, BillerValue: BillerValue});
										  }
						    }
						    catch(err) {
						        console.log("Error my side "+err.message);
						    }
						 
						});
						  
						
						 
	    	            ko.applyBindings(self, $(".dynamic-page-content").get(0)); 
										
	    	        });
	    }
		else{
        	handleError(invocationResult.faml.response);
			window.location = "#billpayment";
        	}
		}
    }		
		busyInd.hide();
	};
	
	
	rruph01submit = function(){
	  if($("#frmuph01").valid()){
	    fldbillerID = ($('#Billerlist').val().split('#')[6]);
	    temp = $("#fldFromDate").val();
	    date = temp.split('/');
	    fromdate = date[2]+date[1]+date[0];
	    temp2 = $("#fldToDate").val();
	    date2 = temp2.split('/');
	    todate = date2[2]+date2[1]+date2[0];
	  
	    reqParams = {};
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldTxnId"] = "UPH";
    	reqParams["fldScrnSeqNbr"] = "01";
		reqParams["fldToDate"] = todate;
		reqParams["fldStartDate"] = fromdate;
		reqParams["fldBillerId"] = fldbillerID;
    	reqParams["fldRequestId"] =RegfldRequestId;
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;

    	busyInd.show();
    	var invocationData = {
    			adapter : "BillListing",
        		procedure : "RRUPH01",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : rruph01submitSuccess,
    		onFailure : AdapterFail,	    		
    		timeout: timeout
    	});
	   }
	};
	
	rruph01submitSuccess = function(result){
			invocationResult = result.invocationResult;
			if(invocationResult.isSuccessful) {
			if(invocationResult.faml.response){
			if(invocationResult.faml.response.rc.returncode == 0){
            paymentlist =invocationResult.faml.response.response.biller;
			self.paymentlists.removeAll();
		
		    $(paymentlist).each(function(index, obj) { 
			 
				// TransDate= obj.fldTransactionDate;
				    // year=TransDate.substring(0,4);
					// mounths=TransDate.substring(4,6);
					// date=TransDate.substring(6,8);
					// if(mounths=="01"){
				      // MOUNTH="Jan";
					// }
					// if(mounths=="02"){
					  // MOUNTH="Feb";
					// }
					// if(mounths=="03"){
					  // MOUNTH="Mar";
					// }
					// if(mounths=="04"){
					  // MOUNTH="Apr";
					// }
					// if(mounths=="05"){
					  // MOUNTH="May";
					// }
					// if(mounths=="06"){
					  // MOUNTH="Jun";
					// }
					// if(mounths=="07"){
					  // MOUNTH="Jul";
					// }
					// if(mounths=="08"){
					  // MOUNTH="Aug";
					// }
					// if(mounths=="09"){
					  // MOUNTH="Sept";
					// }
					// if(mounths=="10"){
					  // MOUNTH="Oct";
					// }
					// if(mounths=="11"){
					  // MOUNTH="Nov";
					// }
					// if(mounths=="12"){
					  // MOUNTH="Dec";
					// }
					
		            // fldTransactionDate= date +" "+ MOUNTH+" "+year;
				
    	    	self.paymentlists.push({billername: obj.fldBillerShortName, billernick:obj.fldBillerShortName, Reference1: obj.fldAuth1,Reference2:obj.fldAuth2,amount:obj.fldPaymentAmount,transamount:obj.fldPaymentAmount,transdate:obj.fldTransactionDate,transrefrence:obj.fldTransactionId,status:obj.fldStatus});
				if(index==4)
				return false;
				
    	    });
			

            			
			$("#contentData").load("Views/recharge/rruph02.html", null, function (response, status, xhr) {
								if (status != "error") {}	
							
						   ko.applyBindings(self, $(".dynamic-page-content").get(0)); 
												
			});
			}
		else{
			handleError(invocationResult.faml.response);
			window.location = "#billpayment";
		    }
		}
           }		
	 busyInd.hide();
	};
	/*biller payment history end*/
	
	
	
	
	/*ad hoc*/
	this.rruap01Page = function(){
		busyInd.show();	
		var invocationData = {
					adapter : "BillListing",
		    		procedure : "GetBiller",
		    		parameters : []
			};
		WL.Client.invokeProcedure(invocationData, {
    		onSuccess : rruap01Success,
    		onFailure : AdapterFail,	    		
    		timeout: timeout
    	});	
	
    }; 
	
//	rruab01Success = function(response){
	
	      
	 rruap01Success = function(response){
		 invocationResult = response.invocationResult;
		  billoperlist = invocationResult.result;
           self.billoperlist1.removeAll();
			   $("#contentData").load("Views/recharge/rruap01.html", null, function (response, status, xhr){
	    	            if (status != "error") {}	
			
                    $(billoperlist).each(function(index, obj){
    	    		    displaytxt = obj.SubCategory;
					    value = obj.SubCategory;  
						if((obj.Type=='PAYEE'||obj.Type=='BOTH')&& obj.SubCategory!='PREPAID MOBILE' && obj.SubCategory!='PREPAID DTH'&& obj.Type!='BILLER'){
    	    		    billoperlists.push({displaytxt:displaytxt,values:value});	   
						 }
    	    	    });
					
					
					$input =  billoperlists;

				    $output = {SubCategory:{}};
				        $input.forEach(function(v,i) { 
					    $output.SubCategory[v.displaytxt] = 1;
				        });

				    $output.SubCategory= Object.keys($output.SubCategory);	
					
                    $($output.SubCategory).each(function(index, obj){
    	    		    displaytxt = obj;
					    value = obj;  
    	    		    self.billoperlist2.push({displaytxt:displaytxt,values:value});	   
						
    	    	    });
	
	
	    	    ko.applyBindings(self, $(".dynamic-page-content").get(0)); 
										
	        });
			   busyInd.hide();	
	};  


    self.rruap01submit = function(){
     if($("#rruap01").valid()){	
	 
	    billernames = ($('#Blist2 option:selected').text());
	    billertypes = ($('#Blist2 option:selected').val().split('#')[2]);
		Label1 = ($('#Blist2 option:selected').val().split('#')[3]);
		Label2= ($('#Blist2 option:selected').val().split('#')[4]);
		Label3= ($('#Blist2 option:selected').val().split('#')[5]);
		Label4= ($('#Blist2 option:selected').val().split('#')[6]);
	    billerId($('#Blist2 option:selected').val().split('#')[1]);
		Lable1Min=($('#Blist2 option:selected').val().split('#')[7]);
		Lable1Max=($('#Blist2 option:selected').val().split('#')[8]);
	    Lable2Min=($('#Blist2 option:selected').val().split('#')[9]);
		Lable2Max=($('#Blist2 option:selected').val().split('#')[10]);
		Lable3Min=($('#Blist2 option:selected').val().split('#')[11]);
		Lable3Max=($('#Blist2 option:selected').val().split('#')[12]);
		Lable4Min=($('#Blist2 option:selected').val().split('#')[13]);
		Lable4Max=($('#Blist2 option:selected').val().split('#')[14]);
		RF4_Remarks=($('#Blist2 option:selected').val().split('#')[15]);
		
	   REMARK1=RF4_Remarks.split('~')[0];
	   REMARK2=RF4_Remarks.split('~')[1];
	   REMARK3=RF4_Remarks.split('~')[2];
	   
    	reqParams = {};
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldTxnId"] = "UAB";
		reqParams["fldBillerId"] = billerId();
    	reqParams["fldScrnSeqNbr"] = "02";
    	
    	
    	reqParams["fldRequestId"] =RegfldRequestId;
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
		
    	busyInd.show();
    	var invocationData = {
    			adapter : "BillListing",
        		procedure : "RRUAB02",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : rruap01submitSuccess,
    		onFailure : AdapterFail,	    		
    		timeout: timeout
    	});
		}
    }; 	
	
	rruap01submitSuccess = function(result){
	    invocationResult = result.invocationResult;
		    if(invocationResult.isSuccessful) {
			if(invocationResult.faml.response){	
	        if(invocationResult.faml.response.rc.returncode == 0){
		        billaccount=invocationResult.faml.response.acctdtls;
				    self.billaccounts.removeAll();
		            $(billaccount).each(function(index, obj) {
    	    			displaytxt = obj.codacctno+" - "+obj.nambranch;
    	    			accountValue = obj.codacctno+"#"+obj.namccyshrt+"#"+obj.acctbalance;
    	    		      self.billaccounts.push({ codacctno: obj.codacctno, displaytxt:displaytxt, accountValue: accountValue });
    	            });
			
			    $("#contentData").load("Views/recharge/rruap02.html", null, function (response, status, xhr){
	    	            if (status != "error") {}	
						  $('#company').html(billernames);
						  if(billertypes=="PAYEE"){
						  $('#type').html('Payment');
						  }
						  else if(billertypes=="BOTH"){
						  $('#type').html('Presentment & Payment');
						  }
						  else{
						  $('#type').html('Presentment');
						  }
						  
						 if(Label1!=''){
						  $('#lable1').html(Label1);
						  $('#div1').show();
						  }
						  else{
						   $('#div1').hide();
						  }
						  
						  if(Label2!=''){
						  $('#lable2').html(Label2);
						  $('#div2').show();
						  }
						  else{
						   $('#div2').hide();
						  }
	                      if(Label3!=''){
						   $('#lable3').html(Label3);
						   $('#div3').show();
						  }
						  else{
						   $('#div3').hide();
						  }
						 if(Label4!=""){
								if(Lable4Min !="List"){
								$('#lable4').html(Label4);
								$('#div4').show();
								$('#div5').hide();
								}
								else{
								 $('#lable5').html(Label4);
						         $('#div4').hide();
								 $('#div5').show();
								}
						       
					    }
						  
 
	    	            ko.applyBindings(self, $(".dynamic-page-content").get(0)); 
										
	    	        });
		    }
            else{
        	handleError(invocationResult.faml.response);
			//window.location = "#billpayment";
        	}
            }
            }			
	    busyInd.hide();	
	};	
	
	
	this.rruap02Page = function(){
	    if($("#rruap02").valid()){	
	        fldShortName = $('#Bsname').val();
		    fldAccountNo = $('#fldFromAcctNo').val().split('#')[0];
			fldAmtTxn=$('#fldAmtTxn').val();
		    fldAuth1 = $('#authenticator1').val();
		    fldAuth2 = $('#authenticator2').val();
			fldAuth3 = $('#authenticator3').val();
			fldAuth4 = $('#authenticator4').val();
			fldAuth5 = $('#authenticator5').val();
		    LABLE = $('#lable1').html();
			LABLE2= $('#lable2').html();
			LABLE3= $('#lable3').html();
			LABLE4= $('#lable4').html();
			LABLE5= $('#lable5').html();
			
			
			if(fldAuth1!=""){
				 if(fldAuth1.length < Lable1Min || fldAuth1.length > Lable1Max ){
					customAlert('Please enter valid  '+$('#lable1').html()+', Should be between '+Lable1Min+' and '+Lable1Max);
					return;
				 }
			}
			if(fldAuth2!=""){
				 if(fldAuth2.length < Lable2Min || fldAuth2.length > Lable2Max ){
					customAlert('Please enter valid  '+$('#lable2').html()+', Should be between '+Lable2Min+' and '+Lable2Max);
					return;
				 }
			}
			if(fldAuth3!=""){
				 if(fldAuth3.length < Lable3Min || fldAuth3.length > Lable3Max ){
					customAlert('Please enter valid  '+$('#lable3').html()+', Should be between '+Lable3Min+' and '+Lable3Max);
					return;
				 }
			}
			if(fldAuth4!=""){
				 if(fldAuth4.length < Lable4Min || fldAuth4.length > Lable4Max ){
					customAlert('Please enter valid  '+$('#lable4').html()+', Should be between '+Lable4Min+' and '+Lable4Max);
					return;
				 }
			}
			
	     rruap02PageSuccess();
		}
	};
	
	rruap02PageSuccess = function(){
	
			$("#contentData").load("Views/recharge/rruap03.html", null, function (response, status, xhr){
			        $('#type2').html(billernames);		   
				    $("#billershort").html(fldShortName);
					$("#billaccnt").html(fldAccountNo);
					$("#amount").html(fldAmtTxn);
		
					if(fldAmtTxn!=0){
						fldAmtTxn = formatAmt(fldAmtTxn,2);
						//alert(fldAmtTxn+"   hy");
						$("#amount1").html(fldAmtTxn);
					}else {
				//	alert(fldAmtTxn+"   hyq");
						$("#amount1").html(fldAmtTxn);
					}
					
					if(LABLE!=''){
					$("#lables1").html(LABLE);
					  $("#auth1").show();
					}
					else{
					  $("#auth1").hide();
					}
					if(LABLE2!=''){
					 $("#lables2").html(LABLE2)
					 $("#auth2").show();
					}
					else{
					 $("#auth2").hide();
					}
					if(LABLE3!=''){
					 $("#lables3").html(LABLE3)
					 $("#auth3").show();
					}
					else{
					 $("#auth3").hide();
					}
					if(LABLE4!=''){
					 $("#lables4").html(LABLE4)
					 $("#auth4").show();
					}
					else{
					 $("#auth4").hide();
					}
					if(LABLE5!=''){
					 $("#lables5").html(LABLE5)
					 $("#auth5").show();
					}
					else{
					 $("#auth5").hide();
					}
					$("#authenticator1").html(fldAuth1);
					$("#authenticator2").html(fldAuth2);
					$("#authenticator3").html(fldAuth3);
					$("#authenticator4").html(fldAuth4);
					$("#authenticator5").html(fldAuth5);
	    	    ko.applyBindings(self, $(".dynamic-page-content").get(0)); 
										
	    	});
		
	};
	
	this.rruap03Page = function(){
	        billernames1= $('#type2').html();
	        fldShortName1 = $("#billershort").html();
		    fldAccountNo1 = $("#billaccnt").html();
		    fldAuthenticor1 =$("#authenticator1").html();
		    fldAuthenticor2 =$("#authenticator2").html();
			fldAuthenticor3 =$("#authenticator3").html();
			fldAuthenticor4=$("#authenticator4").html();
			fldAuthenticor5=$("#authenticator5").html();
		    fldlable11= $("#lables1").html();
			fldlable22= $("#lables2").html();
			fldlable33= $("#lables3").html();
			fldlable44= $("#lables4").html();
			fldlable55= $("#lables5").html();
			Amount=$("#amount").html();;
	       rruap03PageSuccess();
	};
	
	rruap03PageSuccess = function(){
	
			$("#contentData").load("Views/recharge/rruap04.html", null, function (response, status, xhr){
			      
			        $('#type3').html(billernames1);
				    $("#billershort1").html(fldShortName1);
					$("#billaccnt1").html(fldAccountNo1);
					$("#authenticator1").html(fldAuthenticor1);
					$("#authenticator2").html(fldAuthenticor2);
					$("#authenticator3").html(fldAuthenticor3);
					$("#authenticator4").html(fldAuthenticor4);
					$("#authenticator5").html(fldAuthenticor5);
					//$("#Amount").html(Amount);
					$("#Amount").html(Amount);
					if(Amount!='' && Amount!=0){
						Amount = formatAmt(Amount,2);
						$("#Amount1").html(Amount);
					}else {
						$("#Amount1").html(Amount);
					}
					if(fldlable11!=''){
					$("#fldlable1").html(fldlable11);
					  $("#auth1").show();
					}
					else{
					  $("#auth1").hide();
					}
					if(fldlable22!=''){
					 $("#fldlable2").html(fldlable22);
					 $("#auth2").show();
					}
					else{
					 $("#auth2").hide();
					}
					if(fldlable33!=''){
					 $("#fldlable3").html(fldlable33);
					 $("#auth3").show();
					}
					else{
					 $("#auth3").hide();
					}
					if(fldlable44!=''){
					 $("#fldlable4").html(fldlable44);
					 $("#auth4").show();
					}
					else{
					 $("#auth4").hide();
					}
					if(fldlable55!=''){
					 $("#fldlable5").html(fldlable55);
					 $("#auth5").show();
					}
					else{
					 $("#auth5").hide();
					}
					
	    	    ko.applyBindings(self, $(".dynamic-page-content").get(0)); 
										
	    	});
		
	};
	
	 adhocpayment = function(){
	    COMPANYNAME=$('#type3').html();
	    SHORTNAME=$("#billershort1").html();
		ACCOUNT=$("#billaccnt1").html();
	    AUTH1 = $("#authenticator1").html();
		AUTH2= $("#authenticator2").html();
		AUTH3 = $("#authenticator3").html();
		AUTH4= $("#authenticator4").html();
		AUTH5= $("#authenticator5").html();
		FLDLABLE1=$("#fldlable1").html();
		FLDLABLE2=$("#fldlable2").html();
		FLDLABLE3=$("#fldlable3").html();
		FLDLABLE4=$("#fldlable4").html();
		FLDLABLE5=$("#fldlable5").html();
		AMOUNT=$("#Amount").html();
	   //  alert(ACCOUNT);
		
	    reqParams = {};
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldTxnId"] = "UAP";
    	reqParams["fldScrnSeqNbr"] = "01";
		reqParams["fldCurrency"] ='INR';
		reqParams["fldTxnAmt"] = AMOUNT;
		reqParams["fldRechargeBillerId"] = billerId();
		reqParams["fldFromAcctNo"]= ACCOUNT;
		if(AUTH1){
		reqParams["fldAuthenticators"] = AUTH1;
		}
		if(AUTH1 && AUTH2){
		reqParams["fldAuthenticators"] = AUTH1+'!'+AUTH2;
		}
		if(AUTH1 && AUTH2 && AUTH3){
		reqParams["fldAuthenticators"] = AUTH1+'!'+AUTH2+'!'+AUTH3;
		}
		if(AUTH1 && AUTH2 && AUTH3 && AUTH4){
		reqParams["fldAuthenticators"] = AUTH1+'!'+AUTH2+'!'+AUTH3+'!'+AUTH4;
		}
		if(AUTH1 && AUTH2 && AUTH3 && AUTH5){
		reqParams["fldAuthenticators"] = AUTH1+'!'+AUTH2+'!'+AUTH3+'!'+AUTH5;
		}
    	reqParams["fldRequestId"] =RegfldRequestId;
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
//fldAppId=RS&fldTxnId=UAP&fldScrnSeqNbr=01&fldSessionId=1269973670UFWUPKOD&fldRequestId=1269973670UFWUPKOD17619962HQY&fldCurrency=INR&fldTxnAmt=100&fldRechargeBillerId=AIRTMH&fldFromAcctNo=50100000000107&fldAuthenticators=9833202426!MUM!1
    	busyInd.show();
    	var invocationData = {
    			adapter : "BillListing",
        		procedure : "RRUAP01",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : adhocpaymentSuccess,
    		onFailure : AdapterFail,	    		
    		timeout: timeout
    	});
	   
	};
	 adhocpaymentSuccess = function(result){
	    invocationResult = result.invocationResult;
	    if(invocationResult.isSuccessful) {
	    if(invocationResult.faml.response){	
	    if(invocationResult.faml.response.rc.returncode == 0){
		fldTransactionID=invocationResult.faml.response.response.fldTransactionID;
		  $("#contentData").load("Views/recharge/rruap05.html", null, function (response, status, xhr){
	    	            if (status != "error") {}	
						 $('#type').html(COMPANYNAME);
                         $('#billershorts').html(SHORTNAME);
                         $('#refrenceno').html(fldTransactionID);
						
                         if(AMOUNT!=''){
                         $('#amounts').html(AMOUNT);
						 $('#amount').show();
                         }
  						 else{
						 $('#amount').hide();
						 }
						 if(AMOUNT!='' && AMOUNT!=0){
								AMOUNT = formatAmt(AMOUNT,2);
								$("#amounts1").html(AMOUNT);
							}else {
								$("#amounts1").html(AMOUNT);
							}
                         
						if(FLDLABLE1!=''){
					       $("#fldlablefrst").html(FLDLABLE1);
					       $("#REF1").show();
					    }  
					     else{
					      $("#REF1").hide();
					    }
						
					    if(FLDLABLE2!=''){
					     $("#fldlablesecnd").html(FLDLABLE2);
					     $("#REF2").show();
					    }
					    else{
					    $("#REF2").hide();
					    }
						
					   
						if(FLDLABLE3!=''){
						 $("#fldlablethrd").html(FLDLABLE3);
					     $("#REF3").show();
					    }
					    else{
					    $("#REF3").hide();
					    }
						
						
						
						if(FLDLABLE4!=''){
						 $("#fldlableforth").html(FLDLABLE4);
					     $("#REF4").show();
					    }
					    else{
					    $("#REF4").hide();
					    }
						
						if(FLDLABLE5!=''){
						 $("#fldlablefive").html(FLDLABLE5);
					     $("#REF5").show();
					    }
					    else{
					    $("#REF5").hide();
					    }
					   
					     $('#authenticator1').html(AUTH1);	
                         $('#authenticator2').html(AUTH2);
						 $('#authenticator3').html(AUTH3);
						 $('#authenticator4').html(AUTH4);
						 $('#authenticator5').html(AUTH5);
						 $('#billaccnts').html(ACCOUNT);
						 
	    	            ko.applyBindings(self, $(".dynamic-page-content").get(0)); 
										
	    	        });
		  busyInd.hide();
		}
        else{
        	handleError(invocationResult.faml.response);
			//window.location = "#billpayment";
			 busyInd.hide();
        	}	
        }
        }		
	    busyInd.hide();	
	};
	/*ad hoc end */
	
	/*view/pay biller*/
	  this.rruvp01Page = function(){
	  
	    reqParams = {};
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldTxnId"] = "UVP";
    	reqParams["fldScrnSeqNbr"] = "01";
    	reqParams["fldRequestId"] =RegfldRequestId;
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;

    	busyInd.show();
    	var invocationData = {
    			adapter : "BillListing",
        		procedure : "RRUVP01",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : rruvp01PageSuccess,
    		onFailure : AdapterFail,	    		
    		timeout: timeout
    	});
	   
	};
	
	 rruvp01PageSuccess = function(result){
	 
	    invocationResult = result.invocationResult;
		if(invocationResult.isSuccessful) {
		if(invocationResult.faml.response){	
		if(invocationResult.faml.response.rc.returncode == 0){
			paybills =invocationResult.faml.response.response.biller;
			
			$("#contentData").load("Views/recharge/rruvp01.html", null, function (response, status, xhr) {
								if (status != "error") {}
                self.paybillist.removeAll();								
				$(paybills).each(function(index, obj) {
    	    		// displaytxt = obj.fldFiler2+" - "+obj.fldShortName;
    	    	    // billValue = obj.fldShortName+"#"+obj.fldAuthenticator1+"#"+obj.fldAuthenticator2+"#"+obj.fldBillDate+"#"+obj.fldBillAmount+"#"+obj.fldBillDueDate+"#"+obj.fldBillID+"#"+obj.fldBillerId+"#"+obj.fldBillNumber+"#"+obj.fldBillerAccId+"#"+obj.fldAuthenticator3+"#"+obj.fldBillerType;
					
					if(obj.fldBillAmount == 0){
					 $("#amtfield").show();
					}
					else{
					  $("#amtfield").show();
					}
					  
    	    		self.paybillist.push({bills:obj.fldFiler2,nickname:obj.fldShortName,amt:obj.fldBillAmount,amount:"₹ "+obj.fldBillAmount,ref1:obj.fldAuthenticator1,ref2:obj.fldAuthenticator2,ref3:obj.fldAuthenticator3,duedate:obj.fldBillDueDate,billdate:obj.fldBillDate,billtype:obj.fldBillerType,billerid:obj.fldBillerId,aacountid:obj.fldBillerAccId,aacno:obj.fldBillNumber,billid:obj.fldBillID,PartialPay:obj.fldPartialPay});
    	        });
						   ko.applyBindings(self, $(".dynamic-page-content").get(0)); 
												
			});
			}
		else{
			handleError(invocationResult.faml.response);
			window.location = "#billpayment";
		    }
			}
			}
	 busyInd.hide(); 
	};
	
   rruvp01Submit= function(foliodet){
      dta = foliodet.split('###');
      fldShortName=dta[0];
	  fldAuthenticator1=dta[1];
	  fldAuthenticator2=dta[2];
	  fldAuthenticator3=dta[3];
	  fldBillDueDate=dta[4];
      fldBillDate=dta[5];
      fldBillAmount=dta[6];
      agency=dta[7];
      fldBillerType=dta[8];
      fldBillerId=dta[9];
	  fldBillerAccId = dta[10];
	  fldBillID  = dta[11];
	  fldBillNumber =  dta[12];
	  fldPartialPay = dta[13];
       
	    reqParams = {};
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldTxnId"] = "UVP";
    	reqParams["fldScrnSeqNbr"] = "02";
    	reqParams["fldRequestId"] =RegfldRequestId;
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
//fldDeviceId=01&fldAppId=RS&fldRequestId=489479372WTIGRUIHY123040500UC&fldScrnSeqNbr=02&fldLangId=eng&fldTxnId=UVP&fldSessionId=489479372WTIGRUIHY
    	busyInd.show();
    	var invocationData = {
    			adapter : "BillListing",
        		procedure : "RRUVP02",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : rruvp01SubmitSuccess,
    		onFailure : AdapterFail,	    		
    		timeout: timeout
    	});
	   
	   
	   
	};
	rruvp01SubmitSuccess = function(result){
	   
	    invocationResult = result.invocationResult;
		if(invocationResult.isSuccessful) {
		if(invocationResult.faml.response){	
		if(invocationResult.faml.response.rc.returncode == 0){
		paybillaccount=invocationResult.faml.response.acctdtls;
			$("#contentData").load("Views/recharge/rruvp02.html", null, function (response, status, xhr) {
			    // if(fldBillerType=="BILLER"){
				// $('#billamt').attr('readonly', true);
				// }
				// else{
				// $('#billamt').attr('readonly', false);
				// }
				if (status != "error") {}
				self.paybillsaccount.removeAll();												
              $(paybillaccount).each(function(index, obj) {
    	    			displaytxt = obj.codacctno+" - "+obj.nambranch;
    	    			accountValue = obj.codacctno+"#"+obj.namccyshrt+"#"+obj.acctbalance;
    	    		      self.paybillsaccount.push({ codacctno: obj.codacctno, displaytxt:displaytxt, accountValue: accountValue });
						  
    	    });				   $('#biller').html(agency);		
				               $('#shortname').html(fldShortName);
							   $('#ref1').html(fldAuthenticator1);
							   $('#ref2').html(fldAuthenticator2);
							   $('#ref3').html(fldAuthenticator3);
							   $('#billdate').html(fldBillDate);
							  
						 if(fldBillAmount!='' && (fldBillAmount==0 || fldBillAmount<0)&&fldBillerType=="BILLER"){
						                $('#billamt').attr('readonly', true);
										$('#billamt').val('');
										$('#buttonval').val('Pay Bill');
							   }else{
							            $('#billamt').attr('readonly', false);
										$('#billamt').val(fldBillAmount);
									    $('#buttonval').val('Pay Now');
							   }
							   $('#duedate').html(fldBillDueDate);
						   ko.applyBindings(self, $(".dynamic-page-content").get(0)); 
												
			});
			
		}
		else{
			handleError(invocationResult.faml.response);
			window.location = "#billpayment";
		    }
			}
			}
	 busyInd.hide();
	};
	
	this.rruvp02Submit= function(){
	  if($("#rruvp02").valid()){
	  billersname = $('#biller').html();
      nickname = $('#shortname').html();
	  refrence1 = $('#ref1').html();
	  refrence2= $('#ref2').html();
	  refrence3= $('#ref3').html();
	  date= $('#billdate').html();
	  amont = $('#billamt').val();
	  Amounts=formatAmt(amont,2);
	  PAYAMT=$('#amount1').val(amont);
	  payamount=$('#amount1').val();
	  duuedate = $('#duedate').html();
	  accnt = $('#fldFromAcctNo').val().split('#')[0];
	  if(amont==''){
	   	   alert('Please enter valid bill amount.');
	   	   return;
     }
	  if(amont!='' && (amont==0 || amont<0)){
	   	   alert('Please enter valid bill amount.');
	   	   return;
      }
	  rruvp02SubmitSuccess();
	  }
	};
	
	rruvp02SubmitSuccess = function(result){
	//alert('amot '+$('#billamt').val());
			$("#contentData").load("Views/recharge/rruvp03.html", null, function (response, status, xhr) {
								if (status != "error") {}
							   $('#Billers').html(billersname);
							   NICKNAME=$('#shortnames').html(nickname);
							   REFNCE1=$('#refrence1').html(refrence1);
							   REFNCE2=$('#refrence2').html(refrence2);
							   REFNCE3=$('#refrence3').html(refrence3);
							   BIllDATE= $('#billdates').html(date);
							   AMOUNT=$('#billamts').html(Amounts);
							   DUEDATE=$('#duedates').html(duuedate);
							   $('#account').html(accnt);
             
						   ko.applyBindings(self, $(".dynamic-page-content").get(0)); 
												
			});
	 busyInd.hide();
	};
	
	 this.rruvp03Submit= function(){
	    PAYAMOUNTS= payamount;
	    ACCOUNT= $('#account').html();
		REFNCE1=$('#refrence1').html();
		REFNCE2=$('#refrence2').html();
		REFNCE3=$('#refrence3').html();
		AMOUNT=$('#billamts').html();
		//alert(AMOUNT);
		if(fldPartialPay=='Y'||fldBillerType=="BILLER"){
		  PartialPay="RNP";
		}
		else{
		 PartialPay="PNY";
		}
		
	    reqParams = {};
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldTxnId"] = "UVP";
    	reqParams["fldScrnSeqNbr"] = "03";
    	reqParams["fldRequestId"] =RegfldRequestId;
		reqParams["fldCurrency"] = "INR";
		reqParams["fldTxnAmt"] = PAYAMOUNTS;
		reqParams["fldRechargeBillerId"] = fldBillerId;
		reqParams["fldPaymentType"] = PartialPay;
		reqParams["fldFromAcctNo"] = ACCOUNT;
		reqParams["fldBillerAccountID"] = fldBillerAccId;
		reqParams["fldShortName"] = fldShortName;
		if(REFNCE1!='NA'){
				reqParams["fldAuthenticators"] = REFNCE1;
		}else if(REFNCE1!='NA' && REFNCE2!='NA'){
				reqParams["fldAuthenticators"] = REFNCE1+"!"+REFNCE2;
		}else if(REFNCE1!='NA'  && REFNCE2!='NA'  && REFNCE3!='NA'){
				reqParams["fldAuthenticators"] = REFNCE1+"!"+REFNCE2+"!"+REFNCE3;
		}
		
		reqParams["fldBillId"] = fldBillID;
		reqParams["fldBillDueDate"] = fldBillDueDate;
		reqParams["fldBillDate"] = fldBillDate;
		reqParams["fldBillNumber"] = fldBillNumber;
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;

    	busyInd.show();
    	var invocationData = {
    			adapter : "BillListing",
        		procedure : "RRUVP03",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : rruvp03SubmitSuccess,
    		onFailure : AdapterFail,	    		
    		timeout: timeout
    	});
	   
	   
	   
	};
	rruvp03SubmitSuccess = function(result){
	   invocationResult = result.invocationResult;
	   if(invocationResult.isSuccessful) {
	   if(invocationResult.faml.response){	
	   if(invocationResult.faml.response.rc.returncode == 0){
	   refno = invocationResult.faml.response.response.fldTransactionID;
			$("#contentData").load("Views/recharge/rruvp04.html", null, function (response, status, xhr) {
								if (status != "error") {}	
								$('#refno').html(refno);	
              			       $('#biller').html(agency);		
				               $('#shortname').html(fldShortName);
							   $('#ref1').html(fldAuthenticator1);
							   $('#ref2').html(fldAuthenticator2);
							   $('#ref3').html(fldAuthenticator3);
							  // $('#billdate').html(fldBillDate);
							   $('#billamt').html(AMOUNT);
							  // $('#duedate').html(fldBillDueDate);
						   ko.applyBindings(self, $(".dynamic-page-content").get(0)); 
												
			});
			
		}
		else{
			handleError(invocationResult.faml.response);
			window.location = "#billpayment";
			busyInd.hide();
		    }
			}
			}
	   busyInd.hide();
	};
	
	
	
	
	/*view/pay biller end*/
	
	
	//new biller
	
	
	this.addbillSubmit2= function(){
	    
		fldRandomNumber = Math.floor(Math.random() * 100000000000000);
		billerId=$("#billerId").val();
		Bsname=$("#Bsname").val();
		authenticator1=$("#authenticator1").html();
		TIMESTAMP=TimeStamp();
		if(Bsname!=''){
			authenticator=Bsname;
		}else{
			authenticator=authenticator1;
		}
		busyInd.show();
		 var resu = '';
		 param = 'U04009~'+fldRandomNumber+'~HDFCB~'+TIMESTAMP+'~'+Regloginuid+'~'+Regloginuid+'~'+billerId+'~'+authenticator+'~'+authenticator1+'~NA~NA~NA';
		 var invocationData = {
         adapter : "AddBillerNew",
               procedure : "getChkSum",
               parameters : [param,'654123']
          };
          
          WL.Client.invokeProcedure(invocationData, {
           onSuccess : function(res){resu = res.invocationResult.result;console.log("Success -- >"+resu);
		    
		     param = 'U04009~'+fldRandomNumber+'~HDFCB~'+TIMESTAMP+'~'+Regloginuid+'~'+Regloginuid+'~'+billerId+'~'+authenticator+'~'+authenticator1+'~NA~NA~NA~'+resu;
			 
			 
		     var invocationData = {
               adapter : "AddBillerNew",
               procedure : "GetBillerData1",
              // parameters : ['U04009~'+fldRandomNumber+'~HDFCB~'+TIMESTAMP+'~'+Regloginuid+'~'+Regloginuid+'~'+billerId+'~'+authenticator+'~'+authenticator1+'~N~NA~NA~NA~NA~NA~NA~NA~NA~NA~'+resu]
			   parameters : [param]
			  };
			  
			  WL.Client.invokeProcedure(invocationData, {
			   onSuccess : function(res){console.log("Success -- >"+JSON.stringify(res) +">>>>>>>>>>>>>>>"+ res.invocationResult.text)
			   
			 
			        succesmsg=res.invocationResult.text;
			   
			        SUCCESMSG=succesmsg.split('~');
					errormsgcode=succesmsg.split('~')[0]
					
					
					
			    $("#contentData").load("Views/recharge/addbill3.html", null, function (response, status, xhr) {
							if (status != "error") {}
							
							if(errormsgcode=='INV_MSG_081'){
							   $("#fail").show();
							   $("#failmsg").html('Invalid message - Invalid BillerId');
							}
							else if(errormsgcode=='INV_MSG_091'){
								$("#fail").show();
							   $("#failmsg").html('Invalid ShortName - Please try again with a valid Short Name');
							}
							else if(errormsgcode=='ERRBV0001'){
								$("#fail").show();
							   $("#failmsg").html('Invalid Authenticator1');
							}
							else if(errormsgcode=='ERRBV0002'){
								$("#fail").show();
							   $("#failmsg").html('Invalid Authenticator2');
							}
							else if(errormsgcode=='ERRBV0003'){
								$("#fail").show();
							   $("#failmsg").html('Invalid Authenticator3');
							}
							else if(errormsgcode=='ERRBV0004'){
								$("#fail").show();
							   $("#failmsg").html('Invalid Authenticator4');
							}
							else if(errormsgcode=='ERRBV0005'){
								$("#fail").show();
							   $("#failmsg").html('Invalid Authenticator5');
							}
							else if(errormsgcode=='ERRBV0006'){
								$("#fail").show();
							   $("#failmsg").html('Please enter a valid Bill Number');
							}
							else if(errormsgcode=='ERRBV0007'){
								$("#fail").show();
							   $("#failmsg").html('Please enter a valid billduedate in yyyymmdd format');
							}
							else if(errormsgcode=='ERR_UBP_DUP_BILLER'){
								$("#fail").show();
							   $("#failmsg").html('Please note that biller account already exists for this user');
							}
							else if(errormsgcode=='INV_MSG_063'){
								$("#fail").show();
							   $("#failmsg").html('Sorry! We are unable to complete your registration request at this time basis only Mobile number provided by you. Please select your mobile operator circle and input any other required details to complete the registration for this biller.');
							}
							else if(errormsgcode=='INV_MSG_106'){
								$("#fail").show();
							   $("#failmsg").html('Sorry! We are unable to complete your registration request at this time basis only Mobile number provided by you. Please select your mobile operator circle and input any other required details to complete the registration for this biller.');
							}
							else if(errormsgcode=='INV_MSG_088'){
								$("#fail").show();
							   $("#failmsg").html('Invalid Biller ID, this circle is not present in EBPP system');
							}
							else if(errormsgcode=='INV_MSG_131'){
								$("#fail").show();
							   $("#failmsg").html('The operator is not responding, please try again');
							}
							else if(errormsgcode=='VELERR001'){
								$("#fail").show();
							   $("#failmsg").html('Exceeded per day limit.(Refer FAQ)');
							}
							else if(errormsgcode=='VELERR003'){
								$("#fail").show();
							   $("#failmsg").html('Exceeded monthly limit.(Refer FAQ)');
							}
							else if(errormsgcode=='VPBM005'){
								$("#fail").show();
							   $("#failmsg").html('Denied By Risk');
							}
							
							if(SUCCESMSG.length== 2){
								 $("#success").hide();
								 $("#fail").show();
								 $("#failmsg").html(succesmsg.split('~')[1]);
							 }
                             else{
								
							    if(succesmsg.split('~')[6]!="N" && succesmsg.split('~')[6]!="undefined" && succesmsg.split('~')[6]!=undefined){
								 $("#Mobileno").html(succesmsg.split('~')[10])
								 $("#success").show();
								 $("#fail").hide();
								 }
								 else{
								 $("#Mobileno").html(succesmsg.split('~')[10])
								 $("#success").hide();
								 $("#fail").show();
								 $("#failmsg").html(succesmsg.split('~')[8]);
								 }
                             }								 
                                
							ko.applyBindings(self, $(".dynamic-page-content").get(0));
						
		                         								
							
							
					});
			     busyInd.hide();
			   
			   },
			   onFailure : function(res){console.log("failure-- >"+JSON.stringify(res))},       
			   timeout: 30000
			  });
		   
		   },
           onFailure : function(res){console.log("failure-- >"+JSON.stringify(res))},       
           timeout: 30000
          });
	   
	   
	   
	};
	
	
	this.addbillSubmit1= function(){
      if($("#fromuab02").valid()){
		  busyInd.show();
	    company= $("#company1").val();
		Bsname=$("#Bsname").val(); 
	    authenticator1= $("#authenticator1").val();
	    billerId=$("#billerId").val();
		// if(Bsname.match(' ')){
			// alert("space not allowed in Biller Short Name");
			
			// return;
		// }	
		
		console.log(authenticator1+">>>>>>>>>>>>>>>"+Bsname);
		$("#contentData").load("Views/recharge/addbiller2.html", null, function (response, status, xhr) {
							if (status != "error") {}
							    if(Bsname=='' || Bsname.match(' ')){
									$("#Bname").hide();
									$("#Bsname").val('');
								}
								else{
									$("#Bname").show();
									$("#Bsname").val(Bsname);
								}	
								
								$("#Billershotname").html(Bsname);
							    $("#billerId").val(billerId);
						        $("#custid").val(Regloginuid);
								
								$("#authenticator1").html(authenticator1);
								$("#fldbillername").html(company);
                                	
							ko.applyBindings(self, $(".dynamic-page-content").get(0));
						
		                         								
							
							
					});
					  busyInd.hide();
					
	 }
	};
	
	
	
    
};