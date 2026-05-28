const template = document.createElement("template");

template.innerHTML = `
    <div>
        <h1>Video: <span id="nombreVideo"></span></h1>

        <iframe
            id="videoYoutube"
            width="560"
            height="315"
            frameborder="0"
            allowfullscreen>
        </iframe>
    </div>
`;

class VideoElemento extends HTMLElement {

    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });

        shadow.appendChild(template.content.cloneNode(true));

        const nombre = this.getAttribute("nombre");
        const identificador = this.getAttribute("identificador");

        shadow.getElementById("nombreVideo").innerText = nombre;

        shadow.getElementById("videoYoutube").src =
            `https://www.youtube.com/embed/${identificador}`;
    }
}

customElements.define("video-elemento", VideoElemento);