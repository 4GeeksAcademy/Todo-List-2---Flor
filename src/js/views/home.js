import React, {useEffect, useState} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [tarea, setTarea] = useState("")
	const [lista, setLista] = useState(["Estudiar", "Comer"])
	function agregarTareas(evento) {
		evento.preventDefault()
		if (tarea != ""){
			// setLista([...lista, tarea])
			crearTarea()
			setTarea("")
		}else{
			alert("Ingresar Tarea")
		}
		if (evento.key==="Enter"){
			// setLista([...lista, tarea])
			crearTarea()
			setTarea("")
		}
	}
	const crearUsuario = async ()=>{
		try {
			const response = await fetch("https://playground.4geeks.com/todo/users/fmaya", {
				method: "POST",
				headers: {"Content-Type":"application/json"}
			})
			if (response.status == 201){
				obtenerTareas()
				return true
			}
		} catch (error) {
			console.log(error)
			return false
		}
	}
	const crearTarea = async ()=>{
		try {
			const response = await fetch("https://playground.4geeks.com/todo/todos/fmaya", {
				method: "POST",
				headers: {"Content-Type":"application/json"},
				body: JSON.stringify({
					"label": tarea,
					"is_done": false
				})
			})
			console.log(response.status)
			if (response.status == 201){
				obtenerTareas()
				return true
			}
		} catch (error) {
			console.log(error)
			return false
		}
	}
	const obtenerTareas = async ()=>{
		try {
			const response = await fetch("https://playground.4geeks.com/todo/users/fmaya", {
				method: "GET",
				headers: {"Content-Type":"application/json"}
			})
			if (response.status == 404){
				crearUsuario()
				return
			}
			const data = await response.json()
			setLista(data.todos)
		} catch (error) {
			console.log(error)
			return false
		}
	}
	const borrarTareas = async (id)=>{
		try {
			const response = await fetch("https://playground.4geeks.com/todo/todos/" + id, {
				method: "DELETE",
				headers: {"Content-Type":"application/json"}
			})
			if (response.status == 204){
				obtenerTareas()
				return
			}		
		} catch (error) {
			console.log(error)
			return false
		}
	}

	useEffect(()=> {
		obtenerTareas()
	},[])

	return (
		<div className="container text-center">
			<h1 className="text-center mt-5">TODOS</h1>
			<form className="row">
				<div className="col-12">
					<input type="text" className="from-control border border-primary w-50" placeholder="Nueva Tarea" value={tarea} onChange={(evento)=>
						setTarea(evento.target.value)} />
				</div>
				<div className="col-12 mt-2">
					<button type="submit" onClick={(evento)=>agregarTareas(evento)}
					className="btn btn-primary mb-3">Agregar Tarea</button>
				</div>	
			</form>
			<ul className="list-group">
			<ul className="list-group border-primary">
				{lista.map((item, index)=> (
					<li className="list-group-item border border-primary" key={index}>{item.label}<i onClick={()=>{borrarTareas(item.id)}}
					className="m-1 fa fa-trash icono-oculto"></i></li>
				))}
			</ul>
			<span className="text-primary">{(lista.length==0)?"No hay tareas, Agrega una":""}</span>
				<p></p>
			<span className="text-success">{lista.length} Items Left</span>
			</ul>
		</div>
		
	);
};

export default Home;
