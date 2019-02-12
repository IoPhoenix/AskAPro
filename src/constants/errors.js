export const ERROR_CODE_ACCOUNT_EXISTS =
  'auth/account-exists-with-different-credential';

// if a user signs in with one of the social logins
// but there is already an account in the system 
// with this email address, the custom error message shows up
export const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and activate your social login on
  your profile settings page.`;


export const ERROR_CODE_EMAIL_IN_USE = 'auth/email-already-in-use';

export const ERROR_MSG_EMAIL_IN_USE = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign-in with one of them. Afterward, associate your accounts
  on your personal account page.`;

