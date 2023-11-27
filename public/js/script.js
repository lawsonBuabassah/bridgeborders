// Wrap your code in document.ready to ensure that it runs after the DOM is fully loaded
$(document).ready(function () {

    var a = 0;
    $(window).scroll(function () {

        var oTop = $('#counter').offset().top - window.innerHeight;
        if (a == 0 && $(window).scrollTop() > oTop) {
            $('.numbers').each(function () {
                var $this = $(this),
                    countTo = $this.attr('data-count');
                $({
                    countNum: $this.text()
                }).animate({
                    countNum: countTo
                },

                    {
                        duration: 2000,
                        easing: 'swing',
                        step: function () {
                            $this.text(Math.floor(this.countNum));
                        },
                        complete: function () {
                            $this.text(this.countNum);
                        }

                    });
            });
            a = 1;
        }

    });

    //create data
    $('.form1').on('submit', function(){
    
        var title = $('.form1 #title');
        var id = $('.form1 #_id');
        var description = $('.form1 #description');
        var imageUrl = $('.form1 #imageUrl');
        var modalData = {id: '655a3ba0e05fdd05eba907f1', title: title.val(), description: description.val(), imageUrl: imageUrl.val()};
  
        $.ajax({
          type: 'POST',
          url: '/update',
          data: modalData,
          success: function(data){
            location.reload();
          }
        });
  
        return false;
  
    });

    var $scrollToTopBtn = $("#scrollToTopBtn");

    $(window).scroll(function () {
        if ($(this).scrollTop() > 20) {
            $scrollToTopBtn.fadeIn();
        } else {
            $scrollToTopBtn.fadeOut();
        }
    });

    $scrollToTopBtn.click(function () {
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });

    window.onload = function() {
    document.getElementById('button').onclick = function() {
      document.getElementById('modalOverlay').style.display = 'none'
    };
};
});


