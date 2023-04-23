// получаем все плавающие элементы
const elements = document.getElementsByClassName("floating-element");

// перебираем каждый элемент
for (let i = 0; i < elements.length; i++) {
  // начальные значения скорости и направления движения
  let speed = 3;
  let directionX = 1;
  let directionY = 1;

  elements[i].addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("floating-element")) {
      let pos1 = 0,
        pos2 = 0,
        pos3 = e.clientX,
        pos4 = e.clientY;

      // функция начала перемещения
      const dragStart = (e) => {
        // получаем текущие координаты элемента
        pos3 = e.clientX;
        pos4 = e.clientY;
      };

      // функция окончания перемещения
      const dragEnd = () => {
        // удаляем обработчик событий для перемещения мыши
        document.removeEventListener("mousemove", drag);
      };

      // функция перемещения
      const drag = (e) => {
        // вычисляем новые координаты элемента
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        // вычисляем новые координаты элемента с учетом направления движения
        const newX = elements[i].offsetLeft - pos1 + directionX * speed;
        const newY = elements[i].offsetTop - pos2 + directionY * speed;

        // проверяем, находится ли элемент за пределами окна браузера
        const isOutOfBoundsX = newX < 0 || newX > (window.innerWidth - elements[i].offsetWidth);
        const isOutOfBoundsY = newY < 0 || newY > (window.innerHeight - elements[i].offsetHeight);

        // если элемент вышел за границу, меняем направление движения
        if (isOutOfBoundsX) {
          directionX = -directionX;
        }

        if (isOutOfBoundsY) {
          directionY = -directionY;
        }

        // устанавливаем новые координаты элемента
        elements[i].style.top = `${newY}px`;
        elements[i].style.left = `${newX}px`;
      };

      // добавляем обработчик событий для перемещения мыши
      document.addEventListener("mousemove", drag);
      // добавляем обработчики событий
      elements[i].addEventListener("mouseup", dragEnd);
      elements[i].addEventListener("mousemove", dragStart);
    }
  });
}
