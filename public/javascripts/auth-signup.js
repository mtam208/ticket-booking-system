$('.btn_login').click(function () {
    var username = $('#username').val();
    var password = $('#password').val();
    var email = $('#userEmail').val();
    var mobile = $('#userMobile').val();
    
    $('.alert_username').text('');
    $('.alert_password').text('');
    $('.alert_email').text('');
    $('.alert_mobile').text('');
    
        if (username == "") {
            $('.alert_username').text('PLEASE INPUT YOUR USERNAME');
            return false;
        }
        if (password == "") {
            $('.alert_password').text('PLEASE INPUT YOUR PASSWORD');
            return false;
        }
        if (password.length < 8) {
            $('.alert_password').text('PASSWORD MUST HAVE ATLEAST 8 CHARACTERS');
            return false;
        }
        if (email == "") {
            $('.alert_email').text('PLEASE INPUT YOUR EMAIL');
            return false;
        }
        if (mobile == "") {
            $('.alert_mobile').text('PLEASE INPUT YOUR MOBILE');
            return false;
        }
 
    $.ajax({
            url: '/auth/register',
            type: 'POST',
            data: {
                username: username,
                password: password,
                email: email,
                phone: mobile
            }, 
        })
            .then(data => {
                if (!data) { $('.alert_mobile').text('USERNAME OR EMAIL HAS EXISTED'); }
                else {setTimeout(function() {
                    swal({
                        title: "Wow!",
                        text: "SIGNUP SUCCESSFUL",
                        type: "success"
                    }, function() {
                      window.location.href ='/show';
                    });
                }, 100);}
        })
})
        // Test input

