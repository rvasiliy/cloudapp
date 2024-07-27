import { sum } from './shared/sum.js';

export default class App {
  mount(root) {
    root.insertAdjacentHTML('afterbegin', `<div class="wrap">${sum('1', 2)}</div>`);
  }
}
