const template = document.createElement("template");

template.innerHTML = `
    <div>
        <h1>Producto de Amazon</h1>
    </div>
    <style>
        img {
            width: 250px;
            cursor: pointer;
            border-radius: 10px;
            transition: 0.3s;
        }

        img:hover {
            transform: scale(1.05);
        }
    </style>

    <img id="producto">
`;

class AmazonProducto extends HTMLElement {

    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });

        shadow.appendChild(template.content.cloneNode(true));

        const imagen = this.getAttribute("imagen");
        const link = this.getAttribute("link");

        const producto = shadow.getElementById("producto");

        producto.src = imagen;

        producto.addEventListener("click", () => {
            window.open(link, "_blank");
        });
    }
}

customElements.define("amazon-elemento", AmazonProducto);