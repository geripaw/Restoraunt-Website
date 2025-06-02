document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu initialization
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    
    if (mobileMenuBtn && navList) {
        mobileMenuBtn.addEventListener('click', function() {
            navList.classList.toggle('active');
            const icon = this.querySelector('i');
            if (icon) icon.classList.toggle('fa-times');
        });
    }

    // Team member interaction
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.querySelector('.member-info').style.opacity = '1';
        });
        
        member.addEventListener('mouseleave', function() {
            this.querySelector('.member-info').style.opacity = '0';
        });
    });
    
    // History timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    let delay = 0;
    timelineItems.forEach(item => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, delay);
        delay += 200; // Increment delay for each item
    });
});