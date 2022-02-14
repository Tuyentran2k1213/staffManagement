const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const table = $('#bodyTable');
const addMore_btn = $('#addMore');
var Liststaff = [];


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

function dele(id){
    var index = findfStaffbyId(id);
    if(index != -1){
        Liststaff.splice(index, 1);
    }
    render(Liststaff)
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
      <button type="button" onclick="edit('${staff.idsta}')" class="btn btn-info" data-toggle="modal" data-target="#exampleModal" data-whatever="@getbootstrap">Edit</button>
      <button type="button" onclick="dele('${staff.idsta}')" class="btn btn-danger">Delete</button>
    </td>
  </tr>`;
}

  table.innerHTML = HTMLtext;
}
