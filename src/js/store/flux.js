const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: [],
			contact: {}
		},
		actions: {
			LoadContactData() {
				fetch(`https://playground.4geeks.com/apis/fake/contact/agenda/Francisco`)
					.then(resp => resp.json())
					.then(data => {
						setStore({ contacts: [...data] })
					})
					.catch(error => console.log("error to obtain contact data", error))
			},
			ContactForm: (data) => {
				console.log(data)
				fetch("https://playground.4geeks.com/apis/fake/contact/", {
					method: "POST",
					body: JSON.stringify({
						"full_name": data.fullname,
						"email": data.email,
						"agenda_slug": "Francisco",
						"address": data.address,
						"phone": data.phone
					}),
					headers: {
						"content-type": "application/json",
					},
				}).then((response) => {
					console.log("response", response)
					return response.json()
				}).then((data2) => {
					console.log("data", data2)
				}).catch((error) => {
					console.log(error)
				})
			},
			fetchDelete: (id) => {
				fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, {
					method: "DELETE",
					headers: {
						"content-type": "application/json",
					},
				})
					.then((response) => {
						if (!response.ok) {
							throw new Error(`HTTP error! status: ${response.status}`);
						}
						console.log("response", response);
						return response.json();

					})
					.catch((error) => {
						console.log("Error:", error);
					});
			},
			UpdateContact: (data) => {
				console.log(data);
				fetch(`https://playground.4geeks.com/apis/fake/contact/${data.id}`, {
					method: "PUT",
					body: JSON.stringify({
						full_name: data.fullname,
						email: data.email,
						agenda_slug: "Francisco",
						address: data.address,
						phone: data.phone,
					}),
					headers: {
						"content-type": "application/json",
					},
				})
					.then((response) => {
						console.log("response", response);
						return response.json();
					})
					.then((data2) => {
						console.log("data", data2);
						return data2;
					})
					.catch((error) => {
						console.log(error);
						throw error;
					});
			},
		}
	};
};

export default getState;

// falta crear put , post y delete.
