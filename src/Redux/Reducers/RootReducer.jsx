import { combineReducers } from "@reduxjs/toolkit";
import MainCategoryReducer from "./MainCategoryReducer"
import SubCategoryReducer from "./SubCategoryReducer"
import BrandReducer from "./BrandReducer"
import ProductReducer from "./ProductReducer"
import SettingReducer from "./SettingReducer"
import FeatureReducer from "./FeatureReducer"
import CartReducer from "./CartReducer"
import UserReducer from "./UserReducer"
import WishlistReducer from "./WishlistReducer"
import CheckoutReducer from "./CheckoutReducer"
import ContactUsReducer from "./ContactUsReducer"
import TestimonialReducer from "./TestimonialReducer"
import NewslaterReducer from "./NewslaterReducer"
import FaqReducer from "./FaqReducer"

export default combineReducers({
    MaincategoryStateData: MainCategoryReducer,
    SubcategoryStateData: SubCategoryReducer,
    BrandStateData: BrandReducer,
    ProductStateData: ProductReducer,
    SettingStateData: SettingReducer,
    FeatureStateData: FeatureReducer,
    FaqStateData: FaqReducer,
    CartStateData: CartReducer,
    UserStateData: UserReducer,
    CheckoutStateData: CheckoutReducer,
    WishlistStateData: WishlistReducer,
    ContactUsStateData: ContactUsReducer,
    NewslaterStateData: NewslaterReducer,
    TestimonialStateData: TestimonialReducer,

})