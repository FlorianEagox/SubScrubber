$(document).ready(() => {
  $('#login-button').click(async () => {
    const { googleLoginURL: url } = await fetch('/api/v1/auth/login').then(res => res.json());
    window.location = url;
  });
});

