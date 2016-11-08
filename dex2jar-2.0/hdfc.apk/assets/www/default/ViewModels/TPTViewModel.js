  var TPTViewModel = function () {

        var self = this;
        self.selAccount = ko.observable();
        self.fromAccountList = ko.observableArray([]);
        self.toAccountList = ko.observableArray([]);
        self.fldFromAcctNo = ko.observable();
        self.fldToAcctNo = ko.observable();
        self.benetype = ko.observable('');
		self.selAccount = ko.observable();
		self.selAcctTemp = ko.observable();
		self.fldmobileemail = ko.observable();
        self.rtgsTxnList = ko.observableArray([]);
        self.fldSelTxnRefNo = ko.observable();
		RecordIFSC= ko.observable();
        
        // cpq vari
        self.cpqQuesList = ko.observableArray([]);
        
        self.impsdetails = ko.observableArray([]);
        self.selRefno = ko.observable('');
        self.fldRefNodata = ko.observable('');
        
        //tpi vari
        self.benefTPT = ko.observableArray([]);
        self.benefNEFT = ko.observableArray([]);
        self.benefRTGS = ko.observableArray([]);
        
        this.callTPT03 = function(){
    	    	
        	accSlider(false);
        	self.selAccount(null);
        	
        	busyInd.show();  
		    
    	    	reqParams = {};
    	    	
    	    	reqParams["fldDeviceId"] = fldDeviceId;
    	    	reqParams["fldWebServerId"] = fldWebServerId;
    	    	reqParams["fldAppId"] = fldAppId;
    	    	reqParams["fldAppServerId"] = fldAppServerId;
    	    	reqParams["fldLangId"] = fldLangId;
    	    	reqParams["fldModule"] = fldModule;
    	    	
    	    	reqParams["fldTxnId"] = "TPT";
    	    	reqParams["fldScrnSeqNbr"] = "04";
    	    	reqParams["fldOperationId"] = "RRTPT03";
        		
    	    	
    	    	reqParams["fldRequestId"] =RegfldRequestId;

    	    	fldjsessionid = Regfldjsessionid;
    	    	reqParams["fldLoginUserId"] =Regloginuid;
    	    	reqParams["fldSessionId"] = Rsessionid;
    	    	
    	    	var invocationData = {
    	    			adapter : "TPT",
    	        		procedure : "RRTPT03",
    	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	    	};
    	    	//WL.Logger.debug(invocationData, '');
    	    	WL.Client.invokeProcedure(invocationData, {
    	    		onSuccess : self.rrtpt03Success,
    	    		onFailure : AdapterFail,	    		
    	    		timeout: timeout
    	    	});
    	    	
        };
        
        
        this.rrtpt03Success = function(result){
        	
        	invocationResult = result.invocationResult;
        	if(invocationResult.isSuccessful) {
        		if(invocationResult.faml.response){	
        		if(invocationResult.faml.response.rc.returncode == 0){
        			
        			fromAccdata = invocationResult.faml.response.acctdtls;
        			toAccdata = invocationResult.faml.response.tptacctdtls;
    	    		
        			nbrofsavingacc = invocationResult.faml.response.nbrsavingacct;
    	    		nbrofcurrentacc = invocationResult.faml.response.nbrcurrentacct;
    	    		nbrtptaccts = invocationResult.faml.response.nbrtptaccts;
    	    			
    	    		fldFCDBRequestId = invocationResult.faml.response.mci.requestid;
    	    		
    	    		totAccount = parseInt(nbrofsavingacc) + parseInt(nbrofcurrentacc);	    		
    	    		
    	    		
    	    		
    	    		self.fromAccountList.removeAll();
    	    		self.toAccountList.removeAll();
    	    		
    	    		$(fromAccdata).each(function(index, obj) {
    	    			displaytxt = obj.codacctno+" - "+obj.nambranch;
    	    			accountValue = obj.codacctno+"#"+obj.acctbalance+"#"+obj.nambranch+"#"+obj.namccyshrt;
    	    		    self.fromAccountList.push({ codacctno: obj.codacctno, acctType: obj.acctType, acctbalance: obj.acctbalance, acctbranch: obj.acctbranch, namccyshrt: obj.namccyshrt,  displaytxt:displaytxt, fldFCDBRequestId:fldFCDBRequestId, accountValue: accountValue });
    	    		}); 
    	    		
    	    		$(toAccdata).each(function(index, obj) {
    	    			displaytxt = obj.narrative+"-"+obj.codacctno;
    	    			accountValue = obj.codacctno;
    	    		    self.toAccountList.push({ codacctno: obj.codacctno, narrative: obj.narrative, displaytxt:displaytxt, accountValue: accountValue });
    	    		}); 
    	    		
    	    		$("#fldRequestId").val(fldFCDBRequestId);
    	    		
    	    		$("#contentData").load("Views/TPT/rrtpt03.html", null, function (response, status, xhr) {
    	                if (status != "error") {}	 
    	                	
	    	                if(nbrtptaccts > 0){
	        	    			accSlider(true);
	        	    			$("#accExitsMsg").hide();
	        	    		}else{
	        	    			accSlider(false);
	        	    			$("#accExitsMsg").show();
	        	    		}
    	                
    	                    ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
    	         });   
    	    		
    	    		
        		}else{
        			handleError(invocationResult.faml.response);
        			window.location = "#rrftr01";
        		}
        		}else{
        			 handleErrorNoResponse();	
        		}
        	}
        	busyInd.hide();
        };
        
        
        this.rrtpt03Submit = function(){
            
        	if($("#frmtpt03").valid()){
        	        	
        		fldLoginUserId = Regloginuid;
    	    	fldFCDBSessionId = RegfldFCDBSessionId;
            	fldjsessionid = Regfldjsessionid;
            	fldSessionId = Rsessionid;    	
    		
        	fldFromAcctNo = $.trim(self.fldFromAcctNo());
        	fldFromAcctNo_txt = $("#fldFromAcctNo option:selected").text();
        	fldToAcctNo = $.trim(self.fldToAcctNo());
        	fldToAcctNo_txt = $("#fldToAcctNo option:selected").text();
        	fldTxnAmount = $("#fldTxnAmount").val();
        	fldTxnDesc = $("#fldTxnDesc").val();
        	
        	
        	var $form = $("#frmtpt03");
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
        	
        		
        	reqParams["fldFromAcctNo_txt"] = fldFromAcctNo_txt;
        	reqParams["fldToAcctNo_txt"] = fldToAcctNo_txt;
        	
        	

        	fldjsessionid = Regfldjsessionid;
        	reqParams["fldLoginUserId"] =Regloginuid;
        	reqParams["fldSessionId"] = Rsessionid;
        	var invocationData = {
	    			adapter : "TPT",
	        		procedure : "RRTPT04",
	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	    	};
        	
        	//WL.Logger.debug(invocationData, '');
        	busyInd.show();
        	WL.Client.invokeProcedure(invocationData, {
        		onSuccess : self.rrtpt04Response,
        		onFailure : AdapterFail,
        		timeout: timeout
        	});
        	}    	
        };
        
        this.rrtpt04Response = function(result){
        	
        	invocationResult = result.invocationResult;
        	if(invocationResult.isSuccessful) {
        		if(invocationResult.faml.response){	
        		if(invocationResult.faml.response.rc.returncode == 0){
    	    			accStmtData(invocationResult.faml);    
    	    			window.location = "#rrtpt04";
        		}else{
        			errmsg = invocationResult.faml.response.rc.errormessage;
        			alert(errmsg);
        		}
        		}
        	}
        	busyInd.hide();
        };
           
        this.callTPT04 = function(){
        	
        	accstmtdata = accStmtData();
   	     
        	txnid = accstmtdata.response.mci.txnid;
        	
        	if(txnid == 'PEN'){
        		fldfromacctno = accstmtdata.response.fldfromacctno;
        	}else{
        		fldfromacctno = accstmtdata.request.fldFromAcctNo;
        	}
        	
        	fldtoacctno = accstmtdata.request.fldToAcctNo;
        	fldTxnAmount = accstmtdata.request.fldTxnAmount;
        	fldTxnDesc = accstmtdata.request.fldTxnDesc;
        	
        	fldfromacctno_txt = accstmtdata.request.fldFromAcctNo_txt;
        	fldtoacctno_txt = accstmtdata.request.fldToAcctNo_txt;
        	
        	arrfromaccno = fldfromacctno.split("#");
        	fldfromacctno = arrfromaccno[0];
        	fldAcctBal = arrfromaccno[1];
        	fromBrn = arrfromaccno[2];
        	fldNamCcy = arrfromaccno[3];        	
       	
        	fldUserRefNo = accstmtdata.response.flduserrefno;
        	fldDateTime = accstmtdata.response.flddatetime;
        	
        	fldRsaTxnId = "";
        	fldClientSessionId = "";
        	fldFcatSessionId = "";
        	if(accstmtdata.response.rsadetails){
	        	fldRsaTxnId = accstmtdata.response.rsadetails.rsatxnid;
	        	fldClientSessionId = accstmtdata.response.rsadetails.clientsessionid;
	        	fldFcatSessionId = accstmtdata.response.rsadetails.fcatsessionid;
        	}
        	        	
        	if(txnid == 'PEN'){
        		txtdesc = accstmtdata.response.fldtxndesc;
        		txtamt = accstmtdata.response.fldtxnamount;
        		multiAcctDetails = $.trim(fldfromacctno)+"~~"+$.trim(accstmtdata.response.fldtoacctno)+"~~"+txtdesc+"~~"+txtamt;
        	}else{        		
        		multiAcctDetails = $.trim(fldfromacctno)+"~~"+$.trim(accstmtdata.request.fldToAcctNo)+"~~"+fldTxnDesc+"~~"+fldTxnAmount;
        	}
        		
        	fldFCDBRequestId = accstmtdata.response.mci.requestid;        	        	
        	fldEntityId = accstmtdata.request.fldEntityId;
        	
		    $("#contentData").load("Views/TPT/rrtpt04.html", null, function (response, status, xhr) {
                if (status != "error") {}	
                
                $("#fldfromacctno").html($.trim(fldfromacctno)+" - "+fromBrn);
                $("#fldtoacctno").html(fldtoacctno);
                $("#acctCur").html(fldNamCcy);
            	$("#fldTxnAmount").html(formatAmt(parseFloat(fldTxnAmount)));
            	$("#fldTxnDesc").html(fldTxnDesc);
            	
            	                
                $("#fldRequestId").val(fldFCDBRequestId);
                $("#fldMultiAcctsDtls").val(multiAcctDetails);
                $("#fldFromAcctNo").val(fldfromacctno);
                $("#fldFromBrn").val(fromBrn);
                $("#fldAcctCurr").val(fldNamCcy);
                $("#fldUserRefNo").val(fldUserRefNo);
                $("#fldDateTime").val(fldDateTime);
                $("#fldRsaTxnId").val(fldRsaTxnId);
                $("#fldClientSessionId").val(fldClientSessionId);
                $("#fldFcatSessionId").val(fldFcatSessionId);
                $("#fldAcctBal").val(fldAcctBal);
                $("#fldCurr").val(fldNamCcy);
              
                ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
            });
        	
        };
        
        
        this.rrtpt04Submit = function(){
        	
        	var $form = $("#frmtpt04");
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
	    			adapter : "TPT",
	        		procedure : "RRTPT05",
	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	    	};
        	
        	//WL.Logger.debug(invocationData, '');
        	busyInd.show();
        	WL.Client.invokeProcedure(invocationData, {
        		onSuccess : rsaResponse,
        		onFailure : AdapterFail,
        		timeout: timeout
        	});    	    	
        };

        //Vishal Changes
		self.tpi01submit = function(){
			
			if($("#rrtpi01").valid()){
				
			var $form = $("#rrtpi01");
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
			        	 
        		reqParams["fldFCDBSessionId"] = RegfldFCDBSessionId;
			
			reqParams["fldBeneType"] = $('#fldBeneType').val();
			reqParams["fldBenefType"] = $('#fldBeneType').val();
			
			reqParams["fldBeneType_txt"] =$('#fldBeneType:option selected').text();
			
	    	
			reqParams["fldRequestId"] =RegfldRequestId;

	    	fldjsessionid = Regfldjsessionid;
	    	reqParams["fldLoginUserId"] =Regloginuid;
	    	reqParams["fldSessionId"] = Rsessionid;
			
			
	    	var invocationData = {
	    			adapter : "TPT",
	        		procedure : "RRTPI01",
	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	    	};
        	
        	//WL.Logger.debug(invocationData, '');
        	busyInd.show();
        	WL.Client.invokeProcedure(invocationData, {
        		onSuccess : tpi01submitResponse,
        		onFailure : AdapterFail,
        		timeout: timeout
        	});
        	
			}
		};
		 
		tpi01submitResponse = function(result){
			self.benefTPT.removeAll();
			self.benefNEFT.removeAll();
			self.benefRTGS.removeAll();
			busyInd.hide();
        	invocationResult = result.invocationResult;
        	
			$("#contentData").load("Views/TPT/rrtpi01.html", null, function (response, status, xhr) {
                if (status != "error") {}	
                
                if(invocationResult.isSuccessful) {
            		if(invocationResult.faml.response){	
            		if(invocationResult.faml.response.rc.returncode == 0){
            				tmpbeneftype = invocationResult.faml.response.benetype;
            				if(tmpbeneftype == 'TPT' || tmpbeneftype == 'RTGS')
            					self.benetype(tmpbeneftype);
            				else if(tmpbeneftype == 'NEFT')
            					self.benetype("NEFT / IMPS");
            				
            				if(tmpbeneftype == 'TPT'){
            					tpaccount = invocationResult.faml.response.tpaccount;
            					if(tpaccount == undefined){
            						$("#nobenif").hide();
									alert("There is no beneficiary added for the given transaction type. Please go to Add beneficiary transaction to add new beneficiary.");
            					}
            					else {
            						$("#nobenif").hide();
            					}
            					
            					$(tpaccount).each(function(index, obj) {
            						
            						if(obj.status == 'E') statusTxt = "Enabled";
            						else if(obj.status == 'U') statusTxt = "Pending For Authorization";
            						else statusTxt = "Invalid Status";
            						
                	    			self.benefTPT.push({ benacctno: obj.benacctno, narrative: obj.narrative, email1: obj.email1, statusTxt: statusTxt });
                	    		}); 
            				}
        	    			
            				if(tmpbeneftype == 'NEFT'){
            					neftaccount = invocationResult.faml.response.neftaccount;
            					
            					
            					if(neftaccount== undefined){
            						$("#nobenif").hide();
									alert("There is no beneficiary added for the given transaction type. Please go to Add beneficiary transaction to add new beneficiary.");
            					}
            					else {
            						$("#nobenif").hide();
            					}
            					
            					$(neftaccount).each(function(index, obj) {
            						
            						if(obj.status == 'E') statusTxt = "Enabled";
            						else if(obj.status == 'U') statusTxt = "Pending For Authorization";
            						else statusTxt = "Invalid Status";
            						
            						if(obj.benefaccttype == '10') beacctype = "Savings";
            						else if(obj.benefaccttype == '11') beacctype = "Current";
            						else if(obj.benefaccttype == '12') beacctype = "Overdraft";
            						else if(obj.benefaccttype == '13') beacctype = "Cash Credit";
            						else if(obj.benefaccttype == '14') beacctype = "Loan Account";
            						else if(obj.benefaccttype == '40') beacctype = "NRE";
            						else if(obj.benefaccttype == '52') beacctype = "Cash Payment";
            						else beacctype = "Invalid Account Type";
            						
                	    			self.benefNEFT.push({ benacctno: obj.benacctno, beacctype: beacctype, ifsccode: obj.ifsccode, narrative: obj.narrative,email1: obj.email1, statusTxt: statusTxt });
                	    		}); 
            				}
            				
            				if(tmpbeneftype == 'RTGS'){
            					rtgsaccount = invocationResult.faml.response.rtgsaccount;
            					
            					if(rtgsaccount== undefined){
            						$("#nobenif").hide();
									
									alert("There is no beneficiary added for the given transaction type. Please go to Add beneficiary transaction to add new beneficiary.");
            					}
            					else {
            						$("#nobenif").hide();
            					
            					$(rtgsaccount).each(function(index, obj) {
            						
            						if(obj.status == 'E') statusTxt = "Enabled";
            						else if(obj.status == 'U') statusTxt = "Pending For Authorization";
            						else statusTxt = "Invalid Status";
            						
            						self.benefRTGS.push({ benacctno: obj.benacctno, ifsccode: obj.ifsccode, narrative: obj.narrative,email1: obj.email1, statusTxt: statusTxt });
                	    		}); 
            					}
            				}
            				
            		}else{
            			handleError(invocationResult.faml.response);
            			//window.location = "#rrftr01";
            		}
            		}else{
            			 handleErrorNoResponse();	
            		}
            	}
                
                ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
            });
        	
		 };
		
		this.tpn04Page = function(){
			reqParams = {};
    	
		reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldModule"] = fldModule;
    	
    	reqParams["fldTxnId"] = "TPN";
    	reqParams["fldScrnSeqNbr"] = "01";
    	reqParams["fldOperationId"] = "RRTPN04";
    	
    	reqParams["fldFCDBRequestId"] = RegfldRequestId;
		reqParams["fldBenefType"] = 'NEFT';		
    	
		reqParams["fldRequestId"] =RegfldRequestId;

    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
    	
    	var invocationData = {
    			adapter : "TPT",
        		procedure : "RRTPN04",
        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	};
    	busyInd.show();
    	//WL.Logger.debug(invocationData, '');
    	WL.Client.invokeProcedure(invocationData, {
    		onSuccess : rrtpn01Response,
    		onFailure : AdapterFail,
    		timeout: timeout
    	});	 
		};
		
		rrtpn01Response = function(result){
		
        	invocationResult = result.invocationResult;
			self.fromAccountList.removeAll();
			rdAccountList.removeAll();
        	if(invocationResult.isSuccessful) {
        		if(invocationResult.faml.response){	
        		if(invocationResult.faml.response.rc.returncode == 0){
				//accStmtData(invocationResult.faml.response.acctdtls); 
        		nbrtptaccts = invocationResult.faml.response.nbrtptaccts;
        			
				if(nbrtptaccts > 0){
	    			acctdtls = invocationResult.faml.response.acctdtls;
					var idx = 1;
					$(acctdtls).each(function(index, obj) {
							strid = "item"+idx;
							self.fromAccountList.push({ codacctno: obj.codacctno,  displaytxt: obj.codacctno+'-'+obj.nambranch, strid:strid });
    	    		    idx++;
					});
					tptacctdtls = invocationResult.faml.response.tptacctdtls;
					var idx1 = 1;
					$(tptacctdtls).each(function(index, obj) {
							strid = "item"+idx1;
							rdAccountList.push({ codacctno: obj.accttype+"#"+obj.narrative+"#"+obj.ifsccode+"#"+obj.codacctno+"#"+obj.bankname+"#"+obj.branchname,  displaytxt: obj.narrative, strid:strid });
    	    		    idx1++;
					});
					}
            			
				$("#contentData").load("Views/TPT/rrtpn04.html", null, function (response, status, xhr) {
	                if (status != "error") {}	
	              
					if(nbrtptaccts > 0){
						$('#tptCont').show();
					}else{
						$('#TptNoMsg').show();
					}
					if(invocationResult.faml.response.cutoffmsg	== 'true'){
						$('#cutoffmsgBox1').show();
					}else{
						$('#cutoffmsgBox2').show();
					}			
                                   $(document).ready(function(){
                                                     optval = $("#fldComMode").val();
                                                     fldMobileEmailV  = $("#fldMobileEmail").val();
                                                     
                                                     if(optval=='Default'){
                                                     $('#fldMobileEmail').attr('readonly', true);
                                                     }
                                                     
                                                     $( "#fldComMode" ).change(function() {
                                                                               
                                                                               if($("#fldComMode").val()=='Default'){
                                                                               
                                                                               $('#fldMobileEmail').attr('readonly', true);
                                                                               $('#fldMobileEmail').val('');
                                                                               }
                                                                               else{
                                                                               $('#fldMobileEmail').attr('readonly', false);
                                                                               }
                                                                               });
                                                     
                                                     
                                                     });
					$('#fldMinAmount').val(invocationResult.faml.response.minamount);
					$('#fldRequestId').val(invocationResult.faml.response.mci.requestid);
					$('#fldExtSessionId').val(invocationResult.faml.response.fldExtSessionId);
					
					  ko.applyBindings(self, $(".dynamic-page-content").get(0));
	            });
    	    			
        		}else{
        			handleError(invocationResult.faml.response);
        			window.location = "#rrftr01";
        		}
        		}else{
        			 handleErrorNoResponse();	
        		}
        	}
			
			busyInd.hide();
		 };
		 
		 this.confirmCutOff = function(iValue){
			 if (iValue == 2){
				 document.getElementById("fldBenefType").value = "NEFT";
				 self.calltpnsubmit();
		      }else{
		    	  window.location = "#rrftr01";
		      }
		  
		 };
		 
		 this.calltpnsubmit = function(){
		
			 var $form = $("#rrtpn04");
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
				reqParams["fldFCDBSessionId"] = RegfldFCDBSessionId;	
		    	fldjsessionid = Regfldjsessionid;
		    	reqParams["fldLoginUserId"] =Regloginuid;
		    	reqParams["fldSessionId"] = Rsessionid;
				
				busyInd.show();
				var invocationData = {
					adapter : "TPT",
					procedure : "RRTPN05",
					parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
				};
				
				//WL.Logger.debug(invocationData, '');
				WL.Client.invokeProcedure(invocationData, {
					onSuccess : rrtpn04SubmitResponse,
					onFailure : AdapterFail,
					timeout: timeout
				});	
						
				
		 };

		 this.rrtpn04Submit = function(){
			 
			 
			 optval = $("#fldComMode").val();
			 fldMobileEmailV  = $("#fldMobileEmail").val();
			 if(optval == 'EML' && fldMobileEmailV==''){
					alert('Enter Email');
					return;
			 }if(optval == 'SMS' && fldMobileEmailV==''){
					alert('Enter Mobile number');
					return;
			 }
			 
			if($("#rrtpn04").valid()){
				//alert('here only ');
				if(clkBtn == 'confirm_button'){
					
					navigator.notification.confirm(
		          "This funds transfer request has been initiated after the RBI cut-off for the day. This request will be presented to RBI on the next working day for further processing. The funds will be debited from the account immediately. Please press OK button to continue or Cancel button to cancel the request",
		          this.confirmCutOff,
		          'Confirmation',
		          'Cancel,OK');
					
	        	}else{
	        	
	        		self.calltpnsubmit();
	        	}		
			}
		 };
		 rrtpn04SubmitResponse = function(result){
				
					invocationResult = result.invocationResult;
					if(invocationResult.isSuccessful) {
						if(invocationResult.faml.response){	
						if(invocationResult.faml.response.rc.returncode == 0){
								accStmtData(invocationResult.faml);    
								window.location = "#rrtpn05";
						}else{
							handleError(invocationResult.faml.response);
						}
						}
					}
		 };
		 this.tpn05Page = function(){
			 accstmtdata = accStmtData();
					$("#contentData").load("Views/TPT/rrtpn05.html", null, function (response, status, xhr) {
						if (status != "error") {}	
							
							fldBenefDetail = accstmtdata.response.fldBenefDetail.split('#');
						//	obj.accttype+"#"+obj.narrative+"#"+obj.ifsccode+"#"+obj.codacctno+"#"+obj.bankname+"#"+obj.branchname;
							
							fldAcctNo = $.trim(accstmtdata.request.fldAcctNo);
							$('.fldAcctNo').html(fldAcctNo);
							$('.ifsccode').html(fldBenefDetail[2]);
							$('.narrative').html(fldBenefDetail[1]);
							$('.codacctno').html(fldBenefDetail[3]);
							$('.bankname').html(fldBenefDetail[4]);
							
							acctdtls = accstmtdata.response.acctdtls;
							$(acctdtls).each(function(index, obj) {
								
								if($.trim(obj.codacctno) == fldAcctNo){
									$("#fldAcctBal").val(obj.acctbalance);
									$("#fldCurr").val(obj.namccyshrt);
								}
								
							});
							
							$('.fldtxnamount').html(formatAmt(parseFloat(accstmtdata.response.fldTxnAmount)));
							$('.fldtxndesc').html(accstmtdata.response.fldTxnDesc);
							self.benetype(accstmtdata.response.fldComMode);
							self.fldmobileemail(accstmtdata.response.fldMobileEmail);
							$('#fldExtSessionId').val(invocationResult.faml.response.fldExtSessionId);
							if(accstmtdata.response.rsadetails){
					     		rsatxnid = accstmtdata.response.rsadetails.rsatxnid;
					     		clientsessionid = accstmtdata.response.rsadetails.clientsessionid;
					     		fcatsessionid = accstmtdata.response.rsadetails.fcatsessionid;
					     	}else{
					     		rsatxnid = "";
					     		clientsessionid = "";
					     		fcatsessionid = "";
					     	}
							ifsccodeneft=fldBenefDetail[2].toUpperCase();
							$("#fldAcctNo").val(fldAcctNo);
							$("#fldBeneAcctType").val(fldBenefDetail[0]);
							$("#fldNamBenef").val(fldBenefDetail[1]);
							$("#fldIFSCCode").val(ifsccodeneft);
							$("#fldBeneAcct").val(fldBenefDetail[3]);
							$("#fldBankDesc").val(fldBenefDetail[4]);
							$("#fldBranchDesc").val(fldBenefDetail[5]);
							$("#fldTxnAmount").val(accstmtdata.response.fldTxnAmount);
							$("#fldTxnDesc").val(accstmtdata.response.fldTxnDesc);	
							$("#fldComMode").val(accstmtdata.response.fldComMode);
							$("#fldMobileEmail").val(accstmtdata.response.fldMobileEmail);
							$("#fldUserRefNo").val(accstmtdata.response.fldUserRefNo);
							$("#fldDateTime").val(accstmtdata.response.fldDateTime);
							$("#fldRsaTxnId").val(rsatxnid);
							$("#fldClientSessionId").val(clientsessionid);
							$("#fldFcatSessionId").val(fcatsessionid);
							
							
							requestid = accstmtdata.response.mci.requestid;
							$("#fldRequestId").val(requestid);
							$("#fldFCDBRequestId").val(requestid);
							
							ko.applyBindings(self, $(".dynamic-page-content").get(0));
					});
					busyInd.hide();
		 };
		 
		 
		 this.rrtpn05Submit = function(){
	        	
	        	var $form = $("#frmtpn05");
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
		    			adapter : "TPT",
		        		procedure : "RRTPN06",
		        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
		    	};
	        	
	        	//WL.Logger.debug(invocationData, '');
	        	busyInd.show();
	        	WL.Client.invokeProcedure(invocationData, {
	        		onSuccess : rsaResponse,
	        		onFailure : AdapterFail,
	        		timeout: timeout
	        	});    	    	
	        };
	        
		 this.mpe01submit  = function(){
				busyInd.show();
				reqParams = {};
				
				reqParams["fldDeviceId"] = fldDeviceId;
				reqParams["fldWebServerId"] = fldWebServerId;
				reqParams["fldAppId"] = fldAppId;
				reqParams["fldAppServerId"] = fldAppServerId;
				reqParams["fldLangId"] = fldLangId;
				reqParams["fldModule"] = fldModule;
					reqParams["fldFCDBSessionId"] = RegfldFCDBSessionId;	
				
				reqParams["fldRequestId"] =RegfldRequestId;

		    	fldjsessionid = Regfldjsessionid;
		    	reqParams["fldLoginUserId"] =Regloginuid;
		    	reqParams["fldSessionId"] = Rsessionid;
				
				reqParams["fldTxnId"] = "MPE";
				reqParams["fldScrnSeqNbr"] = "01";
				reqParams["fldOperationId"] = "RRMPE01";
				//&fldFCDBSessionId=818105634XTROFFFBX&fldSessionId=VBZQHTBRIPRWFSGIRH&fldjsessionid=9dnDPNYGyhJJpjJGTtkr2HfTSMyXGncx1W5431K91fpsjdwXymyH%21%2d715396035%211338873958187&fldLoginUserId=33034781&fldLangId=and&fldRequestId=RRMPE01&fldDeviceId=43
				var invocationData = {
					adapter : "TPT",
					procedure : "RRMPE01",
					parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
				};
				
				//WL.Logger.debug(invocationData, '');
				WL.Client.invokeProcedure(invocationData, {
					onSuccess : rrmpe01Response,
					onFailure : AdapterFail,
					timeout: timeout
				});	
			};
			
			rrmpe01Response = function(result){
					busyInd.hide();
					invocationResult = result.invocationResult;
						if(invocationResult.isSuccessful) {
							if(invocationResult.faml.response){	
								if(invocationResult.faml.response.rc.returncode == 0){
    			
    			merchantdtls = invocationResult.faml.response.merchantdtls;
				acctdtls  = invocationResult.faml.response.acctdtls;
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
	    		
	    		self.fromAccountList.removeAll();
	    		self.toAccountList.removeAll();
	    		var idx = 1;
	    		$(acctdtls).each(function(index, obj) {
	    			strid = idx;
	    			custnames = "";
	    			
	    			displaytxt = obj.codacctno;	    			
	    			accountValue = obj.codacctno+"#"+obj.codccy+"#"+obj.acctbalance+"#"+obj.nambranch+"#"+obj.codacctstat+"#"+obj.namccyshrt;
	    		    
	    			$(merchantdtls).each(function(index1, obj1) {
	    				
	    			if(obj.codccy == '1' && $.trim(obj.codacctno) == $.trim(obj1.dealeracctno)){

	    				self.fromAccountList.push({ codacctno: obj.codacctno, acctbalance: obj.acctbalance, nambranch: obj.nambranch, namccyshrt: obj.namccyshrt, strid:strid, displaytxt:displaytxt, fldFCDBRequestId:fldFCDBRequestId, accountValue: accountValue });
	    		    	
	    			}
	    			});
	    			idx++;
	    		});
				var idx1 = 1;
				$(merchantdtls).each(function(index, obj) {
	    			strid = idx1;
	    			custnames = "";
	    			
	    			displaytxt = obj.merchname;	    			
	    			accountValue = obj.dealercode+"#"+obj.salesorg+"#"+obj.merchname+"#"+obj.defnarration+"#"+obj.merchcode+"#"+obj.merchantacctno;
	    		    
	    			
	    				
	    		    	self.toAccountList.push({  strid:strid, displaytxt:displaytxt, fldFCDBRequestId:fldFCDBRequestId, accountValue: accountValue });
	    			
	    			idx1++;
	    		});
	    		$("#fldFCDBRequestId").val(fldFCDBRequestId);
	    		$("#contentData").load("Views/TPT/rrmpe01.html", null, function (response, status, xhr) {
						if (status != "error") {}	
							ko.applyBindings(self, $(".dynamic-page-content").get(0));
							
						
					});
    		}else{
    			handleError(invocationResult.faml.response);
    			
    			if(invocationResult.faml.response.rc.returncode == 1 || invocationResult.faml.response.rc.returncode == 1068){
    				window.location = "#rrftr01";
    			}
    		}
    	 }else{
    		 handleErrorNoResponse();
    	 }
    	}
					busyInd.hide();
					
			};
			
			this.mpe01Pagesubmit = function(){
				
				if($("#tpti01").valid()){
				busyInd.show();
				reqParams = {};
				
				reqParams["fldDeviceId"] = fldDeviceId;
				reqParams["fldWebServerId"] = fldWebServerId;
				reqParams["fldAppId"] = fldAppId;
				reqParams["fldAppServerId"] = fldAppServerId;
				reqParams["fldLangId"] = fldLangId;
				reqParams["fldModule"] = fldModule;

				reqParams["fldFCDBSessionId"] =RegfldFCDBSessionId;	
				
				reqParams["fldRequestId"] =RegfldRequestId;

		    	fldjsessionid = Regfldjsessionid;
		    	reqParams["fldLoginUserId"] =Regloginuid;
		    	reqParams["fldSessionId"] = Rsessionid;
				
				reqParams["fldTxnId"] = "MPE";
				reqParams["fldScrnSeqNbr"] = "02";
				reqParams["fldOperationId"] = "RRMPE04";
				reqParams["fldToAcctNo1_txt"] = $('#fldToAcctNo1 option:selected').text();
				reqParams["fldFromAcctNo1_txt"] = $('#fldFromAcctNo1 option:selected').text();
				reqParams["fldToAcctNo1"] = $('#fldToAcctNo1 option:selected').val();
				reqParams["fldFromAcctNo1"] = $('#fldFromAcctNo1 option:selected').val();
				reqParams["InputPage2"] = "1";
				
				
				var invocationData = {
					adapter : "TPT",
					procedure : "RRMPE02",
					parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
				};
				
				//WL.Logger.debug(invocationData, '');
				WL.Client.invokeProcedure(invocationData, {
					onSuccess : rrmpe02Response,
					onFailure : AdapterFail,
					timeout: timeout
				});	
				}
			};
			rrmpe02Response = function(result){
					busyInd.hide();
					invocationResult = result.invocationResult;
					if(invocationResult.isSuccessful) {
						if(invocationResult.faml.response){	
						if(invocationResult.faml.response.rc.returncode == 0){
								accStmtData(invocationResult.faml);    
								window.location = "#rrmpe02";
						}else{
							errmsg = invocationResult.faml.response.rc.errormessage;
							alert(errmsg);
						}
						}
					}
			};
			this.mpe02Page = function(){
					accStmtData1 = accStmtData();
					
					$("#contentData").load("Views/TPT/rrmpe02.html", null, function (response, status, xhr) {
						if (status != "error") {}	
							ko.applyBindings(self, $(".dynamic-page-content").get(0));
							$('#fldToAcctNo1_txt').html(accStmtData1.response.fldToAcctNo1_txt);
							$('#fldFromAcctNo1_txt').html(accStmtData1.response.fldFromAcctNo1_txt.split('#')[0]);
							$('#fldToAcctNo1').html(accStmtData1.response.fldToAcctNo1.split('#')[0]);
							$("#fldUserReference").val(accStmtData1.response.fldToAcctNo1.split('#')[3]);
					});
			};
			this.mpe02Pagesubmit = function(){
				
				if($("#frmmpe02").valid()){
					busyInd.show();
					mpe2Data = accStmtData();
						reqParams = {};
						reqParams["fldDeviceId"] = fldDeviceId;
						reqParams["fldWebServerId"] = fldWebServerId;
						reqParams["fldAppId"] = fldAppId;
						reqParams["fldAppServerId"] = fldAppServerId;
						reqParams["fldLangId"] = fldLangId;
						reqParams["fldModule"] = fldModule;
						
						reqParams["fldFCDBSessionId"] = RegfldFCDBSessionId;	
						
						reqParams["fldRequestId"] =RegfldRequestId;

				    	fldjsessionid = Regfldjsessionid;
				    	reqParams["fldLoginUserId"] =Regloginuid;
				    	reqParams["fldSessionId"] = Rsessionid;
						
						reqParams["fldTxnId"] = "MPE";
						reqParams["fldScrnSeqNbr"] = "02";
						reqParams["fldMerchantName"] = mpe2Data.response.fldToAcctNo1_txt;
						reqParams["fldOperationId"] = "RRMPE04";
						reqParams["fldMerchantCode"] = mpe2Data.response.fldToAcctNo1.split('#')[4];
						reqParams["fldDealerCode"] = mpe2Data.response.fldToAcctNo1.split('#')[0];
						reqParams["fldDbBrn"] = mpe2Data.response.fldFromAcctNo1.split('#')[3];
						reqParams["fldFromAcctNo"] = mpe2Data.response.fldFromAcctNo1_txt;
						reqParams["fldToAcctNo "] = mpe2Data.response.fldToAcctNo1.split('#')[5];
						reqParams["fldSalesOrg"] = mpe2Data.response.fldToAcctNo1.split('#')[1];
						reqParams["fldAmtTxn"] = $('#fldAmtTxn').val();
						reqParams["balance"] = mpe2Data.response.fldFromAcctNo1.split('#')[2];
						reqParams["fldMultiAcctsDtls"] = mpe2Data.response.fldFromAcctNo1_txt+"~~"+mpe2Data.response.fldToAcctNo1.split('#')[5];
						reqParams["fldUserReference"] = $('#fldUserReference').val();
						reqParams["selAcct"] = mpe2Data.response.fldFromAcctNo1_txt;
				
			//&fldMerchantName=BPCL&fldjsessionid=9dnDPNYGyhJJpjJGTtkr2HfTSMyXGncx1W5431K91fpsjdwXymyH%21%2d715396035%211338873958187&fldSessionId=VBZQHTBRIPRWFSGIRH&fldMerchantCode=BPCL&fldDealerCode=33034781&fldAppId=RS&fldDbBrn=KANDIVALI%20%2d%20MUMBAI&fldFromAcctNo=02881020000766&fldFCDBSessionId=818105634XTROFFFBX&fldLangId=and&fldLoginUserId=33034781&fldSalesOrg=3000&fldAmtTxn=1&balance=2215%2e46&fldMultiAcctsDtls=02881020000766%7e%7e00011000001204&fldScrnSeqNbr=02&fldUserReference=BPCL%20LPG%20PAYMENT&fldModule=&fldFCDBRequestId=818105634XTROFFFBX105641165NL&selAcct=02881020000766&fldTxnId=MPE&fldRequestId=RRMPE02&fldToAcctNo=00011000001204&fldDeviceId=43
	    		    	
				var invocationData = {
					adapter : "TPT",
					procedure : "RRMPE03",
					parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
				};
				
				//WL.Logger.debug(invocationData, '');
				WL.Client.invokeProcedure(invocationData, {
					onSuccess : rrmpe02PageResponse,
					onFailure : AdapterFail,
					timeout: timeout
				});	
				}
			};
			rrmpe02PageResponse = function(result){
					busyInd.hide();
					invocationResult = result.invocationResult;
					if(invocationResult.isSuccessful) {
						if(invocationResult.faml.response){	
						if(invocationResult.faml.response.rc.returncode == 0){
								accStmtData(invocationResult.faml);    
								window.location = "#rrmpe03";
						}else{
							errmsg = invocationResult.faml.response.rc.errormessage;
							alert(errmsg);
						}
						}
					}
			};
			this.mpe03Page = function(){
				mpe2Data = accStmtData();
				$("#contentData").load("Views/TPT/rrmpe03.html", null, function (response, status, xhr) {
						if (status != "error") {}	
							ko.applyBindings(self, $(".dynamic-page-content").get(0));
							//$('#referenceno1').html(mpe2Data.response.transaction.referenceno1);
							$('#amount').html(formatAmt(parseFloat(mpe2Data.request.fldAmtTxn)));
							$('#merchantname').html(mpe2Data.request.fldMerchantName);
							$('#fromaccountno').html(mpe2Data.request.fldFromAcctNo+"-"+mpe2Data.request.fldDbBrn);
							$('#dealercode').html(mpe2Data.request.fldDealerCode);
							$('#customerrefno').html(mpe2Data.request.fldUserReference);
					});
				
			};
			this.mpe03Pagesubmit = function(){
					busyInd.show();
					mpe2Data = accStmtData();
						reqParams = {};
						reqParams["fldDeviceId"] = fldDeviceId;
						reqParams["fldWebServerId"] = fldWebServerId;
						reqParams["fldAppId"] = fldAppId;
						reqParams["fldAppServerId"] = fldAppServerId;
						reqParams["fldLangId"] = fldLangId;
						reqParams["fldModule"] = fldModule;
						reqParams["fldFCDBSessionId"] = RegfldFCDBSessionId;	
						
						reqParams["fldRequestId"] =RegfldRequestId;

				    	fldjsessionid = Regfldjsessionid;
				    	reqParams["fldLoginUserId"] =Regloginuid;
				    	reqParams["fldSessionId"] = Rsessionid;
						
						
						reqParams["fldTxnId"] = "MPE";
						reqParams["fldScrnSeqNbr"] = "03";
						reqParams["fldMerchantName"] = mpe2Data.response.fldMerchantName;
						reqParams["fldOperationId"] = "RRMPE04";
						reqParams["fldMerchantCode"] = mpe2Data.response.fldMerchantCode;
						reqParams["fldDealerCode"] = mpe2Data.response.fldDealerCode;
						reqParams["fldDbBrn"] = mpe2Data.response.fldDbBrn;
						reqParams["fldFromAcctNo"] = mpe2Data.response.fldFromAcctNo;
						reqParams["fldToAcctNo "] = mpe2Data.response.fldToAcctNo;
						reqParams["fldSalesOrg"] = mpe2Data.response.fldSalesOrg;
						reqParams["fldAmtTxn"] = mpe2Data.response.fldAmtTxn;
						reqParams["balance"] = mpe2Data.response.balance;
						reqParams["fldMultiAcctsDtls"] = mpe2Data.response.fldMultiAcctsDtls+"~~"+mpe2Data.request.fldUserReference+"~~"+mpe2Data.response.fldAmtTxn;
						reqParams["fldUserReference"] = mpe2Data.request.fldUserReference;
						reqParams["selAcct"] = mpe2Data.response.selAcct;
				
			//&fldMerchantName=BPCL&fldjsessionid=9dnDPNYGyhJJpjJGTtkr2HfTSMyXGncx1W5431K91fpsjdwXymyH%21%2d715396035%211338873958187&fldSessionId=VBZQHTBRIPRWFSGIRH&fldMerchantCode=BPCL&fldDealerCode=33034781&fldAppId=RS&fldDbBrn=KANDIVALI%20%2d%20MUMBAI&fldFCDBSessionId=818105634XTROFFFBX&fldLangId=and&fldLoginUserId=33034781&fldSalesOrg=3000&fldAmtTxn=1&fldMultiAcctsDtls=02881020000766%7e%7e00011000001204%7e%7eBPCL%20LPG%20PAYMENT%7e%7e1&fldScrnSeqNbr=03&fldUserReference=BPCL%20LPG%20PAYMENT&fldModule=CH&fldFCDBRequestId=818105634XTROFFFBX10577124KBE&fldTxnId=MPE&fldRequestId=RRMPE03&fldDeviceId=43
	    		    	
				var invocationData = {
					adapter : "TPT",
					procedure : "RRMPE04",
					parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
				};
				
				//WL.Logger.debug(invocationData, '');
				WL.Client.invokeProcedure(invocationData, {
					onSuccess : rrmpe03PageResponse,
					onFailure : AdapterFail,
					timeout: timeout
				});	
					
			};
			rrmpe03PageResponse = function(result){
				busyInd.hide();
					invocationResult = result.invocationResult;
					if(invocationResult.isSuccessful) {
						if(invocationResult.faml.response){	
						if(invocationResult.faml.response.rc.returncode == 0){
								accStmtData(invocationResult.faml);    
								window.location = "#rrmpe04";
						}else{
							errmsg = invocationResult.faml.response.rc.errormessage;
							alert(errmsg);
						}
						}
					}
			
			};
			this.mpe04Page = function(){
				mpe2Data = accStmtData();
				$("#contentData").load("Views/TPT/rrmpe04.html", null, function (response, status, xhr) {
						if (status != "error") {}	
							ko.applyBindings(self, $(".dynamic-page-content").get(0));
							$('#referenceno1').html(mpe2Data.response.transaction.referenceno1);
							$('#amount').html(mpe2Data.response.transaction.amount);
							$('#merchantname').html(mpe2Data.response.transaction.merchantname);
							$('#fromaccountno').html(mpe2Data.response.transaction.fromaccountno+"-"+mpe2Data.response.transaction.frombranchname);
							$('#dealercode').html(mpe2Data.response.transaction.dealercode);
							$('#customerrefno').html(mpe2Data.response.transaction.customerrefno);
					});
				
			};
		//Vishal Changes        
        this.callTPV01 = function(){
        	        	
    		
	    
	    	reqParams = {};
	    	
	    	reqParams["fldDeviceId"] = fldDeviceId;
	    	reqParams["fldWebServerId"] = fldWebServerId;
	    	reqParams["fldAppId"] = fldAppId;
	    	reqParams["fldAppServerId"] = fldAppServerId;
	    	reqParams["fldLangId"] = fldLangId;
	    	reqParams["fldModule"] = fldModule;
	    	
	    	reqParams["fldTxnId"] = "TPV";
	    	reqParams["fldScrnSeqNbr"] = "01";
	    	reqParams["fldOperationId"] = "RRTPV01";
    		
	    	
	    	reqParams["fldRequestId"] =RegfldRequestId;

	    	fldjsessionid = Regfldjsessionid;
	    	reqParams["fldLoginUserId"] =Regloginuid;
	    	reqParams["fldSessionId"] = Rsessionid;
	    	
	    	
	    	busyInd.show();
	    	var invocationData = {
	    			adapter : "TPT",
	        		procedure : "RRTPV01",
	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	    	};
	    	
	    	WL.Client.invokeProcedure(invocationData, {
	    		onSuccess : self.rrtpv01Success,
	    		onFailure : AdapterFail,	    		
	    		timeout: timeout
	    	});
    	    	
        };
        
        this.rrtpv01Success = function(result){
        	
        	invocationResult = result.invocationResult;
        	if(invocationResult.isSuccessful) {
        		if(invocationResult.faml.response){	
        		if(invocationResult.faml.response.rc.returncode == 0){
        			if(invocationResult.faml.response.srchdetails){
        				fldTxnRefNo = invocationResult.faml.response.srchdetails.txnrefno;
        				startdate = invocationResult.faml.response.srchdetails.startdate;
        				enddate = invocationResult.faml.response.srchdetails.enddate;
        			}else{
        				fldTxnRefNo = "";
        				startdate = "";
        				enddate = "";
        			}
        			
        			$("#contentData").load("Views/TPT/rrtpv01.html", null, function (response, status, xhr) {
                        if (status != "error") {}
                        
                        $("#fldTxnRefNo").val(fldTxnRefNo);
                        $("#fldStartDate").val(startdate);
                        $("#fldEndDate").val(enddate);
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
        
        self.calltpvView = function(){
        	
        	reqParams = {};
	    	
	    	reqParams["fldDeviceId"] = fldDeviceId;
	    	reqParams["fldWebServerId"] = fldWebServerId;
	    	reqParams["fldAppId"] = fldAppId;
	    	reqParams["fldAppServerId"] = fldAppServerId;
	    	reqParams["fldLangId"] = fldLangId;
	    	reqParams["fldModule"] = fldModule;
	    	
	    	reqParams["fldTxnId"] = "TPV";
	    	
	    	reqParams["fldRequestId"] =RegfldRequestId;

	    	fldjsessionid = Regfldjsessionid;
	    	reqParams["fldLoginUserId"] =Regloginuid;
	    	reqParams["fldSessionId"] = Rsessionid;
	    	
	    	reqParams["fldScrnSeqNbr"] = "02";
	    	reqParams["fldOperationId"] = "RRTPV01";
	    	
	    	reqParams["fldActionType"] = "list";
	    	reqParams["viewselected"] = "1";
	    	reqParams["fldSelTxnRefNo_txt"] = "";
	    	reqParams["fldTxnRefNo"] = $("#fldTxnRefNo").val();
	    	reqParams["fldStartDate"] = $("#fldStartDate").val();
	    	reqParams["fldEndDate"] = $("#fldEndDate").val();
	    	
	    	
	    	busyInd.show();
	    	var invocationData = {
	    			adapter : "TPT",
	        		procedure : "RRTPV02",
	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	    	};
	    	
	    	WL.Client.invokeProcedure(invocationData, {
	    		onSuccess : self.rrtpv01ListSuccess,
	    		onFailure : AdapterFail,	    		
	    		timeout: timeout
	    	});
	    	
        };
        
        this.rrtpv01ListSuccess = function(result){
        	
        	invocationResult = result.invocationResult;
        	if(invocationResult.isSuccessful) {
        		if(invocationResult.faml.response){	
        		if(invocationResult.faml.response.rc.returncode == 0){
        			if(invocationResult.faml.response.srchdetails){
        				fldTxnRefNo = invocationResult.faml.response.srchdetails.txnrefno;
        				startdate = invocationResult.faml.response.srchdetails.startdate;
        				enddate = invocationResult.faml.response.srchdetails.enddate;
        			
        				
        			}else{
        				fldTxnRefNo = "";
        				startdate = "";
        				enddate = "";
        			}
        			
        			
    				$('#fldTxnRefNo').val(fldTxnRefNo);
    				$('#fldStartDate').val(startdate);
    				$('#fldEndDate').val(enddate);
        			
        			rtgstxnobj = invocationResult.faml.response.rtgstxnlist.rtgstxn;
        			self.rtgsTxnList.removeAll();
        			if(rtgstxnobj){
        				
        				$(rtgstxnobj).each(function(index, obj) {
        					txnVal = $.trim(obj.txnrefno)+"#"+$.trim(obj.fromacctno)+"#"+$.trim(obj.txnamount)+"#"+$.trim(obj.benename)+"#"+$.trim(obj.txndesc);
        					txnDesc = $.trim(obj.txnrefno)+" - "+$.trim(obj.dattxn)+" - "+$.trim(obj.benename);
        					self.rtgsTxnList.push({ txnVal: txnVal, txnDesc: txnDesc });
        				});
        				
        				$("#rtgstxns").show();
        				
        				ko.applyBindings(self, $(".dynamic-page-content").get(0)); 
        			}else{
                        $("#rtgstxnsError").show();
                        $("#rtgstxns").hide();
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
        
        
        self.calltpvViewDetails = function(){
        	if($("#fldSelTxnRefNo").val()){
        	
        	reqParams = {};
	    	
	    	reqParams["fldDeviceId"] = fldDeviceId;
	    	reqParams["fldWebServerId"] = fldWebServerId;
	    	reqParams["fldAppId"] = fldAppId;
	    	reqParams["fldAppServerId"] = fldAppServerId;
	    	reqParams["fldLangId"] = fldLangId;
	    	reqParams["fldModule"] = fldModule;
	    	
	    	reqParams["fldTxnId"] = "TPV";
	    	
	    	reqParams["fldRequestId"] =RegfldRequestId;

	    	fldjsessionid = Regfldjsessionid;
	    	reqParams["fldLoginUserId"] =Regloginuid;
	    	reqParams["fldSessionId"] = Rsessionid;
	    	
	    	reqParams["fldScrnSeqNbr"] = "03";
	    	reqParams["fldOperationId"] = "RRTPV02";
	    	
	    	reqParams["fldActionType"] = "status";
	    	reqParams["viewselected"] = "1";
	    	
	    	strseltxnrefno = self.fldSelTxnRefNo();
	    	arrtxnref = strseltxnrefno.split("#");
	    	
	    	var objs = document.getElementById('fldSelTxnRefNo');
	    	reqParams["fldSelTxnRefNo_txt"] = objs.options[objs.selectedIndex].innerHTML;
	    	reqParams["fldSelTxnRefNo1"] = strseltxnrefno;
	    	reqParams["fldSelTxnRefNo"] = arrtxnref[0];
	    	reqParams["fldStartDate"] = $("#fldStartDate").val();
	    	reqParams["fldEndDate"] = $("#fldEndDate").val();
	    	
    		
	    	
	    	busyInd.show();
	    	var invocationData = {
	    			adapter : "TPT",
	        		procedure : "RRTPV02",
	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	    	};
	    	
	    	WL.Client.invokeProcedure(invocationData, {
	    		onSuccess : self.rrtpv02Success,
	    		onFailure : AdapterFail,	    		
	    		timeout: timeout
	    	});
        	}
        	else{
        		
        		alert("Please Select Ref no.");
        	}
        };
        
        
        this.rrtpv02Success = function(result){
        	
        	invocationResult = result.invocationResult;
        	if(invocationResult.isSuccessful) {
        		if(invocationResult.faml.response){	
        		if(invocationResult.faml.response.rc.returncode == 0){
        			accStmtData(invocationResult.faml); 
        			window.location = "#rrtpv02";
        		}else{
        			handleError(invocationResult.faml.response);
        		}
        	 }else{
        		 handleErrorNoResponse();        		
        	 }
        	}
        	busyInd.hide();
        };
        
        
        this.callTPV02 = function(){
        	accstmtdata = accStmtData();
        	
        	fldSelTxnRefNo = accstmtdata.request.fldSelTxnRefNo1;
        	
        	arrtxnrefno = fldSelTxnRefNo.split("#");
        	txnRefNo = arrtxnrefno[0];
        	fromAcctNo = arrtxnrefno[1];
        	txnAmount = arrtxnrefno[2];
        	beneName = arrtxnrefno[3];
        	txnDesc = arrtxnrefno[4];
        	
        	
        	if(accstmtdata.response.rtgstxn){
        		utr = accstmtdata.response.rtgstxn.utr ? accstmtdata.response.rtgstxn.utr : "Not Available";
        		status1 = accstmtdata.response.rtgstxn.status ? accstmtdata.response.rtgstxn.status : "Not Available";
        	}else{
        		utr = "Not Available";
        		status = "Not Available";
        	}
        	
        	
    	    $("#contentData").load("Views/TPT/rrtpv02.html", null, function (response, status, xhr) {
                if (status != "error") {}	
                
                $(".clsrefno").html(txnRefNo);
                $(".clsamt").html(formatAmt(parseFloat(txnAmount)));
            	$(".clsfromacc").html(fromAcctNo);
            	$(".clsbenefname").html(beneName);
            	$(".clsdesc").html(txnDesc);
            	$(".clsutr").html(utr);
            	$(".clsstatus").html(status1);
            	
                ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
            });
    	    busyInd.hide();
        };
        
        
     // VMT   
        
        this.callVMT01 = function(){
        	
    		busyInd.show();
	    
	    	reqParams = {};
	    	
	    	reqParams["fldDeviceId"] = fldDeviceId;
	    	reqParams["fldWebServerId"] = fldWebServerId;
	    	reqParams["fldAppId"] = fldAppId;
	    	reqParams["fldAppServerId"] = fldAppServerId;
	    	reqParams["fldLangId"] = fldLangId;
	    	reqParams["fldModule"] = fldModule;
	    	
	    	reqParams["fldTxnId"] = "VMT";
	    		reqParams["fldScrnSeqNbr"] = "01";
	    	reqParams["fldOperationId"] = "RRVMT01";
    		
	    	reqParams["fldRequestId"] =RegfldRequestId;

	    	fldjsessionid = Regfldjsessionid;
	    	reqParams["fldLoginUserId"] =Regloginuid;
	    	reqParams["fldSessionId"] = Rsessionid;
	    	
	    	
	    	
	    	busyInd.show();
	    	var invocationData = {
	    			adapter : "TPT",
	        		procedure : "RRVMT01",
	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	    	};
	    	
	    	WL.Client.invokeProcedure(invocationData, {
	    		onSuccess : self.rrvmt01Success,
	    		onFailure : AdapterFail,	    		
	    		timeout: timeout
	    	});
    	    	
        };
        
        this.rrvmt01Success = function(result){
        	self.fromAccountList.removeAll();
        	invocationResult = result.invocationResult;
        	if(invocationResult.isSuccessful) {
        		if(invocationResult.faml.response){	
        		if(invocationResult.faml.response.rc.returncode == 0){
        			
        			fromAccdata = invocationResult.faml.response.acctdtls;
        			
        			$(fromAccdata).each(function(index, obj) {
    	    			accountValue = obj.codacctno+"#"+obj.acctbalance;    	    			
    	    		    self.fromAccountList.push({ codacctno: obj.codacctno, acctbalance: obj.acctbalance, accountValue: accountValue });
    	    		});
        			
        			$("#contentData").load("Views/TPT/rrvmt01.html", null, function (response, status, xhr) {
                        if (status != "error") {}
                        
                        requestid = invocationResult.faml.response.mci.requestid;
                        $("#fldRequestId").val(requestid);
                        ko.applyBindings(self, $(".dynamic-page-content").get(0)); 
        			});
        			
        		}else{
        			handleError(invocationResult.faml.response);
        			window.location = "#rrftr01";
        		}
        	 }else{
        		 handleErrorNoResponse();        		
        	 }
        	}
        	busyInd.hide();
        };
	 this.rrvmt01Submit = function(){
	            
    	if($("#frmvmt01").valid()){
    		
    		var $form = $("#frmvmt01");
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
        	
        	
	    	busyInd.show();
	    	var invocationData = {
	    			adapter : "TPT",
	        		procedure : "RRVMT02",
	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	    	};
	    	
	    	WL.Client.invokeProcedure(invocationData, {
	    		onSuccess : self.rrvmt02Response,
	    		onFailure : AdapterFail,	    		
	    		timeout: timeout
	    	});
    	}
    	
	 };
	 
	 
	 this.rrvmt02Response = function(result){
		 
     	
     	invocationResult = result.invocationResult;
     	if(invocationResult.isSuccessful) {
     		if(invocationResult.faml.response){
	     		if(invocationResult.faml.response.rc.returncode == 0){
	 	    			accStmtData(invocationResult.faml);    
	 	    			window.location = "#rrvmt02";
	     		}else{
	     			handleError(invocationResult.faml.response);
	     		}
     		}else{
       		 handleErrorNoResponse();        		
     		}
     	}
     	busyInd.hide();
     };
     
     this.callVMT02 = function(){
     	accstmtdata = accStmtData();
     	
     	//fldfromacct = accstmtdata.response.fldfromacct;
     	fldfromaccttmp = accstmtdata.request.selAcct;
     	arraccno = fldfromaccttmp.split("#");
     	fldfromacct = arraccno[0];
     	
     	fldamount = accstmtdata.response.fldamount;
     	fldsendersname = accstmtdata.response.fldsendersName;
     	fldrecieversname = accstmtdata.response.fldrecieversName;
     	fldsenderscomments = accstmtdata.response.fldsendersComments;
     	fldvisabinno = accstmtdata.response.fldvisaBinNo;
     	
     	flduserrefno = accstmtdata.response.flduserrefno;
     	flddatetime = accstmtdata.response.flddatetime;
     	
     	if(accstmtdata.response.rsadetails){
     		rsatxnid = accstmtdata.response.rsadetails.rsatxnid;
     		clientsessionid = accstmtdata.response.rsadetails.clientsessionid;
     		fcatsessionid = accstmtdata.response.rsadetails.fcatsessionid;
     	}else{
     		rsatxnid = "";
     		clientsessionid = "";
     		fcatsessionid = "";
     	}
     	     	
 	    $("#contentData").load("Views/TPT/rrvmt02.html", null, function (response, status, xhr) {
             if (status != "error") {}	
             
             $(".clsfrmaccount").html(fldfromacct);
             $(".clsamount").html(formatAmt(parseFloat(fldamount)));
         	$(".clssendername").html(fldsendersname);
         	$(".clsreceivername").html(fldrecieversname);
         	$(".clssendercomm").html(fldsenderscomments);
         	$(".clsvisacard").html(fldvisabinno);
         
         	$("#fldUserRefNo").val(flduserrefno);
         	$("#fldDateTime").val(flddatetime);
         	$("#fldRsaTxnId").val(rsatxnid);
         	$("#fldClientSessionId").val(clientsessionid);
         	$("#fldFcatSessionId").val(fcatsessionid);
         	$("#fldsendersName").val(fldsendersname);
         	$("#fldFromAcct").val(fldfromacct);
         	$("#fldvisaBinNo").val(fldvisabinno);
         	$("#fldamount").val(fldamount);
         	$("#fldrecieversName").val(fldrecieversname);
         	$("#fldsendersComments").val(fldsenderscomments);
         	$("#fldExtSessionId").val(accstmtdata.response.fldExtSessionId);
         	
         	requestid = accstmtdata.response.mci.requestid;
            $("#fldRequestId").val(requestid);
         	
             ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
         });
 	    
     };
     
     this.rrvmt02Submit = function(){
     	
     	var $form = $("#frmvmt02");
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
	    			adapter : "TPT",
	        		procedure : "RRVMT03",
	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
	    	};
     	
     	//WL.Logger.debug(invocationData, '');
     	busyInd.show();
     	WL.Client.invokeProcedure(invocationData, {
     		onSuccess : rsaResponse,
     		onFailure : AdapterFail,
     		timeout: timeout
     	});    	    	
     };
     
     this.callCPQ01 = function(){
     	
 		busyInd.show();
	    
    	reqParams = {};
    	
    	reqParams["fldDeviceId"] = fldDeviceId;
    	reqParams["fldWebServerId"] = fldWebServerId;
    	reqParams["fldAppId"] = fldAppId;
    	reqParams["fldAppServerId"] = fldAppServerId;
    	reqParams["fldLangId"] = fldLangId;
    	reqParams["fldModule"] = fldModule;
    	
    	reqParams["fldTxnId"] = "CPQ";
    	reqParams["fldScrnSeqNbr"] = "01";
    	reqParams["fldOperationId"] = "RRCPQ01";
	
    	
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
    		onSuccess : self.rrcpq01Success,
    		onFailure : AdapterFail,	    		
    		timeout: timeout
    	});
 	    	
     };
     
     this.rrcpq01Success = function(result){
    	self.cpqQuesList.removeAll();
     	invocationResult = result.invocationResult;
     	if(invocationResult.isSuccessful) {
     		if(invocationResult.faml.response){	
     		if(invocationResult.faml.response.rc.returncode == 0){
     			     			
     			queslist = invocationResult.faml.response.questionlist.questiongrplist;
     			qindex = 0;
     			$(queslist).each(function(index, obj) {
	    			quesval = obj.groupId+"#"+obj.questionId+"#"+obj.questionText;	
	    			queslabel = "Question No. "+(qindex+1);
	    			
	    			cmbQuesid = "fldUserQuestionGroup"+qindex;
	    				    			
	    			inpAnsid = "fldUserAnswerList"+qindex;
	    				    			
	    		    self.cpqQuesList.push({ questionText: obj.questionText, quesval: quesval, groupid: obj.groupId, questionId: obj.questionId, qindex: qindex, queslabel: queslabel, cmbQuesid: cmbQuesid, inpAnsid: inpAnsid  });
	    		    qindex++;
     			});
     			
     			$("#contentData").load("Views/TPT/rrcpq01.html", null, function (response, status, xhr) {
                     if (status != "error") {}
                     
                     ko.applyBindings(self, $(".dynamic-page-content").get(0)); 
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
     
     
     this.callVFT01 = function(){
      	
  		busyInd.show();
 	    
     	reqParams = {};
     	
     	reqParams["fldDeviceId"] = fldDeviceId;
     	reqParams["fldWebServerId"] = fldWebServerId;
     	reqParams["fldAppId"] = fldAppId;
     	reqParams["fldAppServerId"] = fldAppServerId;
     	reqParams["fldLangId"] = fldLangId;
     	reqParams["fldModule"] = fldModule;
     	
     	reqParams["fldTxnId"] = "VFT";
     	reqParams["fldScrnSeqNbr"] = "01";
     	reqParams["fldOperationId"] = "RRVFT01";
 	
     	
     	reqParams["fldRequestId"] =RegfldRequestId;

    	fldjsessionid = Regfldjsessionid;
    	reqParams["fldLoginUserId"] =Regloginuid;
    	reqParams["fldSessionId"] = Rsessionid;
     	
     	var invocationData = {
     			adapter : "TPT",
         		procedure : "RRVFT01",
         		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
     	};
     	
     	WL.Client.invokeProcedure(invocationData, {
     		onSuccess : self.rrvft01Success,
     		onFailure : AdapterFail,	    		
     		timeout: timeout
     	});
  	    	
      };
      
      this.rrvft01Success = function(result){
      	
       	invocationResult = result.invocationResult;
       	if(invocationResult.isSuccessful) {
       		if(invocationResult.faml.response){	
       		if(invocationResult.faml.response.rc.returncode == 0){
       			     			
       			fldrefno = invocationResult.faml.response.fldrefno != undefined ? invocationResult.faml.response.fldrefno : "";
       			fldfromdate = invocationResult.faml.response.fldfromdate != undefined ? invocationResult.faml.response.fldfromdate : "";
       			fldtodate = invocationResult.faml.response.fldtodate != undefined ? invocationResult.faml.response.fldtodate : "";
       			
       			self.fldRefNodata(fldrefno);
       			
       			$("#contentData").load("Views/TPT/rrvft01.html", null, function (response, status, xhr) {
                       if (status != "error") {}
                       
                       $("#fldRefNo").val(fldrefno);
                       $("#fldFromDate").val(fldfromdate);
                       $("#fldToDate").val(fldtodate);
                       
                       ko.applyBindings(self, $(".dynamic-page-content").get(0)); 
       			});
       			
       		}else{
    			handleError(invocationResult.faml.response);
    			window.location = "#rrftr01";
    		}
    		}else{
    			 handleErrorNoResponse();	
    		}
       	}
       	busyInd.hide();
       };
       
       this.rrvft01Submit = function(){
           
       	if($("#frmvft01").valid()){
       		flagerr = true;
       		optflag = $('input[name=radOption]:radio:checked').val();
       		
       		if(optflag == 'byref'){
       			refno = $("#fldRefNo").val();
	       		var re = /^[A-Za-z0-9]+$/;
	       	    if(re.test(refno)){
	       	    	flagerr = true;
	       		}
	       		else{
	       			alert("Alphabetic and Numeric characters are allowed for Reference Number");
	       			flagerr = false;
	       		}
       		}
       		
       		if(flagerr){
       		var $form = $("#frmvft01");
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
   	    	
   	    	
   	    	busyInd.show();
   	    	var invocationData = {
   	    			adapter : "TPT",
   	        		procedure : "RRVFT02",
   	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
   	    	};
   	    	
   	    	WL.Client.invokeProcedure(invocationData, {
   	    		onSuccess : self.rrvft02Response,
   	    		onFailure : AdapterFail,	    		
   	    		timeout: timeout
   	    	});
       		}
       	}
       	
   	 };
   	 
   	 this.rrvft02Response = function(result){
		 
      	busyInd.hide();
      	invocationResult = result.invocationResult;
      	if(invocationResult.isSuccessful) {
      		if(invocationResult.faml.response){
 	     		if(invocationResult.faml.response.rc.returncode == 0){
 	 	    			accStmtData(invocationResult.faml);  
 	 	    			
 	 	    			if(window.location.hash == '#rrvft02'){
 	 	    				self.callVFT02_refresh();
 	 	    			}else{
 	 	    			window.location = "#rrvft02";
 	 	    			}
 	     		}else{
 	     			handleError(invocationResult.faml.response);
 	     		}
      		}else{
        		 handleErrorNoResponse();        		
      		}
      	}
      };
      
      this.callVFT02 = function(){
       	accstmtdata = accStmtData();
       	self.impsdetails.removeAll();
       	
		fldrefno = accstmtdata.response.fldRefNo != undefined ? accstmtdata.response.fldRefNo : "";
		fldfromdate = accstmtdata.response.fldFromDate != undefined ? accstmtdata.response.fldFromDate : "";
		fldtodate = accstmtdata.response.fldToDate != undefined ? accstmtdata.response.fldToDate : "";
		
		fldopttype = accstmtdata.request.fldopttype;
		
		self.fldRefNodata(fldrefno);
		
		if(accstmtdata.response.IMPSTxnDetailsOut){
		txnavai = accstmtdata.response.IMPSTxnDetailsOut.impsdetails;
		
		if(txnavai){
			$(txnavai).each(function(index, obj) {
				
				self.impsdetails.push({ txntype: obj.txntype, referenceno: obj.referenceno, dattxn: obj.dattxn, fromaccount: obj.fromaccount, txnamount: formatAmt(parseFloat(obj.txnamount)), benefmobno: obj.benefmobno, benefmmid: obj.benefmmid, benefname: obj.benefname, benefacctno: obj.benefacctno, benefifsc: obj.benefifsc, benefaccttype: obj.benefaccttype, remarks: obj.remarks });
				
			});
		}
		}
              	     	
   	    $("#contentData").load("Views/TPT/rrvft02.html", null, function (response, status, xhr) {
               if (status != "error") {}	
               
               $("#fldRefNo").val(fldrefno);
             //  $("#fldFromDate").val(fldfromdate);
             //  $("#fldToDate").val(fldtodate);
               document.frmvft01.fldFromDate.value = fldfromdate;
               document.frmvft01.fldToDate.value = fldtodate;
               document.frmvft02.fldFromDate.value = fldfromdate;
               document.frmvft02.fldToDate.value = fldtodate;
               
               if(fldopttype == 'period'){
            	   $('#raddate').attr('checked','checked');
            	   $('#refblock').hide();
           			$('#dateblock').show();
           			$('#fldopttype').val('period');            	   
               }else{
            	   $('#radref').attr('checked','checked');
            	   $('#refblock').show();
            	   $('#dateblock').hide();
            	   $('#fldopttype').val('ref');
               }
            	   
           	
               ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
           });
   	    
       };
       
       this.callVFT02_refresh = function(){
          	accstmtdata = accStmtData();
          	self.impsdetails.removeAll();
          	
          	fldrefno = accstmtdata.response.fldRefNo != undefined ? accstmtdata.response.fldRefNo : "";
    		fldfromdate = accstmtdata.response.fldFromDate != undefined ? accstmtdata.response.fldFromDate : "";
    		fldtodate = accstmtdata.response.fldToDate != undefined ? accstmtdata.response.fldToDate : "";
   			
    		fldopttype = accstmtdata.request.fldopttype;
   		
   		if(accstmtdata.response.IMPSTxnDetailsOut){
   		txnavai = accstmtdata.response.IMPSTxnDetailsOut.impsdetails;
   		
   		self.fldRefNodata(fldrefno);
   		if(txnavai){
   			
   			$(txnavai).each(function(index, obj) {
   				
   				self.impsdetails.push({ txntype: obj.txntype, referenceno: obj.referenceno, dattxn: obj.dattxn, fromaccount: obj.fromaccount, txnamount: formatAmt(parseFloat(obj.txnamount)), benefmobno: obj.benefmobno, benefmmid: obj.benefmmid, benefname: obj.benefname, benefacctno: obj.benefacctno, benefifsc: obj.benefifsc, benefaccttype: obj.benefaccttype, remarks: obj.remarks });
   				
   			});
   		}
   		}
                   
   		
   		
   	 $("#contentData").load("Views/TPT/rrvft02.html", null, function (response, status, xhr) {
         if (status != "error") {}	
   		
                  $("#fldRefNo").val(fldrefno);
                //  $("#fldFromDate").val(fldfromdate);
                //  $("#fldToDate").val(fldtodate);
                  document.frmvft01.fldFromDate.value = fldfromdate;
                  document.frmvft01.fldToDate.value = fldtodate;
                  document.frmvft02.fldFromDate.value = fldfromdate;
                  document.frmvft02.fldToDate.value = fldtodate;
                  
                  if(fldopttype == 'period'){         			
            	   $('#raddate').attr('checked','checked');
            	   $('#refblock').hide();
           			$('#dateblock').show();
           			$('#fldopttype').val('period');            	   
               }else{
            	   $('#radref').attr('checked','checked');
            	   $('#refblock').show();
            	   $('#dateblock').hide();
            	   $('#fldopttype').val('ref');
               }
              	
                  ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
            
   	 });
          };
       
       this.rrvft02Submit = function(){
           
          	if($("#frmvft02").valid()){
          		
          		var $form = $("#frmvft02");
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
      	    	
      	    	
      	    	reqParams["fldRefNo"] = $("#fldRefNo1").val();
      	    	
      	    	busyInd.show();
      	    	var invocationData = {
      	    			adapter : "TPT",
      	        		procedure : "RRVFT03",
      	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
      	    	};
      	    	
      	    	WL.Client.invokeProcedure(invocationData, {
      	    		onSuccess : self.rrvft03Response,
      	    		onFailure : AdapterFail,	    		
      	    		timeout: timeout
      	    	});
          	}
          	
      	 };
      	 
      	this.rrvft03Response = function(result){
   		 
          	busyInd.hide();
          	invocationResult = result.invocationResult;
          	if(invocationResult.isSuccessful) {
          		if(invocationResult.faml.response){
     	     		if(invocationResult.faml.response.rc.returncode == 0){
     	 	    			accStmtData(invocationResult.faml);    
     	 	    			window.location = "#rrvft03";
     	     		}else{
     	     			handleError(invocationResult.faml.response);
     	     		}
          		}else{
            		 handleErrorNoResponse();        		
          		}
          	}
        };
        
        this.callVFT03 = function(){
           	accstmtdata = accStmtData();
                      	
           	referenceno = accstmtdata.response.referenceno;
           	idtxn = accstmtdata.response.idtxn;
           	fldbenefmobno = accstmtdata.response.fldBenefMobNo;
           	fldbenefmmid = accstmtdata.response.fldBenefMMID;
           	fldbenefname = accstmtdata.response.fldBenefName;
           	fldbenefacctno = accstmtdata.response.fldBenefAcctNo;
           	fldbenefifsc = accstmtdata.response.fldBenefIFSC;
           	fldbenefaccttype = accstmtdata.response.fldBenefAcctType;
           	fldfromacctno = accstmtdata.response.fldFromAcctNo;
           	fldamttxn = formatAmt(parseFloat(accstmtdata.response.fldAmtTxn));
           	fldrmrk = accstmtdata.response.fldRmrk;
           	fldtxnstatus = accstmtdata.response.fldTxnStatus;
           	
                  	     	
       	    $("#contentData").load("Views/TPT/rrvft03.html", null, function (response, status, xhr) {
                   if (status != "error") {}	
                
                if(idtxn == 'IFT'){
                	$("#iftdata").show();
                	$("#noniftdata").hide();
                }else{
                	$("#iftdata").hide();
                	$("#noniftdata").show();
                }
                 
                $(".clsrefno").html(referenceno);
                $(".clsbenefmob").html(fldbenefmobno);
                $(".clsbenefmmid").html(fldbenefmmid);
                $(".clsbenefname").html(fldbenefname);
                $(".clsbenefaccno").html(fldbenefacctno);
                $(".clsbenefifsc").html(fldbenefifsc);
                $(".clsbenefacctype").html(fldbenefaccttype);
                $(".clsfromacc").html(fldfromacctno);
                $(".clsamt").html(fldamttxn);
                $(".clsremark").html(fldrmrk);
                $(".clstxnstatus").html(fldtxnstatus);
                
                ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
               });
       	    
           };
           
//Vishal Change for openFD end
   		this.rrift01Page = function(){
   				busyInd.show();  
   		    
       	    	reqParams = {};
       	    	
       	    	reqParams["fldDeviceId"] = fldDeviceId;
       	    	reqParams["fldWebServerId"] = fldWebServerId;
       	    	reqParams["fldAppId"] = fldAppId;
       	    	reqParams["fldAppServerId"] = fldAppServerId;
       	    	reqParams["fldLangId"] = fldLangId;
       	    	reqParams["fldModule"] = fldModule;
       	    	
       	    	reqParams["fldTxnId"] = "IFT";
       	    	reqParams["fldScrnSeqNbr"] = "01";
       	    	reqParams["fldOperationId"] = "RRIFT01";
           		
       	    	
       	    	reqParams["fldRequestId"] =RegfldRequestId;

       	    	fldjsessionid = Regfldjsessionid;
       	    	reqParams["fldLoginUserId"] =Regloginuid;
       	    	reqParams["fldSessionId"] = Rsessionid;
       	    	
       	    	
       	    	var invocationData = {
       	    			adapter : "TPT",
       	        		procedure : "RRIFT01",
       	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
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
       	    		
   					
       	    		
       	    		
       	    	
       	    		$("#contentData").load("Views/TPT/rrift01.html", null, function (response, status, xhr) {
   							if (status != "error") {}
   		                    $("#fldExtSessionId").val(invocationResult.faml.response.fldExtSessionId);

   							ko.applyBindings(self, $(".dynamic-page-content").get(0));
   								if(fromAccdata){
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
   			
   			if($("#frmift01").valid()){
   				
   				flagerr = true;
   				
   				mobno = $("#fldBenefMobNo").val();
   				mext = mobno.substring(0,2);
   				
   				if(parseInt(mext) != 91){
   					flagerr = false;
   					alert("Mobile No. should start with 91");
   				}else if(mobno.length != 12){
   					flagerr = false;
   					alert("Beneficiary mobile number must be of length 12");
   				}
   				
   				if(flagerr){
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
       			adapter : "TPT",
           		procedure : "RRIFT02",
           		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
   			};
       	
   			//WL.Logger.debug(invocationData, '');
   			WL.Client.invokeProcedure(invocationData, {
   				onSuccess : rrift01Response,
   				onFailure : AdapterFail,
   				timeout: timeout
   			});
   				}
   			}
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
   					
   					$("#contentData").load("Views/TPT/rrift02.html", null, function (response, status, xhr) {
   							if (status != "error") {}
   							ko.applyBindings(self, $(".dynamic-page-content").get(0));
   							
   							$('#fldFCDBRequestId').val(rrift02PageData.response.mci.requestid);
   							$('#strfromaccno').html(rrift02PageData.response.fldFromAcctNo.split('#')[0]);
   							$('#fldbenefmobno1').html(rrift02PageData.response.fldBenefMobNo);
   							$('#fldbenefmmid1').html(rrift02PageData.response.fldBenefMMID);
   							$('#fldamttxn').html(formatAmt(parseFloat(rrift02PageData.response.fldAmtTxn)));
   							$('#fldrmrk1').html(rrift02PageData.response.fldRmrk);
   							$('#fldFromAcctNo').val(rrift02PageData.response.fldFromAcctNo.split('#')[0]);
   							$('#fldTxnAmount').val(rrift02PageData.response.fldAmtTxn);
   							$('#fldBenefMobNo').val(rrift02PageData.response.fldBenefMobNo);
   							$('#fldBenefMMID').val(rrift02PageData.response.fldBenefMMID);
                            $("#fldExtSessionId").val(invocationResult.faml.response.fldExtSessionId);

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
       			adapter : "TPT",
           		procedure : "RRIFT03",
           		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
   			};
       	
   			//WL.Logger.debug(invocationData, '');
   			WL.Client.invokeProcedure(invocationData, {
   				//onSuccess : rrift02Response,rsaResponse
   				onSuccess : rsaResponse,
   				onFailure : AdapterFail,
   				timeout: timeout
   			});
   		};
   	/*	rrift02Response = function(result){
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
   		
   		};*/


           this.callP2A01 = function(){
             	
         		//busyInd.show();
        	    
            	reqParams = {};
            	
            	reqParams["fldDeviceId"] = fldDeviceId;
            	reqParams["fldWebServerId"] = fldWebServerId;
            	reqParams["fldAppId"] = fldAppId;
            	reqParams["fldAppServerId"] = fldAppServerId;
            	reqParams["fldLangId"] = fldLangId;
            	reqParams["fldModule"] = fldModule;
            	
            	reqParams["fldTxnId"] = "P2A";
            	reqParams["fldScrnSeqNbr"] = "01";
            	reqParams["fldOperationId"] = "RRP2A01";
        	
            	
            	reqParams["fldRequestId"] =RegfldRequestId;

            	fldjsessionid = Regfldjsessionid;
            	reqParams["fldLoginUserId"] =Regloginuid;
            	reqParams["fldSessionId"] = Rsessionid;
            	
            	busyInd.show();
            	var invocationData = {
            			adapter : "TPT",
                		procedure : "RRP2A01",
                		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
            	};
            	//WL.Logger.debug(invocationData, '');
            	WL.Client.invokeProcedure(invocationData, {
            		onSuccess : self.rrp2a01Success,
            		onFailure : AdapterFail,	    		
            		timeout: timeout
            	});
         	    	
             };
             
             this.rrp2a01Success = function(result){
            	// $(".h_title").html("IMPS - Using IFSC Code & A/c No.");
            	 
              	invocationResult = result.invocationResult;
              	if(invocationResult.isSuccessful) {
              		if(invocationResult.faml.response){	
              		if(invocationResult.faml.response.rc.returncode == 0){
              			     	
              			self.fromAccountList.removeAll();
        	    		self.toAccountList.removeAll();
        	    		
              			fromAccdata = invocationResult.faml.response.acctdtls;
            			toAccdata = invocationResult.faml.response.tptacctdtls;
        	    		
            			nbrofsavingacc = invocationResult.faml.response.nbrsavingacct;
        	    		nbrofcurrentacc = invocationResult.faml.response.nbrcurrentacct;
        	    		nbrtptaccts = invocationResult.faml.response.nbrtptaccts;
						
                       totAcc = nbrofsavingacc + nbrofcurrentacc;
        	    			
        	    		fldFCDBRequestId = invocationResult.faml.response.mci.requestid;
        	    		
        	    		 if(nbrtptaccts > 0){
        	    		
	        	    		$(fromAccdata).each(function(index, obj) {
	        	    			displaytxt = $.trim(obj.codacctno)+" - "+obj.nambranch;
	        	    			accountValue = obj.codacctno;
	        	    		    self.fromAccountList.push({ codacctno: obj.codacctno, acctType: obj.acctType, acctbalance: obj.acctbalance, acctbranch: obj.acctbranch, namccyshrt: obj.namccyshrt,  displaytxt:displaytxt, fldFCDBRequestId:fldFCDBRequestId, accountValue: accountValue });
	        	    		}); 
	        	    		
	        	    		$(toAccdata).each(function(index, obj) {
	        	    			displaytxt = $.trim(obj.narrative);
	        	    			accountValue = obj.codacctno;
	        	    		    self.toAccountList.push({ codacctno: obj.codacctno, narrative: obj.narrative, displaytxt:displaytxt, accountValue: accountValue, ifsccode: obj.ifsccode, accttype: obj.accttype,Cardifscnegflag: obj.Card_ifsc_neg_flag,Cardimpsflag:obj.Card_imps_flag });
	        	    		}); 
	        	    		
        	    		 }	
        	    		        	    		
        	    		
              			
              			$("#contentData").load("Views/TPT/rrp2a01.html", null, function (response, status, xhr) {
                              if (status != "error") {}
                              
                              $("#fldExtSessionId").val(invocationResult.faml.response.fldExtSessionId);
                              if(nbrtptaccts > 0){
              	    			$("#accexitdata").show();
              	    			$("#errImpsIFSC").hide();
              	    			
              	    			if(totAcc  > 0){
              	    				$("#activeacc").show();
              	    				$("#noactiveacc").hide();
              	    				
              	    			}else{
              	    				$("#activeacc").hide();
              	    				$("#noactiveacc").show();
              	    			}
              	    			
              	    		}else{
              	    			$("#accexitdata").hide();
              	    			$("#errImpsIFSC").show();
              	    		}
              	    		
                              $("#fldRequestId").val(fldFCDBRequestId);
                              
                              ko.applyBindings(self, $(".dynamic-page-content").get(0)); 
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
              
              
              self.showBenefDetails = function(){
              	selaccno = self.fldToAcctNo();
              	accdata = self.toAccountList();
              	
              	if(selaccno != '' && selaccno != null && selaccno != undefined){
              		
              	$(accdata).each(function(index, befdet) {
              		
              		if(befdet.codacctno == selaccno){
              			
                      	$("#strbenefAccno").html(befdet.codacctno);
                      	$("#strbenefIFSC").html(befdet.ifsccode);
                      	
                      	acctype = befdet.accttype;
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
                      	
                      	$("#strbenefacctype").html(stracctype);
                      	
                      	$("#fldBeneAcct").val(befdet.codacctno);
                      	$("#fldIFSCCode").val(befdet.ifsccode);
                      	$("#fldBenefAcctType").val(acctype);
                      	$("#fldNamBenef").val(befdet.narrative);
						$("#fldIfscFlag").val(befdet.Cardifscnegflag);
						$("#fldImpsFlag").val(befdet.Cardimpsflag);
                    	$("#fldBenefDetail_txt").val($( "#fldBenefDetail option:selected" ).text());
                  
                      	$("#fldBeneId").val(index);
              		}
              	});
              	}else{
              		$("#strbenefAccno").html("");
                  	$("#strbenefIFSC").html("");
                  	$("#strbenefacctype").html("");
              	}
              };
              
              
          this.rrp2a01Submit = function(){
         
		
		
			 var strbenefacctype =$("#strbenefacctype").val();
			var fldBenefAcctType =$("#fldBenefAcctType").val();
			var fldImpsFlag =$("#fldImpsFlag").val();
			var fldIfscFlag =$("#fldIfscFlag").val();
			if($("#frmp2a01").valid()){
				
			 if((strbenefacctype == 'Card Payment' || fldBenefAcctType == 52) && fldImpsFlag == 'N'){
				 navigator.notification.confirm(
	               	""+'The beneficiary bank does not accept Credit Card payment through IMPS. Click on OK to make payment through NEFT.',	
		             neftsubmit = function(iValue){
		                      if (iValue == 1){
								window.location = "#rrtpn04";		 
							 }
						  },
							'HDFC BANK',
						'Ok,Cancel');
				
		     }
		    else if(fldIfscFlag == true && (strbenefacctype != 'Card Payment' || fldBenefAcctType != 52)){
	             navigator.notification.confirm(
	               	""+'The beneficiary bank does not accept payment through IMPS. Click on OK to make payment through NEFT.',	
		             neftsubmit = function(iValue){
		                      if (iValue == 1){
								window.location = "#rrtpn04";		 
							 }
						  },
							'HDFC BANK',
						'Ok,Cancel');
				
		   }else {
		  
          	fldLoginUserId = Regloginuid;
    	    fldFCDBSessionId = RegfldFCDBSessionId;
            fldjsessionid = Regfldjsessionid;
            fldSessionId = Rsessionid;
          	fldFCDBRequestId = $("#fldFCDBRequestId").val();
          	
          	var $form = $("#frmp2a01");
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
          	reqParams["fldChecked_txt"] = "Accept";
          	reqParams["fldActionType"] = "verify";
          	reqParams["fldBenefType"] = "NEFT";
          	reqParams["fldChecked"] = "true";
         
          	
          	reqParams["selAcct"] =$("#fldAcctNo").val();
      


        	fldjsessionid = Regfldjsessionid;
        	reqParams["fldLoginUserId"] =Regloginuid;
        	reqParams["fldSessionId"] = Rsessionid;
          	
          	var invocationData = {
  	    			adapter : "TPT",
  	        		procedure : "RRP2A02",
  	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
  	    	};
          	
          	//WL.Logger.debug(invocationData, '');
          	busyInd.show();
          	WL.Client.invokeProcedure(invocationData, {
          		onSuccess : self.rrp2a02Response,
          		onFailure : AdapterFail,
          		timeout: timeout
          	});
		   }
          	}    	
          };      
          
          this.rrp2a02Response = function(result){
        	  //WL.Logger.debug(result, '');
          	invocationResult = result.invocationResult;
          	if(invocationResult.isSuccessful) {
          		if(invocationResult.faml.response){	
          		if(invocationResult.faml.response.rc.returncode == 0){
      	    			accStmtData(invocationResult.faml);    
      	    			window.location = "#rrp2a02";
          		}else{
          			errmsg = invocationResult.faml.response.rc.errormessage;
          			alert(errmsg);
          		}
          		}
          	}
          	busyInd.hide();
          };
          
          
          this.callP2A02 = function(){
          	
          	accstmtdata = accStmtData();
     	     
          	txnid = accstmtdata.response.mci.txnid;
          	
          	fldFromAcctNo = accstmtdata.response.fldFromAcctNo;
          	fldTxnAmount = accstmtdata.response.fldTxnAmount;
          	fldNamBenef = accstmtdata.response.fldNamBenef;
          	fldBeneAcct = accstmtdata.response.fldBeneAcct;
			ifscP2a=accstmtdata.response.fldIFSCCode;
          	fldIFSCCode = ifscP2a.toUpperCase();
          	fldBeneAcctType = accstmtdata.response.fldBeneAcctType;
          	fldRmrk = accstmtdata.response.fldRmrk;
          	fldBeneId = accstmtdata.response.fldBeneId;
          	fldBenefAcctType = accstmtdata.response.fldBenefAcctType;
          	//alert(accstmtdata.response.fldextsessionid);
          	fldUserRefNo = accstmtdata.response.flduserrefno;
        	fldDateTime = accstmtdata.response.flddatetime;
			fldIfscFlag= accstmtdata.request.Card_ifsc_neg_flag;
          	fldImpsFlag= accstmtdata.request.Card_imps_flag;
          	fldRsaTxnId = "";
          	fldClientSessionId = "";
          	fldFcatSessionId = "";
          	
          	if(accstmtdata.response.rsadetails){
  	        	fldRsaTxnId = accstmtdata.response.rsadetails.rsatxnid;
  	        	fldClientSessionId = accstmtdata.response.rsadetails.clientsessionid;
  	        	fldFcatSessionId = accstmtdata.response.rsadetails.fcatsessionid;
          	}
          	        	
          	
          	fldFCDBRequestId = accstmtdata.response.mci.requestid;        	        	
          	fldEntityId = accstmtdata.request.fldEntityId;
          	
  		    $("#contentData").load("Views/TPT/rrp2a02.html", null, function (response, status, xhr) {
                  if (status != "error") {}	
                  
                  $(".clsfromacc").html(fldFromAcctNo);
                  $(".clsnamebenef").html(fldNamBenef);
                  $(".clsbenefaccno").html(fldBeneAcct);
              	  $(".clsamount").html(formatAmt(parseFloat(fldTxnAmount)));
              	  $(".clsifsc").html(fldIFSCCode);
              	  $(".clsbenefacctype").html(fldBeneAcctType);
              	  $(".clsremark").html(fldRmrk);
              	                
                  $("#fldRequestId").val(fldFCDBRequestId);
                  
                  $("#fldBeneId").val(fldBeneId);
                  $("#fldFromAcctNo,#fldAcctNo").val(fldFromAcctNo);
                  $("#fldBenefAcctType").val(fldBenefAcctType);
                  $("#fldNamBenef").val(fldNamBenef);
                  $("#fldIFSCCode").val(fldIFSCCode);
                  $("#fldBeneAcct").val(fldBeneAcct);
                  $("#fldTxnAmount").val(fldTxnAmount);
                  $("#fldRmrk").val(fldRmrk);
                  $("#fldIfscFlag").val(fldIfscFlag);
                  $("#fldImpsFlag").val(fldImpsFlag);
                  
                  $("#fldUserRefNo").val(fldUserRefNo);
                  $("#fldDateTime").val(fldDateTime);
                  $("#fldRsaTxnId").val(fldRsaTxnId);
                  $("#fldClientSessionId").val(fldClientSessionId);
                  $("#fldFcatSessionId").val(fldFcatSessionId);
                  $("#fldExtSessionId").val(invocationResult.faml.request.fldExtSessionId);
                  ko.applyBindings(self, $(".dynamic-page-content").get(0));                   
              });
          	
          };
          
          this.rrp2a02Submit = function(){
          	
          	var $form = $("#frmp2a02");
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
  	    			adapter : "TPT",
  	        		procedure : "RRP2A03",
  	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
  	    	};
          	
          	//WL.Logger.debug(invocationData, '');
          	busyInd.show();
          	WL.Client.invokeProcedure(invocationData, {
          		onSuccess : rsaResponse,
          		onFailure : AdapterFail,
          		timeout: timeout
          	});    	    	
        };
	
		
	
	//Add Beneficiary – Within the Bank
	
	
	
	
	  this.rrtpapage = function(){
				busyInd.show();  
		    
    	    	reqParams = {};
    	    	reqParams["fldDeviceId"] = fldDeviceId;
    	    	reqParams["fldWebServerId"] = fldWebServerId;
    	    	reqParams["fldAppId"] = fldAppId;
    	    	reqParams["fldTxnId"] = "TPA";
				reqParams["fldLoginUserId"] =Regloginuid;
    	    	reqParams["fldRequestId"] =RegfldRequestId;
    	    	reqParams["fldScrnSeqNbr"] = "03";
    	    	reqParams["fldSessionId"] = Rsessionid;
				reqParams["fldBenefType"] = 'tpt';
				reqParams["fldModule"] = 'CH';
				
			
    	    	var invocationData = {
    	    			adapter : "TPT",
    	        		procedure : "RRTPA03",
    	        		parameters : [fldjsessionid,reqParams,ipadd]
    	    	};
    	    	
    	    	WL.Client.invokeProcedure(invocationData, {
    	    		onSuccess : rrtpapageSuccess,
    	    		onFailure : AdapterFail,	    		
    	    		timeout: timeout
    	    	});
		};
		
		
		rrtpapageSuccess = function(result){
			   invocationResult = result.invocationResult;
        	   if(invocationResult.isSuccessful) {
        		if(invocationResult.faml.response){	
        		    if(invocationResult.faml.response.rc.returncode == 0){
        		
    	    		$("#contentData").load("Views/TPT/rrtpa01.html", null, function (response, status, xhr) {
							if (status != "error") {}
							
							
							   $("#benepopmsg").html(invocationResult.faml.response.benepopmsg);
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
	        
			
			
			
		
	    rrtpa01Submit = function(){
				
		    if($("#rrtpa01").valid()){
			     tptmsg= invocationResult.faml.response.benepopmsg;
				 
				 Addbenimsg=multiReplace(tptmsg,'\\n','');
				 
				// console.log(Addbenimsg);
				 navigator.notification.confirm(Addbenimsg,function (iValue){
		           if (iValue == 2){
				  
		                busyInd.show();  
			
						fldtxnDetails= $("#fldAcctNo").val()+"~~"+$("#fldNamBenef").val()+"~~"+$("#fldEmail").val()+"~~~~~~";
						//console.log(fldtxnDetails);
						var $form = $("#rrtpa01");
						rsaDataArray = $form.serializeArray();    	
										
						reqParams = {};
						for (var i in rsaDataArray) {
							reqParams[rsaDataArray[i].name] = rsaDataArray[i].value;
						}

						reqParams["fldDeviceId"] = fldDeviceId;
						reqParams["fldWebServerId"] = fldWebServerId;
						reqParams["fldAppId"] = fldAppId;
						reqParams["fldTxnId"] = "TPA";
						reqParams["fldLoginUserId"] =Regloginuid;
						reqParams["fldRequestId"] =RegfldRequestId;
						reqParams["fldScrnSeqNbr"] = "11";
						reqParams["fldSessionId"] = Rsessionid;
						reqParams["fldtxnDetails"] = fldtxnDetails;
						reqParams["fldModule"] = 'CH';
					
						var invocationData = {
								adapter : "TPT",
								procedure : "RRTPA11",
								parameters : [fldjsessionid,reqParams,ipadd]
						};
						
						WL.Client.invokeProcedure(invocationData, {
							onSuccess : rrtpa01SubmitSuccess,
							onFailure : AdapterFail,	    		
							timeout: timeout
						});   
	           }
	        }, "HDFC BANK", ['Cancel','Ok']);
			    
				
		    }
		};	
		
		
	
		
		  
 
		
		rrtpa01SubmitSuccess = function(result){
		invocationResult = result.invocationResult;
				if(invocationResult.isSuccessful) {
					if(invocationResult.faml.response){	
					if(invocationResult.faml.response.rc.returncode == 0){
						accStmtData(invocationResult.faml);
							window.location = "#rrtpa02";
					}else{
						handleError(invocationResult.faml.response);
					}
					}else{
						handleErrorNoResponse();
					}
	        }
        };
		
		this.rrtpa02Page = function(){
        	accstmtdata = accStmtData();
        
			fldaccount=accstmtdata.response.fldAcctNo;
			fldNamBenef=accstmtdata.response.fldNamBenef;
			fldEmail=accstmtdata.response.fldEmail;
			bene_name_maintained=accstmtdata.response.bene_name_maintained;
	        fldRequestId=invocationResult.faml.response.mci.requestid;
		    fldSessionId=invocationResult.faml.response.mci.sessionid;
			fldTxnId=invocationResult.faml.response.mci.txnid;
			
			fldAppId=invocationResult.faml.response.mci.appid;
			fldtxnDetails=accstmtdata.response.fldtxnDetails;
        	
        	$("#contentData").load("Views/TPT/rrtpa02.html", null, function (response, status, xhr) {
                if (status != "error") {}
                
                 $("#fldaccount").html(fldaccount);
			     $("#fldnambenef").html(fldNamBenef);
				 $("#fldemail").html(fldEmail);
				 $("#bene_name_maintained").html(bene_name_maintained);
				 $("#fldtxnDetails").val(fldtxnDetails);
				 $("#fldAcctNo").val(fldaccount);
				 $("#fldAppId").val(fldAppId);
			     $("#fldNamBenef").val(fldNamBenef);
				 $("#fldEmail").val(fldEmail);
			     $("#fldTxnId").val(fldTxnId);
				 $("#fldRequestId").val(fldRequestId);
				 $("#fldSessionId").val(fldSessionId);
				
	            
                ko.applyBindings(self, $(".dynamic-page-content").get(0));
                busyInd.hide();
            });
        };
		
		
		this.rrtpa02Submit = function(){
				busyInd.show();  
			   
			    var $form = $("#rrtpa02");
				rsaDataArray = $form.serializeArray();    	
								
				reqParams = {};
				for (var i in rsaDataArray) {
					reqParams[rsaDataArray[i].name] = rsaDataArray[i].value;
				}
				reqParams["fldDeviceId"] = fldDeviceId;
		        reqParams["fldLoginUserId"] =Regloginuid;
				
    	    	var invocationData = {
    	    			adapter : "TPT",
    	        		procedure : "RRTPA02",
    	        		parameters : [fldjsessionid,reqParams,ipadd]
    	    	};
    	    	
    	    	WL.Client.invokeProcedure(invocationData, {
    	    		onSuccess : rsaResponse,
    	    		onFailure : AdapterFail,	    		
    	    		timeout: timeout
    	    	});
		};


        // rrtpa02SubmitSuccess = function(result){
		// invocationResult = result.invocationResult;
				// if(invocationResult.isSuccessful) {
					// if(invocationResult.faml.response){	
					// if(invocationResult.faml.response.rc.returncode == 0){
						// accStmtData(invocationResult.faml);
							// window.location = "#rrtpa02";
					// }else{
						// handleError(invocationResult.faml.response);
					// }
					// }else{
						// handleErrorNoResponse();
					// }
	        // }
        // };


    //Add Beneficiary – NEFT/IMPS	
	
	
	this.rrtpa04page = function(){
	
				busyInd.show();  
    	    	reqParams = {};
    	    	reqParams["fldDeviceId"] = fldDeviceId;
    	    	reqParams["fldWebServerId"] = fldWebServerId;
    	    	reqParams["fldAppId"] = fldAppId;
    	    	reqParams["fldTxnId"] = "TPA";
				reqParams["fldLoginUserId"] = Regloginuid;
    	    	reqParams["fldRequestId"] =RegfldRequestId;
    	    	reqParams["fldScrnSeqNbr"] = "04";
    	    	reqParams["fldSessionId"] = Rsessionid;
				reqParams["fldBenefType"] = 'neft';
				reqParams["fldModule"] = 'CH';
				
				// fldScrnSeqNbr=04&fldSessionId=1784684440YMOSUCOE&fldBenefType=neft&fldTxnId=TPA&fldModule=CH&fldAppId=RS&fldRequestId=1784684440YMOSUCOE133726849PG
    	    	var invocationData = {
    	    			adapter : "TPT",
    	        		procedure : "RRTPA04",
    	        		parameters : [fldjsessionid,reqParams,ipadd]
    	    	};
    	    	
    	    	WL.Client.invokeProcedure(invocationData, {
    	    		onSuccess : rrtpapage04pageSuccess,
    	    		onFailure : AdapterFail,	    		
    	    		timeout: timeout
    	    	});
		};
		
		
		rrtpapage04pageSuccess = function(result){
			   invocationResult = result.invocationResult;
        	   if(invocationResult.isSuccessful) {
        		if(invocationResult.faml.response){	
        		    if(invocationResult.faml.response.rc.returncode == 0){
        		
    	    		$("#contentData").load("Views/TPT/rrtpa04.html", null, function (response, status, xhr) {
							if (status != "error") {}
							ko.applyBindings(self, $(".dynamic-page-content").get(0));
				           IMPSMSG=invocationResult.faml.response.benepopmsg;
						   SESSIONID=invocationResult.faml.response.mci.sessionid;
						   
							
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

    
	
	
	  this.rrtpa04Submit = function(){
				
		    if($("#rrtpa04").valid()){
			//console.log(IMPSMSG);
			var brncName = $('#fldBranchDesc').val();
			if(brncName=='' || brncName==null){
				ifscfrmSearch();
				
			}else{
				Addbenimsgneft=multiReplace(IMPSMSG,'\\n','');
			 fldAccountType= $( "#fldAccountType option:selected" ).text();
			    navigator.notification.confirm(
            			        ""+Addbenimsgneft,	
        						   checktpaimpssubmit,
            			          'HDFC BANK',
            			          'Ok,Cancel');
			}
			//rrtpa04Submit 
			
		       }
			   
				
		    
		};	
		
		
		function checktpaimpssubmit(iValue){
	     
		  if (iValue == 1){
		  
		       busyInd.show();  
		
			    var $form = $("#rrtpa04");
				rsaDataArray = $form.serializeArray();    	
								
				reqParams = {};
				for (var i in rsaDataArray) {
					reqParams[rsaDataArray[i].name] = rsaDataArray[i].value;
				}
                   fldIFSCCode = $('#fldIFSCCode').val();
                reqParams["fldIFSCCode"] =fldIFSCCode.toUpperCase();
    	    	reqParams["fldDeviceId"] = fldDeviceId;
    	    	reqParams["fldWebServerId"] = fldWebServerId;
    	    	reqParams["fldAppId"] = fldAppId;
				reqParams["fldLoginUserId"] = Regloginuid;
    	    	reqParams["fldTxnId"] = "TPA";
    	    	reqParams["fldRequestId"] =RegfldRequestId;
    	    	reqParams["fldScrnSeqNbr"] = "06";
    	    	reqParams["fldSessionId"] = Rsessionid;
				reqParams["fldModule"] = 'CH';
				reqParams["fldAccountTypeDesc"] = fldAccountType;
				reqParams["fldBeneType"] = 'NEFT';
				reqParams["fldActionType"] = 'verify';
			
				
				//fldAppId=RS&fldEmail=&fldAccountTypeDesc=Savings&fldIFSCCode=UTIB0000001&fldSessionId=1784684440YMOSUCOE&fldBeneType=NEFT&fldAcctNo=2222222222&fldBranchDesc=TREASUR OPERATIONS&fldNamBenef=testerr1&fldActionType=verify&fldBankDesc=AXIS BANK&fldModule=CH&fldScrnSeqNbr=06&fldAccountType=10&fldTxnId=TPA&fldAcctNo2=2222222222
    	    	var invocationData = {
    	    			adapter : "TPT",
    	        		procedure : "RRTPA06",
    	        		parameters : [fldjsessionid,reqParams,ipadd]
    	    	};
    	    	
    	    	WL.Client.invokeProcedure(invocationData, {
    	    		onSuccess : rrtpa04SubmitSuccess,
    	    		onFailure : AdapterFail,	    		
    	    		timeout: timeout
    	    	});
		         
	      }
	}
		
		rrtpa04SubmitSuccess = function(result){
		invocationResult = result.invocationResult;
				if(invocationResult.isSuccessful) {
					if(invocationResult.faml.response){	
					if(invocationResult.faml.response.rc.returncode == 0){
						    accStmtData(invocationResult.faml);
							window.location = "#rrtpa06";
					}else{
						handleError(invocationResult.faml.response);
					}
					}else{
						handleErrorNoResponse();
					}
	        }
        };
		
		
		this.rrtpa06page = function(){
        	accstmtdata = accStmtData();
                         
							
			benefType= accstmtdata.response.txndetails.benefType;
			benefname=accstmtdata.response.txndetails.benefname;
			benefemail=accstmtdata.response.txndetails.benefemail;
			bankdesc=accstmtdata.response.txndetails.bankdesc;
			ifsccode=accstmtdata.response.txndetails.ifsccode;
		    ifsccode02=ifsccode.toUpperCase();
			benefacctno=accstmtdata.response.txndetails.benefacctno;
			benefaccttypedesc=accstmtdata.response.txndetails.benefaccttypedesc;
			branchdesc=accstmtdata.response.txndetails.branchdesc;
			benefaccttype=accstmtdata.response.txndetails.benefaccttype;
	        fldRequestId=invocationResult.faml.response.mci.requestid;
		    fldSessionId=invocationResult.faml.response.mci.sessionid;
			fldTxnId=invocationResult.faml.response.mci.txnid;
			fldAppId=invocationResult.faml.response.mci.appid;
			fldUserRefNo=accstmtdata.response.fldUserRefNo;
			
        	
        	$("#contentData").load("Views/TPT/rrtpa06.html", null, function (response, status, xhr) {
                if (status != "error") {}
                  if(benefType=='NEFT'){
                 $("#BeneficiaryType").html('Transfer to other bank / Credit Card Payment (using NEFT / IMPS)');
				 }
			     $("#fldaccountno").html(benefacctno);
				 $("#IFSCcode").html(ifsccode02);
				 $("#benefaccttypedesc").html(benefaccttypedesc);
				 $("#bankdesc").html(bankdesc);
				 $("#benefname").html(benefname);
				 $("#benefemail").html(benefemail);
				 
			     $("#fldAcctNo").val(benefacctno);
				 $("#fldEmail").val(benefemail);
			     $("#fldTxnId").val(fldTxnId);
				 $("#fldRequestId").val(fldRequestId);
				 $("#fldSessionId").val(fldSessionId);
				 $("#fldNamBenef").val(benefname);
				 $("#fldBankDesc").val(bankdesc);
				 $("#fldAccountType").val(benefaccttype);
				 $("#fldBranchDesc").val(branchdesc);
				 $("#fldUserRefNo").val(fldUserRefNo);
				 $("#fldIFSCCode").val(ifsccode02);
				 $("#fldAccountTypeDesc").val(benefaccttypedesc);
				 
				
	            
                ko.applyBindings(self, $(".dynamic-page-content").get(0));
                busyInd.hide();
            }); 
        };
		
		
		
		this.rrtpa06Submit = function(){
				busyInd.show();  
			   
			    var $form = $("#rrtpa06");
				rsaDataArray = $form.serializeArray();    	
								
				reqParams = {};
				for (var i in rsaDataArray) {
					reqParams[rsaDataArray[i].name] = rsaDataArray[i].value;
				}
		       reqParams["fldLoginUserId"] = Regloginuid;
			   reqParams["fldDeviceId"] = fldDeviceId;
				// fldScrnSeqNbr=11&fldNamBenef=test&fldTxnId=TPA&fldBeneType=TPT&fldAppId=RS&fldAcctNo2=50100000000070&fldSessionId=276763473JUNNFDUJO&fldDevicePrint=&fldAcctNo=50100000000070&fldModule=CH&fldEmail=&fldtxnDetails=50100000000070~~test~~~~~~~~&fldRequestId=276763473JUNNFDUJO124027728LH
    	    	var invocationData = {
    	    			adapter : "TPT",
    	        		procedure : "RRTPA07",
    	        		parameters : [fldjsessionid,reqParams,ipadd]
    	    	};
    	    	
    	    	WL.Client.invokeProcedure(invocationData, {
    	    		onSuccess : rsaResponse,
    	    		onFailure : AdapterFail,	    		
    	    		timeout: timeout
    	    	});
		};
};
  
     
	 
	 
	
		
		
		
		
	this.selectIFSC = function(){
		    
				busyInd.show();  
				    
				fldRandomNumber= Math.floor(Math.random() * 1000000000);
    	    	reqParams = {};
    	    	reqParams["fldDeviceId"] = '43';
    	    	reqParams["fldWebServerId"] = fldWebServerId;
    	    	reqParams["fldAppId"] = fldAppId;
    	    	reqParams["fldTxnId"] = "RGN";
    	    	reqParams["fldRequestId"] =RegfldRequestId;
    	    	reqParams["fldScrnSeqNbr"] = "01";
				if(sessionid!=""){
				//console.log("sessionid"+"####"+sessionid);
				reqParams["fldSessionId"] = sessionid;
				}
				else{
    	    	reqParams["fldSessionId"] = Rsessionid;
				}
				reqParams["fldRandomNumber"] = fldRandomNumber.toString();
				reqParams["fldModule"] = 'CH';
				reqParams["fldLoginUserId"] = Regloginuid;
				reqParams["fldRefVal"] = Regloginuid+"--"+'NETBANKING'+"--";
				reqParams["fldRefPage"] = 'rsloginhtml';
				reqParams["fldAppServerId"] = 'eng';
				reqParams["fldAppServerId"] = 'ZZ';
				reqParams["fldDevicePrint"] = '';
				
				// fldWebServerId=YG&fldScrnSeqNbr=01&fldDeviceId=01&fldRandomNumber=&fldLoginUserId=62815052&fldRefVal=62815052--NETBANKING--&fldTxnId=RGN&fldAppId=RS&fldRefPage=rsloginhtml&fldAppServerId=ZZ&fldLangId=eng&fldDevicePrint=
    	    	var invocationData = {
    	    			adapter : "TPT",
    	        		procedure : "RRRGN01",
    	        		parameters : [fldjsessionid,reqParams,ipadd]
    	    	};
    	    	
    	    	WL.Client.invokeProcedure(invocationData, {
    	    		onSuccess : selectIFSCsuccess,
    	    		onFailure : AdapterFail,	    		
    	    		timeout: timeout
    	    	});
		};
     	
        
		
		selectIFSCsuccess = function(result){
	   // console.log('selectIFSCsuccess');
		invocationResult = result.invocationResult;
			if(invocationResult.isSuccessful) {
					if(invocationResult.faml.response){	
					if(invocationResult.faml.response.ifsc){
						accStmtData(invocationResult.faml);
						
						  $(".fixedWrap").show();
							//window.location = "#rrtpa06";
					}else{
					       $(".fixedWrap").show();
						   busyInd.hide();
						//handleError(invocationResult.faml.response);
					}
					}else{
					   
					    $(".fixedWrap").show();
						busyInd.hide();
						//handleErrorNoResponse();
					}
	        }
			
			busyInd.hide();
        };
		
		
		
		ifscfrmSearch = function(){
		    
			 fldCodBank= $("#fldIFSCCode").val();
                 ifsccode01=fldCodBank.toUpperCase();
                 console.log(ifsccode01);
			//var brncName = $('#fldBranchDesc').val();
		   //  $('#fldIFSCCode').val(ifsccode);
					//$('#fldBranchDesc').val(nambrn);
					//$('#fldBankDesc').val(nambank);
				busyInd.show();  
			   
			      	
								
				reqParams = {};
				
		  reqParams["fldRequestId"] = RegfldRequestId;
				 reqParams["fldTxnId"] = "IFL";
				 reqParams["fldActionType"] = "search";
				 reqParams["fldCodIFSC"] = ifsccode01;
				 reqParams["fldAppId"] = "RS";
			     reqParams["fldLoginUserId"] = Regloginuid;
				 reqParams["fldSessionId"] = Rsessionid;
				 reqParams["fldBeneType"] = "NEFT";
				 reqParams["fldScrnSeqNbr"] = "01";
			     reqParams["fldDeviceId"] = "43";
				 reqParams["fldAppServerId"] = "ZZ";
				 reqParams["fldLangId"] = "eng";
				 reqParams["fldModule"] = "CH";
				 reqParams["fldWebServerId"] = "YG";
				  reqParams["fldCodBank"] = "";
				   reqParams["fldCodBranch"] = "";
				
				
				// fldCodIFSC=UTIB000&fldRequestId=871832719KYSOQJRWY144431915ES&fldTxnId=IFL&fldActionType=search&fldAppId=RS&fldCodBank=axis&fldCodBranch=TREASURY&fldSessionId=871832719KYSOQJRWY&fldBeneType=NEFT&fldScrnSeqNbr=01
    	    	var invocationData = {
    	    			adapter : "TPT",
    	        		procedure : "RRIFL01",
    	        		parameters : [fldjsessionid,reqParams,ipadd]
    	    	};
    	    	
    	    	WL.Client.invokeProcedure(invocationData, {
    	    		onSuccess : function ifscfrmSubmitsuccess(result){
						invocationResult = result.invocationResult;
							if(invocationResult.isSuccessful) {
									if(invocationResult.faml.response){
                                          if(invocationResult.faml.response.norecfound){
                                         alert("Please enter correct IFSC code");
                                          }
                                          
                                          
									   else if(invocationResult.faml.response.ifsc){
										accStmtData(invocationResult.faml);
											RecordIFSC("");
											RecordIFSC(invocationResult.faml.response.ifsc);
											//console.log('recordsssssssss '+RecordIFSC())
											//nambrn+'##'+nambank+'##'+codifsc
											$('#fldBranchDesc').val(invocationResult.faml.response.ifsc.nambrn);
											$('#fldBankDesc').val(invocationResult.faml.response.ifsc.nambank);
											   Addbenimsgneft=multiReplace(IMPSMSG,'\\n','');
												fldAccountType= $( "#fldAccountType option:selected" ).text();
												navigator.notification.confirm(
																""+Addbenimsgneft,	
																   checktpaimpssubmit = function(iValue){
																	   if (iValue == 1){
		  
		       busyInd.show();  
		
			    var $form = $("#rrtpa04");
				rsaDataArray = $form.serializeArray();    	
								
				reqParams = {};
				for (var i in rsaDataArray) {
					reqParams[rsaDataArray[i].name] = rsaDataArray[i].value;
				}

    	    	reqParams["fldDeviceId"] = fldDeviceId;
    	    	reqParams["fldWebServerId"] = fldWebServerId;
    	    	reqParams["fldAppId"] = fldAppId;
				reqParams["fldLoginUserId"] = Regloginuid;
    	    	reqParams["fldTxnId"] = "TPA";
    	    	reqParams["fldRequestId"] =RegfldRequestId;
    	    	reqParams["fldScrnSeqNbr"] = "06";
    	    	reqParams["fldSessionId"] = Rsessionid;
				reqParams["fldModule"] = 'CH';
				reqParams["fldAccountTypeDesc"] = fldAccountType;
				reqParams["fldBeneType"] = 'NEFT';
				reqParams["fldActionType"] = 'verify';
			
				
				//fldAppId=RS&fldEmail=&fldAccountTypeDesc=Savings&fldIFSCCode=UTIB0000001&fldSessionId=1784684440YMOSUCOE&fldBeneType=NEFT&fldAcctNo=2222222222&fldBranchDesc=TREASUR OPERATIONS&fldNamBenef=testerr1&fldActionType=verify&fldBankDesc=AXIS BANK&fldModule=CH&fldScrnSeqNbr=06&fldAccountType=10&fldTxnId=TPA&fldAcctNo2=2222222222
    	    	var invocationData = {
    	    			adapter : "TPT",
    	        		procedure : "RRTPA06",
    	        		parameters : [fldjsessionid,reqParams,ipadd]
    	    	};
    	    	
    	    	WL.Client.invokeProcedure(invocationData, {
    	    		onSuccess : rrtpa04SubmitSuccess,
    	    		onFailure : AdapterFail,	    		
    	    		timeout: timeout
    	    	});
		         
	      }
																	   
																   },
																  'HDFC BANK',
																  'Ok,Cancel');
											//RecordIFSC(invocationResult.faml.response.ifsc);
										/*   $(".Successifsc").show();
										  $(".failifsc").hide(); */
										  
											//window.location = "#rrtpa06";
									}else{
										/*  $(".Successifsc").hide();
										 $(".failifsc").show(); */
										   busyInd.hide();
										 handleError(invocationResult.faml.response);
									}
									}else{
									   
									   // $(".fixedWrap").hide();
										busyInd.hide();
										handleErrorNoResponse();
									}
							}
			
							busyInd.hide();
						
					},
    	    		onFailure : AdapterFail,	    		
    	    		timeout: timeout
    	    	});
			
		};
		
		this.ifscfrmSubmit = function(){
		     //fldCodIFSC=  $("#fldCodIFSC").val();
			 fldCodBank= $("#fldCodBank").val();
			 fldCodBranch= $("#fldCodBranch").val();
		    if(fldCodBank!="" && fldCodBranch!=""){
				busyInd.show();  
			   
			    var $form = $("#ifscfrm");
				rsaDataArray = $form.serializeArray();    	
								
				reqParams = {};
				for (var i in rsaDataArray) {
					reqParams[rsaDataArray[i].name] = rsaDataArray[i].value;
				} 
		  
    	   
			
				 reqParams["fldRequestId"] = RegfldRequestId;
				 reqParams["fldTxnId"] = "IFL";
				 reqParams["fldActionType"] = "search";
				 reqParams["fldCodIFSC"] = "";
				 reqParams["fldAppId"] = "RS";
			     reqParams["fldLoginUserId"] = Regloginuid;
				 reqParams["fldSessionId"] = Rsessionid;
				 reqParams["fldBeneType"] = "NEFT";
				 reqParams["fldScrnSeqNbr"] = "01";
			     reqParams["fldDeviceId"] = "43";
				 reqParams["fldAppServerId"] = "ZZ";
				 reqParams["fldLangId"] = "eng";
				 reqParams["fldModule"] = "CH";
				 reqParams["fldWebServerId"] = "YG";
				
				// fldCodIFSC=UTIB000&fldRequestId=871832719KYSOQJRWY144431915ES&fldTxnId=IFL&fldActionType=search&fldAppId=RS&fldCodBank=axis&fldCodBranch=TREASURY&fldSessionId=871832719KYSOQJRWY&fldBeneType=NEFT&fldScrnSeqNbr=01
    	    	var invocationData = {
    	    			adapter : "TPT",
    	        		procedure : "RRIFL01",
    	        		parameters : [fldjsessionid,reqParams,ipadd]
    	    	};
    	    	
    	    	WL.Client.invokeProcedure(invocationData, {
                                          onSuccess : function(result){
                                          
                                          
                                          invocationResult = result.invocationResult;
                                          if(invocationResult.isSuccessful) {
                                          if(invocationResult.faml.response){
                                          if(invocationResult.faml.response.norecfound){
                                          alert("No Record Found");
                                          }
                                          else if(invocationResult.faml.response.ifsc){
                                          accStmtData(invocationResult.faml);
                                          RecordIFSC("");
                                          RecordIFSC(invocationResult.faml.response.ifsc);
                                          console.log('recordsssssssss '+RecordIFSC())
                                          
                                          setTimeout(function(){
                                                     console.log('records '+RecordIFSC())
                                                     $('.popWrap.double').parent().show(0);
                                                     $('.popWrap.double').parent().addClass('show');
                                                     $('.popWrap.double').addClass('show');
                                                     busyInd.hide();
                                                     }, 2000);
                                          
                                          //RecordIFSC(invocationResult.faml.response.ifsc);
                                          /*   $(".Successifsc").show();
                                           $(".failifsc").hide(); */
                                          
                                          //window.location = "#rrtpa06";
                                          }else{
                                          /*  $(".Successifsc").hide();
                                           $(".failifsc").show(); */
                                          busyInd.hide();
                                          //handleError(invocationResult.faml.response);
                                          }
                                          }else{
                                          
                                          // $(".fixedWrap").hide();
                                          busyInd.hide();
                                          //handleErrorNoResponse();
                                          }
                                          }
                                          
                                          busyInd.hide();
                                          },
    	    		onFailure : AdapterFail,	    		
    	    		timeout: timeout
    	    	});
			}
			else{
			    customAlert("Please enter Bank name & Branch name/city");
			}
		};
		
		
		
		ifscfrmSubmitsuccess = function(result){

		invocationResult = result.invocationResult;
			if(invocationResult.isSuccessful) {
					if(invocationResult.faml.response){
                            if(invocationResult.faml.response.norecfound){
                                 alert("No Record Found");
                            }				  
                            
					 else if(invocationResult.faml.response.ifsc){
						accStmtData(invocationResult.faml);
							RecordIFSC("");
				            RecordIFSC(invocationResult.faml.response.ifsc);
						//	console.log('recordsssssssss '+RecordIFSC())
							
								setTimeout(function(){
								//console.log('records '+RecordIFSC())
								 $('.popWrap.double').parent().show(0);
								$('.popWrap.double').parent().addClass('show');
								$('.popWrap.double').addClass('show');	
										busyInd.hide();
								}, 2000);
							   
				            //RecordIFSC(invocationResult.faml.response.ifsc);
						/*   $(".Successifsc").show();
						  $(".failifsc").hide(); */
						  
							//window.location = "#rrtpa06";
					}else{
					    /*  $(".Successifsc").hide();
						 $(".failifsc").show(); */
						   busyInd.hide();
						//handleError(invocationResult.faml.response);
					}
					}else{
					   
					   // $(".fixedWrap").hide();
						busyInd.hide();
						//handleErrorNoResponse();
					}
	        }
			
			busyInd.hide();
        };