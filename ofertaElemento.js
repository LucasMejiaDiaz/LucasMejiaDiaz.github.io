const template = document.createElement("template");
//template.innerHTML = "<div><h1>Oferta: <span id='nombreOferta'></span></h1></div>";
template.innerHTML = "<div><h1>Oferta: <span id='nombreOferta'></span></h1></div><input type='text' id='myInput'>";

class OfertaElemento extends HTMLElement {
    constructor(){
        super();
        const shadow = this.attachShadow({mode: "open"});
        // this.textContent="malteada gratis"
        // this.append(template.content);
        const templateContent = template.content.cloneNode(true);
        // this.appendChild(templateContent);

        const nombre = this.getAttribute("nombre");
        const span = templateContent.getElementById("nombreOferta");
        span.textContent = nombre;

        shadow.append(templateContent);
        console.log("Constructor ", this);

        this.input = shadow.querySelector("#myInput");
        this.input.addEventListener("input", (e) => this.handleInput(e));
        this.span = shadow.querySelector("#nombreOferta");
    }

    handleInput() {
       console.log("Tecleaste...");
       this.setAttribute("value", this.input.value);

 }
 static get observedAttributes() {
       return ["value"];
     }

     attributeChangedCallback(name, old, nw) {
       console.log(`Cambio ${name} de ${old} a ${nw}`); 
}

attributeChangedCallback(name, old, nw) {
       console.log('Cambio ' + name + ' de ' + old + ' a ' + nw);
       if (name==="value"){
         //Agrega algo aquí para que en lugar lo que teníamos salga lo que se escribe
        this.span.textContent = nw;
        }
}

}

customElements.define("oferta-elemento", OfertaElemento);


