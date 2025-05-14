// ES6 Class
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
      this.txtElement = txtElement;
      this.words = words;
      this.txt = '';
      this.wordIndex = 0;
      this.wait = parseInt(wait, 10);
      this.type();
      this.isDeleting = false;
    }
  
    type() {
      // Current index of word
      const current = this.wordIndex % this.words.length;
      // Get full text of current word
      const fullTxt = this.words[current];
  
      // Check if deleting
      if(this.isDeleting) {
        // Remove char
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        // Add char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }
  
      // Insert txt into element
      this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
  
      // Initial Type Speed
      let typeSpeed = 300;
  
      if(this.isDeleting) {
        typeSpeed /= 2;
      }
  
      // If word is complete
      if(!this.isDeleting && this.txt === fullTxt) {
        // Make pause at end
        typeSpeed = this.wait;
        // Set delete to true
        this.isDeleting = true;
      } else if(this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        // Move to next word
        this.wordIndex++;
        // Pause before start typing
        typeSpeed = 500;
      }
  
      setTimeout(() => this.type(), typeSpeed);
    }
  }
  
  
  // Init On DOM Load
  document.addEventListener('DOMContentLoaded', init);
  
  // Init App
  function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
  }

// Scroll Reveal Animations
ScrollReveal().reveal('.fade-in', {
  delay: 200,
  distance: '30px',
  duration: 800,
  easing: 'cubic-bezier(0.5, 0, 0, 1)',
  interval: 100,
  opacity: 0,
  origin: 'bottom',
  reset: false
});

// Handle smooth header transitions
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scrolled');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scrolled')) {
        // Scrolling down & header is visible
        header.classList.add('scrolled');
    } else if (currentScroll < lastScroll && header.classList.contains('scrolled')) {
        // Scrolling up & header is hidden
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Skills Ticker Clone
const tickerWrap = document.querySelector('.ticker-wrap');
if (tickerWrap) {
  const clone = tickerWrap.cloneNode(true);
  tickerWrap.appendChild(clone);
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form Submission Handler
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.innerHTML = 'Sending...';

    // Get form data
    const formData = new FormData(form);
    
    // Submit to Google Forms
    fetch(form.action, {
      method: 'POST',
      body: formData,
      mode: 'no-cors'
    })
    .then(() => {
      form.reset();
      submitButton.innerHTML = 'Message Sent!';
      setTimeout(() => {
        submitButton.disabled = false;
        submitButton.innerHTML = 'Send Message';
      }, 3000);
    })
    .catch(error => {
      console.error('Error:', error);
      submitButton.innerHTML = 'Error Sending';
      setTimeout(() => {
        submitButton.disabled = false;
        submitButton.innerHTML = 'Send Message';
      }, 3000);
    });
  });
}

// Project Cards Interaction
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px)';
  });

  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

// Intersection Observer for section animations
const sections = document.querySelectorAll('section');
const options = {
    root: null,
    threshold: 0.1,
    rootMargin: '-50px'
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, options);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Timeline items animation
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineOptions = {
    root: null,
    threshold: 0.2,
    rootMargin: '-50px'
};

const timelineObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, timelineOptions);

timelineItems.forEach(item => {
    timelineObserver.observe(item);
});

// Smooth PDF modal transitions
function openPdfViewer(pdfUrl) {
    const modal = document.getElementById('pdfModal');
    const viewer = document.getElementById('pdfViewer');
    viewer.src = pdfUrl;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closePdfViewer() {
    const modal = document.getElementById('pdfModal');
    const viewer = document.getElementById('pdfViewer');
    modal.classList.remove('active');
    setTimeout(() => {
        viewer.src = '';
    }, 300); // Wait for transition to complete
    document.body.style.overflow = ''; // Restore scrolling
}

// Close modal on background click
document.querySelector('.pdf-modal').addEventListener('click', (e) => {
    if (e.target.classList.contains('pdf-modal')) {
        closePdfViewer();
    }
});

// Handle escape key for modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.querySelector('.pdf-modal.active')) {
        closePdfViewer();
    }
});

// Initialize particles.js
particlesJS.load('particles-js', 'particles/particles.json', function() {
    console.log('particles.js loaded');
});

// Highlight nav tab for current section
const navLinks = [
  { id: 'about', nav: document.getElementById('nav-about') },
  { id: 'experience', nav: document.getElementById('nav-experience') },
  { id: 'projects', nav: document.getElementById('nav-projects') },
  { id: 'education', nav: document.getElementById('nav-education') },
  { id: 'contact', nav: document.getElementById('nav-contact') }
];

function highlightNav() {
  let scrollPos = window.scrollY || window.pageYOffset;
  let offset = 120; // header + margin
  let found = false;
  for (let i = navLinks.length - 1; i >= 0; i--) {
    const section = document.getElementById(navLinks[i].id);
    if (section && scrollPos + offset >= section.offsetTop) {
      navLinks.forEach(link => link.nav.classList.remove('active'));
      navLinks[i].nav.classList.add('active');
      found = true;
      break;
    }
  }
  if (!found) navLinks.forEach(link => link.nav.classList.remove('active'));
}
window.addEventListener('scroll', highlightNav);
window.addEventListener('load', highlightNav);
