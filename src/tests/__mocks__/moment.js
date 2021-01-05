const moment = jest.requireActual('moment');//Llamamos la biblioteca porque si llamamos directamente con import vamos a mock it con nuestra código y crear un lazo

export default (timestamp = 0) => { 
    return moment(timestamp)
}