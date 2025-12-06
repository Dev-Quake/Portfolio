// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100
    });

    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const body = document.body;

    mobileToggle.addEventListener('click', function() {
        mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
        body.style.overflow = mobileMenu.style.display === 'block' ? 'hidden' : 'auto';
        
        // Toggle hamburger icon
        const icon = this.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking on a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.style.display = 'none';
            body.style.overflow = 'auto';
            
            // Reset hamburger icon
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
            mobileMenu.style.display = 'none';
            body.style.overflow = 'auto';
            
            // Reset hamburger icon
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Navigation scroll effect
        // Navigation scroll effect - FIXED VERSION
        const navbar = document.querySelector('.navbar');
        let lastScroll = 0;

        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            // Always show navbar, just add shadow when scrolled
            navbar.style.transform = 'translateY(0)'; // Always visible
            
            if (currentScroll > 50) {
                // Add shadow when scrolled down a bit
                navbar.style.boxShadow = '0 5px 20px rgba(255, 0, 0, 0.2)';
                navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
            } else {
                // No shadow at the top
                navbar.style.boxShadow = 'none';
                navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            }
            
            lastScroll = currentScroll;
        });

    // Form submission handling
    const commissionForm = document.getElementById('commissionForm');
    
    if (commissionForm) {
        commissionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const projectName = document.getElementById('projectName').value;
            const projectType = document.getElementById('projectType').value;
            const projectDetails = document.getElementById('projectDetails').value;
            const discordUsername = document.getElementById('discordUsername').value;
            
            // Validate form
            if (!projectName || !projectType || !projectDetails || !discordUsername) {
                showAlert('Please fill in all fields.', 'error');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For this demo, we'll simulate sending via Discord
            const discordMessage = `New VFX Commission Inquiry:\n\n` +
                `**Project:** ${projectName}\n` +
                `**VFX Type:** ${projectType}\n` +
                `**Details:** ${projectDetails}\n` +
                `**Discord:** ${discordUsername}`;
            
            // Create Discord webhook URL (replace with your actual webhook if you have one)
            const webhookURL = 'https://discord.com/api/webhooks/your-webhook-url';
            
            // Show success message
            showAlert(`Thank you for your inquiry! I will contact you on Discord at ${discordUsername} within 24 hours.`, 'success');
            
            // Reset form
            commissionForm.reset();
            
            // In production, you would send this to your Discord webhook:
            // sendToDiscordWebhook(webhookURL, discordMessage);
        });
    }

    // Alert function
    function showAlert(message, type) {
        // Remove existing alerts
        const existingAlert = document.querySelector('.custom-alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        // Create alert element
        const alert = document.createElement('div');
        alert.className = `custom-alert ${type}`;
        alert.innerHTML = `
            <div class="alert-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="alert-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Add to body
        document.body.appendChild(alert);
        
        // Show alert
        setTimeout(() => {
            alert.classList.add('show');
        }, 10);
        
        // Close button
        const closeBtn = alert.querySelector('.alert-close');
        closeBtn.addEventListener('click', () => {
            alert.classList.remove('show');
            setTimeout(() => alert.remove(), 300);
        });
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (alert.parentNode) {
                alert.classList.remove('show');
                setTimeout(() => alert.remove(), 300);
            }
        }, 5000);
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Calculate offset for fixed navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add current year to footer
    const currentYear = new Date().getFullYear();
    const yearSpan = document.querySelector('.footer-bottom p');
    if (yearSpan) {
        yearSpan.innerHTML = yearSpan.innerHTML.replace('2024', currentYear);
    }

    // Particle animation enhancement
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        // Randomize animation duration and delay
        const duration = 4 + Math.random() * 4;
        const delay = Math.random() * 2;
        
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        // Randomize opacity
        particle.style.opacity = 0.3 + Math.random() * 0.7;
    });

    // Add CSS for custom alerts
    const style = document.createElement('style');
    style.textContent = `
        .custom-alert {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #111;
            border-left: 4px solid #ff0000;
            border-radius: 8px;
            padding: 15px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 15px;
            min-width: 300px;
            max-width: 400px;
            transform: translateX(150%);
            transition: transform 0.3s ease;
            z-index: 9999;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        }
        
        .custom-alert.show {
            transform: translateX(0);
        }
        
        .custom-alert.success {
            border-left-color: #00ff00;
        }
        
        .custom-alert.error {
            border-left-color: #ff0000;
        }
        
        .alert-content {
            display: flex;
            align-items: center;
            gap: 10px;
            flex: 1;
        }
        
        .alert-content i {
            font-size: 20px;
        }
        
        .alert-content i.fa-check-circle {
            color: #00ff00;
        }
        
        .alert-content i.fa-exclamation-circle {
            color: #ff0000;
        }
        
        .alert-close {
            background: none;
            border: none;
            color: #888;
            cursor: pointer;
            font-size: 14px;
            padding: 5px;
            transition: color 0.3s ease;
        }
        
        .alert-close:hover {
            color: #fff;
        }
    `;
    document.head.appendChild(style);
});

// Optional: Function to send data to Discord webhook
function sendToDiscordWebhook(webhookURL, message) {
    // This would be implemented if you set up a Discord webhook
    // For now, it's commented out since you mentioned only Discord contact
    /*
    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: message
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to send message');
        }
    })
    .catch(error => {
        console.error('Error sending to Discord:', error);
    });
    */
}

// Handle window resize for responsive adjustments
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Update AOS on resize
        AOS.refresh();
        
        // Adjust mobile menu if open
        const mobileMenu = document.querySelector('.mobile-menu');
        if (window.innerWidth > 768 && mobileMenu.style.display === 'block') {
            mobileMenu.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Reset hamburger icon
            const icon = document.querySelector('.mobile-toggle i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    }, 250);
});
