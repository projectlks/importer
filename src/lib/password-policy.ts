export type PasswordRuleStatus = {
  label: string;
  valid: boolean;
};

const specialCharacterPattern = /[~!@#$%^&*_\-+=`|\\(){}\[\]:;"'<>,.?/]/;

export function getPasswordRuleState(password: string): PasswordRuleStatus[] {
  return [
    { label: "At least 8 characters", valid: password.length >= 8 },
    { label: "Include an uppercase letter (A-Z)", valid: /[A-Z]/.test(password) },
    { label: "Include a lowercase letter (a-z)", valid: /[a-z]/.test(password) },
    { label: "Include a number (0-9)", valid: /[0-9]/.test(password) },
    { label: "Include a special character", valid: specialCharacterPattern.test(password) },
  ];
}

export function isPasswordPolicySatisfied(password: string): boolean {
  return getPasswordRuleState(password).every((rule) => rule.valid);
}
