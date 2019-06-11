$(document).ready(function(){
    var keys = Object.keys(localStorage);
    var i = keys.length;

    while ( i-- ) {
        item = JSON.parse(localStorage.getItem(keys[i]));
        html = '<tr id="row'+i+'"><td scoper="row" data-label="Imię">'+item.ownerName+'</td><td data-label="Nazwisko">'+item.ownerLastName+'</td><td data-label="Adres email">'+item.email+'</td><td data-label="numer">'+item.number+'</td><td data-label="ticket">'+item.ticket+'</td><td data-label="akcje: modyfikuj"><button class="modify-btn" value="'+keys[i]+'">Modyfikuj</button></td><td data-label="akcje: usuń"><button class="delete-btn" value="'+keys[i]+'">Usuń</button></td></tr>';
        $("#table-body").append(html);  
    }
    
    $(".delete-btn").click(function(){
        localStorage.removeItem($(this).val());
        location.reload();
    });

    $(".modify-btn").click(function(){
        var rowId = $(this).closest("tr").attr("id");
        var key = $(this).val();
        var item = JSON.parse(localStorage.getItem(key));

        $(".modify-btn").attr("disabled", true);
        $(".delete-btn").attr("disabled", true);

        // Generowanie wiersza edycyjnego
        var select = '<select id="ticket"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select> ';
        var html = '<tr><td scoper="row" data-label="Imię">'+'<input type="text" id="owner-name" value="'+item.ownerName+'">'+'</td><td data-label="Nazwisko">'+'<input type="text" id="owner-lastname" value="'+item.ownerLastName+'">'+'</td><td data-label="Adres email">'+'<input type="email" id="email" value="'+item.email+'">'+'</td><td data-label="number">'+'<input type="tel" id="number" value="'+item.number+'">'+'</td><td data-label="ticket">'+select+'</td><td data-label="akcje: zapis"><button class="save-btn">Zapisz</button></td><td data-label="akcje: anuluj"><button class="cancel-btn">Anuluj</button></td></tr>';
        // \Generowanie wiersza edycyjnego\

        $("#"+rowId).after(html);
        $("#ticket").val(item.age);

        $(".save-btn").click(function(event){
            event.preventDefault();
            var ownerName = $("#owner-name").val();
            var ownerLastName = $("#owner-lastname").val();
            var email = $("#email").val();
            var number = $("#number").val();
            var ticket = $("#ticket option:selected").val();
            
            // // WALIDACJA
            var ok = true;
            pattern_TEXTFIELD = /^[a-zA-ZąćęłńóśźżĄ�?�?�?ÓŚŹŻ\x20]{2,}$/; //wyrażenie regularne dla nazwiska
            pattern_TEXTAREA = /^[a-zA-Z0-9-!-@#$^_:,.ąćęłńóśźżĄ�?�?�?ÓŚŹŻ\x20]{2,}$/; //wyrażenie regularne dla nazwiska
            pattern_EMAIL =/^([a-zA-Z0-9])+([.a-zA-Z0-9_-])*@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-]+)+/;
            pattern_NUMBER =/^(?:\(?\+?48)?(?:[-\.\(\)\s]*(\d)){9}\)?$/;
            // Owner Name
            if(!checkTextfield("#owner-name", pattern_TEXTFIELD)) {
                ok = false;
                $("#owner-name").addClass("warning");
            }
            else {
                $("#owner-name").removeClass("warning");
                ownerName = formatTextfield(ownerName);
            }
            // Owner Lastname
            if(!checkTextfield("#owner-lastname", pattern_TEXTFIELD)) {
                ok = false;
                $("#owner-lastname").addClass("warning");
            }
            else {
                $("#owner-lastname").removeClass("warning");
                ownerLastName = formatTextfield(ownerLastName);
            }
            // Email address
            if(!checkTextfield("#email", pattern_EMAIL)) {
                ok = false;
                $("#email").addClass("warning");
            }
            else {
                // Email verification
                if(localStorage.hasOwnProperty(email) && email != item.email){
                    ok = false;
                    $("#email").addClass("warning");
                }
                else {
                    $("#email").removeClass("warning");
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

            if(ok) {
                if(item.key != key) {
                    localStorage.removeItem(key);
                }
                addToLocalStorage(ownerName, ownerLastName, email, number, ticket);
                location.reload();
            }
            else {
                return false;
            }
            // \Walidacja\        
        });

        $(".cancel-btn").click(function(){
            $(".modify-btn").attr("disabled", false);
            $(".delete-btn").attr("disabled", false);
            $(this).parent().parent().remove();
        });
    });

    $("#clear-local-storage").click(function(){
        localStorage.clear();
        location.reload();
    });

    function addToLocalStorage(ownerName, ownerLastName, email, dogName, dogBreed, age, about) {
        var object = {
            "ownerName": ownerName,
            "ownerLastName": ownerLastName,
            "email": email,
            "dogName": dogName,
            "dogBreed": dogBreed,
            "age": age,
            "about": about
        }
        key = email;
        localStorage.setItem(key, JSON.stringify(object));
    }

    function checkTextfield(fieldName, pattern) {
        if(!pattern.test($(fieldName).val()))
            return false;
        else 
            return true;
    }

    function formatTextfield(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }
        return splitStr.join(' '); 
    }

});




