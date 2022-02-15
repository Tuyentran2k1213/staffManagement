const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// get input name element
const inputFind = $('.form-control.pt-4.pb-4');

// get button click element
const find = $('.btn.btn-outline-secondary.pr-4.pl-4.input-group-text');
const addMore_btn = $('#addMore');
const changeToEnable = $('.changeToEnable');

//render information's place on the screen
const table = $('#bodyTable');

//shared variables
var Liststaff = [];
var isDisable = false;

//save and render data
var strData = localStorage.getItem('raw');
var data = JSON.parse(strData);
if(data){
    Liststaff = data;
    render(Liststaff);
}


function findfStaffbyId(list){
    var length = Liststaff.length;
    var index = -1;
    if(length > 0){
        for(i = 0; i < length; ++i){
            if(Liststaff[i].idsta == list){
                index = i;
            }
        }
    }
    return index;
}

function findfStaffbyName(){
    var name = inputFind.value;
    var index = [];
    for(i = 0; i < Liststaff.length; ++i){
        if(Liststaff[i].namesta == name){
            index.push(i);
        }
    }
    return index;
}

function findName(){
    var nameIndex = findfStaffbyName();
    if(nameIndex.length > 0){
        var ListNamestaff = nameIndex.map((named) => Liststaff[named]);
    }
    render(ListNamestaff);
}

function dele(id){
    var index = findfStaffbyId(id);
    if(index != -1){
        Liststaff.splice(index, 1);
    }
    saveData();
    render(Liststaff)
}

function edit(value){
    var index = findfStaffbyId(value);
    var inputValue = Liststaff[index].idsta;
    $('#Id').value = inputValue;
    isDisable = true;
    disableInput(isDisable);
}

function disableInput(value){
    if(value){
        addMore_btn.innerText = `Sửa thông tin`;
        $('#Id').disabled = true;
    } else{
        addMore_btn.innerText = `Thêm người dùng`;
        $('#Id').disabled = false;
    }
    
}

function render(staffss){
    var staffs = Array.from(staffss);
    var HTMLtext = '';
for(var i = 0; i < staffs.length; ++i){
    staff = staffs[i];
    HTMLtext += `<tr>
    <td data-th="Movie Title">${staff.idsta}</td>
    <td data-th="Genre">${staff.namesta}</td>
    <td data-th="Year">${staff.mailsta}</td>
    <td data-th="Gross">${staff.birthsta}</td>
    <td data-th="Year">${staff.possta}</td>
    <td data-th="Gross">
      <button type="button" onclick="edit(${staff.idsta})" class="btn btn-info" data-toggle="modal" data-target="#exampleModal" data-whatever="@getbootstrap">Edit</button>
      <button type="button" onclick="dele('${staff.idsta}')" class="btn btn-danger">Delete</button>
    </td>
  </tr>`;
}

  table.innerHTML = HTMLtext;
}

function saveData(){
    var rawData = JSON.stringify(Liststaff);
    localStorage.setItem('raw', rawData);
}

//onclick even
changeToEnable.onclick = function(){
    isDisable = false;
    disableInput(isDisable);
}
find.parentElement.onclick = function(){findName();
}
