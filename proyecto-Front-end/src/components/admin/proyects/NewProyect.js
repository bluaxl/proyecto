import "../../../css/Admin/newstate.css"
import { InputForm } from "../state/NewState"

export function NewProyect() {
    return(
        <>
        <div className="information-header">
                <h2 className="title-header">Nuevo Proyecto</h2>
            </div>
            <form className="form-state" method="POST">
                <div class="publish-box">
                    <InputForm type="text" options="Barrio: " placeholder="ingrese el nombre del barrio" />
                    <InputForm type="text" options="Dirección: " placeholder="ingrese la dirección" />
                    <InputForm type="number" options="Área Construida: " placeholder="ingrese el área construida" />
                    <InputForm type="number" options="Área de lote: " placeholder="ingrese el área del lote" />
                    <InputForm type="text" options="Dimensiones: " placeholder="ingrese las dimensiones" />
                    <InputForm type="text" options="Estado Construcción: " placeholder="ingrese el estado de construcción" />
                    <InputForm type="number" options="Número de pisos: " placeholder="ingrese el número de pisos" />
                    <InputForm type="number" options="Número de habitaciones " placeholder="ingrese el número de habitaciones" />
                    <InputForm type="number" options="Número de Baños: " placeholder="ingrese el número de baños" />
                    <InputForm type="number" options="Estrato: " placeholder="ingrese el estrato" />
                    <InputForm type="text" options="Garaje: " placeholder="ingrese si tiene garaje o no" />
                    <InputForm type="text" options="Descripción: " placeholder="ingrese una descripción" />
                </div>
                <div className="buttons-box">
                    <input type="file" name="images" accept="image/*" multiple ></input>
                    <button type="submit" className="button-submit">Publicar</button>
                </div>

            </form>
        </>
    )
}