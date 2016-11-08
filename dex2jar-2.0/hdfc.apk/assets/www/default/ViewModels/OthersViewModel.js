  var OthersViewModel = function () {
         self.fldAcctNo = ko.observable();
		 self.alertList =  ko.observableArray([]);
		 self.fldalertDetails = ko.observableArray([]);
		 self.regalertList =  ko.observableArray([]); 
		 self.fldAlertString1 = ko.observable();
		 self.fldOtherAcctNo = ko.observable();
		 self.fldFromAcctNo = ko.observable();
         self.fldToAcctNo = ko.observable();
		 self.flgemailalert = ko.observable();
		self.flgmobilealert = ko.observable();
		self.regalertList1 = ko.observableArray([]);
       /*  AdapterFail = function(response){
				busyInd.hide();
			};
	         */
		this.ViewContactDetails = function(){
				busyInd.show();	
				reqParams = {};
				reqParams["fldDeviceId"] = fldDeviceId;
				reqParams["fldWebServerId"] = fldWebServerId;
				reqParams["fldAppId"] = "RS";
				reqParams["fldAppServerId"] = fldAppServerId;
				reqParams["fldLangId"] = fldLangId;
				reqParams["fldModule"] = "CH";
				
				reqParams["fldTxnId"] = "CAD";
				reqParams["fldScrnSeqNbr"] = "01";
				
				
		    	fldjsessionid = Regfldjsessionid;
		    	reqParams["fldLoginUserId"] =Regloginuid;
		    	reqParams["fldSessionId"] = Rsessionid;
				
			
				var invocationData = {
						adapter : "Others",
						procedure : "RRCAD01",
						parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
				};
			  WL.Client.invokeProcedure(invocationData, {
				onSuccess : rrcadSuccess,
				onFailure : AdapterFail,	    		
				timeout: timeout
			    });
				
			};
			
			rrcadSuccess = function(result){
						
    	
			invocationResult = result.invocationResult;
			if(invocationResult.isSuccessful) {
				if(invocationResult.faml.response){	
				if(invocationResult.faml.response.rc.returncode == 0){
						
    			$("#contentData").load("Views/Others/rrcad01.html", null, function (response, status, xhr) {
            if (status != "error") {}
            ko.applyBindings(self, $(".dynamic-page-content").get(0));
			$('#namcustfull').html(invocationResult.faml.response.customer.namcustfull);
			$('#txtcustadr1').html(invocationResult.faml.response.customer.txtcustadr1);
			$('#txtcustadr2').html(invocationResult.faml.response.customer.txtcustadr2);
			$('#txtcustadr3').html(invocationResult.faml.response.customer.txtcustadr3);
			$('#txtcustcity').html(invocationResult.faml.response.customer.txtcustcity);
			$('#txtcuststate').html(invocationResult.faml.response.customer.txtcuststate);
			$('#txtcustzip').html(invocationResult.faml.response.customer.txtcustzip);
			$('#txtcustcntry').html(invocationResult.faml.response.customer.txtcustcntry);
			$('#datbirthcust').html(invocationResult.faml.response.customer.datbirthcust);
			$('#pancardno').html(invocationResult.faml.response.customer.pancardno);
			$('#refcustemail').html(invocationResult.faml.response.customer.refcustemail);
			$('#refcustphone').html(invocationResult.faml.response.customer.refcustphone);
			$('#refcustphoneOffice').html(invocationResult.faml.response.customer.refcustphoneOff);
			$('#refcustfax').html(invocationResult.faml.response.customer.refcustfax);
			$('#mobileno').html(invocationResult.faml.response.customer.mobileno);
    	});
    			busyInd.hide();
    		}else{
    			handleError(invocationResult.faml.response);
				
				busyInd.hide();
    		}
    		}else{
				handleErrorNoResponse();
			}
    	}
		 
			};
			
			
	this.changepswrd = function(){
			busyInd.show();
			reqParams = {};
			reqParams["fldDeviceId"] = fldDeviceId;
			reqParams["fldWebServerId"] = fldWebServerId;
			reqParams["fldAppId"] = "RS";
			reqParams["fldAppServerId"] = fldAppServerId;
			reqParams["fldLangId"] = fldLangId;
			reqParams["fldModule"] = "CH";
			reqParams["fldTxnId"] = "CPW";
			reqParams["fldScrnSeqNbr"] = "01";
		
		
		
	    	fldjsessionid = Regfldjsessionid;
	    	reqParams["fldLoginUserId"] =Regloginuid;
	    	reqParams["fldSessionId"] = Rsessionid;
			
			
			
			var invocationData = {
					adapter : "Others",
					procedure : "RRCPW01",
					parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
			};
			WL.Client.invokeProcedure(invocationData, {
				onSuccess : rrcpwSuccess,
				onFailure : AdapterFail,	    		
				timeout: timeout
			});
			
		};
		
		rrcpwSuccess = function(result1){
				
    	invocationResult = result1.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
						
    			$("#contentData").load("Views/Others/rrcpw01.html", null, function (response, status, xhr) {
            if (status != "error") {}
            ko.applyBindings(self, $(".dynamic-page-content").get(0));
			$('#fldFCDBRequestId').html(invocationResult.faml.response.mci.requestid);
			
    	});
    		busyInd.hide();	
    		}else{
    			handleError(invocationResult.faml.response);
				busyInd.hide();
    		}
		  }else{
				handleErrorNoResponse();
			}
		  }
		};
			
		
 self.rrcpw01submit = function(){
 if($("#f1").valid()){
   oldpass= $('#fldOldPass').val();
   Newpass= $('#fldNewPass').val();
   NewpassAgain= $('#fldNewPassAgain').val();
 
    reqParams = {};
				reqParams["fldDeviceId"] = fldDeviceId;
				reqParams["fldWebServerId"] = fldWebServerId;
				reqParams["fldAppId"] = "RS";
				reqParams["fldAppServerId"] = fldAppServerId;
				reqParams["fldLangId"] = fldLangId;
				reqParams["fldModule"] = "CH";
				reqParams["fldRequestId"]="rrcpw02";
				reqParams["fldTxnId"] = "CPW";
				reqParams["fldScrnSeqNbr"] = "02";
				reqParams["fldOldPass"] = oldpass;
				reqParams["fldNewPass"] = Newpass;
				reqParams["fldNewPassAgain"]= NewpassAgain;
				
				

		    	fldjsessionid = Regfldjsessionid;
		    	reqParams["fldLoginUserId"] =Regloginuid;
		    	reqParams["fldIdUser"] =Regloginuid;
		    	reqParams["fldSessionId"] = Rsessionid;
				busyInd.show();
				
				var invocationData = {
						adapter : "Others",
						procedure : "RRCPW01",
						parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
				};
				WL.Client.invokeProcedure(invocationData, {
					onSuccess : rrcpw01submitSuccess,
					onFailure : AdapterFail,	    		
					timeout: timeout
				});
				}
			};
			
	rrcpw01submitSuccess = function(result){
						
    	
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
						
    			reqParams = {};
	        	reqParams["fldDeviceId"] = fldDeviceId;
	        	reqParams["fldWebServerId"] = fldWebServerId;
	        	reqParams["fldModule"] = fldModule;
	        	reqParams["fldTxnId"] = "LGF";
	        	reqParams["fldAppId"] = fldAppId;
	        	reqParams["fldAppServerId"] = fldAppServerId;
	        	reqParams["fldLangId"] = fldLangId;
	        	reqParams["fldScrnSeqNbr"] = "01";
	        	reqParams["fldLoginUserToken"] = "777";
	        	reqParams["fldLoginUserType"] = "O";
	        	reqParams["fldLoginUserCss"] = "preferred";
	        	reqParams["fldLoginUserGroupType"] = "N";
	        	reqParams["fldLoginUserGroupBaseType"] = "E";
	        	reqParams["fldProxyUserFlag"] = "N";
	        	reqParams["fldTxnLimitFlag"] = "N";
	        	reqParams["fldAccountMapFlag"] = "N";
	        	reqParams["fldIdChannel"] = "1";
	        	reqParams["fldRemoteAddress"] = "";
	        	reqParams["fldExtSessionId"] = "";
	        	
	        	fldjsessionid = Regfldjsessionid;
		    	reqParams["fldLoginUserId"] =Regloginuid;
		    	reqParams["fldLoginCustId"] =Regloginuid;
		    	reqParams["fldSessionId"] = Rsessionid;
		    	reqParams["fldRequestId"] =RegfldRequestId;
	        	
	        	var invocationData = {
		    			adapter : "API_Adapter",
		        		procedure : "GetAPICall",
		        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true			        		
		    	};
		    	//WL.Logger.debug(invocationData, '');
		    	WL.Client.invokeProcedure(invocationData, {
		    		onSuccess : self.logoutSuccess,
		    		onFailure : AdapterFail,	    		
		    		timeout: timeout
		    	});
		    	busyInd.hide();	
    			
    			/*$("#contentData").load("Views/Others/rrcpw02.html", null, function (response, status, xhr) {
		            if (status != "error") {}
		            ko.applyBindings(self, $(".dynamic-page-content").get(0));
					       
		    	});
    			busyInd.hide();*/
    		}else{
    			//handleError(invocationResult.faml.response);
				alert(invocationResult.faml.response.error.errormsg);
				busyInd.hide();
				}
    	        }else{
    				handleErrorNoResponse();
    			}
				}
			};
			
	this.changepassword = function(){
		  
			reqParams = {};
			reqParams["fldDeviceId"] = fldDeviceId;
			reqParams["fldWebServerId"] = fldWebServerId;
			reqParams["fldAppId"] = "RS";
			reqParams["fldAppServerId"] = fldAppServerId;
			reqParams["fldLangId"] = fldLangId;
			reqParams["fldModule"] = "";
			
			reqParams["fldTxnId"] = "CPW";
			reqParams["fldScrnSeqNbr"] = "02";
			
			
			fldjsessionid = Regfldjsessionid;
	    	reqParams["fldLoginUserId"] =Regloginuid;
	    	reqParams["fldSessionId"] = Rsessionid;
			
			
			busyInd.show();
			var invocationData = {
					adapter : "Others",
					procedure : "RRCPW02",
					parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
			};
			WL.Client.invokeProcedure(invocationData, {
				onSuccess : rrcpw02success,
				onFailure : AdapterFail,	    		
				timeout: timeout
			});
			
			
		};
		rrcpw02success = function(result){
			
	    	invocationResult = result.invocationResult;
	    	if(invocationResult.isSuccessful){
	    	if(invocationResult.faml.response){
	    	if(invocationResult.faml.response.rc.returncode=0){
	    		$("#contentData").load("Views/Others/rrcpw02.html", null, function (response, status, xhr){
	    			if (status != "error") {}
	    			
	    			reqParams = {};
		        	reqParams["fldDeviceId"] = fldDeviceId;
		        	reqParams["fldWebServerId"] = fldWebServerId;
		        	reqParams["fldModule"] = fldModule;
		        	reqParams["fldTxnId"] = "LGF";
		        	reqParams["fldAppId"] = fldAppId;
		        	reqParams["fldAppServerId"] = fldAppServerId;
		        	reqParams["fldLangId"] = fldLangId;
		        	reqParams["fldScrnSeqNbr"] = "01";
		        	reqParams["fldLoginUserToken"] = "777";
		        	reqParams["fldLoginUserType"] = "O";
		        	reqParams["fldLoginUserCss"] = "preferred";
		        	reqParams["fldLoginUserGroupType"] = "N";
		        	reqParams["fldLoginUserGroupBaseType"] = "E";
		        	reqParams["fldProxyUserFlag"] = "N";
		        	reqParams["fldTxnLimitFlag"] = "N";
		        	reqParams["fldAccountMapFlag"] = "N";
		        	reqParams["fldIdChannel"] = "1";
		        	reqParams["fldRemoteAddress"] = "";
		        	reqParams["fldExtSessionId"] = "";
		        	
		        	fldjsessionid = Regfldjsessionid;
			    	reqParams["fldLoginUserId"] =Regloginuid;
			    	reqParams["fldLoginCustId"] =Regloginuid;
			    	reqParams["fldSessionId"] = Rsessionid;
			    	reqParams["fldRequestId"] =RegfldRequestId;
		        	
		        	
		        	var invocationData = {
			    			adapter : "API_Adapter",
			        		procedure : "GetAPICall",
			        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true			        		
			    	};
			    	//WL.Logger.debug(invocationData, '');
			    	WL.Client.invokeProcedure(invocationData, {
			    		onSuccess : self.logoutSuccess,
			    		onFailure : AdapterFail,	    		
			    		timeout: timeout
			    	});
			    	busyInd.hide();	
	               // ko.applyBindings(self, $(".dynamic-page-content").get(0));
					
             });	
			busyInd.hide();			 
	    		}else{
    			handleError(invocationResult.faml.response);
				
				alert(invocationResult.faml.response.error.errormsg);
				busyInd.hide();
				}
	    	}else{
				handleErrorNoResponse();
			}	
	    	}	
	    	
			
		
      };
	  
      logoutSuccess = function(result){
      	
      	invocationResult = result.invocationResult;
      	if(invocationResult.isSuccessful) {
      		if(invocationResult.faml.response.rc.returncode == 0){
      			alert("Your password has been changed. Your current session is closed. Please login again.");
    			
      			Rsessionid="";
    			Regfldjsessionid="";
    			Regloginuid="";
    			RegfldRequestId="";
    			RegfldFCDBSessionId="";
    			RegloginFlag="no";
      			
      			window.location = "#login";
      		}else{
      			errmsg = invocationResult.faml.response.rc.errormessage;
      			alert(errmsg);
      			window.location = "#login";
      		}
      	}
			busyInd.hide();
      };
	  
	  //Insta Alert 
	  this.InstaAlert  = function(requestType){
		 // alert(A);
			reqParams = {};
			reqParams["fldDeviceId"] = fldDeviceId;
			reqParams["fldWebServerId"] = fldWebServerId;
			reqParams["fldAppId"] = fldAppId;
			reqParams["fldAppServerId"] = fldAppServerId;
			reqParams["fldLangId"] = fldLangId;
			reqParams["fldModule"] = fldModule;
				reqParams["fldTxnId"] = "ALT";
			reqParams["fldScrnSeqNbr"] = "01";
		    reqParams["fldLogoffReq"] = "N";
		    reqParams["fldSwitchAppId"] = "";
		    reqParams["fldCardNo"] ="" ;
			reqParams["fldAcctNo"] ="" ;
			reqParams["fldUhid"] ="" ;
			//reqParams["fldReportDate"] ="" ;
			reqParams["fldReportDate"] =getCurrdate();
			reqParams["fldRoleId"] ="" ;
			reqParams["fldDpId"] ="" ;
			reqParams["fldAmcId"] ="ALL" ;
			if(requestType!=undefined){
					
					reqParams["requestType"] = requestType;
			}else {
					reqParams["requestType"] = "Set";
			}
		    
        		
			fldjsessionid = Regfldjsessionid;
	    	reqParams["fldLoginUserId"] =Regloginuid;
	  
	    	reqParams["fldSessionId"] = Rsessionid;
	    	reqParams["fldRequestId"] =RegfldRequestId;
			
			
			busyInd.show();
			var invocationData = {
					adapter : "Others",
					procedure : "RRALT01",
					parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
			};
			WL.Client.invokeProcedure(invocationData, {
				onSuccess : rralt01success,
				onFailure : AdapterFail,	    		
				timeout: timeout
			});
			
			
		};
		rralt01success = function(result){
			accountList10.removeAll();
	    	invocationResult = result.invocationResult;
	    	if(invocationResult.isSuccessful){
	    	if(invocationResult.faml.response){
	    	//if(invocationResult.faml.response.rc.returncode=0){
			
			acctdtl = invocationResult.faml.response.acctdtls;
		
		    var idx = 1;
    		$(acctdtl).each(function(index, obj) {
    			    strid = "item"+idx;
    				    			
    				displaytxt = obj.acctno+" - "+obj.nambranch;
    			    accountValue = obj.acctno+" #"+obj.codprod+"#"+obj.nambranch;
					 
    			    accountList10.push({ strid:strid, displaytxt:displaytxt, accountValue: accountValue });
    		    idx++;
    		}); 
			
		
	    		$("#contentData").load("Views/Others/rralt01.html", null, function (response, status, xhr){
	    			if (status != "error") {}
	                ko.applyBindings(self, $(".dynamic-page-content").get(0));
					if(idx > 1){
						// window.location="#rrasm01";
						$('#foralert').show();
						$('#staticmsg').hide();
			        }else{
			        	alert('Currently no contact details are registered with bank. Please visit nearest bank branch.');
			        	window.location="#rrasm01";
			        	$('#foralert').hide();
			        	//$('#staticmsg').show();
						
			         }
					 if(invocationResult.faml.request.requestType!=''){
						$('#requestType').val(invocationResult.faml.request.requestType); 
						} 
             });	busyInd.hide();				
	    		/*}else{
    			handleError(invocationResult.faml.response);
				}*/
	    	}else{
				handleErrorNoResponse();
			}	
	    	}	
	    	
			
	    	busyInd.hide();	
      };
	  
	  
	self.rralt01submit = function(){
    if($("#f1").valid()){
             fldtoacctno = self.fldAcctNo();
    	     fldtoacctno =  fldtoacctno.split('#');
    	     	reqParams = {};
				var $form = $("#f1");
				rsaDataArray = $form.serializeArray();    	
				for (var i in rsaDataArray) {
					reqParams[rsaDataArray[i].name] = rsaDataArray[i].value;
				}
				reqParams["fldDeviceId"] = fldDeviceId;
				reqParams["fldWebServerId"] = fldWebServerId;
				reqParams["fldAppId"] = fldAppId;
				reqParams["fldAppServerId"] = fldAppServerId;
				reqParams["fldLangId"] = fldLangId;
			    reqParams["fldModule"] = fldModule;
				reqParams["fldTxnId"] = "ALT";
				reqParams["fldScrnSeqNbr"] = "02";	
				reqParams["fldCodProd"] =fldtoacctno[1]; 
				reqParams["fldNamBranch"]=fldtoacctno[2];
				reqParams["fldAcctNo"] = fldtoacctno[0].trim()+"  ";
				
				
				reqParams["fldFCDBRequestId"] =Rsessionid;
				
				
				fldjsessionid = Regfldjsessionid;
		    	reqParams["fldLoginUserId"] =Regloginuid;
		    	reqParams["fldIdUser"] =Regloginuid;
		    	reqParams["fldSessionId"] = Rsessionid;
		    	reqParams["fldRequestId"] =RegfldRequestId;
				
				
				busyInd.show();
				var invocationData = {
						adapter : "Others",
					    procedure : "RRALT02",
						parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
				};
				WL.Client.invokeProcedure(invocationData, {
					onSuccess : rralt01submitSuccess ,
					onFailure : AdapterFail,	    		
					timeout: timeout
				});
				}
			};
			
	rralt01submitSuccess = function(result){
	      self.alertList.removeAll();
		  self.regalertList.removeAll();
		  rdAccountList.removeAll();
		  dbtAccountList.removeAll();
		 
		  busyInd.hide();	
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
		    requesttype=invocationResult.faml.request.requestType;
		  //  regalert =invocationResult.faml.response.regalert;
			acctno=invocationResult.faml.response.acctno;
			nambranch=invocationResult.faml.response.nambranch;
			if(invocationResult.faml.response.alert != undefined){
						alert1 = invocationResult.faml.response.alert;
						var idx = 1;
					$(alert1).each(function(index, obj) {
						   strid = "item"+idx;
						   displaytxt = obj.description;
						   accountValue =  obj.id;
								rdAccountList.push({ strid:strid, displaytxt:displaytxt, accountValue: accountValue });
								idx++;
					   });
						
				}
			if(invocationResult.faml.response.regalert != undefined){
						regalert = invocationResult.faml.response.regalert;
						var idx = 1;
					$(regalert).each(function(index, obj) {
						   strid = "item"+idx;
						   displaytxt = obj.description;
						   accountValue =  obj.id;
						   dbtAccountList.push({ strid:strid, displaytxt:displaytxt, accountValue: accountValue, id: accountValue,param_additional: obj.param_additional, adtnl_paramtype: obj.adtnl_paramtype,description: obj.description, channel: obj.channel, channelavail: obj.channelavail   });
								idx++;
					   });
						
				}
			if(invocationResult.faml.response.alert != undefined){
					alert1 = invocationResult.faml.response.alert;
					var idx1 = 1;
					
						
				$(alert1).each(function(index, obj) {
					
					   strid1 = "item"+idx1;
					   description = obj.description;
					   param_additional = obj.param_additional;
					   id =  obj.id;
					   channel = obj.channel.channelid;
					   self.alertList.push({ strid:strid1, id:id, param_additional: param_additional, description: description, channel: channel});
							idx1++;
				   });
					
			}
  				 
	$("#contentData").load("Views/Others/rralt02.html", null, function (response, status, xhr) {
				if (status != "error") {}
				   if(requesttype=='ED'){
						$('#AlerGtBox').empty();
						$('#RTypeED').show();
						if(invocationResult.faml.response.regalert != undefined){
								if(regalert){
										$('#regAlrtBox').show();
										self.regalertList(regalert);
										$('#AvAlrtFaccts').html(acctno+" - "+nambranch);
								}
						}
						else if(invocationResult.faml.response.regalert){
								$('#RegAlrtChk').show();
						}else {
								$('#AltNtavl').show();
								if(invocationResult.faml.response.unauthalerttypes != undefined){
									if(invocationResult.faml.response.unauthalerttypes.length>0){
										$('#unauthalerttypesAvlDiv').show();
										$('#artPendngAccDetails').html(acctno+" - "+nambranch);
									}
								}
						}
						codprod = invocationResult.faml.response.codprod;
						requestType = invocationResult.faml.request.requestType;
						$('#fldAcctNo').val(invocationResult.faml.request.fldAcctNo);
						$('#fldNamBranch').val(nambranch);
						$('#fldCodProd').val(codprod);
						$('#requestType').val(requestType);
						$('#fldFCDBRequestId').val(Rsessionid);
					}
				   else {
							document.getElementById("RTypeED").innerHTML = "";	
							document.getElementById("RTypeED").innerHTML = "Empty";
					    	$("#RTypeED").empty();
					   if(invocationResult.faml.response.alert != undefined){
								alert1 = invocationResult.faml.response.alert;
								acctno = invocationResult.faml.response.acctno;
								nambranch = invocationResult.faml.response.nambranch;
								codprod = invocationResult.faml.response.codprod;
								requestType = invocationResult.faml.request.requestType;
								if(alert1){
										$('#AlerGtBox').show();
										//self.alertList(alert);
										$('#AvAlrtFaccts').html(acctno+" - "+nambranch);
								}
								$('#fldAcctNo').val(invocationResult.faml.request.fldAcctNo);
								$('#fldNamBranch').val(nambranch);
								$('#fldCodProd').val(codprod);
								$('#requestType').val(requestType);
								$('#fldFCDBRequestId').val(Rsessionid); 
					   }
					   else if(invocationResult.faml.response.regalert != undefined){
								$('#RegAlrtChk').show();
					   }else{
								
								$('#AltNtavl').show();
								if(invocationResult.faml.response.unauthalerttypes!=undefined){
									if(invocationResult.faml.response.unauthalerttypes.length>0){
											$('#unauthalerttypesAvlDiv').show();
											$('#artPendngAccDetails').html(acctno+" - "+nambranch);
									}
								}
					   }
				}
				   if(invocationResult.faml.response.regalert == undefined){
					   $('#errmsge').html('Currently there are no alerts set for this account.');
					   $('#errmsge').show();
				   }  
				   if(invocationResult.faml.response.alert == undefined){
					   $('#errmsge').html('You are registered for all alert types.');
					   $('#errmsge').show();
				   }
            ko.applyBindings(self, $(".dynamic-page-content").get(0));
			 
			   
			   
			   
			   
    	});
    		busyInd.hide();	
    		}else{
    			handleError(invocationResult.faml.response);
				busyInd.hide();
				}
    	        }else{
    				handleErrorNoResponse();
    			}
				}
			};
	  
	  rralt021Submit = function(){
				//busyInd.hide();
		
				reqParams = {};
				reqParams["fldDeviceId"] = fldDeviceId;
				reqParams["fldWebServerId"] = fldWebServerId;
				reqParams["fldAppId"] = "RS";
				reqParams["fldAppServerId"] = fldAppServerId;
				reqParams["fldLangId"] = fldLangId;
			    reqParams["fldModule"] = "CH";
								reqParams["fldTxnId"] = "ALT";
				
				reqParams["fldEntityId"] = 'B001';
               
               
				var $form = $("#f1");
				rsaDataArray = $form.serializeArray();    	
				for (var i in rsaDataArray) {
					reqParams[rsaDataArray[i].name] = rsaDataArray[i].value;
				}
				reqParams["fldFCDBRequestId"] =Rsessionid;
				
				fldjsessionid = Regfldjsessionid;
		    	reqParams["fldLoginUserId"] =Regloginuid;
		    	reqParams["fldIdUser"] =Regloginuid;
		    	reqParams["fldSessionId"] = Rsessionid;
		    	reqParams["fldRequestId"] =RegfldRequestId;
				
				
				
				busyInd.show();
				var invocationData = {
						adapter : "Others",
					    procedure : "RRALT03",
						parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
				};
				WL.Client.invokeProcedure(invocationData, {
					onSuccess : rralt021submitSuccess ,
					onFailure : AdapterFail,	    		
					timeout: timeout
				});
	  
	  };
	  function getCharsBefore(str, chr) {
			var index = str.indexOf(chr);
			if (index != -1) {
			return(str.substring(0, index));
		   }
		   return("");
		}
	  rralt021submitSuccess = function(result){
		  busyInd.hide();
					invocationResult = result.invocationResult;
					if(invocationResult.isSuccessful) {
							if(invocationResult.faml.response){	
								if(invocationResult.faml.response.rc.returncode == 0){
		    
			
						
    			$("#contentData").load("Views/Others/rralt03.html", null, function (response, status, xhr) {
						if (status != "error") {}
			   
							ko.applyBindings(self, $(".dynamic-page-content").get(0));
							$("#acctno").html(invocationResult.faml.response.fldAcctNo+"-"+invocationResult.faml.response.fldNamBranch);
							$("#fldalertdesc").html(invocationResult.faml.response.fldAlertDesc);
							fldAlertString =invocationResult.faml.response.fldAlertString;
							deliveryChannels = invocationResult.faml.request.deliveryChannels;
							otherDetails = invocationResult.faml.request.otherDetails;
							//fldAlertString = fldAlertString+'##'+deliveryChannels+'##'+otherDetails+'~~'
							var res = fldAlertString.substr(fldAlertString.indexOf("##") + 2);
							res = getCharsBefore(res,'##' );
							
							
							if(res=='E'){
							   $('#chanel').html('E-Mail');
							}
							else if(res=='S'){
							   $('#chanel').html('SMS');
							}
							else if(res=='B'){
							   $('#chanel').html('Both');
							}else {
								 $('#chanel').html("-");
							}
							
							var ress = fldAlertString.substr(fldAlertString.indexOf("##") + 2);
							var ress = ress.substr(ress.indexOf("##") + 2);	
							ress = getCharsBefore(ress,'~~' );
							if( ress=='D'){
							   $('#otherdtls').html('Daily');
							}
							else if(ress=='M'){
							   $('#otherdtls').html('Monthly');
							}
							else if(ress=='W'){
							  $('#otherdtls').html('Weekly');
							}else {
								$('#otherdtls').html(ress);
							}
							
							$('#fldAlertString').val(fldAlertString);
							$('#fldAlertDesc').val(invocationResult.faml.response.fldAlertDesc);
							$('#fldAcctNo').val(invocationResult.faml.request.fldAcctNo);
							$('#fldCodProd').val(invocationResult.faml.response.fldCodProd);
							$('#fldNamBranch').val(invocationResult.faml.response.fldNamBranch);
							$('#fldFCDBRequestId').val(Rsessionid);
							$('#fldRequestId').val(RegfldRequestId);
			  
    	});
    			busyInd.hide();
    		}else{
    			handleError(invocationResult.faml.response);
				busyInd.hide();
				}
    	        }else{
    				handleErrorNoResponse();
    			}
				}
	  };
	 
	 self.rralt03submit = function(){
    
				
		
				reqParams = {};
				reqParams["fldDeviceId"] = fldDeviceId;
				reqParams["fldWebServerId"] = fldWebServerId;
				reqParams["fldAppId"] = "RS";
				reqParams["fldAppServerId"] = fldAppServerId;
				reqParams["fldLangId"] = fldLangId;
			    reqParams["fldModule"] = "CH";
			   
				var $form = $("#f1");
				rsaDataArray = $form.serializeArray();    	
								
				
				for (var i in rsaDataArray) {
					reqParams[rsaDataArray[i].name] = rsaDataArray[i].value;
				}
				
				fldjsessionid = Regfldjsessionid;
		    	reqParams["fldLoginUserId"] =Regloginuid;
		    	reqParams["fldIdUser"] =Regloginuid;
		    	reqParams["fldSessionId"] = Rsessionid;
		    	reqParams["fldRequestId"] =RegfldRequestId;
				
		    	
				busyInd.show();
				var invocationData = {
						adapter : "Others",
					    procedure : "RRALT04",
						parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
				};
				WL.Client.invokeProcedure(invocationData, {
					onSuccess : rralt03submitSuccess ,
					onFailure : AdapterFail,	    		
					timeout: timeout
				});
				
			};
		rralt03submitSuccess = function(result){
			busyInd.hide();
			self.regalertList.removeAll();
				invocationResult = result.invocationResult;
				if(invocationResult.isSuccessful) {
					if(invocationResult.faml.response){	
					if(invocationResult.faml.response.rc.returncode == 0){
					alertrgtd=invocationResult.faml.response.alertrgtd;
				
					//	self.fldalertDetails(alertrgtd);
						strid = 0;
						$(alertrgtd).each(function(index, obj) {
							if(obj.adtnlparam=='D'){
								adtnlparam = 'Daily';
							}else if(obj.adtnlparam=='M'){
								adtnlparam = 'Monthly';
							}else if(obj.adtnlparam=='W'){
								adtnlparam = 'Weekly';
							}else if(obj.adtnlparam!='W' && obj.adtnlparam!='M' && obj.adtnlparam!='D' && obj.adtnlparam!=''){
								adtnlparam = obj.adtnlparam;
							}else {
								adtnlparam = '';
							}
							
							
		    	    		  self.regalertList.push({strid: strid,desc:obj.desc, error:obj.error, adtnlparam:adtnlparam,channel:obj.channel});
		    	    		  
		    	    		  strid++; 
			    	    		});		
						$("#contentData").load("Views/Others/rralt04.html", null, function (response, status, xhr) {
					if (status != "error") {}
					   
					ko.applyBindings(self, $(".dynamic-page-content").get(0));
					$("#acctno").html(invocationResult.faml.request.fldAcctNo+"-"+invocationResult.faml.request.fldNamBranch);
					//$("#fldalertdesc").html(invocationResult.faml.response.fldAlertDesc);
							$('#fldAlertString').val(invocationResult.faml.response.fldAlertString);
							$('#fldAlertDesc').val(invocationResult.faml.response.fldAlertDesc);
							$('#fldAcctNo').val(invocationResult.faml.request.fldAcctNo);
							$('#fldCodProd').val(invocationResult.faml.response.fldCodProd);
							$('#fldNamBranch').val(invocationResult.faml.response.fldNamBranch);
							$('#fldFCDBRequestId').val(Rsessionid);
							$('#fldRequestId').val(RegfldRequestId);
					});
						busyInd.hide();
					}else{
						busyInd.hide();
						handleError(invocationResult.faml.response);
				}
    	        }else{
    				handleErrorNoResponse();
    			}
				}
		};
	  rralt022Submit = function(){
				if($("#feditdel").valid()){
						fldtoacctno = self.fldAcctNo();
						fldtoacctno =  fldtoacctno.split('#');
		
                reqParams = {};
				reqParams["fldDeviceId"] = fldDeviceId;
				reqParams["fldWebServerId"] = fldWebServerId;
				reqParams["fldAppId"] = "RS";
				reqParams["fldAppServerId"] = fldAppServerId;
				reqParams["fldLangId"] = fldLangId;
			    reqParams["fldModule"] = "CH";
				
			    
				
				reqParams["fldCodProd"] =fldtoacctno[1]; 
				reqParams["fldNamBranch"]=fldtoacctno[2];
				reqParams["fldAcctNo"] = fldtoacctno[0].trim()+"  ";
				var $form = $("#feditdel");
				rsaDataArray = $form.serializeArray();    	
								
				
				for (var i in rsaDataArray) {
					reqParams[rsaDataArray[i].name] = rsaDataArray[i].value;
				}
				
				reqParams["fldFCDBRequestId"] =Rsessionid;
				
			    fldjsessionid = Regfldjsessionid;
		    	reqParams["fldLoginUserId"] =Regloginuid;
		    	reqParams["fldIdUser"] =Regloginuid;
		    	reqParams["fldSessionId"] = Rsessionid;
		    	reqParams["fldRequestId"] =RegfldRequestId;
				
				busyInd.show();
				fldRequestIds = document.getElementById('fldRequestId').value;
				if(fldRequestIds=='RRALM02'){
				reqParams["fldTxnId"] = "ALM";
				reqParams["fldScrnSeqNbr"] = "02";
				reqParams["fldRequestId"] = "RRALM02";
					var invocationData = {
							adapter : "Others",
							procedure : "RRALM02",
							parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
					};
					WL.Client.invokeProcedure(invocationData, {
						onSuccess : rralm02Success,
						onFailure : AdapterFail,	    		
						timeout: timeout
					});
				}else {
					reqParams["fldTxnId"] = "ALD";
					reqParams["fldScrnSeqNbr"] = "03";
					reqParams["fldRequestId"] = "RRALD03";
					var invocationData = {
							adapter : "Others",
							procedure : "RRALD02",
							parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
					};
					WL.Client.invokeProcedure(invocationData, {
						onSuccess : rrald03Success,
						onFailure : AdapterFail,	    		
						timeout: timeout
					});	
				}
	  };
	     
	};
	  
	  
	  
	  
	  
	  
			
			rralm02Success = function(result){
				rdAccountList.removeAll();		
				dbtAccountList.removeAll();	
				busyInd.hide();
				regalerts = '';
				//alert('geloo');
				invocationResult = result.invocationResult;
				if(invocationResult.isSuccessful) {
					if(invocationResult.faml.response){	
					if(invocationResult.faml.response.rc.returncode == 0){
						if(invocationResult.faml.response.regalert!=undefined){
							//alert(invocationResult.faml.response.regalert.length);
						//if(invocationResult.faml.response.regalert.length > 0){
						
						//regalerts = invocationResult.faml.response.regalert.length;
						//$('#Alm02Box').show();
						regalert =invocationResult.faml.response.regalert;
						//rdAccountList(regalert);
						idx = 1;
						$(regalert).each(function(index, obj) {
							
							   strid = "item"+idx;
							   displaytxt = obj.description;
							   accountValue =  obj.id;
							   dbtAccountList.push({ strid:strid, displaytxt:displaytxt, accountValue: accountValue, id: accountValue,param_additional: obj.param_additional, adtnl_paramtype: obj.adtnl_paramtype,description: obj.description, channel: obj.channel, channelavail: obj.channelavail   });
									idx++;
						   });
						self.fldAlertString1(invocationResult.faml.request.fldAlertString1);
						self.flgemailalert(invocationResult.faml.response.userdtls.flgemailalert);
						self.flgmobilealert(invocationResult.faml.response.userdtls.flgmobilealert);
					//}
					
					}
						busyInd.hide();
             }else{
    			handleError(invocationResult.faml.response);
					busyInd.hide();
    		}
    		}else{
				handleErrorNoResponse();
			}
    	}
		 $("#contentData").load("Views/Others/rralm02.html", null, function (response, status, xhr) {
					if (status != "error") {}
					ko.applyBindings(self, $(".dynamic-page-content").get(0));
					$('#editacnt').html(invocationResult.faml.response.acctno+'-'+invocationResult.faml.response.nambranch);
					$('#AlrtTypes').html(invocationResult.faml.request.fldAlertString1_txt.replace('+',' '));;
					regalerts = invocationResult.faml.response.regalert;
					
						if(regalerts!=undefined){
					     	$('#Alm02Box').show();
						}
						fldAlertString = invocationResult.faml.request.fldAlertString;
						deliveryChannels = invocationResult.faml.request.deliveryChannels;
						otherDetails = invocationResult.faml.request.otherDetails;
						
						$('#fldAcctNo').val(invocationResult.faml.response.acctno.trim());
						$('#fldNamBranch').val(invocationResult.faml.response.nambranch.trim());
						$('#fldCodProd').val(invocationResult.faml.request.fldCodProd);
						$('#fldAlertDesc').val(invocationResult.faml.request.fldAlertString1_txt);
						$('#fldAlertString').val(fldAlertString+"##"+deliveryChannels+"##"+otherDetails+"~~"); 
						$('#fldFCDBRequestId').val(RegfldRequestId);
				});
					busyInd.hide();
			};
		 
	  
	  
	  
	  
	  
	  
  
	   
	   
	 self.rralm02submit  = function(){
    if($("#f1").valid()){
           var objs = document.getElementById('deliveryChannels');
		   document.getElementById('deliveryChannels_txt').value = objs.options[objs.selectedIndex].innerHTML; 
		   		otherDetails = '';
				var fldAlertString = $('#fldAlertString').val();
				fldAlertString = fldAlertString.split('##');
					if($('#otherDetails option:selected').val() != undefined){
							otherDetails = 	$('#otherDetails option:selected').val();
					}
					
				deliveryChannels  = $('#deliveryChannels option:selected').val();
				$('#fldAlertString').val(fldAlertString[0]+"##"+deliveryChannels+"##"+otherDetails+"~~");
    reqParams = {};
				reqParams["fldDeviceId"] = fldDeviceId;
				reqParams["fldWebServerId"] = fldWebServerId;
				reqParams["fldAppId"] = "RS";
				reqParams["fldAppServerId"] = fldAppServerId;
				reqParams["fldLangId"] = fldLangId;
			    reqParams["fldModule"] = "CH";
				reqParams["fldTxnId"] = "ALM";
				
				
			    
				
				
				reqParams["fldScrnSeqNbr"] = "03";
                
				var $form = $("#f1");
				rsaDataArray = $form.serializeArray();    	
								
				
				for (var i in rsaDataArray) {
					reqParams[rsaDataArray[i].name] = rsaDataArray[i].value;
				}
				
				reqParams["fldFCDBRequestId"] =Rsessionid;
			

				
				fldjsessionid = Regfldjsessionid;
		    	reqParams["fldLoginUserId"] =Regloginuid;
		    	reqParams["fldIdUser"] =Regloginuid;
		    	reqParams["fldSessionId"] = Rsessionid;
		    	reqParams["fldRequestId"] =RegfldRequestId;
				
				busyInd.show();
				var invocationData = {
						adapter : "Others",
					    procedure : "RRALM03",
						parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
				};
				WL.Client.invokeProcedure(invocationData, {
					onSuccess : self.rralm02submitSuccess ,
					onFailure : AdapterFail,	    		
					timeout: timeout
				});
				}
			};
			
				
	self.rralm02submitSuccess = function(result){
	      
	      busyInd.hide();
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
					$("#contentData").load("Views/Others/rralm03.html", null, function (response, status, xhr) {
					if (status != "error") {}
			   
            ko.applyBindings(self, $(".dynamic-page-content").get(0));
			$('#fldacctno1').html(invocationResult.faml.response.fldAcctNo+'-'+invocationResult.faml.response.fldNamBranch);
			$('#fldalertdesc1').html(invocationResult.faml.response.fldAlertDesc); 
           fldAlertString =invocationResult.faml.response.fldAlertString;
		   
				var res = fldAlertString.substr(fldAlertString.indexOf("##") + 2);
				
							res = getCharsBefore(res,'##' );
							
							if(res=='E'){
							   $('#chanel').html('E-Mail');
							}
							else if(res=='S'){
							   $('#chanel').html('SMS');
							}
							else if(res=='B'){
							   $('#chanel').html('Both');
							}else {
								 $('#chanel').html("-");
							}
							
							var ress = fldAlertString.substr(fldAlertString.indexOf("##") + 2);
							var ress = ress.substr(ress.indexOf("##") + 2);	
							
							ress = getCharsBefore(ress,'~~' );
							
							
							if( ress=='D'){
							   $('#otherdtls').html('Daily');
							}
							else if(ress=='M'){
							   $('#otherdtls').html('Monthly');
							}
							else if(ress=='W'){
							  $('#otherdtls').html('Weekly');
							}
							else if(ress!=''){
								  $('#otherdtls').html(ress);
								}else {
								$('#otherdtls').html('-');
				
				}
						$('#fldAcctNo').val(invocationResult.faml.response.fldAcctNo+"  ");
						$('#fldNamBranch').val(invocationResult.faml.response.fldNamBranch);
						$('#fldCodProd').val(invocationResult.faml.response.fldCodProd);
						$('#fldAlertDesc').val(invocationResult.faml.response.fldAlertDesc);
						$('#fldAlertString').val(invocationResult.faml.response.fldAlertString);
						$('#fldFCDBRequestId').val(RegfldRequestId);
    	});
    			busyInd.hide();
				
    		}else{
    			handleError(invocationResult.faml.response);
				busyInd.hide();
				}
    	        }
				}
			};
	   
	 this.submitconfrim = function(){
		  
			reqParams = {};
			reqParams["fldDeviceId"] = fldDeviceId;
			reqParams["fldWebServerId"] = fldWebServerId;
			reqParams["fldAppId"] = "RS";
			reqParams["fldAppServerId"] = fldAppServerId;
			reqParams["fldLangId"] = fldLangId;
			reqParams["fldModule"] = "CH";
			reqParams["fldTxnId"] = "ALM";
			reqParams["fldScrnSeqNbr"] = "03";
		
			
			
			fldjsessionid = Regfldjsessionid;
	    	reqParams["fldLoginUserId"] =Regloginuid;
	   
	    	reqParams["fldSessionId"] = Rsessionid;
	    	
			
			
			busyInd.show();
			var invocationData = {
					adapter : "Others",
					procedure : "RRALM03",
					parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
			};
			WL.Client.invokeProcedure(invocationData, {
				onSuccess : self.rralm03Success,
				onFailure : AdapterFail,	    		
				timeout: timeout
			});
			
		};
		
		self.rralm03Success = function(result1){
			busyInd.hide();
    	invocationResult = result1.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
						
    			$("#contentData").load("Views/Others/rralm03.html", null, function (response, status, xhr) {
            if (status != "error") {}
            ko.applyBindings(self, $(".dynamic-page-content").get(0));
			$('#fldFCDBRequestId').html(invocationResult.faml.response.mci.requestid);
			
    	});
    			busyInd.hide();
    		}else{
    			handleError(invocationResult.faml.response);
				busyInd.hide();
    		}
		  }
		  }
		};  
		
		
		
		self.rralm03submit = function(){
			
    if($("#f1").valid()){
            // fldtoacctno = self.fldAcctNo();
    	   //  fldtoacctno =  fldtoacctno.split('#');
		
                reqParams = {};
				reqParams["fldDeviceId"] = fldDeviceId;
				reqParams["fldWebServerId"] = fldWebServerId;
				reqParams["fldAppId"] = "RS";
				reqParams["fldAppServerId"] = fldAppServerId;
				reqParams["fldLangId"] = fldLangId;
			    reqParams["fldModule"] = "CH";
					reqParams["fldTxnId"] = "ALM";
				
				reqParams["fldScrnSeqNbr"] = "04";
                reqParams["fldAlertString"] = $('#fldAlertString').val();
                reqParams["fldAlertDesc"] = $('#fldAlertDesc').val();				
				//reqParams["fldCodProd"] =fldtoacctno[1]; 
				//reqParams["fldNamBranch"]=fldtoacctno[2];
				//reqParams["fldAcctNo"] = fldtoacctno[0].trim()+"  ";
				var $form = $("#f1");
				rsaDataArray = $form.serializeArray();    	
				for (var i in rsaDataArray) {
					reqParams[rsaDataArray[i].name] = rsaDataArray[i].value;
				}
				//console.log('account no '+fldtoacctno[0].trim()+'  ');
				//reqParams["fldAcctNo"] = fldtoacctno[0].trim()+"  ";
				reqParams["fldFCDBRequestId"] =Rsessionid;
			
				
				fldjsessionid = Regfldjsessionid;
		    	reqParams["fldLoginUserId"] =Regloginuid;
		    	reqParams["fldIdUser"] =Regloginuid;
		    	reqParams["fldSessionId"] = Rsessionid;
		    	reqParams["fldRequestId"] =RegfldRequestId;
				
				busyInd.show();
				var invocationData = {
						adapter : "Others",
					    procedure : "RRALM04",
						parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
				};
				WL.Client.invokeProcedure(invocationData, {
					onSuccess : self.rralm03submitSuccess,
					onFailure : AdapterFail,	    		
					timeout: timeout
				});
				}
			};
			
	self.rralm03submitSuccess = function(result){
		busyInd.hide();
		
		self.regalertList1.removeAll();
		
				invocationResult = result.invocationResult;
		
				if(invocationResult.isSuccessful) {
					if(invocationResult.faml.response){	
					if(invocationResult.faml.response.rc.returncode == 0){
					alertrgtd=invocationResult.faml.response.alertrgtd;
					
					strid = 0;
					$(alertrgtd).each(function(index, obj) {
						if(obj.adtnlparam=='D'){
							adtnlparam = 'Daily';
						}else if(obj.adtnlparam=='M'){
							adtnlparam = 'Monthly';
						}else if(obj.adtnlparam=='W'){
							adtnlparam = 'Weekly';
						}else if(obj.adtnlparam!='W' && obj.adtnlparam!='M' && obj.adtnlparam!='D' && obj.adtnlparam!=''){
							adtnlparam = obj.adtnlparam;
						}else {
							adtnlparam = '';
						}
						
						
	    	    		  self.regalertList1.push({strid: strid,desc:obj.desc, error:obj.error, adtnlparam:adtnlparam,channel:obj.channel});
	    	    		  
	    	    		  strid++; 
		    	    		});		
					$("#contentData").load("Views/Others/rralm04.html", null, function (response, status, xhr) {
				if (status != "error") {}
				   
				ko.applyBindings(self, $(".dynamic-page-content").get(0));
				$("#acctno").html(invocationResult.faml.request.fldAcctNo+"-"+invocationResult.faml.request.fldNamBranch);
				//$$("#fldalertdesc").html(invocationResult.faml.response.fldAlertDesc);
							$('#fldAlertString').val(invocationResult.faml.response.fldAlertString);
							$('#fldAlertDesc').val(invocationResult.faml.response.fldAlertDesc);
							$('#fldAcctNo').val(invocationResult.faml.response.fldAcctNo);
							$('#fldCodProd').val(invocationResult.faml.response.fldCodProd);
							$('#fldNamBranch').val(invocationResult.faml.response.fldNamBranch);
							$('#fldFCDBRequestId').val(Rsessionid);
					});
						busyInd.hide();
					}else{
						busyInd.hide();
						handleError(invocationResult.faml.response);
				}
    	        }
				}
			};
		
		
	 this.Editreponse = function(){
		  
			reqParams = {};
			reqParams["fldDeviceId"] = fldDeviceId;
			reqParams["fldWebServerId"] = fldWebServerId;
			reqParams["fldAppId"] = "RS";
			reqParams["fldAppServerId"] = fldAppServerId;
			reqParams["fldLangId"] = fldLangId;
			reqParams["fldModule"] = "CH";
			reqParams["fldTxnId"] = "ALM";
			reqParams["fldScrnSeqNbr"] = "04";
		
			fldjsessionid = Regfldjsessionid;
	    	reqParams["fldLoginUserId"] =Regloginuid;
	    	
	    	reqParams["fldSessionId"] = Rsessionid;
	    
		
			
			busyInd.show();
			var invocationData = {
					adapter : "Others",
					procedure : "RRALM04",
					parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
			};
			WL.Client.invokeProcedure(invocationData, {
				onSuccess : rralm04Success,
				onFailure : AdapterFail,	    		
				timeout: timeout
			});
			
		};
		
		rralm04Success = function(result1){
				
			invocationResult = result.invocationResult;
			if(invocationResult.isSuccessful) {
				if(invocationResult.faml.response){	
				if(invocationResult.faml.response.rc.returncode == 0){
				alertrgtd=invocationResult.faml.response.alertrgtd;
			
				strid = 0;
				$(alertrgtd).each(function(index, obj) {
	    	    		self.regalertList.push({strid: strid,desc:obj.desc, error:obj.error, adtnlparam:obj.adtnlparam,channel:obj.channel});
	    	    		  strid++; 
	    	    		});		
				$("#contentData").load("Views/Others/rralm04.html", null, function (response, status, xhr) {
			if (status != "error") {}
			   
			ko.applyBindings(self, $(".dynamic-page-content").get(0));
			$("#acctno").html(invocationResult.faml.request.fldAcctNo+"-"+invocationResult.faml.request.fldNamBranch);
			//$$("#fldalertdesc").html(invocationResult.faml.response.fldAlertDesc);
						$('#fldAlertString').val(invocationResult.faml.response.fldAlertString);
						$('#fldAlertDesc').val(invocationResult.faml.response.fldAlertDesc);
						$('#fldAcctNo').val(invocationResult.faml.response.fldAcctNo);
						$('#fldCodProd').val(invocationResult.faml.response.fldCodProd);
						$('#fldNamBranch').val(invocationResult.faml.response.fldNamBranch);
						$('#fldFCDBRequestId').val(Rsessionid);
				});
					busyInd.hide();
				}else{
					
					busyInd.hide();
					handleError(invocationResult.faml.response);
			}
	        }
			}
		}; 
		
		 /*******************************Delete Insta Alert************************/
   
	  

	   rrald03Success = function(result){
		   
		   busyInd.hide();
	    	invocationResult = result.invocationResult;
	    	if(invocationResult.isSuccessful) {
	    		if(invocationResult.faml.response){	
	    		if(invocationResult.faml.response.rc.returncode == 0){
						$("#contentData").load("Views/Others/rrald03.html", null, function (response, status, xhr) {
						if (status != "error") {}
				   
	            ko.applyBindings(self, $(".dynamic-page-content").get(0));
				$('#fldacctno1').html(invocationResult.faml.response.fldAcctNo+'-'+invocationResult.faml.response.fldNamBranch);
				$('#fldalertdesc1').html(invocationResult.faml.response.fldAlertDesc); 
	           fldAlertString =invocationResult.faml.response.fldAlertString;
	           	    resC = invocationResult.faml.request.deliveryChannels;
					var res = fldAlertString.substr(fldAlertString.indexOf("##") + 2);
								res = getCharsBefore(res,'##' );
								
								
								/*if(res=='E'){
								   $('#chanel').html('E-Mail');
								}
								else if(res=='S'){
								   $('#chanel').html('SMS');
								}
								else if(res=='B'){
								   $('#chanel').html('Both');
								}else {
									 $('#chanel').html("-");
								}*/
								if(resC=='E'){
									   $('#chanel').html('E-Mail');
									}
									else if(resC=='S'){
									   $('#chanel').html('SMS');
									}
									else if(resC=='B'){
									   $('#chanel').html('Both');
									}
									else {
										 $('#chanel').html("-");
									}
								 resOD = invocationResult.faml.request.otherDetails;
								var ress = fldAlertString.substr(fldAlertString.indexOf("##") + 2);
								var ress = ress.substr(ress.indexOf("##") + 2);	
								ress = getCharsBefore(ress,'~~' );
								
								/*if( ress=='D'){
								   $('#otherdtls').html('Daily');
								}
								else if(ress=='M'){
								   $('#otherdtls').html('Monthly');
								}
								else if(ress=='W'){
								  $('#otherdtls').html('Weekly');
								}else {
									$('#otherdtls').html('-');
					
					}*/
								if( resOD=='D'){
									   $('#otherdtls').html('Daily');
									}
									else if(resOD=='M'){
									   $('#otherdtls').html('Monthly');
									}
									else if(resOD=='W'){
									  $('#otherdtls').html('Weekly');
									}else if(resOD!=''){
									   $('#otherdtls').html(resOD);
									}else {
										$('#otherdtls').html('-');
						
						}
								deliveryChannels = invocationResult.faml.request.deliveryChannels;
								otherDetails = invocationResult.faml.request.otherDetails;
								//console.log(invocationResult.faml.response.acctno.trim());
								
				$('#fldAcctNo').val(invocationResult.faml.response.fldAcctNo+"  ");
							$('#fldNamBranch').val(invocationResult.faml.response.fldNamBranch);
							$('#fldCodProd').val(invocationResult.faml.response.fldCodProd);
							$('#fldAlertDesc').val(invocationResult.faml.response.fldAlertDesc);
							$('#fldAlertString').val(invocationResult.faml.response.fldAlertString+"##"+deliveryChannels+"##"+otherDetails+"~~");
							$('#fldFCDBRequestId').val(RegfldRequestId);
							 
	    	});
	    			busyInd.hide();
					
	    		}else{
	    			handleError(invocationResult.faml.response);
					busyInd.hide();
					}
	    	        }
					}
	    }; 
	    
	    
	   self.rrald03Submit = function(){
	       
	   	if($("#frmrrald03").valid()){
	   	busyInd.show();        	
		fldLoginUserId = Regloginuid;
    	fldFCDBSessionId = RegfldFCDBSessionId;
    	fldjsessionid = Regfldjsessionid;
    	fldSessionId = Rsessionid;
	   	
	   	
	   	
	   	var $form = $("#frmrrald03");
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
		reqParams["fldReportDate"] =getCurrdate();
		reqParams["fldLogoffReq"] = "N";
			
		fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
   
    	reqParams["fldSessionId"] = Rsessionid;
    	reqParams["fldRequestId"] =RegfldRequestId;
		
		var invocationData = {
				adapter : "Others",
				procedure : "RRALD04",
       		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
   	};
	   	
	   	//WL.Logger.debug(invocationData, '');
	   	WL.Client.invokeProcedure(invocationData, {
	   		onSuccess : rrald04Response,
	   		onFailure : AdapterFail,
	   		timeout: timeout
	   	});
	   	}
	   };   
	   rrald04Response = function(result){
		   busyInd.hide();
		   self.regalertList1.removeAll();
			
			invocationResult = result.invocationResult;
			if(invocationResult.isSuccessful) {
				if(invocationResult.faml.response){	
				if(invocationResult.faml.response.rc.returncode == 0){
				alertrgtd=invocationResult.faml.response.alertrgtd;
			
				strid = 0;
						
				$("#contentData").load("Views/Others/rrald04.html", null, function (response, status, xhr) {
			if (status != "error") {}
			   
			
			$("#acctno").html(invocationResult.faml.request.fldAcctNo+"-"+invocationResult.faml.request.fldNamBranch);
			//$$("#fldalertdesc").html(invocationResult.faml.response.fldAlertDesc);
						$('#fldAlertString').val(invocationResult.faml.response.fldAlertString);
						$('#fldAlertDesc').val(invocationResult.faml.response.fldAlertDesc);
						$('#fldAcctNo').val(invocationResult.faml.response.fldAcctNo);
						$('#fldCodProd').val(invocationResult.faml.response.fldCodProd);
						$('#fldNamBranch').val(invocationResult.faml.response.fldNamBranch);
						$('#fldFCDBRequestId').val(Rsessionid);
						$(alertrgtd).each(function(index, obj) {
							if(obj.adtnlparam=='D'){
								adtnlparam = 'Daily';
							}else if(obj.adtnlparam=='M'){
								adtnlparam = 'Monthly';
							}else if(obj.adtnlparam=='W'){
								adtnlparam = 'Weekly';
							}else if(obj.adtnlparam!='W' && obj.adtnlparam!='M' && obj.adtnlparam!='D' && obj.adtnlparam!=''){
								adtnlparam = obj.adtnlparam;
							}else {
								adtnlparam = '';
							}
							
							
		    	    		  self.regalertList1.push({strid: strid,desc:obj.desc, error:obj.error, adtnlparam:adtnlparam,channel:obj.channel});
		    	    		  
		    	    		  strid++; 
		    	    		});
						
						ko.applyBindings(self, $(".dynamic-page-content").get(0));
				});
					busyInd.hide();
				}else{
					
					busyInd.hide();
					handleError(invocationResult.faml.response);
			}
	        }
			}
	    }; 
      
      
      
      
      
      /*******************************End Delete Insta Alert************************/
	  /*********change   mpin	 *********/
		ChangeMpinSubmit = function (){
		
		        Mpin= $('#pin11').val()+""+$('#pin12').val()+""+$('#pin13').val()+""+$('#pin14').val();
				Newpin=$('#pin21').val()+""+$('#pin22').val()+""+$('#pin23').val()+""+$('#pin24').val();
				confirmNewpin=$('#pin31').val()+""+$('#pin32').val()+""+$('#pin33').val()+""+$('#pin34').val();
			
			    if($('#pin11').val()=="" || $('#pin12').val()=="" || $('#pin13').val()=="" || $('#pin14').val()==""){
					alert('Please Enter 4 digit old Quick access pin');
					return false;
			    }
				
				if($('#pin21').val()=="" || $('#pin22').val()=="" || $('#pin23').val()=="" || $('#pin24').val()==""){
					alert('Please Enter 4 digit new Quick access pin');
					return false;
			    }
				if($('#pin31').val()=="" || $('#pin32').val()=="" || $('#pin33').val()=="" || $('#pin34').val()==""){
					alert('Please Re-enter 4 digit new Quick access pin');
					return false;
			    }
				
				if(Newpin!=confirmNewpin){
				  
				   	alert("The re-entered Quick Access PIN does not match the new Quick Access PIN");
					   $('#pin11').val("");
					   $('#pin12').val("");
					   $('#pin13').val("");
					   $('#pin14').val("");
			      	   $('#pin21').val("");
					   $('#pin22').val("");
					   $('#pin23').val("");
					   $('#pin24').val("");
					   $('#pin31').val("");
					   $('#pin32').val("");
					   $('#pin33').val("");
					   $('#pin34').val("");
					return false;
				}
				busyInd.show();
				reqParams = {};
		    	reqParams["fldDeviceId"] = fldDeviceId;
				reqParams["fldWebServerId"] = fldWebServerId;
				reqParams["fldAppId"] = fldAppId;
				reqParams["fldAppServerId"] = fldAppServerId;
				reqParams["fldLangId"] = fldLangId;
				reqParams["fldMobileAuthType"] = "MPIN";
				reqParams["fldSessionId"] = sessionid;
				reqParams["fldRequestId"] = fldRequestId;
				reqParams["fldScrnSeqNbr"] = "02";
				reqParams["fldTxnId"] ="FCP"
				//reqParams["fldNewPass"] =Newpin;
				//reqParams["fldOldPass"] = Mpin;
				reqParams["fldIdUser"] = Regloginuid;
				reqParams["chkTnC"] = "on";
				reqParams["fldSelRadio"] = "C";
			   // reqParams["fldosDeviceIdentifier"] = imeinumber;
				//reqParams["fldwlDeviceIdentifier"] = Anroidids.replace(/-/g,'');
				fldjsessionid = Regfldjsessionid;
				reqParams["fldLoginUserId"] =Regloginuid;	
				
                svtk = getSks(Mpin+""+imeinumber+""+Anroidids.replace(/-/g,''));
				svtk = '' + CryptoJS.AES.encrypt(svtk, imeinumber);
				WL.Client.addGlobalHeader('Content-Lanmguage', svtk);
				ps = '' + CryptoJS.AES.encrypt(Newpin, svtk);
				od = '' + CryptoJS.AES.encrypt(Mpin, svtk);
				//odd = '' + CryptoJS.AES.encrypt(Mpintempsmsmobno, svtk);
				mb = '' + CryptoJS.AES.encrypt(imeinumber, svtk); 
				ud = '' + CryptoJS.AES.encrypt(Anroidids.replace(/-/g,''), svtk);
    	    	var invocationData = {
    	    			//adapter : "Accounts",
    	        		//procedure : "RSVUA01",
    	        		//parameters : [fldjsessionid,reqParams,ipadd]
						adapter : "MPINRegistration",
    	        	    procedure : "ChangeMPIN",
    	        		parameters : [fldjsessionid,reqParams, ps, od, '', mb, ud, '',''],
    	    	};
    	    	//WL.Logger.debug('invoke msg  '+invocationData, '');
    	    	WL.Client.invokeProcedure(invocationData, {
    	    		onSuccess : changempinSuccess,
    	    		onFailure : AdapterFail,	    		
    	    		timeout: timeout
    	    	});
				
											
			}; 
		 //fldMobileAuthType=MPIN&fldIdUser=50000009&chkTnC=on&fldSelRadio=C&fldTxnId=FCP&fldAppId=RS&fldNewPass=1111&fldSessionId=1311553795MMOYKTVF&fldOldPass=4321&fldScrnSeqNbr=02
		 
		 
		 
		changempinSuccess = function(result){
	    	//console.log('inside the rrcsi02 response');
	    	busyInd.hide();
	    	invocationResult = result.invocationResult;
	    	if(invocationResult.isSuccessful) {
	    		if(invocationResult.faml.response){	
	    		if(invocationResult.faml.response.rc.returncode == 0){
	    	             MpinLogout();
	    				
	    		}else{
				       if(invocationResult.faml.response.rc.errorcode == 10049|| invocationResult.faml.response.rc.errorcode ==110513){
							 alert(invocationResult.faml.response.error.errormsg);
							      $('#pin11').val("");
								   $('#pin12').val("");
								   $('#pin13').val("");
								   $('#pin14').val("");
								   $('#pin21').val("");
								   $('#pin22').val("");
								   $('#pin23').val("");
								   $('#pin24').val("");
								   $('#pin31').val("");
								   $('#pin32').val("");
								   $('#pin33').val("");
								   $('#pin34').val("");
						 }
						 else{
						    	errmsg = invocationResult.faml.response.rc.errormessage;
      			                alert(errmsg);
						 }
	    			//errmsg = invocationResult.faml.response.rc.errormessage;
	    			//handleError(invocationResult.faml.response);
					
					busyInd.hide();
	    		}
	    		}
	    	}
	    };
		 /*********change   mpin	end **********/



        /********* force change logout*********/
	 
		MpinLogout = function (){
  
	    						busyInd.show();
	    					 	reqParams = {};
	    					 	reqParams["fldDeviceId"] = fldDeviceId;
	    					 	reqParams["fldWebServerId"] = fldWebServerId;
	    					 	reqParams["fldModule"] = fldModule;
	    					 	reqParams["fldTxnId"] = "LGF";
	    					 	
	    					 	reqParams["fldAppId"] = fldAppId;
	    					 	reqParams["fldAppServerId"] = fldAppServerId;
	    					 	reqParams["fldLangId"] = fldLangId;
	    					 	reqParams["fldScrnSeqNbr"] = "01";
	    					 	reqParams["fldRequestId"] =RegfldRequestId;
	    					 	reqParams["fldLoginUserToken"] = "777";
	    					 	reqParams["fldLoginUserType"] = "O";
	    					 	reqParams["fldLoginUserCss"] = "preferred";
	    					 	
	    					 	reqParams["fldLoginUserGroupType"] = "N";
	    					 	reqParams["fldLoginUserGroupBaseType"] = "E";
	    					 	reqParams["fldProxyUserFlag"] = "N";
	    					 	reqParams["fldTxnLimitFlag"] = "N";
	    					 	reqParams["fldAccountMapFlag"] = "N";
	    					 	reqParams["fldIdChannel"] = "1";
	    					 	reqParams["fldRemoteAddress"] = "";
	    					 	reqParams["fldExtSessionId"] = "";
	    					 	
	    					 	
	    					 	fldjsessionid = Regfldjsessionid;
	    						reqParams["fldLoginUserId"] =Regloginuid;
	    						reqParams["fldLoginCustId"] =Regloginuid;
	    						reqParams["fldSessionId"] = Rsessionid;
	    						
	    					 	var invocationData = {
	    							adapter : "API_Adapter",
	    					   		procedure : "GetAPICall",
	    					   		parameters : [fldjsessionid,reqParams,ipadd],
	    					   		compressResponse : true
	    						};
	    						//WL.Logger.debug(invocationData, '');
	    						WL.Client.invokeProcedure(invocationData, {
	    							onSuccess : logoutSuccessMpinFCP,
	    							onFailure : AdapterFail,	    		
	    							timeout: timeout
	    						});
};



		 logoutSuccessMpinFCP = function(result){
	    		        	
	    		        	invocationResult = result.invocationResult;
	    		        	if(invocationResult.isSuccessful) {
	    		        		if(invocationResult.faml.response.rc.returncode == 0){
	    		        		//	alert("Reset Done Successfully.");
	    		        			alert("The Quick Access PIN has been changed successfully. Please re-login using your new Quick Access PIN");
	    		        			Rsessionid="";
	    		        			Regfldjsessionid="";
	    		        			Regloginuid="";
	    		        			RegfldRequestId="";
	    		        			RegfldFCDBSessionId="";
	    		        			RegloginFlag="no";
	    		        			
	    		        			$(".h_title").html("Login Method");
        			                window.location = "#loginmethod";
	    		        		}else{
	    		        			//errmsg = invocationResult.faml.response.rc.errormessage;
	    		        			//alert(errmsg);
									alert("Reset Not Done Successfully.");
	    		        			$(".h_title").html("Login Method");
        			                window.location = "#loginmethod";
	    		        		}
	    		        	}
	    					busyInd.hide();
	     };
		 
		 
	
	 /********* end mpin logot *********/
		 
     
  };	
  
		