import React from 'react';

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      currentUser: {
        name: null,
        role: null,
        employeeId: null
      }
    };
    this.getEmployees = this.getEmployees.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.currentUser = this.currentUser.bind(this);
  }

  componentDidMount() {
    this.getEmployees();
  }

  handleChange(event) {
    event.preventDefault();
    for (let i = 0; i < this.state.employees.length; i++) {
      if (`${this.state.employees[i].firstName} ${this.state.employees[i].lastName}` === event.target.value) {
        this.setState({
          currentUser: {
            name: event.target.value,
            role: this.state.employees[i].role,
            employeeId: this.state.employees[i].employeeId
          }
        });
      }
    }
  }

  getEmployees() {
    fetch('/api/employees')
      .then(res => res.json())
      .then(employees => {
        this.setState(state => ({
          employees: employees
        }));
      });
  }

  currentUser() {
    this.props.getCurrentUser(this.state.currentUser);
    if (this.state.currentUser.role === 'Admin') {
      this.props.setView('main-menu');
    } else {
      this.props.setView('view-shifts');
    }
  }

  render() {
    return (
      <>
        <div className="spacer"></div>
        <div className="d-flex justify-content-center align-items-center flex-column">
          <div className="row">
            <img className="d-flex justify-content-lg-center align-items-center" src="./images/hr-buddy-logo.png"></img>
          </div>
          <div className="row d-flex flex-column justify-content-center mt-5">
            <h2>Login to your account</h2>
            <div className="input-group mt-4">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="employee-select">Select User</label>
              </div>
              <select className="custom-select" id="employee-select" onChange={this.handleChange}>
                <option value="default">--select--</option>
                {this.state.employees.map(employee => {
                  if (employee.firstName === 'Ron' || employee.firstName === 'Roseanne') {
                    return (
                      <option key={employee.employeeId}>{employee.firstName} {employee.lastName}</option>
                    );
                  }
                })
                }
              </select>
            </div>
            <div className="d-flex flex-column justify-content-center mt-4">
              <button type="button" className="btn btn-primary view login-btn" disabled={!this.state.currentUser.name} onClick={() => { this.currentUser(this.state.currentUser); }} >Login Now</button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default LogIn;
