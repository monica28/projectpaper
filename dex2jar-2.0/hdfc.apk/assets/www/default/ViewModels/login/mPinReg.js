
/* JavaScript content from ViewModels/login/loginViewModel.js in folder common */
  var mPinReg = function () {
	  	var versionUrl = '';
        var self = this;
       
       MpincustIdSubmit = function(){
        	//alert("MpincustIdSubmit");
        	if($("#MpinfrmLogin").valid()){
        		
        		var $form = $("#MpinfrmLogin");
    	    	rsaDataArray = $form.serializeArray();    	
    	    	fldjsessionid = Regfldjsessionid;
    	    	//rsajsonData.push({name: 'wordlist', value: wordlist});
    	    	    	
    	    	reqParams = {};
    	    	for (var i in rsaDataArray) {
    	    		reqParams[rsaDataArray[i].name] = rsaDataArray[i].value;
    	    	}
    	    	
    	    	reqParams["fldDeviceId"] = fldDeviceId;
    	    	reqParams["fldWebServerId"] = fldWebServerId;
    	    	reqParams["fldAppId"] = fldAppId;
    	    	reqParams["fldAppServerId"] = fldAppServerId;
    	    	reqParams["fldLangId"] = fldLangId;
    	    	//console.log(" App version for application "+WL.Client.getAppProperty("APP_VERSION"));
        		version  = WL.Client.getAppProperty("APP_VERSION");
        		reqParams["fldAppversion"] = version;
        		ipadd = '';
    	    	busyInd.show();
				WL.Device.getNetworkInfo(function (networkInfo) {
    	    		//console.log(networkInfo.ipAddress); 
    	    		ipadd = networkInfo.ipAddress;
    	    		reqParams["fldAppipAddress"] = networkInfo.ipAddress;
    	    	});
    	    	var invocationData = {
    	    			adapter : "Login",
    	        		procedure : "RRLGN01",
    	        		parameters : [fldjsessionid,reqParams,ipadd],
    	        		compressResponse : true
    	    	};
    	    	//WL.Logger.debug('invoke msg  '+invocationData, '');
    	    	WL.Client.invokeProcedure(invocationData, {
    	    		onSuccess : MpincustIdSubmitSuccess,
    	    		onFailure : AdapterFail,	    		
    	    		timeout: timeout
    	    	});
        	}
        };
		
		
		MpincustIdSubmitSuccess = function(result){
        	//alert("MpincustIdSubmitSuccess");
        	invocationResult = result.invocationResult;        	
        	
        	if(invocationResult.isSuccessful) {
        		if(invocationResult.faml.response){
        			if(invocationResult.faml.response.message){
        			
        				if(invocationResult.faml.response.reqresponse.faml.rc.returncode == 0 ){

        					//self.tesmprespo(invocationResult.faml.response.reqresponse);
        					accStmtData(invocationResult.faml.response.reqresponse.faml);
        				
        				versionUrl = invocationResult.faml.response.url;
        				if(versionUrl){
        				if(invocationResult.faml.response.mandatory=="Y"){
        					
        					navigator.notification.confirm(
              			          //"HDFC Bank has added more trasactions and enhanced security features in new version of the App. Please download the new Application.",
        						""+invocationResult.faml.response.message,	
              			          checkButtonSelection1,
              			          'HDFC BANK',
              			          'Upgrade Now');
        					
        				}
        				else{
        				navigator.notification.confirm(
            			          //"HDFC Bank has added more trasactions and enhanced security features in new version of the App. Please download the new Application.",
        						""+invocationResult.faml.response.message,	
        						   checkButtonSelection,
            			          'HDFC BANK',
            			          'Upgrade Later,Upgrade Now');
        				} 
        				}
        				else{
        					
        					alert(invocationResult.faml.response.message);
        				}
        				}
        				else{
        				
        	    			/*errmsg = invocationResult.faml.response.rc.errormessage;
        	    			if(errmsg == '16001')
        	    				alert('Invalid Customer Id');
        	    			else
        	    				alert(errmsg);*/
        	    			
        	    			handleError(invocationResult.faml.response.reqresponse.faml);
        	    		}
        				
        			}else if(invocationResult.faml.response.message==undefined){
        				if(invocationResult.faml.response.rc.returncode == 0 ){
        					versionUrl = '';
        	    			rsaenrollReq = invocationResult.faml.response.fldRsaEnrollRequired;
        	    			secImg = invocationResult.faml.response.fldRsaImagePath;
        	    			secText = invocationResult.faml.response.fldRsaUserPhrase;
        	    			loginuid = invocationResult.faml.response.loginUser;    	
        	    			
        	    			if(rsaenrollReq == 'N'){
        	    				rsacheck(true);
        	    			}else{
        	    				rsacheck(false);
        	    			}
        	    			userID(loginuid);
        	    			//window.localStorage["loggeduserid"] = loginuid;
        	    			
        	    			
        	    			rsaEnrollReq(rsaenrollReq);
        	    			userSecureImg(secImg);
        	    			secureText(secText);
        	    			
        	    			responseData(invocationResult);
							
							
							
							
							$('.contents').not($(this).next()).slideUp();
							$(this).next().slideToggle();
							$(".head").removeClass("active");	
							$(this).toggleClass("active");
							
							$('#step5').find('.head').addClass('active');
							$('#step5').find('.contents').slideToggle();
							$('#step1succ').show();
							$('#step1').find('.head').css('pointer-events', 'none');
							$('#step3').find('.head').css('pointer-events', 'none');
							
							$('#customerid2').val(loginuid);
							$('#customerid2').attr('readonly','true')
        	    			//window.location = "#MpinloginCustPass";
        	    		}else{
    	    		
    	    			handleError(invocationResult.faml.response);
    	    		}
        				
        			} 
    	    		else{
    	    			
    	    			handleError(invocationResult.faml.response);
    	    		}
        		}else{
        			alert("We apologize this facility is temporarily unavailable.Please try later. ");
        			//window.location = "#login";
        		}
        	}
        	busyInd.hide();
        };
		
		
		MpincustIdPassSubmit = function(){
        	if($("#MpinfrmLoginPass").valid()){
    	    	busyInd.show();
    	    	upass = document.getElementById('upass').value;
    	    	
    	    	
    	    	var $form = $("#MpinfrmLoginPass");
    	    	rsaDataArray = $form.serializeArray();    	
    	    	fldjsessionid = Regfldjsessionid;
    	    	    	
    	    	reqParams = {};
    	    	for (var i in rsaDataArray) {
    	    		if(rsaDataArray[i].name == 'upass'){
    	    			//reqParams["fldPassword"] = upass;
    	    			//fldp = enc(upass);
    	    			//alert(fldp);
    	    		}else{
    	    			reqParams[rsaDataArray[i].name] = rsaDataArray[i].value;
    	    		}
    	    	}
    	    		//fldp = enc($("#upass").val());
    	    	fldp = $("#upass").val();
    	    	uid=$("#fldCustId").val();
    	    	reqParams["fldDeviceId"] = fldDeviceId;
    	    	reqParams["fldWebServerId"] = fldWebServerId;
    	    	reqParams["fldAppId"] = fldAppId;
    	    	reqParams["fldAppServerId"] = fldAppServerId;
    	    	reqParams["fldLangId"] = fldLangId;
    	    	ipadd = '';
    	   		 WL.Device.getNetworkInfo(function (networkInfo) {
    	    		//console.log(networkInfo.ipAddress); 
    	    		ipadd = networkInfo.ipAddress;
    	    		reqParams["fldAppipAddress"] = networkInfo.ipAddress;
    	    	});
    	    	var invocationData = {
    	    			adapter : "API_Adapter",
    	        		procedure : "GetAPICallPass1",
    	        		parameters : [fldjsessionid,reqParams,fldp,uid,ipadd],
    	        		compressResponse : true
    	    	};
    	    	//WL.Logger.debug(invocationData, '');
    	    	
    	    	WL.Client.invokeProcedure(invocationData, {
    	    		onSuccess : MpincustIdPassSuccess,
    	    		onFailure : AdapterFail,	    		
    	    		timeout: timeout
    	    	});
        	}
        };
		
		
		
		MpincustIdPassSuccess = function(result){
         
        	accountList.removeAll();
        	accountSummList.removeAll();
        	ccaccountList.removeAll();
        	ccaccountList1.removeAll();
        	ccaccountList2.removeAll();
        	ccaccountList3.removeAll();
        	ccaccountList4.removeAll();
        	mfaccountList.removeAll();
        	mfaccountList1.removeAll();
        	//self.fixedDepositList.removeAll();
        	//self.recurringDepositList.removeAll();
        	//self.accountStmtTxns.removeAll();
        	//self.selectedAccount.removeAll();
        	
        	invocationResult = result.invocationResult;
        	if(invocationResult.isSuccessful) {
			
			if(invocationResult.faml.response){
			
				if(invocationResult.faml.response.rc){
			
        		if(invocationResult.faml.response.rc.length > 0){
    						for(var ei=0;ei<invocationResult.faml.response.rc.length;ei++ ){
    						
    							returncode = invocationResult.faml.response.rc[ei].returncode;
        						errmsg = invocationResult.faml.response.rc[ei].errormessage;
        						
    							if(invocationResult.faml.response.rc[ei].returncode == 0)
    								break;
    						
    						}
    						
    						
    					}else{
    						returncode = invocationResult.faml.response.rc.returncode;
    						errmsg = invocationResult.faml.response.rc.errormessage;
    					}
    					
    			if(returncode == 0){
        			
        			sessionid = invocationResult.faml.response.mci.sessionid;
        			Rsessionid= invocationResult.faml.response.mci.sessionid;
        			RegfldRequestId = invocationResult.faml.response.mci.requestid;
        			Regloginuid=invocationResult.faml.request.fldLoginUserId;
        			Regfldjsessionid=invocationResult.faml.response.mci.sessionid;
        			fldRequestId = invocationResult.faml.response.mci.requestid;
        			txnid = invocationResult.faml.response.mci.txnid;
        			loginuid=invocationResult.faml.request.fldLoginUserId;
        			fldjsessionid = sessionid;//invocationResult.faml.request.fldjsessionid;
        			fldSessionId = sessionid;//invocationResult.faml.response.sessioninfo.idsession;
        			fldRemoteAddress=invocationResult.faml.response.mci.remoteaddress;
        			//alert(invocationResult.faml.request.fldjsessionid);
        			//alert(invocationResult.faml.response.sessioninfo.idsession);
        			RegfldFCDBSessionId=sessionid;
        			RegloginFlag="yes";
        		
        			itemdata = invocationResult.faml.response.menuitem;
    	    		
    	    		// gcmId=hdfc_android.getGCMID();
    	    		//alert(gcmId);
                    // setDeviceToken(gcmId);
    	    		
    	        			
        			if(txnid == 'FCP'){
        				//alert("call FCP");
        				
        			  	
        	        	reqParams = {};
        	        	
        	        	reqParams["fldDeviceId"] = fldDeviceId;
        		    	reqParams["fldWebServerId"] = fldWebServerId;
        		    	reqParams["fldAppId"] = fldAppId;
        		    	reqParams["fldAppServerId"] = fldAppServerId;
        		    	reqParams["fldLangId"] = fldLangId;
        		   
        		    	reqParams["fldTxnId"] = "FCP";
        		    	reqParams["fldSessionId"] = sessionid;
        		    	reqParams["fldRequestId"] = fldRequestId;
        		    	reqParams["fldScrnSeqNbr"] = "01";
        		    	reqParams["fldLoginUserId"] = loginuid;
        		    	reqParams["fldLoginCustId"] = loginuid;
        		    	reqParams["fldLoginUserToken"] = "777";
        		    	reqParams["fldLoginUserType"] ="O";
        		    	reqParams["fldLoginUserGroupType"] ="N";

        		    	reqParams["fldLoginUserGroupBaseType"] ="E";
        		    	reqParams["fldTxnLimitFlag"] ="N";
        		    	reqParams["fldAccountMapFlag"] ="N";
        		    	reqParams["fldIdChannel"] ="1";
        		    	reqParams["fldRemoteAddress"] =fldRemoteAddress;
        		    	reqParams["fldExtSessionId"] =sessionid;
        		    	
        		    	
        		    	fldjsessionid = Regfldjsessionid;
        		    	reqParams["fldLoginUserId"] =Regloginuid;
        		    	reqParams["fldSessionId"] = Rsessionid;
        		    	
        		    	
        		    	
        		    	var invocationData = {
        		    			adapter : "API_Adapter",
        		        		procedure : "GetAPICall",
        		        		parameters : [fldjsessionid,reqParams,ipadd],
        		        		compressResponse : true

        		    	};
        		    	//WL.Logger.debug('invoke msg  '+invocationData, '');
        	        	WL.Client.invokeProcedure(invocationData, {
        	        		onSuccess : FCP01Response,
        	        		onFailure : AdapterFail,
        	        		timeout: timeout
        	        	});
        				//window.location="#mymenu";
        			}else{
        				menuview = {};
        				/*setTimeout(function(){
        					//self.getAllMenu();
        					window.location="#mymenu";
        				},300);*/
        				//window.location="#mymenu";
        				MyMenus("");        	        	
                		MmenuList("");
						MpingetsmsNo();
					    
					 	
				
										
        				//self.getAllMenu();
        				
        			}
    	    		
        		}else{
        			busyInd.hide();
        			errmsg = invocationResult.faml.response.rc.errormessage;
        			if(errmsg == undefined){
        				alert(NoDataError);
        			}else{
        				alert(errmsg);
        			}
        			//window.location = "#Mpinlogin";
        		}
				}else{
					busyInd.hide();
        				handleErrorNoResponse();
        			}
				
				}else{
					busyInd.hide();
        			handleErrorNoResponse();
        		}
        	}
        	busyInd.hide();
        };
		
		//set mpin request
		MpinSubmit = function(){
	
        	if($("#Mpin").valid()){
			    Mpin= $('#pin11').val()+""+$('#pin12').val()+""+$('#pin13').val()+""+$('#pin14').val();
				Newpin=$('#pin21').val()+""+$('#pin22').val()+""+$('#pin23').val()+""+$('#pin24').val();
				
			
			    if($('#pin11').val()=="" || $('#pin12').val()=="" || $('#pin13').val()=="" || $('#pin14').val()==""){
					alert('Please Enter 4 digit Quick access pin');
					return false;
			    }
				
				if($('#pin21').val()=="" || $('#pin22').val()=="" || $('#pin23').val()=="" || $('#pin24').val()==""){
					alert('Please Re-Enter 4 digit Quick access pin');
					return false;
			    }
				console.log(Mpin+">>>>>>>>>>>>>>>>>>>"+Newpin);
        		if(Mpin!=Newpin){
				  
				   	alert("Quick access pin entered does not match");
					   $('#pin11').val("");
					   $('#pin12').val("");
					   $('#pin13').val("");
					   $('#pin14').val("");
			      	   $('#pin21').val("");
					   $('#pin22').val("");
					   $('#pin23').val("");
					   $('#pin24').val("");
					return false;
				}
        		/* var $form = $("#Mpin");
    	    	rsaDataArray = $form.serializeArray();    	
    	    	fldjsessionid = Regfldjsessionid; */
    	    	//rsajsonData.push({name: 'wordlist', value: wordlist});
    	    	  fldjsessionid = Regfldjsessionid;  	
    	    	reqParams = {};
    	    	/* for (var i in rsaDataArray) {
    	    		reqParams[rsaDataArray[i].name] = rsaDataArray[i].value;
    	    	} */
				//alert(Mpintempsmsmobno);
    	    	//console.log(imeinumber);
    	    	reqParams["fldDeviceId"] = fldDeviceId;
    	    	reqParams["fldWebServerId"] = fldWebServerId;
    	    	reqParams["fldAppId"] = fldAppId;
    	    	reqParams["fldAppServerId"] = fldAppServerId;
    	    	reqParams["fldLangId"] = fldLangId;
				if(Forgetpin=="Forgetpin"){
				console.log("fldTxnId>>>>>>>>>>>>>>>>>>>FMP")
				reqParams["fldTxnId"] = 'FMP';
				}
				else{
				reqParams["fldTxnId"] = 'MPR';
				}
				
				reqParams["fldScrnSeqNbr"] = '01';
				reqParams["fldLoginUserId"] = Regloginuid01;
				//reqParams["fldosDeviceIdentifier"] = imeinumber;
				//reqParams["fldwlDeviceIdentifier"] = udid.replace(/-/g,'');
				reqParams["flddeviceOS"] = 'Android';
				//reqParams["fldmobileNo"] = Mpintempsmsmobno;
			    reqParams["fldMobileAuthType"] = 'MPIN';
				reqParams["fldMobileAuthSPCS"] = 'MPIN';
			    //reqParams["fldmPin"] = $("#fldmPin").val();
				
				
			//	fldMobileAuthType=MPIN&flddeviceOS=Android&fldWebServerId=YG&fldScrnSeqNbr=01&fldDeviceId=43&fldmPin=9999&fldLoginUserId=50000009&fldTxnId=FMP&fldAppId=RS&fldAppServerId=ZZ&fldLangId=eng&fldwlDeviceIdentifier=996633&fldosDeviceIdentifier=996633
				
				
				
    	    	//console.log(" App version for application "+WL.Client.getAppProperty("APP_VERSION"));
        		version  = WL.Client.getAppProperty("APP_VERSION");
        		reqParams["fldAppversion"] = version;
        		ipadd = '';
				svtk = getSks(Mpin+""+imeinumber+""+Anroidids.replace(/-/g,''));
				svtk = '' + CryptoJS.AES.encrypt(svtk, imeinumber);
				WL.Client.addGlobalHeader('Content-Lanmguage', svtk);
			//	fldAppId=RS&fldTxnId=MPR&fldScrnSeqNbr=01&fldLangId=eng&fldDeviceId=43&fldWebServerId=YG&fldAppServerId=ZZ&fldLoginUserId=50000045&fldmPin=1111&fldosDeviceIdentifier=888882&fldwlDeviceIdentifier=999992&flddeviceOS=Android&fldmobileNo=7474747475&fldMobileAuthType=MPIN 
    	    	busyInd.show();
				WL.Device.getNetworkInfo(function (networkInfo) {
    	    		//console.log(networkInfo.ipAddress); 
    	    		ipadd = networkInfo.ipAddress;
    	    		reqParams["fldAppipAddress"] = ipadd;//'172.21.14.165';
    	    	});
				ps = '' + CryptoJS.AES.encrypt(Mpin, svtk);
				od = '' + CryptoJS.AES.encrypt(imeinumber, svtk);
				localStorage.setItem('ods',od);
				localStorage.setItem('odsts',svtk);
				/*od = localStorage.getItem('ods');
				if(od == null || od == '' || od == undefined || od == 'undefined'){
					od = '' + CryptoJS.AES.encrypt(imeinumber, svtk);
					localStorage.setItem('ods',od);
					localStorage.setItem('odsts',svtk);
				}*/
				
				odd = '' + CryptoJS.AES.encrypt(Anroidids.replace(/-/g,''), svtk);
				mb = '' + CryptoJS.AES.encrypt(Mpintempsmsmobno, svtk); 
				ud = '' + CryptoJS.AES.encrypt(Regloginuid01, svtk);
    	    	var invocationData = {
    	    			adapter : "MPINRegistration",
    	        	    procedure : "RRMPR01",
    	        		parameters : [fldjsessionid,reqParams, ps, od, odd, mb, ud, version,''],
    	        		compressResponse : true
    	    	};
    	    	WL.Logger.debug('invoke msg  '+invocationData, '');
    	    	WL.Client.invokeProcedure(invocationData, {
    	    		onSuccess : MpinSubmitSuccess,
    	    		onFailure : AdapterFail,	    		
    	    		timeout: timeout
    	    	});
        	}
        };
		
		
	MpinSubmitSuccess = function(result){
			invocationResult = result.invocationResult;
					if(invocationResult.isSuccessful) {
						if(invocationResult.faml.response){	
						if(invocationResult.faml.response.rc.returncode == 0){
							localStorage.setItem('lis',Math.random());
							WL.Client.addGlobalHeader('kisd', Math.random());
							Commonsmssend();
							accStmtData(invocationResult.faml);
							
							
							$("#contentData").load("Views/login/set-mpin-success.html", null, function (response, status, xhr) {
								if (status != "error") {}
								
									if(Forgetpin=="Forgetpin"){
									  $("#forgetmpin").show();
									 
									
									}else{
									   $("#forgetmpin").show();
									   
									}
									Forgetpin="";
								// var model = new loginViewModel(param);
							
								 ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
							});
							//Mpinlogout();				
								
						}else if(invocationResult.faml.response.rc.errorcode!=0){
						
						    // alert(invocationResult.faml.response.rc.errorcode);
							   //handleError(invocationResult.faml.response);
							  if(invocationResult.faml.response.rc.errorcode == 110525){
								   alert(invocationResult.faml.response.rc.errormessage);
							  
							   }else if(invocationResult.faml.response.rc.errorcode == 110526){
							    navigator.notification.confirm('You are already linked with different device .Do you want to re-register?',function (iValue){
							   if (iValue == 2){
							  
								window.location="#rrfcp03";
									   
						      }
	                              }, "HDFC BANK", ['Cancel','Ok']);
						      }
							  else if(invocationResult.faml.response.rc.errorcode == 110513){
							   //handleError(invocationResult.faml.response);
							  
								  alert(invocationResult.faml.response.error.errormsg);
							  }
							  else if(invocationResult.faml.response.rc.errorcode!=110525 || invocationResult.faml.response.rc.errorcode != 110526){
							      alert(invocationResult.faml.response.rc.errormessage);
							  }
							  busyInd.hide();
							 
							      //Forgetpin="";
							   $('#pin11').val("");
							   $('#pin12').val("");
							   $('#pin13').val("");
							   $('#pin14').val("");
					      	   $('#pin21').val("");
							   $('#pin22').val("");
							   $('#pin23').val("");
							   $('#pin24').val("");
						}
						else{
				
							handleError(invocationResult.faml.response);
					   $('#pin11').val("");
					   $('#pin12').val("");
					   $('#pin13').val("");
					   $('#pin14').val("");
			      	   $('#pin21').val("");
					   $('#pin22').val("");
					   $('#pin23').val("");
					   $('#pin24').val("");
						}
						}else{
							handleErrorNoResponse();
					   $('#pin11').val("");
					   $('#pin12').val("");
					   $('#pin13').val("");
					   $('#pin14').val("");
			      	   $('#pin21').val("");
					   $('#pin22').val("");
					   $('#pin23').val("");
					   $('#pin24').val("");
						}
			}
			busyInd.hide();
    };
		
		
		
   //set mpin request end 
   
     
   
   //mpin Login
   
      
   
   //mpin Login end 
   
   

		
	//with mobile number 
	
	
	self.Mpinregistration_Submit = function(){
		//alert('Mpinregistration_Submit');
		if($("#registration").valid()){
			var regcustid = $("#customerid1").val();
			tempcustidsms = $("#customerid1").val();
			
			var mobile = $('#Mobile').val();
			Mpintempsmsmobno =mobile;
			Regloginuid01=tempcustidsms;
					//localStorage.setItem("csd",tesmppbkID);
						var params= {
							"custId": booksStore(regcustid),
							"mobileNo": booksStore(mobile)
						};
					WL.Client.addGlobalHeader('SPIDIST', regcustid);	
					busyInd.show();
					var invocationData = {
							adapter : "mPINDebitCardList",
							procedure : "mPassDebitCardListService_executeMPassDebitListService",
							parameters : ['','',params],
							compressResponse : true
					};
					
					WL.Client.invokeProcedure(invocationData, {
						onSuccess : MpinregistrationSuccessold,
						onFailure : AdapterFail,	    		
						timeout: timeout
					});
			
		}
    };
    
	
	MpinregistrationSuccessnew = function(result){
		//alert('MpinregistrationSuccess');
		busyInd.hide();
		invocationResult = result.invocationResult;
		mpinaccountListDebit.removeAll();
		if(invocationResult.isSuccessful){
				if(invocationResult.SessionExpire){
					busyInd.hide();
					alert(invocationResult.SessionExpire.SessionExpireMsg);
					//window.location.hash = '#mPassbook01';
					return false;
				}
			if(invocationResult.Envelope.Body.mPassDebitListResponse.errorCode == "00000"){
				clickhead = "true";
				if(invocationResult.Envelope.Body.mPassDebitListResponse.debitCardNo){
					var temp = invocationResult.Envelope.Body.mPassDebitListResponse.debitCardNo;
					if(Object.prototype.toString.call(temp) === '[object Array]' ) {
						$(temp).each(function(index, obj) {
							var debitmask = temp[index];
							var TransDate = debitmask.substring(0,4)+"xxxxxxxx"+debitmask.substring(12,16);
							mpinaccountListDebit.push({codacctno: TransDate,accountValue: temp[index]});					
						});
					}
					else{
						var debitmask = temp;
						var TransDate = debitmask.substring(0,4)+"xxxxxxxx"+debitmask.substring(12,16);
						mpinaccountListDebit.push({codacctno: TransDate,accountValue: temp});
					}
					
				}
			
			/*	$('.contents').not($(this).next()).slideUp();
				$(this).next().slideToggle();
				$(".head").removeClass("active");	
				$(this).toggleClass("active");
				
				$('#step2').find('.head').addClass('active');
				$('#step2').find('.contents').slideToggle();
				$('#step1succ').show();
				$('#step1').find('.head').css('pointer-events', 'none');
				$('#step3').find('.head').css('pointer-events', 'none');*/
				
			}
			else{
				busyInd.hide();
				if(invocationResult.Envelope.Body.mPassDebitListResponse.errorMessage && invocationResult.Envelope.Body.mPassDebitListResponse.errorMessage !=""){
					alert(invocationResult.Envelope.Body.mPassDebitListResponse.errorMessage);
				}
				else{
					alert("We apologize this facility is temporarily unavailable.Please try later.");
				}
				$("#customerid1").val("");
				$('#Mobile').val("");
			}
		}

	};
      MpinregistrationSuccessold = function(result){
          //alert('MpinregistrationSuccess');
          busyInd.hide();
          RegDDdst01 = result;
          //window.location = '#genVerifyOTP';
         invocationResult = result.invocationResult;
          mpinaccountListDebit.removeAll();
          if(invocationResult.isSuccessful){
              console.log("msg>>>>>>>>>>>"+invocationResult.Envelope.Body.mPassDebitListResponse.errorCode);
              if(invocationResult.SessionExpire){
                  busyInd.hide();
                  customAlert(invocationResult.SessionExpire.SessionExpireMsg);
                  //window.location.hash = '#mPassbook01';
                  return false;
              }
              if(invocationResult.Envelope.Body.mPassDebitListResponse.errorCode == "00000"){
                  
                  clickhead = "true";
                  
                  window.location = '#genVerifyOTP';
                  
                 
              }
              else{
                  busyInd.hide();
                  if(invocationResult.Envelope.Body.mPassDebitListResponse.errorMessage && invocationResult.Envelope.Body.mPassDebitListResponse.errorMessage !=""){
                      customAlert(invocationResult.Envelope.Body.mPassDebitListResponse.errorMessage);
                  }
                  else{
                      customAlert("We apologize this facility is temporarily unavailable.Please try later.");
                  }
                  $("#customerid1").val("");
                  $('#Mobile').val("");
              }
          }
          
      };
		self.Mpinverify_submit = function(){
		if($("#verify").valid()){
			if($('#pin1').val()=="" || $('#pin2').val()=="" || $('#pin3').val()=="" || $('#pin4').val()==""){
				alert('Enter PIN to confirm');
				return false;
			}
			var card_no = $("#fldAcctNo").val();
			var expirydate = ($("#cardExpYear").val().substring(2))+""+$("#cardExpMonth").val();
			var debitpin = $('#pin1').val()+""+$('#pin2').val()+""+$('#pin3').val()+""+$('#pin4').val();
			//alert(card_no+"  "+expirydate+"  "+debitpin);
			var currentdate = new Date(); 
            if((currentdate.getMonth()+1) < 10) {
                var mm = '0'+(currentdate.getMonth()+1);
            }
            else{var mm = currentdate.getMonth()+1;}
            
            if((currentdate.getDate()) < 10) {
                var dd = '0'+currentdate.getDate();
            }
            else{var dd = currentdate.getDate();}
            
            if((currentdate.getHours()) < 10) {
                var HH = '0'+currentdate.getHours();
            }
            else{var HH = currentdate.getHours();}
            
            if((currentdate.getMinutes()) < 10) {
                var Min = '0'+currentdate.getMinutes();
            }
            else{var Min = currentdate.getMinutes();}
            
            if((currentdate.getSeconds()) < 10) {
                var Sec = '0'+currentdate.getSeconds();
            }
            else{var Sec = currentdate.getSeconds();} 
            var TRANSMIT_DATE_TIME = mm+""+dd+""+HH+""+Min+""+Sec;
            var TRAN_TIME = HH+""+Min+""+Sec;
            var TRAN_DATE = mm+""+dd;
            var CAPTURE_DATE = mm+""+dd;
            var TRACE_NUM = Math.floor(Math.random()*900000) + 10000;
            var SEQ_NUM = Math.floor(Math.random()*900000) + 10000;
            busyInd.show();
   
            var params = {
              "sch:PinVerReq": {
                "sch:TRANSMIT_DATE_TIME": TRANSMIT_DATE_TIME,
                "sch:TRACE_NUM": SEQ_NUM,
                "sch:TRAN_TIME": TRAN_TIME,
                "sch:TRAN_DATE": TRAN_DATE,
                "sch:CAPTURE_DATE": CAPTURE_DATE,
                "sch:CARD_NUMBER": card_no,
                "sch:EXPIRY_DATE": expirydate,
                "sch:SEQ_NUM": SEQ_NUM,
                "sch:CONSUMER_NAME": "NB",
                "sch:CRNCY_CDE": "356",
                "sch:ADD_REQ_INFO": {
                  "sch:SOAUSERNAME":"",
				  "sch:SOAPASSWORD":"",
				  "sch:FILLER1":"",
				  "sch:FILLER2":"",
				  "sch:FILLER3":"",
				  "sch:FILLER4":"",
				  "sch:FILLER5":""
                }
              }
            };
            //params1, headers, cn, pn , rndValue
            var invocationData = {
                    adapter : "mPIN_PinVerification",
                    procedure : "PINVERSVC_PINVERREQ",
                    parameters : ['','',booksStore(card_no),booksStore(debitpin),booksStore(TRANSMIT_DATE_TIME),SEQ_NUM,booksStore(TRAN_TIME),booksStore(TRAN_DATE),booksStore(CAPTURE_DATE),booksStore(expirydate),"1"],
                    compressResponse : true
            };
			
            WL.Client.invokeProcedure(invocationData, {
                onSuccess : verify_submitSuccess01, //= function(res){console.log(res);},
                onFailure : AdapterFail, //= function(res){console.log(res);},                
                timeout: timeout
            });
			//$('.verifysucess').show();
			//$('#verify').hide();
		}
	};
	
	verify_submitSuccess01 = function(result){
		invocationResult = result.invocationResult;
		accPinData = invocationResult;// accPinData(invocationResult);
		if(invocationResult.isSuccessful){
			if(invocationResult.SessionExpire){
				busyInd.hide();
				alert(invocationResult.SessionExpire.SessionExpireMsg);
				//window.location.hash = '#mPassbook01';
				return false;
			}
		if(invocationResult.faml.response.Envelope.Body.PinVerResp.ADD_RES_INFO){
			if(invocationResult.faml.response.Envelope.Body.PinVerResp.ADD_RES_INFO.FILLER2 =="SUCCESS"){
				busyInd.hide();
                OTPSuccess(accPinData);
				 // window.location="#genVerifyOTP"; Flow changes
			}
			else{
				busyInd.hide();
				$('#pin1').val("");
					$('#pin2').val("");
						$('#pin3').val("");
							$('#pin4').val("");
				alert(invocationResult.faml.response.Envelope.Body.PinVerResp.ADD_RES_INFO.FILLER2);
			}
		}
		else{
			busyInd.hide();//ADD_RES_INFO
			if(invocationResult.faml.response.Envelope.Body.PinVerResp.ADD_REQ_INFO){
				if(invocationResult.faml.response.Envelope.Body.PinVerResp.ADD_REQ_INFO.FILLER2 == ""){
					alert("We are unable to carry out your instruction, currently. Please try later");
				}
				else{
					alert(invocationResult.faml.response.Envelope.Body.PinVerResp.ADD_REQ_INFO.FILLER2);
				}
			}
			else if(invocationResult.faml.response.Envelope.Body.PinVerResp.ADD_RES_INFO){
				if(invocationResult.faml.response.Envelope.Body.PinVerResp.ADD_RES_INFO.FILLER2 == ""){
					alert("We are unable to carry out your instruction, currently. Please try later");
				}
				else{
					alert(invocationResult.faml.response.Envelope.Body.PinVerResp.ADD_RES_INFO.FILLER2);
				}
			}
			else{
				alert("We are unable to carry out your instruction, currently. Please try later");
			}
		}
	}
		
	};
    
	
	
	
	MpingetsmsNo = function(){
		var randomScalingFactor = function(){ return Math.round(Math.random()*1000000000000)};
		var invocationData = {
                    adapter : "mPassbook_Get_Cust_Mob",
                    procedure : "FLEX_CDI_ConnectMQ",
                    parameters : ['','',booksStore(Regloginuid),randomScalingFactor()],
                    compressResponse : true
            };
           
            WL.Client.invokeProcedure(invocationData, {
                onSuccess : getsmsNoSuccess = function(result){
					console.log(result);
					invocationResult = result.invocationResult;
					if(invocationResult.isSuccessful){
						if(invocationResult.Envelope.Body.customerdetails.custdetails){
							Mpintempsmsname = invocationResult.Envelope.Body.customerdetails.custdetails.namfullcust;
							Mpintempsmsmobno = invocationResult.Envelope.Body.customerdetails.custdetails.mobno;
							window.location="#setmpin";
						}
					}
				},
                onFailure : getsmsNofail2 = function(res){console.log(res);},               
                timeout: 300000
            });
	};
	Commonsmssend = function(){
		var randomScalingFactor = function(){ return Math.round(Math.random()*1000000000000000000)};
		today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; //January is 0!
			var yyyy = today.getFullYear();
			
			if(dd<10) {
				dd='0'+dd
			} 

			if(mm<10) {
				mm='0'+mm
			} 
		var hour    = today.getHours();
		var minute  = today.getMinutes();
		var seconds = today.getSeconds();  
		var datetoday = yyyy+"-"+mm+"-"+dd;
		if(hour<10) {
			hour='0'+hour
		} 
		if(minute<10) {
			minute='0'+minute
		} 
		if(seconds<10) {
			seconds='0'+seconds
		} 
		var time= hour+":"+minute+":"+seconds;
			reqParams = {};
			reqParams["pno"] = "91"+Mpintempsmsmobno;
			reqParams["msgtxt"] = 'Customer';
			reqParams["sdate"] = datetoday+" "+time;
			reqParams["msgid"] = randomScalingFactor();
			reqParams["msgtype"] = "S"; 
			reqParams["COMSMS"] = "COMSMS"; 
			
			var invocationData = {
                    adapter : "mPassbook_SMS_Send",
                    procedure : "getSMS1",
                    parameters : [reqParams],
                    compressResponse : true
            };
           
            WL.Client.invokeProcedure(invocationData, {
                onSuccess : smssendSuccess = function(res){console.log(res);},
                onFailure : smssendfail = function(res){console.log(res);},               
                timeout: 300000
            });
	};

                        
	 /********* force change mpin*********/
	 
	  forceMpinSubmit= function(){
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
				console.log(loginuid+"custid>>>>>>>>>>>>");
				reqParams["fldDeviceId"] = fldDeviceId;
				reqParams["fldWebServerId"] = fldWebServerId;
				reqParams["fldAppId"] = fldAppId;
				reqParams["fldAppServerId"] = fldAppServerId;
				reqParams["fldLangId"] = fldLangId;
				reqParams["fldMobileAuthType"] = "MPIN";
				reqParams["fldSessionId"] = sessionid;
				reqParams["fldRequestId"] = fldRequestId;
				reqParams["fldScrnSeqNbr"] = "02";
				reqParams["fldIdUser"] = loginuid;
				reqParams["fldLoginCustId"] = loginuid;
				reqParams["chkTnC"] = "on";
				reqParams["fldSelRadio"] ="C";
				reqParams["fldTxnId"] ="FCP"
				//reqParams["fldNewPass"] =Newpin
				//reqParams["fldOldPass"] =Mpin;
				fldjsessionid = Regfldjsessionid;
			    //reqParams["fldosDeviceIdentifier"] = imeinumber;
				//reqParams["fldwlDeviceIdentifier"] = Anroidids.replace(/-/g,'');
				reqParams["fldLoginUserId"] =loginuid;		

				svtk = getSks(Mpin+""+imeinumber+""+Anroidids.replace(/-/g,''));
				svtk = '' + CryptoJS.AES.encrypt(svtk, imeinumber);
				WL.Client.addGlobalHeader('Content-Lanmguage', svtk);	
				ps = '' + CryptoJS.AES.encrypt(Mpin, svtk);
				od = '' + CryptoJS.AES.encrypt(Newpin, svtk);
				mb = '' + CryptoJS.AES.encrypt(imeinumber, svtk);
				ud = '' + CryptoJS.AES.encrypt(Anroidids.replace(/-/g,''), svtk);
				
    	    	var invocationData = {
	    			adapter : "MPINRegistration",
	    		    procedure : "ForceChnageMPIN",
	    	        parameters : [fldjsessionid,reqParams, ps, od, '', mb, ud, version,''],
	    			compressResponse : true			    			
	    		};
    	    	//WL.Logger.debug('invoke msg  '+invocationData, '');
    	    	WL.Client.invokeProcedure(invocationData, {
    	    		onSuccess : forcempinsubmitSuccess,
    	    		onFailure : AdapterFail,	    		
    	    		timeout: timeout
    	    	});
        	
        };
		
	forcempinsubmitSuccess = function(result){
	    	//console.log('inside the rrcsi02 response');
	    	busyInd.hide();
	    	invocationResult = result.invocationResult;
	    	if(invocationResult.isSuccessful) {
	    		if(invocationResult.faml.response){	
	    		if(invocationResult.faml.response.rc.returncode == 0){
	    	             MpinLogout();
	    				
	    		}else{
				    
	    			 if(invocationResult.faml.response.rc.errorcode == 10049){
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
					 }else{
					  alert(invocationResult.faml.response.rc.errormessage);
					 }
						
	    		}
	    	}
	    }
	 };
		
		
	 // end force change mpin
		

		
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
	    		        			alert("The Quick Access PIN has been changed successfully. Please re-login using your new Quick Access PIN.");
	    		        			
	    		        			Rsessionid="";
	    		        			Regfldjsessionid="";
	    		        			Regloginuid="";
	    		        			RegfldRequestId="";
	    		        			RegfldFCDBSessionId="";
	    		        			RegloginFlag="no";
	    		        			
	    		        			$(".h_title").html("Login Method");
        			                window.location = "#loginmethod";
	    		        		}else{
	    		        			errmsg = invocationResult.faml.response.rc.errormessage;
	    		        			alert(errmsg);
	    		        			$(".h_title").html("Login Method");
        			                window.location = "#loginmethod";
	    		        		}
	    		        	}
	    					busyInd.hide();
	     };
		 
		 
	
	 /********* end mpin logot *********/

   
	 	   
	 /********* forget  mpin *********/ 
			this.forgetmpin = function (){
				busyInd.show();
				reqParams = {};
				reqParams["fldDeviceId"] = fldDeviceId;
				reqParams["fldWebServerId"] = fldWebServerId;
				reqParams["fldAppId"] = fldAppId;
				reqParams["fldAppServerId"] = fldAppServerId;
				reqParams["fldLangId"] = fldLangId;
				reqParams["fldMobileAuthType"] = "MPIN";
				reqParams["fldScrnSeqNbr"] = "01";
				reqParams["fldTxnId"] ="FMP"
				reqParams["fldmPin"] ="";
				reqParams["fldosDeviceIdentifier"] = imeinumber;
				reqParams["fldwlDeviceIdentifier"] = udid.replace(/-/g,'');
				reqParams["flddeviceOS"] ="Android";
				fldjsessionid = Regfldjsessionid;
				reqParams["fldLoginUserId"] ="";	
//fldMobileAuthType=MPIN&flddeviceOS=Android&fldWebServerId=YG&fldScrnSeqNbr=01&fldDeviceId=43&fldmPin=9999&fldLoginUserId=50000009&fldTxnId=FMP&fldAppId=RS&fldAppServerId=ZZ&fldLangId=eng&fldwlDeviceIdentifier=996633&fldosDeviceIdentifier=996633				
    	    	var invocationData = {
    	    			adapter : "MPINRegistration",
    	        	    procedure : "RRLGN01",
    	        		parameters : [fldjsessionid,reqParams,ipadd],
    	        		compressResponse : true
    	    	};
    	    	//WL.Logger.debug('invoke msg  '+invocationData, '');
    	    	WL.Client.invokeProcedure(invocationData, {
    	    		onSuccess : forgetmpinSuccess,
    	    		onFailure : AdapterFail,	    		
    	    		timeout: timeout
    	    	});
				
											
			}; 
		 //fldMobileAuthType=MPIN&flddeviceOS=Android&fldWebServerId=YG&fldScrnSeqNbr=01&fldDeviceId=43&fldmPin=9999&fldLoginUserId=50000009&fldTxnId=FMP&fldAppId=RS&fldAppServerId=ZZ&fldLangId=eng&fldwlDeviceIdentifier=996633&fldosDeviceIdentifier=996633
		 
		 
		 
		forgetmpinSuccess = function(result){
	      invocationResult = result.invocationResult;
	    		if(invocationResult.isSuccessful) {
	    		    	if(invocationResult.faml.response.rc.returncode == 0){
	    		        	alert("Change Password Done Successfully.");
	    		        	window.location = "#MpinRegister";
	    		        }else{
	    		        	 errmsg = invocationResult.faml.response.rc.errormessage;
	    		        		alert(errmsg);
	    		        		//window.location = "#MpinRegister";
	    		        	}
	    		        }
	    					busyInd.hide();		        	
	    		        	
	    };
		
		   
	 /*********change   mpin	 *********/
		changempin = function (){
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
				reqParams["fldNewPass"] ="4444";
				reqParams["fldOldPass"] = "1111";
			
				fldjsessionid = Regfldjsessionid;
				reqParams["fldLoginUserId"] =Regloginuid;		      
    	    	var invocationData = {
    	    			adapter : "MPINRegistration",
    	        	    procedure : "RRLGN01",
    	        		parameters : [fldjsessionid,reqParams,ps,od,odd,version,'',odsts],
    	        		compressResponse : true
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
	    			errmsg = invocationResult.faml.response.rc.errormessage;
	    			handleError(invocationResult.faml.response);
	    		}
	    		}
	    	}
	    };
		 /*********change   mpin	end **********/	
		 
		 
		 /******* new mpin submit ********/
		  
		  
		NewMpinSubmit= function(){
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
				reqParams["fldScrnSeqNbr"] = "01";
				reqParams["fldTxnId"] ="MPR"
				//reqParams["fldmPin"] =Newpin
				//reqParams["fldOldmPin"] =Mpin;
				//reqParams["fldmobileNo"] =Mpintempsmsmobno;
				//reqParams["fldosDeviceIdentifier"] = imeinumber;
				//reqParams["fldwlDeviceIdentifier"] = Anroidids.replace(/-/g,'');
				
				reqParams["flddeviceOS"] ='Android';
				fldjsessionid = Regfldjsessionid;
				reqParams["fldLoginUserId"] =Regloginuid01;	
				
				svtk = getSks(Mpin+""+imeinumber+""+Anroidids.replace(/-/g,''));
				svtk = '' + CryptoJS.AES.encrypt(svtk, imeinumber);
				WL.Client.addGlobalHeader('Content-Lanmguage', svtk);
				ps = '' + CryptoJS.AES.encrypt(Newpin, svtk);
				od = '' + CryptoJS.AES.encrypt(Mpin, svtk);
				odd = '' + CryptoJS.AES.encrypt(Mpintempsmsmobno, svtk);
				mb = '' + CryptoJS.AES.encrypt(imeinumber, svtk); 
				ud = '' + CryptoJS.AES.encrypt(Anroidids.replace(/-/g,''), svtk);
    	    	var invocationData = {
    	    			//adapter : "Accounts",
    	        		//procedure : "RSVUA01",
    	        		//parameters : [fldjsessionid,reqParams,ipadd]
						adapter : "MPINRegistration",
    	        	    procedure : "NewChangeMPIN",
    	        		parameters : [fldjsessionid,reqParams, ps, od, odd, mb, ud, '',''],
    	    	};
				
    	    	//WL.Logger.debug('invoke msg  '+invocationData, '');
    	    	WL.Client.invokeProcedure(invocationData, {
    	    		onSuccess : NewMpinSubmitSuccess,
    	    		onFailure : AdapterFail,	    		
    	    		timeout: timeout
    	    	});
        	
        };
		
        NewMpinSubmitSuccess = function(result){
	    	//console.log('inside the rrcsi02 response');
	    	busyInd.hide();
	    	invocationResult = result.invocationResult;
	    	if(invocationResult.isSuccessful) {
	    		if(invocationResult.faml.response){	
	    		if(invocationResult.faml.response.rc.returncode == 0){
	    	             
						   
						   	$("#contentData").load("Views/login/set-mpin-success.html", null, function (response, status, xhr) {
								if (status != "error") {}
								
									if(Forgetpin=="Forgetpin"){
									  $("#forgetmpin").show();
									 
									
									}else{
									   $("#forgetmpin").show();
									   
									}
									Forgetpin="";
								// var model = new loginViewModel(param);
							
								 ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
							});
	    				
	    		}else{
				    if(invocationResult.faml.response.rc.errorcode==110513){
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
					  return;
					}
					else{
	    			errmsg = invocationResult.faml.response.rc.errormessage;
	    			handleError(invocationResult.faml.response);
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
	    		}
	    		}
	    	}
	    };
		 
		 
		 /*******  end new mpin submit ******/
};


      	   
        