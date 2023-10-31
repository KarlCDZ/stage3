const lists = [
    {
        name: 'Vegetable',
        item: [
            'Carrot', 'Cucumber'
        ]
    },
    {
        name: 'Spices',
        item: [
            'Salt', 'Pepper', 'Chilli', 'Herbs', 'Curry'
        ]
    },
    {
        name: 'Fruits',
        item: [
            'Apple', 'Banana', 'Pear', 'Watermelon', 'Grape', 'Strawberry', 'Mango', 'Blackberry'
        ]
    }
];

const category = document.getElementById('category');

const listSect = document.getElementById('listSection');
const listNum = document.getElementById('listlength');
const submitNewItem = document.getElementById('submitNewItem');
var currList = 0;

function addButton (lists) {
    for (let i = 0; i < lists.length; i++) {
        let button = document.createElement('button');
        button.innerText = `(${i + 1}) ` + lists[i].name;
        button.onclick = function () {
            chooseCategory(button, lists[i].item);
        }
        console.log(button);
        category.appendChild(button);
    }
    // console.log(lists);
}

function chooseCategory (clicked, itemList) {
    const listButtons = category.children;
    currList = itemList;
    for (let i = 0; i < listButtons.length; i++) {
        listButtons[i].classList.remove('active');
    }
    clicked.classList.add('active');
    generateList(itemList);
}

function updateListStatus(){
    console.log(currList);
    listNum.innerText = `List (${currList.length})`;
}

function listAdditem (itemString) {
    let li = document.createElement('li');
    li.innerText = itemString;
    let removeButton = document.createElement('input');
    removeButton.type = "image";
    removeButton.setAttribute('src', '../public/trash.png');
    li.appendChild(removeButton);
    listSect.appendChild(li);
}

function generateList (itemList) {
    listSect.innerHTML = `<ul></ul>`;

    updateListStatus();
    for (let i = 0; i < itemList.length; i++) {
        listAdditem(itemList[i]);
    }
}

listSect.addEventListener("click", (e) => {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('active');
    }
    if (e.target.tagName === 'INPUT') {
        let item = e.target.parentElement.childNodes[0].nodeValue;
        console.log(item);
        currList.splice(currList.indexOf(item), 1);
        e.target.parentElement.remove();
        updateListStatus();
    }
})

submitNewItem.onclick = function () {
    let newItem = document.getElementById('newItem');
    console.log(newItem.value);
    console.log(currList);
    currList.push(newItem.value);
    updateListStatus();
    listAdditem(newItem.value);
}

// onload press veg for default
document.body.onload = function () {
    addButton(lists);
    category.children[0].click();
}