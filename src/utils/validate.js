/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername (str) {
  const validMap = ['admin', 'editor']
  return validMap.indexOf(str.trim()) >= 0
}
// 校验手机号码
export const validateUsername = (rule, value, callback) => {
  if (!value || !/^1[3456789]\d{9}$/.test(value)) {
    callback(new Error('请输入正确的手机号码'))
  } else {
    callback()
  }
}
// 校验密码
export const validatePassword = (rule, value, callback) => {
  if (value.length < 6) {
    callback(new Error('密码不能少于6位'))
  } else {
    callback()
  }
}


var validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (this.ruleForm.checkPass !== '') {
      this.$refs.ruleForm.validateField('checkPass')
    }
    callback()
  }
}

