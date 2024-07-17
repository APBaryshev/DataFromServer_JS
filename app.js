const list = document.querySelector('#list'); //вместо document.getElementById ('#' означает 'id')
const filter = document.querySelector('#filter');
let USERS = [];

filter.addEventListener('input', event => {
	// const { value } = event.target; //сокращенная запись от 'const value = event.target.value'
	const value = event.target.value.toLowerCase();
	const filteredUsers = USERS.filter(user => {
		return user.name.toLowerCase().includes(value);
	});
	render(filteredUsers);
});

async function start() {
	list.innerHTML = 'Loading ...';
	try {
		// fetch() – для асинхронного запроса на сервер и получения данных по URL
		const resp = await fetch('https://jsonplaceholder.typicode.com/users');

		//`распарсиваем response (добавляем await, т.к. fetch() и resp.json() работает как promise)`
		const data = await resp.json();
		//SetTimeout() для показа пользователю 'Loading ...' при обновлении стр.
		setTimeout(() => {
			USERS = data;
			render(data);
		}, 1000);
	} catch (err) {
		list.style.color = 'red';
		list.innerHTML = err.message;
	}
}

function render(users = []) {
	if (users.length === 0) {
		list.style.color = 'yellow';
		list.innerHTML = 'No such users';
	} else {
		const html = users.map(toHTML).join(''); //.join('') чтобы убрать запятые между пользователями на странице, т.к. html – это массив, который приводится к строке и данные соединяется запятыми
		list.innerHTML = html;
	}
}

function toHTML(user) {
	return `
        <li class='list-group-item'>${user.name}</li>
    `;
}

start();
