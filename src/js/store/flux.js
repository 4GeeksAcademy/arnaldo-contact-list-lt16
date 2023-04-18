import rigoImage from "../../img/rigo-baby.jpg";

const apiUrl=process.env.API_URL
const agendaSlug=process.env.AGENDA_SLUG

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts:[]
		},
		actions: {
			addContact:async (contact)=>{
        let response=await fetch(apiUrl + "/",{
          body:JSON.stringify({...contact, agenda_slug:agendaSlug}),
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          }
        })
        if(!response.ok){
          console.log(response.status + ": " + response.statusText)
          return
        }
        let data=await response.json()
				// Agregar validacion para que no admita valores vacios
				let store=getStore()
				let newContacts=[...store.contacts,{...contact, id:data.id}]
				setStore({contacts:newContacts})
			},
			delContact:(index)=>{
				let newContacts=[...getStore().contacts]
				newContacts.splice(index,1)
				setStore({contacts:newContacts})
			},
			updateContact(data, index){
				let newContacts=[...getStore().contacts]
				newContacts[index]={...data, img:rigoImage}
				setStore({contacts:newContacts})
			},
			getAgenda:()=>{
				fetch(apiUrl+ "/agenda/"+agendaSlug)
				.then(response=>{
					if(response.ok){
						// Tuve una respuesta satisfactoria
						return response.json()
					}else{
						// Tuve una respuesta de error
						console.log(response.status + ": " + response.statusText)
					}
				})
				.then(data=>{
					console.log(data)
					setStore({contacts:data})
				})
				.catch(error=>{
					console.error(error)
				})
				console.log("Iniciada la peticion")
			},
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
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
			}
		}
	};
};

export default getState;
