'use strict';

const vue = /**@type {Vue}*/ require('vue');
const axios = require('axios');

const emailVue = new vue({
  el: '#email',
  data: {
    emailText: '',
    submitText: 'Message Me'
  },
  methods: {
    sendEmail: function sendEmail() {
      if(!emailVue.emailText || emailVue.emailText === 'Message Required') return emailVue.emailText = 'Message Required';
      if(localStorage.getItem('sentEmail')) return;
      localStorage.setItem('sentEmail', true);
  
      axios.post('/api/email', {email: emailVue.emailText})
        .then(res => emailVue.submitText = 'Thank You!')
        .catch(err => console.log(err.stack));
    }
  }
});