document.addEventListener('DOMContentLoaded', function() {
    // Корзина
    let cart = [];
    const cartCounter = document.getElementById('cart-counter');
    const cartTotal = document.getElementById('cart-total');
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    
    // Кнопки "В корзину"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            const price = parseInt(this.getAttribute('data-price'));
            
            addToCart(name, price);
        });
    });
    
    // Открытие корзины
    document.querySelector('.cart-btn').addEventListener('click', function(e) {
        e.preventDefault();
        renderCart();
        cartModal.show();
    });
    
    // Оформление заказа
    document.getElementById('checkout-btn').addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Корзина пуста!');
            return;
        }
        
        const orderDetails = cart.map(item => 
            `${item.name} (${item.quantity} × ${item.price} ₸)`
        ).join('\n');
        
        alert(`Заказ оформлен!\n\n${orderDetails}\n\nИтого: ${cartTotal.textContent} ₸`);
        
        cart = [];
        updateCart();
        cartModal.hide();
    });
    
    // Добавление в корзину
    function addToCart(name, price) {
        const existingItem = cart.find(item => item.name === name);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: 1
            });
        }
        
        updateCart();
        
        // Анимация кнопки
        const btn = event.target;
        btn.innerHTML = '<i class="fas fa-check"></i> Добавлено';
        btn.classList.remove('btn-outline-primary');
        btn.classList.add('btn-success');
        
        setTimeout(() => {
            btn.innerHTML = 'В корзину';
            btn.classList.remove('btn-success');
            btn.classList.add('btn-outline-primary');
        }, 1000);
    }
    
    // Обновление корзины
    function updateCart() {
        // Обновляем счетчик
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCounter.textContent = totalItems;
        
        // Обновляем общую сумму
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total;
        
        // Сохраняем в localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    // Отрисовка корзины
    function renderCart() {
        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
            cartItemsContainer.innerHTML = '';
            return;
        }
        
        emptyCartMessage.style.display = 'none';
        
        let itemsHTML = '';
        cart.forEach(item => {
            itemsHTML += `
                <div class="cart-item" data-name="${item.name}">
                    <div>
                        <h6 class="mb-1">${item.name}</h6>
                        <p class="mb-0 text-muted">${item.price} ₸ × ${item.quantity} = ${item.price * item.quantity} ₸</p>
                    </div>
                    <div class="cart-item-controls">
                        <button class="btn btn-sm btn-outline-secondary decrease-item"><i class="fas fa-minus"></i></button>
                        <span class="cart-item-quantity">${item.quantity}</span>
                        <button class="btn btn-sm btn-outline-secondary increase-item"><i class="fas fa-plus"></i></button>
                        <button class="btn btn-sm btn-outline-danger ms-2 remove-item"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            `;
        });
        
        cartItemsContainer.innerHTML = itemsHTML;
        
        // Добавляем обработчики для новых кнопок
        addCartItemEventListeners();
    }
    
    // Добавление обработчиков для элементов корзины
    function addCartItemEventListeners() {
        document.querySelectorAll('.decrease-item').forEach(button => {
            button.addEventListener('click', function() {
                const itemName = this.closest('.cart-item').getAttribute('data-name');
                const item = cart.find(item => item.name === itemName);
                
                if (item.quantity > 1) {
                    item.quantity--;
                } else {
                    cart = cart.filter(i => i.name !== itemName);
                }
                
                updateCart();
                renderCart();
            });
        });
        
        document.querySelectorAll('.increase-item').forEach(button => {
            button.addEventListener('click', function() {
                const itemName = this.closest('.cart-item').getAttribute('data-name');
                const item = cart.find(item => item.name === itemName);
                item.quantity++;
                updateCart();
                renderCart();
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const itemName = this.closest('.cart-item').getAttribute('data-name');
                cart = cart.filter(item => item.name !== itemName);
                updateCart();
                renderCart();
            });
        });
    }
    
    // Загрузка корзины из localStorage
    function loadCart() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            updateCart();
        }
    }
    
    // Инициализация
    loadCart();
});