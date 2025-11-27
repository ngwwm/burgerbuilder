import React, { useState, useCallback, useMemo } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 0.6,
    meat: 0.7
}

const BurgerBuilder = () => {
    const [ingredients, setIngredients] = useState({
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    });
    const [totalPrice, setTotalPrice] = useState(4);
    const [purchasing, setPurchasing] = useState(false);

    const purchasable = useMemo(() => {
        const sum = Object.keys(ingredients)
            .reduce((sum, igKey) => sum + ingredients[igKey], 0);
        return sum > 0;
    }, [ingredients]);

    const purchaseHandler = () => {
        setPurchasing(true);
    };

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    };

    const purchaseContinueHandler = () => {
        alert('You continue!');
    };

    const addIngredientHandler = useCallback((type) => {
        const updatedIngredients = {...ingredients};
        updatedIngredients[type] = updatedIngredients[type] + 1;
        setIngredients(updatedIngredients);
        setTotalPrice(totalPrice + INGREDIENT_PRICES[type]);
    }, [ingredients, totalPrice]);

    const removeIngredientHandler = useCallback((type) => {
        if (ingredients[type] <= 0) {
            return;
        }
        const updatedIngredients = {...ingredients};
        updatedIngredients[type] = updatedIngredients[type] - 1;
        setIngredients(updatedIngredients);
        setTotalPrice(totalPrice - INGREDIENT_PRICES[type]);
    }, [ingredients, totalPrice]);

    const disabledInfo = useMemo(() => {
        const disabled = {};
        for (let key in ingredients) {
            disabled[key] = ingredients[key] <= 0;
        }
        return disabled;
    }, [ingredients]);

    return (
        <div>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                <OrderSummary 
                    ingredients={ingredients}
                    purchaseCanceled={purchaseCancelHandler}
                    purchaseContinued={purchaseContinueHandler}
                    price={totalPrice}
                />
            </Modal>
            <Burger ingredients={ingredients} />
            <BuildControls 
                ingredientAdded={addIngredientHandler}
                ingredientRemoved={removeIngredientHandler}
                disabled={disabledInfo}
                purchasable={purchasable}
                ordered={purchaseHandler}
                price={totalPrice}
            />
        </div>
    );
};

export default BurgerBuilder;
