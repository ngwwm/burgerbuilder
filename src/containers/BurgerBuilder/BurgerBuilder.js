import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import Aux from '../../hoc/Aux';

class BurgerBuilder extends Component {
    render() {
        return (
            <div>
                <Burger />
                <div>Burger Control</div>
            </div>
        );
    }
}

export default BurgerBuilder;