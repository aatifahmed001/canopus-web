
// KM: TODO : Need to populate with realtime data
let storageData = [{
    name: 'ACCOUNT_ID',
    value: 1,
    isGlobal: true
},{
    name: 'CORP_ACCOUNT_ID',
    value: 1,
    isGlobal: true
},{
    name: 'PATIENT_ID',
    value: null,
    isGlobal: false
}];

const addData = (name, value, isGlobal) => {
    storageData.push({
        name: name,
        value: value,
        isGlobal: isGlobal
    });
}

const addGlobalData = (name, value) => {
    addData(name, value, true);
}

const addLocalData = (name, value) => {
    addData(name, value, false);
}

const getData = (name, isGlobal) => {
    return storageData.find((element) => {
        return element.name === name && element.isGlobal === isGlobal;
    }).value;
}

const getDataByName = (name) => {
    const prefix = name.split('_')[0];
    const prefixLength = prefix.length;
    return getData(name.substring(prefixLength+1), prefix === "GLOBAL");
}

export const storageService = {
    addData,
    addGlobalData,
    addLocalData,
    getData,
    getDataByName
};