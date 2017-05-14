# EducationalPractice
Просмотреть сайт:
=======================================
* https://max-starling.github.io/EducationalPractice/public
* https://www.npmjs.com/package/myeducationalpractice
* localhost:7777
* mongodb://localhost/StarlingNews

Задание 12+ (Воскресенье 14, 19:30)
=======================================
1. Подсветка кнопок удаления, добавления и редактирования.
2. Редактирование теперь так же работает за O(1).
3. Исправлена ошибка, при которой после добавления новости не отображало картинку.
4. Теперь есть стандартная, "пустая" картинка для каждой новости, которая не будет показываться в детальном просмотре.

Задание 12+ (Воскресенье 14, 17:50)
=======================================
1. Переписана функция добавления новости так, чтобы можно было достать новый ID из базы данных.
2. Благодаря этому теперь работает корректно как удаление, так и добавление новостей. Обе функции работают за O(1).
3. Над редактированием новости ведутся работы (вскоре оно тоже будет работать за O(1)).

Задание 12+ (Суббота 13, 23:50)
=======================================
1. Теперь функция CheckUser, которая временно не использовалась из-за своей синхронности, была переписана. Это функция может провести две проверки:
* Есть ли такой пользователь в базе данных.
* Есть ли такой пользователь с таким паролем в базе данных.
2. Благодаря этой функции, теперь работает регистрация, которая основывается на внесение пользователя в базу данных, а для этого нужна предварительная проверка на существование пользователя с таким именем.
2. Регистрания не работает как авторизация. После регистрации нужно авторизироваться. Ранг нового пользователя - User.
3. Теперь, благодаря новой функции getCurrentUser, при обновлении страницы не нужно авторизироваться снова.

Задание 12+ (Суббота 13, 21.05)
=======================================
1. Появилась проблема: Дело в том, что для удаления новости нужен ID, а после добавления новости он еще не появлялся. Он появлялся только перезагрузки страницы, когда новость загружалась из базы данных. Поэтому пришлось поступить следующим образом: сперва добавлять новость в базу данных, а затем сразу же доставать её оттуда и уже после этого отображать. В этом случае удаление работает корректно. ПОЭТОМУ новость можно полностью удалить только после перезагрузки страницы (пока что), когда она будет загружена из базы данных со своим ID.
3. Удаление работает исправно, тоже за O(1).
4. Пагинация теперь работает исправно благодаря тому, что была реализована фукция getNews(skip, limit).  
5. Новости погружаются по 4 штуки по мере прокрутки вниз. Изначально подгружается 8, если (ширина экрана:высота экрана) >= 4:3, иначе подружается сразу 20. Сделано это потому, что если высота экрана достаточно велика, а новостей мало, то прокрутить страницу не получится и новости подрузить, соответственно, не получится.
7. После удаления новости подгружается одна новость, если она есть.
8. Валидация новостей возвращала значения, противоположные действительным (вместо true - false, и наоборот). Исправлено.

Задание 10+ (Суббота 13, 4.40)
=======================================
1. Изменены функции GetNew, GetNew. Теперь они реализованы c помощью Promises.
2. Добавлена функция GetSize.
3. Больше асинхронности в script.js.
4. Многое сломалось из-за пункта 3. В основном потому, что нужно реализовать функцию getNews(skip, limit) через метод GET, чем я займусь в ближайшее время.

Задание 7+ (Пятница 12, 17.10)
=======================================
1. Добавление новостей теперь не удаляет весь массив из n элементов, загружая затем массив из n+1 элементов (O(n) операций). Теперь оно происходит за константу времени = O(1).
2. Добавление новостей теперь не сбивает "плавный рендеринг" новостей.
3. Над удалением новостей ведутся работы, оно пока неисправно. 

Задание 12+ (Пятница 12, 15:55)
=======================================
1. Из базы данных экспортированы json файлы в папку '/private/jsonFromDB'.
2. Немного подправлены отступы в детальном просмотре.

Задание 7+ (Пятница 12, 2:55)
=======================================
1. Новый детальный просмотр! Элементы крупнее, окно больше, ну и конечно же... картинка!

