export const updateObjectInArray = (items: any, itemId: number, objProp: any, newObjProp: any) => {
    return items.map((el: any) => el[objProp] === itemId
        ? {...el, ...newObjProp}
        : el)
}
