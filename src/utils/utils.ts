/* eslint-disable */

import { truncate } from "fs";

/**
 * Regx for Email
 */
export const regexEmail = /\S+@\S+\.\S+/

/**
 * Regx for Strong Password
 */
//https://dzone.com/articles/use-regex-test-password
export const regexStrongPassword = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

/* eslint-enable */


/* get initials of teams for icons if no crest available */
export const getInitials = (name) => {
  let words = name.split(' ');
  let initials = words[0].substring(0, 1).toUpperCase();

  if (words.length > 1)
    initials += words[words.length - 1].substring(0, 1).toUpperCase();

  return initials;
};

/* checks if value is a number */
export const isNumber = (value) => /^\d+$/.test(value)

export const getStyles = (value: { [key: string]: string }, classList: string[]): string => {
  let output = '';
  classList.forEach(key => {
    output += `${value[key]} `;
  });
  return output;
}


export const isMobile = (): boolean => {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i
  ];
  return toMatch.some(item => navigator.userAgent.match(item));
}

export const isIos = (): boolean => {
  const toMatch = [
    /iPhone/i
  ];
  if (toMatch.some((item) => navigator.userAgent.match(item))) {
    return true
  }
  return false
}

export const truncateString = (value: string, len: number): string => {
  if (value && value.length > len) {
    return `${value.substring(0, len - 1)}...`
  }

  return value;
}