Задание 7+ (Пятница 12, 2:05)
=======================================
1. Небольшое исправление, благодаря которому в детальном просмотре новости так же выделяются(::selection) красивым цветом.
2. Аналогично с полями textarea.

Задание 7+ (Четверг 11, 22:05)
=======================================
1. Новости теперь подгружаются по мере того, как прокручивается скроллбар (теперь оптимальнее, т.к. не приходится каждый раз удалять новости из DOM и загружать их снова).

Задание 7+ (Четверг 11, 21:05)
=======================================
1. Новости теперь подгружаются по мере того, как прокручивается скроллбар (пока не совсем оптимально, но это работает и я это пока ещё не сломал).

Задание 12+ (Четверг 11, 19:10)
=======================================
1. Все 3 массива (users, news and mentions) перенесены на MongoDB.
2. Все нужные фукнции, находившиеся в app.js, переписаны под MongoDB (кроме функций проверки существования юзера, изменения профиля и получения новости).  
3. Функция getUsers удалена.
4. Исправлена функция logOut. Теперь сессиии УДАЛЯЮТСЯ (остаются только если закрыть(обновить) страницу, не выходя из профиля). Проблема была в функции 'logout'. В связи с тем, что: 'req.logout not working with "local strategy".', пришлось искать ей замену (спасибо stackoverflow).
5. Добавлен backup для mentions.

Задание 12+ (Четверг 11, 9:05)
=======================================
1. Теперь на сайте также отображается стартовый набор новостей (который и был раньше).

Задание 12 (Четверг 11, 0:05)
=======================================
1. Усстановнены MongoDB и драйвер Mongoose.
2. Созданы модели для хранения информации в базе данных.
3. Новости показываются корректно как в базе данных, так и на сайте.
4. На данный момент работают корректно: детальный просмотр, добавление и удаление новостей.

Задание 11 (Среда 10, 2:00)
=======================================
1. Добавлены функции logIn и logOut, соответствующие заданию 11, причём функция logIn заменила уже существующую функцию checkUser, написанную ранее, но не использующую passport и promises.
2. Некоторые исправления, касающиеся других функций, использующих promises.

Задание 8+ (Понедельник 8, 20:25)
=======================================
1. Теперь все функции модальных окон, касающиеся пользователей, хранятся в библиотеке usersModal.
2. Все функции модальных окон, касающиеся новостей, за исключением поиска и сортировки (пока что), хранятся в библиотеке newsModal.

Задание 8+ (Понедельник 8, 19:50)
=======================================
1. Добавлен backup-файл для users.json.
2. Модернизирован профиль:
* Теперь можно имя пользователя и картинку профиля.
* Изменения вносятся в базу данных.
* Имя пользователя можно изменить лишь в том случае, если его длина >= 4 символов и такого имя пользователя нет в базе данных.
* Для того, чтобы изменения вступили в силу, нужно правильно ввести пароль.

Задание 8+ (Понедельник 8, 18:30)
=======================================
1. Теперь картинки разделяются на две категории : для юзеров(users) и для новостей(news).
2. Модернизирована регистрация:
* Теперь поля Email заменено повторным вводом пароля.
* Зарегистрировать пользователя получится только в том случае, если такого пользователя нет в базе данных.
* Новый пользователь заносится в базу данных.
3. Несколько маленьких исправлений.

Задание 8+ (Понедельник 8, 15:30)
=======================================
1. Изменена авторизация:
* Теперь у каждого пользователя из users после авторизации отображается своя картинка и своё звание (в дальнейшем от звания будут зависеть возможности пользователя).

Задание 8+ (Понедельник 8, 14:55)
=======================================
1. Теперь есть две библиотеки: newsService и usersService, которые работают с новостями и пользователями соответственно.
2. Теперь авторизация происходит таким образом:
* После ввода данных вызывается функция проверки пользователя методом GET, которая проверяет наличие такое пользователя в массиве users и возвращает true/false.
* Если true, то пользователь успешно изменяется.
* Если false, то окно просто закрывается (скоро будет появляться окно с соответствующей ошибкой).
3. Функция addMention перенесена в usersService.

