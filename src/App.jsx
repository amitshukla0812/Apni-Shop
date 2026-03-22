import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import AboutPages from './pages/AboutPages'
import ShopPage from './pages/ShopPage'

import FeaturesPages from './pages/FeaturesPages'
import TestimonialPages from './pages/TestimonialPages'
import ContactUsPages from './pages/ContactUsPages'
import FaqPages from './pages/FaqPages'
import AdminHomePage from './pages/Admin/AdminHomePage'
import AdminMainCategoryPage from "./pages/Admin/MainCategory/AdminMainCategoryPage"
import AdminMainCategoryCreatePage from "./pages/Admin/MainCategory/AdminMainCategoryCreatePage"
import AdminMainCategoryUpdatePage from "./pages/Admin/MainCategory/AdminMainCategoryUpdatePage"

import AdminSubCategoryPage from "./pages/Admin/SubCategory/AdminSubCategoryPage"
import AdminSubCategoryCreatePage from "./pages/Admin/SubCategory/AdminSubCategoryCreatePage"
import AdminSubCategoryUpdatePage from "./pages/Admin/SubCategory/AdminSubCategoryUpdatePage"


import AdminBrandPage from "./pages/Admin/Brand/AdminBrandPage"
import AdminBrandCreatePage from "./pages/Admin/Brand/AdminBrandCreatePage"
import AdminBrandUpdatePage from "./pages/Admin/Brand/AdminBrandUpdatePage"


import AdminFeaturePage from "./pages/Admin/Feature/AdminFeaturePage"
import AdminFeatureCreatePage from "./pages/Admin/Feature/AdminFeatureCreatePage"
import AdminFeatureUpdatePage from "./pages/Admin/Feature/AdminFeatureUpdatePage"


import AdminFaqPage from "./pages/Admin/Faq/AdminFaqPage"
import AdminFaqCreatePage from "./pages/Admin/Faq/AdminFaqCreatePage"
import AdminFaqUpdatePage from "./pages/Admin/Faq/AdminFaqUpdatePage"

import AdminSettingPage from "./pages/Admin/Setting/AdminSettingPage"


import AdminProductPage from "./pages/Admin/Product/AdminProductPage"
import AdminProductCreatePage from "./pages/Admin/Product/AdminProductCreatePage"
import AdminProductUpdatePage from "./pages/Admin/Product/AdminProductUpdatePage"
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import RefundPolicyPage from './pages/RefundPolicyPage'
import TermsConditionPage from './pages/TermsConditionPage'
import ProductPage from './pages/ProductPage'
import ErrorPage from './pages/ErrorPage'
import SignupPage from './pages/User/SignupPage'
import LoginPage from './pages/User/loginPage'
import ProfilePage from './pages/User/ProfilePage'
import CartPage from './pages/User/CartPage'
import CheckoutPage from './pages/User/CheckoutPage'
import OrderConfirmation from './pages/User/OrderConfirmation'
import AdminNewslaterPage from './pages/Admin/Newslater/AdminNewslaterPage'
import AdminContactUsPage from './pages/Admin/ContactUs/AdminContactUsPage'
import AdminContactUsShowPage from './pages/Admin/ContactUs/AdminContactUsShowPage'
import AdminCheckOutPage from './pages/Admin/CheckOut/AdminCheckOutPage'
import AdminCheckOutShowPage from './pages/Admin/CheckOut/AdminCheckOutShowPage'
import AdminUserPage from './pages/Admin/User/AdminUserPage'
import AdminUserCreatePage from './pages/Admin/User/AdminUserCreatePage'
import AdminUserUpdatePage from './pages/Admin/User/AdminUserUpdatePage'


export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>

        <Route path='' element={<HomePage />} />

        <Route path='/about' element={<AboutPages />} />
        <Route path='/shop' element={<ShopPage />} />

        <Route path='/feature' element={<FeaturesPages />} />
        <Route path='/faq' element={<FaqPages />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />

        <Route path='/testimonial' element={<TestimonialPages />} />
        <Route path='/contact' element={<ContactUsPages />} />
        <Route path='/product/:id' element={<ProductPage />} />

        {
          localStorage.getItem("login") ?
            <>

              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/cart' element={<CartPage />} />
              <Route path='/checkout' element={<CheckoutPage />} />
              <Route path='/order-confirmation' element={<OrderConfirmation />} />

            </> : null

        }

        <Route path='/privacy-policy' element={<PrivacyPolicyPage />} />
        <Route path='/refund-policy' element={<RefundPolicyPage />} />

        <Route path='/terms-condtion' element={<TermsConditionPage />} />



        {
          localStorage.getItem("login") && localStorage.getItem("role") !== "Buyer" ?
            <>

              <Route path='/admin' element={<AdminHomePage />} />

              <Route path='/admin/maincategory' element={<AdminMainCategoryPage />} />
              <Route path='/admin/maincategory/create' element={<AdminMainCategoryCreatePage />} />

              <Route path='/admin/maincategory/update/:id' element={<AdminMainCategoryUpdatePage />} />


              <Route path='/admin/subcategory' element={<AdminSubCategoryPage />} />
              <Route path='/admin/subcategory/create' element={<AdminSubCategoryCreatePage />} />

              <Route path='/admin/subcategory/update/:id' element={<AdminSubCategoryUpdatePage />} />


              <Route path='/admin/brand' element={<AdminBrandPage />} />
              <Route path='/admin/brand/create' element={<AdminBrandCreatePage />} />
              <Route path='/admin/brand/update/:id' element={<AdminBrandUpdatePage />} />

              <Route path='/admin/feature' element={<AdminFeaturePage />} />
              <Route path='/admin/feature/create' element={<AdminFeatureCreatePage />} />
              <Route path='/admin/feature/update/:id' element={<AdminFeatureUpdatePage />} />
              <Route path='/admin/contactus' element={<AdminContactUsPage />} />
              <Route path='/admin/contactus/show/:id' element={<AdminContactUsShowPage />} />
              <Route path='/admin/newsletter' element={<AdminNewslaterPage />} />
              <Route path='/admin/faq' element={<AdminFaqPage />} />
              <Route path='/admin/faq/create' element={<AdminFaqCreatePage />} />
              <Route path='/admin/faq/update/:id' element={<AdminFaqUpdatePage />} />

              <Route path='/admin/setting' element={<AdminSettingPage />} />
              <Route path='/admin/checkout' element={<AdminCheckOutPage />} />
              <Route path='/admin/checkout/show/:id' element={<AdminCheckOutShowPage />} />
              <Route path='/admin/product' element={<AdminProductPage />} />
              <Route path='/admin/product/create' element={<AdminProductCreatePage />} />
              <Route path='/admin/product/update/:id' element={<AdminProductUpdatePage />} />

              {
                localStorage.getItem("role") === "Super Admin" ?
                  <>
                    <Route path='/admin/user' element={<AdminUserPage />} />
                    <Route path='/admin/user/create' element={<AdminUserCreatePage />} />
                    <Route path='/admin/user/update/:id' element={<AdminUserUpdatePage />} />
                  </> : null

              }

            </> : null
        }

        <Route path='/*' element={<ErrorPage />} />

      </Routes>

      <Footer />
    </BrowserRouter>
  )
}
