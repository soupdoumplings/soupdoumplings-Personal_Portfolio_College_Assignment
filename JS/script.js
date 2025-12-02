document.addEventListener('DOMContentLoaded', function () {

    var text = "Ujwal Shrestha";
    var typingElement = document.getElementById('typing-text');
    var index = 0;

    function typeText() {
        if (index < text.length) {
            typingElement.innerText = typingElement.innerText + text[index];
            index = index + 1;
            setTimeout(typeText, 120);
        }
    }
    setTimeout(typeText, 800);

    var links = document.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
        var link = links[i];
        if (link.getAttribute('href') && link.getAttribute('href').indexOf('#') === 0) {
            link.onclick = function (event) {
                event.preventDefault();
                var targetId = this.getAttribute('href').substring(1);
                var target = document.getElementById(targetId);
                if (target) {
                    var top = target.offsetTop;
                    window.scrollTo(0, top);
                }
            };
        }
    }

    var revealElements = document.getElementsByClassName('reveal');

    function revealOnScroll() {
        for (var i = 0; i < revealElements.length; i++) {
            var element = revealElements[i];
            var elementPosition = element.getBoundingClientRect().top;
            var screenHeight = window.innerHeight;
            if (elementPosition < screenHeight - 100) {
                element.className = element.className + " active";
            }
        }
    }
    window.onscroll = revealOnScroll;
    revealOnScroll();

    var form = document.getElementsByTagName('form')[0];
    if (form) {
        form.onsubmit = function (e) {
            e.preventDefault();
            alert("Thank you. Your message has been received.");
            form.reset();
        };
    }

    var hamburger = document.getElementById('hamburger');
    var navMenu = document.getElementsByTagName('nav')[0].getElementsByTagName('ul')[0];
    if (hamburger) {
        hamburger.onclick = function () {
            if (navMenu.className.indexOf('active') === -1) {
                navMenu.className = navMenu.className + " active";
                hamburger.innerText = "✖";
            } else {
                navMenu.className = navMenu.className.replace(" active", "");
                hamburger.innerText = "☰";
            }
            hamburger.blur();
        };
    }

});
