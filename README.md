# EducationalPractice
Просмотреть сайт:
=======================================
https://max-starling.github.io/EducationalPractice/public

Задание 6+ (Пятница 14, 14:20)
=======================================
1. Усовершенствован поиск:
  * Теперь вместо for используется some.
  * Поиск всё еще ищет только по автору.
2. Усовершенствована сортировка:
  * Теперь нажатие на один флажок(чекбокс) не блокирует другие чекбоксы.Т.е. теперь можно переключаться на другой флажок, не обязательно выключив первый.
3. Другие небольшие исправления. 

Задание 6+ (Пятница 14, 1:15)
=======================================
1. Добавлено модальное окно "Contact us". 
  * Там вы можете оставить свой отзыв, жалобу или же предложить мне свежую идею.
  * Теперь все элементы меню правой панели кликабельны.
2. Несколько маленьких исправлений.

Задание 6+ (Четверг 13, 20:35)
=======================================
1. Доработано окно редактирования новости. Теперь оно закрывается независимо от родителя и у него есть свой overlay. При отправке окно родителя закрывается вместе с окном редактирования.

Задание 6+ (Четверг 13, 19:30)
=======================================
1. Доработано окно с предупреждением, появляющееся при удалении новости. Теперь оно закрывается независимо от родителя и у него есть свой overlay.

Задание 6+ (Четверг 13, 19:00)
=======================================
1. Добавлено предупреждении при попытке удалить новость. При нажатии новость удаляется и закрывается как окно предупреждения, так и родителя (с родителем было не так просто). 
2. Оптимизирован детальный просмотр новости.

Задание 6+ (Вторник 11, 16:40)
=======================================
1. Восстановлен поиск:
  * Он не работал из-за того, что я в предыдущем коммите заменил фильтры на сортировку, а затем и вовсе сделал её отдельной функцией.
  * Добавлены критерии поиска, но выбирать из них самостоятельно пока нельзя. Стандартный критерий: поиск по автору (напомню, что можно вводить часть слова).
  * Сортировка и поиск пока взаимодействуют плохо, т.к. каждый раз обращаются к начальному массиву, а не к тому, который они изменяют.

Задание 6+ (Вторник 11, 14:20)
=======================================
1. Изменения касаются сортировки:
  * Теперь при нажатии на один из флажков(чекбоксов), остальные перестают быть активными до тех пор, пока на него не нажмут еще раз. Таким образом теперь нет конфликтов при нажатии на несколько флажков одновременно.
  * Теперь есть функция, я в которую удобно передавать данные одного флажка (ранее каждый обрабатывался отдельно, из-за чего код дублировался).
  * Ранее вызывалась функция получения новостей, из которой вызывалась сортировка новостей по фильтру(если он есть). Теперь эта функция независима.

Задание 7+ (Вторник 11, 1:40)
=======================================
1. Мелкие доработки, касающиеся задания 7.
2. Проект выложен на npmjs.com : https://www.npmjs.com/package/myeducationalpractice.

Задание 6+ (Понедельник 10, 23:00)
=======================================
1. Теперь в окне редактирования отображаются уже введённые данные(поля не пусты, как это было прежде).
2. Добавлена сортировка (пока что фильтры сортировки не работают совместно).
3. Добавлен localStorage (теперь изменения новостей сохраняются ((пока только новостей))).
4. Много исправлений.

Задание 6+ (Четверг 6, 20:45)
=======================================
1. Добавлена иконка сайта.
2. Немного реструктуризирован css.
3. Исправлен логотип.

Задание 6+ (Cреда 5, 18:40)
=======================================
1. Добавлены настройки с очень забавной функцией, которая работает с цветами всего сайта. Рекомендую посмотреть :)

Задание 6+ (Вторник 4, 19:00)
=======================================
1. Теперь новый пункт меню "Профиль" перенял все поля, которые ранее находились в "Настройках". В "Настройках" позднее будет находиться что-нибудь интересное, что доступно даже неавторизированным пользователям.
2. Подправлены линии в правом меню (из-за того, что скрывались только внутренние элементы, бордеры оставались видимы).
3. Ограничение символов поля "Email" увеличилось с 16 до 32 символов.

Задание 6+ (Вторник 4, 18:00)
=======================================
1. Теперь регистрация работает так же, как раньше авторизация (скрываются одни элементы меню и появляются другие).
2. Кнопки удаления и редактирования новости теперь фиксированного размера в vw (при масштабировании не увеличиваются).
3. Функция выхода теперь в отдельном js файле, а не в авторизации.
4. Обработки кнопок через querySelectorAll и forEach там, где это не нужно, теперь нет.
5. В настройках теперь не обязательно каждый раз вводить новый логин и новый пароль. Можно изменять любое поле независимо от других и сохранять его.
6. Теперь стоит ограничение на количество вводимых символов в авторизации, регистрации и настройках(везде кроме ссылок по 16). Эта функция берёт часть работы валидации на себя, а так же не позволяет вводить пользователям в поля сколько угодно символов.
7. Код становится проще и доступнее, делаются блоки кода с пометками, в которых переменные упорядовиваются по алфавиту.
8. Начал заменять все var на const (переменная не изменяется, только её параметры) / let (переменной присваиваются новые значения).

