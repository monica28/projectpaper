  var AccountsViewModel = function () {

        var self = this;
        self.totaccbalval = ko.observable();
        self.curraccbalval = ko.observable();
        self.selAccount = ko.observable();
        self.accountStmtTxns = ko.observableArray([]);
		self.fixedDepositList = ko.observableArray([]);
        self.recurringDepositList = ko.observableArray([]);
        self.selFssSavingAcc = ko.observable();
        self.selFssFDAcc = ko.observable();
        self.fssSavingAccountList = ko.observableArray([]);
        self.fssFDAccountList = ko.observableArray([]);
        self.fldFromAcctNo = ko.observable();
	    self.mpinaccounts = ko.observableArray([]);
        self.fldToAcctNo = ko.observable();
        self.selAcctTemp = ko.observable();
        self.fldIntCrAcctNoTemp = ko.observable();
        self.rdYearList = ko.observableArray([]);
        self.rdMonthList = ko.observableArray([]);
        self.tdsArray1 = ko.observableArray([]);
    	self.tdsArray2 = ko.observableArray([]);
    
        self.Purchaseforexacc= ko.observableArray([]);
    	self.agencyList = ko.observableArray([]);
        self.selAgency = ko.observable();
        self.accountAgencyList = ko.observableArray([]);
        self.selAccountAgency = ko.observable();
        self.holdingDetails = ko.observableArray([]);
        self.adhaaraccounts= ko.observableArray([]);
        self.FDaccountList = ko.observableArray([]);
        self.FDSelaccountList = ko.observableArray([]);
        self.fldFDAcctNo = ko.observable();
        self.forexpurpose=ko.observableArray([]);
	self.Purchaseforexacc= ko.observableArray([]);
	self.Reloadforexacc= ko.observableArray([]);
	self.forexcurrencytype= ko.observableArray([]);
	self.Pforexcurrencytype= ko.observableArray([]);
	self.reloadpurpose= ko.observableArray([]);
        self.MMIDaccountList = ko.observableArray([]);
        self.fldAcctNo =  ko.observable();
		
		self.myfavmenu = ko.observable();
        self.PerLzdmenuList = ko.observable();
		
		 self.PerLzdmenuListAccount = ko.observableArray([]);
        self.PerLzdmenuListTransfer = ko.observableArray([]);
        self.PerLzdmenuListBills = ko.observableArray([]);
        self.PerLzdmenuListCards = ko.observableArray([]);
        self.PerLzdmenuListDemat = ko.observableArray([]);
        self.PerLzdmenuListdtcards = ko.observableArray([]);
        self.PerLzdmenuListfcatis = ko.observableArray([]);
        
        self.PerLzdmenuListoAlert = ko.observableArray([]);
        self.PerLzdmenuListotherCnt = ko.observableArray([]);
		
        self.MyPerlzdMenus = ko.observable();
        
        self.myfavmenuOtherCount = ko.observable();
        self.MyFmnu = ko.observableArray([]);
        
        self.openFDAccList = ko.observableArray([]);
        self.selOpenFD = ko.observable();
        self.prodtypeList = ko.observableArray([]);
        self.prodtype = ko.observable();
        self.creditAccno = ko.observable();
        self.prodTypeData = ko.observable();
        
		this.rrift01Page = function(){
				busyInd.show();  
		    
    	    	reqParams = {};
    	    	
    	    	reqParams["fldDeviceId"] = fldDeviceId;
    	    	reqParams["fldWebServerId"] = fldWebServerId;
    	    	reqParams["fldAppId"] = fldAppId;
    	    	reqParams["fldAppServerId"] = fldAppServerId;
    	    	reqParams["fldLangId"] = fldLangId;
    	    	reqParams["fldModule"] = fldModule;
    	    	
    	    	reqParams["fldLoginUserId"] =Regloginuid;
    	    	reqParams["fldTxnId"] = "IFT";
    	    	
    	    	
    	    	reqParams["fldRequestId"] =RegfldRequestId;
    	    	reqParams["fldScrnSeqNbr"] = "01";
    	    	reqParams["fldOperationId"] = "RRIFT01";
        		
    	    	fldjsessionid = Regfldjsessionid;
    	    	reqParams["fldLoginUserId"] =Regloginuid;
    	    	reqParams["fldSessionId"] = Rsessionid;
    	    	
    	    	var invocationData = {
    	    			adapter : "API_Adapter",
    	        		procedure : "GetAPICall",
    	        		parameters : [fldjsessionid,reqParams,ipadd]
    	    	};
    	    	
    	    	WL.Client.invokeProcedure(invocationData, {
    	    		onSuccess : rrift01PageSuccess,
    	    		onFailure : AdapterFail,	    		
    	    		timeout: timeout
    	    	});
		};
		rrift01PageSuccess = function(result){
				invocationResult = result.invocationResult;
        	if(invocationResult.isSuccessful) {
        		if(invocationResult.faml.response){	
        		if(invocationResult.faml.response.rc.returncode == 0){
        			
        			fromAccdata = invocationResult.faml.response.acctdtls;
        			fldFCDBRequestId = invocationResult.faml.response.mci.requestid;
    	    		
					self.fromAccountList.removeAll();
    	    		
    	    		
    	    		$(fromAccdata).each(function(index, obj) {
    	    			displaytxt = obj.codacctno+" - "+obj.nambranch;
    	    			accountValue = obj.codacctno+"#"+obj.namccyshrt+"#"+obj.acctbalance;
    	    		    self.fromAccountList.push({ codacctno: obj.codacctno, displaytxt:displaytxt, accountValue: accountValue });
    	    		}); 
    	    		
					
    	    		$("#contentData").load("Views/Accounts/rrift01.html", null, function (response, status, xhr) {
							if (status != "error") {}
							ko.applyBindings(self, $(".dynamic-page-content").get(0));
								if(fromAccdata.length>0){
									$('#refblock').show();
									$('#disclaimer').show();
									$('#OtherWise').hide();
							
								}else {
										$('#refblock').hide();
										$('#OtherWise').show();
										$('#disclaimer').hide();
								}
									$("#fldFCDBRequestId").val(fldFCDBRequestId);
						});
        		}else{
        			errmsg = invocationResult.faml.response.rc.errormessage;
        			alert(errmsg);
        			//window.location = "#login";
        		}
        	 }else{
        		 alert("We apologize this facility is temporarily unavailable.Please try later. ");
        		
        	 }
        	}
        	busyInd.hide();
		};
		this.ift01Pagesubmit = function(){
				busyInd.show();
				var $form = $("#frmift01");
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
				reqParams["fldOperationId"] = "RRIFT02";
				reqParams["fldTxnId"] = "IFT";
				reqParams["fldRequestId"] = $("#fldFCDBRequestId").val();
				reqParams["fldScrnSeqNbr"] = "02";
				reqParams["fldFromAcctNo_txt"] = $('#fldFromAcctNo option:selected').text();
				reqParams["bfldChecked_txt"] = $('#fldChecked option:selected').text();
				
				fldjsessionid = Regfldjsessionid;
		    	reqParams["fldLoginUserId"] =Regloginuid;
		    	reqParams["fldSessionId"] = Rsessionid;
				
				var invocationData = {
    			adapter : "API_Adapter",
        		procedure : "GetAPICall",
        		parameters : [fldjsessionid,reqParams,ipadd]
			};
    	
			//WL.Logger.debug(invocationData, '');
			WL.Client.invokeProcedure(invocationData, {
				onSuccess : rrift01Response,
				onFailure : AdapterFail,
				timeout: timeout
			});
				
		};
		rrift01Response = function(result){
				
				invocationResult = result.invocationResult;
				if(invocationResult.isSuccessful) {
					if(invocationResult.faml.response){	
					if(invocationResult.faml.response.rc.returncode == 0){
							accStmtData(invocationResult.faml);    
							window.location = "#rrift02";
					}else{
						handleError(invocationResult.faml.response);
					}
					}
				}
		
		};
		this.rrift02Page = function(){
					rrift02PageData =  accStmtData();
					
					$("#contentData").load("Views/Accounts/rrift02.html", null, function (response, status, xhr) {
							if (status != "error") {}
							ko.applyBindings(self, $(".dynamic-page-content").get(0));
							
							$('#fldFCDBRequestId').val(rrift02PageData.response.mci.requestid);
							$('#strfromaccno').html(rrift02PageData.response.fldFromAcctNo.split('#')[0]);
							$('#fldbenefmobno1').html(rrift02PageData.response.fldBenefMobNo);
							$('#fldbenefmmid1').html(rrift02PageData.response.fldBenefMMID);
							$('#fldamttxn').html(rrift02PageData.response.fldAmtTxn);
							$('#fldrmrk1').html(rrift02PageData.response.fldRmrk);
							$('#fldFromAcctNo').val(rrift02PageData.response.fldFromAcctNo.split('#')[0]);
							$('#fldTxnAmount').val(rrift02PageData.response.fldAmtTxn);
							$('#fldBenefMobNo').val(rrift02PageData.response.fldBenefMobNo);
							$('#fldBenefMMID').val(rrift02PageData.response.fldBenefMMID);
							
							$('#fldRmrk').val(rrift02PageData.response.fldRmrk);
					});
					busyInd.hide();
		};
		this.ift02Pagesubmit = function(){
				busyInd.show();
				rrift02PageData =  accStmtData();
				var $form = $("#frmift02");
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
				reqParams["fldOperationId"] = "RRIFT03";
				reqParams["fldTxnId"] = "IFT";
				reqParams["fldRequestId"] = $('#fldFCDBRequestId').val();
				reqParams["fldScrnSeqNbr"] = "03";
				
				fldjsessionid = Regfldjsessionid;
		    	reqParams["fldLoginUserId"] =Regloginuid;
		    	reqParams["fldSessionId"] = Rsessionid;
				
				var invocationData = {
    			adapter : "API_Adapter",
        		procedure : "GetAPICall",
        		parameters : [fldjsessionid,reqParams,ipadd]
			};
    	
			//WL.Logger.debug(invocationData, '');
			WL.Client.invokeProcedure(invocationData, {
				//onSuccess : rrift02Response,rsaResponse
				onSuccess : rsaResponse,
				onFailure : AdapterFail,
				timeout: timeout
			});
		};
		rrift02Response = function(result){
				invocationResult = result.invocationResult;
				if(invocationResult.isSuccessful) {
					if(invocationResult.faml.response){	
					if(invocationResult.faml.response.rc.returncode == 0){
							accStmtData(invocationResult.faml);    
							window.location = "#rrift03";
					}else{
						$('#fldFCDBRequestId').val(invocationResult.faml.response.mci.requestid);
						handleError(invocationResult.faml.response);
						
					}
					}
				}
		
		};
		this.rrift03Page = function(){
					rrift02PageData =  accStmtData();
					
					$("#contentData").load("Views/Accounts/rrift03.html", null, function (response, status, xhr) {
							if (status != "error") {}
							ko.applyBindings(self, $(".dynamic-page-content").get(0));
							
					});
					busyInd.hide();
		};
        this.getAccountSummary = function(){
    	    	   
        	if(accountSummList().length === 0){
			
				if(window.navigator.onLine){
									reqParams = {};
								
								reqParams["fldDeviceId"] = fldDeviceId;
								reqParams["fldWebServerId"] = fldWebServerId;
								reqParams["fldAppId"] = fldAppId;
								reqParams["fldAppServerId"] = fldAppServerId;
								reqParams["fldLangId"] = fldLangId;
								reqParams["fldModule"] = fldModule;
								
								reqParams["fldTxnId"] = "ASM";
								reqParams["fldScrnSeqNbr"] = "01";
								
								fldjsessionid = Regfldjsessionid;
								reqParams["fldLoginUserId"] =Regloginuid;
								reqParams["fldSessionId"] = Rsessionid;
								
								busyInd.show();
								var invocationData = {
										adapter : "Accounts",
										procedure : "RRASM01",
										parameters : [fldjsessionid,reqParams,ipadd],
										compressResponse : true
								};
								//WL.Logger.debug(invocationData, '');
								WL.Client.invokeProcedure(invocationData, {
									onSuccess : rrasmSuccess,
									onFailure : AdapterFail,	    		
									timeout: timeout
								});
								
								if(window.location.hash == '#rrasm01'){
									templateId = "rrasm01";
								}else{
									templateId = "accountSummary";
								}
								
								$("#contentData").load("Views/Accounts/"+templateId+".html", null, function (response, status, xhr) {
									if (status != "error") {}
				  videoflag = VideoFLG.toUpperCase();
													   
													  // if(videoflag == 'O' || videoflag == 'U'){
														if( videoflag == 'O' || videoflag == 'U' || videoflag == 'H' || videoflag == '8' || videoflag == 'V'){
													   $("#video").show();
													   }
													   else{ 
													   $("#video").hide();
													   }
									ko.applyBindings(self, $(".dynamic-page-content").get(0));     
								});
				}
				else{
					navigator.notification.alert("Please check your Network connection in setting");
					MyParentPage="#rrasm01";
					self.commonData();
				}
    	    	
        	
    	    	
        	}else{
        		busyInd.show();
        		if(window.location.hash == '#rrasm01'){
    	    		templateId = "rrasm01";
    	    	}else{
    	    		templateId = "accountSummary";
    	    	}
    	    	
    	    	
    	    	$("#contentData").load("Views/Accounts/"+templateId+".html", null, function (response, status, xhr) {
    	            if (status != "error") {}
 videoflag = VideoFLG.toUpperCase();
										 
									
                                       
                                       if(videoflag == 'O' || videoflag == 'U' || videoflag == 'H' || videoflag == '8' || videoflag == 'V'){
                                       
                                      // if(videoflag == 'O' || videoflag == 'U'){
                                 
                                       $("#video").show();
                                       }
                                       else{ 
                                       $("#video").hide();
                                       }
    	            ko.applyBindings(self, $(".dynamic-page-content").get(0));
    	            if(accountSummList().length > 0 && window.location.hash == '#rrasm01'){
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
    	    		 
    	            busyInd.hide();
    	                
    	    	});
            	
        	}
            	    	
        };
        
        rrasmSuccess = function(result){
        	
        	invocationResult = result.invocationResult;
        	if(invocationResult.isSuccessful) {
        		if(invocationResult.faml.response){
        		if(invocationResult.faml.response.rc.returncode == 0){
        			ISNRCUSTOMER=invocationResult.faml.response.isNRCustomer;
        			custdtls = invocationResult.faml.response.CustDtls;
    	    		itemdata = invocationResult.faml.response.acctdtls;
    	    		nbrofsavingacc = invocationResult.faml.response.nbrsavingacct;
    	    		nbrofcurrentacc = invocationResult.faml.response.nbrcurrentacct;
    	    		
    	    		totAccount = parseInt(nbrofsavingacc) + parseInt(nbrofcurrentacc);
    	    		if(totAccount > 0)
    	    			accSummSlider(true);
    	    		else
    	    			accSummSlider(false);
    	    		
    	    		accountSummList.removeAll();
    	    		accountList.removeAll();
    	    		var idx = 1;
    	    		$(itemdata).each(function(index, obj) {
    	    			strid = "item"+idx;
    	    			custnames = "";
    	    			
    	    			$(custdtls).each(function(j, obj1) {
    	    			
    	    				if(obj.acctindex == obj1.acctindex){
    	    					//if(obj1.custRel == 'SOW' || obj1.custRel == 'JOF' || obj1.custRel == 'JOO' || obj1.custRel == 'AUS'){
									 if(obj1.custRel != 'AUS' && obj1.custRel != 'GUA' && obj1.custRel != 'NOM' && obj1.custRel != 'POA'){
											custnames += obj1.userName+" , ";
									
									Custname=removeLastComma(custnames);
									//console.log(Custname);
    	    					}
    	    				}
    	    			});
    	    			displaytxt = $.trim(obj.codacctno)+"-"+obj.acctbranch;
    	    			
    	    			if(window.location.hash == '#rrasm01'){
    	    				acctbalance = formatAmt(parseFloat(obj.acctbalance));
    	    			}else{
    	    				acctbalance = formatAmt(parseFloat(obj.acctbalance));
    	    			}
					if(index == 0){ Customer_accNum_Video = obj.codacctno;}
						if(obj.namccyshrt=="INR"){
						  namccyshrt="Rs.";
						}
						else{
						  namccyshrt=obj.namccyshrt;
						}
						
    	    			accountSummList.push({ codacctno: obj.codacctno, acctType: obj.acctType, acctbalance: namccyshrt+' '+acctbalance });
							var custTpe= '';
							
					  if(ISNRCUSTOMER=='Y'){
					
    	    			if(obj.txtmsgadv){
    	    				custTpe = obj.txtmsgadv;
    	    			}else {
    	    				custTpe = '';
    	    			}
    	    		 }
    	    			custacctype[$.trim(obj.codacctno)] = custTpe;
    	    			accountList.push({ codacctno: obj.codacctno, acctType: obj.acctType, acctbalance: acctbalance, acctbranch: obj.acctbranch, custnames: Custname, namccyshrt: obj.namccyshrt, displaytxt: displaytxt, strid:strid,custtype1:custTpe });
    	    		    idx++;
    	    		});
    	    		
    	    		if(window.location.hash == '#rrasm01'){
    		    		if(totAccount == 0){
    		    			$("#accExitsMsg").show();
    		    			//$("#wrapper").css("top","110px");
    		    		}else{
    		    			$("#accExitsMsg").hide();
    		    			//$("#wrapper").css("top","96px");
    		    		}
    	    		}else{
    	    			if(totAccount == 0){
    		    			$("#accExitsMsg").show();		    			
    		    		}else{
    		    			$("#accExitsMsg").hide();		    			
    		    		}
    	    		}
    	    		
    	    		if(accountSummList().length > 0 && window.location.hash == '#rrasm01'){
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
        			handleError(invocationResult.faml.response);
        			//window.location = "#login";
        		}
        	}else{
        		busyInd.hide();
        	}
        	}
        	busyInd.hide();
        };
        
        self.accountStmtDetails = function(accnodet){
        	
            selectedAccount({ accno: accnodet.codacctno, displaytxt: accnodet.displaytxt, acctbalance: accnodet.acctbalance, fldFCDBRequestId: accnodet.fldFCDBRequestId, acctType: accnodet.acctType });
            randomintstr = parseInt(Math.random()*1000000000, 10);
            checkState=1;
            window.location = "#accountStatment";
            
            //self.viewSelectedAccountStatement();
        };
        
        self.viewSelectedAccountStatement = function(){
        	
        	busyInd.show();
        	var currAccData = selectedAccount();
        	
            fldAcctNo = currAccData.accno;            
            curraccbalval = currAccData.acctbalance;
            acctType =  currAccData.acctType;
        	fldAcctNo_txt = currAccData.displaytxt;
        	
        	
        	reqParams = {};
	    	
	    	reqParams["fldDeviceId"] = fldDeviceId;
	    	reqParams["fldWebServerId"] = fldWebServerId;
	    	reqParams["fldAppId"] = fldAppId;
	    	reqParams["fldAppServerId"] = fldAppServerId;
	    	reqParams["fldLangId"] = fldLangId;
	    	reqParams["fldModule"] = fldModule;
	    	
	    	reqParams["fldTxnId"] = "SIN";
	    	reqParams["fldScrnSeqNbr"] = "02";
	    	
	    	reqParams["fldAcctNo"] = fldAcctNo;
	    	reqParams["fldTxnType"] = "A";
	    	reqParams["fldNbrStmt"] = "10";
	    	reqParams["fldFromDate"] = "";
	    	reqParams["fldToDate"] = "";
	    	
	    	fldjsessionid = Regfldjsessionid;
	    	reqParams["fldLoginUserId"] =Regloginuid;
	    	reqParams["fldSessionId"] = Rsessionid;
	    	
	    	
	    	if(fldAcctNo != undefined){
		    	var invocationData = {
		    			adapter : "Accounts",
    	        		procedure : "RRSIN02",
    	        		parameters : [fldjsessionid,reqParams,ipadd],
    	        		compressResponse : true
		    	};
		    	//WL.Logger.debug(invocationData, '');
		    	
		    	WL.Client.invokeProcedure(invocationData, {
		    		onSuccess : self.accountStmtDetSubmitSuccess,
		    		onFailure : AdapterFail,
		    	});
        	}else{
        		busyInd.hide();		
        	}
	    	
	    	self.selAccount(fldAcctNo);

	    	self.curraccbalval(curraccbalval);
	    	$("#acctType").html(acctType);
	    		    	
        };
        
        self.accountStmtDetSubmitSuccess = function(result){
        	
        	invocationResult = result.invocationResult;
        
        	
        	if(invocationResult.isSuccessful) {
        		if(invocationResult.faml.response){	
        			self.accountStmtTxns.removeAll();
        		if(invocationResult.faml.response.rc.returncode == 0){
        			checkState=0;
        			txndata = invocationResult.faml.response.txndetails.transaction;
                	flgwarning = invocationResult.faml.response.flgwarning;
                	
                	accno = invocationResult.faml.response.codacctno;
                	acctype = invocationResult.faml.response.acctType;
                	if(typeof(invocationResult.faml.response.acctType)=='object'){
                		acctype = invocationResult.faml.response.acctType[0];
                		
                	};
                	txntype = invocationResult.faml.response.txntype;
                	acctcurr = invocationResult.faml.response.acctCurr;
                	closingbalance = invocationResult.faml.response.closingbalance;
                	fromdt = invocationResult.faml.response.fromdate;        	
                	todate = invocationResult.faml.response.todate;	
                	period = fromdt+" - "+todate;
                	
                	
                	$(txndata).each(function(index, obj) {
                		
                		if(obj.coddrcr == 'C')
                			amtLbl = 'Deposit';
                		else
                			amtLbl = 'Withdrawal';
                		
                		self.accountStmtTxns.push({ dattxn: obj.dattxn, amttxn: formatAmt(parseFloat(obj.amttxn)), amtLbl: amtLbl, refchqno: obj.refchqno, txttxndesc: obj.txttxndesc, datvalue: obj.datvalue, fldTxnType: obj.fldTxnType, balaftertxn: formatAmt(parseFloat(obj.balaftertxn)), txntype:txntype });
                	});  
                	
                	$("#contentData").load("Views/Accounts/accountStatment.html", null, function (response, status, xhr) {
                        if (status != "error") {}
                        $("#acctType").html("");
                        $("#acctType").html(acctype);
                            ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
                    });
                	
                }
        		else{
        			handleError(invocationResult.faml.response);
        			
        			if(checkState){
        				checkState=0;
        	            window.location="#rrasm01";
            			
        			}
        			
        		}
        		
        	
        		        		
        		}else{
					handleErrorNoResponse();
				}
        	}
        	busyInd.hide();
        };
        
        self.showSelectedAccount = function(){
        	selaccno = self.selAccount();
        	accdata = accountList();
        	
        	if(selaccno != '' && selaccno != null && selaccno != undefined){
        	$(accdata).each(function(index, accnodet) {
        		
        		if(accnodet.codacctno == selaccno){
        			selectedAccount({ accno: accnodet.codacctno, displaytxt: accnodet.displaytxt, acctbalance: accnodet.acctbalance, fldFCDBRequestId: accnodet.fldFCDBRequestId, acctType: accnodet.acctType });
        	        //window.location = "#accountStatment/"+;
        			
        			busyInd.show();	    	
        	    	
                	var currAccData = selectedAccount();
                    fldAcctNo = currAccData.accno;            
                    curraccbalval = currAccData.acctbalance;
                    acctType = currAccData.acctType;
                	fldAcctNo_txt = currAccData.displaytxt;
                	
                	
                	reqParams = {};
        	    	
        	    	reqParams["fldDeviceId"] = fldDeviceId;
        	    	reqParams["fldWebServerId"] = fldWebServerId;
        	    	reqParams["fldAppId"] = fldAppId;
        	    	reqParams["fldAppServerId"] = fldAppServerId;
        	    	reqParams["fldLangId"] = fldLangId;
        	    	reqParams["fldModule"] = fldModule;
        	    	
        	    	reqParams["fldTxnId"] = "SIN";
        	    	reqParams["fldScrnSeqNbr"] = "02";
        	    	
        	    	reqParams["fldAcctNo"] = fldAcctNo;
        	    	reqParams["fldTxnType"] = "A";
        	    	reqParams["fldNbrStmt"] = "10";
        	    	reqParams["fldFromDate"] = "";
        	    	reqParams["fldToDate"] = "";
        	    	
        	    	
        	    	fldjsessionid = Regfldjsessionid;
    		    	reqParams["fldLoginUserId"] =Regloginuid;
    		    	reqParams["fldSessionId"] = Rsessionid;
        	    	
        	    	if(fldAcctNo != undefined){
        		    	var invocationData = {
        		    			adapter : "Accounts",
            	        		procedure : "RRSIN02",
            	        		parameters : [fldjsessionid,reqParams,ipadd],
            	        		compressResponse : true
        		    	};
        		    	//WL.Logger.debug(invocationData, '');
        		    	
        		    	WL.Client.invokeProcedure(invocationData, {
        		    		onSuccess : self.accountStmtDetSubmitSuccess,
        		    		onFailure : AdapterFail,
        		    	});
                	}else{
                		busyInd.hide();		
                	}
                	
                	
        	    	//self.selAccount(fldAcctNo);
        	    	$("#acctType").html(acctType);
        	    	//$("#curraccbalval").html("Rs. "+curraccbalval);
        	    	self.curraccbalval("Rs. "+curraccbalval);
        		}
        	});
        	}
        };
        
        self.showAccountStatementData = function(){
        	$("#contentData").load("Views/Accounts/accountStatment.html", null, function (response, status, xhr) {
                if (status != "error") {}
                    ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
            });
        };
        
        self.getAccountsList = function(){
	    	
	    	reqParams = {};
	    	
	    	reqParams["fldDeviceId"] = fldDeviceId;
	    	reqParams["fldWebServerId"] = fldWebServerId;
	    	reqParams["fldAppId"] = fldAppId;
	    	reqParams["fldAppServerId"] = fldAppServerId;
	    	reqParams["fldLangId"] = fldLangId;
    		reqParams["fldModule"] = "CH";
	    	reqParams["fldTxnId"] = "SIN";
	    	reqParams["fldScrnSeqNbr"] = "01";
			
			fldjsessionid = Regfldjsessionid;
	    	reqParams["fldLoginUserId"] =Regloginuid;
	    	reqParams["fldSessionId"] = Rsessionid;
			
    		busyInd.show();
    		
	    	var invocationData = {
	    			adapter : "Accounts",
	        		procedure : "RRSIN01",
	        		parameters : [fldjsessionid,reqParams,ipadd],
	        		compressResponse : true
	    	};
	    	//WL.Logger.debug(invocationData, '');
	    	WL.Client.invokeProcedure(invocationData, {
	    		onSuccess : accountStmtSuccess,
	    		onFailure : AdapterFail,	    		
	    		timeout: timeout
	    	});
    	
    };
    
    self.ViewAccountStatements = function(){
    	accstmtdata = accStmtData();
    	acctcurr="";
    	txndata = accstmtdata.response.txndetails.transaction;
    	flgwarning = accstmtdata.response.flgWarning;
    	
    	accno = accstmtdata.response.codacctno;
    	acctype = accstmtdata.response.acctType;
    	txntype = accstmtdata.response.txntype;
    	acctcurr = accstmtdata.response.acctCurr;
    	if(typeof(invocationResult.faml.response.acctCurr)=='object'){
    		acctcurr = invocationResult.faml.response.acctCurr[0];
    		
    	};
    	closingbalance = accstmtdata.response.closingbalance;
    	fromdt = accstmtdata.response.fromdate;        	
    	todate = accstmtdata.response.todate;	
    	period = fromdt+" - "+todate;
    	
    	self.accountStmtTxns.removeAll();
    	$(txndata).each(function(index, obj) {
    		
    		if(obj.coddrcr == 'C')
    			amtLbl = 'Deposit';
    		else
    			amtLbl = 'Withdrawal';
    		
    		self.accountStmtTxns.push({ dattxn: obj.dattxn, amttxn: formatAmt(parseFloat(obj.amttxn)), amtLbl: amtLbl, refchqno: obj.refchqno, txttxndesc: obj.txttxndesc, datvalue: obj.datvalue, fldTxnType: obj.fldTxnType, balaftertxn: formatAmt(parseFloat(obj.balaftertxn)), txntype:txntype });
    	});
    	
    	if(fromdt != '' && todate != ""){
    		$(".strPeriod").show();
    	}else{
    		$(".strPeriod").hide();
    	}
    	
    	if(acctype == 'SAVINGS'){
    		acctypeLabel = "Savings Account No.";
    		savingAccno = accstmtdata.request.fldAcctNo_txt;
    	}else{
    		acctypeLabel = "Current Account No.";
    		savingAccno = accstmtdata.request.fldAcctNo_txt;
    	}
    	
    	if (status != "error") {}	
        $("#divaccno").html(accno);
     	$("#accPeriod").html(period);
     	$("#acctypeLabel").html(acctypeLabel);
     	$("#savingAccno").html(savingAccno);
     	$("#acctType").html(acctype);
     
     	if(self.accountStmtTxns().length === 0){
     		$("#accExitsMsg").show();
     		if(flgwarning == true)
 			{
     			msgwarning = accstmtdata.response.msgwarning;
     			$("#flgwarningMsg").show();
     			$("#flgwarningMsg p").html(msgwarning);
     			
 			}else{
 				$("#flgwarningMsg").hide();
 			}
     	}else{
     		$("#accExitsMsg").hide();
     	}
     	$("#closingbalval").html("");
     	if(txntype == 'A'){
     		$("#closingbalLabel").html("Closing Balance");
     		$("#closingbalval").html(acctcurr+" "+formatAmt(parseFloat(closingbalance)));
     	}else{
     		$("#closingbalLabel").html("Currency");
     		$("#closingbalval").html(acctcurr);
     	}
    };
    self.rrcsi01Submit = function(){
        
    	if($("#frmchequestatus").valid()){
    	busyInd.show();        	
    	fldLoginUserId = Regloginuid;
    	fldFCDBSessionId =RegfldFCDBSessionId;
    	fldjsessionid = Regfldjsessionid;
    	
    	fldFCDBRequestId = $("#fldFCDBRequestId").val();
		
    	fldEntityId = "";    	    	
    	
    	CodAcctNo = $.trim(self.selAccount());
    	CodAcctNo_txt = $("#fldAcctNo option:selected").text();
    	fldChequeNo = $("#fldChequeNo").val();
    
    	reqParams = {};
    	
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["CodAcctNo"] = CodAcctNo;
    	reqParams["fldChequeNo"] = fldChequeNo;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
		reqParams["fldModule"] = "CH";
    	reqParams["fldTxnId"] = "CSI";
    	reqParams["fldScrnSeqNbr"] = "02";
    	
    	
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
    	
    	var invocationData = {
    			adapter : "Accounts",
        		procedure : "RRCSI02",
        		parameters : [fldjsessionid,reqParams,ipadd],
        		compressResponse : true
    	};
    	
    	//WL.Logger.debug(invocationData, '');
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : rrcsi02Response,
    		onFailure : AdapterFail,
    		timeout: timeout
    	});
    	}
    	
    };    
    rrcsi02Response = function(result){
    	busyInd.hide();
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
    			
    			if(window.location.hash == "#rrcsi02"){
    				codacctno = invocationResult.faml.response.codacctno;
    	        	chequestatus = invocationResult.faml.response.chequestatus;
    	        	chequeno = invocationResult.faml.response.chequeno;        	
    	        	fldFCDBRequestId = invocationResult.faml.response.mci.requestid;        	    	
    	        	fldEntityId = invocationResult.faml.request.fldEntityId;
    			
    	        	$("#codacctno").html(codacctno);
	                $("#chequeno").html(chequeno);
	                $("#chequestatus").html(chequestatus);
	                $("#fldFCDBRequestId").val(fldFCDBRequestId);
	                
    			}else{
	    			accStmtData(invocationResult.faml);    
	    			window.location = "#rrcsi02";
    			}
    		}else{
    			handleError(invocationResult.faml.response);
    		}
    		}else{
				handleErrorNoResponse();
			}
    	}
    };
    self.GetCheckStatus = function(){
    	
    	accstmtdata = accStmtData();
    	codacctno = accstmtdata.response.codacctno;
    	chequestatus = accstmtdata.response.chequestatus;
    	chequeno = accstmtdata.response.chequeno;        	
    	fldFCDBRequestId = accstmtdata.response.mci.requestid;        	    	
    	fldEntityId = accstmtdata.request.fldEntityId;
    	        	 
         
	  
                            
            $("#codacctno").html(codacctno);
            $("#chequeno").html(chequeno);
            $("#chequestatus").html(chequestatus);
            $("#fldFCDBRequestId").val(fldFCDBRequestId);
          
          
    	
    };
    self.ViewCheckStatements = function(){
    	self.selAccount(null);
    	
    	busyInd.show();        	
    	fldLoginUserId = Regloginuid;
    	fldFCDBSessionId = RegfldFCDBSessionId;
    	fldjsessionid = Regfldjsessionid;
    	
    	fldFCDBRequestId ="";
		fldTxnId = "";
    	fldRequestId = "RRCSI01";
    	fldEntityId = "";
    	SLogo = ""; STitle = ""; Static = "";
    	
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
		reqParams["fldModule"] = "CH";
    	reqParams["fldTxnId"] = "CSI";
    	reqParams["fldScrnSeqNbr"] = "01";
    	
    	
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
    	
    	var invocationData = {
    			adapter : "Accounts",
        		procedure : "RRCSI01",
        		parameters : [fldjsessionid,reqParams,ipadd],
        		compressResponse : true
    	};
    	
    	//WL.Logger.debug(invocationData, '');
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : accountStmtSuccess,
    		onFailure : AdapterFail,
    		timeout: timeout
    	});
    	
    };
    accountStmtSuccess = function(result){
    	
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
    			custdtls = "";
    			if(invocationResult.faml.response.CustDtls)
    			custdtls = invocationResult.faml.response.CustDtls;
    			ISNRCUSTOMER=invocationResult.faml.response.isNRCustomer;
    			accountdata = invocationResult.faml.response.acctdtls;
	    		nbrofsavingacc = invocationResult.faml.response.nbrsavingacct;
	    		nbrofcurrentacc = invocationResult.faml.response.nbrcurrentacct;
	    		fldFCDBRequestId = invocationResult.faml.response.mci.requestid;
	    		
	    		totAccount = parseInt(nbrofsavingacc) + parseInt(nbrofcurrentacc);
	    		
	    		if(window.location.hash == '#rrftr02'){
	    			if(totAccount <= 1){
	    				accSlider(false);
		    			$("#accExitsMsg").show();		    			
		    		}else{
		    			accSlider(true);
		    			$("#accExitsMsg").hide();
		    		}
	    		}else{
		    		if(totAccount > 0){
		    			accSlider(true);
		    			$("#accExitsMsg").hide();
		    		}else{
		    			accSlider(false);
		    			$("#accExitsMsg").show();
		    		}
	    		}
	    		accountList.removeAll();
	    		var idx = 1;
	    		$(accountdata).each(function(index, obj) {
	    			strid = "item"+idx;
	    			custnames = "";
	    			if(window.location.hash == '#rrftr02')
	    				displaytxt = $.trim(obj.codacctno)+"#"+obj.nambranch;
	    			else
	    				displaytxt = $.trim(obj.codacctno)+"-"+obj.nambranch;
	    			
	    			if(custdtls != ''){
	    				$(custdtls).each(function(j, obj1) {
	    	    			
    	    				if(obj.acctindex == obj1.acctindex){
    	    				//	if(obj1.custRel == 'SOW' || obj1.custRel == 'JOF' || obj1.custRel == 'JOO' || obj1.custRel == 'AUS'){
								 if(obj1.custRel != 'AUS' && obj1.custRel != 'GUA' && obj1.custRel != 'NOM' && obj1.custRel != 'POA'){
    	    					custnames += obj1.userName+" , ";
						
                                    Custname=removeLastComma(custnames);
									console.log(Custname);
    	    					}
    	    				}
    	    			});
	    			}
	    			var custTpe= '';
							
					  if(ISNRCUSTOMER=='Y'){
					
    	    			if(obj.txtmsgadv){
    	    				custTpe = obj.txtmsgadv;
    	    			}else {
    	    				custTpe = '';
    	    			}
    	    		 }
	    			accountValue = $.trim(obj.codacctno)+"#"+obj.namccyshrt+"#"+$.trim(obj.acctbalance);
	    		    accountList.push({ codacctno: obj.codacctno, acctType: obj.acctType, acctbalance: obj.acctbalance, acctbranch: obj.acctbranch, custnames: Custname, namccyshrt: obj.namccyshrt, strid:strid, displaytxt:displaytxt, fldFCDBRequestId:fldFCDBRequestId, accountValue: accountValue,custtype1:custacctype[$.trim(obj.codacctno)] });
	    		    idx++;
	    		}); 
	    		
	    		$("#fldFCDBRequestId,#fldRequestId").val(fldFCDBRequestId);
	    		
    		}else{
    			handleError(invocationResult.faml.response);
    			if(invocationResult.faml.response.rc != undefined){
    			if(invocationResult.faml.response.rc.errorcode != "10020"){
    			window.location = "#rrasm01";
    			}
    			}
    		}
    	 }else{
				handleErrorNoResponse();
			}
    	}
    	busyInd.hide();
    };
    accountStmtSubmit = function(){
    	if($("#frmsin01").valid()){
	    	busyInd.show();
	    	
	    	fldLoginUserId = Regloginuid;
	    	fldFCDBSessionId = RegfldFCDBSessionId;
        	fldjsessionid = Regfldjsessionid;
        	fldSessionId = Rsessionid;
			
        	fldAcctNo = self.selAccount();
        	fldAcctNo_txt = $("#fldAcctNo option:selected").text();
        	fldTxnType = $("#fldTxnType").val();
        	fldTxnType_txt = $("#fldTxnType option:selected").text();
        	fldNbrStmt = $("#fldNbrStmt").val();
        	fldNbrStmt_txt = $("#fldNbrStmt option:selected").text();
        	fldFromDate = $("#fldFromDate").val();
        	fldToDate = $("#fldToDate").val();
        	
        	fldEntityId = "";
        	fldFCDBRequestId = $("#fldFCDBRequestId").val();
        	fldRequestId = "RRSIN02";
        	fldScrnSeqNbr = "02";
        	
        	
        	reqParams["fldDeviceId"] = fldDeviceId;
	    	reqParams["fldWebServerId"] = fldWebServerId;
	    	reqParams["fldAppId"] = fldAppId;
	    	reqParams["fldAppServerId"] = fldAppServerId;
	    	reqParams["fldLangId"] = fldLangId;
    		reqParams["fldModule"] = fldModule;
	    	reqParams["fldTxnId"] = "SIN";
	    	reqParams["fldScrnSeqNbr"] = "02";
	    	reqParams["fldAcctNo"] = fldAcctNo;
	    	reqParams["fldAcctNo_txt"] = fldAcctNo_txt;
	    	reqParams["fldTxnType"] = fldTxnType;
	    	reqParams["fldNbrStmt"] = fldNbrStmt;
	    	reqParams["fldFromDate"] = fldFromDate;
	    	reqParams["fldToDate"] = fldToDate;
	    	
			fldjsessionid = Regfldjsessionid;
	    	reqParams["fldLoginUserId"] =Regloginuid;
	    	reqParams["fldSessionId"] = Rsessionid;
	    	
	    	
	    	var invocationData = {
	    			adapter : "Accounts",
	        		procedure : "RRSIN02",
	        		parameters : [fldjsessionid,reqParams,ipadd],
	        		compressResponse : true
	    	};
	    	//WL.Logger.debug(invocationData, '');
	    	
	    	WL.Client.invokeProcedure(invocationData, {
	    		onSuccess : accountStmtSubmitSuccess,
	    		onFailure : AdapterFail,	    		
	    		timeout: timeout
	    	});
    	}
    };
    
    accountStmtSubmitSuccess = function(result){
    	busyInd.hide();
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
	    		if(invocationResult.faml.response.rc.returncode == 0){
	    			accStmtData(invocationResult.faml);    			
	    			window.location = "#rrsin02";
	    		}else{
	    			handleError(invocationResult.faml.response);
	    		}
    		}else{
				handleErrorNoResponse();
			}
    	}
    };
    
    this.callrrftr02 = function(){
    	
    	reqParams = {};
    	
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldModule"] = fldModule;
    	
    	reqParams["fldTxnId"] = "FTR";
    	reqParams["fldScrnSeqNbr"] = "01";
		
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
    	
    	busyInd.show();
    	var invocationData = {
    			adapter : "Accounts",
        		procedure : "RRFTR02",
        		parameters : [fldjsessionid,reqParams,ipadd],
        		compressResponse : true
    	};
    	
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : accountStmtSuccess,
    		onFailure : AdapterFail,	    		
    		timeout: timeout
    	});
    	
    	
    	$("#contentData").load("Views/Accounts/rrftr02.html", null, function (response, status, xhr) {
            if (status != "error") {}
            ko.applyBindings(self, $(".dynamic-page-content").get(0));
    	});
	
    };
    
    this.rrftr02Submit = function(){
        
    	if($("#frmftr02").valid()){
    	busyInd.show();        	
     	fldLoginUserId = Regloginuid;
    	fldFCDBSessionId = RegfldFCDBSessionId;
    	fldjsessionid = Regfldjsessionid;
    	fldSessionId = Rsessionid;
    	fldFCDBRequestId = $("#fldFCDBRequestId").val();
		fldTxnId = "FTR";
    	fldRequestId = "RRFTR03";
    	fldEntityId = "";    	    	
    	fldScrnSeqNbr = "02";
    	fldFromAcctNo = $.trim(self.fldFromAcctNo());
    	fldFromAcctNo_txt = $("#fldFromAcctNo option:selected").text();
    	fldToAcctNo = $.trim(self.fldToAcctNo());
    	fldToAcctNo_txt = $("#fldToAcctNo option:selected").text();
    	fldAmtTxn = $("#fldAmtTxn").val();    
    	
    	
    	reqParams = {};
    	
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldModule"] = "RD";
    	
    	reqParams["fldOperationId"] = "RRFTR03";
    	reqParams["fldTxnId"] = "FTR";
    	reqParams["fldScrnSeqNbr"] = "02";
    	
    	
    	fldfromacctno = self.fldFromAcctNo();
    	fldtoacctno = self.fldToAcctNo();
    	
    	
    	arrfromaccno = fldfromacctno.split("#");
    	fldfromacctno = arrfromaccno[0];
    	fldNamCcy = arrfromaccno[1];
    	fldFrmAcctBal = arrfromaccno[2];
    	
    	arrtoaccno = fldtoacctno.split("#");
    	fldtoacctno = arrtoaccno[0];
    	fldToNamCcy = arrtoaccno[1];
    	fldToAcctBal = arrtoaccno[2];
    	
    	arrfromaccno_txt = fldFromAcctNo_txt.split("#");
    	fldFromBrn = arrfromaccno_txt[1];
    	
    	arrtoaccno_txt = fldToAcctNo_txt.split("#");
    	fldToBrn = arrtoaccno_txt[1];
    	
    	reqParams["fldFromAcctNo"] = fldfromacctno;
    	reqParams["fldToAcctNo"] = fldtoacctno;
    	reqParams["fldFromBrn"] = fldFromBrn;
    	reqParams["fldToBrn"] = fldToBrn;
    	reqParams["fldAmtTxn"] = fldAmtTxn;
    	reqParams["fldToAcctBal"] = fldToAcctBal;
    	reqParams["fldFrmAcctBal"] = fldFrmAcctBal;
    	reqParams["fldNamCcy"] = fldNamCcy;
    	reqParams["fldToNamCcy"] = fldToNamCcy;
    	
    	reqParams["fldFromAcctNo_txt"] = fldFromAcctNo_txt;
    	reqParams["fldToAcctNo_txt"] = fldToAcctNo_txt;
		
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
    	
    	
    	var invocationData = {
    			adapter : "Accounts",
        		procedure : "RRFTR03",
        		parameters : [fldjsessionid,reqParams,ipadd],
        		compressResponse : true
    	};
    	
    	//WL.Logger.debug(invocationData, '');
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : self.rrftr03Response,
    		onFailure : AdapterFail,
    		timeout: timeout
    	});
    	
    	
    	}
    	
    };  
    
    this.callrrftr03 = function(){
    	accstmtdata = accStmtData();
    	
    	fldfromacctno = accstmtdata.response.fldFromAcctNo;
    	fldNamCcy = accstmtdata.response.fldNamCcy;
    	fldFromBrn = accstmtdata.response.fldFromBrn;
    	
    	fldtoacctno = accstmtdata.response.fldToAcctNo;
    	fldToNamCcy = accstmtdata.response.fldToNamCcy;
    	fldToBrn = accstmtdata.response.fldToBrn;
    	
    	fldamttxn = accstmtdata.response.fldAmtTxn;
    	
    	fldfromacctno_txt = accstmtdata.request.fldFromAcctNo_txt;
    	fldtoacctno_txt = accstmtdata.request.fldToAcctNo_txt;
    	
    	fldFCDBRequestId = accstmtdata.response.mci.requestid;        	        	
    	fldEntityId = accstmtdata.request.fldEntityId;
    	
    	//alert(fldfromacctno);
    	
	    $("#contentData").load("Views/Accounts/rrftr03.html", null, function (response, status, xhr) {
            if (status != "error") {}	
            
            $("#fldfromacctno").html(fldfromacctno);
            $("#fldtoacctno").html(fldtoacctno);
        	$(".fldamttxn").html(fldToNamCcy+" "+formatAmt(parseFloat(fldamttxn)));
        	$("#fldamttxn").val(fldamttxn);
        	
        	$("#fldNamCcy").val(fldNamCcy);
        	$("#fldToNamCcy").val(fldToNamCcy);
        	$("#fldFromBrn").val(fldFromBrn);
        	$("#fldToBrn").val(fldToBrn);
            
            $("#fldFCDBRequestId,#fldRequestId").val(fldFCDBRequestId);            	          	
          
            ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
        });
	    
    };
    
    this.rrftr03Response = function(result){
    	busyInd.hide();
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
	    		if(invocationResult.faml.response.rc.returncode == 0){
		    			accStmtData(invocationResult.faml);    
		    			window.location = "#rrftr03";
	    		}else{
	    			handleError(invocationResult.faml.response);
	    		}
    		}else{
				handleErrorNoResponse();
			}
    	}
    };
    
    this.rrftr03Submit = function(){
            	
    	busyInd.show();        	
     	fldLoginUserId = Regloginuid;
    	fldFCDBSessionId = RegfldFCDBSessionId;
    	fldjsessionid = Regfldjsessionid;
    	fldSessionId = Rsessionid;
    	fldRequestId = $("#fldRequestId").val();
		fldTxnId = "FTR";
    	
    	fldEntityId = "";    	    	
    	fldScrnSeqNbr = "03";
    	fldFromAcctNo = $("#fldfromacctno").html()+"++";    	
    	fldToAcctNo = $("#fldtoacctno").html()+"++";   	
    	fldAmtTxn = $("#fldamttxn").val();
    	fldNamCcy = $("#fldNamCcy").val();
    	fldToNamCcy = $("#fldToNamCcy").val();
    	fldFromBrn = $("#fldFromBrn").val();
    	fldToBrn = $("#fldToBrn").val();
    	
    	reqParams = {};
    	
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldModule"] = "RD";
    	
    	reqParams["fldOperationId"] = "RRFTR04";
    	
    	reqParams["fldTxnId"] = "FTR";
    	reqParams["fldScrnSeqNbr"] = "03";
    	reqParams["fldRequestId"] = fldRequestId;
    	
    	reqParams["fldFromAcctNo"] = fldFromAcctNo;
    	reqParams["fldToAcctNo"] = fldToAcctNo;
    	reqParams["fldFromBrn"] = fldFromBrn;
    	reqParams["fldToBrn"] = fldToBrn;
    	reqParams["fldAmtTxn"] = fldAmtTxn;
    	reqParams["fldNamCcy"] = fldNamCcy;
    	reqParams["fldToNamCcy"] = fldToNamCcy;
    	
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
    	
    	
    	var invocationData = {
    			adapter : "Accounts",
        		procedure : "RRFTR04",
        		parameters : [fldjsessionid,reqParams,ipadd],
        		compressResponse : true
    	};
    	
    	//WL.Logger.debug(invocationData, '');
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : self.rrftr04Response,
    		onFailure : AdapterFail,
    		timeout: timeout
    	});
    	
    	
    };    
    this.rrftr04Response = function(result){
    	busyInd.hide();
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
	    			accStmtData(invocationResult.faml);   
	    			
	    			accountList.removeAll();
	                accountSummList.removeAll();
	                
	    			window.location = "#rrftr04";
    		}else{
    			handleError(invocationResult.faml.response);
    		}
    		}else{
				handleErrorNoResponse();
			}
    	}
    };
    
    this.callRRRDO01 = function(){
    	
    	reqParams = {};
    	
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldModule"] = fldModule;
    	
    	reqParams["fldOperationId"] = "RRRDO01";

    	reqParams["fldTxnId"] = "RDO";

    	reqParams["fldScrnSeqNbr"] = "01";
		
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
    	
    	busyInd.show();
    	var invocationData = {
    			adapter : "Accounts",
        		procedure : "RRRDO01",
        		parameters : [fldjsessionid,reqParams,ipadd],
        		compressResponse : true
    	};
    	
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : self.rrrdo01Response,
    		onFailure : AdapterFail,	    		
    		timeout: timeout
    	});
    	    	
	
    };
    
    this.rrrdo01Response = function(result){
    
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
	    		   
    			itemdata = invocationResult.faml.response.acctdtls;
    			
    			if(invocationResult.faml.response.producttype){
	    			fldAmtMin = invocationResult.faml.response.producttype.amtMin;
	    			fldAmtMax = invocationResult.faml.response.producttype.amtMax;
	    			fldTermMin = invocationResult.faml.response.producttype.l_termMin;
	    			fldTermMax = invocationResult.faml.response.producttype.l_termMax;
	    			
	    			// get month list
		    		trmMaxIntr = invocationResult.faml.response.producttype.l_termInterval;
		    		
		    		self.rdMonthList.removeAll();
		    		
		    		if(trmMaxIntr != ''){
		    			for (var cnt = 0; cnt < 12; cnt++) {
		    				if (((cnt % trmMaxIntr) == 0) && (cnt!=0) && (cnt !="")) {
		    					self.rdMonthList.push({"txt" : cnt, "val" : cnt });
		    				}
		    			}
		    		}
	    			
		    		// get year list
		    		trmMax = invocationResult.faml.response.producttype.l_termMax;
		    		
		    		self.rdYearList.removeAll();
		    		
		    		if(trmMax != ''){
		    			for (var x = 0; x <= Math.floor(trmMax / 12); x++) {
		    				self.rdYearList.push({"txt" : x, "val" : x });	    				
		    			}
		    		}
		    		
    			}else{
    				fldAmtMin = "";
        			fldAmtMax = "";
        			fldTermMin = "";
        			fldTermMax = "";
    			}
    			rdAccountList.removeAll();
    			var idx = 1;
	    		
	    		$(itemdata).each(function(index, obj) {
	    				    			
	    			displaytxt = $.trim(obj.codacctno)+"-"+obj.acctbranch;
	    			acctbalance = parseFloat(obj.acctbalance);
	    			
	    			rdAccountList.push({ codacctno: obj.codacctno, acctType: obj.acctType, acctbalance: acctbalance, codacctstat: obj.codacctstat, nambranch: obj.nambranch, namccyshrt: obj.namccyshrt, codccy: obj.codccy, acctHostID: obj.acctHostID, acctstate: obj.acctstate, acctcity: obj.acctcity, acctbranch: obj.acctbranch, acctbranchCode: obj.acctbranchCode, displaytxt: displaytxt });
	    		    idx++;
	    		});
	    		
	    		
	    		
    			$("#contentData").load("Views/Accounts/rrrdo01.html", null, function (response, status, xhr) {
    	            if (status != "error") {}
    	            
    	            nbrofsavingacc = invocationResult.faml.response.nbrsavingacct;
    	    		nbrofcurrentacc = invocationResult.faml.response.nbrcurrentacct;
    	    		
    	    		totAccount = parseInt(nbrofsavingacc) + parseInt(nbrofcurrentacc);
        			if(totAccount > 0 ){
    	    			accSlider(true);
    	    			$("#accExitsMsg").hide();
    	    		}else{
    	    			accSlider(false);
    	    			$("#accExitsMsg").show();
    	    		}
    	            
    	            
    	            $("#fldAmtMin").val(fldAmtMin);
    	            $("#fldAmtMax").val(fldAmtMax);
    	            $("#fldTermMin").val(fldTermMin);
    	            $("#fldTermMax").val(fldTermMax);
    	            
    	            ko.applyBindings(self, $(".dynamic-page-content").get(0));
$('body').height($('#wrapper').height());
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
    
    self.RDFromAccountChange = function(){
    	
    	selaccno = self.selAcctTemp();
    	accdata = rdAccountList();
    	
    	if(selaccno != '' && selaccno != null && selaccno != undefined){
    	$(accdata).each(function(index, accnodet) {
    		
    		if(accnodet.codacctno == selaccno){
    			
    			$("#selAcct").val(accnodet.codacctno);
    			$("#fldState").val($.trim(accnodet.acctstate));
    			$("#fldCity").val($.trim(accnodet.acctcity));
    			$("#fldBrnname").val($.trim(accnodet.acctbranch));
    			$("#fldFdBrnNam").val($.trim(accnodet.acctbranch));
    			$("#fldBrn").val($.trim(accnodet.acctbranchCode));
    			$("#balance").val($.trim(accnodet.acctbalance));
    			
    			$("#fldAcctNbr").val($.trim(accnodet.codacctno));	
    			$("#fldAmtBal").val($.trim(accnodet.acctbalance));
    			$("#fldAcctCurr").val($.trim(accnodet.codccy));
    			$("#fldNamCurrency").val($.trim(accnodet.namccyshrt));
    		}
    	});
    	}
    };
    
    self.fldIntCrAcctNoTemp.subscribe(function(crdacc) {    	
    	$("#fldIntCrAcctNo").val($.trim(crdacc));
    	$("#fldIntAcctNo").val($.trim(crdacc));
    });
    
    this.rrrdo01Submit = function(){
        
    	if($("#frmrdo01").valid()){
    		errflag = true;
    		minamt = $("#fldAmtMin").val();
    		maxamt = $("#fldAmtMax").val();
    		depoamt = $("#fldDepositAmt").val();
    		var minterm=$("#fldTermMin").val();
    		var maxterm=$("#fldTermMax").val();
    		var fldmonth=$("#fldTermMonths").val();
    		var fldyr=$("#fldTermYrs").val();
    		var fldtotal=0;
    		if(fldyr){
    			if(fldmonth){
    	    fldtotal=(parseInt(fldyr)*12)+(parseInt(fldmonth));
    			}else {fldtotal=parseInt(fldyr)*12;}
    		}
    		else if(fldmonth){
    			fldtotal=parseInt(fldmonth);}
    		else{
    			fldtotal=0;
    			
    		}
    		//alert(fldtotal);
    	if(fldtotal > maxterm || fldtotal < minterm ){
    		errflag = false;
			alert("RD Tenure range set for this account are: min = "+ minterm+" Months, max= "+maxterm/12 +" Years");
    		
    	}	
    	
    	
    	
		//alert(parseFloat(depoamt)+"===="+parseFloat(minamt));
		
		if(parseFloat(depoamt) < parseFloat(minamt)){
			errflag = false;
			alert("Amount entered should be more than or equal to min amount("+minamt+")");
		}
		else if(parseFloat(depoamt) > parseFloat(maxamt)){
			errflag = false;
			alert("Amount entered should be more than or equal to min amount("+maxamt+")");
		}
		else if(parseFloat(depoamt)%10!= 0){
			errflag = false;
			alert("Amount entered should be multiple of 100");
			
		}
    		
    	if(errflag){	
    	busyInd.show();        	
    	    
    	var $form = $("#frmrdo01");
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
    	
    	

    	
    	reqParams["fldRequestId"] =RegfldRequestId;
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
    	
    	
    	var invocationData = {
    			adapter : "Accounts",
        		procedure : "RRRDO02",
        		parameters : [fldjsessionid,reqParams,ipadd],
        		compressResponse : true
    	};
    	
    	//WL.Logger.debug(invocationData, '');
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : self.rrrdo02Response,
    		onFailure : AdapterFail,
    		timeout: timeout
    	});
    	
    	}
    	}
    };  
    
    this.rrrdo02Response = function(result){
    	busyInd.hide();
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
    			accStmtData(invocationResult.faml);    
    			window.location = "#rrrdo02";
    		}else{
    			handleError(invocationResult.faml.response);
    		}
    		}else{
				handleErrorNoResponse();
			}
    	}
    };
    
    this.callRRRDO02 = function(){
    	accstmtdata = accStmtData();
    	
    	codAcctNbr = accstmtdata.response.verifyDtls.codAcctNbr;
    	stateName = accstmtdata.response.verifyDtls.stateName;
    	cityName = accstmtdata.response.verifyDtls.cityName;
    	
    	codFdBrnName = accstmtdata.response.verifyDtls.codFdBrnName;
    	tdDepositAmt = accstmtdata.response.verifyDtls.tdDepositAmt;
    	prdOfDep = accstmtdata.response.verifyDtls.prdOfDep;
    	codFdBrn = accstmtdata.response.verifyDtls.codFdBrn;
    	custName = accstmtdata.response.verifyDtls.custName;
    	fldAmtBal = accstmtdata.response.verifyDtls.fldAmtBal;
    	intPayAcctNbr = accstmtdata.response.verifyDtls.intPayAcctNbr;
    	
    	fldTermYrs = accstmtdata.response.verifyDtls.fldTermYrs;
    	fldTermMonths = accstmtdata.response.verifyDtls.fldTermMonths;
    	fldNamCurrency = accstmtdata.request.fldNamCurrency;
    	fldAcctCurr = accstmtdata.request.fldAcctCurr;
    	fldFdBrnNam = accstmtdata.response.verifyDtls.fldFdBrnNam;
    	fldRDPlace = accstmtdata.response.verifyDtls.fldRDPlace;
    	
    	requestid = accstmtdata.response.mci.requestid;
    	
	    $("#contentData").load("Views/Accounts/rrrdo02.html", null, function (response, status, xhr) {
            if (status != "error") {}	
            
            $("#fldRequestId").val(requestid);
            
            $(".codAcctNbr").html(codAcctNbr);
            $(".stateName").html(stateName);
        	$(".cityName").html(cityName);
        	$(".codFdBrnName").html(codFdBrnName);
        	$(".tdDepositAmt").html(formatAmt(parseFloat(tdDepositAmt)));
        	$(".prdOfDep").html(prdOfDep);
        	$(".intPayAcctNbr").html(intPayAcctNbr);
        	
        	
        	$("#selAcct").val(codAcctNbr);
        	$("#fldTermYrs").val(fldTermYrs);
        	$("#fldTermMonths").val(fldTermMonths);
        	$("#fldCity").val(cityName);
        	$("#fldState").val(stateName);
        	$("#fldNamCurrency").val(fldNamCurrency);
        	$("#fldIntCrAcctNo").val(intPayAcctNbr);
        	$("#fldDepositAmt").val(tdDepositAmt);
        	$("#fldAcctCurr").val(fldAcctCurr);
        	$("#fldBrnname").val(codFdBrnName);
        	$("#fldBrn").val(codFdBrn);
        	$("#fldFdBrnNam").val(codFdBrnName);
        	$("#custName").val(custName);
        	$("#fldCustName").val(custName);
        	$("#fldAmtBal").val(fldAmtBal);
        	
            ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
        });
	    
    };
    		
    this.rrrdo02Submit = function(){
    	if($("#frmrdo02").valid()){
        	busyInd.show(); 
    		
	    
    	var $form = $("#frmrdo02");
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
    	

    	
    	
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
    	
    	
    	var invocationData = {
    			adapter : "Accounts",
        		procedure : "RRRDO03",
        		parameters : [fldjsessionid,reqParams,ipadd],
        		compressResponse : true
    	};
    	
    	//WL.Logger.debug(invocationData, '');
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : self.rrrdo03Response,
    		onFailure : AdapterFail,
    		timeout: timeout
    	});	
    	}
    };
    
    this.rrrdo03Response = function(result){
    	
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
    			accStmtData(invocationResult.faml);    
    			window.location = "#rrrdo03";
    		}else{
    			handleError(invocationResult.faml.response);
    		}
    		
    		}else{
				handleErrorNoResponse();
			}
    	}
    };
    
    this.callRRRDO03 = function(){
    	accstmtdata = accStmtData();
    	
    	custName = accstmtdata.response.finalDtls.custName;
    	branch = accstmtdata.response.finalDtls.branch;
    	prdOfDep = accstmtdata.response.finalDtls.prdOfDep;    	
    	depAmt = accstmtdata.response.finalDtls.depAmt;
    	amtinwords = accstmtdata.response.amtInWords;
    	if(typeof(invocationResult.faml.response.amtInWords)=='object'){
    		amtinwords = accstmtdata.response.amtInWords[0];
    		
    	};
    	
    	namCurrency = accstmtdata.response.finalDtls.namCurrency;
    	rdAccountNo = accstmtdata.response.finalDtls.rdAccountNo;    	
    	depAmt = accstmtdata.response.finalDtls.depAmt;
    	tdStartDate = accstmtdata.response.finalDtls.tdStartDate;
    	
    	rdTerm = accstmtdata.response.finalDtls.rdTerm;
    	tdIntRate = accstmtdata.response.finalDtls.tdIntRate;
    	depMatDate = accstmtdata.response.finalDtls.depMatDate;
    	depMatAmt = accstmtdata.response.finalDtls.depMatAmt;
    	
	    $("#contentData").load("Views/Accounts/rrrdo03.html", null, function (response, status, xhr) {
            if (status != "error") {}	
            
            $(".custName").html(custName);
            $(".branch").html(branch);
        	$(".prdOfDep").html(prdOfDep);
        	$(".depAmt").html(depAmt);
        	$(".amtinwords").html(amtinwords);
        	$(".namCurrency").html(namCurrency);
        	$(".rdAccountNo").html(rdAccountNo);
        	$(".tdStartDate").html(tdStartDate);
        	$(".rdTerm").html(rdTerm);
        	$(".tdIntRate").html(formatAmt(parseFloat(tdIntRate)));
        	$(".depMatDate").html(depMatDate);
        	$(".depMatAmt").html(depMatAmt);
        	
        	accountList.removeAll();
            accountSummList.removeAll();
          
            ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
        });
	    busyInd.hide();
    };
    
    
    this.callRRTXI01 = function(){
    	
    	reqParams = {};    	
    	
    	$("#contentData").load("Views/Accounts/rrtxi01.html", null, function (response, status, xhr) {
            if (status != "error") {}
                ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
        });  
    };
    
    this.rrtxi01Response = function(result){
    	busyInd.hide();
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
    			accStmtData(invocationResult.faml);    
    			
    		}else{
    			handleError(invocationResult.faml.response);
    		}
    		
    		}else{
				handleErrorNoResponse();
			}
    	}
    };
    
    this.rrtxi01Submit = function(){
        
    	if($("#frmtxi01").valid()){
    	busyInd.show();        	
    	
    	var $form = $("#frmtxi01");
    	rsaDataArray = $form.serializeArray();    	
    	    	    	
    	reqParams = {};
    	for (var i in rsaDataArray) {
    		reqParams[rsaDataArray[i].name] = rsaDataArray[i].value;
    	}
    	
		fldFlgYear = $("#fldFlgYear").val();
    	fldFlgYear_txt = $("#fldChecked option:selected").text();    
    	
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldModule"] = fldModule;
    	
 
    	reqParams["fldFlgYear_txt"] = fldFlgYear_txt;
    	reqParams["rdyear"] = fldFlgYear;
    	reqParams["fldAppId"] = fldAppId;
    	
    	
    	reqParams["fldRequestId"] =RegfldRequestId;
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
    	
    	
    	var invocationData = {
    			adapter : "Accounts",
        		procedure : "RRTXI02",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	//WL.Logger.debug(invocationData, '');
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : self.rrtxi02Response,
    		onFailure : AdapterFail,
    		timeout: timeout
    	});
    	}
    	
    };    
    this.rrtxi02Response = function(result){
    	busyInd.hide();
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
	    			accStmtData(invocationResult.faml);    
	    			window.location = "#rrtxi02";
    		}else{
    			handleError(invocationResult.faml.response);
    		}
    		}else{
				handleErrorNoResponse();
			}
    	}
    };
    
    this.callRRTXI02 = function(){
    	accstmtdata = accStmtData();
    	
    	branchdetails = accstmtdata.response.branchdetails;
    	tdsacctdtl = accstmtdata.response.tdsacctdtl;
    	
    	self.tdsArray1.removeAll();
    	self.tdsArray2.removeAll();
    	
		$(branchdetails).each(function(index, obj) {    
			var tdsrate1="";
			if(obj.tdsrate != undefined){
				tdsrate1=formatAmt(parseFloat(obj.tdsrate));
			}
			self.tdsArray1.push({ nambranch: obj.nambranch, totintearned:formatAmt(parseFloat(obj.totintearned)), tdsrate:tdsrate1, tottdsamt: formatAmt(parseFloat(obj.tottdsamt)) });
		}); 
    	
		$(tdsacctdtl).each(function(index, obj) {    			    			
			self.tdsArray2.push({ codacctno: obj.codacctno, intearned: formatAmt(parseFloat(obj.intearned)), acctcurr: obj.acctcurr, tdsamt: formatAmt(parseFloat(obj.tdsamt))});
		});
		
		period = accstmtdata.response.finyear;
		
	    $("#contentData").load("Views/Accounts/rrtxi02.html", null, function (response, status, xhr) {
            if (status != "error") {}
          
            if(period == 'C')
            	$("#period").html("*Current Financial Year");
            if(period == 'P')
            	$("#period").html("Previous Financial Year");
            
            ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
        });
    };
    
    this.callRRHIQ01 = function(){
    	
    	reqParams = {};
    	
		reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldModule"] = fldModule;
    	
    	reqParams["fldTxnId"] = "HIQ";
    	reqParams["fldScrnSeqNbr"] = "01";
    	reqParams["fldOperationId"] = "RRHIQ01";
    	
    
    			
    	reqParams["fldRequestId"] =RegfldRequestId;
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
    	
    	busyInd.show();        	
    	
    	var invocationData = {
    			adapter : "Accounts",
        		procedure : "RRHIQ01",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	//WL.Logger.debug(invocationData, '');
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : self.rrhiq01Response,
    		onFailure : AdapterFail,
    		timeout: timeout
    	});	    	
    	
    	$("#contentData").load("Views/Accounts/rrhiq01.html", null, function (response, status, xhr) {
            if (status != "error") {}
                ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
        });  
    };
    
    this.rrhiq01Response = function(result){
    	self.agencyList.removeAll();
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
    			
    			agencydata = invocationResult.faml.response.agencydtls;    			
    			fldFCDBRequestId = invocationResult.faml.response.mci.requestid;
    		
	    		$(agencydata).each(function(index, obj) {
	    			
	    			displaytxt = obj.codacctno+"-"+obj.namacctbrn;	    			
	    			accountValue = obj.codacctno+"###"+obj.namacctbrn;
	    				self.agencyList.push({ codacctno: obj.codacctno, namacctbrn: obj.namacctbrn, name: obj.name, id: obj.id,  displaytxt:displaytxt, fldFCDBRequestId:fldFCDBRequestId, accountValue: accountValue });
	    		}); 
	    		
	    		$("#fldFCDBRequestId").val(fldFCDBRequestId);
	    		
    		}else{
    			handleError(invocationResult.faml.response);
    			window.location =  '#rrasm01';
    		}
    	 }else{
				handleErrorNoResponse();
			}
    	}
    	busyInd.hide();
    };
    
    
    self.showAgencyDetails = function(){
    	selAgency = self.selAgency();
    	selectedAccntarr = selAgency.split("###");
    	if(selAgency != ''){
    		$("#agencyDiv1").hide();
    		$("#divSelAgency").show();
    		selectedAcct = $.trim(selectedAccntarr[0]);
    		$("#selectedAcct").html(selectedAcct);
    		$("#fldAcctBrn").val(selectedAccntarr[1]);
    		
    		self.accountAgencyList.removeAll();
    		agencydata = self.agencyList();
    		self.accountAgencyList.push({ name: "ALL", id: "ALL" });
    		$(agencydata).each(function(index, obj) {    			
    			if(selectedAcct == $.trim(obj.codacctno)){
    				self.accountAgencyList.push({ name: obj.name, id: obj.id });
    			}
    		});
    		
    	}else{
    		$("#divSelAgency").hide();
    	}
    };
    
    self.showAgencyPeriod = function(){
    	$("#divSubmit").hide();
    	$("#agyPeriod").show();
    };
    
    
    this.rrhiq01Submit = function(){
        
    	
    	busyInd.show();        	
    	fldLoginUserId = Regloginuid;
    	fldFCDBSessionId = RegfldFCDBSessionId;
    	fldjsessionid = Regfldjsessionid;
    	fldSessionId = Rsessionid;
    	fldFCDBRequestId = $("#fldFCDBRequestId").val();
		fldTxnId = "HIQ";
    	fldRequestId = "RRHIQ02";
    	fldEntityId = "";    	    	
    	fldScrnSeqNbr = "02";
    	fldAcctNo = $("#selectedAcct").html();
    	fldAcctNo_txt = "";    	
    	fldAgencyId = self.selAccountAgency();
    	fldAgencyId_txt = $("#fldAgencyId option:selected").text();  
    	fldTxnLog = "1";
    	fldTxnLink = "next";
    	fldAcctBrn = $("#fldAcctBrn").val();
    	var fromdt = document.getElementById('fldFromDate').value;
    	var todt = document.getElementById('fldToDate').value;
    	
    	var arrfromdt = fromdt.split('/');
    	var arrtodt = todt.split('/');
    	
    	if(arrfromdt.length > 1){
    		datefldFromDate = arrfromdt[0];
    		monthfldFromDate = arrfromdt[1];
    		yearfldFromDate = arrfromdt[2];
    	}else{
    		datefldFromDate = '';
    		monthfldFromDate = '';
    		yearfldFromDate = '';
    	}
    	
    	if(arrtodt.length > 1){
    		datefldToDate = arrtodt[0];
    		monthfldToDate = arrtodt[1];
    		yearfldToDate = arrtodt[2];
    	}else{
    		datefldToDate = '';
    		monthfldToDate = '';
    		yearfldToDate = '';
    	}
    	
    	
    	var month=new Array();
    	month['01']="Jan";
    	month['02']="Feb";
    	month['03']="Mar";
    	month['04']="Apr";
    	month['05']="May";
    	month['06']="Jun";
    	month['07']="Jul";
    	month['08']="Aug";
    	month['09']="Sep";
    	month['10']="Oct";
    	month['11']="Nov";
    	month['12']="Dec";
    	
    	datefldFromDate_txt = datefldFromDate;	
    	datefldToDate_txt = datefldToDate;
    	
    	if(arrtodt.length > 1){
    		monthfldToDate_txt = month[monthfldToDate]; 
    	}
    	
    	if(arrfromdt.length > 1){
    		monthfldFromDate_txt = month[monthfldFromDate]; 
    	}
    	
    	yearfldToDate_txt = yearfldFromDate;
    	yearfldFromDate_txt = yearfldToDate;
    	
    	reqParams = {};
    	
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldModule"] = fldModule;
    	
    	reqParams["fldOperationId"] = "RRHIQ02";
    	reqParams["fldTxnId"] = "HIQ";
    	reqParams["fldScrnSeqNbr"] = "02";
    	
    	reqParams["fldFromDate"] = fromdt;
    	reqParams["fldToDate"] = todt;
    	reqParams["fldAcctBrn"] = fldAcctBrn;
    	reqParams["fldTxnLog"] = "1";
    	reqParams["fldTxnLink"] = "next";
    	reqParams["fldAcctNo"] = fldAcctNo;
    	reqParams["fldAgencyId"] = fldAgencyId;
    	if(fromdt == '' && todt == ''){
    		reqParams["rdperiod"] = "V1";
    	}else{
    		reqParams["rdperiod"] = "V2";
    	}
		
    
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
    	
    	
    	var invocationData = {
    			adapter : "Accounts",
        		procedure : "RRHIQ02",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	//WL.Logger.debug(invocationData, '');
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : self.rrhiq02Response,
    		onFailure : AdapterFail,
    		timeout: timeout
    	});
    	    	
    };    
    this.rrhiq02Response = function(result){
    	busyInd.hide();
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
	    			accStmtData(invocationResult.faml);    
	    			window.location = "#rrhiq02";
	    			callRRHIQ02();
    		}else{
    			handleError(invocationResult.faml.response);
    		}
    		}else{
				handleErrorNoResponse();
			}
    	}
    };
    
    callRRHIQ02 = function(){
    	
    	accstmtdata = accStmtData();
    	
    	self.holdingDetails.removeAll(); 
    	
    	holdinqdetails = accstmtdata.response.holdinqdetails;
    	fldagencyid = accstmtdata.response.fldAgencyId;
    	codacctno = accstmtdata.response.codacctno;
    	namacctbrn = accstmtdata.response.namacctbrn;
    	holdingAgyName = accstmtdata.response.holdinqdetails.namagency;
    
    	$(holdinqdetails).each(function(index, obj) {
    		txndate = obj.txndate;
    	
    		fromdateFormat = txndate.split("-");
    		fmt=fromdateFormat[2].split(" ");
    		txndate = fmt[1];
    		holdingAgyName = obj.namagency;
			self.holdingDetails.push({ fromdateFormat: fmt[0]+"-"+fromdateFormat[1]+"-"+fromdateFormat[0], amount:formatAmt(parseFloat(obj.amount)), txndate: txndate, namagency: obj.namagency,  txndesc:obj.txndesc, narrative:obj.narrative,holdingAgyName:holdingAgyName });
		});
    	
	    $("#contentData").load("Views/Accounts/rrhiq02.html", null, function (response, status, xhr) {
            if (status != "error") {}
            
            $("#holdingAccno").html(codacctno+" - "+namacctbrn);
            if(fldagencyid != "ALL"){
            	$("#fldagencyid").show();
            	$("#holdingAgyName").html(holdingAgyName);
            	$(".aname").hide();
            	$(".tin").removeClass('odd').addClass('even');
            	$(".tit").removeClass('even').addClass('odd');
            	$(".narr").removeClass('odd').addClass('even');
            }else{
            	$("#fldagencyid").hide();
            }
          
            ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
        });
	    
    	
    };
    
    this.callRRFDL01 = function(){
    	busyInd.show();  
    	reqParams = {};
    	
		reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldModule"] = "TD";
    	
    	reqParams["fldTxnId"] = "FDL";
    	reqParams["fldScrnSeqNbr"] = "01";
    	reqParams["fldOperationId"] = "RRFDL01";
    	reqParams["fldSwitchAppId"] = "";
    	reqParams["fldAmcId"] = "ALL";
    	reqParams["fldReportDate"] =getCurrdate();


    	
    	reqParams["fldRequestId"] =RegfldRequestId;
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
    	
    	var invocationData = {
    			adapter : "Accounts",
        		procedure : "RRFDL01",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	//WL.Logger.debug(invocationData, '');
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : self.rrfdl01Response,
    		onFailure : AdapterFail,
    		timeout: timeout
    	});	    	
    	
    	  
    };
    
    
    this.rrfdl01Response = function(result){
    	
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
    			self.FDaccountList.removeAll();
    			self.FDSelaccountList.removeAll();
    			accountdata = invocationResult.faml.response.acctdtls;
    			nbrtdaccts = invocationResult.faml.response.nbrtdaccts;
    	
    			fldFCDBRequestId = invocationResult.faml.response.mci.requestid;
    			if(nbrtdaccts >0){
	    		if(nbrtdaccts > 0 ){
	    			accSlider(true);
	    			$("#accExitsMsg").hide();
	    		}else{
	    			accSlider(false);
	    			$("#accExitsMsg").show();
	    		}	    		
	    			    		
	    		var idx = 1;
	    		$(accountdata).each(function(index, obj) {
	    			strid = idx;
	    			custnames = "";
	    			
	    			displaytxt = obj.codacctno+"-"+obj.nambranch;	    			
	    			accountValue = obj.codacctno+"#"+obj.nambranch+"#"+obj.acctbalance+"#"+obj.namccyshrt;
	    		    
	    			if(obj.codmodule == "TD")
	    				self.FDaccountList.push({ codacctno: obj.codacctno, acctbalance: obj.acctbalance, nambranch: obj.nambranch, namccyshrt: obj.namccyshrt, strid:strid, displaytxt:displaytxt, fldFCDBRequestId:fldFCDBRequestId, accountValue: accountValue, acctHostID: obj.acctHostID, tdOpenType: obj.tdOpenType });
	    			
	    			if(obj.codmodule == "CH" && obj.chuserrel == "SOW")
	    				self.FDSelaccountList.push({ codacctno: obj.codacctno, acctbalance: obj.acctbalance, nambranch: obj.nambranch, namccyshrt: obj.namccyshrt, strid:strid, displaytxt:displaytxt, fldFCDBRequestId:fldFCDBRequestId, accountValue: obj.codacctno, acctHostID: obj.acctHostID, tdOpenType: obj.tdOpenType });
	    			
	    			
	    			idx++;
	    		}); 
	    		
	    		$("#fldFCDBRequestId").val(fldFCDBRequestId);
	    		
	    		$("#contentData").load("Views/Accounts/rrfdl01.html", null, function (response, status, xhr) {
	                if (status != "error") {}
	                    ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
	            });
    			}
    			else{alert("You should have a Fixed Deposit with SOW relationship to continue with this transaction.");
    			 window.location="#rrasm01";
    			}
	    		
    		}else{
    			handleError(invocationResult.faml.response);
    		}
    	 }else{
				handleErrorNoResponse();
			}
    	}
    	busyInd.hide();
    };
    
    self.FDFromAccountChange = function(){
    	
    	selfdaccno = self.fldFDAcctNo();
    	accdata = self.FDaccountList();
    	
    	arrfromaccno = selfdaccno.split("#");
    	selaccno = arrfromaccno[0];
    	
    	if(selaccno != '' && selaccno != null && selaccno != undefined){
    	$(accdata).each(function(index, accnodet) {
    		
    		if(accnodet.codacctno == selaccno){
    			
    			if(accnodet.acctHostID == 'FC' && accnodet.tdOpenType != 'NET'){
    				$("#lfdSavings").show();
    			}else{
    				$("#lfdSavings").hide();
    			}
    		}
    	});
    	}
    };
    
    
    this.rrfdl01Submit = function(){
        
    	if($("#frmfdl01").valid()){
    	busyInd.show();        	
    	
		
    	fldFDAcctNo = self.fldFDAcctNo();
    	fldFDAcctNo_txt = $("#fldFDAcctNo option:selected").text();    	
    	fldChecked = $("#fldChecked").val();
    	fldChecked_txt = $("#fldChecked option:selected").text();    
    	
    	arrFDAccArr = fldFDAcctNo.split('#');
    	
    	reqParams = {};
    	
		reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldModule"] = fldModule;
    	
    	reqParams["fldTxnId"] = "FDL";
    	reqParams["fldScrnSeqNbr"] = "02";
    	reqParams["fldOperationId"] = "RRFDL02";
    	

    	
    	reqParams["fldRequestId"] =RegfldRequestId;
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
    	
    	
    	
    	reqParams["fldLinkedAcctNo"] = "";
    	reqParams["fldLinkedAcctDetail"] = "";
    	reqParams["fldFDAcctNo"] = arrFDAccArr[0];
    	reqParams["fldFDAcctDetail"] = fldFDAcctNo_txt;
    	reqParams["fldDestAcctNo"] = "";
    	reqParams["fldSrcAcctNo"] = "";
    	reqParams["fldToBrn"] = "";
    	reqParams["fldFromBrn"] = "";
    	reqParams["fldNamCcy"] = "";
    	reqParams["fldToNamCcy"] = "";
    	reqParams["fldToAcctBal"] = "";
    	reqParams["fldFrmAcctBal"] = "";
    	reqParams["fldFlgLiquidate"] = "N";
    	reqParams["tdindex"] = "";
    	reqParams["fldDepositNo"] = "";
    	
    	
    	reqParams["fdAcctNo"] = self.fldFDAcctNo();
    	reqParams["srctdbalance"] = "";
    	reqParams["selAcct"] = self.selAccount();
    	reqParams["chkTrms"] = "on";
    	
    	var invocationData = {
    			adapter : "Accounts",
        		procedure : "RRFDL02",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	//WL.Logger.debug(invocationData, '');
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : self.rrfdl02Response,
    		onFailure : AdapterFail,
    		timeout: timeout
    	});
    	}
    	
    };    
    this.rrfdl02Response = function(result){
    	busyInd.hide();
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
	    			accStmtData(invocationResult.faml);    
	    			window.location = "#rrfdl02";
    		}else{
    			handleError(invocationResult.faml.response);
    		}
    		}else{
				handleErrorNoResponse();
			}
    	}
    };
    
    this.callRRFDL02 = function(){
    	
    	accstmtdata = accStmtData();
    	
    	fldfdacctno = accstmtdata.response.fldFDAcctNo;
    	fldfdredeemamt = accstmtdata.response.fldFDRedeemAmt;
    	fldcasaacctno = accstmtdata.response.fldCasaAcctNo;
    	fldfdprincipalbal = accstmtdata.response.fldFDPrincipalBal;
    	fldfdinterest = accstmtdata.response.fldFDInterest;
    	fldcasanamccy =  accstmtdata.response.fldCasaNamCcy;
    	fldfdnamccy =  accstmtdata.response.fldFDNamCcy;
    	fldsrcacctbal = accstmtdata.response.fldsrcacctbal;
    	fldfdacctbal = accstmtdata.response.fldFDAcctBal;
    	
    	fldFCDBRequestId = accstmtdata.response.mci.requestid;        	        	
    	fldEntityId = accstmtdata.request.fldEntityId;
    	
	    $("#contentData").load("Views/Accounts/rrfdl02.html", null, function (response, status, xhr) {
            if (status != "error") {}
            
            $(".fldfdacctno").html(fldfdacctno);
            $(".fldfdredeemamt").html(formatAmt(parseFloat(fldfdredeemamt)));                
            $(".fldcasaacctno").html(fldcasaacctno);
        	$(".fldfdprincipalbal").html(formatAmt(parseFloat(fldfdprincipalbal)));
        	$(".fldfdinterest").html(formatAmt(parseFloat(fldfdinterest)));
        	
        	            	
        	$("#fldFDAcctNo").val(fldfdacctno);
        	$("#fldCasaAcctNo").val(fldcasaacctno);
        	$("#fldCasaNamCcy").val(fldcasanamccy);
        	$("#fldFDNamCcy").val(fldfdnamccy);
        	$("#fldCasaAcctBal").val(fldsrcacctbal);
        	$("#fldFDAcctBal").val(fldfdacctbal);
        	$("#fldFlgLiquidate").val("Y");
        	$("#fldDepositNo").val("");
        	
            $("#fldFCDBRequestId").val(fldFCDBRequestId);            	          	
          
            ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
        });
	    
    	
    };
    
    this.rrfdl02Submit = function(){
    	
    	busyInd.show();        	
    	fldLoginUserId = Regloginuid;
    	fldFCDBSessionId = RegfldFCDBSessionId;
    	fldjsessionid = Regfldjsessionid;
    	fldSessionId = Rsessionid;
    	fldFCDBRequestId = $("#fldFCDBRequestId").val();
		fldTxnId = "FDL";
    	fldRequestId = "RRFDL03";
    	fldEntityId = "";    	    	
    	fldScrnSeqNbr = "03";
    	
    	var $form = $("#frmfdl02");
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
    	
    	reqParams["fldTxnId"] = "FDL";
    	reqParams["fldScrnSeqNbr"] = "03";
    	reqParams["fldOperationId"] = "RRFDL03";
    	

    	
    	
    	reqParams["fldRequestId"] =RegfldRequestId;
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
    	
    	
    	
    	var invocationData = {
    			adapter : "Accounts",
        		procedure : "RRFDL03",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	//WL.Logger.debug(invocationData, '');
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : self.rrfdl03Response,
    		onFailure : AdapterFail,
    		timeout: timeout
    	});
    };    
    this.rrfdl03Response = function(result){
    	busyInd.hide();
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
	    			accStmtData(invocationResult.faml);  
	    			
	    			accountList.removeAll();
					accountSummList.removeAll();
	    			
	    			window.location = "#rrfdl03";
    		}else{
    			handleError(invocationResult.faml.response);
    		}
    		}else{
				handleErrorNoResponse();
			}
    	}
    };
    
    this.callRRFDL03 = function(){
    	
    	accstmtdata = accStmtData();
    	
    	fldfdacctno = accstmtdata.response.fldFDAcctNo;
    	fldcasaacctno = accstmtdata.response.fldCasaAcctNo;
    	        	
	    $("#contentData").load("Views/Accounts/rrfdl03.html", null, function (response, status, xhr) {
            if (status != "error") {}	
            
            //$("#fldfdacctno").html(fldfdacctno);
            //$("#fldcasaacctno").html(fldcasaacctno);
            $("#finalText").html("Your Fixed Deposit "+"<b>"+fldfdacctno+"</b>"+" has been liquidated into account "+"<b>"+fldcasaacctno+"</b>");              
            ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
        });    
	    
    	
    };
    
    this.callRRMMC01 = function(){
    	
    	reqParams = {};
    	
		reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldModule"] = fldModule;
    	
    	reqParams["fldTxnId"] = "MMC";
    	reqParams["fldScrnSeqNbr"] = "01";
    	reqParams["fldOperationId"] = "RRMMC01";
    	reqParams["fldSwitchAppId"] = "";
    	
    	
    	
    	
    	reqParams["fldRequestId"] =RegfldRequestId;
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
    	
    	
    	var invocationData = {
    			adapter : "Accounts",
        		procedure : "RRMMC01",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	//WL.Logger.debug(invocationData, '');
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : self.rrmmc01Response,
    		onFailure : AdapterFail,
    		timeout: timeout
    	});
    	  
    };
    
    this.rrmmc01Response = function(result){
    	
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
    			self.MMIDaccountList.removeAll();
    			
    			accountdata = invocationResult.faml.response.acctdtls;
    			validaccounts = invocationResult.faml.response.validaccounts;
    			mmdMobile = invocationResult.faml.response.mobileno;
    			custname = invocationResult.faml.response.custname;
    			emailid = invocationResult.faml.response.emailid;
    			
    			fldFCDBRequestId = invocationResult.faml.response.mci.requestid;
    			
	    		if(validaccounts != 'N' ){
	    			accSlider(true);
	    			$("#accExitsMsg").hide();
	    		}else{
	    			accSlider(false);
	    			$("#accExitsMsg").show();
	    		}	    		
	    			    		
	    		var idx = 1;
	    		$(accountdata).each(function(index, obj) {
	    			strid = idx;
	    			custnames = "";
	    			
	    			displaytxt = obj.codacctno+"-"+obj.nambranch;	    			
	    			accountValue = obj.codacctno;
	    		    
	    			
	    			self.MMIDaccountList.push({ codacctno: obj.codacctno,  nambranch: obj.nambranch, displaytxt:displaytxt });
	    				    				    			
	    			idx++;
	    		}); 
	    		
	    		
	    		
	    		$("#contentData").load("Views/Accounts/rrmmc01.html", null, function (response, status, xhr) {
	                if (status != "error") {}
	                
	                	$(".mmdMobileno").html(mmdMobile);
	                	$("#mobileno").val(mmdMobile);
	                	$("#custname").val(custname);
	                	$("#emailid").val(emailid);
	                	
	                	$("#fldRequestId").val(fldFCDBRequestId);
	                    ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
	            });
	    		
	    		
    		}else{
    			handleError(invocationResult.faml.response);
				if(invocationResult.faml.response.rc != undefined){
            			if(invocationResult.faml.response.rc.errorcode != "10020"){
            			window.location = "#rrftr01";
            			}
            			}
    		}
    	 }else{
				handleErrorNoResponse();
			}
    	}
    	busyInd.hide();
    };
    
    
    this.rrmmc01Submit = function(){
      
        if($("#frmmmc01").valid()){
    
    	busyInd.show();        	
    	
    	var $form = $("#frmmmc01");
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
        reqParams["fldTxnId"] = "MMC";
    	reqParams["fldScrnSeqNbr"] = "02";

    	

    	
    
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
    	
    	
    	
    	var invocationData = {
    			adapter : "Accounts",
        		procedure : "RRMMC02",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	//WL.Logger.debug(invocationData, '');
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : self.rrmmc02Response,
    		onFailure : AdapterFail,
    		timeout: timeout
    	});
    	//}
    	}
    }; 
    
    this.rrmmc02Response = function(result){
    	
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
	    			accStmtData(invocationResult.faml);    
	    			window.location = "#rrmmc02";
    		}else{
    			fldFCDBRequestId = invocationResult.faml.response.mci.requestid;
    			$("#fldRequestId").val(fldFCDBRequestId);
    			handleError(invocationResult.faml.response);
    		}
    		}else{
				handleErrorNoResponse();
			}
    	}
    };
    
    this.callRRMMC02 = function(){
    	
    	accstmtdata = accStmtData();
    	
    	
    	respcode = accstmtdata.response.respCode;
    	failuremessage = accstmtdata.response.failureMessage;
    	
    	fldacctno = accstmtdata.response.fldAcctNo;
    	mobileno = accstmtdata.request.mobileno;
		custname = accstmtdata.request.custname;
		emailid = accstmtdata.request.emailid;
		mmidvalue = accstmtdata.response.mmidValue;
		
		fldFCDBRequestId = accstmtdata.response.mci.requestid;
		
			    	
		
		
		$("#contentData").load("Views/Accounts/rrmmc02.html", null, function (response, status, xhr) {
            if (status != "error") {}
				if(respcode != '00' ){
					$(".errmsg").html(failuremessage);
					$("#accExitsMsg").show();
					$("#accExitsMsg1").hide();
				}else{
					$("#accExitsMsg1").show();
					$("#accExitsMsg").hide();
					$("#fldRequestId").val(fldFCDBRequestId);
            
					$(".fldacctno").html(fldacctno);
					$(".mobileno").html(mobileno);
					$(".mmidvalue").html(mmidvalue);
					
					$("#mobileno").val(mmdMobile);
					$("#custname").val(custname);
					$("#emailid").val(emailid);
					$("#fldAcctNo").val(fldacctno);
					$("#mmidValue").val(mmidvalue);
				}	
            	
            	
                ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
        });
		busyInd.hide();
    	
    };
    
    this.rrmmc02Submit = function(){
    	
    	busyInd.show();        	
    	
		var $form = $("#frmmmc02");
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
    	
    	reqParams["fldTxnId"] = "MMC";
    	reqParams["fldScrnSeqNbr"] = "03";
    	reqParams["fldOperationId"] = "RRMMC03";
    	

    	
    	
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
    	
    	
    	
    	var invocationData = {
    			adapter : "Accounts",
        		procedure : "RRMMC03",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	//WL.Logger.debug(invocationData, '');
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : self.rrmmc03Response,
    		onFailure : AdapterFail,
    		timeout: timeout
    	});
    };    
    this.rrmmc03Response = function(result){
    	
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
	    			accStmtData(invocationResult.faml);    
	    			window.location = "#rrmmc03";
    		}else{
    			fldFCDBRequestId = invocationResult.faml.response.mci.requestid;
    			$("#fldRequestId").val(fldFCDBRequestId);
    			handleError(invocationResult.faml.response);
    		}
    		}else{
				handleErrorNoResponse();
			}
    	}
    	
    };
    
    
  this.callRRMMC03 = function(){
    	
    	accstmtdata = accStmtData();
    	
    	respcode = accstmtdata.response.respCode;
    	failuremessage = accstmtdata.response.failureMessage;
    	successmessage = accstmtdata.response.successMessage;
    	        	
	    $("#contentData").load("Views/Accounts/rrmmc03.html", null, function (response, status, xhr) {
            if (status != "error") {}	
            
            if(respcode == '00'){
            	$(".success_msg p").html(successmessage);
            	$(".success_msg").show();
            }
            if(respcode != '00'){
            	$(".failure_msg p").html(failuremessage);
            	$(".failure_msg").show();
            }
                         
            ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
        });    
	    busyInd.hide();
    	
    };
    
    
    /* ====================== */
    
    this.rrsus01Page = function(){
    	accSlider(false);
    	self.selFssSavingAcc(null);
    	self.selFssFDAcc(null);
    	busyInd.show();        	
    	fldjsessionid = Regfldjsessionid;
    	reqParams = {};
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldModule"] = 'TD';
    	
    	reqParams["fldTxnId"] = "SUS";
    	reqParams["fldScrnSeqNbr"] = "01";
    	reqParams["fldSwitchAppId"] = "";
    	reqParams["fldLogoffReq"] = "N";
    	reqParams["fldCardNo"] = "";
    	reqParams["fldAcctNo"] = "";
    	reqParams["fldUhid"] = "";
    	reqParams["fldDpId"] = "";
    	reqParams["fldAmcId"] = "ALL";
    	reqParams["fldReportDate"] = "";
    	reqParams["fldRoleId"] = "";

    	reqParams["fldRequestId"] =RegfldRequestId;
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
    	
    	
    	
    	var invocationData = {
    			adapter : "Accounts",
        		procedure : "RRSUS01",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	//WL.Logger.debug(invocationData, '');
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : rrsus01Response,
    		onFailure : AdapterFail,
    		timeout: timeout
    	});
    	
	    $("#contentData").load("Views/Accounts/rrsus01.html", null, function (response, status, xhr) {
            if (status != "error") {}
                ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
        }); 
    };
    rrsus01Response = function(result){
    	
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
    			
    			accountdata = invocationResult.faml.response.acctdtls;
    			nbrsowcasaacct = invocationResult.faml.response.nbrsowcasaacct;
    			nbrsowtdacct = invocationResult.faml.response.nbrsowtdacct;
    			fldFCDBRequestId = invocationResult.faml.response.mci.requestid;
    			
	    		if(nbrsowcasaacct > 0 && nbrsowtdacct > 0){
	    			accSlider(true);
	    			$("#accExitsMsg").hide();
	    		}else{
	    			accSlider(false);
	    			$("#accExitsMsg").show();
	    		}
	    		
	    		self.fssSavingAccountList.removeAll();
	    		self.fssFDAccountList.removeAll();
	    		var idx = 1;
	    		$(accountdata).each(function(index, obj) {
	    			strid = idx;
	    			custnames = "";
	    			
	    			displaytxt = obj.codacctno+"-"+obj.nambranch;	    			
	    			accountValue = obj.codacctno+"#"+obj.nambranch+"#"+obj.acctbalance+"#"+obj.namccyshrt;
	    		    
	    			if(obj.codmodule == "CH" && obj.acctcustrel == "SOW")
	    				self.fssSavingAccountList.push({ codacctno: obj.codacctno, acctbalance: obj.acctbalance, nambranch: obj.nambranch, namccyshrt: obj.namccyshrt, strid:strid, displaytxt:displaytxt, fldFCDBRequestId:fldFCDBRequestId, accountValue: accountValue });
	    		    
	    			if(obj.codmodule == "TD" && obj.acctcustrel == "SOW")
	    				self.fssFDAccountList.push({ codacctno: obj.codacctno, acctbalance: obj.acctbalance, nambranch: obj.nambranch, namccyshrt: obj.namccyshrt, strid:strid, displaytxt:displaytxt, fldFCDBRequestId:fldFCDBRequestId, accountValue: accountValue });
	    			
	    			idx++;
	    		}); 
	    		
	    		$("#fldFCDBRequestId").val(fldFCDBRequestId);
	    		
    		}else{
    			handleError(invocationResult.faml.response);
    		}
    	 }else{
    		 handleErrorNoResponse();
    	 }
    	}
    	busyInd.hide();
    };
    this.rrsus01Submit = function(){
        
    	if($("#frmsus01").valid()){
    	busyInd.show();        	
    	  
    	
    	fldChecked_txt = $("#fldChecked option:selected").text();    
    	
    	FrmAcctsParam = $.trim(self.selFssSavingAcc()).split('#');
    	ToAcctsParam  = $.trim(self.selFssFDAcc()).split('#');
    	

    	reqParams = {};
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldModule"] = 'TD';
    	
    	reqParams["fldTxnId"] = "SUS";
    	
    	reqParams["fldRequestId"] =RegfldRequestId;
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
    	
    	
    	reqParams["fldScrnSeqNbr"] = "02";
    	
    	reqParams["fldLinkedAcctNo"] = FrmAcctsParam[0];
    	reqParams["fldLinkedAcctDetail"] = $("#selAcct option:selected").text();
    	reqParams["fldSwpInAcctNo"] = ToAcctsParam[0];
    	reqParams["fldSwpInAcctDetail"] = $("#cmbSrcAcctNo option:selected").text();
    	reqParams["fldDestAcctNo"] = "";
    	reqParams["fldSrcAcctNo"] = "";
    	reqParams["fldToBrn"] = ToAcctsParam[1];
    	reqParams["fldFromBrn"] = FrmAcctsParam[1];
    	reqParams["fldNamCcy"] = FrmAcctsParam[3];
    	reqParams["fldToNamCcy"] = ToAcctsParam[3];
    	reqParams["fldFrmAcctBal"] = FrmAcctsParam[2];
    	reqParams["fldToAcctBal"] = ToAcctsParam[2];
    	reqParams["tdindex"] = "1";
    	reqParams["selAcct"] = FrmAcctsParam[0];
    	reqParams["balance"] = FrmAcctsParam[3]+" "+FrmAcctsParam[2];
    	reqParams["cmbSrcAcctNo"] = ToAcctsParam[0];
    	reqParams["srcbalance"] = ToAcctsParam[3]+" "+ToAcctsParam[2];
    	reqParams["chkTrms"] = "on";
    	reqParams["fldChecked"] = $("#fldChecked").val();
    	
    	var invocationData = {
    			adapter : "Accounts",
        		procedure : "RRSUS02",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	//WL.Logger.debug(invocationData, '');
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : rrsus02Response,
    		onFailure : AdapterFail,
    		timeout: timeout
    	});
    	}
    	
    }; 
    rrsus02Response = function(result){
    	busyInd.hide();
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
	    			accStmtData(invocationResult.faml);    
	    			window.location = "#rrsus02";
    		}else{
    			handleError(invocationResult.faml.response);
    		}
    		}else{
				handleErrorNoResponse();
			}
    	}
    };
    this.rrsus02Page = function(){
    	accstmtdata = accStmtData();
    	
    	fldSrcAcctNo = accstmtdata.request.selAcct;
    	fldFromBrn = accstmtdata.request.fldFromBrn;
    	fldFrmAcctBal = accstmtdata.request.fldFrmAcctBal;
    	fldNamCcy = accstmtdata.request.fldNamCcy;
    	fldLinkedAcctDetail = accstmtdata.request.fldLinkedAcctDetail;
    	
    	
    	fldDestAcctNo = accstmtdata.request.fldSwpInAcctNo;
    	fldToBrn = accstmtdata.request.fldToBrn;
    	fldToAcctBal = accstmtdata.request.fldToAcctBal;
    	fldToNamCcy = accstmtdata.request.fldToNamCcy;
    	fldSwpInAcctDetail = accstmtdata.request.fldSwpInAcctDetail;        	
    	
    	fldFCDBRequestId = accstmtdata.response.mci.requestid;        	        	
    	fldEntityId = accstmtdata.request.fldEntityId;
    	
	    $("#contentData").load("Views/Accounts/rrsus02.html", null, function (response, status, xhr) {
            if (status != "error") {}
            fromacctDetails = fldLinkedAcctDetail+" - "+fldNamCcy+" "+fldFrmAcctBal;
            toacctnoDetails = fldSwpInAcctDetail+" - "+fldToNamCcy+" "+fldToAcctBal;

            $("#fromacctDetails").html(fromacctDetails);
            $("#toacctnoDetails").html(toacctnoDetails);
            
            $("#fldCasaAcctNo").val(fldSrcAcctNo);
        	$("#fldCasaAcctDetail").val(fldLinkedAcctDetail);
        	$("#fldTdAcctNo").val(fldDestAcctNo);
        	$("#fldTdAcctDetail").val(fldSwpInAcctDetail);
        	            	
        	$("#fldLinkedAcctNo").val(fldSrcAcctNo);
        	$("#fldLinkedAcctDetail").val(fldLinkedAcctDetail);
        	$("#fldSwpInAcctNo").val(fldDestAcctNo);
        	$("#fldSwpInAcctDetail").val(fldSwpInAcctDetail);
        	$("#fldDestAcctNo").val(fldDestAcctNo);
        	$("#fldSrcAcctNo").val(fldSrcAcctNo);
        	$("#fldToBrn").val(fldToBrn);
        	$("#fldFromBrn").val(fldFromBrn);
        	$("#fldFromNamCcy").val(fldNamCcy);
        	$("#fldToNamCcy").val(fldToNamCcy);
        	$("#fldToAcctBal").val(fldToAcctBal);
        	$("#fldFromAcctBal").val(fldFrmAcctBal);
        	
            $("#fldFCDBRequestId").val(fldFCDBRequestId);            	          	
          
            ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
        });
    };
    this.rrsus02Submit = function(){
    	
    	busyInd.show();        	
 
    	
    	var $form = $("#frmsus02");
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
    	
    	reqParams["fldTxnId"] = "SUS";
    	reqParams["fldScrnSeqNbr"] = "03";
    	
    	reqParams["fldRequestId"] =RegfldRequestId;
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
    	
    	 
    	var invocationData = {
    			adapter : "Accounts",
        		procedure : "RRSUS03",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	//WL.Logger.debug(invocationData, '');
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : rrsus03Response,
    		onFailure : AdapterFail,
    		timeout: timeout
    	});
    }; 
    rrsus03Response = function(result){
    	busyInd.hide();
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
	    			accStmtData(invocationResult.faml);    
	    			window.location = "#rrsus03";
    		}else{
    			handleError(invocationResult.faml.response);
    		}
    		}else{
				handleErrorNoResponse();
			}
    	}
    };
    this.rrsus03Page = function(){
    	accstmtdata = accStmtData();
    	
    	//linkedacctdtl = accstmtdata.response.fldLinkedAcctNo;
    	//swpinacctdtl = accstmtdata.response.fldSwpInAcctNo;
    	//benefccy = accstmtdata.response.fldNamCcy;
    	fldfromacctdetl=accstmtdata.response.txndetails.fldFromAcctDetl;
    	providerccy = accstmtdata.response.txndetails.providerCcy;
    	provideracctbal = accstmtdata.response.txndetails.providerAcctBal;
    	//fldFrmAcctBal = accstmtdata.response.fldFrmAcctBal;
    	
    	tdacctint = accstmtdata.response.txndetails.tdAcctInt;
    	tdacctmatdate=accstmtdata.response.txndetails.tdAcctMatDate;
    	
    	fldtoacctdetl=accstmtdata.response.txndetails.fldToAcctDetl;
    	
    	accountList.removeAll();
        accountSummList.removeAll();
		
	    $("#contentData").load("Views/Accounts/rrsus03.html", null, function (response, status, xhr) {
            if (status != "error") {}	
            
            fdamt = providerccy+" "+provideracctbal;
            
            
            $("#tdacctmatdate").html(tdacctmatdate);
            $("#fdamt").html(fdamt);
            $("#fdIntRate").html(tdacctint);
            $("#fdaccno").html(fldfromacctdetl);
            $("#LinkedAccNo").html(fldtoacctdetl);
          
            ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
        });  
    };
    this.rrfss01Page = function(){
    	accSlider(false);
    	self.selFssSavingAcc(null);
    	self.selFssFDAcc(null);
    	busyInd.show();        	
    	

    	reqParams = {};
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldModule"] = 'TD';
    	
    	reqParams["fldTxnId"] = "FSS";
    	
    	reqParams["fldRequestId"] =RegfldRequestId;
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
    	
    	
    	reqParams["fldScrnSeqNbr"] = "01";
    	reqParams["fldSwitchAppId"] = "";
    	reqParams["fldLogoffReq"] = "N";
    	reqParams["fldCardNo"] = "";
    	reqParams["fldAcctNo"] = "";
    	reqParams["fldUhid"] = "";
    	reqParams["fldDpId"] = "";
    	reqParams["fldAmcId"] = "ALL";
    	reqParams["fldReportDate"] = "";
    	reqParams["fldRoleId"] = "";

    	var invocationData = {
    			adapter : "Accounts",
        		procedure : "RRFSS01",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	//WL.Logger.debug(invocationData, '');
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : rrfss01Response,
    		onFailure : AdapterFail,
    		timeout: timeout
    	});
    	
	    $("#contentData").load("Views/Accounts/rrfss01.html", null, function (response, status, xhr) {
            if (status != "error") {}
                ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
        });
    };
    rrfss01Response = function(result){
    	
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
    			
    			accountdata = invocationResult.faml.response.acctdtls;
    			nbrtdacct = invocationResult.faml.response.nbrtdacct;	    			    		
    			fldFCDBRequestId = invocationResult.faml.response.mci.requestid;
    			
	    		if(nbrtdacct > 0){
	    			accSlider(true);
	    			$("#accExitsMsg").hide();
	    		}else{
	    			accSlider(false);
	    			$("#accExitsMsg").show();
	    		}
	    		
	    		self.fssSavingAccountList.removeAll();
	    		self.fssFDAccountList.removeAll();
	    		var idx = 1;
	    		$(accountdata).each(function(index, obj) {
	    			strid = idx;
	    			custnames = "";
	    			
	    			displaytxt = obj.codacctno+"-"+obj.nambranch;	    			
	    			accountValue = obj.codacctno+"#"+obj.nambranch+"#"+obj.acctbalance+"#"+obj.namccyshrt;
	    		    
	    			if(obj.codmodule == "CH")
	    				self.fssSavingAccountList.push({ codacctno: obj.codacctno, acctbalance: obj.acctbalance, nambranch: obj.nambranch, namccyshrt: obj.namccyshrt, strid:strid, displaytxt:displaytxt, fldFCDBRequestId:fldFCDBRequestId, accountValue: accountValue });
	    		    
	    			if(obj.codmodule == "TD")
	    				self.fssFDAccountList.push({ codacctno: obj.codacctno, acctbalance: obj.acctbalance, nambranch: obj.nambranch, namccyshrt: obj.namccyshrt, strid:strid, displaytxt:displaytxt, fldFCDBRequestId:fldFCDBRequestId, accountValue: accountValue });
	    			
	    			idx++;
	    		}); 
	    		
	    		$("#fldFCDBRequestId").val(fldFCDBRequestId);
	    		
    		}else{
    			handleError(invocationResult.faml.response);   			
    		}
    	 }else{
				handleErrorNoResponse();
			}
    	}
    	busyInd.hide();
    };
    this.rrfss01Submit = function(){
        
    	if($("#frmfss01").valid()){
    	busyInd.show();        	
    	
    	
    	
    	fldChecked_txt = $("#fldChecked option:selected").text();    
    	
    	FrmAcctsParam = $.trim(self.selFssSavingAcc()).split('#');
    	ToAcctsParam  = $.trim(self.selFssFDAcc()).split('#');
    	
    	reqParams = {};
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldModule"] = 'TD';
    	
    	reqParams["fldTxnId"] = "FSS";
    	reqParams["fldScrnSeqNbr"] = "02";
    	
    	reqParams["fldRequestId"] =RegfldRequestId;
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
    	
    	
    	reqParams["fldLinkedAcctNo"] = FrmAcctsParam[0];
    	reqParams["fldLinkedAcctDetail"] = $("#selAcct option:selected").text();
    	reqParams["fldSwpInAcctNo"] = ToAcctsParam[0];
    	reqParams["fldSwpInAcctDetail"] = $("#cmbSrcAcctNo option:selected").text();
    	reqParams["fldDestAcctNo"] = "";
    	reqParams["fldSrcAcctNo"] = "";
    	reqParams["fldToBrn"] = ToAcctsParam[1];
    	reqParams["fldFromBrn"] = FrmAcctsParam[1];
    	reqParams["fldNamCcy"] = FrmAcctsParam[3];
    	reqParams["fldToNamCcy"] = ToAcctsParam[3];
    	reqParams["fldFrmAcctBal"] = FrmAcctsParam[2];
    	reqParams["fldToAcctBal"] = ToAcctsParam[2];
    	reqParams["tdindex"] = "0";
    	reqParams["selAcct"] = FrmAcctsParam[0];
    	reqParams["balance"] = FrmAcctsParam[3]+" "+FrmAcctsParam[2];
    	reqParams["cmbSrcAcctNo"] = ToAcctsParam[0];
    	reqParams["srctdbalance"] = ToAcctsParam[3]+" "+ToAcctsParam[2];
    	reqParams["chkTrms"] = "on";
    	reqParams["fldChecked"] = $("#fldChecked").val();
    	
    	var invocationData = {
    			adapter : "Accounts",
        		procedure : "RRFSS02",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	//WL.Logger.debug(invocationData, '');
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : rrfss02Response,
    		onFailure : AdapterFail,
    		timeout: timeout
    	});
    	}
    	
    }; 
    rrfss02Response = function(result){
    	busyInd.hide();
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
	    			accStmtData(invocationResult.faml);    
	    			window.location = "#rrfss02";
    		}else{
    			handleError(invocationResult.faml.response);
    		}
    		}else{
				handleErrorNoResponse();
			}
    	}
    };
    this.rrfss02Page = function(){
    	accstmtdata = accStmtData();
    	fldSrcAcctNo = accstmtdata.request.fldLinkedAcctNo;
    	fldFromBrn = accstmtdata.request.fldFromBrn;
    	fldFrmAcctBal = accstmtdata.request.fldFrmAcctBal;
    	fldNamCcy = accstmtdata.request.fldNamCcy;
    	fldLinkedAcctDetail = accstmtdata.request.fldLinkedAcctDetail;
    	
    	
    	fldDestAcctNo = accstmtdata.request.fldSwpInAcctNo;
    	fldToBrn = accstmtdata.request.fldToBrn;
    	fldToAcctBal = accstmtdata.request.fldToAcctBal;
    	fldToNamCcy = accstmtdata.request.fldToNamCcy;
    	fldSwpInAcctDetail = accstmtdata.request.fldSwpInAcctDetail;        	
    	
    	fldFCDBRequestId = accstmtdata.response.mci.requestid;        	        	
    	fldEntityId = accstmtdata.request.fldEntityId;
    	
	    $("#contentData").load("Views/Accounts/rrfss02.html", null, function (response, status, xhr) {
            if (status != "error") {}
            fromacctDetails = fldLinkedAcctDetail+" - "+fldNamCcy+"  "+fldFrmAcctBal;
            toacctnoDetails = fldSwpInAcctDetail+" - "+fldToNamCcy+"  "+fldToAcctBal;

   
            
            $("#fromacctDetails").html(fromacctDetails);
            $("#toacctnoDetails").html(toacctnoDetails);
        	            	
        	$("#fldLinkedAcctNo").val(fldSrcAcctNo);
        	$("#fldLinkedAcctDetail").val(fldLinkedAcctDetail);
        	$("#fldSwpInAcctNo").val(fldDestAcctNo);
        	$("#fldSwpInAcctDetail").val(fldSwpInAcctDetail);
        	$("#fldDestAcctNo").val(fldDestAcctNo);
        	$("#fldSrcAcctNo").val(fldSrcAcctNo);
        	$("#fldToBrn").val(fldToBrn);
        	$("#fldFromBrn").val(fldFromBrn);
        	$("#fldNamCcy").val(fldNamCcy);
        	$("#fldToNamCcy").val(fldToNamCcy);
        	$("#fldToAcctBal").val(fldToAcctBal);
        	$("#fldFrmAcctBal").val(fldFrmAcctBal);
        	
            $("#fldFCDBRequestId").val(fldFCDBRequestId);            	          	
          
            ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
        });
    };
    this.rrfss02Submit = function(){
    	
    	busyInd.show();        	
    	reqParams = {};
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldModule"] = 'TD';
    	
    	reqParams["fldTxnId"] = "FSS";
    	reqParams["fldScrnSeqNbr"] = "03";
    	
    	reqParams["fldRequestId"] =RegfldRequestId;
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
    	
    	
    	reqParams["fldLinkedAcctNo"] = $("#fldLinkedAcctNo").val();
    	reqParams["fldLinkedAcctDetail"] = $("#fldLinkedAcctDetail").val();
    	reqParams["fldSwpInAcctNo"] = $("#fldSwpInAcctNo").val();
    	reqParams["fldSwpInAcctDetail"] = $("#fldSwpInAcctDetail").val();
    	//reqParams["fldDestAcctNo"] = $("#fldDestAcctNo").val();
    	//reqParams["fldSrcAcctNo"] = $("#fldSrcAcctNo").val();
    	reqParams["fldToBrn"] = $("#fldToBrn").val();
    	reqParams["fldFromBrn"] = $("#fldFromBrn").val();
    	reqParams["fldFromNamCcy"] = $("#fldNamCcy").val();
    	reqParams["fldToNamCcy"] = $("#fldToNamCcy").val();
    	reqParams["fldFromAcctBal"] = $("#fldFrmAcctBal").val();
    	reqParams["fldToAcctBal"] = $("#fldToAcctBal").val();
    	
    	
    	//reqParams["tdindex"] = "0";
    	//reqParams["selAcct"] = $("#fldLinkedAcctNo").val();
    	//reqParams["balance"] = $("#fldNamCcy").val()+" "+$("#fldFrmAcctBal").val();
    	//reqParams["cmbSrcAcctNo"] = $("#fldSrcAcctNo").val();
    	//reqParams["srctdbalance"] = $("#fldToNamCcy").val()+" "+$("#fldToAcctBal").val();
    	reqParams["chkTrms"] = "on";
    	reqParams["fldChecked"] = $("#fldChecked").val();
    	
    	 
    	
    	var invocationData = {
    			adapter : "Accounts",
        		procedure : "RRFSS03",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	
    	//WL.Logger.debug(invocationData, '');
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : rrfss03Response,
    		onFailure : AdapterFail,
    		timeout: timeout
    	});
    }; 
    rrfss03Response = function(result){
    	busyInd.hide();
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
	    			accStmtData(invocationResult.faml);    
	    			window.location = "#rrfss03";
    		}else{
    			handleError(invocationResult.faml.response);
    		}
    		}else{
				handleErrorNoResponse();
			}
    	}
    };
    this.rrfss03Page = function(){
    	accstmtdata = accStmtData();
    	
    	linkedacctdtl = accstmtdata.response.txndetails.linkedAcctDtl;
    	swpinacctdtl = accstmtdata.response.txndetails.swpinAcctDtl;
    	benefccy = accstmtdata.response.txndetails.benefCcy;
    	providerccy = accstmtdata.response.txndetails.providerCcy;
    	fldFrmAcctBal = accstmtdata.response.txndetails.benefAcctBal;
    	provideracctbal =accstmtdata.response.txndetails.providerAcctBal;
    	
    	accountList.removeAll();
        accountSummList.removeAll();
    	
	    $("#contentData").load("Views/Accounts/rrfss03.html", null, function (response, status, xhr) {
            if (status != "error") {}	
            
            fromacctDetails = linkedacctdtl+" - "+benefccy+" "+fldFrmAcctBal;
            toacctnoDetails = swpinacctdtl+" - "+providerccy+" "+provideracctbal;
            
            $("#fromacctDetails").html(fromacctDetails);
            $("#toacctnoDetails").html(toacctnoDetails);
          
            ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
        }); 
    };
    this.rrcss01Page = function(){
    	accSlider(false);
    	self.selFssSavingAcc(null);
    	self.selFssFDAcc(null);
    	busyInd.show();        	
    	
  
    	reqParams = {};
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldModule"] = 'CH';
    	
    	reqParams["fldTxnId"] = "CSS";
    	reqParams["fldScrnSeqNbr"] = "01";

    
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
    	
    	
    	var invocationData = {
    			adapter : "Accounts",
        		procedure : "RRCSS01",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	}; 
    	
    	//WL.Logger.debug(invocationData, '');
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : rrcss01Response,
    		onFailure : AdapterFail,
    		timeout: timeout
    	});
    	
	    $("#contentData").load("Views/Accounts/rrcss01.html", null, function (response, status, xhr) {
            if (status != "error") {}
                ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
        });
    };
    rrcss01Response = function(result){
    	
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
    			
    			accountdata = invocationResult.faml.response.acctdtls;
    			nbrsavingacct = parseInt(invocationResult.faml.response.nbrsavingacct);
    			nbrcurrentacct = parseInt(invocationResult.faml.response.nbrcurrentacct);
    			totalAccounts = nbrsavingacct + nbrcurrentacct;
    			
    			fldFCDBRequestId = invocationResult.faml.response.mci.requestid;
    			
	    		if(totalAccounts > 1){
	    			accSlider(true);
	    			$("#accExitsMsg").hide();
	    		}else{
	    			accSlider(false);
	    			$("#accExitsMsg").show();
	    		}
	    		
	    		self.fssSavingAccountList.removeAll();
	    		self.fssFDAccountList.removeAll();
	    		var idx = 1;
	    		$(accountdata).each(function(index, obj) {
	    			strid = idx;
	    			custnames = "";
	    			
	    			displaytxt = obj.codacctno+"-"+obj.nambranch;	    			
	    			accountValue = obj.codacctno+"#"+obj.nambranch+"#"+obj.acctbalance+"#"+obj.namccyshrt;
	    		    
	    			if(obj.codmodule == "CH"){
	    				self.fssSavingAccountList.push({ codacctno: obj.codacctno, acctbalance: obj.acctbalance, nambranch: obj.nambranch, namccyshrt: obj.namccyshrt, strid:strid, displaytxt:displaytxt, fldFCDBRequestId:fldFCDBRequestId, accountValue: accountValue });
	    		    	self.fssFDAccountList.push({ codacctno: obj.codacctno, acctbalance: obj.acctbalance, nambranch: obj.nambranch, namccyshrt: obj.namccyshrt, strid:strid, displaytxt:displaytxt, fldFCDBRequestId:fldFCDBRequestId, accountValue: accountValue });
	    			}
	    			idx++;
	    		});
	    		$("#fldFCDBRequestId").val(fldFCDBRequestId);
	    		
    		}else{
    			handleError(invocationResult.faml.response); 			
    		}
    	 }else{
				handleErrorNoResponse();
			}
    	}
    	busyInd.hide();
    };
    this.rrcss01Submit = function(){
        
    	if($("#frmcss01").valid()){
    	busyInd.show();        	
    	fldChecked_txt = $("#fldChecked option:selected").text();    

    	
    	var FrmAcctsParam = $.trim(self.selFssSavingAcc()).split('#');
    	var ToAcctsParam = $.trim(self.selFssFDAcc()).split('#');
    	
    	reqParams = {};
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldModule"] = 'CH';
    	
    	reqParams["fldTxnId"] = "CSS";
    	
    
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
    	
    	
    	reqParams["fldScrnSeqNbr"] = "02";
    	reqParams["fldChecked"] = $("#fldChecked").val();
    	reqParams["fldLinkedAcctNo"] = FrmAcctsParam[0];
    	reqParams["fldLinkedAcctDetail"] = $("#selAcct option:selected").text();
    	reqParams["fldSwpInAcctNo"] = ToAcctsParam[0];
    	reqParams["fldSwpInAcctDetail"] = $("#cmbSrcAcctNo option:selected").text();
    	reqParams["fldDestAcctNo"] = "";
    	reqParams["fldSrcAcctNo"] = "";
    	reqParams["fldToBrn"] = ToAcctsParam[1];
    	reqParams["fldFromBrn"] = FrmAcctsParam[1];
    	reqParams["fldNamCcy"] = FrmAcctsParam[3];
    	reqParams["fldToNamCcy"] = ToAcctsParam[3];
    	reqParams["fldFrmAcctBal"] = FrmAcctsParam[2];
    	reqParams["fldToAcctBal"] = ToAcctsParam[2];
    	reqParams["tdindex"] = "";
    	reqParams["selAcct"] = FrmAcctsParam[0];
    	reqParams["balance"] = FrmAcctsParam[3]+" "+FrmAcctsParam[2];
    	reqParams["cmbSrcAcctNo"] = ToAcctsParam[0];
    	reqParams["srcbalance"] = ToAcctsParam[3]+" "+ToAcctsParam[2];
    	reqParams["chkTrmsCasa"] = "on";
    	

    	var invocationData = {
    			adapter : "Accounts",
        		procedure : "RRCSS02",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	}; 
    	
    	//WL.Logger.debug(invocationData, '');
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : rrcss02Response,
    		onFailure : AdapterFail,
    		timeout: timeout
    	});
    	}    	
    };
    rrcss02Response = function(result){
    	busyInd.hide();
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
	    			accStmtData(invocationResult.faml);    
	    			window.location = "#rrcss02";
    		}else{
    			handleError(invocationResult.faml.response);
    		}
    		}else{
				handleErrorNoResponse();
			}
    	}
    };
    this.rrcss02Page = function(){
    	accstmtdata = accStmtData();
    	
    	
    	fldSrcAcctNo = accstmtdata.request.selAcct;
    	fldFromBrn = accstmtdata.request.fldFromBrn;
    	fldFrmAcctBal = accstmtdata.request.fldFrmAcctBal;
    	fldNamCcy = accstmtdata.request.fldNamCcy;
    	fldLinkedAcctDetail = accstmtdata.request.fldLinkedAcctDetail;
    	
    	
    	fldDestAcctNo = accstmtdata.request.cmbSrcAcctNo;
    	fldToBrn = accstmtdata.request.fldToBrn;
    	fldToAcctBal = accstmtdata.request.fldToAcctBal;
    	fldToNamCcy = accstmtdata.request.fldToNamCcy;
    	fldSwpInAcctDetail = accstmtdata.request.fldSwpInAcctDetail;        	
    	
    	fldFCDBRequestId = accstmtdata.response.mci.requestid;        	        	
    	fldEntityId = accstmtdata.request.fldEntityId;
    	
	    $("#contentData").load("Views/Accounts/rrcss02.html", null, function (response, status, xhr) {
            if (status != "error") {}
            fromacctDetails = fldLinkedAcctDetail+" - "+fldNamCcy+" "+fldFrmAcctBal;
            toacctnoDetails = fldSwpInAcctDetail+" - "+fldToNamCcy+" "+fldToAcctBal;

            $("#fromacctDetails").html(fromacctDetails);
            $("#toacctnoDetails").html(toacctnoDetails);
        	            	
        	$("#fldLinkedAcctNo").val(fldSrcAcctNo);
        	$("#fldLinkedAcctDetail").val(fldLinkedAcctDetail);
        	$("#fldSwpInAcctNo").val(fldDestAcctNo);
        	$("#fldSwpInAcctDetail").val(fldSwpInAcctDetail);
        	$("#fldDestAcctNo").val(fldDestAcctNo);
        	$("#fldSrcAcctNo").val(fldSrcAcctNo);
        	$("#fldToBrn").val(fldToBrn);
        	$("#fldFromBrn").val(fldFromBrn);
        	$("#fldNamCcy").val(fldNamCcy);
        	$("#fldToNamCcy").val(fldToNamCcy);
        	$("#fldToAcctBal").val(fldToAcctBal);
        	$("#fldFrmAcctBal").val(fldFrmAcctBal);
        	
            $("#fldFCDBRequestId").val(fldFCDBRequestId);            	          	
          
            ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
        });
    };
    this.rrcss02Submit = function(){
    	
    	busyInd.show();        	
    	    	
   
    	
    	
    	reqParams = {};
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldModule"] = 'CH';
    	
    	
    	
    	reqParams["fldTxnId"] = "CSS";
    	
    
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
    	
    	reqParams["fldScrnSeqNbr"] = "03";
    	reqParams["fldChecked"] = $("#fldChecked").val();
    	reqParams["fldLinkedAcctNo"] = $("#fldLinkedAcctNo").val();
    	reqParams["fldLinkedAcctDetail"] = $("#fldLinkedAcctDetail").val();
    	reqParams["fldSwpInAcctNo"] = $("#fldSwpInAcctNo").val();
    	reqParams["fldSwpInAcctDetail"] = $("#fldSwpInAcctDetail").val();
    	//reqParams["fldDestAcctNo"] =  $("#fldDestAcctNo").val();
    	//reqParams["fldSrcAcctNo"] = $("#fldSrcAcctNo").val();
    	reqParams["fldToBrn"] = $("#fldToBrn").val();
    	reqParams["fldFromBrn"] = $("#fldFromBrn").val();
    	reqParams["fldFromNamCcy"] = $("#fldNamCcy").val();
    	reqParams["fldToNamCcy"] = $("#fldToNamCcy").val();
    	reqParams["fldFromAcctBal"] = $("#fldFrmAcctBal").val();
    	reqParams["fldToAcctBal"] = $("#fldToAcctBal").val();
    	reqParams["tdindex"] = "";
    	//reqParams["selAcct"] = $("#fldLinkedAcctNo").val();
    	//reqParams["balance"] = $("#fldNamCcy").val()+" "+$("#fldFrmAcctBal").val();
    	//reqParams["cmbSrcAcctNo"] = $("#fldSrcAcctNo").val();
    	//reqParams["srcbalance"] = $("#fldToNamCcy").val()+" "+$("#fldToAcctBal").val();
    	reqParams["chkTrmsCasa"] = "on";
    	

    	var invocationData = {
    			adapter : "Accounts",
        		procedure : "RRCSS03",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	//WL.Logger.debug(invocationData, '');
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : rrcss03Response,
    		onFailure : AdapterFail,
    		timeout: timeout
    	});
    }; 
    rrcss03Response = function(result){
    	
    	busyInd.hide();
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
	    			accStmtData(invocationResult.faml);    
	    			window.location = "#rrcss03";
    		}else{
    			handleError(invocationResult.faml.response);
    		}
    		}else{
				handleErrorNoResponse();
			}
    	}
    };
    this.rrcss03Page = function(){
    	accstmtdata = accStmtData();
    	
    	linkedacctdtl = accstmtdata.response.txndetails.linkedAcctDtl;
    	swpinacctdtl = accstmtdata.response.txndetails.swpinAcctDtl;
    	benefccy = accstmtdata.response.txndetails.benefCcy;
    	providerccy = accstmtdata.response.txndetails.providerCcy;
    	fldFrmAcctBal = accstmtdata.response.txndetails.benefAcctBal;
    	provideracctbal =accstmtdata.response.txndetails.providerAcctBal;
    	
		accountList.removeAll();
        accountSummList.removeAll();
		
	    $("#contentData").load("Views/Accounts/rrcss03.html", null, function (response, status, xhr) {
            if (status != "error") {}	
            
            fromacctDetails = linkedacctdtl+" - "+benefccy+" "+fldFrmAcctBal;
            toacctnoDetails = swpinacctdtl+" - "+providerccy+" "+provideracctbal;
            
            $("#fromacctDetails").html(fromacctDetails);
            $("#toacctnoDetails").html(toacctnoDetails);
          
            ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
        }); 
    };
    this.RrrdsDetails = function(){
    	if(self.recurringDepositList().length === 0){
        	busyInd.show();
        	
        	reqParams = {};
        	reqParams["fldDeviceId"] = fldDeviceId;
	    	reqParams["fldWebServerId"] = fldWebServerId;
	    	reqParams["fldAppId"] = fldAppId;
	    	reqParams["fldAppServerId"] = fldAppServerId;
	    	reqParams["fldLangId"] = fldLangId;
	    	reqParams["fldModule"] = 'RD';
	    	
	    	reqParams["fldTxnId"] = "RDS";
	    	reqParams["fldScrnSeqNbr"] = "01";
	 
	    	
	    	fldjsessionid = Regfldjsessionid;
	    	reqParams["fldLoginUserId"] =Regloginuid;
	    	reqParams["fldSessionId"] = Rsessionid;
	    	
	    	
	    	var invocationData = {
	    			adapter : "Accounts",
	        		procedure : "RRRDS01",
	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	    	};   		
        		
        	////WL.Logger.debug(invocationData, '');
        	WL.Client.invokeProcedure(invocationData, {
        		onSuccess : rdSummarySuccess,
        		onFailure : AdapterFail,
        		timeout: timeout
        	});
        	}
        	
		    $("#contentData").load("Views/Accounts/rrrds01.html", null, function (response, status, xhr) {
                if (status != "error") {}	                
                    ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
            });
    };
    rdSummarySuccess = function(result){
    	
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
    			
    			acctdtls = invocationResult.faml.response.acctdtls;
	    		
    			nbrtdaccts = invocationResult.faml.response.nbrrdaccts;
    			modulecode = invocationResult.faml.response.modulecode;
    			
    			flgwarning = invocationResult.faml.response.flgwarning;
    			
    			if(modulecode == 'RD' && nbrtdaccts != 0)
    				$("#maturityMsg").show();
    			else
    				$("#maturityMsg").hide();
    			
    			if(nbrtdaccts > 0)
    				$("#accExitsMsg").hide();
    			else
    				$("#accExitsMsg").show();
    				
    			self.recurringDepositList.removeAll();
    			
    			$(acctdtls).each(function(index, obj) { 
    				currbalance = formatAmt(parseFloat(obj.currbalance));
    				rdmatamt = formatAmt(parseFloat(obj.rdmatamt));
    				self.recurringDepositList.push({ codacctno: obj.codacctno, rdmatamt: rdmatamt, rdopendate: obj.rdopendate, rdmatdate: obj.rdmatdate, 
    					nambranch: obj.nambranch, namccyshrt: obj.namccyshrt, currbalance: currbalance, rdtenure: obj.rdtenure, rateint:obj.rateint, rdbalavailable:formatAmt(parseFloat( obj.rdbalavailable)) });
    			});
	    		
    			if(flgwarning == true)
    			{
    				msgwarning = accstmtdata.response.msgwarning;
    				$("#flgwarningMsg").show();
    				$("#flgwarningMsg p").html(msgwarning);
    				
    			}else{
    				$("#flgwarningMsg").hide();
    			}
	    		
    		}else{
    			handleError(invocationResult.faml.response);
    		}
    	 }else{
				handleErrorNoResponse();
			}
    	}
    	busyInd.hide();
    };
    this.RrloaDetails = function(){
    	
    	if(self.fixedDepositList().length === 0){
        	busyInd.show();
        	
        	reqParams = {};
        	reqParams["fldDeviceId"] = fldDeviceId;
	    	reqParams["fldWebServerId"] = fldWebServerId;
	    	reqParams["fldAppId"] = fldAppId;
	    	reqParams["fldAppServerId"] = fldAppServerId;
	    	reqParams["fldLangId"] = fldLangId;
	    	reqParams["fldModule"] = 'TD';
	    	
	    	reqParams["fldTxnId"] = "LOA";
	    	
	    	
	    	fldjsessionid = Regfldjsessionid;
	    	reqParams["fldLoginUserId"] = Regloginuid;
	    	reqParams["fldSessionId"] = Rsessionid;
	    	reqParams["fldLoginCustId"] =Regloginuid;
	    	
	    
	    	reqParams["fldLoginUserToken"] = "777";
	    	reqParams["fldLoginUserType"] = "0";
	    	reqParams["fldLoginUserCss"] = 'preferred';
	    	reqParams["fldLoginUserGroupType"] = 'N';
	    	reqParams["fldLoginUserGroupBaseType"] = 'E';
	    	reqParams["fldProxyUserFlag"] = 'N';
	    	reqParams["fldTxnLimitFlag"] = 'N';
	    	reqParams["fldAccountMapFlag"] = 'N';
	    	reqParams["fldIdChannel"] = "1";
	    	reqParams["fldRemoteAddress"] = '';
	    	reqParams["fldExtSessionId"] = '';
	    	
	    	reqParams["fldScrnSeqNbr"] = "01";
	 
	    	var invocationData = {
	    			adapter : "Accounts",
	        		procedure : "RRLOA01",
	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	    	};   		
        		    		
        		
        	WL.Client.invokeProcedure(invocationData, {
        		onSuccess : fdSummarySuccess,
        		onFailure : AdapterFail,
        		timeout: timeout
        	});
        	}
        	
		    $("#contentData").load("Views/Accounts/rrloa01.html", null, function (response, status, xhr) {
                if (status != "error") {}	                
                    ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
            });
    };
    this.rrasr02Page = function(){
    	
    	self.selAccount(null);
    	busyInd.show();        	
    	
    	

   
    	reqParams = {};
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldModule"] = 'CH';
    	reqParams["fldRoleId"] = 'NOROLE';
    	reqParams["fldTxnId"] = "ASR";
    	reqParams["fldScrnSeqNbr"] = "01";
    	 
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
    	
    	var invocationData = {
    			adapter : "Accounts",
        		procedure : "RRASR02",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	}; 
    	
    	//WL.Logger.debug(invocationData, '');
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : accountStmtSuccess,
    		onFailure : AdapterFail,
    		timeout: timeout
    	});
    	
    	
	    $("#contentData").load("Views/Accounts/rrasr02.html", null, function (response, status, xhr) {
            if (status != "error") {}	                
                ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
        });
    	
    };
    this.reqAccountStmtConfirm = function(){
        
    	if($("#frmReqAccStmt").valid()){
    	busyInd.show();        	
    
    	reqParams = {};
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldModule"] = 'CH';
    	reqParams["fldRoleId"] = 'NOROLE';
    	reqParams["fldTxnId"] = "ASR";
    	reqParams["fldScrnSeqNbr"] = "03";
    	reqParams["fldAcctNo"] = self.selAccount();
    	reqParams["fldAcctDetail"] = $("#fldAcctNo option:selected").text();
    	reqParams["fldFromDate"] = $("#fldFromDate").val();
    	reqParams["fldToDate"] = $("#fldToDate").val();
    	reqParams["fldDisplayFromDate"] = $("#fldFromDate").val();
    	reqParams["fldDisplayToDate"] = $("#fldToDate").val();
    	
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
    	
    	var invocationData = {
    			adapter : "Accounts",
        		procedure : "RRASR03",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	}; 
    	
    	//WL.Logger.debug(invocationData, '');
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : rrasr03Response,
    		onFailure : AdapterFail,
    		timeout: timeout
    	});
    	}
    };
    rrasr03Response = function(result){
    	busyInd.hide();
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
    			accStmtData(invocationResult.faml);    			
    			window.location = "#rrasr03";
    		}else{
    			handleError(invocationResult.faml.response);
    		}
    		}else{
				handleErrorNoResponse();
			}
    	}
    };
    this.rrasr03Page = function(){
    	accstmtdata = accStmtData();
    	
    	fldacctno = accstmtdata.response.fldAcctNo;
    	fldfromdate = accstmtdata.response.fldFromDate;        	
    	fldtodate = accstmtdata.response.fldToDate;	
    	fldaddr1 = accstmtdata.response.fldaddr1;
    	fldaddr2 = accstmtdata.response.fldaddr2;
    	fldaddr3 = accstmtdata.response.fldaddr3;
    	fldcustcity = accstmtdata.response.fldcustcity;
    	fldcuststate = accstmtdata.response.fldcuststate;
    	fldzip = accstmtdata.response.fldzip;
    	fldFCDBRequestId = accstmtdata.response.mci.requestid;
    	fldAcctDetail = accstmtdata.request.fldAcctDetail;
    	fldcntry = accstmtdata.response.fldcntry;
    	
    	
	    $("#contentData").load("Views/Accounts/rrasr03.html", null, function (response, status, xhr) {
            if (status != "error") {}	
            
            $("#fldacctno").html(fldacctno);
        	$("#fldfromdate").html(fldfromdate); 
        	$("#fldtodate").html(fldtodate);
        	$("#fldaddr1").html(fldaddr1);
        	$("#fldaddr2").html(fldaddr2);
        	$("#fldaddr3").html(fldaddr3);
        	$("#fldcustcity").html(fldcustcity);
        	$("#fldcuststate").html(fldcuststate);
        	$("#fldzip").html(fldzip);
        	$("#fldFCDBRequestId").val(fldFCDBRequestId);
        	$("#fldAcctDetail").val(fldAcctDetail);
        	$("#fldDisplayFromDate").val(fldfromdate);
        	$("#fldDisplayToDate").val(fldtodate);
        	$("#fldcntry").html(fldcntry);
          
            ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
        });
    	
    };
    this.reqAccountStmtConfirmSubmit = function(){
        
    	if($("#frmReqAccStmtConf").valid()){
    	busyInd.show();        	
    	fldChecked_txt = $("#fldChecked option:selected").text();
    	reqParams = {};
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldModule"] = 'CH';
    	reqParams["fldRoleId"] = 'NOROLE';
    	reqParams["fldTxnId"] = "ASR";
    	
    	
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
    	
    	reqParams["fldScrnSeqNbr"] = "02";
    	reqParams["fldAcctNo"] = $("#fldacctno").html();
    	reqParams["fldAcctDetail"] = $("#fldAcctDetail").val();
    	reqParams["fldFromDate"] = $("#fldfromdate").html();
    	reqParams["fldToDate"] = $("#fldtodate").html();
    	reqParams["fldDisplayFromDate"] =  $("#fldfromdate").html();
    	reqParams["fldDisplayToDate"] = $("#fldtodate").html();
    	
    	reqParams["fldaddr1"] = $("#fldaddr1").html();
    	reqParams["fldaddr2"] = $("#fldaddr2").html();
    	reqParams["fldaddr3"] = $("#fldaddr3").html();
    	reqParams["fldcustcity"] = $("#fldcustcity").html();
    	reqParams["fldcuststate"] = $("#fldcuststate").html();
    	reqParams["fldcntry"] = $("#fldcntry").html();
    	reqParams["fldzip"] = $("#fldzip").html();
    	reqParams["fldChecked"] = $("#fldChecked").val();
    	 
    	var invocationData = {
    			adapter : "Accounts",
        		procedure : "RRASR04",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	}; 
    	
    	//WL.Logger.debug(invocationData, '');
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : rrasr04Response,
    		onFailure : AdapterFail,
    		timeout: timeout
    	});
    	}
    	
    };
    rrasr04Response = function(result){
    	busyInd.hide();
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
    			accStmtData(invocationResult.faml);    			
    			window.location = "#rrasr04";
    		}else{
    			handleError(invocationResult.faml.response);
    		}
    		}else{
				handleErrorNoResponse();
			}
    	}
    };
    this.rrasr04Page = function(){
    	accstmtdata = accStmtData();
	      
    	codtxnrefno = accstmtdata.response.codtxnrefno; 
    	fldAcctDetail = accstmtdata.request.fldAcctDetail;
    	fldfromdate = accstmtdata.response.displayfromdate;        	
    	fldtodate = accstmtdata.response.displaytodate;	
    	fldaddr1 = accstmtdata.response.fldaddr1;
    	fldaddr2 = accstmtdata.response.fldaddr2;
    	fldaddr3 = accstmtdata.response.fldaddr3;
    	fldcustcity = accstmtdata.response.fldcustcity;
    	fldcuststate = accstmtdata.response.fldcuststate;
    	fldzip = accstmtdata.response.fldzip;
    	fldFCDBRequestId = accstmtdata.response.fldFCDBRequestId;        	
    	fldcntry = accstmtdata.response.fldcntry;
    	
	    $("#contentData").load("Views/Accounts/rrasr04.html", null, function (response, status, xhr) {
            if (status != "error") {}	
            
            $("#codtxnrefno").html(codtxnrefno);
            $("#fldAcctDetail").html(fldAcctDetail);
        	$("#fldfromdate").html(fldfromdate); 
        	$("#fldtodate").html(fldtodate);
        	$("#fldaddr1").html(fldaddr1);
        	$("#fldaddr2").html(fldaddr2);
        	$("#fldaddr3").html(fldaddr3);
        	$("#fldcustcity").html(fldcustcity);
        	$("#fldcuststate").html(fldcuststate);
        	$("#fldzip").html(fldzip);            	

          
            ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
        });
    };
    fdSummarySuccess = function(result){
    	
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
    			
    			acctdtls = invocationResult.faml.response.acctdtls;
	    		
    			nbrtdaccts = invocationResult.faml.response.nbrtdaccts;
    			modulecode = invocationResult.faml.response.modulecode;
    			
    			if(modulecode == 'TD' && nbrtdaccts != 0)
    				$("#maturityMsg").show();
    			else
    				$("#maturityMsg").hide();
    			
    			if(nbrtdaccts > 0)
    				$("#accExitsMsg").hide();
    			else
    				$("#accExitsMsg").show();
    				
    			self.fixedDepositList.removeAll();
    			
    			$(acctdtls).each(function(index, obj) {   
    				currbalance = formatAmt(parseFloat(obj.currbalance));
    				tdmatamt = formatAmt(parseFloat(obj.tdmatamt));
    				self.fixedDepositList.push({ codacctno: obj.codacctno, tdmatamt: tdmatamt, tdmatdate: obj.tdmatdate, 
    					nambranch: obj.nambranch, namccyshrt: obj.namccyshrt, currbalance: currbalance, rateint:obj.rateint, tdacctopendate: obj.tdacctopendate });
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
    
    this.EmailDRegConfrmRes = function(){
    	accstmtdata = accStmtData();
		
		fldlogincustid = accstmtdata.response.customer.userid;
		fldCustEmail = accstmtdata.response.customer.custemail;
    	
	    $("#contentData").load("Views/Accounts/rremd03.html", null, function (response, status, xhr) {
            if (status != "error") {}	
            
            $(".emrCustId").html(fldlogincustid);
            $(".emrEmailId").html(fldCustEmail);
                           
            $("#fldFCDBRequestId").val(fldFCDBRequestId);    	          	
          
            ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
        }); 
    };
    this.EmailDRegReq = function(){
    	
    	//accSlider(false);
    	self.selAccount(null);        	
    	busyInd.show();        	
    	
    	fldFCDBSessionId =RegfldFCDBSessionId;
   
    	
    	fldFCDBRequestId ="";
		
  
    	reqParams = {};
    	
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldModule"] = fldModule;
    	
    	reqParams["fldTxnId"] = "EMD";
    	reqParams["fldScrnSeqNbr"] = "01";
 
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
    	
    	var invocationData = {
    			adapter : "Accounts",
        		procedure : "RREMD01",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	//WL.Logger.debug(invocationData, '');
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : rremd01Response,
    		onFailure : AdapterFail,
    		timeout: timeout
    	});
    	
	    $("#contentData").load("Views/Accounts/rremd01.html", null, function (response, status, xhr) {
            if (status != "error") {}	 
            	
                ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
        });
    };
    
    rremd01Response = function(result){
    	
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
    			
    			customer = invocationResult.faml.response.customer.CDATA;
    			refcustemail = invocationResult.faml.response.customer.refcustemail;
    			refcustemail = $.trim(refcustemail);
    			
    			txnid = invocationResult.faml.response.mci.txnid;
    			flgemailstmt = invocationResult.faml.response.customer.flgemailstmt;
	    		
    			fldDOB = invocationResult.faml.response.customer.datbirthcust;
    			fldFCDBRequestId = invocationResult.faml.response.mci.requestid;
    			
    			arrfldDOB = fldDOB.split("/");
    			fldDayDOB = arrfldDOB[0];
    			fldMonthDOB = arrfldDOB[1];
    			fldYearDOB = arrfldDOB[2];
    			fldLogAccount = invocationResult.faml.response.logaccount;
    			fldPhone = invocationResult.faml.response.customer.refcustphone;
    			fldPhoneOff = invocationResult.faml.response.customer.refcustphoneOff;
    			fldFax = invocationResult.faml.response.customer.refcustfax;
    			fldCustNamFull = invocationResult.faml.response.customer.namcustfull;
    			fldCtrUpdSrlNo = invocationResult.faml.response.customer.ctrupdatsrlno;
    			fldAdd1 = invocationResult.faml.response.customer.txtcustadr1;
    			fldAdd2 = invocationResult.faml.response.customer.txtcustadr2;
    			fldAdd3 = invocationResult.faml.response.customer.txtcustadr3;
    			fldCity = invocationResult.faml.response.customer.txtcustcity;
    			fldState = invocationResult.faml.response.customer.txtcuststate;
    			fldZIP = invocationResult.faml.response.customer.txtcustzip;
    			fldCntry = invocationResult.faml.response.customer.txtcustcntry;
    			fldPanNo = invocationResult.faml.response.customer.pancardno;
    			fldMobileNo = invocationResult.faml.response.customer.mobileno;
    			fldAcctNo = invocationResult.faml.response.logaccount;
    			fldListAccts1 = invocationResult.faml.response.accounts;
    			fldListAccts="";
    				$(fldListAccts1).each(function(index, obj) {   
    				fldListAccts +=obj.acctno;
    			});
    			
    			flgconvstatus = invocationResult.faml.response.customer.flgconvstatus;
    			
    			if(flgconvstatus == 'Y'){
    				$("#fldconvstatus").val("Y");
    				$("#fldemailstmt").val("N");
    			}else if(flgconvstatus == 'N' && flgemailstmt == 'Y'){
    				$("#fldconvstatus").val("N");
    				$("#fldemailstmt").val("Y");
    			}else if(flgconvstatus != 'Y' && flgemailstmt == 'N'){
    				$("#fldconvstatus").val("N");
    				$("#fldemailstmt").val("Y");
    			}else if(flgconvstatus == 'E' && flgemailstmt == 'Y'){
    				$("#fldconvstatus").val("N");
    				$("#fldemailstmt").val("Y");
    			}
    			
    			$("#fldDOB").val(fldDOB);
    			$("#fldDayDOB").val(fldDayDOB);
    			$("#fldMonthDOB").val(fldMonthDOB);
    			$("#fldYearDOB").val(fldYearDOB);
    			$("#fldLogAccount").val(fldLogAccount);
    			$("#fldCustEmail").val(refcustemail);
    			$("#fldPhone").val(fldPhone);
    			$("#fldPhoneOff").val(fldPhoneOff);
    			$("#fldFax").val(fldFax);
    			$("#fldCustNamFull").val(fldCustNamFull);
    			$("#fldCtrUpdSrlNo").val(fldCtrUpdSrlNo);
    			$("#fldAdd1").val(fldAdd1);
    			$("#fldAdd2").val(fldAdd2);
    			$("#fldAdd3").val(fldAdd3);
    			$("#fldCity").val(fldCity);
    			$("#fldState").val(fldState);
    			$("#fldZIP").val(fldZIP);
    			$("#fldCntry").val(fldCntry);
    			$("#fldPanNo").val(fldPanNo);
    			$("#fldMobileNo").val(fldMobileNo);
    			$("#fldAcctNo").val(fldAcctNo);
    			$("#fldListAccts").val(fldListAccts);
    			
    			$(".emrCustId").html(customer);
    			$(".emrEmailId").html(refcustemail);
    				    			
    			if(txnid == 'EMD' && flgemailstmt == 'N'){
	    			$("#alreadyReg").hide();
	    			$("#notReg").show();
    			}else{
    				$("#alreadyReg").show();
	    			$("#notReg").hide();
    			}	    		
	    		
	    		$("#fldFCDBRequestId").val(fldFCDBRequestId);
	    		
    		}else{
    			handleError(invocationResult.faml.response);		
    		}
    	 }else{
				handleErrorNoResponse();
			}
    	}
    	busyInd.hide();
    };
    this.rremd01Submit = function(){
    	busyInd.show();        	
    	
		reqParams = {};
		
    	
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldModule"] = fldModule;
       	reqParams["fldRequestId"] =RegfldRequestId;
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
    	
    	reqParams["fldTxnId"] = "EMD";
    	reqParams["fldScrnSeqNbr"] = "02";
    	
    
    	reqParams["fldconvstatus"] = $("#fldconvstatus").val();
		reqParams["fldemailstmt"] = $("#fldemailstmt").val();
		reqParams["fldListAccts"] = $("#fldListAccts").val();
		reqParams["fldAcctNo"] = $("#fldAcctNo").val();
		reqParams["fldMobileNo"] = $("#fldMobileNo").val();
		reqParams["fldPanNo"] = $("#fldPanNo").val();
		reqParams["fldCntry"] = $("#fldCntry").val();
		reqParams["fldZIP"] = $("#fldZIP").val();
		reqParams["fldState"] = $("#fldState").val();
		reqParams["fldCity"] = $("#fldCity").val();
		reqParams["fldAdd3"] = $("#fldAdd3").val();
		reqParams["fldAdd2"] = $("#fldAdd2").val();
		reqParams["fldAdd1"] = $("#fldAdd1").val();
		
		reqParams["fldCtrUpdSrlNo"] = $("#fldCtrUpdSrlNo").val();
		reqParams["fldCustNamFull"] = $("#fldCustNamFull").val();
		reqParams["fldFax"] = $("#fldFax").val();
		reqParams["fldPhoneOff"] = $("#fldPhoneOff").val();
		reqParams["fldPhone"] = $("#fldPhone").val();
		reqParams["fldCustEmail"] = $("#fldCustEmail").val();
		reqParams["fldLogAccount"] = $("#fldLogAccount").val();
		reqParams["fldYearDOB"] = $("#fldYearDOB").val();
		reqParams["fldMonthDOB"] = $("#fldMonthDOB").val();
		reqParams["fldDayDOB"] = $("#fldDayDOB").val();
		reqParams["fldDOB"] = $("#fldDOB").val();
		
		
 
    	var invocationData = {
    			adapter : "Accounts",
        		procedure : "RREMD02",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	//WL.Logger.debug(invocationData, '');
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : rremd02Response,
    		onFailure : AdapterFail,
    		timeout: timeout
    	});
    };
    rremd02Response = function(result){
    	busyInd.hide();
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
	    			accStmtData(invocationResult.faml);    
	    			window.location = "#rremd02";
    		}else{
    			handleError(invocationResult.faml.response);
    		}
    		}else{
				handleErrorNoResponse();
			}
    	}
    };
    this.EmailDRegConfrmReq = function(){
    	accstmtdata = accStmtData();
	      
    	flddob = accstmtdata.response.fldDOB;
    	fldLogAccount = accstmtdata.response.fldLogAccount;
		fldPhone = accstmtdata.response.fldPhone;
		fldPhoneOff = accstmtdata.response.fldPhoneOff;
		fldFax = accstmtdata.response.fldFax;
		fldCustNamFull = accstmtdata.response.fldCustNamFull;
		fldCtrUpdSrlNo = accstmtdata.response.fldCtrUpdSrlNo;
		fldAdd1 = accstmtdata.response.fldAdd1;
		fldAdd2 = accstmtdata.response.fldAdd2;
		fldAdd3 = accstmtdata.response.fldAdd3;
		fldCity = accstmtdata.response.fldCity;
		fldState = accstmtdata.response.fldState;
		fldZIP = accstmtdata.response.fldZIP;
		fldCntry = accstmtdata.response.fldCntry;
		fldMobileNo = accstmtdata.response.fldMobileNo;
		fldAcctNo = accstmtdata.response.fldAcctNo;
		fldListAccts = accstmtdata.response.fldListAccts;
		fldCustEmail = accstmtdata.response.fldCustEmail;	
		
			
		fldconvstatus = accstmtdata.response.fldconvstatus;
		fldemailstmt = "N";//accstmtdata.response.fldemailstmt;
		
		fldlogincustid = accstmtdata.response.fldLoginCustId;
		fldFCDBRequestId = accstmtdata.response.mci.requestid;  
    	
	    $("#contentData").load("Views/Accounts/rremd02.html", null, function (response, status, xhr) {
            if (status != "error") {}	
            
            $(".emrCustId").html(fldlogincustid);
            $(".emrEmailId").html(fldCustEmail);
            
            $("#fldAcctNo").val(fldAcctNo);
			$("#fldCustNamFull").val(fldCustNamFull);
			$("#fldAdd1").val(fldAdd1);
			$("#fldAdd2").val(fldAdd2);
			$("#fldAdd3").val(fldAdd3);
			$("#fldCity").val(fldCity);
			$("#fldCntry").val(fldCntry);
			$("#fldState").val(fldState);
			$("#fldZIP").val(fldZIP);
			$("#fldPhone").val(fldPhone);
			$("#fldPhoneOff").val(fldPhoneOff);
			$("#fldFax").val(fldFax);
			$("#fldDOB").val(fldDOB);
			$("#fldCustEmail").val(fldCustEmail);
			$("#fldMobileNo").val(fldMobileNo);
			$("#fldCtrUpdSrlNo").val(fldCtrUpdSrlNo);
			$("#fldLogAccount").val(fldLogAccount);
			$("#fldemailstmt").val(fldemailstmt);
			$("#fldconvstatus").val(fldconvstatus);
			$("#fldListAccts").val(fldListAccts);    			
                           
            $("#fldFCDBRequestId").val(fldFCDBRequestId);    	          	
          
            ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
        });
    };
    
    this.rremd02Submit = function(){
    	
    	busyInd.show();        	
    	
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldModule"] = fldModule;
     	
    	reqParams["fldRequestId"] =RegfldRequestId;
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
    	
    	reqParams["fldTxnId"] = "EMD";
    	reqParams["fldScrnSeqNbr"] = "03";
    	
    	reqParams["fldAcctNo"] = $("#fldAcctNo").val();
    	reqParams["fldCustEmail"] = $("#fldCustEmail").val();
    	reqParams["fldemailstmt"] = $("#fldemailstmt").val();
    	reqParams["fldconvstatus"] = $("#fldconvstatus").val();
    	reqParams["fldListAccts"] = $("#fldListAccts").val();
    	reqParams["fldCustNamFull"] = $("#fldCustNamFull").val();
    	
    	reqParams["fldDOB"] = $("#fldDOB").val();
    	reqParams["fldLogAccount"] = $("#fldLogAccount").val();
    	reqParams["fldPhone"] = $("#fldPhone").val();
    	reqParams["fldPhoneOff"] = $("#fldPhoneOff").val();
    	reqParams["fldFax"] = $("#fldFax").val();
    	reqParams["fldCustNamFull"] = $("#fldCustNamFull").val();
    	reqParams["fldCtrUpdSrlNo"] = $("#fldCtrUpdSrlNo").val();
    	reqParams["fldAdd1"] = $("#fldAdd1").val();
    	reqParams["fldAdd2"] = $("#fldAdd2").val();
    	reqParams["fldAdd3"] = $("#fldAdd3").val();
    	reqParams["fldCity"] = $("#fldCity").val();
    	reqParams["fldState"] = $("#fldState").val();
    	reqParams["fldZIP"] = $("#fldZIP").val();
    	reqParams["fldCntry"] = $("#fldCntry").val();
    	reqParams["fldMobileNo"] = $("#fldMobileNo").val();
    	
    	var invocationData = {
    			adapter : "Accounts",
        		procedure : "RREMD03",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	//WL.Logger.debug(invocationData, '');
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : rremd03Response,
    		onFailure : AdapterFail,
    		timeout: timeout
    	});
    	
    	
    }; 
    rremd03Response = function(result){
    	busyInd.hide();
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
	    			accStmtData(invocationResult.faml);    
	    			window.location = "#rremd03";
    		}else{
    			handleError(invocationResult.faml.response);
    		}
    		}else{
				handleErrorNoResponse();
			}
    	}
    };
    this.EmailRegReq = function(){
    	
	   	
    	//accSlider(false);
    	self.selAccount(null);        	
    	busyInd.show();        	
    	
      	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldModule"] = fldModule;
    	reqParams["fldTxnId"] = "EMR";
    	reqParams["fldScrnSeqNbr"] = "01";
    
    	reqParams["fldRequestId"] =RegfldRequestId;

    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
    	
    	var invocationData = {
    			adapter : "Accounts",
        		procedure : "RREMR01",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	
    	//WL.Logger.debug(invocationData, '');
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : rremr03Response,
    		onFailure : AdapterFail,
    		timeout: timeout
    	});
    	
	    $("#contentData").load("Views/Accounts/rremr03.html", null, function (response, status, xhr) {
            if (status != "error") {}	 
            	
                ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
        }); 
    	
    };
    rremr03Response = function(result){
    	
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
    			
    			customer = invocationResult.faml.response.customer.CDATA;
    			refcustemail = invocationResult.faml.response.customer.refcustemail;
    			refcustemail = $.trim(refcustemail);
    			
    			txnid = invocationResult.faml.response.mci.txnid;
    			flgemailstmt = invocationResult.faml.response.customer.flgemailstmt;
	    		
    			fldDOB = invocationResult.faml.response.customer.datbirthcust;
    			fldFCDBRequestId = invocationResult.faml.response.mci.requestid;
    			
    			arrfldDOB = fldDOB.split("/");
    			fldDayDOB = arrfldDOB[0];
    			fldMonthDOB = arrfldDOB[1];
    			fldYearDOB = arrfldDOB[2];
    			fldLogAccount = invocationResult.faml.response.logaccount;
    			fldPhone = invocationResult.faml.response.customer.refcustphone;
    			fldPhoneOff = invocationResult.faml.response.customer.refcustphoneOff;
    			fldFax = invocationResult.faml.response.customer.refcustfax;
    			fldCustNamFull = invocationResult.faml.response.customer.namcustfull;
    			fldCtrUpdSrlNo = invocationResult.faml.response.customer.ctrupdatsrlno;
    			fldAdd1 = invocationResult.faml.response.customer.txtcustadr1;
    			fldAdd2 = invocationResult.faml.response.customer.txtcustadr2;
    			fldAdd3 = invocationResult.faml.response.customer.txtcustadr3;
    			fldCity = invocationResult.faml.response.customer.txtcustcity;
    			fldState = invocationResult.faml.response.customer.txtcuststate;
    			fldZIP = invocationResult.faml.response.customer.txtcustzip;
    			fldCntry = invocationResult.faml.response.customer.txtcustcntry;
    			fldPanNo = invocationResult.faml.response.customer.pancardno;
    			fldMobileNo = invocationResult.faml.response.customer.mobileno;
    			fldAcctNo = invocationResult.faml.response.logaccount;
    			fldListAccts1 = invocationResult.faml.response.accounts;
    			fldListAccts="";
    				$(fldListAccts1).each(function(index, obj) {   
    				fldListAccts +=obj.acctno;
    			});
    			
    			flgconvstatus = invocationResult.faml.response.customer.flgconvstatus;
    			
    			if(flgconvstatus == 'Y'){
    				$("#fldconvstatus").val("Y");
    				$("#fldemailstmt").val("N");
    			}
    			if(flgconvstatus == 'N' && flgemailstmt == 'Y'){
    				$("#fldconvstatus").val("N");
    				$("#fldemailstmt").val("Y");
    			}
    			if(flgconvstatus != 'Y' && flgemailstmt == 'N'){
    				$("#fldconvstatus").val("N");
    				$("#fldemailstmt").val("Y");
    			}
    			if(flgconvstatus == 'E' && flgemailstmt == 'Y'){
    				$("#fldconvstatus").val("N");
    				$("#fldemailstmt").val("Y");
    			}
    			
    			$("#fldDOB").val(fldDOB);
    			$("#fldDayDOB").val(fldDayDOB);
    			$("#fldMonthDOB").val(fldMonthDOB);
    			$("#fldYearDOB").val(fldYearDOB);
    			$("#fldLogAccount").val(fldLogAccount);
    			$("#fldCustEmail").val(refcustemail);
    			$("#fldPhone").val(fldPhone);
    			$("#fldPhoneOff").val(fldPhoneOff);
    			$("#fldFax").val(fldFax);
    			$("#fldCustNamFull").val(fldCustNamFull);
    			$("#fldCtrUpdSrlNo").val(fldCtrUpdSrlNo);
    			$("#fldAdd1").val(fldAdd1);
    			$("#fldAdd2").val(fldAdd2);
    			$("#fldAdd3").val(fldAdd3);
    			$("#fldCity").val(fldCity);
    			$("#fldState").val(fldState);
    			$("#fldZIP").val(fldZIP);
    			$("#fldCntry").val(fldCntry);
    			$("#fldPanNo").val(fldPanNo);
    			$("#fldMobileNo").val(fldMobileNo);
    			$("#fldAcctNo").val(fldAcctNo);
    			$("#fldListAccts").val(fldListAccts);
    			$(".emrCustId1").html("Customer ID            "+customer);
    			$(".emrCustId").html(customer);
    			$(".emrEmailId").html(refcustemail);
    			
    			if(refcustemail == 0){    				
	    			$("#accExitsMsg").show();
	    			$("#alreadyReg").hide();
	    			$("#notReg").hide();
	    		}else{
	    			$("#accExitsMsg").hide();
	    			
	    			if(txnid == 'EMR' && flgemailstmt == 'Y'){
		    			$("#alreadyReg").show();
		    			$("#notReg").hide();
	    			}else{
	    				$("#alreadyReg").hide();
		    			$("#notReg").show();
	    			}
	    		}	    		
	    		$("#fldFCDBRequestId").val(fldFCDBRequestId);	    		
    		}else{
    			handleError(invocationResult.faml.response);		
    		}
    	 }else{
				handleErrorNoResponse();
			}
    	}
    	busyInd.hide();
    };
    this.rremr03Submit = function(){
    	busyInd.show();        	
    	
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldModule"] = fldModule;
    	
    	reqParams["fldAcctNo"] = $("#fldAcctNo").val();
    	reqParams["fldCustNamFull"] = $("#fldCustNamFull").val();
    	reqParams["fldCtrUpdSrlNo"] = $("#fldCtrUpdSrlNo").val();
    	reqParams["fldLogAccount"] = $("#fldLogAccount").val();
    	reqParams["fldAdd1"] = $("#fldAdd1").val();
    	reqParams["fldAdd2"] = $("#fldAdd2").val();
    	reqParams["fldAdd3"] = $("#fldAdd3").val();
    	reqParams["fldCity"] = $("#fldCity").val();
    	reqParams["fldState"] = $("#fldState").val();
    	reqParams["fldZIP"] = $("#fldZIP").val();
    	reqParams["fldCntry"] = $("#fldCntry").val();
    	reqParams["fldPhone"] = $("#fldPhone").val();
    	reqParams["fldPhoneOff"] = $("#fldPhoneOff").val();
    	reqParams["fldFax"] = $("#fldFax").val();
    	reqParams["fldCustEmail"] = $("#fldCustEmail").val();
    	reqParams["fldMobileNo"] = $("#fldMobileNo").val();
    	reqParams["fldDOB"] = $("#fldDOB").val();
    	reqParams["fldDayDOB"] = $("#fldDayDOB").val();
    	reqParams["fldMonthDOB"] = $("#fldMonthDOB").val();
    	reqParams["fldYearDOB"] = $("#fldYearDOB").val();
    	reqParams["fldListAccts"] = $("#fldListAccts").val();
    	
    	reqParams["fldPanNo"] = $("#fldPanNo").val();
    	//reqParams["fldemailstmt"] = $("#fldemailstmt").val();
    	reqParams["fldemailstmt"] = "Y";
    	reqParams["fldconvstatus"] = $("#fldconvstatus").val();
    	
    	
    	
    	reqParams["fldTxnId"] = "EMR";
    	reqParams["fldScrnSeqNbr"] = "02";
    	reqParams["fldFCDBRequestId"] =$("#fldFCDBRequestId").val();
    	reqParams["fldOperationId"] = "rremr03";
    	
    	

    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
    	
		var invocationData = {
    			adapter : "Accounts",
        		procedure : "RREMR03",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	//WL.Logger.debug(invocationData, '');
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : rremr04Response,
    		onFailure : AdapterFail,
    		timeout: timeout
    	});
    };    
    
    rremr04Response = function(result){
    	busyInd.hide();
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
	    			accStmtData(invocationResult.faml);    
	    			window.location = "#rremr04";
    		}else{
    			handleError(invocationResult.faml.response);
    		}
    		}else{
				handleErrorNoResponse();
			}
    	}
    };
    this.EmailRegResult = function(){
    	
    	accstmtdata = accStmtData();
	      
    	flddob = accstmtdata.response.fldDOB;
    	fldLogAccount = accstmtdata.response.fldLogAccount;
		fldPhone = accstmtdata.response.fldPhone;
		fldPhoneOff = accstmtdata.response.fldPhoneOff;
		fldFax = accstmtdata.response.fldFax;
		fldCustNamFull = accstmtdata.response.fldCustNamFull;
		fldCtrUpdSrlNo = accstmtdata.response.fldCtrUpdSrlNo;
		fldAdd1 = accstmtdata.response.fldAdd1;
		fldAdd2 = accstmtdata.response.fldAdd2;
		fldAdd3 = accstmtdata.response.fldAdd3;
		fldCity = accstmtdata.response.fldCity;
		fldState = accstmtdata.response.fldState;
		fldZIP = accstmtdata.response.fldZIP;
		fldCntry = accstmtdata.response.fldCntry;
		fldMobileNo = accstmtdata.response.fldMobileNo;
		fldAcctNo = accstmtdata.response.fldAcctNo;
		fldListAccts = accstmtdata.response.fldListAccts;
		fldCustEmail = accstmtdata.response.fldCustEmail;			
		fldconvstatus = accstmtdata.response.fldconvstatus;
		fldemailstmt = accstmtdata.response.fldemailstmt;
		
		fldlogincustid = accstmtdata.response.fldLoginCustId;
		fldFCDBRequestId = accstmtdata.response.mci.requestid;  
    	
	    $("#contentData").load("Views/Accounts/rremr04.html", null, function (response, status, xhr) {
            if (status != "error") {}	
            
            $(".emrCustId").html(fldlogincustid);
            $(".emrEmailId").html(fldCustEmail);
            
            $("#fldAcctNo").val(fldAcctNo);
			$("#fldCustNamFull").val(fldCustNamFull);
			$("#fldAdd1").val(fldAdd1);
			$("#fldAdd2").val(fldAdd2);
			$("#fldAdd3").val(fldAdd3);
			$("#fldCity").val(fldCity);
			$("#fldCntry").val(fldCntry);
			$("#fldState").val(fldState);
			$("#fldZIP").val(fldZIP);
			$("#fldPhone").val(fldPhone);
			$("#fldPhoneOff").val(fldPhoneOff);
			$("#fldFax").val(fldFax);
			$("#fldDOB").val(fldDOB);
			$("#fldCustEmail").val(fldCustEmail);
			$("#fldMobileNo").val(fldMobileNo);
			$("#fldCtrUpdSrlNo").val(fldCtrUpdSrlNo);
			$("#fldLogAccount").val(fldLogAccount);
			$("#fldemailstmt").val(fldemailstmt);
			$("#fldconvstatus").val(fldconvstatus);
			$("#fldListAccts").val(fldListAccts);
			
                           
            $("#fldFCDBRequestId").val(fldFCDBRequestId);    	          	
          
            ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
        });
    };
    this.rremr04Submit = function(){
    	
    	busyInd.show();
    	
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldModule"] = fldModule;
     //	reqParams["fldFCDBRequestId"] = $("#fldFCDBRequestId").val();
    	reqParams["fldRequestId"] = $("#fldRequestId").val();;
    	
    
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;

    	reqParams["fldTxnId"] = "EMR";
    	reqParams["fldScrnSeqNbr"] = "03";
    	reqParams["fldOperationId"] = "rremr04";
    	
    	reqParams["fldDOB"] = $("#fldDOB").val();
    	reqParams["fldLogAccount"] = $("#fldLogAccount").val();
    	reqParams["fldCustEmail"] = $("#fldCustEmail").val();
    	reqParams["fldPhone"] = $("#fldPhone").val();
    	reqParams["fldPhoneOff"] = $("#fldPhoneOff").val();
    	reqParams["fldFax"] = $("#fldFax").val();
    	reqParams["fldCustNamFull"] = $("#fldCustNamFull").val();
    	reqParams["fldCtrUpdSrlNo"] = $("#fldCtrUpdSrlNo").val();
    	reqParams["fldAdd1"] = $("#fldAdd1").val();
    	reqParams["fldAdd2"] = $("#fldAdd2").val();
    	reqParams["fldAdd3"] = $("#fldAdd3").val();
    	reqParams["fldCity"] = $("#fldCity").val();
    	reqParams["fldState"] = $("#fldState").val();
    	reqParams["fldZIP"] = $("#fldZIP").val();
    	reqParams["fldCntry"] = $("#fldCntry").val();
    	reqParams["fldMobileNo"] = $("#fldMobileNo").val();
    	reqParams["fldAcctNo"] = $("#fldAcctNo").val();
    	reqParams["fldListAccts"] = $("#fldListAccts").val();
    	reqParams["fldemailstmt"] = $("#fldemailstmt").val();
    	reqParams["fldconvstatus"] = $("#fldconvstatus").val();
		
		
    //	fldAppId=RS&fldSessionId=178671563GBLFTVJNZ&fldRequestId=178671563GBLFTVJNZ11311973WYD&fldAcctNo=01601000055380++&fldCustEmail=HDFC1698%40GMAIL.COM&fldemailstmt=Y&fldconvstatus=Y&fldListAccts=01601050000293&fldTxnId=EMR&fldScrnSeqNbr=03&fldCustNamFull=JEREMAIS+XAVIER+DSOUZA
		var invocationData = {
				compressResponse : true,
    			adapter : "Accounts",
        		procedure : "RREMR04",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	
    	//WL.Logger.debug(invocationData, '');
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : rremr05Response,
    		onFailure : AdapterFail,
    		timeout: timeout
    	});
    	
    	
    };  
    rremr05Response = function(result){
    	busyInd.hide();
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
	    			accStmtData(invocationResult.faml);    
	    			window.location = "#rremr05";
    		}else{
    			handleError(invocationResult.faml.response);
    		}
    		}else{
				handleErrorNoResponse();
			}
    	}
    };
    this.EmailReg4Result = function(){
    	accstmtdata = accStmtData();
		
    	fldlogincustid = accstmtdata.response.customer.userid;
		fldCustEmail = accstmtdata.response.customer.custemail;
    	
	    $("#contentData").load("Views/Accounts/rremr05.html", null, function (response, status, xhr) {
            if (status != "error") {}	
            
            $(".emrCustId").html(fldlogincustid);
            $(".emrEmailId").html(fldCustEmail);             
               			
                           
            $("#fldFCDBRequestId").val(fldFCDBRequestId);    	          	
          
            ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
        });
    };
    this.CheckBReq = function(){
    	self.selAccount(null);
    	
    	busyInd.show();        	
    	
    	reqParams = {};
    	
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldModule"] = fldModule;
    	
    
    	
    	reqParams["fldRequestId"] =RegfldRequestId;

    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
    	
    	reqParams["fldScrnSeqNbr"] = "01";
    	reqParams["fldTxnId"] = "CBR";
    	
    	var invocationData = {
    			adapter : "Accounts",
        		procedure : "RRCBR02",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	//WL.Logger.debug(invocationData, '');
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : accountStmtSuccess,
    		onFailure : AdapterFail,
    		timeout: timeout
    	});
    	
    	
	    $("#contentData").load("Views/Accounts/rrcbr02.html", null, function (response, status, xhr) {
            if (status != "error") {}	                
                ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
        });
    	
    };
    this.chequeBookReqConfirm = function(){
        
    	busyInd.show();        	
    	
    	//fldAcctNo = $.trim(self.selAccount());
    	fldAcctNo_txt = $("#fldAcctNo option:selected").text();
    	
    	reqParams = {};
    	reqParams["fldAcctNo"] = self.selAccount();
    	reqParams["fldAcctDetail"] = fldAcctNo_txt;
    	
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldModule"] = fldModule;
    	
    	reqParams["fldTxnId"] = "CBR";
    	reqParams["fldScrnSeqNbr"] = "03";
   
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
    	
    	var invocationData = {
    			adapter : "Accounts",
        		procedure : "RRCBR03",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	
    	//WL.Logger.debug(invocationData, '');
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : rrcbr03Response,
    		onFailure : AdapterFail,
    		timeout: timeout
    	});
    	
    }; 
    this.CheckBReqCmfrmsub = function(){
    	accstmtdata = accStmtData();
    	
    	fldacctno = accstmtdata.response.fldAcctNo;
    	fldacctnoDet = accstmtdata.response.fldAcctDetail;
      	fldaddr1 = accstmtdata.response.fldaddr1;
    	fldaddr2 = accstmtdata.response.fldaddr2;
    	fldaddr3 = accstmtdata.response.fldaddr3;
    	fldcustcity = accstmtdata.response.fldcustcity;
    	fldcuststate = accstmtdata.response.fldcuststate;
    	fldzip = accstmtdata.response.fldzip;
    	fldFCDBRequestId = accstmtdata.response.mci.requestid;
    	fldAcctDetail = accstmtdata.request.fldAcctNo_txt;
    	fldcntry = accstmtdata.response.fldcntry;
    	fldEntityId = accstmtdata.request.fldEntityId;
    	
	    $("#contentData").load("Views/Accounts/rrcbr03.html", null, function (response, status, xhr) {
            if (status != "error") {}	
            
            $("#fldacctnodet").html(fldacctnoDet);
            $("#fldacctno").val(fldacctnoDet);
        	$("#fldaddr1").html(fldaddr1);
        	$("#fldaddr2").html(fldaddr2);
        	$("#fldaddr3").html(fldaddr3);
        	$("#fldcustcity").html(fldcustcity);
        	$("#fldcuststate").html(fldcuststate);
        	$("#fldzip").html(fldzip);
        	$("#fldRequestId").val(fldFCDBRequestId);
        	$("#fldAcctDetail").val(fldAcctDetail);
        	$("#fldcntry").html(fldcntry);
          
            ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
        });
	    busyInd.hide();   
    }; 
    this.CheckBReqCmfrmsubSucces = function(){
    	accstmtdata = accStmtData();
	      
    	codtxnrefno = accstmtdata.response.codtxnrefno; 
    	fldAcctDetail = accstmtdata.request.fldAcctDetail;
    	fldfromdate = accstmtdata.response.displayfromdate;        	
    	fldtodate = accstmtdata.response.displaytodate;	
    	fldaddr1 = accstmtdata.response.fldaddr1;
    	fldaddr2 = accstmtdata.response.fldaddr2;
    	fldaddr3 = accstmtdata.response.fldaddr3;
    	fldcustcity = accstmtdata.response.fldcustcity;
    	fldcuststate = accstmtdata.response.fldcuststate;
    	fldzip = accstmtdata.response.fldzip;
    	fldFCDBRequestId = accstmtdata.response.fldFCDBRequestId;        	
    	fldcntry = accstmtdata.response.fldcntry;
    	
	    $("#contentData").load("Views/Accounts/rrcbr04.html", null, function (response, status, xhr) {
            if (status != "error") {}	
            
            $("#codtxnrefno").html(codtxnrefno);
            $("#fldAcctDetail").html(fldAcctDetail);
        	$("#fldfromdate").html(fldfromdate); 
        	$("#fldtodate").html(fldtodate);
        	$("#fldaddr1").html(fldaddr1);
        	$("#fldaddr2").html(fldaddr2);
        	$("#fldaddr3").html(fldaddr3);
        	$("#fldcustcity").html(fldcustcity);
        	$("#fldcuststate").html(fldcuststate);
        	$("#fldzip").html(fldzip);
          	$("#fldcntry").html(fldcntry);
            ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
        });
	    busyInd.hide();   
    };
    rrcbr03Response = function(result){
    	busyInd.hide();
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
    			accStmtData(invocationResult.faml);    			
    			window.location = "#rrcbr03";
    		}else{
    			handleError(invocationResult.faml.response);
    		}
    		}else{
				handleErrorNoResponse();
			}
    	}
    };
    
    this.reqChequeBookConfirmSubmit = function(){
        if($("#frmReqAccStmtConf").valid()){
    	busyInd.show();        	
    	
    	
    	fldChecked = $("#fldChecked").val();
    	fldChecked_txt = $("#fldChecked option:selected").text();
    	fldAcctNo = $("#fldacctno").val();
    	fldAcctDetail = $("#fldacctnodet").html();
    	fldFromDate = $("#fldfromdate").html();
    	fldToDate = $("#fldtodate").html();
    	fldDisplayToDate = $("#fldacctno").html();
    	
    	fldDisplayFromDate = $("#fldDisplayFromDate").val();
    	fldDisplayToDate = $("#fldDisplayToDate").val();
    	fldcustcity = $("#fldcustcity").html();
    	fldaddr1 = $("#fldaddr1").html();
    	fldaddr2 = $("#fldaddr2").html();
    	fldaddr3 = $("#fldaddr3").html();
    	fldcuststate = $("#fldcuststate").html();
    	fldcntry = $("#fldcntry").html();
    	fldzip = $("#fldzip").html();
    	
    	reqParams = {};
    	reqParams["fldAcctNo"] = fldAcctNo;
    	reqParams["fldAcctDetail"] = fldAcctDetail;
    	reqParams["fldaddr1"] = fldaddr1;
    	reqParams["fldaddr2"] = fldaddr2;
    	reqParams["fldaddr3"] = fldaddr3;
    	reqParams["fldcustcity"] = fldcustcity;
    	reqParams["fldcuststate"] = fldcuststate;
    	reqParams["fldcntry"] = fldcntry;
    	reqParams["fldzip"] = fldzip;
    	reqParams["fldChecked"] = "true";
    	reqParams["fldconfirm"] = "Accept";
    	reqParams["fldFromDate"] = "";
    	reqParams["fldToDate"] = "";
    	
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldModule"] = fldModule;
    	
    	reqParams["fldTxnId"] = "CBR";
    	reqParams["fldRequestId"] = $("#fldRequestId").val();
    	reqParams["fldScrnSeqNbr"] = "02";
    	
    	
		
    	
    	
    

    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
    	
    	var invocationData = {
    			adapter : "Accounts",
        		procedure : "RRCBR04",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	//WL.Logger.debug(invocationData, '');
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : rrcbr04Response,
    		onFailure : AdapterFail,
    		timeout: timeout
    	});
    	}
    }; 
    
    rrcbr04Response = function(result){
    	busyInd.hide();
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
    			accStmtData(invocationResult.faml);    			
    			window.location = "#rrcbr04";
    		}else{
    			handleError(invocationResult.faml.response);
    		}
    		}else{
				handleErrorNoResponse();
			}
    	}
    };
    this.StopPaYmntcheck = function(){
    	self.selAccount(null);
    	
    
    	
    	
    	reqParams = {};
    	
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldModule"] = fldModule;
    	
    	reqParams["fldTxnId"] = "SCH";
    	reqParams["fldScrnSeqNbr"] = "01";
		
    	
    	
    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
    	
    	busyInd.show();
    	var invocationData = {
    			adapter : "Accounts",
        		procedure : "RRSCH01",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	//WL.Logger.debug(invocationData, '');
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : accountStmtSuccess,
    		onFailure : AdapterFail,
    		timeout: timeout
    	});
    	
    	
	    $("#contentData").load("Views/Accounts/rrsch01.html", null, function (response, status, xhr) {
            if (status != "error") {}	                
                ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
        });
    };
    this.rrsch01Submit = function(){
        
    	if($("#frmstopcheque").valid()){
    	busyInd.show();        	
    	fldAcctDetail = $("#fldAcctNo option:selected").text();
    	//fldAcctNo = $.trim(self.selAccount());
    	fldAcctNo = $("#fldAcctNo").val();
    	fldAcctNo_txt = $("#fldAcctNo option:selected").text();
    	fldChqStopRsn = $("#fldChqStopRsn").val();
    	fldChqStopRsn_txt = $("#fldChqStopRsn option:selected").text();
    	fldChqStopRsn1 = $("#fldChqStopRsn1").val();
    	fldChqEndNo = $("#fldChqEndNo").val();
    	fldChqStrNo = $("#fldChqStrNo").val();
    	
    	if($("#fldChqStopRsn").val()=="Specific"){
    	fldChqStopRsn = $("#fldChqStopRsn1").val();
    	}
     
    	reqParams = {};
    	
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldModule"] = fldModule;
    	
    	reqParams["fldTxnId"] = "SCH";
    	reqParams["fldScrnSeqNbr"] = "03";
    	
    	reqParams["fldAcctNo"] = fldAcctNo;
    	reqParams["fldAcctDetail"] = fldAcctDetail;
    	reqParams["fldChqEndNo"] = fldChqEndNo;
    	reqParams["fldChqStrNo"] = fldChqStrNo;
    	reqParams["fldChqStopRsn"] = fldChqStopRsn;
    	
   

    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
    	
    	var invocationData = {
    			adapter : "Accounts",
        		procedure : "RRSCH02",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	//WL.Logger.debug(invocationData, '');
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : rrsch02Response,
    		onFailure : AdapterFail,
    		timeout: timeout
    	});
    	}
    	
    };
    
    rrsch02Response = function(result){
    	busyInd.hide();
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
    			accStmtData(invocationResult.faml);    			
    			window.location = "#rrsch02";
    		}else{
    			handleError(invocationResult.faml.response);
    		}
    		}else{
				handleErrorNoResponse();
			}
    	}
    };
    this.rrsch02Submit = function(){
        
    	
   
    	fldAcctNo = $("#fldacctno").html();
    	fldAcctDetail = $("#fldAcctDetail").val();
    	fldChqEndNo = $(".endchqno").html();
    	fldChqStrNo = $(".startchqno").html();
    	fldChqStopRsn = $(".chqreason").html();
    	    	
    	reqParams = {};
    	
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldModule"] = fldModule;
    	
    	reqParams["fldTxnId"] = "SCH";
    	reqParams["fldScrnSeqNbr"] = "02";
    	
    	reqParams["fldAcctNo"] = fldAcctDetail;
    	reqParams["fldAcctDetail"] =fldAcctNo ;
    	reqParams["fldChqEndNo"] = fldChqEndNo;
    	reqParams["fldChqStrNo"] = fldChqStrNo;
    	reqParams["fldChqStopRsn"] = fldChqStopRsn;
		
    	

    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
    	
    	busyInd.show();
    	var invocationData = {
    			adapter : "Accounts",
        		procedure : "RRSCH03",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	//WL.Logger.debug(invocationData, '');
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : rrsch03Response,
    		onFailure : AdapterFail,
    		timeout: timeout
    	});
    	
    };
    rrsch03Response = function(result){
    	busyInd.hide();
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
    			accStmtData(invocationResult.faml);    			
    			window.location = "#rrsch03";
    		}else{
    			handleError(invocationResult.faml.response);
    		}
    		}else{
				handleErrorNoResponse();
			}
    	}
    };
    this.StopPaYmntcheckRes = function(){
    	accstmtdata = accStmtData();
    	
    	fldacctno = accstmtdata.response.fldacctno;
    	fldChqStrNo = accstmtdata.request.fldChqStrNo;
    	fldChqEndNo = accstmtdata.request.fldChqEndNo;
    	fldchqstoprsn = accstmtdata.response.fldchqstoprsn;
    	fldFCDBRequestId = accstmtdata.response.mci.requestid;
    	fldAcctDetail = accstmtdata.request.fldAcctDetail;        	
    	fldEntityId = accstmtdata.request.fldEntityId;
    	
	    $("#contentData").load("Views/Accounts/rrsch02.html", null, function (response, status, xhr) {
            if (status != "error") {}	
            
           // $("#fldacctno").html(fldacctno);
            $("#fldacctno").html(accstmtdata.request.fldAcctDetail);
        	$("#fldAcctDetail").val(accstmtdata.response.fldAcctNo);
            if(fldChqStrNo != fldChqEndNo){
            	$(".startchqno").html(fldChqStrNo);
            	$(".endchqno").html(fldChqEndNo);
            //	$(".chqreason").html(fldchqstoprsn);
            	$(".chqreason").html(accstmtdata.request.fldChqStopRsn);
            	if(fldChqEndNo != '')
            		$("#EndCheque").show();
            	else{
            	$(".startchqlbl").html("Cheque number");
            	$("#EndCheque").hide();
            	 $("#resonclass").removeClass( "odd" ).addClass( "even" );
            	}
            }else{
            	$("#EndCheque").hide();
            	$("#resonclass").removeClass( "odd" ).addClass( "even" );
            	$(".startchqno").html(fldChqStrNo);
            	$(".startchqlbl").html("Cheque No");
            	$(".chqreason").html(fldchqstoprsn);
            }
            $("#fldFCDBRequestId").val(fldFCDBRequestId);
        	
        	
          
            ko.applyBindings(self, $(".dynamic-page-content").get(0));
            busyInd.hide();   
        });
    	
    };
    this.StopPaYmntcheckRes3 = function(){
    	accstmtdata = accStmtData();
    	
    	fldacctno = accstmtdata.response.acctdetail;
    	fldChqStrNo = accstmtdata.request.fldChqStrNo;
    	fldChqEndNo = accstmtdata.request.fldChqEndNo;
    	fldchqstoprsn = accstmtdata.response.chqstoprsn;
    	fldFCDBRequestId = accstmtdata.response.mci.requestid;
    	fldAcctDetail = accstmtdata.request.fldAcctNo_txt;        	
    	fldEntityId = accstmtdata.request.fldEntityId;
    	codtxnrefno = accstmtdata.response.codtxnrefno;
    	
	    $("#contentData").load("Views/Accounts/rrsch03.html", null, function (response, status, xhr) {
            if (status != "error") {}	
            
            $("#fldacctno").html(fldacctno);
            $("#codtxnrefno").html(codtxnrefno);
        	
            if(fldChqStrNo != fldChqEndNo){
            	$(".startchqno").html(fldChqStrNo);
            	$(".endchqno").html(fldChqEndNo);
            //	$(".chqreason").html(fldchqstoprsn);
            	$(".chqreason").html(accstmtdata.request.fldChqStopRsn);
            	if(fldChqEndNo != '')
            		$("#EndCheque").show();
            	else{
            	$(".startchqlbl").html("Cheque No.");
            	$("#EndCheque").hide();
                 $("#resonclass").removeClass( "even" ).addClass( "odd" );
            	}
            
            }else{
            	$("#EndCheque").hide();
            	 $("#resonclass").removeClass( "even" ).addClass( "odd" );
            	$(".startchqno").html(fldChqStrNo);
            	$(".startchqlbl").html("Cheque No.");
            	$(".chqreason").html(fldchqstoprsn);
            }
            $("#fldFCDBRequestId").val(fldFCDBRequestId);
        	$("#fldAcctDetail").val(fldAcctDetail);
        	
          
            ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
        });
    	
    };
    
    /* =============== */
	
    this.rrper01Page = function(){
    	reqParams = {};
    	
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	
    	
    	reqParams["fldTxnId"] = "PER";
    	reqParams["fldScrnSeqNbr"] = "01";
    	
    	
    	
    	
    	reqParams["fldRequestId"] =RegfldRequestId;

    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
    	
    	
    	busyInd.show();
    	var invocationData = {
    			adapter : "Accounts",
        		procedure : "RRPER01",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : rrper01Success,
    		onFailure : AdapterFail,	    		
    		timeout: timeout
    	});
    };
    rrper01Success = function(result){
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
    	var permsnCnt = 0;
    	var permsnCntV = '';
    	invocationResult = result.invocationResult;
    	
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
    			
    		
    	self.MyPerlzdMenus(invocationResult.faml);
    	self.PerLzdmenuList(invocationResult.faml.response.menuitem);
    	self.myfavmenu(invocationResult.faml.response.myfavmenuitem.idtxns);
    	/*if(test.indexOf('amfgd') == -1){alert("no dash found.");}
    	if(test.indexOf('amfgd') == -1){alert("no dash found.");}
    	if(test.indexOf('amfgd') == -1){alert("no dash found.");}
    	if(test.indexOf('amfgd') == -1){alert("no dash found.");}
    	if(test.indexOf('amfgd') == -1){alert("no dash found.");}*/
    	
    	var MSPLT = invocationResult.faml.response.myfavmenuitem.idtxns.split(':');
    	var jsonMyFav = '';
    	$.each( MSPLT, function( key, val ) {
    		self.MyFmnu.push({ key : val}); 
    	});
    	
    	
    		$.each( invocationResult.faml.response.menuitem, function( key, val ) {
            	permsnCnt +=1;
            	permsnCntV = val;
    			if(val.token2=='chgaddr' || val.token2=='chgpwd' || val.token2=='mobilereg'){
    				otherCnt += 1;
    			}
    			if(val.token2=='accounts' || val.token2=='ppcard'){
    				self.PerLzdmenuListAccount.push({txnid: val.txnid});
					accts += 1;
				}
				if(val.token2=='transfer'){
					self.PerLzdmenuListTransfer.push({txnid: val.txnid});
						trsnfer += 1;
				}
				if(val.token2=='bills'){
					self.PerLzdmenuListBills.push({txnid: val.txnid});
					bills += 1;
				}
    			if(val.token2=='cards'){
    				self.PerLzdmenuListCards.push({txnid: val.txnid});
					cards += 1;
				}
				if(val.token2=='demat'){
					self.PerLzdmenuListDemat.push({txnid: val.txnid});
					demat += 1;
				}
				if(val.token2=='fcatis'){
					self.PerLzdmenuListfcatis.push({txnid: val.txnid});
					fcatis += 1;
				}
    			if(val.token2=='dtcard'){
    				self.PerLzdmenuListdtcards.push({txnid: val.txnid});
					dtcard += 1;
				}if(val.token2=='alert'){
					self.PerLzdmenuListoAlert.push({txnid: val.txnid});
						inalert += 1;
				}
				if(otherCnt>0){
					self.PerLzdmenuListotherCnt.push({txnid: val.txnid});
					
					}
    			
    				
    			//if(val.token2=='mymenu')
      		   //MmenuList 
      		  });
    		
    		self.myfavmenuOtherCount(otherCnt);    		 
    		
    		$("#contentData").load("Views/Menu/rrper01.html", null, function (response, status, xhr) {
                if (status != "error") {}
                 
                if(accts!=0){$('#accts').show();}if(trsnfer!=0){$('#trsnfer').show();}if(bills!=0){$('#bills').show();}
                if(cards!=0){$('#cards').show();}if(demat!=0){$('#demat').show();}if(fcatis!=0){$('#fcatis').show();}
                if(dtcard!=0){$('#dtcard').show();}if(inalert!=0){$('#alert').show();}
                if(permsnCnt==1 && permsnCntV=='LGF'){$('#err01').show();}
                if(otherCnt!=0){$('#otrs').show();}
                
                $('#myfavmenu').val(invocationResult.faml.response.myfavmenuitem.idtxns);
               
				var str = document.getElementById("myfavmenu").value;
				
				var myfavmenuArr = str.split(':');

				for(var i=0;i<= myfavmenuArr.length;i++) {
					$(":checkbox").each(function(){
						if(myfavmenuArr[i] == this.value) {
							$(this).attr("checked","true");
						}
					});
				}
				ko.applyBindings(self, $(".dynamic-page-content").get(0)); 
	            busyInd.hide();
            });
			
    		//window.location = "#mymenu";
    		
    	/**/
    		
    		}else{
    			handleError(invocationResult.faml.response);
    		}
    	  }else{
    		  handleErrorNoResponse();
    	  }
    	}
    };
    this.rrper01Submit  = function(){
    	busyInd.show();
    	reqParams = {};
    	var Fm = '';
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	
    	
    	reqParams["fldTxnId"] = "PER";
    	reqParams["fldScrnSeqNbr"] = "02";
    	
    	reqParams["fldRequestId"] =RegfldRequestId;

    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
		fldMyMenuTxn = '';
		$(":checkbox").each(function(){
						
						if($(this).prop('checked')) {
							// something when checked
							fldMyMenuTxn += $(this).val()+":";
						} 
						
					});
		 
    	reqParams["fldMyMenuTxn"] = fldMyMenuTxn.slice(0, -1);
    	/*$(":checkbox").each(function(){
    		if($(this).is(':checked')) {
    				Fm += $(this).val();
    		}
    	});
		reqParams["fldMyMenuTxn"] = Fm;
		*/
    	
    	
    	
    	
    	var invocationData = {
    			adapter : "Accounts",
        		procedure : "RRPER02",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : rrper02Success,
    		onFailure : AdapterFail,	    		
    		timeout: timeout
    	});
    };
    rrper02Success = function(result){
    	
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
    			MyMenus(invocationResult.faml);        	
        		MmenuList(invocationResult.faml.response.menuitem); 			
    			window.location = "#rrper02";
    		}else{
    			handleError(invocationResult.faml.response);
    			busyInd.hide();
    		}
    		}else{
				handleErrorNoResponse();
			}
    	}
    	
    };
	this.rrper02Page = function(){
		
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
        	
             $(".h_title").html("My Menu");     
            mlst = MmenuList();
        	MmenuList11.removeAll();
    		MmenuList2.removeAll();
    		MmenuList3.removeAll();
    		MmenuList4.removeAll();
    		MmenuList5.removeAll();
    		MmenuList6.removeAll();
    		MmenuList7.removeAll();
    		MmenuList8.removeAll();
    		MmenuList9.removeAll();	
            
            //
            $.each( mlst, function( key, val ) {
            if(val.token2=='mymenu'){	
    			if(val.token2=='chgaddr' || val.token2=='chgpwd' || val.token2=='mobilereg'){
    				otherCnt += 1;
    			}
				
    			if(val.txnid == 'ASM' || val.txnid == 'SIN' || val.txnid == 'CSS' || val.txnid == 'EMD' || val.txnid == 'EMR' || val.txnid == 'HIQ' || val.txnid == 'FDL' || val.txnid == 'ASR' || val.txnid == 'CBR' || val.txnid == 'SCH' || val.txnid == 'SUS' || val.txnid == 'TXI' || val.txnid == 'CSI' || val.txnid == 'LOA' || val.txnid == 'RDS' || val.txnid == 'FTR' || val.txnid == 'FDR' || val.txnid == 'RDO' || val.txnid == 'FSS' || val.txnid == 'PFC' || val.txnid == 'RFX'){
    				accts += 1;
				
					MmenuList11.push({txnid: val.txnid, menudesc: val.menudesc});
    			}
    			if(val.txnid == 'TPT' || val.txnid == 'TPN' || val.txnid == 'TPI' || val.txnid == 'TPV' || val.txnid == 'CPQ' || val.txnid == 'VMT' || val.txnid == 'MPE' || val.txnid == 'IFT' || val.txnid == 'VFT' || val.txnid == 'P2A' || val.txnid == 'MMG' || val.txnid == 'MMR' || val.txnid == 'MMC'){
    				trsnfer += 1;
					MmenuList3.push({txnid: val.txnid, menudesc: val.menudesc});
    				}
    			if(val.txnid == 'UCR' || val.txnid == 'BMR' || val.txnid == 'DTH' || val.txnid == 'BMP' || val.txnid == 'BDP' || val.txnid == 'UAB' || val.txnid == 'UVB' || val.txnid == 'UPH' || val.txnid == 'UAP' || val.txnid == 'UVP'){bills += 1;
				MmenuList2.push({txnid: val.txnid, menudesc: val.menudesc});}
    			if(val.txnid == 'ACS' || val.txnid == 'ACI' || val.txnid == 'CCP' || val.txnid == 'UNB' || val.txnid == 'UPD' || val.txnid == 'CAC' || val.txnid == 'EST' || val.txnid == 'PCR' || val.txnid == 'APR' || val.txnid == 'CDC' || val.txnid == 'APD'){
    				cards += 1;
					MmenuList4.push({txnid: val.txnid, menudesc: val.menudesc});
    				}
    			if(val.txnid == 'DPL' || val.txnid == 'HLD' || val.txnid == 'DPQ' || val.txnid == 'DTS' || val.txnid == 'DMQ' || val.txnid == 'DIQ' || val.txnid == 'DCQ'){demat += 1;
				MmenuList7.push({txnid: val.txnid, menudesc: val.menudesc});}
    			if(val.txnid == 'WCM' || val.txnid == 'IPB' || val.txnid == 'VPR' || val.txnid == 'OBU' || val.txnid == 'ORE' || val.txnid == 'OSW' || val.txnid == 'SIP' || val.txnid == 'SRP' || val.txnid == 'TXA' || val.txnid == 'SWP' || val.txnid == 'STP' || val.txnid == 'OST'){
    				fcatis += 1;
					MmenuList6.push({txnid: val.txnid, menudesc: val.menudesc});
    				}
    			if(val.txnid == 'DCE' || val.txnid == 'DCL'){dtcard += 1;
				MmenuList9.push({txnid: val.txnid, menudesc: val.menudesc});}
    			if(val.txnid == 'ALT' || val.txnid == 'ALM'){
    				inalert += 1;
					MmenuList8.push({txnid: val.txnid, menudesc: val.menudesc});
    			}
    			if(val.txnid == 'CPW' || val.txnid == 'CAD'){
    				otherCnt += 1;
					MmenuList5.push({txnid: val.txnid, menudesc: val.menudesc});
    				}
            }
    			//if(val.token2=='nmymenu')
      		   //MmenuList 
      		  });
            //
            $("#contentData").load("Views/Menu/rrper02.html", null, function (response, status, xhr) {
                if (status != "error") {}
               
                
                //ko.applyBindings(self, $(".dynamic-page-content").get(0));
                var model = new loginViewModel();
                ko.applyBindings(model, $(".dynamic-page-content").get(0)); 
                if(accts!=0){$('#accts').show();}if(trsnfer!=0){$('#trsnfer').show();}if(bills!=0){$('#bills').show();}
                if(cards!=0){$('#cards').show();}if(demat!=0){$('#demat').show();}if(fcatis!=0){$('#fcatis').show();}
                if(dtcard!=0){$('#dtcard').show();}if(inalert!=0){$('#alert').show();}
                if(otherCnt!=0){$('#otrs').show();}
                busyInd.hide();
            });
						
			
	}; 
        //personalized menu end
        //MMRChange
        this.rrmmr01Page = function(){
        	reqParams = {};
	    	
	    	reqParams["fldDeviceId"] = fldDeviceId;
	    	reqParams["fldWebServerId"] = fldWebServerId;
	    	reqParams["fldAppId"] = fldAppId;
	    	reqParams["fldAppServerId"] = fldAppServerId;
	    	reqParams["fldLangId"] = fldLangId;
	    	reqParams["fldModule"] = "CH";
	    	
	    	reqParams["fldTxnId"] = "MMR";
	    	reqParams["fldScrnSeqNbr"] = "01";
	    	reqParams["fldCardNo"] = "";
	    	reqParams["fldAcctNo"] = "";
	    	reqParams["fldUhid"] = "";
	    	reqParams["fldDpId"] = "";
	    	reqParams["fldAmcId"] = "ALL";
	    	reqParams["fldReportDate"] = "";
	    	reqParams["fldRoleId"] = "";
	    	reqParams["fldLogoffReq"] = "N";
	    	
	    	
	    	
	    	reqParams["fldRequestId"] =RegfldRequestId;

	    	fldjsessionid = Regfldjsessionid;
	    	reqParams["fldLoginUserId"] =Regloginuid;
	    	reqParams["fldSessionId"] = Rsessionid;
	    	
	    	busyInd.show();
	    	var invocationData = {
	    			adapter : "Accounts",
	        		procedure : "RRMMR01",
	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	    	};
	    	//fldAppId=RS&fldTxnId=MMG&fldScrnSeqNbr=01&fldSessionId=715278887WXXUNDNOI&fldSwitchAppId=&fldLogoffReq=N&fldRequestId=715278887WXXUNDNOI114852233GK&
	    	WL.Client.invokeProcedure(invocationData, {
	    		onSuccess : rrmmr01Success,
	    		onFailure : AdapterFail,	    		
	    		timeout: timeout
	    	});
        };
        
        
        rrmmr01Success = function(result){
        	invocationResult = result.invocationResult;
        	if(invocationResult.isSuccessful) {
        		if(invocationResult.faml.response){
        		if(invocationResult.faml.response.rc.returncode == 0){
        			
        			
    	    		itemdata = invocationResult.faml.response.acctdtls;
    	    		nbrofsavingacc = invocationResult.faml.response.nbrsavingacct;
    	    		nbrofcurrentacc = invocationResult.faml.response.nbrcurrentacct;
    	    		mobileno = invocationResult.faml.response.mobileno;
    	    		custname = invocationResult.faml.response.custname;
    	    		emailid = invocationResult.faml.response.emailid;
    	    		totAccount = parseInt(nbrofsavingacc) + parseInt(nbrofcurrentacc);
    	    		
    	    		if(invocationResult.faml.response.mci){
        				requestid = invocationResult.faml.response.mci.requestid;
        			}else{
        				requestid = RegfldRequestId;
        			}
    	    		
    	    		self.MMIDaccountList.removeAll();
    	    		var idx = 1;
    	    		$(itemdata).each(function(index, obj) {
    	    			strid = idx;
    	    			custnames = "";
    	    			
    	    			displaytxt = obj.codacctno+"-"+obj.nambranch;	    			
    	    			accountValue = obj.codacctno;
    	    		    
    	    			
    	    			self.MMIDaccountList.push({ codacctno: obj.codacctno,  nambranch: obj.nambranch, displaytxt:displaytxt });
    	    				    				    			
    	    			idx++;
    	    		}); 
    	    		
    	    		 $("#contentData").load("Views/Accounts/rrmmr01.html", null, function (response, status, xhr) {
    	    	            if (status != "error") {}	
    	    	           // alert(fldfromacctno);
    	    	            $('#CusTNm').val(custname);
    	    	            $('#mobno').html(mobileno); 
    	    	            $('#emailid').val(emailid);
    	    	            $("#fcbrequestid,#fldRequestId").val(requestid);
    	    	            
    	    	            ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
    	    	        });
    	    		
        		}else{
        			handleError(invocationResult.faml.response);
					if(invocationResult.faml.response.rc != undefined){
            			if(invocationResult.faml.response.rc.errorcode != "10020"){
            			window.location = "#rrftr01";
            			}
            			}
        		}
        	}else{
				handleErrorNoResponse();
			}
        	}
        	busyInd.hide();
        };
        
        this.rrmmr01Submit = function(){
        	
        	if($("#frmmmr01").valid()){
        	selaccno = self.selAccount();
        	reqParams = {};
	    	reqParams["fldDeviceId"] = fldDeviceId;
	    	reqParams["fldWebServerId"] = fldWebServerId;
	    	reqParams["fldAppId"] = fldAppId;
	    	reqParams["fldAppServerId"] = fldAppServerId;
	    	reqParams["fldLangId"] = fldLangId;
	    	reqParams["fldModule"] = "CH";
	    	
	    	reqParams["fldTxnId"] = "MMR";
	    	reqParams["fldRequestId"] = $("#fldRequestId").val();
	    	reqParams["fldScrnSeqNbr"] = "02";
	    	reqParams["mobileno"] = $('#mobno').html();
	    	reqParams["custname"] = $('#CusTNm').val();
	    	reqParams["selAcct"] = selaccno;
	    	reqParams["fldAcctNo"] = selaccno;
	    	
	    	reqParams["termsnconditions"] = $('#fldChecked option:selected').val();
	    	reqParams["emailid"] = $('#emailid').val();
	    	
	    	
	    	 
	    	
	    	fldjsessionid = Regfldjsessionid;
	    	reqParams["fldLoginUserId"] =Regloginuid;
	    	reqParams["fldSessionId"] = Rsessionid;
	    	
	    	
	    	busyInd.show();
	    	var invocationData = {
	    			adapter : "Accounts",
	        		procedure : "RRMMR02",
	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	    	};
	    	WL.Client.invokeProcedure(invocationData, {
	    		onSuccess : rrmmr02Success,
	    		onFailure : AdapterFail,	    		
	    		timeout: timeout
	    	});
        	}
        };
        rrmmr02Success = function(result){
        	
        	
        	invocationResult = result.invocationResult;
        	if(invocationResult.isSuccessful) {
        		if(invocationResult.faml.response){	
        		if(invocationResult.faml.response.rc.returncode == 0){
    	    			accStmtData(invocationResult.faml);    
    	    			window.location = "#rrmmr02";
        		}else{
        			fldFCDBRequestId = invocationResult.faml.response.mci.requestid;
        			$("#fldRequestId").val(fldFCDBRequestId);
        			handleError(invocationResult.faml.response);
        		}
        		}else{
    				handleErrorNoResponse();
    			}
        	}
        };
        this.rrmmr02Page = function(){
        	accstmtdata = accStmtData();
        	
        	succmsg = accstmtdata.response.successMessage;
        	errmsg = accstmtdata.response.failureMessage;
        	rescode = accstmtdata.response.respCode;
        	
        	$("#contentData").load("Views/Accounts/rrmmr02.html", null, function (response, status, xhr) {
                if (status != "error") {}
                
                if(rescode == '00'){
                	$(".sucmsg").html(succmsg);
                	$("#succdata").show();
                }else{
                	$(".errmsg").html(errmsg);
                	$("#errordata").show();
                }
                ko.applyBindings(self, $(".dynamic-page-content").get(0));
        	});
        	busyInd.hide();
        };
        
        
        //MMRChange end
        this.rrmmg01Page = function(){
        	reqParams = {};
	    	
	    	reqParams["fldDeviceId"] = fldDeviceId;
	    	reqParams["fldWebServerId"] = fldWebServerId;
	    	reqParams["fldAppId"] = fldAppId;
	    	reqParams["fldAppServerId"] = fldAppServerId;
	    	reqParams["fldLangId"] = fldLangId;
	    	reqParams["fldModule"] = "CH";
	    	
	    	reqParams["fldTxnId"] = "MMG";
	    	reqParams["fldScrnSeqNbr"] = "01";
	    	reqParams["fldCardNo"] = "";
	    	reqParams["fldAcctNo"] = "";
	    	reqParams["fldUhid"] = "";
	    	reqParams["fldDpId"] = "";
	    	reqParams["fldAmcId"] = "ALL";
	    	reqParams["fldReportDate"] = "";
	    	reqParams["fldRoleId"] = "";
	    	reqParams["fldLogoffReq"] = "N";
	    	
	      	reqParams["fldRequestId"] =RegfldRequestId;

	    	fldjsessionid = Regfldjsessionid;
	    	reqParams["fldLoginUserId"] =Regloginuid;
	    	reqParams["fldSessionId"] = Rsessionid;
	    	
	    	
	    	busyInd.show();
	    	var invocationData = {
	    			adapter : "Accounts",
	        		procedure : "RRMMG01",
	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	    	};
	    	
	    	WL.Client.invokeProcedure(invocationData, {
	    		onSuccess : rrmmg01Success,
	    		onFailure : AdapterFail,	    		
	    		timeout: timeout
	    	});
        };
        
        
        rrmmg01Success = function(result){
        	invocationResult = result.invocationResult;
        	if(invocationResult.isSuccessful) {
        		if(invocationResult.faml.response){
        		if(invocationResult.faml.response.rc.returncode == 0){
        			
        			if(invocationResult.faml.response.mci){
        				requestid = invocationResult.faml.response.mci.requestid;
        			}else{
        				requestid =RegfldRequestId;
        			}
        			
    	    		itemdata = invocationResult.faml.response.acctdtls;
    	    		nbrofsavingacc = invocationResult.faml.response.nbrsavingacct;
    	    		nbrofcurrentacc = invocationResult.faml.response.nbrcurrentacct;
    	    		mobileno = invocationResult.faml.response.mobileno;
    	    		custname = invocationResult.faml.response.custname;
    	    		emailid = invocationResult.faml.response.emailid;
    	    		totAccount = parseInt(nbrofsavingacc) + parseInt(nbrofcurrentacc);
    	    		if(totAccount > 0)
    	    			accSlider(true);
    	    		else
    	    			accSlider(false);
    	    		
    	    		self.MMIDaccountList.removeAll();
    	    		var idx = 1;
    	    		$(itemdata).each(function(index, obj) {
    	    			strid = idx;
    	    			custnames = "";
    	    			
    	    			displaytxt = obj.codacctno+"-"+obj.nambranch;	    			
    	    			accountValue = obj.codacctno;
    	    		    
    	    			
    	    			self.MMIDaccountList.push({ codacctno: obj.codacctno,  nambranch: obj.nambranch, displaytxt:displaytxt });
    	    				    				    			
    	    			idx++;
    	    		}); 
    	    		 $("#contentData").load("Views/Accounts/rrmmg01.html", null, function (response, status, xhr) {
    	    	            if (status != "error") {}	
    	    	           // alert(fldfromacctno);
    	    	            $('#CusTNm').html(custname);
    	    	            $('#mobno').html(mobileno); 
    	    	            $('#emailid').val(emailid);
    	    	            $("#fldRequestId").val(requestid);
    	    	          
    	    	            ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
    	    	        });
    	    		
    	    		
    	    		    	    		    	    		
        		}else{
        			handleError(invocationResult.faml.response);
					if(invocationResult.faml.response.rc != undefined){
            			if(invocationResult.faml.response.rc.errorcode != "10020"){
            			window.location = "#rrftr01";
            			}
            			}
        		}
        	}else{
        		 handleErrorNoResponse();
        	}
        	}
        	busyInd.hide();
        };
        
        this.rrmmg01Submit = function(){
        	
        	if($("#frmmmg01").valid()){
        	
        	selaccno = self.selAccount();
        	reqParams = {};
	    	reqParams["fldDeviceId"] = fldDeviceId;
	    	reqParams["fldWebServerId"] = fldWebServerId;
	    	reqParams["fldAppId"] = fldAppId;
	    	reqParams["fldAppServerId"] = fldAppServerId;
	    	reqParams["fldLangId"] = fldLangId;
	    	reqParams["fldModule"] = "CH";
	    	
	    	reqParams["fldTxnId"] = "MMG";
	    	reqParams["fldRequestId"] = $("#fldRequestId").val();
	    	reqParams["fldScrnSeqNbr"] = "02";
	    	reqParams["mobileno"] = $('#mobno').html();
	    	reqParams["custname"] = $('#CusTNm').html();
	    	reqParams["selAcct"] = selaccno;
	    	reqParams["fldAcctNo"] = selaccno;
	    	
	    	reqParams["termsnconditions"] = $('#fldChecked option:selected').val();
	    	reqParams["emailid"] = $('#emailid').val();
	    		    	 
	    	
	    	

	    	fldjsessionid = Regfldjsessionid;
	    	reqParams["fldLoginUserId"] =Regloginuid;
	    	reqParams["fldSessionId"] = Rsessionid;
	    	
	    	
	    	busyInd.show();
	    	var invocationData = {
	    			adapter : "Accounts",
	        		procedure : "RRMMG02",
	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	    	};
	    	WL.Client.invokeProcedure(invocationData, {
	    		onSuccess : rrmmg02Success,
	    		onFailure : AdapterFail,	    		
	    		timeout: timeout
	    	});
        	}
        };
        rrmmg02Success = function(result){
        	
        	
        	invocationResult = result.invocationResult;
        	if(invocationResult.isSuccessful) {
        		if(invocationResult.faml.response){	
        		if(invocationResult.faml.response.rc.returncode == 0){
    	    			accStmtData(invocationResult.faml);    
    	    			window.location = "#rrmmg02";
        		}else{
        			fldFCDBRequestId = invocationResult.faml.response.mci.requestid;
        			$("#fldRequestId").val(fldFCDBRequestId);
        			handleError(invocationResult.faml.response);
        		}
        		}else{
           		 handleErrorNoResponse();
            	}
        	}
        	busyInd.hide();
        };
        this.rrmmg02Page = function(){
        	accstmtdata = accStmtData();
        	
        	if(accstmtdata.response.mci){
				requestid = accstmtdata.response.mci.requestid;
			}else{
				requestid = RegfldRequestId;
			}
        	
        	$("#contentData").load("Views/Accounts/rrmmg02.html", null, function (response, status, xhr) {
                if (status != "error") {}
                
                $('#CusTNm').html(accstmtdata.request.custname);
	            $('#mobno').html(accstmtdata.request.mobileno); 
	            $('#emailid').val(accstmtdata.request.emailid);          	          	
	            $('#accno').html(accstmtdata.request.selAcct); 
	            
	            $("#fldRequestId").val(requestid);
	            
                ko.applyBindings(self, $(".dynamic-page-content").get(0));
                busyInd.hide();
            });
        };
        this.rrmmg02Submit = function(){
        	selaccno = self.selAccount();
        	reqParams = {};
	    	reqParams["fldDeviceId"] = fldDeviceId;
	    	reqParams["fldWebServerId"] = fldWebServerId;
	    	reqParams["fldAppId"] = fldAppId;
	    	reqParams["fldAppServerId"] = fldAppServerId;
	    	reqParams["fldLangId"] = fldLangId;
	    	reqParams["fldModule"] = "CH";
	    	
	    	reqParams["fldTxnId"] = "MMG";
	    	reqParams["fldRequestId"] = $("#fldRequestId").val();
	    	reqParams["fldScrnSeqNbr"] = "03";
	    	reqParams["mobileno"] = $('#mobno').html();
	    	reqParams["custname"] = $('#CusTNm').html();
	    	reqParams["selAcct"] = $('#accno').html();
	    	reqParams["fldAcctNo"] = $('#accno').html();
	    	reqParams["emailid"] = $('#emailid').val();
	    		    	
	    	


	    	fldjsessionid = Regfldjsessionid;
	    	reqParams["fldLoginUserId"] =Regloginuid;
	    	reqParams["fldSessionId"] = Rsessionid;
	    	
	    	busyInd.show();
	    	var invocationData = {
	    			adapter : "Accounts",
	        		procedure : "RRMMG03",
	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	    	};
	    	WL.Client.invokeProcedure(invocationData, {
	    		onSuccess : rrmmg03Success,
	    		onFailure : AdapterFail,	    		
	    		timeout: timeout
	    	});
        };
        rrmmg03Success = function(result){
        	
        	
        	invocationResult = result.invocationResult;
        	if(invocationResult.isSuccessful) {
        		if(invocationResult.faml.response){	
        		if(invocationResult.faml.response.rc.returncode == 0){
    	    			accStmtData(invocationResult.faml);    
    	    			window.location = "#rrmmg03";
        		}else{
        			fldFCDBRequestId = invocationResult.faml.response.mci.requestid;
        			$("#fldRequestId").val(fldFCDBRequestId);
        			handleError(invocationResult.faml.response);
        		}
        		}else{
           		 handleErrorNoResponse();
            	}
        	}
        	
        };
        this.rrmmg03Page = function(){
        	accstmtdata = accStmtData();
        	
        	succmsg = accstmtdata.response.successMessage;
        	errmsg = accstmtdata.response.failureMessage;
        	rescode = accstmtdata.response.respCode;
        	
        	$("#contentData").load("Views/Accounts/rrmmg03.html", null, function (response, status, xhr) {
                if (status != "error") {}
                
                if(rescode == '00'){
                	$(".sucmsg").html(succmsg);
                	$("#succdata").show();
                }else{
                	$(".errmsg").html(errmsg);
                	$("#errordata").show();
                }
                ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
            });
        	busyInd.hide();
        };
        
        // open FD
        
        this.callRRFDR01 = function(){
        	busyInd.show();  
        	reqParams = {};
        	
    		reqParams["fldDeviceId"] = fldDeviceId;
        	reqParams["fldWebServerId"] = fldWebServerId;
        	reqParams["fldAppId"] = fldAppId;
        	reqParams["fldAppServerId"] = fldAppServerId;
        	reqParams["fldLangId"] = fldLangId;
        	reqParams["fldModule"] = fldModule;
        	
        	reqParams["fldTxnId"] = "FDR";
        	reqParams["fldScrnSeqNbr"] = "01";
        	reqParams["fldOperationId"] = "RRFDR01";
        	reqParams["fldSwitchAppId"] = "";
       
        	reqParams["fldRequestId"] =RegfldRequestId;

        	fldjsessionid = Regfldjsessionid;
        	reqParams["fldLoginUserId"] =Regloginuid;
        	reqParams["fldSessionId"] = Rsessionid;
        	
        	var invocationData = {
        			adapter : "Accounts",
            		procedure : "RRFDR01",
            		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
        	};
        	
        	//WL.Logger.debug(invocationData, '');
        	WL.Client.invokeProcedure(invocationData, {
        		onSuccess : self.rrfdr01Response,
        		onFailure : AdapterFail,
        		timeout: timeout
        	});	    	
        	
        	  
        };
        
        
        this.rrfdr01Response = function(result){
        	self.openFDAccList.removeAll();
        	self.prodtypeList.removeAll();
        	
        	invocationResult = result.invocationResult;
        	if(invocationResult.isSuccessful) {
        		if(invocationResult.faml.response){	
        		if(invocationResult.faml.response.rc.returncode == 0){
        			
        			$("#contentData").load("Views/Accounts/rrfdr01.html", null, function (response, status, xhr) {
                        if (status != "error") {}
                        
                        
                        
        			
        			if(!invocationResult.faml.response.producttype){
        				$(".clsFDerror").show();
        			}else{
        				
        				
        				if(invocationResult.faml.response.producttype.prodCod != ''){
        					
        					fddebitacctno = invocationResult.faml.response.fdtemplate.fddebitacctno;
        					fdflag = invocationResult.faml.response.fdtemplate.fdflag;
        					
        					if(fdflag != ''){
        						alert('We apologise but the branch that has been selected for this Fixed Deposit Template Booking feature service is currently not available. We request you to please proceed with Home Branch');
        					}
        					
        					DebtAcctNo_present = '0';
        					
        					fromAccdatatmp = invocationResult.faml.response.acctdtls;
        					$(fromAccdatatmp).each(function(index, obj) {
        						if($.trim(fddebitacctno) == $.trim(obj.codacctno)){
        							DebtAcctNo_present = '1';
        						}
        						
        					});
        					
        					if(invocationResult.faml.request.templateSelectedflag == 'true'){
        						$("#fdr_div1").show();
        						
        						debitaccno = invocationResult.faml.response.fdtemplate.fddebitacctno;
        						$(".clsdebaccno").html(debitaccno);
        						
        						fromAccdata = invocationResult.faml.response.acctdtls;
        						$(fromAccdata).each(function(index, obj) {
    								
    								if($.trim(obj.codacctno) == $.trim(debitaccno)){
    									$("#fldAmtBal").val(obj.acctbalance);
    									$("#fldAcctCurr").val(obj.codccy);
    									$("#fldNamCurrency").val(obj.namccyshrt);
    								}
    								
    							}); 
        						
        						$("#fldCodAcctNbr,#fldAcctNbr").val(debitaccno);
        						
        						
        						fdplace = invocationResult.faml.response.fdtemplate.fdplace;
        						if(fdplace == 'Home')
        							$(".clsfdplace").html('Home Branch');
        						else if(fdplace == 'Other')
        							$(".clsfdplace").html('Others');
        						else
        							$(".clsfdplace").html('-');
        						
        						
        						fldFdBrn = invocationResult.faml.response.fdtemplate.fdbranchcode;
     							fldFdBrnNam = invocationResult.faml.response.fdtemplate.fdbranch;
     							fldState = invocationResult.faml.response.fdtemplate.fdstate;
     							fldCity = invocationResult.faml.response.fdtemplate.fdcity;
     							
     							$(".clsfdstate").html(fldState);
     							$(".clsfdcity").html(fldCity);
     							$(".clsfdbrnch").html(fldFdBrnNam);
     							
     							$("#fldFdBrn").val(fldFdBrn);
     							$("#fldFdBrnNam").val(fldFdBrnNam);
     							$("#fldState").val(fldState);
     							$("#fldCity").val(fldCity);
     							$("#fldFDPlace").val(fdplace);
     							
     							
     							mytemplateDepAmt = invocationResult.faml.response.fdtemplate.fdamount;     							
     							$("#fldDepositAmt1").val(mytemplateDepAmt);
     							
     							prodtypenat = invocationResult.faml.response.fdtemplate.fdnature;
     							$(".clsnaturedepo").html(prodtypenat);
     							
     							if(prodtypenat == 'Reinvestment of Interest')
    								prodtype1 = "Reinvestment";
    							else if (prodtypenat == 'Quarterly Interest Payout')
    								prodtype1 = "QIP";
    							else if (prodtypenat == 'Monthly Interest Payout')
									prodtype1 = "MIP";
    							else 
									prodtype1 = "Days";
     							
     							prod = invocationResult.faml.response.producttype;
     							
     							for (var i = 0; i < prod.length; i++) {
   							       
   							       if (prod[i]['prodCodCat'] === prodtype1) {  
   							    	
   							    	   if(parseFloat(prod[i]['amtMin']) <= parseFloat(mytemplateDepAmt) && parseFloat(prod[i]['amtMax']) >= parseFloat(mytemplateDepAmt)){
   							    		
   							    		   $("#fldProdType,#fldSelProd").val(prod[i]['prodCodCat']);
   							    		   $("#fldFlgCumDepVal").val(prod[i]['flgCumDep']);
   							    		   $("#fldProdCodeVal").val(prod[i]['prodCod']);
   							    		   $("#fldNamProd").val(i);
   							    		   $("#fldDepTermUnit").val(prod[i]['depFlgTrm']);
   							    		   $("#fldMinTerm").val(prod[i]['termMin']);
   							    		   $("#fldMaxTerm").val(prod[i]['termMax']);
   							    		   $("#fldMinAmt").val(prod[i]['amtMin']);
   							    		   $("#fldMaxAmt").val(prod[i]['amtMax']);
   							    		   
   							    		   $(".clsminterm").html(prod[i]['termMin']);
   							    		   $(".clsmaxterm").html(prod[i]['termMax']);
   							    		   $(".clsminamt").html(prod[i]['amtMin']);
   							    		   $(".clsmaxamt").html(prod[i]['amtMax']);
   							    		   
   							    	   }
   							       }
   							    }
     							$("#fldProdCode").val(invocationResult.faml.response.fdtemplate.fdnature);
     							
     							fdtermmonth = invocationResult.faml.response.fdtemplate.fdtermmonth;
     							fdtermday = invocationResult.faml.response.fdtemplate.fdtermday;
     							$(".clsdepoperiod").html(fdtermmonth+" Months "+fdtermday+" Days");
     							
     							$("#DepMths").val(fdtermmonth);
     							$("#DepDays").val(fdtermday);
     							$("#fldTermMnths").val(fdtermmonth);
     							$("#fldTermDays").val(fdtermday);
     							
     							fdcodmatinstr = invocationResult.faml.response.fdtemplate.fdcodmatinstr;
     							if(fdcodmatinstr == '2')
     								$(".clsmatinstr").html('Renew Principal and Interest');
     							else if(fdcodmatinstr == '1')
     								$(".clsmatinstr").html('Renew Principal Only');
     							else if(fdcodmatinstr == '3')
     								$(".clsmatinstr").html('Do Not Renew');
     							else
     								$(".clsmatinstr").html('-');
     							
     							$("#fldMaturityInstr,#fldMaturityInstrIndx").val(fdcodmatinstr);
     							
     							fdcodinstrpay = invocationResult.faml.response.fdtemplate.fdcodinstrpay;
     							
     							if(fdcodinstrpay == '0'){
     								if(fdcodinstrpay == '2'){
     									$('.clsintpay').html('Not Applicable');
     									$("#fldFlgCumDep").val('Not Applicable');
     								}else{
     									$('.clsintpay').html('At Maturity');
     									$("#fldFlgCumDep").val('At Maturity');
     								}
     								
     							}
     							else if(fdcodinstrpay == '4'){
     								$('.clsintpay').html('Monthly');
 									$("#fldFlgCumDep").val('Monthly');
     							}
     							else if(fdcodinstrpay == '6'){
     								$('.clsintpay').html('Quarterly');
 									$("#fldFlgCumDep").val('Quarterly');
     							}else{
     								$('.clsintpay').html('Not Applicable');
 									$("#fldFlgCumDep").val('Not Applicable');
     							}
     							
     							$("#fldFrqIntPay").val(fdcodinstrpay);
     							
     							fdcodinstrpaymode = invocationResult.faml.response.fdtemplate.fdcodinstrpaymode;
     							
     							if(fdcodinstrpaymode == '0'){
     								$(".clsintpaymode").html('Not Applicable');     								
     							}else if(fdcodinstrpaymode == '2'){
     								$(".clsintpaymode").html('By Transfer to Savings Account');
     							}else{
     								$(".clsintpaymode").html('Not Applicable');
     							}
     							
     							$("#fldPayoutModeVal").val(fdcodinstrpaymode);
     							
     							fdcreditacctno = invocationResult.faml.response.fdtemplate.fdcreditacctno;
     							
     							if(fdcreditacctno != ''){
     								$('.clsintpraccno').html(fdcreditacctno);
     							}else{
     								$('.clsintpraccno').html('Not Applicable');
     							}
     							
     							$("#fldIntAcctNo").val(fdcreditacctno);
     							
        					}
        					else if(fddebitacctno == '' || fdflag != '' || DebtAcctNo_present != '1' || invocationResult.faml.request.templateSelectedflag == 'home'){
        						$("#fdr_div2").show();
        						
        						prod = invocationResult.faml.response.producttype;
        						cntdays = findItem(prod, "prodCodCat", "Days");
        						cntreinv = findItem(prod, "prodCodCat", "Reinvestment");
        						
        						self.prodTypeData(prod);
        						if(cntdays != 0 || cntreinv != 0){
        							
        							//openFDAccList
        							fromAccdata = invocationResult.faml.response.acctdtls;
        							
        							debitaccno = invocationResult.faml.response.fdtemplate.fddebitacctno;

        							tmpaccbal = "";
        							tmpcodccy = "";
        							tmpnamccyshrt = "";
        							
        							$(fromAccdata).each(function(index, obj) {
        								displaytxt = $.trim(obj.codacctno)+" - "+obj.nambranch;
        								accountValue = $.trim(obj.codacctno)+"#"+obj.acctbalance+"#"+obj.acctbranch+"#"+$.trim(obj.namccyshrt)+"#"+obj.codccy+"#"+obj.acctbranchCode+"#"+$.trim(obj.acctstate)+"#"+$.trim(obj.acctcity);
        								//accountValue = $.trim(obj.codacctno);
        								self.openFDAccList.push({ codacctno: obj.codacctno, displaytxt:displaytxt, accountValue: accountValue });
        								
        								if($.trim(obj.codacctno) == $.trim(debitaccno)){
        									tmpaccbal = obj.acctbalance;
                							tmpcodccy = obj.codccy;
                							tmpnamccyshrt = obj.namccyshrt;
        								}
        								
        							}); 
        							
        							$("#fldAmtBal").val(tmpaccbal);
        							$("#fldAcctCurr").val(tmpcodccy);
        							$("#fldNamCurrency").val(tmpnamccyshrt);
       							 
        							prodtypenat = invocationResult.faml.response.fdtemplate.fdnature;
        							
        							if(prodtypenat == 'Reinvestment of Interest')
        								prodtype1 = "Reinvestment";
        							else if (prodtypenat == 'Quarterly Interest Payout')
        								prodtype1 = "QIP";
        							else if (prodtypenat == 'Monthly Interest Payout')
    									prodtype1 = "MIP";
        							else 
    									prodtype1 = "Days";
        							
        							mytemplateDepAmt = invocationResult.faml.response.fdtemplate.fdamount;
        							
        							//$("#fldDepositAmt,#tmpDepositAmt").val(mytemplateDepAmt);
        							
        							DAYS_MIN_AMT = '';
        							DAYS_MAX_AMT = '';
        							REINVEST_MIN_AMT = '';
        							REINVEST_MAX_AMT = '';
        							daysflag = 1;
        							reinvflag = 1;
        							 for (var i = 0; i < prod.length; i++) {
        							       if (prod[i]['prodCodCat'] === "Days") {    	   
        							    	   DAYS_MIN_AMT = prod[i]['amtMin'];
        							    	   DAYS_MAX_AMT = prod[i]['amtMax'];
        							    	   if(daysflag){
        							    	   prodval = "Days (between 7 to 180 days)#Days#C#336#0#D#7Days#180Days#"+DAYS_MIN_AMT+"#"+DAYS_MAX_AMT;
        							    	   prodtxt = "Days (between 7 to 180 days)";
              								   self.prodtypeList.push({prodtxt: prodtxt, prodval : prodval});
              								   daysflag = 0;
        							    	   }
        							       }
        							       if (prod[i]['prodCodCat'] === "Reinvestment") {    	   
        							    	   REINVEST_MIN_AMT = prod[i]['amtMin'];
        							    	   REINVEST_MAX_AMT = prod[i]['amtMax'];
        							    	   if(reinvflag){
        							    	   prodval = "Reinvestment of Interest#Reinvestment#C#441#3#C#6 Months 1 Days#120 Months#"+REINVEST_MIN_AMT+"#"+REINVEST_MAX_AMT;
              								   prodtxt = "Reinvestment of Interest";
              								   self.prodtypeList.push({prodtxt: prodtxt, prodval : prodval});
              								   reinvflag = 0;
        							    	   }
        							       }
        							       
        							       
        							    }
        							
        							 for (var i = 0; i < prod.length; i++) {
      							       
      							       if (prod[i]['prodCodCat'] === prodtype1) {  
      							    	
      							    	   if(parseFloat(prod[i]['amtMin']) <= parseFloat(mytemplateDepAmt) && parseFloat(prod[i]['amtMax']) >= parseFloat(mytemplateDepAmt)){
      							    		
      							    		   $("#fldProdType").val(prod[i]['prodCodCat']);
      							    		   $("#fldFlgCumDepVal").val(prod[i]['flgCumDep']);
      							    		   $("#fldProdCodeVal").val(prod[i]['prodCod']);
      							    		   $("#fldNamProd").val(i);
      							    		   $("#fldDepTermUnit").val(prod[i]['depFlgTrm']);
      							    		   $("#fldMinTerm").val(prod[i]['termMin']);
      							    		   $("#fldMaxTerm").val(prod[i]['termMax']);
      							    		   $("#fldMinAmt").val(prod[i]['amtMin']);
      							    		   $("#fldMaxAmt").val(prod[i]['amtMax']);
      							    		   
      							    	   }
      							       }
      							    }
        							 
        							 $("#fldProdCode").val(invocationResult.faml.response.fdtemplate.fdnature);
        							
        							 if(cntdays != 0){
         								$("#prodtypeDays").show();
         								
         								$(".clsdayminamt").html(DAYS_MIN_AMT);
         								$(".clsdaymaxamt").html(DAYS_MAX_AMT);
 	       							 }
 	       							 
        							 $(".clsreinvminamt").html(REINVEST_MIN_AMT);
	     							 $(".clsreinvmaxamt").html(REINVEST_MAX_AMT);
	     							 $("#prodtypeReInvest").hide();	
 	       							 /*if(cntreinv != 0){
 	       								$("#prodtypeReInvest").show();
 	       								
	 	       							$(".clsreinvminamt").html(REINVEST_MIN_AMT);
	     								$(".clsreinvmaxamt").html(REINVEST_MAX_AMT);
 	       							 }*/
        							 
	     							custtype = invocationResult.faml.response.custtype;
	     							staffflag = invocationResult.faml.response.staffflag;
	     							fdslrno = invocationResult.faml.response.fdtemplate.fdslrno;
									
						
	     							
	     							fdcodmatinstr = invocationResult.faml.response.fdtemplate.fdcodmatinstr;
	     							
	     							$("#fldCustType").val(custtype);
	     							$("#fldFlagStaff").val(staffflag);
	     							$("#fldSlrno").val(fdslrno);
	     							
	     							//$("#fldMaturityInstrIndx").val(fdcodmatinstr);
	     							//$("#fldMaturityInstr").val(fdcodmatinstr);
									
	     							
	     							fdcodinstrpay = invocationResult.faml.response.fdtemplate.fdcodinstrpay;
	     							
	     							/*if(fdcodinstrpay == '0'){
	     								if(fdcodmatinstr == '2')
	     									$("#fldFlgCumDep").val("Not Applicable");
	     								else
	     									$("#fldFlgCumDep").val("At Maturity");
	     							}
	     							else if(fdcodinstrpay == '4'){
	     								$("#fldFlgCumDep").val("Monthly");
	     							}
	     							else if(fdcodinstrpay == '6'){
	     								$("#fldFlgCumDep").val("Quarterly");
	     							}else{
	     								$("#fldFlgCumDep").val("Not Applicable");
	     							}*/
	     							$("#fldFlgCumDep").val("Days");
	     							
	     							fldFdBrn = invocationResult.faml.response.fdtemplate.fdbranchcode;
	     							fldFdBrnNam = invocationResult.faml.response.fdtemplate.fdbranch;
	     							fldState = invocationResult.faml.response.fdtemplate.fdstate;
	     							fldCity = invocationResult.faml.response.fdtemplate.fdcity;
	     							fldFDPlace = invocationResult.faml.response.fdtemplate.fdplace;
	     							fldFrqIntPay = invocationResult.faml.response.fdtemplate.fdcodinstrpay;
	     							
	     							$("#fldFdBrn").val(fldFdBrn);
	     							$("#fldFdBrnNam").val(fldFdBrnNam);
	     							$("#fldState").val(fldState);
	     							$("#fldCity").val(fldCity);
	     							$("#fldFDPlace").val(fldFDPlace);
	     							$("#fldFrqIntPay").val(fldFrqIntPay);
	     							
	     							fldRequestId = invocationResult.faml.response.mci.requestid; 
	     							$("#fldRequestId").val(fldRequestId);
	     							
	     							fldIntAcctNo = invocationResult.faml.response.fdtemplate.fdcreditacctno;
	     							fldAcctNbr = invocationResult.faml.response.fdtemplate.fddebitacctno;
	     							
	     							//$("#fldIntAcctNo").val(fldIntAcctNo);
	     							//$("#fldAcctNbr,#fldCodAcctNbr").val(fldAcctNbr);
	     							
	     							/* check if min max amount is blank*/
	     							tmpminamt = $("#fldMinAmt").val();
	     							if(tmpminamt == ''){
	     								$("#fldMinAmt").val(DAYS_MIN_AMT);
	     								$("#fldMaxAmt").val(DAYS_MAX_AMT);
	     							}
        						}
        						
        					}else{
        						$("#fdr_div3").show();
        					}
        				}
							custtype = invocationResult.faml.response.custtype;
						    staffflag = invocationResult.faml.response.staffflag;
					
								$("#fldCustType").val(custtype);
								$("#fldFlagStaff").val(staffflag);
        			}
        			
        			ko.applyBindings(self, $(".dynamic-page-content").get(0)); 
        			  $('body').height($('#wrapper').height());                          
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
    
        self.showSelectedProdType = function(){
        	selprod = self.prodtype();
        	selprodtxt = $('#prodtype option:selected').text();
        	if(selprodtxt == 'Days (between 7 to 180 days)'){
        		$("#prodtypeDays").show();
        		$("#prodtypeReInvest").hide();
        		$("#fldSelProd").val("Days");
        		prodtype1 = "Days";
				$('#fldTermMnths').attr('readonly', true);
        	}
        	if(selprodtxt == 'Reinvestment of Interest'){
        		$("#prodtypeDays").hide();
        		$("#prodtypeReInvest").show();
        		$("#fldSelProd").val("Reinvestment");
        		prodtype1 = "Reinvestment";
				$('#fldTermMnths').attr('readonly', false);
        	}
        	
        	prod = self.prodTypeData();
        	mytemplateDepAmt = $("#tmpDepositAmt").val();
        	REINVEST_MIN_AMT = "";
        	REINVEST_MAX_AMT = "";
        	for (var i = 0; i < prod.length; i++) {

        		if (prod[i]['prodCodCat'] === prodtype1) {  
        		       		  
        		   if(parseFloat(prod[i]['amtMin']) <= parseFloat(mytemplateDepAmt) && parseFloat(prod[i]['amtMax']) >= parseFloat(mytemplateDepAmt)){
        			   
        			   $("#fldProdType").val(prod[i]['prodCodCat']);
        			   $("#fldFlgCumDepVal").val(prod[i]['flgCumDep']);
        			   $("#fldProdCodeVal").val(prod[i]['prodCod']);
        			   $("#fldNamProd").val(i);
        			   $("#fldDepTermUnit").val(prod[i]['depFlgTrm']);
        			   $("#fldMinTerm").val(prod[i]['termMin']);
        			   $("#fldMaxTerm").val(prod[i]['termMax']);
        			   $("#fldMinAmt").val(prod[i]['amtMin']);
        			   $("#fldMaxAmt").val(prod[i]['amtMax']);
        			 //  REINVEST_MIN_AMT = prod[i]['amtMin'];
        			  // REINVEST_MAX_AMT = prod[i]['amtMax'];
        		   }
        		}
        	}
        	
        	/*if(prodtype1 == "Reinvestment"){alert("set");
        		$(".clsreinvminamt").html(REINVEST_MIN_AMT);
				$(".clsreinvmaxamt").html(REINVEST_MAX_AMT);
        	}*/
        	
        		
        };
        
        this.rrfdr01Submit = function(){
        	Maturity= $("#fldFrqIntPay1").val();
               	
				
        	if(clkBtn == 'btn3click'){
        		
        		var objs5 = document.getElementById('templateSelectedflag');
        		var idx5 = $('#templateSelectedflag option:selected').prop('index');
        		
        		document.getElementById('templateSelectedflag_txt').value = $.trim(objs5.options[objs5.selectedIndex].innerHTML);
        		document.getElementById('templateSelectedflag_ix').value = idx5;
        		
        		var $form = $("#frmfdr01");
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
	        	
	          	
	        	reqParams["fldTxnId"] = "FDR";
	        	reqParams["fldScrnSeqNbr"] = "01";
	        	reqParams["fldOperationId"] = "RRFDR01";
	        	    
	        	

	        	fldjsessionid = Regfldjsessionid;
	        	reqParams["fldLoginUserId"] =Regloginuid;
	        	reqParams["fldSessionId"] = Rsessionid;
	        	
	        	busyInd.show();
	        	var invocationData = {
	        			adapter : "Accounts",
	            		procedure : "RRFDR01",
	            		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	        	};
	        	
	        	WL.Logger.debug(invocationData, '');
	        	WL.Client.invokeProcedure(invocationData, {
	        		onSuccess : self.rrfdr01Response,
	        		onFailure : AdapterFail,
	        		timeout: timeout
	        	});
        		
        		
        	}
        	else if(clkBtn == 'btn1click'){
        		
        		if($("#frmfdr01").valid()){
				
				
        		errflag = true;
        		minamt = $("#fldMinAmt").val();
        		maxamt = $("#fldMaxAmt").val();
        		depoamt = $("#fldDepositAmt1").val();
        		
        		if($.trim(depoamt) == ''){
        			errflag = false;
        			alert("Please Enter Deposit Amount");
        		}
        		else if(parseFloat(depoamt) < parseFloat(minamt)){
        			errflag = false;
        			alert("Deposit Amount should be greater than or equal to "+minamt);
        		}
        		else if(parseFloat(depoamt) > parseFloat(maxamt)){
        			errflag = false;
        			alert("Deposit Amount should be less than or equal to "+maxamt);
        		}
        		
        		if(errflag){
	        	busyInd.show();        	
	        	        	
	        	var $form = $("#frmfdr01");
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
	        	
	        	
	        	reqParams["fldDepositAmt"] = depoamt;
	        	
	        	
	        	

	        	fldjsessionid = Regfldjsessionid;
	        	reqParams["fldLoginUserId"] =Regloginuid;
	        	reqParams["fldSessionId"] = Rsessionid;
	        	
	        	var invocationData = {
	        			adapter : "Accounts",
	            		procedure : "RRFDR02",
	            		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	        	};
	        	
	        	WL.Client.invokeProcedure(invocationData, {
	        		onSuccess : self.rrfdr02Response,
	        		onFailure : AdapterFail,
	        		timeout: timeout
	        	});
	        	
	        	
	        	
        		}
        		}
        		
        	}else{
            
        	if($("#frmfdr01").valid()){
			
				reqParams = {};
        		errflag = true;
        		minamt = $("#fldMinAmt").val();
        		maxamt = $("#fldMaxAmt").val();
        		depoamt = $("#fldDepositAmt").val();
        		//alert(parseFloat(depoamt)+"===="+parseFloat(minamt));
        		
				monthterm = $("#fldTermMnths").val();
        		dayterm = $("#fldTermDays").val();
        		prodtypeval = $("#prodtype").val();
        		strmaturityInstr = $("#fldMaturityInstr").val();
				
        		if($.trim(depoamt) == ''){
        			errflag = false;
        			alert("Please Enter Deposit Amount");
        		}
        		else if(parseFloat(depoamt) < parseFloat(minamt)){
        			errflag = false;
        			alert("Deposit Amount should be greater than or equal to "+minamt);
        		}
        		else if(parseFloat(depoamt) > parseFloat(maxamt)){
        			errflag = false;
        			alert("Deposit Amount should be less than or equal to "+maxamt);
        		}
				else if($.trim(monthterm) == '' && $.trim(dayterm) == ''){
        			errflag = false;
        			alert("Please enter a Deposit term");
        		}
				else if($.trim(monthterm) == '' && $.trim(dayterm) != ''){
					arrselpro = prodtypeval.split("#");
					selprodtype = arrselpro[1].toLowerCase();
					
					if(selprodtype == 'days'){
						daystr = $("#fldTermDays").val();
						
						if($.trim(daystr) < 7 || $.trim(daystr) > 180){
							errflag = false;
							alert("Please enter valid tenure.Valid Tenure :7Days to 180Days");
						}
					}
					else if(selprodtype == 'reinvestment'){
						monthstr = $("#fldTermMnths").val();
						daystr = $("#fldTermDays").val();
						
						if($.trim(monthstr) < 6){
							errflag = false;
							alert("Please enter valid tenure.Valid Tenure :6 Months 1 Days to 120 Months");
						}
						else if($.trim(monthstr) == 6 && ($.trim(daystr) == 0 || $.trim(daystr) == '')){
							errflag = false;
							alert("Please enter valid tenure.Valid Tenure :6 Months 1 Days to 120 Months");
						}
						else if($.trim(monthstr) > 120){
							errflag = false;
							alert("Please enter valid tenure.Valid Tenure :6 Months 1 Days to 120 Months");
						}
					}
	
				}
				else if($.trim(monthterm) != ''){
					arrselpro = prodtypeval.split("#");
					selprodtype = arrselpro[1].toLowerCase();
					
					if(selprodtype == 'days'){
						daystr = $("#fldTermDays").val();
						
						if($.trim(daystr) < 7 || $.trim(daystr) > 180){
							errflag = false;
							alert("Please enter valid tenure.Valid Tenure :7Days to 180Days");
						}
					}
					else if(selprodtype == 'reinvestment'){
						monthstr = $("#fldTermMnths").val();
						daystr = $("#fldTermDays").val();
						
						if($.trim(monthstr) < 6){
							errflag = false;
							alert("Please enter valid tenure.Valid Tenure :6 Months 1 Days to 120 Months");
						}
						else if($.trim(monthstr) == 6 && ($.trim(daystr) == 0 || $.trim(daystr) == '')){
							errflag = false;
							alert("Please enter valid tenure.Valid Tenure :6 Months 1 Days to 120 Months");
						}
						else if($.trim(monthstr) > 120){
							errflag = false;
							alert("Please enter valid tenure.Valid Tenure :6 Months 1 Days to 120 Months");
						}
					}
	
				}
				
				if(errflag){
				if(strmaturityInstr == 1 || strmaturityInstr == 3){
					fldFrqIntPay1 = $("#fldFrqIntPay1").val();
					fldPayoutModeVal = $("#fldPayoutModeVal").val();
					fldIntCrAcctNo = $("#fldIntCrAcctNo").val();
					
					if(fldFrqIntPay1 == '0#Not Available'){
						errflag = false;
						alert("Please select Interest Payable");
					}
					else if($.trim(fldPayoutModeVal) == 0)
					{
						errflag = false;
						alert("Please select Interest Payable Mode");
					}
					else if($.trim(fldIntCrAcctNo) == '')
					{
						errflag = false;
						alert("Please select Interest / Principal Credit A/c No");
					}
				}
				}

				if(strmaturityInstr == 2){
					$("#fldFrqIntPay").val("0");
					reqParams["fldPayoutModeVal"] = "0";
				}
        		
        		if(errflag){
	        	busyInd.show();        	
	        	        	
	        	var $form = $("#frmfdr01");
	        	rsaDataArray = $form.serializeArray();    	
	        	    	    	
	        	
	        	for (var i in rsaDataArray) {
	        		reqParams[rsaDataArray[i].name] = rsaDataArray[i].value;
	        	}
	        	if(Maturity=="0#At Maturity"){
				  reqParams["fldFrqIntPay"] = Maturity.split("#")[0];
				}
	    		reqParams["fldDeviceId"] = fldDeviceId;
	        	reqParams["fldWebServerId"] = fldWebServerId;
	        	reqParams["fldAppId"] = fldAppId;
	        	reqParams["fldAppServerId"] = fldAppServerId;
	        	reqParams["fldLangId"] = fldLangId;
	        	reqParams["fldModule"] = fldModule;
	        	
	       

	        	fldjsessionid = Regfldjsessionid;
	        	reqParams["fldLoginUserId"] =Regloginuid;
	        	reqParams["fldSessionId"] = Rsessionid;
	        	
	        	reqParams["fldMaturityInstrIndx"] = $("#fldMaturityInstr").val(); 
	        	
	        	fdaccval = self.selOpenFD();
	        	arrfromaccno = fdaccval.split("#");
	        	reqParams["fldFromAcctNo"] = arrfromaccno[0];
	        	reqParams["fldAmtBal"] = arrfromaccno[1];
	        	reqParams["fldAcctCurr"] = arrfromaccno[4];
	        	reqParams["fldNamCurrency"] = arrfromaccno[3];
	        	reqParams["fldFdBrn"] = arrfromaccno[5];
	        	reqParams["fldFdBrnNam"] = arrfromaccno[2];
	        	reqParams["fldState"] = arrfromaccno[6];
	        	reqParams["fldCity"] = arrfromaccno[7];
	        	
	        	fldFlgCumDepVal = $("#fldFlgCumDepVal").val();
	        	fldProdCodeVal = $("#fldProdCodeVal").val();
	        	//if(fldFlgCumDepVal == ''){
	        		
	        		selprod = self.prodtype();
	        		arrprod = selprod.split("#");
		        	reqParams["fldFlgCumDepVal"] = arrprod[2];
		        	reqParams["fldProdCodeVal"] = arrprod[3];
		        	reqParams["fldProdCode"] = arrprod[0];
		        	reqParams["fldNamProd"] = arrprod[4];
		        	reqParams["fldProdType"] = arrprod[1];
		        	reqParams["fldDepTermUnit"] = "C";
		        	
		        	
	        	//}
	        	
	        	fldAcctNbr = $("#fldAcctNbr").val();
	        	
	        	if(fldAcctNbr == ''){
	        		reqParams["fldAcctNbr"] = arrfromaccno[0];
	        		reqParams["fldCodAcctNbr"] = arrfromaccno[0];	        		
	        	}
	        	
	        	fldFrqIntPay = $("#fldFrqIntPay").val();
	        	
	        	if(fldFrqIntPay == ''){
	        		fldFrqIntPay1 = $("#fldFrqIntPay1").val();
	        		arrintpay = fldFrqIntPay1.split("#");
		        	reqParams["fldFrqIntPay"] = arrintpay[0];
	        	}
	        		
	        	fdcrdaccval = self.creditAccno();
	        	if(fdcrdaccval != '' && fdcrdaccval != undefined && fdcrdaccval != null){
	        	arrcraccno = fdcrdaccval.split("#");
	        	reqParams["fldIntAcctNo"] = arrcraccno[0];
	        	}
	        	
	        			
	        	
	        	var invocationData = {
	        			adapter : "Accounts",
	            		procedure : "RRFDR02",
	            		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	        	};
	        	
	        	//WL.Logger.debug(invocationData, '');
	        	WL.Client.invokeProcedure(invocationData, {
	        		onSuccess : self.rrfdr02Response,
	        		onFailure : AdapterFail,
	        		timeout: timeout
	        	});
        	
        		}
        	}
        	
        	}
        };    
        
        /*this.rrfdr02Response = function(result){
        	busyInd.hide();
        	invocationResult = result.invocationResult;
        	if(invocationResult.isSuccessful) {
        		if(invocationResult.faml.response){	
        		if(invocationResult.faml.response.rc.returncode == 0){
        			//accStmtData(invocationResult.faml);    			
        			
        		}else{
        			handleError(invocationResult.faml.response);
        		}
        		}
        	}
        };*/
        
      //Vishal change for OpenFD
        this.rrfdr02Response = function(result){
				invocationResult = result.invocationResult;
				if(invocationResult.isSuccessful) {
					if(invocationResult.faml.response){	
					if(invocationResult.faml.response.rc.returncode == 0){
							accStmtData(invocationResult.faml);    
							window.location = "#rrfdr02";
					}else{
						//reqid = invocationResult.faml.response.mci.requestid;
						//$("#fldRequestId").val(reqid);
						handleError(invocationResult.faml.response);
					}
					}else{
						handleErrorNoResponse();
					}
				}
		
		};
		this.rrfdr02Page = function(){
				accts = accStmtData();
				$("#contentData").load("Views/Accounts/rrfdr02.html", null, function (response, status, xhr) {
					if (status != "error") {}
					ko.applyBindings(self, $(".dynamic-page-content").get(0));
					if(accts.response.verifyDtls.tdDepTermMths!='' && accts.response.verifyDtls.tdDepTermDays!='' ){
					 
						if(accts.response.verifyDtls.tdDepTermMths==0){
					    $('#natureOfDep1').html(accts.response.verifyDtls.tdDepTermDays+"  Days");
						}
						else{
						$('#natureOfDep1').html(accts.response.verifyDtls.tdDepTermMths+"  Months" +" "+ accts.response.verifyDtls.tdDepTermDays+"  Days");
					    }
						
					}
					
					$('#codAcctNbr').html(accts.response.verifyDtls.codAcctNbr);
					$('#fldCodAcctNbr').val(accts.response.verifyDtls.codAcctNbr);
					$('#stateName').html(accts.response.verifyDtls.stateName);
					$('#fldState').val(accts.response.verifyDtls.stateName);
					$('#cityName').html(accts.response.verifyDtls.cityName);
					$('#fldCity').val(accts.response.verifyDtls.cityName);
					$('#codFdBrnName').html(accts.response.verifyDtls.codFdBrnName);
					$('#fldFdBrnName').val(accts.response.verifyDtls.codFdBrnName);
					$('#depType').html(accts.response.verifyDtls.depType);
					$('#tdDepositAmt').html(accts.response.verifyDtls.tdDepositAmt);
					$('#fldDepositAmt').val(accts.response.verifyDtls.tdDepositAmt);
					$('#rateOfInt').html(accts.response.verifyDtls.rateOfInt);
					$('#fldRateOfInt').val(accts.response.verifyDtls.rateOfInt);
						
					
					if(accts.response.verifyDtls.tdMatInstr!=2){
								$('#tdMatInstr1').html(accts.response.verifyDtls.intPayAcctNbr);
												}else{
									$('#tdMatInstr1').html(' -Not Applicable -');			
												}
					

					if(accts.response.verifyDtls.tdMatInstr==1){
								$('#tdMatInstr').html('Renew Principal Only');
												}
					if(accts.response.verifyDtls.tdMatInstr==2){
								$('#tdMatInstr').html('Renew Principal and Interest');
												}
					if(accts.response.verifyDtls.tdMatInstr==3){
								$('#tdMatInstr').html('Do not renew');
												}
					$('#fldMaturityInstr').val(accts.response.verifyDtls.tdMatInstr);
					if(accts.response.verifyDtls.matInstrIndx==2){
								$('#matInstrIndx').html(' -Not Applicable -');
							}else{
							
							Interestpays=accts.request.fldFlgCumDep
							Interestpay=accts.request.fldFrqIntPay1.split("#")[0];
							if(Interestpays.indexOf('#')== -1 && Interestpays!="Days"){
							  
							 $('#matInstrIndx').html(Interestpays);
							}
							else{
						
							  Interestpay=accts.request.fldFrqIntPay1.split("#")[1];
							  $('#matInstrIndx').html(Interestpay)
							}
														
					}
					$('#fldMaturityInstrIndx').val(accts.response.verifyDtls.matInstrIndx);
					if(accts.response.verifyDtls.intPayoutModeVal==1){
								$('#intPayoutModeVal').html('By Cheque');
												}
					else if(accts.response.verifyDtls.intPayoutModeVal==2){
								$('#intPayoutModeVal').html('By Transfer to Savings Account');
												}
					else{
								$('#intPayoutModeVal').html('-Not Applicable -');
												}
					$('#fldPayoutModeVal').val(accts.response.verifyDtls.intPayoutModeVal);							
					$('#fldPayoutMode').val(accts.response.verifyDtls.intPayoutModeVal);
					
					$('#fldIntAcctNo').val(accts.response.verifyDtls.intPayAcctNbr);
					$('#fldFlgCumDep').val(accts.response.verifyDtls.flgCumDep);
					$('#fldFlgCumDepVal').val(accts.response.verifyDtls.flgCumDepVal);
					$('#fldFdBrn').val(accts.response.verifyDtls.codFdBrn);
					$('#fldFdBrnName,#fldFdBrnNam').val(accts.response.verifyDtls.codFdBrnName);
					$('#fldCustName').val(accts.response.verifyDtls.custName);
					$('#fldCodCcy').val(accts.response.verifyDtls.codccy);
					$('#fldNamCurrency').val(accts.response.verifyDtls.namcurrency);
					$('#fldProdType').val(accts.response.verifyDtls.productType);
					$('#fldRateOfIntIndx').val(accts.response.verifyDtls.rateOfIntIndx);
					$('#fldProdCode').val(accts.response.verifyDtls.tdProdName);
					$('#fldProdCodeVal').val(accts.response.verifyDtls.tdProductCode);
					$('#fldTermDays').val(accts.response.verifyDtls.tdDepTermDays);
					$('#fldTermMnths').val(accts.response.verifyDtls.tdDepTermMths);
					$('#fldNamProd').val(accts.response.verifyDtls.namProd);
					$('#fldFrqIntPay').val(accts.response.verifyDtls.frqIntPay);
					$('#fldEmployee').val(accts.response.verifyDtls.flgEmployee);
					$('#fldDepTermUnit').val(accts.response.verifyDtls.depTermUnit);
					$('#fldFDPlace').val(accts.response.verifyDtls.fdPlace);
					$('#fldSlrno').val(accts.response.verifyDtls.fdSlrno);

					$("#fldRequestId").val(accts.response.mci.requestid);
					
				});
				
				busyInd.hide();
				
		
		};
		this.rrfdr02Submit = function(){
		
		if($("#f1").valid()){
			
		
		var $form = $("#f1");
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
    	
    	
    	reqParams["fldLogoffReq"] = "N";
    	reqParams["fldAmcId"] = "ALL";
    	reqParams["fldRoleId"] = "";
    	reqParams["fldReportDate"] =getCurrdate();
		
    	  
    	
    	
    	


    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
	 	        	var invocationData = {
	 		    			adapter : "Accounts",
	 		        		procedure : "RRFDR03",
	 		        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	 		    	};
	 	        	
	 	        	
	 	        	busyInd.show();
	 	        	WL.Client.invokeProcedure(invocationData, {
	 	        		onSuccess : rrfdr02SubmitResponse,
	 	        		onFailure : AdapterFail,
	 	        		timeout: timeout
	 	        	});
		}
	 	        	   
};
 rrfdr02SubmitResponse = function(result){
		invocationResult = result.invocationResult;
				if(invocationResult.isSuccessful) {
					if(invocationResult.faml.response){	
					if(invocationResult.faml.response.rc.returncode == 0){
							accStmtData(invocationResult.faml); 

							accountList.removeAll();
				            accountSummList.removeAll();
							
							window.location = "#rrfdr03";
					}else{
						handleError(invocationResult.faml.response);
					}
					}else{
						handleErrorNoResponse();
					}
				}
 };
 this.rrfdr03Page = function(){
			acctd = accStmtData();
			$("#contentData").load("Views/Accounts/rrfdr03.html", null, function (response, status, xhr) {
		 		            if (status != "error") {}	
		 		           
						$('#custName').html(acctd.response.finalDtls.custName);
						$('#fdAcctNo').html(acctd.response.finalDtls.fdAcctNo);
						$('#depType').html(acctd.response.finalDtls.depType);
						$('#branch').html(acctd.response.finalDtls.branch);
						$('#frqIntPayout').html(acctd.response.finalDtls.frqIntPayout);
						$('#namCurrency').html(acctd.response.finalDtls.namCurrency);
						
						if(acctd.response.finalDtls.matInstr==1){
								$('#matInstr').html('Renew Principal Only');
						}
						else if(acctd.response.finalDtls.matInstr==2){
								$('#matInstr').html('Renew Principal and Interest');
						}
						else if(acctd.response.finalDtls.matInstr==3){
								$('#matInstr').html('Do not renew');
						}else {
								$('#matInstr').html('-');
						}
						
						 
						
						   $('#depAmt').html(formatAmt(parseFloat(acctd.response.finalDtls.depAmt)));
							$('#tdStartDate').html(acctd.response.finalDtls.tdStartDate);
							$('#prdOfDep').html(acctd.response.finalDtls.prdOfDep);	
							$('#tdIntRate').html(formatAmt(parseFloat(acctd.response.finalDtls.tdIntRate)));	
						$('#depMatDate').html(acctd.response.finalDtls.depMatDate);	
					$('#depMatAmt').html(formatAmt(parseFloat(acctd.response.finalDtls.depMatAmt)));		
					$('#amtinwords').html(acctd.response.amtInWords);
						accholdName = acctd.response.jntacctholdername;
						if(accholdName>0){
									for(i=0;i<accholdName.length;i++){
											if(accholdName[i]!=acctd.response.finalDtls.custName)
											self.fssFDAccountList({accHoldName :accholdName[i]});
									}
						}
						
					
		 		            ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
		 		        });
			busyInd.hide();
 };
 //Mpin 
  this.rrmpg01Page = function(){
				busyInd.show();  
		    
    	    	reqParams = {};
    	    	reqParams["fldDeviceId"] = fldDeviceId;
    	    	reqParams["fldWebServerId"] = fldWebServerId;
    	    	reqParams["fldAppId"] = fldAppId;
    	    	reqParams["fldTxnId"] = "MPG";
    	    	reqParams["fldRequestId"] =RegfldRequestId;
    	    	reqParams["fldScrnSeqNbr"] = "01";
    	    	reqParams["fldSessionId"] = Rsessionid;
		

    	    	var invocationData = {
    	    			adapter : "Accounts",
    	        		procedure : "RRMPG01",
    	        		parameters : [fldjsessionid,reqParams,ipadd]
    	    	};
    	    	
    	    	WL.Client.invokeProcedure(invocationData, {
    	    		onSuccess : rrmpg01PageSuccess,
    	    		onFailure : AdapterFail,	    		
    	    		timeout: timeout
    	    	});
		};
		
		
		rrmpg01PageSuccess = function(result){
				invocationResult = result.invocationResult;
        	if(invocationResult.isSuccessful) {
        		if(invocationResult.faml.response){	
        		if(invocationResult.faml.response.rc.returncode == 0){
        			fldCustName=invocationResult.faml.response.userdetails.fldCustName;
                    fldEmailId=invocationResult.faml.response.userdetails.fldEmailId;
					fldMobileNo=invocationResult.faml.response.userdetails.fldMobileNo;
					mpinreqid=invocationResult.faml.response.mci.requestid;
					if(invocationResult.faml.response.mci){
			  	      requestid= invocationResult.faml.response.mci.requestid;
			          }else{
			         requestid = RegfldRequestId;
		          	}
					account=invocationResult.faml.response.userdetails.accts;
					self.mpinaccounts.removeAll();
    	    		$("#contentData").load("Views/Accounts/rrmpg01.html", null, function (response, status, xhr) {
							if (status != "error") {}
							ko.applyBindings(self, $(".dynamic-page-content").get(0));
				      
					$(account).each(function(index, obj) {
    	    			displaytxt = obj.acctno+" - "+obj.brnName;
    	    			accountValue = obj.acctno+"#"+obj.brnName+"#"+obj.ifsccode;
    	    		      self.mpinaccounts.push({ codacctno: obj.codacctno, displaytxt:displaytxt, accountValue: accountValue });
    	               });
					   
					   $("#custname").html(fldCustName);
					   $("#email").html(fldEmailId);
					   $("#mobile").html(fldMobileNo);
					   $("#mpinreqid").html(requestid);
							
					});
        		}else{
        				handleError(invocationResult.faml.response);
        			//window.location = "#login";
        		}
        	 }else{
        		 handleErrorNoResponse();
        	 }
        	}
        	busyInd.hide();
		};
		
     this.rrmpg01Submit = function(){
        custname = $("#custname").html();
		mobileno=$("#mobile").html();
		emailid=$("#email").html();
		requestId=$("#mpinreqid").html();
		accno=$("#fldFromAcctNo").val().split("#")[0];
		accnotext=$("#fldFromAcctNo option:selected").text();
	
		if($("#rrmpg01").valid()){
        busyInd.show();  
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldMobileNo"] = mobileno;
		reqParams["fldCustName"] = custname;
    	reqParams["fldAccNoShow"] = accnotext;
    	reqParams["fldAcctNo"] =accno;
    	reqParams["fldTxnId"] = "MPG";
    	reqParams["fldEmailId"] = emailid;
    	reqParams["fldScrnSeqNbr"] ="02";
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
		reqParams["fldRequestId"] =requestId;
		
		
		//fldScrnSeqNbr=02&fldEmailId=dimplekasturi@gmail.com&fldSessionId=518065260TRQWMWXMW&fldTxnId=MPG&fldAcctNo=50100000000070  &fldAccNoShow=50100000000070 -Memari&fldMobileNo=XXXXXXX85917&fldCustName=DIMPLE KASTURI&fldAppId=RS&fldRequestId=518065260TRQWMWXMW174844441HH
		
		
	 	var invocationData = {
			adapter : "Accounts",
			procedure : "RRMPG02",
			parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	 	};
	 	        	
	 	
	 	WL.Client.invokeProcedure(invocationData, {
	 	        		onSuccess : rrmpg01SubmitResponse,
	 	        		onFailure : AdapterFail,
	 	        		timeout: timeout
	 	});        	
	 	 }       	
		
	 	        	   
};
 rrmpg01SubmitResponse = function(result){
		invocationResult = result.invocationResult;
				if(invocationResult.isSuccessful) {
					if(invocationResult.faml.response){	
					if(invocationResult.faml.response.rc.returncode == 0){
						accStmtData(invocationResult.faml);
							
							window.location = "#rrmpg02";
					}else{
						handleError(invocationResult.faml.response);
					}
					}else{
						handleErrorNoResponse();
					}
				}
 };
 
 
  this.rrmpg02Page = function(){
        	accstmtdata = accStmtData();
        
			fldAcctNo=accstmtdata.response.fldAcctNo;
			
			fldEmailId=accstmtdata.response.fldEmailId;
			fldCustName=accstmtdata.response.fldCustName;
			fldMobileNo=accstmtdata.response.fldMobileNo;
			
	
        	
        	$("#contentData").load("Views/Accounts/rrmpg02.html", null, function (response, status, xhr) {
                if (status != "error") {}
                
                 $("#custname").html(fldCustName);
			     $("#email").html(fldEmailId);
				 $("#mobile").html(fldMobileNo);
				 $("#Acctext").html(fldAcctNo);
				 $("#req").html(invocationResult.faml.response.mci.requestid);
	            
                ko.applyBindings(self, $(".dynamic-page-content").get(0));
                busyInd.hide();
            });
};
		
this.rrmpg02Submit = function(){
        
		accno=$("#Acctext").html();
		requestId1= $("#req").html();
				busyInd.show();  
    	    	reqParams = {};
				reqParams["fldDeviceId"] = fldDeviceId;
				reqParams["fldWebServerId"] = fldWebServerId;
				reqParams["fldAppId"] = fldAppId;
				reqParams["fldAppServerId"] = fldAppServerId;
				reqParams["fldLangId"] = fldLangId;
				reqParams["fldMobileNo"] = mobileno;
				reqParams["fldCustName"] = custname;
				reqParams["fldAcctNo"] =accno;
				reqParams["fldTxnId"] = "MPG";
				reqParams["fldEmailId"] = emailid;
				reqParams["fldScrnSeqNbr"] ="04";
				reqParams["fldLoginUserId"] =Regloginuid;
				reqParams["fldSessionId"] = Rsessionid;
				reqParams["fldRequestId"] =requestId1;
    	    	//fldCustName=DIMPLE KASTURI&fldEmailId=dimplekasturi@gmail.com&fldTxnId=MPG&fldRequestId=518065260TRQWMWXMW174849130FS&fldMobileNo=XXXXXXX85917&fldAcctNo=50100000000070  &fldSessionId=518065260TRQWMWXMW&fldAppId=RS&fldScrnSeqNbr=04
    	    	var invocationData = {
    	    			adapter : "Accounts",
    	        		procedure : "RRMPG04",
    	        		parameters : [fldjsessionid,reqParams,ipadd]
    	    	};
    	    	
    	    	WL.Client.invokeProcedure(invocationData, {
    	    		onSuccess : rrmpg02SubmitSuccess,
    	    		onFailure : AdapterFail,	    		
    	    		timeout: timeout
    	    	});
		};	

 rrmpg02SubmitSuccess = function(result){
		invocationResult = result.invocationResult;
				if(invocationResult.isSuccessful) {
					if(invocationResult.faml.response){	
					if(invocationResult.faml.response.rc.returncode == 0){
						accStmtData(invocationResult.faml);
							
							window.location = "#rrmpg03";
					}else{
						handleError(invocationResult.faml.response);
					}
					}else{
						handleErrorNoResponse();
					}
				}
 };
 	

 
  this.rrmpg03Page = function(){
        	accstmtdata = accStmtData();
        	$("#contentData").load("Views/Accounts/rrmpg03.html", null, function (response, status, xhr) {
                if (status != "error") {}
                
                
	            
                ko.applyBindings(self, $(".dynamic-page-content").get(0));
                busyInd.hide();
            });
     };	
		
//Vishal Change for openFD end



          


//forex card
     this.rrpfcg01page = function(){
				busyInd.show();  
		    
    	    	reqParams = {};
    	    	reqParams["fldDeviceId"] = fldDeviceId;
				reqParams["fldWebServerId"] = fldWebServerId;
				reqParams["fldAppId"] = fldAppId;
				reqParams["fldAppServerId"] = fldAppServerId;
				reqParams["fldLangId"] = fldLangId;
				reqParams["fldLogoffReq"] = "N";
				reqParams["fldTxnType"] = "";
				reqParams["fldTxnId"] = "PFC";
				reqParams["fldModule"] = "CH";
				reqParams["fldScrnSeqNbr"] ="01";
				reqParams["fldBenefType"]="FCNR";
				reqParams["fldOrgTxn"]="";
			    reqParams["fldRoleId"]="";
				reqParams["fldSwitchAppId"]="";
				reqParams["fldLoginUserId"] =Regloginuid;
				reqParams["fldSessionId"] = Rsessionid;
				reqParams["fldRequestId"] =RegfldRequestId;
    	    	//fldTxnId=MPG&fldRequestId=123163862JUAFTSOJR173720843KL&fldSessionId=123163862JUAFTSOJR&fldAppId=RS&fldScrnSeqNbr=01
    	    	var invocationData = {
    	    			adapter : "Accounts",
    	        		procedure : "RRPFC01",
    	        		parameters : [fldjsessionid,reqParams,ipadd]
    	    	};
    	    	
    	    	WL.Client.invokeProcedure(invocationData, {
    	    		onSuccess : rrpfcg01pageSuccess,
    	    		onFailure : AdapterFail,	    		
    	    		timeout: timeout
    	    	});
		};

		
    rrpfcg01pageSuccess = function(result){
			invocationResult = result.invocationResult;
        	if(invocationResult.isSuccessful) {
        		if(invocationResult.faml.response){	
        		if(invocationResult.faml.response.rc.returncode == 0){
				
        			 account=invocationResult.faml.response.acctdtls; 
					 forexpurpose=invocationResult.faml.response.forexpurpose;
					 
				
					 self.Purchaseforexacc.removeAll();
				
				
			
					$(forexpurpose).each(function(index, obj){
		
    	    			displaytxt = obj.forexpurpose;
    	    			accountValue = obj.forexpurpose;
						
    	    		    self.forexpurpose.push({ codacctno:obj.forexpurpose,displaytxt:displaytxt, accountValue: accountValue });
    	            });
					
					
					$(account).each(function(index, obj){
					    Accountblance[obj.codacctno] = obj.acctbalance;
    	    			displaytxt = obj.codacctno;
    	    			accountValue = obj.codacctno;
						balance=obj.acctbalance;
    	    		    self.Purchaseforexacc.push({ codacctno: obj.codacctno, displaytxt:displaytxt, accountValue: accountValue ,balance:balance});
    	            });
	   				 
					   
					   
    	    		$("#contentData").load("Views/Accounts/rrpfc01.html", null, function (response, status, xhr) {
							if (status != "error") {}
					
				
					if(invocationResult.faml.response.message){
						if(invocationResult.faml.response.message.tptstatus =="false"){
							$("#tptstatus").show();
							$("#Accountdetails").hide();
						}
					}
					else{
					$("#Accountdetails").show();
					$("#tptstatus").hide();
					$("#customename").val(invocationResult.faml.response.customer.namcustfull);
					$("#Dob").val(invocationResult.faml.response.customer.datbirthcust);
					$("#gender").val(invocationResult.faml.response.customer.gender);
					$("#refcustphone").val(invocationResult.faml.response.customer.refcustphone);
					$("#refcustphoneOff").val(invocationResult.faml.response.customer.refcustphoneOff);
					$("#refcustphoneOff_extn").val(invocationResult.faml.response.customer.refcustphoneOff_extn);
					$("#mobileno").val(invocationResult.faml.response.customer.mobileno);
					$("#email").val(invocationResult.faml.response.customer.refcustemail);
					$("#txtcustcity").val(invocationResult.faml.response.customer.txtcustcity);
					$("#txtcustcntry").val(invocationResult.faml.response.customer.txtcustcntry);
					$("#txtcustadr1").val(invocationResult.faml.response.customer.txtcustadr1);
					$("#txtcustadr2").val(invocationResult.faml.response.customer.txtcustadr2);
					$("#txtcustadr3").val(invocationResult.faml.response.customer.txtcustadr3);
					$("#txtcustzip").val(invocationResult.faml.response.customer.txtcustzip);
					$("#txtcuststate").val(invocationResult.faml.response.customer.txtcuststate);
					$("#pancardno").val(invocationResult.faml.response.customer.pancardno);
					$("#mothername").val(invocationResult.faml.response.customer.mothername);
					$("#CDATA").val(invocationResult.faml.response.customer.CDATA);
					$("#namcustlast").val(invocationResult.faml.response.customer.namcustlast);		
					$("#namcustshrt").val(invocationResult.faml.response.customer.namcustshrt);	
					$("#ctrupdatsrlno").val(invocationResult.faml.response.customer.ctrupdatsrlno);	
					$("#lastmntmakerid").val(invocationResult.faml.response.customer.lastmntmakerid);	
					$("#lastmntmakerid").val(invocationResult.faml.response.customer.lastmntmakerid);
                    $("#datcustopen").val(invocationResult.faml.response.customer.datcustopen);	
                    $("#refcustfax").val(invocationResult.faml.response.customer.refcustfax);
					$("#namcustmid").val(invocationResult.faml.response.customer.namcustmid);
					$("#txtcustprefix").val(invocationResult.faml.response.customer.txtcustprefix);
					$("#namcustfirst").val(invocationResult.faml.response.customer.namcustfirst);
					$("#lastmntchkrid").val(invocationResult.faml.response.customer.lastmntchkrid);
					$("#flgcusttype").val(invocationResult.faml.response.customer.flgcusttype);
					$("#flgmntstatus").val(invocationResult.faml.response.customer.flgmntstatus);

					}
				
                  				
		
					
					 ko.applyBindings(self, $(".dynamic-page-content").get(0));
				   	
					});
        		}else{
        				handleError(invocationResult.faml.response);
        			   window.location="#rrasm01";
        		}
        	 }else{
        		 handleErrorNoResponse();
        	 }
        	}
        	busyInd.hide();
		};
		
		
     self.PurchaseforexaccChange = function(){
	
	    acc=$("#fldAcctNo").val();
    	accBal=Accountblance[acc];
        $("#amount").html("INR "+accBal);
		
    };
	
	
	rrpfcg01Submit = function(){
	     account=$("#fldAcctNo").val();
		 amount=$("#amount").html();
         cust=$("#customename").val();
		 Dob=$("#Dob").val();
		 gender=$("#gender").val();
		 refcustphone=$("#refcustphone").val();
		 refcustphoneOff=$("#refcustphoneOff").val();
		 refcustphoneOff_extn=$("#refcustphoneOff_extn").val();
		 mobileno=$("#mobileno").val();
		 email=	$("#email").val();
		 txtcustcity=$("#txtcustcity").val();
		 txtcustcntry=$("#txtcustcntry").val();
		 txtcustadr1=$("#txtcustadr1").val();
		 txtcustadr2=$("#txtcustadr2").val();
		 txtcustadr3=$("#txtcustadr3").val();
		 txtcustzip=$("#txtcustzip").val();
		 txtcuststate=$("#txtcuststate").val();
		 pancardno=$("#pancardno").val();
		 mothername=$("#mothername").val();
		 CDATA=$("#CDATA").val();
		 namcustlast=$("#namcustlast").val();		
		 namcustshrt=$("#namcustshrt").val();
		 ctrupdatsrlno=$("#ctrupdatsrlno").val();
		 lastmntmakerid=$("#lastmntmakerid").val();	
		 lastmntmakerid=$("#lastmntmakerid").val();
		 datcustopen=$("#datcustopen").val();	
		 refcustfax=$("#refcustfax").val();
		 namcustmid=$("#namcustmid").val();
		 txtcustprefix=$("#txtcustprefix").val();
		 namcustfirst=$("#namcustfirst").val();
		 lastmntchkrid=$("#lastmntchkrid").val();
		 flgcusttype=$("#flgcusttype").val();
		 flgmntstatus=$("#flgmntstatus").val();		
		 rrpfcg01SubmitSuccess();
	 	        	   
    };
	
	rrpfcg01SubmitSuccess = function(){
	
		window.location = "#rrpfc02";
	
     };
	 
	 
	 this.rrpfcg02page = function(){
	 
	         	$(forexpurpose).each(function(index, obj){
		
    	    			displaytxt = obj.forexpurpose;
    	    			accountValue = obj.forexpurpose;
						
    	    		    self.forexpurpose.push({ codacctno:obj.forexpurpose,displaytxt:displaytxt, accountValue: accountValue });
    	            });
					
        	 $("#contentData").load("Views/Accounts/rrpfc02.html", null, function (response, status, xhr) {
			 
                if (status != "error") {}
				
                $(".accno").html(account);
			    $(".custname").html(cust);
			    $(".Dob").html(Dob);
			    $(".Gender").html(gender);
	            $(".TelephoneR").html(refcustphone);     
			    $(".TelephoneO").html(refcustphoneOff);
			    $(".mobileno").html(mobileno);
	            $(".address").html(txtcustadr1);
				if(txtcustadr2!=""){
				  $(".addressline2").show();
				  $(".address2").html(txtcustadr2);
				}
				if(txtcustadr3!=""){
				  $(".addressline3").show();
				  $(".address3").html(txtcustadr3);
				}
				$(".city").html(txtcustcity);
				$(".emailid").html(email);
			    $(".State").html(txtcuststate);
				$(".Country").html(txtcustcntry);
			    $(".pincode").html(txtcustzip);
                ko.applyBindings(self, $(".dynamic-page-content").get(0));
                busyInd.hide();
            });
     };	
	 
	
	
	self.rrpfcg02Submit = function(){
	  
	
        if($("#rrpfcg02").valid()){
	         $(document).ready(function(){
			 
			    tmpdt1 = $('#fldfromdate').val();
				tmpdt3= $('#fldtodate').val();
				tmpdt4= $('#fldFromDate').val();
				
			
				arrdt1 = tmpdt1.split('/');
				arrdt3 = tmpdt3.split('/');
				arrdt4 = tmpdt4.split('/');
				
				var today = new Date();
				var dd = today.getDate();
				var mm = today.getMonth()+1; //January is 0!

				var yyyy = today.getFullYear();
				if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} 
				var today = dd+'/'+mm+'/'+yyyy;
				
				tmpdt2 = today;
				arrdt2 = tmpdt2.split('/');
                var date1 = new Date(arrdt1[2],arrdt1[1],arrdt1[0]);

                var date2 = new Date(arrdt2[2],arrdt2[1],arrdt2[0]);
			   
			    var date3= new Date(arrdt3[2],arrdt3[1],arrdt3[0]);
			
                 var date4= new Date(arrdt4[2],arrdt4[1],arrdt4[0]);
              
             
				 
			
				 
			   if(tmpdt1==""){
			      customAlert("Please select travel date ");
                  return; 
			   }
		       if(tmpdt3==""){
			      customAlert("Please select return date ");
                  return; 
			   }
			   
			   if ( date1 <= date2 ) {
	                 customAlert("travel date lesser than current date");
                  return;  
               }
			   
			   
			   if( date1 > date3 ){
			      customAlert("Please select Valid Date of Return");
                  return;  
			   }
			   
			  if( date3 >=  date4){
			       customAlert("Please select the valid date of Return / Passport Expiry Date.");
                  return;  
			  }
			
	            if ( date1 >= date4 ) {
	                 customAlert("Please Select Valid Date of Travel / Passport Expiry date.");
                  return;  
               }

	           var rates = document.getElementsByName('radOption');
		             
                     var rate_value;
		          
          
                    for(var i = 0; i < rates.length; i++){
                      if(rates[i].checked){
                      rate_value = rates[i].value;
                       }
                   }
				
	            buttonval=$("#buttonval").val(rate_value);
				radioval=$("#buttonval").val();
	            fldpassportno=$("#fldpassportno").val();
	            passportexpdat=$("#fldFromDate").val();
				datefldPassportExp=passportexpdat.split("/")[0];
				monthfldPassportExp=passportexpdat.split("/")[1];
				yearfldPassportExp=passportexpdat.split("/")[2];
				Dateofissuance=$("#fldToDate").val();
				datefldDatPassportIssuance=Dateofissuance.split("/")[0];
				monthfldDatPassportIssuance =Dateofissuance.split("/")[1];
				yearfldDatPassportIssuance=Dateofissuance.split("/")[2];
				fldPassportPlace=$("#fldPassportPlace").val();
				regaddress=$(".address").html();
				regaddress2=$(".address2").html();
				regaddress3=$(".address3").html();
				regcity=$(".city").html();
				regState= $(".State").html();
				
				regCountry=$(".Country").html();
				regpincode=$(".pincode").html();
				flddispatchAddr1=$("#flddispatchAddr1").val();
				flddispatchAddr2=$("#flddispatchAddr2").val();
				flddispatchAddr3=$("#flddispatchAddr3").val();
				flddispatchCity=$("#flddispatchCity").val();
				flddispatchState=$("#flddispatchState").val();
				flddispatchCntry=$("#flddispatchCntry").val();
				flddispatchZip=$("#flddispatchZip").val();
				forexpurpose=$("#forexpurpose").val();
				DepDate=$("#fldfromdate").val();
				datefldDepDate=DepDate.split("/")[0];
				monthfldDepDate=DepDate.split("/")[1];
				yearfldDepDate=DepDate.split("/")[2];
				ReturnDate=$("#fldtodate").val();	
				datefldReturnDate=ReturnDate.split("/")[0];
				monthfldReturnDate=ReturnDate.split("/")[1];
				yearfldReturnDate=ReturnDate.split("/")[2];
				
				
				
                busyInd.show();  
    	    	reqParams = {};
				reqParams["fldDeviceId"] = fldDeviceId;
				reqParams["fldWebServerId"] = fldWebServerId;
				reqParams["fldAppId"] = fldAppId;
				reqParams["fldLangId"] = fldLangId;
				reqParams["yearfldReturnDate"] = yearfldReturnDate;
				reqParams["txtcustcity"] = txtcustcity;
				reqParams["datefldDepDate"] =datefldDepDate;
				reqParams["yearfldReturnDateIndx"] = "2";
				reqParams["refcustphoneOff"] = refcustphoneOff;
				reqParams["fldPassportExp"] =passportexpdat;
				reqParams["datefldReturnDateIndx"] ="28";
				reqParams["balance"] = amount;
				reqParams["monthfldDatPassportIssuanceIndx"] = "3";
				reqParams["datefldReturnDate"] = datefldReturnDate;
				reqParams["monthfldReturnDateIndx"] = "11";
				reqParams["namcustfull"] = cust;
				reqParams["datefldDatPassportIssuance"] = datefldDatPassportIssuance;
				reqParams["monthfldDatPassportIssuance"] = monthfldDatPassportIssuance;
				reqParams["pancardno"] = pancardno;
				reqParams["datefldDatPassportIssuanceIndx"] = "3";
				reqParams["fldAddrRadio"] = "Y";
				reqParams["monthfldReturnDate"] = monthfldReturnDate;
				reqParams["fldDepDate"] = DepDate;
				reqParams["txtcustadr3"] = txtcustadr3;
				reqParams["txtcustadr2"] = txtcustadr2;
				reqParams["txtcustcntry"] = txtcustcntry;
				reqParams["txtcustadr1"] = txtcustadr1;
				reqParams["datefldPassportExpIndx"] = "3";
				reqParams["fldDatPassportIssuance"] = Dateofissuance;
				reqParams["refcustemail"] = email;
				reqParams["selAcct"] = account;
				reqParams["monthfldPassportExp"] = monthfldPassportExp;
				reqParams["yearfldDatPassportIssuanceIndx"] = "10";
				reqParams["fldReturnDate"] = ReturnDate;
				reqParams["addrRadio"] = "on";
				reqParams["fldFromAcctNoIndx"] = "1";
				reqParams["fldBack"] = "false";
				reqParams["datefldPassportExp"] = datefldPassportExp;
				reqParams["yearfldPassportExp"] =yearfldPassportExp;
				reqParams["gender"] = gender;
				reqParams["fldPurposeIndx"] = "03";
				reqParams["monthfldDepDateIndx"] = "7";
				reqParams["monthfldDepDate"] = monthfldDepDate;
				reqParams["mothername"] = mothername;
				reqParams["txtcuststate"] = txtcuststate;
				reqParams["yearfldDepDate"] =yearfldDepDate;
				reqParams["fldFromAcctNo"] = account;
				if(rate_value=="addrRadioYes"){
				reqParams["flddispatchAddr1"] = flddispatchAddr1;
				reqParams["flddispatchAddr2"] = flddispatchAddr2;
				reqParams["flddispatchAddr3"] = flddispatchAddr3;
				reqParams["flddispatchCity"] = flddispatchCity;
				reqParams["flddispatchState"]=flddispatchState;
			    reqParams["flddispatchCntry"] = flddispatchCntry;
				reqParams["flddispatchZip"] =flddispatchZip;
				}
				else{
				reqParams["flddispatchAddr1"] = regaddress;
				reqParams["flddispatchAddr2"] = regaddress2;
				reqParams["flddispatchAddr3"] = regaddress3;
				reqParams["flddispatchCity"] = regcity;
				reqParams["flddispatchState"]= regState;
			    reqParams["flddispatchCntry"] = regCountry;
				reqParams["flddispatchZip"] =regpincode;
				
				}
				reqParams["fldAppServerId"] = fldAppServerId;
				reqParams["datefldDepDateIndx"] = "18";
				reqParams["monthfldPassportExpIndx"] = "3";
				reqParams["yearfldDepDateIndx"] = "1";
				reqParams["refcustphone"] = refcustphone;
				reqParams["yearfldPassportExpIndx"] = "12";
				reqParams["yearfldDatPassportIssuance"] = yearfldDatPassportIssuance;
				reqParams["mobileno"] = mobileno;
				reqParams["fldScrnSeqNbr"] = "02";
				reqParams["txtcustzip"]=regpincode;
				reqParams["fldTxnId"] = "PFC";
				reqParams["fldPurpose"] = forexpurpose;
				reqParams["fldPassport"] = fldpassportno;
				reqParams["fldPassportPlace"] = fldPassportPlace;
				reqParams["fldSessionId"] = Rsessionid;
				reqParams["fldRequestId"] =RegfldRequestId;
			        reqParams["fldLoginUserId"] =Regloginuid;

    	
    	    	var invocationData = {
    	    			adapter : "Accounts",
    	        		procedure : "RRPFC02",
    	        		parameters : [fldjsessionid,reqParams,ipadd]
    	    	};
    	    	
    	    	WL.Client.invokeProcedure(invocationData, {
    	    		onSuccess : rrpfcg02SubmitSuccess,
    	    		onFailure : AdapterFail,	    		
    	    		timeout: timeout
    	    	});
	 	}); 
        }		
    };
	 
    rrpfcg02SubmitSuccess = function(result){
		invocationResult = result.invocationResult;
				if(invocationResult.isSuccessful) {
					if(invocationResult.faml.response){	
					if(invocationResult.faml.response.rc.returncode==0){
					
						 
							window.location = "#rrpfc03";
					}else{
						handleError(invocationResult.faml.response);
						 window.location="#rrasm01";
					}
					}else{
						handleErrorNoResponse();
					}
				}
    };
	
	
	this.rrpfcg03page = function(){
	          purchesforexrate=invocationResult.faml.response.fxrates;	
	
			 forexcurrencytype=invocationResult.faml.response.forexcurrencytype;
	         $(forexcurrencytype).each(function(index, obj){
		
    	    			displaytxt = obj.forexcurrencytype;
    	    			accountValue = obj.forexcurrencytype;
						
    	    		    self.Pforexcurrencytype.push({ codacctno:obj.forexpurpose,displaytxt:displaytxt, accountValue: accountValue });
    	    });	
	 
	
        	 $("#contentData").load("Views/Accounts/rrpfc03.html", null, function (response, status, xhr) {
                if (status != "error") {}
			
				 $("#custname").html(invocationResult.faml.response.namcustfull);
				 
				 $("#fldFromAcctNo").val(invocationResult.faml.response.fldFromAcctNo);
				 $("#fldFromAcctNoIndx").val(invocationResult.faml.response.fldFromAcctNoIndx);
				 $("#fldPurposeIndx").val(invocationResult.faml.response.fldPurposeIndx);
				 $("#fldCurrIndx").val(invocationResult.faml.response.fldCurrIndx);
				 
				 
				 $("#fldVariantIndx").val(invocationResult.faml.response.fldVariantIndx);
				
                 $("#fldAddrRadio").val(invocationResult.faml.response.fldAddrRadio);
                 $("#fldPassport").val(invocationResult.faml.response.fldPassport);
				 
				 
				 $("#namcustfull").val(invocationResult.faml.response.namcustfull);
				 $("#datbirthcust").val(invocationResult.faml.response.datbirthcust);
				 
		         $("#gender").val(invocationResult.faml.response.gender); 
				
				 
				 $("#refcustphone").val(invocationResult.faml.response.refcustphone);
				 $("#refcustphoneOff").val(invocationResult.faml.response.refcustphoneOff);
				 $("#fldBack").val(invocationResult.faml.response.fldBack); 
		         $("#mobileno").val(invocationResult.faml.response.mobileno);
				 
	             $("#refcustemail").val(invocationResult.faml.response.refcustemail);
				 $("#txtcustadr1").val(invocationResult.faml.response.txtcustadr1);
				 $("#txtcustadr2").val(invocationResult.faml.response.txtcustadr2); 
		         $("#txtcustadr3").val(invocationResult.faml.response.txtcustadr3); 
				 
                 $("#txtcustcity").val(invocationResult.faml.response.txtcustcity);
				 $("#txtcustcntry").val(invocationResult.faml.response.txtcustcntry);
				 $("#txtcustzip").val(invocationResult.faml.response.txtcustzip); 
		         $("#flddispatchAddr2").val(invocationResult.faml.response.flddispatchAddr2);
 				 
				 $("#flddispatchAddr1").val(invocationResult.faml.response.flddispatchAddr1);
				 $("#flddispatchAddr3").val(invocationResult.faml.response.flddispatchAddr3);
				 $("#flddispatchCity").val(invocationResult.faml.response.flddispatchCity); 
		         $("#flddispatchState").val(invocationResult.faml.response.flddispatchState); 
				 
				 $("#flddispatchCntry").val(invocationResult.faml.response.flddispatchCntry); 
				 $("#flddispatchZip").val(invocationResult.faml.response.flddispatchZip);
				 $("#fldCurrDesc").val(invocationResult.faml.response.fldCurrDesc);	
				 $("#mothername").val(invocationResult.faml.response.mothername);
				 
				 $("#pancardno").val(invocationResult.faml.response.pancardno);	
                 $("#fldVariantDesc").val(invocationResult.faml.response.fldVariantDesc);  
                 $("#fldPurpose").val(invocationResult.faml.response.fldPurpose);
				 $("#datefldDepDateIndx").val(invocationResult.faml.response.datefldDepDateIndx);
				 
				 
				 $("#monthfldDepDateIndx").val(invocationResult.faml.response.monthfldDepDateIndx);
				 $("#yearfldDepDateIndx").val(invocationResult.faml.response.yearfldDepDateIndx);
				 $("#datefldReturnDateIndx").val(invocationResult.faml.response.datefldReturnDateIndx);
				 $("#monthfldReturnDateIndx").val(invocationResult.faml.response.monthfldReturnDateIndx);
				 
			
				 
				 $("#yearfldReturnDateIndx").val(invocationResult.faml.response.yearfldReturnDateIndx);
				 $("#datefldPassportExpIndx").val(invocationResult.faml.response.datefldPassportExpIndx);
				 $("#monthfldPassportExpIndx").val(invocationResult.faml.response.monthfldPassportExpIndx);
                 $("#yearfldPassportExpIndx").val(invocationResult.faml.response.yearfldPassportExpIndx);
				 
				 $("#datefldDatPassportIssuanceIndx").val(invocationResult.faml.response.datefldDatPassportIssuanceIndx);
				 $("#monthfldDatPassportIssuanceIndx").val(invocationResult.faml.response.monthfldDatPassportIssuanceIndx);
				 $("#yearfldDatPassportIssuanceIndx").val(invocationResult.faml.response.yearfldDatPassportIssuanceIndx);
				 $("#fldDepDate").val(invocationResult.faml.response.fldDepDate);
				 
				 $("#fldReturnDate").val(invocationResult.faml.response.fldReturnDate);
				 $("#fldPassportExp").val(invocationResult.faml.response.fldPassportExp);
				 $("#fldCurrencyCode").val(invocationResult.faml.response.fldCurrencyCode);
				 $("#fldPassportPlace").val(invocationResult.faml.response.fldPassportPlace);
				 
				 $("#fldDatPassportIssuance").val(invocationResult.faml.response.fldDatPassportIssuance);
				 $("#fldCurr1Indx").val(invocationResult.faml.response.fldCurr1Indx);
				 $("#fldCurr2Indx").val(invocationResult.faml.response.fldCurr2Indx);
				 $("#fldCurr3Indx").val(invocationResult.faml.response.fldCurr3Indx);
				 
				 $("#fldCurr4Indx").val(invocationResult.faml.response.fldCurr4Indx);
				 $("#fldCurr5Indx").val(invocationResult.faml.response.fldCurr5Indx);
				 $("#fldCurr6Indx").val(invocationResult.faml.response.fldCurr6Indx);
				 $("#fldCurr7Indx").val(invocationResult.faml.response.fldCurr7Indx);
				 
				 $("#fldCurr8Indx").val(invocationResult.faml.response.fldCurr8Indx);
				 $("#fldCurr9Indx").val(invocationResult.faml.response.fldCurr9Indx);
				 $("#fldRowCount").val(invocationResult.faml.response.fldRowCount);
		
			
		        
            
				 
				 
				 
              
                ko.applyBindings(self, $(".dynamic-page-content").get(0));
                busyInd.hide();
            });
     };	
	 
	 
	 
	 
	 rrpfcg03Submit = function(){
	 
	    
	    
                busyInd.show();  
    	    	reqParams = {};
				reqParams["fldAddrRadio"]="Y";
				reqParams["fldEqvUsdAmt"]= $("#fldEqvUsdAmt").val();
				reqParams["fldEqvInrAmt"]=$("#fldEqvInrAmt").val();
				reqParams["fldCurr"]= $("#fldCurr").val();
				reqParams["fldUSD"]= $("#fldUSD").val();
				reqParams["fldINR"]= $("#fldINR").val();
				reqParams["fldForex"]= $("#fldForex").val();
				reqParams["fldCurrIndx"]=$("#fldCurrIndx").val();
			    if($("#fldCurr1").val()!=""){
				reqParams["fldCurr1"]= $("#fldCurr1").val();
				reqParams["fldUSD1"]= $("#fldUSD1").val();
				reqParams["fldINR1"]= $("#fldINR1").val();
				reqParams["fldForex1"]= $("#fldForex1").val();
				reqParams["fldCurr1Indx"]=$("#fldCurrIndx").val();
				}
				else{
				reqParams["fldCurr1"]= "";
				reqParams["fldUSD1"]= "";
				reqParams["fldINR1"]= "";
				reqParams["fldForex1"]= "";
				reqParams["fldCurr1Indx"]="";
				
				}
				
			   if($("#fldCurr2").val()!=""){
				reqParams["fldCurr2"]= $("#fldCurr2").val();
				reqParams["fldUSD2"]= $("#fldUSD2").val();
				reqParams["fldINR2"]= $("#fldINR2").val();
				reqParams["fldForex2"]= $("#fldForex2").val();
				reqParams["fldCurr2Indx"]=$("#fldCurrIndx").val();
				}
				else{
				reqParams["fldCurr2"]= "";
				reqParams["fldUSD2"]="";
				reqParams["fldINR2"]= "";
				reqParams["fldForex2"]= "";
				reqParams["fldCurr2Indx"]="";
				}
				
				if($("#fldCurr3").val()!=""){
				reqParams["fldCurr3"]= $("#fldCurr3").val();
				reqParams["fldUSD3"]= $("#fldUSD3").val();
				reqParams["fldINR3"]= $("#fldINR3").val();
				reqParams["fldForex3"]= $("#fldForex3").val();
				reqParams["fldCurr3Indx"]=$("#fldCurrIndx").val();
				}
				else{
				reqParams["fldCurr3"]="";
				reqParams["fldUSD3"]= "";
				reqParams["fldINR3"]= "";
				reqParams["fldForex3"]= "";
				reqParams["fldCurr3Indx"]="";
				}
				
				
				if($("#fldCurr4").val()!=""){
				reqParams["fldCurr4"]= $("#fldCurr4").val();
				reqParams["fldUSD4"]= $("#fldUSD4").val();
				reqParams["fldINR4"]= $("#fldINR4").val();
				reqParams["fldForex4"]= $("#fldForex4").val();
				reqParams["fldCurr4Indx"]=$("#fldCurrIndx").val();
				}
				else{
				reqParams["fldCurr4"]= "";
				reqParams["fldUSD4"]= "";
				reqParams["fldINR4"]= "";
				reqParams["fldForex4"]= "";
				reqParams["fldCurr4Indx"]="";
				}
				
				if($("#fldCurr5").val()!=""){
				reqParams["fldCurr5"]= $("#fldCurr5").val();
				reqParams["fldUSD5"]= $("#fldUSD5").val();
				reqParams["fldINR5"]= $("#fldINR5").val();
				reqParams["fldForex5"]= $("#fldForex5").val();
				reqParams["fldCurr5Indx"]=$("#fldCurrIndx").val();
				}
				else{
				reqParams["fldCurr5"]= "";
				reqParams["fldUSD5"]= "";
				reqParams["fldINR5"]= "";
				reqParams["fldForex5"]= "";
				reqParams["fldCurr5Indx"]="";
				}
				
				if($("#fldCurr6").val()!=""){
				reqParams["fldCurr6"]= $("#fldCurr6").val();
				reqParams["fldUSD6"]= $("#fldUSD6").val();
				reqParams["fldINR6"]= $("#fldINR6").val();
				reqParams["fldForex6"]= $("#fldForex6").val();
				reqParams["fldCurr6Indx"]=$("#fldCurrIndx").val();
				}
				else{
				reqParams["fldCurr6"]= "";
				reqParams["fldUSD6"]= "";
				reqParams["fldINR6"]="";
				reqParams["fldForex6"]= "";
				reqParams["fldCurr6Indx"]="";
				}
				
				if($("#fldCurr7").val()!=""){
				reqParams["fldCurr7"]= $("#fldCurr7").val();
				reqParams["fldUSD7"]= $("#fldUSD7").val();
				reqParams["fldINR7"]= $("#fldINR7").val();
				reqParams["fldForex7"]= $("#fldForex7").val();
				reqParams["fldCurr7Indx"]=$("#fldCurrIndx").val();
				}
				else{
				reqParams["fldCurr7"]= $("#fldCurr7").val();
				reqParams["fldUSD7"]= $("#fldUSD7").val();
				reqParams["fldINR7"]= $("#fldINR7").val();
				reqParams["fldForex7"]= $("#fldForex7").val();
				reqParams["fldCurr7Indx"]=$("#fldCurrIndx").val();
				}
				
				if($("#fldCurr8").val()!=""){
				reqParams["fldCurr8"]= $("#fldCurr8").val();
				reqParams["fldUSD8"]= $("#fldUSD8").val();
				reqParams["fldINR8"]= $("#fldINR8").val();
				reqParams["fldForex8"]= $("#fldForex8").val();
				reqParams["fldCurr8Indx"]=$("#fldCurrIndx").val();
				}
				else{
				reqParams["fldCurr8"]= "";
				reqParams["fldUSD8"]= "";
				reqParams["fldINR8"]="";
				reqParams["fldForex8"]= "";
				reqParams["fldCurr8Indx"]="";
				}
				
				if($("#fldCurr9").val()!=""){
				reqParams["fldCurr9"]= $("#fldCurr9").val();
				reqParams["fldUSD9"]= $("#fldUSD9").val();
				reqParams["fldINR9"]= $("#fldINR9").val();
				reqParams["fldForex9"]= $("#fldForex9").val();
				reqParams["fldCurr9Indx"]=$("#fldCurrIndx").val();
				}
				else{
				reqParams["fldCurr9"]= "";
				reqParams["fldUSD9"]= "";
				reqParams["fldINR9"]="";
				reqParams["fldForex9"]= "";
				reqParams["fldCurr9Indx"]="";
				}
				
				if($("#fldCurr10").val()!=""){
				reqParams["fldCurr10"]= $("#fldCurr10").val();
				reqParams["fldUSD10"]= $("#fldUSD10").val();
				reqParams["fldINR10"]= $("#fldINR10").val();
				reqParams["fldForex10"]= $("#fldForex10").val();
				reqParams["fldCurr10Indx"]=$("#fldCurrIndx").val();
				}else{
				reqParams["fldCurr10"]= "";
				reqParams["fldUSD10"]= "";
				reqParams["fldINR10"]= "";
				reqParams["fldForex10"]="";
				reqParams["fldCurr10Indx"]="";
				}
				
				
				reqParams["fldRowCount"]=$("#fldRowCount").val();
				reqParams["fldPassport"]=fldpassportno;
				reqParams["txtcustadr3"]=txtcustadr3;
				reqParams["txtcustadr2"]=txtcustadr2;
				reqParams["txtcustadr1"]=txtcustadr1;
				reqParams["datefldReturnDateIndx"]="28";
				reqParams["mothername"]=mothername;
				reqParams["fldPassportPlace"]=fldPassportPlace;
				reqParams["flddispatchZip"]=flddispatchZip;
				reqParams["fldCurrencyCode"]="";
				reqParams["yearfldDatPassportIssuanceIndx"]="10";
				reqParams["fldScrnSeqNbr"]="03";
				reqParams["monthfldReturnDateIndx"]="11";
				reqParams["datbirthcust"]=Dob;
				reqParams["monthfldDatPassportIssuanceIndx"]="3";
				reqParams["fldReturnDate"]=ReturnDate;
				reqParams["datefldDatPassportIssuanceIndx"]="3";
				reqParams["fldPurpose"]=forexpurpose;
				reqParams["fldLangId"]=fldLangId;
				reqParams["yearfldDepDateIndx"]="1";
				reqParams["fldVariantIndx"]=$("#fldVariantIndx").val();
				if(radioval=="addrRadioYes"){
				reqParams["flddispatchAddr1"] = flddispatchAddr1;
				reqParams["flddispatchAddr2"] = flddispatchAddr2;
				reqParams["flddispatchAddr3"] = flddispatchAddr3;
				reqParams["flddispatchCity"] = flddispatchCity;
				reqParams["flddispatchState"]=flddispatchState;
			    reqParams["flddispatchCntry"] = flddispatchCntry;
				reqParams["flddispatchZip"] =flddispatchZip;
				}
				else{
				reqParams["flddispatchAddr1"] = regaddress;
				reqParams["flddispatchAddr2"] = regaddress2;
				reqParams["flddispatchAddr3"] = regaddress3;
				reqParams["flddispatchCity"] = regcity;
				reqParams["flddispatchState"]= regState;
			    reqParams["flddispatchCntry"] = regCountry;
				reqParams["flddispatchZip"] =regpincode;
				
				}
				reqParams["yearfldPassportExpIndx"]="12";
				reqParams["txtcuststate"]=txtcuststate;
				reqParams["yearfldReturnDateIndx"]="2";
				reqParams["mobileno"]=mobileno;
				reqParams["fldVariantDesc"]=$("#fldVariant").val()
				reqParams["monthfldDepDateIndx"]="7";
				reqParams["fldAppId"]=fldAppId;
				reqParams["fldPassportExp"]=passportexpdat;
				reqParams["fldVariant"]=$("#fldVariant").val();
				reqParams["refcustphoneOff"]=refcustphoneOff;
				reqParams["fldCurrDesc"]="";
				reqParams["namcustfull"]=cust;
				reqParams["datefldDepDateIndx"]="18";
				reqParams["fldDepDate"]=DepDate;
				reqParams["fldTxnId"]="PFC";
				reqParams["refcustphone"]=refcustphone;
				reqParams["fldDatPassportIssuance"]=Dateofissuance;
				reqParams["monthfldPassportExpIndx"]="3";
				reqParams["txtcustcity"]=txtcustcity;
				reqParams["txtcustcntry"]=txtcustcntry;
				reqParams["txtcustzip"]=regpincode;
				reqParams["fldFromAcctNoIndx"]="1";
				reqParams["fldBack"]="false";
				reqParams["gender"]=$("#gender").val();
				reqParams["datefldPassportExpIndx"]="3";
				reqParams["fldSessionId"]=Rsessionid;
				reqParams["fldAppServerId"]=fldAppServerId;
				reqParams["fldPurposeIndx"]="1";
				reqParams["fldDeviceId"]=fldDeviceId;
				reqParams["fldWebServerId"]=fldWebServerId;
				reqParams["pancardno"]=pancardno;
				reqParams["refcustemail"]=email;
				reqParams["fldFromAcctNo"]=account; 
				reqParams["fldRequestId"] =RegfldRequestId;
				reqParams["fldLoginUserId"] =Regloginuid;
				
				
				
    	
    	    	var invocationData = {
    	    			adapter : "Accounts",
    	        		procedure : "RRPFC03",
    	        		parameters : [fldjsessionid,reqParams,ipadd]
    	    	};
    	    	
    	    	WL.Client.invokeProcedure(invocationData, {
    	    		onSuccess : rrpfcg03SubmitSuccess,
    	    		onFailure : AdapterFail,	    		
    	    		timeout: timeout
    	    	});
	 	       	   
    };
	 
	rrpfcg03SubmitSuccess = function(result){
		invocationResult = result.invocationResult;
				if(invocationResult.isSuccessful) {
					if(invocationResult.faml.response){	
					if(invocationResult.faml.response.rc.returncode==0){
							window.location = "#rrpfc04";
					}else{
						handleError(invocationResult.faml.response);
					}
					}else{
						handleErrorNoResponse();
					}
				}
    }; 
	
	
	
		this.rrpfcg04page = function(){
        	 $("#contentData").load("Views/Accounts/rrpfc04.html", null, function (response, status, xhr) {
                if (status != "error") {}
                 
			
				if(invocationResult.faml.response.flddispatchAddr2!=""){
				  $(".addressline2").show();
				  $(".address2").html(invocationResult.faml.response.flddispatchAddr2);
				}
				if(invocationResult.faml.response.flddispatchAddr3!=""){
				  $(".addressline3").show();
				  $(".address3").html(invocationResult.faml.response.flddispatchAddr3);
				}
				 $(".custname").html(invocationResult.faml.response.namcustfull);
				 $(".address").html(invocationResult.faml.response.flddispatchAddr1);
				 $(".city").html(invocationResult.faml.response.flddispatchCity);
				 $(".state").html(invocationResult.faml.response.flddispatchState);
				 $(".country").html(invocationResult.faml.response.flddispatchCntry);
				 $(".zipcode").html(invocationResult.faml.response.flddispatchZip);
				 $(".Debitacc").html(invocationResult.faml.response.fldFromAcctNo);
				 $(".Purpose").html(invocationResult.faml.response.fldPurpose);
				 $(".fldEqvInrAmt").html(invocationResult.faml.response.fldEqvInrAmt);
				 $(".fldEqvUsdAmt").html(invocationResult.faml.response.fldEqvUsdAmt);
				 fldEqvusd = invocationResult.faml.response.fldEqvUsdAmt;
				
				 fldEqvusdshow = parseFloat(fldEqvusd).toFixed(2);
			 $(".fldEqvUsdAmt1").html(fldEqvusdshow);
				 
				 
				 trPurpose=invocationResult.faml.response.fldPurpose;
				 $(".VariantDesc").html(invocationResult.faml.response.fldVariantDesc);
				 
				 fldRowCount=invocationResult.faml.response.fldRowCount;
			    $("#fldCurr").html(invocationResult.faml.response.fldCurr);
				$("#fldForex").html(invocationResult.faml.response.fldForex);
				$("#fldINR").html(invocationResult.faml.response.fldINR);
				$("#fldUSD").html(invocationResult.faml.response.fldUSD);
			     if(invocationResult.faml.response.mci){
				  
				requestID= invocationResult.faml.response.mci.requestid;
				}
				else{
				    
				requestID= RegfldRequestId;
				}
				
				 
				 if(invocationResult.faml.response.fldForex1!='' && invocationResult.faml.response.fldCurr1!=''){
				          $("#fldcurrancy1").show();
						  $("#fldCurr1").html(invocationResult.faml.response.fldCurr1);
						  $("#fldForex1").html(invocationResult.faml.response.fldForex1);
						  $("#fldINR1").html(invocationResult.faml.response.fldINR1);
						  $("#fldUSD1").html(invocationResult.faml.response.fldUSD1);
				 }
				 if(invocationResult.faml.response.fldForex2!='' && invocationResult.faml.response.fldCurr2!=''){
				         $("#fldcurrancy2").show();
						  $("#fldCurr2").html(invocationResult.faml.response.fldCurr2);
						   $("#fldForex2").html(invocationResult.faml.response.fldForex2);
						  $("#fldINR2").html(invocationResult.faml.response.fldINR2);
						  $("#fldUSD2").html(invocationResult.faml.response.fldUSD2);
						  
				 }
				 if(invocationResult.faml.response.fldForex3!='' && invocationResult.faml.response.fldCurr3!=''){
				          $("#fldcurrancy3").show();
						  $("#fldCurr3").html(invocationResult.faml.response.fldCurr3);
						  $("#fldForex3").html(invocationResult.faml.response.fldForex3);
						  $("#fldINR3").html(invocationResult.faml.response.fldINR3);
						  $("#fldUSD3").html(invocationResult.faml.response.fldUSD3);
				 }
				 if(invocationResult.faml.response.fldForex4!='' && invocationResult.faml.response.fldCurr4!=''){
				           $("#fldcurrancy4").show();
						   $("#fldCurr4").html(invocationResult.faml.response.fldCurr4);
						   $("#fldForex4").html(invocationResult.faml.response.fldForex4);
						   $("#fldINR4").html(invocationResult.faml.response.fldINR4);
						   $("#fldUSD4").html(invocationResult.faml.response.fldUSD4);
				 }
				 if(invocationResult.faml.response.fldForex5!='' && invocationResult.faml.response.fldCurr5!=''){
				         $("#fldcurrancy5").show();
						  $("#fldCurr5").html(invocationResult.faml.response.fldCurr5);
						  $("#fldForex5").html(invocationResult.faml.response.fldForex5);
						  $("#fldINR5").html(invocationResult.faml.response.fldINR5);
						  $("#fldUSD5").html(invocationResult.faml.response.fldUSD5);
				 }
				 if(invocationResult.faml.response.fldForex6!='' && invocationResult.faml.response.fldCurr6!=''){
				         $("#fldcurrancy6").show();
						  $("#fldCurr6").html(invocationResult.faml.response.fldCurr6);
						  $("#fldForex6").html(invocationResult.faml.response.fldForex6);
						  $("#fldINR6").html(invocationResult.faml.response.fldINR6);
						  $("#fldUSD6").html(invocationResult.faml.response.fldUSD6);
				 }
				 if(invocationResult.faml.response.fldForex7!='' && invocationResult.faml.response.fldCurr7!=''){
				         $("#fldcurrancy7").show();
						  $("#fldCurr7").html(invocationResult.faml.response.fldCurr7);
						  $("#fldForex7").html(invocationResult.faml.response.fldForex7);
						  $("#fldINR7").html(invocationResult.faml.response.fldINR7);
						  $("#fldUSD7").html(invocationResult.faml.response.fldUSD7);
				 }
				 if(invocationResult.faml.response.fldForex8!='' && invocationResult.faml.response.fldCurr8!=''){
				          $("#fldcurrancy8").show();
						  $("#fldCurr8").html(invocationResult.faml.response.fldCurr8);
						  $("#fldForex8").html(invocationResult.faml.response.fldForex8);
						  $("#fldINR8").html(invocationResult.faml.response.fldINR8);
						  $("#fldUSD8").html(invocationResult.faml.response.fldUSD8);
				 }
				 if(invocationResult.faml.response.fldForex9!='' && invocationResult.faml.response.fldCurr9!=''){
				         $("#fldcurrancy9").show();
						 $("#fldCurr9").html(invocationResult.faml.response.fldCurr9);
						 $("#fldForex9").html(invocationResult.faml.response.fldForex9);
						 $("#fldINR9").html(invocationResult.faml.response.fldINR9);
						 $("#fldUSD9").html(invocationResult.faml.response.fldUSD9);
				}
				
				 $("#fldCurrIndx").val(invocationResult.faml.response.fldCurrIndx);
				 
                ko.applyBindings(self, $(".dynamic-page-content").get(0));
                busyInd.hide();
            });
     };	
	 

     
	rrpfcg04Submit = function(){
			 if($("#rrpfcg03").valid()){
			        fldUSD=  $("#fldUSD").html();
				fldUSD1= $("#fldUSD1").html();
				fldUSD2= $("#fldUSD2").html();
				fldUSD3= $("#fldUSD3").html();
				fldUSD4= $("#fldUSD4").html();
				fldUSD5= $("#fldUSD5").html();
				fldUSD6= $("#fldUSD6").html();
				fldUSD7= $("#fldUSD7").html();
				fldUSD8= $("#fldUSD8").html();
				fldUSD9= $("#fldUSD9").html();
				
				Purchesusdamount = fldUSD+"#"+fldUSD1+"#"+fldUSD2+"#"+fldUSD3+"#"+fldUSD4+"#"+fldUSD5+"#"+fldUSD6+"#"+fldUSD7+"#"+fldUSD8+"#"+fldUSD9;
                    busyInd.show();  
    	    	    reqParams = {};
		
				reqParams["fldCurr"]= $("#fldCurr").html();
				reqParams["fldINR"]= $("#fldINR").html();
				reqParams["fldForex"]= $("#fldForex").html();
				reqParams["fldLoginUserId"] =Regloginuid;
				reqParams["fldCurrIndx"]=$("#fldCurrIndx").val();
			    if($("#fldCurr1").html()!=""){
				reqParams["fldCurr1"]= $("#fldCurr1").html();
				reqParams["fldINR1"]= $("#fldINR1").html();
				reqParams["fldForex1"]= $("#fldForex1").html();
				reqParams["fldCurr1Indx"]=$("#fldCurrIndx").val();
				}
				else{
				reqParams["fldCurr1"]= "";
				reqParams["fldINR1"]= "";
				reqParams["fldForex1"]= "";
				reqParams["fldCurr1Indx"]="";
				
				}
				
			   if($("#fldCurr2").html()!=""){
				reqParams["fldCurr2"]= $("#fldCurr2").html();
				reqParams["fldINR2"]= $("#fldINR2").html();
				reqParams["fldForex2"]= $("#fldForex2").html();
				reqParams["fldCurr2Indx"]=$("#fldCurrIndx").val();
				}
				else{
				reqParams["fldCurr2"]= "";
				reqParams["fldINR2"]= "";
				reqParams["fldForex2"]= "";
				reqParams["fldCurr2Indx"]="";
				}
				
				if($("#fldCurr3").html()!=""){
				reqParams["fldCurr3"]= $("#fldCurr3").html();
				reqParams["fldINR3"]= $("#fldINR3").html();
				reqParams["fldForex3"]= $("#fldForex3").html();
				reqParams["fldCurr3Indx"]=$("#fldCurrIndx").html();
				}
				else{
				reqParams["fldCurr3"]="";
				reqParams["fldINR3"]= "";
				reqParams["fldForex3"]= "";
				reqParams["fldCurr3Indx"]="";
				}
				
				
				if($("#fldCurr4").html()!=""){
				reqParams["fldCurr4"]= $("#fldCurr4").html();
				reqParams["fldINR4"]= $("#fldINR4").html();
				reqParams["fldForex4"]= $("#fldForex4").html();
				reqParams["fldCurr4Indx"]=$("#fldCurrIndx").val();
				}
				else{
				reqParams["fldCurr4"]= "";
				reqParams["fldINR4"]= "";
				reqParams["fldForex4"]= "";
				reqParams["fldCurr4Indx"]="";
				}
				
				if($("#fldCurr5").html()!=""){
				reqParams["fldCurr5"]= $("#fldCurr5").html();
				reqParams["fldINR5"]= $("#fldINR5").html();
				reqParams["fldForex5"]= $("#fldForex5").html();
				reqParams["fldCurr5Indx"]=$("#fldCurrIndx").val();
				}
				else{
				reqParams["fldCurr5"]= "";
				reqParams["fldINR5"]= "";
				reqParams["fldForex5"]= "";
				reqParams["fldCurr5Indx"]="";
				}
				
				if($("#fldCurr6").html()!=""){
				reqParams["fldCurr6"]= $("#fldCurr6").html();
				reqParams["fldINR6"]= $("#fldINR6").html();
				reqParams["fldForex6"]= $("#fldForex6").html();
				reqParams["fldCurr6Indx"]=$("#fldCurrIndx").val();
				}
				else{
				reqParams["fldCurr6"]= "";
				reqParams["fldINR6"]="";
				reqParams["fldForex6"]= "";
				reqParams["fldCurr6Indx"]="";
				}
				
				if($("#fldCurr7").html()!=""){
				reqParams["fldCurr7"]= $("#fldCurr7").html();
				reqParams["fldINR7"]= $("#fldINR7").html();
				reqParams["fldForex7"]= $("#fldForex7").html();
				reqParams["fldCurr7Indx"]=$("#fldCurrIndx").val();
				}
				else{
				reqParams["fldCurr7"]= "";
				reqParams["fldINR7"]= "";
				reqParams["fldForex7"]="";
				reqParams["fldCurr7Indx"]="";
				}
				
				if($("#fldCurr8").html()!=""){
				reqParams["fldCurr8"]= $("#fldCurr8").html();
				reqParams["fldINR8"]= $("#fldINR8").html();
				reqParams["fldForex8"]= $("#fldForex8").html();
				reqParams["fldCurr8Indx"]=$("#fldCurrIndx").val();
				}
				else{
				reqParams["fldCurr8"]= "";
				reqParams["fldINR8"]="";
				reqParams["fldForex8"]= "";
				reqParams["fldCurr8Indx"]="";
				}
				
				if($("#fldCurr9").html()!=""){
				reqParams["fldCurr9"]= $("#fldCurr9").html();
				reqParams["fldINR9"]= $("#fldINR9").html();
				reqParams["fldForex9"]= $("#fldForex9").html();
				reqParams["fldCurr9Indx"]=$("#fldCurrIndx").val();
				}
				else{
				reqParams["fldCurr9"]= "";
				reqParams["fldINR9"]="";
				reqParams["fldForex9"]= "";
				reqParams["fldCurr9Indx"]="";
				}
				
			
				    reqParams["txtcustzip"]=txtcustzip;
					reqParams["fldReturnDate"]=ReturnDate;
					reqParams["fldFromAcctNo"]=account;
					reqParams["namcustfull"]=cust;
					reqParams["fldPurposeIndx"]="1";
					reqParams["yearfldReturnDateIndx"]="1";
					reqParams["refcustemail"]=email;
				
					reqParams["fldWebServerId"]=fldWebServerId;
	
				if(radioval=="addrRadioYes"){
				reqParams["flddispatchAddr1"] = flddispatchAddr1;
				reqParams["flddispatchAddr2"] = flddispatchAddr2;
				reqParams["flddispatchAddr3"] = flddispatchAddr3;
				reqParams["flddispatchCity"] = flddispatchCity;
				reqParams["flddispatchState"]=flddispatchState;
			    reqParams["flddispatchCntry"] = flddispatchCntry;
				reqParams["flddispatchZip"] =flddispatchZip;
				}
				else{
				reqParams["flddispatchAddr1"] = regaddress;
				reqParams["flddispatchAddr2"] = regaddress2;
				reqParams["flddispatchAddr3"] = regaddress3;
				reqParams["flddispatchCity"] = regcity;
				reqParams["flddispatchState"]= regState;
			    reqParams["flddispatchCntry"] = regCountry;
				reqParams["flddispatchZip"] =regpincode;
				
				}
					
					
					reqParams["fldTxnId"]="PFC";
					reqParams["datefldDepDateIndx"]="24";
					reqParams["fldBack"]="false";
					reqParams["mobileno"]=mobileno;
		
					reqParams["fldPurpose"]=trPurpose;
					reqParams["fldAppId"]=fldAppId;
					reqParams["datbirthcust"]=Dob;
					reqParams["fldRowCount"]=fldRowCount;
					reqParams["mothername"]=mothername;
					reqParams["datefldDepDate"]=datefldDepDate;
					reqParams["fldRequestId"]=requestID;
					reqParams["fldCurrIndx"]="12";
					reqParams["refcustphone"]=refcustphone;
					reqParams["fldEqvInrAmt"]=$(".fldEqvInrAmt").html();
					reqParams["fldAppServerId"]=fldAppServerId;
					reqParams["gender"]=gender;
					reqParams["monthfldDepDateIndx"]="8";
					reqParams["yearfldDepDateIndx"]="1";
					reqParams["txtcustcity"]=txtcustcity;
					reqParams["pancardno"]=pancardno;
					reqParams["txtcuststate"]=txtcuststate;
					reqParams["txtcustadr3"]=txtcustadr3;
					reqParams["datefldReturnDateIndx"]="19";
					reqParams["fldLangId"]=fldLangId;
					reqParams["txtcustadr2"]=txtcustadr2;
					reqParams["txtcustadr1"]=txtcustadr1;
					reqParams["fldDepDate"]=DepDate;
				
					reqParams["monthfldDepDate"]=monthfldDepDate;
					reqParams["fldVariant"]="Multicurrency Forex Card";
					reqParams["fldCurrencyCode"]="";
					reqParams["fldFromAcctNoIndx"]="1";
					reqParams["fldSessionId"]=Rsessionid;
					reqParams["fldDeviceId"]=fldDeviceId;
					reqParams["fldEqvUsdAmt"]=$(".fldEqvUsdAmt").html();
					reqParams["txtcustcntry"]=txtcustcntry;
					reqParams["fldScrnSeqNbr"]="04";
					reqParams["refcustphoneOff"]=refcustphoneOff;
					reqParams["fldCurrDesc"]=""; 
					reqParams["monthfldReturnDateIndx"]="8";
					reqParams["monthfldDatPassportIssuanceIndx"]="3";
					reqParams["fldRsaTxnId"]="";
					reqParams["fldClientSessionId"]="";
                    reqParams["fldPassport"]=fldpassportno;
                    reqParams["fldTC"]="Y";
				    reqParams["fldFEMA"]="Y";
					reqParams["yearfldDatPassportIssuanceIndx"]="10";
				    reqParams["fldPassportExp"]=passportexpdat;
					reqParams["fldDatPassportIssuance"]=Dateofissuance;
					reqParams["fldVariantDesc"]="";
					reqParams["datefldPassportExpIndx"]="3";
					reqParams["fldVariantIndx"]="undefined";
				    reqParams["fldAddrRadio"]="Y";
					reqParams["fldUserRefNo"]="";
					reqParams["datefldDatPassportIssuanceIndx"]="3";
					reqParams["fldOrgTxnId"]="PFC";
					reqParams["yearfldPassportExpIndx"]="12";
					reqParams["monthfldPassportExpIndx"]="3";
					reqParams["fldDateTime"]="";
					reqParams["fldFcatSessionId"]="";
					reqParams["fldPassportPlace"]=fldPassportPlace;
					reqParams["fldDevicePrint"]="";
		
    	    	var invocationData = {
    	    			adapter : "Accounts",
    	        		procedure : "RRPFC04",
    	        		parameters : [fldjsessionid,reqParams,ipadd]
    	    	};
    	    	
    	    	WL.Client.invokeProcedure(invocationData, {
    	    		onSuccess : rsaResponse,
    	    		onFailure : AdapterFail,	    		
    	    		timeout: timeout
    	    	});
	 	      	}   
    }; 

	 
    //reload  card
	
	
	
	this.rsrfx01page = function(){
				busyInd.show();  
	
    	    	reqParams = {};
    	    	reqParams["fldDeviceId"] = fldDeviceId;
				reqParams["fldWebServerId"] = fldWebServerId;
				reqParams["fldAppId"] = fldAppId;
				reqParams["fldAppServerId"] = fldAppServerId;
				reqParams["fldLangId"] = fldLangId;
				reqParams["fldLogoffReq"] = "N";
				reqParams["fldTxnType"] = "";
				reqParams["fldTxnId"] = "RFX";
				reqParams["fldModule"] = "CH";
				reqParams["fldScrnSeqNbr"] ="01";
				reqParams["fldBenefType"]="FCNR";
				reqParams["fldOrgTxn"]="";
			    reqParams["fldRoleId"]="";
				reqParams["fldSwitchAppId"]="";
				reqParams["fldLoginUserId"] =Regloginuid;
				reqParams["fldSessionId"] = Rsessionid;
				reqParams["fldRequestId"] =RegfldRequestId;
    	    	
    	    	var invocationData = {
    	    			adapter : "Accounts",
    	        		procedure : "RRRFX01",
    	        		parameters : [fldjsessionid,reqParams,ipadd]
    	    	};
    	    	
    	    	WL.Client.invokeProcedure(invocationData, {
    	    		onSuccess : rsrfx01pageSuccess,
    	    		onFailure : AdapterFail,	    		
    	    		timeout: timeout
    	    	});
		};
		
		
		rsrfx01pageSuccess = function(result){
			invocationResult = result.invocationResult;
        	if(invocationResult.isSuccessful) {
        		if(invocationResult.faml.response){	
        		if(invocationResult.faml.response.rc.returncode == 0){
        			
	   				 account=invocationResult.faml.response.acctdtls; 
					
					self.Reloadforexacc.removeAll();
				
					$(account).each(function(index, obj){
					
					   Accountblance[obj.codacctno] = obj.acctbalance;
					   
    	    			displaytxt = obj.codacctno;
    	    			accountValue = obj.codacctno;
						balance=obj.acctbalance;
    	    		    self.Reloadforexacc.push({ codacctno: obj.codacctno, displaytxt:displaytxt, accountValue: accountValue ,balance:balance});
    	            });
					   
					   
    	    		$("#contentData").load("Views/Accounts/rrrfx01.html", null, function (response, status, xhr) {
							if (status != "error") {}
					
					
					if(invocationResult.faml.response.message){
						if(invocationResult.faml.response.message.tptstatus =="false"){
							$("#tptstatus").show();
							$("#Accountdetails").hide();
						}
					}
					else{
					        $("#tptstatus").hide();
							$("#Accountdetails").show();
					$("#custname").html(invocationResult.faml.response.customer.namcustfull);
					$("#Customername").val(invocationResult.faml.response.customer.namcustfull);
					$("#Dob").val(invocationResult.faml.response.customer.datbirthcust);
					$("#gender").val(invocationResult.faml.response.customer.gender);
					$("#refcustphone").val(invocationResult.faml.response.customer.refcustphone);
					$("#refcustphoneOff").val(invocationResult.faml.response.customer.refcustphoneOff);
					$("#refcustphoneOff_extn").val(invocationResult.faml.response.customer.refcustphoneOff_extn);
					$("#mobileno").val(invocationResult.faml.response.customer.mobileno);
					$("#email").val(invocationResult.faml.response.customer.refcustemail);
					$("#txtcustcity").val(invocationResult.faml.response.customer.txtcustcity);
					$("#txtcustcntry").val(invocationResult.faml.response.customer.txtcustcntry);
					$("#txtcustadr1").val(invocationResult.faml.response.customer.txtcustadr1);
					$("#txtcustadr2").val(invocationResult.faml.response.customer.txtcustadr2);
					$("#txtcustadr3").val(invocationResult.faml.response.customer.txtcustadr3);
					$("#txtcustzip").val(invocationResult.faml.response.customer.txtcustzip);
					$("#txtcuststate").val(invocationResult.faml.response.customer.txtcuststate);
					$("#pancardno").val(invocationResult.faml.response.customer.pancardno);
					$("#mothername").val(invocationResult.faml.response.customer.mothername);
					$("#CDATA").val(invocationResult.faml.response.customer.CDATA);
					$("#namcustlast").val(invocationResult.faml.response.customer.namcustlast);		
					$("#namcustshrt").val(invocationResult.faml.response.customer.namcustshrt);	
					$("#ctrupdatsrlno").val(invocationResult.faml.response.customer.ctrupdatsrlno);	
					$("#lastmntmakerid").val(invocationResult.faml.response.customer.lastmntmakerid);	
					$("#lastmntmakerid").val(invocationResult.faml.response.customer.lastmntmakerid);
                    $("#datcustopen").val(invocationResult.faml.response.customer.datcustopen);	
                    $("#refcustfax").val(invocationResult.faml.response.customer.refcustfax);
					$("#namcustmid").val(invocationResult.faml.response.customer.namcustmid);
					$("#txtcustprefix").val(invocationResult.faml.response.customer.txtcustprefix);
					$("#namcustfirst").val(invocationResult.faml.response.customer.namcustfirst);
					$("#lastmntchkrid").val(invocationResult.faml.response.customer.lastmntchkrid);
					$("#flgcusttype").val(invocationResult.faml.response.customer.flgcusttype);
					$("#flgmntstatus").val(invocationResult.faml.response.customer.flgmntstatus);
					}
							ko.applyBindings(self, $(".dynamic-page-content").get(0));
				      
					
				
							
					});
        		}else{
        				handleError(invocationResult.faml.response);
        			//window.location = "#login";
        		}
        	 }else{
        		 handleErrorNoResponse();
        	 }
        	}
        	busyInd.hide();
		};
		
	self.relaodforexaccChange = function(){
	
	    acc=$("#fldAcctNo").val();
    	accBal=Accountblance[acc];
        $("#amount").html("INR "+accBal);
		
    };
		
   rsrfx01Submit = function(){
		
	   if($("#rsrfx01").valid()){     
		 account=$("#fldAcctNo").val();
		 balance=$("#amount").html();
         cust=$("#Customername").val();
	
		 Dob=$("#Dob").val();
		 gender=$("#gender").val();
		 refcustphone=$("#refcustphone").val();
		 refcustphoneOff=$("#refcustphoneOff").val();
		 refcustphoneOff_extn=$("#refcustphoneOff_extn").val();
		 mobileno=$("#mobileno").val();
		 email=	$("#email").val();
		 txtcustcity=$("#txtcustcity").val();
		 txtcustcntry=$("#txtcustcntry").val();
		 txtcustadr1=$("#txtcustadr1").val();
		 txtcustadr2=$("#txtcustadr2").val();
		 txtcustadr3=$("#txtcustadr3").val();
		 txtcustzip=$("#txtcustzip").val();
		 txtcuststate=$("#txtcuststate").val();
		 pancardno=$("#pancardno").val();
		 mothername=$("#mothername").val();
		 CDATA=$("#CDATA").val();
		 namcustlast=$("#namcustlast").val();		
		 namcustshrt=$("#namcustshrt").val();
		 ctrupdatsrlno=$("#ctrupdatsrlno").val();
		 lastmntmakerid=$("#lastmntmakerid").val();	
		 lastmntmakerid=$("#lastmntmakerid").val();
		 datcustopen=$("#datcustopen").val();	
		 refcustfax=$("#refcustfax").val();
		 namcustmid=$("#namcustmid").val();
		 txtcustprefix=$("#txtcustprefix").val();
		 namcustfirst=$("#namcustfirst").val();
		 lastmntchkrid=$("#lastmntchkrid").val();
		 flgcusttype=$("#flgcusttype").val();
		 flgmntstatus=$("#flgmntstatus").val();	
		 fldforexcardNo=$("#fldforexcardNo").val();
		 fldreConfforexcardNo=$("#fldreConfforexcardNo").val();
				
				
                busyInd.show();  
    	    	reqParams = {};
				reqParams["fldreConfforexcardNo"]=fldreConfforexcardNo;
				reqParams["fldWebServerId"]=fldWebServerId;
				reqParams["fldDeviceId"]=fldDeviceId;
				reqParams["fldAppServerId"]=fldAppServerId;
				reqParams["txtcuststate"]=txtcuststate;
				reqParams["fldTxnId"]="RFX";
				reqParams["mothername"]=mothername;
				reqParams["pancardno"]=pancardno;
				reqParams["txtcustcity"]=txtcustcity;
				reqParams["refcustemail"]=email;
				reqParams["fldAppId"]=fldAppId;
				reqParams["gender"]=gender;
				reqParams["fldBack"]="";
				reqParams["datbirthcust"]=Dob;
				reqParams["fldScrnSeqNbr"]="02";
				reqParams["namcustfull"]=cust;
				reqParams["fldFromAcctNo"]=account;  
				reqParams["fldRequestId"]=RegfldRequestId;
				reqParams["txtcustadr3"]=txtcustadr3;
				reqParams["fldLangId"]=fldLangId;
				reqParams["txtcustadr2"]=txtcustadr2;
				reqParams["txtcustadr1"]=txtcustadr1;
				reqParams["refcustphoneOff"]=refcustphoneOff;
				reqParams["balance"]= balance;
				reqParams["fldSessionId"]=Rsessionid;
				reqParams["fldFromAcctNoIndx"]="1";
				reqParams["txtcustzip"]=txtcustzip;
				reqParams["txtcustcntry"]=txtcustcntry;
				reqParams["mobileno"]=mobileno;
				reqParams["fldforexcardNo"]=fldforexcardNo;
				reqParams["refcustphone"]=refcustphone;
				reqParams["selAcct"]=account;  
				reqParams["fldLoginUserId"] =Regloginuid;
		
    	    	var invocationData = {
    	    			adapter : "Accounts",
    	        		procedure : "RRRFX02",
    	        		parameters : [fldjsessionid,reqParams,ipadd]
    	    	};
    	    	
    	    	WL.Client.invokeProcedure(invocationData, {
    	    		onSuccess : rsrfx01SubmitSuccess,
    	    		onFailure : AdapterFail,	    		
    	    		timeout: timeout
    	    	});
	 	  }      	   
    };
	
	
	rsrfx01SubmitSuccess = function(result){
		invocationResult = result.invocationResult;
				if(invocationResult.isSuccessful) {
					if(invocationResult.faml.response){	
					if(invocationResult.faml.response.rc.returncode == 0){
							window.location = "#rrrfx02";
					}else{
						handleError(invocationResult.faml.response);
						  window.location="#rrasm01";
					}
					}else{
						handleErrorNoResponse();
					}
				}
    }; 
	
	
	this.rsrfx02page = function(){
	       Reloadforexrate=invocationResult.faml.response.fxrates;
		
			  reloadpurpose=invocationResult.faml.response.forexpurpose;
			  forexcurrencytype=invocationResult.faml.response.forexcurrencytype;
			  
	         	$(reloadpurpose).each(function(index, obj){
		
    	    			displaytxt = obj.forexpurpose;
    	    			accountValue = obj.forexpurpose;
						
    	    		    self.reloadpurpose.push({ codacctno:obj.forexpurpose,displaytxt:displaytxt, accountValue: accountValue });
    	         });
			 
			 
		    $(forexcurrencytype).each(function(index, obj){
		
    	    			displaytxt = obj.forexcurrencytype;
    	    			accountValue = obj.forexcurrencytype;
						
    	    		    self.forexcurrencytype.push({ codacctno:obj.forexpurpose,displaytxt:displaytxt, accountValue: accountValue });
    	    });
				 
			 
        	 $("#contentData").load("Views/Accounts/rrrfx02.html", null, function (response, status, xhr) {
                if (status != "error") {}
				
				
				$(".custname").html(invocationResult.faml.response.customer.namcustfull);
				$(".accno").html(invocationResult.faml.response.customer.fldFromAcctNo);
				$(".cardno").html(invocationResult.faml.response.customer.fldforexcardNo);
				
                if(invocationResult.faml.response.customer.binCurrency=="MULTICURRENCY"){
				 $("#addbtn").show();
				}
				else{
			    $("#addbtn").hide();
				}
				
				if(invocationResult.faml.response.mci){
			  	      requestid= invocationResult.faml.response.mci.requestid;
			          }else{
			         requestid = RegfldRequestId;
		        }
				  $(".reqid").html(requestid);
			   $("#fldCurrIndx").val(invocationResult.faml.response.fldCurrIndx);
			 
                ko.applyBindings(self, $(".dynamic-page-content").get(0));
                busyInd.hide();
            });
    };	
	 
	 
	 
	 	rsrfx02Submit = function(){
                  
	         
				
			if($("#frmTxn").valid()){
			
			    fldINR= $("#fldINR").val();
				fldINR1= $("#fldINR1").val();
				fldINR2= $("#fldINR2").val();
				fldINR3= $("#fldINR3").val();
				fldINR4= $("#fldINR4").val();
				fldINR5= $("#fldINR5").val();
				fldINR6= $("#fldINR6").val();
				fldINR7= $("#fldINR7").val();
				fldINR8= $("#fldINR8").val();
				fldINR9= $("#fldINR9").val();
				fldUSD=  $("#fldUSD").val();
				fldUSD1= $("#fldUSD1").val();
				fldUSD2= $("#fldUSD2").val();
				fldUSD3= $("#fldUSD3").val();
				fldUSD4= $("#fldUSD4").val();
				fldUSD5= $("#fldUSD5").val();
				fldUSD6= $("#fldUSD6").val();
				fldUSD7= $("#fldUSD7").val();
				fldUSD8= $("#fldUSD8").val();
				fldUSD9= $("#fldUSD9").val();
			 
			    fldPurpose=$("#fldPurpose").val();
				DepDate=$("#fldFromDate").val();
				datefldDepDate=DepDate.split("/")[0];
				monthfldDepDate=DepDate.split("/")[1];
				yearfldDepDate=DepDate.split("/")[2];
				ReturnDate=$("#fldToDate").val();	
				datefldReturnDate=ReturnDate.split("/")[0];
				monthfldReturnDate=ReturnDate.split("/")[1];
				yearfldReturnDate=ReturnDate.split("/")[2];
				    
					
				tmpdt1 = $('#fldFromDate').val();
				tmpdt3= $('#fldToDate').val();
			
				arrdt1 = tmpdt1.split('/');
				arrdt3 = tmpdt3.split('/');
				
				var today = new Date();
				var dd = today.getDate();
				var mm = today.getMonth()+1; //January is 0!

				var yyyy = today.getFullYear();
				if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} 
				var today = dd+'/'+mm+'/'+yyyy;
				
				tmpdt2 = today;
				arrdt2 = tmpdt2.split('/');
                var date1 = new Date(arrdt1[2],arrdt1[1],arrdt1[0]);

               var date2 = new Date(arrdt2[2],arrdt2[1],arrdt2[0]);
			   
			   var date3= new Date(arrdt3[2],arrdt3[1],arrdt3[0]);
	       
		     if(tmpdt1==""){
			      customAlert("Please select travel date ");
                  return; 
			   }
		       if(tmpdt3==""){
			      customAlert("Please select return date ");
                  return; 
			   }
		         
				
	           // if ( date1 <= date2 ) {
	             // customAlert("travel date greater than current date");
                  // return;  
               // }
			   
			   
			   // if( date3 <= date2){
			      // customAlert("Return date greater than current date");
                  // return;  
			   // }
			   
			   if( date1 > date3 ){
			      customAlert("Please select Valid Date of Return");
                  return;  
			   }
					

                    busyInd.show();  
    	    	reqParams = {};
				reqParams["fldCurr"]= $("#fldCurr").val();
				reqParams["fldForex"]= $("#fldForex").val();
				reqParams["fldCurrIndx"]=$("#fldCurrIndx").val();
			   if($("#fldCurr1").val()!=""){
				reqParams["fldCurr1"]= $("#fldCurr1").val();
				reqParams["fldForex1"]= $("#fldForex1").val();
				reqParams["fldCurr1Indx"]=$("#fldCurrIndx").val();
				}
				else{
				reqParams["fldCurr1"]= "";
				reqParams["fldForex1"]= "";
				reqParams["fldCurr1Indx"]="";
				
				}
				
			   if($("#fldCurr2").val()!=""){
				reqParams["fldCurr2"]= $("#fldCurr2").val();
				reqParams["fldForex2"]= $("#fldForex2").val();
				reqParams["fldCurr2Indx"]=$("#fldCurrIndx").val();
				}
				else{
				reqParams["fldCurr2"]= "";
				reqParams["fldForex2"]= "";
				reqParams["fldCurr2Indx"]="";
				}
				
				if($("#fldCurr3").val()!=""){
				reqParams["fldCurr3"]= $("#fldCurr3").val();
				reqParams["fldForex3"]= $("#fldForex3").val();
				reqParams["fldCurr3Indx"]=$("#fldCurrIndx").val();
				}
				else{
				reqParams["fldCurr3"]="";
				reqParams["fldForex3"]= "";
				reqParams["fldCurr3Indx"]="";
				}
				
				
				if($("#fldCurr4").val()!=""){
				reqParams["fldCurr4"]= $("#fldCurr4").val();
				reqParams["fldForex4"]= $("#fldForex4").val();
				reqParams["fldCurr4Indx"]=$("#fldCurrIndx").val();
				}
				else{
				reqParams["fldCurr4"]= "";
				reqParams["fldForex4"]= "";
				reqParams["fldCurr4Indx"]="";
				}
				
				if($("#fldCurr5").val()!=""){
				reqParams["fldCurr5"]= $("#fldCurr5").val();
				reqParams["fldForex5"]= $("#fldForex5").val();
				reqParams["fldCurr5Indx"]=$("#fldCurrIndx").val();
				}
				else{
				reqParams["fldCurr5"]= "";
				reqParams["fldForex5"]= "";
				reqParams["fldCurr5Indx"]="";
				}
				
				if($("#fldCurr6").val()!=""){
				reqParams["fldCurr6"]= $("#fldCurr6").val();
				reqParams["fldForex6"]= $("#fldForex6").val();
				reqParams["fldCurr6Indx"]=$("#fldCurrIndx").val();
				}
				else{
				reqParams["fldCurr6"]= "";
				reqParams["fldForex6"]= "";
				reqParams["fldCurr6Indx"]="";
				}
				
				if($("#fldCurr7").val()!=""){
				reqParams["fldCurr7"]= $("#fldCurr7").val();
				reqParams["fldForex7"]= $("#fldForex7").val();
				reqParams["fldCurr7Indx"]=$("#fldCurrIndx").val();
				}
				else{
				reqParams["fldCurr7"]= $("#fldCurr7").val();
				reqParams["fldForex7"]= $("#fldForex7").val();
				reqParams["fldCurr7Indx"]=$("#fldCurrIndx").val();
				}
				
				if($("#fldCurr8").val()!=""){
				reqParams["fldCurr8"]= $("#fldCurr8").val();
				reqParams["fldForex8"]= $("#fldForex8").val();
				reqParams["fldCurr8Indx"]=$("#fldCurrIndx").val();
				}
				else{
				reqParams["fldCurr8"]= "";
				reqParams["fldForex8"]= "";
				reqParams["fldCurr8Indx"]="";
				}
				
				if($("#fldCurr9").val()!=""){
				reqParams["fldCurr9"]= $("#fldCurr9").val();
				reqParams["fldForex9"]= $("#fldForex9").val();
				reqParams["fldCurr9Indx"]=$("#fldCurrIndx").val();
				}
				else{
				reqParams["fldCurr9"]= "";
				reqParams["fldForex9"]= "";
				reqParams["fldCurr9Indx"]="";
				}
				
				if($("#fldCurr10").val()!=""){
				reqParams["fldCurr10"]= $("#fldCurr10").val();
				reqParams["fldForex10"]= $("#fldForex10").val();
				reqParams["fldCurr10Indx"]=$("#fldCurrIndx").val();
				}else{
				reqParams["fldCurr10"]= "";
				reqParams["fldForex10"]="";
				reqParams["fldCurr10Indx"]="";
				}

				    reqParams["txtcustzip"]=txtcustzip;
					reqParams["fldReturnDate"]=ReturnDate;
					reqParams["monthfldReturnDate"]=monthfldReturnDate;
					reqParams["fldFromAcctNo"]=account;
					reqParams["namcustfull"]=cust;
					reqParams["fldPurposeIndx"]="1";
					reqParams["flddispatchCntry"]="";
					reqParams["yearfldReturnDateIndx"]="";
					reqParams["refcustemail"]=email;
					reqParams["fldWebServerId"]=fldWebServerId;
					reqParams["flddispatchAddr3"]="";
					reqParams["flddispatchAddr2"]="";
					reqParams["flddispatchAddr1"]="";
					reqParams["fldTxnId"]="RFX";
					reqParams["datefldDepDateIndx"]="4";
					reqParams["fldBack"]="false";
					reqParams["mobileno"]=mobileno;
					reqParams["flddispatchCity"]="";
					reqParams["fldPurpose"]=fldPurpose;
					reqParams["yearfldReturnDate"]=yearfldReturnDate;
					reqParams["fldAppId"]=fldAppId;
					reqParams["datbirthcust"]=Dob;
					reqParams["fldRowCount"]=$("#fldRowCount").val();
					
					reqParams["mothername"]=mothername;
					reqParams["datefldDepDate"]=datefldDepDate;
					reqParams["fldRequestId"]=$(".reqid").html();
					reqParams["refcustphone"]=refcustphone;
					reqParams["fldEqvInrAmt"]=$("#fldEqvInrAmt").val();
					reqParams["fldAppServerId"]=fldAppServerId;
					reqParams["gender"]=gender;
					reqParams["monthfldDepDateIndx"]="7";
					reqParams["yearfldDepDateIndx"]="2";
					reqParams["txtcustcity"]=mobileno;
					reqParams["pancardno"]=pancardno;
					reqParams["txtcuststate"]=txtcuststate;
					reqParams["flddispatchZip"]="";
					reqParams["txtcustadr3"]=txtcustadr3;
					reqParams["datefldReturnDateIndx"]="7";
					reqParams["fldLangId"]="eng";
					reqParams["txtcustadr2"]=txtcustadr2;
					reqParams["txtcustadr1"]=txtcustadr1;
					reqParams["monthfldDepDate"]=monthfldDepDate;
					reqParams["fldDepDate"]=DepDate;
					reqParams["fldCurrencyCode"]="";
					reqParams["yearfldDepDate"]=yearfldDepDate;
					reqParams["flddispatchState"]="";
					reqParams["onthfldReturnDateIndx"]="7";
					reqParams["fldFromAcctNoIndx"]="1";
					reqParams["fldSessionId"]=Rsessionid;
					reqParams["fldDeviceId"]=fldDeviceId;
					reqParams["fldforexcardNo"]=fldforexcardNo;
					reqParams["fldEqvUsdAmt"]=$("#fldEqvUsdAmt").val();
					reqParams["datefldReturnDate"]=datefldReturnDate;
					reqParams["txtcustcntry"]=txtcustcntry;
					reqParams["fldScrnSeqNbr"]="03";
					reqParams["refcustphoneOff"]=refcustphoneOff;
					reqParams["fldLoginUserId"] =Regloginuid;
			
    	
    	    	var invocationData = {
    	    			adapter : "Accounts",
    	        		procedure : "RRRFX03",
    	        		parameters : [fldjsessionid,reqParams,ipadd]
    	    	};
    	    	
    	    	WL.Client.invokeProcedure(invocationData, {
    	    		onSuccess : rsrfx02SubmitSuccess,
    	    		onFailure : AdapterFail,	    		
    	    		timeout: timeout
    	    	});
	 	  }   
    };
	
	
	rsrfx02SubmitSuccess = function(result){
		invocationResult = result.invocationResult;
				if(invocationResult.isSuccessful) {
					if(invocationResult.faml.response){	
					if(invocationResult.faml.response.rc.returncode==0){
							window.location = "#rrrfx03";
					}else{
						handleError(invocationResult.faml.response);
					}
					}else{
						handleErrorNoResponse();
					}
				}
    }; 
	 
	 
	this.rsrfx03page = function(){
	         
			  
        	 $("#contentData").load("Views/Accounts/rrrfx03.html", null, function (response, status, xhr) {
                if (status != "error") {}
                
				
				 $(".custname").html(invocationResult.faml.response.namcustfull);
				 $(".cardno").html(invocationResult.faml.response.fldforexcardNo);
				 $(".debitacc").html(invocationResult.faml.response.fldFromAcctNo);
				 $("#fldCurr").html(invocationResult.faml.response.fldCurr);
				 $("#fldForex").html(invocationResult.faml.response.fldForex);
				 $("#fldINR").html(fldINR);
				 $("#fldUSD").html(fldUSD);
				
				if(invocationResult.faml.response.mci.requestid){
				  
				requestID= invocationResult.faml.response.mci.requestid;
				}
				else{
				    
				requestID= RegfldRequestId;
				}
				      $(".fldEqvInrAmt").html(invocationResult.faml.response.fldEqvInrAmt);
					   $(".fldEqvUsdAmt").html(invocationResult.faml.response.fldEqvUsdAmt);
					   
					   fldEqvusd = invocationResult.faml.response.fldEqvUsdAmt;
				
				 fldEqvusdshow = parseFloat(fldEqvusd).toFixed(2);
			 $(".fldEqvUsdAmt1").html(fldEqvusdshow);
				
				 if(invocationResult.faml.response.fldForex1!='' && invocationResult.faml.response.fldCurr1!=''){
				          $("#fldcurrancy1").show();
						  $("#fldCurr1").html(invocationResult.faml.response.fldCurr1);
						  $("#fldForex1").html(invocationResult.faml.response.fldForex1);
						  $("#fldINR1").html(fldINR1);
						  $("#fldUSD1").html(fldUSD1);
						
				
				 }
				 if(invocationResult.faml.response.fldForex2!='' && invocationResult.faml.response.fldCurr2!=''){
				         $("#fldcurrancy2").show();
						  $("#fldCurr2").html(invocationResult.faml.response.fldCurr2);
						  $("#fldForex2").html(invocationResult.faml.response.fldForex2);
						  $("#fldINR2").html(fldINR2);
						  $("#fldUSD2").html(fldUSD2);
				 }
				 if(invocationResult.faml.response.fldForex3!='' && invocationResult.faml.response.fldCurr3!=''){
				         $("#fldcurrancy3").show();
						  $("#fldCurr3").html(invocationResult.faml.response.fldCurr3);
						  $("#fldForex3").html(invocationResult.faml.response.fldForex3);
						  $("#fldINR3").html(fldINR3);
						  $("#fldUSD3").html(fldUSD3);
				 }
				 if(invocationResult.faml.response.fldForex4!='' && invocationResult.faml.response.fldCurr4!=''){
				           $("#fldcurrancy4").show();
						   $("#fldCurr4").html(invocationResult.faml.response.fldCurr4);
						   $("#fldForex4").html(invocationResult.faml.response.fldForex4);
						  $("#fldINR4").html(fldINR4);
						  $("#fldUSD4").html(fldUSD4);
				 }
				 if(invocationResult.faml.response.fldForex5!='' && invocationResult.faml.response.fldCurr5!=''){
				         $("#fldcurrancy5").show();
						   $("#fldCurr5").html(invocationResult.faml.response.fldCurr5);
						    $("#fldForex5").html(invocationResult.faml.response.fldForex5);
						  $("#fldINR5").html(fldINR5);
						  $("#fldUSD5").html(fldUSD5);
				 }
				 if(invocationResult.faml.response.fldForex6!='' && invocationResult.faml.response.fldCurr6!=''){
				         $("#fldcurrancy6").show();
						   $("#fldCurr6").html(invocationResult.faml.response.fldCurr6);
						   $("#fldForex6").html(invocationResult.faml.response.fldForex6);
						  $("#fldINR1").html(fldINR6);
						  $("#fldUSD1").html(fldUSD6);
				 }
				 if(invocationResult.faml.response.fldForex7!='' && invocationResult.faml.response.fldCurr7!=''){
				         $("#fldcurrancy7").show();
						   $("#fldCurr7").html(invocationResult.faml.response.fldCurr7);
						  $("#fldForex7").html(invocationResult.faml.response.fldForex7);
						  $("#fldINR7").html(fldINR7);
						  $("#fldUSD7").html(fldUSD7);
				 }
				 if(invocationResult.faml.response.fldForex8!='' && invocationResult.faml.response.fldCurr8!=''){
				          $("#fldcurrancy8").show();
						  $("#fldCurr8").html(invocationResult.faml.response.fldCurr8);
						  $("#fldForex8").html(invocationResult.faml.response.fldForex8);
						  $("#fldINR8").html(fldINR8);
						  $("#fldUSD8").html(fldUSD8);
				 }
				 if(invocationResult.faml.response.fldForex9!='' && invocationResult.faml.response.fldCurr9!=''){
				          $("#fldcurrancy9").show();
						  $("#fldCurr9").html(invocationResult.faml.response.fldCurr9);
						  $("#fldForex9").html(invocationResult.faml.response.fldForex9);
						  $("#fldINR9").html(fldINR9);
						  $("#fldUSD9").html(fldUSD9);
				 }
				fldRowCount=invocationResult.faml.response.fldRowCount;
                ko.applyBindings(self, $(".dynamic-page-content").get(0));
                busyInd.hide();
            });
    };	 
	
	
	
		rsrfx03Submit = function(){
		
                 
			 if($("#rsrfx03").valid()){
                    busyInd.show();  
					
			    fldINR= $("#fldINR").html();
				fldINR1= $("#fldINR1").html();
				fldINR2= $("#fldINR2").html();
				fldINR3= $("#fldINR3").html();
				fldINR4= $("#fldINR4").html();
				fldINR5= $("#fldINR5").html();
				fldINR6= $("#fldINR6").html();
				fldINR7= $("#fldINR7").html();
				fldINR8= $("#fldINR8").html();
				fldINR9= $("#fldINR9").html();
				fldUSD=  $("#fldUSD").html();
				fldUSD1= $("#fldUSD1").html();
				fldUSD2= $("#fldUSD2").html();
				fldUSD3= $("#fldUSD3").html();
				fldUSD4= $("#fldUSD4").html();
				fldUSD5= $("#fldUSD5").html();
				fldUSD6= $("#fldUSD6").html();
				fldUSD7= $("#fldUSD7").html();
				fldUSD8= $("#fldUSD8").html();
				fldUSD9= $("#fldUSD9").html();
				
				Inrusdamount = fldINR +"#"+fldINR1+"#"+fldINR2+"#"+fldINR3+"#"+fldINR4+"#"+fldINR5+"#"+fldINR6+"#"+fldINR7+"#"+fldINR8+"#"+fldINR9+"#"+fldUSD+"#"+fldUSD1+"#"+fldUSD2+"#"+fldUSD3+"#"+fldUSD4+"#"+fldUSD5+"#"+fldUSD6+"#"+fldUSD7+"#"+fldUSD8+"#"+fldUSD9;
					
    	        reqParams = {};
		
				reqParams["fldCurr"]= $("#fldCurr").html();
				reqParams["fldForex"]= $("#fldForex").html();
				reqParams["fldCurrIndx"]=$("#fldCurrIndx").val();
				reqParams["fldLoginUserId"] =Regloginuid;
			    if($("#fldCurr1").html()!=""){
				reqParams["fldCurr1"]= $("#fldCurr1").html();
				reqParams["fldForex1"]= $("#fldForex1").html();
				reqParams["fldCurr1Indx"]=$("#fldCurrIndx").val();
				}
				else{
				reqParams["fldCurr1"]= "";
				reqParams["fldForex1"]= "";
				reqParams["fldCurr1Indx"]="";
				
				}
				
			   if($("#fldCurr2").html()!=""){
				reqParams["fldCurr2"]= $("#fldCurr2").html();
				reqParams["fldForex2"]= $("#fldForex2").html();
				reqParams["fldCurr2Indx"]=$("#fldCurrIndx").val();
				}
				else{
				reqParams["fldCurr2"]= "";
				reqParams["fldForex2"]= "";
				reqParams["fldCurr2Indx"]="";
				}
				
				if($("#fldCurr3").html()!=""){
				reqParams["fldCurr3"]= $("#fldCurr3").html();
				reqParams["fldForex3"]= $("#fldForex3").html();
				reqParams["fldCurr3Indx"]=$("#fldCurrIndx").html();
				}
				else{
				reqParams["fldCurr3"]="";
				reqParams["fldForex3"]= "";
				reqParams["fldCurr3Indx"]="";
				}
				
				
				if($("#fldCurr4").html()!=""){
				reqParams["fldCurr4"]= $("#fldCurr4").html();
				reqParams["fldForex4"]= $("#fldForex4").html();
				reqParams["fldCurr4Indx"]=$("#fldCurrIndx").val();
				}
				else{
				reqParams["fldCurr4"]= "";
				reqParams["fldForex4"]= "";
				reqParams["fldCurr4Indx"]="";
				}
				
				if($("#fldCurr5").html()!=""){
				reqParams["fldCurr5"]= $("#fldCurr5").html();
				reqParams["fldForex5"]= $("#fldForex5").html();
				reqParams["fldCurr5Indx"]=$("#fldCurrIndx").val();
				}
				else{
				reqParams["fldCurr5"]= "";
				reqParams["fldForex5"]= "";
				reqParams["fldCurr5Indx"]="";
				}
				
				if($("#fldCurr6").html()!=""){
				reqParams["fldCurr6"]= $("#fldCurr6").html();
				reqParams["fldForex6"]= $("#fldForex6").html();
				reqParams["fldCurr6Indx"]=$("#fldCurrIndx").val();
				}
				else{
				reqParams["fldCurr6"]= "";
				reqParams["fldForex6"]= "";
				reqParams["fldCurr6Indx"]="";
				}
				
				if($("#fldCurr7").html()!=""){
				reqParams["fldCurr7"]= $("#fldCurr7").html();
				reqParams["fldForex7"]= $("#fldForex7").html();
				reqParams["fldCurr7Indx"]=$("#fldCurrIndx").val();
				}
				else{
				reqParams["fldCurr7"]= "";
				reqParams["fldForex7"]="";
				reqParams["fldCurr7Indx"]="";
				}
				
				if($("#fldCurr8").html()!=""){
				reqParams["fldCurr8"]= $("#fldCurr8").html();
				reqParams["fldForex8"]= $("#fldForex8").html();
				reqParams["fldCurr8Indx"]=$("#fldCurrIndx").val();
				}
				else{
				reqParams["fldCurr8"]= "";
				reqParams["fldForex8"]= "";
				reqParams["fldCurr8Indx"]="";
				}
				
				if($("#fldCurr9").html()!=""){
				reqParams["fldCurr9"]= $("#fldCurr9").html();
				reqParams["fldForex9"]= $("#fldForex9").html();
				reqParams["fldCurr9Indx"]=$("#fldCurrIndx").val();
				}
				else{
				reqParams["fldCurr9"]= "";
				reqParams["fldForex9"]= "";
				reqParams["fldCurr9Indx"]="";
				}
				    reqParams["txtcustzip"]=txtcustzip;
					
					reqParams["fldReturnDate"]=ReturnDate;
					reqParams["monthfldReturnDate"]=monthfldReturnDate;
					reqParams["fldFromAcctNo"]=account;
					reqParams["namcustfull"]=cust;
					reqParams["fldPurposeIndx"]="1";
					reqParams["flddispatchCntry"]="";
					reqParams["yearfldReturnDateIndx"]="1";
					reqParams["refcustemail"]=email;
					reqParams["fldWebServerId"]=fldWebServerId;
					reqParams["flddispatchAddr3"]="";
					reqParams["flddispatchAddr2"]="";
					reqParams["flddispatchAddr1"]="";
					reqParams["fldTxnId"]="RFX";
					reqParams["datefldDepDateIndx"]="15";
					reqParams["fldBack"]="false";
					reqParams["mobileno"]=mobileno;
					reqParams["flddispatchCity"]="";
					reqParams["fldPurpose"]=fldPurpose;
					reqParams["yearfldReturnDate"]=yearfldReturnDate;
					reqParams["fldAppId"]=fldAppId;
					reqParams["datbirthcust"]=Dob;
					reqParams["fldRowCount"]=fldRowCount;
					reqParams["fldCurr10"]="";
					reqParams["mothername"]=mothername;
					reqParams["datefldDepDate"]=datefldDepDate;
					reqParams["fldRequestId"]=requestID;
					reqParams["fldCurrIndx"]="12";
					reqParams["refcustphone"]=refcustphone;
					reqParams["fldEqvInrAmt"]=$(".fldEqvInrAmt").html();
					reqParams["fldAppServerId"]=fldAppServerId;
					reqParams["gender"]=gender;
					reqParams["monthfldDepDateIndx"]="8";
					reqParams["yearfldDepDateIndx"]="6";
					reqParams["txtcustcity"]=txtcustcity;
					reqParams["pancardno"]=pancardno;
					reqParams["txtcuststate"]=txtcuststate;
					reqParams["flddispatchZip"]="";
					reqParams["txtcustadr3"]=txtcustadr3;
					reqParams["datefldReturnDateIndx"]="7";
					reqParams["fldLangId"]="eng";
					reqParams["txtcustadr2"]=txtcustadr2;
					reqParams["txtcustadr1"]=txtcustadr1;
					reqParams["monthfldDepDate"]=monthfldDepDate;
					reqParams["fldDepDate"]=DepDate;;
					reqParams["fldCurrencyCode"]="";
					reqParams["yearfldDepDate"]=yearfldDepDate;
					reqParams["flddispatchState"]="";
					reqParams["onthfldReturnDateIndx"]="7";
					reqParams["fldFromAcctNoIndx"]="1";
					reqParams["fldSessionId"]=Rsessionid;
					reqParams["fldDeviceId"]=fldDeviceId;
					reqParams["fldforexcardNo"]=fldforexcardNo;
					reqParams["fldEqvUsdAmt"]=$(".fldEqvUsdAmt").html();
					reqParams["datefldReturnDate"]=datefldReturnDate;
					reqParams["txtcustcntry"]=txtcustcntry;
					reqParams["fldScrnSeqNbr"]="04";
					reqParams["refcustphoneOff"]=refcustphoneOff;
                    reqParams["fldOrgTxnId"]="RFX";
					reqParams["fldCurrDesc"]="";
					reqParams["monthfldReturnDateIndx"]="8";
					reqParams["fldRsaTxnId"]="";
					reqParams["fldClientSessionId"]="";
					reqParams["fldFcatSessionId"]="";
					reqParams["fldDevicePrint"]="";
                    reqParams["fldPassport"]="";
                    reqParams["fldTC"]="Y";
				    reqParams["fldFEMA"]= "Y";
				//fldRowCount

    	    	var invocationData = {
    	    			adapter : "Accounts",
    	        		procedure : "RRRFX04",
    	        		parameters : [fldjsessionid,reqParams,ipadd]
    	    	};
    	    	
    	    	WL.Client.invokeProcedure(invocationData, {
    	    		onSuccess : rsaResponse,
    	    		onFailure : AdapterFail,	    		
    	    		timeout: timeout
    	    	});
	 	      	}   
    };
	
	
	//adhaar card
	
	
	 this.rrvua01Page = function(){
				busyInd.show();  
		    
    	    	reqParams = {};
				reqParams["fldDeviceId"] = fldDeviceId;
    	    	reqParams["fldWebServerId"] = fldWebServerId;
				reqParams["fldLoginUserId"] =Regloginuid;
    	    	reqParams["fldAppId"] = fldAppId;
    	    	reqParams["fldTxnId"] = "VUA";
    	    	reqParams["fldRequestId"] =RegfldRequestId;
    	    	reqParams["fldScrnSeqNbr"] = "01";
    	    	reqParams["fldSessionId"] = Rsessionid;
				reqParams["fldTxnType"] ="";
				reqParams["fldLogoffReq"] = "N";
				reqParams["fldModule"] = "CH";
				reqParams["fldBenefType"] = "FCNR";
    	    	reqParams["fldOrgTxn"] = "";
				reqParams["fldRoleId"] = "";
				reqParams["fldSwitchAppId"] = "";

    	    	var invocationData = {
    	    			adapter : "Accounts",
    	        		procedure : "RSVUA01",
    	        		parameters : [fldjsessionid,reqParams,ipadd]
    	    	};
    	    	
    	    	WL.Client.invokeProcedure(invocationData, {
    	    		onSuccess : rrvua01PageSuccess,
    	    		onFailure : AdapterFail,	    		
    	    		timeout: timeout
    	    	});
		};
		
		
		rrvua01PageSuccess = function(result){
				invocationResult = result.invocationResult;
        	if(invocationResult.isSuccessful) {
        		if(invocationResult.faml.response){	
        		if(invocationResult.faml.response.rc.returncode == 0){
	
        			
					
					self.adhaaraccounts.removeAll();
    	    		$("#contentData").load("Views/Accounts/rrvua01.html", null, function (response, status, xhr) {
							if (status != "error") {}
							ko.applyBindings(self, $(".dynamic-page-content").get(0));
							if(invocationResult.faml.response.customer){
							$("#fldAadharno").val(invocationResult.faml.response.customer.custaadharno);
						    $("#fldAadharno2").val(invocationResult.faml.response.customer.custaadharno);
							if(invocationResult.faml.response.customer.aadharexists=="Y"){
				                $("#useracctno").html(invocationResult.faml.response.customer.useracctno);
							    $("#custaadharno").html(invocationResult.faml.response.customer.custaadharno);
								$("#aadharexists").show();
								$("#aadharnotexists").hide();
				 
							 }
							}
							 else{
							    $("#aadharexists").hide();
								$("#aadharnotexists").show();
								
								if(invocationResult.faml.response.nbrsavingacct==0 && invocationResult.faml.response.nbrcurrentacct == 0){
								  $("#savingaccexists").hide();
								  $("#savingaccnotexists").show();
								}
								else{
								     $("#savingaccexists").show();
								    $("#savingaccnotexists").hide();
									account=invocationResult.faml.response.acctdtls;
									$(account).each(function(index, obj) {
									displaytxt = obj.codacctno  +" - "+obj.nambranch;
									accountValue = obj.codacctno+"#"+obj.nambranch+"#"+obj.namccyshrt;
									  self.adhaaraccounts.push({ codacctno: obj.codacctno, displaytxt:displaytxt, accountValue: accountValue });
								   });
							 
								}
							    
							 }
				      
					
					   
			
							
					});
        		}else{
        				handleError(invocationResult.faml.response);
        			window.location = "#rrasm01";
        		}
        	 }else{
        		 handleErrorNoResponse();
        	 }
        	}
        	busyInd.hide();
		};
	
	
	 this.rrvua01Submit = function(){
       
	
		if($("#rrvua01").valid()){
		
        busyInd.show();  
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
		reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["selAcct"] = $("#fldAcctNo").val();
		reqParams["fldAadharno"] = $("#fldAadharno").val();
    	reqParams["fldMode"] = "TPT";
    	reqParams["fldModule"] ="CH";
    	reqParams["fldTxnId"] = "VUA";
    	reqParams["fldAadharno2"] = $("#fldAadharno2").val();
    	reqParams["fldScrnSeqNbr"] ="02";
    	reqParams["fldAcctNo"] =$("#fldAcctNo").val();
    	reqParams["fldSessionId"] = Rsessionid;
		reqParams["fldRequestId"] =RegfldRequestId;
		
		
		//fldScrnSeqNbr=02&selAcct=50100001138728  &fldSessionId=233842676UIJZFXHRF&fldRequestId=233842676UIJZFXHRF114655707QD&fldAadharno=655589288185&fldModule=CH&fldMode=TPT&fldTxnId=VUA&fldAadharno2=655589288185&fldAppId=RS&fldAcctNo=50100001138728
		
		
	 	var invocationData = {
			adapter : "Accounts",
			procedure : "RSVUA02",
			parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	 	};
	 	        	
	 	
	 	WL.Client.invokeProcedure(invocationData, {
	 	        		onSuccess : rrvua01SubmitResponse,
	 	        		onFailure : AdapterFail,
	 	        		timeout: timeout
	 	});        	
	 }       	
		
	 	        	   
};
 rrvua01SubmitResponse = function(result){
		invocationResult = result.invocationResult;
				if(invocationResult.isSuccessful) {
					if(invocationResult.faml.response){	
					if(invocationResult.faml.response.rc.returncode == 0){
						accStmtData(invocationResult.faml);
							
							window.location = "#rrvua02";
					}else{
						handleError(invocationResult.faml.response);
						window.location = "#rrasm01";
					}
					}else{
						handleErrorNoResponse();
					}
				}
 };
 
 this.rrvua02Page = function(){

        	accstmtdata = accStmtData();
        
        	$("#contentData").load("Views/Accounts/rrvua02.html", null, function (response, status, xhr) {
                if (status != "error") {}
				
				 $("#custname").html(invocationResult.faml.response.customer.custname);
				 $("#custid").html(invocationResult.faml.response.customer.custid);
				 $("#useracctno").html(invocationResult.faml.response.customer.useracctno);
				 $("#custaadharno").html(invocationResult.faml.response.customer.custaadharno);
                 aadhareqid=invocationResult.faml.response.mci.requestid;
					if(invocationResult.faml.response.mci){
			  	      requestid= invocationResult.faml.response.mci.requestid;
			          }else{
			         requestid = RegfldRequestId;
		          	}
					
				$("#aadhareqid").html(requestid);
                 
	            
				
                ko.applyBindings(self, $(".dynamic-page-content").get(0));
                busyInd.hide();
            });
};
	
	
	 this.rrvua02Submit = function(){
       
	
		//if($("#rrvua01").valid()){
        busyInd.show();  
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
		reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
		reqParams["fldAadharno"] = $("#custaadharno").html();
    	reqParams["fldMode"] = "TPT";
    	reqParams["fldModule"] ="CH";
    	reqParams["fldTxnId"] = "VUA";
    	reqParams["fldback"] = "Y";
    	reqParams["fldScrnSeqNbr"] ="03";
    	reqParams["fldAcctNo"] = $("#useracctno").html();
    	reqParams["fldSessionId"] = Rsessionid;
		reqParams["fldRequestId"] =$("#aadhareqid").html();
		
		
	
		
		
	 	var invocationData = {
			adapter : "Accounts",
			procedure : "RSVUA03",
			parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	 	};
	 	        	
	 	
	 	WL.Client.invokeProcedure(invocationData, {
	 	        		onSuccess : rrvua02SubmitResponse,
	 	        		onFailure : AdapterFail,
	 	        		timeout: timeout
	 	});        	
	 	 //}       	
		
	 	        	   
};
 rrvua02SubmitResponse = function(result){
		invocationResult = result.invocationResult;
				if(invocationResult.isSuccessful) {
					if(invocationResult.faml.response){	
					if(invocationResult.faml.response.rc.returncode == 0){
						accStmtData(invocationResult.faml);
							
							window.location = "#rrvua03";
					}else{
						handleError(invocationResult.faml.response);
					}
					}else{
						handleErrorNoResponse();
					}
				}
 };
 
 this.rrvua03Page = function(){

        	accstmtdata = accStmtData();
        
        	$("#contentData").load("Views/Accounts/rrvua03.html", null, function (response, status, xhr) {
                if (status != "error") {}
				
				 
				 $("#custaadharno").html(invocationResult.faml.response.customer.custaadharno);
                
                 
	            
				
                ko.applyBindings(self, $(".dynamic-page-content").get(0));
                busyInd.hide();
            });
};


      rrvua02backSubmit = function(){
				busyInd.show();  
		    
    	    	reqParams = {};
                reqParams["fldDeviceId"] = fldDeviceId;
                reqParams["fldLoginUserId"] =Regloginuid;
    	    	reqParams["fldWebServerId"] = fldWebServerId;
    	    	reqParams["fldAppId"] = fldAppId;
    	    	reqParams["fldTxnId"] = "VUA";
    	    	reqParams["fldRequestId"] =RegfldRequestId;
    	    	reqParams["fldScrnSeqNbr"] = "01";
    	    	reqParams["fldSessionId"] = Rsessionid;
				reqParams["fldModule"] = "CH";
				reqParams["fldAadharno"] = $("#custaadharno").html();
    	    	reqParams["fldback"] = "Y";
				reqParams["fldAcctNo"] = $("#useracctno").html();
				reqParams["fldMode"] = "TPT";
				
		

    	    	var invocationData = {
    	    			adapter : "Accounts",
    	        		procedure : "RSVUA01",
    	        		parameters : [fldjsessionid,reqParams,ipadd]
    	    	};
    	    	
    	    	WL.Client.invokeProcedure(invocationData, {
    	    		onSuccess : rrvua02backSubmitSuccess,
    	    		onFailure : AdapterFail,	    		
    	    		timeout: timeout
    	    	});
				
		};
		
		
		rrvua02backSubmitSuccess = function(result){
		
				invocationResult = result.invocationResult;
        	if(invocationResult.isSuccessful) {
        		if(invocationResult.faml.response){	
        		if(invocationResult.faml.response.rc.returncode == 0){
	
        			
					window.location = "#rrvua04";
					
        		}else{
        				handleError(invocationResult.faml.response);
        			//window.location = "#login";
        		}
        	 }else{
        		 handleErrorNoResponse();
        	 }
        	}
        	busyInd.hide();
		};

 this.rrvua04Page = function(){

        	accstmtdata = accStmtData();
        
        	self.adhaaraccounts.removeAll();
    	    		$("#contentData").load("Views/Accounts/rrvua04.html", null, function (response, status, xhr) {
							if (status != "error") {}
							ko.applyBindings(self, $(".dynamic-page-content").get(0));
						
		
									account=invocationResult.faml.response.acctdtls;
									$(account).each(function(index, obj) {
									displaytxt = obj.codacctno  +" - "+obj.nambranch;
									accountValue = obj.nambranch+"#"+obj.nambranch+"#"+obj.namccyshrt;
									  self.adhaaraccounts.push({ codacctno: obj.codacctno, displaytxt:displaytxt, accountValue: accountValue });
								   });
								   
								   $("#fldAadharno").val(invocationResult.faml.response.customer.custaadharno);
								    $("#fldAadharno2").val(invocationResult.faml.response.customer.custaadharno);
							
							
					});
};


 this.ContactDetails = function(){
				if(window.navigator.onLine){
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
							onSuccess : rrcadSuccess01,
							onFailure : AdapterFail,	    		
							timeout: timeout
							});
				}
				/* else{
				navigator.notification.alert("Please check your Network connection in setting");
				}	 */
				
				
				 
				
			};
			
			
			rrcadSuccess01 = function(result){
						
    	
			invocationResult = result.invocationResult;
			if(invocationResult.isSuccessful) {
				if(invocationResult.faml.response){	
				if(invocationResult.faml.response.rc.returncode == 0){
		
			
			video_email=invocationResult.faml.response.customer.refcustemail;
			
			video_mobile=invocationResult.faml.response.customer.mobileno;
    	
    			
    		}
    		}
    	}
		 
			};
        
	
		
};
        
        