class Product {
    name;
    code;
    category;
    price;
    stock;

    constructor(name, code, category, price) {
        this.name = name;
        this.code = code;
        this.category = category;
        this.price = price;
        this.stock = 1;
    }

    addStockInPrduct() {
        this.stock = this.stock + 1;
        console.log(this.stock)
    }

    reduceFromStockInPrduct() {
        this.stock = this.stock - 1;
        console.log(this.stock)
    }

    setPrice(price) {
        this.price = price;
    }

    update(name, code, category, price) {
        this.name = name;
        this.code = code;
        this.category = category;
        this.price = price;
    }
}

class Stoer {

    arryOfProduct = [
        new Product("first", 1, "c", 100),
        new Product("second", 2, "c", 12),
        new Product("third", 3, "a", 56),
        new Product("fourth", 3, "a", 23),
        new Product("last", 1, "b", 43)];

    getAllProducts() {
        return this.arryOfProduct;
    }

    addProduct() {
        var name = document.getElementById("name").value;
        var code = document.getElementById("code").value;
        var category = document.getElementById("category").value;
        var price = document.getElementById("price").value;

        let product = new Product(name, code, category, price)
        console.log(product)
        this.arryOfProduct.push(product);
        console.log(this.arryOfProduct);
        return this.arryOfProduct;
    }

    updateStock(d, num) {

        let name = d.name;
        function canVote(element) {
            if (element.name === name)
                element.addStockInPrduct();
        }

        function canVote1(element) {
            if (element.name === name)
                element.reduceFromStockInPrduct();
        }

        if (num === 0)
            var filtered = (this.arryOfProduct).filter(canVote);
        else
            if (num === 1)
                var filtered = (this.arryOfProduct).filter(canVote1);
        document.querySelector(".amount").innerHTML = d.stock;
    }

    updateProduct(d) {
        var name = document.getElementById("name").value;
        var code = document.getElementById("code").value;
        var category = document.getElementById("category").value;
        var price = document.getElementById("price").value;

        function check(element) {
            if (element.name === d.name)
                element.update(name, code, category, price);
        }
        var filtered = (this.arryOfProduct).filter(check);
        return this.arryOfProduct
    }

    removeProduct(d) {

        let position = store.arryOfProduct.indexOf(d);
        store.arryOfProduct.splice(position, 1);
        console.log(this.arryOfProduct);
        // let name = document.getElementById("name2").value;

        // function canVote(element) {
        //     return element.name === name;
        // }
        // var filtered = (this.arryOfProduct).filter(canVote);

        // const index = this.arryOfProduct.indexOf(filtered[0]);
        // this.arryOfProduct.splice(index, 1);
        // console.log(this.arryOfProduct);
    }

    byProductName(name) {
        let nameResults = this.arryOfProduct.filter(element => {
            return element.name === name || element.name.includes(name);
        });
        return nameResults;
    }

    byProductPrice(range1, range2) {
        let byPriceResults = this.arryOfProduct.filter(element => {
            return ((element.price) > parseInt(range1) && (element.price) < parseInt(range2))
        });
        return byPriceResults;
    }

    byProductCategory(category) {

        // let checkboxes = document.querySelectorAll('input[name="category"]:checked');
        // let values = [];
        // let categoryResults =[];
        // checkboxes.forEach((checkbox) => {
        //     values.push(checkbox.value);
        //     let bycategory = this.arryOfProduct.filter(element => {
        //         return element.category == checkbox.value
        //     });
        //     categoryResults.push(bycategory);
        // });
        // alert(values);
        let newProducts = this.arryOfProduct.filter(element => {
            return element.category === category
        });
        return newProducts
        console.log(newProducts)
    }

    outOfStock() {
        let outOfStock = this.arryOfProduct.filter(element => {
            return element.stock === 0
        });
        return outOfStock;
    }
    closeToOutOfStock() {
        let outOfStock = this.arryOfProduct.filter(element => {
            return element.stock < 2
        });
        return outOfStock;
    }

}



var store = new Stoer();

function getAllProducts() {

    drow(store.getAllProducts());
}


function drow(data) {

    data.forEach((d) => {
        var tmp = document.getElementsByTagName("template")[0];
        var element = tmp.content.cloneNode(true);

        element.querySelector(".name").innerText = d.name
        element.querySelector(".code").innerText = d.code
        element.querySelector(".category").innerHTML = d.category
        element.querySelector(".price").innerHTML = d.price
        element.querySelector(".amount").innerHTML = d.stock;
        element.querySelector(".delete").addEventListener("click", () => {
            store.removeProduct(d);
            // let position = store.arryOfProduct.indexOf(d);
            // store.arryOfProduct.splice(position, 1);
            clear();
            drow(store.arryOfProduct);
            console.log("delet")
        });
        element.querySelector(".edit").addEventListener("click", () => {
            editProduct(d);
            console.log("edit")
        });
        element.querySelector(".addToStock").addEventListener("click", () => {
            addStock(d);
            console.log("add")
        });
        element.querySelector(".lessFromStock").addEventListener("click", () => {
            reduceStock(d);
            console.log("less")
        });

        var c = document.getElementById("tbody")
        c.appendChild(element);
    })
}
function clear() {
    document.getElementById("tbody").innerHTML = "";
}

function addProduct() {
    clear();
    drow(store.addProduct());
    document.getElementById("newProduct").style.display = "none";
}

function addStock(d) {
    store.updateStock(d, 0);
}

function reduceStock(d) {
    store.updateStock(d, 1);
}

function removeProduct() {
    store.removeProduct();
}
function newProduct() {
    document.getElementById("newProduct").style.display = "block"
}
function byProductName() {
    let name = document.getElementById("search-name").value;
    clear();
    drow(this.store.byProductName(name));
}

function byProductPrice() {
    let range1 = document.getElementById("range1-price").value;
    let range2 = document.getElementById("range2-price").value;
    clear();
    drow(this.store.byProductPrice(range1, range2));

}
function byProductCategory() {
    let category = document.getElementById("searchByCategory").value;
    clear();
    drow(this.store.byProductCategory(category));

}
function outOfStock() {
    console.log(this.store.outOfStock());
}
function closeToOutOfStock() {
    console.log(this.store.closeToOutOfStock());
}
function updateProduct(p) {
    clear();
    drow(this.store.updateProduct(p));

}

function editProduct(d) {
    // document.querySelector("name").innerHTML= d.name;
    document.getElementById("editProduct").style.display = "block"
    document.getElementById("update").addEventListener("click", (() =>
        updateProduct(d)))
}