Задание 8+ (Понедельник 8, 3:15)
=======================================
1. Добавлена функция, считывающая мнение пользователей в файл users_mention из модального окна Contact us.
2. Небольшие исправления.

Задание 9+ (Понедельник 8, 2:15)
=======================================
1. Создана отдельная библиотека (newsModal), в которой будут храниться функции, работающие с модальными окнами. Добавление, детальный просмотр, удаление новостей, а также уведомления уже перенесены туда. Сделано это, чтобы уменьшить количество js файлов (страница станет загружаться быстрее).
2. Добавлен файл(users_mention), в котором будут храниться мнения пользователей о сайте. Пока в него ничего не считывается, но уже есть пример хранения информации.

Задание 9+ (Понедельник 8, 1:30)
=======================================
1. Ошибок ESLint стало ещё меньше.
2. Кода в script.js стало меньше.

Задание 10 (Понедельник 8, 1:00)
=======================================
1. Изменения, касающиеся файла server_servise.js:
* server_servise.js переименован в news_servise. Соответствующий модуль serverService также переименован в newsService.
* Добавлены Promises для добавления, редактирования и удаления новостей. 
2. Изменения, касающиеся файла reset.css: 
* reset.css переименован в default.css.
* Теперь файл подключается в index.html (а не через @import к styles.css).
* Удалено всё лишнее из этого файла.
3. Изменения, касающиеся Profile:
* Теперь, чтобы изменения вступили в силу, нужно ввести пароль.
* Оптимизирован, как и ранее все остальные модальные окна.

Задание 8+ (Воскресенье 7, 1:30)
=======================================
1. Изменения, касающиеся добавления и редактирования новостей:
* Теперь при редактировании новости можно видеть источник изображения. Это исправило проблему: после редактирования новости картинка пропадала.
* Теперь при добавлении новости пишет текущее имя пользователя вместо "You".
* Теперь после редактирования новости автор новости остаётся неизменным (нельзя присвоить чью-то новость себе просто отредактировав её).

Задание 8+ (Суббота 6, 23:50)
=======================================
1. Теперь редактирование новостей тоже работает исправно.
2. Несколько исправлений, касающиеся выделений(::selection) на сайте.
3. Несколько улучшений, касающиеся обводки(border) элементов.

Задание 8+ (Четверг 4, 21:25)
=======================================
1. Добавлен файл backup.json, в котором будут храниться изначальные 20 новостей. (для удобства)
2. Новости снова добавляются в начало. 
3. Поиск и сортировка снова работают исправно.
4. Цвета placeholder-ов стали прежними. (более светлыми, как текст)
5. Удалены файлы, созданные программой Visual Code и добавлены в gitignore.

Задание 9+ (Четверг 4, 20:05)
=======================================
1. Теперь почти ничего не подчёркивает.
2. Было замечено, что после глобального рефакторинга почему-то сломалась сортировка, а новости добавляются в конец.

Задание 9 (Четверг 4, 19:35)
=======================================
1. В package.json добавлено всё, что нужно для работы с ESLint.
2. С помощью плагина Prettier для Visual Code было исправлено большинство ошибок компиляции ESLint, за исключением:
* Подчёркивает document, event, window.
* Подчёркивает функции, которые используются в разных файлах и некоторые функции, которые явно не вызываются.
* Подчёркивает функции, где используется "=>".
* Подчеркивает переменные, которым присваивается require.
* Подчёркивает некоторые другие, уже более редкие ошибки.

Задание 8 (Четверг 4, 0:35)
=======================================
1. Исправлены жирные линии новостей.
2. Реализованы методы GET, POST, PUT, DELETE.
3. В LocalStorage больше ничего не хранится.
4. Работают добавление, удаление, детальный просмотр и сортировка с помощью методов, указанных в пунте 2.
5. Не работают поиск и редактирование новости.
6. Авторизация и регистрация производятся так же, как и раньше.

Задание 6+ (Понедельник 17, 22:00)
=======================================
!Сломался гит в понедельник, поэтому было залито: (Вторник 18, 13:30).
1. Исправлены стили окна предупреждений.
2. Теперь элементы левой панели расположены немного иначе(по одной линии).
3. Исправлены проблемы с select(моргания цвета и мышки).
4. Теперь картинки не вылазят за рамки новостей, если высота экрана намного больше ширины.

