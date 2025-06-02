// Анимации и улучшения интерфейса
$(document).ready(function() {
    // Плавная прокрутка
    $('a[href^="#"]').click(function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 70
        }, 800);
    });
    
    // Эффекты при наведении
    $('.card').hover(
        function() { $(this).addClass('shadow-lg').css('transform', 'translateY(-5px)'); },
        function() { $(this).removeClass('shadow-lg').css('transform', 'translateY(0)'); }
    );
    
    // Валидация форм в реальном времени
    $('#reg-password, #reg-confirm-password').on('input', function() {
        if ($('#reg-password').val() !== $('#reg-confirm-password').val()) {
            $('#reg-confirm-password').addClass('is-invalid');
        } else {
            $('#reg-confirm-password').removeClass('is-invalid');
        }
    });
    
    // Анимация логотипа
    $('#logo').hover(
        function() { $(this).css('transform', 'scale(1.05)'); },
        function() { $(this).css('transform', 'scale(1)'); }
    );
});