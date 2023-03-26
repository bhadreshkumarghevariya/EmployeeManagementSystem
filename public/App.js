import graphQLFetch from "./graphQLFetch.js";

// const App = (props) => {
//   return (
//     <div>
//       <h1>Hello</h1>
//       <EmployeeDirectory />
//     </div>
//   );
// };

class App extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Hello"), /*#__PURE__*/React.createElement(EmployeeDirectory, null));
  }
}
const dateRegex = new RegExp("^\\d\\d\\d\\d-\\d\\d-\\d\\d");
function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}
class EmployeeDirectory extends React.Component {
  constructor() {
    super();
    this.state = {
      employees: [],
      empCount: 1
    };
    this.addNewEmp = this.addNewEmp.bind(this);
  }
  componentDidMount() {
    this.loadData();
  }
  loadData() {
    const query = `query {
      employeeDirectory {
          id
          FirstName 
          LastName 
          Age
          DateofJoining
          Title
          Department 
          EmployeeType 
          CurrentStatus 
      }
  }`;
    async function EmployeeData(url = "", data = {}) {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query
        })
      });
      return response.json();
    }
    const result = EmployeeData("/graphql", query).then(result => {
      console.log(result.data.employeeDirectory);
      this.setState({
        employees: result.data.employeeDirectory
      });
      return result.data.employeeDirectory;
    });
  }
  async addNewEmp(newEmp) {
    const query = `
            mutation employeeAdd($newEmp: employeeInputs!) {
                    employeeAdd(employee: $newEmp) {
                        
                        FirstName 
                        LastName 
                        Age
                        DateofJoining
                        Title
                        Department 
                        EmployeeType 
                        CurrentStatus 
                    } 
            }`;
    const data = await graphQLFetch(query, {
      newEmp
    });
    if (data) {
      this.loadData();
    }
    console.log(newEmp);
    this.state.employees = [...this.state.employees, newEmp];
    // this.setState({ employees: [...this.state.employees, newEmp] });
    this.loadData();
  }
  render() {
    // console.log(this.empCount);
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(EmployeeTable, {
      employees: this.state.employees
    }), /*#__PURE__*/React.createElement(EmployeeCreate, {
      AddNewEmp: this.addNewEmp,
      empCount: this.state.employees.length
    }));
  }
}

// const EmployeeDirectory = (props) => {
//   const [employees, setEmployees] = React.useState([]);
//   //   const employees = [
//   //     {
//   //       id: 1,
//   //       key: 1,
//   //       firstName: "dfsj",
//   //       lastName: "kfdsjk",
//   //       age: 20,
//   //       dateOfJoining: new Date("2023-02-13"),
//   //       title: "CEO",
//   //       department: "Administration",
//   //       employeeType: "Full Time",
//   //       currentStatus: "Current Employee",
//   //     },
//   //     {
//   //       id: 2,
//   //       key: 2,
//   //       firstName: "dfsj",
//   //       lastName: "kfdsjk",
//   //       age: 20,
//   //       dateOfJoining: new Date("2023-02-13"),
//   //       title: "CEO",
//   //       department: "Administration",
//   //       employeeType: "Full Time",
//   //       currentStatus: "Current Employee",
//   //     },
//   //   ];
//   const AddNewEmp = (newEmp) => {
//     setEmployees([...employees, newEmp]);
//   };
//   return (
//     <div>
//       <EmployeeTable employees={employees} />
//       <EmployeeCreate AddNewEmp={AddNewEmp} empCount={employees.length} />
//     </div>
//   );
// };

//Emplyee Table component to show employee data in table format.

class EmployeeTable extends React.Component {
  render() {
    const employees = this.props.employees;
    console.log("h");
    console.log(employees);
    const EmployeeRows = employees.map(emp => /*#__PURE__*/React.createElement(EmployeeRow, {
      id: emp.id,
      firstName: emp.FirstName,
      lastName: emp.LastName,
      age: emp.Age,
      dateOfJoining: emp.DateOfJoining,
      title: emp.Title,
      department: emp.Department,
      employeeType: emp.EmployeeType,
      currentStatus: emp.CurrentStatus
    }));
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(EmployeeSearch, null), /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Id"), /*#__PURE__*/React.createElement("th", null, "First Name"), /*#__PURE__*/React.createElement("th", null, "Last Name"), /*#__PURE__*/React.createElement("th", null, "Age"), /*#__PURE__*/React.createElement("th", null, "Date Of Joining"), /*#__PURE__*/React.createElement("th", null, "Title"), /*#__PURE__*/React.createElement("th", null, "Department"), /*#__PURE__*/React.createElement("th", null, "Employee Type"), /*#__PURE__*/React.createElement("th", null, "Current Status"))), /*#__PURE__*/React.createElement("tbody", null, EmployeeRows)));
  }
}

