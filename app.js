const inventarioQuimicos = [
    {
        id: 1,
        nombre: "Ácido Sulfúrico (98%)",
        formula: "H2SO4",
        cas: "7664-93-9",
        laboratorio: "Química Analítica",
        ubicacion: "Gabinete de Ácidos A-02, Estante inferior",
        cantidad: "2.5 Litros",
        nfpa: { s: 3, i: 0, r: 2, esp: "W" },
        epp: "Guantes de nitrilo/neopreno, gafas de seguridad herméticas, bata de laboratorio y careta facial.",
        incompatibilidades: "Agua (reacción exotérmica violenta), bases fuertes, metales en polvo, materia orgánica.",
        derrame: "Aislar el área. Neutralizar lentamente con bicarbonato de sodio o cal apagada antes de absorber."
    },
    {
        id: 2,
        nombre: "Etanol Absoluto",
        formula: "C2H5OH",
        cas: "64-17-5",
        laboratorio: "Bioquímica",
        ubicacion: "Gabinete de Inflamables B-01",
        cantidad: "10 Litros",
        nfpa: { s: 2, i: 3, r: 0, esp: "-" },
        epp: "Gafas de seguridad, guantes de nitrilo y bata de algodón.",
        incompatibilidades: "Agentes oxidantes fuertes (ácido nítrico, peróxidos), llamas abiertas y chispas.",
        derrame: "Eliminar toda fuente de ignición. Ventilar el área y absorber con material inerte."
    },
    {
        id: 3,
        nombre: "Hidróxido de Sodio (Pellets)",
        formula: "NaOH",
        cas: "1310-73-2",
        laboratorio: "Almacén General",
        ubicacion: "Anaquel de Bases C-04",
        cantidad: "5 Kilogramos",
        nfpa: { s: 3, i: 0, r: 1, esp: "-" },
        epp: "Guantes resistentes a químicos, gafas contra salpicaduras y mandil de PVC.",
        incompatibilidades: "Ácidos fuertes, metales como aluminio, zinc y estaño (libera gas hidrógeno inflamable).",
        derrame: "Recoger en seco con pala limpia sin levantar polvo y depositar en contenedor etiquetado."
    }
];

function renderizarTabla() {
    const texto = document.getElementById("buscador").value.toLowerCase();
    const lab = document.getElementById("filtroLab").value;
    const tbody = document.getElementById("tablaQuimicos");
    tbody.innerHTML = "";

    const filtrados = inventarioQuimicos.filter(q => {
        const coincideTexto = q.nombre.toLowerCase().includes(texto) || 
                              q.formula.toLowerCase().includes(texto) || 
                              q.cas.includes(texto);
        const coincideLab = (lab === "todos") || (q.laboratorio === lab);
        return coincideTexto && coincideLab;
    });

    filtrados.forEach(q => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>${q.nombre}</strong></td>
            <td>${q.formula}</td>
            <td>${q.cas}</td>
            <td>${q.laboratorio}</td>
            <td>${q.cantidad}</td>
            <td><span style="color:#2b7de9;font-weight:bold">${q.nfpa.s}</span> - 
                <span style="color:#e53935;font-weight:bold">${q.nfpa.i}</span> - 
                <span style="color:#d4ac0d;font-weight:bold">${q.nfpa.r}</span></td>
            <td><button class="btn-ver" onclick="verDetalle(${q.id})">Ver HDS / Rombo</button></td>
        `;
        tbody.appendChild(tr);
    });
}

function verDetalle(id) {
    const q = inventarioQuimicos.find(item => item.id === id);
    if (!q) return;

    document.getElementById("detalleTitulo").textContent = `${q.nombre} (${q.formula}) - CAS: ${q.cas}`;
    document.getElementById("nfpaSalud").textContent = q.nfpa.s;
    document.getElementById("nfpaInflamabilidad").textContent = q.nfpa.i;
    document.getElementById("nfpaReactividad").textContent = q.nfpa.r;
    document.getElementById("nfpaEspecial").textContent = q.nfpa.esp;

    document.getElementById("detalleUbicacion").textContent = `${q.laboratorio} — ${q.ubicacion}`;
    document.getElementById("detalleEPP").textContent = q.epp;
    document.getElementById("detalleIncomp").textContent = q.incompatibilidades;
    document.getElementById("detalleDerrame").textContent = q.derrame;

    const modal = document.getElementById("detalleModal");
    modal.classList.remove("hidden");
    modal.scrollIntoView({ behavior: "smooth" });
}

function cerrarDetalle() {
    document.getElementById("detalleModal").classList.add("hidden");
}

document.getElementById("buscador").addEventListener("input", renderizarTabla);
document.getElementById("filtroLab").addEventListener("change", renderizarTabla);

// Cargar tabla al iniciar
renderizarTabla();