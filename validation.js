

function clearErrors(){

    errors = document.getElementsByClassName('formerror');
    for(let item of errors)
    {
        item.innerHTML = "";
    }


}
function seterror(id, error){
    //sets error inside tag of id 
    element = document.getElementById(id);
    element.getElementsByClassName('formerror')[0].innerHTML = error;

}

function validateForm(){
    var returnval = true;
    clearErrors();

    //perform validation and if validation fails, set the value of returnval to false
    var name = document.forms['myForm']["username"].value;
    if (name.length<5){
        seterror("name", "<h6>*Length of Username is too short<h6>");
        returnval = false;
    }

    if (name.length == 0){
        seterror("name", "<h6>*Length of name cannot be zero!<h6>");
        returnval = false;
    }

    var phone = document.forms['myForm']["mobile"].value;
    if (phone.length != 10){
        seterror("phone", "<h6>*Phone number should be of 10 digits!<h6>");
        returnval = false;
    }

    var password = document.forms['myForm']["password"].value;
    if (password.length < 5){
        seterror("password", "<h6>*Password should be atleast 5 characters long!<h6>");
        returnval = false;
    }

    var cpassword = document.forms['myForm']["confirm_password"].value;
    if (cpassword != password){
        seterror("confirm_password", "<h6>*Password and Confirm password should match!<h6>");
        returnval = false;
    }

    return returnval;
}

