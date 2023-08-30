export function getCookie(name) {
  var value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return value ? unescape(value[2]) : null;
}
export function setCookie(name, value, exp) {
  var date = new Date();
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
  document.cookie =
    name + "=" + escape(value) + ";expires=" + date.toUTCString() + ";path=/";
}
export function deleteCookie(name) {
  setCookie(name, "", {
    "max-age": -1,
  });
}
