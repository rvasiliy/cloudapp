import { multi } from './shared/multi.js';

export default class App {
  mount(root) {
    root.insertAdjacentHTML('afterbegin', `<div class="wrap">${multi(1, 2)}</div>`);
  }
}
