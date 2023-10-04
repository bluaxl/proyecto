import "../../../css/Admin/newstate.css"

export function InputForm({ placeholder, options, type }) {
    return (
        <>
            <div class="subdiv-publish-box ">
                <p className="name-option">{options}</p>
                <input type={type} className="input-new-state" placeholder={placeholder}></input>
            </div>
        </>
    )
}

export function NewState() {
    return (
        <>
            <div className="information-header">
                <h2 className="title-header">Nuevo Inmueble</h2>
            </div>
            <form className="form-state" method="POST">
                <div class="publish-box">
                    <InputForm type="text" options="Barrio: " placeholder="ingrese el nombre del barrio" />
                    <InputForm type="text" options="Dirección: " placeholder="ingrese el nombre del barrio" />
                    <InputForm type="number" options="Área Construida: " placeholder="ingrese el nombre del barrio" />
                    <InputForm type="number" options="Área de lote: " placeholder="ingrese el nombre del barrio" />
                    <InputForm type="text" options="Dimensiones: " placeholder="ingrese el nombre del barrio" />
                    <InputForm type="text" options="Estado Construcción: " placeholder="ingrese el nombre del barrio" />
                    <InputForm type="number" options="Número de pisos: " placeholder="ingrese el nombre del barrio" />
                    <InputForm type="number" options="Número de habitaciones " placeholder="ingrese el nombre del barrio" />
                    <InputForm type="number" options="Número de Baños: " placeholder="ingrese el nombre del barrio" />
                    <InputForm type="number" options="Estrato: " placeholder="ingrese el nombre del barrio" />
                    <InputForm type="text" options="Garaje: " placeholder="ingrese el nombre del barrio" />
                </div>
                <div className="buttons-box">
                    <input type="file" name="images" accept="image/*" multiple ></input>
                    <button type="submit" className="button-submit">Publicar</button>
                </div>

            </form>
        </>
    )
}