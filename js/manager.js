const table = $('#bodyTable');



const addMore_btn = $('#addMore');

function manager(){

    var Liststaff = [];

    
    function addStaff(){
        if(dataStaff){
            Liststaff.push(dataStaff);
            console.log(Liststaff);
        }
            render(Liststaff);
    }

    function render(staffss){
        var staffs = Array.from(staffss);
        var HTMLtext = '';
    HTMLtext += staffs.map((staff) => `<tr>
        <td data-th="Movie Title">${staff.idsta}</td>
        <td data-th="Genre">${staff.namesta}</td>
        <td data-th="Year">${staff.mailsta}</td>
        <td data-th="Gross">${staff.birthsta}</td>
        <td data-th="Year">${staff.possta}</td>
        <td data-th="Gross">
          <button type="button" onclick="edit('${staff.idsta}')" class="btn btn-info" data-toggle="modal" data-target="#exampleModal" data-whatever="@getbootstrap">Edit</button>
          <button type="button" onclick="dele('${staff.idsta}')" class="btn btn-danger">Delete</button>
        </td>
      </tr>`);

      table.innerHTML = HTMLtext;
    }



    addMore_btn.onclick = function(){
        addStaff()
    }
}

manager();
