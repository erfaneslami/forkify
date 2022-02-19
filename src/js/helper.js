import { async } from 'regenerator-runtime';
import { TIME_OUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url) {
  try {
    const fetchPromise = fetch(url);
    const res = await Promise.race([fetchPromise, timeout(TIME_OUT_SEC)]);

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} - ${res.status}`);
    console.log(res);
    console.log(data);
    return data;
  } catch (error) {
    console.error(data);
  }
};
