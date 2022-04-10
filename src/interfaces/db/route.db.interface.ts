export interface RouteDbInterface {
    seq: number,
    airportId: string,
    airportName: string,
    IATA_code?: string,
    GPS_code: string,
    distance: number
}