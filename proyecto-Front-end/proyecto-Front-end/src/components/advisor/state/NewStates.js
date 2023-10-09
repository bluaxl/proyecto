import "../../../css/Advisory/newstate.css";
import { InputForm } from "../../admin/state/NewState";

export function NewStates() {
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