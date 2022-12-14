
const sumItems = (items) => {
    // const itemsCounter = items.reduce(
    //   (total, product) => total + product.quantity,
    //   0
    // );
    let total = items.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    return { total };
  };

export const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_TO_FAV": {
        if (!state.fav.find((item) => item.id === action.payload.id)) {
          state.fav.push({
            ...action.payload
          });
        }
        return {
          ...state,
          fav: [...state.fav],
          checkout: false,
        };
      }
  
      case "ADD_TO_CART": {
        if (!state.cart.find((item) => item.id === action.payload.id)) {
          state.cart.push({
            ...action.payload,
            quantity: 1,
          });
        }
        return {
          ...state,
          cart: [...state.cart],
          ...sumItems(state.cart),
          checkout: false,
        };
      }
  
      case "INCREASE": {
        const indexI = state.cart.findIndex(
          (item) => item.id === action.payload.id
        );
        state.cart[indexI].quantity++;
        return {
          ...state,
          ...sumItems(state.cart),
        };
      }
  
      case "DECREASE": {
        const indexD = state.cart.findIndex(
          (item) => item.id === action.payload.id
        );
        state.cart[indexD].quantity--;
        return {
          ...state,
          ...sumItems(state.cart),
        };
      }
  
      case "REMOVE_ITEM": {
        const newSelectedItems = state.cart.filter(
          (item) => item.id !== action.payload.id
        );
        return {
          ...state,
          cart: [...newSelectedItems],
          ...sumItems(newSelectedItems),
        };
      }
  
      case "REMOVE_FAV": {
        const selectedItems = state.fav.filter(
          (item) => item.id !== action.payload.id
        );
        return {
          ...state,
          fav: [...selectedItems],
        };
      }
  
      case "CHECKOUT": {
        return {
          productsData: [...state.productsData],
          fav: [],
          cart: [],
          checkout: true,
          total: 0,
          cartOpen: false,
          favOpen: false,
          categorySort: [],
        };
      }
  
      case "CLEAR": {
        return {
          productsData: [...state.productsData],
          fav: [...state.fav],
          cart: [],
          checkout: false,
          total: 0,
          cartOpen: false,
          favOpen: false,
          categorySort: [],
        };
      }
  
      case "TOGGLE_CART":
        return {
          ...state,
          cartOpen: !state.cartOpen,
        };
  
      case "TOGGLE_FAV":
        return {
          ...state,
          favOpen: !state.favOpen,
        };
  
      case "SORT": {
        const categoryI = [...state.productsData];
        const index = categoryI.filter(
          (item) => item.category.id === action.payload.id
        );
  
        if (action.payload.id === 0) {
          return { ...state, categorySort: [] };
        } else {
          return { ...state, categorySort: index };
        }
      }
  
      case "PRICE_SORT": {
        const val = action.payload.value;
        const proD = [...state.productsData];
        const proCat = [...state.categorySort];
  
        if (val === "lowest") {
          const res = proD.sort((a, b) => (a.price > b.price ? 1 : -1));
          const resCat = proCat.sort((a, b) => (a.price > b.price ? 1 : -1));
          return { ...state, productsData: res, categorySort: resCat };
          // return _.orderBy(proD, ["price"], ["asc"]);
        } else {
          const res = proD.sort((a, b) => (a.price > b.price ? -1 : 1));
          const resCat = proCat.sort((a, b) => (a.price > b.price ? -1 : 1));
          return { ...state, productsData: res, categorySort: resCat };
  
          // return _.orderBy(proD, ["price"], ["desc"]);
        }
      }
  
      case "search": {
        const val = action.event.target.value;
        if (val === "") {
          return state;
        } else {
          const filterPro = state.filter((p) =>
            p.name.toLowerCase().includes(val.toLowerCase())
          );
          return filterPro;
        }
        // return state;
      }
  
      case "GET_DATA":
        return { ...state, productsData: action.payload };
  
      default:
        return state;
    }
  };