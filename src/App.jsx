const App = (props) => {
  return (
    <div>
      <h1>Hello</h1>
      <EmployeeDirectory />
    </div>
  );
};

const EmployeeDirectory = (props) => {
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
  const AddNewEmp = (newEmp) => {
    setEmployees([...employees, newEmp]);
  };
  return (
    <div>
      <EmployeeTable employees={employees} />
      <EmployeeCreate AddNewEmp={AddNewEmp} empCount={employees.length} />
    </div>
  );
};

//Emplyee Table component to show employee data in table format.
const EmployeeTable = (props) => {
  const employees = props.employees;

  console.log(employees);

  const EmployeeRows = employees.map((emp) => (
    <EmployeeRow
      id={emp.id}
      key={emp.key}
      firstName={emp.firstName}
      lastName={emp.lastName}
      age={emp.age}
      dateOfJoining={emp.dateOfJoining}
      title={emp.title}
      department={emp.department}
      employeeType={emp.employeeType}
      currentStatus={emp.currentStatus}
    />
  ));
  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Age</th>
          <th>Date Of Joining</th>
          <th>Title</th>
          <th>Department</th>
          <th>Employee Type</th>
          <th>Current Status</th>
        </tr>
      </thead>
      <tbody>{EmployeeRows}</tbody>
    </table>
  );
};

const EmployeeRow = (props) => {
  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.firstName}</td>
      <td>{props.lastName}</td>
      <td>{props.age}</td>
      <td>{props.dateOfJoining}</td>
      <td>{props.title}</td>
      <td>{props.department}</td>
      <td>{props.employeeType}</td>
      <td>{props.currentStatus}</td>
    </tr>
  );
};

const EmployeeRows = (props) => {};

const EmployeeSearch = (props) => {
  return <>This is Employee Search</>;
};

const EmployeeCreate = (props) => {
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
      currentStatus: empForm.employeeType.value,
    };

    props.AddNewEmp(newEmp);
    empForm.reset();

    console.log(newEmp);
  }
  return (
    <form name="createEmployee" onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        id="firstName"
        placeholder="First Name"
      />
      <input
        type="text"
        name="lastName"
        id="lastName"
        placeholder="Last Name"
      />
      <input type="text" name="age" id="age" placeholder="Age" />
      <input type="text" name="title" id="title" placeholder="Title" />
      <input
        type="date"
        name="dateOfJoining"
        id="dateOfJoining"
        placeholder="Date Of Joining"
      />
      <input
        type="text"
        name="department"
        id="department"
        placeholder="Department"
      />
      <input
        type="text"
        name="employeeType"
        id="employeeType"
        placeholder="Employee Type"
      />
      <input
        type="text"
        name="currentStatus"
        id="currentStatus"
        placeholder="Current Status"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

const element = <App />;
ReactDOM.render(element, document.getElementById("contents"));
