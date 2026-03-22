import { all } from "redux-saga/effects"

import MaincategorySagas from "./Services/MaincategorySagas"
import SubcategorySagas from "./Services/SubcategorySagas"
import BrandSagas from "./Services/BrandSagas"
import ProductSagas from "./Services/ProductSagas"
import FeatureSagas from "./Services/FeatureSagas"
import SettingSagas from "./Services/SettingSagas"
import FaqSagas from "./Services/FaqSagas"
import CartSagas from "./Services/CartSagas"
import TestimonialSagas from "./Services/TestimonialSagas "
import WishlistSagas from "./Services/WishlistSagas"
import CheckoutSagas from "./Services/CheckoutSagas"
import UserSagas from "./Services/UserSagas"

import NewslaterSagas from "./Services/NewslaterSagas"
import ContactUsSagas from "./Services/ContactUsSagas"


export default function* RootSaga() {
    yield all([
        MaincategorySagas(),
        SubcategorySagas(),
        BrandSagas(),
        ProductSagas(),
        FeatureSagas(),
        SettingSagas(),
        FaqSagas(),
        UserSagas(),
        NewslaterSagas(),
        ContactUsSagas(),
        CartSagas(),
        TestimonialSagas(),
        WishlistSagas(),
        CheckoutSagas(),

    ])
}