const makeTree = (data: Array<any>) => {
    const tree: any = {};

    data.forEach(v => {
        tree[v._id] = v;
    })
    Object.keys(tree).forEach(key => {
        tree[key].children = tree[key]._children.map((v: any) => tree[v._id])
        delete tree[key]._children
    })
    return tree
}

export {
    makeTree
}