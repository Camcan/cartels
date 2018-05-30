export function selectCompany(id){
   console.log("ACTION:::Selecting Company:", id)
    return {
      type: 'SELECT_COMPANY',
      companyId: id
   }
}

export function updateCompanyList(newListObj){
    return {
        type: 'UPDATE_COMPANY_LIST',
        companyList: newListObj
    }
}

export function updateCompanyRels(newListObj){
    return {
        type: 'UPDATE_COMPANY_RELS',
        companyRels: newListObj
    }
}

export function setActiveList(filter){
    return {
        type: 'SET_ACTIVE_LIST',
        filter: filter
    }
}