// const EmployeeTable = (props) => {
//   const employees = props.employees;
//   const EmployeeRows = employees.map((emp) => (
//     <EmployeeRow
//       id={emp.id}
//       key={emp.key}
//       firstName={emp.firstName}
//       lastName={emp.lastName}
//       age={emp.age}
//       dateOfJoining={emp.dateOfJoining}
//       title={emp.title}
//       department={emp.department}
//       employeeType={emp.employeeType}
//       currentStatus={emp.currentStatus}
//     />
//   ));
//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Id</th>
//           <th>First Name</th>
//           <th>Last Name</th>
//           <th>Age</th>
//           <th>Date Of Joining</th>
//           <th>Title</th>
//           <th>Department</th>
//           <th>Employee Type</th>
//           <th>Current Status</th>
//         </tr>
//       </thead>
//       <tbody>{EmployeeRows}</tbody>
//     </table>
//   );
// };

class EmployeeRow extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, this.props.id), /*#__PURE__*/React.createElement("td", null, this.props.firstName), /*#__PURE__*/React.createElement("td", null, this.props.lastName), /*#__PURE__*/React.createElement("td", null, this.props.age), /*#__PURE__*/React.createElement("td", null, this.props.dateOfJoining), /*#__PURE__*/React.createElement("td", null, this.props.title), /*#__PURE__*/React.createElement("td", null, this.props.department), /*#__PURE__*/React.createElement("td", null, this.props.employeeType), /*#__PURE__*/React.createElement("td", null, this.props.currentStatus));
  }
}

// const EmployeeRow = (props) => {
//   return (
//     <tr>
//       <td>{props.id}</td>
//       <td>{props.firstName}</td>
//       <td>{props.lastName}</td>
//       <td>{props.age}</td>
//       <td>{props.dateOfJoining}</td>
//       <td>{props.title}</td>
//       <td>{props.department}</td>
//       <td>{props.employeeType}</td>
//       <td>{props.currentStatus}</td>
//     </tr>
//   );
// };

// const EmployeeRows = (props) => {};

class EmployeeSearch extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, "This is Employee Search");
  }
}
// const EmployeeSearch = (props) => {
//   return <>This is Employee Search</>;
// };

class EmployeeCreate extends React.Component {
  constructor() {
    super();
  }
  handleSubmit = e => {
    e.preventDefault();
    let empForm = document.forms.createEmployee;
    const newEmp = {
      id: this.props.empCount + 1,
      FirstName: empForm.firstName.value,
      LastName: empForm.lastName.value,
      Age: empForm.age.value,
      DateofJoining: empForm.dateOfJoining.value,
      Title: empForm.title.value,
      Department: empForm.department.value,
      EmployeeType: empForm.employeeType.value,
      CurrentStatus: empForm.employeeType.value
    };
    this.props.AddNewEmp(newEmp);
    console.log(newEmp.DateOfJoining);
    // console.log(this.props.AddNewEmp);
    empForm.reset();

    // console.log(newEmp);
  };

  render() {
    return /*#__PURE__*/React.createElement("form", {
      name: "createEmployee",
      onSubmit: this.handleSubmit
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
  }
}

// const EmployeeCreate = (props) => {
//   function handleSubmit(e) {
//     e.preventDefault();
//     let empForm = document.forms.createEmployee;

//     const newEmp = {
//       id: props.empCount + 1,
//       key: props.empCount + 1,
//       firstName: empForm.firstName.value,
//       lastName: empForm.lastName.value,
//       age: empForm.age.value,
//       dateOfJoining: empForm.dateOfJoining.value,
//       title: empForm.title.value,
//       department: empForm.department.value,
//       employeeType: empForm.employeeType.value,
//       currentStatus: empForm.employeeType.value,
//     };

//     props.AddNewEmp(newEmp);
//     empForm.reset();

//     console.log(newEmp);
//   }
//   return (
//     <form name="createEmployee" onSubmit={handleSubmit}>
//       <input
//         type="text"
//         name="firstName"
//         id="firstName"
//         placeholder="First Name"
//       />
//       <input
//         type="text"
//         name="lastName"
//         id="lastName"
//         placeholder="Last Name"
//       />
//       <input type="text" name="age" id="age" placeholder="Age" />
//       <input type="text" name="title" id="title" placeholder="Title" />
//       <input
//         type="date"
//         name="dateOfJoining"
//         id="dateOfJoining"
//         placeholder="Date Of Joining"
//       />
//       <input
//         type="text"
//         name="department"
//         id="department"
//         placeholder="Department"
//       />
//       <input
//         type="text"
//         name="employeeType"
//         id="employeeType"
//         placeholder="Employee Type"
//       />
//       <input
//         type="text"
//         name="currentStatus"
//         id="currentStatus"
//         placeholder="Current Status"
//       />
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

const element = /*#__PURE__*/React.createElement(App, null);
ReactDOM.render(element, document.getElementById("contents"));