'use strict';

class UserService {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  get username() {
    return this._username;
  }

  set username(username) {
    // TODO: Some validations must be here
    this._username = username;
  }

  get password() {
    // Throw exception has been removed because we can't use this field properly with exception throwing
    return this._password;
  }

  set password(password) {
    // TODO: Some validations must be here
    this._password = password;
  }

  // We can use object { username: '...', password: '...' } or class User() instead of 'username' and 'password'
  static authenticateUser(username, password) {
    ({ username, password } = new this(username, password));
    // Nowadays we can better use fetch API instead:
    /* const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({username, password});
    });
    const result = await response.json(); */

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const url = `https://examples.com/api/user/authenticate`;
      const params = `username=${username}&password=${password}`;

      xhr.open('POST', url, true);

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(true);
          } else {
            reject(xhr.response);
          }
        } 
      };

      xhr.send(params);
    });
  }
}

$('form #login').click(function () {
  const username = $('#username').val();
  const password = $('#password').val();

  UserService.authenticateUser(username, password).then((result) => {
    window.location.href = '/home';
  }, (error) => {
    alert(error);
  });
});