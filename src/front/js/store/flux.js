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
			],
			auth: false
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
					let response = await fetch(process.env.BACKEND_URL+'/signup',{
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
					let response = await fetch(process.env.BACKEND_URL+'/login',{
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
			},

			// GET PROFILE
			getProfile: async() => {
				let token = localStorage.getItem("token")
				try{
					let response = await fetch(process.env.BACKEND_URL+'/profile',{
						method: 'GET',
						headers: {
							'Content-Type':'application/json',
							'Authorization':`Bearer ${token}`
						},
						
					})
					let data = await response.json()
					console.log(data);
					if(response.ok){
						return true;
						
					}
					return data;
					
				}
				catch (error) {
					console.log(error);
					return {'error':'unexpected error'};
				}
			},
			// VALID TOKEN
			validToken: async() => {
				let token = localStorage.getItem("token")
				try{
					let response = await fetch(process.env.BACKEND_URL+'/valid-token',{
						method: 'GET',
						headers: {
							'Content-Type':'application/json',
							'Authorization':`Bearer ${token}`
						},
						
					})
					let data = await response.json()
					console.log(response);
					console.log(data);
					if(response.ok){
						setStore({auth: data.logged})
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