/* eslint-disable */
//export const NUMBER_REGEX = /^[0-9]{10,11}$/ // real
export const NUMBER_REGEX = /^[0-9]{10,16}$/ // temporary

// 1 letter and 1 number and 7 characters at lest
//export const PASSWORD_REGEX = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/

// any characters 7 - 16
export const PASSWORD_REGEX = /^.{7,16}$/
export const EMAIL_REGEX = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
