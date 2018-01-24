export function showMobileNavigation(){
   return {
      type: 'SHOW_MOBILE_NAV_MENU',
      showNavMobile: true
   }
}

export function hideMobileNavigation(){
   return {
      type: 'HIDE_MOBILE_NAV_MENU',
      showNavMobile: false
   }
}
export function toggleMobileNavigation(truthy){
//   console.log("ACTION: Toggle mobile navigation:", truthy)
   return {
   type: 'TOGGLE_MOBILE_NAV_MENU', 
   showNavMobile: truthy
  }
}
