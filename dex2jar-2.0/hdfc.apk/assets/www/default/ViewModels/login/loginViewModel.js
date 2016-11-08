  var loginViewModel = function () {
	  	var versionUrl = '';
        var self = this;
        self.tesmprespo= ko.observable();
        this.MnuFormSubmit = function(foliodet){
        	//console.log('Mrnu description ');
        	//console.log(foliodet.menudesc);
        	//console.log(foliodet.txnid);
        	txnid = foliodet.txnid;
            //self.selectedFolio({currfoliono: foliodet.folio_no, valuation: foliodet.valuation, accountType: foliodet.account_type, accountTypeDesc: foliodet.account_type_desc   });
          //  window.location = "#folioSummary";
        	document.getElementById("fldRequestId").value = "RR"+txnid+"01";
        	document.getElementById("fldTxnId").value = txnid;
        	if(txnid == "ASR" || txnid == "CBR" || txnid == "FTR") {
        		document.getElementById("fldScrnSeqNbr").value = "01";
        		document.getElementById("fldRequestId").value = "RR"+txnid+"02";
        	}
        	else if(txnid == "EMR") {
        		document.getElementById("fldScrnSeqNbr").value = "01";
        		document.getElementById("fldRequestId").value = "RR"+txnid+"03";
        	} 
        	else if(txnid == "TPT") {
        		document.getElementById("fldScrnSeqNbr").value = "03";
        		document.getElementById("fldRequestId").value = "RR"+txnid+"03";
        	}
        	else if(txnid == "TPN") {
        		document.getElementById("fldScrnSeqNbr").value = "01";
        		document.getElementById("fldRequestId").value = "RR"+txnid+"04";
        		document.getElementById("fldBenefType").value = "NEFT";
        	}
        	//console.log("#RR"+foliodet.txnid+document.getElementById("fldScrnSeqNbr").value);
			if(txnid == "LOA"){
        		window.location = "#fdSummary";
        	}
        	else if(txnid == "RDS"){
        		window.location = "#rdSummary";
        	}
        	else if(txnid == "FTR"){
        		window.location = "#rrftr02";
        	}
			else if(txnid == "ASM"){
        		window.location = "#accountSummary";
        	}else if(txnid == "CBR"){
        		window.location = "#rrcbr02";
        	}else if(txnid == "EMR"){
        		window.location = "#rremr03";
        	}else if(txnid == "ASR"){
        		window.location = "#rrasr02";
        	}
			else if(txnid == "UCR"){
        		window.location = "#rrcrs01";
        	}
			else if(txnid == "BMR"){
        		window.location = "#rrmr01";
        	}
			else if(txnid == "DTH"){
        		window.location = "#rdthr01";
        	}
			else if(txnid == "BMP"){
        		window.location = "#rrpmb01";
        	}
			else if(txnid == "BDP"){
        		window.location = "#rrdth01";
        	}
			//New Section Added
			else if(txnid == "UAB"){
        		window.location = "#rruab01";
        	}
			else if(txnid == "UVB"){
        		window.location = "#rruvb01";
        	}
			else if(txnid == "UPH"){
        		window.location = "#rruph01";
        	}
			else if(txnid == "UAP"){
        		window.location = "#rruap01";
        	}
			else if(txnid == "UVP"){
        		window.location = "#rruvp01";
        	}
			
			//New Section Added End
			else if(txnid == "APR"){
				
				var model = new CreditViewModel();
				checkhash= "#rrapr00";
		        model.getCreditSummaryhash();
		   	
        	}else if(txnid == "UPD"){
        		var model = new CreditViewModel();
				checkhash= "#rrupd00";
		        model.getCreditSummaryhash();
        		
        	
            }else if(txnid == "ACI" ||txnid == "UNB" || txnid == "EST" || txnid == "PCR"|| txnid == "APD" || txnid == "CDC" || txnid == "CCP" || txnid == "CAC"){
            	var model = new CreditViewModel();
				checkhash= ("#RR"+txnid+"01").toLowerCase();
		        model.getCreditSummaryhash();
    	
    	    }
			
        	else{
        	window.location = ("#RR"+txnid+document.getElementById("fldScrnSeqNbr").value).toLowerCase();
			}
          };
        this.getAllMenu = function(){
        	
        	if(!MmenuList()){
        	

        	reqParams = {};
        	
        	reqParams["fldDeviceId"] = fldDeviceId;
	    	reqParams["fldWebServerId"] = fldWebServerId;
	    	reqParams["fldAppId"] = fldAppId;
	    	reqParams["fldAppServerId"] = fldAppServerId;
	    	reqParams["fldLangId"] = fldLangId;
	    	
	    	reqParams["fldTxnId"] = "MNU";
	    	reqParams["fldSessionId"] = fldSessionId;
	    	reqParams["fldRequestId"] = fldRequestId;
	    	reqParams["fldScrnSeqNbr"] = "09";
	    	
	    	
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
        		onSuccess : MNU01Response,
        		onFailure : AdapterFail,
        		timeout: timeout
        	});
        	
        	}else{      
        		busyInd.hide();
			
        		window.location = "#mymenu";
        		
        	}
        	
        };
        function SetskinUser(Cust_Type){
			if(Cust_Type == 'classic'){
        		$('.h_title').addClass('classic_h_title');
        		$('.logo img').hide();
        		$('.logo').addClass('classic_logo');
				$('.logout').addClass('classic_logout');
				$('.footer_nav').addClass('classic_footer');
				$('.footer_nav li').addClass('classic_footer_bg');
				$('.back .back').addClass('classic_back');
				
				$('.dark_header').css({ background: '#adcdec !important' });
				$("#usertypecss").attr("href","css/classic.css");
        	}
        	if(Cust_Type == 'imperia'){
        		$('.h_title').addClass('Imp_h_title');
        		$('.logo img').hide();
        		$('.logo').addClass('Imp_logo');
				$('.logout').addClass('Imp_logout');
        		$('.footer_nav a').addClass('Imp_footer');
        		$('.footer_nav li').addClass('Imp_footer_bg');
				$('.back .back').addClass('Imp_back');
				
				$('.dark_header').css({ background: '#f8e6cc !important' });
				$("#usertypecss").attr("href","css/imperia.css");
        	}
        	if(Cust_Type == 'preferred'){
        		$('.h_title').addClass('Pref_h_title');
        		$('.logo img').hide();
        		$('.logo').addClass('Pref_logo');
				$('.logout').addClass('Pref_logout');s
        		$('.footer_nav a').addClass('Pref_footer');
        		$('.footer_nav li').addClass('Pref_footer_bg');
				$('.back .back').addClass('Pref_back');
				
				$('.dark_header').css({ background: '#f9f2af !important' });
				$("#usertypecss").attr("href","css/preferred.css");
        	}
        	if(Cust_Type == 'default'){
        	$("#usertypecss").attr("href","css/default_user.css");
        	}
		}
        MNU01Response = function(result){
        	//MyMenus.removeAll();
        	remove_theme();
        	
        	invocationResult = result.invocationResult;
        	Cust_Type = invocationResult.faml.response.css[0].perscss;
			if(invocationResult.faml.response.fldLoginUserCss){
                VideoFLG = invocationResult.faml.response.fldLoginUserCss;
                localStorage.setItem("VideoFLG", invocationResult.faml.response.fldLoginUserCss);
            
            }
			
			localStorage.setItem("Customer_Type", Cust_Type);
			
			 /* if (localStorage.clickcount) {
				localStorage.clickcount = Number(localStorage.clickcount) + 1;
				SetskinUser(localStorage.cstTyp);
				if(Number(localStorage.clickcount) % 3 == 0){
						localStorage.cstTyp = Cust_Type;
						SetskinUser(Cust_Type);
				}
				//alert('localStorage1 '+localStorage.clickcount);
			} else {
				localStorage.clickcount = 1;
				localStorage.cstTyp = Cust_Type;
				SetskinUser(Cust_Type);
				//alert('localStorage2 '+localStorage.clickcount);
			}  */
			SetskinUser(Cust_Type);
			/* if (localStorage.cstTyp) {
				console.log('Do nothing');
			}else {
				 SetskinUser(localStorage.cstTyp);
				 console.log('Do local storgae');
			}
        	if (localStorage.clickcount) {
				localStorage.clickcount += ","+Cust_Type;
                var arrs = localStorage.clickcount;
                myArray = arrs.split(',');
                var uniqueNames = [];   
						$.each(myArray , function(i, el){
							uniqueNames.push(el);
						});
                
				if(uniqueNames.length==3){
						if(uniqueNames[uniqueNames.length-1]==uniqueNames[uniqueNames.length-2]){
								console.log('same');
								var newCid =  uniqueNames[uniqueNames.length-1];
                                uniqueNames.length = 0;
								localStorage.clickcount = newCid;
								uniqueNames.push( newCid );
								SetskinUser(Cust_Type);
								localStorage.cstTyp = Cust_Type;
						}
				}
                if(uniqueNames.length>=2){
                       console.log(uniqueNames[uniqueNames.length-1]+" "+uniqueNames[uniqueNames.length-2]);
                       if(uniqueNames[uniqueNames.length-1]!=uniqueNames[uniqueNames.length-2]){ 
							   console.log('differ');
                               var newCid =  uniqueNames[uniqueNames.length-1];
							   uniqueNames.length = 0;
							   localStorage.clickcount = newCid;
							   uniqueNames.push( newCid );
							   
							}
						SetskinUser(localStorage.cstTyp);	
                 }
				
				alert('localStorage2 '+localStorage.clickcount+" array "+uniqueNames);
			} else {
						localStorage.clickcount = Cust_Type;
                        SetskinUser(Cust_Type);
                        localStorage.cstTyp = Cust_Type;
						alert('localStorage2 '+localStorage.clickcount);
			} */
        	
        		MyMenus(invocationResult.faml);    
				MmenuList11.removeAll();
        		MmenuList2.removeAll();
        		MmenuList3.removeAll();
        		MmenuList4.removeAll();
        		MmenuList5.removeAll();
        		MmenuList6.removeAll();
        		MmenuList7.removeAll();
        		MmenuList8.removeAll();
        		MmenuList9.removeAll();				
        		//MmenuList(invocationResult.faml.response.menuitem);
        		$.each( invocationResult.faml.response.menuitem, function( key, val ) {
					if(val.token2 == 'mymenu'){
					    
						if(val.txnid == 'ASM' || val.txnid == 'SIN' || val.txnid == 'CSS' || val.txnid == 'EMD' || val.txnid == 'EMR' || val.txnid == 'HIQ' || val.txnid == 'FDL' || val.txnid == 'ASR' || val.txnid == 'CBR' || val.txnid == 'SCH' || val.txnid == 'SUS' || val.txnid == 'TXI' || val.txnid == 'CSI' || val.txnid == 'LOA' || val.txnid == 'RDS' || val.txnid == 'FTR' || val.txnid == 'FDR' || val.txnid == 'RDO' || val.txnid == 'FSS' || val.txnid == 'PFC' || val.txnid == 'RFX'){
								MmenuList11.push({txnid: val.txnid, menudesc: val.menudesc});
						}
						if(val.txnid == 'BLP' || val.txnid == 'UCR' || val.txnid == 'BMR' || val.txnid == 'DTH' || val.txnid == 'BMP' || val.txnid == 'BDP' || val.txnid == 'UAB' || val.txnid == 'UVB' || val.txnid == 'UPH' || val.txnid == 'UAP' || val.txnid == 'UVP'){
								MmenuList2.push({txnid: val.txnid, menudesc: val.menudesc});
						}
						if(val.txnid == 'TPT' || val.txnid == 'TPN' || val.txnid == 'TPI' || val.txnid == 'TPV' || val.txnid == 'CPQ' || val.txnid == 'VMT' || val.txnid == 'MPE' || val.txnid == 'IFT' || val.txnid == 'VFT' || val.txnid == 'P2A' || val.txnid == 'MMG' || val.txnid == 'MMR' || val.txnid == 'MMC'){
								MmenuList3.push({txnid: val.txnid, menudesc: val.menudesc});
						}
						if(val.txnid == 'ACS' || val.txnid == 'ACI' || val.txnid == 'CCP' || val.txnid == 'UNB' || val.txnid == 'UPD' || val.txnid == 'CAC' || val.txnid == 'EST' || val.txnid == 'PCR' || val.txnid == 'APR' || val.txnid == 'CDC' || val.txnid == 'APD'){
							MmenuList4.push({txnid: val.txnid, menudesc: val.menudesc});
						}
						if(val.txnid == 'CPW' || val.txnid == 'CAD'){
							MmenuList5.push({txnid: val.txnid, menudesc: val.menudesc});
						}
						if(val.txnid ==  'WCM' || val.txnid ==  'IPB' || val.txnid ==  'VPR' || val.txnid ==  'OBU' || val.txnid ==  'ORE' || val.txnid ==  'OSW' || val.txnid ==  'SIP' || val.txnid ==  'SRP' || val.txnid ==  'TXA' || val.txnid ==  'SWP' || val.txnid ==  'STP' || val.txnid ==  'OST'){
							MmenuList6.push({txnid: val.txnid, menudesc: val.menudesc});
						}
						if(val.txnid == 'DPL' || val.txnid == 'HLD' || val.txnid == 'DPQ' || val.txnid == 'DTS' || val.txnid == 'DMQ' || val.txnid == 'DIQ' || val.txnid == 'DCQ'){
								MmenuList7.push({txnid: val.txnid, menudesc: val.menudesc});
						}
						if(val.txnid == 'ALT' || val.txnid == 'ALM'){
								MmenuList8.push({txnid: val.txnid, menudesc: val.menudesc});
						}
						if(val.txnid == 'DCE' || val.txnid == 'DCL'){
								MmenuList9.push({txnid: val.txnid, menudesc: val.menudesc});
						}
					}
          		  });
				 MmenuList(invocationResult.faml.response.menuitem);
        	/*	$.each( invocationResult.faml.response.menuitem, function( key, val ) {
        			if(val.token2=='mymenu')
          		   console.log( "Mymenu<li id='" + key + "'>" + val.menudesc + "</li>" );
          		   //MmenuList 
          		  });
        		*/     		 
        		busyInd.hide();
        		window.location = "#mymenu";
        		
        	/**/
        };
        custIdSubmit = function(){
        	
        	if($("#frmLogin").valid()){
        		
        		var $form = $("#frmLogin");
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
    	    		onSuccess : CustIdSuccess,
    	    		onFailure : AdapterFail,	    		
    	    		timeout: timeout
    	    	});
        	}
        };
        
        
        function checkButtonSelection2(iValue){
       	 if (iValue == 1){
       		tesmprespo1 = accStmtData();
       		//tesmprespo1 = result.invocationResult; 
       		//tesmprespo1=self.tesmprespo();
       		//alert(tesmprespo1.statusCode);
       		rsaenrollReq = tesmprespo1.fldRsaEnrollRequired;
       		//alert(tesmprespo1.statusCode)
			secImg = tesmprespo1.fldRsaImagePath;
			secText = tesmprespo1.fldRsaUserPhrase;
			loginuid = tesmprespo1.loginUser;    	
			
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
			
			responseData(tesmprespo1);
			window.location = "#loginCustPass";
       	 } 
       	  }
        
        function checkButtonSelection(iValue){
      	  if (iValue == 2){
      		  //console.log('inside upgrade');
      		window.open(versionUrl, '_system');  
      	      }
      	  else if(iValue == 1){
      		navigator.notification.confirm(
			          "Dear Customer, Remember to upgrade your App to get the New Transactions.",
			          checkButtonSelection2,
			          'Message',
			          'OK');
      	  }
      	  }
        
        function checkButtonSelection1(iValue){
        	 if (iValue == 1){
        		  //console.log('inside upgrade');
        		window.open(versionUrl, '_system');  
        	 } 
        	  }
      /*************/
      
       CustIdSuccess = function(result){
    	  
			 var invocationData = {
												adapter : "CC_Stp",
												procedure : "CCSTPLink",
												parameters : [""],
												compressResponse : true
										};
	                             	WL.Logger.debug('invoke msg  '+invocationData, '');
	    	
									WL.Client.invokeProcedure(invocationData, {
										onSuccess : function CPSuccess(CPres){
											if(CPres.invocationResult.isSuccessful) {
												CCStpurl = CPres.invocationResult.urls;
												console.log('CC stp link'+CCStpurl);
												//alert('CP banner from adapter  '+cpbannerurl);
											}
										},
										onFailure : function AdapterCPFail(){
											
										},	    		
										timeout: timeout
									});
        	invocationResult = result.invocationResult;        	
        	
        	if(invocationResult.isSuccessful) {
        		if(invocationResult.faml.response){
                   Customer_Id_Video = invocationResult.faml.response.loginUser;
    			    svt = invocationResult.faml.Servlet;
			    	svts = invocationResult.faml.rskServlet;
                   // console.log("Servlet Indicater "+svt);
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
        	    			window.location = "#loginCustPass";
        	    		}else{
    	    		
    	    			handleError(invocationResult.faml.response);
                            window.location = "#loginmethod";
    	    		}
        				
        			} 
    	    		else{
    	    			
    	    			handleError(invocationResult.faml.response);
                        window.location = "#loginmethod";
    	    		}
        		}else{
        		 alert("We apologize this facility is temporarily unavailable.Please try later. ");
        			window.location = "#loginmethod";
        		}
        	}
        	busyInd.hide();
        };
        
        self.showCustDetails = function(){
        	
        	
        	custData = responseData();
        	if(custData.faml!=undefined){
           	fldRsaUserStatus = custData.faml.response.fldRsaUserStatus;
        	fldRsaImagePath = custData.faml.response.fldRsaImagePath;
        	fldTptCustomer = custData.faml.response.fldTptCustomer;
        	fldRsaImageWidth = custData.faml.response.fldRsaImageWidth;
			fldRsaImageText = custData.faml.response.fldRsaImageText;
			fldRsaUserPhrase = custData.faml.response.fldRsaUserPhrase;
			fldRsaImageHeight = custData.faml.response.fldRsaImageHeight;
			fldRsaImageId = custData.faml.response.fldRsaImageId;
			fldRsaEnrollRequired = custData.faml.response.fldRsaEnrollRequired;
			fldDeviceTokenFSO = custData.faml.response.fldDeviceTokenFSO;
			fldloginUser=custData.faml.response.loginUser;
			Regloginuid=fldloginUser;
			
		
			$("#fldRsaUserStatus").val(fldRsaUserStatus);
			$("#fldRsaImagePath").val(fldRsaImagePath);
			$("#fldTptCustomer").val(fldTptCustomer);
			$("#fldRsaImageWidth").val(fldRsaImageWidth);
			$("#fldRsaImageText").val(fldRsaImageText);
			$("#fldRsaUserPhrase").val(fldRsaUserPhrase);
			$("#fldRsaImageHeight").val(fldRsaImageHeight);
			$("#fldRsaImageId").val(fldRsaImageId);
			$("#fldRsaEnrollRequired").val(fldRsaEnrollRequired);
			$("#fldDeviceTokenFSO").val(fldDeviceTokenFSO);
        }
        else{
        	
         	fldRsaUserStatus = custData.fldRsaUserStatus;
        	fldRsaImagePath = custData.fldRsaImagePath;
        	fldTptCustomer = custData.fldTptCustomer;
        	fldRsaImageWidth = custData.fldRsaImageWidth;
			fldRsaImageText = custData.fldRsaImageText;
			fldRsaUserPhrase = custData.fldRsaUserPhrase;
			fldRsaImageHeight = custData.fldRsaImageHeight;
			fldRsaImageId = custData.fldRsaImageId;
			fldRsaEnrollRequired = custData.fldRsaEnrollRequired;
			fldDeviceTokenFSO = custData.fldDeviceTokenFSO;
			fldloginUser=custData.loginUser;
			Regloginuid=fldloginUser;
			
			$("#fldRsaUserStatus").val(fldRsaUserStatus);
			$("#fldRsaImagePath").val(fldRsaImagePath);
			$("#fldTptCustomer").val(fldTptCustomer);
			$("#fldRsaImageWidth").val(fldRsaImageWidth);
			$("#fldRsaImageText").val(fldRsaImageText);
			$("#fldRsaUserPhrase").val(fldRsaUserPhrase);
			$("#fldRsaImageHeight").val(fldRsaImageHeight);
			$("#fldRsaImageId").val(fldRsaImageId);
			$("#fldRsaEnrollRequired").val(fldRsaEnrollRequired);
			$("#fldDeviceTokenFSO").val(fldDeviceTokenFSO);
        	
        }
        };
        
        self.custIdPassSubmit = function(){
        	if($("#frmLoginPass").valid()){
    	    	busyInd.show();
    	    	upass = document.getElementById('upass').value;
    	    	
    	    	
    	    	var $form = $("#frmLoginPass");
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
    	    	reqParams["fldencp"] = "LandID";
				reqParams["fldencps"] = "DeviceID";
    	    	ipadd = '';
    	   		 WL.Device.getNetworkInfo(function (networkInfo) {
    	    		//console.log(networkInfo.ipAddress); 
    	    		ipadd = networkInfo.ipAddress;
    	    		reqParams["fldAppipAddress"] = networkInfo.ipAddress;
    	    	});
				//fldp = getBStories(fldp,svts);
				var encrypted = '' + CryptoJS.AES.encrypt(fldp, svts);
				//console.log("Encrpted password in code "+encrypted);
				//console.log("Encrpted password in code "+fldp);
    	    	var invocationData = {
    	    			adapter : "API_Adapter",
    	        		procedure : "GetAPICallPass1",
    	        		parameters : [fldjsessionid,reqParams,encrypted,uid,ipadd],
    	        		compressResponse : true
    	    	};
    	    	//WL.Logger.debug(invocationData, '');
    	    	
    	    	WL.Client.invokeProcedure(invocationData, {
    	    		onSuccess : CustIdPassSuccess,
    	    		onFailure : AdapterFail,	    		
    	    		timeout: timeout
    	    	});
        	}
        };
        
        CustIdPassSuccess = function(result){
         
			
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
    	    		
    	    		 gcmId=hdfc_android.getGCMID();
    	    		//alert(gcmId);
                     setDeviceToken(gcmId);
    	    		
	                loggedinuser = true;
    	        			
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
						if(applicationFormForCredit==1){
						  //Details of customer
						    custid="";
							cFName="";
							cMName="";
							cLName="";
							cDOB="";
							cMNos="";
							cEmail="";
							cAdd1="";
							cAdd2="";
							cAdd3="";
							cCity="";
							cpin="";
							cpan="";
							cUID="";
							cGender="";  
							
							
							//alert("getContactDetails");
							busyInd.show();	
							
							var randomScalingFactor = function(){ return Math.round(Math.random()*1000000000000)};
							var invocationData = {
										adapter : "GetCheckMobCust",
										procedure : "FLEX_CDI_ConnectMQ",
										parameters : ['','',booksStore(Regloginuid),randomScalingFactor()],
										compressResponse : true
							};
   
							WL.Client.invokeProcedure(invocationData, {
								onSuccess : getsmsNoSuccess = function(result){
									console.log(JSON.stringify(result));
									invocationResult = result.invocationResult;
									if(invocationResult.isSuccessful){
									    var key = CryptoJS.enc.Utf8.parse("Ym3N3ku7wavUzteFwThHfeHujdTxEJWL");
										var iv = CryptoJS.enc.Utf8.parse("q9LJ6p9juUJRZNWV");
										var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
										
										if(invocationResult.Envelope.Body.customerdetails.custdetails){
											cFullName = invocationResult.Envelope.Body.customerdetails.custdetails.namfullcust;
											custid=Regloginuid;
											cFullName=cFullName.split(" ");
											console.log(cFullName.length);
											if(cFullName.length==3){
												cFName=cFullName[0];
												cMName=cFullName[1];
												cLName=cFullName[2];
											}
											if(cFullName.length==2){
												cFName=cFullName[0];
												cMName=cFullName[1];
												cLName="";
											}
											if(cFullName.length==1){
												cFName=cFullName[0];
												cMName="";
												cLName="";
											}
											mobileno = invocationResult.Envelope.Body.customerdetails.custdetails.mobno;
											
										    if(mobileno.length==13 ||mobileno.length==12){
										      console.log( mobileno.substring(3, 13))
											 if(mobileno.length==13){
										     cMNos=mobileno.substring(3, 13);
											 }else if(mobileno.length==12){
											 cMNos=mobileno.substring(2, 13);
											 }
											}else{
											 cMNos=mobileno;
											}
											cpan=invocationResult.Envelope.Body.customerdetails.custdetails.pancardno;
											cDOB=invocationResult.Envelope.Body.customerdetails.custdetails.dob;
											//cMNos=invocationResult.faml.response.customer.mobileno;
											
											cEmail=invocationResult.Envelope.Body.customerdetails.custdetails.email;
											cAdd1=invocationResult.Envelope.Body.customerdetails.custdetails.address.address1;
										
											cAdd2=invocationResult.Envelope.Body.customerdetails.custdetails.address.address2;
											cAdd3=invocationResult.Envelope.Body.customerdetails.custdetails.address.address3;
											cCity=invocationResult.Envelope.Body.customerdetails.custdetails.address.city;
											cpin=invocationResult.Envelope.Body.customerdetails.custdetails.address.zipcode;
											
											cUID="";
											cGender="";
											
								     busyInd.hide();	
									 
                                    var FNameText = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(cFName), key,{keySize: 128 / 4,iv: iv,mode: CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7});
									
									
									encodeFNameText=FNameText.toString();
	                                Cfname=Base64.encode(encodeFNameText);
									 
									
									var MNameText = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(cMName), key,{keySize: 128 / 4,iv: iv,mode: CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7});
									
									encodeMNameText=MNameText.toString();
	                                Cmname=Base64.encode(encodeMNameText);
									
									
									var LNameText = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(cLName), key,{keySize: 128 / 4,iv: iv,mode: CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7});
									
									encodeLNameText=LNameText.toString();
	                                CLname=Base64.encode(encodeLNameText);
								
									
									var DOBText = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(cDOB), key,{keySize: 128 / 4,iv: iv,mode: CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7});
									
									encodeDOBText=DOBText.toString();
	                                CDob=Base64.encode(encodeDOBText);
									
									var MNOText = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(cMNos), key,{keySize: 128 / 4,iv: iv,mode: CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7});
									
									encodeMNOText=MNOText.toString();
	                                CMobile=Base64.encode(encodeMNOText);
									
									var EmailText = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(cEmail), key,{keySize: 128 / 4,iv: iv,mode: CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7});
									
									encodeEmailText=EmailText.toString();
	                                CEmail=Base64.encode(encodeEmailText);
									
									var Add1Text = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(cAdd1), key,{keySize: 128 / 4,iv: iv,mode: CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7});
								
									encodeAdd1Text=Add1Text.toString();
	                                CAdd1=Base64.encode(encodeAdd1Text);
									
									var Add2Text = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(cAdd2), key,{keySize: 128 / 4,iv: iv,mode: CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7});
									
									encodeAdd2Text=Add2Text.toString();
	                                CAdd2=Base64.encode(encodeAdd2Text);
									
									var Add3Text = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(cAdd3), key,{keySize: 128 / 4,iv: iv,mode: CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7});
									encodeAdd3Text=Add3Text.toString();
	                                CAdd3=Base64.encode(encodeAdd3Text);
									
									var CityText = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(cCity), key,{keySize: 128 / 4,iv: iv,mode: CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7});
									
									encodeCityText=CityText.toString();
	                                CCity=Base64.encode(encodeCityText);
									
									var pinText = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(cpin), key,{keySize: 128 / 4,iv: iv,mode: CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7});
									
									encodepinText=pinText.toString();
	                                CPIN=Base64.encode(encodepinText);
									
									var panText = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(cpan), key,{keySize: 128 / 4,iv: iv,mode: CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7});
									
									encodepanText=panText.toString();
	                                CPAN=Base64.encode(encodepanText);
									
									
									var cUIDText = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(cUID), key,{keySize: 128 / 4,iv: iv,mode: CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7});
									
									encodecUIDText=cUIDText.toString();
	                                CUID=Base64.encode(encodecUIDText);
									
									var GenderText = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(cGender), key,{keySize: 128 / 4,iv: iv,mode: CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7});
									
									encodeGenderText=GenderText.toString();
	                                CGender=Base64.encode(encodeGenderText);
									
									var custidText = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(custid), key,{keySize: 128 / 4,iv: iv,mode: CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7});
									
									encodecustidText=custidText.toString();
	                                CUSTID=Base64.encode(encodecustidText);
									IMEI1 = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(imeinumber), key,{keySize: 128 / 4,iv: iv,mode: CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7});
	                                IMEI1txt=IMEI1.toString();
	                                IMEI1=Base64.encode(IMEI1txt);
	                                
	                                WL.Device.getNetworkInfo(function (networkInfo) {
	                            		ipadd = networkInfo.ipAddress;
	                            	});
	                                
	                                ipadd = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(ipadd), key,{keySize: 128 / 4,iv: iv,mode: CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7});
	                                ipaddtxt=ipadd.toString();
	                                ipadd=Base64.encode(ipaddtxt);
									var url=encodeURI(CCStpurl+CUSTID+'&cFName='+Cfname+'&cMName='+Cmname+'&cLName='+CLname+'&cDOB='+CDob+'&cMNos='+CMobile+'&cEmail='+CEmail+'&cAdd1='+CAdd1+'&cAdd2='+CAdd2+'&cAdd3='+CAdd3+'&cCity='+CCity+'&cpin='+CPIN+'&cpan='+CPAN+'&cUID='+CUID+'&cGender='+CGender);
									console.log('URL to print '+url);
									var url=CCStpurl+CUSTID+'&cFName='+Cfname+'&cMName='+Cmname+'&cLName='+CLname+'&cDOB='+CDob+'&cMNos='+CMobile+'&cEmail='+CEmail+'&cAdd1='+CAdd1+'&cAdd2='+CAdd2+'&cAdd3='+CAdd3+'&cCity='+CCity+'&cpin='+CPIN+'&cpan='+CPAN+'&cUID='+CUID+'&cGender='+CGender+'&cD1='+IMEI1+'&cD2='+ipadd+'&cD3=&cD4=&cD5=&cD6=';
									console.log("cc url>>>>>>>"+url)
								    window.open(url,'_system','location=no');  
									        setTimeout(function(){
											self.logout();
											}, 2000);
									    }
										
										
								    }
								},
								onFailure : getsmsNofail = function(res){console.log(res);
								  busyInd.hide();},               
								timeout: 300000
							});

							
						}
						else{
        				menuview = {};
        				/*setTimeout(function(){
        					//self.getAllMenu();
        					window.location="#mymenu";
        				},300);*/
        				//window.location="#mymenu";
        				MyMenus("");        	        	
                		MmenuList("");
        				self.getAllMenu();
        				}	
        			}
    	    		
        		}else{
        			busyInd.hide();
        			errmsg = invocationResult.faml.response.rc.errormessage;
        			if(errmsg == undefined){
        				alert(NoDataError);
        			}else{
        				alert(errmsg);
        			}
        			window.location = "#loginmethod";
        		}
				}else{
        				handleErrorNoResponse();
        			}
				
				}else{
        			handleErrorNoResponse();
        		}
        	}
        	
        };
        
        self.logout = function(){
        	busyInd.show();
			//var menu = $("#wrapper");
			//menu.animate({top: '96px'},2000);
        	reqParams = {};
        	reqParams["fldDeviceId"] = fldDeviceId;
        	reqParams["fldWebServerId"] = fldWebServerId;
        	reqParams["fldModule"] = fldModule;
        	reqParams["fldTxnId"] = "LGF";
        	reqParams["fldAppId"] = fldAppId;
        	reqParams["fldAppServerId"] = fldAppServerId;
        	reqParams["fldLangId"] = fldLangId;
        	reqParams["fldScrnSeqNbr"] = "01";
        	reqParams["fldRequestId"] = RegfldRequestId;
        
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
	    		onSuccess : logoutSuccess,
	    		onFailure : AdapterFail,	    		
	    		timeout: timeout
	    	});
	    	
        };   
 var userfeedBankonLogout2 = function(btnClk){
			if(btnClk == 1){
				
				feedbkurls = 'http://bit.ly/1poQpDX';
				window.open(feedbkurls, '_system'); 
			}
		}		
        var userfeedBankonLogout = function(btnClk){
			if(btnClk == 1){
				navigator.notification.confirm(
						'By clicking on Proceed, you will be leaving HDFC Bank MobileBanking  App to enter a third party website.', // message
						 userfeedBankonLogout2,            // callback to invoke with index of button pressed
						'HDFC Bank',           // title
						['Proceed']     // buttonLabels
					);
				//feedbkurls = 'http://bit.ly/1poQpDX';
				//window.open(feedbkurls, '_system'); 
			}
		}
        logoutSuccess = function(result){
        	
        	$('.logout').removeClass('Pref_logout');
			//$('.back .back').removeClass('Pref_back');
			$('.logout').removeClass('Imp_logout');
			//$('.back .back').removeClass('Imp_back');
			$('.logout').removeClass('classic_logout');
			//$('.back .back').removeClass('classic_back');
			
        	invocationResult = result.invocationResult;
        	if(invocationResult.isSuccessful) {
			if(invocationResult.faml.response){
        		if(invocationResult.faml.response.rc.returncode == 0){
        			//alert("Logged out successfully");
					navigator.notification.confirm(
						'Logged out successfully, Thank You for using HDFC Bank Mobile app.Would you like to share your feedback with us?', // message
						 userfeedBankonLogout,            // callback to invoke with index of button pressed
						'HDFC Bank',           // title
						['OK','Cancel']     // buttonLabels
					);
					$(".h_title").html("Login Method");
					
					Rsessionid="";
        			Regfldjsessionid="";
        			Regloginuid="";
        			RegfldRequestId="";
        			RegfldFCDBSessionId="";
        			RegloginFlag="no";
        			REQUESTID="";
                     cpbannerclose="";
    			     cpbannerclose1="";
    			     cpbannerclose2="";
    			     cpbannerclose3="";
    			     cpbannerclose4="";
    			     cpbannerclose5="";
    			     cpbannerclose6="";
    			     cpbannerclose7="";
    			     cpbannerclose8="";
    			     cbannerCountForAccount=0;
    			     cbannerCountForFund=0;
    			     cbannerCountForBill=0;
    			     cbannerCountForCC=0;
    			     cbannerCountForDemat=0;
    			     cbannerCountForMF=0;
    			     cbannerCountForOther=0;
    			     cbannerCountForDC=0;
    			     cbannerCountForMyMenu=0;

    			     cbannerForMyMenu="";
    			     cbannerForAccount="";
    			     cbannerForFund="";
    			     cbannerForBill="";
    			     cbannerForCC="";
    			     cbannerForDemat="";
    			     cbannerForMF="";
    			     cbannerForOther="";
    			     cbannerForDC="";
    			     cbannerForMyMenu="";
                 if(applicationFormForCredit!=1){
				   // alert("Logged out successfully");
					 $(".h_title").html("Login Method");
        			window.location = "#loginmethod";
                 }
					 else{
					  applicationFormForCredit=0;
                      window.location = "#applicationForm";					  
					 }
        		}else{
        			if(applicationFormForCredit!=1){
					errmsg = invocationResult.faml.response.rc.errormessage;
        			alert(errmsg);
					$(".h_title").html("Login Method");
        			window.location = "#loginmethod";
					}
					else{
					  applicationFormForCredit=0;
                      window.location = "#applicationForm";					  
					 }
        		}
                loggedinuser = false;
				}else{
					if(applicationFormForCredit!=1){
					 handleErrorNoResponse();
					 window.location = "#loginmethod";
					}
					else{
					  applicationFormForCredit=0;
                      window.location = "#applicationForm";					  
					 }
				}
        	}
			busyInd.hide();
        };
    //FCP
