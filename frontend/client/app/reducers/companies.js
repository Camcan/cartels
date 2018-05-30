import { applyFilter } from '../utils/companies.js';


const initialState = {
   selectedCompany: null,
    filter: 'All',
    companyList: [],
    activeList: [],
    companyRels: [],
    activeRels: [],

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
       case 'SET_ACTIVE_LIST':
            const changes = applyFilter(
               state.companyList, 
               state.companyRels, 
               action.filter
            )
            console.log("REDUCER:: SORTED LISTS:", changes) 
            return {
                ...state, 
                filter: action.filter,
                ...changes
            }
       default: return state
   }
}

