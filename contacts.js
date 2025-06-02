$(document).ready(function() {
    // Установка текущего года в футере
    $('#current-year').text(new Date().getFullYear());

    // Показать режим работы
    $('#show-hours').click(function() {
        const hours = {
            weekdays: 'Пн-Чт: 12:00-23:00',
            weekend: 'Пт-Сб: 12:00-24:00',
            sunday: 'Вс: 12:00-22:00'
        };
        
        const modalContent = `
            <div class="modal fade" id="hoursModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Режим работы</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <ul class="list-group">
                                <li class="list-group-item">${hours.weekdays}</li>
                                <li class="list-group-item">${hours.weekend}</li>
                                <li class="list-group-item">${hours.sunday}</li>
                            </ul>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        $('body').append(modalContent);
        const modal = new bootstrap.Modal(document.getElementById('hoursModal'));
        modal.show();
        
        // Удаляем модальное окно после закрытия
        $('#hoursModal').on('hidden.bs.modal', function() {
            $(this).remove();
        });
    });

    // Обработка клика по контактной информации
    $('.contact-item').click(function() {
        const type = $(this).data('type');
        let text = $(this).find('span').text();
        let message = '';
        
        switch(type) {
            case 'phone':
                message = `Хотите позвонить по номеру ${text}?`;
                break;
            case 'email':
                message = `Хотите написать на ${text}?`;
                break;
            case 'address':
                message = `Хотите открыть адрес "${text}" в навигаторе?`;
                break;
            default:
                message = text;
        }
        
        if (confirm(message)) {
            switch(type) {
                case 'phone':
                    window.open(`tel:${text.replace(/\D/g, '')}`);
                    break;
                case 'email