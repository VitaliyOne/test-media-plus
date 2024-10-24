document.addEventListener('DOMContentLoaded', () => {
    const initAnimations = () => {
        const items = document.querySelectorAll('.item');
        const startButton = document.querySelector('.btn-start');
        const logContainer = document.querySelector('.bottom-section__content');

        if (!items.length || !startButton || !logContainer) {
            console.error("Ошибка: Элементы или кнопка не найдены");
            return;
        }

        let completedAnimations = 0;

        // Функция для очистки блока логов
        const clearLog = () => {
            logContainer.innerHTML = '';
        };

        // Функция для добавления сообщения в лог
        const appendToLog = (message) => {
            const logMessage = document.createElement('p');
            logMessage.textContent = message;
            logContainer.appendChild(logMessage);
            logContainer.scrollTop = logContainer.scrollHeight; //автоматический скроллинг при добавлении новой строки
        };

        // Функция для установки событий анимации
        const handleAnimationEvents = (item, index) => {
            item.addEventListener('animationstart', () => {
                appendToLog(`Cell ${index + 1} Animation START`);
            });

            item.addEventListener('animationend', () => {
                appendToLog(`Cell ${index + 1} Animation END`);
                completedAnimations++;

                if (completedAnimations === items.length) {
                    appendToLog("--- PROGRESS END ---");
                    alert("Success!");
                    resetAnimations();
                    startButton.textContent = "start";
                    startButton.disabled = false; // Включаем кнопку после завершения
                }
            });
        };

        // Добавляем обработчики для каждого элемента
        items.forEach((item, index) => {
            // Устанавливаем значение переменной CSS для задержки анимации
            item.style.setProperty('--index', index);
            handleAnimationEvents(item, index);
        });

        // Функция для сброса анимаций
        const resetAnimations = () => {
            items.forEach(item => {
                item.classList.remove('item-active');
            });
            completedAnimations = 0;
        };

        startButton.addEventListener('click', () => {
            clearLog(); // Очищаем лог перед новым запуском
            appendToLog("--- PROGRESS START ---");
            resetAnimations(); // Сбрасываем классы перед повторным запуском
            startButton.textContent = "in progress";
            startButton.disabled = true; // Отключаем кнопку во время анимации

            items.forEach((item) => {
                item.classList.add('item-active');
            });
        });
    };

    initAnimations();
});
