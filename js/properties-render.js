// const properties = [
//     { propertyName: 'Napos lakás', price: 24500000, imegUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1506&q=80' },
//     { propertyName: 'Eladó ház', price: 32700000, imegUrl: 'https://images.unsplash.com/photo-1483097365279-e8acd3bf9f18?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=999&q=80' },
//     { propertyName: 'Vidéki ház', price: 15000000, imegUrl: 'https://images.unsplash.com/photo-1472224371017-08207f84aaae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80' },
//     { propertyName: 'Felújított lakás', price: 42700000, imegUrl: 'https://images.unsplash.com/photo-1451153378752-16ef2b36ad05?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1347&q=80' },
//     { propertyName: 'Panel lakás', price: 29900000, imegUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1506&q=80' },
//     { propertyName: 'vidéki nyaraló', price: 120500000, imegUrl: 'https://images.unsplash.com/photo-1483097365279-e8acd3bf9f18?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=999&q=80' },
//     { propertyName: 'Kis ház', price: 107000000, imegUrl: 'https://images.unsplash.com/photo-1472224371017-08207f84aaae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80' },
// ];

document.addEventListener('DOMContentLoaded', () => {
    let main = document.getElementsByTagName('main')[0];
    getProperties();

    function getProperties() {
        const URL = 'http://localhost:3000/properties?_sort=id&_order=desc';
        const param = {
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            method: 'GET'
        }
        const response = fetch(URL, param);
        response
            .then(data => data.json())
            .then(resp => {
                const properties = resp;
                console.log(properties);
                renderPropertyList(properties);
            })
            .catch(err => console.log(err));
    }

    function renderPropertyList(list) {
        for (let i = 0; i < list.length; i++) {
            let property = list[i];
            const price = document.createElement('p');
            price.innerHTML = '<strong>Ár: </strong>' + (property.price / 1000000).toFixed(1) + ' M huf';
            const houseName = document.createElement('h3');
            houseName.innerText = property.name;
            const img = document.createElement('img');
            img.src = property.imegUrl;
            img.alt = 'nice house';
            const imgHolder = document.createElement('div');
            imgHolder.className = 'img-holder';
            const textHolder = document.createElement('div');
            textHolder.className = 'text-holder';
            const cardHolder = document.createElement('div');
            cardHolder.className = 'card-holder';
            textHolder.appendChild(houseName);
            textHolder.appendChild(price);
            imgHolder.appendChild(img);
            cardHolder.appendChild(imgHolder);
            cardHolder.appendChild(textHolder);
            main.appendChild(cardHolder);
        }
    }
});