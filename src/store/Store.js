import { observable, action } from 'mobx';

class Store {
    @observable number = 0;

    @action sumNum(num) {
        this.number = this.number + num;
    }
}

const store = new Store();
export default store;