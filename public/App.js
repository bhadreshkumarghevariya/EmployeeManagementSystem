const App = props => {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Hello"), /*#__PURE__*/React.createElement(EmployeeDirectory, null));
};
const EmployeeDirectory = props => {
  const [employees, setEmployees] = React.useState([]);
  //   const employees = [
  //     {
  //       id: 1,
  //       key: 1,
  //       firstName: "dfsj",
  //       lastName: "kfdsjk",
  //       age: 20,
  //       dateOfJoining: new Date("2023-02-13"),
  //       title: "CEO",
  //       department: "Administration",
  //       employeeType: "Full Time",
  //       currentStatus: "Current Employee",
  //     },
  //     {
  //       id: 2,
  //       key: 2,
  //       firstName: "dfsj",
  //       lastName: "kfdsjk",
  //       age: 20,
  //       dateOfJoining: new Date("2023-02-13"),
  //       title: "CEO",
  //       department: "Administration",
  //       employeeType: "Full Time",
  //       currentStatus: "Current Employee",
  //     },
  //   ];
  const AddNewEmp = newEmp => {
    setEmployees([...employees, newEmp]);
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(EmployeeTable, {
    employees: employees
  }), /*#__PURE__*/React.createElement(EmployeeCreate, {
    AddNewEmp: AddNewEmp,
    empCount: employees.length
  }));
};

//Emplyee Table component to show employee data in table format.
const EmployeeTable = props => {
  const employees = props.employees;
  console.log(employees);
  const EmployeeRows = employees.map(emp => /*#__PURE__*/React.createElement(EmployeeRow, {
    id: emp.id,
    key: emp.key,
    firstName: emp.firstName,
    lastName: emp.lastName,
    age: emp.age,
    dateOfJoining: emp.dateOfJoining,
    title: emp.title,
    department: emp.department,
    employeeType: emp.employeeType,
    currentStatus: emp.currentStatus
  }));
  return /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Id"), /*#__PURE__*/React.createElement("th", null, "First Name"), /*#__PURE__*/React.createElement("th", null, "Last Name"), /*#__PURE__*/React.createElement("th", null, "Age"), /*#__PURE__*/React.createElement("th", null, "Date Of Joining"), /*#__PURE__*/React.createElement("th", null, "Title"), /*#__PURE__*/React.createElement("th", null, "Department"), /*#__PURE__*/React.createElement("th", null, "Employee Type"), /*#__PURE__*/React.createElement("th", null, "Current Status"))), /*#__PURE__*/React.createElement("tbody", null, EmployeeRows));
};
const EmployeeRow = props => {
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, props.id), /*#__PURE__*/React.createElement("td", null, props.firstName), /*#__PURE__*/React.createElement("td", null, props.lastName), /*#__PURE__*/React.createElement("td", null, props.age), /*#__PURE__*/React.createElement("td", null, props.dateOfJoining), /*#__PURE__*/React.createElement("td", null, props.title), /*#__PURE__*/React.createElement("td", null, props.department), /*#__PURE__*/React.createElement("td", null, props.employeeType), /*#__PURE__*/React.createElement("td", null, props.currentStatus));
};
const EmployeeRows = props => {};
const EmployeeSearch = props => {
  return /*#__PURE__*/React.createElement(React.Fragment, null, "This is Employee Search");
};
const EmployeeCreate = props => {
  function handleSubmit(e) {
    e.preventDefault();
    let empForm = document.forms.createEmployee;
    const newEmp = {
      id: props.empCount + 1,
      key: props.empCount + 1,
      firstName: empForm.firstName.value,
      lastName: empForm.lastName.value,
      age: empForm.age.value,
      dateOfJoining: empForm.dateOfJoining.value,
      title: empForm.title.value,
      department: empForm.department.value,
      employeeType: empForm.employeeType.value,
      currentStatus: empForm.employeeType.value
    };
    props.AddNewEmp(newEmp);
    empForm.reset();
    console.log(newEmp);
  }
  return /*#__PURE__*/React.createElement("form", {
    name: "createEmployee",
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "firstName",
    id: "firstName",
    placeholder: "First Name"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "lastName",
    id: "lastName",
    placeholder: "Last Name"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "age",
    id: "age",
    placeholder: "Age"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "title",
    id: "title",
    placeholder: "Title"
  }), /*#__PURE__*/React.createElement("input", {
    type: "date",
    name: "dateOfJoining",
    id: "dateOfJoining",
    placeholder: "Date Of Joining"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "department",
    id: "department",
    placeholder: "Department"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "employeeType",
    id: "employeeType",
    placeholder: "Employee Type"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "currentStatus",
    id: "currentStatus",
    placeholder: "Current Status"
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit"
  }, "Submit"));
};
const element = /*#__PURE__*/React.createElement(App, null);
ReactDOM.render(element, document.getElementById("contents"));