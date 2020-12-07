import React, { Component } from 'react';
import Aux from '../../hoc/Auxx';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

{/*
const layout = (props) => {
    return (
        <div>            
            <Toolbar></Toolbar>
            <SideDrawer />
            <main className={classes.Content}>
                {props.children}
            </main>
        </div>  
    )    
};
*/}

class Layout extends Component {    
    state = {
        showSideDrawer: true
    }

    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {        
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }

    render () {
        return (
        <div>            
            <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}></Toolbar>
            <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler} />
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </div>  
        )
    }
};

export default Layout;
