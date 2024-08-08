//get total
//create product
//save in localstorage
//clear inputs
//read
//delete
//count
//update
//search
//clean data


let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')
let myTable = document.getElementById('my-table')
let deleteAll = document.getElementById('deleteAll')
let search = document.getElementById('search')
let temp;
let searchMood = 'title'

//get total
function updateTotal() {
    if (price.value != '') {
        let totalValue = (Number(price.value) || 0) + (Number(taxes.value) || 0) + (Number(ads.value) || 0) - (Number(discount.value) || 0);
        total.innerText = totalValue.toFixed(2);
        total.style.backgroundColor = 'green'
    }
    else {
        total.innerText = '00.00';
        total.style.backgroundColor = 'rgb(157, 30, 30)'
    }

}
price.addEventListener('input', updateTotal);
taxes.addEventListener('input', updateTotal);
ads.addEventListener('input', updateTotal);
discount.addEventListener('input', updateTotal);


//create product
let prodsData = JSON.parse(localStorage.getItem('prodsData')) || [];
let x = 1;
function addProd() {
    createprod = {
        id: x++,
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        category: category.value.toLowerCase()
    }
    //console.log(createprod);


    //create , update , clean data ,count
    if (title.value != '' && price.value && category.value && count.value < 100) {
        if (submit.innerHTML === 'create') {
            for (let index = 0; index < (count.value <= 0 ? 1 : (count.value || 1)); index++) {
                prodsData.push(createprod)
            }
        } else {
            prodsData[temp] = createprod
            count.style.display = 'block'
            total.style.backgroundColor = 'rgb(157, 30, 30)'
            submit.innerText = 'create'
        }
        //clear inputs
        title.value = ''
        price.value = ''
        taxes.value = ''
        ads.value = ''
        discount.value = ''
        category.value = ''
        count.value = ''
        total.innerText = '00.00';
        total.style.backgroundColor = 'rgb(157, 30, 30)'
    }

    localStorage.setItem('prodsData', JSON.stringify(prodsData))
    showData()
}

//create button function
submit.addEventListener('click', addProd);


//read
function showData() {
    let table = ''
    prodsData.forEach((element, index) => {
        table += `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${element.title}</td>
                        <td>${element.price}</td>
                        <td>${element.taxes}</td>
                        <td>${element.ads}</td>
                        <td>${element.discount}</td>
                        <th>${element.total}</th>
                        <td>${element.category}</td>
                        <td><button onclick="updateData(${index})" id="update">update</button></td>
                        <td><button onclick="deleteData(${index})" id="delete">delete</button></td>
                    </tr>
        `
    });
    myTable.innerHTML = table;

    (prodsData.length > 0) ? (deleteAll.innerHTML = `<button onclick='deleteAlll()'>Delete All (${prodsData.length})</button>`) : (deleteAll.innerHTML = '')
}
showData()


// delete
function deleteData(i) {
    prodsData.splice(i, 1)
    localStorage.prodsData = JSON.stringify(prodsData)
    showData()
}

function deleteAlll() {
    prodsData.splice(0)
    localStorage.clear()
    showData()
}


//update
function updateData(i) {
    // prodsData[i]
    temp = i
    console.log(prodsData[i]);
    title.value = prodsData[i].title
    price.value = prodsData[i].price
    taxes.value = prodsData[i].taxes
    ads.value = prodsData[i].ads
    discount.value = prodsData[i].discount
    category.value = prodsData[i].category
    count.style.display = 'none'
    total.innerText = prodsData[i].total;
    total.style.backgroundColor = 'green'
    submit.innerText = 'Update'
    scroll({
        top: 0,
        behavior: 'smooth'
    })
}


//search
function getSearchMood(id) {
    (id === 'searchTitle') ? searchMood = 'title' : searchMood = 'category'
    search.placeholder = `Search By ${searchMood}`
    search.focus()
    // search.style.scale = '1.07'
    search.value = ''
    showData()
}

function searchData() {
    let table = ''
    console.log(this.value);
    prodsData.forEach((element, index) => {
        if (searchMood == 'title') {
            if (element.title.includes(search.value.toLowerCase())) {
                table += `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${element.title}</td>
                        <td>${element.price}</td>
                        <td>${element.taxes}</td>
                        <td>${element.ads}</td>
                        <td>${element.discount}</td>
                        <th>${element.total}</th>
                        <td>${element.category}</td>
                        <td><button onclick="updateData(${index})" id="update">update</button></td>
                        <td><button onclick="deleteData(${index})" id="delete">delete</button></td>
                    </tr>`
            }
        } else {
            //searchMood = 'category'
            if (element.category.includes(search.value.toLowerCase())) {
                table += `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${element.title}</td>
                        <td>${element.price}</td>
                        <td>${element.taxes}</td>
                        <td>${element.ads}</td>
                        <td>${element.discount}</td>
                        <th>${element.total}</th>
                        <td>${element.category}</td>
                        <td><button onclick="updateData(${index})" id="update">update</button></td>
                        <td><button onclick="deleteData(${index})" id="delete">delete</button></td>
                    </tr> `
            }
        }
    });
    myTable.innerHTML = table
}
search.addEventListener('input', searchData);