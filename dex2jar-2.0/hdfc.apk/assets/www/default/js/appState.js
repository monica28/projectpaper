var loadViewModel = function(viewId, param) {
	$('.menutt').attr('id', viewId);
	if(viewId == 'login'){
		$("#contentData").load("Views/login/login.html", null, function (response, status, xhr) {
            if (status != "error") {}
            var model = new loginViewModel(param);
            ko.applyBindings(model, $(".dynamic-page-content").get(0)); 
        	Rsessionid="";
			Regfldjsessionid="";
			Regloginuid="";
			RegfldRequestId="";
                           
        });
	}else if(viewId == 'logincustpass'){

		$("#contentData").load("Views/login/loginCustPass.html", null, function (response, status, xhr) {
            if (status != "error") {}
				
             var model = new loginViewModel(param);
             model.showCustDetails();
             ko.applyBindings(model, $(".dynamic-page-content").get(0));                   
        });
	}else if(viewId == 'logout'){		
		 var model = new loginViewModel(param);
		  $(".h_title").html("Login");
         model.logout();
         //ko.applyBindings(model, $(".dynamic-page-content").get(0));		
	}else if(viewId == 'genVerifyOTP'){	
		 setotp	= '';
		 var model = new loginViewModel(param);
		 // $(".h_title").html("Step 3: Validate One Time Password (OTP)");
		  model.genVerifyOTP();
        //ko.applyBindings(model, $(".dynamic-page-content").get(0));		
	}else if(viewId == 'GenOTPPage'){		
		 var model = new loginViewModel(param);
		  //$(".h_title").html("Verify OTP");
		 // busyInd.show();
		 model.GenOTPPages();
		 
		 
       //ko.applyBindings(model, $(".dynamic-page-content").get(0));		
	}
	else if(viewId == 'rrfcp01'){		
			$("#contentData").load("Views/login/rrfcp01.html", null, function (response, status, xhr) {
					if (status != "error") {}
						
				      var model = new mPinReg();
					 ko.applyBindings(model, $(".dynamic-page-content").get(0));                   
				});			
	}
	else if(viewId == 'rrfcp02'){		
			$("#contentData").load("Views/Others/rrfcp02.html", null, function (response, status, xhr) {
					if (status != "error") {}
						
					 var model = new OthersViewModel();
					 ko.applyBindings(model, $(".dynamic-page-content").get(0));                   
				});		
	}
	else if(viewId == 'rrfcp03'){		
			$("#contentData").load("Views/login/rrfcp03.html", null, function (response, status, xhr) {
					if (status != "error") {}
						
					 var model = new loginViewModel();
					 ko.applyBindings(model, $(".dynamic-page-content").get(0));                   
				});		
	}
	else if(viewId == 'mymenu'){
		 var model = new loginViewModel(param);
         model.getAllMenu();
		//$("#contentData").load("Views/Menu/mymenu.html", null, function (response, status, xhr) {
           // if (status != "error") {}
			                  
       // });
	}
//start mpin registered
	
	else if(viewId == 'loginmethod'){

		$("#contentData").load("Views/login/login-method.html", null, function (response, status, xhr) {
            if (status != "error") {}
			 var model = new loginViewModel(param);
             //var model = new mPinReg(param);
            
             ko.applyBindings(model, $(".dynamic-page-content").get(0));                   
        });
	}
	
	else if(viewId == 'MpinRegister'){

        var model = new mPinReg(param);
		$("#contentData").load("Views/login/Mpin_Register.html", null, function (response, status, xhr) {
            if (status != "error") {}
		
             ko.applyBindings(model, $(".dynamic-page-content").get(0));                   
        });
	}
	else if(viewId == 'setmpin'){

		$("#contentData").load("Views/login/set-mpin.html", null, function (response, status, xhr) {
            if (status != "error") {}
			 var model = new mPinReg();
             ko.applyBindings(model, $(".dynamic-page-content").get(0));                   
        });
	}
	else if(viewId == 'loginmpin'){

		$("#contentData").load("Views/login/Mpin_login.html", null, function (response, status, xhr) {
            if (status != "error") {}
			var model = new loginViewModel();
			
             ko.applyBindings(model, $(".dynamic-page-content").get(0));                   
        });
	}
	//end mpin registered
	else if(viewId == 'others'){		
		var model = new OthersViewModel(param);
        $("#contentData").load("Views/Others/others.html", null, function (response, status, xhr) {
            if (status != "error") {}
                ko.applyBindings(model, $(".dynamic-page-content").get(0));                   
        });
          
	}
	else if(viewId == 'impsFndTrnsList'){		
		$("#contentData").load("Views/Accounts/impsFndTrnsList.html", null, function (response, status, xhr) {
            if (status != "error") {}
				
             var model = new AccountsViewModel(param);
             
             ko.applyBindings(model, $(".content").get(0));                   
        });
    }
	else if(viewId == 'rrift01'){		
		var model = new TPTViewModel(param);
        model.rrift01Page();
    }
	else if(viewId == 'rrift02'){		
		var model = new TPTViewModel(param);
        model.rrift02Page();
    }
	else if(viewId == 'rrift03'){		
		var model = new TPTViewModel(param);
		model.callVFT03();
    }
	else if(viewId == 'rrvua01'){		
		var model = new AccountsViewModel(param);
		model.rrvua01Page();
    }
	else if(viewId == 'rrvua02'){		
		var model = new AccountsViewModel(param);
		model.rrvua02Page();
    }
	else if(viewId == 'rrvua03'){		
		var model = new AccountsViewModel(param);
		model.rrvua03Page();
    }
	else if(viewId == 'rrvua04'){		
		var model = new AccountsViewModel(param);
		model.rrvua04Page();
    }
	else if(viewId == 'rrcad01'){		
		var model = new OthersViewModel(param);
        model.ViewContactDetails();
          
	}
	else if(viewId == 'rrcpw01'){		
		var model = new OthersViewModel(param);
        model.changepswrd();
          
	}
	else if(viewId == 'rrcpw02'){		
		var model = new OthersViewModel(param);
        model.changepassword();
          
	}
	else if(viewId == 'rrtpa01'){		
		var model = new TPTViewModel(param);
        model.rrtpapage();
          
	}
	else if(viewId == 'rrtpa02'){		
		var model = new TPTViewModel(param);
        model.rrtpa02Page();
          
	}
	else if(viewId == 'rrtpa04'){		
		var model = new TPTViewModel(param);
        model.rrtpa04page();
          
	}
	else if(viewId == 'rrtpa06'){		
		var model = new TPTViewModel(param);
        model.rrtpa06page();
          
	}
	else if(viewId == 'Addbeni'){		
		$("#contentData").load("Views/Accounts/Addbeni.html", null, function (response, status, xhr) {
            if (status != "error") {}
				
             var model = new AccountsViewModel(param);
             
             ko.applyBindings(model, $(".content").get(0));                   
        });
	}
	else if(viewId == 'TradeOnSec'){		
		var tradeFlg = hdfc_android.openApp('com.snapwork.hdfcsec');
		if(tradeFlg=='false'){
				window.open('https://play.google.com/store/apps/details?id=com.snapwork.hdfcsec&hl=en', '_system');
		}
    }
	else if(viewId == 'hdfcaag'){		
		var aagFlg = hdfc_android.openApp('com.hdfcaag');
		
		if(aagFlg=='false'){
				window.open('https://play.google.com/store/apps/details?id=com.hdfcaag&hl=en', '_system');
		}
    }
	else if(viewId == 'hdfcPayzap'){		
		var hdfcPayzap = hdfc_android.openApp('com.enstage.wibmo.hdfc');
		
		if(hdfcPayzap=='false'){
			window.open('https://play.google.com/store/apps/details?id=com.enstage.wibmo.hdfc&hl=en', '_system');
		}
    }
	
	else if(viewId == 'hdfcWealth'){		
		var Wealth = hdfc_android.openApp('com.InvestTrack');
		
		if(Wealth=='false'){
			window.open('https://play.google.com/store/apps/details?id=com.InvestTrack', '_system');
		}
    }
	else if(viewId == 'hdfcChillr'){		
		var Chillr = hdfc_android.openApp('in.chillr');
		
		if(Chillr=='false'){
			window.open('https://play.google.com/store/apps/details?id=in.chillr&hl=en', '_system');
		}
    }
	
	else if(viewId == 'hdfcHindi'){		
		var HDFCHindi = hdfc_android.openApp('com.snapwork.hdfc.hindi');
		
		if(HDFCHindi=='false'){
			window.open('https://play.google.com/store/apps/details?id=com.snapwork.hdfc.hindi&hl=en', '_system');
		}
    }
	else if(viewId == 'hdfcVroom'){		
		var HDFCHindi = hdfc_android.openApp('com.girnarsoft.hdfcconsumer');
		
		if(HDFCHindi=='false'){
			window.open('https://play.google.com/store/apps/details?id=com.girnarsoft.hdfcconsumer&hl=en', '_system');
		}
    }
	
	
	
	else if(viewId == 'accountSummary' || viewId == 'rrasm01'){		
		
             var model = new AccountsViewModel(param);
			  model.getAccountSummary();
			//  model.ContactDetails();
			
	      accsumm="";
	}
	
	else if(viewId == 'accountStatment'){		
		var accmodel = new AccountsViewModel();
        accmodel.viewSelectedAccountStatement();        
	}
		else if(viewId == 'debithome'){		
		
		
  
        
}
else if(viewId == 'rrdce01'){		
	
	  var model = new DebitcardViewModel(param);
      model.getDebitSummary();
    }
    
    
    
    else if(viewId == 'rsdpi01'){
        var model = new DebitcardViewModel(param);
        model.getInstantPin();
        
        
    }

//Insta alert
			else if(viewId == 'rralt01'){		
		var model = new OthersViewModel(param);
        model.InstaAlert();
          
	}
	else if(viewId == 'rralt02'){		
		var model = new OthersViewModel(param);
        model.InstaAlertset();
          
	}
	else if(viewId == 'rralt03'){		
		var model = new OthersViewModel(param);
        model.Instaalertreq();
          
	}
	else if(viewId == 'rralt04'){		
		var model = new OthersViewModel(param);
        model.Instaalertrequest();
          
	}
	else if(viewId == 'rralt05'){		
		var model = new OthersViewModel(param);
        model.InstaAlert('ED');
          
	}
	
	//
	
	else if(viewId == 'rralm02'){		
		var model = new OthersViewModel(param);
        model.SubmitEdit();
          
	}
	else if(viewId == 'rralm03'){		
		var model = new OthersViewModel(param);
        model.submitconfrim();
          
	}
	else if(viewId == 'rralm04'){		
		var model = new OthersViewModel(param);
        model.Editreponse();
          
	}
	//End of Insta alert
else if(viewId == 'rrdcl01'){		
	
	 var model = new DebitcardViewModel(param);
 
      model.getDebitHotlist();
     
    
}
	else if(viewId == 'rrsin01'){		
		$("#contentData").load("Views/Accounts/rrsin01.html", null, function (response, status, xhr) {
            if (status != "error") {}
				
             var model = new AccountsViewModel(param);
             model.getAccountsList();
             ko.applyBindings(model, $(".content").get(0));                   
        });
	}
	else if(viewId == 'rrsin02'){		
		$("#contentData").load("Views/Accounts/rrsin02.html", null, function (response, status, xhr) {
            if (status != "error") {}
				
             var model = new AccountsViewModel(param);
             model.ViewAccountStatements();
             ko.applyBindings(model, $(".content").get(0));                   
        });
	}
	else if(viewId == 'rrper01'){		
		var model = new AccountsViewModel(param);
        model.rrper01Page();
    }
	else if(viewId == 'rrcsi01'){		
		$("#contentData").load("Views/Accounts/rrcsi01.html", null, function (response, status, xhr) {
            if (status != "error") {}
				
             var model = new AccountsViewModel(param);
             model.ViewCheckStatements();
             ko.applyBindings(model, $(".content").get(0));                   
        });
	}
	else if(viewId == 'rrcsi02'){		
		$("#contentData").load("Views/Accounts/rrcsi02.html", null, function (response, status, xhr) {
            if (status != "error") {}
				
             var model = new AccountsViewModel(param);
             model.GetCheckStatus();
             ko.applyBindings(model, $(".content").get(0));                   
        });
	}
	else if(viewId == 'rrsch01'){		
		var model = new AccountsViewModel(param);
        model.StopPaYmntcheck();
          
	}
	else if(viewId == 'rrsch02'){		
		var model = new AccountsViewModel(param);
        model.StopPaYmntcheckRes();
          
	}
	
	//TPD section
	else if(viewId == 'rrtpi01'){		
		var model = new TPTViewModel(param);
		$("#contentData").load("Views/TPT/rrtpi01.html", null, function (response, status, xhr) {
            if (status != "error") {}
                ko.applyBindings(model, $(".dynamic-page-content").get(0));                   
        });
    }
	else if(viewId == 'rrtpn04'){		
		var model = new TPTViewModel(param);
        model.tpn04Page();
    }
	else if(viewId == 'rrtpn05'){		
		var model = new TPTViewModel(param);
        model.tpn05Page();
    }
	else if(viewId == 'rrmpe01'){		
		var model = new TPTViewModel(param);
        model.mpe01submit();
    }
	else if(viewId == 'rrmpe04'){		
		var model = new TPTViewModel(param);
        model.mpe04Page();
    }
	else if(viewId == 'rrmpe02'){		
		var model = new TPTViewModel(param);
        model.mpe02Page();
    }
	else if(viewId == 'rrmpe03'){		
		var model = new TPTViewModel(param);
        model.mpe03Page();
    }
	//End of TPD Section
	//demat section
	else if(viewId == 'rrsrp01'){		
		var model = new MFViewModel(param);
        model.rrsrp01Page();
    }
	else if(viewId == 'rrsrp06'){		
		var model = new MFViewModel(param);
        model.rrsrp06Page();
    }
	else if(viewId == 'rrsrp10'){		
		var model = new MFViewModel(param);
        model.rrsrp10Page();
    }
	else if(viewId == 'rrtxa01'){		
		var model = new MFViewModel(param);
        model.rrtxa01Page();
    }
	else if(viewId == 'rrtxa03'){		
		var model = new MFViewModel(param);
        model.rrtxa03Page();
    }
	else if(viewId == 'rrsip01'){		
		var model = new MFViewModel(param);
        model.rrsip01Page();
    }
	/*else if(viewId == 'rrsip02'){		
		var model = new MFViewModel(param);
       // model.rrsip02Page();
    }*/
	else if(viewId == 'rrsip04'){		
		var model = new MFViewModel(param);
        model.rrsip04Page();
    }
	else if(viewId == 'rrsip08'){		
		var model = new MFViewModel(param);
        model.rrsip08Page();
    }
	else if(viewId == 'rrswp01'){		
		var model = new MFViewModel(param);
        model.rrswp01Page();
    }
	else if(viewId == 'rrswp04'){		
		var model = new MFViewModel(param);
        model.rrswp04Page();
    }
	else if(viewId == 'rrswp08'){		
		var model = new MFViewModel(param);
        model.rrswp08Page();
    }
	else if(viewId == 'Demat'){		
		var model = new DematViewModel(param);
		 model.ListOfAccounts1();
       /*  $("#contentData").load("Views/Demat/Demat.html", null, function (response, status, xhr) {
            if (status != "error") {}
                ko.applyBindings(model, $(".dynamic-page-content").get(0));                   
        }); */
          
	}

	else if(viewId == 'rrdpl01'){		
		var model = new DematViewModel(param);
        model.ListOfAccounts();
          
	}
	else if(viewId == 'rrhld01'){		
		var model = new DematViewModel(param);
        model.HoldingsSummary ();
          
	}
	else if(viewId == 'rrhld02'){		
		var model = new DematViewModel(param);
        model.HoldingSummary ();
          
	}
	else if(viewId == 'rrdpq01'){		
		var model = new DematViewModel(param);
        model.ClientProfile();
          
	}
	else if(viewId == 'rrdpq02'){		
		var model = new DematViewModel(param);
        model.ClientPro();
          
	}
	else if(viewId == 'rrdts01'){		
		var model = new DematViewModel(param);
        model.TransactionStatement ();
          
	}
	else if(viewId == 'rrdts02'){		
		var model = new DematViewModel(param);
        model.TransactionStatmnt ();
          
	}
	else if(viewId == 'rrdiq01'){		
		var model = new DematViewModel(param);
        model.ISINSearch();
          
	}
		else if(viewId == 'rrdiq02'){		
		var model = new DematViewModel(param);
        model.ISINSrch();
          
	}
		else if(viewId == 'rrdcq01'){		
		var model = new DematViewModel(param);
        model.SettlementCalendar();
          
	}
	else if(viewId == 'rrdcq02'){		
		var model = new DematViewModel(param);
        model.SettlementCalendarmster();
          
	}
	
	 else if(viewId == 'rrdmq01'){		
		var model = new DematViewModel(param);
        model.Dematstatus();
          
	}
	 else if(viewId == 'rrdmq02'){		
		var model = new DematViewModel(param);
        model.Dematsts();
          
	}
	//end of demat section
	else if(viewId == 'rrblp01'){		
		var model = new BillPayViewModel(param);
        model.rrblp01Page();
     }
	else if(viewId == 'rrblp02'){		
		var model = new BillPayViewModel(param);
        model.rrblp02Page();
     }
	else if(viewId == 'rrblp03'){		
		var model = new BillPayViewModel(param);
        model.rrblp03Page();
     }
	else if(viewId == 'rrblp04'){		
		var model = new BillPayViewModel(param);
        model.rrblp04Page();
     }
	else if(viewId == 'rruab01'){		
		var model = new BillPayViewModel(param);
        model.rruab01Page();
     }
    else if(viewId == 'rruab02'){		
		var model = new BillPayViewModel(param);
        model.rruab02Page();
     }
    else if(viewId == 'rruab03'){		
		var model = new BillPayViewModel(param);
        model.rruab03Page();
     }
	else if(viewId == 'rruab04'){		
		var model = new BillPayViewModel(param);
        model.rruab04Page();
     }
    else if(viewId == 'rruab05'){		
		var model = new BillPayViewModel(param);
        model.rruab05Page();
     }
	 
    else if(viewId == 'rruvb01'){		
		var model = new BillPayViewModel(param);
		model.rruabPage();
        model.rruvb01Page();
     }	
	else if(viewId == 'rruvb02'){		
		var model = new BillPayViewModel(param);
        model.rruvb02Page();
     }
	 else if(viewId == 'rruvb03'){		
		var model = new BillPayViewModel(param);
        model.rruvb03Page();
     }
     else if(viewId == 'rruvb04'){		
		var model = new BillPayViewModel(param);
        model.rruvb04Page();
     }
     else if(viewId == 'rruvb05'){		
		var model = new BillPayViewModel(param);
        model.rruvb05Page();
     }
    else if(viewId == 'rruph01'){		
		var model = new BillPayViewModel(param);
		model.rruabPage();
        model.rruph01Page();
     }	
    else if(viewId == 'rruph02'){		
		var model = new BillPayViewModel(param);
        model.rruph02Page();
     }
	else if(viewId == 'rruvp01'){		
		var model = new BillPayViewModel(param);
        model.rruvp01Page();
		viewpaybill="";
    } 
    else if(viewId == 'rruap01'){

		var model = new BillPayViewModel(param);
        model.rruap01Page();
     }
	else if(viewId == 'rruap01'){

		var model = new BillPayViewModel(param);
        model.rruap01Page();
     }
    else if(viewId == 'rruap02'){

		var model = new BillPayViewModel(param);
        model.rruap03Page();
     }
    else if(viewId == 'rruap04'){

		var model = new BillPayViewModel(param);
        model.rruap04Page();
     }
    else if(viewId == 'rruap05'){

		var model = new BillPayViewModel(param);
        model.rruap05Page();
     }	 
	 
	  else if(viewId == 'addbill'){
		var model = new BillPayViewModel(param);
     }
     else if(viewId == 'addbill2'){

		var model = new BillPayViewModel(param);
        model.addbill02Page();
     }
      else if(viewId == 'addbill3'){
		var model = new BillPayViewModel(param);
        model.addbill03Page();
     }		 
	 
	 
	else if(viewId == 'rrsch03'){		
		var model = new AccountsViewModel(param);
        model.StopPaYmntcheckRes3();
          
	}
	else if(viewId == 'rrcbr02'){		
		var model = new AccountsViewModel(param);
        model.CheckBReq();
          
	}
	else if(viewId == 'rrcbr03'){		
		var model = new AccountsViewModel(param);
        model.CheckBReqCmfrmsub();
          
	}
	else if(viewId == 'rrcbr04'){		
		var model = new AccountsViewModel(param);
        model.CheckBReqCmfrmsubSucces();
          
	}
	else if(viewId == 'rremr03'){		
		var model = new AccountsViewModel(param);
        model.EmailRegReq();
          
	}
	else if(viewId == 'rremr04'){		
		var model = new AccountsViewModel(param);
        model.EmailRegResult();
          
	}
	else if(viewId == 'rremr05'){		
		var model = new AccountsViewModel(param);
        model.EmailReg4Result();
          
	}
	else if(viewId == 'rremd01'){		
		var model = new AccountsViewModel(param);
        model.EmailDRegReq();
          
	}
	else if(viewId == 'rremd02'){		
		var model = new AccountsViewModel(param);
        model.EmailDRegConfrmReq();
          
	}
	else if(viewId == 'rremd03'){		
		var model = new AccountsViewModel(param);
        model.EmailDRegConfrmRes();
          
	}
	else if(viewId == 'rrrds01'){		
		var model = new AccountsViewModel(param);
        model.RrrdsDetails();
          
	}
	else if(viewId == 'rrloa01'){		
		var model = new AccountsViewModel(param);
        model.RrloaDetails();
          
	}
	else if(viewId == 'rrasr02'){		
		var model = new AccountsViewModel(param);
        model.rrasr02Page();
    }
	else if(viewId == 'rrasr03'){		
		var model = new AccountsViewModel(param);
        model.rrasr03Page();
    }
	else if(viewId == 'rrasr04'){		
		var model = new AccountsViewModel(param);
        model.rrasr04Page();
	}
	else if(viewId == 'rrcss01'){		
		var model = new AccountsViewModel(param);
        model.rrcss01Page();
    }
	else if(viewId == 'rrcss02'){		
		var model = new AccountsViewModel(param);
        model.rrcss02Page();
    }
	else if(viewId == 'rrcss03'){		
		var model = new AccountsViewModel(param);
        model.rrcss03Page();
    }
	else if(viewId == 'rrfss01'){		
		var model = new AccountsViewModel(param);
        model.rrfss01Page();
    }
	else if(viewId == 'rrfss02'){		
		var model = new AccountsViewModel(param);
        model.rrfss02Page();
    }
	else if(viewId == 'rrfss03'){		
		var model = new AccountsViewModel(param);
        model.rrfss03Page();
    }
	else if(viewId == 'rrsus01'){		
		var model = new AccountsViewModel(param);
        model.rrsus01Page();
    }
	else if(viewId == 'rrsus02'){		
		var model = new AccountsViewModel(param);
        model.rrsus02Page();
    }
	else if(viewId == 'rrsus03'){		
		var model = new AccountsViewModel(param);
        model.rrsus03Page();
    }
	else if(viewId == 'rrftr02' || viewId == 'rrftr03'){
		var model = new AccountsViewModel(param);
		if(viewId == 'rrftr02')
			model.callrrftr02();
		else if(viewId == 'rrftr03')
			model.callrrftr03();
		
	}else if(viewId == 'rrrdo01' || viewId == 'rrrdo02' || viewId == 'rrrdo03'){	
		
        accmodel = new AccountsViewModel(param);
        if(viewId == 'rrrdo01')
        	accmodel.callRRRDO01();
        else if(viewId == 'rrrdo02')
        	accmodel.callRRRDO02();
        else if(viewId == 'rrrdo03')
        	accmodel.callRRRDO03();
        
	}else if(viewId == 'rrtpt03' || viewId == 'rrtpt04'){
		var tptmodel = new TPTViewModel(param);		
		
		if(viewId == 'rrtpt03')
			tptmodel.callTPT03();
        else if(viewId == 'rrtpt04')
        	tptmodel.callTPT04();
	}
	else if(viewId == 'rrtpv01' || viewId == 'rrtpv02'){
		var tptmodel = new TPTViewModel(param);		
		if(viewId == 'rrtpv01')
			tptmodel.callTPV01();
		if(viewId == 'rrtpv02')
			tptmodel.callTPV02();
	}
	else if(viewId == 'rrvmt01' || viewId == 'rrvmt02'){
		var tptmodel = new TPTViewModel(param);
		if(viewId == 'rrvmt01')
			tptmodel.callVMT01();
		if(viewId == 'rrvmt02')
			tptmodel.callVMT02();
	}
	else if(viewId == 'rrcpq01' || viewId == 'rrcpq02'){
		var tptmodel = new TPTViewModel(param);
		if(viewId == 'rrcpq01')
			tptmodel.callCPQ01();		
	}
	else if(viewId == 'rrvft01' || viewId == 'rrvft02' || viewId == 'rrvft03'){
		var tptmodel = new TPTViewModel(param);
		if(viewId == 'rrvft01')
			tptmodel.callVFT01();
		if(viewId == 'rrvft02')
			tptmodel.callVFT02();
		if(viewId == 'rrvft03')
			tptmodel.callVFT03();
	}
	else if(viewId == 'rrtxi01' || viewId == 'rrtxi02'){							
         var model = new AccountsViewModel(param);
         if(viewId == 'rrtxi01')
        	 model.callRRTXI01();  
         else if(viewId == 'rrtxi02')
        	 model.callRRTXI02();  
                
	}
	else if(viewId == 'rrhiq01' || viewId == 'rrhiq02'){							
        var model = new AccountsViewModel(param);
        if(viewId == 'rrhiq01')
       	 model.callRRHIQ01();  
        else if(viewId == 'rrhiq02')
       	 model.callRRHIQ02(); 
	}else if(viewId == 'rrfdl01' || viewId == 'rrfdl02' || viewId == 'rrfdl03'){							
        accmodel = new AccountsViewModel(param);
        if(viewId == 'rrfdl01')
        	accmodel.callRRFDL01();  
        else if(viewId == 'rrfdl02')
        	accmodel.callRRFDL02();
        else if(viewId == 'rrfdl03')
        	accmodel.callRRFDL03();
	}
	else if(viewId == 'rrmmc01' || viewId == 'rrmmc02' || viewId == 'rrmmc03'){							
        var accmodel = new AccountsViewModel(param);
        if(viewId == 'rrmmc01')
        	accmodel.callRRMMC01();  
        else if(viewId == 'rrmmc02')
        	accmodel.callRRMMC02();
        else if(viewId == 'rrmmc03')
        	accmodel.callRRMMC03();
	}
	else if(viewId == 'rrmmg01'){		
		var model = new AccountsViewModel(param);
        model.rrmmg01Page();
    }
	else if(viewId == 'rrmpg01'){		
		var model = new AccountsViewModel(param);
        model.rrmpg01Page();
    }
	else if(viewId == 'rrmpg02'){		
		var model = new AccountsViewModel(param);
        model.rrmpg02Page();
    }
	else if(viewId == 'rrmpg03'){		
		var model = new AccountsViewModel(param);
        model.rrmpg03Page();
    }
	else if(viewId == 'rrpfc01'){		
		var model = new AccountsViewModel(param);
        model.rrpfcg01page();
    }
	else if(viewId == 'rrpfc02'){	
         
	  var model = new AccountsViewModel(param);
       model.rrpfcg02page();
    }
	else if(viewId == 'rrpfc03'){	
         
	  var model = new AccountsViewModel(param);
       model.rrpfcg03page();
    }
	else if(viewId == 'rrpfc04'){	
         
	  var model = new AccountsViewModel(param);
       model.rrpfcg04page();
    }
	else if(viewId == 'rrrfx01'){ 
	  var model = new AccountsViewModel(param);
       model.rsrfx01page();
    }
	else if(viewId == 'rrrfx02'){ 
	  var model = new AccountsViewModel(param);
       model.rsrfx02page();
    }
	else if(viewId == 'rrrfx03'){ 
	  var model = new AccountsViewModel(param);
       model.rsrfx03page();
    }
	else if(viewId == 'rrmmg02'){		
		var model = new AccountsViewModel(param);
        model.rrmmg02Page();
    }
	else if(viewId == 'rrmmg03'){		
		var model = new AccountsViewModel(param);
        model.rrmmg03Page();
    }
	else if(viewId == 'rrmmr01'){		
		var model = new AccountsViewModel(param);
        model.rrmmr01Page();
    }
	else if(viewId == 'rrmmr02'){		
		var model = new AccountsViewModel(param);
        model.rrmmr02Page();
    }
	else if(viewId == 'rrmmr03'){		
		var model = new AccountsViewModel(param);
        model.rrmmr03Page();
    }
	else if(viewId == 'rrper01'){		
		var model = new AccountsViewModel(param);
        model.rrper01Page();
    }
	else if(viewId == 'rrper02'){		
		var model = new AccountsViewModel(param);
        model.rrper02Page();
    }
	else if(viewId == 'ccaccountSummary' || viewId == 'rracs01'){
		
		
    	var model = new CreditViewModel(param);
        model.getCreditSummary();
		creditcardpay='';
		crditcardstatment='';
		crditcardpayment='';

}
else if(viewId == 'rrcdc01'){
	
	
	var model = new CreditViewModel(param);
    model.callrrcdc01();
   }
   
else if(viewId == 'rscip01'){
	var model = new CreditViewModel(param);
    model.callrscip01();

}
else if(viewId == 'rscip02'){
	var model = new CreditViewModel(param);
    model.callrscip02();

}

else if(viewId == 'rrunb01'){
	
	
	var model = new CreditViewModel(param);
    model.callrrunb01();

}
else if(viewId == 'rraci01'){
	
	
	var model = new CreditViewModel(param);
    model.callrraci01();

}
	
else if(viewId == 'rrpcr01'){


var model = new CreditViewModel(param);
model.callrrpcr01();

}
else if(viewId == 'rrest01'){


	var model = new CreditViewModel(param);
	model.callrrest01();

	}
else if(viewId == 'rrupd00'){


	var model = new CreditViewModel(param);
	model.callrrupd00();
	
	}	
else if(viewId == 'rrapr00'){


	var model = new CreditViewModel(param);
	model.callrrapr00();
	
	}
else if(viewId == 'rrapd01'){


	var model = new CreditViewModel(param);
	model.callrrapd01();
	
	}
else if(viewId == 'rrccp01'){


	var model = new CreditViewModel(param);
	model.callrrccp01();
	crditcrd="";
	
	
	}
else if(viewId == 'rrcac01'){


	var model = new CreditViewModel(param);
	model.callrrcac01();
	
	}
	
else if(viewId == 'ccunb'){		
	var accmodel = new CreditViewModel();
    accmodel.viewSelectedccAccountStatement();        
}	
//Mutual Fund Start
else if(viewId == 'rrwcm01'){


	var model = new MFViewModel(param);
	model.mfSummary();
     Mutulfund='';
	}
else if(viewId == 'rrstp01'){		
		var model = new MFViewModel(param);
        model.rrstp01Page();
    }
	else if(viewId == 'rrstp04'){		
		var model = new MFViewModel(param);
        model.rrstp04Page();
    }
	else if(viewId == 'rrstp08'){		
		var model = new MFViewModel(param);
        model.rrstp08Page();
    }	
else if(viewId == 'mfaccountSummary'){


	var model = new MFViewModel(param);
	model.mfSummary();

	}
	else if(viewId == 'rripb01' || viewId == 'rripb02' || viewId == 'rripb03'){
		var model = new MFViewModel(param);
		 if(viewId == 'rripb01')	        	
			 model.callRRIPB01();
		 if(viewId == 'rripb02')	        	
			 model.callRRIPB02();
		 if(viewId == 'rripb03')	        	
			 model.callRRIPB03();
	}
	else if(viewId == 'rrosw01' || viewId == 'rrosw02' || viewId == 'rrosw04' || viewId == 'rrosw05'){
		var model = new MFViewModel(param);
		 if(viewId == 'rrosw01')	        	
			 model.callRROSW01();
		 if(viewId == 'rrosw02')	        	
			 model.callRROSW02();
		 if(viewId == 'rrosw04')	        	
			 model.callRROSW04();
		 if(viewId == 'rrosw05')	        	
			 model.callRROSW05();
	}
	else if(viewId == 'rrash02'){
		var model = new MFViewModel(param);
		model.callRRASH02();
	}
else if(viewId == 'rrvpr01'){


	var model = new MFViewModel(param);
	model.callrrvpr01();

	}
else if(viewId == 'rrost01'){


	var model = new MFViewModel(param);
	model.callrrost01();

	}
else if(viewId == 'rrobu01'){


	var model = new MFViewModel(param);
	model.callrrobu01();

	}	
else if(viewId == 'rrore01'){


	var model = new MFViewModel(param);
	model.callrrore01();

	}
	else if(viewId == 'rrfdr01'){							
        var accmodel = new AccountsViewModel(param);
        accmodel.callRRFDR01();
	}
	
	
	//for mobile recharge
	

	else if(viewId == 'billpayment'){
		
	
		  $("#contentData").load("Views/recharge/billpayment.html", null, function (response, status, xhr) {
	        	 if (status != "error") {}
	        	  //self.commonData();
	        	 //  var model = new loginViewModel();
	        });
			billpaypage='';
			viewpaybill='';
			
	        
	}
	
	else if(viewId == 'rrdth01'){							
        var model = new MobileRechargeViewModel(param);
        model.callrrdth01();
	}
	
	else if(viewId == 'rrpmb01'){							
        var model = new MobileRechargeViewModel(param);
        model.callrrpmb01();
	}
	else if(viewId == 'rrpmb02'){							
        var model = new MobileRechargeViewModel(param);
        model.callrrpmb02();
	}
	else if(viewId == 'rrpmb03'){							
        var model = new MobileRechargeViewModel(param);
       // model.callrrpmb03();
	}
	
	else if(viewId == 'rrpmb04'){							
        var model = new MobileRechargeViewModel(param);
       // model.callrrpmb04();
	}
	else if(viewId == 'rrdth02'){							
        var model = new MobileRechargeViewModel(param);
        model.callrrdth02();
	}
	else if(viewId == 'rrdth03'){							
        var model = new MobileRechargeViewModel(param);
        //model.callrrdth03();
	}
	
	else if(viewId == 'rrdth04'){							
        var model = new MobileRechargeViewModel(param);
       // model.callrrdth04();
	}
	else if(viewId == 'rdthr01'){							
        var model = new MobileRechargeViewModel(param);
        model.callrdthr01();
	}
	else if(viewId == 'rdthr02'){							
        var model = new MobileRechargeViewModel(param);
      //  model.callrdthr02();
	}
	else if(viewId == 'rdthr03'){							
        var model = new MobileRechargeViewModel(param);
       // model.callrdthr03();
	}
	
	else if(viewId == 'rrmr01'){							
        var model = new MobileRechargeViewModel(param);
        model.callrrmr01();
	}
	
	else if(viewId == 'rrmr02'){							
        var model = new MobileRechargeViewModel(param);
       // model.callrrmr02();
	}
	
	
	else if(viewId == 'rrmr03'){							
        var model = new MobileRechargeViewModel(param);
       // model.callrrmr03();
	}
	
	else if(viewId == 'rrcrs01'){							
        var model = new MobileRechargeViewModel(param);
        model.callrrcrs01();
	}
	
	else if(viewId == 'rrcrs02'){							
        var model = new MobileRechargeViewModel(param);
      //  model.callrrcrs02();
	}
	//Vishal Change for OpenFD
	else if(viewId == 'rrfdr02'){		
			var model = new AccountsViewModel(param);
	        model.rrfdr02Page();
	    }
		else if(viewId == 'rrfdr03'){		
			var model = new AccountsViewModel(param);
	        model.rrfdr03Page();
	    }
			/* starts mPassbook */
	else if(viewId == 'mPassbook'){
		var model = new mPassbookViewModel(param);
		model.homepage();
		// $("#contentData").load("Views/mPassbook/mPassbook.html", null, function (response, status, xhr) {
            // if (status != "error") {}				
                  
            // ko.applyBindings(model, $(".content").get(0));                   
        // });
	}
	else if(viewId == 'mPassbookacntstatement'){
		var model = new mPassbookViewModel(param);
		model.mPassbookacntstatement();
	}

	else if(viewId == 'mPassbookFDsum'){
		var model = new mPassbookViewModel(param);
		model.mPassbookFDsum();
	}

	else if(viewId == 'limitbalance'){
		var model = new mPassbookViewModel(param);
		model.limitbalance();
	}
	
	else if(viewId == 'linkedacnt'){
		var model = new mPassbookViewModel(param);
		model.linkedacnt();
	}

	// else if(viewId == 'RDstatement'){
		// var model = new mPassbookViewModel(param);
		// model.RDstatement();
	// }
	
	else if(viewId == 'RDenquiry'){
		var model = new mPassbookViewModel(param);
		model.RDenquiry();
	}

	else if(viewId == 'mPB_register'){
		var model = new mPassbookViewModel(param);
		model.mPB_register(); 		
	}
	else if(viewId == 'mPassbook01'){
		var model = new mPassbookViewModel(); 		
		$("#contentData").load("Views/mPassbook/mPassbook01.html", null, function (response, status, xhr) {
            if (status != "error") {}				
            //var model = new mPassbookViewModel(param);       
            ko.applyBindings(model, $(".content").get(0));                   
        });
	}
	else if(viewId == 'interactive'){	
	 var model = new mPassbookViewModel(param); 
		model.interactivepage();
		// $("#contentData").load("Views/mPassbook/interactive.html", null, function (response, status, xhr) {
            // if (status != "error") {}				
               
            // ko.applyBindings(model, $(".content").get(0));                   
        // });
	}
	else if(viewId == 'overlay1'){
		$("#contentData").load("Views/mPassbook/overlay1.html", null, function (response, status, xhr) {
            if (status != "error") {}				
            var model = new mPassbookViewModel(param);       
            ko.applyBindings(model, $(".content").get(0));                   
        });
	}
	else if(viewId == 'overlay2'){
		$("#contentData").load("Views/mPassbook/overlay2.html", null, function (response, status, xhr) {
            if (status != "error") {}				
            var model = new mPassbookViewModel(param);       
            ko.applyBindings(model, $(".content").get(0));                   
        });
	}
	else if(viewId == 'overlay3'){
		$("#contentData").load("Views/mPassbook/overlay3.html", null, function (response, status, xhr) {
            if (status != "error") {}				
            var model = new mPassbookViewModel(param);       
            ko.applyBindings(model, $(".content").get(0));                   
        });
	}
	else if(viewId == 'mPB_login_error'){
		$("#contentData").load("Views/mPassbook/mPB_loginError.html", null, function (response, status, xhr) {
            if (status != "error") {}				
            var model = new mPassbookViewModel(param);       
            ko.applyBindings(model, $(".content").get(0));                   
        });
	}
	else if(viewId == 'financialSummary'){
		var model = new mPassbookViewModel(param);
 		model.linkedacnt();
		// $("#contentData").load("Views/mPassbook/financialSummary.html", null, function (response, status, xhr) {
            // if (status != "error") {}				
            // var model = new mPassbookViewModel(param);       
            // ko.applyBindings(model, $(".content").get(0));                   
        // });
	}
	else if(viewId == 'requestStatement'){
		var model = new mPassbookViewModel(param);
			model.RequestStatement();
		
	}
	else if(viewId == 'requestStatement1'){
		var model = new mPassbookViewModel(param);
			model.requestStatement1();
		
	}
	else if(viewId == 'requestStatement2'){
		var model = new mPassbookViewModel(param);
			model.requestStatement2();
		
	}
	else if(viewId == 'mPB_login'){	
		$("#contentData").load("Views/mPassbook/mPB_login.html", null, function (response, status, xhr) {
            if (status != "error") {}				
            var model = new mPassbookViewModel(param);       
            ko.applyBindings(model, $(".content").get(0));                   
        });
	}
	else if(viewId == 'interactiveStatement'){	
		$("#contentData").load("Views/mPassbook/interactiveStatement.html", null, function (response, status, xhr) {
            if (status != "error") {}				
            var model = new mPassbookViewModel(param);       
            ko.applyBindings(model, $(".content").get(0));                   
        });
	}
	else if(viewId == 'contactUs'){	
		$("#contentData").load("Views/mPassbook/contactUs.html", null, function (response, status, xhr) {
            if (status != "error") {}				
            var model = new mPassbookViewModel(param);       
            ko.applyBindings(model, $(".content").get(0));                   
        });
	}
	else if(viewId == 'mPB_settings'){
		var model = new mPassbookViewModel(param); 
		model.mPB_settings();		
		// $("#contentData").load("Views/mPassbook/mPB_settings.html", null, function (response, status, xhr) {
            // if (status != "error") {}				
            // var model = new mPassbookViewModel(param);       
            // ko.applyBindings(model, $(".content").get(0));                   
        // });
	}
	else if(viewId == 'mPB_passbook'){
		var model = new mPassbookViewModel(param); 
		model.passbookdata();
		if(accSelectedForPassbk != ''){
			model.FinancialPageClick();
		}
		
		// $("#contentData").load("Views/mPassbook/mPB_passbook.html", null, function (response, status, xhr) {
            // if (status != "error") {}				
                
            // ko.applyBindings(model, $(".content").get(0));                   
        // });
	}
	else if(viewId == 'Categories'){
		var model = new mPassbookViewModel(param);
		model.Categories();		
		//$("#contentData").load("Views/mPassbook/mPB_categories.html", null, function (response, status, xhr) {
        //    if (status != "error") {}				
        //    var model = new mPassbookViewModel(param);       
        //    ko.applyBindings(model, $(".content").get(0));                   
        //});
	}
	else if(viewId == 'mPB_passbookGraph'){	
		// $("#contentData").load("Views/mPassbook/mPB_passbookGraphselect.html", null, function (response, status, xhr) {
            // if (status != "error") {}				
            var model = new mPassbookViewModel(param);
			model.graph();
            // ko.applyBindings(self, $(".content").get(0));                   
        // });
	}
	else if(viewId == 'pasbooklogout'){
		var model = new mPassbookViewModel(param);
			model.pasbooklogout();
	}
	else if(viewId == 'FAQ'){
		$("#contentData").load("Views/mPassbook/mPB_FAQ.html", null, function (response, status, xhr) {
            if (status != "error") {}				
            ko.applyBindings(self, $(".content").get(0));                   
        });
	}
	/* ends mPassbook */

	//Vishal Change for OpenFD end
		else if(viewId == 'rrp2a01' || viewId == 'rrp2a02' || viewId == 'rrp2a03'){
			var tptmodel = new TPTViewModel(param);
			if(viewId == 'rrp2a01')
				tptmodel.callP2A01();
			if(viewId == 'rrp2a02')
				tptmodel.callP2A02();
			if(viewId == 'rrp2a03')
				tptmodel.callVFT03();
		}
		else if(viewId == 'applyNow'){

			$("#contentData").load("Views/Menu/Apply_now.html", null, function (response, status, xhr) {
	            if (status != "error") {}
				
	            
	             ko.applyBindings(model, $(".dynamic-page-content").get(0));                   
	        });
		}
		else if(viewId =='applicationForm'){
            
			$("#contentData").load("Views/Menu/application_fom_menu.html", null, function (response, status, xhr) {
	            if (status != "error") {}
				
	               ko.applyBindings(model, $(".dynamic-page-content").get(0));                   
	        });
		}
		else if(viewId == 'existingCustomer'){
			    console.log("existing user");
window.location = '#loginmethod';
			    	Rsessionid="";
				Regfldjsessionid="";
				Regloginuid="";
				RegfldRequestId="";
			    
		}
		else if(viewId == 'offers'){

			$("#contentData").load("Views/Menu/offersnli.html", null, function (response, status, xhr) {
	            if (status != "error") {}
				
	            
	             ko.applyBindings(model, $(".dynamic-page-content").get(0));                   
	        });
		}
		else if(viewId == 'settings'){

			$("#contentData").load("Views/Menu/settings.html", null, function (response, status, xhr) {
	            if (status != "error") {}
				
			
				
	             ko.applyBindings(model, $(".dynamic-page-content").get(0));                   
	        });
		}
	else{
		//alert("no appState method");		
	}        
       
};


