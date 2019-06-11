$(document).ready(function(){
   
    $("#submitBtn").click(function(event) {
        event.preventDefault();
        
        var ownerName = $("#owner-name").val();
        var ownerLastName = $("#owner-lastname").val();
        var email = $("#email").val();
        var ticket = $('input[name="ticket"]:checked').val();
        var number = $("#number").val();
        // WALIDACJA
        var ok = true;
        pattern_TEXTFIELD = /^[a-zA-ZąćęłńóśźżĄ�?�?�?ÓŚŹŻ\x20]{2,}$/; //wyra�enie regularne dla nazwiska
        pattern_TEXTAREA = /^[a-zA-Z0-9-!-@#$^_:,.ąćęłńóśźżĄ�?�?�?ÓŚŹŻ\x20]{2,}$/; //wyra�enie regularne dla nazwiska
        pattern_EMAIL =/^([a-zA-Z0-9])+([.a-zA-Z0-9_-])*@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-]+)+/;
        pattern_NUMBER =/^(?:\(?\+?48)?(?:[-\.\(\)\s]*(\d)){9}\)?$/;
        // Owner Name
        if(!checkTextfield("#owner-name", pattern_TEXTFIELD)) {
            ok = false;
            $("#owner-name-error").text("Wpisz poprawnie imie!");
        }
        else {
            $("#owner-name-error").text("");
            ownerName = formatTextfield(ownerName);
        }
        // Owner Lastname
        if(!checkTextfield("#owner-lastname", pattern_TEXTFIELD)) {
            ok = false;
            $("#owner-lastname-error").text("Wpisz poprawnie nazwisko!");
        }
        else {
            $("#owner-lastname-error").text("");
            ownerLastName = formatTextfield(ownerLastName);
        }
        // Email address
        if(!checkTextfield("#email", pattern_EMAIL)) {
            ok = false;
            $("#email-error").text("Wpisz poprawnie adres email!");
        }
        else {
            // Email verification
            if(localStorage.hasOwnProperty(email)){
                ok = false;
                $("#email-error").text("Podany email jest zaj�ty!");
            }
            else {
                $("#email-error").text("");
            }
        }

        //Number
        if(!checkTextfield("#number", pattern_NUMBER)) {
            ok = false;
            $("#number-error").text("Wpisz poprawnie numer telefonu!");
        }
        else {
            $("#number-error").text("");
            number = formatTextfield(number);
        }
        
        // kategoria biletu
        if(ticket == null) {
            ok = false;
            $("#ticket-error").text("Wybierz kategorie!");
        }
        else {
            $("#ticket-error").text("");
        }
        
        if(ok) {
            addToLocalStorage(ownerName, ownerLastName, email, ticket)
            $("#form-ticket").submit();
        }
        // \Walidacja\
    });
    function checkTextfield(fieldName, pattern) {
        if(!pattern.test($(fieldName).val()))
            return false;
        else 
            return true;
    }
    
    function addToLocalStorage(ownerName, ownerLastName, email, ticket) {
        var object = {
            "ownerName": ownerName,
            "ownerLastName": ownerLastName,
            "email": email,
            "ticket": ticket

        }
        key = email;
        localStorage.setItem(key, JSON.stringify(object));
    }

    function formatTextfield(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }
        return splitStr.join(' '); 
     }
});

  

// console.log('retrievedObject: ', JSON.parse(retrievedObject));

