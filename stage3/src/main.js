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
const paginationNumbers = document.getElementById('paginationNumbers');
const nextButton = document.getElementById('nextButton');
const prevButton = document.getElementById('prevButton');
const itemPerPage = 5;
var currList;
var currPage;

function addPageNumberButtons (index) {
    const pageNumber = document.createElement('button');
    pageNumber.className = 'paginationNumber';
    pageNumber.innerText = index;
    pageNumber.setAttribute('pageIndex', index);
    pageNumber.setAttribute('aria-label', 'Page' + index);
    paginationNumbers.appendChild(pageNumber);
}

function generatePageNumbers () {
    let pageCount = Math.ceil(currList.length / itemPerPage);
    paginationNumbers.innerHTML = '';
    for (let i = 1; i <= pageCount; i++) {
        addPageNumberButtons(i);
    }
}

function setCurrPage (pageNumber) {
    currPage = pageNumber;
    const prevRange = (pageNumber - 1) * itemPerPage;
    const currRange = pageNumber * itemPerPage;
    // hide elements not in this page and show elements of this page
    for (let index = 0; index < listSect.children.length; index++) {
        listSect.children[index].classList.add('hidden');
        if (index >= prevRange && index < currRange) {
            listSect.children[index].classList.remove('hidden');
        }
    }

    // set page button of this page to active and deactive others
    for (let index = 0; index < paginationNumbers.children.length; index++) {
        paginationNumbers.children[index].classList.remove('active');
        if (Number(paginationNumbers.children[index].getAttribute('pageindex')) === currPage) {
            paginationNumbers.children[index].classList.add('active');
        }
    }

    // update the previous and next button status (enable/disable)
    if (currPage === 1) {
        disableButton(prevButton);
    } else {
        enableButton(prevButton);
    }
    if (currPage === paginationNumbers.children.length) {
        disableButton(nextButton);
    } else {
        enableButton(nextButton);
    }


    updateListText();
}

paginationNumbers.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const index = Number(e.target.getAttribute('pageIndex'));
        if (index) {
            setCurrPage(index);
            updateListText();
        }
    }
})

prevButton.onclick = function () {
    setCurrPage(currPage - 1);
};

nextButton.onclick = function () {
    setCurrPage(currPage + 1);
};

function disableButton (button) {
    button.classList.add('disabled');
    button.setAttribute('disabled', true);
}

function enableButton (button) {
    button.classList.remove('disabled');
    button.removeAttribute('disabled');
}

function addCategoryButton (lists) {
    for (let i = 0; i < lists.length; i++) {
        let button = document.createElement('button');
        button.innerText = `(${i + 1}) ` + lists[i].name;
        button.onclick = function () {
            chooseCategory(button, lists[i].item);
        }
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
    generatePageNumbers();
    setCurrPage(1);
}

function updateListText () {
    listNum.innerText = `List - Page ${currPage}/${Math.ceil(currList.length / itemPerPage)} (Total - ${currList.length})`;
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
    listSect.innerHTML = '';
    updateListText();
    for (let i = 0; i < itemList.length; i++) {
        listAdditem(itemList[i]);
    }
}

listSect.addEventListener("click", (e) => {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('active');
    }
    if (e.target.tagName === 'INPUT') {
        // remove the element from page and array
        let item = e.target.parentElement.childNodes[0].nodeValue;
        console.log(item);
        currList.splice(currList.indexOf(item), 1);
        e.target.parentElement.remove();

        // regenerate the pages
        generatePageNumbers();
        if (Math.ceil(currList.length / itemPerPage) < currPage) {
            setCurrPage(currPage - 1);
        }
        else {
            setCurrPage(currPage);
        }

    }
})

submitNewItem.onclick = function () {
    // add item to the list
    let newItem = document.getElementById('newItem').value;
    currList.push(newItem);
    listAdditem(newItem);

    // regenerate the pages
    generatePageNumbers();
    setCurrPage(currPage);
}

// onload press veg for default
document.body.onload = function () {
    addCategoryButton(lists);
    category.children[0].click();
}