

var MFViewModel = function () {

	  var self = this;
	    
	    self.SelectVisible = ko.observable(true);   
	    self.SelectVisibleFlag = ko.observable(true); 
	   mflist=  ko.observableArray([]);
	   mfaccountList2=  ko.observableArray([]);
		self.unitholderList = ko.observableArray([]);
        mfaccountList3=  ko.observableArray([]);
	    self.fldUhid = ko.observable();
	    self.mfFundList = ko.observableArray([]);
	    self.mfFundList1 = ko.observableArray([]);
	    self.fldAmcId = ko.observable();
	    self.ashFundList = ko.observableArray([]);
	    self.fldfundname1 = ko.observable();
	    self.txnErrorList = ko.observableArray([]);
	    self.bankAccountList = ko.observableArray([]);
	    self.selBankAcc = ko.observable(); 
		self.siTypeList = ko.observableArray([]);
	    self.txnerror =  ko.observableArray([]);
		self.mfFromAcctNo = ko.observable();
		self.mfFromsiType = ko.observable();
		self.mfFreqList = ko.observable();
		self.mfdetails  = ko.observable();
		self.fundcodeArray =  ko.observableArray([]);
		self.mfdetailslist =  ko.observableArray([]);
        self.txnhistorylist =  ko.observableArray([]);
		self.curramfbalval  = ko.observable();
		self.selAccountmf= ko.observable();
		this.rrsrp01Page = function(){
			reqParams = {};
		
		    	reqParams["fldDeviceId"] = fldDeviceId;
		    	reqParams["fldWebServerId"] = fldWebServerId;
		    	reqParams["fldAppId"] = fldAppId;
		    	reqParams["fldAppServerId"] = fldAppServerId;
		    	reqParams["fldLangId"] = fldLangId;
		    	reqParams["fldModule"] = fldModule;
		    	reqParams["fldSwitchAppId"] = "";
		    	reqParams["fldModule"] = "CH";
		    	reqParams["fldTxnId"] = "SRP";
		    	reqParams["fldLogoffReq"] = "N";
		    	reqParams["fldRoleId"] = "";
		    	reqParams["fldReportDate"] =getCurrdate();
		    	
		    	reqParams["fldScrnSeqNbr"] = "01";
		    	
		    	
		    	reqParams["fldRequestId"] =RegfldRequestId;

		    	fldjsessionid = Regfldjsessionid;
		    	reqParams["fldLoginUserId"] =Regloginuid;
		    	reqParams["fldSessionId"] = Rsessionid;
		    	
		    	
		    	busyInd.show();
		    	var invocationData = {
		    			adapter : "mf",
		        		procedure : "RRSRP01",
		        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
		    	};
		    	
		    	WL.Client.invokeProcedure(invocationData, {
		    		onSuccess : rrsrp01PageSuccess,
		    		onFailure : AdapterFail,	    		
		    		timeout: timeout
		    	});
		
		};
		rrsrp01PageSuccess = function(result){
				invocationResult = result.invocationResult;
				busyInd.hide();
				self.txnerror.removeAll();
				self.mfFundList.removeAll();
				self.siTypeList.removeAll();
	    	//$("#contentData").load("Views/Credit/rracs01.html", null, function (response, status, xhr) {
	           // if (status != "error") {}
	          	if(invocationResult.isSuccessful) {
	        		if(invocationResult.faml.response){	
						if (invocationResult.faml.response.rc!= undefined) {
	        				handleError(invocationResult.faml.response);
	        				window.location =  '#rrasm01';
	        			} else {
						   if(invocationResult.faml.response.txnreply.txnerror!= undefined){
							txnerror1 = invocationResult.faml.response.txnreply.txnerror;
								$(txnerror1).each(function(index, obj) {
											self.txnerror.push({ errdesc: obj.errdesc });	
								});
						   }
						  cardcount =  invocationResult.faml.response.txndata.txn.commonlists;
						  
						  if(typeof(invocationResult.faml.response.txndata.txn.commonlists.unitholderid)=='object'){

								cardcount = invocationResult.faml.response.txndata.txn.commonlists.unitholderid;

								$(cardcount).each(function(index, obj) {
									self.mfFundList.push({ unitholderid: cardcount[index], displaytxt: cardcount[index],accountValue: cardcount[index]   });
									
								});
	        				}
	        				else{

	        					$(cardcount).each(function(index, obj) {
									self.mfFundList.push({ unitholderid: obj.unitholderid, displaytxt: obj.unitholderid,accountValue: obj.unitholderid   });
									
								});
	        				}   
						  
						   
						   /* if(invocationResult.faml.response.txndata.txn.commonlists.unitholderid!= undefined){
							unitholderid = invocationResult.faml.response.txndata.txn.commonlists.unitholderid;
							for (var i in unitholderid) {
									console.log("Test data for MF List "+unitholderid[i]);
									self.mfFundList.push({ unitholderid: unitholderid[i], displaytxt: unitholderid[i],accountValue: unitholderid[i]   });
								}
								
							
						   } */
						   if(invocationResult.faml.response.txndata.txn.commonlists.sitypelist!= undefined){
							sitypelist = invocationResult.faml.response.txndata.txn.commonlists.sitypelist;
							$(sitypelist).each(function(index, obj) {
											self.siTypeList.push({  unitholderid: obj.siid, displaytxt: obj.siname,accountValue: obj.siid });	
								});
								
							
						   }
						   
						   
						  
								
						
						}
					}
					else {
		   	    			
 		   	    		handleError(invocationResult.faml);
        				 window.location =  '#rrasm01';
 		   	    		}
				}
				
				$("#contentData").load("Views/MF/rrsrp01.html", null, function (response, status, xhr) {
		            if (status != "error") {}
		            ko.applyBindings(self, $(".dynamic-page-content").get(0));     
		    	});
		};
		this.rrsrp01Submit = function(){
			
			if($("#rrsrp01").valid()){
				
				reqParams = {};
				var objs = document.getElementById('fldUhid');
				document.getElementById('fldUhid_txt').value = objs.options[objs.selectedIndex].innerHTML;
				reqParams["fldUhid_txt"] = objs.options[objs.selectedIndex].innerHTML;
				var objs = document.getElementById('fldSiType');
				document.getElementById('fldSiType_txt').value = objs.options[objs.selectedIndex].innerHTML;
				reqParams["fldSiType_txt"] = objs.options[objs.selectedIndex].innerHTML;
				//document.getElementById("f1").submit();
		    	reqParams["fldDeviceId"] = fldDeviceId;
		    	reqParams["fldWebServerId"] = fldWebServerId;
		    	reqParams["fldAppId"] = fldAppId;
		    	reqParams["fldAppServerId"] = fldAppServerId;
		    	reqParams["fldLangId"] = fldLangId;
		    	reqParams["fldSwitchAppId"] = "";
		    	reqParams["fldModule"] = "CH";
		    	reqParams["fldTxnId"] = "SRP";
		    	reqParams["fldLogoffReq"] = "N";
		    	reqParams["fldAmcId"] = "ALL";
		    	reqParams["fldRoleId"] = "";
		    	reqParams["fldReportDate"] =getCurrdate();
		    	reqParams["fldSelUhid"] = $("#fldUhid").val();
				reqParams["fldUhid"] = $("#fldUhid").val();
				reqParams["fldFundCode"] = "";  
				reqParams["fldAction"] = 'SEARCH';
				reqParams["fldSchemeSelected"] = "1"; 
				reqParams["fldSiType"] = $("#fldSiType").val();
		    	reqParams["fldScrnSeqNbr"] = "11";
				reqParams["fldFCDBRequestId"] = RegfldRequestId;
				
				reqParams["fldRequestId"] =RegfldRequestId;

		    	fldjsessionid = Regfldjsessionid;
		    	reqParams["fldLoginUserId"] =Regloginuid;
		    	reqParams["fldSessionId"] = Rsessionid;
		    	//fldAppId=RS&fldModule=CH&fldTxnId=SRP&fldLangId=and&fldDeviceId=43&fldScrnSeqNbr=11&fldRequestId=276533973HINEHBPOK103846840KD&fldLogoffReq=N&fldSwitchAppId=&fldSelUhid=&fldFundCode=&fldAction=SEARCH&fldUhid=000000102207&fldSchemeSelected=1&selectScheme=&fldSiType=BUY&fldSessionId=276533973HINEHBPOK
		    	busyInd.show();
		    	var invocationData = {
		    			adapter : "mf",
		        		procedure : "RRSRP11",
		        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
		    	};
		    	
		    	WL.Client.invokeProcedure(invocationData, {
		    		onSuccess : rrsrp01SubmitSuccess,
		    		onFailure : AdapterFail,	    		
		    		timeout: timeout
		    	});
			}
		};
		rrsrp01SubmitSuccess = function(result){
					invocationResult = result.invocationResult;
				
				self.txnerror.removeAll();
				self.siTypeList.removeAll();
				self.fundcodeArray.removeAll();
	    	//$("#contentData").load("Views/Credit/rracs01.html", null, function (response, status, xhr) {
	           // if (status != "error") {}
	          	if(invocationResult.isSuccessful) {
	        		if(invocationResult.faml.response){
							self.mfdetails(invocationResult.faml); 
						if (invocationResult.faml.response.rc!= undefined) {
	        				handleError(invocationResult.faml.response);
	        				window.location =  '#rrwcm01';
	        			} else {
						   if(invocationResult.faml.response.txnreply.txnerror!= undefined){
							txnerror1 = invocationResult.faml.response.txnreply.txnerror;
								$(txnerror1).each(function(index, obj) {
											self.txnerror.push({ errdesc: obj.errordesc });	
								});
						   }
						   
						   
						   if(invocationResult.faml.response.txndata.txn.sitxnlist!= undefined || invocationResult.faml.response.txndata.txn.sitxnlist!= ""){
							sidetails = invocationResult.faml.response.txndata.txn.sitxnlist.sidetails;
							var str1 = 0;
							$(sidetails).each(function(index, obj) {
										
								self.fundcodeArray.push({str1: str1, fundname: obj.fundname,fundid:obj.fundid,noofsi:obj.noofsi, startdate: obj.startdate,sifrequency:obj.sifrequency,tofundname:obj.tofundname, sitype: obj.sitype,siid:obj.siid,sidate:obj.sidate, amcname: obj.amcname,enddate:obj.enddate, txnmode: obj.txnmode,siamount:obj.siamount });
											str1++;
								});
							self.siTypeList(sidetails);
				
						   }else {self.siTypeList(null);}	
						   
						   window.location =  '#rrsrp11';
						   
						   $("#contentData").load("Views/MF/rrsrp11.html", null, function (response, status, xhr) {
								if (status != "error") {}
								
								if(self.fundcodeArray().length > 0){
									$("#fundlisting").show();
									$("#NoOrd").hide();
								}else{
									$("#fundlisting").hide();
									$("#NoOrd").show();
								}
									
								$("#fldUhid").val(invocationResult.faml.request.unitholderid);
								$("#fldSelUhid").val(invocationResult.faml.request.unitholderid);
								$("#fldSiType").val(invocationResult.faml.request.sitype);
								
								$("#fldRequestId").val(invocationResult.faml.mci.requestid);
								ko.applyBindings(self, $(".dynamic-page-content").get(0));
									
							});
						    
						 }
					}
					else {
		   	    			
 		   	    		handleError(invocationResult.faml);
        				 //window.location =  '#rrasm01';
 		   	    		}
				}
	          	busyInd.hide();
				
		};
		
		function getCheckedRadio(radio_group) {
		    for (var i = 0; i < radio_group.length; i++) {
		        var button = radio_group[i];
		        if (button.checked) {
		            return button;
		        }
		    }
		    return undefined;
		}

		this.rrsrp011Submit = function(){
			reqParams = {};
			
			
			var $form = $("#f1");
        	rsaDataArray = $form.serializeArray();    	
        	    	    	
        	
        	for (var i in rsaDataArray) {
        		reqParams[rsaDataArray[i].name] = rsaDataArray[i].value;
        	}
			
			var radioChecked	= false;
			var selIndex		= 0;

	if(document.f1.fldRddelOrder) {
		len = document.f1.fldRddelOrder.length;
		
		i = 0;
		if(!isNaN(len)) 
		{
			while(true) {
				if(i > (len - 1)) {
					break;
				}
				if(document.f1.fldRddelOrder[i].checked == true) {
					
					selIndex = i;
					funddata = self.fundcodeArray();
					$(funddata).each(function(index, obj) {
						if(parseInt(i) == parseInt(obj.str1)){
							document.f1.fldFundCode.value = obj.fundid;	
							reqParams["fldFundCode"] = obj.fundid;
							reqParams["fldRddelOrder"] = obj.siid;	
						}
					});
					
					radioChecked = true;
					
					break;
				}
				i++;
			}
		}
		else { // only one radio button present
			if(!document.f1.fldRddelOrder.checked) {
				radioChecked = false;
			}
			else {
				
				funddata = self.fundcodeArray();
				$(funddata).each(function(index, obj) {
					if(parseInt(i) == parseInt(obj.str1)){
						document.f1.fldFundCode.value = obj.fundid;		
						reqParams["fldFundCode"] = obj.fundid;
						reqParams["fldRddelOrder"] = obj.siid;	
					}
				});
				
								
				radioChecked = true;
				
			}
		}
	}
	else {
		return false;
	}

	if (!radioChecked){
		alert("Check one SI to revoke");
		return false;
	}
	else {	
		
			mfDels = self.mfdetails();
	    	reqParams["fldDeviceId"] = fldDeviceId;
	    	reqParams["fldWebServerId"] = fldWebServerId;
	    	reqParams["fldAppId"] = fldAppId;
	    	reqParams["fldAppServerId"] = fldAppServerId;
	    	reqParams["fldLangId"] = fldLangId;
	    	reqParams["fldModule"] = fldModule;
	    
	    	

	    	fldjsessionid = Regfldjsessionid;
	    	reqParams["fldLoginUserId"] =Regloginuid;
	    	reqParams["fldSessionId"] = Rsessionid;
	    	
	    	busyInd.show();
	    	var invocationData = {
	    			adapter : "mf",
	        		procedure : "RRSRP06",
	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	    	};
	    	//WL.Logger.debug(invocationData, '');
	    	WL.Client.invokeProcedure(invocationData, {
	    		onSuccess : rrsrp011SubmitSuccess,
	    		onFailure : AdapterFail,	    		
	    		timeout: timeout
	    	});
		}
				
		};
		rrsrp011SubmitSuccess = function(result){
				invocationResult = result.invocationResult;
				busyInd.hide();
				if(invocationResult.isSuccessful) {
	        		if(invocationResult.faml.response){
							accStmtData(invocationResult.faml); 
						if (invocationResult.faml.response.rc!= undefined) {
	        				handleError(invocationResult.faml.response);
							
	        				window.location =  '#rrwcm01';
	        			} else {
						  accStmtData(invocationResult.faml);        	
						  window.location = "#rrsrp06";
					}
				}
				else {
		   	    			
 		   	    		handleError(invocationResult.faml);
        				 //window.location =  '#rrasm01';
 		   	    		}
			}
		};
		this.rrsrp06Page = function(){
				mfdtls = accStmtData();
				self.txnerror.removeAll();
				  if(mfdtls.response.txnreply!= undefined){
							txnerror = mfdtls.response.txnreply.txnerror;
								$(txnerror).each(function(index, obj) {
									
											self.txnerror.push({ errdesc: obj.errdesc });	
								});
						   }
				
				 $("#contentData").load("Views/MF/rrsrp06.html", null, function (response, status, xhr) {
								if (status != "error") {}
								ko.applyBindings(self, $(".dynamic-page-content").get(0));
								
								$('#unitholderid').html(mfdtls.request.unitholderid);
								$('#selsitype').html(mfdtls.response.txndata.txn.selsitype);
								$('#amcname').html(mfdtls.response.txndata.txn.sitxnlist.sidetails.amcname);
								$('#fundname').html(mfdtls.response.txndata.txn.sitxnlist.sidetails.fundname);
								$('#cutofftime').html(mfdtls.response.txndata.txn.sitxnlist.sidetails.cutofftime);
								$('#sifreqname').html(mfdtls.response.txndata.txn.sitxnlist.sidetails.sifreqname);
								$('#startdate').html(mfdtls.response.txndata.txn.sitxnlist.sidetails.startdate);
								$('#enddate').html(mfdtls.response.txndata.txn.sitxnlist.sidetails.enddate);	
								if(mfdtls.response.txndata.txn.sitxnlist.sidetails.txnmode == 'AMT'){
											$('#AMT').show();
											$('#AMTV').html(formatAmt(parseFloat(mfdtls.response.txndata.txn.sitxnlist.sidetails.siamount)));	
								}else {
									$('#NAMT').show();
											$('#NAMTV').html(formatAmt(parseFloat(mfdtls.response.txndata.txn.sitxnlist.sidetails.siamount)));	
								}
								$('#noofsi').html(mfdtls.response.txndata.txn.sitxnlist.sidetails.noofsi);
								$('#fldRequestId').val(mfdtls.mci.requestid);
								$('#fldTxnId').val('SRP');
								$('#fldAcceptTerms_txt').val($('#fldAcceptTerms option:selected').val());
								$('#fldSelUhid').val(mfdtls.request.unitholderid);
								$('#fldAction').val('');
								$('#fldUhid').val(mfdtls.request.unitholderid);
								$('#fldSiType').val(mfdtls.request.sitype);
								$('#fldFundCode').val(mfdtls.response.txndata.txn.sitxnlist.sidetails.fundid);
								$('#fldRddelOrder').val(mfdtls.response.txndata.txn.sitxnlist.sidetails.siid);
								$('#fldAccount').val(mfdtls.response.txndata.txn.sitxnlist.sidetails.acctno);
								$('#fldTypeValue').val(mfdtls.response.txndata.txn.sitxnlist.sidetails.siamount);
								$('#fldFrequency').val(mfdtls.response.txndata.txn.sitxnlist.sidetails.sifrequency);
								$('#fldSiDay').val(mfdtls.response.txndata.txn.sitxnlist.sidetails.day);
								$('#fldSiDate').val(mfdtls.response.txndata.txn.sitxnlist.sidetails.generateon);
								$('#fldNoOfInstallment').val(mfdtls.response.txndata.txn.sitxnlist.sidetails.noofsi);
								
								$('#fldStartDate').val(mfdtls.response.txndata.txn.sitxnlist.sidetails.startdate);
								$('#fldEndDate').val(mfdtls.response.txndata.txn.sitxnlist.sidetails.enddate);
								$('#fldToFundCode').val(mfdtls.response.txndata.txn.sitxnlist.sidetails.toidfund);
								$('#fldPurchase').val(mfdtls.response.txndata.txn.sitxnlist.sidetails.txnmode);

								$('#fldFCDBRequestId').val(RegfldRequestId);
					});
				
			};
		this.rrsrp06Submit = function(){
			if($("#f1").valid()){
					busyInd.show();
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

				reqParams["fldAcceptTerms"] = "on";
				reqParams["fldFCDBSessionId"] =$('#fldRequestId').val();
				reqParams["fldTxnId"] = "SRP";
				
				

		    	fldjsessionid = Regfldjsessionid;
		    	reqParams["fldLoginUserId"] =Regloginuid;
		    	reqParams["fldSessionId"] = Rsessionid;
				
				var invocationData = {
		    			adapter : "mf",
		        		procedure : "RRSRP10",
		        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
		    	};
				//WL.Logger.debug(invocationData, '');
		    	WL.Client.invokeProcedure(invocationData, {
		    		onSuccess : rrsrp10SubmitSuccess,
		    		onFailure : AdapterFail,	    		
		    		timeout: timeout
		    	});
			}
		};
		rrsrp10SubmitSuccess = function(result){
				invocationResult = result.invocationResult;
				busyInd.hide();
				if(invocationResult.isSuccessful) {
	        		if(invocationResult.faml.response){
							
						if (invocationResult.faml.response.rc!= undefined) {
	        				handleError(invocationResult.faml.response);
							
	        				window.location =  '#rrwcm01';
	        			} else {
						 accStmtData(invocationResult.faml);        	
						  window.location = "#rrsrp10";
					}
				}
				else {
		   	    			
 		   	    		handleError(invocationResult.faml);
        				 //window.location =  '#rrasm01';
 		   	    		}
			}
		};
		this.rrsrp10Page = function(){
					mfdtls = accStmtData();
					
					
					self.txnerror.removeAll();
					  if(mfdtls.response.txnreply!= undefined){
								txnerror = mfdtls.response.txnreply.txnerror;
									$(txnerror).each(function(index, obj) {
										
												self.txnerror.push({ errdesc: obj.errdesc });	
									});
							   }
					 $("#contentData").load("Views/MF/rrsrp10.html", null, function (response, status, xhr) {
								if (status != "error") {}
								if(mfdtls.response.txnreply.txnerror.warning){
									$('.failure_msg').show();
									$('#msg').html(mfdtls.response.txnreply.txnerror.warning.errdesc);
						}
								
						if(mfdtls.response.txnreply.txnerror.errcode == "0"){
								$('.success_msg').show();
								$('#ThksDiv').show();
								txndate = mfdtls.response.txndata.txn.txndate;
								txndate = txndate.substring(6,8)+"-"+txndate.substring(4,6)+"-"+txndate.substring(0,4); 
								$('#tempdate').html(txndate);
								$('#txnnumber').html(mfdtls.response.txnreply.txnnumber);
								
								accountList.removeAll();
								accountSummList.removeAll();
						}
						
						$('#unitholderid').html(mfdtls.request.unitholderid);
						$('#amcname').html(mfdtls.response.txndata.txn.fundinfo.amcname);
						$('#fundname').html(mfdtls.response.txndata.txn.fundinfo.fundname);
						$('#selsitype').html(mfdtls.response.txndata.txn.selsitype);
						
						
						if(mfdtls.response.txndata.txn.sidetails.txnmode == 'Amount'){
								$('#AMT').show();
								$('#AMTV').html(formatAmt(parseFloat(mfdtls.request.amount)));
						}else {
								$('#NAMT').show();
								$('#NAMTV').html(formatAmt(parseFloat(mfdtls.request.amount)));
						}	
						$('#accountno').html(mfdtls.response.txndata.txn.account.accountno);
								
								
								ko.applyBindings(self, $(".dynamic-page-content").get(0));
					
				
					if(mfdtls.response.txnreply.txnerror.errcode!=0){
								$('#failure_msg').show();
								$('#msg').html(mfdtls.response.txnreply.txnerror.errdesc);
					}
					if(mfdtls.response.txnreply.txnerror.warning){
								$('#failure_msg').show();
								$('#msg').html(mfdtls.response.txnreply.txnerror.warning.errdesc);
					}
					if(mfdtls.response.txnreply.txnerror.errcode==0){
							$('#success_msg').show();
							$('#ThksDiv').show();
							txndate = mfdtls.response.txndata.txn.txndate;
							txndate = txndate.substring(6,8)+"-"+txndate.substring(4,6)+"-"+txndate.substring(0,4); 
							$('#tempdate').html(txndate);
							$('#txnnumber').html(mfdtls.response.txnreply.txnnumber);
							$('#txnnumber').html(mfdtls.response.txnreply.txnnumber);
							
					}
					
					$('#unitholderid').html(mfdtls.request.unitholderid);
					$('#amcname').html(mfdtls.response.txndata.txn.fundinfo.amcname);
					$('#fundname').html(mfdtls.response.txndata.txn.fundinfo.fundname);
					$('#selsitype').html(mfdtls.response.txndata.txn.selsitype);
					
					
					if(mfdtls.response.txndata.txn.sidetails.txnmode == 'Amount'){
							$('#AMT').show();
							$('#AMTV').val(formatAmt(parseFloat(mfdtls.request.amount)));
					}else {
							$('#NAMT').show();
							$('#NAMTV').val(formatAmt(parseFloat(mfdtls.request.amount)));
					}	
					$('#accountno').html(mfdtls.response.txndata.txn.account.accountno);

				});
		
		};
		this.rrtxa01Page = function(){
				reqParams = {};
		
		    	reqParams["fldDeviceId"] = fldDeviceId;
		    	reqParams["fldWebServerId"] = fldWebServerId;
		    	reqParams["fldAppId"] = fldAppId;
		    	reqParams["fldAppServerId"] = fldAppServerId;
		    	reqParams["fldLangId"] = fldLangId;
		    	reqParams["fldModule"] = fldModule;
		    	reqParams["fldSwitchAppId"] = "";
		    	reqParams["fldModule"] = "CH";
		    	reqParams["fldTxnId"] = "TXA";
		    	reqParams["fldLogoffReq"] = "N";
		    	reqParams["fldAmcId"] = "ALL";
		    	reqParams["fldRoleId"] = "";
		    	reqParams["fldReportDate"] =getCurrdate();
		    	  
		    	reqParams["fldScrnSeqNbr"] = "01";
		    	reqParams["fldFCDBSessionId"] = RegfldRequestId;
		    	
		    	reqParams["fldRequestId"] =RegfldRequestId;

		    	fldjsessionid = Regfldjsessionid;
		    	reqParams["fldLoginUserId"] =Regloginuid;
		    	reqParams["fldSessionId"] = Rsessionid;
		    	
		    	busyInd.show();
		    	var invocationData = {
		    			adapter : "mf",
		        		procedure : "RRTXA01",
		        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
		    	};
		    	
		    	WL.Client.invokeProcedure(invocationData, {
		    		onSuccess : txa01Success,
		    		onFailure : AdapterFail,	    		
		    		timeout: timeout
		    	});
		};
		txa01Success = function(result){
				invocationResult = result.invocationResult;
				
				if(invocationResult.isSuccessful) {
	        		if(invocationResult.faml.response){
	        			if (invocationResult.faml.response.rc != undefined) {
	        				handleError(invocationResult.faml.response);
							
	        				window.location =  '#rrasm01';
	        			}	
	        			else if (invocationResult.faml.response.response.rc != undefined) {
	        				handleError(invocationResult.faml.response);
							
	        				window.location =  '#rrasm01';
	        			} else {
						
	        				self.unitholderList.removeAll();
	        				self.mfFundList.removeAll();	
	        				
						 $("#contentData").load("Views/MF/rrtxn01.html", null, function (response, status, xhr) {
								if (status != "error") {}
										// self.mfdetails(invocationResult.faml);  
								
							if(invocationResult.faml.response.response.txnreply.txnerror){
							  if(invocationResult.faml.response.response.txnreply.txnerror.errcode!=0){
									$('#msg').html(invocationResult.faml.response.response.txnreply.txnerror.errdesc);
								}
							}
						   cardcount =  invocationResult.faml.response.response.txndata.txn.commonlists;
						   
							if(typeof(invocationResult.faml.response.response.txndata.txn.commonlists.unitholderid)=='object'){

								cardcount = invocationResult.faml.response.response.txndata.txn.commonlists.unitholderid;

	        					   $(cardcount).each(function(index, obj) {
	   								self.unitholderList.push({ unitholderid: cardcount[index], displaytxt: cardcount[index],accountValue: cardcount[index]   });
	   								
	   							});	
	        				}
	        				else{

	        					   $(cardcount).each(function(index, obj) {
	   								self.unitholderList.push({ unitholderid: obj.unitholderid, displaytxt: obj.unitholderid,accountValue: obj.unitholderid   });
	   								
	   							});	
	        				}   
						   
						
						   
						   Amclist =  invocationResult.faml.response.response.txndata.txn.commonlists.amcdetails;
						   self.mfFundList.push({ amcid: "ALL", amcname: "All Mutual Funds"});						   
	        				$(Amclist).each(function(index, obj) {
	        					self.mfFundList.push({ amcid: obj.amcid, amcname: obj.amcname});
	        				});
							$('#fldFundName').val(invocationResult.faml.request.fldfundname2);
							$('#fldfromdate').val(invocationResult.faml.request.fldfromdate);
							$('#fldtodate').val(invocationResult.faml.request.fldtodate);
							$('#fldFundCode').val(invocationResult.faml.request.fldfundcode2);
							
							if(invocationResult.faml.request.fldAmcId != '' && invocationResult.faml.request.fldAmcId != undefined){
								$("#fldAmcId").val(invocationResult.faml.request.fldAmcId);
								self.mfFromAcctNo(invocationResult.faml.request.fldAmcId);
							}
							if(invocationResult.faml.request.fldUhid != '' && invocationResult.faml.request.fldUhid != undefined){
								$("#fldUhid").val(invocationResult.faml.request.fldUhid);
								self.mfFromsiType(invocationResult.faml.request.fldUhid);
							}
							
	        				$('#fldFCDBRequestId').val(invocationResult.faml.response.mci.requestid);
	        				
	        				ko.applyBindings(self, $(".dynamic-page-content").get(0));
	        				
						 });
					}
				}
				else {
		   	    			
 		   	    		handleError(invocationResult.faml);
        				 //window.location =  '#rrasm01';
 		   	    		}
			}
				busyInd.hide();
		};
		this.rrtxn01Submit = function(){
		
			var flc=0;
			
			if(clkBtn == 'Search'){
			
        		$("#fldTxnId").val("ASH");
        		$("#fldScrnSeqNbr").val("02");
        		flc=1;
        	}else{
			
        		
			fldUhidV = $("#fldUhid").val();
            fldAmcIdV = $("#fldAmcId").val();
            fldfromdateV = $("#fldfromdate").val();
            fldtodateV = $("#fldtodate").val();
			
			if ($.trim(fldUhidV) == '' || $.trim(fldUhidV) == null) {
                    alert("Please Select Mutual Fund Account");
                    return false;
                }
				if ($.trim(fldAmcIdV) == '' || $.trim(fldAmcIdV) == null) {
                    alert("Please Enter Mutual Fund Name");
                    return false;
                }
				if ($.trim(fldfromdateV) == '' || $.trim(fldfromdateV) == null) {
                    alert("Please Select From Date");
                    return false;
                }
				if ($.trim(fldtodateV) == '' || $.trim(fldtodateV) == null) {
                    alert("Please Select To Date");
                    return false;
                }
        		$("#fldTxnId").val("TXA");
        		$("#fldScrnSeqNbr").val("03");
        		
        		fldUhid = $("#fldUhid").val();
        		$("#fldSelUhid").val(fldUhid);
        		flc=1;
				fromdt = $("#fldfromdate").val();
				todt = $("#fldtodate").val();
				arrfromdt = fromdt.split("/");
				arrtodt = todt.split("/");
				
				startdt = arrfromdt[2]+"-"+arrfromdt[1]+"-"+arrfromdt[0];
				enddt = arrtodt[2]+"-"+arrtodt[1]+"-"+arrtodt[0];
				start = new Date(startdt);
				end = new Date(enddt);
				
				if(start > end){
					alert("From Date cannot be greater than To Date");
					flagerr = false;	
				}
        		
        	}
			
			
				if(flc){
				
				flagerr = true;	
	    		
				/*
				*/
				if(flagerr){
            
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
		    	reqParams["fldReportDate"] =getCurrdate();
		    	reqParams["fldRequestId"] =RegfldRequestId;

		    	fldjsessionid = Regfldjsessionid;
		    	reqParams["fldLoginUserId"] =Regloginuid;
		    	reqParams["fldSessionId"] = Rsessionid;
		    	
		    	
		    	busyInd.show();
		    	
		    	if(clkBtn == 'Search'){
		        	var invocationData = {
			    			adapter : "mf",
			        		procedure : "RRASH02",
			        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
			    	};
		        	
		        	WL.Client.invokeProcedure(invocationData, {
		        		onSuccess : self.rrash02Response,
		        		onFailure : AdapterFail,
		        		timeout: timeout
		        	});
	        	
	        	}else{
			    	var invocationData = {
			    			adapter : "mf",
			        		procedure : "RRTXA03",
			        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
			    	};
			    	
			    	WL.Client.invokeProcedure(invocationData, {
			    		onSuccess : rrtxn01SubmitSuccess,
			    		onFailure : AdapterFail,	    		
			    		timeout: timeout
			    	});
	        	}
			
		}
		}
		};
		
		
		rrtxn01SubmitSuccess =  function(result){
				invocationResult = result.invocationResult;
				
				if(invocationResult.isSuccessful) {
	        		if(invocationResult.faml.response){
							
						if (invocationResult.faml.response.rc != undefined) {
	        				handleError(invocationResult.faml.response);
							
	        				window.location =  '#rrwcm01';
	        			} else {
	        				accStmtData(invocationResult.faml);       	
						  window.location = "#rrtxa03";
					}
				}
					else {
		   	    			
 		   	    		handleError(invocationResult.faml);
        				 //window.location =  '#rrasm01';
 		   	    		}
			}
		};
		this.rrtxa03Page = function(){
				mfdtls = accStmtData();
				self.mfFundList.removeAll();
				
				 $("#contentData").load("Views/MF/rrtxn03.html", null, function (response, status, xhr) {
						
					 if(mfdtls.response.response.txndata.txn.txndetails){
						 $("#histcont").show();
						 $("#txnNotAvl").hide();
						 
						 self.txnhistorylist.removeAll();
						 txndata = mfdtls.response.response.txndata.txn.txndetails;
						 
						 $(txndata).each(function(index, obj) {
								self.txnhistorylist.push({ txndate: obj.txndate, amcname: obj.amcname,tofundid: obj.tofundid,fundname:obj.fundname, tofundid: obj.tofundid, txntype: obj.txntype, affectedunits: obj.affectedunits, txnnav: obj.txnnav, txnccyamount: obj.txnccyamount, ordertype: obj.ordertype });
								
							});	
						
					 }else{
						 $("#histcont").hide();
						 $("#txnNotAvl").show();
					 }
					 
					 ko.applyBindings(self, $(".dynamic-page-content").get(0));
				 });
				 busyInd.hide();
		};
		this.rrsip01Page = function(){
				reqParams = {};
		
		    	reqParams["fldDeviceId"] = fldDeviceId;
		    	reqParams["fldWebServerId"] = fldWebServerId;
		    	reqParams["fldAppId"] = fldAppId;
		    	reqParams["fldAppServerId"] = fldAppServerId;
		    	reqParams["fldLangId"] = fldLangId;
		    	reqParams["fldModule"] = "CH";
		    	reqParams["fldSwitchAppId"] = "";
		    	reqParams["fldModule"] = "CH";
		    	reqParams["fldTxnId"] = "SIP";
		    	reqParams["fldLogoffReq"] = "N";
		    	reqParams["fldAmcId"] = "ALL";
		    	reqParams["fldRoleId"] = "";
		    	reqParams["fldReportDate"] =getCurrdate();
		    	  
		    	reqParams["fldScrnSeqNbr"] = "01";
				reqParams["fldCardNo"] = "";
				reqParams["fldAcctNo"] = "";
				reqParams["fldUhid"] = "";
				reqParams["fldDpId"] = "";
		    	
				
				reqParams["fldRequestId"] =RegfldRequestId;

		    	fldjsessionid = Regfldjsessionid;
		    	reqParams["fldLoginUserId"] =Regloginuid;
		    	reqParams["fldSessionId"] = Rsessionid;
				
		    	busyInd.show();
		    	var invocationData = {
		    			adapter : "mf",
		        		procedure : "RRSIP01",
		        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
		    	};
		    	
		    	WL.Client.invokeProcedure(invocationData, {
		    		onSuccess : rrsip01Success,
		    		onFailure : AdapterFail,	    		
		    		timeout: timeout
		    	});
		};
		rrsip01Success = function(result){
			//self.mfdetailslist.removeall();
				invocationResult = result.invocationResult;
				busyInd.hide();
				if(invocationResult.isSuccessful) {
	        		if(invocationResult.faml.response){
							
						if (invocationResult.faml.response.rc!= undefined) {
	        				handleError(invocationResult.faml.response);
							
	        				window.location =  '#rrasm01';
	        			} else {
							self.txnerror.removeAll();
							 if(invocationResult.faml.response.txnreply.txnerror!= undefined){
										txnerror = invocationResult.faml.response.txnreply.txnerror;
											$(txnerror).each(function(index, obj) {
														self.txnerror.push({ errdesc: obj.errordesc });	
											});
							}
							cardcount =  invocationResult.faml.response.txndata.txn.commonlists;
							
							if(typeof(invocationResult.faml.response.txndata.txn.commonlists.unitholderid)=='object'){

								cardcount = invocationResult.faml.response.txndata.txn.commonlists.unitholderid;

								$(cardcount).each(function(index, obj) {
									self.mfFundList.push({ unitholderid: cardcount[index], displaytxt: cardcount[index],accountValue:  cardcount[index]   });
									
								});
	        				}
	        				else{

	        					$(cardcount).each(function(index, obj) {
									self.mfFundList.push({ unitholderid: obj.unitholderid, displaytxt: obj.unitholderid,accountValue: obj.unitholderid   });
									
								});
	        				}  
						   
						   
						   
						   
						Amclist =  invocationResult.faml.response.txndata.txn.commonlists.amcdetails;
						   $(Amclist).each(function(index, obj) {
								self.mfdetailslist.push({ displaytxt: obj.amcname,accountValue: obj.amcid   });
								
							});	
						 // self.mfdetails(invocationResult.faml);        	
						  $("#contentData").load("Views/MF/rrsip01.html", null, function (response, status, xhr) {
									if (status != "error") {}	               
										$('#fldFundName').val(invocationResult.faml.request.fldfundname);
										$('#fldFCDBRequestId').val(invocationResult.faml.mci.requestid);
										$('#fldSelUhid').val(invocationResult.faml.response.txndata.txn.commonlists.unitholderid);
										ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
								});
					}
				}
				else {
		   	    			
 		   	    		handleError(invocationResult.faml);
        				 window.location =  '#rrasm01';
 		   	    		}
			}
		};
		this.rrsip01Submit = function(){
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
		    	reqParams["fldReportDate"] =getCurrdate();
		    	
		    	reqParams["fldRequestId"] =RegfldRequestId;

		    	fldjsessionid = Regfldjsessionid;
		    	reqParams["fldLoginUserId"] =Regloginuid;
		    	reqParams["fldSessionId"] = Rsessionid;
		    	
		    	
		    	busyInd.show();
		    	var invocationData = {
		    			adapter : "mf",
			 		    procedure : "RRASH02",
		        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
		    	};
		    	
		    	WL.Client.invokeProcedure(invocationData, {
		    		onSuccess : self.rrash02Response,
		    		onFailure : AdapterFail,	    		
		    		timeout: timeout
		    	});
			}
		};
		rrsip01SubmitSuccess = function(result){
				invocationResult = result.invocationResult;
				busyInd.hide();
				if(invocationResult.isSuccessful) {
	        		if(invocationResult.faml.response){
							
						if (invocationResult.faml.response.rc!= undefined) {
	        				handleError(invocationResult.faml.response);
							
	        				window.location =  '#rrwcm01';
	        			} else {
						  self.mfdetails(invocationResult.faml);        	
						  window.location = "#rrsip02";
					}
				}
				else {
		   	    			
 		   	    		handleError(invocationResult.faml);
        				 //window.location =  '#rrasm01';
 		   	    		}
			}
		};
		
		/*
		this.rrsip02Page = function(){
				mfdtls = self.mfdetails();
				
				 frequency =  invocationResult.faml.response.txndata.txn.commonlists.frequency;
				 
				 self.txnerror.removeAll();
				 if(invocationResult.faml.response.txnreply.txnerror!= undefined){
							txnerror = invocationResult.faml.response.txnreply.txnerror;
								$(txnerror).each(function(index, obj) {
											self.txnerror.push({ errdesc: obj.errordesc });	
								});
				 
				 
				 
				 self.mfFreqList(frequency);
						   $(frequency).each(function(index, obj) {
								if(obj.freqname == mfdtls.request.sifrequency){
										self.mfFundList.push({ displaytxt: obj.freqname ,accountValue: obj.freqid   });
								}else{
										self.mfFundList.push({ displaytxt: obj.freqname ,accountValue: obj.freqid   });
								}
								
								
							});
							 $(mfdtls.response.txndata.txn.commonlists.days).each(function(index, obj) {
										daysInput += obj.daynum+""+obj.day;
							 });
							 
							  $(mfdtls.response.txndata.txn.commonlists.account).each(function(index, obj) {
								  self.fldAmcId.push({ displaytxt: obj.accountno ,accountValue: obj.accountno   });
							  });
						
						
				$("#contentData").load("Views/MF/rrsip02.html", null, function (response, status, xhr) {
									if (status != "error") {}	
									
									
										if(mfdtls.response.txndata.txn.fundinfo){
													$('#fndinfo').show();
												$('#InvldFund').hide();	
											}else{
													$('#fndinfo').hide();
													$('#InvldFund').show();	
											}
										$('#unitholderid').html(mfdtls.request.unitholderid);
										$('#amcname').html(mfdtls.response.txndata.txn.fundinfo.amcname);
										$('#fundname').html(mfdtls.response.txndata.txn.fundinfo.fundname);
										$('#navdate').html(formatAmt(parseFloat(mfdtls.response.txndata.txn.fundinfo.nav))+" as on "+mfdtls.response.txndata.txn.fundinfo.navdate);
										$('#cutofftime').html(mfdtls.response.txndata.txn.fundinfo.cutofftime);
										$('#hid_strdays').val(daysInput);
										if(mfdtls.response.txndata.txn.fundinfo.currentholdingamt){
												$('#currentholdingamt').html(formatAmt(parseFloat(mfdtls.response.txndata.txn.fundinfo.currentholdingamt)));
										}else{
												$('#currentholdingamt').html('0.00');
										}
										if(mfdtls.request.screenSelectionTemp=='done'){$('#fldCodTxn').val('BUY')}
										else{
											$('#fldCodTxn').val(mfdtls.request.fldCodTxn)
										}
										$('#fldUhid').val(mfdtls.request.unitholderid);
										$('#fldFundCode').val(mfdtls.request.fundid);
										$('#fldAmcId').val(mfdtls.request.fldAmcId);
										$('#fldFundName').val(mfdtls.response.txndata.txn.fundinfo.fundname);
										$('#fldFundCurr').val(mfdtls.response.txndata.txn.fundinfo.fundcurr);
										$('#fldSettlementDate').val(mfdtls.response.txndata.txn.fundinfo.settlementdate);
										$('#fldIsin').val(mfdtls.response.txndata.txn.fundinfo.isin);
										$('#fldfundname2').val(mfdtls.request.fldfundname2);
										$('#fldfundcode2').val(mfdtls.request.fldfundcode2);
										$('#fldFCDBRequestId').val(RegfldRequestId);
										
										
										
									
										ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
						});
		};*/
		
		this.loadrrsip02 = function(result){
		//alert('Check');
							busyInd.hide(); 
							self.mfFundList.removeAll();
							self.mfFundList1.removeAll();
	 		 		    	invocationResult = result.invocationResult;
		 		        	if(invocationResult.isSuccessful) {
		 		        		if(invocationResult.faml.response){	        			
		 		        			accstmtdata=invocationResult;  
		 		    	    			window.location = "#rrsip02"; 
		 		    	    			if (accstmtdata.faml.response.txndata.txn.fundinfo!=undefined){
		 		 		 		    		unitholderid = accstmtdata.faml.request.unitholderid;
		 		 		 		    		amcname      = accstmtdata.faml.response.txndata.txn.fundinfo.amcname;
		 		 		 		    		fundname = accstmtdata.faml.response.txndata.txn.fundinfo.fundname;
		 		 		 		    		navandnavdate = formatAmt(parseFloat(accstmtdata.faml.response.txndata.txn.fundinfo.nav)) +" as on "+accstmtdata.faml.response.txndata.txn.fundinfo.navdate;
		 		 		 		    		cutofftime = accstmtdata.faml.response.txndata.txn.fundinfo.cutofftime;
		 		 		 		    		account = accstmtdata.faml.response.txndata.txn.account.accountno;

		 		 		 		    		//var currentholdingamt="0.00";
		 		 		 		    		//if(accstmtdata.faml.response.txndata.txn.fundinfo.currentholdingamt!=""){
		 		 		 		    			//currentholdingamt=accstmtdata.faml.response.txndata.txn.fundinfo.currentholdingamt;
		 		 		 		    			
		 		 		 		    		//}
		 		 		 		    		 frequency =  accstmtdata.faml.response.txndata.txn.commonlists.frequency;
											 //self.mfFreqList(frequency);
		 		 		 		    		 
													   $(frequency).each(function(index, obj) {
															
																	self.mfFundList1.push({ displaytxt: obj.freqname ,accountValue: obj.freqid,freqid:obj.freqid,freqname: obj.freqname ,minsitxnamt: obj.minsitxnamt ,noofsi: obj.noofsi ,minsitxnunits: obj.minsitxnunits,date:obj.date  });
																	//self.mfFundList.push({ unitholderid: obj.unitholderid, displaytxt: obj.unitholderid,accountValue: obj.unitholderid   });

																	
															
											});
										
											$(accstmtdata.faml.response.txndata.txn.commonlists.account).each(function(index, obj) {
												  self.bankAccountList.push({ displaytxt: obj.accountno ,accountValue: obj.accountno   });
											  });	
												var currentholdingamt="0.00";
												if(accstmtdata.faml.response.txndata.txn.fundinfo.currentholdingamt!=""){
													currentholdingamt=formatAmt(parseFloat(accstmtdata.faml.response.txndata.txn.fundinfo.currentholdingamt));
													
												}
		 		 		 		    		
		 		 		 		    		
		 		 		 		    	}
		 		        		}
								else {
		 		   	    			
			 		   	    		handleError(invocationResult.faml);
			        				 //window.location =  '#rrasm01';
									busyInd.hide();
			 		   	    		}	
		 		        	}
		 		        
	 		 		    	
	 		 		    	
	 		 		    	$("#contentData").load("Views/MF/rrsip02.html", null, function (response, status, xhr) {
	 		 		            if (status != "error") {}
	 		 		            
	 		 		          daysInput = '';
								 $(accstmtdata.faml.response.txndata.txn.commonlists.days).each(function(index, obj) {
										//daysInput += obj.daynum+""+obj.day;
										daysInput +='<option value="' + obj.daynum + '">' + obj.day + '</option>';
									});
								 $("#fldSiDay").append(daysInput);
	 		 		            
	 		 		            if(accstmtdata.faml.response.txndata.txn.fundinfo.currentholdingamt){
												$('#currentholdingamt').html(formatAmt(parseFloat(accstmtdata.faml.response.txndata.txn.fundinfo.currentholdingamt)));
										}else{
												$('#currentholdingamt').html('0.00');
										}
	 		 		            
	 		 		            if(accstmtdata.faml.request.screenSelectionTemp!=undefined){
										if(accstmtdata.faml.request.screenSelectionTemp=='done'){$('#fldCodTxn').val('BUY')}
										else{
											$('#fldCodTxn').val(accstmtdata.faml.request.txnid);
										}
	 		 		            }else{
	 		 		            	$('#fldCodTxn').val(accstmtdata.faml.request.txnid)
	 		 		            }
	 		 		            
	 		 		          daysInput = '';
								 $(accstmtdata.faml.response.txndata.txn.commonlists.days).each(function(index, obj) {
										//daysInput += obj.daynum+""+obj.day;
										daysInput +='<option value="' + obj.daynum + '">' + obj.day + '</option>';
									});
								 $("#fldSiDay").append(daysInput);
	 		 		            
	 		 		            $("#unitholderid1").html(unitholderid);
	 		 		            $("#amcname1").html(amcname);
	 		 		        	//$("#fundname").html(formatAmt(parseFloat(fldamttxn)));
	 		 		        	$("#fundname1").html(fundname);
	 		 		        	
	 		 		        	$("#navandnavdate").html(navandnavdate);
	 		 		        	$("#cutofftime").html(cutofftime);
								if(daysInput!= undefined || daysInput == '')
								$("#hid_strdays").val(daysInput);
								else
								$("#hid_strdays").val('');
	 		 		        	$("#currentholdingamt").html(cutofftime);
								$("#account").html(account);
	 		 		        	$("#fldFCDBRequestId").val(RegfldRequestId);
	 		 		        	
								$('#fldUhid').val(unitholderid);
								$('#fldFundCode').val(accstmtdata.faml.request.fundid);
								$('#fldFundname').val(fundname);
								$('#fldAccount').val(accstmtdata.faml.response.txndata.txn.commonlists.account.accountno);
								
								$('#fldAmcId').val(accstmtdata.faml.request.amcid);
								$('#fldfundname2').val(accstmtdata.faml.response.txndata.txn.fundinfo.fundname);
								$('#fldfundcode2').val(accstmtdata.faml.request.fundid);								
									
								


								 if(accstmtdata.faml.response.txndata.txn.fundinfo)
	 		 		        	 $("#fndinfo").show();
								

	 		 		            ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
	 		 		        });
	 		 			    
	 		 			    
	 	};
		this.rrsip02Submit = function(){

			
			
				
				var objs = document.getElementById('fldAccount');
        		errflag = true;
        
        		
        		
			
			
			document.getElementById('fldAccount_txt').value = objs.options[objs.selectedIndex].innerHTML;
			
			var freqnm = document.getElementById('fldFrequency').value;
			var redigit = /^[0-9]+$/;
			if(freqnm == '')
			{
				alert('Please select si frequency');
				errflag = false;
				return false;
			}
			
			else if(document.f1.fldSiDay.selectedIndex == 0 && document.f1.fldSiDate.selectedIndex == 0) {
				
				alert("Please select either Days or Date");
				//document.f1.fldSiDate.focus();
				errflag = false;
				return false;
			}
				
			else if($("#fldTypeValue").val() == '')
			{
				
				alert("Please Enter Amount");
				errflag = false;
				return false;
				
			}
			else if(!redigit.test($("#fldTypeValue").val())){
				alert("Please Enter Numeric Amount");
				errflag = false;
				return false;
			}
			else if(parseInt($("#fldTypeValue").val()) <  parseInt($("#fldMinAmount").val())){
				alert("Specified amount is less than the minimum amount required");
					errflag = false;
					return false;
				}
			else if($("#fldNoOfInstallment").val() == '')
			{
				alert("Please Enter No. of Installment");
				errflag = false;
				return false;
			}
			else if(parseInt($("#fldNoOfInstallment").val()) <  parseInt($("#fldNoofsi").val())){
				alert("Specified No. of Installment is less than the minimum  Installment");
					errflag = false;
					return false;
				}
			else if(!redigit.test($("#fldNoOfInstallment").val())){
				alert("Please Enter Numeric No. of Installment");
				errflag = false;
				return false;
			}
			
			
			
			
			
			//var objs1 = document.getElementById('fldSiDay');
			///document.getElementById('fldSiDay_txt').value = objs1.options[objs1.selectedIndex].innerHTML;
			
			//var objs2 = document.getElementById('fldSiDate');
			//document.getElementById('fldSiDate_txt').value = objs2.options[objs2.selectedIndex].innerHTML;		
			
			
			if(errflag){
				if($("#f1").valid()){
				busyInd.show();   
		
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
	
	
		
	reqParams["fldRequestId"] =RegfldRequestId;

	fldjsessionid = Regfldjsessionid;
	reqParams["fldLoginUserId"] =Regloginuid;
	reqParams["fldSessionId"] = Rsessionid;
	
	reqParams["fldSwitchAppId"] = "";
	reqParams["fldLogoffReq"] = "N";
	reqParams["hello1"] = "";
	
	//fldAppId=RS&fldTxnId=SIP&fldCodTxn=SIP&fldFundId=&fldSelUhid=&fldScrnSeqNbr=02&fldSessionId=374247259APLQBUHSK&fldSwitchAppId=&fldLogoffReq=N&fldRequestId=&fldAction=&fldFromTxn=&fldFundCriteria=&fldFundCode=BTAXDP&fldParentForm=frmOrderBuy&fldSubmitForm=Y&fldUhid=000000011000&fldAmcId=BIRLAAMC&fldFundName=Birla+Sun+Life+Tax+Relief+96
	var invocationData = {
			adapter : "mf",
    		procedure : "RRSIP04",
    		parameters : [fldjsessionid,reqParams,ipadd],
    		compressResponse : true
	};
	
	//WL.Logger.debug(invocationData, '');
	WL.Client.invokeProcedure(invocationData, {
		onSuccess : rrsip02SubmitResponse,
		onFailure : AdapterFail,
		timeout: timeout
	});
	
			}
			}
			
			

			
			
		};
		
		
		
		
		
		rrsip02SubmitResponse = function(result){
				invocationResult = result.invocationResult;
				busyInd.hide();
				if(invocationResult.isSuccessful) {
	        		if(invocationResult.faml.response){
							
						if (invocationResult.faml.response.rc!= undefined) {
	        				handleError(invocationResult.faml.response);
							
	        				//window.location =  '#rrwcm01';
	        			} else {
						  accStmtData(invocationResult.faml);        	
						  window.location = "#rrsip04";
					}
				}
				else {
		   	    			
 		   	    		handleError(invocationResult.faml);
        				 //window.location =  '#rrasm01';
 		   	    		}
			}
		};
		this.rrsip04Page = function(){
				mfdtls =  accStmtData();
				self.txnerror.removeAll();
					txnerror = mfdtls.response.txnreply.txnerror;
										$(txnerror).each(function(index, obj) {
													//alert("errors "+obj.errdesc);
													self.txnerror.push({ errdesc: obj.errdesc });	
										});
					 $("#contentData").load("Views/MF/rrsip04.html", null, function (response, status, xhr) {
						if (status != "error") {}	                
							ko.applyBindings(self, $(".dynamic-page-content").get(0));
							$("#fldFCDBRequestId").val(RegfldRequestId);
							$('#unitholderid').html(mfdtls.request.unitholderid);
							
							$('#selectedamount').html(formatAmt(parseFloat(mfdtls.request.amount)));
						
								
							$('#amcname').html(mfdtls.response.txndata.txn.fundinfo.amcname);
							$('#fundname').html(mfdtls.response.txndata.txn.fundinfo.fundname);
							$('#cutofftime').html(mfdtls.response.txndata.txn.fundinfo.cutofftime);
							$('#sifrequency').html(mfdtls.response.txndata.txn.sidetails.sifrequency);
							$('#day').html(mfdtls.request.day);
							$('#date').html(mfdtls.request.date);
							$('#installments').html(mfdtls.response.txndata.txn.sidetails.installments);
							$('#enddate').html(mfdtls.response.txndata.txn.sidetails.enddate);
							$('#startdate').html(mfdtls.response.txndata.txn.sidetails.startdate);
							$('#accountno').html(mfdtls.response.txndata.txn.account.accountno);
							
							$('#fldUhid').val(mfdtls.request.unitholderid);
							$('#unitholderid').val(mfdtls.request.unitholderid);
							$('#fldAccount').val(mfdtls.response.txndata.txn.account.accountno);
							$('#fldFundCode').val(mfdtls.request.fundid);
							$('#fldAmcId').val(mfdtls.request.amcid);
							$('#fldPartialFull').val(mfdtls.request.partialfull);
							$('#fldAmount').val(mfdtls.request.selectedamount);
							$('#fldTypeValue').val(mfdtls.request.amount);
							
							$('#fldUnits').val(mfdtls.request.selectedunits);
							$('#fldSiDay').val(mfdtls.request.day);
							$('#fldSiDate').val(mfdtls.request.date);
							$('#fldFrequency').val(mfdtls.request.sifrequency);
							$('#fldNoOfInstallment').val(mfdtls.request.installments);
							$('#fldStartDate').val(mfdtls.response.txndata.txn.sidetails.startdate);
							$('#fldEndDate').val(mfdtls.response.txndata.txn.sidetails.enddate);
		
			
							
					});			
				
		};
		this.rrsip04Submit = function(){
			if($("#f1sip04").valid()){
				
				var objs = document.getElementById('fldAcceptTerms');
				document.getElementById('fldAcceptTerms_txt').value = objs.options[objs.selectedIndex].innerHTML;
				
		
				busyInd.show();        	
	    
				var $form = $("#f1sip04");
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
						adapter : "mf",
						procedure : "RRSIP08",
						parameters : [fldjsessionid,reqParams,ipadd],
						compressResponse : true
				};
				
				//WL.Logger.debug(invocationData, '');
				WL.Client.invokeProcedure(invocationData, {
					onSuccess : rrsip08SubmitResponse,
					onFailure : AdapterFail,
					timeout: timeout
				});
			}
		};
		rrsip08SubmitResponse = function(result){
				invocationResult = result.invocationResult;
				busyInd.hide();
				if(invocationResult.isSuccessful) {
	        		if(invocationResult.faml.response){
							
						if (invocationResult.faml.response.rc!= undefined) {
	        				handleError(invocationResult.faml.response);
							
	        				//window.location =  '#rrwcm01';
	        			} else {
						  accStmtData(invocationResult.faml);        	
						  window.location = "#rrsip08";
					}
				}
				else {
		   	    			
 		   	    		handleError(invocationResult.faml);
        				 //window.location =  '#rrasm01';
 		   	    		}
			}
		};
		
		this.rrsip08Page = function(){
				mfdtls = accStmtData();
				self.txnerror.removeAll();
				txnerror = mfdtls.response.txnreply.txnerror;
									$(txnerror).each(function(index, obj) {
										if(obj.errcode!=0){
												//alert("errors "+obj.errdesc);
												self.txnerror.push({ errdesc: obj.errdesc });
										}
									});
					 $("#contentData").load("Views/MF/rrsip08.html", null, function (response, status, xhr) {
						if (status != "error") {}	
						
						accountList.removeAll();
						accountSummList.removeAll();
						
						  	     // if(mfdtls.response.txnreply.txnerror.errcode==0){
										$('#infobox').show();
										$('#txnnumber').html(mfdtls.response.txnreply.txnnumber);
											txndate = mfdtls.response.txndata.txn.txndate;
											txndate = txndate.substring(6,8)+"-"+txndate.substring(4,6)+"-"+txndate.substring(0,4); 
											$('#tempdate').html(txndate);
										if(mfdtls.response.txnreply.txnerror.errcode!=0){
												$('#errdescmsg').html(mfdtls.response.txnreply.txnerror.errdesc);
										}
										if(mfdtls.response.txnreply.txnerror.warning){
												$('#warningmsg').html(mfdtls.response.txnreply.txnerror.warning.errdesc);
										}
										
							
										 // $('#selectedamount').html(formatAmt(parseFloat(mfdtls.response.txndata.txn.fundinfo.selectedamount)));
										
										  $('#unitholderid').html(mfdtls.request.unitholderid);
										  $('#amcname').html(mfdtls.response.txndata.txn.fundinfo.amcname);
										  $('#fundname').html(mfdtls.response.txndata.txn.fundinfo.fundname);
										  $('#cutofftime').html(mfdtls.response.txndata.txn.fundinfo.cutofftime);
										if(mfdtls.request.partialfull=='P'){
												$('#swtchType').html('Switch Type');
												$('#STwchName').html('Partial');
										}else if(mfdtls.request.partialfull=='F'){
												$('#swtchType').html('Switch Type');
												$('#STwchName').html('Full');
										}else {
												$('#swtchType').html('Redemption Type');
												$('#STwchName').html('-');
										}
										
										
										
										$('#sifrequency').html(mfdtls.response.txndata.txn.sidetails.sifrequency);
										$('#day').html(mfdtls.response.txndata.txn.sidetails.day);
										$('#startdate').html(mfdtls.response.txndata.txn.sidetails.startdate);
										$('#enddate').html(mfdtls.response.txndata.txn.sidetails.enddate);
										$('#sidate').html(mfdtls.response.txndata.txn.sidetails.sidate);
										$('#installments').html(mfdtls.response.txndata.txn.sidetails.installments);
										$('#amount').html(formatAmt(parseFloat(mfdtls.request.amount)));
										$('#accountno').html(mfdtls.request.accountno);
								 // }   	
					  
						ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
					}); 	
		};
			this.rrswp01Page = function(){
					reqParams = {};
		
		    	reqParams["fldDeviceId"] = fldDeviceId;
		    	reqParams["fldWebServerId"] = fldWebServerId;
		    	reqParams["fldAppId"] = fldAppId;
		    	reqParams["fldAppServerId"] = fldAppServerId;
		    	reqParams["fldLangId"] = fldLangId;
		    	reqParams["fldModule"] = fldModule;
		    	reqParams["fldSwitchAppId"] = "";
		    	reqParams["fldModule"] = "CH";
		    	reqParams["fldTxnId"] = "SWP";
		    	reqParams["fldLogoffReq"] = "N";
		    	reqParams["fldAmcId"] = "ALL";
		    	reqParams["fldRoleId"] = "";
		    	reqParams["fldReportDate"] =getCurrdate();
		    	reqParams["fldCardNo"] = ""; 
				reqParams["fldAcctNo"] = "";
				reqParams["fldUhid"] = "";
				reqParams["fldDpId"] = "";				
		    	reqParams["fldScrnSeqNbr"] = "01";
		    	
		    	
		    	reqParams["fldRequestId"] =RegfldRequestId;

		    	fldjsessionid = Regfldjsessionid;
		    	reqParams["fldLoginUserId"] =Regloginuid;
		    	reqParams["fldSessionId"] = Rsessionid;
		    	
		    	busyInd.show();
		    	var invocationData = {
		    			adapter : "mf",
		        		procedure : "RRSWP01",
		        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
		    	};
		    	
		    	WL.Client.invokeProcedure(invocationData, {
		    		onSuccess : rrswp01Success,
		    		onFailure : AdapterFail,	    		
		    		timeout: timeout
		    	});
		};
		rrswp01Success = function(result){
			
				invocationResult = result.invocationResult;
				busyInd.hide();
				if(invocationResult.isSuccessful) {
	        		if(invocationResult.faml.response){
							
						if (invocationResult.faml.response.rc!= undefined) {
	        				handleError(invocationResult.faml.response);
							
	        				window.location =  '#rrasm01';
	        			} else {
							//self.mfdetails(invocationResult.faml); 
						  $("#contentData").load("Views/MF/rrswp01.html", null, function (response, status, xhr) {
										if (status != "error") {}	
										if(invocationResult.faml.response.txnreply.txnerror!= undefined){
									txnerror = invocationResult.faml.response.txnreply.txnerror;
										$(txnerror).each(function(index, obj) {
													self.txnerror.push({ errdesc: obj.errdesc });	
										});
								   }
								  cardcount =  invocationResult.faml.response.txndata.txn.commonlists;
								  
								  if(typeof(invocationResult.faml.response.txndata.txn.commonlists.unitholderid)=='object'){

										cardcount = invocationResult.faml.response.txndata.txn.commonlists.unitholderid;

										  $(cardcount).each(function(index, obj) {
												self.mfFundList.push({ unitholderid: cardcount[index], displaytxt: cardcount[index],accountValue: cardcount[index]   });

											});
			        				}
			        				else{

			        					  $(cardcount).each(function(index, obj) {
												self.mfFundList.push({ unitholderid: obj.unitholderid, displaytxt: obj.unitholderid,accountValue: obj.unitholderid   });

											});
			        				}  
								  
								  
								 
								   
								   
								   
								   
									$('#fldSelUhid').val(invocationResult.faml.seluhid);
									$('#fldFCDBRequestId').val(Rsessionid);
										ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
							});	
						  
						    
						
						  
							
						 
					}
					
				}
				else {
		   	    			
 		   	    		handleError(invocationResult.faml);
        				 window.location =  '#rrasm01';
 		   	    		}
			}
		};
		this.rrswp01Submit = function(){
				        	
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
				reqParams["fldScrnSeqNbr"] = "02";
		    	  
		     
				reqParams["fldRequestId"] =RegfldRequestId;

		    	fldjsessionid = Regfldjsessionid;
		    	reqParams["fldLoginUserId"] =Regloginuid;
		    	reqParams["fldSessionId"] = Rsessionid;
				
			 	        	var invocationData = {
			 		    			adapter : "mf",
			 		        		procedure : "RRASH02",
			 		        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
			 		    	};
			 	        	
			 	        	
			 	        	busyInd.show();
			 	        	WL.Client.invokeProcedure(invocationData, {
			 	        		onSuccess : self.rrash02Response,
			 	        		onFailure : AdapterFail,
			 	        		timeout: timeout
			 	        	});
			}    	   
		};
		this.loadrrswp02 = function(result){
							busyInd.hide();
							self.mfFundList.removeAll();
							self.mfFundList1.removeAll();
	 		 		    	invocationResult = result.invocationResult;
		 		        	if(invocationResult.isSuccessful) {
		 		        		if(invocationResult.faml.response){	        			
		 		        			accstmtdata=invocationResult;  
		 		    	    			window.location = "#rrswp02"; 
		 		    	    			if (accstmtdata.faml.response.txndata.txn.fundinfo!=undefined){
		 		 		 		    		unitholderid = accstmtdata.faml.request.unitholderid;
		 		 		 		    		amcname      = accstmtdata.faml.response.txndata.txn.fundinfo.amcname;
		 		 		 		    		fundname = accstmtdata.faml.response.txndata.txn.fundinfo.fundname;
		 		 		 		    		navandnavdate = formatAmt(parseFloat(accstmtdata.faml.response.txndata.txn.fundinfo.nav)) +" as on "+accstmtdata.faml.response.txndata.txn.fundinfo.navdate;
		 		 		 		    		cutofftime = accstmtdata.faml.response.txndata.txn.fundinfo.cutofftime;
		 		 		 		    		account = accstmtdata.faml.response.txndata.txn.account.accountno;

		 		 		 		    		//var currentholdingamt="0.00";
		 		 		 		    		//if(accstmtdata.faml.response.txndata.txn.fundinfo.currentholdingamt!=""){
		 		 		 		    			//currentholdingamt=accstmtdata.faml.response.txndata.txn.fundinfo.currentholdingamt;
		 		 		 		    			
		 		 		 		    		//}
		 		 		 		    		 frequency =  accstmtdata.faml.response.txndata.txn.commonlists.frequency;
											 //self.mfFreqList(frequency);
		 		 		 		    		 
													   $(frequency).each(function(index, obj) {
															
																	self.mfFundList1.push({ displaytxt: obj.freqname ,accountValue: obj.freqid,freqid:obj.freqid,freqname: obj.freqname ,minsitxnamt: obj.minsitxnamt ,noofsi: obj.noofsi ,minsitxnunits: obj.minsitxnunits,date:obj.date  });
																	//self.mfFundList.push({ unitholderid: obj.unitholderid, displaytxt: obj.unitholderid,accountValue: obj.unitholderid   });

																	
															
											});
											
												var currentholdingamt="0.00";
												if(accstmtdata.faml.response.txndata.txn.fundinfo.currentholdingamt!=""){
													currentholdingamt=formatAmt(parseFloat(accstmtdata.faml.response.txndata.txn.fundinfo.currentholdingamt));
													
												}
		 		 		 		    		
		 		 		 		    		
		 		 		 		    	}
		 		        		}
								else {
		 		   	    			
			 		   	    		handleError(invocationResult.faml);
			        				 //window.location =  '#rrasm01';
									busyInd.hide();
			 		   	    		}	
		 		        	}
		 		        
	 		 		    	
	 		 		    	
	 		 		    	$("#contentData").load("Views/MF/rrswp02.html", null, function (response, status, xhr) {
	 		 		            if (status != "error") {}	
	 		 		            
	 		 		          daysInput = '';
								 $(accstmtdata.faml.response.txndata.txn.commonlists.days).each(function(index, obj) {
										//daysInput += obj.daynum+""+obj.day;
										daysInput +='<option value="' + obj.daynum + '">' + obj.day + '</option>';
									});
								 $("#fldSiDay").append(daysInput);
	 		 		            
	 		 		            $("#unitholderid1").html(unitholderid);
	 		 		            $("#amcname1").html(amcname);
	 		 		        	//$("#fundname").html(formatAmt(parseFloat(fldamttxn)));
	 		 		        	$("#fundname1").html(fundname);
	 		 		        	
	 		 		        	$("#navandnavdate").html(navandnavdate);
	 		 		        	$("#cutofftime").html(cutofftime);
								if(daysInput!= undefined || daysInput == '')
								$("#hid_strdays").val(daysInput);
								else
								$("#hid_strdays").val('');
	 		 		        	$("#currentholdingamt").html(cutofftime);
								$("#account").html(account);
	 		 		        	$("#fldFCDBRequestId").val( accstmtdata.faml.mci.requestid);
	 		 		        	$('#fldUhid').val(unitholderid);
								$('#fldFundCode').val(accstmtdata.faml.request.fundid);
								$('#fldFundname').val(fundname);
								$('#fldAccount').val(account);
								$('#fldCodTxn').val(accstmtdata.faml.request.fldCodTxn);
								$('#fldAmcId').val('');
								$('#fldfundname2').val(accstmtdata.faml.response.txndata.txn.fundinfo.fundname);
								$('#fldfundcode2').val(accstmtdata.faml.request.fundid);								
									
								


								 if(accstmtdata.faml.response.txndata.txn.fundinfo)
	 		 		        	 $("#fndinfo").show();
								

	 		 		            ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
	 		 		        });
	 		 			    
	 		 			    
	 	};
	 	
	 	this.rrswp02Submit = function(){
				  	
	 		var objs = document.getElementById('fldSiDay');
	 		document.getElementById('fldSiDay_txt').value = objs.options[objs.selectedIndex].innerHTML;
	 		
	 		var objs1 = document.getElementById('fldSiDate');
	 		document.getElementById('fldSiDate_txt').value = objs1.options[objs1.selectedIndex].innerHTML;
	 		
	 		
	        errflag = true;
	        var freqnm = document.getElementById('fldFrequency').value;
	    	var redigit = /^[0-9]+$/;
			if(freqnm == '')
			{
				alert('Please select si frequency');
				errflag = false;
				return false;
			}
			
			
			
			else if(document.f1.fldSiDay.selectedIndex == 0 && document.f1.fldSiDate.selectedIndex == 0) {
				
				alert("Please select either Days or Date");
				//document.f1.fldSiDate.focus();
				errflag = false;
				return false;
			}
			
			else if($("#fldNoOfInstallment").val() == '')
			{
				alert("Please Enter No. of Withdrawals");
				errflag = false;
				return false;
			}
			else if(parseFloat($("#fldNoOfInstallment").val()) < parseFloat($("#fldNoofsi").val())){
        		alert("Enter No. of Installment greater than minimum Installment");
        		errflag = false;
        	}
			else if(!redigit.test($("#fldNoOfInstallment").val())){
				alert("Please Enter Numeric No. of Withdrawals");
				errflag = false;
				return false;
			}
		
			else if($("#fldUnits").val() =='' && $("#fldAmount").val()==''){
				alert("Please Enter either Amount or Units");
				errflag = false;
				return false;
			}
			else if($("#fldUnits").val() && $("#fldAmount").val()){
				alert("Please Enter either Amount or Units not both");
				errflag = false;
				return false;
			}
			else if($.trim($("#fldAmount").val()) != '' || $.trim($("#fldUnits").val()) != ''){
        		
        		if($.trim($("#fldAmount").val()) != ''){
		        	if(parseFloat($("#fldAmount").val()) < parseFloat($("#fldMinAmount").val())){
		        		alert("Enter Amount greater than minimum Amount");
		        		errflag = false;
		        	}
		        	else if(!redigit.test($("#fldAmount").val())){
	    				alert("Please Enter Numeric No. of Amount");
	    				errflag = false;
	    				return false;
	    			}
        		}
        		if($.trim($("#fldUnits").val()) != ''){
        			if(parseFloat($("#fldUnits").val()) < parseFloat($("#fldMinUnit").val())){
		        		alert("Enter Units greater than minimum Units");
		        		errflag = false;
		        	}
        			else if(!redigit.test($("#fldUnits").val())){
	    				alert("Please Enter Numeric No. of Units");
	    				errflag = false;
	    				return false;
	    			}
        		}
	        	
        		}
			
			
			
			if($("#f1").valid()){
	        	
        		if(errflag){
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
		    	
		    	
		    	
		    	reqParams["fldReportDate"] =getCurrdate();
		   	
		    	
		    	reqParams["fldRequestId"] =RegfldRequestId;

		    	fldjsessionid = Regfldjsessionid;
		    	reqParams["fldLoginUserId"] =Regloginuid;
		    	reqParams["fldSessionId"] = Rsessionid;
			 	        	var invocationData = {
			 		    			adapter : "mf",
			 		        		procedure : "RRSWP04",
			 		        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
			 		    	};
			 	        	
			 	        	
			 	        	busyInd.show();
			 	        	WL.Client.invokeProcedure(invocationData, {
			 	        		onSuccess :rrswp02SubmitSuccess,
			 	        		onFailure : AdapterFail,
			 	        		timeout: timeout
			 	        	});
        		}}   	 
		};	 
		rrswp02SubmitSuccess = function(result){
						invocationResult = result.invocationResult;
						busyInd.hide();
				if(invocationResult.isSuccessful) {
	        		if(invocationResult.faml.response){
							
					
						  accStmtData(invocationResult.faml);        	
						  window.location = "#rrswp04";
						
					}
					else {
		   	    			
 		   	    		handleError(invocationResult.faml);
        				 //window.location =  '#rrasm01';
 		   	    		}
				}
		};
		this.rrswp04Page = function(){
					mfdtls =  accStmtData();
					txnerror = mfdtls.response.txnreply.txnerror;
										$(txnerror).each(function(index, obj) {
													self.txnerror.push({ errdesc: obj.errdesc });	
										});
					 $("#contentData").load("Views/MF/rrswp04.html", null, function (response, status, xhr) {
						if (status != "error") {}	

$("#fldFCDBRequestId").val(RegfldRequestId);
							$('#unitholderid').html(mfdtls.request.unitholderid);
							if(mfdtls.request.partialfull=='P' && mfdtls.request.selectedamount!=''){
									$('#PTFP').show();
									$('#selectedamount').html(formatAmt(parseFloat(mfdtls.response.txndata.txn.fundinfo.selectedamount)));
							}else if(mfdtls.request.partialfull=='P' && mfdtls.request.selectedamount==''){
									$('#NPTFP').show();
									$('#selectedunits').html(formatAmt(parseFloat(mfdtls.response.txndata.txn.fundinfo.selectedunits)));
							}else {
								$('#NPTFPELSE').show();
								$('#selectedunits').html(formatAmt(parseFloat(mfdtls.response.txndata.txn.fundinfo.selectedunits)),3);
							}
								
							$('#amcname').html(mfdtls.response.txndata.txn.fundinfo.amcname);
							$('#fundname').html(mfdtls.response.txndata.txn.fundinfo.fundname);
							$('#cutofftime').html(mfdtls.response.txndata.txn.fundinfo.cutofftime);
							$('#sifrequency').html(mfdtls.response.txndata.txn.sidetails.sifrequency);
							$('#day').html(mfdtls.request.day);
							$('#date').html(mfdtls.request.date);
							$('#installments').html(mfdtls.response.txndata.txn.sidetails.installments);
							$('#enddate').html(mfdtls.response.txndata.txn.sidetails.enddate);
							$('#startdate').html(mfdtls.response.txndata.txn.sidetails.startdate);
							$('#accountno').html(mfdtls.response.txndata.txn.account.accountno);
							
							$('#fldUhid').val(mfdtls.request.unitholderid);
							$('#unitholderid').val(mfdtls.request.unitholderid);
							$('#fldAccount').val(mfdtls.response.txndata.txn.account.accountno);
							$('#fldFundCode').val(mfdtls.request.fundid);
							$('#fldAmcId').val(mfdtls.request.amcid);
							$('#fldPartialFull').val(mfdtls.request.partialfull);
							$('#fldAmount').val(mfdtls.request.selectedamount);
							$('#fldUnits').val(mfdtls.request.selectedunits);
							$('#fldSiDay').val(mfdtls.request.day);
							$('#fldSiDate').val(mfdtls.request.date);
							$('#fldFrequency').val(mfdtls.request.sifrequency);
							$('#fldNoOfInstallment').val(mfdtls.request.installments);
							$('#fldStartDate').val(mfdtls.response.txndata.txn.sidetails.startdate);
							$('#fldEndDate').val(mfdtls.response.txndata.txn.sidetails.enddate);
						
							ko.applyBindings(self, $(".dynamic-page-content").get(0));
							
		
			busyInd.hide();
							
					});
		};
		this.rrswp04Submit = function(){
				      	
		 	if($("#f1").valid()){
		 		var objs = document.getElementById('fldAcceptTerms');
		 		document.getElementById('fldAcceptTerms_txt').value = objs.options[objs.selectedIndex].innerHTML;
		 		
		 		
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
		    	
		    	
		    	
		    	reqParams["fldReportDate"] =getCurrdate();
		    
		    	reqParams["fldRequestId"] =RegfldRequestId;

		    	fldjsessionid = Regfldjsessionid;
		    	reqParams["fldLoginUserId"] =Regloginuid;
		    	reqParams["fldSessionId"] = Rsessionid;
		    	
			 	        	var invocationData = {
			 		    			adapter : "mf",
			 		        		procedure : "RRSWP08",
			 		        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
			 		    	};
			 	        	
			 	        	
			 	        	busyInd.show();
			 	        	WL.Client.invokeProcedure(invocationData, {
			 	        		onSuccess :rrswp04SubmitSuccess,
			 	        		onFailure : AdapterFail,
			 	        		timeout: timeout
			 	        	});
		 	}
		};
		rrswp04SubmitSuccess = function(result){
					invocationResult = result.invocationResult;
					busyInd.hide();
				if(invocationResult.isSuccessful) {
	        		if(invocationResult.faml.response){
							
						if (invocationResult.faml.rc!= undefined) {
	        				handleError(invocationResult.faml);
							busyInd.hide();
	        				window.location =  '#rrwcm01';
	        			} else {
						  accStmtData(invocationResult.faml);        	
						  window.location = "#rrswp08";
						}
					}
					else {
		   	    			
 		   	    		handleError(invocationResult.faml);
        				 //window.location =  '#rrasm01';
 		   	    		}
				}
		};
		this.rrswp08Page = function(){
					mfdtls = accStmtData();
					txnerror = mfdtls.response.txnreply.txnerror;
										$(txnerror).each(function(index, obj) {
											if(obj.errcode!="0"){
													self.txnerror.push({ errdesc: obj.errdesc });	
											}});
					 $("#contentData").load("Views/MF/rrswp08.html", null, function (response, status, xhr) {
						if (status != "error") {}	
						accountList.removeAll();
						accountSummList.removeAll();
						
						  	     // if(mfdtls.response.txnreply.txnerror.errcode==0){
										$('#infobox').show();
										$('#txnnumber').html(mfdtls.response.txnreply.txnnumber);
											txndate = mfdtls.response.txndata.txn.txndate;
											txndate = txndate.substring(6,8)+"-"+txndate.substring(4,6)+"-"+txndate.substring(0,4);
											$('#tempdate').html(txndate);
										if(mfdtls.response.txnreply.txnerror.errcode!=0){
												$('#errdescmsg').html(mfdtls.response.txnreply.txnerror.errdesc);
										}
										if(mfdtls.response.txnreply.txnerror.warning){
												$('#warningmsg').html(mfdtls.response.txnreply.txnerror.warning.errdesc);
										}
										
										if(mfdtls.request.partialfull=='P' && mfdtls.request.selectedamount!=''){
												$('#PTFP').show();
												$('#selectedamount').html(formatAmt(parseFloat(mfdtls.response.txndata.txn.fundinfo.selectedamount)));
										}else if(mfdtls.request.partialfull=='P' && mfdtls.request.selectedamount==''){
												$('#NPTFP').show();
												$('#selectedunits').html(formatAmt(parseFloat(mfdtls.response.txndata.txn.fundinfo.selectedunits)));
										}else {
											$('#NPTFPELSE').show();
											$('#selectedunits').html(formatAmt(parseFloat(mfdtls.response.txndata.txn.fundinfo.selectedunits)),3);
										}
										  $('#unitholderid').html(mfdtls.request.unitholderid);
										  $('#amcname').html(mfdtls.response.txndata.txn.fundinfo.amcname);
										  $('#fundname').html(mfdtls.response.txndata.txn.fundinfo.fundname);
										  $('#cutofftime').html(mfdtls.response.txndata.txn.fundinfo.cutofftime);
										if(mfdtls.request.partialfull=='P'){
												$('#swtchType').html('Switch Type');
												$('#STwchName').html('Partial');
										}else if(mfdtls.request.partialfull=='F'){
												$('#swtchType').html('Switch Type');
												$('#STwchName').html('Full');
										}else {
												$('#swtchType').html('Redemption Type');
												$('#STwchName').html('-');
										}
										
										
										$('#sifrequency').html(mfdtls.response.txndata.txn.sidetails.sifrequency);
										$('#day').html(mfdtls.response.txndata.txn.sidetails.day);
										$('#startdate').html(mfdtls.response.txndata.txn.sidetails.startdate);
										$('#enddate').html(mfdtls.response.txndata.txn.sidetails.enddate);
										$('#sidate').html(mfdtls.response.txndata.txn.sidetails.sidate);
								 // }   	
					  
						ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
					}); 
		};
	    this.mfSummary = function(){
	    	mfaccountList.removeAll();
			mfaccountList1.removeAll();
	   
		    	reqParams = {};
		
		    	reqParams["fldDeviceId"] = fldDeviceId;
		    	reqParams["fldWebServerId"] = fldWebServerId;
		    	reqParams["fldAppId"] = fldAppId;
		    	reqParams["fldAppServerId"] = fldAppServerId;
		    	reqParams["fldLangId"] = fldLangId;
		    	reqParams["fldModule"] = fldModule;
		    	reqParams["fldSwitchAppId"] = "";
		    	reqParams["fldModule"] = "CH";
		    	reqParams["fldTxnId"] = "WCM";
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
		    			adapter : "mf",
		        		procedure : "RRWCM01",
		        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
		    	};
		    	
		    	WL.Client.invokeProcedure(invocationData, {
		    		onSuccess : mfSuccess,
		    		onFailure : AdapterFail,	    		
		    		timeout: timeout
		    	});
		    	
		    	if(window.location.hash == '#mfaccountSummary'){
		    		templateId = "mfaccountSummary";
		    	}else{
		    		templateId = "rrwcm01";
		    	}
		    	
		    	$("#contentData").load("Views/MF/"+templateId+".html", null, function (response, status, xhr) {
		            if (status != "error") {}
		            ko.applyBindings(self, $(".dynamic-page-content").get(0));     
		    	
		            
		            
		                
		    	});
	    	
	    };
	    

	       mfSuccess = function(result){
	    	
	    	invocationResult = result.invocationResult;
	    	
	    	//$("#contentData").load("Views/Credit/rracs01.html", null, function (response, status, xhr) {
	           // if (status != "error") {}
	          	if(invocationResult.isSuccessful) {
	        		if(invocationResult.faml.response){	

	        			if (invocationResult.faml.response.rc!= undefined) {
	        				handleError(invocationResult.faml.response);
	        				 window.location =  '#rrasm01';
	        			} else {
	        			   
	        		
	        		//if(invocationResult.faml.response.rc.returncode == 0){
	        			cardcount=invocationResult.faml.response.txndata.txn.beneficiarydetails;
	        			totAccount=cardcount.length;
	        			
	        			//alert(totAccount);
	        			if(cardcount)
	    	    			mfSlider(true);
	    	    		else
	    	    			mfSlider(false);
	    	    		
	        			
	    	    		var idx = 1;
	    	    		var TempArr=[];
	    	    		
	    	    		
						try{
						$(cardcount).each(function(index, obj) {
							if(TempArr.indexOf(obj.unitholderid) == -1){
								TempArr.push(obj.unitholderid);
							}
							
						});
						idx = 1;
						strid = "item"+idx;
						mfaccountList.removeAll();
						var beneficiaryname;
						var beneficiaryname2;
						var beneficiaryname3;
						
						 for (var j = 0; j < TempArr.length; j++) {
						      for (var i = 0; i < cardcount.length; i++) {
							      if(TempArr[j] == cardcount[i].unitholderid){console.log(TempArr[j]+"--------"+cardcount[i].unitholderid);
								        acctbalance = formatAmt(parseFloat(cardcount[i].totalholding));
										beneficiarytype1 = cardcount[i].beneficiarytype;
										if(cardcount[i].beneficiarytype == 'J0'){
		    	    	    				beneficiaryname=cardcount[i].beneficiaryname;
		    	    	    			}else if(cardcount[i].beneficiarytype == 'J1'){
		    	    	    				beneficiaryname2=cardcount[i].beneficiaryname;
		    	    	    			}else if(cardcount[i].beneficiarytype == 'J2'){
		    	    	    				beneficiaryname3=cardcount[i].beneficiaryname;
		    	    	    			}
		    	    			        //obj = array[i];
		    	    			        //break;
		    	    			    }
								   }
								   
								 mfaccountList.push({codacctno: TempArr[j], btype:beneficiarytype1,totalholding:acctbalance, acctbalance: acctbalance,strid:TempArr[j] ,beneficiaryname:beneficiaryname,beneficiaryname2:beneficiaryname2,beneficiaryname3:beneficiaryname3});
								  idx++;
		    	    	}
						}
						catch(e){
						  console.log(e);
						}
						
	    	    		
	    	    		
	    	    		
	    	    		if(window.location.hash == '#rrwcm01'){
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
	    	    		
	    	    		if(mfaccountList().length > 0 && window.location.hash == '#rrwcm01'){
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
	        			
	    	    		
	        			/*}else{
	        				errmsg = invocationResult.faml.response.rc.errormessage;
	        				//self.error(true); 
	        				//self.errormsg = ko.observable("ATM / Debit Card Hotlisting – Failure"+errmsg);
	      
	        				handleError(invocationResult.faml.response);
	        				 window.location =  '#rrasm01';
	        			}
	        		*/
	        	}
				}
	        		else {
		   	    			
 		   	    		handleError(invocationResult.faml);
        				 window.location =  '#rrasm01';
 		   	    		}
	        	}
	            
	            //ko.applyBindings(self, $(".dynamic-page-content").get(0));
	    	//});
	          
	        	busyInd.hide();
	    };

	   
	   /**************Unit Holding Statement**********************/
	   this.callrrvpr01 = function(){
	   	
	   	
		   reqParams = {};
			
	    	reqParams["fldDeviceId"] = fldDeviceId;
	    	reqParams["fldWebServerId"] = fldWebServerId;
	    	reqParams["fldAppId"] = fldAppId;
	    	reqParams["fldAppServerId"] = fldAppServerId;
	    	reqParams["fldLangId"] = fldLangId;
	    	reqParams["fldModule"] = fldModule;
	    	reqParams["fldSwitchAppId"] = "";
	    	reqParams["fldModule"] = "CH";
	    	reqParams["fldTxnId"] = "VPR";
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
	    			adapter : "mf",
	        		procedure : "RRVPR01",
	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	    	};
	   	
	   	WL.Client.invokeProcedure(invocationData, {
	   		onSuccess : loadrrvpr01,
	   		onFailure : AdapterFail,	    		
	   		timeout: timeout
	   	});
	   	
	   	
	   	if(window.location.hash == '#rrvpr01'){
	   		templateId = "rrvpr01";
	   	}else{
	   		templateId = "rrvpr01";
	   	}
	   	
	   	$("#contentData").load("Views/MF/"+templateId+".html", null, function (response, status, xhr) {
	           if (status != "error") {}
	           ko.applyBindings(self, $(".dynamic-page-content").get(0));     
	   	
	           
	           
	               
	   	});
	   	
	   };

	   /***************************Holding Statement Landing ********************************/
	   self.mfaccountStmtDetails = function(accnodet){
       	//alert(accnodet.acctbalance);
           selectedAccount({ accno: accnodet.codacctno, displaytxt: accnodet.displaytxt, acctbalance: accnodet.acctbalance, fldFCDBRequestId: accnodet.fldFCDBRequestId, acctType: accnodet.acctType });
           randomintstr = parseInt(Math.random()*1000000000, 10);
           //checkState=1;
          //window.location = "#ccunb";
           
          self.viewSelectedccHoldingStatement();
       };
       
       self.viewSelectedccHoldingStatement = function(){
       	
       	busyInd.show();
       	var currAccData = selectedAccount();
       	
           fldAcctNo = currAccData.accno;            
           curraccbalval = "Rs. "+currAccData.acctbalance;
           //acctType =  currAccData.acctType;
       	//fldAcctNo_txt = currAccData.displaytxt;
       	
       	reqParams = {};
	    	
       	reqParams["fldDeviceId"] = fldDeviceId;

	    	reqParams["fldWebServerId"] = fldWebServerId;
	    	reqParams["fldAppId"] = fldAppId;
	    	reqParams["fldAppServerId"] = fldAppServerId;
	    	reqParams["fldLangId"] = fldLangId;
	    	reqParams["fldModule"] = "CH";
	    	reqParams["fldTxnId"] = "VPR";
	    	reqParams["fldScrnSeqNbr"] = "03";
	    	reqParams["fldUhid"] = fldAcctNo;
	    	reqParams["fldAmcId"] = "ALL";
	    	reqParams["acctTemp"] = "1";
	    	reqParams["fldReportDate"] =getCurrdate();

	    	

	    	fldjsessionid = Regfldjsessionid;
	    	reqParams["fldLoginUserId"] =Regloginuid;
	    	reqParams["fldSessionId"] = Rsessionid;
	    	
	    	if(fldAcctNo != undefined){
		    	var invocationData = {
		    			adapter : "mf",
		        		procedure : "RRVPR03",
   	        		parameters : [fldjsessionid,reqParams,ipadd],
   	        		compressResponse : true
		    	};
		    	//WL.Logger.debug(invocationData, '');
		    	
		    	WL.Client.invokeProcedure(invocationData, {
		    		onSuccess : rrvprhomeResponse,
		    		onFailure : AdapterFail,
		    	});
       	}else{
       		busyInd.hide();		
       	}
	    	
	    	self.selAccountmf(fldAcctNo);

	    	self.curramfbalval("Rs. "+curraccbalval);
	    	//$("#fldAcctNo").html(fldAcctNo);
	    		    	
       };
       
       
       rrvprhomeResponse = function(result){
  	    	busyInd.hide();
   	    	invocationResult = result.invocationResult;
   	    	if(invocationResult.isSuccessful) {
   	    		if(invocationResult.faml.response){	
   	    		//if(invocationResult.faml.response.rc.returncode == 0){
   	    			if (invocationResult.faml.response.rc!= undefined) {
        				handleError(invocationResult.faml.response);
        				 window.location =  '#rrasm01';
        			} else {
        			   
   	    			window.location = "#mfunihold";
   	    			$("#contentData").load("Views/MF/mfunihold.html", null, function (response, status, xhr) {
   	    	            if (status != "error") {}
   	    	            
   	    	     	if(window.location.hash == "#mfunihold"){
   	 	   			
   	 	   			cardcount=invocationResult.faml.response.txndata.txn;
   	 	   			totAccount=cardcount.length;
   	 	   		
   	 	   			if(totAccount > 0)
   	 	   			{$('#ErrMsg').hide();}
   	 	   		else{
   	 	   			$('#ErrMsg').show();
   	 	   		}
   	 	   			/*mfaccountList1.removeAll();
   	 	   			mflist.removeAll();
   	 	       	    $(cardcount.commonlists).each(function(index, obj) {
   	 	       		mfaccountList1.push({ cardNo: obj.unitholderid});
   	 	       		
   	 	       		});
   	 	       	 mflist.push({ amcid: "All",amcname:"All Mutual Funds"});
   	 	       	    $(cardcount.amcdetails).each(function(index, obj) {
   	 	       	    	mflist.push({ amcid: obj.amcid,amcname: obj.amcname});
   	 	       		
   	 	       		});
   	 	    	   */
   	 	   		
   	 	   		//Nofund
   	 	   	  	if(cardcount.funds!= undefined){
	   	 	   		
	   	 	   		$('#Nofund').hide();
	   	 	   	}
	   	 	   		else{
	   	 	   		$('#Nofund').show();
	   	 	   	
	   	 	   		}	
   	 	   		mfaccountList2.removeAll();
	 	       	    $(cardcount.funds).each(function(index, obj) {
	 	       	 mfaccountList2.push({ fundnav: formatAmt(obj.fundnav),amcname: obj.amcname,fundname: obj.fundname,fundholding: formatAmt(obj.fundholding),fundccy:formatAmt(obj.fundccy),latnav:formatAmt(obj.latnav),presentvalue:formatAmt(obj.presentvalue)});
	 	       		
	 	       		});
   	 	       
   	 	   		}
   	    	            ko.applyBindings(self, $(".dynamic-page-content").get(0));
   	    	    	});
   	    			
        			}	
   	    			/*}else{
   	    			errmsg = invocationResult.faml.response.rc.errormessage;
   	    			handleError(invocationResult.faml.response);
   	    		}*/
   	    		}
   	    	}
   	 	else {
    			
   	    		handleError(invocationResult.faml);
			window.location =  '#rrasm01';
   	    		}
   	    };
       
       
	   /***************************Holding Statement Landing ********************************/
	   
	   
	   	   loadrrvpr01 = function(result){
	   busyInd.hide();
	   invocationResult = result.invocationResult;
	   if(invocationResult.isSuccessful) {
	   	if(invocationResult.faml.response){	
	   	//if(invocationResult.faml.response.rc.returncode == 0){
	   		if (invocationResult.faml.response.rc!= undefined) {
				handleError(invocationResult.faml.response);
				 window.location =  '#rrasm01';
			} else {
			   
	   		if(window.location.hash == "#rrvpr01"){
	   			
	   			cardcount=invocationResult.faml.response.txndata.txn.commonlists;
	   			totAccount=cardcount.length;
	   		
	   			if(totAccount > 0)
	   			{$('#ErrMsg').hide();}
	   		else{
	   			$('#ErrMsg').show();
	   		}
	   			mfaccountList1.removeAll();
	   			mflist.removeAll();
	   			mfaccountList2.removeAll();
	   			
	   			if(typeof(invocationResult.faml.response.txndata.txn.commonlists.unitholderid)=='object'){

					cardcount = invocationResult.faml.response.txndata.txn.commonlists.unitholderid;

					  $(cardcount).each(function(index, obj) {
 		 		       		mfaccountList1.push({ cardNo:cardcount[index]});
 		 		       		
 		 		       		});
				}
				else{

					 $(cardcount).each(function(index, obj) {
				       		mfaccountList1.push({ cardNo: obj.unitholderid});
				       		
				       		});
				}  
	   			
	   			
	       	   
	       	    
	       	    
	       	 mflist.push({ amcid: "All",amcname:"All Mutual Funds"});
	       	    $(invocationResult.faml.response.txndata.txn.commonlists.amcdetails).each(function(index, obj) {
	       	    	mflist.push({ amcid: obj.amcid,amcname: obj.amcname});
	       		
	       		});
	       	   
	   		}
			}
	   	/*}else{
	   		errmsg = invocationResult.faml.response.rc.errormessage;
	   		handleError(invocationResult.faml.response);
	   	}*/
	   	}
		else {
    			
	    		handleError(invocationResult.faml);
			 window.location =  '#rrasm01';
	    		}
	   }
	   };

	   self.rrvpr01Submit = function(){
		  
	   	if($("#frmrrvpr01").valid()){
	   

	   		fldLoginUserId = Regloginuid;
	   		fldFCDBSessionId = RegfldFCDBSessionId;
	   		fldjsessionid = Regfldjsessionid;
	   		fldSessionId = Rsessionid;
	   	
	   	
	   	var $form = $("#frmrrvpr01");
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
		 	
		   reqParams["fldRequestId"] =RegfldRequestId;

	    	fldjsessionid = Regfldjsessionid;
	    	reqParams["fldLoginUserId"] =Regloginuid;
	    	reqParams["fldSessionId"] = Rsessionid;
		   
		var invocationData = {
    			adapter : "mf",
        		procedure : "RRVPR03",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
		 busyInd.show();  
	   	//WL.Logger.debug(invocationData, '');
	   	WL.Client.invokeProcedure(invocationData, {
	   		onSuccess : rrvpr03Response,
	   		onFailure : AdapterFail,
	   		timeout: timeout
	   	});
	   	}
	   };   
 rrvpr03Response = function(result){
	   	    	busyInd.hide();
	   	    	invocationResult = result.invocationResult;
	   	    	if(invocationResult.isSuccessful) {
	   	    		if(invocationResult.faml.response){	
	   	    		//if(invocationResult.faml.response.rc.returncode == 0){
	   	    			if (invocationResult.faml.response.rc!= undefined) {
	        				handleError(invocationResult.faml.response);
	        				 window.location =  '#rrasm01';
	        			} else {
	        			   
	   	    			window.location = "#rrvpr03";
	   	    			$("#contentData").load("Views/MF/rrvpr03.html", null, function (response, status, xhr) {
	   	    	            if (status != "error") {}
	   	    	            
	   	    	     	if(window.location.hash == "#rrvpr03"){
	   	 	   			
	   	 	   			cardcount=invocationResult.faml.response.txndata.txn;
	   	 	   			totAccount=cardcount.length;
	   	 	   		
	   	 	   			if(totAccount > 0)
	   	 	   			{$('#ErrMsg').hide();}
	   	 	   		else{
	   	 	   			$('#ErrMsg').show();
	   	 	   		}
	   	 	   			/*mfaccountList1.removeAll();
	   	 	   			mflist.removeAll();
	   	 	       	    $(cardcount.commonlists).each(function(index, obj) {
	   	 	       		mfaccountList1.push({ cardNo: obj.unitholderid});
	   	 	       		
	   	 	       		});
	   	 	       	 mflist.push({ amcid: "All",amcname:"All Mutual Funds"});
	   	 	       	    $(cardcount.amcdetails).each(function(index, obj) {
	   	 	       	    	mflist.push({ amcid: obj.amcid,amcname: obj.amcname});
	   	 	       		
	   	 	       		});
	   	 	    	   */
	   	 	   		
	   	 	   		//Nofund
	   	 	   	  	if(cardcount.funds!= undefined){
		   	 	   		
		   	 	   		$('#Nofund').hide();
		   	 	   	}
		   	 	   		else{
		   	 	   		$('#Nofund').show();
		   	 	   	
		   	 	   		}	
	   	 	   		mfaccountList2.removeAll();
   	 	       	    $(cardcount.funds).each(function(index, obj) {
   	 	       	 mfaccountList2.push({ fundnav: formatAmt(obj.fundnav),amcname: obj.amcname,fundname: obj.fundname,fundholding: formatAmt(obj.fundholding),fundccy:formatAmt(obj.fundccy),latnav:formatAmt(obj.latnav),presentvalue:formatAmt(obj.presentvalue)});
   	 	       		
   	 	       		});
	   	 	       
	   	 	   		}
	   	    	     	$("#fldAmcId").val(invocationResult.faml.request.amcid);
	   	    	            ko.applyBindings(self, $(".dynamic-page-content").get(0));
	   	    	    	});
	   	    			
	        			}	
	   	    			/*}else{
	   	    			errmsg = invocationResult.faml.response.rc.errormessage;
	   	    			handleError(invocationResult.faml.response);
	   	    		}*/
	   	    		}
	   	    	}
	   	 	else {
	    			
	   	    		handleError(invocationResult.faml);
				 //window.location =  '#rrasm01';
	   	    		}
	   	    };
	   	
 self.rrvpr03Submit = function(){
		       
	 	   	if($("#frmrrvpr03").valid()){
	 	   	mfaccountList2.removeAll();
	 	       	

	 	 	fldLoginUserId = Regloginuid;
	 		    	fldFCDBSessionId = RegfldFCDBSessionId;
	 	        	fldjsessionid = Regfldjsessionid;
	 	        	fldSessionId = Rsessionid;
	 	   	
	 	   	
	 	   	
	 	   	var $form = $("#frmrrvpr03");
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
			 	
			   reqParams["fldRequestId"] =RegfldRequestId;

		    	fldjsessionid = Regfldjsessionid;
		    	reqParams["fldLoginUserId"] =Regloginuid;
		    	reqParams["fldSessionId"] = Rsessionid;
		    	
			var invocationData = {
	    			adapter : "mf",
	        		procedure : "RRVPR03",
	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	    	};
			busyInd.show();    
		   	//WL.Logger.debug(invocationData, '');
		   	WL.Client.invokeProcedure(invocationData, {
		   		onSuccess : rrvpr031Response,
		   		onFailure : AdapterFail,
		   		timeout: timeout
	 	   	});
	 	   	}
	 	   };   
	 	   rrvpr031Response = function(result){
	 	   	    	busyInd.hide();
	 	   	    	invocationResult = result.invocationResult;
	 	   	    	if(invocationResult.isSuccessful) {
	 	   	    		if(invocationResult.faml.response){	
	 	   	    		//if(invocationResult.faml.response.rc.returncode == 0){
	 	   	    			//window.location = "#rrvpr03";
	 	   	    		//alert(invocationResult.faml.response.txndata.txn);
	 	   	    		if (invocationResult.faml.response.rc!= undefined) {
	        				handleError(invocationResult.faml.response);
	        				 window.location =  '#rrasm01';
	        			} else {
	        			   
	 	   	    	     	if(window.location.hash == "#rrvpr03"){
	 	   	 	   			
	 	   	 	   			cardcount=invocationResult.faml.response.txndata.txn;
	 	   	 	   			//totAccount=cardcount.length;
	 	   	 	   		
	 	   	 	   		
	 	   	 	   			/*mfaccountList1.removeAll();
	 	   	 	   			mflist.removeAll();
	 	   	 	       	    $(cardcount).each(function(index, obj) {
	 	   	 	       		mfaccountList1.push({ cardNo: obj.unitholderid});
	 	   	 	       		
	 	   	 	       		});
	 	   	 	       	 mflist.push({ amcid: "All",amcname:"All Mutual Funds"});
	 	   	 	       	    $(cardcount.amcdetails).each(function(index, obj) {
	 	   	 	       	    	mflist.push({ amcid: obj.amcid,amcname: obj.amcname});
	 	   	 	       		
	 	   	 	       		});
	 	   	 	       	   */
	 	   	 	   	if(cardcount.funds!= undefined){
	   	 	   		
	   	 	   		$('#Nofund').hide();
	   	 	   	}
	   	 	   		else{
	   	 	   		$('#Nofund').show();
	   	 	   	
	   	 	   		}		
	 	   	 	   	
   	 	       	    $(cardcount.funds).each(function(index, obj) {
   	 	       	    	
   	   	 	       	 mfaccountList2.push({ fundnav: formatAmt(obj.fundnav),amcname: obj.amcname,fundname: obj.fundname,fundholding: formatAmt(obj.fundholding),fundccy:formatAmt(obj.fundccy),latnav:formatAmt(obj.latnav),presentvalue:formatAmt(obj.presentvalue)});
   	 	       		
   	 	       		});
	 	   	 	   		}
	 	   	    	       
	 	   	    			
	        			}		
	 	   	    			/*}else{
	 	   	    			errmsg = invocationResult.faml.response.rc.errormessage;
	 	   	    			handleError(invocationResult.faml.response);
	 	   	    		}
	 	   	    		*/
	 	   	    		}
	 	   	    	else {
		   	    			
 		   	    		handleError(invocationResult.faml);
        				 //window.location =  '#rrasm01';
 		   	    		}
	 	   	    	}
	 	   	    };
	 	   	    
	 		   /**************END Unit Holding Statement**********************/
	 	   	/**************Start Order Status **********************/ 
	 	   	    
	 		   this.callrrost01 = function(){
	 		   	
	 		   	
	 			   reqParams = {};
	 				
	 		    	reqParams["fldDeviceId"] = fldDeviceId;
	 		    	reqParams["fldWebServerId"] = fldWebServerId;
	 		    	reqParams["fldAppId"] = fldAppId;
	 		    	reqParams["fldAppServerId"] = fldAppServerId;
	 		    	reqParams["fldLangId"] = fldLangId;
	 		    	reqParams["fldModule"] = fldModule;
	 		    	reqParams["fldSwitchAppId"] = "";
	 		    	reqParams["fldModule"] = "CH";
	 		    	reqParams["fldTxnId"] = "OST";
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
	 		    			adapter : "mf",
	 		        		procedure : "RROST01",
	 		        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	 		    	};
	 		   	
	 		   	WL.Client.invokeProcedure(invocationData, {
	 		   		onSuccess : loadrrost01,
	 		   		onFailure : AdapterFail,	    		
	 		   		timeout: timeout
	 		   	});
	 		   	
	 		   	
	 		   	if(window.location.hash == '#rrost01'){
	 		   		templateId = "rrost01";
	 		   	}else{
	 		   		templateId = "rrost01";
	 		   	}
	 		   	
	 		   	$("#contentData").load("Views/MF/"+templateId+".html", null, function (response, status, xhr) {
	 		           if (status != "error") {}
	 		           ko.applyBindings(self, $(".dynamic-page-content").get(0));     
	 		   	
	 		           
	 		           
	 		               
	 		   	});
	 		   	
	 		   };

	 		   loadrrost01 = function(result){
	 		   
	 		   busyInd.hide();
	 		   invocationResult = result.invocationResult;
	 		   if(invocationResult.isSuccessful) {
	 		   	if(invocationResult.faml.response){	
	 		   	//if(invocationResult.faml.response.rc.returncode == 0){
	 		   		if (invocationResult.faml.response.rc!= undefined) {
	 					handleError(invocationResult.faml.response);
	 					window.location =  '#rrasm01';
	 				} else {
	 				   
	 		   		if(window.location.hash == "#rrost01"){
	 		   			
	 		   			cardcount=invocationResult.faml.response.txndata.txn.commonlists;
	 		   			totAccount=cardcount.length;
	 		   		
	 		   			if(totAccount > 0)
	 		   			{$('#ErrMsg').hide();}
	 		   		else{
	 		   			$('#ErrMsg').show();
	 		   		}
	 		   			mfaccountList1.removeAll();
	 		   			mflist.removeAll();
	 		   			mfaccountList2.removeAll();
	 		   			
	 		   			
	 		   		if(typeof(invocationResult.faml.response.txndata.txn.commonlists.unitholderid)=='object'){

						cardcount = invocationResult.faml.response.txndata.txn.commonlists.unitholderid;

						  $(cardcount).each(function(index, obj) {
	 		 		       		mfaccountList1.push({ cardNo:cardcount[index]});
	 		 		       		
	 		 		       		});
    				}
    				else{

    					   $(cardcount).each(function(index, obj) {
    		 		       		mfaccountList1.push({ cardNo: obj.unitholderid});
    		 		       		
    		 		       		});
    				}  
	 		       	 
	 		       	    
	 		       	    
	 		       	    
	 		       	 mflist.push({ amcid: "ALL",amcname:"All Mutual Funds"});
	 		       	    $(invocationResult.faml.response.txndata.txn.commonlists.amcdetails).each(function(index, obj) {
	 		       	    	mflist.push({ amcid: obj.amcid,amcname: obj.amcname});
	 		       		
	 		       		});
	 		       	   
	 		   		}
	 				}
	 		   	/*}else{
	 		   		errmsg = invocationResult.faml.response.rc.errormessage;
	 		   		handleError(invocationResult.faml.response);
	 		   	}*/
	 		   	}
	 			else {
	   	    			
		   	    		handleError(invocationResult.faml);
    				 window.location =  '#rrasm01';
		   	    		}
	 		   }
	 		   };

	 		   self.rrost01Submit  = function(){
	 		       
	 		   	if($("#frmrrost01").valid()){
	 		          	

	 		    	fldLoginUserId = Regloginuid;
	 		   	    	fldFCDBSessionId = RegfldFCDBSessionId;
	 		           	fldjsessionid = Regfldjsessionid;
	 		           	fldSessionId = Rsessionid;
	 		   	
	 		   	
	 		   	var $form = $("#frmrrost01");
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
	 			 	
	 			  reqParams["fldRequestId"] =RegfldRequestId;

	 		    	fldjsessionid = Regfldjsessionid;
	 		    	reqParams["fldLoginUserId"] =Regloginuid;
	 		    	reqParams["fldSessionId"] = Rsessionid;
	 			   
	 			var invocationData = {
	 	    			adapter : "mf",
	 	        		procedure : "RROST02",
	 	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	 	    	};
	 			busyInd.show(); 
	 		   	//WL.Logger.debug(invocationData, '');
	 		   	WL.Client.invokeProcedure(invocationData, {
	 		   		onSuccess : rrost02Response,
	 		   		onFailure : AdapterFail,
	 		   		timeout: timeout
	 		   	});
	 		   	}
	 		   };   
	 		  rrost02Response = function(result){
	 		   	    	busyInd.hide();
	 		   	    	invocationResult = result.invocationResult;
	 		   	    	if(invocationResult.isSuccessful) {
	 		   	    		if(invocationResult.faml.response){	
	 		   	    		//if(invocationResult.faml.response.rc.returncode == 0){
	 		   	    			if (invocationResult.faml.response.rc!= undefined) {
	 		        				handleError(invocationResult.faml.response);
	 		        				 window.location =  '#rrasm01';
	 		        			} else {
	 		        			   
	 		   	    			window.location = "#rrost02";
	 		   	    			$("#contentData").load("Views/MF/rrost02.html", null, function (response, status, xhr) {
	 		   	    	            if (status != "error") {}
	 		   	    	            
	 		   	    	     	if(window.location.hash == "#rrost02"){
	 		   	 	   			
	 		   	 	   			cardcount=invocationResult.faml.response.txndata.txn;
	 		   	 	   	$("#fldfromdate").val(invocationResult.faml.request.fromdate);
	 		   	 	   	$("#fldtodate").val(invocationResult.faml.request.todate);
	 		   		    $("#cdate").html(invocationResult.faml.systemdate);
	 		   	 	   			//totAccount=cardcount.length;
	 		   	 	   		
	 		   	 	   	
	 		   	 	   			/*mfaccountList1.removeAll();
	 		   	 	   			mflist.removeAll();
	 		   	 	       	    $(cardcount.commonlists).each(function(index, obj) {
	 		   	 	       		mfaccountList1.push({ cardNo: obj.unitholderid});
	 		   	 	       		
	 		   	 	       		});
	 		   	 	       	 mflist.push({ amcid: "All",amcname:"All Mutual Funds"});
	 		   	 	       	    $(cardcount.amcdetails).each(function(index, obj) {
	 		   	 	       	    	mflist.push({ amcid: obj.amcid,amcname: obj.amcname});
	 		   	 	       		
	 		   	 	       		});
	 		   	 	    	   */
	 		   	 	   		
	 		   	 	   		//Nofund
	 		   	 	   	  	if(cardcount.orderdetails!= undefined){
	 			   	 	   		
	 			   	 	   		$('#Nofund').hide();
	 			   	 	   	}
	 			   	 	   		else{
	 			   	 	   		$('#Nofund').show();
	 			   	 	   	
	 			   	 	   		}	
	 		   	 	   	  	
	 		   	 
	 		   	 	   	  	
	 		   	 	   		mfaccountList2.removeAll();
	 	   	 	       	    $(cardcount.orderdetails).each(function(index, obj) {
	 	   	 	       	 mfaccountList2.push({ txnunits: formatAmt(obj.txnunits),txnno: obj.txnno,tofundid: obj.tofundid,amcname: obj.amcname,status: obj.status,txnamt: formatAmt(obj.txnamt),ordertype: obj.ordertype,txndate: obj.txndate,fundname: obj.fundname});
	 	   	 	       		
	 	   	 	       		});
	 		   	 	       
	 		   	 	   		}
	 		   	    	            ko.applyBindings(self, $(".dynamic-page-content").get(0));
	 		   	    	    	});
	 		   	    			
	 		        			}	
	 		   	    			/*}else{
	 		   	    			errmsg = invocationResult.faml.response.rc.errormessage;
	 		   	    			handleError(invocationResult.faml.response);
	 		   	    		}*/
	 		   	    		}
	 		   	    	else {
 		   	    			
	 		   	    		handleError(invocationResult.faml);
	        				 //window.location =  '#rrasm01';
	 		   	    		}
	 		   	    	}
	 		   	    };
	 		   	
	 		   	 self.rrost02Submit = function(){
	 			       
	 		 	   	if($("#frmrrost02").valid()){
	 		 	   	mfaccountList2.removeAll();
	 		 	   	      	

	 		 	 	fldLoginUserId = Regloginuid;
	 		 		    	fldFCDBSessionId = RegfldFCDBSessionId;
	 		 	        	fldjsessionid = Regfldjsessionid;
	 		 	        	fldSessionId = Rsessionid;
	 		 	   	
	 		 	   	
	 		 	   	
	 		 	   	var $form = $("#frmrrost02");
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
	 				 	 
	 				  reqParams["fldRequestId"] =RegfldRequestId;

	 			    	fldjsessionid = Regfldjsessionid;
	 			    	reqParams["fldLoginUserId"] =Regloginuid;
	 			    	reqParams["fldSessionId"] = Rsessionid;
	 				   
	 				var invocationData = {
	 		    			adapter : "mf",
	 		        		procedure : "RROST02",
	 		        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	 		    	};
	 				busyInd.show();  
	 			   	//WL.Logger.debug(invocationData, '');
	 			   	WL.Client.invokeProcedure(invocationData, {
	 			   		onSuccess : rrost03Response,
	 			   		onFailure : AdapterFail,
	 			   		timeout: timeout
	 		 	   	});
	 		 	   	}
	 		 	   };   
	 		 	 rrost03Response = function(result){
	 		 	   	    	busyInd.hide();
	 		 	   	    	invocationResult = result.invocationResult;
	 		 	   	    	if(invocationResult.isSuccessful) {
	 		 	   	    		if(invocationResult.faml.response){	
	 		 	   	    		//if(invocationResult.faml.response.rc.returncode == 0){
	 		 	   	    			//window.location = "#rrvpr03";
	 		 	   	    		//alert(invocationResult.faml.response.txndata.txn);
	 		 	   	    		if (invocationResult.faml.response.rc!= undefined) {
	 		        				handleError(invocationResult.faml.response);
	 		        				 window.location =  '#rrasm01';
	 		        			} else {
	 		        			   
	 		 	   	    	     	if(window.location.hash == "#rrost02"){
	 		 	   	 	   			
	 		 	   	 	   			cardcount=invocationResult.faml.response.txndata.txn;
	 		 	   	 	   			//totAccount=cardcount.length;
	 		 	   	 	  	$("#fldfromdate").val(invocationResult.faml.request.fromdate);
		 		   	 	   	$("#fldtodate").val(invocationResult.faml.request.todate);
		 		   		    $("#cdate").html(invocationResult.faml.systemdate);
	 		 	   	 	   		
	 		 	   	 	   			/*mfaccountList1.removeAll();
	 		 	   	 	   			mflist.removeAll();
	 		 	   	 	       	    $(cardcount).each(function(index, obj) {
	 		 	   	 	       		mfaccountList1.push({ cardNo: obj.unitholderid});
	 		 	   	 	       		
	 		 	   	 	       		});
	 		 	   	 	       	 mflist.push({ amcid: "All",amcname:"All Mutual Funds"});
	 		 	   	 	       	    $(cardcount.amcdetails).each(function(index, obj) {
	 		 	   	 	       	    	mflist.push({ amcid: obj.amcid,amcname: obj.amcname});
	 		 	   	 	       		
	 		 	   	 	       		});
	 		 	   	 	       	   */
	 		 	   	 	   	if(cardcount.orderdetails!= undefined){
	 		   	 	   		
	 		   	 	   		$('#Nofund').hide();
	 		   	 	   	}
	 		   	 	   		else{
	 		   	 	   		$('#Nofund').show();
	 		   	 	   	
	 		   	 	   		}		
	 		 	   	 	   	
	 		 	   		mfaccountList2.removeAll();
 	   	 	       	    $(cardcount.orderdetails).each(function(index, obj) {
 	   	 	       	 mfaccountList2.push({ txnunits: formatAmt(obj.txnunits),txnno: obj.txnno,tofundid: obj.tofundid,amcname: obj.amcname,status: obj.status,txnamt: formatAmt(obj.txnamt),ordertype: obj.ordertype,txndate: obj.txndate,fundname: obj.fundname});
 	   	 	       		
 	   	 	       		});
	 		 	   	 	   		}
	 		 	   	    	       
	 		 	   	    			
	 		        			}		
	 		 	   	    			/*}else{
	 		 	   	    			errmsg = invocationResult.faml.response.rc.errormessage;
	 		 	   	    			handleError(invocationResult.faml.response);
	 		 	   	    		}
	 		 	   	    		*/
	 		 	   	    		}
	 		 	   	   	else {
 		   	    			
	 		   	    		handleError(invocationResult.faml);
	        				 //window.location =  '#rrasm01';
	 		   	    		}
	 		 	   	    	}
	 		 	   	    };
	 	   	    
	 		 	   	/**************End Order Status **********************/ 
	 		 	   	  /**************Start Purchase **********************/ 
	 		 	   	    
		 		 		   this.callrrobu01 = function(){
		 		 		   	
		 		 		   	
		 		 			   reqParams = {};
		 		 				
		 		 		    	reqParams["fldDeviceId"] = fldDeviceId;
		 		 		    	reqParams["fldWebServerId"] = fldWebServerId;
		 		 		    	reqParams["fldAppId"] = fldAppId;
		 		 		    	reqParams["fldAppServerId"] = fldAppServerId;
		 		 		    	reqParams["fldLangId"] = fldLangId;
		 		 		    	reqParams["fldModule"] = fldModule;
		 		 		    	reqParams["fldSwitchAppId"] = "";
		 		 		    	reqParams["fldModule"] = "CH";
		 		 		    	reqParams["fldTxnId"] = "OBU";
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
		 		 		    			adapter : "mf",
		 		 		        		procedure : "RROBU01",
		 		 		        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
		 		 		    	};
		 		 		   	
		 		 		   	WL.Client.invokeProcedure(invocationData, {
		 		 		   		onSuccess : loadrrobu01,
		 		 		   		onFailure : AdapterFail,	    		
		 		 		   		timeout: timeout
		 		 		   	});
		 		 		   	
		 		 		   	
		 		 		   	if(window.location.hash == '#rrobu01'){
		 		 		   		templateId = "rrobu01";
		 		 		   	}else{
		 		 		   		templateId = "rrobu01";
		 		 		   	}
		 		 		   	
		 		 		   	$("#contentData").load("Views/MF/"+templateId+".html", null, function (response, status, xhr) {
		 		 		           if (status != "error") {}
		 		 		           ko.applyBindings(self, $(".dynamic-page-content").get(0));     
		 		 		   	
		 		 		           
		 		 		           
		 		 		               
		 		 		   	});
		 		 		   	
		 		 		   };

		 		 		   loadrrobu01 = function(result){
		 		 		   
		 		 		   busyInd.hide();
		 		 		   invocationResult = result.invocationResult;
		 		 		   if(invocationResult.isSuccessful) {
		 		 		   	if(invocationResult.faml.response){	
		 		 		   	//if(invocationResult.faml.response.rc.returncode == 0){
		 		 		   		if (invocationResult.faml.response.rc!= undefined) {
		 		 					handleError(invocationResult.faml.response);
		 		 					 window.location =  '#rrasm01';
		 		 				} else {
		 		 				   
		 		 		   		if(window.location.hash == "#rrobu01"){
		 		 		   			
		 		 		   			cardcount=invocationResult.faml.response.txndata.txn.commonlists;
		 		 		   			totAccount=cardcount.length;
		 		 		   		
		 		 		   			if(totAccount > 0)
		 		 		   			{$('#ErrMsg').hide();}
		 		 		   		else{
		 		 		   			$('#ErrMsg').show();
		 		 		   		}
		 		 		   			mfaccountList1.removeAll();
		 		 		   			mflist.removeAll();
		 		 		   			mfaccountList2.removeAll();
		 		 		   			
		 		 		   			
		 		 		   		if(typeof(invocationResult.faml.response.txndata.txn.commonlists.unitholderid)=='object'){

									cardcount = invocationResult.faml.response.txndata.txn.commonlists.unitholderid;

									  $(cardcount).each(function(index, obj) {
				 		 		       		mfaccountList1.push({ cardNo:cardcount[index]});
				 		 		       		
				 		 		       		});
		        				}
		        				else{

		        					  $(cardcount).each(function(index, obj) {
				 		 		       		mfaccountList1.push({ cardNo: obj.unitholderid});
				 		 		       		
				 		 		       		});
		        				}  
		 		 		   			
		 		 		   			
		 		 		       	  
		 		 		       	    
		 		 		       	    
		 		 		       	    
		 		 		       	    
		 		 		       	 mflist.push({ amcid: "ALL",amcname:"All Mutual Funds"});
		 		 		       	    $(invocationResult.faml.response.txndata.txn.commonlists.amcdetails).each(function(index, obj) {
		 		 		       	    	mflist.push({ amcid: obj.amcid,amcname: obj.amcname});
		 		 		       		
		 		 		       		});
		 		 		       	   
		 		 		   		}
		 		 				}
		 		 		   	/*}else{
		 		 		   		errmsg = invocationResult.faml.response.rc.errormessage;
		 		 		   		handleError(invocationResult.faml.response);
		 		 		   	}*/
		 		 		   	}	else {
	 		   	    			
		 		   	    		handleError(invocationResult.faml);
		        				 window.location =  '#rrasm01';
		 		   	    		}
		 		 		   	
		 		 		   }
		 		 		   };

		 		 		   self.rrobu01Submit  = function(){
		 		 		       
		 		 		   	if($("#frmrrobu01").valid()){
		 		
		 		 		   	

			 	        	fldLoginUserId = Regloginuid;
			 	       	    	fldFCDBSessionId = RegfldFCDBSessionId;
			 	               	fldjsessionid = Regfldjsessionid;
			 	               	fldSessionId = Rsessionid;
			 	               fldFCDBRequestId=RegfldRequestId;
		 		 		   	var $form = $("#frmrrobu01");
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
		 		 		   	
		 		 		  reqParams["fldRequestId"] =RegfldRequestId;

		 			    	fldjsessionid = Regfldjsessionid;
		 			    	reqParams["fldLoginUserId"] =Regloginuid;
		 			    	reqParams["fldSessionId"] = Rsessionid;
		 		 		   	
		 			 	        	var invocationData = {
		 			 		    			adapter : "mf",
		 			 		        		procedure : "RRASH02",
		 			 		        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
		 			 		    	};
		 			 	        	
		 			 	        	
		 			 	        	busyInd.show();
		 			 	        	WL.Client.invokeProcedure(invocationData, {
		 			 	        		onSuccess : self.rrash02Response,
		 			 	        		onFailure : AdapterFail,
		 			 	        		timeout: timeout
		 			 	        	});
		 			 	        	}   
		 		 		   };   
		 		 		   
		 		 
		 		 		   
		 		 		    this.loadrrobu02 = function(result){
		 		 		    	
		 		 		    	invocationResult = result.invocationResult;
			 		        	if(invocationResult.isSuccessful) {
			 		        		if(invocationResult.faml.response){	        			
			 		        			accstmtdata=invocationResult;  
			 		    	    			window.location = "#rrobu02"; 
			 		    	    			if (accstmtdata.faml.response.txndata.txn.fundinfo!=undefined){
			 		 		 		    		unitholderid = accstmtdata.faml.request.unitholderid;
			 		 		 		    		amcname      = accstmtdata.faml.response.txndata.txn.fundinfo.amcname;
			 		 		 		    		fundname = accstmtdata.faml.response.txndata.txn.fundinfo.fundname;
			 		 		 		    		navandnavdate = formatAmt(parseFloat(accstmtdata.faml.response.txndata.txn.fundinfo.nav)) +" as on "+accstmtdata.faml.response.txndata.txn.fundinfo.navdate;
			 		 		 		    		cutofftime = accstmtdata.faml.response.txndata.txn.fundinfo.cutofftime;
			 		 		 		    		minamtandstepamt = accstmtdata.faml.response.txndata.txn.fundinfo.minamt+" in multiples of "+accstmtdata.faml.response.txndata.txn.fundinfo.stepamt;
			 		 		 		    		minamtaddtnlandstepamtaddtnl = accstmtdata.faml.response.txndata.txn.fundinfo.minamtaddtnl+" in multiples of "+accstmtdata.faml.response.txndata.txn.fundinfo.stepamtaddtnl;

			 		 		 		    		var currentholdingamt="0.00";
			 		 		 		    		if(accstmtdata.faml.response.txndata.txn.fundinfo.currentholdingamt!=""){
			 		 		 		    			currentholdingamt=accstmtdata.faml.response.txndata.txn.fundinfo.currentholdingamt;
			 		 		 		    			
			 		 		 		    		}
			 		 		 		    		
			 		 		 		    		if(accstmtdata.faml.response.txndata.txn.fundinfo.addtnlpurchase!='Y'){
					 			 		 		       minamtVal = accstmtdata.faml.response.txndata.txn.fundinfo.minamt;

			 		 		 		    			
			 		 		 		    		}
			 		 		 		    		else if(accstmtdata.faml.response.txndata.txn.fundinfo.addtnlpurchase =='Y'){
					 			 		 		       minamtVal = accstmtdata.faml.response.txndata.txn.fundinfo.minamtaddtnl;

			 		 		 		    			
			 		 		 		    		}
			 			 		 		    //isin = accstmtdata.response.txn.fundinfo.isin;
					 		         		//fldfundname2 = accstmtdata.request.fldfundname2;
					 		         		//fldfundcode2 = accstmtdata.request.fldfundcode2;
			 		 		 		    		mfaccountList3.removeAll();
			 		 		 		       	    $(accstmtdata.faml.response.txndata.txn.commonlists.account).each(function(index, obj) {
			 		 		 		       		mfaccountList3.push({ accountno: obj.accountno});
			 		 		 		       		
			 		 		 		       		});
			 		 		 		    		
			 		 		 		    	}
			 		        		}
			 		        		else {
			 		   	    			
				 		   	    		handleError(invocationResult.faml);
				        				 //window.location =  '#rrasm01';
				 		   	    		}
			 		        	}
			 		        	busyInd.hide();
		 		 		    	
		 		 		    	
		 		 		    	
		 		 		    	
		 		 		    	
		 		 		    
		 		 		  
		 		 		    	
		 		 		    	//alert(fldfromacctno);
		 		 		    	
		 		 			    $("#contentData").load("Views/MF/rrobu02.html", null, function (response, status, xhr) {
		 		 		            if (status != "error") {}	
		 		                    $("#fldMinAmt1").val(minamtVal);
		 		 		            $("#unitholderid").html(unitholderid);
		 		 		            $("#amcname").html(amcname);
		 		 		        	$("#currentholdingamt").html(formatAmt(parseFloat(currentholdingamt)));
		 		 		        	$("#fundname").html(fundname);
		 		 		        	
		 		 		        	$("#navandnavdate").html(navandnavdate);
		 		 		        	$("#cutofftime").html(cutofftime);
		 		 		        	$("#minamtandstepamt").html(minamtandstepamt);
		 		 		        	$("#minamtaddtnlandstepamtaddtnl").html(minamtaddtnlandstepamtaddtnl);
		 		 		        	
		 		 		        	 $("#fldUhid").val(unitholderid);
		 		 		        	 $("#fldFundCode").val(accstmtdata.faml.request.fundid);
		 		 		        	 $("#fldAmcId").val(accstmtdata.faml.request.amcid);
		 		 		        	 $("#fldFundName").val(fundname);
		 		 		        	 $("#fldAmcId").val(accstmtdata.faml.request.amcid);
		 		 		        	 $("#fldFundCurr").val(accstmtdata.faml.response.txndata.txn.fundinfo.fundcurr);
		 		 		        	 $("#fldSettlementDate").val(accstmtdata.faml.response.txndata.txn.fundinfo.settlementdate);
		 		 		        	 //$("#fldIsin").val(accstmtdata.faml.request.amcid);
		 		 		        	$("#fldRequestId").val(accstmtdata.faml.mci.requestid);
		 		 		          //$("#fldIsin").val(isin);
		 		                 //$("#fldfundname2").val(fldfundname2);
		 		                 //$("#fldfundcode2").val(fldfundcode2);
		 		                 
		 		               
		 		 		        	
		 		 	

		 		 		            ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
		 		 		        });
		 		 			    busyInd.hide();
		 		 		    };
		 		 		   
		 		 		  self.rrobu02Submit  = function(){
		 		 		       
			 		 		   	if($("#frmrrobu02").valid()){
			 		 		       	
			 		 		   	fldLoginUserId = Regloginuid;
			 			    	fldFCDBSessionId = RegfldFCDBSessionId;
			 		        	fldjsessionid = Regfldjsessionid;
			 		        	fldSessionId = Rsessionid;
			 		 			minamtval = $("#fldMinAmt1").val();
			 		        	fldtyval = $("#fldTypeValue").val();
			 		        	flagamt = true;
			 		         	var redigit = /^[0-9]+$/;
			 		         	
			 		         	if(fldtyval==""){
			 		        		alert("Please Enter Amount");
			 		        		flagamt = false;
			 		        	}
			 		         	else if(parseFloat(fldtyval) < parseFloat(minamtval)){
			 		        		alert("Enter Amount greater than minimum amount");
			 		        		flagamt = false;
			 		        	}
			 		        	else if(!redigit.test(fldtyval)){
		 		    				alert("Please Enter Numeric No. of Amount");
		 		    				flagamt = false;
		 		    				return false;
		 		    			}
			 		  
			 		        if(flagamt){
			 		 		   	
			 		 		   	var $form = $("#frmrrobu02");
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
			 		 	    	
			 		 	    	
			 		 			var invocationData = {
			 		 	    			adapter : "mf",
			 		 	        		procedure : "RROBU03",
			 		 	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
			 		 	    	};
			 		 			busyInd.show();    
			 		 		   	//WL.Logger.debug(invocationData, '');
			 		 		   	WL.Client.invokeProcedure(invocationData, {
			 		 		   		onSuccess : rrobu03Response,
			 		 		   		onFailure : AdapterFail,
			 		 		   		timeout: timeout
			 		 		   	});
			 		 		   	}
			 		 		   	
			 		 		   	}
			 		 		   };   
			 		 		   
			 		 		 rrobu03Response = function(result){
			 		   	    	busyInd.hide();
			 		   	    	invocationResult = result.invocationResult;
			 		   	    	if(invocationResult.isSuccessful) {
			 		   	    		if(invocationResult.faml.response){	
			 		   	    		//if(invocationResult.faml.response.rc.returncode == 0){
			 		   	    		if (invocationResult.faml.rc!= undefined) {
		 		        				handleError(invocationResult.faml);
		 		        				 window.location =  '#rrasm01';
		 		        			} else {
			 		        			   
			 		   	    			window.location = "#rrobu03";
			 		   	    			$("#contentData").load("Views/MF/rrobu03.html", null, function (response, status, xhr) {
			 		   	    	            if (status != "error") {}
			 		   	    	            
			 		   	    	     	if(window.location.hash == "#rrobu03"){
			 		   	 	   			
			 		   	 	   			
			 		   	 	   	unitholderid = invocationResult.faml.request.unitholderid;
	 		 		    		amcname      = invocationResult.faml.response.txndata.txn.fundinfo.amcname;
	 		 		    		fundname = invocationResult.faml.response.txndata.txn.fundinfo.fundname;
	 		 		    		cutofftime = invocationResult.faml.response.txndata.txn.fundinfo.cutofftime;
	 		 		    		accountno = invocationResult.faml.request.accountno;
	 		 		    		amount = invocationResult.faml.request.amount;
	 		 		    		
	 		 		    		
	 		 		    						$("#unitholderid").html(unitholderid);
	 		 		    						$("#amcname").html(amcname);
	 		 		    						$("#fundname").html(fundname);
	 		 		    						$("#cutofftime").html(cutofftime);
	 		 		    						$("#accountno").html(accountno);
	 		 		    						$("#amount").html(formatAmt(parseFloat(amount)));

	 		 		    						$("#fldRequestId").val(accstmtdata.faml.mci.requestid);
	 		 		    						$("#fldUhid").val(unitholderid);
	 		 		    						$("#fldFundCode").val(invocationResult.faml.request.fundid);
	 		 		    						$("#fldAmcId").val(invocationResult.faml.request.amcid);
	 		 		    						$("#fldAccount").val(accountno);
	 		 		    						$("#fldTypeValue").val(amount);
	 		 		    				}
			 		   	    	            ko.applyBindings(self, $(".dynamic-page-content").get(0));
			 		   	    	    	});
			 		   	    			
			 		        			}	
			 		   	    			/*}else{
			 		   	    			errmsg = invocationResult.faml.response.rc.errormessage;
			 		   	    			handleError(invocationResult.faml.response);
			 		   	    		}*/
			 		   	    		}
			 		   	    	else {
		 		   	    			
			 		   	    		handleError(invocationResult.faml);
			        				 //window.location =  '#rrasm01';
			 		   	    		}
			 		   	    	}
			 		   	    };
			 		   	   
			 		   	self.rrobu03Submit  = function(){
		 		 		       
		 		 		   	if($("#frmrrobu03").valid()){
		 		 		        	
		 		 		   	fldLoginUserId = Regloginuid;
		 			    	fldFCDBSessionId = RegfldFCDBSessionId;
		 		        	fldjsessionid = Regfldjsessionid;
		 		        	fldSessionId = Rsessionid;
		 		 		   	
		 		 		   	
		 		 		   	var $form = $("#frmrrobu03");
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
		 		 		  
		 		 		  reqParams["fldRequestId"] =RegfldRequestId;

		 			    	fldjsessionid = Regfldjsessionid;
		 			    	reqParams["fldLoginUserId"] =Regloginuid;
		 			    	reqParams["fldSessionId"] = Rsessionid;
		 		 		   	
		 		 			var invocationData = {
		 		 	    			adapter : "mf",
		 		 	        		procedure : "RROBU04",
		 		 	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
		 		 	    	};
		 		 			busyInd.show();   
		 		 		   	//WL.Logger.debug(invocationData, '');
		 		 		   	WL.Client.invokeProcedure(invocationData, {
		 		 		   		onSuccess : rrobu04Response,
		 		 		   		onFailure : AdapterFail,
		 		 		   		timeout: timeout
		 		 		   	});
		 		 		   	}
		 		 		   };   
		 		 		   
		 		 		 rrobu04Response = function(result){
		 		   	    	busyInd.hide();
		 		   	    	invocationResult = result.invocationResult;
		 		   	    	if(invocationResult.isSuccessful) {
		 		   	    		if(invocationResult.faml.response){	
		 		   	    		//if(invocationResult.faml.response.rc.returncode == 0){
		 		   	    			if (invocationResult.faml.rc!= undefined) {
		 		        				handleError(invocationResult.faml);
		 		        				 window.location =  '#rrwcm01';
		 		        			} 
		 		   	    			else {
		 		        			   
		 		   	    			window.location = "#rrobu04";
		 		   	    			$("#contentData").load("Views/MF/rrobu04.html", null, function (response, status, xhr) {
		 		   	    	            if (status != "error") {}
		 		   	    	            
		 		   	    	     	if(window.location.hash == "#rrobu04"){
		 		   	 	   			
		 		   	 	   			
		 		   	    	    	txnnumber= invocationResult.faml.response.txnreply.txnnumber;
			 		   	    	    txndate = invocationResult.faml.response.txndata.txn.txndate;
									txndate = txndate.substring(6,8)+"-"+txndate.substring(4,6)+"-"+txndate.substring(0,4); 

			 		   	    	   tempdate = txndate;
			 		   	
		 		   	    	    
		 		   	   	 	   	unitholderid = invocationResult.faml.request.unitholderid;
	 		 		    		amcname      = invocationResult.faml.response.txndata.txn.fundinfo.amcname;
	 		 		    		fundname = invocationResult.faml.response.txndata.txn.fundinfo.fundname;
	 		 		    		cutofftime = invocationResult.faml.response.txndata.txn.fundinfo.cutofftime;
	 		 		    		accountno = invocationResult.faml.response.txndata.txn.account.accountno;
	 		 		    		amount = invocationResult.faml.request.amount;
	 		 		
	 		 		    		

	 		 		    		$("#unitholderid").html(unitholderid);
	 		 		    		$("#amcname").html(amcname);
	 		 		    		$("#fundname").html(fundname);
	 		 		    		$("#cutofftime").html(cutofftime);
	 		 		    		$("#accountno").html(accountno);
	 		 		    		$("#amount").html(formatAmt(parseFloat(amount)));


	 		 		    		$("#tempdate").html(tempdate);
	 		 		    		$("#txnnumber").html(txnnumber);
			 		    		
			 		    		
		 		   	 	   		}
		 		   	    	            ko.applyBindings(self, $(".dynamic-page-content").get(0));
		 		   	    	    	});
		 		   	    			
		 		        			}	
		 		   	    			/*}else{
		 		   	    			errmsg = invocationResult.faml.response.rc.errormessage;
		 		   	    			handleError(invocationResult.faml.response);
		 		   	    		}*/
		 		   	    		}
		 		   	    		else {
		 		   	    			
		 		   	    		handleError(invocationResult.faml);
		        				 //window.location =  '#rrasm01';
		 		   	    		}
		 		   	    	}
		 		   	    };
		 		   	      
		 		 		   
		 		 		  /**************End Purchase **********************/ 
		 		 		  /**************Start Redeem: **********************/ 
		 		 	   	    
		 		 		   this.callrrore01 = function(){
		 		 		   	
		 		 		   	
		 		 			   reqParams = {};
		 		 				
		 		 		    	reqParams["fldDeviceId"] = fldDeviceId;
		 		 		    	reqParams["fldWebServerId"] = fldWebServerId;
		 		 		    	reqParams["fldAppId"] = fldAppId;
		 		 		    	reqParams["fldAppServerId"] = fldAppServerId;
		 		 		    	reqParams["fldLangId"] = fldLangId;
		 		 		    	reqParams["fldModule"] = fldModule;
		 		 		    	reqParams["fldSwitchAppId"] = "";
		 		 		    	reqParams["fldModule"] = "CH";
		 		 		    	reqParams["fldTxnId"] = "ORE";
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
		 		 		    			adapter : "mf",
		 		 		        		procedure : "RRORE01",
		 		 		        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
		 		 		    	};
		 		 		   	
		 		 		   	WL.Client.invokeProcedure(invocationData, {
		 		 		   		onSuccess : loadrrore01,
		 		 		   		onFailure : AdapterFail,	    		
		 		 		   		timeout: timeout
		 		 		   	});
		 		 		   	
		 		 		   	
		 		 		   	if(window.location.hash == '#rrore01'){
		 		 		   		templateId = "rrore01";
		 		 		   	}else{
		 		 		   		templateId = "rrore01";
		 		 		   	}
		 		 		   	
		 		 		   	$("#contentData").load("Views/MF/"+templateId+".html", null, function (response, status, xhr) {
		 		 		           if (status != "error") {}
		 		 		           ko.applyBindings(self, $(".dynamic-page-content").get(0));     
		 		 		   	
		 		 		           
		 		 		           
		 		 		               
		 		 		   	});
		 		 		   	
		 		 		   };

		 		 		 loadrrore01 = function(result){
		 		 		   
		 		 		   busyInd.hide();
		 		 		   invocationResult = result.invocationResult;
		 		 		   if(invocationResult.isSuccessful) {
		 		 		   	if(invocationResult.faml.response){	
		 		 		   	//if(invocationResult.faml.response.rc.returncode == 0){
		 		 		   		if (invocationResult.faml.response.rc!= undefined) {
		 		 					handleError(invocationResult.faml.response);
		 		 					 window.location =  '#rrasm01';
		 		 				} else {
		 		 				   
		 		 		   		if(window.location.hash == "#rrore01"){
		 		 		   			
		 		 		   			cardcount=invocationResult.faml.response.txndata.txn.commonlists;
		 		 		   			totAccount=cardcount.length;
		 		 		   		
		 		 		   			if(totAccount > 0)
		 		 		   			{$('#ErrMsg').hide();}
		 		 		   		else{
		 		 		   			$('#ErrMsg').show();
		 		 		   		}
		 		 		   			mfaccountList1.removeAll();
		 		 		   			mflist.removeAll();
		 		 		   			mfaccountList2.removeAll();
		 		 		   			
		 		 		   			
		 		 		       	    
		 		 		       	    
		 		 		       	    
		 		 		       	if(typeof(invocationResult.faml.response.txndata.txn.commonlists.unitholderid)=='object'){

									cardcount = invocationResult.faml.response.txndata.txn.commonlists.unitholderid;

									$(cardcount).each(function(index, obj) {
			 		 		       		mfaccountList1.push({ cardNo: cardcount[index]});
			 		 		       		
			 		 		       		});
		        				}
		        				else{

		        					$(cardcount).each(function(index, obj) {
			 		 		       		mfaccountList1.push({ cardNo: obj.unitholderid});
			 		 		       		
			 		 		       		});
		        				}  
		 		 		       	    
		 		 		       	 mflist.push({ amcid: "All",amcname:"All Mutual Funds"});
		 		 		       	    $(invocationResult.faml.response.txndata.txn.commonlists.amcdetails).each(function(index, obj) {
		 		 		       	    	mflist.push({ amcid: obj.amcid,amcname: obj.amcname});
		 		 		       		
		 		 		       		});
		 		 		       	   
		 		 		   		}
		 		 				}
		 		 		   	/*}else{
		 		 		   		errmsg = invocationResult.faml.response.rc.errormessage;
		 		 		   		handleError(invocationResult.faml.response);
		 		 		   	}*/
		 		 		   	}
		 		 			else {
	 		   	    			
		 		   	    		handleError(invocationResult.faml);
		        				 window.location =  '#rrasm01';
		 		   	    		}
		 		 		   }
		 		 		   };

		 		 		   self.rrore01Submit  = function(){
		 		 		       
		 		 		   	if($("#frmrrore01").valid()){
		 		 		   	       	
		 		 		   	fldLoginUserId = Regloginuid;
		 			    	fldFCDBSessionId = RegfldFCDBSessionId;
		 		        	fldjsessionid = Regfldjsessionid;
		 		        	fldSessionId = Rsessionid;
		 		 		   	
		 		 		   	
		 		 		   	var $form = $("#frmrrore01");
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
		 		 	    	
		 		 	    	reqParams["fldRequestId"] =RegfldRequestId;

		 			    	fldjsessionid = Regfldjsessionid;
		 			    	reqParams["fldLoginUserId"] =Regloginuid;
		 			    	reqParams["fldSessionId"] = Rsessionid;
		 		 	    	
				 	        	var invocationData = {
				 		    			adapter : "mf",
				 		        		procedure : "RRASH02",
				 		        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
				 		    	};
				 	        	
				 	        	
				 	        	busyInd.show();
				 	        	WL.Client.invokeProcedure(invocationData, {
				 	        		onSuccess : self.rrash02Response,
				 	        		onFailure : AdapterFail,
				 	        		timeout: timeout
				 	        	});
				 	        	}   
			 		   };     
		 		 		   
		 		 		   
		 		 		    this.loadrrore02 = function(result){
		 		 		    	invocationResult = result.invocationResult;
			 		        	if(invocationResult.isSuccessful) {
			 		        		if(invocationResult.faml.response){	        			
			 		        			accstmtdata=invocationResult;  
			 		    	    			window.location = "#rrore02"; 
			 		    	    			if (accstmtdata.faml.response.txndata.txn.fundinfo!=undefined){
			 		 		 		    		unitholderid = accstmtdata.faml.request.unitholderid;
			 		 		 		    		amcname      = accstmtdata.faml.response.txndata.txn.fundinfo.amcname;
			 		 		 		    		fundname = accstmtdata.faml.response.txndata.txn.fundinfo.fundname;
			 		 		 		    		navandnavdate = formatAmt(parseFloat(accstmtdata.faml.response.txndata.txn.fundinfo.nav)) +"as on"+accstmtdata.faml.response.txndata.txn.fundinfo.navdate;
			 		 		 		    		cutofftime = accstmtdata.faml.response.txndata.txn.fundinfo.cutofftime;
			 		 		 		    		minamtandstepamt = accstmtdata.faml.response.txndata.txn.fundinfo.minamt+"in multiples of"+accstmtdata.faml.response.txndata.txn.fundinfo.stepamt;
			 		 		 		    		minunits = accstmtdata.faml.response.txndata.txn.fundinfo.minunits;

			 		 		 		    		//var currentholdingamt="0.00";
			 		 		 		    		//if(accstmtdata.faml.response.txndata.txn.fundinfo.currentholdingamt!=""){
			 		 		 		    			//currentholdingamt=accstmtdata.faml.response.txndata.txn.fundinfo.currentholdingamt;
			 		 		 		    			
			 		 		 		    		//}
			 		 		 		    		
			 		 		 		    		mfaccountList3.removeAll();
			 		 		 		       	    $(accstmtdata.faml.response.txndata.txn.commonlists.account).each(function(index, obj) {
			 		 		 		       		mfaccountList3.push({ accountno: obj.accountno});
			 		 		 		       		
			 		 		 		       		});
			 		 		 		    		
			 		 		 		    	}
			 		        		}
			 		        		else {
			 		   	    			
				 		   	    		handleError(invocationResult.faml);
				        				 //window.location =  '#rrasm01';
				 		   	    		}
			 		        	}
			 		        	
		 		 		    	
		 		 		    	
		 		 		    	
		 		 		    	
		 		 		    	
		 		 		    
		 		 		  
		 		 		    	
		 		 		    	//alert(fldfromacctno);
		 		 		    	
		 		 			    $("#contentData").load("Views/MF/rrore02.html", null, function (response, status, xhr) {
		 		 		            if (status != "error") {}	
		 		 		            
		 		 		            $("#unitholderid").html(unitholderid);
		 		 		            $("#amcname").html(amcname);
		 		 		        	//$("#fundname").html(formatAmt(parseFloat(fldamttxn)));
		 		 		        	$("#fundname").html(fundname);
		 		 		        	
		 		 		        	$("#navandnavdate").html(navandnavdate);
		 		 		        	$("#cutofftime").html(cutofftime);
		 		 		        	$("#minamtandstepamt").html(minamtandstepamt);
		 		 		        	$("#minunits").html(minunits);
		 		 		        	
		 		 		        	 $("#fldUhid").val(unitholderid);
		 		 		        	 $("#fldFundCode").val(accstmtdata.faml.request.fundid);
		 		 		        	 $("#fldAmcId").val(accstmtdata.faml.request.amcid);
		 		 		        	 $("#fldMinAmt1").val(accstmtdata.faml.response.txndata.txn.fundinfo.minamt);
		 		 		        	 $("#fldMinUnt1").val(accstmtdata.faml.response.txndata.txn.fundinfo.minunits);
		 		 		        	 $("#fldAccount").val(accstmtdata.faml.response.txndata.txn.account.accountno);
		 		 		        	 $("#fldfundname2").val(accstmtdata.faml.request.fldfundname2);
		 		 		        	 $("#fldfundcode2").val(accstmtdata.faml.request.fldfundcode2);
		 		 		        	 
		 		 		        	

		 		 		        	 
		 		 	

		 		 		            ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
		 		 		        });
		 		 			    busyInd.hide();
		 		 			    
		 		 		    };
		 		 		   
		 		 		  self.rrore02Submit  = function(){
		 		 		       
			 		 		   	if($("#frmrrore02").valid()){
			 		 		   	   	
			 		 		   	fldLoginUserId = Regloginuid;
			 			    	fldFCDBSessionId = RegfldFCDBSessionId;
			 		        	fldjsessionid = Regfldjsessionid;
			 		        	fldSessionId = Rsessionid;	
			 					var redigit = /^[0-9]+$/;
			 					
			 					minamtval = $("#fldMinAmt1").val();
			 		        	minunitval = $("#fldMinUnt1").val();
			 		        	fldAmount = $("#fldAmount").val();
			 		        	fldUnits = $("#fldUnits").val();
			 		        	partifull = $("#fldPartialFull").val();
			 		        	flagamt = true;
			 		        	
			 		        	if(partifull == 'P'){
			 		        		
			 		        		if($.trim(fldAmount) =='' && $.trim(fldUnits) == ''){
			 		    				alert("Please Enter either Amount or Units");
			 		    				flagamt = false;    				
			 		    			}
			 		        		else if($.trim(fldAmount) && $.trim(fldUnits)){
			 		    				alert("Please Enter either Amount or Units not both");
			 		    				flagamt = false;
			 		    				
			 		    			}
			 		        		
			 		        		else if($.trim(fldAmount) != '' || $.trim(fldUnits) != ''){
			 		        		
			 		        		if($.trim(fldAmount) != ''){
			 				        	if(parseFloat(fldAmount) < parseFloat(minamtval)){
			 				        		alert("Enter Amount greater than minimum Amount");
			 				        		flagamt = false;
			 				        	}
			 				        	else if(!redigit.test(fldAmount)){
				 		    				alert("Please Enter Numeric No. of Amount");
				 		    				flagamt = false;
				 		    				return false;
				 		    			}
			 		        		}
			 		        		if($.trim(fldUnits) != ''){
			 		        			if(parseFloat(fldUnits) < parseFloat(minunitval)){
			 				        		alert("Enter Units greater than minimum Units");
			 				        		flagamt = false;
			 				        	}
			 		        			else if(!redigit.test(fldUnits)){
				 		    				alert("Please Enter Numeric No. of Units");
				 		    				flagamt = false;
				 		    				return false;
				 		    			}
			 		        		}
			 			        	
			 		        		}
			 		        	}
			 		        	
			 		        	if(flagamt){
			 		 		   	
			 		 		   	var $form = $("#frmrrore02");
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
			 		 			 	 
			 		 			 reqParams["fldRequestId"] =RegfldRequestId;

			 			    	fldjsessionid = Regfldjsessionid;
			 			    	reqParams["fldLoginUserId"] =Regloginuid;
			 			    	reqParams["fldSessionId"] = Rsessionid;
			 		 			   
			 		 			var invocationData = {
			 		 	    			adapter : "mf",
			 		 	        		procedure : "RRORE03",
			 		 	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
			 		 	    	};
			 		 			busyInd.show();     
			 		 		   	//WL.Logger.debug(invocationData, '');
			 		 		   	WL.Client.invokeProcedure(invocationData, {
			 		 		   		onSuccess : rrore03Response,
			 		 		   		onFailure : AdapterFail,
			 		 		   		timeout: timeout
			 		 		   	});
			 		 		   	}
			 		 		   	}
			 		 		   };   
			 		 		   
			 		 		 rrore03Response = function(result){
			 		   	    	busyInd.hide();
			 		   	    	invocationResult = result.invocationResult;
			 		   	    	if(invocationResult.isSuccessful) {
			 		   	    		if(invocationResult.faml.response){	
			 		   	    		//if(invocationResult.faml.response.rc.returncode == 0){
			 		   	    			if (invocationResult.faml.response.rc!= undefined) {
			 		        				handleError(invocationResult.faml.response);
			 		        				 window.location =  '#rrasm01';
			 		        			} else {
			 		        			   
			 		   	    			window.location = "#rrore03";
			 		   	    			$("#contentData").load("Views/MF/rrore03.html", null, function (response, status, xhr) {
			 		   	    	            if (status != "error") {}
			 		   	    	            
			 		   	    	     	if(window.location.hash == "#rrore03"){
			 		   	 	   			
			 		   	 	   			
			 		   	 	   	unitholderid = invocationResult.faml.request.unitholderid;
			 		    		amcname      = invocationResult.faml.response.txndata.txn.fundinfo.amcname;
			 		    		fundname = invocationResult.faml.response.txndata.txn.fundinfo.fundname;
			 		    		cutofftime = invocationResult.faml.response.txndata.txn.fundinfo.cutofftime;
			 		    		accountno = invocationResult.faml.response.txndata.txn.account.accountno;
			 		    		amount = invocationResult.faml.request.amount;
			 		    		partialfull=invocationResult.faml.request.partialfull;
			 		    		selectedamount=invocationResult.faml.response.txndata.txn.fundinfo.selectedamount;
			 		    		selectedunits=invocationResult.faml.response.txndata.txn.fundinfo.selectedunits;
			 		    		fldAmount=invocationResult.faml.request.selectedamount;
			 		    		fldUnits=invocationResult.faml.request.selectedunits;
			 		    		

			 		    						$("#unitholderid").html(unitholderid);
			 		    						$("#amcname").html(amcname);
			 		    						$("#fundname").html(fundname);
			 		    						$("#cutofftime").html(cutofftime);
			 		    						$("#accountno").html(accountno);
			 		    						$("#amount").html(formatAmt(parseFloat(amount)));

			 		    						
			 		    						if(partialfull=="P"){
			 		    							if(invocationResult.faml.request.selectedamount!=''){
			 		    							
			 		    							$("#punit").hide();
		                                            $("#selectedamount").html(formatAmt(parseFloat(selectedamount),2));
			 		    							}else{
			 		    								$("#pamt").hide();
			 		    								$("#selectedunits").html(formatAmt(parseFloat(selectedunits),3));
			 		    							}
			 		    							
			 		    							
			 		    							$("#partialfull").html("Partial");
			 		    						}
			 		    						else if(partialfull=="F"){
			 		    							
			 		    							$("#partialfull").html("Full");
			 		    							$("#pamt").hide();
		 		    								$("#selectedunits").html(formatAmt(parseFloat(selectedunits),3));
			 		    						}
			 		    						else{
			 		    							
			 		    							$("#partialfull").html("-");
			 		    							$("#pamt").hide();
		 		    								$("#selectedunits").html(formatAmt(parseFloat(selectedunits),3));
			 		    						}
			 		    						
			 		    						
			 		    						
			 		    						    						
			 		    					
			 		    						
			 		    						$("#fldUhid").val(unitholderid);
			 		    						$("#fldFundCode").val(invocationResult.faml.request.fundid);
			 		    						$("#fldAmcId").val(invocationResult.faml.request.amcid);
			 		    						$("#accountno").val(accountno);
			 		    						$("#fldPartialFull").val(invocationResult.faml.request.partialfull);
			 		    						$("#fldAmount").val(fldAmount);
			 		    						$("#fldUnits").val(fldUnits);
			 		    						$("#fldAccount").val(accountno);
			 		    						
			 		    				}
			 		   	    	            ko.applyBindings(self, $(".dynamic-page-content").get(0));
			 		   	    	    	});
			 		   	    			
			 		        			}	
			 		   	    			/*}else{
			 		   	    			errmsg = invocationResult.faml.response.rc.errormessage;
			 		   	    			handleError(invocationResult.faml.response);
			 		   	    		}*/
			 		   	    		}
			 		   	    	else {
		 		   	    			
			 		   	    		handleError(invocationResult.faml);
			        				 //window.location =  '#rrasm01';
			 		   	    		}
			 		   	    	}
			 		   	    };
			 		   	   
			 		   	self.rrore03Submit  = function(){
		 		 		       
		 		 		   	if($("#frmrrore03").valid()){
		 		 		   	      	
		 		 		   	fldLoginUserId = Regloginuid;
		 			    	fldFCDBSessionId = RegfldFCDBSessionId;
		 		        	fldjsessionid = Regfldjsessionid;
		 		        	fldSessionId = Rsessionid;   	
		 		 		   	
		 		 		   	var $form = $("#frmrrore03");
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
		 		 		   	
		 		 		  reqParams["fldRequestId"] =RegfldRequestId;

		 			    	fldjsessionid = Regfldjsessionid;
		 			    	reqParams["fldLoginUserId"] =Regloginuid;
		 			    	reqParams["fldSessionId"] = Rsessionid;
		 		 		   	
		 		 			var invocationData = {
		 		 	    			adapter : "mf",
		 		 	        		procedure : "RRORE04",
		 		 	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
		 		 	    	};
		 		 			busyInd.show();  
		 		 		   	//WL.Logger.debug(invocationData, '');
		 		 		   	WL.Client.invokeProcedure(invocationData, {
		 		 		   		onSuccess : rrore04Response,
		 		 		   		onFailure : AdapterFail,
		 		 		   		timeout: timeout
		 		 		   	});
		 		 		   	}
		 		 		   };   
		 		 		   
		 		 		 rrore04Response = function(result){
		 		   	    	busyInd.hide();
		 		   	    	invocationResult = result.invocationResult;
		 		   	    	if(invocationResult.isSuccessful) {
		 		   	    		if(invocationResult.faml.response){	
		 		   	    		//if(invocationResult.faml.response.rc.returncode == 0){
		 		   	    			if (invocationResult.faml.response.rc!= undefined) {
		 		        				handleError(invocationResult.faml.response);
		 		        				 window.location =  '#rrasm01';
		 		        			} else {
		 		        			   
		 		   	    			window.location = "#rrore04";
		 		   	    			$("#contentData").load("Views/MF/rrore04.html", null, function (response, status, xhr) {
		 		   	    	            if (status != "error") {}
		 		   	    	            
		 		   	    	     	if(window.location.hash == "#rrore04"){
		 		   	 	   			
		 		   	    	     	errcode = invocationResult.faml.response.txnreply.txnerror.errcode;
		 		   	    	     	
		 		   	    	     	if(errcode == "0"){
		 		   	    	     	txnnumber= invocationResult.faml.response.txnreply.txnnumber;
		 		   	    	    txndate = invocationResult.faml.response.txndata.txn.txndate;
		 		   	    	   tempdate = txndate.substring(6,8)+"-"+txndate.substring(4,6)+"-"+txndate.substring(0,4);
		 		   	    	    
		 		   	   	 	   	unitholderid = invocationResult.faml.request.unitholderid;
			 		    		amcname      = invocationResult.faml.response.txndata.txn.fundinfo.amcname;
			 		    		fundname = invocationResult.faml.response.txndata.txn.fundinfo.fundname;
			 		    		cutofftime = invocationResult.faml.response.txndata.txn.fundinfo.cutofftime;
			 		    		accountno = invocationResult.faml.response.txndata.txn.account.accountno;
			 		    		amount = invocationResult.faml.request.amount;
			 		

			 		    		$("#txnnumber").html(txnnumber);
			 		    		$("#unitholderid").html(unitholderid);
			 		    		$("#amcname").html(amcname);
			 		    		$("#fundname").html(fundname);
			 		    		$("#cutofftime").html(cutofftime);
			 		    		$("#accountno").html(accountno);
			 		    		$("#amount").html(amount);
			 		    		$("#tempdate").html(tempdate);
			 		    		
			 		    		
			 		    		if(partialfull=="P"){
		    							if(invocationResult.faml.request.selectedamount!=''){
		    							
		    							$("#punit").hide();
	                                $("#selectedamount").html(formatAmt(parseFloat(selectedamount),2));
		    							}else{
		    								$("#pamt").hide();
		    								$("#selectedunits").html(formatAmt(parseFloat(selectedunits),3));
		    							}
		    							
		    							
		    							$("#partialfull").html("Partial");
		    						}
		    						else if(partialfull=="F"){
		    							
		    							$("#partialfull").html("Full");
		    							$("#pamt").hide();
	 								$("#selectedunits").html(formatAmt(parseFloat(selectedunits),3));
		    						}
		    						else{
		    							
		    							$("#partialfull").html("-");
		    							$("#pamt").hide();
	 								$("#selectedunits").html(formatAmt(parseFloat(selectedunits),3));
		    						}
		    						
			 		    		
		 		   	    	     	}else{
		 		   	    	     		
		 		   	    	     	errdesc = invocationResult.faml.response.txnreply.txnerror.errdesc;
		 		   	    	     	
		 		   	    	    
		 		   	    	     	if(errdesc != ''){
		 		   	    	     		$(".success_msg,.summblock").hide();
		 		   	    	     		$("#errdesc").show();
		 		   	    	     		$("#errdesc").html(errdesc);
		 		   	    	     	}
		 		   	    	     	
		 		   	    	     	if(invocationResult.faml.response.txnreply.txnerror.warning){
		 		   	    	     	$(".success_msg,.summblock").hide();
		 		   	    	     		warndata = invocationResult.faml.response.txnreply.txnerror.warning.errdesc;
		 		   	    	     		$("#errwarn").show();
		 		   	    	     		$("#errwarn").html(warndata);
		 		   	    	     	}
		 		   	    	     		
		 		   	    	     	
		 		   	    	     	}
		 		   	    	     	}
		 		   	 	   		
		 		   	    	            ko.applyBindings(self, $(".dynamic-page-content").get(0));
		 		   	    	    	});
		 		   	    			
		 		        			}	
		 		   	    			/*}else{
		 		   	    			errmsg = invocationResult.faml.response.rc.errormessage;
		 		   	    			handleError(invocationResult.faml.response);
		 		   	    		}*/
		 		   	    		}
		 		   	    	else {
	 		   	    			
		 		   	    		handleError(invocationResult.faml);
		        				 //window.location =  '#rrasm01';
		 		   	    		}
		 		   	    	}
		 		   	    };	 		   
		 		 		   
		 		 		   
		 		 		   
		 		 		  /**************End Redeem: **********************/ 
	   	    
			this.callRRIPB01 = function(){
	    	busyInd.show();  
	    	reqParams = {};
	    	
			reqParams["fldDeviceId"] = fldDeviceId;
	    	reqParams["fldWebServerId"] = fldWebServerId;
	    	reqParams["fldAppId"] = fldAppId;
	    	reqParams["fldAppServerId"] = fldAppServerId;
	    	reqParams["fldLangId"] = fldLangId;
	    	reqParams["fldModule"] = fldModule;
	    	
	    	reqParams["fldTxnId"] = "IPB";
	    	reqParams["fldScrnSeqNbr"] = "01";
	    	reqParams["fldOperationId"] = "RRIPB01";
	    	reqParams["fldSwitchAppId"] = "";
	    	
	    
	    	
	    	reqParams["fldRequestId"] =RegfldRequestId;

	    	fldjsessionid = Regfldjsessionid;
	    	reqParams["fldLoginUserId"] =Regloginuid;
	    	reqParams["fldSessionId"] = Rsessionid;
	    	
	    	var invocationData = {
	    			adapter : "mf",
	        		procedure : "RRIPB01",
	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	    	};
	    		    	
	    	WL.Client.invokeProcedure(invocationData, {
	    		onSuccess : self.rripb01Response,
	    		onFailure : AdapterFail,
	    		timeout: timeout
	    	});	    	
	    	  
	    };
	    
	    this.rripb01Response = function(result){
	    	
	    	invocationResult = result.invocationResult;
	    	if(invocationResult.isSuccessful) {
	    		if(invocationResult.faml.response){	
	    			
	    			if (invocationResult.faml.response.rc != undefined) {
        				handleError(invocationResult.faml.response);
        				window.location =  '#rrasm01';
        			} else {
        				
        				fldSelUhid = invocationResult.faml.request.unitholderid;
        				fldFCDBRequestId = invocationResult.faml.mci.requestid;
        				
        				self.unitholderList.removeAll();
        				self.mfFundList.removeAll();
        				
        				holderdata = invocationResult.faml.response.txndata.txn.commonlists;
        				funddata = invocationResult.faml.response.txndata.txn.commonlists.amcdetails;
        				
        				
        				if(typeof(invocationResult.faml.response.txndata.txn.commonlists.unitholderid)=='object'){
        					
        					holderdata = invocationResult.faml.response.txndata.txn.commonlists.unitholderid;
        					
        					$(holderdata).each(function(index, obj) {
            					
            					self.unitholderList.push({ unitholderid: holderdata[index]});
            				});
        				}
        				else{
        				
        				$(holderdata).each(function(index, obj) {
        					
        					self.unitholderList.push({ unitholderid: obj.unitholderid});
        				});
        				}
        				self.mfFundList.push({ amcid: "ALL", amcname: "All Mutual Funds"});
        				$(funddata).each(function(index, obj) {
        					self.mfFundList.push({ amcid: obj.amcid, amcname: obj.amcname});
        				});
        				//$("#fldFCDBRequestId").val(fldFCDBRequestId);
    		    		
    		    		$("#contentData").load("Views/MF/rripb01.html", null, function (response, status, xhr) {
    		                if (status != "error") {}
    		                
    		                $("#fldSelUhid").val(fldSelUhid);
    		                $("#fldRequestId").val(fldFCDBRequestId);
    		                
    		                 ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
    		            });
        			}
	    		
	    	 }	else {
 	    			
	   	    		handleError(invocationResult.faml);
 				    window.location =  '#rrasm01';
	   	    		}
	    	}
	    	busyInd.hide();
	    };
	    
	    this.rripb01Submit = function(){
            
        	if($("#frmipb01").valid()){
        	        	
        	 	fldLoginUserId = Regloginuid;
    	    	fldFCDBSessionId = RegfldFCDBSessionId;
            	fldjsessionid = Regfldjsessionid;
            	fldSessionId = Rsessionid;
        	fldFCDBRequestId = $("#fldFCDBRequestId").val();
        	
        	var $form = $("#frmipb01");
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
	    			adapter : "mf",
	        		procedure : "RRASH02",
	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	    	};
        	
        	
        	busyInd.show();
        	WL.Client.invokeProcedure(invocationData, {
        		onSuccess : self.rrash02Response,
        		onFailure : AdapterFail,
        		timeout: timeout
        	});
        	}    	
        };
        
        this.rrash02Response = function(result){
        	
        	invocationResult = result.invocationResult;
        	if(invocationResult.isSuccessful) {
        		if(invocationResult.faml.response){	
        			
        			if (invocationResult.faml.response.rc != undefined) {
        				handleError(invocationResult.faml.response);
        				window.location =  '#rrasm01';
        			} else {
        				accStmtData(invocationResult.faml);    
    	    			window.location = "#rrash02";
        			}        		
        		}
        		else {
	   	    			
		   	    		handleError(invocationResult.faml);
    				 //window.location =  '#rrasm01';
		   	    		}
        	}
        	busyInd.hide();
        };
	     
        this.callRRASH02 = function(){
        	
        	accstmtdata = accStmtData();
        	
        	fundname1 = accstmtdata.request.fldfundname1;
        	fundsearchList = accstmtdata.response.response.txndata.txn.fundsearch;
        	
        	self.ashFundList.removeAll();
        	
        	$(fundsearchList).each(function(index, obj) {
        		fundval = obj.fundname+"#"+obj.plan+"#"+obj.amcid+"#"+obj.fundid;
        		fundtxt = obj.fundname+" - "+obj.plan;
        		
				self.ashFundList.push({ fundval: fundval, fundtxt: fundtxt, fundname: obj.fundname, plan: obj.plan, 
					investoption: obj.investoption, latestnav: obj.latestnav, latestnavdate: obj.latestnavdate, 
					sellableunits: obj.sellableunits, totalholding: obj.totalholding, cutofftime: obj.cutofftime, 
					minamount: obj.minamount, offerprice: obj.offerprice, enddate: obj.enddate, otherdetails: obj.otherdetails, 
					amcid: obj.amcid, fundid: obj.fundid });
			});
        	
        	fldAmcId = accstmtdata.request.fldAmcId;
        	fldfundname2 = accstmtdata.request.fldfundname2;
        	fldfundcode2 = accstmtdata.request.fldfundcode2;
        	fldFCDBRequestId = accstmtdata.response.mci.requestid;
        	
        	fldCodTxn = accstmtdata.response.request.txncode;
        	fldFromTxnId = accstmtdata.request.fldFromTxnId;
        	fldSubmitForm = accstmtdata.request.fldSubmitForm;
        	
        	fldfromdate = accstmtdata.request.fldfromdate;
        	fldtodate = accstmtdata.request.fldtodate;
        	fldUnits = accstmtdata.request.fldUnits;
        	fldNoOfInstallment = accstmtdata.request.fldNoOfInstallment;
        	fldAmount = accstmtdata.request.fldAmount;
        	fldFrequency = accstmtdata.request.fldFrequency;
        	fldSiDay = accstmtdata.request.fldSiDay;
        	fldSiDate = accstmtdata.request.fldSiDate;
        	fldPartialFull = accstmtdata.request.fldPartialFull;
        	fldFromFundCode = accstmtdata.request.fldFromFundCode;
        	fldParentForm = accstmtdata.request.fldParentForm;
        	fldSelUhid = accstmtdata.response.response.txndata.txn.seluhid;
        	fldUhid = accstmtdata.response.request.unitholderid;
        	fldTxnId = accstmtdata.request.fldFromTxnId;
        	fldSequenceNext = accstmtdata.request.fldSequenceNext;
        	fldSequencePrevious = accstmtdata.request.fldSequencePrevious;
        	fldLoginUserId = accstmtdata.request.fldLoginUserId;
        	screenSelectionTemp=accstmtdata.request.screenSelectionTemp; 
        	$("#contentData").load("Views/MF/rrash02.html", null, function (response, status, xhr) {
                if (status != "error") {}
                
				if(self.ashFundList().length == 0){
                	$("#selashfund").hide();
                	$("#nofunddata").show();
                }
				
                $("#fldAmcId").val(fldAmcId);
                $("#fldAmcId1").val(fldAmcId);
                $("#fldfundname2").val(fldfundname2);
                $("#fldfundcode2").val(fldfundcode2);
                $("#fldRequestId").val(fldFCDBRequestId);
                
                if(fldFromTxnId == 'OSW' && fldSubmitForm == 'N'){
                	$("#fldCodTxn").val("SWITCH");
                }else{
                	$("#fldCodTxn").val(fldCodTxn);	
                }                
                
              
                $("#txncode").val(fldCodTxn);
                
                $("#fldfromdate").val(fldfromdate);
                $("#fldtodate").val(fldtodate);
                $("#fldUnits").val(fldUnits);
                $("#fldNoOfInstallment").val(fldNoOfInstallment);
                $("#fldAmount").val(fldAmount);
                $("#fldFrequency").val(fldFrequency);
                $("#fldSiDay").val(fldSiDay);
                $("#fldSiDate").val(fldSiDate);
                $("#fldPartialFull").val(fldPartialFull);
                $("#fldFromFundCode").val(fldFromFundCode);
                $("#fldParentForm").val(fldParentForm);
                $("#fldSubmitForm").val(fldSubmitForm);
                $("#fldSelUhid").val(fldSelUhid);
                $("#fldUhid").val(fldUhid);
                $("#fldFromTxnId").val(fldFromTxnId);
                $("#fldTxnId").val(fldTxnId);
                $("#fldSequenceNext").val(fldSequenceNext);
                $("#fldSequencePrevious").val(fldSequencePrevious);
                $("#fldLoginUserId").val(fldLoginUserId);
                
                if(fldSubmitForm == 'N')
                	$("#screenSelectionTemp").val("N");
                else
                	$("#screenSelectionTemp").val("");
                
  if(screenSelectionTemp=='done'){
                	
	  $("#screenSelectionTemp").val("done");
                }
                
                
                
                if(fldSubmitForm == 'Y'){
                	$("#fldScrnSeqNbr").val(fldSequenceNext);
                }else{
                	$("#fldScrnSeqNbr").val(fldSequencePrevious);
                }
                
                ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
            });
        	busyInd.hide();
        };
        
        self.callViewFundDetails = function(){
        	schcode = self.fldfundname1();
        	
        	if(schcode != '' && schcode != undefined && schcode != null){
        	schfunddata = self.ashFundList();            
            $(schfunddata).each(function(index, obj) {
            	fundval = obj.fundval;
            	
                if(schcode == fundval){
                	
                	$("#schemeDetails").show();
                	
                	if(obj.plan == 'DIVIDEND')
                		plan = "Dividend";
                	else
                		plan = "Growth";
                	
                	if(obj.investoption == 'PAYMENT'){
                		investoption = "Payout";
                	}else{
                		if(obj.plan == 'DIVIDEND')
                			investoption = "Re-Invest";
                		else
                			investoption = "";
                	}
                	
                	txncode = $("#txncode").val();
                	
                	// redeem switch data
                	if(txncode == 'REDEEM' || txncode == 'SWITCH')
                		$("#contSwitchRedeem").show();
                	else if(txncode == 'TXA')
                		$("#contTXA").show();
                	else if(txncode == 'IPO')
                		$("#contIPO").show();
                	else 
                		$("#contOther").show();
                	
                	latestnav = obj.latestnav;
                	latestnavdate = obj.latestnavdate;
                	
                	avilbl = "";
                	preunitlbl = "";
                	avaunit = "";
                	if(txncode == 'REDEEM'){
                		avilbl = "Available Units for Redemption";
                		preunitlbl = "Present Unit Value for Redemption";                		
                	}
                	if(txncode == 'SWITCH'){
                		avilbl = "Available Units for Switch";
                		preunitlbl = "Present Unit Value for Switch";
                	}
                	avaunit = obj.sellableunits;
                	totholding = obj.totalholding;
                	
                	// TXA data               	
                	cutofftime = obj.cutofftime;
                	minamount = obj.minamount;
                	
                	// IPO data
                	offerprice = obj.offerprice;
                	enddate = obj.enddate;
                	otherdetails = obj.otherdetails;
                	
                	$(".clsschname").html(obj.fundname);
                	$(".clsplan").html(plan);
                	$(".clsinvopt").html(investoption);
                	$(".clsnav").html(latestnav);
                	$(".clsnavdt").html(latestnavdate);
                	$(".clsavilbl").html(avilbl);
                	$(".clspreunitlbl").html(preunitlbl);
                	$(".clsavaunit").html(avaunit);
                	$(".clstotholding").html(totholding);
                	
                	$(".clscutofftime").html(cutofftime);
                	$(".clsminamount").html(minamount);
                	
                	$(".clsofferprice").html(offerprice);
                	$(".clsenddt").html(enddate);
                	$(".clsotherinfo").html(otherdetails);
                	
                	fldFromTxnId =  $("#fldFromTxnId").val();
                	fldSubmitForm = $("#fldSubmitForm").val();
                	fldfundname2 = $("#fldfundname2").val();
                	fldfundcode2 = $("#fldfundcode2").val();
                	
                	//alert("fldFromTxnId == "+fldFromTxnId);
                	
                	 if((fldFromTxnId == 'OSW' || fldFromTxnId == 'STP') && fldSubmitForm == 'N'){
                     	$("#hiddenData_OSW_STP").show();
                     	
                     	$("#fldToAmcId").val(obj.amcid);
                     	$("#fldToFundName").val(obj.fundname);
                     	$("#fldToFundCode").val(obj.fundid);
                     	$("#fldfundname2").val(fldfundname2);
                     	$("#fldfundcode2").val(fldfundcode2);
                     	$("#fldFundName").val(fldfundname2);
                        $("#fldFundCode").val(fldfundcode2);
                     }
                	 else if((fldFromTxnId == 'OSW' || fldFromTxnId == 'STP') && fldSubmitForm != 'N'){
                      	$("#hiddenData_OSW_STP1").show();
                      	
                      	$("#fldfundname2").val(obj.fundname);
                      	$("#fldfundcode2").val(obj.fundid);
                      	$("#fldFundName").val(obj.fundname);
                        $("#fldFundCode").val(obj.fundid);
                     }
                	 else{
                		 $("#hiddenData_Other").show();
                				 
                		 if(fldFromTxnId != 'IPB' && fldFromTxnId != 'ORE')
                			 $("#fldAmcId").val(obj.amcid);
                				 
                		 $("#fldfundname2").val(obj.fundname);
                       	 $("#fldfundcode2").val(obj.fundid);
                       	 
                       	$("#fldFundName").val(obj.fundname);
                        $("#fldFundCode").val(obj.fundid);
                	 }
                	 
                	 
                	
                }
            });
            
        	}else{
        		alert("Please select a fund name");
        	}
            busyInd.hide();
        };
        
        
        this.rrash02Submit = function(){
        	
        	
        	 busyInd.show();
        	fldTxnId = $("#fldTxnId").val();
        	fldSubmitForm = $("#fldSubmitForm").val();
        	nextSequence = $("#fldSequenceNext").val();
        	prevSequence = $("#fldSequencePrevious").val();
        	fldScrnSeqNbr = $("#fldScrnSeqNbr").val();
        	        	
        	seqno = fldScrnSeqNbr;
        	if(fldSubmitForm == 'Y')
        		seqno = nextSequence;
        	else if(fldSubmitForm == 'N')
        		seqno = prevSequence;
        	
        	
        	
        	var $form = $("#frmash02");
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
        	
            		    	
	    	methodname = "RR"+fldTxnId+seqno;
	    	
	  

	    	fldjsessionid = Regfldjsessionid;
	    	reqParams["fldLoginUserId"] =Regloginuid;
	    	reqParams["fldSessionId"] = Rsessionid;
	    	
        	var invocationData = {
	    			adapter : "mf",
	        		procedure : methodname,
	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	    	};
        	
        	
        	if(methodname == 'RRIPB02'){
	        	WL.Client.invokeProcedure(invocationData, {
	        		onSuccess : self.rripb02,
	        		onFailure : AdapterFail,
	        		timeout: timeout
	        	});
        	}
			else if(methodname == 'RRSWP02'){
	 		        	WL.Client.invokeProcedure(invocationData, {
	 		        		onSuccess : self.loadrrswp02,
	 		        		onFailure : AdapterFail,
	 		        		timeout: timeout
	 		        	});
	 	     }
			 else if(methodname == 'RRSTP02'){
	 		        	WL.Client.invokeProcedure(invocationData, {
	 		        		onSuccess : self.loadrrstp02,
	 		        		onFailure : AdapterFail,
	 		        		timeout: timeout
	 		        	});
	 	     }
			 	else if(methodname == 'RROBU02'){
	 		        	WL.Client.invokeProcedure(invocationData, {
	 		        		onSuccess : self.loadrrobu02,
	 		        		onFailure : AdapterFail,
	 		        		timeout: timeout
	 		        	});
	 	        	}
	 	        	else if(methodname == 'RRORE02'){
	 		        	WL.Client.invokeProcedure(invocationData, {
	 		        		onSuccess : self.loadrrore02,
	 		        		onFailure : AdapterFail,
	 		        		timeout: timeout
	 		        	});
	 	        	}
        	else if(methodname == 'RROSW02'){
	        	WL.Client.invokeProcedure(invocationData, {
	        		onSuccess : self.rrosw02,
	        		onFailure : AdapterFail,
	        		timeout: timeout
	        	});
        	}
			else if(methodname == 'RRSIP02'){
	        	WL.Client.invokeProcedure(invocationData, {
	        		onSuccess : self.loadrrsip02,
	        		onFailure : AdapterFail,
	        		timeout: timeout
	        	});
        	}
			else if(methodname == 'RRTXA01'){
	        	WL.Client.invokeProcedure(invocationData, {
	        		onSuccess : txa01Success,
	        		onFailure : AdapterFail,
	        		timeout: timeout
	        	});
        	}
        };
	
        this.rripb02 = function(result){
        	
        	invocationResult = result.invocationResult;
        	if(invocationResult.isSuccessful) {
        		if(invocationResult.faml.response){	        			
        				accStmtData(invocationResult.faml);    
    	    			window.location = "#rripb02";        			    		
        		}
        	}
        	else {
	    			
	   	    		handleError(invocationResult.faml);
				 //window.location =  '#rrasm01';
	   	    		}
        	busyInd.hide();
        };
        
        this.callRRIPB02 = function(){
        	accstmtdata = accStmtData();
        	self.txnErrorList.removeAll();
        	self.bankAccountList.removeAll();
        	
        	unitholderid="";minamt="";amcname="";fundname="";minamtVal="";
        	fundcurr="";settlementdate="";isin="";fldfundname2="";fldfundcode2="";
        	
        	if(accstmtdata.response.response.txnreply.txnerror){
        		errdata = accstmtdata.response.response.txnreply.txnerror;
        		$(errdata).each(function(index, obj) {
        			self.txnErrorList.push({errdesc: obj.errdesc});
        		});
        	}
        	
        	if(accstmtdata.response.response.txndata.txn.fundinfo){
        		
        		fdata = accstmtdata.response.response.txndata.txn.fundinfo;
        		
        		if(fdata.fundname != ''){
        			
        			unitholderid = accstmtdata.response.request.unitholderid;
            		minamt = accstmtdata.response.response.txndata.txn.fundinfo.minamt+" in multiples of "+accstmtdata.response.response.txndata.txn.fundinfo.stepamt;
            		amcname = accstmtdata.response.response.txndata.txn.fundinfo.amcname;
            		fundname = accstmtdata.response.response.txndata.txn.fundinfo.fundname;
            		
            		minamtVal = accstmtdata.response.response.txndata.txn.fundinfo.minamt;
            		fundid = accstmtdata.response.request.fundid;
            		amcid = accstmtdata.response.request.amcid;
            		fundcurr = accstmtdata.response.response.txndata.txn.fundinfo.fundcurr;
            		settlementdate = accstmtdata.response.response.txndata.txn.fundinfo.fundcurr;
            		isin = accstmtdata.response.response.txndata.txn.fundinfo.isin;
            		fldfundname2 = accstmtdata.request.fldfundname2;
            		fldfundcode2 = accstmtdata.request.fldfundcode2;
            		
            		//if(accstmtdata.response.response.txnreply.txnerror){
            			accountData = accstmtdata.response.response.txndata.txn.commonlists.account;
                		$(accountData).each(function(index, obj) {
                			self.bankAccountList.push({accountno: obj.accountno});
                		});
                	//}
            		
        		}else{
	        		$("#funddata").hide();
	        		$("#errorfund").hide();
        		}
        		
        		
        	}else{
        		$("#funddata").hide();
        		$("#errorfund").show();
        	}
        	
        	$("#contentData").load("Views/MF/rripb02.html", null, function (response, status, xhr) {
                if (status != "error") {}
                
                 $(".clsunitholder").html(unitholderid);
                 $(".clsminamt").html(minamt);
                 $(".clsfundname").html(amcname);
                 $(".clsschname").html(fundname);
                 
                 $("#fldMinAmt1").val(minamtVal);
                 $("#fldUhid").val(unitholderid);
                 $("#fldFundCode").val(fundid);
                 $("#fldAmcId").val(amcid);
                 $("#fldFundName").val(fundname);
                 $("#fldFundCurr").val(fundcurr);
                 $("#fldSettlementDate").val(settlementdate);
                 $("#fldIsin").val(isin);
                 $("#fldfundname2").val(fldfundname2);
                 $("#fldfundcode2").val(fldfundcode2);
                 
                 
                 ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
            });
        	busyInd.hide();
        };
        
        this.rripb02Submit = function(){
            
        	if($("#frmipb02").valid()){
        		
        	minamtval = $("#fldMinAmt1").val();
        	fldtyval = $("#fldTypeValue").val();
        	flagamt = true;
        	
        	if(parseFloat(fldtyval) < parseFloat(minamtval)){
        		alert("Enter Amount greater than minimum amount");
        		flagamt = false;
        	}
        	
        	if(flagamt){
        	 	fldLoginUserId = Regloginuid;
    	    	fldFCDBSessionId = RegfldFCDBSessionId;
            	fldjsessionid = Regfldjsessionid;
            	fldSessionId = Rsessionid;
        	fldFCDBRequestId = $("#fldFCDBRequestId").val();
        	
        	var $form = $("#frmipb02");
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
	    			adapter : "mf",
	        		procedure : "RRIPB03",
	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	    	};
        	
        	
        	busyInd.show();
        	WL.Client.invokeProcedure(invocationData, {
        		onSuccess : self.rripb03Response,
        		onFailure : AdapterFail,
        		timeout: timeout
        	});
        	}
        	}    	
        };
        
        this.rripb03Response = function(result){
        	busyInd.hide();  
        	invocationResult = result.invocationResult;
        	if(invocationResult.isSuccessful) {
        		if(invocationResult.faml.response){	        			
        				accStmtData(invocationResult.faml);    
    	    			window.location = "#rripb03";        			    		
        		}
        		else {
	   	    			
		   	    		handleError(invocationResult.faml);
    				 //window.location =  '#rrasm01';
		   	    		}
        	}
        	
        };
        
        this.callRRIPB03 = function(){
        	accstmtdata = accStmtData();
        	        	
        	amount = accstmtdata.response.request.amount;
        	unitholderid = accstmtdata.response.request.unitholderid;
        	
        	if(accstmtdata.response.response.txndata.txn.fundinfo){
        		amcname = accstmtdata.response.response.txndata.txn.fundinfo.amcname;
        		fundname = accstmtdata.response.response.txndata.txn.fundinfo.fundname;        		
        	}else{
        		amcname = "";fundname="";        		
        	}
        	accountno = accstmtdata.response.response.txndata.txn.account.accountno;
        	amcid = accstmtdata.response.request.amcid;
        	fldFCDBRequestId = accstmtdata.response.mci.requestid;
        	
        	$("#contentData").load("Views/MF/rripb03.html", null, function (response, status, xhr) {
        		
        		if (status != "error") {}
                
                 $(".clsamt").html(amount);
                 $(".clsunitholder").html(unitholderid);
                 $(".clsamcname").html(amcname);
                 $(".clsfundname").html(fundname);
                 $(".clsaccno").html(accountno);
                 
                 $("#fldUhid").val(unitholderid);
                 $("#fldFundCode").val(fundid);
                 $("#fldAmcId").val(amcid);
                 $("#fldAccount").val(accountno);
                 $("#fldTypeValue").val(amount);
                               
                 $("#fldRequestId").val(fldFCDBRequestId);
                 
                 ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
            });
        	busyInd.hide();
        };
        
        this.rripb03Submit = function(){
        	
        	
        	if($("#frmipb03").valid()){       	
        	 	fldLoginUserId = Regloginuid;
    	    	fldFCDBSessionId = RegfldFCDBSessionId;
            	fldjsessionid = Regfldjsessionid;
            	fldSessionId = Rsessionid;
        	fldFCDBRequestId = $("#fldFCDBRequestId").val();
        	
        	var $form = $("#frmipb03");
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
	    			adapter : "mf",
	        		procedure : "RRIPB03",
	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	    	};
        	
        	
        	busyInd.show();
        	WL.Client.invokeProcedure(invocationData, {
        		onSuccess : self.rripb04Response,
        		onFailure : AdapterFail,
        		timeout: timeout
        	});
        	}
        };
        
        this.rripb04Response = function(result){
        	
        	invocationResult = result.invocationResult;
        	if(invocationResult.isSuccessful) {
        		if(invocationResult.faml.response){	        			
        			
        			errcode = invocationResult.faml.response.response.txnreply.txnerror.errcode;
        			txndate = invocationResult.faml.response.response.txndata.txn.txndate;
        			txnnumber = invocationResult.faml.response.response.txnreply.txnnumber;
        			
        			
        			amount = invocationResult.faml.response.request.amount;
                	unitholderid = invocationResult.faml.response.request.unitholderid;
                	
                	if(invocationResult.faml.response.response.txndata.txn.fundinfo){
                		amcname = invocationResult.faml.response.response.txndata.txn.fundinfo.amcname;
                		fundname = invocationResult.faml.response.response.txndata.txn.fundinfo.fundname;        		
                	}else{
                		amcname = "";fundname="";        		
                	}
                	accountno = invocationResult.faml.response.response.txndata.txn.account.accountno;
                	                	
                	$("#contentData").load("Views/MF/rripb04.html", null, function (response, status, xhr) {
                        if (status != "error") {}
                        
                        
                         if(errcode == 0){
                        	 $("#ipb04success").show();
                        	 $("#succdata").show();
                        	 $("#succdata1").show();
                        	 
                        	 $(".clstxndate").html(txndate);
                        	 $(".clstxnnumber").html(txnnumber);
                        	 $(".clstxndate").html(txndate);
                        	 $(".clstxndate").html(txndate);
                        	 $(".clstxndate").html(txndate);
							 
							 accountList.removeAll();
							 accountSummList.removeAll();
                         }else{
                        	 errdesc = invocationResult.faml.response.response.txnreply.txnerror.errdesc;
                        	 $(".clserrdesc").html(errdesc);                        	  
                         }
                         
                         if(invocationResult.faml.response.response.txnreply.txnerror.warning){
                        	 errwarn = invocationResult.faml.response.response.txnreply.txnerror.warning.errdesc;
                        	 $(".clserrwarn").html(errwarn);
                         }
                         
                         $(".clsamt").html(amount);
                         $(".clsunitholder").html(unitholderid);
                         $(".clsamcname").html(amcname);
                         $(".clsfundname").html(fundname);
                         $(".clsaccno").html(accountno);
                         
                                                 
                         ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
                    });
        			
        		}
        		else {
        			handleErrorNoResponse();		   	    		
    				 //window.location =  '#rrasm01';
		   	    }
        	}
        	busyInd.hide();
        };
        
        
        this.callRROSW01 = function(){
	    	busyInd.show();  
	    	reqParams = {};
	    	
			reqParams["fldDeviceId"] = fldDeviceId;
	    	reqParams["fldWebServerId"] = fldWebServerId;
	    	reqParams["fldAppId"] = fldAppId;
	    	reqParams["fldAppServerId"] = fldAppServerId;
	    	reqParams["fldLangId"] = fldLangId;
	    	reqParams["fldModule"] = fldModule;
	    	
	    	reqParams["fldTxnId"] = "OSW";
	    	reqParams["fldScrnSeqNbr"] = "01";
	    	reqParams["fldOperationId"] = "RROSW01";
	    	reqParams["fldSwitchAppId"] = "";
	    	
	    		
	    	reqParams["fldRequestId"] =RegfldRequestId;

	    	fldjsessionid = Regfldjsessionid;
	    	reqParams["fldLoginUserId"] =Regloginuid;
	    	reqParams["fldSessionId"] = Rsessionid;
	    	
	    	var invocationData = {
	    			adapter : "mf",
	        		procedure : "RROSW01",
	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	    	};
	    		    	
	    	WL.Client.invokeProcedure(invocationData, {
	    		onSuccess : self.rrosw01Response,
	    		onFailure : AdapterFail,
	    		timeout: timeout
	    	});	    	
	    	  
	    };
	    
	    this.rrosw01Response = function(result){
	    	
	    	invocationResult = result.invocationResult;
	    	if(invocationResult.isSuccessful) {
	    		if(invocationResult.faml.response){	
	    			
	    			if (invocationResult.faml.response.rc != undefined) {
        				handleError(invocationResult.faml.response);
        				window.location =  '#rrasm01';
        			} else {
        				
        				self.txnErrorList.removeAll();
        	        	
        	        	if(invocationResult.faml.response.response.txnreply.txnerror){
        	        		errdata = invocationResult.faml.response.response.txnreply.txnerror;
        	        		$(errdata).each(function(index, obj) {
        	        			self.txnErrorList.push({errdesc: obj.errdesc});
        	        		});
        	        	}
        	        	
        	        	fldFCDBRequestId = invocationResult.faml.response.mci.requestid;
        				
        				self.unitholderList.removeAll();
        				
        				holderdata = invocationResult.faml.response.response.txndata.txn.commonlists;        				
        				
        				if(typeof(invocationResult.faml.response.response.txndata.txn.commonlists.unitholderid)=='object'){

        					holderdata = invocationResult.faml.response.response.txndata.txn.commonlists.unitholderid;

        					$(holderdata).each(function(index, obj) {

        						self.unitholderList.push({ unitholderid: holderdata[index]});
        					});
        				}
        				else{

        					$(holderdata).each(function(index, obj) {

        						self.unitholderList.push({ unitholderid: obj.unitholderid});
        					});
        				}       				
        				
    		    		
    		    		$("#contentData").load("Views/MF/rrosw01.html", null, function (response, status, xhr) {
    		                if (status != "error") {}
    		                
    		                $("#fldRequestId").val(fldFCDBRequestId);
    		                
    		                 ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
    		            });
        			}
	    		
	    	 }	else {
 	    			
	   	    		handleError(invocationResult.faml);
	   	    		window.location =  '#rrasm01';
	   	    		}
	    	}
	    	busyInd.hide();
	    };
	    
	    this.rrosw01Submit = function(){
            
        	if($("#frmosw01").valid()){
        	        	
        	 	fldLoginUserId = Regloginuid;
    	    	fldFCDBSessionId = RegfldFCDBSessionId;
            	fldjsessionid = Regfldjsessionid;
            	fldSessionId = Rsessionid;
        	fldFCDBRequestId = $("#fldFCDBRequestId").val();
        	
        	var $form = $("#frmosw01");
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
	    			adapter : "mf",
	        		procedure : "RRASH02",
	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	    	};
        	
        	
        	busyInd.show();
        	WL.Client.invokeProcedure(invocationData, {
        		onSuccess : self.rrash02Response,
        		onFailure : AdapterFail,
        		timeout: timeout
        	});
        	}    	
        };
        
        
        this.rrosw02 = function(result){
        	
        	invocationResult = result.invocationResult;
        	if(invocationResult.isSuccessful) {
        		if(invocationResult.faml.response){	        			
        				accStmtData(invocationResult.faml);    
    	    			window.location = "#rrosw02";        			    		
        		}
        		else {
	   	    			
		   	    		handleError(invocationResult.faml);
    				 //window.location =  '#rrasm01';
		   	    		}
        	}
        	
        };
        
        this.callRROSW02 = function(){
        	
        	accstmtdata = accStmtData();
        	self.txnErrorList.removeAll();
        	self.bankAccountList.removeAll();
        	
        	unitholderid="";minamt="";amcname="";fundname="";minamtVal="";
        	fundcurr="";settlementdate="";isin="";fldfundname2="";fldfundcode2="";
        	
        	if(accstmtdata.response.response.txnreply.txnerror){
        		errdata = accstmtdata.response.response.txnreply.txnerror;
        		$(errdata).each(function(index, obj) {
        			self.txnErrorList.push({errdesc: obj.errdesc});
        		});
        	}
        	
        	if(accstmtdata.response.response.txndata.txn.fundinfo){
        		
        		fdata = accstmtdata.response.response.txndata.txn.fundinfo;
        		
        		if(fdata.fundname != ''){
        			
        			unitholderid = accstmtdata.response.request.unitholderid;
            		minamt = accstmtdata.response.response.txndata.txn.fundinfo.minamt+" in multiples of "+accstmtdata.response.response.txndata.txn.fundinfo.stepamt;
            		amcname = accstmtdata.response.response.txndata.txn.fundinfo.amcname;
            		fundname = accstmtdata.response.response.txndata.txn.fundinfo.fundname;
            		minunits = accstmtdata.response.response.txndata.txn.fundinfo.minunits;
            		nav = accstmtdata.response.response.txndata.txn.fundinfo.nav;
            		navdate = accstmtdata.response.response.txndata.txn.fundinfo.navdate;
            		cutofftime = accstmtdata.response.response.txndata.txn.fundinfo.cutofftime;
            		
            			
            		minamtVal = accstmtdata.response.response.txndata.txn.fundinfo.minamt;
            		fundid = accstmtdata.response.request.fundid;
            		amcid = accstmtdata.response.request.amcid;
            		fundcurr = accstmtdata.response.response.txndata.txn.fundinfo.fundcurr;
            		settlementdate = accstmtdata.response.response.txndata.txn.fundinfo.fundcurr;
            		isin = accstmtdata.response.response.txndata.txn.fundinfo.isin;
            		fldfundname2 = accstmtdata.request.fldfundname2;
            		fldfundcode2 = accstmtdata.request.fldfundcode2;
            		
            		if(accstmtdata.response.response.txnreply.txnerror){
            			accountData = accstmtdata.response.response.txndata.txn.commonlists.account;
                		$(accountData).each(function(index, obj) {
                			self.bankAccountList.push({accountno: obj.accountno});
                		});
                	}
            		
        		}else{
	        		$("#funddata").hide();
	        		$("#errorfund").hide();
        		}
        		
        		
        	}else{
        		$("#funddata").hide();
        		$("#errorfund").show();
        	}
        	
        	fldAmount = accstmtdata.request.fldAmount;
        	fldToFundName = accstmtdata.request.fldToFundName;
        	fldFromFundCode = accstmtdata.request.fldFromFundCode;
        	fldFundCode = accstmtdata.request.fldfundcode;
        	fldToAmcId = accstmtdata.request.fldToAmcId;
        	fldToFundCode = accstmtdata.request.fldToFundCode;
        	fldMinAmt1 = accstmtdata.response.response.txndata.txn.fundinfo.minamt;
        	fldMinUnt1 = accstmtdata.response.response.txndata.txn.fundinfo.minunits;
        	fldFundName = accstmtdata.request.fldFundName;
        	
        	fldRequestId = accstmtdata.response.mci.requestid;
        		
        	$("#contentData").load("Views/MF/rrosw02.html", null, function (response, status, xhr) {
                if (status != "error") {}
                
                 $(".clsunitholder").html(unitholderid);
                 $(".clsminamt").html(minamt);
                 $(".clsamcname").html(amcname);
                 $(".clsfundname").html(fundname);
                 $(".clsunits").html(minunits);
                 $(".clsnav").html(nav+" as on "+navdate);
                 $(".clscutoff").html(cutofftime);
                 
                 $("#fldMinAmt1").val(minamtVal);
                 $("#fldUhid").val(unitholderid);
                 $("#fldFundCode").val(fundid);
                 $("#fldAmcId").val(fldToAmcId);
                 $("#fldFundName").val(fldFundName);
                 $("#fldFundCurr").val(fundcurr);
                 $("#fldSettlementDate").val(settlementdate);
                 $("#fldIsin").val(isin);
                 $("#fldfundname2").val(fldfundname2);
                 $("#fldfundcode2").val(fldfundcode2);
                 
                 $("#fldAmount").val(fldAmount);
                 $("#fldToFundName").val(fldToFundName);
                 $("#fldFromFundCode").val(fundid);
                 //$("#fldFundCode").val(fldFundCode);
                 $("#fldToAmcId").val(fldToAmcId);
                 $("#fldToFundCode").val(fldToFundCode);
                 
                 $("#fldMinAmt1").val(fldMinAmt1);
                 $("#fldMinUnt1").val(fldMinUnt1);
                 
                 $("#fldRequestId").val(fldRequestId);
                 
                 ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
            });
        	busyInd.hide();
        };
        
        
        this.callswitch03 = function(type){
        	if(type == 'search')
        		$("#fldTxnId").val("ASH");
        	else
        		$("#fldTxnId").val("OSW");
        	
        		document.getElementById("frmosw02").submit();
        };
        
        this.rrosw02Submit = function(){
           
        	if(clkBtn == 'Search'){
        		$("#fldTxnId").val("ASH");
        		
        		fldtofundnm = $("#fldToFundName").val();
        		$("#fldFundCode").val("");
        		$("#fldFundName").val(fldtofundnm);
        	}else{
        		$("#fldTxnId").val("OSW");
        	}
        	
        	minamtval = $("#fldMinAmt1").val();
        	minunitval = $("#fldMinUnt1").val();
        	fldAmount = $("#fldAmount").val();
        	fldUnits = $("#fldUnits").val();
        	partifull = $("#fldPartialFull").val();
        	flagamt = true;
        	
        	if(partifull == 'P' && clkBtn != 'Search'){
        		
        		if($.trim(fldAmount) =='' && $.trim(fldUnits) == ''){
    				alert("Please Enter either Amount or Units");
    				flagamt = false;    				
    			}
        		else if($.trim(fldAmount) && $.trim(fldUnits)){
    				alert("Please Enter either Amount or Units not both");
    				flagamt = false;
    				
    			}
        		else if($.trim(fldAmount) != '' || $.trim(fldUnits) != ''){
        		
        		if($.trim(fldAmount) != ''){
		        	if(parseFloat(fldAmount) < parseFloat(minamtval)){
		        		alert("Enter Amount greater than minimum Amount");
		        		flagamt = false;
		        	}
        		}
        		if($.trim(fldUnits) != ''){
        			if(parseFloat(fldUnits) < parseFloat(minunitval)){
		        		alert("Enter Units greater than minimum Units");
		        		flagamt = false;
		        	}
        		}
	        	
        		}
        	}
        	
        	if(flagamt){
        		
        	
        	//if($("#frmosw02").valid()){
        	
        	 	fldLoginUserId = Regloginuid;
    	    	fldFCDBSessionId = RegfldFCDBSessionId;
            	fldjsessionid = Regfldjsessionid;
            	fldSessionId = Rsessionid;
        	fldFCDBRequestId = $("#fldFCDBRequestId").val();
        	
        	var $form = $("#frmosw02");
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
        	
        	busyInd.show();
        	
        	txnid = $("#fldTxnId").val();
        	if(txnid == 'ASH'){
	        	var invocationData = {
		    			adapter : "mf",
		        		procedure : "RRASH02",
		        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
		    	};
	        	
	        	WL.Client.invokeProcedure(invocationData, {
	        		onSuccess : self.rrash02Response,
	        		onFailure : AdapterFail,
	        		timeout: timeout
	        	});
        	
        	}else{
        		var invocationData = {
		    			adapter : "mf",
		        		procedure : "RROSW04",
		        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
		    	};
	        	
	        	WL.Client.invokeProcedure(invocationData, {
	        		onSuccess : self.rrosw04Response,
	        		onFailure : AdapterFail,
	        		timeout: timeout
	        	});
        	}
        	
        	//} 
        	}
        };
        
        
        this.rrosw04Response = function(result){
        	
        	invocationResult = result.invocationResult;
        	if(invocationResult.isSuccessful) {
        		if(invocationResult.faml.response){	        			
        			
        			accStmtData(invocationResult.faml);    
	    			window.location = "#rrosw04";  
        			
        		}
        		else {
	   	    			
		   	    		handleError(invocationResult.faml);
    				 //window.location =  '#rrasm01';
		   	    		}
        	}
        	
        };
        
        this.callRROSW04 = function(){
        	
        	accstmtdata = accStmtData();
        	self.txnErrorList.removeAll();
        	
        	unitholderid="";minamt="";amcname="";fundname="";minamtVal="";
        	fundcurr="";settlementdate="";isin="";fldfundname2="";fldfundcode2="";
        	
        	if(accstmtdata.response.response.txnreply.txnerror){
        		errdata = accstmtdata.response.response.txnreply.txnerror;
        		$(errdata).each(function(index, obj) {
        			self.txnErrorList.push({errdesc: obj.errdesc});
        		});
        	}
        	
        	if(accstmtdata.response.response.txndata.txn.fundinfo){
        		
        		fdata = accstmtdata.response.response.txndata.txn.fundinfo;
        		
        		if(fdata.fundname != ''){
        			
        			unitholderid = accstmtdata.response.request.unitholderid;
        			partialfull = accstmtdata.response.request.partialfull;
        			selectedamount = accstmtdata.response.request.selectedamount;
        			selectedunits = accstmtdata.response.request.selectedunits;
        			amcname = accstmtdata.response.response.txndata.txn.fundinfo.amcname;
        			fundname = accstmtdata.response.response.txndata.txn.fundinfo.fundname;
        			tofundname = accstmtdata.response.response.txndata.txn.fundinfo.tofundname;
        			cutofftime = accstmtdata.response.response.txndata.txn.fundinfo.cutofftime;					
        		}
        	}
        	
        	fundid = accstmtdata.response.request.fundid;
        	tofundid = accstmtdata.response.request.tofundid;
        	amcid = accstmtdata.response.request.amcid;
        	
        	fldRequestId = accstmtdata.response.mci.requestid;
        		
        	$("#contentData").load("Views/MF/rrosw04.html", null, function (response, status, xhr) {
                if (status != "error") {}
                
                 $(".clsunitholder").html(unitholderid);
                 
                 if(partialfull == 'P')
            	 {
                	 if(selectedamount != ''){
                		 $(".clslblamtunit").html("Amount");
                		 $(".clsamtunitdata").html(selectedamount);
                	 }else{
                		 $(".clslblamtunit").html("Units");
                		 $(".clsamtunitdata").html(selectedunits);
                	 }
                		 
            	 }else{
            		 $(".clslblamtunit").html("Units");
            		 $(".clsamtunitdata").html(selectedunits);
            	 }
                 
                 
                 $(".clsamcname").html(amcname);
                 $(".clsfromfundname").html(fundname);
                 $(".clstofundname").html(tofundname);                 
                 $(".clscutoff").html(cutofftime);
                 
                
                 $("#fldUhid").val(unitholderid);
                 $("#fldFromFundCode").val(fundid);
                 $("#fldFundCode").val(fundid);
                 $("#fldToFundCode").val(tofundid);
                 $("#fldToFundName").val(tofundname);                 
                 $("#fldAmcId").val(amcid);
                 $("#fldPartialFull").val(partialfull);
                 $("#fldAmount").val(selectedamount);
                 $("#fldUnits").val(selectedunits);
                 
                 $("#fldRequestId").val(fldRequestId);
                 
                 ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
            });
        	busyInd.hide();
        };
        
        this.rrosw04Submit = function(){
        	
        	if($("#frmosw04").valid()){
            	
        	 	fldLoginUserId = Regloginuid;
    	    	fldFCDBSessionId = RegfldFCDBSessionId;
            	fldjsessionid = Regfldjsessionid;
            	fldSessionId = Rsessionid;
            	fldFCDBRequestId = $("#fldFCDBRequestId").val();
            	
            	var $form = $("#frmosw04");
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
            	
            	
            	busyInd.show();
            	
        		var invocationData = {
		    			adapter : "mf",
		        		procedure : "RROSW05",
		        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
		    	};
	        	
	        	WL.Client.invokeProcedure(invocationData, {
	        		onSuccess : rrosw05Response,
	        		onFailure : AdapterFail,
	        		timeout: timeout
	        	});
            	
            	
            	} 
        	
        };
        
        rrosw05Response = function(result){
        	
        	invocationResult = result.invocationResult;
        	if(invocationResult.isSuccessful) {
        		
        		 	        			
        	  
        			accStmtData(invocationResult.faml);    
	    			window.location = "#rrosw05";  
        			
        		}
        		else {
	   	    			
		   	    		handleError(invocationResult.faml);
    				 //window.location =  '#rrasm01';
		   	    		}
    
        	
        };
        
        this.callRROSW05 = function(){
        	
        	accstmtdata = accStmtData();
        	//self.txnErrorList.removeAll();
        	
        	
        	
        	unitholderid="";minamt="";amcname="";fundname="";minamtVal="";
        	fundcurr="";settlementdate="";isin="";fldfundname2="";fldfundcode2="";
        	
        	errcode = accstmtdata.response.response.txnreply.txnerror.errcode;
        	
        	/*if(accstmtdata.response.response.txnreply.txnerror){
        		errdata = accstmtdata.response.response.txnreply.txnerror;
        		$(errdata).each(function(index, obj) {
        			self.txnErrorList.push({errdesc: obj.errdesc});
        		});
        	}*/
        	
        	if(errcode == '0'){
			
			accountList.removeAll();
			accountSummList.removeAll();
			
        	if(accstmtdata.response.response.txndata.txn.fundinfo){
        		
        		fdata = accstmtdata.response.response.txndata.txn.fundinfo;
        		 
        		
        		//if(fdata.fundname != ''){
        			
        			unitholderid = accstmtdata.response.request.unitholderid;
        			partialfull = accstmtdata.response.request.partialfull;
        			selectedamount = accstmtdata.response.request.selectedamount;
        			selectedunits = accstmtdata.response.request.selectedunits;
        			amcname = accstmtdata.response.response.txndata.txn.fundinfo.amcname;
        			fromfundname = accstmtdata.response.response.txndata.txn.fundinfo.fromfundname;
        			tofundname = accstmtdata.response.response.txndata.txn.fundinfo.tofundname;
        			cutofftime = accstmtdata.response.response.txndata.txn.fundinfo.cutofftime;
        		//}
        	}
        	}
        	fundid = accstmtdata.response.request.fundid;
        	tofundid = accstmtdata.response.request.tofundid;
        	amcid = accstmtdata.response.request.amcid;
        	
        	fldRequestId = accstmtdata.response.mci.requestid;
        		
        	$("#contentData").load("Views/MF/rrosw05.html", null, function (response, status, xhr) {
                if (status != "error") {}
                
                if(accstmtdata.response.response.txnreply.txnerror.warning){
                	$(".warnDesc").show();
                	$(".warnDesc").html(accstmtdata.response.response.txnreply.txnerror.warning.errdesc);
        		}
                
                if(errcode == '0'){
                	
                	txndate = accstmtdata.response.response.txndata.txn.txndate;
					txndate = txndate.substring(6,8)+"-"+txndate.substring(4,6)+"-"+txndate.substring(0,4); 
					txnno = accstmtdata.response.response.txnreply.txnnumber;
                	
                 $(".success_msg").show();
                 $("#osw05Succ").show();
                 
                 $(".clsunitholder").html(unitholderid);
                 
                 if(partialfull == 'P')
            	 {
                	 if(selectedamount != ''){
                		 $(".clslblamtunit").html("Amount");
                		 $(".clsamtunitdata").html(selectedamount);
                	 }else{
                		 $(".clslblamtunit").html("Units");
                		 $(".clsamtunitdata").html(selectedunits);
                	 }
                		 
            	 }else{
            		 $(".clslblamtunit").html("Units");
            		 $(".clsamtunitdata").html(selectedunits);
            	 }
                 
                 if(partialfull == 'P'){
                	 $(".clstype").html("Switch Type");
                	 $(".clsdatatype").html("Partial");
                 }
                 else if(partialfull == 'F'){
                	 $(".clstype").html("Switch Type");
                	 $(".clsdatatype").html("Full");
                 }
                 else{
                	 $(".clstype").html("Redemption Type");
                	 $(".clsdatatype").html("-");
                 }
                 $(".clsamcname").html(amcname);
                 $(".clsfromfundname").html(fromfundname);
                 $(".clstofundname").html(tofundname);                 
                 $(".clscutoff").html(cutofftime);
                 $("#tempdate").html(txndate);
                 $(".clstxnno").html(txnno);
                }else{
                	$(".errDesc").show();
                	errdescdata = accstmtdata.response.response.txnreply.txnerror.errdesc;
                	$(".errDesc").html(errdescdata);
                	
                }
                 ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
            });
        	
        	busyInd.hide();
        	
        };
        
        
       this.rrstp01Page = function(){
				reqParams = {};
		
		    	reqParams["fldDeviceId"] = fldDeviceId;
		    	reqParams["fldWebServerId"] = fldWebServerId;
		    	reqParams["fldAppId"] = fldAppId;
		    	reqParams["fldAppServerId"] = fldAppServerId;
		    	reqParams["fldLangId"] = fldLangId;
		    	reqParams["fldModule"] = fldModule;
		    	reqParams["fldSwitchAppId"] = "";
		    	reqParams["fldModule"] = "CH";
		    	reqParams["fldTxnId"] = "STP";
		    	reqParams["fldLogoffReq"] = "N";
		    	reqParams["fldRoleId"] = "";
		    	reqParams["fldReportDate"] =getCurrdate();
		    	
		    	reqParams["fldScrnSeqNbr"] = "01";
		    	
		    	
		    	reqParams["fldRequestId"] =RegfldRequestId;

		    	fldjsessionid = Regfldjsessionid;
		    	reqParams["fldLoginUserId"] =Regloginuid;
		    	reqParams["fldSessionId"] = Rsessionid;
		    	
		    	busyInd.show();
		    	var invocationData = {
		    			adapter : "mf",
		        		procedure : "RRSTP01",
		        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
		    	};
		    	
		    	WL.Client.invokeProcedure(invocationData, {
		    		onSuccess : rrstp01PageSuccess,
		    		onFailure : AdapterFail,	    		
		    		timeout: timeout
		    	});
		};
		rrstp01PageSuccess = function(result){
				invocationResult = result.invocationResult;
				busyInd.hide();
				if(invocationResult.isSuccessful) {
	        		if(invocationResult.faml.response){
							
						if (invocationResult.faml.response.rc!= undefined) {
	        				handleError(invocationResult.faml.response);
							
	        				 window.location =  '#rrasm01';
	        			} else {
							self.txnerror.removeAll();
							/*if(invocationResult.faml.response.txnreply.txnerror!=undefined){
							 if(invocationResult.faml.response.txnreply.txnerror){
										txnerror = invocationResult.faml.response.response.txnreply.txnerror;
											$(txnerror).each(function(index, obj) {
														self.txnerror.push({ errdesc: obj.errordesc });	
											});
							}}
							*/
							
							
							if(invocationResult.faml.response.response.txnreply.txnerror!= undefined){
								txnerror = invocationResult.faml.response.response.txnreply.txnerror;
									$(txnerror).each(function(index, obj) {
												self.txnerror.push({ errdesc: obj.errdesc });	
									});
							   }
							  cardcount =  invocationResult.faml.response.response.txndata.txn.commonlists;
							  
							  if(typeof(invocationResult.faml.response.response.txndata.txn.commonlists.unitholderid)=='object'){

									cardcount = invocationResult.faml.response.response.txndata.txn.commonlists.unitholderid;

									$(cardcount).each(function(index, obj) {
										self.mfFundList.push({ unitholderid: cardcount[index], displaytxt: cardcount[index],accountValue: cardcount[index]   });
										
									});
		        				}
		        				else{

		        					   $(cardcount).each(function(index, obj) {
											self.mfFundList.push({ unitholderid: obj.unitholderid, displaytxt: obj.unitholderid,accountValue: obj.unitholderid   });

										});
		        				}   
							  
					
						Amclist =  invocationResult.faml.response.response.txndata.txn.amcdetails;
						   $(Amclist).each(function(index, obj) {
								self.mfdetails.push({ unitholderid: obj.unitholderid, displaytxt: obj.amcname,accountValue: obj.amcid   });
								
							});	
						  self.mfdetails(invocationResult.faml);        	
						  $("#contentData").load("Views/MF/rrstp01.html", null, function (response, status, xhr) {
									if (status != "error") {}	               
										$('#fldFundName').val(invocationResult.faml.request.fldfundname);
										$('#fldFCDBRequestId').val(invocationResult.faml.response.mci.requestid);
										$('#fldSelUhid').val(invocationResult.faml.response.response.txndata.txn.commonlists.unitholderid);
										ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
							});	
						}
					
				}
				else {
		   	    			
 		   	    		handleError(invocationResult.faml.response);
        				window.location =  '#rrasm01';
 		   	    		}
			}
		};
    this.rrstp01Submit = function(){
				        	
    	
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
				reqParams["fldScrnSeqNbr"] = "02";
		    	  
		    	
		    		
				reqParams["fldRequestId"] =RegfldRequestId;

		    	fldjsessionid = Regfldjsessionid;
		    	reqParams["fldLoginUserId"] =Regloginuid;
		    	reqParams["fldSessionId"] = Rsessionid;
				
			 	        	var invocationData = {
			 		    			adapter : "mf",
			 		        		procedure : "RRASH02",
			 		        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
			 		    	};
			 	        	
			 	        	
			 	        	busyInd.show();
			 	        	WL.Client.invokeProcedure(invocationData, {
			 	        		onSuccess : self.rrash02Response,
			 	        		onFailure : AdapterFail,
			 	        		timeout: timeout
			 	        	});
			 	        	   
		};
		this.loadrrstp02 = function(result){
			self.mfFundList1.removeAll();
	 		 		  invocationResult = result.invocationResult;
		 		        	if(invocationResult.isSuccessful) {
		 		        		if(invocationResult.faml.response){	        			
		 		        			accstmtdata=invocationResult;  
		 		    	    			window.location = "#rrstp02"; 
		 		    	    			if (accstmtdata.faml.response.response.txndata.txn.fundinfo!=undefined){
		 		 		 		    		unitholderid = accstmtdata.faml.response.request.unitholderid;
		 		 		 		    		amcname      = accstmtdata.faml.response.response.txndata.txn.fundinfo.amcname;
		 		 		 		    		fundname = accstmtdata.faml.response.response.txndata.txn.fundinfo.fundname;
		 		 		 		    		navandnavdate = formatAmt(parseFloat(accstmtdata.faml.response.response.txndata.txn.fundinfo.nav)) +" as on "+accstmtdata.faml.response.response.txndata.txn.fundinfo.navdate;
		 		 		 		    		cutofftime = accstmtdata.faml.response.response.txndata.txn.fundinfo.cutofftime;
		 		 		 		    		account = accstmtdata.faml.response.response.txndata.txn.account.accountno;
		 		 		 		    		
		 		 		 		    		fldToFundName=accstmtdata.faml.request.fldToFundName;
		 		 		 		    		//var currentholdingamt="0.00";
		 		 		 		    		//if(accstmtdata.faml.response.txndata.txn.fundinfo.currentholdingamt!=""){
		 		 		 		    			//currentholdingamt=accstmtdata.faml.response.txndata.txn.fundinfo.currentholdingamt;
		 		 		 		    			
		 		 		 		    		//}
		 		 		 		    		 frequency =  accstmtdata.faml.response.response.txndata.txn.commonlists.frequency;
											// self.mfFreqList(frequency);
		 		 		 		    		
											   $(frequency).each(function(index, obj) {
													
															self.mfFundList1.push({ displaytxt: obj.freqname ,accountValue: obj.freqid,freqid:obj.freqid,freqname: obj.freqname ,minsitxnamt: obj.minsitxnamt ,noofsi: obj.noofsi ,minsitxnunits: obj.minsitxnunits,date:obj.date  });
															//self.mfFundList.push({ unitholderid: obj.unitholderid, displaytxt: obj.unitholderid,accountValue: obj.unitholderid   });

															
													
									});
											
												var currentholdingamt="0.00";
												if(accstmtdata.faml.response.response.txndata.txn.fundinfo.currentholdingamt!=""){
													currentholdingamt=formatAmt(parseFloat(accstmtdata.faml.response.response.txndata.txn.fundinfo.currentholdingamt));
													
												}
		 		 		 		    		
		 		 		 		    		
		 		 		 		    	}
		 		        		}
								else {
		 		   	    			
			 		   	    		handleError(invocationResult.faml.response);
			        				 //window.location =  '#rrasm01';
			 		   	    		}
		 		        	}
		 		        	
	 		 		    	busyInd.hide();
	 		 		    	
	 		 		    	$("#contentData").load("Views/MF/rrstp02.html", null, function (response, status, xhr) {
	 		 		            if (status != "error") {}	
	 		 		            
	 		 		          daysInput = '';
								 $(accstmtdata.faml.response.response.txndata.txn.commonlists.days).each(function(index, obj) {
										//daysInput += obj.daynum+""+obj.day;
										daysInput +='<option value="' + obj.daynum + '">' + obj.day + '</option>';
									});
								 $("#fldSiDay").append(daysInput);
	 		 		            
	 		 		            $("#unitholderid1").html(unitholderid);
	 		 		            $("#amcname1").html(amcname);
	 		 		        	//$("#fundname").html(formatAmt(parseFloat(fldamttxn)));
	 		 		        	$("#fundname1").html(fundname);
	 		 		        	
	 		 		        	$("#navandnavdate").html(navandnavdate);
	 		 		        	$("#cutofftime").html(cutofftime);
								if(daysInput!= undefined || daysInput == '')
								$("#hid_strdays").val(daysInput);
								else
								$("#hid_strdays").val('');
	 		 		        	$("#currentholdingamt").html(cutofftime);
								$("#account").html(account);
	 		 		        	$("#fldFCDBRequestId").val(RegfldRequestId);
	 		 		        	
								$('#fldUhid').val(unitholderid);
								$('#fldAmcId').val(accstmtdata.faml.request.fldToAmcId);
								$('#fldfundname2').val(fundname);
								$('#fldfundcode2').val(accstmtdata.faml.response.request.fundid);								
								$('#fldFromFundCode').val(accstmtdata.faml.response.request.fundid);	
								$('#fldToFundCode').val(accstmtdata.faml.request.fldToFundCode);	
								$('#fldToFundName').val(fldToFundName);
								$("#fldFundCode").val(fundname);
								$('#fldAccount').val(account);
				        		$("#fldFundName").val(accstmtdata.faml.response.request.fundid);
								if(accstmtdata.faml.response.response.txndata.txn.fundinfo)
	 		 		        	 $("#fndinfo").show();
							

							
			
			
	 		 		            ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
	 		 		        });
	 		 			    
	 		 			    
	 	};
		this.rrstp02Submit = function(){

			var objs = document.getElementById('fldAccount');	
			errflag = true;

			if(clkBtn == 'Search'){
				$("#fldTxnId").val("ASH");
        		
        		
        		$("#fldFundCode").val("");
        		$("#fldFundName").val($("#fldToFundName").val());
        		//$("#fldfundcode2").val("");
        		//$("#fldfundname2").val("");
        	}else{
        		//document.getElementById('fldAccount_txt').value = objs.options[objs.selectedIndex].innerHTML;
    			
    			var freqnm = document.getElementById('fldFrequency').value;
    			var redigit = /^[0-9]+$/;
    			if(freqnm == '')
    			{
    				alert('Please select si frequency');
    				errflag = false;
    				return false;
    			}
    			
    			else if(document.f1.fldSiDay.selectedIndex == 0 && document.f1.fldSiDate.selectedIndex == 0) {
    				
    				alert("Please select either Days or Date");
    				//document.f1.fldSiDate.focus();
    				errflag = false;
    				return false;
    			}
    				
    			
    			
    			
    			else if($("#fldNoOfInstallment").val() == '')
    			{
    				alert("Please Enter No. of Installment");
    				errflag = false;
    				return false;
    			}
    			else if(parseFloat($("#fldNoOfInstallment").val()) < parseFloat($("#fldNoofsi").val())){
	        		alert("Enter No. of Installment greater than minimum Installment");
	        		errflag = false;
	        	}
    			else if(!redigit.test($("#fldNoOfInstallment").val())){
    				alert("Please Enter Numeric No. of Installment");
    				errflag = false;
    				return false;
    			}
    			
    
    			
    			if($("#fldUnits").val() =='' && $("#fldAmount").val()==''){
    				alert("Please Enter either Amount or Units");
    				errflag = false;
    				return false;
    			}
    			
    			else if($("#fldUnits").val() && $("#fldAmount").val()){
    				alert("Please Enter either Amount or Units not both");
    				errflag = false;
    				return false;
    			}
    			else if($.trim($("#fldAmount").val()) != '' || $.trim($("#fldUnits").val()) != ''){
		        		
		        		if($.trim($("#fldAmount").val()) != ''){
				        	if(parseFloat($("#fldAmount").val()) < parseFloat($("#fldMinAmount").val())){
				        		alert("Enter Amount greater than minimum Amount");
				        		errflag = false;
				        	}
				        	else if(!redigit.test($("#fldAmount").val())){
 		    				alert("Please Enter Numeric No. of Amount");
 		    				errflag = false;
 		    				return false;
 		    			}
		        		}
		        		if($.trim($("#fldUnits").val()) != ''){
		        			if(parseFloat($("#fldUnits").val()) < parseFloat($("#fldMinUnit").val())){
				        		alert("Enter Units greater than minimum Units");
				        		errflag = false;
				        	}
		        			else if(!redigit.test($("#fldUnits").val())){
 		    				alert("Please Enter Numeric No. of Units");
 		    				errflag = false;
 		    				return false;
 		    			}
		        		}
			        	
		        		}
        		
        		$("#fldTxnId").val("STP");
        		$("#fldScrnSeqNbr").val("04");
        		
        	}
        	
			
        	if($("#f1").valid()){
        	
        		if(errflag){
        		
        		 	fldLoginUserId = Regloginuid;
        	    	fldFCDBSessionId = RegfldFCDBSessionId;
                	fldjsessionid = Regfldjsessionid;
                	fldSessionId = Rsessionid;
        	fldFCDBRequestId = $("#fldFCDBRequestId").val();
        	$("#fldRequestId").val(fldFCDBRequestId);
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
        	reqParams["fldReportDate"] =getCurrdate();
     
        	
        

	    	fldjsessionid = Regfldjsessionid;
	    	reqParams["fldLoginUserId"] =Regloginuid;
	    	reqParams["fldSessionId"] = Rsessionid;
        	
        	busyInd.show();
        	
        	txnid = $("#fldTxnId").val();
        	if(txnid == 'ASH'){
	        	var invocationData = {
		    			adapter : "mf",
		        		procedure : "RRASH02",
		        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
		    	};
	        	
	        	WL.Client.invokeProcedure(invocationData, {
	        		onSuccess : self.rrash02Response,
	        		onFailure : AdapterFail,
	        		timeout: timeout
	        	});
        	
        	}else{
        		var invocationData = {
 		    			adapter : "mf",
 		        		procedure : "RRSTP04",
 		        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
 		    	};
 	        	
 	        	
 	        	
 	        	WL.Client.invokeProcedure(invocationData, {
 	        		onSuccess :rrstp02SubmitSuccess,
 	        		onFailure : AdapterFail,
 	        		timeout: timeout
 	        	});
 	        	 
        	}
        	
        	}    	
        	}
			 	        	 
		};	 
		rrstp02SubmitSuccess = function(result){
						invocationResult = result.invocationResult;
				busyInd.hide();
				if(invocationResult.isSuccessful) {
	        		if(invocationResult.faml.response){
							
						if (invocationResult.faml.response.rc!= undefined) {
	        				handleError(invocationResult.faml.response);
							
	        				window.location =  '#rrwcm01';
	        			} else {
						  accStmtData(invocationResult.faml);        	
						  window.location = "#rrstp04";
						}
					}
					else {
		   	    			
 		   	    		handleError(invocationResult.faml);
        				 //window.location =  '#rrasm01';
 		   	    		}
				}
		};
		this.rrstp04Page = function(){
					mfdtls =  accStmtData();
					if(mfdtls.response.response.txnreply.txnerror!=undefined){
					txnerror = mfdtls.response.response.txnreply.txnerror;
										$(txnerror).each(function(index, obj) {
													self.txnerror.push({ errdesc: obj.errdesc });	
										});}
					 $("#contentData").load("Views/MF/rrstp04.html", null, function (response, status, xhr) {
						if (status != "error") {}	                
							ko.applyBindings(self, $(".dynamic-page-content").get(0));
							$("#fldFCDBRequestId").val(RegfldRequestId);
							$('#unitholderid').html(mfdtls.response.request.unitholderid);
							if(mfdtls.response.request.partialfull=='P' && mfdtls.response.request.selectedamount!=''){
									$('#PTFP').show();
									$('#selectedamount').html(formatAmt(parseFloat(mfdtls.response.response.txndata.txn.fundinfo.selectedamount)));
							}else if(mfdtls.response.request.partialfull=='P' && mfdtls.response.request.selectedamount==''){
									$('#NPTFP').show();
									$('#selectedunits').html(formatAmt(parseFloat(mfdtls.response.response.txndata.txn.fundinfo.selectedunits)));
							}else {
								$('#NPTFPELSE').show();
								$('#selectedunits1').html(formatAmt(parseFloat(mfdtls.response.response.txndata.txn.fundinfo.selectedunits)),3);
							}
							$('#amcname').html(mfdtls.response.response.txndata.txn.fundinfo.amcname);
							$('#fundname').html(mfdtls.response.response.txndata.txn.fundinfo.fundname);
							$('#cutofftime').html(mfdtls.response.response.txndata.txn.fundinfo.cutofftime);
							$('#sifrequency').html(mfdtls.response.response.txndata.txn.sidetails.sifrequency);
							$('#day').html(mfdtls.response.request.day);
							$('#date').html(mfdtls.response.request.date);
							$('#installments').html(mfdtls.response.response.txndata.txn.sidetails.installments);
							$('#enddate').html(mfdtls.response.response.txndata.txn.sidetails.enddate);
							$('#startdate').html(mfdtls.response.response.txndata.txn.sidetails.startdate);
							$('#accountno').html(mfdtls.response.response.txndata.txn.account.accountno);
							$('#fromfundname').html(mfdtls.response.response.txndata.txn.fundinfo.fromfundname);
							$('#tofundname').html(mfdtls.response.response.txndata.txn.fundinfo.tofundname);
							

							$('#fldUhid').val(mfdtls.response.request.unitholderid);
							$('#unitholderid').val(mfdtls.response.request.unitholderid);
							//$('#fldAccount').val(mfdtls.response.response.txndata.txn.account.accountno);
							$('#fldFundCode').val(mfdtls.response.request.fundid);
							$('#fldAmcId').val(mfdtls.response.request.amcid);
							$('#fldPartialFull').val(mfdtls.response.request.partialfull);
							$('#fldAmount').val(mfdtls.response.request.selectedamount);
							$('#fldUnits').val(mfdtls.response.request.selectedunits);
							$('#fldSiDay').val(mfdtls.response.request.day);
							$('#fldSiDate').val(mfdtls.response.request.date);
							$('#fldFrequency').val(mfdtls.response.request.sifrequency);
							$('#fldNoOfInstallment').val(mfdtls.response.request.installments);
							$('#fldStartDate').val(mfdtls.response.response.txndata.txn.sidetails.startdate);
							$('#fldEndDate').val(mfdtls.response.response.txndata.txn.sidetails.enddate);
							$('#fldFromFundCode').val(mfdtls.response.request.fundid);
							$('#fldToFundCode').val(mfdtls.response.request.tofundid);
							$('#fldToFundName').val(mfdtls.response.response.txndata.txn.fundinfo.tofundname);
							
								
								 
					});
					 busyInd.hide();
		};
		this.rrstp04Submit = function(){
				        	
			if($("#f1").valid()){
				var objs = document.getElementById('fldAcceptTerms');
				document.getElementById('fldAcceptTerms_txt').value = objs.options[objs.selectedIndex].innerHTML;
				
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
		    	
		    	
		    	
		    	reqParams["fldReportDate"] =getCurrdate();
		    	  
		      	
		    	reqParams["fldRequestId"] =RegfldRequestId;

		    	fldjsessionid = Regfldjsessionid;
		    	reqParams["fldLoginUserId"] =Regloginuid;
		    	reqParams["fldSessionId"] = Rsessionid;
			 	        	var invocationData = {
			 		    			adapter : "mf",
			 		        		procedure : "RRSTP08",
			 		        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
			 		    	};
			 	        	
			 	        	
			 	        	busyInd.show();
			 	        	WL.Client.invokeProcedure(invocationData, {
			 	        		onSuccess :rrstp04SubmitSuccess,
			 	        		onFailure : AdapterFail,
			 	        		timeout: timeout
			 	        	});}
		
		};
		rrstp04SubmitSuccess = function(result){
					invocationResult = result.invocationResult;
					busyInd.hide();
				if(invocationResult.isSuccessful) {
	        		if(invocationResult.faml.response){
							
						if (invocationResult.faml.response.rc!= undefined) {
	        				handleError(invocationResult.faml.response);
							
	        				window.location =  '#rrwcm01';
	        			} else {
						  accStmtData(invocationResult.faml);        	
						  window.location = "#rrstp08";
						}
					}
					else {
		   	    			
 		   	    		handleError(invocationResult.faml);
        				 //window.location =  '#rrasm01';
 		   	    		}
				}
		};
		this.rrstp08Page = function(){
					mfdtls = accStmtData();
					if(mfdtls.response.response.txnreply.txnerror!=undefined){
						txnerror = mfdtls.response.response.txnreply.txnerror;
											$(txnerror).each(function(index, obj) {
												if(obj.errcode!=0){
														self.txnerror.push({ errdesc: obj.errdesc });	
												}	});}
					 $("#contentData").load("Views/MF/rrstp08.html", null, function (response, status, xhr) {
						if (status != "error") {}	
						accountList.removeAll();
						accountSummList.removeAll();
						  	     // if(mfdtls.response.txnreply.txnerror.errcode==0){
										$('#infobox').show();
										$('#txnnumber').html(mfdtls.response.response.txnreply.txnnumber);
											txndate = mfdtls.response.response.txndata.txn.txndate;
											txndate = txndate.substring(6,8)+"-"+txndate.substring(4,6)+"-"+txndate.substring(0,4); 
											$('#tempdate').html(txndate);
										
										if(mfdtls.response.request.partialfull=='P' && mfdtls.response.request.selectedamount!=''){
												$('#PTFP').show();
												$('#selectedamount').html(formatAmt(parseFloat(mfdtls.response.response.txndata.txn.fundinfo.selectedamount)));
										}else if(mfdtls.response.request.partialfull=='P' && mfdtls.response.request.selectedamount==''){
												$('#NPTFP').show();
												$('#selectedunits').html(formatAmt(parseFloat(mfdtls.response.response.txndata.txn.fundinfo.selectedunits)));
										}else {
											$('#NPTFPELSE').show();
											$('#selectedunits1').html(formatAmt(parseFloat(mfdtls.response.response.txndata.txn.fundinfo.selectedunits)),3);
										}
										  $('#unitholderid').html(mfdtls.response.request.unitholderid);
										  $('#amcname').html(mfdtls.response.response.txndata.txn.fundinfo.amcname);
										  $('#fundname').html(mfdtls.response.response.txndata.txn.fundinfo.fundname);
										  $('#cutofftime').html(mfdtls.response.response.txndata.txn.fundinfo.cutofftime);
										if(mfdtls.request.partialfull=='P'){
												$('#swtchType').html('Switch Type');
												$('#STwchName').html('Partial');
										}else if(mfdtls.request.partialfull=='F'){
												$('#swtchType').html('Switch Type');
												$('#STwchName').html('Full');
										}else {
												$('#swtchType').html('Redemption Type');
												$('#STwchName').html('-');
										}
										
										//$('#accountno').html(mfdtls.response.response.txndata.txn.account.accountno);
										$('#sifrequency').html(mfdtls.response.response.txndata.txn.sidetails.sifrequency);
										$('#day').html(mfdtls.response.response.txndata.txn.sidetails.day);
										$('#startdate').html(mfdtls.response.response.txndata.txn.sidetails.startdate);
										$('#enddate').html(mfdtls.response.response.txndata.txn.sidetails.enddate);
										$('#sidate').html(mfdtls.response.response.txndata.txn.sidetails.sidate);
								 // }   	
					  
						ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
					}); 
		};
		 busyInd.hide();
};