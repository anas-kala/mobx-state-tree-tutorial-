import { onSnapshot } from "mobx-state-tree";
import { RootModel } from "."

// here we create an instance of the tree.
export const setupRootStore = () => {
    const rootTree = RootModel.create({
        employer: {
            id: "1",
            name: "Bob's Burgers",
            location: "NewYork, NY",
            employees: []
        }
    });
    // for making sure that the tree is working you can make the following snapshot:
    onSnapshot(rootTree, (snapshot) => console.log('snapshot = ', snapshot));
    // const currentRootTree=getSnapshot(rootTree);
    // applySnapshot(rootTree,{...currentRootTree,employer:{...currentRootTree.employer,location:"Manhatten, NY"}});
    return { rootTree };
};