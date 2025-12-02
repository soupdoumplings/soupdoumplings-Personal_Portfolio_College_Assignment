document.addEventListener('DOMContentLoaded', function () {
    
    var text = "Ujwal Shrestha";
    var typingElement = document.getElementById('typing-text');
    var index = 0;

    function typeText() {
        if (index < text.length) {
            typingElement.innerText += text[index];
            index++;
            setTimeout(typeText, 120);
        }
    }
    setTimeout(typeText, 800);

    var links = document.querySelectorAll('a[href^="#"]');
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function (event) {
            event.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    var revealElements = document.querySelectorAll('.reveal');

    function revealOnScroll() {
        for (var i = 0; i < revealElements.length; i++) {
            var element = revealElements[i];
            var elementPosition = element.getBoundingClientRect().top;
            var screenHeight = window.innerHeight;

            if (elementPosition < screenHeight - 100) {
                element.classList.add('active');
            }
        }
    }
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    var form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            alert("Thank you. Your message has been received.");
            form.reset();
        });
    }

});
