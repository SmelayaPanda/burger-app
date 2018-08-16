export const checkValidity = (value, rules) => {
  if (!rules) return true
  let isValid = true
  if (rules.required) {
    isValid = value.trim() !== '' && isValid
  }
  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid
  }
  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid
  }
  if (rules.isEmail) {
    isValid = /\S+@\S+\.\S+/.test(value.trim()) && isValid
  }
  if (rules.number) {
    isValid = !isNaN(parseFloat(value)) && isFinite(value) && isValid
  }
  return isValid
}