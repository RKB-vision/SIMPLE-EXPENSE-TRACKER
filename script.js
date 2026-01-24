// 1. GETTING ALL THE REFERENCES
let nameInp = document.querySelector("#name");
let amountInp = document.querySelector("#amount");
let addBtn = document.querySelector("#add-expense");
let totalVal=document.querySelector("#total-val")
let list=document.querySelector("#expense-list")
let searchInp=document.querySelector("#search")


// 2. GETTING THE HISTORY FROM LOCAL STORAGE
let expenses=JSON.parse(localStorage.getItem("history"))||[];
// let expenses=[];
render()

// 3. ADDING THE EXPENSE IN LIST AND RENDERING IT
addBtn.addEventListener("click",function(){
    if(nameInp.value.trim()==="" || amountInp.value<=0){
        alert("Please fill in all fields");
        return;
    }
    let name=nameInp.value;
    let amount=Number(amountInp.value);
    let exp_obj={name:name,amount:amount,id:Date.now()};
    expenses.push(exp_obj);
    nameInp.value="";
    amountInp.value="";
    render();
})


// 4. RENDERING THE EXPENSES OR SEARCHED EXPENSES IN THE LIST
function render(dataToPrint = expenses){
   let clutter="";
   let total=0;
    dataToPrint.forEach(function(item,index){
        clutter+=`
        <li><i>${item.name}</i>  : <span class="amo">$${item.amount}</span>
        <button  data-id="${item.id}" class="del-btn">Delete</button>
        <button data-id="${item.id}" class="edit-btn">Edit</button>
        </li> `;
        total+=item.amount
    }
        )
    list.innerHTML=clutter;
    totalVal.innerHTML=total;

    // PREVIOUSLY I MADE A MISTAKE ON:
    // localStorage.setItem(JSON.stringify("history",expenses))
    localStorage.setItem("history",JSON.stringify(expenses));   
}


// 5. DELETING AND EDITING THE EXPENSES
list.addEventListener("click",function(details){
    //check if the clicked element is either delete or edit button
    if (details.target.classList.contains("del-btn") || details.target.classList.contains("edit-btn")) {
    let id_giver=Number(details.target.dataset.id);
    let id=expenses.findIndex(function(item){
        return (item.id===id_giver)
    })
if (id !== -1) {
    if(details.target.classList.contains("del-btn")){
        expenses.splice(id,1)
        render()
        }

        //NO JOKES ON EDITING THE EXPENSES
    if(details.target.classList.contains("edit-btn")){
        let New_name=prompt("Enter new name",expenses[id].name)
        while(New_name.trim().length===0){
            New_name=prompt("Enter new name",expenses[id].name)
        }
        expenses[id].name=New_name;
        let New_amt=Number(prompt("Enter new amount",expenses[id].amount))
        while(New_amt<=0){
            New_amt=Number(prompt("Enter new amount",expenses[id].amount))
        }
        expenses[id].amount=New_amt;

        render();
    }}
}
})


// 6. SEARCHING THE EXPENSES
searchInp.addEventListener("input",function(){
    if(searchInp.value.trim()===""){
        render();
        return;
    }
    let search=expenses.filter(function(value){
        return (value.name.toLowerCase().includes(searchInp.value.toLowerCase()))
    })
    render(search)
})


/*
    TO ADD:
    1)sorting
    2) when we delete while seaching the search has to be used again
*/