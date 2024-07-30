const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

			// SIGNUP / REGISTRO
			signup: async(email, password) => {
				try{
					let response = await fetch(process.env.BACKEND_URL+'/signup/user',{
						method: 'POST',
						headers: {
							'Content-Type':'application/json'
						},
						body: JSON.stringify({
							'email': email,
							'password': password
						})
					})
					let data = await response.json()
					if (response.ok){
						return true;
					}
					return data;
				}
				catch (error) {
					console.log(error);
					return {'error':'unexpected error'};
				}
			},

			// LOGIN / INICIO DE SESION
			login: async(email, password) => {
				try{
					let response = await fetch(process.env.BACKEND_URL+'/login/user',{
						method: 'POST',
						headers: {
							'Content-Type':'application/json'
						},
						body: JSON.stringify({
							'email': email,
							'password': password
						})
					})
					console.log(response.status);
					let data = await response.json()
					if(response.ok){
						localStorage.setItem('token', data.access_token);
						return true;
					}
					return data;
					
				}
				catch (error) {
					console.log(error);
					return {'error':'unexpected error'};
				}
			}
		}
	};
};

export default getState;
