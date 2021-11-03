"use strict";

// check field request
export function check_field(req_field: Array<string>, req_body: any) {
  let error = [];
  for (let field of req_field) {
    if (!(field in req_body)) {
      error.push(`${field} is missing!`);
    } else if (req_body[field].toString().trim() == false) {
      error.push(`${field} is required!`);
    }
  }

  return error;
}
