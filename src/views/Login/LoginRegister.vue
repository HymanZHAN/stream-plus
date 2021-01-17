<template>
  <div id="register-form">
    <el-form
      ref="registerForm"
      :model="registerFormModel"
      :rules="rules"
      :label-position="'right'"
      label-width="100px"
    >
      <el-form-item label="手机" prop="phone">
        <el-input
          type="text"
          v-model="registerFormModel.phone"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="registerFormModel.password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="passwordConfirmation">
        <el-input
          type="password"
          v-model="registerFormModel.passwordConfirmation"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="验证码" prop="verificationCode">
        <el-input v-model="registerFormModel.verificationCode" />
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-col :span="20">
            验证码：
            <span id="random-code" @click="genNewVerificationCode">
              {{ randomAscii }}
            </span>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">
          注册
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { ElForm, ElMessage } from "element-plus";

import { ValidationRule, Validator } from "@/types/form";
import { useRandomAscii } from "@/hooks/useRandomAscii";

type RegisterFormFields =
  | "phone"
  | "password"
  | "passwordConfirmation"
  | "verificationCode";

type ValidateRulesMap = Record<RegisterFormFields, ValidationRule[]>;

export default defineComponent({
  name: "LoginRegister",

  setup() {
    const registerForm = ref<typeof ElForm>();

    const registerFormModel = reactive({
      phone: "",
      password: "",
      passwordConfirmation: "",
      verificationCode: "",
    });

    const {
      randomAscii,
      genNewVerificationCode,
      validateRandomAscii,
    } = useRandomAscii(4);

    const router = useRouter();

    // validation functions
    const validatePasswordConfirmation: Validator = (rule, value, callback) => {
      if (value === "") {
        callback("请再次输入密码");
      } else if (value !== registerFormModel.password) {
        callback("两次输入密码不一致!");
      } else {
        callback();
      }
    };

    const validatePhone: Validator = (rule, value, callback) => {
      if (value === "") {
        callback("请输入手机号码");
      } else if (isNaN(parseInt(value))) {
        callback("请输入正确手机号!");
      } else if (value.length !== 11) {
        callback("请输入正确手机号!");
      } else {
        callback();
      }
    };

    const rules: ValidateRulesMap = {
      phone: [
        {
          required: true,
          validator: validatePhone,
          trigger: "blur",
        },
      ],
      password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        {
          min: 4,
          max: 20,
          message: "密码长度为4到20个字符",
          trigger: "blur",
        },
      ],
      passwordConfirmation: [
        {
          required: true,
          validator: validatePasswordConfirmation,
          trigger: "blur",
        },
      ],
      verificationCode: [
        {
          required: true,
          validator: validateRandomAscii,
          trigger: "blur",
        },
      ],
    };

    // methods

    const submitForm = () => {
      registerForm.value?.validate((valid: boolean) => {
        if (valid) {
          ElMessage.success({
            message: "注册成功",
            type: "success",
          });
          localStorage.setItem(
            "user",
            JSON.stringify({ ...registerFormModel })
          );
          router.push({
            name: "LoginSignIn",
          });
        }
      });
    };

    return {
      submitForm,
      registerForm,
      registerFormModel,
      rules,
      randomAscii,
      genNewVerificationCode,
    };
  },
});
</script>

<style scoped lang="scss">
#register-form {
  width: 40%;
  min-width: 300px;
  margin: auto;
  padding-right: 100px;
  /* text-align: center; */
}
.el-row {
  text-align: center;
  span {
    cursor: pointer;
  }
}

#random-code {
  background-color: #909399;
  color: white;
  border-radius: 4px;
  text-align: center;
  width: 50px;
  display: inline-block;
}
</style>
