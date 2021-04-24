import { observe } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Root } from '../mst';
import { EmployeeComponent } from './Employee';

interface EmployerComponentProps {
    rootTree?: Root;
}

interface EmployerComponentState {
    employeeName: string;
    hours_worked: string;
    searchString:string;
}

@inject("rootTree")
@observer
class EmployerComponent extends React.Component<EmployerComponentProps, EmployerComponentState>{
    constructor(props: EmployerComponentProps) {
        super(props);

        this.state = {
            employeeName:'',
            hours_worked:'',
            searchString:''
        };
    }

    changeEmployeeName=(e:any)=>{
        const employeeName=e.target.value;
        this.setState({employeeName});
    };

    changeHoursWorked=(e:any)=>{
        const hours_worked=e.target.value;
        this.setState({hours_worked});
    };

    onSumbit=(e:any) =>{
        e.preventDefault();
        const {employeeName, hours_worked}=this.state;
        const {rootTree}=this.props;
        if(!rootTree) return null;
        rootTree.employer.newEmployee(employeeName,parseInt(hours_worked));
        this.setState({employeeName:'',hours_worked:''});
        
    }

    searchStringChange=(e:any)=>{
        const searchString=e.target.value;
        this.setState({searchString});
    }

    render() {
        const {rootTree}=this.props;
        const{employeeName,hours_worked,searchString}=this.state;
        if(!rootTree) return null;
        const num_employees=rootTree.employer.num_employees;
        const filter_employees=rootTree.employer.filtered_employees(searchString);
        return (
            <div>
                <h1>{rootTree.employer.name}</h1>
                <h3>{rootTree.employer.location}</h3>
                <p>number of employees: {num_employees}</p>
                <hr/>
                <p>New Employee</p>
                <form onSubmit={this.onSumbit}>
                    <p>Name: </p>
                    <input value={employeeName} onChange={this.changeEmployeeName}/>
                    <p>Hours worked: </p>
                    <input value={hours_worked} onChange={this.changeHoursWorked}/>
                    <hr/>
                    <button>submit</button>
                </form>
                <hr/>
                <input placeholder='search employee name' value={searchString} onChange={this.searchStringChange}/>
                {filter_employees.map(emp=>(
                  <EmployeeComponent employee={emp} key={emp.id} />
                ))}
            </div>
        );
    }
}

export {EmployerComponent};