Задание 6+ (Вторник 4, 1:00)
=======================================
1. Теперь при успешной авторизации(нажатие на Log in, заполнение полей) происходит следующее:
  * Как и ранее, заменяются логин и звание пользователя.
  * Как и ранее, появляются кнопки взаимодействия с новостями.
  * Вместо регистрации появляется кнопка настроек.
  * Кнопка Log in сменяется кнопкой Log out.
2. Теперь при выходе (нажатие на Log out) происходит следующее:
  * Звание пользователя возвращает значение "Guest".
  * Имя пользователя заменяется на "Unknown".
  * Картинка изменяется на стандартную.
  * Пропадают кнопки взаимодействия с новостями.
  * Log in заменяет Log out.
  * Кнопка регистрации заменяет настройки.
3. С регистрацией это всё пока не работает, но скоро будет.

Задание 6+ (Понедельник 3, 23:55)
=======================================
1. Добавлены настройки
2. И ещё несколько маленьких исправлений

Задание 6+ (Понедельник 3, 21:35)
=======================================
1. Код реструктуризирован. Теперь один js и один css файл подразбиты на маленькие файлы.
2. Добавлена регистрация.
3. Редизайн авторизации.
4. И еще несколько маленьких исправлений.

Задание 6-7 (Понедельник 3, 19:40)
=======================================
1. Теперь формы закрываются автоматически после ввода данных.
2. Теперь некоторые элементы на сайте выделить нельзя.
3. И еще много маленьких исправлений.
4. Добавлена часть Задания 7.

Задание 6+ (Воскресенье 2, 20:15)
=======================================
1. Теперь работает авторизация:
  * Форма авторизации открывается при нажатии кнопки Log in на правой панели.
  * Имя пользователя должно быть в пределах (0,16] символов. Если введено неверно, но буквы окрасятся в цвет крови(бордовый цвет).
  * Пароль - в пределах [4,16] символов. Окрашивается бордовым, если нарушен предел.
  * Пароль отображается точками. 
  * Если логин и пароль введены верно, то:
  1. Цвета станут прежними.
  2. Имя юзера изменится на введённое.
  3. Должность юзера изменится на должность администратора и окрасится в соответствующий цвет.
  4. Появятся кнопки добавления, удаления и редактирования новости там, где они располагались до добавления авторизации.
  5. Форма авторизации не закроется, но ее можно закрыть, кликнув на внешнюю часть окна.

Задание 6+ (Воскресенье 2, 15:30)
=======================================
1. Теперь работает функция редактирования новости:
  * Редактировать новость можно в детальном просмотре новости.
  * Кнопка редактирования - карандаш в верхнем правом углу.
  * После редактирования новости, она изменяется в списке новостей, но её детальный просмотр всё еще открыт(старая его форма). Если вы его закроете, а потом откроете снова, то содержимое заменится.
  * После редактирования дата остаётся прежней.
  * После редактирование автор заменяется на ваш никнейм.
  * Редактируя новость, можно заполнять не все поля.
2. Пофикшен баг с удалением новостей (ранее они удалялись арифместической прогрессией(если и вовсе не последовательностью Фибоначчи)).
3. При редактировании новости на данный момент поля нужно заполнять с нуля.
4. После редактирования/добавления новости настройка поиска сбивается.

Задание 6+ (Воскресенье 2, 3:34)
=======================================
1. Теперь работает функция удаления новости:
  * Удалить новость можно в детальном просмотре новости.
  * Кнопка удаления - крестик в верхнем правом углу.
  * После удаления новости, она пропадает из списка новостей, но её детальный просмотр всё еще открыт(клик на внешнюю часть экрана закрывает его).

Задание 6+ (Воскресенье 2, 2:24)
=======================================
1. Теперь работает функция добавления новости:
  * При ошибке валидации выдает ее в консоль, закрывает окно добавления, новость не выводит.
  * Если новость прошла валидацию, она появляется в списке новостей, окно добавления закрывается.

Задание 6+ (Среда 29, 18:40)
=======================================
1. Теперь поиск работает с любым регистром:
 * Примеры: Le, le, lE => найдёт Lewis.

Задание 6+ (Среда 29, 02:35)
=======================================
1. Проблема с формами решена.
2. Теперь работает поиск(отправить - Enter):
  * Можно вводить полное имя.
  * Можно часть имени.  
  * НО пока что регистр имеет значение (если имя начинается с большой буквы, то она должна присутствовать в слове из поискового запроса). 
  примеры: Le, An, de, Ca.
  * Если ничего не вводить, или же просто нажать Enter, то выводит все новости.
3. Добавлен курсор

Задание 6 (Понедельник 27, 20:05)
=======================================
1. Кнопку "Показать ещё" заменяет scrollbar
2. Возникли некоторые проблемы с сохранением данных из форм. Принажатии на кнопку Enter данные устанавливаются, а затем сразу же стираются,
на то, чтобы я потратил очень много времени (часов 6-7), но у меня так и не вышло, поэтому поиск, авторизация и регистрация работают
не полностью.
3. Добавление и удаление не успел, но это не сложно.
 