Mpinlogout = function(){
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
        	reqParams["fldRequestId"] = RegfldRequestId;
        
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
	    		onSuccess : MpinlogoutSuccess,
	    		onFailure : AdapterFail,	    		
	    		timeout: timeout
	    	});
	    	
        };        

        MpinlogoutSuccess = function(result){
        	
        	$('.logout').removeClass('Pref_logout');
			//$('.back .back').removeClass('Pref_back');
			$('.logout').removeClass('Imp_logout');
			//$('.back .back').removeClass('Imp_back');
			$('.logout').removeClass('classic_logout');
			//$('.back .back').removeClass('classic_back');
			
        	invocationResult = result.invocationResult;
        	if(invocationResult.isSuccessful) {
			if(invocationResult.faml.response){
        		if(invocationResult.faml.response.rc.returncode == 0){
        			alert("The Quick Access PIN has been changed successfully. Please re-login using your new Quick Access PIN");
					//$(".h_title").html("Login");
					
					Rsessionid="";
        			Regfldjsessionid="";
        			Regloginuid="";
        			RegfldRequestId="";
        			RegfldFCDBSessionId="";
        			RegloginFlag="no";
        			REQUESTID="";
        			//window.location = "#login";
        		}else{
        			errmsg = invocationResult.faml.response.rc.errormessage;
        			//alert(errmsg);
					
        		}
				}else{
					 handleErrorNoResponse();
					// window.location = "#login";
				}
        	}
			busyInd.hide();
        }; 

        	
	
    	
		FCP01Response = function(result){
	    	//console.log('inside the rrcsi02 response');
	    	busyInd.hide();
	    	invocationResult = result.invocationResult;
	    	if(invocationResult.isSuccessful) {
	    		if(invocationResult.faml.response){	
	    		if(invocationResult.faml.response.rc.returncode == 0){
	    			window.location = "#rrfcpw01";
	    			$("#contentData").load("Views/login/rrfcpw01.html", null, function (response, status, xhr) {
	    	            if (status != "error") {}
	    	            
	    	           // $('#fldCardNo').val(invocationResult.faml.response.fldCardNo);

	    	           // $('#DcardNum').html(invocationResult.faml.response.fldCardNo);
	    	            ko.applyBindings(self, $(".dynamic-page-content").get(0));
	    	    	});
	    			
	    				
	    			}else{
	    			errmsg = invocationResult.faml.response.rc.errormessage;
	    			handleError(invocationResult.faml.response);
	    		}
	    		}
	    	}
	    };
	    
	    
	    self.rrfcpw01submit = function(){
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
	    					reqParams["fldIdUser"] = Regloginuid;
	    					reqParams["fldRequestId"]="rrcpw02";
	    					reqParams["fldLoginUserId"] =Regloginuid;
	    					reqParams["fldTxnId"] = "FCP";
	    					
	    					reqParams["fldScrnSeqNbr"] = "02";
	    					reqParams["fldOldPass"] = oldpass;
	    					reqParams["fldNewPass"] = Newpass;
	    					reqParams["fldNewPassAgain"]= NewpassAgain;
	    					reqParams["fldSelRadio"] = "C";
	    					
	    					fldjsessionid = Regfldjsessionid;
					    	reqParams["fldLoginUserId"] =Regloginuid;
					    	reqParams["fldLoginCustId"] =Regloginuid;
					    	reqParams["fldSessionId"] = Rsessionid;
					    	
	    					busyInd.show();
	    					var invocationData = {
	    							adapter : "Others",
	    							procedure : "RRCPW01",
	    							parameters : [fldjsessionid,reqParams,ipadd]
	    					};
	    					WL.Client.invokeProcedure(invocationData, {
	    						onSuccess : rrfcpw01submitSuccess,
	    						onFailure : AdapterFail,	    		
	    						timeout: timeout
	    					});
	    					}
	    				};
	    				
	    		rrfcpw01submitSuccess = function(result){
	    							
	    	    	busyInd.hide();
	    	    	invocationResult = result.invocationResult;
	    	    	if(invocationResult.isSuccessful) {
	    	    		if(invocationResult.faml.response){	
	    	    		if(invocationResult.faml.response.rc.returncode == 0){
	    							if(invocationResult.faml.response.user.firstname){
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
	    						    		onSuccess : logoutSuccessFCP,
	    						    		onFailure : AdapterFail,	    		
	    						    		timeout: timeout
	    						    	});
	    								
	    							}
	    	    			//$("#contentData").load("Views/login/rrfcpw02.html", null, function (response, status, xhr) {
	    	            //if (status != "error") {}
	    	           // ko.applyBindings(self, $(".dynamic-page-content").get(0));
	    				       
	    	    	//});
	    	    			
	    	    		}else{
	    	    			alert(invocationResult.faml.response.error.errormsg);
	    	    			//handleError(invocationResult.faml.response);
	    					}
	    	    	        }
	    					}
	    				};
        
	    			    logoutSuccessFCP = function(result){
	    		        	
	    		        	invocationResult = result.invocationResult;
	    		        	if(invocationResult.isSuccessful) {
	    		        		if(invocationResult.faml.response.rc.returncode == 0){
	    		        			alert("Password Change successfully, Please Login with new password.");
	    		        			
	    		        			Rsessionid="";
	    		        			Regfldjsessionid="";
	    		        			Regloginuid="";
	    		        			RegfldRequestId="";
	    		        			RegfldFCDBSessionId="";
	    		        			RegloginFlag="no";
	    		        			
	    		        		
	    		        	
	    		        			
	    		        			 if(applicationFormForCredit!=1){
									 $(".h_title").html("Login Method");
									 window.location = "#loginmethod";
									 }
									 else{
									  applicationFormForCredit=0;
									  window.location = "#applicationForm";					  
									 }
	    		        		}else{
	    		        			errmsg = invocationResult.faml.response.rc.errormessage;
	    		        			alert(errmsg);
	    		        			window.location = "#login";
	    		        		}
	    		        	}
	    					busyInd.hide();
	    		        };
	    				
	    				
    //End FCP
	    		        
	    		        function remove_theme(){
	    					$('.h_title').removeClass('classic_h_title');
	    					$('.logo img').show();
	    					$('.logo').removeClass('classic_logo');
	    					$('.logout').removeClass('classic_logout');
	    					$('.back').removeClass('classic_back');
	    					$('.footer_nav').removeClass('classic_footer');
	    					$('.footer_nav li').removeClass('classic_footer_bg');
	    					$('.footer_nav a').removeClass('classic_footer');
	    					
	    					$('.h_title').removeClass('Imp_h_title');
	    					$('.logo').removeClass('Imp_logo');
	    					$('.logout').removeClass('Imp_logout');
	    					$('.back').removeClass('Imp_back');
	    					$('.footer_nav').removeClass('Imp_footer');
	    					$('.footer_nav li').removeClass('Imp_footer_bg');
	    					$('.footer_nav a').removeClass('Imp_footer');
	    					
	    					$('.h_title').removeClass('Pref_h_title');
	    					$('.logo').removeClass('Pref_logo');
	    					$('.logout').removeClass('Pref_logout');
	    					$('.back').removeClass('Pref_back');
	    					$('.footer_nav').removeClass('Pref_footer');
	    					$('.footer_nav li').removeClass('Pref_footer_bg');
	    					$('.footer_nav a').removeClass('Pref_footer');
	    		        	//localStorage.removeItem('Customer_Type');
	    				}
        
 //MPIN Login
	   MpinLogin= function(){
		   /*cpbannerclose = '';
    	   var invocationData = {
	    			adapter : "CPonMobile",
	        		procedure : "CPLink",
	        		parameters : [""],
	        		compressResponse : true
	    	};
	    	WL.Logger.debug('invoke msg  '+invocationData, '');
	    	
	    	WL.Client.invokeProcedure(invocationData, {
	    		onSuccess : function CPSuccess(CPres){
	    			if(CPres.invocationResult.isSuccessful) {
	    				cpbannerurl = CPres.invocationResult.urls;
						console.log('CP banner from adapter  '+cpbannerurl);
						//alert('CP banner from adapter  '+cpbannerurl);
	    			}
	    		},
	    		onFailure : function AdapterCPFail(){
	    			cpbannerurl = '';
	    		},	    		
	    		timeout: timeout
	    	});*/
        	
        	if($("#MpinfrmLogin01").valid()){
			    fldmPin=$('#pin11').val()+""+$('#pin12').val()+""+$('#pin13').val()+""+$('#pin14').val();
				
				
			 if($('#pin11').val()==""){
				alert('Please enter correct Quick access pin');
				$("#pin11").focus();
				return false;
			}
			if($('#pin11').val()!="" && $('#pin12').val()==""){
				alert('Please enter correct Quick access pin');
				$("#pin12").focus();
				return false;
			}
			if($('#pin11').val()!="" && $('#pin12').val()!="" && $('#pin13').val()==""){
					alert('Please enter correct Quick access pin');
				$("#pin13").focus();
				return false;
			}
			if($('#pin11').val()!="" && $('#pin12').val()!="" && $('#pin13').val()!="" && $('#pin14').val()==""){
					alert('Please enter correct Quick access pin');
				$("#pin14").focus();
				return false;
			}
				//alert(fldmPin);
        		/* var $form = $("#Mpin");
    	    	rsaDataArray = $form.serializeArray();    	
    	    	fldjsessionid = Regfldjsessionid; */
    	    	//rsajsonData.push({name: 'wordlist', value: wordlist});
    	    	fldjsessionid = Regfldjsessionid;  	
    	    	reqParams = {};
    	    	/* for (var i in rsaDataArray) {
    	    		reqParams[rsaDataArray[i].name] = rsaDataArray[i].value;
    	    	} */
				//alert(udid);
    	    	//console.log(imeinumber);
    	    	reqParams["fldDeviceId"] = fldDeviceId;
    	    	reqParams["fldWebServerId"] = fldWebServerId;
    	    	reqParams["fldAppId"] = fldAppId;
    	    	reqParams["fldAppServerId"] = fldAppServerId;
    	    	reqParams["fldLangId"] = fldLangId;
				reqParams["fldTxnId"] = 'LGN';
				reqParams["fldScrnSeqNbr"] = '01';
				//reqParams["fldosDeviceIdentifier"] = imeinumber;
				//reqParams["fldwlDeviceIdentifier"] = udid.replace(/-/g,'');
			    reqParams["fldMobileAuthType"] = 'MPIN';
			    //reqParams["fldPassword"] = $("#fldmPin").val();
				reqParams["fldMobileAuthSPCS"] = 'MPIN';
				svtk = getSks(fldmPin+""+imeinumber+""+Anroidids.replace(/-/g,''));
				svtk = '' + CryptoJS.AES.encrypt(svtk, imeinumber);
    	    	//console.log(" App version for application "+WL.Client.getAppProperty("APP_VERSION"));
        		version  = WL.Client.getAppProperty("APP_VERSION");
        		reqParams["fldAppversion"] = version;
        		ipadd = '';
				WL.Client.addGlobalHeader('Content-Lanmguage', svtk);
			//	   fldAppId=RS&fldTxnId=LGN&fldScrnSeqNbr=01&fldLangId=eng&fldDeviceId=43&fldWebServerId=YG&fldAppServerId=ZZ&fldPassword=1111&fldosDeviceIdentifier=888882&fldwlDeviceIdentifier=999992&fldMobileAuthType=MPIN 
				/* WL.Device.getNetworkInfo(function (networkInfo) {
    	    		//console.log(networkInfo.ipAddress); 
    	    		ipadd = networkInfo.ipAddress;
    	    		reqParams["fldAppipAddress"] = networkInfo.ipAddress;
    	    	}); */
				ps = '' + CryptoJS.AES.encrypt(fldmPin, svtk);
				
				
				od = localStorage.getItem('ods');
				odsts = localStorage.getItem('odsts');
				//od = '' + CryptoJS.AES.encrypt(imeinumber, svtk);
				/*if(od == null || od == '' || od == undefined || od == 'undefined'){
					od = '' + CryptoJS.AES.encrypt(imeinumber, svtk);
					localStorage.setItem('ods',od);
				}*/
				odd = '' + CryptoJS.AES.encrypt(Anroidids.replace(/-/g,''), svtk);
				
				busyInd.show();
				 lis = localStorage.getItem('lis');
				 if(lis == null || lis == 'null' || lis == undefined || lis == 'udefined'){
					svtka = '';
				 	svtka1 = getSks(fldmPin+""+imeinumber+""+Anroidids.replace(/-/g,''));
					odsts = '' + CryptoJS.AES.encrypt(svtka1, imeinumber);
					od = '' + CryptoJS.AES.encrypt(imeinumber, odsts);
					// navigator.notification.alert("You are not registered for Quick Access PIN facility. To register please click on Set Quick Access PIN.");
					// localStorage.setItem('lis',null);
					// WL.Client.addGlobalHeader('kisd', null);
					// busyInd.hide();
					// return;
				 }
				 try{
						decrypted = CryptoJS.AES.decrypt(od , svtka2);
						console.log("--->"+decrypted.toString(CryptoJS.enc.Utf8));
				 }catch(e){console.log(e);}
    	    	var invocationData = {
    	    			adapter : "MPINRegistration",
    	        	    procedure : "RRLGN01",
    	        		parameters : [fldjsessionid,reqParams,ps,od,odd,version,'',odsts],
    	        		compressResponse : true
    	    	};
    	    	//WL.Logger.debug('invoke msg  '+invocationData, '');
    	    	WL.Client.invokeProcedure(invocationData, {
    	    		onSuccess : MpinLoginSuccess,
    	    		onFailure : AdapterFail,	    		
    	    		timeout: timeout
    	    	});
        	}
        };
		
		
		MpinLoginSuccess = function(result){
			
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
				  
                  if(invocationResult.faml.response.mci.txnid!='FCP'){
					sessionid = invocationResult.faml.response.mci.sessionid;
        			Rsessionid= invocationResult.faml.response.mci.sessionid;
        			RegfldRequestId = invocationResult.faml.response.mci.requestid;
        			Regloginuid=invocationResult.faml.response.loginUser;
        			Regfldjsessionid=invocationResult.faml.response.mci.sessionid;
        			fldRequestId = invocationResult.faml.response.mci.requestid;
        			txnid = invocationResult.faml.response.mci.txnid;
        			loginuid=invocationResult.faml.response.loginUser;
        			fldjsessionid = sessionid;//invocationResult.faml.request.fldjsessionid;
        			fldSessionId = sessionid;//invocationResult.faml.response.sessioninfo.idsession;
        			fldRemoteAddress=invocationResult.faml.response.mci.remoteaddress;
					fldMobileAuthType=invocationResult.faml.response.fldMobileAuthType;
					//fldLoginUserId
					//fldLoginCustId
					//faml/fldMobileAuthType= 'MPIN'
        			//alert(invocationResult.faml.request.fldjsessionid);
        			//alert(invocationResult.faml.response.sessioninfo.idsession);
        			
        		
        			itemdata = invocationResult.faml.response.menuitem;
    	    		}
					else if(invocationResult.faml.response.mci.txnid =='FCP'){
						sessionid = invocationResult.faml.response.mci.sessionid;
						Rsessionid= invocationResult.faml.response.mci.sessionid;
						RegfldRequestId = invocationResult.faml.response.mci.requestid;
						Regloginuid=invocationResult.faml.response.fldLoginUserId;
						Regfldjsessionid=invocationResult.faml.response.mci.sessionid;
						fldRequestId = invocationResult.faml.response.mci.requestid;
						txnid = invocationResult.faml.response.mci.txnid;
						loginuid=invocationResult.faml.response.fldLoginUserId;
						fldjsessionid = sessionid;//invocationResult.faml.request.fldjsessionid;
						fldSessionId = sessionid;//invocationResult.faml.response.sessioninfo.idsession;
						fldRemoteAddress=invocationResult.faml.response.mci.remoteaddress;
						fldMobileAuthType=invocationResult.faml.response.fldMobileAuthType;
						fldLoginUserType=invocationResult.faml.response.fldLoginUserType;
						fldExtSessionId=invocationResult.faml.response.fldExtSessionId;
						fldLoginUserToken=invocationResult.faml.response.fldLoginUserToken;
						fldAccountMapFlag=invocationResult.faml.response.fldAccountMapFlag;
						fldwlDeviceIdentifier=invocationResult.faml.response.fldwlDeviceIdentifier;
						fldosDeviceIdentifier=invocationResult.faml.response.fldosDeviceIdentifier;
						systemdate=invocationResult.faml.response.systemdate;
					
					}
					
					RegfldFCDBSessionId=sessionid;
        			RegloginFlag="yes";
        		
        			itemdata = invocationResult.faml.response.menuitem;
    	    		
    	    		 gcmId=hdfc_android.getGCMID();
    	    		//alert(gcmId);
                     setDeviceToken(gcmId);
    	    		
    	        			
        			if(txnid == 'FCP'&&fldMobileAuthType=='MPIN'){
        				//alert("call FCP");
        			//	alert('Your Quick access pin has been expired. Kindly registered again to Login. ')
					    window.location="#rrfcp01";
        				busyInd.hide();
        	        	/*reqParams = {};
        	        	
        	        	reqParams["fldDeviceId"] = fldDeviceId;
        		    	reqParams["fldWebServerId"] = fldWebServerId;
        		    	reqParams["fldAppId"] = fldAppId;
        		    	reqParams["fldAppServerId"] = fldAppServerId;
        		    	reqParams["fldLangId"] = fldLangId;
        		   
        		    	reqParams["fldMobileAuthType"] = "MPIN";
        		    	reqParams["fldSessionId"] = sessionid;
        		    	reqParams["fldRequestId"] = fldRequestId;
        		    	reqParams["fldScrnSeqNbr"] = "01";
        		    	reqParams["fldIdUser"] = loginuid;
        		    	reqParams["fldLoginCustId"] = loginuid;
        		    	reqParams["chkTnC"] = "on";
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
        		    	
        		    	//fldMobileAuthType=MPIN&fldIdUser=50000009&chkTnC=on&fldSelRadio=C&fldTxnId=FCP&fldAppId=RS&fldNewPass=1111&fldSessionId=1311553795MMOYKTVF&fldOldPass=4321&fldScrnSeqNbr=02
        		    	
        		    	var invocationData = {
        		    			adapter : "API_Adapter",
        		        		procedure : "GetAPICall",
        		        		parameters : [fldjsessionid,reqParams,ipadd],
        		        		compressResponse : true

        		    	};
        		    	//WL.Logger.debug('invoke msg  '+invocationData, '');
        	        	WL.Client.invokeProcedure(invocationData, {
        	        		onSuccess : FCPMPInResponse,
        	        		onFailure : AdapterFail,
        	        		timeout: timeout
        	        	});*/
        				//window.location="#mymenu";
        			}else{
						 if(applicationFormForCredit==1){
						  //Details of customer
						    custid="";
							cFName="";
							cMName="";
							cLName="";
							cDOB="";
							cMNos="";
							cEmail="";
							cAdd1="";
							cAdd2="";
							cAdd3="";
							cCity="";
							cpin="";
							cpan="";
							cUID="";
							cGender="";  
							
							
							//alert("getContactDetails");
							busyInd.show();	
							
							var randomScalingFactor = function(){ return Math.round(Math.random()*1000000000000)};
							var invocationData = {
										adapter : "GetCheckMobCust",
										procedure : "FLEX_CDI_ConnectMQ",
										parameters : ['','',booksStore(Regloginuid),randomScalingFactor()],
										compressResponse : true
							};
   
							WL.Client.invokeProcedure(invocationData, {
								onSuccess : getsmsNoSuccess = function(result){
									console.log(JSON.stringify(result));
									invocationResult = result.invocationResult;
									if(invocationResult.isSuccessful){
									    var key = CryptoJS.enc.Utf8.parse("Ym3N3ku7wavUzteFwThHfeHujdTxEJWL");
										var iv = CryptoJS.enc.Utf8.parse("q9LJ6p9juUJRZNWV");
										var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
										
										if(invocationResult.Envelope.Body.customerdetails.custdetails){
											cFullName = invocationResult.Envelope.Body.customerdetails.custdetails.namfullcust;
											custid=Regloginuid;
											cFullName=cFullName.split(" ");
											console.log(cFullName.length);
											if(cFullName.length==3){
												cFName=cFullName[0];
												cMName=cFullName[1];
												cLName=cFullName[2];
											}
											if(cFullName.length==2){
												cFName=cFullName[0];
												cMName=cFullName[1];
												cLName="";
											}
											if(cFullName.length==1){
												cFName=cFullName[0];
												cMName="";
												cLName="";
											}
											mobileno = invocationResult.Envelope.Body.customerdetails.custdetails.mobno;
											
										    if(mobileno.length==13 ||mobileno.length==12){
										      console.log( mobileno.substring(3, 13))
											 if(mobileno.length==13){
										     cMNos=mobileno.substring(3, 13);
											 }else if(mobileno.length==12){
											 cMNos=mobileno.substring(2, 13);
											 }
											}else{
											 cMNos=mobileno;
											}
											cpan=invocationResult.Envelope.Body.customerdetails.custdetails.pancardno;
											cDOB=invocationResult.Envelope.Body.customerdetails.custdetails.dob;
											//cMNos=invocationResult.faml.response.customer.mobileno;
											
											cEmail=invocationResult.Envelope.Body.customerdetails.custdetails.email;
											cAdd1=invocationResult.Envelope.Body.customerdetails.custdetails.address.address1;
										
											cAdd2=invocationResult.Envelope.Body.customerdetails.custdetails.address.address2;
											cAdd3=invocationResult.Envelope.Body.customerdetails.custdetails.address.address3;
											cCity=invocationResult.Envelope.Body.customerdetails.custdetails.address.city;
											cpin=invocationResult.Envelope.Body.customerdetails.custdetails.address.zipcode;
											
											cUID="";
											cGender="";
											
								     busyInd.hide();	
									 
                                    var FNameText = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(cFName), key,{keySize: 128 / 4,iv: iv,mode: CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7});
									
									
									encodeFNameText=FNameText.toString();
	                                Cfname=Base64.encode(encodeFNameText);
									 
									
									var MNameText = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(cMName), key,{keySize: 128 / 4,iv: iv,mode: CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7});
									
									encodeMNameText=MNameText.toString();
	                                Cmname=Base64.encode(encodeMNameText);
									
									
									var LNameText = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(cLName), key,{keySize: 128 / 4,iv: iv,mode: CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7});
									
									encodeLNameText=LNameText.toString();
	                                CLname=Base64.encode(encodeLNameText);
								
									
									var DOBText = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(cDOB), key,{keySize: 128 / 4,iv: iv,mode: CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7});
									
									encodeDOBText=DOBText.toString();
	                                CDob=Base64.encode(encodeDOBText);
									
									var MNOText = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(cMNos), key,{keySize: 128 / 4,iv: iv,mode: CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7});
									
									encodeMNOText=MNOText.toString();
	                                CMobile=Base64.encode(encodeMNOText);
									
									var EmailText = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(cEmail), key,{keySize: 128 / 4,iv: iv,mode: CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7});
									
									encodeEmailText=EmailText.toString();
	                                CEmail=Base64.encode(encodeEmailText);
									
									var Add1Text = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(cAdd1), key,{keySize: 128 / 4,iv: iv,mode: CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7});
								
									encodeAdd1Text=Add1Text.toString();
	                                CAdd1=Base64.encode(encodeAdd1Text);
									
									var Add2Text = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(cAdd2), key,{keySize: 128 / 4,iv: iv,mode: CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7});
									
									encodeAdd2Text=Add2Text.toString();
	                                CAdd2=Base64.encode(encodeAdd2Text);
									
									var Add3Text = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(cAdd3), key,{keySize: 128 / 4,iv: iv,mode: CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7});
									encodeAdd3Text=Add3Text.toString();
	                                CAdd3=Base64.encode(encodeAdd3Text);
									
									var CityText = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(cCity), key,{keySize: 128 / 4,iv: iv,mode: CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7});
									
									encodeCityText=CityText.toString();
	                                CCity=Base64.encode(encodeCityText);
									
									var pinText = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(cpin), key,{keySize: 128 / 4,iv: iv,mode: CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7});
									
									encodepinText=pinText.toString();
	                                CPIN=Base64.encode(encodepinText);
									
									var panText = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(cpan), key,{keySize: 128 / 4,iv: iv,mode: CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7});
									
									encodepanText=panText.toString();
	                                CPAN=Base64.encode(encodepanText);
									
									
									var cUIDText = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(cUID), key,{keySize: 128 / 4,iv: iv,mode: CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7});
									
									encodecUIDText=cUIDText.toString();
	                                CUID=Base64.encode(encodecUIDText);
									
									var GenderText = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(cGender), key,{keySize: 128 / 4,iv: iv,mode: CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7});
									
									encodeGenderText=GenderText.toString();
	                                CGender=Base64.encode(encodeGenderText);
									
									var custidText = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(custid), key,{keySize: 128 / 4,iv: iv,mode: CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7});
									
									encodecustidText=custidText.toString();
	                                CUSTID=Base64.encode(encodecustidText);
	                                
	                                IMEI1 = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(imeinumber), key,{keySize: 128 / 4,iv: iv,mode: CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7});
	                                IMEI1txt=IMEI1.toString();
	                                IMEI1=Base64.encode(IMEI1txt);
	                                
	                                WL.Device.getNetworkInfo(function (networkInfo) {
	                            		ipadd = networkInfo.ipAddress;
	                            	});
	                                
	                                ipadd = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(ipadd), key,{keySize: 128 / 4,iv: iv,mode: CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7});
	                                ipaddtxt=ipadd.toString();
	                                ipadd=Base64.encode(ipaddtxt);
	                                
									var url=CCStpurl+CUSTID+'&cFName='+Cfname+'&cMName='+Cmname+'&cLName='+CLname+'&cDOB='+CDob+'&cMNos='+CMobile+'&cEmail='+CEmail+'&cAdd1='+CAdd1+'&cAdd2='+CAdd2+'&cAdd3='+CAdd3+'&cCity='+CCity+'&cpin='+CPIN+'&cpan='+CPAN+'&cUID='+CUID+'&cGender='+CGender+'&cD1='+IMEI1+'&cD2='+ipadd+'&cD3=&cD4=&cD5=&cD6=';
									console.log("cc url>>>>>>>"+url)
								    window.open(url,'_system','location=no');  
									        setTimeout(function(){
											self.logout();
											}, 2000);
									    }
										
										
								    }
								},
								onFailure : getsmsNofail = function(res){console.log(res);
								  busyInd.hide();},               
								timeout: 300000
							});

							
						}
						else{
							menuview = {};
							/*setTimeout(function(){
								//self.getAllMenu();
								window.location="#mymenu";
							},300);*/
							//window.location="#mymenu";
							MyMenus("");        	        	
							MmenuList("");
						   
							
							self.getAllMenu();
						}
        				
        				
        			}
    	    		
        		}else{
        			busyInd.hide();
        			errmsg = invocationResult.faml.response.rc.errormessage;
        			if(errmsg == undefined){
        				alert(NoDataError);
						$("#pin11").val("");
						$("#pin12").val("");
						$("#pin13").val("");
						$("#pin14").val("");
        			}else{
        				alert(errmsg);
						$("#pin11").val("");
						$("#pin12").val("");
						$("#pin13").val("");
						$("#pin14").val("");
        			}
        			//window.location = "#menu";
        		}
				}else{
        				handleErrorNoResponse();
        			}
				
				}else{
        			handleErrorNoResponse();
        		}
        	}
			busyInd.hide();
        };
		
		
		
		FCPMPInResponse = function(result){
	    	//console.log('inside the rrcsi02 response');
	    	busyInd.hide();
	    	invocationResult = result.invocationResult;
	    	if(invocationResult.isSuccessful) {
	    		if(invocationResult.faml.response){	
	    		if(invocationResult.faml.response.rc.returncode == 0){
	    			window.location = "#rrfcpw01";
	    		
	    				
	    			}else{
	    			errmsg = invocationResult.faml.response.rc.errormessage;
	    			handleError(invocationResult.faml.response);
	    		}
	    		}
	    	}
	    };
		
	    self.genVerifyOTP  = function(){
	    	busyInd.show();
	    	var invocationData = {
	    			adapter : "RegOTPValidation",
	        		procedure : "OTPServiceHDFCService_generatePwdRequest",
	        		parameters : ['', '',Regloginuid01,'02032016344072'],
	        		compressResponse : true
	    	};
	    	//WL.Logger.debug(invocationData, '');
	    	WL.Client.invokeProcedure(invocationData, {
	    		onSuccess : function s(response){console.log(JSON.stringify(response))
	    			invocationResult = response.invocationResult;
	    			if(invocationResult.isSuccessful) {
	    					if(invocationResult.faml.response){
	    						status =  invocationResult.faml.response.Envelope.Body.multiRef.statusCode.CDATA;
	    						if(status == 00){
									busyInd.hide();
	    							//busyInd.hide();
	    							OTP = invocationResult.faml.response.Envelope.Body.multiRef.passwordValue.CDATA;
	    							//alert("Generated OTP "+OTP)
									setotp = '';
	    							smssendmPin(OTP);
									//busyInd.show();				
									//setTimeout(function(){
									// busyInd.hide();
									window.location = "#GenOTPPage";			  
									//},8000);
	    							
	    						}
	    						
	    					}else {
	    						alert(NoResponseError);
	    						busyInd.hide();
	    					}
	    			}
	    			},
	    		onFailure :  AdapterFail,	    		
	    		timeout: 30000
	    	});
	    	busyInd.hide();
	    }
	    smssendmPin = function(OTP){
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
				reqParams["msgtxt"] = '';
				reqParams["sdate"] = datetoday+" "+time;
				reqParams["msgid"] = randomScalingFactor();
				reqParams["msgtype"] = "S"; 
				reqParams["p"] = OTP; 
				var invocationData = {
	                    adapter : "mPin_SMS_Send",
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
	    this.GenOTPPages = function(){
	    	$(".h_title").html("Step 2: Validate One Time Password (OTP)");
	    	$("#contentData").load("Views/login/mpinOTP.html", null, function (response, status, xhr) {
                if (status != "error") {}	
					hdfc_android.showProgress();
					setTimeout(function(){
					 
					hdfc_android.hideProgress();
					
if(setotp!=''){
							$('#fldOtpToken').val(setotp);
							
					   }	  
						},12000);
				      // alert("done"+setotp);
					   
					  
					   
						
					var busyAuth2 = '';	


							
						
	                 ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
	    	}); 
//busyInd.hide();
	    }
	    self.otpSubmit = function(){
	    	busyInd.show();
	    	OTPVall = $('#fldOtpToken').val();
    		var invocationData = {
	    			adapter : "RegOTPValidation",
	        		procedure : "OTPServiceHDFCService_verifyPwdRequest",
	        		parameters : ['', '',Regloginuid01,'02032016344073',OTPVall],
	        		compressResponse : true
	    	};
	    	//WL.Logger.debug(invocationData, '');
	    	WL.Client.invokeProcedure(invocationData, {
	    		onSuccess : function s(response){console.log(JSON.stringify(response))
	    			invocationResult = response.invocationResult;
	    			if(invocationResult.isSuccessful) {
    					if(invocationResult.faml.response){
    						status =  invocationResult.faml.response.Envelope.Body.multiRef.statusCode.CDATA;
    						if(status == 00){
    							busyInd.hide();
    							//OTPSuccess();  redirect to PIN page RegDDdst01
                                      window.location.href = "#regMPINDebitCardVerify";
                                      var model = new mPinReg();
                                      $(window).scrollTop(0);
                                      $("#contentData").load("Views/login/Mpin_Register1.html", null, function (response, status, xhr) {
                                                             if (status != "error") {}
                                                             
                                                             ko.applyBindings(model, $(".dynamic-page-content").get(0));
                                                             });
                                 MpinregistrationSuccessnew(RegDDdst01);
    						}else {
    							busyInd.hide();
    							alert('OTP (One Time Password) entered by you is incorrect. We request you to re-initiate the transaction and enter correct OTP.');
    							window.location="#MpinRegister";
    							//alert(invocationResult.faml.response.Envelope.Body.multiRef.errorDetail.CDATA);
    							
    						}
    						
    					}else {
    						alert(NoResponseError);
    					}
	    				}
	    			},
	    			onFailure :  AdapterFail,	    		
	    		timeout: 30000
	    	});
	    }
	     OTPSuccess = function(){
			invocationResult = accPinData;
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
					//$('#namecustlog12').hide();
					$("#namecustlog12").html("Dear Customer")
					$('.verifysucess').show();
					$('#verify').hide();
					localStorage.setItem("names",booksStore("Customer"));
					  window.location="#setmpin";
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
}
        
};
        
        