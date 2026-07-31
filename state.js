const state = {
    todos: [],
    filter: "all",
    theme: "light"
};

const createStore = (initialState) => {
    let state = initialState;
    const listeners = [];

    return {
        getState: () => state,

        setState: (updates) => {
            state = { ...state, ...updates };
            listerners.forEach(listener => listener(state));

        },

        subscribe: (listener) => {
            listeners.push(listener);

            return () => {
                const index = listeners.indexOf(listener);
                listener.splice(index, 1);
            };
        }
    };
};

const store = createStore({ count: 0 });

const unsubscribe = store.subscribe(state => {
    console.log("State changed:", state);
    renderUI(state);
});

store.setState({ count: 1 });
store.setState({ count: 2 });

unsubscribe();

const state = {
    products: [
        { id: 1, name: "Laptop", price: 999, image: "..." },
        { id: 2, name: "Phone", price: 699, image: "..." },
        { id: 3, name: "Headphones", price: 199, image: "..." }
    ],
    cart: []  
};
