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
                    <InputForm type="text" options="Dirección: " placeholder="ingrese la dirección" />
                    <InputForm type="text" options="Área Construida: " placeholder="ingrese el área construida (ej: 6 x 12)" />
                    <InputForm type="text" options="Área de lote: " placeholder="ingrese el area del lote" />
                    <InputForm type="text" options="Estado Construcción: " placeholder="ingrese el estado (ej: Terminada)" />
                    <InputForm type="number" options="Número de pisos: " placeholder="ingrese el numero de pisos" />
                    <InputForm type="number" options="Número de habitaciones " placeholder="ingrese el numero de habitaciones" />
                    <InputForm type="number" options="Precio " placeholder="ingrese el precio del inmueble" />
                    <InputForm type="number" options="Número de Baños: " placeholder="ingrese el numero de baños" />
                    <div class="subdiv-publish-box ">
                        <p className="name-option">Tipo de Inmueble:</p>
                        <select id="tipoInmueble" name="tipoInmueble" className="select-type-state">
                            <option value="casa">Casa</option>
                            <option value="apartamento">Apartamento</option>
                            <option value="lote">Lote</option>
                            <option value="casaLote">Casa Lote</option>
                        </select>
                    </div>
                </div>
                <div className="buttons-box">
                    <input type="file" name="images" accept="image/*" multiple ></input>
                    <button type="submit" className="button-submit">Publicar</button>
                </div>

            </form>
        </>
    )
}