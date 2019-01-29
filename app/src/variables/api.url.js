const urlV1 = {
    user: {
        login: '/auth/login',
        get_users: '/users'
    },
    contact: {
        get_contacts: '/contact'
    },
    category: {
        get_categories: '/category',
        delete_category: '/category'
    },
    menuType: {
        get_menus: '/menu-type',
        delete_menu: '/menu-type'
    },
    allergyType: {
        get_allergies: '/allergy-type',
        delete_allergy: '/allergy-type'
    },
    typeIngredient: {
        get_typeIngredients: '/type-ingredient',
        delete_typeIngredient: '/type-ingredient'
    },
    ingredient:{
        get_ingredients: '/ingredient',
        delete_ingredient: '/ingredient'
    }
}

export default urlV1