import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Employee } from '../mst';

interface EmployeeComponentProps{
    employee: Employee;
}

interface EmployeeComponentState{
    employeeName:string;
    hours_worked: string;
    edit:boolean;
}

@inject("rootTree")
@observer
class EmployeeComponent extends React.Component<EmployeeComponentProps,EmployeeComponentState>{
    constructor(props:EmployeeComponentProps){
        super(props);

        this.state={
            employeeName: this.props.employee.name,
            hours_worked: `${this.props.employee.hours_worked}`,
            edit: false
        }
        // we are we using this bind instead of arrow functions?
        // the answer is:
        // arrow functions would bind the instance of the component to the 
        // function rather than a prototype to the function.
        // so if you have 1000 employee instances, the arrow function would 
        // create 1000 instances of the methods(changeEmployeeName, changeHoursWorked,
        // onSubmit, toggleEdit) in this case would end up having 4000 instances of the
        // methods. On the contrary, using the following binding would result in only four
        // prototype instances of all the employees.
        this.changeEmployeeName=this.changeEmployeeName.bind(this);
        this.changeHoursWorked=this.changeHoursWorked.bind(this);
        this.toggleEdit=this.toggleEdit.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }

    changeEmployeeName(e:any){
        const employeeName=e.target.value;
        this.setState({employeeName});
    }

    changeHoursWorked(e:any){
        const hours_worked=e.target.value;
        this.setState({hours_worked});
    }

    onSubmit(e:any){
        e.preventDefault();
        const {employeeName,hours_worked}=this.state;
        this.props.employee.editEmployee(employeeName,parseInt(hours_worked));
        this.toggleEdit();
    }
    toggleEdit(){
        this.setState(prev=>({edit:!prev.edit}));
    }

    render(){
        const {hours_worked,name}=this.props.employee;
        const {edit}=this.state;
        return(
            <div>
                {edit && (
                    <form onSubmit={this.onSubmit}>
                        <input value={this.state.employeeName} onChange={this.changeEmployeeName}/>
                        <input value={this.state.hours_worked} onChange={this.changeHoursWorked}/>
                        <button type="submit">Submit</button>
                        <button type="button" onClick={this.toggleEdit}>cancel</button>
                    </form>
                )}
                {!edit && (
                    <>
                        <p>Name: {name}</p>
                        <p>hours_worked: {hours_worked}</p>
                        <button onClick={this.toggleEdit}>Edit</button>
                    </>
                )}
            </div>
        );
    }
}

export {EmployeeComponent};