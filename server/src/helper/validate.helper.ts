export function validate_email(email: string): Boolean {
  const emailRegexp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  var check = emailRegexp.test(email);

  return check;
}

export function validate_number(number: string): Boolean {
  var regExp = /^[0-9]{10}$/;
  var check = regExp.test(number);

  return check;
}

export function validate_special_string(string: string): Boolean {
  var specials = /^[a-zA-Z0-9\s,'-]*$/;
  var check = specials.test(string);

  return check;
}
