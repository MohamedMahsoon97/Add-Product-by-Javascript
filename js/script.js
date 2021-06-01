// get all elements i use it
const myForm = document.getElementById("my-form");
const myName = document.getElementById("name");
const myPrice = document.getElementById("Price");
const myCategory = document.getElementById("Category");
const myCode = document.getElementById("Code");
const mySubject = document.getElementById("subject");
const myNewProduct = document.getElementById("products");
const deleteProduct = document.getElementById("delete-product");
const deleteAllProduct = document.getElementById("clear-all");
const myAllInputs = document.querySelectorAll("input");
const myAllLabels = document.querySelectorAll("label");

var newProductArr = [];  // Array empty

// Loop to control each input lonely except the last input 
for(let i = 0; i < myAllInputs.length - 1; i++){
    myAllInputs[i].addEventListener("focus" , function(){
        myAllInputs[i].style.borderBottom = '2px solid #457bdf';
        myAllInputs[i].style.fontSize = '12px';
        myAllInputs[i].style.paddingLeft = '22px';
        myAllInputs[i].style.color = '#00f';
        myAllInputs[i].style.transition = 'all .3s ease-in-out';
    });
    myAllInputs[i].addEventListener("blur" , function(){
        myAllInputs[i].style.border = '1px solid #ddd';
        myAllInputs[i].style.fontSize = '14px';
        myAllInputs[i].style.paddingLeft = '12px';
        myAllInputs[i].style.color = 'gray';
        myAllInputs[i].style.transition = 'all .3s ease-in-out';
    });
}

// when submitted form
myForm.addEventListener("submit" , function(e){
    e.preventDefault();
    if (myName.value === '' && myPrice.value === '' && myCategory.value === '' && myCode.value === '' && mySubject.value === '') {
        var i;
        myAllLabels[0].style.color = "red";
        myAllLabels[0].innerHTML += `* Requierd *`
        myAllLabels[1].style.color = "red";
        myAllLabels[1].innerHTML += `* Requierd *`
        myAllLabels[2].style.color = "red";
        myAllLabels[2].innerHTML += `* Requierd *`
        myAllLabels[3].style.color = "red";
        myAllLabels[3].innerHTML += `* Requierd *`
        myAllLabels[4].style.color = "green";
        myAllLabels[4].innerHTML += `* optional *`

        document.body.onclick = function(){
            myAllLabels[0].style.color = "#000";
            myAllLabels[0].innerHTML = `Product Name`
            myAllLabels[1].style.color = "#000";
            myAllLabels[1].innerHTML = `Product Price`
            myAllLabels[2].style.color = "#000";
            myAllLabels[2].innerHTML = `Product Category`
            myAllLabels[3].style.color = "#000";
            myAllLabels[3].innerHTML = `Product Code`
            myAllLabels[4].style.color = "#000";
            myAllLabels[4].innerHTML = `Product Desc`
        }
    }
    var myCodeContent = myCode.value;
    var dash = myCodeContent.indexOf('-');
    if(myCode.value.length <= 11 || dash == -1 ){
        myAllLabels[3].style.color = "red";
        myAllLabels[3].innerHTML = `* must be up 10 chars and contain dash(-) before serial number *`
    }
    else
    {
        var productObj = {
            nameProd : myName.value,
            priceProd : myPrice.value,
            catProd : myCategory.value,
            codeProd : myCode.value,
            subProd : mySubject.value
        }
        newProductArr.push(productObj); // add Object of Array

        // extract  product model and product company from myCode
        var myModel = productObj['codeProd'].substr(0 , dash ); // first part
        var myCompany = productObj['codeProd'].substr( dash + 1 , myCode.value.length );  // second part

        myNewProduct.innerHTML += 
        `
            <tr>
                <td>${productObj.nameProd}</td>
                <td>${productObj.priceProd}</td>
                <td>${productObj.catProd}</td>
                <td>${myModel}</td>
                <td>${myCompany}</td>
                <td>${productObj.subProd}</td>
                <td colspan="2"><i onclick="delProduct()" class="fa fa-trash"></i></td>
            </tr>
        `
        clearInput()

        // after add a product do focus and change border
        myName.focus();
        myName.style.border = "1px solid #1963ec";
    }
});
    
// this function to clear input value
function clearInput(){
    myName.value = '';
    myPrice.value = '';
    myCategory.value = '';
    myCode.value = '';
    mySubject.value = '';
};

// this function to delete one product
function delProduct(){
    document.querySelector("#products tbody tr").remove();
}

// this function to delete one product
function clearProducts(){
    document.querySelector("#products tbody").remove();
}

// if(myNewProduct.length == 1){
//     var btn = document.createElement("button");
//     var btnText = document.createTextNode("Clear All Products");
//     btn.appendChild(btnText);
//     var main = document.getElementById("main");
//     main.appendChild(btn)
//     btn.id = "btn-clear";
// }
