const users = [
    {id: "32151", name: 'artem', age: 11},
    {id: "32152", name: 'artem', age: 16},
    {id: "32153", name: 'artem', age: 21},
    {id: "32154", name: 'artem', age: 21},
    {id: "32155", name: 'andriy', age: 11},
    {id: "32156", name: 'stas', age: 11},
    {id: "32157", name: 'vladislav', age: 11}
];

type SortBy<T> = {
    fieldName: keyof T
    direction: 'asc' | 'desc'
}

const getSortedItems = <T>( items: T[], ...sortParams: SortBy<T>[]) => {
    return [...items].sort((u1, u2) => {
        for (let sortConfig of sortParams) {
            if (u1[sortConfig.fieldName] > u2[sortConfig.fieldName]) {
                return sortConfig.fieldName === 'asc' ? 1 : -1;
            }

            if (u1[sortConfig.fieldName] < u2[sortConfig.fieldName]) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
        }

        return 0;
    });
}

console.log(getSortedItems(users, {fieldName: "name", direction: 'desc'},{fieldName: 'name', direction: 'desc'}));
