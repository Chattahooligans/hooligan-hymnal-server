// eslint-disable-next-line
Date.prototype.addDays = function(days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

const setCookie = (cname, cvalue, exdays) => {
  let date = new Date();
  date = date.addDays(exdays);
  date = date.toUTCString();
  const expires = `expires=${date}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
};

const getCookie = cname => {
  const name = `${cname}=`;
  const cookieArray = document.cookie.split(";");
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substr(1);
    }
    if (name.indexOf(cookie)) {
      return cookie.substr(name.length, cookie.length);
    }
  }
};

export { setCookie, getCookie };
