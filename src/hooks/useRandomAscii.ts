import { ref } from "vue";

import { Validator } from "@/types/form";

export const useRandomAscii = (len: number) => {
  const randomAscii = ref("");

  const genRandomAscii = (length: number) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  randomAscii.value = genRandomAscii(len);

  const validateRandomAscii: Validator = (rule, value, callback) => {
    if (value === "") {
      callback("请输入验证码");
    } else if (value !== randomAscii.value) {
      callback("验证码不正确，请重新输入");
    } else {
      callback();
    }
  };

  const genNewVerificationCode = () => {
    randomAscii.value = genRandomAscii(4);
  };
  return {
    randomAscii,
    genRandomAscii,
    genNewVerificationCode,
    validateRandomAscii,
  };
};
