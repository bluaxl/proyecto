export async function DataRequestAproved(idAsesor) {
    try {
        const response = await fetch(`http://localhost:3001/requestReservation?tipo=${0}&asesor=${idAsesor}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const uniqueIds = new Set();
        const uniqueRequests = data.filter(request => {
            if (uniqueIds.has(request.idSolicitud)) {
                return false;
            }
            uniqueIds.add(request.idSolicitud);
            return true;
        });

        return uniqueRequests;
    } catch (error) {
        console.error('Error:', error);
        throw error; // Propagar el error para que pueda ser manejado en la llamada
    }
}

export async function DataRequest(idAsesor) {
    try {
        const response = await fetch(`http://localhost:3001/requestReservation?tipo=${1}&asesor=${idAsesor}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const uniqueIds = new Set();
        const uniqueRequests = data.filter(request => {
            if (uniqueIds.has(request.idSolicitud)) {
                return false;
            }
            uniqueIds.add(request.idSolicitud);
            return true;
        });

        return uniqueRequests;
    } catch (error) {
        console.error('Error:', error);
        throw error; 
    }
}