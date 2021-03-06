// the tree of mobx goes here
import { applySnapshot, Instance, types } from 'mobx-state-tree';
import {v4 as uuidv4} from 'uuid';


const EmployeeModel = types.model("Employee", {
    id: types.identifier,
    name: types.string,
    hours_worked: types.number
})
.actions(self=>{
    function editEmployee(name:string,hours_worked:number){
        applySnapshot(self,{...self,name,hours_worked});
    }
    return {editEmployee};
});

const EmployerModel = types.model("Employer", {
    id: types.identifier,
    name: types.string,
    location: types.string,
    employees: types.array(EmployeeModel)
})
    .actions(self => {      // here we are adding an action (a function on the employer) to add a new employee.
        function newEmployee(name: string, hours_worked: number) {
            const id = uuidv4();
            applySnapshot(self, { ...self, employees: [{ id, name, hours_worked }, ...self.employees] });
        }
        return {newEmployee}
    })
    .views(self=>({
        get num_employees(){        // here we put get because we do not have parameters.
            return self.employees.length;
        },
        filtered_employees(searchString:string) {
            return self.employees.filter(employee =>employee.name.includes(searchString));
        }
    }));

const RootModel = types.model("Root", {
    employer: EmployerModel
});

export { RootModel }
export type Root = Instance<typeof RootModel>
export type Employer = Instance<typeof EmployerModel>
export type Employee = Instance<typeof EmployeeModel>