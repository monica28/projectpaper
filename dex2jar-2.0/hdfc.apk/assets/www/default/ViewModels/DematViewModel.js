var DematViewModel=function(){
  self.fldToAcctNo = ko.observable();
  flddpaccDetails = ko.observableArray([]);
  self.fldHoldingval=ko.observable();
  self.flddemataccDetails=ko.observable();
  self.fldisindetails=ko.observable();
  self.fldisindeatails1=ko.observable();
  self.demataccountlist=ko.observableArray([]);
      self.innerdata=ko.observableArray([]);
 self.dematList=ko.observableArray([]);
 
   AdapterFail = function(response){
			
			};
this.ListOfAccounts1= function(){
              
    	    	reqParams = {};
    	    	reqParams["fldDeviceId"] = fldDeviceId;
				reqParams["fldWebServerId"] = fldWebServerId;
				reqParams["fldAppId"] = "RS";
				reqParams["fldAppServerId"] = fldAppServerId;
				reqParams["fldLangId"] = fldLangId;
				reqParams["fldModule"] = "CH";
				reqParams["fldTxnId"] = "DPL";
				reqParams["fldScrnSeqNbr"] = "01";
				reqParams["fldLogoffReq"] = "N";
				reqParams["fldSwitchAppId"] = "";
				reqParams["fldRoleId"] ="" ;
        		reqParams["acctTemp"] = "0" ;
        		
        		fldjsessionid = Regfldjsessionid;
		    	reqParams["fldLoginUserId"] =Regloginuid;
		    	
		    	reqParams["fldSessionId"] = Rsessionid;
		    	reqParams["fldRequestId"] =RegfldRequestId;
		    	
    	    	busyInd.show();
    	    	var invocationData = {
    	    			adapter : "Demat",
    	        		procedure : "RRDPL01",
    	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	    	};
    	    	
    	    	WL.Client.invokeProcedure(invocationData, {
    	    		onSuccess : rrdpl01Success,
    	    		onFailure : AdapterFail,	    		
    	    		timeout: timeout
    	    	});
    	    
        
    	    	
        };
this.ListOfAccounts= function(){
              
    	    	reqParams = {};
    	    	reqParams["fldDeviceId"] = fldDeviceId;
				reqParams["fldWebServerId"] = fldWebServerId;
				reqParams["fldAppId"] = "RS";
				reqParams["fldAppServerId"] = fldAppServerId;
				reqParams["fldLangId"] = fldLangId;
				reqParams["fldModule"] = "CH";
				reqParams["fldTxnId"] = "DPL";
				reqParams["fldScrnSeqNbr"] = "01";
				reqParams["fldLogoffReq"] = "N";
				reqParams["fldSwitchAppId"] = "";
				reqParams["fldRoleId"] ="" ;
        		reqParams["acctTemp"] = "1" ;
        		
        		fldjsessionid = Regfldjsessionid;
		    	reqParams["fldLoginUserId"] =Regloginuid;
		  
		    	reqParams["fldSessionId"] = Rsessionid;
		    	reqParams["fldRequestId"] =RegfldRequestId;
		    	
    	    	busyInd.show();
    	    	var invocationData = {
    	    			adapter : "Demat",
    	        		procedure : "RRDPL01",
    	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	    	};
    	    	
    	    	WL.Client.invokeProcedure(invocationData, {
    	    		onSuccess : rrdpl01Success,
    	    		onFailure : AdapterFail,	    		
    	    		timeout: timeout
    	    	});
    	    
        
    	    	
        };
		
		rrdpl01Success = function(result){
					
			self.demataccountList.removeAll();
    	
		invocationResult = result.invocationResult;


    	   if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    	   //if(invocationResult.faml.response.rc.returncode == 0){
		    if (invocationResult.faml.response.txn_data == undefined){
			
				if(window.location.hash == '#Demat'){
				    $("#dpacunt").show();
    	    		templateId = "Demat.html";
    	    	}else{
    	    		templateId = "rrdpl01.html";
    	    	}
			
		   $("#contentData").load("Views/Demat/"+templateId, null, function (response, status, xhr) {
            if (status != "error") {}
            ko.applyBindings(self, $(".dynamic-page-content").get(0))
			 $('#acnt').hide();
					
					 $('#accExitsMsg').show();
			});
			
			}
		   if (invocationResult.faml.response.txn_data != undefined) {
		  
			txndata=invocationResult.faml.response.txn_data;
			qrycnt=invocationResult.faml.response.txn_data.qrycnt;
			acctdtl=invocationResult.faml.response.txn_data.acctdtl;
			dematacctdtl=invocationResult.faml.response.txn_data.acctdtl;
			acctno=invocationResult.faml.response.txn_data.acctdtl.acctno;
			fhldnm=invocationResult.faml.response.txn_data.acctdtl.fhldnm;
			shldnm=invocationResult.faml.response.txn_data.acctdtl.shldnm;
			thldnm=invocationResult.faml.response.txn_data.acctdtl.thldnm;
			dpid=invocationResult.faml.response.txn_data.acctdtl.dpid;
			holdval=invocationResult.faml.response.txn_data.acctdtl.holdval;
			msgcnt=invocationResult.faml.response.txn_data.msgcnt;
			
			
			strid = 0;
			$(dematacctdtl).each(function(index, obj) {
    	    		self.demataccountlist.push({strid: strid,dpid:obj.dpid, acctno:obj.acctno, holdval:obj.holdval,fhldnm:obj.fhldnm,shldnm:obj.shldnm,thldnm:obj.thldnm});
    	    		  strid++; 
    	    		});
					
					
					
					
			
						if(window.location.hash == '#Demat'){
    	    		templateId = "Demat.html";
    	    	}else{
    	    		templateId = "rrdpl01.html";
    	    	}

	
				$("#contentData").load("Views/Demat/"+templateId, null, function (response, status, xhr) {
            if (status != "error") {}
            ko.applyBindings(self, $(".dynamic-page-content").get(0))
			     
				 
				 
			    if(invocationResult.faml.response.txn_data!= undefined){
			        $('#acnt').show();
					 $('#accExitsMsg').hide();
			}
			
			
			
			
			
			
		  
			
$('.autoslide-slider3').iosSlider({
    		    			desktopClickDrag: true,
    		    			snapToChildren: true,
    		    			infiniteSlider: false,
    		    			autoSlide: false,
    		    			/*
							 * scrollbar: true, autoSlideTransTimer: 0,
							 */
    		    			onSlideComplete: slideComplete,
    		    			navNextSelector: $('.autoslide-slider3 .next'),
    		    			navPrevSelector: $('.autoslide-slider3 .prev')
    		    		});
				
			
			      
			
			     
					  
                });
			
			
			}
			else{
				if( invocationResult.faml.response.rc!= undefined){
						handleError(invocationResult.faml.response);
						window.location = "#rrasm01";
				}
				
    		}
			
			Temp=invocationResult.faml.request.acctTemp;
			
			
			
			
             
    		
			     
			
			// }
			
    		}
    	
		   }
		   busyInd.hide();
		};
		
		
		
			
       
			
		//holding summry	
this.HoldingsSummary = function(){
         
			 
				reqParams = {};
				reqParams["fldDeviceId"] = fldDeviceId;
				reqParams["fldWebServerId"] = fldWebServerId;
				reqParams["fldAppId"] = "RS";
				reqParams["fldAppServerId"] = fldAppServerId;
				reqParams["fldLangId"] = fldLangId;
				reqParams["fldModule"] = "CH";
				reqParams["fldSwitchAppId"] = "";
				reqParams["fldTxnId"] = "HLD";
				reqParams["fldLogoffReq"] = "N";
				reqParams["fldScrnSeqNbr"] = "01";
				reqParams["fldRoleId"] ="" ;
				fldjsessionid = Regfldjsessionid;
		    	reqParams["fldLoginUserId"] =Regloginuid;
		    	reqParams["fldSessionId"] = Rsessionid;
		    	reqParams["fldRequestId"] =RegfldRequestId;
				
				
				
				busyInd.show();
				var invocationData = {
						adapter : "Demat",
						procedure : "RRHLD01",
						parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
				};
				WL.Client.invokeProcedure(invocationData, {
					onSuccess : rrhldSuccess,
					onFailure : AdapterFail,	    		
					timeout: timeout
				});
			};  	    	   
        	
