import React from "react";


// class CreateClass extends React.Component{
//   constructor(props){
//     super(props);
//     this.nombre = React.createRef();
//     this.correo = React.createRef();
//   }

//   clicRefs(evento){
//     evento.preventDefault()
//     console.log(this.nombre.current.value)
//     console.log(this.correo.current.value)
//   }

//   render(){
//     return(
//       <form>
//         <h1>formulario</h1>
//         <input type="text" ref={this.nombre}/>
//         <input type="text" ref={this.correo}/>
//         <button onClick={this.clicRefs.bind(this)}>
//             Enviar
//         </button>
//       </form>
//     )
//   }
// }
// export default CreateClass;
//A: Es una forma de acceder a los inputs no controlados a traves de Ref sin realizar validaciones complejas 


// class CreateClass extends React.Component(){
//   clicEvents(evento){
//     evento.preventDefault();
//     console.log(evento.target[0].value); //referencia al primer input
//     console.log(evento.target[1].value); //referencia al segundo input
//   }
//   render(){
//     return(
//         <form onSubmit={this.clicEvents.bind(this)}>
//           <input type="text" />
//           <input type="text" />
//           <button>
//             Enviar
//           </button>
//         </form>
//     )
//   }
// }
// export default CreateClass;
//B: Otra forma es accder a los inputs no controlados a traves de eventos submit 

//ventajas son faciles de escribir menos complejo
//desventaja se requiere que el usuario ingrese el input completo no por caracter por caracter
//y cuando envie el formulario se valida en ese momento el valor de cada input


//C. formualrios controlados - validaciones, esto ayuda mucho a esa este verificando cada cosa 
//que el usuario ingresa en el input y no tiene ese retraso

//---------------Componente hijo de tipo texto--------------------------
class InputText extends React.Component(){
  constructor(props){
    super(props);
    this.actualiarState = this.actualiarState.bind(this);
    this.state = {
      value:"",
      error: true,
      mensajeEror:""
    }
  }

  actualiarState(e){
    // console.log(name);
    // console.log(value);
    const {name,value}= e.target;
    console.log(this.props.validacion(value)); //viene de la funcion esnombre para validarlo
    
    if(this.props.validacion(value)){
      this.setStare({
        value,
        error:false,
        mensajeEror:""
      });
      this.props.actualiarState({
        name, value, error:false
      })  //recuperamos el valor del inputtext y lo retornamos desde el cpmonente padre
    }else{
      this.setStare({
        value,
        error:true,
        mensajeEror:this.props.mensajeEror
      })
      this.actualiarState({
        name,value,error:true
      })
    }
  }

  render(){
    return(
      <div className="input">
        <label htmlFor={"id"+this.porps.name}>{this.props.label}</label>
        <input 
          id={"id"+this.porps.name} 
          type="text" 
          name={this.props.name} 
          placeholder={this.props.name}
          className={this.state.error? "border-error":""}
          onChange={this.actualiarState} />
          {
            this.state.error? (
              <p>{this.state.mensajeEror}</p>
            ):("")
          }
      </div>
    )
  }
}

//funcion de validacion externa par poder reutilizar 
// esNombre(value){
//   return !/[^a-zA-\S\,]/.test(value); //true o false
// }

//---------------Componente padre--------------------------
class CreateClass extends React.Component(){
  constructor(props){
    super(props);
    this.submit = this.submit.bind(this);
    this.actualiarState = this.actualiarState.bind(this)
    this.state = { nombre:{ 
      value:"",
      error: false,
    }}
  }
  
  actualiarState(input){ //aqui es donde se recupera el json del state del componente hijo
    // console.log(input);
    this.state({
      ...this.state,
      [input.name]:{
        value: input.value,
        error: input.error
      }
    },()=>{console.log(this.state)})
    //aqui no dara el retraso de un segundo, PERO atravez de una callback donde llamamos al nuevamente al state asi
    //nos retornaran el state ya actulizado en tiempo real =J= solo en componetne de clase
  }

 //submit es un metodo de clase
 //pasamos el submit al constructor para heredar el this
 submit(e){
  e.preventDeafult();
 }

  render(){
    return(
      <form onSubmit={this.submit}>
        <InputText
         label="nombre"
         name="nombre"
         placeholder="nombre"
         validacion={esNombre} //funcion externa fuera del componente padre por eso se quita el this
         mensajeEror="se esperaba letras"
         actualiarState={this.actualiarState}
        />
        <button type="submit">
          Enviar                                                                    
        </button>
      </form>
    )
  }
}

export default CreateClass;