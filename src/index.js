import configureStore from './app/configureStore'

export default class {
    constructor() {
        let dataStore = configureStore()
        console.log(dataStore);
    }
}
