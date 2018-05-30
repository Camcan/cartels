const initialState = {
   showNavMobile: false  
}

export default function MenuReducer(state = initialState, action){ 
   switch (action.type) {
      case 'SHOW_MOBILE_NAV_MENU':
         return {
            ...state,
            showNavMobile: true
         }
      case 'HIDE_MOBILE_NAV_MENU':
         return {
           ...state,
           showNavMobile: false
         }
      case 'TOGGLE_MOBILE_NAV_MENU':
         return {
            ...state,
            showNavMobile: action.showNavMobile
         }
      default: return state
   }
}

