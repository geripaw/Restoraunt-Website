$(document).ready(function() {
    // Установка текущего года
    $('#current-year').text(new Date().getFullYear());

    // Инициализация хранилища отзывов
    if (!localStorage.getItem('reviews')) {
        const initialReviews = [
            {
                id: 1,
                name: "Екатерина М.",
                email: "ekaterina@example.com",
                rating: 5,
                text: "Невероятный ужин! Стейк из конины был приготовлен идеально, а десерт просто божественный. Обслуживание на высшем уровне!",
                date: "15 мая 2023",
                avatar: "content/user1.jpg"
            },
            {
                id: 2,
                name: "Дмитрий К.",
                email: "dmitry@example.com",
                rating: 4.5,
                text: "Отличная винная карта и потрясающие блюда казахской кухни в современной интерпретации. Атмосфера очень уютная, идеально для романтического ужина.",
                date: "2 июня 2023",
                avatar: "content/user2.jpg"
            }
        ];
        localStorage.setItem('reviews', JSON.stringify(initialReviews));
    }

    let editingReviewId = null;

    function showAlert(message, type = 'success') {
        const alertHTML = `
            <div class="alert alert-${type} alert-dismissible fade show fixed-top" role="alert" style="margin-top: 56px; z-index: 1030;">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        $('#alert-container').append(alertHTML);
        
        setTimeout(() => {
            $('.alert').alert('close');
        }, 5000);
    }

    // Рейтинг звездами
    $('.rating-stars i').hover(
        function() {
            const rating = $(this).data('rating');
            highlightStars(rating);
        },
        function() {
            const currentRating = $('#review-rating').val();
            highlightStars(currentRating);
        }
    );

    $('.rating-stars i').click(function() {
        const rating = $(this).data('rating');
        $('#review-rating').val(rating);
        highlightStars(rating);
    });

    function highlightStars(count) {
        $('.rating-stars i').each(function() {
            if ($(this).data('rating') <= count) {
                $(this).removeClass('far').addClass('fas');
            } else {
                $(this).removeClass('fas').addClass('far');
            }
        });
    }

    // Загрузка отзывов
    function loadReviews() {
        const reviews = JSON.parse(localStorage.getItem('reviews'));
        const $container = $('#reviews-container');
        $container.empty();

        reviews.forEach(review => {
            const starsHTML = getStarsHTML(review.rating);
            const reviewHTML = `
                <div class="col-md-6 mb-4" data-review-id="${review.id}">
                    <div class="card h-100 review-card">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-start mb-3">
                                <div class="d-flex">
                                    <img src="${review.avatar}" alt="${review.name}" class="rounded-circle me-3" width="60" height="60">
                                    <div>
                                        <h5 class="mb-1">${review.name}</h5>
                                        <div class="text-warning">
                                            ${starsHTML}
                                        </div>
                                    </div>
                                </div>
                                <button class="btn btn-sm btn-outline-primary edit-review-btn" data-review-id="${review.id}">
                                    <i class="fas fa-edit"></i> Редактировать
                                </button>
                            </div>
                            <p class="card-text">"${review.text}"</p>
                            <small class="text-muted">${review.date}</small>
                        </div>
                    </div>
                </div>
            `;
            $container.append(reviewHTML);
        });

        // Назначаем обработчики для кнопок редактирования
        $('.edit-review-btn').off('click').on('click', function() {
            const reviewId = parseInt($(this).data('review-id'));
            editReview(reviewId);
        });
    }

    function getStarsHTML(rating) {
        let starsHTML = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                starsHTML += '<i class="fas fa-star"></i>';
            } else if (i === fullStars + 1 && hasHalfStar) {
                starsHTML += '<i class="fas fa-star-half-alt"></i>';
            } else {
                starsHTML += '<i class="far fa-star"></i>';
            }
        }
        
        return starsHTML;
    }

    // Функция редактирования отзыва
    function editReview(reviewId) {
        const reviews = JSON.parse(localStorage.getItem('reviews'));
        const review = reviews.find(r => r.id === reviewId);
        
        if (review) {
            editingReviewId = reviewId;
            $('#review-name').val(review.name);
            $('#review-email').val(review.email);
            $('#review-rating').val(review.rating);
            highlightStars(review.rating);
            $('#review-text').val(review.text);
            
            $('#reviewForm button[type="submit"]').html('<i class="fas fa-save"></i> Обновить отзыв');
            $('html, body').animate({ scrollTop: $('#reviewForm').offset().top - 100 }, 500);
        }
    }

    // Обработка формы отзыва
    $('#reviewForm').submit(function(e) {
        e.preventDefault();
        
        const name = $('#review-name').val().trim();
        const email = $('#review-email').val().trim();
        const rating = $('#review-rating').val();
        const text = $('#review-text').val().trim();
        
        if (rating == 0) {
            showAlert('Пожалуйста, поставьте оценку', 'warning');
            return;
        }
        
        if (!name || !email || !text) {
            showAlert('Пожалуйста, заполните все поля', 'danger');
            return;
        }
        
        const reviews = JSON.parse(localStorage.getItem('reviews'));
        
        if (editingReviewId !== null) {
            // Редактирование существующего отзыва
            const index = reviews.findIndex(r => r.id === editingReviewId);
            if (index !== -1) {
                reviews[index] = {
                    id: editingReviewId,
                    name,
                    email,
                    rating: parseFloat(rating),
                    text,
                    date: reviews[index].date,
                    avatar: reviews[index].avatar
                };
                
                localStorage.setItem('reviews', JSON.stringify(reviews));
                showAlert('Отзыв успешно обновлен!', 'success');
                
                // Воспроизведение звука успешного обновления
                const successSound = new Audio('zvuk.mp3');
                successSound.play();
            }
            editingReviewId = null;
            $('#reviewForm button[type="submit"]').html('<i class="fas fa-paper-plane"></i> Отправить отзыв');
        } else {
            // Добавление нового отзыва
            const newReview = {
                id: Date.now(),
                name,
                email,
                rating: parseFloat(rating),
                text,
                date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }),
                avatar: `https://i.pravatar.cc/150?u=${email}`
            };
            
            reviews.unshift(newReview);
            localStorage.setItem('reviews', JSON.stringify(reviews));
            showAlert('Спасибо за ваш отзыв!', 'success');
            
            // Воспроизведение звука успешной отправки
            const successSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3');
            successSound.play();
        }
        
        this.reset();
        $('.rating-stars i').removeClass('fas').addClass('far');
        $('#review-rating').val('0');
        loadReviews();
    });

    // Инициализация
    loadReviews();
});
