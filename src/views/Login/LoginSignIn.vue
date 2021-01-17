<template>
  <div id="sign-in-form">
    <el-form
      ref="signInForm"
      :model="signInFormModel"
      :rules="rules"
      :label-position="'right'"
      label-width="100px"
    >
      <el-form-item label="手机" prop="phone">
        <el-input
          type="text"
          v-model="signInFormModel.phone"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="signInFormModel.password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="验证码" prop="verificationCode">
        <el-input v-model="signInFormModel.verificationCode" />
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
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm, ElMessage } from "element-plus";
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";

import { ValidationRule } from "@/types/form";
import { useRandomAscii } from "@/hooks/useRandomAscii";

type SignInFormFields = "phone" | "password" | "verificationCode";
type ValidateRulesMap = Record<SignInFormFields, ValidationRule[]>;
interface User {
  phone: string;
  password: string;
}

export default defineComponent({
  name: "LoginSignIn",
  setup() {
    // 路由
    const router = useRouter();

    // 验证码
    const {
      randomAscii,
      genNewVerificationCode,
      validateRandomAscii,
    } = useRandomAscii(4);

    // 表单验证及其规则
    const signInForm = ref<typeof ElForm>();
    const signInFormModel = reactive({
      phone: "",
      password: "",
      verificationCode: "",
    });
    const rules: ValidateRulesMap = {
      phone: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
      password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      verificationCode: [
        {
          required: true,
          validator: validateRandomAscii,
          trigger: "blur",
        },
      ],
    };

    const submitForm = () => {
      signInForm.value?.validate((valid: boolean) => {
        if (valid) {
          const registeredUser: User = JSON.parse(
            localStorage.getItem("user") || "{}"
          );
          if (
            registeredUser.phone === signInFormModel.phone &&
            registeredUser.password === signInFormModel.password
          ) {
            ElMessage.success({
              message: "登录成功",
              type: "success",
            });
            router.push({
              name: "Home",
            });
          } else {
            signInForm.value?.resetFields();
            genNewVerificationCode();
            ElMessage.error({
              message: "手机号或密码错误",
              type: "error",
            });
          }
        }
      });
    };

    return {
      signInForm,
      signInFormModel,
      rules,
      submitForm,
      randomAscii,
      genNewVerificationCode,
    };
  },
});
</script>

<style scoped lang="scss">
#sign-in-form {
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
