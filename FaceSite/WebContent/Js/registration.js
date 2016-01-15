	function onBtnClick() {
	    var flag = true;
		var dbCheckResult = true;
	    
		if(!OnlyLetters(ln, lnErr))
			flag = false;
		if(!OnlyLetters(fn, fnErr))
			flag = false;
		if(!userValidate(userRegister, userErr))
			flag = false;
		if(!validateEmail(email,emailErr))
			flag = false;
		if(!passwordCheck(password,cfmPassword,passErr,cfmPasswordErr))
			flag = false;
		if(!passwordCheck(cfmPassword,password,cfmPasswordErr,passErr))
			flag = false;

		

		if(flag == true){		
			if(!checkDB(userRegister, userErr))
				dbCheckResult = false;
		}
		
		if(flag == true && dbCheckResult == true)
			return true;
		
		else{
		
			return false ;
		}
		
	}

	function checkDB(username, errObj)
	{
		var result = false;
		$.ajax({
			url:'FindUser',
			async: false,
			type: 'POST',
			datatype: 'json',
			data: $('#registerForm').serialize(),
			success: function(data){
				if(data.isExist)
				{
					errObj.innerHTML = "Username already exist";
					errObj.style.display = "inline";
					errObj.style.color = "Red";	
					
				}
				else
					result=true;
			},
			error: function(e) {
				alert("error in ajax function");
			}
		});
		return result;
	}
	
	function isValueEmpty(obj) {

		if (obj.value.trim().length == 0)
			return true;

		return pagepageState = false;
	}
	function OnlyLetters(obj, errObj) {

		if (!isValueEmpty(obj)) {

			var result = /^[a-zA-Z]+$/.test(obj.value);
			if (!result) {
				errObj.innerHTML = "A name can have only letters";
				errObj.style.display = "inline";
				errObj.style.color = "Red";				
				return  false;
			} else {
				errObj.style.display = "none";
				
				return true;
			}
		} else {
			errObj.style.display = "inline";
			errObj.style.color = "Red";
			errObj.innerHTML = "A name can't be empty";
			
			return false;
		}

	}

	function userValidate(obj, errObj) {
		var text = obj.value;

		var reg = /^[a-zA-Z\d.]+$/;
		if (!isValueEmpty(obj)) {

			if (text.charAt(0) == "." || text.charAt((text.length - 1)) == ".") {
				errObj.innerHTML = "Value can't have '.' at start or end";
				errObj.style.display = "inline";
				errObj.style.color = "Red";
				
				return false;
			} else {
				var result = reg.test(obj.value);
				if (!result) {
					errObj.innerHTML = "Value can have only letters numbers and '.''";
					errObj.style.display = "inline";
					errObj.style.color = "Red";
					
					return false;
				} else {
					errObj.style.display = "none";
					
					return true;
				}

			}
		} else {
			errObj.innerHTML = "Username can't be empty";
			errObj.style.display = "inline";
			errObj.style.color = "Red";
			
			return false;
		}

	}

	function passwordCheck(pass, otherPass, passErr, otherPassErr) {

		if (pass.value.trim() == "") {
			passErr.innerHTML = "Password can't be empty";
			passErr.style.display = "inline";
			passErr.style.color = "Red";
			
			return false;
		}

		if (pass.value.trim() != "" && otherPass.value.trim() == "") {
			passErr.style.display = "none";			
			return true;
		}

		if (pass.value.trim() == otherPass.value.trim()) {
			passErr.style.display = "none";
			otherPassErr.style.display = "none";			
			return true;
		} else {
			passErr.innerHTML = "Password does not match";
			passErr.style.display = "inline";
			passErr.style.color = "Red";			
			return false ;
			
		}
	}

	function validateEmail(obj, emailErr) {
		var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

		if (!re.test(obj.value)) {

			emailErr.innerHTML = "Email is incorrect";
			emailErr.style.display = "inline";
			emailErr.style.color = "Red";			
			return false;
			
		} else {

			emailErr.style.display = "none";			
			return true ;
		}

	}