Задание 6+ (Понедельник 17, 0:50)
=======================================
1. Добавлен блок с категориями на левую панель (к новостям пока не привязан).
2. Несколько маленьких исправлений.
3. Поменялся цвет выделения на сайте.

Задание 6+ (Воскресенье 16, 21:40)
=======================================
1. Некоторые исправления, касающиеся названий классов html.

Задание 6+ (Воскресенье 16, 21:00)
=======================================
1. Кода в стилях модальных окон стало ещё меньше. Достаточно мало, чтобы они все стали храниться в одном файле.
2. Обнаружились конфликты между добавлением и редактированием новости:
* Т.к. они строились по одному шаблону, после использования добавления новости, редактирование могло менять своё поведение: например, делать текст красным или вообще добавлять новости, а не редактировать их.
* В связи с этим пришлось их распараллелить. Теперь они не конфликтуют.
* Окно добавления новости не закрывалось при нажатии на внешнюю часть экрана, из-за того, что использовало параметры окна редактирования (а они находятся на разных слоях). Теперь оно закрывается.

Задание 6+ (Воскресенье 16, 4:04)
=======================================
1. Добавлена ссылка на github. Переход осуществляется посредством нажатия на изображение.

Задание 6+ (Воскресенье 16, 4:00)
=======================================
1. Уменьшение кода стилей.
2. Теперь название окон добавления и редактирования новостей такого же цвета, как и названия всех остальных окон.

Задание 6+ (Воскресенье 16, 3:25)
=======================================
1. Улучшение кода модальных окон добавления новости и настроек.

Задание 6+ (Воскресенье 16, 2:40)
=======================================
1. Стили модальных окон теперь наследуются, кода становится меньше. И это ещё не предел.

Задание 6+ (Суббота 15, 22:20)
=======================================
1. Изменён поиск:
  * Теперь нет поиска по умолчанию(без критериев).
  * Если попытаться нажать Enter, не выбрав ни один критерий, то в placeholder'e поиска появится надпись c просьбой выбрать критерий.
  * Если поставить критерий, то надпись исчезает. Убрать - появится снова.
2. Добавлено новое состояние окну уведомлений(notice):
  * В нём нет выбора между Yes/No, а есть просто кнопка Sure.
  * Таким образом, это просто модально окно с ознакомительной информацией.
  * Пока нигде не используется.
3. Так же есть много несколько исправлений.

Задание 6+ (Суббота 15, 2:10)
=======================================
1. Изменён поиск:
  * Теперь поиск рабоет визуально.
  * Регистры не имеют значения.
  * По умолчанию должен искать по дате(но пока что он это делает только в том случае, если уже до этого искали по какому-либо критерию).
2. Поик по дате в таком формате: 
  * Feb 05 2017
  * Ни одно из этих полей не является обязательным, но вводить именно в таком порядке(пока что), т.к. поиск осуществяется через index of.
  * Пример: Если написать просто число 17, то может вывести всё, в чём присутствует цифра 17. Выведутся все даты, содержащие такой год, или день, или время, или ещё что-либо.

Задание 6+ (Суббота 15, 0:30)
=======================================
1. Изменён поиск:
  * Структура поиска полностью переделана. Теперь его основная функция находится в модуле newModel вместе со всеми другими функциями работы с новостями.
  * Теперь поиск работает по любому критерию(ранее искал только по автору).
  * Теперь поиск возвращает не первое вхождение, а массив всех вхождений.
  * Нельзя искать сразу по двум критериям.
  * Пока работает только в консоли(но правильно).

Задание 6+ (Пятница 14, 14:20)
=======================================
1. Усовершенствован поиск:
  * Теперь вместо for используется some.
  * Поиск всё еще ищет только по автору.
2. Усовершенствована сортировка:
  * Теперь нажатие на один флажок(чекбокс) не блокирует другие чекбоксы. Т.е. теперь можно переключаться на другой флажок, не обязательно выключив первый.
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
 