let propertyInput = document.form.propertyname;
let priceInput = document.form.price;
let urlInput = document.form.url;

let propertyNameIsValid = false;
let priceIsValid = false;
let urlIsValid = false;

const validator = {
    rules: {
        prop: /^[A-ZÍÁÉŰÚŐÓÜÖ][a-zíáéűúőóüö ]{5,15}([a-zíáéűúőóüö ]{3,15})?$/,
        price: /^\d{1,10}$/,
        url: /^https?:\/\//
    },
    validate: function(value, rule) {
        return this.rules[rule].test(value);
    }
}

propertyInput.onmouseout = () => {
    let propertyName = propertyInput.value;
    propertyNameIsValid = validator.validate(propertyName, 'prop') ? true : false;
    document.querySelector('.error-propertyname').style.display = propertyNameIsValid ? "none" : "block";
    document.querySelector('button').disabled = allInputsAreInvalid();
}

priceInput.onmouseout = () => {
    let price = priceInput.value;
    priceIsValid = validator.validate(price, 'price') ? true : false;
    document.querySelector('.error-price').style.display = priceIsValid ? "none" : "block";
    document.querySelector('button').disabled = allInputsAreInvalid();
}

urlInput.onmouseout = () => {
    let url = urlInput.value;
    urlIsValid = validator.validate(url, 'url') ? true : false;
    document.querySelector('.error-url').style.display = urlIsValid ? "none" : "block";
    document.querySelector('button').disabled = allInputsAreInvalid();
}

document.querySelector('button').addEventListener('click', () => {
    const property = {
            name: propertyInput.value,
            price: priceInput.value,
            imegUrl: urlInput.value
        }
        // Fetch api-val:
    const URL = 'http://localhost:3000/properties';
    const param = {
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        method: 'POST',
        body: JSON.stringify(property)
    }
    const response = fetch(URL, param);
    response.then(data => data.json())
        .then(resp => {
            const savedProp = resp;
            alert(`${property.name} has been successfully saved!`);
            window.location = 'properties.html';
        })
        .catch(err => console.log(err));
});

function allInputsAreInvalid() {
    let allInvalid = true;
    if (propertyNameIsValid && priceIsValid && urlIsValid) {
        allInvalid = false;
    }
    return allInvalid;
}