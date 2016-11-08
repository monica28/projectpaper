

		var DebitcardViewModel = function () {

			  var self = this;
			
			  self.error = ko.observable(false); 
			  self.errormsg = ko.observable(""); 
			AccountList =  ko.observableArray([]);
				this.getDebitSummary = function(){
					
					
					busyInd.show();
					dbtAccountList.removeAll();
					dbtHotlistAcc.removeAll(); 
					reqParams = {};
			
					reqParams["fldDeviceId"] = fldDeviceId;
					reqParams["fldWebServerId"] = fldWebServerId;
					reqParams["fldAppId"] = fldAppId;
					reqParams["fldAppServerId"] = fldAppServerId;
					reqParams["fldLangId"] = fldLangId;
					reqParams["fldModule"] = fldModule;
					reqParams["fldSwitchAppId"] = "";
					reqParams["fldModule"] = "CH";
					reqParams["fldTxnId"] = "DCE";
					reqParams["fldLogoffReq"] = "N";
					reqParams["fldAmcId"] = "ALL";
					reqParams["fldRoleId"] = "";
					reqParams["fldReportDate"] =getCurrdate();
					
					reqParams["fldScrnSeqNbr"] = "01";
					
					fldjsessionid = Regfldjsessionid;
			    	reqParams["fldLoginUserId"] =Regloginuid;
			   
			    	reqParams["fldSessionId"] = Rsessionid;
			    	reqParams["fldRequestId"] =RegfldRequestId;
					
					var invocationData = {
							adapter : "DebitCards",
							procedure : "RRDCE01",
							parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
					};
					
					WL.Client.invokeProcedure(invocationData, {
						onSuccess : loadrrcdc01 ,
						onFailure : AdapterFail,	    		
						timeout: timeout
					});
					
					if(window.location.hash == '#rrdce01'){
						templateId = "rrdce01";
					}else{
						templateId = "rrdce01";
					}
					
					$("#contentData").load("Views/Debit/"+templateId+".html", null, function (response, status
		, xhr) {
						if (status != "error") {}
						ko.applyBindings(self, $(".dynamic-page-content").get(0));     
					
						
						
							
					});
				
			};
				
			this.getDebitHotlist = function(){
				busyInd.show();
				dbtAccountList.removeAll();
				dbtHotlistAcc.removeAll();
		   
					reqParams = {};
			
					reqParams["fldDeviceId"] = fldDeviceId;
					reqParams["fldWebServerId"] = fldWebServerId;
					reqParams["fldAppId"] = fldAppId;
					reqParams["fldAppServerId"] = fldAppServerId;
					reqParams["fldLangId"] = fldLangId;
					reqParams["fldModule"] = fldModule;
					reqParams["fldSwitchAppId"] = "";
					reqParams["fldModule"] = "CH";
					reqParams["fldTxnId"] = "DCL";
					reqParams["fldLogoffReq"] = "N";
					reqParams["fldAmcId"] = "ALL";
					reqParams["fldScrnSeqNbr"] = "01";
					
					
					fldjsessionid = Regfldjsessionid;
			    	reqParams["fldLoginUserId"] =Regloginuid;
			    
			    	reqParams["fldSessionId"] = Rsessionid;
			    	reqParams["fldRequestId"] =RegfldRequestId;
			    	
			    	
					var invocationData = {
							adapter : "DebitCards",
							procedure : "RRDCL01",
							parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
					};
					
					WL.Client.invokeProcedure(invocationData, {
						onSuccess : loadrrcdc01,
						onFailure : AdapterFail,	    		
						timeout: timeout
					});
				if(window.location.hash == '#rrdcl01'){
					templateId = "rrdcl01";
				}else{
					templateId = "rrdcl01";
				}
				
				$("#contentData").load("Views/Debit/"+templateId+".html", null, function (response, status, 
		xhr) {
					if (status != "error") {}
					ko.applyBindings(self, $(".dynamic-page-content").get(0));     
				
					
					
						
				});
			   
				
			   };
			loadrrcdc01 = function(result){
				
				busyInd.hide();
				invocationResult = result.invocationResult;
				if(invocationResult.isSuccessful) {
					if(invocationResult.faml.response){	
					if(invocationResult.faml.response.rc.returncode == 0){
						carddetails=invocationResult.faml.response.CardDetails;
						cardcount  = invocationResult.faml.response.Cardcount;
						dbtAccountList.removeAll();
						dbtHotlistAcc.removeAll();
						if(window.location.hash == "#rrdce01"){
							
						
						
					
							
							if(cardcount > 0 ){
								//accStmtData(invocationResult.faml);    
								//window.location = "#rrdce01";
							
								
								$(carddetails).each(function(index, obj) {    			    			
									dbtAccountList.push({ cardnum: obj.MASK_PAN, Status :getStatus(obj.Status
		)});
								}); 
								
								$("#mainDiv").show();
								$("#CardCnt").hide();
							}else{
								$("#mainDiv").hide();
								$("#CardCnt").show();
							}
							
							  
						}
						else if(window.location.hash == "#rrdcl01"){
							
				
				   
							if(cardcount > 0 ){
								//accStmtData(invocationResult.faml);    
								//window.location = "#rrdce01";
								$(carddetails).each(function(index, obj) {
									if(obj.Status==1){
									var accountValue = obj.PAN+"#"+obj.MASK_PAN+"#"+obj.ExpiryDate+"#"+obj.
		Status+"#"+obj.fldUnqId;
									
									dbtAccountList.push({ cardnum: obj.MASK_PAN, cardval : accountValue});
									}
									}); 
							
								
								$("#CardCnt").hide();
								$("#frmrrdcl01").show();
								
							}else{
								$("#frmrrdcl01").hide();
								$("#CardCnt").show();
							}
							
						
							
						}
						
					}else{
						errmsg = invocationResult.faml.response.rc.errormessage;
						$("#frmrrdcl01").hide();
						$("#CardCnt").show();
						handleError(invocationResult.faml.response);
						 window.location =  '#rrasm01';
					}
					}
				}
				};
				
				
				   this.rrdcl01Submit = function(){
						 self.error("");
						 self.errormsg("");
						 if($("#frmrrdcl01").valid()){
							busyInd.show();        	
							reqParams = {};
							var sel=$("#selCard").val();
							arrdata =sel.split("#");




							reqParams["fldDeviceId"] = fldDeviceId;
							reqParams["fldWebServerId"] = fldWebServerId;
							reqParams["fldAppId"] = fldAppId;
							reqParams["fldAppServerId"] = fldAppServerId;
							reqParams["fldLangId"] = fldLangId;
							reqParams["fldModule"] = fldModule;

							reqParams["fldTxnId"] = "DCL";
							reqParams["fldScrnSeqNbr"] = "02";

							reqParams["fldCardNo"] =arrdata[0];
							reqParams["fldMaskCardNo"] =arrdata[1];
							reqParams["fldExpiry"] =arrdata[2];
							reqParams["fldStatus"] =arrdata[3];
							reqParams["fldUnqId"] =arrdata[4];


							
							fldjsessionid = Regfldjsessionid;
					    	reqParams["fldLoginUserId"] =Regloginuid;
					    
					    	reqParams["fldSessionId"] = Rsessionid;
					    	reqParams["fldRequestId"] =RegfldRequestId;
							
							var invocationData = {
									adapter : "DebitCards",
									procedure : "RRDCL02",
									parameters : [fldjsessionid,reqParams,ipadd],
									compressResponse : true,
							};

							//WL.Logger.debug(invocationData, '');
							WL.Client.invokeProcedure(invocationData, {
								onSuccess :rrdcl01Response,
								onFailure : AdapterFail,
								timeout: timeout,
							});
						 }
						};    
						
						
					   rrdcl01Response = function(result){
					  
							busyInd.hide();
							invocationResult = result.invocationResult;
							if(invocationResult.isSuccessful) {
								if(invocationResult.faml.response){	
									if(invocationResult.faml.response.rc.returncode == 0){
										accStmtData(invocationResult.faml);
										self.errormsg ("ATM / Debit Card Hotlisting – Confirm");

										self.error (false);
										window.location = "#rrdcl02";
										callrrdcl02();
									}else{
										errmsg = invocationResult.faml.response.rc.errormessage;
										handleError(invocationResult.faml.response);
										self.error(true); 
										self.errormsg("ATM / Debit Card Hotlisting – Failure"+errmsg);
					  
										
									}
								}
							}
						};

					  callrrdcl02 = function(){
							accstmtdata = accStmtData();


							fldCardNo = accstmtdata.response.fldCardNo;
							fldMaskCardNo = accstmtdata.response.fldMaskCardNo;
							fldExpiry = accstmtdata.response.fldExpiry;

							fldStatus = accstmtdata.response.fldStatus;
							fldUnqId = accstmtdata.response.fldUnqId;
							


							$("#contentData").load("Views/Debit/rrdcl02.html", null, function (response, 
		status, xhr) {
								if (status != "error") {}	
								//alert(fldfromacctno);
								
								$("#cardid").html(fldMaskCardNo);
								$("#fldCardNo").val(fldCardNo);
								$("#fldMaskCardNo").val(fldMaskCardNo);
								$("#fldExpiry").val(fldExpiry);

								$("#fldStatus").val(fldStatus);
								$("#fldUnqId").val(fldUnqId);
										

								ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
							});

						};

						this.rrdcl02Submit = function(){
							 self.error(false);
							self.errormsg("");
							if($("#frmrrdcl02").valid()){
							busyInd.show();        	
						 
					   

							var $form = $("#frmrrdcl02");
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

							reqParams["fldTxnId"] = "DCL";
							reqParams["fldScrnSeqNbr"] = "03";

						   


						
							fldjsessionid = Regfldjsessionid;
					    	reqParams["fldLoginUserId"] =Regloginuid;
					    	
					    	reqParams["fldSessionId"] = Rsessionid;
					    	reqParams["fldRequestId"] =RegfldRequestId;
							
							
							var invocationData = {
									adapter : "DebitCards",
									procedure : "RRDCL03",
									parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
							};

							//WL.Logger.debug(invocationData, '');
							WL.Client.invokeProcedure(invocationData, {
								onSuccess : rrdcl02Response,
								onFailure : AdapterFail,
								timeout: timeout
							});
							}
						   };    

						 rrdcl02Response = function(result){
							busyInd.hide();
							invocationResult = result.invocationResult;
							if(invocationResult.isSuccessful) {
								if(invocationResult.faml.response){	
									if(invocationResult.faml.response.rc.returncode == 0){
										window.location = "#rrdcl03";
										$("#contentData").load("Views/Debit/rrdcl03.html", null, function (
		response, status, xhr) {
											if (status != "error") {}	
										//accStmtData(invocationResult.faml);
										$("#error").html("ATM / Debit Card Hotlisting – Successful");

											//self.error (false);
										 $("#cardnum").html(invocationResult.faml.response.fldMaskCardNo);
										$("#remark").html(invocationResult.faml.response.fldRemarks);
										$("#reson").html(getReson(invocationResult.faml.response.fldReason));
										
										ko.applyBindings(self, $(".dynamic-page-content").get(0));
						   
										});
									}else{
										errmsg = invocationResult.faml.response.rc.errormessage;
										 //self.error(true); 
										$("#error").html("ATM / Debit Card Hotlisting – Failure"+errmsg);
										handleError(invocationResult.faml.response);
									}
								}
							}
						   };
						   
						   
						   
						   
					this.getInstantPin = function(){
								   busyInd.show();
							
							 reqParams = {};
							 reqParams["fldDeviceId"] = fldDeviceId;
							 reqParams["fldWebServerId"] = fldWebServerId;
							 reqParams["fldAppId"] = fldAppId;
							 reqParams["fldAppServerId"] = fldAppServerId;
							 reqParams["fldLangId"] = fldLangId;
							 reqParams["fldModule"] = fldModule;
							 reqParams["fldLogoffReq"] = "N";
					         reqParams["fldTxnType"] = "FCNR";
					         reqParams["fldModule"] = "CH";
					         reqParams["fldBenefType"] = "FCNR";
					         reqParams["fldOrgTxn"] = "";
					         reqParams["fldRoleId"] = "";
					         reqParams["fldSwitchAppId"] = "";
					         reqParams["fldTxnId"] = "DPI";
					         reqParams["fldScrnSeqNbr"] = "01";
	//fldLogoffReq=N&fldTxnType=&fldModule=CH&fldBenefType=FCNR&fldOrgTxn=&fldAppId=RS&fldRoleId=&fldSwitchAppId=&fldTxnId=DPI&fldRequestId=1657819306EBLABEXA191738586PO&fldScrnSeqNbr=01&fldSessionId=1657819306EBLABEXA						
						 fldjsessionid = Regfldjsessionid;
					    	reqParams["fldLoginUserId"] =Regloginuid;
					    	reqParams["fldSessionId"] = Rsessionid;
					    	reqParams["fldRequestId"] =RegfldRequestId;
								   
								   	var invocationData = {
							adapter : "DebitCards",
							procedure : "RSDPI01",
							parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
					};
					
					WL.Client.invokeProcedure(invocationData, {
						onSuccess : getInstantPinResponse,
						onFailure : AdapterFail,	    		
						timeout: timeout
					}); 
					
					
					
					
					if(window.location.hash == '#rsdpi01'){
					templateId = "rsdpi01";
				}else{
					templateId = "rsdpi01";
				}
				
				$("#contentData").load("Views/Debit/"+templateId+".html", null, function (response, status, xhr) {
					if (status != "error") {}
					ko.applyBindings(self, $(".dynamic-page-content").get(0));     
				
				}); 
				
   };

      getInstantPinResponse = function(result){
			  	busyInd.hide();
					invocationResult = result.invocationResult;
					if(invocationResult.isSuccessful) {
					if(invocationResult.faml.response){	
					if(invocationResult.faml.response.rc.returncode == 0){
					carddetails=invocationResult.faml.response.CardDetails;
					Status=invocationResult.faml.response.fldRsaUserStatus;
					custmid=invocationResult.faml.response.fldConsumerType;
					cardcount  = invocationResult.faml.response.CardDetails;
			
				   fldRsaPublicKey=invocationResult.faml.response.fldRsaPublicKey;
				   newkey=hex2a(fldRsaPublicKey);
				   $("#fldRsaPublicKey").val(newkey);
				  // alert(newkey);
					AccountList.removeAll();
					
				 
				    if (Status == 'N'){
					  
					   alert('We regret to inform you that we are not able to proceed with your  request. For Security reasons, the use of this facility requires you to be registered for  Third Party Transfer service also.You can register for Third Party Transfer service by clicking on the Funds Transfer tab, and completing the registration process. You can then use Instant Pin service. Alternatively, you can also use our "Debit Card ATM Pin" service. ');
					    window.location =  '#debithome';
				    }
						
				   else if (custmid == 'YZ'){
					  
				        alert('We regret to inform you that we are not able to proceed with your request. For Security reasons, we request   you  to use our  "Debit Card ATM Pin" transaction. ');
					    window.location =  '#debithome';
				    }
                   else if(cardcount!=0){
					  
					  $(carddetails).each(function(index, obj) { 
						
                       accountValue = obj.PAN + "#" + obj.MASK_PAN + "#" + obj.Status;	
					   displaytxt = obj.MASK_PAN;
						   AccountList.push({ cardnum: obj.MASK_PAN, displaytxt:displaytxt, accountValue:accountValue});
						   console.log(AccountList);
									
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

                      self.rsdpi01Submit = function(){
                              
	                         if($("#frmrsdpi01").valid()){
	                         fldCardNo= $("#fldCardNo").val().split('#')[1];
							// fldNewPin=$("#fldNewPin").val();
							 fldExpDate= $('#fldExpDate').val();
							 fldRsaPublicKey=$("#fldRsaPublicKey").val(newkey);
							// fldNewConfirmPin=$("#fldNewConfirmPin").val();
							 fldCardAANNo01= $("#fldCardNo").val().split('#')[0];
							 
							  var encrypt = new JSEncrypt();
							 // alert(newkey);
                              encrypt.setPublicKey(newkey);
                              var fldNewPin = encrypt.encrypt($('#fldNewPin').val());
							  //alert(fldNewPin);
							  pin1=stringToHex(fldNewPin);
							//alert(pin1);
							  var fldNewConfirmPin = encrypt.encrypt($('#fldNewConfirmPin').val());
							  pin2=stringToHex(fldNewConfirmPin);
							  var fldCardAANNo = encrypt.encrypt(fldCardAANNo01);
							  fldCardAANNo02=stringToHex(fldCardAANNo);
							//  console.log(fldCardAANNo+'<<<<<<<<<<<<<<<<<<<<<'+fldCardNo);
							 busyInd.show();
							reqParams = {};
							reqParams["fldDeviceId"] = fldDeviceId;
							reqParams["fldWebServerId"] = fldWebServerId;
							reqParams["fldAppId"] = fldAppId;
							reqParams["fldAppServerId"] = fldAppServerId;
							reqParams["fldLangId"] = fldLangId;
							reqParams["fldModule"] = fldModule;
							reqParams["fldTxnId"] = "DPI";
							reqParams["fldScrnSeqNbr"] = "02";
							reqParams["fldExpDate"] = fldExpDate;
							reqParams["fldNewPin"] = pin1;
							reqParams["fldNewConfirmPin"] = pin2;
							reqParams["fldCardAANNo"] = fldCardAANNo02;
							reqParams["selCard"] = fldCardNo;
							reqParams["fldCardNo"] =fldCardNo;
							fldjsessionid = Regfldjsessionid;
					    	reqParams["fldLoginUserId"] =Regloginuid;
							reqParams["fldLoginCustId"] =Regloginuid;
					    
					    	reqParams["fldSessionId"] = Rsessionid;
					    	reqParams["fldRequestId"] =RegfldRequestId;
                             	
						  // console.log(reqParams);
							var invocationData = {
									adapter : "DebitCards",
									procedure : "RSDPI02",
									parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
							};
	
	//WL.Logger.debug(invocationData, '');
							WL.Client.invokeProcedure(invocationData, {
								onSuccess : rsdpi01SubmitSuccess,
								onFailure : AdapterFail,
								timeout: timeout
							});
							 }
					  };  
			  
			 rsdpi01SubmitSuccess = function(result){
			  	busyInd.hide();
			invocationResult = result.invocationResult;
			if(invocationResult.isSuccessful) {
			if(invocationResult.faml.response){	
	     
				$("#contentData").load("Views/Debit/rsdpi02.html", null, function (response, status, xhr) {
					if (status != "error") {}	
		
										
					ko.applyBindings(self, $(".dynamic-page-content").get(0));
					
				  $(".fldCardNo").html(invocationResult.faml.request.fldCardNo);
		          $(".fldNewPin").html(fldNewPin);
		          $(".fldNewConfirmPin").html(fldNewConfirmPin);
				  $("#fldcardno").val(fldCardNo);
		          $("#fldNewPin").val(fldNewPin);
		          $("#fldNewConfirmPin").val(fldNewConfirmPin);
				
				  
							});
							
							
							
				}else{
				errmsg = invocationResult.faml.response.rc.errormessage;
										 

			        handleError(invocationResult.faml.response);
									}
			  //  }
			}
		 };

             this.rsdpi02Submit =  function(){
		          
				
							busyInd.show(); 					
						    fldExpDate= $("#fldExpDate").val();
							console.log(fldCardNo+"###"+fldNewPin+"###"+fldNewConfirmPin+"##"+fldExpDate);
                            reqParams = {};
							reqParams["fldDeviceId"] = fldDeviceId;
							reqParams["fldWebServerId"] = fldWebServerId;
							reqParams["fldAppId"] = fldAppId;
							reqParams["fldAppServerId"] = fldAppServerId;
							reqParams["fldLangId"] = fldLangId;
							reqParams["fldModule"] = fldModule;
							reqParams["fldTxnId"] = "DPI";
							reqParams["fldTxnId"] = "DPI";
							reqParams["fldNewPin"] = pin1;
							reqParams["fldCardNo"] = fldCardNo;
							reqParams["fldNewConfirmPin"] = pin2;
							reqParams["fldCardAANNo"] = fldCardAANNo02;
							reqParams["fldScrnSeqNbr"] = "03"; 
							reqParams["fldExpDate"] = fldExpDate;
							fldjsessionid = Regfldjsessionid;
							reqParams["fldLoginUserId"] =Regloginuid;
							reqParams["fldLoginCustId"] =Regloginuid;
					    	reqParams["fldSessionId"] = Rsessionid;
					    	reqParams["fldRequestId"] =RegfldRequestId;
//fldLoginCustId=&fldCardAANNo=4987920200001517&fldNewConfirmPin=1234&fldCardNo=4987XXXXXXXX1517&fldNewPin=1234&fldTxnId=DPI&fldTxnId=DPI&fldAppId=RS&fldAppId=RS&fldExpDate=&fldSessionId=1965347146PBEBVIBH&fldSessionId=1965347146PBEBVIBH&fldScrnSeqNbr=03&fldScrnSeqNbr=03 
							var invocationData = {
									adapter : "DebitCards",
									procedure : "RSDPI03",
									parameters : [fldjsessionid,reqParams,ipadd],
									compressResponse : true,
							};                    
							WL.Client.invokeProcedure(invocationData, {
								onSuccess :rsaResponse,
								onFailure : AdapterFail,
								timeout: timeout,
							});
						 }	  
					 
		
		rsdpi02SubmitSuccess = function(result){
			//alert('hi');
			 busyInd.hide();
			invocationResult = result.invocationResult;
			if(invocationResult.isSuccessful) {
			if(invocationResult.faml.response){	
			if(invocationResult.faml.response.rc.returncode == 0){
				window.location = "#rsdpi03";
				$("#contentData").load("Views/Debit/rsdpi03.html", null, function (response, status, xhr) {
					if (status != "error") {}	
								


										
					ko.applyBindings(self, $(".dynamic-page-content").get(0));
						   
						   
				});
				}else{
				    errmsg = invocationResult.faml.response.rc.errormessage;
			        handleError(invocationResult.faml.response);
				}
					}
			}
		};
						   
						   
						   
						   		   
						   

						   
			
					   };
				
				


		function getReson(rid) {
			var resontext='';
			if(rid=="L"){
				resontext='Card Lost';
			}
			else if(rid=="D"){
				resontext='Card Damaged';
			}
			else if(rid=="R"){
				resontext='Card Not Received';
			}
			else if(rid=="T"){
				resontext='Card Destroyed';
			}

		 return resontext;
				
			};

		function getStatus(sid) {
				var resontext='';
				if(sid=="0"){
					resontext='Block';
				}
				else if(sid=="1"){
					resontext='Active';
				}
				else if(sid=="3"){
					resontext='Hotlisted';
				}
				else if(sid=="C"){
					resontext='Closed';
				}

			 return resontext;
					
				};