rrhldSuccess = function(result){
		accountList.removeAll();				
    	
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		//if(invocationResult.faml.response.rc.returncode == 0){
			if(invocationResult.faml.response.txn_data == undefined){
			
			 	$("#contentData").load("Views/Demat/rrhld01.html", null, function (response, status, xhr) {
            if (status != "error") {}
            ko.applyBindings(self, $(".dynamic-page-content").get(0))
			 $('#accdtls').hide();
					
					 $('#staticmsg').show();
			});
			
			
			}
			
			if (invocationResult.faml.response.txn_data!= undefined) { 
			txndata=invocationResult.faml.response.txn_data;
			acctdtl = invocationResult.faml.response.txn_data.acctdtl;
			
			    var idx = 1;
	    		$(acctdtl).each(function(index, obj) {
	    			   strid = "item"+idx;
	    			
	    			
	    				displaytxt = obj.dpid+"-"+obj.acctno;
	    			     accountValue = obj.dpid+"#"+obj.acctno+"#"+obj.holdval;
						 
	    		    accountList.push({ strid:strid, displaytxt:displaytxt, accountValue: accountValue });
	    		    idx++;
	    		}); 
				
							$("#contentData").load("Views/Demat/rrhld01.html", null, function (response, status, xhr) {
            if (status != "error") {}
            ko.applyBindings(self, $(".dynamic-page-content").get(0));
			
			if(invocationResult.faml.response.txn_data!= undefined){
			        $('#accdtls').show();
					 $('#staticmsg').hide();
			}else{
				  $('#accdtls').hide();
					 $('#staticmsg').show();
						
			}
			
    	});
				
				
				
				}
						
    
    			
    		//}
			else{
				if( invocationResult.faml.response.rc!= undefined){
    			handleError(invocationResult.faml.response);
    			window.location = "#rrasm01";
				}
				
    		}
    		}
    	}
		     busyInd.hide();
			};
		
		
	self.rrhld01Onclicksubmit = function(DematObj){
	          
			  dpid = DematObj.dpid;
			  acctno = DematObj.acctno;
			  holdval = DematObj.holdval;

				
          $(".h_title").html("Holdings Query");
				reqParams = {};
				reqParams["fldDeviceId"] = fldDeviceId;
				reqParams["fldWebServerId"] = fldWebServerId;
				reqParams["fldAppId"] = "RS";
				reqParams["fldAppServerId"] = fldAppServerId;
				reqParams["fldLangId"] = fldLangId;
			    reqParams["fldModule"] = "CH";
					reqParams["fldTxnId"] = "HLD";
				reqParams["fldScrnSeqNbr"] = "02";
				reqParams["fldHoldingval"] = holdval ;			
				reqParams["fldDpId"] = dpid;
				reqParams["fldAcctNo"] = acctno;
				reqParams["fldIntAcctNo"] = acctno;
				
				fldjsessionid = Regfldjsessionid;
		    	reqParams["fldLoginUserId"] =Regloginuid;
		    	reqParams["fldIdUser"] =Regloginuid;
		    	reqParams["fldSessionId"] = Rsessionid;
		    	reqParams["fldRequestId"] =RegfldRequestId;
				busyInd.show();
				var invocationData = {
						adapter : "Demat",
						procedure : "RRHLD02",
						parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
				};
				WL.Client.invokeProcedure(invocationData, {
					onSuccess : rrhld01submitSuccess,
					onFailure : AdapterFail,	    		
					timeout: timeout
				});
				
			};
	self.rrhld01submit = function(){
	    
		
    if($("#f1").valid()){
             fldtoacctno = self.fldToAcctNo();
    	     fldtoacctno = fldtoacctno.split('#');
    reqParams = {};
				reqParams["fldDeviceId"] = fldDeviceId;
				reqParams["fldWebServerId"] = fldWebServerId;
				reqParams["fldAppId"] = "RS";
				reqParams["fldAppServerId"] = fldAppServerId;
				reqParams["fldLangId"] = fldLangId;
			    reqParams["fldModule"] = "CH";
				reqParams["fldRequestId"]="rrhlds02";
				reqParams["fldTxnId"] = "HLD";
				reqParams["fldScrnSeqNbr"] = "02";
				reqParams["fldHoldingval"] = fldtoacctno[2] ;			
				reqParams["fldDpId"] = fldtoacctno[0];
				reqParams["fldAcctNo"] = fldtoacctno[1];
				reqParams["fldIntAcctNo"] = fldtoacctno[1];
				reqParams["fldIntAcctNo_txt"] = $('#fldIntAcctNo option:selected').text();
			
				fldjsessionid = Regfldjsessionid;
		    	reqParams["fldLoginUserId"] =Regloginuid;
		    	reqParams["fldIdUser"] =Regloginuid;
		    	reqParams["fldSessionId"] = Rsessionid;
		    	
				busyInd.show();
				var invocationData = {
						adapter : "Demat",
						procedure : "RRHLD02",
						parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
				};
				WL.Client.invokeProcedure(invocationData, {
					onSuccess : rrhld01submitSuccess,
					onFailure : AdapterFail,	    		
					timeout: timeout
				});
				}
			};
			
	rrhld01submitSuccess = function(result){
	       totv =0; 
		 if(window.location.hash == "#Demat")
			window.location = "#rrhld02_new";
		
		
    	invocationResult = result.invocationResult;
		if(invocationResult.faml.response.txn_data.accttp==undefined){
		      
				
			$("#contentData").load("Views/Demat/rrhld02.html", null, function (response, status, xhr) {
            if (status != "error") {}
			   
            ko.applyBindings(self, $(".dynamic-page-content").get(0));
			
			   $("#erormsg").show(); 
			    $("#hldts").hide();
	
			  
    	});	
				
		
				
		}
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
			if(invocationResult.faml.response.txn_data.accttp!=undefined){
				tmpmonthno=invocationResult.faml.response.txn_data.clidtl.hlddt.substring(4,6);
			    holdingdate=invocationResult.faml.response.txn_data.clidtl.hlddt.substring(6,8);
			    hold=invocationResult.faml.response.txn_data.clidtl.hlddt.substring(0,4);
			    mnth = '';
			  		  if(tmpmonthno=='01'){
					        mnth = 'Jan';
					  }
					 
					  if(tmpmonthno=='02'){
					        mnth = 'Feb';
					  }
					   if(tmpmonthno=='03'){
					        mnth = 'Mar';
					  }
					   if(tmpmonthno=='04'){
					        mnth = 'Apr';
					  }
					   if(tmpmonthno=='05'){
					        mnth = 'May';
					  }
					   if(tmpmonthno=='06'){
					        mnth = 'Jun';
					  }
					   if(tmpmonthno=='07'){
					        mnth = 'July';
					  }
					  if(tmpmonthno=='08'){
					        mnth = 'Aug';
					  }
					  if(tmpmonthno=='09'){
					        mnth = 'Sep';
					  }
					  if(tmpmonthno=='10'){
					        mnth = 'Oct';
					  } 
					  if(tmpmonthno=='11'){
					        mnth = 'Nov';
					  }
					   if(tmpmonthno=='12'){
					        mnth = 'Dec';
					  }
					try{
						hlddtl=invocationResult.faml.response.txn_data.accttp.hlddtl;
						balstat=invocationResult.faml.response.txn_data.accttp.hlddtl.balstat;
						
						   
					
			          if(balstat != ''){
							      $('#R1').show();
								 
			                   }
			                   else{
							   
								  '-';
			                     }
			         var acctdesc1 = invocationResult.faml.response.txn_data.accttp.acctdesc;   
					 $(hlddtl).each(function(index, obj) {
			    	    		
			    	    		 totv  += parseFloat(obj.mktval);
			    	   
			    	    		   flddpaccDetails.push({acctdesc1:acctdesc,balstat:obj.balstat, mkttp:obj.mkttp, mktrt:formatAmt(parseFloat(obj.mktrt)), hldqty:formatAmt(parseFloat(obj.hldqty)), srno:obj.srno, setlno:obj.setlno, lockindt:obj.lockindt, scriptp:obj.scriptp, mktval:formatAmt(parseFloat(obj.mktval)), coname:obj.coname, isin:obj.isin});
			    	    		   
			    	    		});
						 
						 if(invocationResult.faml.response.txn_data.accttp.acctdesc=='Online Trading Holds'){
						  $('#note').show();
						 }
						 else{
						 $('#note').hide();
						 }
						 
						  
				           
						
									
			    			$("#contentData").load("Views/Demat/rrhld02.html", null, function (response, status, xhr) {
						            if (status != "error") {}
									   
						            ko.applyBindings(self, $(".dynamic-page-content").get(0));
									      
										  
										  if(window.location.hash == '#rrhld02_new'){
						    	    		$("#dpacunt").show();
											$("#custdetails").hide();
									      
						    	    	}
									   else{
									       $("#dpacunt").hide();
										   $("#custdetails").show();
										  
									   }
							  
							  
							  
							  
							  
							 
						     if(invocationResult.faml.response.rc.errorcode!= "0000" && invocationResult.faml.response.rc.errorcode!= ""){
						    	 	$("#erormsg").show();
							}
						   
							if(invocationResult.faml.response.rc.errorcode == "0000" || invocationResult.faml.response.rc.errorcode == ""){
									$("#hldts").show();
							}
						
				
						  $('#clikey').html(invocationResult.faml.response.txn_data.clidtl.clikey.substring(0,8));
						  $('#acctno').html(invocationResult.faml.response.txn_data.clidtl.acctno);
						  $('#fhldnm').html(invocationResult.faml.response.txn_data.clidtl.fhldnm);
						 
						  $('#did').html(invocationResult.faml.response.seldpid+"-"+invocationResult.faml.response.seldpacct);
						  $('#hlv').html("Rs. "+invocationResult.faml.request.fldHoldingval);
			              $('#hld').html(holdingdate+"-"+mnth+"-"+hold); 
						  $('#totv').html("Rs."+totv);
						  $('#holddt').html(holdingdate+"-"+mnth+"-"+hold);
						
			    	});
				}catch(err){
					console.log('Details on demat failed  ...');
					accttp=invocationResult.faml.response.txn_data.accttp;
					var datedemat = holdingdate+"-"+mnth+"-"+hold;
					 $(accttp).each(function(index, obj) {
						totv = 0; 
						var acctdesc = obj.acctdesc;
						 
						 hlddtl=obj.hlddtl;
						 $(hlddtl).each(function(index, obj) {
							 totv  += parseFloat(obj.mktval);
							 flddpaccDetails.push({acctdesc1:acctdesc, balstat:obj.balstat, mkttp:obj.mkttp, mktrt:formatAmt(parseFloat(obj.mktrt)), hldqty:formatAmt(parseFloat(obj.hldqty)), srno:obj.srno, setlno:obj.setlno, lockindt:obj.lockindt, scriptp:obj.scriptp, mktval:formatAmt(parseFloat(obj.mktval)), coname:obj.coname, isin:obj.isin});
						 });
						 flddpaccDetails.push({acctdesc1:datedemat, balstat:totv, mkttp:"", mktrt:"", hldqty:"", srno:"last", setlno:"", lockindt:"", scriptp:"", mktval:"", coname:"", isin:""});
	    	    	});
					 $("#contentData").load("Views/Demat/rrhld02.html", null, function (response, status, xhr) {
						            if (status != "error") {}
									   
						            ko.applyBindings(self, $(".dynamic-page-content").get(0));
									      
										  
										  if(window.location.hash == '#rrhld02_new'){
						    	    		$("#dpacunt").show();
											$("#custdetails").hide();
									      
						    	    	}
									   else{
									       $("#dpacunt").hide();
										   $("#custdetails").show();
										  
									   }
							  
							  
							  
							  
							  
							 
						     if(invocationResult.faml.response.rc.errorcode!= "0000" && invocationResult.faml.response.rc.errorcode!= ""){
						    	 	$("#erormsg").show();
							 }
						   
							if(invocationResult.faml.response.rc.errorcode == "0000" || invocationResult.faml.response.rc.errorcode == ""){
									$("#hldts").show();
							}
							
				
						  $('#clikey').html(invocationResult.faml.response.txn_data.clidtl.clikey.substring(0,8));
						  $('#acctno').html(invocationResult.faml.response.txn_data.clidtl.acctno);
						  $('#fhldnm').html(invocationResult.faml.response.txn_data.clidtl.fhldnm);
						  //$('#acctdesc').html(acctdesc);
						  $('#did').html(invocationResult.faml.response.seldpid+"-"+invocationResult.faml.response.seldpacct);
						  $('#hlv').html("Rs. "+invocationResult.faml.request.fldHoldingval);
			              $('#hld').html(holdingdate+"-"+mnth+"-"+hold); 
						  $('#totv').html("Rs."+totv);
						  $('#holddt').html(holdingdate+"-"+mnth+"-"+hold);
				
				});
			}
			
    		}	
    	   }else{
    			handleError(invocationResult.faml.response);
				
    			window.location ='#Demat';
				
				}
    	        }
				}
				busyInd.hide();
			};
	this.HoldingSummary = function(){
	  reqParams = {};
			reqParams["fldDeviceId"] = fldDeviceId;
			reqParams["fldWebServerId"] = fldWebServerId;
			reqParams["fldAppId"] = "RS";
			reqParams["fldAppServerId"] = fldAppServerId;
			reqParams["fldLangId"] = fldLangId;
			reqParams["fldModule"] = "CH";
			
			reqParams["fldTxnId"] = "HLD";
			reqParams["fldScrnSeqNbr"] = "02";
			
			fldjsessionid = Regfldjsessionid;
	    	reqParams["fldLoginUserId"] =Regloginuid;
	    
	    	reqParams["fldSessionId"] = Rsessionid;
	    	
			
			
			busyInd.show();
			var invocationData = {
					adapter : "Demat",
					procedure : "RRHLD02",
					parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
			};
			WL.Client.invokeProcedure(invocationData, {
				onSuccess : rrhld02success,
				onFailure : AdapterFail,	    		
				timeout: timeout
			});
    };	
	rrhld02success = function(result){
			busyInd.hide();
	    	invocationResult = result.invocationResult;
			alert(invocationResult.faml.response.txn_data.clidtl.clikey);
	    	if(invocationResult.isSuccessful){
	    	if(invocationResult.faml.response){
	    	if(invocationResult.faml.response.rc.returncode=0){
			
			
	    		$("#contentData").load("Views/Demat/rrhld02.html", null, function (response, status, xhr){
	    			if (status != "error") {}
	                ko.applyBindings(self, $(".dynamic-page-content").get(0));
			         
	
             });					
	    		}else{
    			handleError(invocationResult.faml.response);
    			window.location ='#Demat';
    			
				}
	    	}	
	    	}	
	    	
			
		
      };
	 //client profile 
	  
	  this.ClientProfile= function(){
    	    	reqParams = {};
    	    	reqParams["fldDeviceId"] = fldDeviceId;
				reqParams["fldWebServerId"] = fldWebServerId;
				reqParams["fldAppId"] = "RS";
				reqParams["fldAppServerId"] = fldAppServerId;
				reqParams["fldLangId"] = fldLangId;
				reqParams["fldModule"] = "CH";
				reqParams["fldTxnId"] = "DPQ";
				reqParams["fldScrnSeqNbr"] = "01";
				reqParams["fldLogoffReq"] = "N";
				reqParams["fldSwitchAppId"] = "";
				reqParams["fldRoleId"] ="" ;

        		
    	    	
				fldjsessionid = Regfldjsessionid;
		    	reqParams["fldLoginUserId"] =Regloginuid;
		
		    	reqParams["fldSessionId"] = Rsessionid;
		    	reqParams["fldRequestId"] =RegfldRequestId;
				
    	    	busyInd.show();
    	    	var invocationData = {
    	    			adapter : "Demat",
    	        		procedure : "RRDPQ01",
    	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	    	};
    	    	
    	    	WL.Client.invokeProcedure(invocationData, {
    	    		onSuccess : rrdpq01Success,
    	    		onFailure : AdapterFail,	    		
    	    		timeout: timeout
    	    	});
    	    
        
    	    	
        };

     rrdpq01Success= function(result){
	        accountList.removeAll();
			
	    	invocationResult = result.invocationResult;
	    	if(invocationResult.isSuccessful){
	    	if(invocationResult.faml.response){
	    	//if(invocationResult.faml.response.rc.returncode=0){
			
			if(invocationResult.faml.response.txn_data == undefined){
			
			 	$("#contentData").load("Views/Demat/rrdpq01.html", null, function (response, status, xhr) {
            if (status != "error") {}
            ko.applyBindings(self, $(".dynamic-page-content").get(0))
			 $('#viewacnt').hide();
					
					 $('#staticmsg').show();
			});
			
			
			}
			
			

			
			
			if (invocationResult.faml.response.txn_data!= undefined){
			txndata=invocationResult.faml.response.txn_data;
		    acctdtl=invocationResult.faml.response.txn_data.acctdtl;
			
			
			 var idx = 1;
	    		$(acctdtl).each(function(index, obj) {
	    			strid = "item"+idx;
	    			
	    			
	    				 displaytxt = obj.dpid+"-"+obj.acctno;
	    			     accountValue = obj.dpid+"#"+obj.acctno;
						 
	    		    accountList.push({ strid:strid, displaytxt:displaytxt, accountValue: accountValue });
	    		    idx++;
	    		}); 
			   	$("#contentData").load("Views/Demat/rrdpq01.html", null, function (response, status, xhr){
				  
	    			if (status != "error") {}
	                ko.applyBindings(self, $(".dynamic-page-content").get(0));
					if(invocationResult.faml.response.txn_data!= undefined){
				       $('#viewacnt').show();
					 $('#staticmsg').hide();
					}
					else{
					$('#staticmsg').show();
					$('#viewacnt').hide();
					}
	        
             });			   
            }
			
	    						
	    	//}
			  else{
				if( invocationResult.faml.response.rc!= undefined){
    			handleError(invocationResult.faml.response);
    			window.location ='#Demat';
    		
				}
				
    		}
	    	}	
	    	}	
	    	
			
		    busyInd.hide();
      };
	  
	  
	 
	  self.rrdpq01submit= function(){
	   
    if($("#f1").valid()){
             fldtoacctno = self.fldToAcctNo();
    	     fldtoacctno = fldtoacctno.split('#');
	
                reqParams = {};
				reqParams["fldDeviceId"] = fldDeviceId;
				reqParams["fldWebServerId"] = fldWebServerId;
				reqParams["fldAppId"] = "RS";
				reqParams["fldAppServerId"] = fldAppServerId;
				reqParams["fldLangId"] = fldLangId;
			    reqParams["fldModule"] = "CH";
				reqParams["fldTxnId"] = "DPQ";
				reqParams["fldScrnSeqNbr"] = "02";			
				reqParams["fldDpId"] = fldtoacctno[0];
				reqParams["fldAcctNo"] = fldtoacctno[1];
				reqParams["fldIntAcctNo"] = fldtoacctno[1];
				
			
			
				fldjsessionid = Regfldjsessionid;
		    	reqParams["fldLoginUserId"] =Regloginuid;
		    	reqParams["fldIdUser"] =Regloginuid;
		    	reqParams["fldSessionId"] = Rsessionid;
		    	reqParams["fldRequestId"] =RegfldRequestId;
				
				
				 busyInd.show();
				var invocationData = {
						adapter : "Demat",
						procedure : "RRDPQ02",
						parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
				};
				WL.Client.invokeProcedure(invocationData, {
					onSuccess : rrdpq01submitSuccess,
					onFailure : AdapterFail,	    		
					timeout: timeout
				});
				}
			};
	
	

   rrdpq01submitSuccess = function(result){
	      
    	
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
		tmpmonthno=invocationResult.faml.response.txn_data.fhdldtl.activationtime.substring(4,6);
		acopeningDate=invocationResult.faml.response.txn_data.fhdldtl.activationtime.substring(6,8);
		acttime = invocationResult.faml.response.txn_data.fhdldtl.activationtime.substring(0,4);
		mnth = '';
		  		  if(tmpmonthno=='01'){
				        mnth = 'Jan';
				  }
				 
				  if(tmpmonthno=='02'){
				        mnth = 'Feb';
				  }
				   if(tmpmonthno=='03'){
				        mnth = 'Mar';
				  }
				   if(tmpmonthno=='04'){
				        mnth = 'Apr';
				  }
				   if(tmpmonthno=='05'){
				        mnth = 'May';
				  }
				   if(tmpmonthno=='06'){
				        mnth = 'Jun';
				  }
				   if(tmpmonthno=='07'){
				        mnth = 'July';
				  }
				  if(tmpmonthno=='08'){
				        mnth = 'Aug';
				  }
				  if(tmpmonthno=='09'){
				        mnth = 'Sep';
				  }
				  if(tmpmonthno=='10'){
				        mnth = 'Oct';
				  } 
				  if(tmpmonthno=='11'){
				        mnth = 'Nov';
				  }
				   if(tmpmonthno=='12'){
				        mnth = 'Dec';
				  }
			   
			   
			   
			   
			
						
    			$("#contentData").load("Views/Demat/rrdpq02.html", null, function (response, status, xhr) {
            if (status != "error") {}
			   
            ko.applyBindings(self, $(".dynamic-page-content").get(0));
			$('#fhldnm').html(invocationResult.faml.response.txn_data.fhdldtl.fhldnm);
			if(invocationResult.faml.response.txn_data.fhdldtl.ffathname!=''){
			 $('#ffathname').html(invocationResult.faml.response.txn_data.fhdldtl.ffathname);
			}
			else{
			"-";
			}
			
			
			if(invocationResult.faml.response.txn_data.shdldtl.shldnm!=''){
			$('#shldnm').html(invocationResult.faml.response.txn_data.shdldtl.shldnm);
			}
			else{
			"-";
			}
			
			if(invocationResult.faml.response.txn_data.shdldtl.sfathname!=''){
			$('#sfathname').html(invocationResult.faml.response.txn_data.shdldtl.sfathname);
			}
			else{
			"-";
			}
			
			if(invocationResult.faml.response.txn_data.thdldtl.thldnm!=''){
			$('#thldnm').html(invocationResult.faml.response.txn_data.thdldtl.thldnm);
			}
			else{
			"-";
			}
			
			
			if(invocationResult.faml.response.txn_data.thdldtl.tfathname!=''){
			$('#tfathname').html(invocationResult.faml.response.txn_data.thdldtl.tfathname);
			}
			else{
			"-";
			}
			
			if(invocationResult.faml.response.txn_data.fhdldtl.faddr1!=''){
			$('#faddr1').html(invocationResult.faml.response.txn_data.fhdldtl.faddr1);
			$('#faddr11').show();
			}
			else{
			$('#faddr11').hide();
			}
			
			if(invocationResult.faml.response.txn_data.fhdldtl.faddr2!=''){
			$('#faddr2').html(invocationResult.faml.response.txn_data.fhdldtl.faddr2);
			$('#faddr22').show();
			}
			else{
			$('#faddr22').hide();
			}
			
			if(invocationResult.faml.response.txn_data.fhdldtl.faddr3!=''){
			$('#faddr3').html(invocationResult.faml.response.txn_data.fhdldtl.faddr3);
			$('#faddr33').show();
			}
			else{
			$('#faddr33').hide();
			}
			if(invocationResult.faml.response.txn_data.fhdldtl.fcity!=''){
			$('#fcity').html(invocationResult.faml.response.txn_data.fhdldtl.fcity);
			$('#fcityy').show();
			}
			else{
			$('#fcityy').hide();
			}
			
			if(invocationResult.faml.response.txn_data.fhdldtl.fpincode!=''){
			$('#fpincode').html(invocationResult.faml.response.txn_data.fhdldtl.fpincode);
			}
			else{
			"-";
			}
			
			if(invocationResult.faml.response.txn_data.norgdtl.norg == 'N' || invocationResult.faml.response.txn_data.norgdtl.norg == 'n'){
			  $("#norg").show();
			  
			}
			if(invocationResult.faml.response.txn_data.norgdtl.norg == 'G' || invocationResult.faml.response.txn_data.norgdtl.norg == 'g'){
			  $("#gdetail").show();
			}
			if(invocationResult.faml.response.txn_data.norgdtl.norg!=''){
			$('#nominedtls').show();
			$('#spc').show();
			
			}
			else{
			 $('#nominedtls').hide();
			 $('#spc').hide();
			
			}
			if(invocationResult.faml.response.txn_data.norgdtl.name!=''){
			$('#nname').show();
			$('#norgdtl').html(invocationResult.faml.response.txn_data.norgdtl.name);
			}
			else{
			  $('#nname').hide();
			}
			if(invocationResult.faml.response.txn_data.norgdtl.addr1!=''){
			$('#nadd').show();
			$('#addr1').html(invocationResult.faml.response.txn_data.norgdtl.addr1);
			}
			else{
			  $('#nadd').hide();
			}
			if(invocationResult.faml.response.txn_data.norgdtl.addr2!=''){
			$('#nadd2').show();
			$('#addr2').html(invocationResult.faml.response.txn_data.norgdtl.addr2);
			}
			else{
			  $('#nadd2').hide();
			}
			if(invocationResult.faml.response.txn_data.norgdtl.addr3!=''){
			$('#nadd3').show();
			$('#addr3').html(invocationResult.faml.response.txn_data.norgdtl.addr3);
			}
			else{
			  $('#nadd3').hide();
			}
			if(invocationResult.faml.response.txn_data.norgdtl.city!=''){
			$('#ncity').show();
			$('#city').html(invocationResult.faml.response.txn_data.norgdtl.city);
			}
			else{
			  $('#ncity').hide();
			}
			if(invocationResult.faml.response.txn_data.norgdtl.pincode!=''){
			$('#npin').show();
			$('#pincode').html(invocationResult.faml.response.txn_data.norgdtl.pincode);
			}
			else{
			  $('#npin').hide();
			}
			if(invocationResult.faml.response.txn_data.norgdtl.country!=''){
			$('#ncountry').show();
			$('#country').html(invocationResult.faml.response.txn_data.norgdtl.country);
			}
			else{
			  $('#ncountry').hide();
			}
			
			if(invocationResult.faml.response.txn_data.clikey!=''){
			$('#clikey').html (invocationResult.faml.response.txn_data.clikey);
			}
			else{
			 "-";
			}
			
			
			if(invocationResult.faml.response.txn_data.fhdldtl.clbranch!=''){
			$('#clbranch').html(invocationResult.faml.response.txn_data.fhdldtl.clbranch);
			}
			else{
			 "-";
			}
			
			if(invocationResult.faml.response.txn_data.fhdldtl.accttype!=''){
			$('#accttype').html(invocationResult.faml.response.txn_data.fhdldtl.accttype);
			}
			else{
			 "-";
			}
			
			if(invocationResult.faml.response.txn_data.fhdldtl.clshrtnm!=''){
			$('#clshrtnm').html(invocationResult.faml.response.txn_data.fhdldtl.clshrtnm);
			}
			else{
			 "-";
			}
			
			
			if(invocationResult.faml.response.txn_data.fhdldtl.acctcategory!=''){
			$('#acctcategory').html(invocationResult.faml.response.txn_data.fhdldtl.acctcategory);
			}
			else{
			 "-";
			}
			
			if(invocationResult.faml.response.txn_data.fhdldtl.dbbpid!=''){
			$('#dbbpid').html(invocationResult.faml.response.txn_data.fhdldtl.dbbpid);
			}
			else{
			 "-";
			}
			
			if(invocationResult.faml.response.txn_data.fhdldtl.acctstat!=''){
			$('#acctstat').html(invocationResult.faml.response.txn_data.fhdldtl.acctstat);
			}
			else{
			 "-";
			}
			
			
			if(invocationResult.faml.response.txn_data.fhdldtl.dbccid!=''){
			$('#dbccid').html(invocationResult.faml.response.txn_data.fhdldtl.dbccid);
			}
			else{
			 "-";
			}
			
			
			
			if(invocationResult.faml.response.txn_data.fhdldtl.acctclosedt!=''){
			$('#acctclosedt').html(invocationResult.faml.response.txn_data.fhdldtl.acctclosedt);
			}
			else{
			 "-";
			}
			
			
			if(invocationResult.faml.response.txn_data.fhdldtl.occupation!=''){
			$('#occupation').html(invocationResult.faml.response.txn_data.fhdldtl.occupation);
			}
			else{
			 "-";
			}
			
			
			if(invocationResult.faml.response.txn_data.stdinstr!=''){
			$('#stdinstr').html(invocationResult.faml.response.txn_data.stdinstr);
			}
			else{
			 "-";
			}
			
			
			if(invocationResult.faml.response.txn_data.fhdldtl.faxindemnity!=''){
			$('#faxindemnity').html(invocationResult.faml.response.txn_data.fhdldtl.faxindemnity);
			}
			else{
			 "-";
			}
			
			if(invocationResult.faml.response.txn_data.nomopted!=''){
			$('#nomopted').html(invocationResult.faml.response.txn_data.nomopted);
			}
			else{
			 "-";
			}
			
			
			if(invocationResult.faml.response.txn_data.divacctdtl.divbkinfo.drefinfo!=''){
			$('#drefinfo').html(invocationResult.faml.response.txn_data.divacctdtl.divbkinfo.drefinfo);
			}
			else{
			 "-";
			}
			
			
		   if(invocationResult.faml.response.txn_data.divacctdtl.dacctno!=''){
			$('#dacctno').html(invocationResult.faml.response.txn_data.divacctdtl.dacctno);
			}
			else{
			 "-";
			}
			
			
			if(invocationResult.faml.response.txn_data.divacctdtl.dacctno!=''){
			$('#dbkname').html(invocationResult.faml.response.txn_data.divacctdtl.divbkinfo.dbkname);
			}
			else{
			 "-";
			}
			
			if(invocationResult.faml.response.txn_data.divacctdtl.divbkinfo.dbrchname!=''){
			$('#branch').show();
			$('#dbrchname').html(invocationResult.faml.response.txn_data.divacctdtl.divbkinfo.dbrchname);}
			else{
			$('#branch').hide();
			}
			if(invocationResult.faml.response.txn_data.divacctdtl.divbkinfo.daddr1!=''){
			$('#add1').show();
			$('#daddr1').html(invocationResult.faml.response.txn_data.divacctdtl.divbkinfo.daddr1);
			}
			else{
			$('#add1').hide();
			}
			if(invocationResult.faml.response.txn_data.divacctdtl.divbkinfo.daddr2!=''){
			$('#add2').show();
			$('#daddr2').html(invocationResult.faml.response.txn_data.divacctdtl.divbkinfo.daddr2);
			}
			else{
			$('#add2').hide();
			}
			if(invocationResult.faml.response.txn_data.divacctdtl.divbkinfo.daddr3!=''){
			$('#add3').show();
			$('#daddr3').html(invocationResult.faml.response.txn_data.divacctdtl.divbkinfo.daddr3);
			}
			else{
			$('#add3').hide();
			}
			if(invocationResult.faml.response.txn_data.divacctdtl.divbkinfo.dcity!=''){
			$('#city').show();
			$('#dcity').html(invocationResult.faml.response.txn_data.divacctdtl.divbkinfo.dcity);
			}
			else{
			$('#city').hide();
			}
			if(invocationResult.faml.response.txn_data.divacctdtl.divbkinfo.dcountry!=''){
			$('#country').show();
			$('#dcountry').html(invocationResult.faml.response.txn_data.divacctdtl.divbkinfo.dcountry);
			}
			else{
			$('#country').hide();
			}
			
			
		   if(invocationResult.faml.response.txn_data.billacctdtl.billbkinfo.brefinfo!=''){
		 $('#brefinfo').html(invocationResult.faml.response.txn_data.billacctdtl.billbkinfo.brefinfo);
		 }
		  else{
			"-";
			}

		 
		 
		 
		  if(invocationResult.faml.response.txn_data.billacctdtl.bacctno!=''){
		 $('#bacctno').html(invocationResult.faml.response.txn_data.billacctdtl.bacctno);
		 }
		 else{
			"-";
			}
			
			  if(invocationResult.faml.response.txn_data.billacctdtl.billbkinfo.billbkname!=''){
		 $('#billbkname').html(invocationResult.faml.response.txn_data.billacctdtl.billbkinfo.billbkname);
		 }
		 else{
			"-";
			}
			
			if(invocationResult.faml.response.txn_data.nridtl.rbirefno!=''){
			$('#rbirefno').html(invocationResult.faml.response.txn_data.nridtl.rbirefno);
			}
		 else{
			"-";
			}
			
			if(invocationResult.faml.response.txn_data.nridtl.rbiapdt!=''){
			$('#rbiapdt').html(invocationResult.faml.response.txn_data.nridtl.rbiapdt);
			}
			else{
			"-";
			}
			$('#openacct').html(acopeningDate+"-"+mnth+"-"+acttime);
			busyInd.hide();
    	});
		    
    			
    		}else{
    			handleError(invocationResult.faml.response);
    			window.location ='#Demat';
    	
				busyInd.hide();
				}
    	        }
				}
			};
		
	   this.ClientPro= function(){
    	    	reqParams = {};
    	    	reqParams["fldDeviceId"] = fldDeviceId;
				reqParams["fldWebServerId"] = fldWebServerId;
				reqParams["fldAppId"] = "RS";
				reqParams["fldAppServerId"] = fldAppServerId;
				reqParams["fldLangId"] = fldLangId;
				reqParams["fldModule"] = "CH";
					reqParams["fldTxnId"] = "DPQ";
				reqParams["fldScrnSeqNbr"] = "02";
				reqParams["fldLogoffReq"] = "N";
				reqParams["fldSwitchAppId"] = "";
				reqParams["fldRoleId"] ="" ;
                
        		
				fldjsessionid = Regfldjsessionid;
		    	reqParams["fldLoginUserId"] =Regloginuid;
		    	
		    	reqParams["fldSessionId"] = Rsessionid;
		    	
				
				
    	    	busyInd.show();
    	    	var invocationData = {
    	    			adapter : "Demat",
    	        		procedure : "RRDPQ02",
    	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	    	};
    	    	
    	    	WL.Client.invokeProcedure(invocationData, {
    	    		onSuccess : rrdpq02Success,
    	    		onFailure : AdapterFail,	    		
    	    		timeout: timeout
    	    	});
    	    
        
    	    	
        };
		   rrdpq02Success = function(result){
	      
    	busyInd.hide();
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
			
		
	               				   
	           
			
						
    			$("#contentData").load("Views/Demat/rrdpq02.html", null, function (response, status, xhr) {
            if (status != "error") {}
			   
            ko.applyBindings(self, $(".dynamic-page-content").get(0));
			
    	});
    			
    		}else{
    			handleError(invocationResult.faml.response);
    			window.location ='#Demat';
    		
				}
    	        }
				}
			};

      
	  
	 //	Transaction Statement :
	 
	 
	 
	 this.TransactionStatement= function(){
    	    	reqParams = {};
    	    	reqParams["fldDeviceId"] = fldDeviceId;
				reqParams["fldWebServerId"] = fldWebServerId;
				reqParams["fldAppId"] = "RS";
				reqParams["fldAppServerId"] = fldAppServerId;
				reqParams["fldLangId"] = fldLangId;
				reqParams["fldModule"] = "CH";
					reqParams["fldTxnId"] = "DTS";
				reqParams["fldScrnSeqNbr"] = "01";
				reqParams["fldLogoffReq"] = "N";
				reqParams["fldSwitchAppId"] = "";
				reqParams["fldRoleId"] ="" ;
        		
    	    	
				fldjsessionid = Regfldjsessionid;
		    	reqParams["fldLoginUserId"] =Regloginuid;
		    
		    	reqParams["fldSessionId"] = Rsessionid;
		    	reqParams["fldRequestId"] =RegfldRequestId;
				
				
    	    	busyInd.show();
    	    	var invocationData = {
    	    			adapter : "Demat",
    	        		procedure : "RRDTS01",
    	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	    	};
    	    	
    	    	WL.Client.invokeProcedure(invocationData, {
    	    		onSuccess : rrdts01Success,
    	    		onFailure : AdapterFail,	    		
    	    		timeout: timeout
    	    	});
    	    
        
    	    	
        };
		rrdts01Success = function(result){
		    accountList.removeAll();
		    busyInd.hide();	
	    	invocationResult = result.invocationResult;
	    	if(invocationResult.isSuccessful){
	    	if(invocationResult.faml.response){
	    	//if(invocationResult.faml.response.rc.returncode=0){
			
			
			if(invocationResult.faml.response.txn_data == undefined){
			
			 	$("#contentData").load("Views/Demat/rrdts01.html", null, function (response, status, xhr) {
            if (status != "error") {}
            ko.applyBindings(self, $(".dynamic-page-content").get(0))
			 $('#transtat').hide();
					
					 $('#staticmsg').show();
			});
			
			
			}
			
			
			
			
			
			
			
			
			
			
			if (invocationResult.faml.response.txn_data!= undefined) {
			    txndata=invocationResult.faml.response.txn_data;
			acctdtl=invocationResult.faml.response.txn_data.acctdtl;
			
			
			 var idx = 1;
	    		$(acctdtl).each(function(index, obj) {
	    			strid = "item"+idx;
	    			
	    			
	    				 displaytxt = obj.dpid+"-"+obj.acctno;
	    			     accountValue = obj.dpid+"#"+obj.acctno;
						 
	    		    accountList.push({ strid:strid, displaytxt:displaytxt, accountValue: accountValue });
	    		    idx++;
	    		}); 
			
				$("#contentData").load("Views/Demat/rrdts01.html", null, function (response, status, xhr){
	    			if (status != "error") {}
	                ko.applyBindings(self, $(".dynamic-page-content").get(0));
		
			   	
					if(invocationResult.faml.response.txn_data!= undefined){
			        $('#transtat').show();
					 $('#staticmsg').hide();
			        }else{
				     $('#transtat').hide();
					 $('#staticmsg').show();
						
			}
				
             });
			
			}
			
	    						
	    		// }
				else{
				if( invocationResult.faml.response.rc!= undefined){
    			handleError(invocationResult.faml.response);
    			window.location ='#Demat';
    	
				}
				
    		}
	    	}	
	    	}	
	    	
		busyInd.hide();		
		
      };
	  
	 self.rrdts01submit= function(){
	   
	  var objs = document.getElementById('cmbAccount');
	document.getElementById('cmbAccount_txt').value = objs.options[objs.selectedIndex].innerHTML;
	document.getElementById('fldAcctNo_txt').value = objs.options[objs.selectedIndex].innerHTML;

	var fromdt = document.getElementById('fldFromDate').value
	var todt = document.getElementById('fldToDate').value
	
	var arrfromdt = fromdt.split('/');
	var arrtodt = todt.split('/');
	
	if(arrfromdt.length > 1){
		document.getElementById('datefldFromDate').value = arrfromdt[0];
		document.getElementById('monthfldFromDate').value = arrfromdt[1];
		document.getElementById('yearfldFromDate').value = arrfromdt[2];
	}else{
		document.getElementById('datefldFromDate').value = '';
		document.getElementById('monthfldFromDate').value = '';
		document.getElementById('yearfldFromDate').value = '';
	}
	
	if(arrtodt.length > 1){
		document.getElementById('datefldToDate').value = arrtodt[0];
		document.getElementById('monthfldToDate').value = arrtodt[1];
		document.getElementById('yearfldToDate').value = arrtodt[2];
	}else{
		document.getElementById('datefldToDate').value = '';
		document.getElementById('monthfldToDate').value = '';
		document.getElementById('yearfldToDate').value = '';
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
	
	document.getElementById('datefldFromDate_txt').value = document.getElementById('datefldFromDate').value	
	document.getElementById('datefldToDate_txt').value = document.getElementById('datefldToDate').value
	
	if(arrtodt.length > 1){
		document.getElementById('monthfldToDate_txt').value = month[document.getElementById('monthfldToDate').value]; 
	}
	
	if(arrfromdt.length > 1){
		document.getElementById('monthfldFromDate_txt').value = month[document.getElementById('monthfldFromDate').value]; 
	}
	
	document.getElementById('yearfldToDate_txt').value = document.getElementById('yearfldFromDate').value
	document.getElementById('yearfldFromDate_txt').value = document.getElementById('yearfldToDate').value
	   if($("#f1").valid()){
             fldtoacctno = self.fldToAcctNo();
    	     fldtoacctno = fldtoacctno.split('#');
	
                reqParams = {};
				reqParams["fldDeviceId"] = fldDeviceId;
				reqParams["fldWebServerId"] = fldWebServerId;
				reqParams["fldAppId"] = "RS";
				reqParams["fldAppServerId"] = fldAppServerId;
				reqParams["fldLangId"] = fldLangId;
			    reqParams["fldModule"] = "CH";
				reqParams["fldTxnId"] = "DTS";
				reqParams["fldScrnSeqNbr"] = "02";			
				reqParams["fldDpId"] = fldtoacctno[0];
				reqParams["fldAcctNo"] = fldtoacctno[1];
				reqParams["fldIntAcctNo"] = fldtoacctno[1];
			    reqParams["fldFrmDt"] =  $('#fldFromDate').val(); 
				reqParams["fldToDt"] =$('#fldToDate').val();
				reqParams["fldIsin"] =$('#fldIsin').val();
				var $form = $("#f1");
				rsaDataArray = $form.serializeArray();    	
								
				fldjsessionid = Regfldjsessionid;
		    	reqParams["fldLoginUserId"] =Regloginuid;
		    	reqParams["fldIdUser"] =Regloginuid;
		    	reqParams["fldSessionId"] = Rsessionid;
		    	reqParams["fldRequestId"] =RegfldRequestId;
		    	
		    	
				for (var i in rsaDataArray) {
					reqParams[rsaDataArray[i].name] = rsaDataArray[i].value;
				}
				
				reqParams["fldFCDBRequestId"] =Rsessionid;
			
		  
				
				
		        var ONE_DAY = 1000 * 60 * 60 * 24;
				tmpdt1 = $('#fldToDate').val();
				arrdt1 = tmpdt1.split('/');
				
				tmpdt2 = $('#fldFromDate').val();
				arrdt2 = tmpdt2.split('/');
				
                var date1 = new Date(arrdt1[2],arrdt1[1],arrdt1[0]);

              var date2 = new Date(arrdt2[2],arrdt2[1],arrdt2[0]);

                var date1_ms = date1.getTime();
              var date2_ms = date2.getTime();
          var difference_ms = Math.abs(date1_ms - date2_ms);

         var diff = Math.round(difference_ms/ONE_DAY);
        
          //var final = Math.round(diff/30);
              if(diff>10){
                 alert("Difference in date should be atmost 10 days.");
				return false;
                  }
		  
		  
		  
     
				busyInd.show();
				var invocationData = {
						adapter : "Demat",
						procedure : "RRDTS02",
						parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
				};
				WL.Client.invokeProcedure(invocationData, {
					onSuccess : rrdts01submitSuccess,
					onFailure : AdapterFail,	    		
					timeout: timeout
				});
				}
     };	 
		
		rrdts01submitSuccess = function(result){
		
		  
		
		
			  busyInd.hide();
	    	invocationResult = result.invocationResult;
	    	if(invocationResult.isSuccessful){
	    	if(invocationResult.faml.response){
	    	if(invocationResult.faml.response.rc.returncode==0){
			
			  
			 tmpmonthno=invocationResult.faml.response.txn_data.clidtl.frmdt.substring(4,6);
		formdate=invocationResult.faml.response.txn_data.clidtl.frmdt.substring(6,8);
		formdateperiod= invocationResult.faml.response.txn_data.clidtl.frmdt.substring(0,4);
		mnth = '';
		  		  if(tmpmonthno=='01'){
				        mnth = 'Jan';
				  }
				 
				  if(tmpmonthno=='02'){
				        mnth = 'Feb';
				  }
				   if(tmpmonthno=='03'){
				        mnth = 'Mar';
				  }
				   if(tmpmonthno=='04'){
				        mnth = 'Apr';
				  }
				   if(tmpmonthno=='05'){
				        mnth = 'May';
				  }
				   if(tmpmonthno=='06'){
				        mnth = 'Jun';
				  }
				   if(tmpmonthno=='07'){
				        mnth = 'July';
				  }
				  if(tmpmonthno=='08'){
				        mnth = 'Aug';
				  }
				  if(tmpmonthno=='09'){
				        mnth = 'Sep';
				  }
				  if(tmpmonthno=='10'){
				        mnth = 'Oct';
				  } 
				  if(tmpmonthno=='11'){
				        mnth = 'Nov';
				  }
				   if(tmpmonthno=='12'){
				        mnth = 'Dec';
				  }
			
			
			
			
			    todateformate=invocationResult.faml.response.txn_data.clidtl.todt.substring(4,6);
		todate=invocationResult.faml.response.txn_data.clidtl.todt.substring(6,8);
		todateperiod= invocationResult.faml.response.txn_data.clidtl.todt.substring(0,4);
		mnth = '';
		  		  if(todateformate=='01'){
				        mnth = 'Jan';
				  }
				 
				  if(todateformate=='02'){
				        mnth = 'Feb';
				  }
				   if(todateformate=='03'){
				        mnth = 'Mar';
				  }
				   if(todateformate=='04'){
				        mnth = 'Apr';
				  }
				   if(todateformate=='05'){
				        mnth = 'May';
				  }
				   if(todateformate=='06'){
				        mnth = 'Jun';
				  }
				   if(todateformate=='07'){
				        mnth = 'July';
				  }
				  if(todateformate=='08'){
				        mnth = 'Aug';
				  }
				  if(todateformate=='09'){
				        mnth = 'Sep';
				  }
				  if(todateformate=='10'){
				        mnth = 'Oct';
				  } 
				  if(todateformate=='11'){
				        mnth = 'Nov';
				  }
				   if(todateformate=='12'){
				        mnth = 'Dec';
								}
								
								
								
								
								
						
			   isindtl= invocationResult.faml.response.txn_data.soadtl.isindtl
			  // self.dematList(isindtl);
			    $(isindtl).each(function(index, obj) {
						isindtl1 = obj.isindtl1;
						// self.innerdata=ko.observableArray([]);
						$(isindtl1).each(function(index1, obj1) {
						// self.innerdata.push =({ txndt: obj1.txndt, txnrefno:
						// obj1.txnrefno, odpid:obj1.odpid,txndesc:obj1.txndesc,
						// txnqty:obj1.txnqty});
							txndt = obj1.txndt;
							txnrefno = obj1.txnrefno; 
							odpid =obj1.odpid;
							txndesc = obj1.txndesc;
							dorc=obj1.dorc
							txnqty =obj1.txnqty;
							
						});
				
							self.dematList.push({ acctdesc: obj.acctdesc, isincd: obj.isincd ,scriptp:obj.scriptp,coname:obj.coname,innerdata:obj.innerdata,txndt: txndt, txnrefno: txnrefno, odpid:odpid,txndesc:txndesc, txnqty:txnqty ,dorc:dorc});
						}); 
		     
			
			
			
			
	    		$("#contentData").load("Views/Demat/rrdts02.html", null, function (response, status, xhr){            
	    			if (status != "error") {}
	          if(invocationResult.faml.response.txn_data.msgcnt==0){
			   $('#exitmsg').show();
			   $('#statment').hide();
			  }
			  else{
			     $('#exitmsg').hide();
			   $('#statment').show();
			  }
			  
			
			  
			  
			  
			  
			  $('#clikey').html(invocationResult.faml.response.txn_data.clidtl.clikey.substring(0,8));
			  $('#acctno').html(invocationResult.faml.response.txn_data.clidtl.acctno);
			  $('#fhldnm').html(invocationResult.faml.response.txn_data.clidtl.fhldnm);
			  $('#period').html(formdate+"-"+mnth+"-"+formdateperiod+  "   To   "  +todate+"-"+mnth+"-"+todateperiod)
			
			
			   
			  
			  
			  ko.applyBindings(self, $(".dynamic-page-content").get(0)); 
			  busyInd.hide();
             });					
	    		}else{
    			handleError(invocationResult.faml.response);
    			window.location ='#Demat';
    			
				busyInd.hide();
				}
	    	}	
	    	}	
	    	
			busyInd.hide();	
		
      };
	  
	  this.TransactionStatmnt = function(){
	  reqParams = {};
	       
			 reqParams = {};
				reqParams["fldDeviceId"] = fldDeviceId;
				reqParams["fldWebServerId"] = fldWebServerId;
				reqParams["fldAppId"] = "RS";
				reqParams["fldAppServerId"] = fldAppServerId;
				reqParams["fldLangId"] = fldLangId;
			    reqParams["fldModule"] = "CH";
				reqParams["fldTxnId"] = "DTS";
				reqParams["fldScrnSeqNbr"] = "02";			
			
				fldjsessionid = Regfldjsessionid;
		    	reqParams["fldLoginUserId"] =Regloginuid;
		    	reqParams["fldIdUser"] =Regloginuid;
		    	reqParams["fldSessionId"] = Rsessionid;
		    	reqParams["fldRequestId"] =RegfldRequestId;
		    	
		    	
			
			busyInd.show();
			var invocationData = {
					adapter : "Demat",
					procedure : "RRDTS02",
					parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
			};
			WL.Client.invokeProcedure(invocationData, {
				onSuccess : rrdts02success,
				onFailure : AdapterFail,	    		
				timeout: timeout
			});
    };	
	rrdts02success = function(result){
			busyInd.hide();
	    	invocationResult = result.invocationResult;
			alert(invocationResult.faml.response.txn_data.clidtl.clikey);
	    	if(invocationResult.isSuccessful){
	    	if(invocationResult.faml.response){
	    	if(invocationResult.faml.response.rc.returncode=0){
			
			
	    		$("#contentData").load("Views/Demat/rrdts02.html", null, function (response, status, xhr){
	    			if (status != "error") {}
	                ko.applyBindings(self, $(".dynamic-page-content").get(0));
			         
	
             });					
	    		}else{
    			handleError(invocationResult.faml.response);
    			window.location ='#Demat';
    		
				}
	    	}	
	    	}	
	    	
			
		
      };
	  
	  //isin srch
	  
	 this.ISINSearch = function(){
    	    	reqParams = {};
    	    	reqParams["fldDeviceId"] = fldDeviceId;
				reqParams["fldWebServerId"] = fldWebServerId;
				reqParams["fldAppId"] = "RS";
				reqParams["fldAppServerId"] = fldAppServerId;
				reqParams["fldLangId"] = fldLangId;
				reqParams["fldModule"] = "CH";
				reqParams["fldTxnId"] = "DIQ";
				reqParams["fldScrnSeqNbr"] = "01";
				reqParams["fldLogoffReq"] = "N";
				reqParams["fldSwitchAppId"] = "";
				reqParams["fldRoleId"] ="" ;
			
        		
    	    	
				fldjsessionid = Regfldjsessionid;
		    	reqParams["fldLoginUserId"] =Regloginuid;
		    
		    	reqParams["fldSessionId"] = Rsessionid;
		    	reqParams["fldRequestId"] =RegfldRequestId;
				
    	    	busyInd.show();
    	    	var invocationData = {
    	    			adapter : "Demat",
    	        		procedure : "RRDIQ01",
    	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	    	};
    	    	
    	    	WL.Client.invokeProcedure(invocationData, {
    	    		onSuccess : rrdiq01Success,
    	    		onFailure : AdapterFail,	    		
    	    		timeout: timeout
    	    	});
    	    
        
    	    	
        };
		rrdiq01Success = function(result){
			
	    	invocationResult = result.invocationResult;
	    	if(invocationResult.isSuccessful){
	    	if(invocationResult.faml.response){
	    	//if(invocationResult.faml.response.rc.returncode=0){
			
			if(invocationResult.faml.response.txn_data == undefined){
			
			 	$("#contentData").load("Views/Demat/rrdiq01.html", null, function (response, status, xhr) {
            if (status != "error") {}
            ko.applyBindings(self, $(".dynamic-page-content").get(0))
			 $('#isin').hide();
					
					 $('#staticmsg').show();
			});
			
			
			}
			
			
	
			
			   if (invocationResult.faml.response.txn_data!= undefined) {
			    txndata=invocationResult.faml.response.txn_data;
			 acctdtl=invocationResult.faml.response.txn_data.acctdtl;
			
			
			 var idx = 1;
	    		$(acctdtl).each(function(index, obj) {
	    			strid = "item"+idx;
	    			
	    			
	    				 displaytxt = obj.dpid+"-"+obj.acctno;
	    			     accountValue = obj.dpid+"#"+obj.acctno;
						 
	    		    accountList.push({ strid:strid, displaytxt:displaytxt, accountValue: accountValue });
	    		    idx++;
	    		}); 
				
				$("#contentData").load("Views/Demat/rrdiq01.html", null, function (response, status, xhr){
	    			if (status != "error") {}
	                ko.applyBindings(self, $(".dynamic-page-content").get(0));
			         	if(invocationResult.faml.response.txn_data!= undefined){
			        $('#isin').show();
					 $('#staticmsg').hide();
			}else{
				  $('#isin').hide();
					 $('#staticmsg').show();
						
			}
	          
             });
				
			}
	    							
	    		//}
				else{
				if( invocationResult.faml.response.rc!= undefined){
    			handleError(invocationResult.faml.response);
    			window.location ='#Demat';
    			
				}
				
    		}
	    	}	
	    	}	
	    	
			
		 busyInd.hide();
      };
	   
	   
	   self.rrdiq01submit = function(){
	   
    if($("#f1").valid()){
      
			
    reqParams = {};
				reqParams["fldDeviceId"] = fldDeviceId;
				reqParams["fldWebServerId"] = fldWebServerId;
				reqParams["fldAppId"] = "RS";
				reqParams["fldAppServerId"] = fldAppServerId;
				reqParams["fldLangId"] = fldLangId;
			    reqParams["fldModule"] = "CH";
				reqParams["fldTxnId"] = "DIQ";
				reqParams["fldScrnSeqNbr"] = "02"				
				reqParams["fldDpId"] = "";
				reqParams["fldAcctNo"] ="";
				reqParams["fldIntAcctNo"] ="" ;
				reqParams["fldCoName"] = $('#fldCoName').val(); 
				reqParams["fldIsin"] = $('#fldIsin').val(); 
				
				
			
			
				fldjsessionid = Regfldjsessionid;
		    	reqParams["fldLoginUserId"] =Regloginuid;
		    	reqParams["fldIdUser"] =Regloginuid;
		    	reqParams["fldSessionId"] = Rsessionid;
		    	reqParams["fldRequestId"] =RegfldRequestId;
				
				busyInd.show();
				var invocationData = {
						adapter : "Demat",
						procedure : "RRDIQ02",
						parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
				};
				WL.Client.invokeProcedure(invocationData, {
					onSuccess : rrdiq01submitSuccess,
					onFailure : AdapterFail,	    		
					timeout: timeout
				});
				}
			};
			
	rrdiq01submitSuccess = function(result){
	       
    	
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		if(invocationResult.faml.response.rc.returncode == 0){
			if(invocationResult.faml.response.txn_data!=undefined){
			txn_data=invocationResult.faml.response.txn_data
			isindtl=invocationResult.faml.response.txn_data.isindtl;
			 if(invocationResult.faml.response.txn_data.qrycnt > 1){
					 $('#isinsrch' ).show();
					 //ccaccountList(isindtl);
					 
			var idx = 1;
	    		$(isindtl).each(function(index, obj) {
	    			strid = "item"+idx;
	    			
					
	   ccaccountList.push({ strid:strid,
	                    mktdt:getFormattedDate(obj.mktdt),
	                    ubpadd1:obj.ubpadd1,
                        shrtnm:obj.shrtnm,
                        ubpadd3:obj.ubpadd3,
                        ubpadd2:obj.ubpadd2,
                        ubpfaxno:obj.ubpfaxno, 
                        shregnm:obj.shregnm, 
                        ubpadd4:obj.ubpadd4, 
                        shregcd:obj.shregcd, 
                        ubpphone:obj.ubpphone, 
                        mktrate:obj.mktrate, 
                        ubppin:obj. ubppin,
                        isinstat:obj.isinstat, 
                        isin:obj.isin, 
                        coname:obj.coname, 
	
					 });
	    		    idx++;
	    		}); 

	 
					 
			
					 
			 } 
			if(invocationResult.faml.response.txn_data.qrycnt==1){
			  $('#isndtls').show();
		  
	    tmpmonthno=invocationResult.faml.response.txn_data.isindtl.mktdt.substring(4,6);
		holdingdate1=invocationResult.faml.response.txn_data.isindtl.mktdt.substring(6,8);
		acttime = invocationResult.faml.response.txn_data.isindtl.mktdt.substring(0,4);
		mnth = '';
		  		  if(tmpmonthno=='01'){
				        mnth = 'Jan';
				  }
				 
				  if(tmpmonthno=='02'){
				        mnth = 'Feb';
				  }
				   if(tmpmonthno=='03'){
				        mnth = 'Mar';
				  }
				   if(tmpmonthno=='04'){
				        mnth = 'Apr';
				  }
				   if(tmpmonthno=='05'){
				        mnth = 'May';
				  }
				   if(tmpmonthno=='06'){
				        mnth = 'Jun';
				  }
				   if(tmpmonthno=='07'){
				        mnth = 'July';
				  }
				  if(tmpmonthno=='08'){
				        mnth = 'Aug';
				  }
				  if(tmpmonthno=='09'){
				        mnth = 'Sep';
				  }
				  if(tmpmonthno=='10'){
				        mnth = 'Oct';
				  } 
				  if(tmpmonthno=='11'){
				        mnth = 'Nov';
				  }
				   if(tmpmonthno=='12'){
				        mnth = 'Dec';
				  }
			}
			
			
			   
			
				if(invocationResult.faml.response.txn_data.qrycnt < invocationResult.faml.response.txn_data.msgcnt){
			 $("#msg").show();
			}
			
			
			
			
			
			
			}
			
		
			
				$("#contentData").load("Views/Demat/rrdiq02.html", null, function (response, status, xhr) {
            if (status != "error") {}
			   
            ko.applyBindings(self, $(".dynamic-page-content").get(0));
			if(invocationResult.faml.response.txn_data!=undefined){
				if(invocationResult.faml.response.txn_data.qrycnt > 1){
						$('#isinsrch' ).show();
					}
			else {
				if(invocationResult.faml.response.txn_data.qrycnt==1){
					$('#isndtls').show();
					  $('#isin').html(invocationResult.faml.response.txn_data.isindtl.isin);
					  $('#coname').html(invocationResult.faml.response.txn_data.isindtl.coname);
					  $('#shrtnm').html(invocationResult.faml.response.txn_data.isindtl.shrtnm);
					  $('#mktrate').html(invocationResult.faml.response.txn_data.isindtl.mktrate);
					  $('#shregcd').html(invocationResult.faml.response.txn_data.isindtl.shregcd);
					  $('#shregnm').html(invocationResult.faml.response.txn_data.isindtl.shregnm);
					  $('#ubpadd1').html(invocationResult.faml.response.txn_data.isindtl.ubpadd1);
					  $('#ubpadd2').html(invocationResult.faml.response.txn_data.isindtl.ubpadd2);
					  $('#ubpadd3').html(invocationResult.faml.response.txn_data.isindtl.ubpadd3);
					  $('#ubpadd4').html(invocationResult.faml.response.txn_data.isindtl.ubpadd4);
					  $('#ubppin').html(invocationResult.faml.response.txn_data.isindtl.ubppin);
					  $('#ubpphone').html(invocationResult.faml.response.txn_data.isindtl.ubpphone);
					  $('#ubpfaxno').html(invocationResult.faml.response.txn_data.isindtl.ubpfaxno);
					  $('#marketdate').html(holdingdate1+"-"+mnth+"-"+acttime);
			 }}
			 }
			 else{
			  $('#errormsg').show();
			 }
			  busyInd.hide();
    	});
    			
    		}else{
    			handleError(invocationResult.faml.response);
    			window.location ='#Demat';
    		
				busyInd.hide();
				}
    	        }
				}
			};
		
		
		this.ISINSrch= function(){
		  	
			reqParams = {};
			reqParams["fldDeviceId"] = fldDeviceId;
			reqParams["fldWebServerId"] = fldWebServerId;
			reqParams["fldAppId"] = "RS";
			reqParams["fldAppServerId"] = fldAppServerId;
			reqParams["fldLangId"] = fldLangId;
			reqParams["fldModule"] = "";
			
			reqParams["fldTxnId"] = "DIQ";
			reqParams["fldScrnSeqNbr"] = "02";
			
		
			fldjsessionid = Regfldjsessionid;
	    	reqParams["fldLoginUserId"] =Regloginuid;
	    
	    	reqParams["fldSessionId"] = Rsessionid;
	    
			
			
			busyInd.show();
			var invocationData = {
					adapter : "Demat",
					procedure : "RRDIQ02",
					parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
			};
			WL.Client.invokeProcedure(invocationData, {
				onSuccess : rrdiq02success,
				onFailure : AdapterFail,	    		
				timeout: timeout
			});
			
			
		};
		rrdiq02success= function(result){
			busyInd.hide();
	    	invocationResult = result.invocationResult;
	    	if(invocationResult.isSuccessful){
	    	if(invocationResult.faml.response){
	    	if(invocationResult.faml.response.rc.returncode==0){
	    		$("#contentData").load("Views/Demat/rrdiq02.html", null, function (response, status, xhr){
	    			if (status != "error") {}
	                ko.applyBindings(self, $(".dynamic-page-content").get(0));
					
             });					
	    		}else{
    			handleError(invocationResult.faml.response);
    			window.location ='#Demat';
    			
				}
	    	}	
	    	}	
	    	
			
		
      };
	 
	 //SettlementCalendar

	
   this.SettlementCalendar= function(){
    	    	reqParams = {};
    	    	reqParams["fldDeviceId"] = fldDeviceId;
				reqParams["fldWebServerId"] = fldWebServerId;
				reqParams["fldAppId"] = "RS";
				reqParams["fldAppServerId"] = fldAppServerId;
				reqParams["fldLangId"] = fldLangId;
				reqParams["fldModule"] = "CH";
				reqParams["fldTxnId"] = "DCQ";
				reqParams["fldScrnSeqNbr"] = "01";
				reqParams["fldLogoffReq"] = "N";
				reqParams["fldSwitchAppId"] = "";
				reqParams["fldRoleId"] ="" ;
        		
    	    	
				fldjsessionid = Regfldjsessionid;
		    	reqParams["fldLoginUserId"] =Regloginuid;

		    	reqParams["fldSessionId"] = Rsessionid;
		    	reqParams["fldRequestId"] =RegfldRequestId;
				
    	    	busyInd.show();
    	    	var invocationData = {
    	    			adapter : "Demat",
    	        		procedure : "RRDCQ01",
    	        		parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
    	    	};
    	    	
    	    	WL.Client.invokeProcedure(invocationData, {
    	    		onSuccess : rrdcq01Success,
    	    		onFailure : AdapterFail,	    		
    	    		timeout: timeout
    	    	});
    	    
        
    	    	
        };
		rrdcq01Success = function(result){
			
	    	invocationResult = result.invocationResult;
	    	if(invocationResult.isSuccessful){
	    	if(invocationResult.faml.response){
	    	//if(invocationResult.faml.response.rc.returncode==0){
			
			
			if(invocationResult.faml.response.txn_data == undefined){
			
			 	$("#contentData").load("Views/Demat/rrdcq01.html", null, function (response, status, xhr) {
            if (status != "error") {}
            ko.applyBindings(self, $(".dynamic-page-content").get(0))
			 $('#stalmntclnder').hide();
					
					 $('#staticmsg').show();
			});
			
			
			}
			
			
			
			
			
			
			
			
			 if (invocationResult.faml.response.txn_data!= undefined) {
			   txndata=invocationResult.faml.response.txn_data;
			  acctdtl=invocationResult.faml.response.txn_data.acctdtl;
			
			
			 var idx = 1;
	    		$(acctdtl).each(function(index, obj) {
	    			strid = "item"+idx;
	    			
	    			
	    				 displaytxt = obj.dpid+"-"+obj.acctno;
	    			     accountValue = obj.dpid+"#"+obj.acctno;
						 
	    		    accountList.push({ strid:strid, displaytxt:displaytxt, accountValue: accountValue });
	    		    idx++;
	    		}); 
				
				$("#contentData").load("Views/Demat/rrdcq01.html", null, function (response, status, xhr){
	    			if (status != "error") {}
	                ko.applyBindings(self, $(".dynamic-page-content").get(0));
			if(invocationResult.faml.response.txn_data!= undefined){
			        $('#stalmntclnder').show();
					 $('#staticmsg').hide();
			}else{
				    $ ('#stalmntclnder').hide();
					 $('#staticmsg').show();
						
			}
			  
             });
				
				
				
			}
	    							
	    	 // }
			 else{
				if( invocationResult.faml.response.rc!= undefined){
    			handleError(invocationResult.faml.response);
    			window.location ='#Demat';
    		
				}
				
    		}
	    	}	
	    	}	
	    	
			
		 busyInd.hide(); 
      };
	self.rrdcq01submit = function(){
	
	var objsel = document.getElementById('cmbCcId');
	document.getElementById('cmbCcId_txt').value = objsel.options[objsel.selectedIndex].innerHTML;
	
	var objsel1 = document.getElementById('cmbMkTtp');
	document.getElementById('cmbMkTtp_txt').value = objsel1.options[objsel1.selectedIndex].innerHTML;
	
	var fromdt = document.getElementById('fldFromDate').value
	var todt = document.getElementById('fldToDate').value
	
	var arrfromdt = fromdt.split('/');
	var arrtodt = todt.split('/');
	
	if(arrfromdt.length > 1){
		document.getElementById('datefldEffDate').value = arrfromdt[0];
		document.getElementById('monthfldEffDate').value = arrfromdt[1];
		document.getElementById('yearfldEffDate').value = arrfromdt[2];
	}else{
		document.getElementById('datefldEffDate').value = '';
		document.getElementById('monthfldEffDate').value = '';
		document.getElementById('yearfldEffDate').value = '';
	}
	
	if(arrtodt.length > 1){
		document.getElementById('datefldEfftDate').value = arrtodt[0];
		document.getElementById('monthfldEfftDate').value = arrtodt[1];
		document.getElementById('yearfldEfftDate').value = arrtodt[2];
	}else{
		document.getElementById('datefldEfftDate').value = '';
		document.getElementById('monthfldEfftDate').value = '';
		document.getElementById('yearfldEfftDate').value = '';
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
	
	document.getElementById('datefldEffDate_txt').value = document.getElementById('datefldEffDate').value	
	document.getElementById('datefldEfftDate_txt').value = document.getElementById('datefldEfftDate').value
	
	if(arrtodt.length > 1){
		document.getElementById('monthfldEfftDate_txt').value = month[document.getElementById('monthfldEfftDate').value]; 
	}
	
	if(arrfromdt.length > 1){
		document.getElementById('monthfldEffDate_txt').value = month[document.getElementById('monthfldEffDate').value]; 
	}
	
	document.getElementById('yearfldEfftDate_txt').value = document.getElementById('yearfldEfftDate').value
	document.getElementById('yearfldEffDate_txt').value = document.getElementById('yearfldEffDate').value
    if($("#f1").valid()){
			    
                reqParams = {};
				reqParams["fldDeviceId"] = fldDeviceId;
				reqParams["fldWebServerId"] = fldWebServerId;
				reqParams["fldAppId"] = "RS";
				reqParams["fldAppServerId"] = fldAppServerId;
				reqParams["fldLangId"] = fldLangId;
			    reqParams["fldModule"] = "CH";
				reqParams["fldTxnId"] = "DCQ";
				reqParams["fldScrnSeqNbr"] = "02";
			    reqParams["fldSetlNo"] = "ALL";
				reqParams["cmbMkTtp"] ="01";
				reqParams["cmbCcId"] =$('#cmbCcId').val();
				reqParams["datefldEffDate"]=$('#datefldEffDate').val();
				reqParams["monthfldEffDate"]=$('#monthfldEffDate').val();
				reqParams["yearfldEffDate"]=$('#yearfldEffDate').val();
				reqParams["datefldEfftDate"]=$('#datefldEfftDate').val();
				reqParams["monthfldEfftDate"]=$('#monthfldEfftDate').val();
				reqParams["yearfldEfftDate"]=$('#yearfldEfftDate').val();
				reqParams["fldFromDate"]=$('#fldFromDate').val();
				reqParams["fldToDate"]=$('#fldToDate').val();
				
				fldjsessionid = Regfldjsessionid;
		    	reqParams["fldLoginUserId"] =Regloginuid;
		    	reqParams["fldIdUser"] =Regloginuid;
		    	reqParams["fldSessionId"] = Rsessionid;
		    	reqParams["fldRequestId"] =RegfldRequestId;
				
	//cmbCcId=IN001060&cmbMkTtp=01&fldSetlNo=ALL&datefldEffDate=06&monthfldEffDate=11&yearfldEffDate=2013&datefldEfftDate=18&monthfldEfftDate=02&yearfldEfftDate=2014&fldAppId=RS&fldTxnId=DCQ&fldScrnSeqNbr=02&fldSessionId=1980018751PJQOPPFC&fldRequestId=1980018751PJQOPPFC115036683RE&fldEfftDt=18%2F02%2F2014&fldEffDt=06%2F11%2F2013&fldMkTtp=01&fldCcId=IN001060			
				
				
		        var $form = $("#f1");
				rsaDataArray = $form.serializeArray();    	
								
			
				for (var i in rsaDataArray) {
					reqParams[rsaDataArray[i].name] = rsaDataArray[i].value;
				}
				
				reqParams["fldFCDBRequestId"] =Rsessionid;
			    reqParams["fldEfftDt"]=$('#fldToDate').val();
			    reqParams["fldEffDt"]=$('#fldFromDate').val();
				 reqParams["fldMkTtp"]=$('#cmbMkTtp').val();
                reqParams["fldCcId"]=$('#cmbCcId').val();
			
				
				busyInd.show();
				var invocationData = {
						adapter : "Demat",
						procedure : "RRDCQ02",
						parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
				};
				WL.Client.invokeProcedure(invocationData, {
					onSuccess : rrdcq01submitSuccess,
					onFailure : AdapterFail,	    		
					timeout: timeout
				});
				}
			};
			

	  
	  rrdcq01submitSuccess = function(result){
			 SettlementList.removeAll();
			 
	    	invocationResult = result.invocationResult;
				if(invocationResult.isSuccessful){
				if(invocationResult.faml.response){
				if(invocationResult.faml.response.rc.returncode == 0){
				if(invocationResult.faml.response.txn_data!=undefined){
				if(invocationResult.faml.response.txn_data.ccid!=undefined){
				
                mkttpdtl=invocationResult.faml.response.txn_data.ccid.mkttpdtl;
			 
			    $(mkttpdtl).each(function(index, obj) {
                      setlnodtl= obj.setlnodtl;
					   $(setlnodtl).each(function (index1, obj1) {
                            payindt = getFormattedDate(obj1.payindt);
                            stlenddt = getFormattedDate(obj1.stlenddt);
                            stlstartdt = getFormattedDate(obj1.stlstartdt);
                            payoutdt = getFormattedDate(obj1.payoutdt);
                            setlno = obj1.setlno;
                            nsdlpayindt = getFormattedDate(obj1.nsdlpayindttm);
                            nsdlpayintm = getFormattedTime(obj1.nsdlpayindttm);
                                    
                            SettlementList.push({
                               mkttp: obj.mkttp,
                               mkttpdesc: obj.mkttpdesc,
                               cciddesc: obj.cciddesc,
                               ccidcd: obj.ccidcd,
                               stlstartdt: stlstartdt,
                               stlenddt: stlenddt,
                               nsdlpayindt: nsdlpayindt,
                               nsdlpayintm: nsdlpayintm,
                               payoutdt: payoutdt,
                               setlno: setlno,
                               payindt: payindt
                            });
                         });
			        });
					}
	    		}
				
				}else{
    			handleError(invocationResult.faml.response);
    			window.location ='#Demat';
    		
				
				}
	    	}	
	    	}	
	    	
			$("#contentData").load("Views/Demat/rrdcq02.html", null, function (response, status, xhr){
	    			if (status != "error") {}
	                ko.applyBindings(self, $(".dynamic-page-content").get(0));
					
					
				if(invocationResult.faml.response.rc.errorcode != "0000" && invocationResult.faml.response.rc.errorcode != ""){
				 $("#errormessage").show();
				 $("#msg2").html(invocationResult.faml.response.rc.errormessage);
				}
				if(invocationResult.faml.response.rc.errorcode == "0000" || invocationResult.faml.response.rc.errorcode == ""){
				
				 $("#statlmentcalender").show();
				}
					
					
				if(invocationResult.faml.response.txn_data!=undefined){
				if(invocationResult.faml.response.txn_data.ccid!=undefined){
				$('#Clearing').html(invocationResult.faml.response.txn_data.ccid.ccidcd+"-"+invocationResult.faml.response.txn_data.ccid.cciddesc);
				}
				
				if(invocationResult.faml.response.txn_data.qrycnt > invocationResult.faml.response.txn_data.msgcnt){
				  $("#msg").show();
				  
                 }	
                else{
				 
				  $("#msg").hide(); 
				  
                 }	
		      }
			    			
	             
             });
		busyInd.hide();
      };
	 
	  this.SettlementCalendarmster = function(){
		  
			reqParams = {};
			reqParams["fldDeviceId"] = fldDeviceId;
			reqParams["fldWebServerId"] = fldWebServerId;
			reqParams["fldAppId"] = "RS";
			reqParams["fldAppServerId"] = fldAppServerId;
			reqParams["fldLangId"] = fldLangId;
			reqParams["fldModule"] = "";
			
			reqParams["fldTxnId"] = "DCQ";
			reqParams["fldScrnSeqNbr"] = "02";
			
			
			
			fldjsessionid = Regfldjsessionid;
	    	reqParams["fldLoginUserId"] =Regloginuid;
	    	reqParams["fldIdUser"] =Regloginuid;
	    	reqParams["fldSessionId"] = Rsessionid;
	
			
			busyInd.show();
			var invocationData = {
					adapter : "Demat",
				    procedure:"RRDCQ02",
				
					parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
			};
			WL.Client.invokeProcedure(invocationData, {
				onSuccess : rrdcq02success,
				onFailure : AdapterFail,	    		
				timeout: timeout
			});
			
			
		};
		rrdcq02success = function(result){
			busyInd.hide();
	    	invocationResult = result.invocationResult;
	    	if(invocationResult.isSuccessful){
	    	if(invocationResult.faml.response){
	    	if(invocationResult.faml.response.rc.returncode=0){
			
	    		$("#contentData").load("Views/Demat/rrdcq02.html", null, function (response, status, xhr){
	    			if (status != "error") {}
	                ko.applyBindings(self, $(".dynamic-page-content").get(0));
					
             });					
	    		}else{
    			handleError(invocationResult.faml.response);
    			window.location ='#Demat';
    			
				}
	    	}	
	    	}	
	    	
			
		
      };
	  
	//dematstatus  
	  
	  this.Dematstatus = function(){
			  
				reqParams = {};
				reqParams["fldDeviceId"] = fldDeviceId;
				reqParams["fldWebServerId"] = fldWebServerId;
				reqParams["fldAppId"] = "RS";
				reqParams["fldAppServerId"] = fldAppServerId;
				reqParams["fldLangId"] = fldLangId;
				reqParams["fldModule"] = "CH";
				reqParams["fldTxnId"] = "DMQ";
				reqParams["fldScrnSeqNbr"] = "01";
				reqParams["fldRoleId"] = "";
				
				fldjsessionid = Regfldjsessionid;
		    	reqParams["fldLoginUserId"] =Regloginuid;
		    
		    	reqParams["fldSessionId"] = Rsessionid;
		    	reqParams["fldRequestId"] =RegfldRequestId;
				
				
				busyInd.show();
				var invocationData = {
						adapter : "Demat",
						procedure :"RRDMQ01",
						parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
				};
				//WL.Logger.debug(invocationData, '');
				WL.Client.invokeProcedure(invocationData, {
					onSuccess : rrdmq01Success,
					onFailure : AdapterFail,	    		
					timeout: timeout
				});
				
			};
			
		rrdmq01Success = function(result){
		accountList.removeAll();
    	invocationResult = result.invocationResult;
    	if(invocationResult.isSuccessful) {
    		if(invocationResult.faml.response){	
    		//if(invocationResult.faml.response.rc.returncode == 0){
			
			if(invocationResult.faml.response.txn_data == undefined){
			
			 	$("#contentData").load("Views/Demat/rrdmq01.html", null, function (response, status, xhr) {
            if (status != "error") {}
            ko.applyBindings(self, $(".dynamic-page-content").get(0))
			 $('#dematsts').hide();
					
					 $('#staticmsg').show();
			});
			
			
			}
			
			
			
			
			
			
	
			
			
			if (invocationResult.faml.response.txn_data!= undefined) {
			    txndata=invocationResult.faml.response.txn_data;
				acctdtl=invocationResult.faml.response.txn_data.acctdtl;
			
			
			 var idx = 1;
	    		$(acctdtl).each(function(index, obj) {
	    			strid = "item"+idx;
	    			
	    			
	    				 displaytxt = obj.dpid+"-"+obj.acctno;
	    			     accountValue = obj.dpid+"#"+obj.acctno;
						 
	    		    accountList.push({ strid:strid, displaytxt:displaytxt, accountValue: accountValue });
	    		    idx++;
	    		}); 

      $("#contentData").load("Views/Demat/rrdmq01.html", null, function (response, status, xhr) {
            if (status != "error") {}
            ko.applyBindings(self, $(".dynamic-page-content").get(0));
			if(invocationResult.faml.response.txn_data!= undefined){
			        $('#dematsts').show();
					 $('#staticmsg').hide();
			}else{
				    $('#dematsts').hide();
					 $('#staticmsg').show();
						
			}
			
    	});
				
       }				
    			
    			
    		//}
			else{
				if( invocationResult.faml.response.rc!= undefined){
    			handleError(invocationResult.faml.response);
    			window.location ='#Demat';
    			
				}
				
    		}
    		}
    	}
		 busyInd.hide();
			};
			
		
    self.rrdmq01submit= function(){
	
	var objs = document.getElementById('cmbAccount');
	document.getElementById('cmbAccount_txt').value = objs.options[objs.selectedIndex].innerHTML;

	var fromdt = document.getElementById('fldFromDate').value
	var todt = document.getElementById('fldToDate').value
	
	var arrfromdt = fromdt.split('/');
	var arrtodt = todt.split('/');
	
	if(arrfromdt.length > 1){
		document.getElementById('datefldFromDate').value = arrfromdt[0];
		document.getElementById('monthfldFromDate').value = arrfromdt[1];
		document.getElementById('yearfldFromDate').value = arrfromdt[2];
	}else{
		document.getElementById('datefldFromDate').value = '';
		document.getElementById('monthfldFromDate').value = '';
		document.getElementById('yearfldFromDate').value = '';
	}
	
	if(arrtodt.length > 1){
		document.getElementById('datefldToDate').value = arrtodt[0];
		document.getElementById('monthfldToDate').value = arrtodt[1];
		document.getElementById('yearfldToDate').value = arrtodt[2];
	}else{
		document.getElementById('datefldToDate').value = '';
		document.getElementById('monthfldToDate').value = '';
		document.getElementById('yearfldToDate').value = '';
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
	
	document.getElementById('datefldFromDate_txt').value = document.getElementById('datefldFromDate').value	
	document.getElementById('datefldToDate_txt').value = document.getElementById('datefldToDate').value
	
	if(arrtodt.length > 1){
		document.getElementById('monthfldToDate_txt').value = month[document.getElementById('monthfldToDate').value]; 
	}
	
	if(arrfromdt.length > 1){
		document.getElementById('monthfldFromDate_txt').value = month[document.getElementById('monthfldFromDate').value]; 
	}
	
	document.getElementById('yearfldToDate_txt').value = document.getElementById('yearfldFromDate').value
	document.getElementById('yearfldFromDate_txt').value = document.getElementById('yearfldToDate').value
	
    if($("#f2").valid()){
             fldtoacctno = self.fldToAcctNo();
    	     fldtoacctno = fldtoacctno.split('#');
	
    reqParams = {};
				reqParams["fldDeviceId"] = fldDeviceId;
				reqParams["fldWebServerId"] = fldWebServerId;
				reqParams["fldAppId"] = "RS";
				reqParams["fldAppServerId"] = fldAppServerId;
				reqParams["fldLangId"] = fldLangId;
			    reqParams["fldModule"] = "CH";
				reqParams["fldTxnId"] = "DMQ";
				reqParams["fldScrnSeqNbr"] = "02";			
				reqParams["fldDpId"] = fldtoacctno[0];
				reqParams["fldAcctNo"] = fldtoacctno[1];
				reqParams["cmbAccount"] = fldtoacctno[0];
				reqParams["fldFrmDt"] = $('#fldFromDate').val();
				reqParams["fldToDt"] = $('#fldToDate').val();
				reqParams["fldIsin"] = $('#fldIsin').val();
				reqParams["fldDrnNo"] = $('#fldDrnNo').val();
				reqParams["datefldFromDate"] = $('#datefldFromDate').val();
				reqParams["monthfldFromDate"] = $('#monthfldFromDate').val();
				reqParams["yearfldFromDate"] = $('#yearfldFromDate').val();
				reqParams["datefldToDate"] = $('#datefldToDatet').val();
				reqParams["monthfldToDate"] = $('#monthfldToDate').val();
				reqParams["yearfldToDate"] = $('#yearfldToDate').val();
				fldjsessionid = Regfldjsessionid;
		    	reqParams["fldLoginUserId"] =Regloginuid;
		    	reqParams["fldIdUser"] =Regloginuid;
		    	reqParams["fldSessionId"] = Rsessionid;
		    	reqParams["fldRequestId"] =RegfldRequestId;
				
				
		  var $form = $("#f1");
				rsaDataArray = $form.serializeArray();    	
				
				for (var i in rsaDataArray) {
					reqParams[rsaDataArray[i].name] = rsaDataArray[i].value;
				}
				
				reqParams["fldFCDBRequestId"] =Rsessionid;
				
				// for date diff
				var ONE_DAY = 1000 * 60 * 60 * 24;
				tmpdt1 = $('#fldToDate').val();
				arrdt1 = tmpdt1.split('/');
				
				tmpdt2 = $('#fldFromDate').val();
				arrdt2 = tmpdt2.split('/');
				
                var date1 = new Date(arrdt1[2],arrdt1[1],arrdt1[0]);

              var date2 = new Date(arrdt2[2],arrdt2[1],arrdt2[0]);

                var date1_ms = date1.getTime();
              var date2_ms = date2.getTime();
          var difference_ms = Math.abs(date1_ms - date2_ms);

         var diff = Math.round(difference_ms/ONE_DAY);
       
          //var final = Math.round(diff/30);
              if(diff>40){
                 alert("Difference in date should be atmost 40 days.");
				return false;
                  }
		    
				

				busyInd.show();
				var invocationData = {
						adapter : "Demat",
						procedure : "RRDMQ02",
						parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
				};
				//WL.Logger.debug(invocationData, '');
				WL.Client.invokeProcedure(invocationData, {
					onSuccess : rrdmq01submitSuccess,
					onFailure : AdapterFail,	    		
					timeout: timeout
				});
				}
			};
			rrdmq01submitSuccess = function(result){
	    	invocationResult = result.invocationResult;
	    	if(invocationResult.isSuccessful){
	    	if(invocationResult.faml.response){
			
	    	if(invocationResult.faml.response.rc.returncode==0){
			if(invocationResult.faml.response.txn_data != undefined){
			 dmdtl=invocationResult.faml.response.txn_data.dmdtl;
			 
			
			
				$(dmdtl).each(function(index, obj) {
    	    		
    	    		
    	   
    	    		   demataccountList.push({drfno:obj.drfno, reqqty:obj.reqqty, drndt:obj.drndt, rfddate:obj.rfddate, drnno:obj.drnno, srno:obj.srno, rfdstat:obj.rfdstat, crqty:obj.crqty, rfdno:obj.rfdno, rejqty:obj.rejqty, coname:obj.coname, isin:obj.isin});
    	    		   
    	    		});
			
			 l_qrycount=invocationResult.faml.response.txn_data.qrycnt;
			 l_msgcount=invocationResult.faml.response.txn_data.msgcnt;
			
	    		$("#contentData").load("Views/Demat/rrdmq02.html", null, function (response, status, xhr){
	    			if (status != "error") {}
	                ko.applyBindings(this, $(".dynamic-page-content").get(0));
					if(l_qrycount < l_msgcount){
					 $("#msg").show();
					}
					
					if(invocationResult.faml.response.txn_data.msgcnt==0){
					 $("#staticmsg").show();
					
					}	
					
					if(invocationResult.faml.response.rc.errorcode != "0000" && invocationResult.faml.response.rc.errorcode != ""){
				
				 $("#errormsg").show();
				}
				if(invocationResult.faml.response.rc.errorcode == "0000" || invocationResult.faml.response.rc.errorcode == ""){
				
				 $("#dmtstats").show();
				}
					
				busyInd.hide();	
             });}
			     
				
				 
				 
                 }			 
	    		else{
    			handleError(invocationResult.faml.response);
    			window.location ='#Demat';
    			
				busyInd.hide();
				}
	    	}	
	    	}	
	    	
		busyInd.hide();		
		
      };
	 
	   this.Dematsts  = function(){
		  
			reqParams = {};
			reqParams["fldDeviceId"] = fldDeviceId;
			reqParams["fldWebServerId"] = fldWebServerId;
			reqParams["fldAppId"] = "RS";
			reqParams["fldAppServerId"] = fldAppServerId;
			reqParams["fldLangId"] = fldLangId;
			reqParams["fldModule"] = "";
					reqParams["fldTxnId"] = "DMQ";
			reqParams["fldScrnSeqNbr"] = "02";
			
			
			fldjsessionid = Regfldjsessionid;
	    	reqParams["fldLoginUserId"] =Regloginuid;
	    	
	    	reqParams["fldSessionId"] = Rsessionid;
	    	reqParams["fldRequestId"] =RegfldRequestId;
			
			busyInd.show();
			var invocationData = {
					adapter : "Demat",
					procedure :"RRDMQ02",
					parameters : [fldjsessionid,reqParams,ipadd],compressResponse : true
			};
			WL.Client.invokeProcedure(invocationData, {
				onSuccess : rrdmq02success,
				onFailure : AdapterFail,	    		
				timeout: timeout
			});
			
			
		};
		rrdmq02success = function(result){
			busyInd.hide();
	    	invocationResult = result.invocationResult;
	    	if(invocationResult.isSuccessful){
	    	if(invocationResult.faml.response){
	    	if(invocationResult.faml.response.rc.returncode=0){
	    		$("#contentData").load("Views/Demat/rrdmq02.html", null, function (response, status, xhr){
	    			if (status != "error") {}
	                ko.applyBindings(self, $(".dynamic-page-content").get(0));
					
             });					
	    		}else{
    			handleError(invocationResult.faml.response);
    			window.location ='#Demat';
    			
				}
	    	}	
	    	}	
	    	
			
		
      };
	  
	  	
};	
	  function getFormattedDate(date)
{
     var month ="";
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
    return date.substring(6,8) + "-" + date.substring(4,6)+"-"+date.substring(0,4);
}

function getFormattedTime(date)
{
    return date.substring(8,16);
}	