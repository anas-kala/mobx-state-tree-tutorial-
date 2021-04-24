import { observer } from 'mobx-react';
import * as React from 'react';
import { Employee } from '../mst';

interface EmployeeComponentProps{
    employee: Employee;
}

interface EmployeeComponentState{

}

@observer
class EmployeeComponent extends React.Component<EmployeeComponentProps,EmployeeComponentState>{

    render(){
        const {hours_worked,name}=this.props.employee
        return(
            <div>
                <p>Name: {name}</p>
                <p>Hours worked: {hours_worked}</p>
            </div>
        );
    }
}

export {EmployeeComponent};