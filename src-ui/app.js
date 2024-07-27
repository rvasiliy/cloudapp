export default class App {
  mount(root) {
    root.insertAdjacentHTML('afterbegin', '<div class="wrap"></div>');

    setTimeout(() => {
      throw Error('Test error');
    }, 1000)
  }
}
