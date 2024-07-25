// ___________________________
// Получаем все элементы .experts__card
const expertsCards = document.querySelectorAll('.experts__card');

// Добавляем обработчик события для каждого блока .experts__card
expertsCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    // Находим элемент .experts__content внутри текущего блока .experts__card
    const content = card.querySelector('.experts__content');

    // Добавляем класс 'hover' к элементу .experts__content
    content.classList.add('hover');
  });

  card.addEventListener('mouseleave', () => {
    // Находим элемент .experts__content внутри текущего блока .experts__card
    const content = card.querySelector('.experts__content');

    // Удаляем класс 'hover' из элемента .experts__content
    content.classList.remove('hover');
  });
});

// ______________________________________________________

function fadeIn(el, timeout, display) {
  const afterFunc = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  el.style.opacity = 0;
  el.style.display = display || 'block';
  el.style.transition = `opacity ${timeout}ms`;
  setTimeout(() => {
    el.style.opacity = 1;
    if (afterFunc) {
      setTimeout(function () {
        afterFunc();
      }, timeout);
    }
  }, 10);
}

function fadeOut(el, timeout) {
  const afterFunc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  el.style.opacity = 1;
  el.style.transition = `opacity ${timeout}ms`;
  el.style.opacity = 0;
  setTimeout(() => {
    el.style.display = 'none';
    if (afterFunc) {
      afterFunc();
    }
  }, timeout);
}

document.querySelector('.tabs').addEventListener('click', function (e) {
  if (e.target.classList.contains('goods__additional-block')) {
    e.preventDefault();
    const thisBtn = e.target; // Эта кнопка
    const tabName = thisBtn.getAttribute('btn-info'); // Эта кнопка с атрибутом "btn-info"
    const container = thisBtn.closest('.tabs'); // Эта кнопка ищет ближайшие табы
    const elseBtns = container.querySelectorAll('[btn-info]:not([btn-info="' + tabName + '"])'); // Другие кнопки в контейнере с атрибутом "btn-info", но не для этой кнопки
    const thisTab = container.querySelector('[data-tab="' + tabName + '"]'); // Этот таб ищет атрибут "data-tab"
    const elseTab = container.querySelector('[data-tab]:not([data-tab="' + tabName + '"])'); // Другие табы ищут атрибут "data-tab", но не для этого таба

    thisBtn.classList.add('is-active'); // Для этой кнопки добавляется класс "is-active"
    elseBtns.forEach(function (btn) {
      btn.classList.remove('is-active'); // Для всех остальных класс удаляется
    });

    fadeOut(elseTab, 300, function () { // Прячутся все табы
      fadeIn(thisTab, 300); // Появляется нужный
    });
  }
});

document.querySelectorAll('[data-tab-btn]').forEach(function (button) {
  button.addEventListener('click', function () {
    if (this.classList.contains('active')) {
      return;
    }
    const elseBtn = document.querySelector('.active[btn-info]');
    if (elseBtn) {
      elseBtn.classList.remove('active');
    }
    this.classList.add('active');
    const thisTab = document.querySelector('[data-tab="' + this.getAttribute('data-tab-btn') + '"]');
    const elseTab = document.querySelector('.active[data-tab]');

    if (!elseTab) {
      thisTab.classList.add('active');
      return;
    }
    thisTab.classList.add('active');
    elseTab.classList.remove('active');
    fadeOut(elseTab, 500, function () {
      fadeIn(thisTab, 500);
    });
  });
});

document.querySelector('[btn-info]').click();
