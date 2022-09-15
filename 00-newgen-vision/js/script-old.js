class UserService {
  // Недопустимое ключевое слово var при объявлении свойств класса.
  // Нет необходимости объявлять эти свойства, поскольку мы будем инициализировать их в конструкторе ниже
  var username;
  var password

  constructor(username, password) {
    // При наличие геттеров, сеттеры не будут работать без явного объявления
    this.username = username;
    this.password = password;
  }

  get username() {
    // При использовании геттеров и сеттеров лучше использовать protected-поля, например, _username
    return UserService.username;
  }

  get password() {
    // При попытке получить значение поля password мы всегда будем получать исключение, поэтому его лучше убрать
    // В JS принято использовать какой-то один тип кавычек для лучшей читаемости и унификации кода.
    throw "You are not allowed to get password"
  }

  // В JS принято использовать либо CamelCase (для именования классов), 
  // либо lowerCamelCase (для именования переменных, некоторых констант и функций)
  static authenticate_user() {
    // Здесь больше подойдёт константа const
    let xhr = new XMLHttpRequest();

    // Для большей безопасности лучше использовать POST
    // Строку URL лучше вынести в отдельную константу с использованием шаблонных строк
    xhr.open('GET', 'https://examples.com/api/user/authenticate?username=' +
      UserService.username + '&password=' + UserService.password, true);
    xhr.responseType = 'json';
    
    // В данном случае мы не можем использовать константу, т.к. её значение меняется ниже, нужно использовать let
    const result = false;

    // Асинхронная функция
    xhr.onload = function() {
      // Можно использовать тернарный оператор
      if(xhr.status !== '200') {
        result = xhr.response;
      } else {
        result = true;
      }
    }

    // При попытке присвоить значение result из асинхронной функции, всегда будем получать false
    // Нужно либо использовать callback в xhr.onload, либо использовать promise
    return result;
  }
}

$('form #login').click(function() {
  // Вместо var лучше использовать const
  // Если мы хотим получить значение поля, то нужно использовать $(selector).val(), в противном случае получим DOM-элемент
  var username = $('#username');
  var password = $('#password');

  // Имя переменной ни о чём не говорит, лучше использовать, например, isUserAuthenticated
  
  /* При вызове UserService возникнет ошибка, поскольку вызов конструктора класса и создание его экземпляра
    происходит посредством ключевого слова new, к тому же мы не можем вызвать статический метод у 
    экземпляра класса, поэтому мы либо создаём экземпляр класса new UserService(username, password),
    либо используем статический метод UserService.authenticate_user()

    Вызов UserService в данном случае вернёт undefined, потому что мы пытаемся получить ответ от сервера синхронно.
    Для корректной работы данного метода, мы можем вызывать обработчик клика в качестве callback в функции xhr.onload,
    либо использовать promise.then().
  */
  var res = UserService(username, password).authenticate_user();

  if(res == true) {
    document.location.href = '/home';
  } else {
    alert(res.error);
  }
})
