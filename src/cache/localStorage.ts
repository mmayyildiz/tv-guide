export const loadData = (key: string) => {
    try {
        const serializedData = localStorage.getItem(key);
        if (serializedData === null) {
            return undefined;
        }
        return JSON.parse(serializedData);
    } catch (err) {
        return undefined;
    }
};

export const saveData = (key: string, value: object) => {

    try {
        const serializedData = JSON.stringify(value);
        localStorage.setItem(key, serializedData);
    } catch {
        console.log('Error : WRITE ERROR');
    }
};