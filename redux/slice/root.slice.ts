import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth.slice";
import datatableSlice from "./datatable.slice";
import industrySlice from "./industry.slice";
import profileSlice from "./profile.slice";
import countrySlice from "./country.slice";
import globalSettingSlice from "./global-setting.slice";
import modalSlice from "./modal.slice";
import citySlice from "./city.slice";
import uomSlice from "./uom.slice";
import attributeSlice from "./attribute.slice";
import cmsSlice from "./cms.slice";
import socialMediaSlice from "./social-media";
import contactusSlice from "./contact-us.slice";
import taxSlice from "./tax.slice";
import testimonialSlice from './testimonial.slice'
import faqSlice from "./faq.slice";
import faqCategorySlice from "./faq-category.slice";
import userSlice from './user.slice';
import paymentModeSlice from "./payment-mode.slice";
import revenueSlice from "./revenue.slice";
import dashboardSlice from "./dashboard.slice";
const rootReducer = combineReducers({
  auth: authSlice,
  datatable: datatableSlice,
  industry: industrySlice,
  profile: profileSlice,
  country: countrySlice,
  globalSetting: globalSettingSlice,
  modal: modalSlice,
  city: citySlice,
  uom: uomSlice,
  attribute: attributeSlice,
  cms: cmsSlice,
  socialMedia: socialMediaSlice,
  contactus: contactusSlice,
  tax: taxSlice,
  testimonial: testimonialSlice,
  faq: faqSlice,
  faqCategory: faqCategorySlice,
  user: userSlice,
  paymentMode: paymentModeSlice,
  revenue: revenueSlice,
  dashboard: dashboardSlice
});

export default rootReducer;
