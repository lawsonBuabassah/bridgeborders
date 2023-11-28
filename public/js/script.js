
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

    const carousel = document.querySelector("#carousel > div");
const totalImages = carousel.children.length;
let currentIndex = 0;

// Clone the first and last images and append/prepend them to the carousel
const firstImageClone = carousel.children[0].cloneNode(true);
const lastImageClone = carousel.children[totalImages - 1].cloneNode(true);
carousel.appendChild(firstImageClone);
carousel.insertBefore(lastImageClone, carousel.firstChild);

// Update total images count due to cloning
const updatedTotalImages = carousel.children.length;

setInterval(() => {
  // Increase the index to move to the next image
  currentIndex++;

  // Add transition (smooth slide)
  carousel.style.transition = 'transform 0.3s ease-out';
  carousel.style.transform = `translateX(-${currentIndex * (100 / (updatedTotalImages - 2))}%)`;

  // Check if the carousel is showing the cloned first image
  if (currentIndex === updatedTotalImages - 4) {
    // Use setTimeout to reset to the real first image instantly
    setTimeout(() => {
      // Remove transition to make the jump back to the start invisible
      carousel.style.transition = 'none';
      // Reset index and transform to show the real first image
      currentIndex = 1; // Since the first element is a clone of the last
      carousel.style.transform = `translateX(-${100 / (updatedTotalImages - 2)}%)`;
    }, 300); // The delay should be just less than the transition duration
  }
}, 2000); // Change to 2000ms (2 seconds) as per your requirement



};
});
