import { LOADING, SUCCESS, ERROR, COUNTRY_CHANGED, CATEGORY_CHANGED, PAGE_CHANGED, ACTIVE_URL_CHANGED } from '../constants/constants';

const init = {
	data: [],
	statusCode:'200',
	status: 'initial',
	country: 'us',
	category: 'Business',
	activePage: 1,
	activeUrl: ""
};

export default (state = init, action) => {
	switch(action.type) {
		case LOADING:
			return {...state,status:"loading"}
		case SUCCESS:
			return {...state,status:"success", data: action.items, activeUrl: action.activeUrl}
		case ERROR :
			return {...state,status:"error", statusCode: action.statusCode}
		case COUNTRY_CHANGED :
			return {...state,country:action.countryName}
		case CATEGORY_CHANGED :
			return {...state,category:action.categoryName}
		case PAGE_CHANGED :
			return {...state,activePage:action.activePage}
		case ACTIVE_URL_CHANGED: 
			return {...state, activeUrl: action.activeUrl}
		default:
					return state;
	}
}