document.addEventListener('DOMContentLoaded', () => {

    // Typing Effect
    const text = "Ujwal\u00A0Shrestha";
    const typingElement = document.getElementById('typing-text');
    let index = 0;

    const typeText = () => {
        if (index < text.length) {
            typingElement.innerText += text[index];
            index++;
            setTimeout(typeText, 120);
        }
    };
    setTimeout(typeText, 800);

    // Hamburger Menu And Dropdown
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('nav ul');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle("active");
            hamburger.innerText = navMenu.classList.contains("active") ? "✖" : "☰";
            hamburger.style.transform = "scale(0.85)";
            setTimeout(() => hamburger.style.transform = "scale(1)", 150);
            hamburger.blur();
        });
    }

    // Smooth Scroll And Close Dropdown
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                window.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
            }
            if (navMenu && navMenu.classList.contains("active")) {
                navMenu.classList.remove("active");
                hamburger.innerText = "☰";
            }
        });
    });

    // Reveal Elements On Scroll
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const position = el.getBoundingClientRect().top;
            if (position < window.innerHeight - 100) el.classList.add("active");
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // Form Validation
    const form = document.querySelector('form');
    if (!form) return;

    const inputs = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        message: document.getElementById('message')
    };

    const createMessage = (input) => {
        const msg = document.createElement('span');
        msg.className = 'input-message';
        msg.style.color = 'red';
        msg.style.fontSize = '0.85rem';
        msg.style.position = 'absolute';
        msg.style.top = '42%';
        msg.style.left = '10px';
        msg.style.transform = 'translateY(-50%)';
        msg.style.backgroundColor = 'rgba(255,255,255,0.8)';
        msg.style.padding = '2px 5px';
        msg.style.borderRadius = '3px';
        msg.style.zIndex = '5';
        msg.style.pointerEvents = 'none';
        msg.style.opacity = 0;
        msg.style.transition = 'opacity 0.3s';
        input.parentElement.style.position = 'relative';
        input.parentElement.appendChild(msg);
        return msg;
    };

    const messages = {
        name: createMessage(inputs.name),
        email: createMessage(inputs.email),
        message: createMessage(inputs.message)
    };

    const validators = {
        name: (value) => {
            if (!value) return 'Name cannot be empty';
            if (!/^[A-Za-z\s]+$/.test(value)) return 'Only letters and spaces allowed';
            return '';
        },
        email: (value) => !value ? 'Email cannot be empty' : '',
        message: (value) => !value ? 'Message cannot be empty' : ''
    };

    const showMessage = (msgElement, text) => {
        msgElement.innerText = text;
        msgElement.style.opacity = 1;
    };

    const hideMessage = (msgElement) => {
        msgElement.style.opacity = 0;
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        Object.keys(inputs).forEach(key => {
            const value = inputs[key].value.trim();
            const error = validators[key](value);
            if (error) {
                inputs[key].style.borderColor = 'red';
                showMessage(messages[key], error);
                isValid = false;
            } else {
                inputs[key].style.borderColor = 'green';
                hideMessage(messages[key]);
            }
        });

        if (isValid) {
            form.reset();
            Object.values(inputs).forEach(input => input.style.borderColor = '');
            Object.values(messages).forEach(hideMessage);
            alert('Form submitted successfully!');
        }
    });

});
