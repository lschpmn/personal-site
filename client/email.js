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
      if(emailVue.emailText && emailVue.emailText !== 'Message Required') {
        console.log(emailVue.emailText);
        axios.post('/api/email', {email: emailVue.emailText})
          .then(res => console.log(res.data))
          .catch(err => console.log(err.stack));
      } else {
        emailVue.emailText = 'Message Required';
      }
    }
  }
});