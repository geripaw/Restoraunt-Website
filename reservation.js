document.addEventListener('DOMContentLoaded', function() {
    const reservationForm = document.querySelector('.reservation-form');
    
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const name = document.getElementById('res-name').value;
            const email = document.getElementById('res-email').value;
            const guests = parseInt(document.getElementById('res-guests').value);
            const date = document.getElementById('res-date').value;
            
            if (!name || !email || !guests || !date) {
                alert('Please fill in all fields');
                return;
            }
            
            if (guests < 1 || guests > 10) {
                alert('Please enter between 1 and 10 guests');
                return;
            }
            
            // Create reservation object
            const reservation = {
                name,
                email,
                guests,
                date,
                time: new Date().toLocaleTimeString()
            };
            
            // Save to localStorage
            const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
            reservations.push(reservation);
            localStorage.setItem('reservations', JSON.stringify(reservations));
            
            // Show confirmation with reservation details
            alert(`Reservation confirmed for ${name}!
                   Date: ${date}
                   Guests: ${guests}
                   We've sent details to ${email}`);
            
            this.reset();
        });
    }
});