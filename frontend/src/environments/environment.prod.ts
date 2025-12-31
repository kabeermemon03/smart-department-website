export const environment = {
  production: true,
  firebase: {
    apiKey: "your-prod-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef"
  },
  adminCredentials: {
    teacher: {
      email: 'teacher@esmuet.edu.pk',
      password: 'PLACEHOLDER_USE_ENV_VAR' // Use environment variables in production
    },
    student: {
      email: 'student@esmuet.edu.pk',
      password: 'PLACEHOLDER_USE_ENV_VAR' // Use environment variables in production
    }
  }
};
