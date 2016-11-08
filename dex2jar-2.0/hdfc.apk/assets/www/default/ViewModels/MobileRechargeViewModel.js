var MobileRechargeViewModel=function(){
	
	 var self = this;
	self.mobileBillerList= ko.observableArray([]);
	self.preplist= ko.observable();
	self.dthBillerList= ko.observableArray([]);
	self.dthlist=ko.observable();
	self.dthdetails= ko.observableArray([]);
	self.mobdetails= ko.observableArray([]);
	self.mobbakdetails=ko.observableArray([]);
	self.mobanklist=ko.observable();
	self.dthbakdetails=ko.observableArray([]);
	billeraccid=ko.observable();

	this.callrrdth01=function(){
		
		
	
		busyInd.show();
		
		reqParams = {};
		reqParams["fldAppId"] = "RS";
		reqParams["fldTxnId"] = "BDP";
		reqParams["fldRequestId"] =RegfldRequestId;
		reqParams["fldDeviceId"] = fldDeviceId;
		reqParams["fldLoginUserId"] =Regloginuid;
		reqParams["fldScrnSeqNbr"] = "01";
		
		
		fldjsessionid = Regfldjsessionid;
		
		reqParams["fldSessionId"] = Rsessionid;
	//	fldAppId=RS&fldTxnId=BDP&fldScrnSeqNbr=01&fldSessionId=1632033188IBDMJQYA&fldRequestId=1632033188IBDMJQYA113724362XF
		var invocationData = {
				adapter : "BillListing",
	    		procedure : "RRDTH01",
	    		parameters : [fldjsessionid,reqParams,ipadd]
		};
		
		WL.Client.invokeProcedure(invocationData, {
			onSuccess : rrdth01pagesuccess,
			onFailure : AdapterFail,	    		
			timeout: timeout
		});
		
		

	};
	
	rrdth01pagesuccess=function(result){
		invocationResult = result.invocationResult;
		if(invocationResult.isSuccessful) {
			if(invocationResult.faml.response){	
				if(invocationResult.faml.response.rc.returncode == 0){
					
					self.dthdetails.removeAll();
                    if(invocationResult.faml.response.response){
                        dthbill1=invocationResult.faml.response.response.biller;
                        dthcat=invocationResult.faml.response.response.biller.fldBillerCategory;
                        
                        
                        $(dthbill1).each(function(index, obj) {
                                         self.dthdetails.push({dthnum:obj.fldAuthenticator1,dthname:obj.fldBillerId,accounid:obj.fldBilleraccountid});
                                         });
                        
                        
                        $("#contentData").load("Views/recharge/rrdth01.html", null, function (response, status, xhr) {
                                               if (status != "error") {}
                                               ko.applyBindings(self, $(".dynamic-page-content").get(0));	  
                                               //  var model = new loginViewModel();
                                               
                                               });
                    }else {
                        $("#contentData").load("Views/recharge/rrdth01.html", null, function (response, status, xhr) {
                                               if (status != "error") {}
                                               ko.applyBindings(self, $(".dynamic-page-content").get(0));
                                               //  var model = new loginViewModel();
                                               $('#sm').html("There are no billers registered - Click here to register");
                                               
                                               });
                    }
					
					
					 
				}
                else if(invocationResult.faml.response.rc.returncode == 1 && (invocationResult.faml.response.rc.errorcode == 31019 || invocationResult.faml.response.rc.errorcode == 31047)) {
						$("#contentData").load("Views/recharge/rrdth01.html", null, function (response, status, xhr) {
				        	 if (status != "error") {}
				        	 ko.applyBindings(self, $(".dynamic-page-content").get(0));	  
				        	 //  var model = new loginViewModel();
				        	 $('#sm').html(invocationResult.faml.response.rc.errormessage);
				        	
				        });	
				}
				else{
							busyInd.hide();
							errormessagedth1=invocationResult.faml.response.rc.errormessage;
							navigator.notification.alert(errormessagedth1);
							window.location="#billpayment";
				}
				
				
			}
			
			else{
                   busyInd.hide();
				   handleErrorNoResponse();
			   }
			   	
		}
		busyInd.hide();		
			
		
	};	
	

	/*	var invocationData = {
    			adapter : "BillListing",
        		procedure : "getStories",
        		parameters : []
    	};
    	
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : rrdth01PageSuccess,
    		onFailure : AdapterFail,	    		
    		timeout: timeout
    	});
	};
	
	
	rrdth01PageSuccess=function(result){
		$("#contentData").load("Views/recharge/rrdth01.html", null, function (response, status, xhr) {
       	 if (status != "error") {}
       	  
       	 //  var model = new loginViewModel();
       });
	};
	AdapterFail=function(result){
			alert(result);
}*/
	this.callrrdth02=function(){
		
		
		busyInd.show();
		
		reqParams = {};
		reqParams["fldAppId"] = "RS";
		reqParams["fldTxnId"] = "BDP";
		reqParams["fldRequestId"] =RegfldRequestId;
		reqParams["fldDeviceId"] = fldDeviceId;
		reqParams["fldScrnSeqNbr"] = "02";
		reqParams["fldLoginUserId"] =Regloginuid;
		
		fldjsessionid = Regfldjsessionid;
		
		reqParams["fldSessionId"] = Rsessionid;
	//	fldAppId=RS&fldTxnId=BDP&fldScrnSeqNbr=01&fldSessionId=1632033188IBDMJQYA&fldRequestId=1632033188IBDMJQYA113724362XF
		var invocationData = {
				adapter : "BillListing",
	    		procedure : "RRDTH02",
	    		parameters : [fldjsessionid,reqParams,ipadd]
		};
		
		WL.Client.invokeProcedure(invocationData, {
			onSuccess : rrdth02pagesuccess,
			onFailure : AdapterFail,	    		
			timeout: timeout
		});
		
	};	
		rrdth02pagesuccess=function(result){
			invocationResult = result.invocationResult;
		
		if(invocationResult.isSuccessful) {
			if(invocationResult.faml.response){	
				if(invocationResult.faml.response.rc.returncode == 0){
					
					self.dthbakdetails.removeAll();

					
					dthaccmob=invocationResult.faml.response.acctdtls ;
					
					
					$(dthaccmob).each(function(index, obj) {
						self.dthbakdetails.push({dthacctno:obj.codacctno+obj.nambranch,dthbankval:obj.codacctno});
					});
			

			
		dthoper1=$("#dth_name").val();
		dthnum1=$("#dth_num").val();

        subcriber1=$("#dth_num").val();
        Billeraccounid = 	$("#Billeraccounid").val();
		 $("#contentData").load("Views/recharge/rrdth02.html", null, function (response, status, xhr) {
    	 if (status != "error") {}
    	 
      	 $("#dthoper1").html(dthoper1);
    	 $("#dthnum1").html(dthnum1);
    	$("#subcriber1").val(subcriber1);
		$("#Billeraccounid").val(Billeraccounid);
		
    	 ko.applyBindings(self, $(".dynamic-page-content").get(0));
    	 //  var model = new loginViewModel();
    });
						}else{
							
							busyInd.hide();
							errormessagedth1=invocationResult.faml.response.rc.errormessage;
							navigator.notification.alert(errormessagedth1);
							window.location="#billpayment";
						
						}
					}
			else{
				   busyInd.hide();
				   handleErrorNoResponse();
			   }
			   	
							}
						 	busyInd.hide();		
				
				
			
		};
		
		
	this.callrrpmb01=function(){
		busyInd.show();
		
		reqParams = {};
		reqParams["fldAppId"] = "RS";
		reqParams["fldTxnId"] = "BMP";
		reqParams["fldRequestId"] =RegfldRequestId;
		reqParams["fldDeviceId"] = fldDeviceId;
		reqParams["fldScrnSeqNbr"] = "01";
		reqParams["fldLoginUserId"] =Regloginuid;
		
		fldjsessionid = Regfldjsessionid;
		
		reqParams["fldSessionId"] = Rsessionid;
	//	fldAppId=RS&fldTxnId=BDP&fldScrnSeqNbr=01&fldSessionId=1632033188IBDMJQYA&fldRequestId=1632033188IBDMJQYA113724362XF
		var invocationData = {
				adapter : "BillListing",
	    		procedure : "RRPMB01",
	    		parameters : [fldjsessionid,reqParams,ipadd]
		};
		
		WL.Client.invokeProcedure(invocationData, {
			onSuccess : rrpmb01pagesuccess,
			onFailure : AdapterFail,	    		
			timeout: timeout
		});
		
		

	};
		
		
	
	rrpmb01pagesuccess=function(result){
		invocationResult = result.invocationResult;
		if(invocationResult.isSuccessful) {
			if(invocationResult.faml.response){	
				if(invocationResult.faml.response.rc.returncode == 0){
					
					self.mobdetails.removeAll();
                    if(invocationResult.faml.response.response){
                        mobbill1=invocationResult.faml.response.response.biller;
                        mobcat=invocationResult.faml.response.response.biller.fldBillerCategory;
					
                        
                        
                        $(mobbill1).each(function(index, obj){
						     billeraccid(obj.fldBilleraccountid);
							// alert(billeraccid());
                              self.mobdetails.push({mobnumber:obj.fldAuthenticator1,mobname:obj.fldBillerId,mobshortname:obj.fldBillershortname,accounid:obj.fldBilleraccountid});
                        });
                        
                        
                        $("#contentData").load("Views/recharge/rrpmb01.html", null, function (response, status, xhr) {
                                               if (status != "error") {}
                                               ko.applyBindings(self, $(".dynamic-page-content").get(0));	  
                                               //  var model = new loginViewModel();
                                               
                                               
                                               });
                    }
                    else {
                        $("#contentData").load("Views/recharge/rrpmb01.html", null, function (response, status, xhr) {
                                               if (status != "error") {}
                                               ko.applyBindings(self, $(".dynamic-page-content").get(0));
                                               //  var model = new loginViewModel();
                                               $('#sm').html("There are no billers registered - Click here to register");
                                               
                                               });
                    }
						
					
					 
				}else if(invocationResult.faml.response.rc.returncode == 1 && (invocationResult.faml.response.rc.errorcode == 31019 || invocationResult.faml.response.rc.errorcode == 31047)) {
						$("#contentData").load("Views/recharge/rrpmb01.html", null, function (response, status, xhr) {
				        	 if (status != "error") {}
				        	 ko.applyBindings(self, $(".dynamic-page-content").get(0));	  
				        	 //  var model = new loginViewModel();
				        	 $('#sm').html(invocationResult.faml.response.rc.errormessage);
				        	
				        });	
				}
				else{
							busyInd.hide();
							errormessagedth1=invocationResult.faml.response.rc.errormessage;
							navigator.notification.alert(errormessagedth1);
							window.location="#billpayment";
				}
				
				
			}else{
				   busyInd.hide();
				   handleErrorNoResponse();
			   }
			   	
		}
		busyInd.hide();		
			
	
	};	
		/* $("#contentData").load("Views/recharge/rrpmb01.html", null, function (response, status, xhr) {
       	 if (status != "error") {}
       	 
       	 //  var model = new loginViewModel();
       });
	};*/
	
	
	
	
	this.callrrpmb02=function(){
		
		busyInd.show();
		reqParams = {};
		reqParams["fldAppId"] = "RS";
		reqParams["fldTxnId"] = "BMP";
		reqParams["fldDeviceId"] = fldDeviceId;
		reqParams["fldRequestId"] =RegfldRequestId;
		reqParams["fldScrnSeqNbr"] = "02";
		reqParams["fldLoginUserId"] =Regloginuid;
		
		fldjsessionid = Regfldjsessionid;
		
		reqParams["fldSessionId"] = Rsessionid;
	//	fldAppId=RS&fldTxnId=BDP&fldScrnSeqNbr=01&fldSessionId=1632033188IBDMJQYA&fldRequestId=1632033188IBDMJQYA113724362XF
		var invocationData = {
				adapter : "BillListing",
	    		procedure : "RRPMB02",
	    		parameters : [fldjsessionid,reqParams,ipadd]
		};
		
		WL.Client.invokeProcedure(invocationData, {
			onSuccess : rrpmb02pagesuccess,
			onFailure : AdapterFail,	    		
			timeout: timeout
		});
		
	};
	
	
	CallingRRpmb02Fn = function(foliodet,whichPage){
	busyInd.hide();
	dta = foliodet.split('###');
	
		//href="#rrpmb02"   onclick="CallingRRpmb02Fn(mobname,mobnumber,mobshortname)"
		if(whichPage==''){
				$('#mob_name').val(dta[0]);
				$('#mob_num').val(dta[1]);
				$('#mob_shrName').val(dta[2]);
		//	alert(foliodet);
		$('#Billeraccounid').val(dta[3]);
			window.location.href = "#rrpmb02";
		}else{
		
			$('#dth_name').val(dta[0]);
				$('#dth_num').val(dta[1]);
				$('#dth_subs').val(dta[2]);
				$('#Billeraccounid').val(dta[3]);
		   window.location.href = "#rrdth02";
		}
		
		
			
	}
	rrpmb02pagesuccess=function(result){
		invocationResult = result.invocationResult;
		if(invocationResult.isSuccessful) {
			if(invocationResult.faml.response){	
				if(invocationResult.faml.response.rc.returncode == 0){
					
					self.mobbakdetails.removeAll();	
					
					bankaccmob=invocationResult.faml.response.acctdtls ;
					
					
					$(bankaccmob).each(function(index, obj) {
						self.mobbakdetails.push({mobacctno:obj.codacctno+obj.nambranch,mobbankval:obj.codacctno});
					});
		
		mobname1=$("#mob_name").val();
		mobnumber1=$("#mob_num").val();
		mobshortname1=$("#mob_shrName").val();
        authenti1 =$("#mob_num").val();
		Billeraccounid =$("#Billeraccounid").val(); 
       // alert(authenti1);
		//alert(mobshortname1);
		//alert(mobnumber);
		 $("#contentData").load("Views/recharge/rrpmb02.html", null, function (response, status, xhr) {
      	 if (status != "error") {}
      	 
      	$("#mobname1").html(mobname1);
      	 $("#mobnumber1").html(mobnumber1);
      	$("#mobshortname1").val(mobshortname1);
      	 $("#authenticate1").val(authenti1);
		 $("#Billeraccounid").val(Billeraccounid);
      	 ko.applyBindings(self, $(".dynamic-page-content").get(0));
      	 //  var model = new loginViewModel();
      });
		 
	}else{
		busyInd.hide();
		errormessagedth1=invocationResult.faml.response.rc.errormessage;
		navigator.notification.alert(errormessagedth1);
		window.location="#billpayment";
		}
			}else{
				   busyInd.hide();
				   handleErrorNoResponse();
			      }
			   	
		      }
		busyInd.hide();		
	
	};
	rrpmb02submit =function(){
		if($("#rrpmb02").valid()){
			
			moboper2=$("#mobname1").html();
			mobnumber2=$("#mobnumber1").html();
			rchamt1=$("#rchamt").val();
			mobbak1=$("#mobbak").val();
			mobshortname2=$("#mobshortname1").val();
			authenticate1 =$("#authenticate1").val();
			window.location="#rrpmb03";
			//alert(authenticate1+"   3");
		 $("#contentData").load("Views/recharge/rrpmb03.html", null, function (response, status, xhr) {
     	 if (status != "error") {}
     	 $("#authenticate1").val(authenticate1);
     	$("#moboper2").html(moboper2);
     	 $("#mobnumber2").html(mobnumber2);
     	 $("#rchamt1").html(rchamt1);
     	$("#rchamt2").html(formatAmt(rchamt1,2));
     	 $("#mobbak1").html(mobbak1);
     	$("#mobshortname2").val(mobshortname2);
     	 
     	 ko.applyBindings(self, $(".dynamic-page-content").get(0));
     	 //  var model = new loginViewModel();
     });
		 
	}
		
	};
	self.Deletbiller = function(){
			moboper2=$("#mobname1").html();
			mobnumber2=$("#mobnumber1").html();
			//rchamt1=$("#rchamt").val();
			//mobbak1=$("#mobbak").val();
			mobshortname2=$("#mobshortname1").val();
			authenticate1 =$("#authenticate1").val();
			Billeraccounid =$("#Billeraccounid").val();
			window.location="#rruvb03";
			//alert(authenticate1+"   3");
			$(".h_title").html("Delete Biller");
		 $("#contentData").load("Views/recharge/rruvb03.html", null, function (response, status, xhr) {
				if (status != "error") {}
				$("#authenticate1").val(authenticate1);
				$("#moboper2").html(moboper2);
				 $("#mobnumber2").html(mobnumber2);
				 $("#Billeraccounid").val(Billeraccounid);
				 
				// $("#rchamt1").html(rchamt1);
				// $("#mobbak1").html(mobbak1);
				//$("#mobshortname2").val(mobshortname2);
     	 
     	 ko.applyBindings(self, $(".dynamic-page-content").get(0));
     	 //  var model = new loginViewModel();
     });
	}
	self.DeletDTHbiller = function(){
			
			SubsCriberNumber=$("#dthnum1").html();
			Billeraccounid =$("#Billeraccounid").val();
			DTHOperater =$("#dthoper1").html();
			window.location="#rruvb03";
			//alert(authenticate1+"   3");
		 $("#contentData").load("Views/recharge/rrdthuvb03.html", null, function (response, status, xhr) {
				if (status != "error") {}
				 $(".h_title").html("Delete DTH Recharge Biller");
				 $("#dthoper2").html(DTHOperater);
				 $("#dthnum2").html(SubsCriberNumber);
				 $("#Billeraccounid").val(Billeraccounid);
				 
				// $("#rchamt1").html(rchamt1);
				// $("#mobbak1").html(mobbak1);
				//$("#mobshortname2").val(mobshortname2);
     	 
     	 ko.applyBindings(self, $(".dynamic-page-content").get(0));
     	 //  var model = new loginViewModel();
     });
	}

	rruvb03submit = function(){
	    reqParams = {};
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldTxnId"] = "UVB";
    	reqParams["fldScrnSeqNbr"] = "03";
		reqParams["fldBillerAccountId"] =$('#Billeraccounid').val();
    	reqParams["fldRequestId"] =RegfldRequestId;
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
//fldDeviceId=01&fldBillerAccountId=XXXXXXX&fldLangId=eng&fldTxnId=UVB&fldRequestId=1229489154DMVQSVHN142745298NM&fldSessionId=1229489154DMVQSVHN&fldAppId=RS&fldScrnSeqNbr=03
    	busyInd.show();
    	var invocationData = {
    			adapter : "BillListing",
        		procedure : "RRUVB03",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : rruvb03Success,
    		onFailure : AdapterFail,	    		
    		timeout: timeout
    	});
	}
	rrdthuvb03submit = function(){
		reqParams = {};
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldTxnId"] = "UVB";
    	reqParams["fldScrnSeqNbr"] = "03";
		reqParams["fldBillerAccountId"] =$('#Billeraccounid').val();
    	reqParams["fldRequestId"] =RegfldRequestId;
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;

    	busyInd.show();
    	var invocationData = {
    			adapter : "BillListing",
        		procedure : "RRUVB03",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : rruvbdth03Success,
    		onFailure : AdapterFail,	    		
    		timeout: timeout
    	});
	}
	rrpmb03submit =function(){
		busyInd.show();
		rchamt1=$("#rchamt1").html();
		moboper3=$("#moboper2").html();
		mobnumber3=$("#mobnumber2").html();
		mobbak2=$("#mobbak1").html();
		mobshortname3=$("#mobshortname2").val();
		authenticate1 =$("#authenticate1").val();
		//alert(authenticate1);
       // return;
		reqParams = {};
		
		reqParams["fldTxnAmt"] = rchamt1;
		
		reqParams["fldCurrency"] = "INR";
		reqParams["fldAppId"] = "RS";
		
		reqParams["fldAuthenticators"]= authenticate1;
		reqParams["fldRechargeBillerShortName"]="NA";
	
		reqParams["fldTxnId"] = "BMP";
		
		reqParams["fldRechargeBillerId"]=moboper3;
		reqParams["fldLoginUserId"] =Regloginuid;
		reqParams["fldRequestId"] =RegfldRequestId;
		reqParams["fldScrnSeqNbr"] = "03";
		reqParams["fldDeviceId"] = fldDeviceId;
		reqParams["fldFromAcctNo"]=mobbak2;
		
		fldjsessionid = Rsessionid;
		
		reqParams["fldSessionId"] = Rsessionid;
		
		var invocationData = {
				adapter : "BillListing",
	    		procedure : "RRPMB03",
	    		parameters : [fldjsessionid,reqParams,ipadd]
		};
		
		WL.Client.invokeProcedure(invocationData, {
			onSuccess : rrpmb04PageSuccess,
			onFailure : AdapterFail,	    		
			timeout: timeout
		});
	};
	 rrpmb04PageSuccess=function(result){
			invocationResult = result.invocationResult;
			if(invocationResult.isSuccessful) {
				if(invocationResult.faml.response){

                if(invocationResult.faml.response.rc.returncode == 0){

					if(invocationResult.faml.response.response.fldTxnRefNo){
//return code not available
										rchtranc=invocationResult.faml.response.response.fldTransactionID;
										rechargeamtmob=invocationResult.faml.response.response.fldTxnAmt;
										
										//Give the label values of last screen here
				
										
		window.location="#rrpmb04";
		
		rchamt2=$("#rchamt2").html();
		moboper4=$("#moboper2").html();
		mobnumber4=$("#mobnumber2").html();
		//mobbak2=$("#mobbak1").html();
		
		 $("#contentData").load("Views/recharge/rrpmb04.html", null, function (response, status, xhr) {
    	 if (status != "error") {}
    	// alert(billerlist.moboper4);
		
		
    	 $("#moboper5").html(moboper4);
    	 $("#moboper4").html(invocationResult.faml.request.fldRechargeBillerId);
     	 $("#mobnumber4").html(invocationResult.faml.request.fldAuthenticators);
     	 $("#rchamt2").html(formatAmt(rchamt2,2));
     	 $("#rchrefid").html(rchtranc);
		 $("#rechargeamtmob").html(rechargeamtmob);
     	// $("#mobbak1").html(mobbak1);
    	ko.applyBindings(self, $(".dynamic-page-content").get(0));
    	 //  var model = new loginViewModel();
    });
		 
	}}else{
                        busyInd.hide();
						errormessagerch=invocationResult.faml.response.rc.errormessage;
						navigator.notification.alert(errormessagerch);
						window.location="#billpayment";
					}
				}else{
                        busyInd.hide();
					   handleErrorNoResponse();
				   }
				   	
			}
			busyInd.hide();		

			
			
	 };
	
	rrdth02submit =function(){
	
		
		if($("#rrdth02").valid()){
			
			
			dthoper2=$("#dthoper1").html();
			dthnum2=$("#dthnum1").html();
			rchdth1=$("#rchdth").val();
			dthbak1=$("#dthbak").val();
			//alert(rchdth1);
			subcriber1=$("#subcriber1").val();
			window.location="#rrdth03";
			
		 $("#contentData").load("Views/recharge/rrdth03.html", null, function (response, status, xhr) {
	      	 if (status != "error") {}
	      	 
	      	 
	      	 $("#dthoper2").html(dthoper2);
	    	 $("#dthnum2").html(dthnum2);
	    	 $("#rchdth1").html(rchdth1);
	    	 $("#rchdth2").html(formatAmt(rchdth1,2));
	    	 $("#dthbak1").html(dthbak1);
	    	 $("#subcriber1").val(subcriber1);
	      	 //  var model = new loginViewModel();
	      	 ko.applyBindings(self, $(".dynamic-page-content").get(0));	
	      });
		}	
			
			
		};
		
		

			rrdth03submit =function(){
				
				busyInd.show();
				
		
				subcriber1=$("#subcriber1").val();
			dthoper3 = $("#dthoper2").html();
			dthnum3 =$("#dthnum2").html();
			rchdth2=$("#rchdth1").html();
			dthbak2=$("#dthbak1").html();
			
			reqParams = {};
			
			reqParams["fldTxnAmt"] = rchdth1;
			
			reqParams["fldCurrency"] = "INR";
			reqParams["fldAppId"] = "RS";
			
			reqParams["fldAuthenticators"]= subcriber1;
			reqParams["fldFromAcctNo"]=dthbak2.trim();
			
			reqParams["fldTxnId"] = "BDP";
			
			reqParams["fldRechargeBillerId"]=dthoper3;
            reqParams["fldRechargeBillerShortName"]="NA";
			reqParams["fldDeviceId"] = fldDeviceId;
			reqParams["fldRequestId"] =RegfldRequestId;
			reqParams["fldScrnSeqNbr"] = "03";
			
			
			fldjsessionid = Regfldjsessionid;
			reqParams["fldLoginUserId"] =Regloginuid;
			reqParams["fldSessionId"] = Rsessionid;
			
			var invocationData = {
					adapter : "BillListing",
		    		procedure : "RRDTH03",
		    		parameters : [fldjsessionid,reqParams,ipadd]
			};
			
			WL.Client.invokeProcedure(invocationData, {
				onSuccess : rrdth04PageSuccess,
				onFailure : AdapterFail,	    		
				timeout: timeout
			});
		};
		
		
		rrdth04PageSuccess=function(result){
			invocationResult = result.invocationResult;
			if(invocationResult.isSuccessful) {
				if(invocationResult.faml.response){

                    if(invocationResult.faml.response.rc.returncode == 0){

					if(invocationResult.faml.response.response.fldTxnRefNo){
						//not gettin any return code
						rchtrandth=invocationResult.faml.response.response.fldTransactionID;
						rchrefiddth=invocationResult.faml.response.response.fldTxnRefNo;
						rechargeamtdth=invocationResult.faml.response.response.fldTxnAmt;
						
						dthoper4=$("#dthoper2").html();
						dthnum4=$("#dthnum2").html();
						rchdth3=$("#rchdth2").html();
						window.location="#rrdth04";
				 $("#contentData").load("Views/recharge/rrdth04.html", null, function (response, status, xhr) {
			      	 if (status != "error") {}
			      
			      	
			      	 $("#dthoper5").html(dthoper4);
			      	 $("#dthoper4").html(dthoper4);
			      	 $("#dthnum4").html(dthnum4);
			      	 $("#rchdth3").html(rchdth3);
					 $("#rechargeamtdth").html(formatAmt(rechargeamtdth,2));
			      	 $("#rchrefiddth").html(rchtrandth);
			      	
			      	 //  var model = new loginViewModel();
			      });
					 
				}}else{
					busyInd.hide();
					errormessagedth1=invocationResult.faml.response.rc.errormessage;
					navigator.notification.alert(errormessagedth1);
					window.location="#billpayment";
				
				}				
			}else{
				  busyInd.hide();
				   handleErrorNoResponse();
			   }
			   	
			}
			busyInd.hide();		
		
	};
		
	
		this.callrdthr01 =function(){
			
			busyInd.show();
			
				 
			
			
			
			self.dthBillerList.removeAll();
			var invocationData = {
					adapter : "BillListing",
		    		procedure : "GetBiller",
		    		parameters : []
			};
			
			WL.Client.invokeProcedure(invocationData, {
				onSuccess : function BillerSucces(response){
						//	console.log(response);
							invocationResult = response.invocationResult;
						//	console.log("Biller list  "+invocationResult.result);
							//return;
							billerlist = invocationResult.result;
							$(billerlist).each(function(index, obj) {
				
							if(obj.SubCategory=="PREPAID DTH"){
							//	console.log(obj.BillerID);
								//mobvalue:obj.BillerID;
								//displaytxt:obj.BillerName;
								self.dthBillerList.push({text:obj.BillerName,value:obj.BillerID,selected:false});
							}
						   // self.fromAccountList.push({ codacctno: obj.codacctno, displaytxt:displaytxt, accountValue: accountValue });
						});
					busyInd.hide();	
				},
				onFailure : AdapterFail,	    		
				timeout: timeout
			});
			
			
			
			 $("#contentData").load("Views/recharge/rdthr01.html", null, function (response, status, xhr) {
		      	 if (status != "error") {}
		      	ko.applyBindings(self, $(".dynamic-page-content").get(0));	
		      	 //  var model = new loginViewModel();
		      });
				 
				 
				busyInd.hide();			
		};		
		
		rdthr01submit =function(){
			
			if($("#rdthr01").valid()){
				Dlist=$("#Dlist").val();
				Dlisttxt=$("#Dlist  option:selected").text();
				
				//alert(Dlist);
				dthsub=$("#dthsub").val();
				dthmob=$("#dthmob").val();
				
				window.location="#rdthr02";
				
				
				 $("#contentData").load("Views/recharge/rdthr02.html", null, function (response, status, xhr) {
			      	 if (status != "error") {}
			      	 $("#Dlisttxt1").html(Dlisttxt);
			      	 $("#Dlist1").val(Dlist);
			      	 $("#dthsub1").html(dthsub);
			      	 $("#dthmob1").html(dthmob);
			      	ko.applyBindings(self, $(".dynamic-page-content").get(0));	
			      	 //  var model = new loginViewModel();
			      });
					 
				}	
			
			
		};
		
		
	
	
	rdthr02submit =function(){
		

		


		busyInd.show();
		
		Dlist2=$("#Dlist1").val();
		dthsub2=$("#dthsub1").html();
		//alert(Dlist2);
		reqParams = {};
		
		reqParams["fldAppId"] = "RS";
		
		
		
		reqParams["fldShortName"] = "NA";
		
		reqParams["fldBillerId"] =Dlist2;
		reqParams["fldShortName"]= "NA";
		
		
		reqParams["fldTxnId"] = "DTH";
		
		reqParams["fldAuthenticators"]= dthsub2;
		reqParams["fldDeviceId"] = fldDeviceId;
		reqParams["fldLoginUserId"] =Regloginuid;
		reqParams["fldRequestId"] =RegfldRequestId;
		reqParams["fldScrnSeqNbr"] = "01";
		
		
		fldjsessionid = Regfldjsessionid;
		
		reqParams["fldSessionId"] = Rsessionid;
		
		var invocationData = {
				adapter : "BillListing",
	    		procedure : "RDTHR02",
	    		parameters : [fldjsessionid,reqParams,ipadd]
		};
		
		WL.Client.invokeProcedure(invocationData, {
			onSuccess : rdthr03PageSuccess,
			onFailure : AdapterFail,	    		
			timeout: timeout
		});
	
	};	
			rdthr03PageSuccess=function(result){
					invocationResult = result.invocationResult;
					if(invocationResult.isSuccessful) {
						if(invocationResult.faml.response){	
							if(invocationResult.faml.response.rc.returncode == 0){

								dthbiller=invocationResult.faml.response.response.fldBillerAccountId;
								
						    Dlisttxt2=$("#Dlisttxt1").html();
							dthsub2=$("#dthsub1").html();
							dthmob2=$("#dthmob1").html();
							
							window.location="#rdthr03";
							
		 $("#contentData").load("Views/recharge/rdthr03.html", null, function (response, status, xhr) {
	      	 if (status != "error") {}
	      	 
	      	 
	      	 $("#Dlisttxt3").html(Dlisttxt2);
	     	$("#Dlisttxt2").html(dthsub2);
			$("#dthOperator").html(Dlisttxt2);
	      	$("#dthsub2").html(dthsub2);
	      	$("#dthmob2").html(dthmob2);
	      	$("#dthbiller").html(dthbiller);

	      	ko.applyBindings(self, $(".dynamic-page-content").get(0));	
	      	 //  var model = new loginViewModel();
	      	
	      	
	      
	      });
			 
						
						}else{
							busyInd.hide();
							errormessagedth=invocationResult.faml.response.rc.errormessage;
							navigator.notification.alert(errormessagedth);
							window.location="#billpayment";
						}
					
						
						}else{
						busyInd.hide();
						handleErrorNoResponse();
					}
						
			}
					busyInd.hide();	
};
	
	this.callrrmr01 =function(){
	 busyInd.show();	
		self.mobileBillerList.removeAll();
		
		var invocationData = {
					adapter : "BillListing",
		    		procedure : "GetBiller",
		    		parameters : []
			};
			
			WL.Client.invokeProcedure(invocationData, {
				onSuccess : function BillerSucces(response){
						//	console.log(response);
							invocationResult = response.invocationResult;
							//console.log("Biller list  "+invocationResult.result);
							//return;
							billerlist = invocationResult.result;
						$(billerlist).each(function(index, obj) {
						//	console.log(obj.BillerID);
							if(obj.SubCategory=="PREPAID MOBILE"){
								//mobvalue:obj.BillerID;
								//displaytxt:obj.BillerName;
								self.mobileBillerList.push({displaytxt:obj.BillerName,mobvalue:obj.BillerID,selected:false});
							}
						   // self.fromAccountList.push({ codacctno: obj.codacctno, displaytxt:displaytxt, accountValue: accountValue });
						});
				busyInd.hide();	
				},
				onFailure : AdapterFail,	    		
				timeout: timeout
			});
		
		
		
	 $("#contentData").load("Views/recharge/rrmr01.html", null, function (response, status, xhr) {
     	 if (status != "error") {}
     	ko.applyBindings(self, $(".dynamic-page-content").get(0));	
     	 //  var model = new loginViewModel();
     });
		 
		busyInd.hide();			
};

		rrmr01submit =function(){
	
			
			
			if($("#rrmr01").valid()){
				
				
				Blisttxt=$("#Blist  option:selected").text();
				Blist = $("#Blist").val();
				mobmob=$("#mobmob").val();
				
				//alert(Blist);
				window.location="#rrmr02";
				 $("#contentData").load("Views/recharge/rrmr02.html", null, function (response, status, xhr) {
			    	 if (status != "error") {}
			    	 $("#Blist1").val(Blist);
			    	 $("#mobmob1").html(mobmob);
			    	 $("#Blisttxt1").html(Blisttxt)
			    	ko.applyBindings(self, $(".dynamic-page-content").get(0));	
			    	 //  var model = new loginViewModel();
			    });
					 
					
					}
			
			//Blist = $("#Blist, option:selected").text();
	
		};




			rrmr02submit =function(){

					

		
				busyInd.show();
				
	
	Blist2=$("#Blist1").val();
	mobmob2=$("#mobmob1").html();
	//alert(Blist2);
	reqParams = {};
	
	reqParams["fldAuthenticators"] = mobmob2;
	
	reqParams["fldAppId"] = "RS";
	
	reqParams["fldBillerId"] =Blist2;
	reqParams["fldShortName"]= "NA";
	
	
	reqParams["fldTxnId"] = "BMR";
	reqParams["fldDeviceId"] = fldDeviceId;
	reqParams["fldLoginUserId"] =Regloginuid;
	reqParams["fldRequestId"] =RegfldRequestId;
	reqParams["fldScrnSeqNbr"] = "01";
	
	
	fldjsessionid = Regfldjsessionid;
	
	reqParams["fldSessionId"] = Rsessionid;
	
	var invocationData = {
			adapter : "BillListing",
    		procedure : "RRMR02",
    		parameters : [fldjsessionid,reqParams,ipadd]
	};
	
	WL.Client.invokeProcedure(invocationData, {
		onSuccess : rrmr03PageSuccess,
		onFailure : AdapterFail,	    		
		timeout: timeout
	});
};
	
		rrmr03PageSuccess=function(result){
				invocationResult = result.invocationResult;
				if(invocationResult.isSuccessful) {
					if(invocationResult.faml.response){	
						if(invocationResult.faml.response.rc.returncode == 0){

							mobbiller=invocationResult.faml.response.response.fldBillerAccountId;
							
							
							window.location="#rrmr03";
							
							 $("#contentData").load("Views/recharge/rrmr03.html", null, function (response, status, xhr) {
						    	 if (status != "error") {}
						    			//alert(invocationResult.faml.request.fldAuthenticators);				    	 
						    	 	$("#mobiller").html(mobbiller);
					    			//$("#Blist3").html(Blist3);
									$("#mobno").html(invocationResult.faml.request.fldAuthenticators);
									$("#Blist3").html(invocationResult.faml.request.fldBillerId);
									$("#Blisttxt2").html(invocationResult.faml.request.fldAuthenticators);
									
									
						    	ko.applyBindings(self, $(".dynamic-page-content").get(0));	
						    	 //  var model = new loginViewModel();
						    			
							 });
				    	 
						}else{
							busyInd.hide();
							errormessagemob=invocationResult.faml.response.rc.errormessage;
							navigator.notification.alert(errormessagemob);
							window.location="#billpayment";
							
						}

	 			}else{
					busyInd.hide();
				handleErrorNoResponse();
			}
			
			busyInd.hide();		
			};
};


	this.callrrcrs01 =function(){
	 
	 $("#contentData").load("Views/recharge/rrcrs01.html", null, function (response, status, xhr) {
    	 if (status != "error") {}
    	ko.applyBindings(self, $(".dynamic-page-content").get(0));	
    	 //  var model = new loginViewModel();
    });
		 
				
};

   rrcrs01submit =function(){

	if($("#rrcrs01").valid()){

 
   		busyInd.show();  
	    mobref=$("#mobref").val();
    	reqParams = {};
    	
    	
    	
    	reqParams["fldAppId"] = "RS";
    	
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldTransactionId"]= mobref;
    	reqParams["fldTxnId"] = "UCR";
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldRequestId"] =RegfldRequestId;
    	reqParams["fldScrnSeqNbr"] = "01";
    	
		
    	fldjsessionid = Regfldjsessionid;
    	
    	reqParams["fldSessionId"] = Rsessionid;
    	
    	var invocationData = {
    			adapter : "BillListing",
        		procedure : "RRCRS02",
        		parameters : [fldjsessionid,reqParams,ipadd]
    	};
    	
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : rrcrs02PageSuccess,
    		onFailure : AdapterFail,	    		
    		timeout: timeout
    	});
	}
};
 rrcrs02PageSuccess = function(result){
		invocationResult = result.invocationResult;
	if(invocationResult.isSuccessful) {
		if(invocationResult.faml.response){	
			if(invocationResult.faml.response.rc.returncode == 0){
				
				
			rchrgdata=invocationResult.faml.response.response.fldRechargeBillerID;
			chkdata=invocationResult.faml.response.response.fldAuthenticator1;
			chkdate=invocationResult.faml.response.response.fldTxnDate;
			chktxn=invocationResult.faml.response.response.fldTxnAmt;
			rchrtxn=invocationResult.faml.response.response.fldTransactionId;
			rchrpay=invocationResult.faml.response.response.fldPaymentId;
			rchrpaystatus=invocationResult.faml.response.response.fldPaymentStatus;
			rchrstatus=invocationResult.faml.response.response.fldRechargeStatus;
			rchrdesc=invocationResult.faml.response.response.fldRechargeStatusDesc;
			
			
			window.location="#rrcrs02";
			
		 	 $("#contentData").load("Views/recharge/rrcrs02.html", null, function (response, status, xhr) {
		       	 if (status != "error") {}
		       	ko.applyBindings(self, $(".dynamic-page-content").get(0));	
		       	 //  var model = new loginViewModel();
		       	

				$("#rchrgdata").html(rchrgdata);
				$("#chkdata").html(chkdata);
				$("#chkdate").html(chkdate);
				$("#chktxn").html(chktxn);
				$("#rchrstatus").html(rchrstatus);
				if(rchrdesc=='NA'){
					$("#rchrdesc").html('-');
					}else{
						$("#rchrdesc").html(rchrdesc);
					}
				
				$("#rchrpaystatus").html(rchrpaystatus);
				
				$("#rchrtxn").html(rchrtxn);
				$("#rchrpay").html(rchrpay);
			
				
				
			//	$("#rchrdesc").html(rchrdesc);
				
		       });
					
			}
			
			else{
                busyInd.hide();
				errmsgrch=invocationResult.faml.response.rc.errormessage;
				navigator.notification.alert(errmsgrch);
				window.location="#billpayment";
			}
			
   	}else{
   	 busyInd.hide();	
	   handleErrorNoResponse();
   }
   	
				}
	 busyInd.hide();		
			};
			
