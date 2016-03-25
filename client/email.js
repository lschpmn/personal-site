'use strict';

const vue = /**@type {Vue}*/ require('vue');
const axios = require('axios');

localStorage.removeItem('sentEmail');

const emailVue = new vue({
  el: '#email',
  data: {
    emailText: '',
    submitText: 'Message Me',
    error: ''
  },
  methods: {
    sendEmail: function sendEmail() {
      if(!emailVue.emailText || emailVue.emailText === 'Message Required') return emailVue.emailText = 'Message Required';
      if(localStorage.getItem('sentEmail')) return;
      localStorage.setItem('sentEmail', true);
  
      axios.post('/api/email', {email: emailVue.emailText})
        .then(res => emailVue.submitText = 'Thank You!')
        .catch(err => {
          localStorage.removeItem('sentEmail');
          if(err.status === 404) emailVue.error = `Server couldn't be reached`; 
          else emailVue.error = 'Something went wrong'
        });
    }
  }
});