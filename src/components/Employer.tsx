import { observe } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Root } from '../mst';

interface EmployerComponentProps {
    rootTree?: Root;
}

interface EmployerComponentState {

}

@inject("rootTree")
@observer
class EmployerComponent extends React.Component<EmployerComponentProps, EmployerComponentState>{
    constructor(props: EmployerComponentProps) {
        super(props);

        this.state = {};
    }
    render() {
        const {rootTree}=this.props;
        if(!rootTree) return null;
        return (
            <div>
                <p>{rootTree.employer.name}</p>
                <p>{rootTree.employer.location}</p>
            </div>
        );
    }
}

export {EmployerComponent};