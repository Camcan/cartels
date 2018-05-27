const initialState = {
   selectedCompany: null,  
    companyList: [],
    companyRels: []
}

export default function CompanyReducer(state = initialState, action){ 
   switch (action.type) {
      case 'SELECT_COMPANY':
         return {
            ...state,
            selectedCompany: action.companyId
         }
        case 'UPDATE_COMPANY_LIST':
           return {
            ...state,
            companyList: action.companyList
           }
        case 'UPDATE_COMPANY_RELS':
           return {
            ...state,
            companyRels: action.companyRels
           }
      default: return state
   }
}