this.AdapterFail = function(error){
//	alert(JSON.stringify(error, null, 4));	
	//errdata = JSON.stringify(error, null, 4);	
	////WL.Logger.debug(errdata, '');
	if(error.errorCode == 'REQUEST_TIMEOUT' || error.errorCode == 'PROCEDURE_ERROR' || error.errorCode == 'UNEXPECTED_ERROR'){
	  if(window.location.hash=="#rrcad01"){
		  window.location = "#others";
		 }
		alert(serverConnError);
	}
	else{
		alert("Please check your Network connection in setting");
	}
	busyInd.hide();
};

this.AdapterFail1 = function(error){
	if(error.errorCode == 'REQUEST_TIMEOUT' || error.errorCode == 'PROCEDURE_ERROR' || error.errorCode == 'UNEXPECTED_ERROR'){
		busyInd.hide();
		alert(serverConnError);
	  if(window.location.hash=="#financialSummary"){
		  window.location = "#financialSummary12";
		  return false;
		}
	}else{
		 if(window.location.hash=="#financialSummary"){
			 busyInd.hide();
		  window.location = "#financialSummary12";
		  alert("Please check your Network connection in setting");
		  return false;
		}
		
	}
	busyInd.hide();
};

this.handleError = function(errdata){
	if(errdata.rc != undefined){
	if(errdata.rc.returncode != 0){
		errmsg = errdata.rc.errormessage;
		errcode = errdata.rc.errorcode;
	
		
		if(document.getElementsByName("fldRequestId")){
			
			if(errdata.mci != undefined){
			reqid = errdata.mci.requestid;
			if(reqid != undefined){
			$("#fldRequestId").val(reqid);
			RegfldRequestId=reqid;
			
			}
			}
		}
			
		if(errcode == "10020"){
			alert("User session invalid. Please exit from application and try re-login again.");
			window.location = "#login";
		}
		else if(errcode == "16001"){
			alert("You are not registered for Netbanking!");
			window.location = "#login";
			$("#fldLoginUserId").val("");
			
		}/*else if(errcode == "900381"){
			alert("Update Now");
			
		}*/
		else{
		alert(errmsg);
		}
		
		busyInd.hide();  
	}
	}else{
		busyInd.hide();  
		alert(NoResponseError);		
	}
};

this.handleError3 = function(errdata){
	if(errdata.rc != undefined){
	if(errdata.rc.returncode != 0){
		errmsg = errdata.rc.errormessage;
		errcode = errdata.rc.errorcode;
	
		
		if(document.getElementsByName("fldRequestId")){
			
			if(errdata.mci != undefined){
			reqid = errdata.mci.requestid;
			if(reqid != undefined){
			$("#fldRequestId").val(reqid);
			RegfldRequestId=reqid;
			
			}
			}
		}
			
		if(errcode == "10020"){
			alert("User session invalid. Please exit from application and try re-login again.");
			window.location = "#loginmethod";
		}
		else if(errcode == "16001"){
			alert("You are not registered for Netbanking!");
			//window.location = "#login";
			$("#fldLoginUserId").val("");
		}/*else if(errcode == "900381"){
			alert("Update Now");
			
		}*/
		else{
		alert(errmsg);
		}
		
		busyInd.hide();  
	}
	}else{
		busyInd.hide();  
		alert(NoResponseError);		
	}
};

this.handleErrorNoResponse = function(){
	alert(NoResponseError);
	busyInd.hide();
};

this.handleServerConn = function(){
	alert(serverConnError);
	busyInd.hide();
};