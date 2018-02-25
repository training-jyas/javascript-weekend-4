var tableElem = document.getElementById('employee-table');
var nameElem = document.getElementById('name');
var designationElem = document.getElementById('designation');
var genderElems = document.querySelectorAll('input[name="gender"]');
var idElem = document.getElementById('employee-id');
var createBtnElem = document.getElementById('create-btn');
var updateBtnElem = document.getElementById('update-btn');
var cancelBtnElem = document.getElementById('cancel-btn');

var employees = [{
    name: 'Sushant',
    designation: 'SE',
    gender: 'male',
    _id: 1
}, {
    name: 'Tousif',
    designation: 'SE',
    gender: 'male',
    _id: 2
}, {
    name: 'Pooja',
    designation: 'SE',
    gender: 'female',
    _id: 3
}, {
    name: 'Shashikala',
    designation: 'SE',
    gender: 'female',
    _id: 4
}];

(function() {
    getEmployees();
    updateButtonDisplay(true, false, false);
})();

function populateTable(employees) {
    var tbodyElem = tableElem.getElementsByTagName('tbody')[1];
    var tbodyContent = '';
    employees.forEach(function (item, index) {
        var trElem = '<tr><td><span class="employee-name" rel="' + item._id + '">' + item.name + '</span></td><td>' + item.designation + '</td><td>' + item.gender + '</td><td><i class="glyphicon glyphicon-trash" rel="' + item._id + '"></i></td></tr>';
        tbodyContent += trElem;
    });
    tbodyElem.innerHTML = tbodyContent;
    addEvents();
}

function addEvents() {
    // add event listeners
    var allIconElems = document.querySelectorAll('#employee-table tbody tr td i');
    allIconElems
        .forEach(function (item, index) {
            item.addEventListener('click', onDelete);
        });

    var allNameElems = document.querySelectorAll('#employee-table tbody tr td .employee-name');
    allNameElems
        .forEach(function (item, index) {
            item.addEventListener('click', onNameClick);
        });

    createBtnElem.addEventListener('click', createEmployee);
    updateBtnElem.addEventListener('click', updateEmployee);
    cancelBtnElem.addEventListener('click', cancel);
}

function onDelete(event) {
    var id = this.getAttribute('rel');
    deleteEmployee(id);
}

function onNameClick(event) {
    var id = this.getAttribute('rel');
    var employeeFromId = null;
    employees.forEach(function(item) {
        if (item._id == id) {
            employeeFromId = item;
        }
    });
    fillForm(employeeFromId);
    updateButtonDisplay(false, true, true);
}

function fillForm(employee) {
    nameElem.value = employee.name;
    designationElem.value = employee.designation;
    if (employee.gender !== 'male' && employee.gender !== 'female') {
        genderElems[0].checked = false;
        genderElems[1].checked = false;
    } else {
        if (employee.gender === 'male') {
            genderElems[0].checked = true;
        } else if(employee.gender === 'female') {
            genderElems[1].checked = true;
        }
    }
    idElem.value = employee._id;
}

function updateButtonDisplay(showCreate, showUpdate, showCancel) {
    showCreate ? createBtnElem.style.display = 'block' : createBtnElem.style.display = 'none';
    showUpdate ? updateBtnElem.style.display = 'inline-block' : updateBtnElem.style.display = 'none';
    showCancel ? cancelBtnElem.style.display = 'inline-block' : cancelBtnElem.style.display = 'none';
}

function cancel() {
    fillForm({
        name: '',
        designation: '',
        gender: ''
    });
    updateButtonDisplay(true, false, false);
}

function getEmployees() {
    populateTable(employees);
}

function getEmployeeObjectFromForm(isCreate) {
    var id = '';
    if (isCreate) {
        id = employees.length + 1;
    } else {
        id = idElem.value
    }
    var gender = 'male';
    genderElems.forEach(function(item) {
        item.checked ? gender = item.value : null;
    });
    var employee = {
        name: nameElem.value,
        designation: designationElem.value,
        gender: gender,
        _id: id
    };
    return employee;
}

function createEmployee() {
    var employeeToAdd = getEmployeeObjectFromForm(true);
    employees.push(employeeToAdd); // here we will make the actual service call
    getEmployees();
    console.log(employeeToAdd);
}

function updateEmployee() {
    var employeeToUpdate = getEmployeeObjectFromForm(false);
    console.log(employeeToUpdate);
    employees.forEach(function(item) {
        if (item._id == employeeToUpdate._id) {
            item.name = employeeToUpdate.name;
            item.designation = employeeToUpdate.designation;
            item.gender = employeeToUpdate.gender;
        }
    });
    cancel();
    getEmployees();
}

function deleteEmployee(id) {
    var indexToDelete = null;
    employees.forEach(function(item, index) {
        if (item._id == id) {
            indexToDelete = index;
        }
    });
    employees.splice(indexToDelete, 1); // we have to make the actual service call here
    getEmployees();
}