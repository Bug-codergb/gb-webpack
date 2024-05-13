import App from './vue/App.vue';
import axios from 'axios';
import { createElement } from './js/index';
import { createApp } from 'vue';
import './style/css/common.css';
import './style/less/common.less';
import './style/scss/common.scss';
import { getContainer } from './js/eslint-test';
import bgc from './assets/img/anni.jpeg';

const app = createApp(App);
app.mount('#app');

const root = createElement(
  'div',
  {
    style: {
      width: '100%',
      height: '200px',
      backgroundColor: 'pink',
      display: 'flex'
    },
    className: 'root'
  },
  [
    createElement('div', {
      style: {
        width: '200px',
        height: '100%'
      },
      className: 'item'
    }),
    createElement('div', {
      style: {
        width: '200px',
        height: '100%',
        'background-image': `url(${bgc})`,
        'background-size': 'contain'
      },
      className: 'item',
      onClick: () => {
        axios({
          baseURL: 'http://localhost:3000/api',
          method: 'get',
          url: '/list',
          params: {
            id: 12
          }
        }).then(res => {
          // console.log(res.data)
        });
      }
    }),
    createElement('div', {
      style: {
        width: '200px',
        height: '100%'
      },
      className: 'item'
    }),
    createElement('div', {
      style: {
        width: '200px',
        height: '100%'
      },
      className: 'container'
    })
  ]
);
document.body.appendChild(root);
getContainer();
