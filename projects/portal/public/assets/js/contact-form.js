
$(document).ready(function () {
        $(document).on("click", '.whatsapp', function () {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                var sText = "promedi pharmacy";
                var sUrl = "http://promedipharmacy.com/";
                var sMsg = encodeURIComponent(sText) + " - " + encodeURIComponent(sUrl);
                var Mobile = 13264671179;
                var whatsapp_url = "whatsapp://send?phone=" + Mobile;
                //var whatsapp_url = "com.facebook.katana";
                window.location.href = whatsapp_url;
            }
            else {
                alert("Whatsapp client not available.");
            }
        });   
        $('ul.menubar li a').on('click',function(){
            $('button.btn-close').trigger('click')
        })  
    });