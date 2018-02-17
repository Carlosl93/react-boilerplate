import React from 'react';
import store from '../store/Store.js';
import { observer } from 'mobx-react';

@observer
class App extends React.Component{
    componentDidMount() {
        console.log(this.props.store.number);
    };

    add = () => {
        this.props.store.sumNum(3);
    };
    
    render(){
        return(
            <div>
                <p>{this.props.store.number}</p>
                <div onClick={this.add}>ADDD</div>
            </div>
        );
    }
}

export default App;