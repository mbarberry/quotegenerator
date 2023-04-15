import { apiURL } from '../utils/index.js';

export default class Quote {
  constructor(show) {
    this.parent = show;
  }

  createQuote(quote, ul) {
    const boundDeleteMessage = this.parent.deleteMessage.bind(this.parent);

    const button = document.createElement('button');
    button.setAttribute('class', 'deleteButton');
    button.innerText = 'Delete';
    button.addEventListener('click', function () {
      fetch(`${apiURL}/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: quote.id,
        }),
      })
        .then((resp) => resp.json())
        .then((confirmation) => boundDeleteMessage(confirmation.message));
    });

    const li = document.createElement('li');
    li.setAttribute('id', quote.id);
    li.innerText = quote.quote;
    li.append(button);

    ul.append(li);
  }
}