/*delete biller */
  
   DeletbillerBkp = function(){
	  //  alert('delets biller');
	//	alert(billeraccid());
	    reqParams = {};
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldTxnId"] = "UVB";
    	reqParams["fldScrnSeqNbr"] = "03";
		reqParams["fldBillerAccountId"] ="HDFC0000857";
    	reqParams["fldRequestId"] =RegfldRequestId;
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
//fldDeviceId=01&fldBillerAccountId=XXXXXXX&fldLangId=eng&fldTxnId=UVB&fldRequestId=1229489154DMVQSVHN142745298NM&fldSessionId=1229489154DMVQSVHN&fldAppId=RS&fldScrnSeqNbr=03
    	busyInd.show();
    	var invocationData = {
    			adapter : "BillListing",
        		procedure : "RRUVB03",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : rruvb03Success,
    		onFailure : AdapterFail,	    		
    		timeout: timeout
    	});
	   
	};
	 rruvb03Success = function(result){
			invocationResult = result.invocationResult;
			//alert('sucesshistory2');
			if(invocationResult.faml.response.rc.returncode == 0){	
			//fldBillerAccountId			
			
			var moboper2 =$("#moboper2").html();						  
			var mobnumber2 =$("#mobnumber2").html();				  
			$("#contentData").load("Views/recharge/rruvb04.html", null, function (response, status, xhr) {
								if (status != "error") {}	
							fldBillerAccountId = invocationResult.faml.response.response.fldBillerAccountId;
						   ko.applyBindings(self, $(".dynamic-page-content").get(0)); 
						   $('#rchrefid').html(fldBillerAccountId);
						   	$("#moboper4").html(moboper2);
							$("#mobnumber2").html(mobnumber2);						  
						  
						   
						 
												
			});
			}
		else{
			handleError(invocationResult.faml.response);
		    }
	 busyInd.hide();
	}; 
	
	rruvbdth03Success= function(result){
			invocationResult = result.invocationResult;
			//alert('sucesshistory2');
			if(invocationResult.faml.response.rc.returncode == 0){	
			//fldBillerAccountId			
			
			var dthoper2 =$("#dthoper2").html();						  
			var dthnum2 =$("#dthnum2").html();				  
			$("#contentData").load("Views/recharge/rrdthuvb04.html", null, function (response, status, xhr) {
								if (status != "error") {}	
							fldBillerAccountId = invocationResult.faml.response.response.fldBillerAccountId;
						   ko.applyBindings(self, $(".dynamic-page-content").get(0));
                            $(".h_title").html("Delete DTH Recharge Biller");						   
						    $('#dthoper4').html(dthoper2);
						   	$("#dthnum4").html(dthnum2);
							$("#rchrefiddth").html(fldBillerAccountId);						  
						  
						   
						 
												
			});
			}
		else{
			handleError(invocationResult.faml.response);
		    }
	 busyInd.hide();
	}; 
	
	


	
	
	
	
/* end*/			
			
			
};